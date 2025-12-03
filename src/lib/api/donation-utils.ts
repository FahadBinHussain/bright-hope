/**
 * Utilities for handling donation logic
 */
import { createClient } from '@supabase/supabase-js';
import { Donation } from '@/lib/services/supabase';

// Create Supabase client with service role
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Checks if a donation is a potential duplicate
 * @param userId The user ID making the donation
 * @param amount The donation amount
 * @param orderId The order ID from the payment processor
 * @param timeWindowSeconds Time window to check for duplicates (default: 10 seconds)
 * @returns Boolean indicating if a duplicate was found and the duplicate donations
 */
export async function checkForDuplicateDonation(
  userId: string,
  amount: number,
  orderId: string,
  timeWindowSeconds: number = 10
): Promise<{ isDuplicate: boolean; duplicates: Donation[] }> {
  try {
    const timeWindowAgo = new Date();
    timeWindowAgo.setSeconds(timeWindowAgo.getSeconds() - timeWindowSeconds);
    
    // First check if this specific order_id already exists
    const { data: orderCheck, error: orderError } = await supabase
      .from('donations')
      .select('id')
      .eq('order_id', orderId)
      .limit(1);
      
    if (orderCheck && orderCheck.length > 0) {
      console.log(`[DonationUtils] Found existing donation with order_id: ${orderId}`);
      return {
        isDuplicate: true,
        duplicates: orderCheck as Donation[]
      };
    }
    
    // Only check for time-based duplicates if we cannot check by order_id
    // (This is a fallback for when order_id column doesn't exist yet)
    if (orderError && orderError.message.includes('order_id')) {
      console.log('[DonationUtils] Falling back to time-based duplicate check');
      const { data: recentDonations, error } = await supabase
        .from('donations')
        .select('*')
        .eq('user_id', userId)
        .eq('amount', amount)
        .gte('created_at', timeWindowAgo.toISOString());
      
      if (error) {
        console.error(`[DonationUtils] Error checking for duplicates: ${error.message}`);
        throw error;
      }
      
      return {
        isDuplicate: (recentDonations && recentDonations.length > 0),
        duplicates: recentDonations as Donation[] || []
      };
    }
    
    return {
      isDuplicate: false,
      duplicates: []
    };
  } catch (error) {
    console.error('[DonationUtils] Exception checking for duplicates:', error);
    return {
      isDuplicate: false,
      duplicates: []
    };
  }
}

/**
 * Updates database constraints to prevent duplicates
 * This is a one-time operation to fix existing duplicates and
 * add constraints to prevent future duplicates
 */
export async function setupDuplicatePrevention(): Promise<{ success: boolean, message: string }> {
  try {
    // Add a unique constraint on payment_intent_id
    const { error: constraintError } = await supabase.rpc('add_unique_payment_constraint');
    
    if (constraintError) {
      return {
        success: false,
        message: `Failed to add unique constraint: ${constraintError.message}`
      };
    }
    
    return {
      success: true,
      message: 'Successfully set up duplicate prevention measures'
    };
  } catch (error) {
    return {
      success: false,
      message: `Exception in setup: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
} 