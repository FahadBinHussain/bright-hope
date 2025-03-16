import { NextRequest, NextResponse } from "next/server";
import { constructEventFromPayload } from "@/lib/api/stripe";
import prisma from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  try {
    const event = await constructEventFromPayload(signature, Buffer.from(payload));

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;
        const { userId, campaignId } = session.metadata;

        // Create donation record
        const donation = await prisma.donation.create({
          data: {
            amount: session.amount_total / 100, // Convert from cents
            currency: session.currency.toUpperCase(),
            status: "COMPLETED",
            paymentIntentId: session.payment_intent,
            receiptUrl: session.receipt_url,
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
        const paymentIntent = event.data.object as any;
        
        // Update donation status if it exists
        if (paymentIntent.id) {
          await prisma.donation.updateMany({
            where: { paymentIntentId: paymentIntent.id },
            data: {
              status: "COMPLETED",
              receiptUrl: paymentIntent.charges?.data[0]?.receipt_url,
            },
          });
        }
        
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as any;
        
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