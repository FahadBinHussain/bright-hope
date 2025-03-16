-- Create tables
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    goal_amount DECIMAL(10,2) NOT NULL,
    current_amount DECIMAL(10,2) DEFAULT 0,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    image_url TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    amount DECIMAL(10,2) NOT NULL,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    anonymous BOOLEAN DEFAULT false,
    message TEXT
);

CREATE TABLE IF NOT EXISTS volunteers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

CREATE TABLE IF NOT EXISTS impact_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    lives_impacted INTEGER NOT NULL DEFAULT 0,
    communities_reached INTEGER NOT NULL DEFAULT 0,
    volunteers_count INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    location TEXT,
    phone TEXT
);

-- Enable Row Level Security on all tables
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Campaigns
CREATE POLICY "Campaigns are viewable by everyone"
    ON campaigns FOR SELECT
    USING (true);

CREATE POLICY "Users can create campaigns"
    ON campaigns FOR INSERT
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own campaigns"
    ON campaigns FOR UPDATE
    USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own campaigns"
    ON campaigns FOR DELETE
    USING (auth.uid() = created_by);

-- Donations
CREATE POLICY "Donations are viewable by everyone"
    ON donations FOR SELECT
    USING (true);

CREATE POLICY "Users can create donations"
    ON donations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own donations"
    ON donations FOR SELECT
    USING (auth.uid() = user_id OR anonymous = false);

-- Volunteers
CREATE POLICY "Volunteer records are viewable by campaign owners and the volunteer"
    ON volunteers FOR SELECT
    USING (
        auth.uid() IN (
            SELECT created_by FROM campaigns WHERE id = campaign_id
        ) OR
        auth.uid() = user_id
    );

CREATE POLICY "Users can create volunteer records"
    ON volunteers FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Impact Stats
CREATE POLICY "Impact stats are viewable by everyone"
    ON impact_stats FOR SELECT
    USING (true);

CREATE POLICY "Campaign owners can update impact stats"
    ON impact_stats FOR UPDATE
    USING (
        auth.uid() IN (
            SELECT created_by FROM campaigns WHERE id = campaign_id
        )
    );

-- User Profiles
CREATE POLICY "Profiles are viewable by everyone"
    ON user_profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update their own profile"
    ON user_profiles FOR UPDATE
    USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS campaigns_slug_idx ON campaigns(slug);
CREATE INDEX IF NOT EXISTS donations_campaign_id_idx ON donations(campaign_id);
CREATE INDEX IF NOT EXISTS donations_user_id_idx ON donations(user_id);
CREATE INDEX IF NOT EXISTS volunteers_campaign_id_idx ON volunteers(campaign_id);
CREATE INDEX IF NOT EXISTS volunteers_user_id_idx ON volunteers(user_id);
CREATE INDEX IF NOT EXISTS impact_stats_campaign_id_idx ON impact_stats(campaign_id);
CREATE INDEX IF NOT EXISTS user_profiles_user_id_idx ON user_profiles(user_id);

-- Create function to update campaign amounts
CREATE OR REPLACE FUNCTION update_campaign_amount()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE campaigns
        SET current_amount = current_amount + NEW.amount
        WHERE id = NEW.campaign_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE campaigns
        SET current_amount = current_amount - OLD.amount
        WHERE id = OLD.campaign_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating campaign amounts
CREATE TRIGGER update_campaign_amount_trigger
AFTER INSERT OR DELETE ON donations
FOR EACH ROW
EXECUTE FUNCTION update_campaign_amount(); 