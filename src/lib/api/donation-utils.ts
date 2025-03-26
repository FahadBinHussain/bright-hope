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
 * @param timeWindowSeconds Time window to check for duplicates (default: 10 seconds)
 * @returns Boolean indicating if a duplicate was found and the duplicate donations
 */
export async function checkForDuplicateDonation(
  userId: string,
  amount: number,
  timeWindowSeconds: number = 1
): Promise<{ isDuplicate: boolean; duplicates: Donation[] }> {
  try {
    const timeWindowAgo = new Date();
    timeWindowAgo.setSeconds(timeWindowAgo.getSeconds() - timeWindowSeconds);
    
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