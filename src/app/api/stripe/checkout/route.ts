import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { createCheckoutSession } from "@/lib/api/stripe";
import { authOptions } from "@/lib/auth/auth-options";
import { z } from "zod";

// Validation schema for the request body
const checkoutSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().optional(),
  campaignId: z.string().optional(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const result = checkoutSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: result.error.format() },
        { status: 400 }
      );
    }

    const { amount, currency, campaignId, successUrl, cancelUrl } = result.data;

    // Create Stripe checkout session
    const checkoutSession = await createCheckoutSession({
      amount,
      currency,
      campaignId,
      successUrl,
      cancelUrl,
      userId: session.user.id,
    });

    return NextResponse.json({ sessionId: checkoutSession.id, url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
} 