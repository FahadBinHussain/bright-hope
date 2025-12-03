'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabaseService } from '@/lib/services/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { debounce } from 'lodash'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [emailChecking, setEmailChecking] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  })

  // Debounced function to check if email exists
  const checkEmailExists = useCallback(
    debounce(async (email: string) => {
      if (!email || !email.includes('@') || email.length < 5) return;
      
      setEmailChecking(true);
      try {
        const exists = await supabaseService.checkEmailExists(email);
        if (exists) {
          setEmailError('This email is already registered. Please sign in instead.');
        } else {
          setEmailError(null);
        }
      } catch (err) {
        console.error('Error checking email:', err);
      } finally {
        setEmailChecking(false);
      }
    }, 500),
    []
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({ ...formData, email });
    setEmailError(null); // Clear error when email changes
    
    if (email) {
      checkEmailExists(email);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Don't submit if there's an email error
    if (emailError) {
      return;
    }
    
    setLoading(true)
    setError(null)

    try {
      // Check once more if email exists before submitting
      const emailExists = await supabaseService.checkEmailExists(formData.email);
      if (emailExists) {
        setEmailError('This email is already registered. Please sign in instead.');
        setLoading(false);
        return;
      }
      
      await supabaseService.signUp(
        formData.email,
        formData.password,
        formData.fullName
      )

      // Redirect to login page after successful registration
      router.push('/auth/login?message=Check your email to confirm your account')
    } catch (error) {
      console.error('Registration error:', error)
      setError(error instanceof Error ? error.message : 'An error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleEmailChange}
                required
                className={emailError ? 'border-red-500' : ''}
              />
              {emailChecking && (
                <p className="text-xs text-gray-500">Checking email...</p>
              )}
              {emailError && (
                <p className="text-xs text-red-500">{emailError}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || emailChecking || !!emailError}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
            {emailError && (
              <Link href="/auth/login" className="text-primary hover:underline w-full text-center">
                Sign in instead
              </Link>
            )}
            <p className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 