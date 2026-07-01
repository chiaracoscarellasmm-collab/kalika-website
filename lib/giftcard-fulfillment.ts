import { Resend } from "resend";
import Stripe from "stripe";
import {
  isValidGiftCardRequest,
  type GiftCardRecord,
  type GiftCardRequest,
} from "./giftcard";
import {
  findGiftCardByStripeSession,
  markGiftCardFulfilled,
  saveGiftCardRecord,
} from "./giftcard-store";
import { generateGiftCardPdf } from "./giftcard-pdf";
import { site } from "./site";

function metadataToRequest(metadata: Stripe.Metadata | null): GiftCardRequest {
  const raw: Partial<GiftCardRequest> = {
    locale: metadata?.locale as GiftCardRequest["locale"] | undefined,
    design: metadata?.design as GiftCardRequest["design"] | undefined,
    amountChoice: metadata?.amountChoice as
      | GiftCardRequest["amountChoice"]
      | undefined,
    amount: Number(metadata?.amount),
    fromFirstName: metadata?.fromFirstName,
    fromLastName: metadata?.fromLastName,
    toFirstName: metadata?.toFirstName,
    toLastName: metadata?.toLastName,
    message: metadata?.message ?? "",
    buyerEmail: metadata?.buyerEmail,
  };

  if (!isValidGiftCardRequest(raw)) {
    throw new Error("Invalid gift card metadata");
  }

  return raw;
}

async function sendGiftCardEmails(record: GiftCardRecord, pdf: Buffer) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const resend = new Resend(apiKey);
  const attachment = {
    filename: `gift-card-${record.serial}.pdf`,
    content: pdf,
  };
  const buyerName = `${record.fromFirstName} ${record.fromLastName}`;
  const recipientName = `${record.toFirstName} ${record.toLastName}`;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "Kalika <onboarding@resend.dev>",
    to: record.buyerEmail,
    subject: "La tua Gift Card Kalika è pronta 🎁",
    html: `<p>Ciao ${buyerName},</p><p>in allegato trovi la tua Gift Card Kalika.</p><p>Codice: <strong>${record.serial}</strong></p>`,
    attachments: [attachment],
  });

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "Kalika <onboarding@resend.dev>",
    to: site.email,
    subject: `Nuova Gift Card venduta — ${record.serial}`,
    html: `
      <h1>Nuova Gift Card venduta</h1>
      <p><strong>Codice:</strong> ${record.serial}</p>
      <p><strong>Importo:</strong> € ${record.amount}</p>
      <p><strong>Design:</strong> ${record.design}</p>
      <p><strong>Acquirente:</strong> ${buyerName}</p>
      <p><strong>Email acquirente:</strong> ${record.buyerEmail}</p>
      <p><strong>Destinatario:</strong> ${recipientName}</p>
      <p><strong>Messaggio:</strong> ${record.message || "-"}</p>
    `,
    attachments: [attachment],
  });
}

export async function fulfillGiftCardFromSession(session: Stripe.Checkout.Session) {
  const existing = await findGiftCardByStripeSession(session.id);
  if (existing) return existing;

  if (session.payment_status !== "paid") {
    throw new Error("Checkout session is not paid");
  }

  const request = metadataToRequest(session.metadata);
  const record = await saveGiftCardRecord({
    ...request,
    stripeSessionId: session.id,
    paymentIntentId:
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id,
  });
  const pdf = await generateGiftCardPdf(record);
  await sendGiftCardEmails(record, pdf);
  await markGiftCardFulfilled(record.serial);

  return record;
}
