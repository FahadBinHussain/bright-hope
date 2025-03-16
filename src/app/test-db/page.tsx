'use client'

import { useEffect, useState } from 'react'
import { supabaseService } from '@/lib/services/supabase'

export default function TestDB() {
  const [testResult, setTestResult] = useState<string>('Testing...')

  useEffect(() => {
    async function testConnection() {
      try {
        // Test 1: Check if we can query campaigns
        const { data: campaigns, error: campaignsError } = await supabaseService.supabase
          .from('campaigns')
          .select('*')
          .limit(1)
        
        if (campaignsError) throw campaignsError

        // Test 2: Check if we can query user_profiles
        const { data: profiles, error: profilesError } = await supabaseService.supabase
          .from('user_profiles')
          .select('*')
          .limit(1)
        
        if (profilesError) throw profilesError

        setTestResult('Database connection successful! Tables are accessible.')
      } catch (error) {
        console.error('Database test error:', error)
        setTestResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
      <div className="p-4 bg-gray-100 rounded">
        <pre className="whitespace-pre-wrap">{testResult}</pre>
      </div>
    </div>
  )
} 