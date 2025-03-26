import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

// Create Supabase client with service role
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Simple API endpoint to add the missing columns
 */
export async function GET(req: NextRequest) {
  try {
    // Add both columns in a single direct SQL statement
    const { error } = await supabase
      .from('donations')
      .select('id')
      .limit(1);

    if (error && error.message.includes("order_id")) {
      console.log("Adding missing columns to donations table");
      
      // Use the REST API with the SQL extension
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/run_sql`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`
        },
        body: JSON.stringify({
          sql: `
            -- Add missing columns
            ALTER TABLE donations ADD COLUMN IF NOT EXISTS order_id TEXT;
            ALTER TABLE donations ADD COLUMN IF NOT EXISTS payment_intent_id TEXT;
            
            -- Add indexes for better performance
            CREATE INDEX IF NOT EXISTS donations_order_id_idx ON donations(order_id);
            CREATE INDEX IF NOT EXISTS donations_payment_intent_idx ON donations(payment_intent_id);
          `
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        console.error("Error running SQL:", result);
        return NextResponse.json({ 
          error: `Failed to add columns: ${result.error || 'Unknown error'}`,
          details: result 
        }, { status: 500 });
      }
      
      console.log("Successfully added columns to donations table");
      return NextResponse.json({ 
        success: true, 
        message: "Added missing columns to donations table",
        details: result
      });
    } else {
      console.log("Columns already exist or different error", error);
      return NextResponse.json({ 
        success: true, 
        message: "Columns already exist or no modifications needed",
        error: error
      });
    }
  } catch (error) {
    console.error('Error running migration:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error running SQL' },
      { status: 500 }
    );
  }
} 