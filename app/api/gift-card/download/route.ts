import { resolveGiftCardFromCheckoutSession } from "@/lib/giftcard-resolve";
import { generateGiftCardPdf } from "@/lib/giftcard-pdf";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return Response.json({ error: "MISSING_SESSION_ID" }, { status: 400 });
  }

  const record = await resolveGiftCardFromCheckoutSession(sessionId);
  if (!record) {
    return Response.json({ error: "GIFT_CARD_NOT_FOUND" }, { status: 404 });
  }

  const pdf = await generateGiftCardPdf(record);

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="gift-card-${record.serial}.pdf"`,
    },
  });
}
