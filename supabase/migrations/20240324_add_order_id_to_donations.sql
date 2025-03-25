-- Add order_id column to donations table
ALTER TABLE donations ADD COLUMN IF NOT EXISTS order_id TEXT;

-- Create a unique index on order_id to prevent duplicate processing
CREATE UNIQUE INDEX IF NOT EXISTS donations_order_id_idx ON donations(order_id);

-- Add comment to explain the column
COMMENT ON COLUMN donations.order_id IS 'Unique identifier from payment processor to prevent duplicate donations';

-- Clean up any duplicate donations that might have been created
WITH duplicates AS (
  SELECT order_id, COUNT(*) as count
  FROM donations
  WHERE order_id IS NOT NULL
  GROUP BY order_id
  HAVING COUNT(*) > 1
)
DELETE FROM donations
WHERE id IN (
  SELECT d.id
  FROM donations d
  JOIN duplicates dup ON d.order_id = dup.order_id
  WHERE d.id NOT IN (
    SELECT MIN(id)
    FROM donations
    WHERE order_id = dup.order_id
  )
); 