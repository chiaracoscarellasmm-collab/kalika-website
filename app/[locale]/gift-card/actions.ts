"use server";

import { isValidRequest, type GiftCardRequest } from "@/lib/giftcard";

export type CheckoutResult =
  | { ok: true; url: string }
  | { ok: false; error: string };

/**
 * Stripe checkout session creator.
 *
 * Requires the following env vars:
 *   STRIPE_SECRET_KEY
 *   STRIPE_WEBHOOK_SECRET   (consumed by /api/stripe/webhook)
 *   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
 *   RESEND_API_KEY          (post-payment email)
 *
 * The webhook route /api/stripe/webhook should:
 *   1. verify the signature
 *   2. on `checkout.session.completed`, generate the PDF gift card
 *      with puppeteer-core + @sparticuz/chromium
 *   3. send the PDF via Resend to the buyer + an order summary to Sabina
 */
export async function createGiftCardCheckout(
  raw: Partial<GiftCardRequest>,
): Promise<CheckoutResult> {
  if (!isValidRequest(raw)) {
    return { ok: false, error: "INVALID_REQUEST" };
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return { ok: false, error: "STRIPE_NOT_CONFIGURED" };
  }

  // TODO: wire up the real Stripe checkout session here.
  // Pseudocode (kept in code, not executed, until Stripe is installed):
  //
  //   import Stripe from "stripe";
  //   const stripe = new Stripe(secret);
  //   const session = await stripe.checkout.sessions.create({
  //     mode: "payment",
  //     payment_method_types: ["card"],
  //     line_items: [{
  //       price_data: {
  //         currency: "eur",
  //         product_data: {
  //           name: `Gift Card Kalika · ${raw.formula}`,
  //           description: `${raw.fromName} → ${raw.toName}`,
  //         },
  //         unit_amount: raw.amount * 100,
  //       },
  //       quantity: 1,
  //     }],
  //     metadata: {
  //       formula: raw.formula,
  //       fromName: raw.fromName,
  //       toName: raw.toName,
  //       message: raw.message,
  //       locale: raw.locale,
  //     },
  //     success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/${raw.locale}/gift-card/success?session_id={CHECKOUT_SESSION_ID}`,
  //     cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/${raw.locale}/gift-card`,
  //   });
  //   return { ok: true, url: session.url ?? "" };

  return { ok: false, error: "STRIPE_NOT_IMPLEMENTED" };
}
