import { NextRequest, NextResponse } from "next/server";
import { constructEventFromPayload } from "@/lib/api/stripe";
import prisma from "@/lib/db/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  try {
    const event = await constructEventFromPayload(signature, Buffer.from(payload));

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const { userId, campaignId } = session.metadata || {};

        // Create donation record
        const donation = await prisma.donation.create({
          data: {
            amount: session.amount_total ? session.amount_total / 100 : 0, // Convert from cents
            currency: session.currency ? session.currency.toUpperCase() : 'USD',
            status: "COMPLETED",
            paymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : undefined,
            receiptUrl: undefined, // Will be updated when payment_intent.succeeded is triggered
            userId,
            ...(campaignId ? { campaignId } : {}),
          },
        });

        // If donation is for a campaign, update the campaign's raised amount
        if (campaignId) {
          await prisma.campaign.update({
            where: { id: campaignId },
            data: {
              raised: {
                increment: donation.amount,
              },
            },
          });
        }

        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Update donation status if it exists
        if (paymentIntent.id) {
          await prisma.donation.updateMany({
            where: { paymentIntentId: paymentIntent.id },
            data: {
              status: "COMPLETED",
              receiptUrl: paymentIntent.latest_charge ? 
                typeof paymentIntent.latest_charge === 'string' ? 
                  undefined : paymentIntent.latest_charge.receipt_url : undefined,
            },
          });
        }
        
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Update donation status if it exists
        if (paymentIntent.id) {
          await prisma.donation.updateMany({
            where: { paymentIntentId: paymentIntent.id },
            data: {
              status: "FAILED",
            },
          });
        }
        
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    return NextResponse.json(
      { error: { message: `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}` } },
      { status: 400 }
    );
  }
} 