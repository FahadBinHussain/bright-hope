import { NextRequest, NextResponse } from "next/server";
import { verifyPayment } from "@/lib/api/shurjopay";
import { createClient } from '@supabase/supabase-js';
import { getPaymentMetadata, removePaymentMetadata } from "@/lib/api/payment-store";

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    // Get order ID from request body
    const body = await req.json();
    const { order_id } = body;

    if (!order_id) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[Webhook] Processing donation with order_id: ${order_id}`);

    // Verify payment status
    const paymentDetails = await verifyPayment(order_id);
    
    // Check if verification was successful
    if (!Array.isArray(paymentDetails) || paymentDetails.length === 0) {
      console.error(`[Webhook] Invalid payment verification response for order_id: ${order_id}`, paymentDetails);
      return NextResponse.json(
        { error: "Invalid payment verification response" },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const payment = paymentDetails[0];
    console.log(`[Webhook] Raw payment verification response:`, JSON.stringify(paymentDetails));
    
    console.log(`[Webhook] Payment verification successful for order_id: ${order_id}`, {
      status: payment.sp_status,
      amount: payment.amount,
      value1: payment.value1,
      allValues: {
        value1: payment.value1,
        value2: payment.value2,
        value3: payment.value3,
        value4: payment.value4
      }
    });
    
    // Extract metadata from value fields
    let userId = payment.value1;
    const campaignId = payment.value2 || null;
    
    // If userId is missing, first check for a pending donation record
    if (!userId) {
      console.log(`[Webhook] User ID missing in payment data, checking payment store for order_id: ${order_id}`);
      
      try {
        // Try the payment store instead of Prisma
        console.log(`[Webhook] Checking payment store`);
        const storedMetadata = await getPaymentMetadata(order_id);
        
        if (storedMetadata?.userId) {
          userId = storedMetadata.userId;
          console.log(`[Webhook] Retrieved user ID from payment store: ${userId}`);
        } else {
          // Check existing donations in Supabase instead of Prisma
          console.log(`[Webhook] No metadata found, checking existing donations`);
          const { data: existingDonation } = await supabase
            .from('donations')
            .select('user_id')
            .eq('payment_intent_id', order_id)
            .single();
          
          if (existingDonation?.user_id) {
            userId = existingDonation.user_id;
            console.log(`[Webhook] Found user ID from existing donation: ${userId}`);
          }
        }
      } catch (lookupError) {
        console.error(`[Webhook] Error looking up payment associations:`, lookupError);
      }
    }
    
    if (!userId) {
      console.error(`[Webhook] Missing user ID in payment data for order_id: ${order_id}`);
      return NextResponse.json(
        { error: "Missing user ID in payment data" },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Process based on payment status
    if (payment.sp_status === 'completed') {
      console.log(`[Webhook] Processing completed payment for user: ${userId}`);
      
      // Create the donation in Supabase
      try {
        const { data: donationData, error: supabaseError } = await supabase
          .from('donations')
          .insert({
            amount: parseFloat(payment.amount),
            currency: 'BDT', // ShurjoPay uses BDT by default
            status: "COMPLETED",
            payment_intent_id: payment.order_id,
            receipt_url: null, // ShurjoPay doesn't provide a receipt URL
            user_id: userId,
            campaign_id: campaignId || null,
            anonymous: false,
            message: null
          })
          .select();

        if (supabaseError) {
          console.error("[Webhook] Error storing donation in Supabase:", supabaseError);
          return NextResponse.json(
            { error: `Failed to store donation: ${supabaseError.message}` },
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
        }
        
        console.log(`[Webhook] Supabase donation created successfully: ${donationData?.[0]?.id || 'unknown'}`);
      } catch (supabaseError) {
        console.error("[Webhook] Exception storing donation in Supabase:", supabaseError);
        return NextResponse.json(
          { error: `Exception storing donation: ${supabaseError instanceof Error ? supabaseError.message : 'Unknown error'}` },
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // If donation is for a campaign, update the campaign's raised amount
      if (campaignId) {
        try {
          // Get current campaign data
          const { data: campaignData, error: fetchError } = await supabase
            .from('campaigns')
            .select('raised')
            .eq('id', campaignId)
            .single();
          
          if (fetchError) {
            throw new Error(`Failed to fetch campaign: ${fetchError.message}`);
          }
          
          // Update the campaign with new raised amount
          const currentRaised = campaignData?.raised || 0;
          const newRaised = currentRaised + parseFloat(payment.amount);
          
          const { error: updateError } = await supabase
            .from('campaigns')
            .update({ raised: newRaised })
            .eq('id', campaignId);
          
          if (updateError) {
            throw new Error(`Failed to update campaign: ${updateError.message}`);
          }
          
          console.log(`[Webhook] Updated campaign ${campaignId} with amount ${payment.amount}, new total: ${newRaised}`);
        } catch (updateError) {
          console.error(`[Webhook] Error updating campaign amount:`, updateError);
          // Continue processing despite this error
        }
      }

      // Clean up stored data - remove Prisma-specific cleanup
      try {
        // Clean up from Redis store 
        await removePaymentMetadata(order_id);
      } catch (cleanupError) {
        console.error(`[Webhook] Error cleaning up temporary data:`, cleanupError);
        // Continue processing despite cleanup errors
      }
    } else if (payment.sp_status === 'failed') {
      console.log(`[Webhook] Processing failed payment for user: ${userId}`);
      // Create failed donation record in Supabase instead of Prisma
      try {
        const { error: supabaseError } = await supabase
          .from('donations')
          .insert({
            amount: parseFloat(payment.amount),
            currency: 'BDT',
            status: "FAILED",
            payment_intent_id: payment.order_id,
            user_id: userId,
            campaign_id: campaignId || null,
          });
          
        if (supabaseError) {
          console.error(`[Webhook] Error creating failed donation record:`, supabaseError);
        }
      } catch (failedError) {
        console.error(`[Webhook] Exception creating failed donation record:`, failedError);
      }

      // Clean up stored data - remove Prisma-specific cleanup
      try {
        // Clean up from Redis store
        await removePaymentMetadata(order_id);
      } catch (cleanupError) {
        console.error(`[Webhook] Error cleaning up temporary data:`, cleanupError);
      }
    } else {
      console.log(`[Webhook] Unhandled payment status: ${payment.sp_status}`);
    }

    return NextResponse.json({ 
      success: true,
      message: "Payment processed successfully",
      status: payment.sp_status
    }, { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("[Webhook] Error processing webhook:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error processing webhook" },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 