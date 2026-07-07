import Stripe from "stripe";
import { isValidGiftCardRequest } from "@/lib/giftcard";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return Response.json({ error: "STRIPE_NOT_CONFIGURED" }, { status: 500 });
  }

  const body = await request.json();
  if (!isValidGiftCardRequest(body)) {
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
    customer_email: body.buyerEmail,
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: Math.round(body.amount * 100),
          product_data: {
            name: body.treatmentName
              ? `Gift Card Kalika · ${body.treatmentName}`
              : `Gift Card Kalika · ${body.design}`,
            description: `${body.fromFirstName} ${body.fromLastName} → ${body.toFirstName} ${body.toLastName}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      locale: body.locale,
      design: body.design,
      amountChoice: body.amountChoice,
      amount: String(body.amount),
      fromFirstName: body.fromFirstName,
      fromLastName: body.fromLastName,
      toFirstName: body.toFirstName,
      toLastName: body.toLastName,
      message: body.message,
      buyerEmail: body.buyerEmail,
      ...(body.treatmentName ? { treatmentName: body.treatmentName } : {}),
    },
    success_url: `${origin}/${body.locale}/gift-card?session_id={CHECKOUT_SESSION_ID}&download=1`,
    cancel_url: `${origin}/${body.locale}/gift-card`,
  });

  return Response.json({ url: session.url });
}
