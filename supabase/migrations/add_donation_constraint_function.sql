-- Create a function to add a unique constraint on payment_intent_id
-- This function will first clean up any duplicates that might exist
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