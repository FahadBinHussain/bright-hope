import spfactory from 'shurjopay';

if (!process.env.SP_ENDPOINT || !process.env.SP_USERNAME || !process.env.SP_PASSWORD || !process.env.SP_PREFIX) {
  throw new Error('Missing ShurjoPay environment variables');
}

// Define a type for metadata
export type ShurjopayMetadata = Record<string, string>;

/**
 * Creates a payment request with ShurjoPay
 * @param params Payment parameters
 * @returns Promise with checkout URL and order ID
 */
export function createPayment(params: {
  amount: number;
  orderId: string;
  userName: string;
  userAddress?: string;
  userPhone?: string;
  userCity?: string;
  userPostcode?: string;
  successUrl?: string;
  campaignId?: string;
  userId: string;
}): Promise<{ checkout_url: string; sp_order_id: string }> {
  const {
    amount,
    orderId,
    userName,
    userAddress = 'Not provided',
    userPhone = 'Not provided',
    userCity = 'Not provided',
    userPostcode = '1000',
    successUrl,
    campaignId,
    userId
  } = params;

  // Create a new ShurjoPay instance for each request to prevent caching of configs
  const shurjopay = spfactory();
  
  // Use the success URL as return URL if provided, otherwise use the .env value
  const returnUrl = successUrl || process.env.SP_RETURN_URL || 'http://localhost:3000/main/donate/success';
  
  // Configure with the dynamic return URL
  shurjopay.config(
    process.env.SP_ENDPOINT!,
    process.env.SP_USERNAME!,
    process.env.SP_PASSWORD!,
    process.env.SP_PREFIX!,
    returnUrl
  );
  
  return new Promise((resolve, reject) => {
    const paymentData = {
      amount: amount,
      order_id: orderId,
      currency: 'BDT',
      customer_name: userName,
      customer_address: userAddress,
      customer_phone: userPhone,
      customer_city: userCity,
      customer_post_code: userPostcode,
      client_ip: '127.0.0.1',
      value1: userId,
      value2: campaignId || '',
      value3: returnUrl,
      value4: 'Not provided',
    };

    shurjopay.makePayment(
      paymentData,
      (response_data: any) => {
        resolve(response_data);
      },
      (error: any) => {
        console.error("ShurjoPay payment creation failed:", error);
        reject(error);
      }
    );
  });
}

/**
 * Verifies a payment with ShurjoPay
 * @param orderId The ShurjoPay order ID to verify
 * @returns Promise with payment verification details
 */
export function verifyPayment(orderId: string): Promise<any> {
  // Create a new ShurjoPay instance for verification
  const shurjopay = spfactory();
  
  // Configure ShurjoPay - the return URL doesn't matter for verification
  shurjopay.config(
    process.env.SP_ENDPOINT!,
    process.env.SP_USERNAME!,
    process.env.SP_PASSWORD!,
    process.env.SP_PREFIX!,
    process.env.SP_RETURN_URL || 'http://localhost:3000/main/donate/success'
  );
  
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      orderId,
      (response_data: any) => {
        resolve(response_data);
      },
      (error: any) => {
        reject(error);
      }
    );
  });
} 