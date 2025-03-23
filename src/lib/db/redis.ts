import { Redis } from '@upstash/redis';

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('Missing Upstash Redis environment variables');
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default redis;

// Cache helpers
export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    return await redis.get(key);
  } catch (error) {
    console.error('Redis cache get error:', error);
    return null;
  }
}

// Define a type for cacheable values
export type CacheableValue = string | number | boolean | object | null;

export async function cacheSet(key: string, value: CacheableValue, expireInSeconds?: number): Promise<void> {
  try {
    // Convert non-string values to JSON strings
    const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
    
    if (expireInSeconds) {
      await redis.set(key, valueToStore, { ex: expireInSeconds });
    } else {
      await redis.set(key, valueToStore);
    }
  } catch (error) {
    console.error('Redis cache set error:', error);
  }
}

export async function cacheDelete(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch (error) {
    console.error('Redis cache delete error:', error);
  }
}

// Analytics helpers
export async function incrementCounter(key: string, amount: number = 1): Promise<number> {
  try {
    return await redis.incrby(key, amount);
  } catch (error) {
    console.error('Redis increment error:', error);
    return 0;
  }
}

export async function getCounter(key: string): Promise<number> {
  try {
    const value = await redis.get<number>(key);
    return value || 0;
  } catch (error) {
    console.error('Redis get counter error:', error);
    return 0;
  }
}

export async function trackDonation(amount: number, campaignId?: string): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  
  // Increment total donations for today
  await incrementCounter(`donations:total:${today}`, 1);
  
  // Increment total amount donated today
  await incrementCounter(`donations:amount:${today}`, amount);
  
  // If campaign-specific, track for that campaign
  if (campaignId) {
    await incrementCounter(`campaign:${campaignId}:donations:total`, 1);
    await incrementCounter(`campaign:${campaignId}:donations:amount`, amount);
  }
}

export async function getDonationStats(period: 'day' | 'week' | 'month' | 'all' = 'all'): Promise<{
  totalDonations: number;
  totalAmount: number;
}> {
  const today = new Date().toISOString().split('T')[0];
  
  if (period === 'day') {
    const totalDonations = await getCounter(`donations:total:${today}`);
    const totalAmount = await getCounter(`donations:amount:${today}`);
    return { totalDonations, totalAmount };
  }
  
  // For other periods, we would need to aggregate data from multiple days
  // This is a simplified implementation
  return {
    totalDonations: await getCounter('donations:total:all'),
    totalAmount: await getCounter('donations:amount:all'),
  };
} 