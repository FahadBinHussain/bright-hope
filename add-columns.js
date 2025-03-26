// Simple script to add missing columns to the donations table
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Create Supabase client with service role
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addMissingColumns() {
  try {
    console.log('Adding missing columns to donations table...');
    
    // Execute SQL directly
    const { data, error } = await supabase.rpc('pg_advisory_lock', { key: 1 });
    
    if (error) {
      console.log('Direct SQL not supported, trying raw query...');
      
      // Fallback to raw query via fetch
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/sql`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        },
        body: JSON.stringify({
          query: `
            -- Add missing columns
            ALTER TABLE donations ADD COLUMN IF NOT EXISTS order_id TEXT;
            ALTER TABLE donations ADD COLUMN IF NOT EXISTS payment_intent_id TEXT;
            
            -- Add indexes for better performance
            CREATE INDEX IF NOT EXISTS donations_order_id_idx ON donations(order_id);
            CREATE INDEX IF NOT EXISTS donations_payment_intent_idx ON donations(payment_intent_id);
          `
        })
      });
      
      if (!response.ok) {
        const result = await response.json();
        throw new Error(`API error: ${JSON.stringify(result)}`);
      }
      
      console.log('Successfully added columns via API');
      return;
    }
    
    // Execute SQL using Postgres module (if available)
    const sql = `
      -- Add missing columns
      ALTER TABLE donations ADD COLUMN IF NOT EXISTS order_id TEXT;
      ALTER TABLE donations ADD COLUMN IF NOT EXISTS payment_intent_id TEXT;
      
      -- Add indexes for better performance
      CREATE INDEX IF NOT EXISTS donations_order_id_idx ON donations(order_id);
      CREATE INDEX IF NOT EXISTS donations_payment_intent_idx ON donations(payment_intent_id);
    `;
    
    const { error: sqlError } = await supabase.rpc('pg_execute', { sql });
    
    if (sqlError) {
      console.error('Error executing SQL:', sqlError);
      throw sqlError;
    }
    
    console.log('Successfully added columns to donations table');
  } catch (error) {
    console.error('Failed to add columns:', error);
  } finally {
    // Release advisory lock
    try {
      await supabase.rpc('pg_advisory_unlock', { key: 1 });
    } catch (unlockError) {
      // Ignore unlock errors
    }
  }
}

// Run the function
addMissingColumns().catch(console.error); 