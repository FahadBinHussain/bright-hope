// Cleanup script for duplicate donations
const { createClient } = require('@supabase/supabase-js');

async function cleanupDuplicates() {
  console.log('Starting duplicate donation cleanup...');

  // Create Supabase client
  // You'll need to provide these when running the script
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // First, identify all duplicate sets
    // This finds duplicate donations made by the same user for the same amount on the same day
    console.log('Finding duplicate donations...');
    
    const { data, error } = await supabase.rpc('find_duplicate_donations');
    
    if (error) {
      // If the RPC function doesn't exist, we'll have to use a different approach
      console.log('RPC not available, using direct query...');
      
      // Get all donations
      const { data: donations, error: fetchError } = await supabase
        .from('donations')
        .select('id, user_id, amount, created_at')
        .order('created_at', { ascending: false });
      
      if (fetchError) {
        throw fetchError;
      }
      
      // Group by user, amount, and date
      console.log(`Analyzing ${donations.length} donations for duplicates...`);
      
      const duplicateGroups = [];
      const processedGroups = new Map();
      
      for (const donation of donations) {
        // Create a key combining user, amount, and day
        const date = new Date(donation.created_at);
        const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const groupKey = `${donation.user_id}_${donation.amount}_${dayKey}`;
        
        if (!processedGroups.has(groupKey)) {
          processedGroups.set(groupKey, []);
        }
        
        processedGroups.get(groupKey).push(donation);
      }
      
      // Find groups with more than one donation (duplicates)
      for (const [key, group] of processedGroups.entries()) {
        if (group.length > 1) {
          duplicateGroups.push(group);
        }
      }
      
      console.log(`Found ${duplicateGroups.length} groups of duplicate donations`);
      
      // Keep only the oldest donation in each duplicate group
      const donationsToDelete = [];
      
      for (const group of duplicateGroups) {
        // Sort by created_at (oldest first)
        group.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        
        // Keep the first one, delete the rest
        const toDelete = group.slice(1);
        donationsToDelete.push(...toDelete.map(d => d.id));
        
        console.log(`Group: ${group.length} donations of ${group[0].amount} by user ${group[0].user_id}`);
        console.log(`  Keeping: ${group[0].id}, Deleting: ${toDelete.map(d => d.id).join(', ')}`);
      }
      
      // Delete the duplicate donations
      if (donationsToDelete.length > 0) {
        console.log(`Deleting ${donationsToDelete.length} duplicate donations...`);
        
        const { error: deleteError } = await supabase
          .from('donations')
          .delete()
          .in('id', donationsToDelete);
        
        if (deleteError) {
          throw deleteError;
        }
        
        console.log('Duplicate donations successfully deleted!');
      } else {
        console.log('No duplicates to delete.');
      }
    } else {
      // If the RPC was successful, use its results
      console.log(`Found ${data.length} groups of duplicate donations, cleaning up...`);
      
      // Process each group of duplicates
      for (const group of data) {
        console.log(`Cleaning up group with ${group.ids.length} donations`);
        
        // Keep the first ID, delete the rest
        const [keepId, ...deleteIds] = group.ids;
        
        if (deleteIds.length > 0) {
          const { error: deleteError } = await supabase
            .from('donations')
            .delete()
            .in('id', deleteIds);
          
          if (deleteError) {
            console.error(`Error deleting duplicates: ${deleteError.message}`);
          } else {
            console.log(`Successfully deleted ${deleteIds.length} duplicate donations`);
          }
        }
      }
    }
    
    console.log('Duplicate cleanup completed successfully!');
  } catch (error) {
    console.error('Error during cleanup:', error);
    process.exit(1);
  }
}

cleanupDuplicates();