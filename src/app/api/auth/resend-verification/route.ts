import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const { email, type = "signup" } = await req.json();
    
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    
    // Create a Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Supabase configuration is missing" },
        { status: 500 }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Resend verification email
    const { data, error } = await supabase.auth.resend({
      type: "signup",
      email: email,
    });
    
    if (error) {
      console.error("Error resending verification:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Verification email has been resent"
    });
    
  } catch (error) {
    console.error("Auth resend verification error:", error);
    return NextResponse.json(
      { error: "Failed to resend verification email", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
} 