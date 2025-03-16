export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      campaigns: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          goal_amount: number
          current_amount: number
          end_date: string
          image_url: string
          slug: string
          status: 'active' | 'completed' | 'cancelled'
          created_by: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          goal_amount: number
          current_amount?: number
          end_date: string
          image_url: string
          slug: string
          status?: 'active' | 'completed' | 'cancelled'
          created_by: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          goal_amount?: number
          current_amount?: number
          end_date?: string
          image_url?: string
          slug?: string
          status?: 'active' | 'completed' | 'cancelled'
          created_by?: string
        }
      }
      donations: {
        Row: {
          id: string
          created_at: string
          amount: number
          campaign_id: string
          user_id: string
          anonymous: boolean
          message?: string
        }
        Insert: {
          id?: string
          created_at?: string
          amount: number
          campaign_id: string
          user_id: string
          anonymous?: boolean
          message?: string
        }
        Update: {
          id?: string
          created_at?: string
          amount?: number
          campaign_id?: string
          user_id?: string
          anonymous?: boolean
          message?: string
        }
      }
      volunteers: {
        Row: {
          id: string
          created_at: string
          user_id: string
          campaign_id: string
          role: string
          status: 'pending' | 'approved' | 'rejected'
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          campaign_id: string
          role: string
          status?: 'pending' | 'approved' | 'rejected'
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          campaign_id?: string
          role?: string
          status?: 'pending' | 'approved' | 'rejected'
        }
      }
      impact_stats: {
        Row: {
          id: string
          created_at: string
          campaign_id: string
          lives_impacted: number
          communities_reached: number
          volunteers_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          campaign_id: string
          lives_impacted: number
          communities_reached: number
          volunteers_count: number
        }
        Update: {
          id?: string
          created_at?: string
          campaign_id?: string
          lives_impacted?: number
          communities_reached?: number
          volunteers_count?: number
        }
      }
      user_profiles: {
        Row: {
          id: string
          created_at: string
          user_id: string
          full_name: string
          avatar_url?: string
          bio?: string
          location?: string
          phone?: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          full_name: string
          avatar_url?: string
          bio?: string
          location?: string
          phone?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          full_name?: string
          avatar_url?: string
          bio?: string
          location?: string
          phone?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 