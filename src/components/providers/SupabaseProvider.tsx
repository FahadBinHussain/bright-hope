'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabaseService } from '@/lib/services/supabase'

type SupabaseContextType = {
  user: User | null
  loading: boolean
  error: string | null
  refreshSession: () => Promise<void>
}

const SupabaseContext = createContext<SupabaseContextType>({
  user: null,
  loading: true,
  error: null,
  refreshSession: async () => {}
})

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      setLoading(true)
      setError(null)
      
      try {
        console.log('Initializing Supabase auth session...')
        const { data: { session }, error: sessionError } = await supabaseService.supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Error getting auth session:', sessionError)
          setError(sessionError.message)
          return
        }
        
        if (session?.user) {
          console.log('User authenticated:', session.user.email)
          setUser(session.user)
        } else {
          console.log('No authenticated user found')
          setUser(null)
        }
      } catch (error) {
        console.error('Exception initializing auth:', error)
        setError(error instanceof Error ? error.message : 'Unknown authentication error')
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabaseService.supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event)
      
      if (event === 'SIGNED_IN' && session?.user) {
        console.log('User signed in:', session.user.email)
        setUser(session.user)
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out')
        setUser(null)
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        console.log('Token refreshed for user:', session.user.email)
        setUser(session.user)
      } else if (event === 'USER_UPDATED' && session?.user) {
        console.log('User updated:', session.user.email)
        setUser(session.user)
      }
      
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [refreshKey])

  // Function to refresh the user session
  const refreshSession = async () => {
    setLoading(true)
    try {
      console.log('Manually refreshing user session...')
      const { data, error } = await supabaseService.supabase.auth.refreshSession()
      
      if (error) {
        console.error('Error refreshing session:', error)
        setError(error.message)
        return
      }
      
      if (data.session?.user) {
        console.log('Session refreshed for user:', data.session.user.email)
        setUser(data.session.user)
      } else {
        console.log('No active session found during refresh')
        setUser(null)
      }
    } catch (error) {
      console.error('Exception refreshing session:', error)
      setError(error instanceof Error ? error.message : 'Unknown error refreshing session')
    } finally {
      setLoading(false)
      // Increment refresh key to trigger a new effect run
      setRefreshKey(prev => prev + 1)
    }
  }

  return (
    <SupabaseContext.Provider value={{ user, loading, error, refreshSession }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => {
  return useContext(SupabaseContext)
} 