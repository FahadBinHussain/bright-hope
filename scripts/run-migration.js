// Script to run a migration to add the order_id column to the donations table
const { createClient } = require('@supabase/supabase-js');

// Get environment variables directly
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

async function runMigration() {
  // Create Supabase client with service role for admin access
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    console.log('Running migration to add order_id column to donations table...');
    
    // Use raw SQL directly
    const { error: rawSqlError } = await supabase.sql`
      ALTER TABLE donations ADD COLUMN IF NOT EXISTS order_id TEXT;
      CREATE INDEX IF NOT EXISTS donations_order_id_idx ON donations(order_id);
    `;
    
    if (rawSqlError) {
      console.error('Error running SQL migration:', rawSqlError);
      process.exit(1);
    }
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Unexpected error during migration:', error);
    process.exit(1);
  }
}

runMigration(); 