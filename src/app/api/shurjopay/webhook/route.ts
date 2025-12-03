import { NextRequest, NextResponse } from "next/server";
import { verifyPayment } from "@/lib/api/shurjopay";
import { createClient } from '@supabase/supabase-js';
import { getPaymentMetadata, removePaymentMetadata } from "@/lib/api/payment-store";
import { checkForDuplicateDonation } from "@/lib/api/donation-utils";

// Simple in-memory cache to prevent duplicate processing
// This will be reset when the server restarts, but it's enough
// to handle multiple webhook calls that happen in quick succession
const PROCESSED_TRANSACTIONS = new Set<string>();

// Create Supabase client with service role
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Keep track of column existence to avoid repeated checks
let extendedColumnsExist: boolean | null = null;

// Helper function to add missing columns
async function ensureColumnsExist() {
  try {
    // Skip if we already know columns exist
    if (extendedColumnsExist === true) {
      return true;
    }
    
    // Try to directly add the columns using SQL via the REST API
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`;
    const response = await fetch(`${url}?apikey=${process.env.SUPABASE_SERVICE_ROLE_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      },
      body: JSON.stringify({
        command: `
          -- Add required columns
          ALTER TABLE public.donations ADD COLUMN IF NOT EXISTS order_id TEXT;
          ALTER TABLE public.donations ADD COLUMN IF NOT EXISTS payment_intent_id TEXT;
        `
      })
    });
    
    // Assume it worked if we got a successful response
    if (response.ok) {
      console.log('[Webhook] Successfully added missing columns');
      extendedColumnsExist = true;
      return true;
    }
    
    // Columns might already exist or we don't have permission to add them
    console.error('[Webhook] Failed to add columns, will proceed without extended fields');
    return false;
  } catch (error) {
    console.error('[Webhook] Error adding columns:', error);
    return false;
  }
}

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

    // Create an idempotency key from the request headers and order_id
    // This helps prevent duplicate processing across serverless instances
    const idempotencyKey = req.headers.get('x-idempotency-key') || 
                          req.headers.get('idempotency-key') || 
                          order_id;
                          
    // Check if this webhook was already processed using Supabase for state across instances
    try {
      const { data: processingCheck, error: processingError } = await supabase
        .from('webhook_processing')
        .select('status')
        .eq('idempotency_key', idempotencyKey)
        .single();
      
      if (processingCheck && processingCheck.status === 'completed') {
        console.log(`[Webhook] Idempotency key ${idempotencyKey} already processed, skipping`);
        return NextResponse.json({
          success: true,
          message: "Request already processed (idempotency check)",
          status: "Skipped"
        }, { headers: { 'Content-Type': 'application/json' } });
      }
      
      // Create or update processing status
      if (processingError && processingError.code === 'PGRST116') {
        // Record doesn't exist, create it
        await supabase
          .from('webhook_processing')
          .insert({
            idempotency_key: idempotencyKey,
            order_id: order_id,
            status: 'processing',
            created_at: new Date().toISOString()
          });
      } else {
        // Update to processing
        await supabase
          .from('webhook_processing')
          .update({ status: 'processing', updated_at: new Date().toISOString() })
          .eq('idempotency_key', idempotencyKey);
      }
    } catch (idempotencyError) {
      // If table doesn't exist or other error, continue processing
      console.log('[Webhook] Idempotency check error, continuing with processing:', idempotencyError);
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
    
    // IMMEDIATELY check if we've already processed this transaction
    // This is the most reliable way to prevent duplicates
    const transactionId = payment.bank_trx_id || order_id;
    if (PROCESSED_TRANSACTIONS.has(transactionId)) {
      console.log(`[Webhook] Transaction ${transactionId} already processed in this session, skipping`);
      return NextResponse.json({
        success: true,
        message: "Transaction already processed (memory cache)",
        status: payment.sp_status
      }, { headers: { 'Content-Type': 'application/json' } });
    }
    
    // Mark as processed right away to prevent race conditions
    PROCESSED_TRANSACTIONS.add(transactionId);
    
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
        const storedMetadata = await getPaymentMetadata(order_id);
        
        if (storedMetadata?.userId) {
          userId = storedMetadata.userId;
          console.log(`[Webhook] Retrieved user ID from payment store: ${userId}`);
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
    if (payment.bank_status === 'Success' && payment.sp_code === '1000') {
      console.log(`[Webhook] Processing completed payment for user: ${userId}`);
      
      // Check for duplicate donations within the time window
      const timeWindowSeconds = 10;
      const { isDuplicate, duplicates } = await checkForDuplicateDonation(
        userId, 
        parseFloat(payment.amount),
        order_id,
        timeWindowSeconds
      );
      
      if (isDuplicate) {
        console.log(`[Webhook] Found ${duplicates.length} recent identical donations within ${timeWindowSeconds} seconds. Skipping this one.`);
        return NextResponse.json({
          success: true,
          message: `Skipped duplicate donation (found ${duplicates.length} identical donations within ${timeWindowSeconds} seconds)`,
          status: payment.sp_status
        }, { headers: { 'Content-Type': 'application/json' } });
      }
      
      // Create the donation in Supabase - try 3 different approaches for reliability
      try {
        // Approach 1: Try with all fields
        try {
          // If we don't know about column existence yet, try with all fields first
          if (extendedColumnsExist !== false) {
            const donationWithAllFields = {
              amount: parseFloat(payment.amount),
              user_id: userId,
              campaign_id: campaignId || null,
              anonymous: false,
              message: null,
              order_id: order_id,
              payment_intent_id: transactionId
            };
            
            const { data, error } = await supabase
              .from('donations')
              .insert(donationWithAllFields)
              .select();
              
            if (!error) {
              // It worked! Columns exist
              extendedColumnsExist = true;
              console.log(`[Webhook] Donation created with all fields: ${data?.[0]?.id || 'unknown'}`);
              
              // If donation is for a campaign, update the campaign's raised amount
              await updateCampaignAmount(campaignId, parseFloat(payment.amount));
              
              // Return success
              return NextResponse.json({ 
                success: true,
                message: "Payment processed successfully",
                status: payment.sp_status
              }, { headers: { 'Content-Type': 'application/json' } });
            } else if (error.message.includes("order_id")) {
              // Columns don't exist, try to add them
              extendedColumnsExist = false;
              await ensureColumnsExist();
            }
          }
        } catch (approach1Error) {
          console.error("[Webhook] Error in approach 1:", approach1Error);
        }
        
        // Approach 2: Insert with only required fields
        try {
          const basicDonation = {
            amount: parseFloat(payment.amount),
            user_id: userId,
            campaign_id: campaignId || null,
            anonymous: false,
            message: null,
            order_id: order_id
          };
          
          const { data, error } = await supabase
            .from('donations')
            .insert(basicDonation)
            .select();
            
          if (!error) {
            console.log(`[Webhook] Donation created with basic fields: ${data?.[0]?.id || 'unknown'}`);
            
            // If donation is for a campaign, update the campaign's raised amount
            await updateCampaignAmount(campaignId, parseFloat(payment.amount));
            
            // Return success
            return NextResponse.json({ 
              success: true,
              message: "Payment processed successfully (basic fields only)",
              status: payment.sp_status
            }, { headers: { 'Content-Type': 'application/json' } });
          } else {
            throw error;
          }
        } catch (approach2Error) {
          console.error("[Webhook] Error in approach 2:", approach2Error);
        }
        
        // Approach 3: Last resort - use RPC
        try {
          console.log("[Webhook] Trying RPC approach as last resort");
          
          const { error } = await supabase.rpc('create_donation', {
            p_amount: parseFloat(payment.amount),
            p_user_id: userId,
            p_campaign_id: campaignId,
            p_anonymous: false,
            p_order_id: order_id
          });
          
          if (!error) {
            console.log('[Webhook] Donation created via RPC function');
            
            // If donation is for a campaign, update the campaign's raised amount
            await updateCampaignAmount(campaignId, parseFloat(payment.amount));
            
            // Return success
            return NextResponse.json({ 
              success: true,
              message: "Payment processed successfully (via RPC)",
              status: payment.sp_status
            }, { headers: { 'Content-Type': 'application/json' } });
          } else {
            throw error;
          }
        } catch (approach3Error) {
          console.error("[Webhook] Error in approach 3:", approach3Error);
          throw approach3Error;
        }
      } catch (supabaseError) {
        console.error("[Webhook] All donation creation approaches failed:", supabaseError);
        return NextResponse.json(
          { error: `Failed to store donation after multiple attempts: ${supabaseError instanceof Error ? supabaseError.message : 'Unknown error'}` },
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else {
      console.log(`[Webhook] Unhandled or failed payment status: ${payment.sp_status}`);
    }

    // At the end of successful processing, mark as completed
    try {
      await supabase
        .from('webhook_processing')
        .update({ 
          status: 'completed', 
          updated_at: new Date().toISOString(),
          completed_at: new Date().toISOString()
        })
        .eq('idempotency_key', idempotencyKey);
    } catch (updateError) {
      // Non-critical error, just log it
      console.error('[Webhook] Error updating processing status:', updateError);
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

// Helper to update campaign amounts
async function updateCampaignAmount(campaignId: string | null, amount: number) {
  if (!campaignId) return;
  
  try {
    // Get current campaign data
    const { data: campaignData, error: fetchError } = await supabase
      .from('campaigns')
      .select('current_amount')
      .eq('id', campaignId)
      .single();
    
    if (fetchError) {
      throw new Error(`Failed to fetch campaign: ${fetchError.message}`);
    }
    
    // Update the campaign with new raised amount
    const currentRaised = campaignData?.current_amount || 0;
    const newRaised = currentRaised + amount;
    
    const { error: updateError } = await supabase
      .from('campaigns')
      .update({ current_amount: newRaised })
      .eq('id', campaignId);
    
    if (updateError) {
      throw new Error(`Failed to update campaign: ${updateError.message}`);
    }
    
    console.log(`[Webhook] Updated campaign ${campaignId} with amount ${amount}, new total: ${newRaised}`);
  } catch (updateError) {
    console.error(`[Webhook] Error updating campaign amount:`, updateError);
  }
} 