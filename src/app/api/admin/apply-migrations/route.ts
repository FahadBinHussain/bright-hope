import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

// Create Supabase client with service role
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Applies missing migrations to add required columns to the donations table
 */
export async function GET(req: NextRequest) {
  try {
    // Verify admin authorization (optional, remove if not needed)
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (token) {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }
    
    console.log('Starting manual migration application...');
    
    // Step 1: Check if order_id column exists
    let orderIdExists = false;
    let paymentIntentIdExists = false;
    
    try {
      const { data: testData, error } = await supabase
        .from('donations')
        .select('order_id')
        .limit(1);
      
      orderIdExists = !error;
    } catch (error) {
      console.log('order_id column does not exist yet');
    }
    
    try {
      const { data: testData, error } = await supabase
        .from('donations')
        .select('payment_intent_id')
        .limit(1);
      
      paymentIntentIdExists = !error;
    } catch (error) {
      console.log('payment_intent_id column does not exist yet');
    }
    
    const results = {
      order_id_added: false,
      payment_intent_id_added: false,
      indexes_created: false,
      constraints_added: false,
      errors: [] as string[]
    };
    
    // Step 2: Add order_id column if it doesn't exist
    if (!orderIdExists) {
      try {
        const { error } = await supabase.rpc('add_column_if_not_exists', {
          _table: 'donations',
          _column: 'order_id',
          _type: 'text'
        });
        
        if (error) {
          results.errors.push(`Failed to add order_id column: ${error.message}`);
        } else {
          results.order_id_added = true;
        }
      } catch (error) {
        console.error('Error adding order_id column', error);
        results.errors.push(`Exception adding order_id column: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } else {
      console.log('order_id column already exists');
    }
    
    // Step 3: Add payment_intent_id column if it doesn't exist
    if (!paymentIntentIdExists) {
      try {
        const { error } = await supabase.rpc('add_column_if_not_exists', {
          _table: 'donations',
          _column: 'payment_intent_id',
          _type: 'text'
        });
        
        if (error) {
          results.errors.push(`Failed to add payment_intent_id column: ${error.message}`);
        } else {
          results.payment_intent_id_added = true;
        }
      } catch (error) {
        console.error('Error adding payment_intent_id column', error);
        results.errors.push(`Exception adding payment_intent_id column: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } else {
      console.log('payment_intent_id column already exists');
    }
    
    // Step 4: Create the stored procedure functions if they don't exist
    try {
      // SQL for stored procedure
      const sql = `
        -- Function to add a column if it doesn't exist
        CREATE OR REPLACE FUNCTION add_column_if_not_exists(
          _table text, 
          _column text, 
          _type text
        ) RETURNS void AS $$
        DECLARE
          column_exists boolean;
        BEGIN
          SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = _table
            AND column_name = _column
          ) INTO column_exists;
          
          IF NOT column_exists THEN
            EXECUTE format('ALTER TABLE %I ADD COLUMN %I %s', _table, _column, _type);
          END IF;
        END;
        $$ LANGUAGE plpgsql;
        
        -- Create a function to add a unique constraint on payment_intent_id
        CREATE OR REPLACE FUNCTION add_unique_payment_constraint()
        RETURNS void AS $$
        DECLARE
          constraint_exists boolean;
        BEGIN
          -- Check if constraint already exists
          SELECT EXISTS (
            SELECT 1
            FROM information_schema.table_constraints
            WHERE constraint_name = 'unique_payment_intent_id'
            AND table_name = 'donations'
          ) INTO constraint_exists;
          
          -- Only proceed if constraint doesn't exist
          IF NOT constraint_exists THEN
            -- First, identify and clean up duplicates
            -- This keeps the oldest record of each payment_intent_id and removes others
            WITH duplicates AS (
              SELECT 
                payment_intent_id,
                COUNT(*) as count,
                MIN(id) as keep_id
              FROM donations
              WHERE payment_intent_id IS NOT NULL
              GROUP BY payment_intent_id
              HAVING COUNT(*) > 1
            )
            DELETE FROM donations
            WHERE 
              payment_intent_id IN (SELECT payment_intent_id FROM duplicates)
              AND id NOT IN (SELECT keep_id FROM duplicates);
            
            -- Then add the unique constraint
            ALTER TABLE donations
            ADD CONSTRAINT unique_payment_intent_id UNIQUE (payment_intent_id);
          END IF;
        END;
        $$ LANGUAGE plpgsql;
        
        -- Create a similar function for order_id
        CREATE OR REPLACE FUNCTION add_unique_order_id_constraint()
        RETURNS void AS $$
        DECLARE
          constraint_exists boolean;
        BEGIN
          -- Check if constraint already exists
          SELECT EXISTS (
            SELECT 1
            FROM information_schema.table_constraints
            WHERE constraint_name = 'unique_order_id'
            AND table_name = 'donations'
          ) INTO constraint_exists;
          
          -- Only proceed if constraint doesn't exist
          IF NOT constraint_exists THEN
            -- First, identify and clean up duplicates
            -- This keeps the oldest record of each order_id and removes others
            WITH duplicates AS (
              SELECT 
                order_id,
                COUNT(*) as count,
                MIN(id) as keep_id
              FROM donations
              WHERE order_id IS NOT NULL
              GROUP BY order_id
              HAVING COUNT(*) > 1
            )
            DELETE FROM donations
            WHERE 
              order_id IN (SELECT order_id FROM duplicates)
              AND id NOT IN (SELECT keep_id FROM duplicates);
            
            -- Then add the unique constraint
            ALTER TABLE donations
            ADD CONSTRAINT unique_order_id UNIQUE (order_id);
          END IF;
        END;
        $$ LANGUAGE plpgsql;
      `;
      
      // Execute the SQL to create the functions
      const { error: procError } = await supabase.rpc('exec_sql', { sql });
      
      if (procError) {
        // If the function doesn't exist, create it manually
        if (procError.message.includes('function exec_sql') || procError.message.includes('does not exist')) {
          console.log('exec_sql function does not exist, will create columns directly');
          
          // Add columns directly using SQL
          const { error: sqlError } = await supabase.rpc('query', { 
            query: `
              -- Add columns if they don't exist
              ALTER TABLE donations ADD COLUMN IF NOT EXISTS order_id TEXT;
              ALTER TABLE donations ADD COLUMN IF NOT EXISTS payment_intent_id TEXT;
              
              -- Create indexes
              CREATE INDEX IF NOT EXISTS donations_order_id_idx ON donations(order_id);
              CREATE INDEX IF NOT EXISTS donations_payment_intent_idx ON donations(payment_intent_id);
            `
          });
          
          if (sqlError) {
            if (sqlError.message.includes('function query') || sqlError.message.includes('does not exist')) {
              results.errors.push('Database does not support RPC functions for direct SQL execution. Please run migrations manually.');
            } else {
              results.errors.push(`SQL Error: ${sqlError.message}`);
            }
          } else {
            results.order_id_added = true;
            results.payment_intent_id_added = true;
            results.indexes_created = true;
          }
        } else {
          results.errors.push(`Procedure Error: ${procError.message}`);
        }
      }
    } catch (error) {
      console.error('Error creating stored procedures', error);
      results.errors.push(`Exception creating procedures: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    
    return NextResponse.json({
      success: results.errors.length === 0,
      message: results.errors.length === 0 ? 'Migrations applied successfully' : 'Some migrations failed',
      ...results
    });
  } catch (error) {
    console.error('Migration application error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error applying migrations' },
      { status: 500 }
    );
  }
} 