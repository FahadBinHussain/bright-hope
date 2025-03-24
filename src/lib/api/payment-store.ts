/**
 * A simple in-memory store for payment metadata
 * This helps us recover payment data even if the webhook doesn't receive all data
 */

import { Redis } from '@upstash/redis';

// Create Redis client if configured
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Define payment metadata interface
export interface PaymentMetadata {
  userId: string;
  campaignId?: string;
  amount: number;
  orderId: string;
  createdAt: number;
}

const PREFIX = 'payment:';
const EXPIRATION = 60 * 60 * 24; // 24 hours in seconds

/**
 * Stores payment metadata for an order
 */
export async function storePaymentMetadata(orderId: string, metadata: PaymentMetadata): Promise<boolean> {
  try {
    if (redis) {
      // Store in Redis with expiration
      await redis.set(`${PREFIX}${orderId}`, JSON.stringify(metadata), { ex: EXPIRATION });
      console.log(`[PaymentStore] Stored metadata for order ${orderId} in Redis`);
    } else {
      console.log(`[PaymentStore] Redis not configured, cannot store metadata for order ${orderId}`);
    }
    return true;
  } catch (error) {
    console.error(`[PaymentStore] Error storing metadata for order ${orderId}:`, error);
    return false;
  }
}

/**
 * Retrieves payment metadata for an order
 */
export async function getPaymentMetadata(orderId: string): Promise<PaymentMetadata | null> {
  try {
    if (!redis) {
      console.log(`[PaymentStore] Redis not configured, cannot retrieve metadata for order ${orderId}`);
      return null;
    }
    
    const data = await redis.get<string>(`${PREFIX}${orderId}`);
    if (!data) {
      console.log(`[PaymentStore] No metadata found for order ${orderId}`);
      return null;
    }
    
    return JSON.parse(data) as PaymentMetadata;
  } catch (error) {
    console.error(`[PaymentStore] Error retrieving metadata for order ${orderId}:`, error);
    return null;
  }
}

/**
 * Removes payment metadata for an order
 */
export async function removePaymentMetadata(orderId: string): Promise<boolean> {
  try {
    if (!redis) {
      console.log(`[PaymentStore] Redis not configured, cannot remove metadata for order ${orderId}`);
      return false;
    }
    
    await redis.del(`${PREFIX}${orderId}`);
    console.log(`[PaymentStore] Removed metadata for order ${orderId}`);
    return true;
  } catch (error) {
    console.error(`[PaymentStore] Error removing metadata for order ${orderId}:`, error);
    return false;
  }
} 