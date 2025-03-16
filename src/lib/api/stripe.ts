import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
});

export default stripe;

export async function createPaymentIntent(amount: number, currency: string = 'usd', metadata: any = {}) {
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency,
    metadata,
  });
}

export async function createCheckoutSession(params: {
  amount: number;
  currency?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: any;
  campaignId?: string;
  userId: string;
}) {
  const { amount, currency = 'usd', successUrl, cancelUrl, metadata = {}, campaignId, userId } = params;

  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: campaignId ? 'Campaign Donation' : 'General Donation',
            description: 'Thank you for your generous donation to Bright Hope',
          },
          unit_amount: Math.round(amount * 100), // Convert to cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      ...metadata,
      userId,
      campaignId: campaignId || '',
    },
  });
}

export async function retrievePaymentIntent(paymentIntentId: string) {
  return stripe.paymentIntents.retrieve(paymentIntentId);
}

export async function constructEventFromPayload(signature: string, payload: Buffer) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable');
  }

  return stripe.webhooks.constructEvent(
    payload,
    signature,
    webhookSecret
  );
} 