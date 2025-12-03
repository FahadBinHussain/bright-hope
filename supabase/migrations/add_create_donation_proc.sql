-- Create a stored procedure to add a donation reliably
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