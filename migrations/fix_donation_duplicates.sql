-- Add order_id column to donations table
ALTER TABLE donations ADD COLUMN IF NOT EXISTS order_id TEXT;

-- Create an index on order_id for faster lookups
CREATE INDEX IF NOT EXISTS donations_order_id_idx ON donations(order_id);

-- Add payment_intent_id column to donations table if it doesn't exist
ALTER TABLE donations ADD COLUMN IF NOT EXISTS payment_intent_id TEXT;

-- Create an index on payment_intent_id for faster lookups
CREATE INDEX IF NOT EXISTS donations_payment_intent_idx ON donations(payment_intent_id);

-- Add receipt_url column to donations table if it doesn't exist
ALTER TABLE donations ADD COLUMN IF NOT EXISTS receipt_url TEXT;

-- Add status column to donations table if it doesn't exist
ALTER TABLE donations ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'COMPLETED';

-- Fix duplicate donations by adding a unique constraint
-- This will make sure that the same transaction ID cannot be inserted twice
ALTER TABLE donations 
  ADD CONSTRAINT IF NOT EXISTS unique_payment_intent_id UNIQUE (payment_intent_id); 