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
import {
  buyerGiftCardEmailHtml,
  buyerGiftCardEmailSubject,
  ownerGiftCardEmailHtml,
  ownerGiftCardEmailSubject,
} from "./giftcard-emails";

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
    treatmentName: metadata?.treatmentName || undefined,
  };

  if (!isValidGiftCardRequest(raw)) {
    throw new Error("Invalid gift card metadata");
  }

  return raw;
}

function getResendFrom(): string | null {
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  return from || null;
}

function getKalikaNotificationEmail(): string | null {
  const email = process.env.KALIKA_NOTIFICATION_EMAIL?.trim();
  return email || null;
}

async function sendOneEmail(options: {
  resend: Resend;
  from: string;
  to: string;
  subject: string;
  html: string;
  pdf: Buffer;
  serial: string;
  kind: "buyer" | "owner";
}) {
  try {
    const result = await options.resend.emails.send({
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      attachments: [
        {
          filename: `gift-card-${options.serial}.pdf`,
          content: options.pdf,
        },
      ],
    });

    if (result.error) {
      console.error(
        `[giftcard-email] ${options.kind} send error for ${options.serial}:`,
        result.error,
      );
      return;
    }
  } catch (error) {
    console.error(
      `[giftcard-email] ${options.kind} send failed for ${options.serial}:`,
      error,
    );
  }
}

/**
 * Sends buyer + Kalika notification emails. Failures are logged only —
 * they must never block gift-card fulfillment / PDF download.
 */
export async function sendGiftCardEmails(
  record: GiftCardRecord,
  pdf: Buffer,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = getResendFrom();

  if (!apiKey || !from) {
    console.warn(
      "[giftcard-email] Skipping email send: RESEND_API_KEY or RESEND_FROM_EMAIL is not configured.",
    );
    return;
  }

  const resend = new Resend(apiKey);

  await sendOneEmail({
    resend,
    from,
    to: record.buyerEmail,
    subject: buyerGiftCardEmailSubject(record),
    html: buyerGiftCardEmailHtml(record),
    pdf,
    serial: record.serial,
    kind: "buyer",
  });

  const ownerTo = getKalikaNotificationEmail();
  if (!ownerTo) {
    console.warn(
      "[giftcard-email] Skipping Kalika notification: KALIKA_NOTIFICATION_EMAIL is not configured.",
    );
    return;
  }

  await sendOneEmail({
    resend,
    from,
    to: ownerTo,
    subject: ownerGiftCardEmailSubject(record),
    html: ownerGiftCardEmailHtml(record),
    pdf,
    serial: record.serial,
    kind: "owner",
  });
}

export async function fulfillGiftCardFromSession(
  session: Stripe.Checkout.Session,
) {
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

  // Emails must not block fulfillment if Resend fails.
  await sendGiftCardEmails(record, pdf);

  await markGiftCardFulfilled(record.serial);

  return record;
}
