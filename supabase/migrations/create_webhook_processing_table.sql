-- Create a table to track webhook processing for idempotency
CREATE TABLE IF NOT EXISTS webhook_processing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key TEXT NOT NULL UNIQUE,
  order_id TEXT,
  status TEXT NOT NULL CHECK (status IN ('processing', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS webhook_processing_idempotency_key_idx 
ON webhook_processing(idempotency_key);

CREATE INDEX IF NOT EXISTS webhook_processing_order_id_idx 
ON webhook_processing(order_id);

-- Add RLS policies
ALTER TABLE webhook_processing ENABLE ROW LEVEL SECURITY;

-- Allow service role to manage webhook_processing
CREATE POLICY "Service role can manage webhook_processing"
ON webhook_processing
USING (auth.jwt()->>'role' = 'service_role');

-- Allow anon access to create webhook_processing (needed for webhooks)
CREATE POLICY "Anon can create webhook_processing"
ON webhook_processing FOR INSERT
TO anon
WITH CHECK (true); 