import Stripe from "stripe";
import { fulfillGiftCardFromSession } from "@/lib/giftcard-fulfillment";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret || !webhookSecret) {
    return Response.json({ error: "STRIPE_NOT_CONFIGURED" }, { status: 500 });
  }

  const stripe = new Stripe(secret);
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return Response.json({ error: "MISSING_SIGNATURE" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const payload = await request.text();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid webhook";
    return Response.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await fulfillGiftCardFromSession(session);
  }

  return Response.json({ received: true });
}
