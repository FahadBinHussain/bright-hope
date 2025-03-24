import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    
    // Create a Supabase client (using the same credentials as your client-side app)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Supabase configuration is missing" },
        { status: 500 }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Try to sign in with OTP (passwordless) to check if the account exists
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Don't actually send the email, just check status
        shouldCreateUser: false
      }
    });
    
    if (error) {
      // Different error types can help diagnose the issue
      if (error.message.includes('Email not confirmed')) {
        return NextResponse.json({
          exists: true,
          email_confirmed: false,
          message: "Email not confirmed"
        });
      } else if (error.message.includes('Invalid login credentials')) {
        return NextResponse.json({
          exists: false,
          message: "Email not found"
        });
      } else {
        return NextResponse.json({
          error: error.message,
          status: error.status
        });
      }
    }
    
    return NextResponse.json({
      exists: true,
      message: "Account exists and is ready for login"
    });
    
  } catch (error) {
    console.error("Auth debug error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
} 