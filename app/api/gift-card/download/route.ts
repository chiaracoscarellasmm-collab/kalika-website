import Stripe from "stripe";
import { findGiftCardByStripeSession } from "@/lib/giftcard-store";
import { fulfillGiftCardFromSession } from "@/lib/giftcard-fulfillment";
import { generateGiftCardPdf } from "@/lib/giftcard-pdf";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return Response.json({ error: "MISSING_SESSION_ID" }, { status: 400 });
  }

  let record = await findGiftCardByStripeSession(sessionId);

  if (!record) {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return Response.json({ error: "STRIPE_NOT_CONFIGURED" }, { status: 500 });
    }
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    record = await fulfillGiftCardFromSession(session);
  }

  const pdf = await generateGiftCardPdf(record);

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="gift-card-${record.serial}.pdf"`,
    },
  });
}
