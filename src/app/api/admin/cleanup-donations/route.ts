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

export async function POST(req: NextRequest) {
  try {
    // Get all donations
    const { data: donations, error: fetchError } = await supabase
      .from('donations')
      .select('id, user_id, amount, created_at')
      .order('created_at', { ascending: false });
    
    if (fetchError) {
      throw fetchError;
    }
    
    // Group by user, amount, and date
    console.log(`Analyzing ${donations?.length || 0} donations for duplicates...`);
    
    const duplicateGroups: Donation[][] = [];
    const processedGroups = new Map<string, Donation[]>();
    
    for (const donation of donations || []) {
      // Create a key combining user, amount, and day
      const date = new Date(donation.created_at);
      const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      const groupKey = `${donation.user_id}_${donation.amount}_${dayKey}`;
      
      if (!processedGroups.has(groupKey)) {
        processedGroups.set(groupKey, []);
      }
      
      processedGroups.get(groupKey)!.push(donation);
    }
    
    // Find groups with more than one donation (duplicates)
    for (const [_, group] of processedGroups.entries()) {
      if (group.length > 1) {
        duplicateGroups.push(group);
      }
    }
    
    console.log(`Found ${duplicateGroups.length} groups of duplicate donations`);
    
    // Keep only the oldest donation in each duplicate group
    const donationsToDelete: string[] = [];
    const summary = [];
    
    for (const group of duplicateGroups) {
      // Sort by created_at (oldest first)
      group.sort((a: Donation, b: Donation) => 
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      
      // Keep the first one, delete the rest
      const toDelete = group.slice(1);
      donationsToDelete.push(...toDelete.map((d: Donation) => d.id));
      
      summary.push({
        userId: group[0].user_id,
        amount: group[0].amount,
        count: group.length,
        keeping: group[0].id,
        deleting: toDelete.map((d: Donation) => d.id)
      });
      
      console.log(`Group: ${group.length} donations of ${group[0].amount} by user ${group[0].user_id}`);
      console.log(`  Keeping: ${group[0].id}, Deleting: ${toDelete.map((d: Donation) => d.id).join(', ')}`);
    }
    
    // Delete the duplicate donations
    const result = { 
      groupsFound: duplicateGroups.length, 
      donationsDeleted: 0,
      summary 
    };
    
    if (donationsToDelete.length > 0) {
      console.log(`Deleting ${donationsToDelete.length} duplicate donations...`);
      
      const { error: deleteError } = await supabase
        .from('donations')
        .delete()
        .in('id', donationsToDelete);
      
      if (deleteError) {
        throw deleteError;
      }
      
      result.donationsDeleted = donationsToDelete.length;
      console.log('Duplicate donations successfully deleted!');
    } else {
      console.log('No duplicates to delete.');
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error during cleanup:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
} 