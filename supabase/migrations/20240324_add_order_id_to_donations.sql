-- Add order_id column to donations table
ALTER TABLE donations ADD COLUMN IF NOT EXISTS order_id TEXT;

-- Create a unique index on order_id to prevent duplicate processing
CREATE UNIQUE INDEX IF NOT EXISTS donations_order_id_idx ON donations(order_id);

-- Add comment to explain the column
COMMENT ON COLUMN donations.order_id IS 'Unique identifier from payment processor to prevent duplicate donations'; 