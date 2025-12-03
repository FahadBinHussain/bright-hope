-- Apply this in the Supabase SQL Editor to fix the duplicate donations issue on Vercel

-- 1. Add the order_id column if it doesn't exist
ALTER TABLE donations ADD COLUMN IF NOT EXISTS order_id TEXT;

-- 2. Safely add a unique constraint on order_id
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'unique_order_id' 
    AND conrelid = 'donations'::regclass
  ) THEN
    -- Add unique constraint on non-NULL order_ids
    ALTER TABLE donations ADD CONSTRAINT unique_order_id UNIQUE (order_id) 
    WHERE order_id IS NOT NULL;
    
    RAISE NOTICE 'Added unique constraint on order_id';
  ELSE
    RAISE NOTICE 'unique_order_id constraint already exists';
  END IF;
END $$;

-- 3. Update the stored procedure to check for duplicates
CREATE OR REPLACE FUNCTION create_donation(
  p_amount DECIMAL,
  p_user_id UUID,
  p_campaign_id UUID DEFAULT NULL,
  p_anonymous BOOLEAN DEFAULT FALSE,
  p_message TEXT DEFAULT NULL,
  p_order_id TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  donation_id UUID;
  order_exists INT;
BEGIN
  -- Check for duplicate order_id if provided
  IF p_order_id IS NOT NULL THEN
    SELECT COUNT(*) INTO order_exists 
    FROM donations 
    WHERE order_id = p_order_id;
    
    IF order_exists > 0 THEN
      RAISE NOTICE 'Donation with order_id % already exists', p_order_id;
      RETURN NULL;
    END IF;
  END IF;

  -- Insert the donation and return the ID
  INSERT INTO donations (
    amount,
    user_id,
    campaign_id,
    anonymous,
    message,
    order_id
  ) VALUES (
    p_amount,
    p_user_id,
    p_campaign_id,
    p_anonymous,
    p_message,
    p_order_id
  ) RETURNING id INTO donation_id;
  
  -- If donation is for a campaign, update campaign amount
  IF p_campaign_id IS NOT NULL THEN
    UPDATE campaigns
    SET current_amount = current_amount + p_amount
    WHERE id = p_campaign_id;
  END IF;
  
  RETURN donation_id;
END;
$$ LANGUAGE plpgsql;

-- 4. Find and clean up existing duplicates
WITH duplicate_groups AS (
  SELECT 
    user_id, 
    amount, 
    DATE(created_at) as donation_date,
    COUNT(*) as count
  FROM donations
  GROUP BY user_id, amount, DATE(created_at)
  HAVING COUNT(*) > 1
  ORDER BY COUNT(*) DESC
),
ranked_duplicates AS (
  SELECT 
    d.id,
    d.created_at,
    ROW_NUMBER() OVER (
      PARTITION BY d.user_id, d.amount, DATE(d.created_at) 
      ORDER BY d.created_at ASC
    ) as row_num
  FROM donations d
  JOIN duplicate_groups dg 
    ON d.user_id = dg.user_id 
    AND d.amount = dg.amount 
    AND DATE(d.created_at) = dg.donation_date
)
DELETE FROM donations 
WHERE id IN (
  SELECT id FROM ranked_duplicates WHERE row_num > 1
); 