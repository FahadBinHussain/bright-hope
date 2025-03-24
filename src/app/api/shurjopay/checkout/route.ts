import { NextRequest, NextResponse } from "next/server";
import { createPayment } from "@/lib/api/shurjopay";
import { createClient } from '@supabase/supabase-js';
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { storePaymentMetadata } from "@/lib/api/payment-store";
import { createPendingDonation } from "@/lib/db/pendingDonations";

// Validation schema for the request body
const checkoutSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().optional(),
  campaignId: z.string().optional(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

export async function POST(req: NextRequest) {
  try {
    // Check authentication with Supabase
    // Get authorization header with the JWT token from the request
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    
    // Extract the token
    const token = authHeader.replace('Bearer ', '');
    
    // Create a Supabase client for server-side
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    // Verify the JWT token
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      console.error("Auth error:", error);
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const result = checkoutSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: result.error.format() },
        { status: 400 }
      );
    }

    const { amount, campaignId, successUrl } = result.data;

    // Create a unique order ID
    const orderId = `${process.env.SP_PREFIX || 'SP'}-${uuidv4().slice(0, 8)}`;
    
    // Create the final success URL with the order ID appended as a query parameter
    // Make sure the URL uses the right format with the order_id as a query parameter
    const finalSuccessUrl = new URL(successUrl);
    finalSuccessUrl.searchParams.set('order_id', orderId);
    
    console.log("Setting success URL to:", finalSuccessUrl.toString());
    
    // Create a pending donation record in the database
    // This is our most reliable way to track the association between
    // payment intent IDs and users
    try {
      await createPendingDonation({
        orderId,
        userId: user.id,
        amount,
        campaignId
      });
    } catch (pendingError) {
      console.error("Error creating pending donation record:", pendingError);
      // Continue even if this fails - we'll fall back to other methods
    }
    
    // Create ShurjoPay payment request
    const paymentResponse = await createPayment({
      amount,
      orderId,
      userName: user.user_metadata?.full_name || 'Guest User',
      userAddress: 'Not provided',
      userPhone: 'Not provided',
      userCity: 'Not provided',
      userPostcode: '1000',
      successUrl: finalSuccessUrl.toString(),
      campaignId,
      userId: user.id,
    });

    // Also store payment metadata as a fallback
    await storePaymentMetadata(paymentResponse.sp_order_id, {
      userId: user.id,
      campaignId,
      amount,
      orderId: paymentResponse.sp_order_id,
      createdAt: Date.now()
    });

    console.log("ShurjoPay checkout response:", {
      orderId: paymentResponse.sp_order_id,
      url: paymentResponse.checkout_url
    });

    return NextResponse.json({ 
      orderId: paymentResponse.sp_order_id,
      url: paymentResponse.checkout_url 
    });
    
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
} 