import Stripe from "stripe";
import { isValidGiftCardRequest } from "@/lib/giftcard";
import { validateGiftCardParams } from "@/lib/gift-selection";
import { isLocale } from "@/lib/i18n";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return Response.json({ error: "STRIPE_NOT_CONFIGURED" }, { status: 500 });
  }

  const body = await request.json();

  if (typeof body.locale !== "string" || !isLocale(body.locale)) {
    return Response.json({ error: "INVALID_REQUEST" }, { status: 400 });
  }

  // Treatment-linked gift cards: never trust the client-submitted amount.
  // The browser form locks the price field, but a direct API request
  // could send any amount alongside a treatment name. Re-derive the real
  // price from the treatment catalogue instead — the same resolution the
  // form itself uses when the page loads with a treatment in the URL.
  let amount = body.amount;
  let treatmentName = body.treatmentName;
  if (typeof body.treatmentId === "string" && body.treatmentId) {
    const resolved = validateGiftCardParams(body.treatmentId, body.locale, {
      amount: null,
      giftLabel: null,
      giftPerson: typeof body.giftPerson === "string" ? body.giftPerson : null,
      giftOperator: typeof body.giftOperator === "string" ? body.giftOperator : null,
    });
    if (!resolved) {
      return Response.json({ error: "INVALID_TREATMENT" }, { status: 400 });
    }
    amount = resolved.amount;
    treatmentName = resolved.giftLabel;
  }

  const sanitized = { ...body, amount, treatmentName };
  if (!isValidGiftCardRequest(sanitized)) {
    return Response.json({ error: "INVALID_REQUEST" }, { status: 400 });
  }

  const stripe = new Stripe(secret);
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    request.headers.get("origin") ??
    "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: sanitized.buyerEmail,
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: Math.round(sanitized.amount * 100),
          product_data: {
            name: sanitized.treatmentName
              ? `Gift Card Kalika · ${sanitized.treatmentName}`
              : `Gift Card Kalika · ${sanitized.design}`,
            description: `${sanitized.fromFirstName} ${sanitized.fromLastName} → ${sanitized.toFirstName} ${sanitized.toLastName}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      locale: sanitized.locale,
      design: sanitized.design,
      amountChoice: sanitized.amountChoice,
      amount: String(sanitized.amount),
      fromFirstName: sanitized.fromFirstName,
      fromLastName: sanitized.fromLastName,
      toFirstName: sanitized.toFirstName,
      toLastName: sanitized.toLastName,
      message: sanitized.message,
      buyerEmail: sanitized.buyerEmail,
      ...(sanitized.treatmentName ? { treatmentName: sanitized.treatmentName } : {}),
    },
    success_url: `${origin}/${sanitized.locale}/gift-card/grazie?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/${sanitized.locale}/gift-card`,
  });

  return Response.json({ url: session.url });
}
