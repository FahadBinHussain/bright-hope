/**
 * Utility for tracking pending donations before they are completed
 * This provides a reliable way to associate payments with users even if
 * the payment processor doesn't return all metadata
 */

import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Creates a record of a pending donation
 */
export async function createPendingDonation(data: {
  orderId: string;
  userId: string;
  amount: number;
  campaignId?: string;
}) {
  try {
    // Create a pending donation record in Supabase
    const { data: pendingDonation, error } = await supabase
      .from('pending_donations')
      .insert({
        payment_intent_id: data.orderId,
        user_id: data.userId,
        amount: data.amount,
        campaign_id: data.campaignId,
        created_at: new Date().toISOString(),
        processed: false
      })
      .select()
      .single();
      
    if (error) {
      throw error;
    }
    
    console.log(`[PendingDonation] Created pending donation record: ${pendingDonation.id}`);
    return pendingDonation;
  } catch (error) {
    console.error(`[PendingDonation] Error creating pending donation:`, error);
    // Fall back to the payment store if there's an error
    return null;
  }
}

/**
 * Retrieves a pending donation by order ID
 */
export async function getPendingDonationByOrderId(orderId: string) {
  try {
    const { data: pendingDonation, error } = await supabase
      .from('pending_donations')
      .select('*')
      .eq('payment_intent_id', orderId)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') { // Record not found error
        console.log(`[PendingDonation] No pending donation found for order ID: ${orderId}`);
        return null;
      }
      throw error;
    }
    
    if (pendingDonation) {
      console.log(`[PendingDonation] Found pending donation for order ID: ${orderId}`);
    }
    
    return pendingDonation;
  } catch (error) {
    console.error(`[PendingDonation] Error retrieving pending donation:`, error);
    return null;
  }
}

/**
 * Deletes a pending donation after it has been processed
 */
export async function deletePendingDonation(id: string) {
  try {
    const { error } = await supabase
      .from('pending_donations')
      .delete()
      .eq('id', id);
      
    if (error) {
      throw error;
    }
    
    console.log(`[PendingDonation] Deleted pending donation: ${id}`);
    return true;
  } catch (error) {
    console.error(`[PendingDonation] Error deleting pending donation:`, error);
    return false;
  }
} 