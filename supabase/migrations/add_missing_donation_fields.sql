-- Add missing fields to donations table
ALTER TABLE donations ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'BDT';
ALTER TABLE donations ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'COMPLETED';
ALTER TABLE donations ADD COLUMN IF NOT EXISTS payment_intent_id TEXT;
ALTER TABLE donations ADD COLUMN IF NOT EXISTS receipt_url TEXT;

-- Create an index on payment_intent_id for faster lookups
CREATE INDEX IF NOT EXISTS donations_payment_intent_idx ON donations(payment_intent_id);

-- Create pending_donations table to track in-progress donations
CREATE TABLE IF NOT EXISTS pending_donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    amount DECIMAL(10,2) NOT NULL,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    payment_intent_id TEXT NOT NULL,
    processed BOOLEAN DEFAULT false
);

-- Create an index on payment_intent_id for faster lookups
CREATE INDEX IF NOT EXISTS pending_donations_payment_intent_idx ON pending_donations(payment_intent_id); 