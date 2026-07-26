import "server-only";
import Stripe from "stripe";
import type { GiftCardRecord } from "./giftcard";
import { fulfillGiftCardFromSession } from "./giftcard-fulfillment";
import { findGiftCardByStripeSession } from "./giftcard-store";

/**
 * Resolves a paid gift card from a Stripe Checkout session id.
 * Fulfills the order if the webhook has not persisted it yet.
 */
export async function resolveGiftCardFromCheckoutSession(
  sessionId: string,
): Promise<GiftCardRecord | null> {
  try {
    const existing = await findGiftCardByStripeSession(sessionId);
    if (existing) return existing;

    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return null;

    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") return null;

    return await fulfillGiftCardFromSession(session);
  } catch {
    return null;
  }
}
