import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

// Create Supabase client with service role
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Define the donation type
interface Donation {
  id: string;
  user_id: string;
  amount: number;
  created_at: string;
}

/**
 * Admin API to clean up duplicate donations
 * This endpoint will:
 * 1. Find all duplicate donations based on user_id, amount, and close timestamps
 * 2. Keep only the earliest donation of each duplicate set
 * 3. Add database constraints to prevent future duplicates
 */
export async function POST(req: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }
    
    // Check if user has admin rights
    const { data: userData, error: userError } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('user_id', user.id)
      .single();
      
    if (userError || userData?.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }
    
    // Step 1: Find duplicates by user, amount, and time proximity
    // Start by finding all donations
    const { data: allDonations, error: donationsError } = await supabase
      .from('donations')
      .select('id, user_id, amount, created_at')
      .order('created_at', { ascending: true });
      
    if (donationsError) {
      throw new Error(`Failed to fetch donations: ${donationsError.message}`);
    }
    
    // Group by user_id and amount, then find time-based duplicates
    const duplicateSets: { [key: string]: Donation[] } = {};
    const timeThresholdMs = 10 * 1000; // 10 seconds
    
    allDonations?.forEach((donation) => {
      const key = `${donation.user_id}:${donation.amount}`;
      
      if (!duplicateSets[key]) {
        duplicateSets[key] = [donation];
      } else {
        // Check if this donation is close in time to the last donation in this set
        const lastDonation = duplicateSets[key][duplicateSets[key].length - 1];
        const lastTime = new Date(lastDonation.created_at).getTime();
        const currentTime = new Date(donation.created_at).getTime();
        
        if (currentTime - lastTime <= timeThresholdMs) {
          // This is a duplicate
          duplicateSets[key].push(donation);
        } else {
          // This is a new donation after the time threshold
          duplicateSets[key] = [donation];
        }
      }
    });
    
    // Extract actual duplicates (entries with more than 1 donation)
    const actualDuplicates: { [key: string]: Donation[] } = {};
    let duplicateCount = 0;
    
    Object.entries(duplicateSets).forEach(([key, donations]) => {
      if (donations.length > 1) {
        actualDuplicates[key] = donations;
        duplicateCount += donations.length - 1; // Count all but first as duplicates
      }
    });
    
    // Step 2: If duplicates found, keep only the earliest of each set
    if (duplicateCount > 0) {
      // Collect IDs to delete (all except the first in each duplicate set)
      const idsToDelete: string[] = [];
      
      Object.values(actualDuplicates).forEach(duplicates => {
        // Sort by created_at just to be sure
        duplicates.sort((a, b) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        
        // Skip the first one (keep it), mark others for deletion
        for (let i = 1; i < duplicates.length; i++) {
          idsToDelete.push(duplicates[i].id);
        }
      });
      
      // Delete the duplicates
      if (idsToDelete.length > 0) {
        const { error: deleteError } = await supabase
          .from('donations')
          .delete()
          .in('id', idsToDelete);
          
        if (deleteError) {
          throw new Error(`Failed to delete duplicates: ${deleteError.message}`);
        }
      }
    }
    
    // Step 3: Apply unique constraints to prevent future duplicates
    // Call our stored procedure to add constraints
    await supabase.rpc('add_unique_payment_constraint');
    await supabase.rpc('add_unique_order_id_constraint');
    
    return NextResponse.json({
      success: true,
      duplicatesFound: duplicateCount,
      duplicatesRemoved: duplicateCount,
      message: duplicateCount > 0 
        ? `Removed ${duplicateCount} duplicate donations` 
        : 'No duplicates found'
    });
  } catch (error) {
    console.error('[CleanupDonations] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 