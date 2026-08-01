import { Resend } from "resend";
import Stripe from "stripe";
import {
  addMonths,
  deriveGiftCardSerial,
  giftCardValidityMonths,
  isValidGiftCardRequest,
  type GiftCardRecord,
  type GiftCardRequest,
} from "./giftcard";
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

function getStripe(): Stripe {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) throw new Error("STRIPE_NOT_CONFIGURED");
  return new Stripe(secret);
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

/**
 * Builds the gift card record straight from the Stripe Checkout Session and
 * its Payment Intent. Stripe is the only source of truth: there is nothing
 * persisted locally that could drift out of sync with it (or, on a
 * serverless deploy, silently fail to persist at all).
 */
async function buildRecord(
  session: Stripe.Checkout.Session,
  paymentIntent: Stripe.PaymentIntent,
): Promise<GiftCardRecord> {
  const request = metadataToRequest(session.metadata);
  const issuedAt = new Date(session.created * 1000);
  const serial =
    paymentIntent.metadata.giftCardSerial ||
    deriveGiftCardSerial(paymentIntent.id, issuedAt);

  return {
    ...request,
    id: paymentIntent.id,
    serial,
    stripeSessionId: session.id,
    paymentIntentId: paymentIntent.id,
    issuedAt: issuedAt.toISOString(),
    validUntil: addMonths(issuedAt, giftCardValidityMonths).toISOString(),
    status: paymentIntent.metadata.giftCardFulfilled === "true" ? "fulfilled" : "paid",
  };
}

export async function fulfillGiftCardFromSession(
  session: Stripe.Checkout.Session,
): Promise<GiftCardRecord> {
  if (session.payment_status !== "paid") {
    throw new Error("Checkout session is not paid");
  }

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;
  if (!paymentIntentId) {
    throw new Error("Checkout session has no payment intent");
  }

  const stripe = getStripe();
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  const record = await buildRecord(session, paymentIntent);

  // Idempotent: Stripe can retry the webhook, and the thank-you page can
  // also trigger fulfillment if the webhook hasn't landed yet. The flag
  // lives on the payment intent itself — not in a file — so it survives
  // exactly as long as the payment does.
  if (paymentIntent.metadata.giftCardFulfilled === "true") {
    return record;
  }

  const pdf = await generateGiftCardPdf(record);

  // Emails must not block fulfillment if Resend fails.
  await sendGiftCardEmails(record, pdf);

  await stripe.paymentIntents.update(paymentIntentId, {
    metadata: {
      ...paymentIntent.metadata,
      giftCardFulfilled: "true",
      giftCardSerial: record.serial,
    },
  });

  return { ...record, status: "fulfilled" };
}
