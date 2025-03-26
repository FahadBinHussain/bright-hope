-- Create a stored procedure to add a donation reliably
CREATE OR REPLACE FUNCTION create_donation(
  p_amount DECIMAL,
  p_user_id UUID,
  p_campaign_id UUID DEFAULT NULL,
  p_anonymous BOOLEAN DEFAULT FALSE,
  p_message TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  donation_id UUID;
BEGIN
  -- Insert the donation and return the ID
  INSERT INTO donations (
    amount,
    user_id,
    campaign_id,
    anonymous,
    message
  ) VALUES (
    p_amount,
    p_user_id,
    p_campaign_id,
    p_anonymous,
    p_message
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