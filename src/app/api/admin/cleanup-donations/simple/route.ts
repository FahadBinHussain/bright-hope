import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

// Create Supabase client with service role
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    // Delete all but one donation with transaction ID 67e25619
    const transactionId = "67e25619";
    
    // Find all donations with this transaction ID in the message
    const { data: duplicates } = await supabase
      .from('donations')
      .select('id, created_at')
      .like('message', `%${transactionId}%`)
      .order('created_at', { ascending: true });
    
    if (!duplicates || duplicates.length <= 1) {
      return NextResponse.json({ 
        success: true, 
        message: "No duplicates found",
        count: 0
      });
    }
    
    // Keep the oldest one, delete the rest
    const [keep, ...toDelete] = duplicates;
    const deleteIds = toDelete.map(d => d.id);
    
    console.log(`Keeping donation ${keep.id}, deleting ${deleteIds.length} duplicates`);
    
    // Delete the duplicates
    const { error } = await supabase
      .from('donations')
      .delete()
      .in('id', deleteIds);
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Duplicates deleted successfully",
      count: deleteIds.length,
      kept: keep.id,
      deleted: deleteIds
    });
  } catch (error) {
    console.error("Error cleaning up duplicates:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
} 