import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'supabase.auth.token',
    storage: {
      getItem: (key) => {
        if (typeof window !== 'undefined') {
          return localStorage.getItem(key)
        }
        return null
      },
      setItem: (key, value) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(key, value)
        }
      },
      removeItem: (key) => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(key)
        }
      },
    },
  },
})

export interface Campaign {
  id: string
  slug: string
  title: string
  description: string
  image_url: string
  goal: number
  raised: number
  days_left: number
  created_at: string
  updated_at: string
}

export interface Donation {
  id: string
  campaign_id: string | null
  amount: number
  user_id: string
  anonymous?: boolean
  message?: string
  created_at: string
  order_id?: string
  payment_intent_id?: string
}

export interface Volunteer {
  id: string
  created_at: string
  user_id: string
  campaign_id: string
  role: string
  status: 'pending' | 'approved' | 'rejected'
}

export interface ImpactStat {
  id: string
  icon: string
  value: string
  label: string
  created_at: string
}

export interface UserProfile {
  id: string
  full_name: string | null
  avatar_url: string | null
  phone: string | null
  address: string | null
  created_at: string
  updated_at: string
}

export const supabaseService = {
  supabase,
  // Campaign operations
  async getCampaigns() {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Campaign[]
  },

  async getCampaignBySlug(slug: string) {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data as Campaign
  },

  // Donation operations
  async createDonation(donation: Omit<Donation, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('donations')
      .insert([donation])
      .select()
      .single()
    
    if (error) throw error
    return data as Donation
  },

  async getDonationsByCampaign(campaignId: string) {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Donation[]
  },

  // Volunteer operations
  async createVolunteer(volunteer: Omit<Volunteer, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('volunteers')
      .insert([volunteer])
      .select()
      .single()
    
    if (error) throw error
    return data as Volunteer
  },

  // Impact stats operations
  async getImpactStats() {
    const { data, error } = await supabase
      .from('impact_stats')
      .select('*')
    
    if (error) throw error
    return data as ImpactStat[]
  },

  // Auth operations
  async signUp(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    
    if (error) throw error
    return data
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      console.error('Supabase auth error details:', error);
      
      // Handle specific error cases
      if (error.message.includes('Email not confirmed')) {
        throw new Error('Please check your email to confirm your account before logging in');
      } else if (error.message.includes('Invalid login credentials')) {
        throw new Error('The email or password you entered is incorrect');
      } else if (error.status === 400) {
        throw new Error('Login failed: ' + error.message);
      } else if (error.status === 422) {
        throw new Error('Invalid email or password format');
      } else {
        throw error;
      }
    }
    
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  // User Profile operations
  async getUserProfile() {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) return null

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    
    if (error) throw error
    return data as UserProfile
  },

  async updateUserProfile(updates: Partial<UserProfile>) {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('No user logged in')

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()
    
    if (error) throw error
    return data as UserProfile
  },

  async uploadAvatar(file: File) {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('No user logged in')

    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}-${Math.random()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    await this.updateUserProfile({ avatar_url: data.publicUrl })

    return data.publicUrl
  }
} 