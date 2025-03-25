-- Allow service role to create donations
CREATE POLICY "Service role can create donations"
    ON donations FOR INSERT
    WITH CHECK (auth.jwt()->>'role' = 'service_role');

-- Allow service role to update donations
CREATE POLICY "Service role can update donations"
    ON donations FOR UPDATE
    USING (auth.jwt()->>'role' = 'service_role');

-- Allow service role to delete donations
CREATE POLICY "Service role can delete donations"
    ON donations FOR DELETE
    USING (auth.jwt()->>'role' = 'service_role'); 