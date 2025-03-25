-- Add order_id column to donations table
ALTER TABLE donations ADD COLUMN IF NOT EXISTS order_id TEXT;

-- Create an index on order_id for faster lookups
CREATE INDEX IF NOT EXISTS donations_order_id_idx ON donations(order_id); 