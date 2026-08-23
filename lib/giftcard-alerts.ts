import "server-only";
import Stripe from "stripe";
import { Resend } from "resend";
import {
  giftCardErrorNotificationHtml,
  giftCardErrorNotificationSubject,
  type GiftCardAlertSource,
} from "./giftcard-emails";

/**
 * Technical alert only — deliberately separate from KALIKA_NOTIFICATION_EMAIL
 * (the owner's sales inbox). A stack trace has no business landing there.
 */
const ERROR_NOTIFICATION_EMAIL = "chiaracoscarella.smm@gmail.com";

/**
 * Best-effort alert for a failed gift card fulfillment. Fully isolated in
 * its own try/catch: a Resend outage must never surface as an exception to
 * the caller, only ever as a returned `false`. Returns whether the email was
 * actually sent, so callers that need to deduplicate repeated alerts (see
 * lib/giftcard-resolve.ts) know when it is safe to record that.
 */
export async function sendGiftCardErrorNotification(params: {
  session: Stripe.Checkout.Session;
  eventId?: string;
  error: unknown;
  source: GiftCardAlertSource;
}): Promise<boolean> {
  const { session, eventId, error, source } = params;
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const from = process.env.RESEND_FROM_EMAIL?.trim();
    if (!apiKey || !from) {
      console.error(
        "[giftcard-alerts] Cannot send error notification: RESEND_API_KEY or RESEND_FROM_EMAIL is not configured.",
      );
      return false;
    }

    const err = error instanceof Error ? error : new Error(String(error));
    const metadata = session.metadata ?? {};
    const amountLabel =
      typeof session.amount_total === "number"
        ? (session.amount_total / 100).toLocaleString("it-IT", {
            style: "currency",
            currency: "EUR",
          })
        : metadata.amount
          ? `€ ${metadata.amount} (da metadata, non confermato da Stripe)`
          : "N/D";
    const recipientName =
      [metadata.toFirstName, metadata.toLastName].filter(Boolean).join(" ") ||
      "N/D";

    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to: ERROR_NOTIFICATION_EMAIL,
      subject: giftCardErrorNotificationSubject(),
      html: giftCardErrorNotificationHtml({
        source,
        sessionId: session.id,
        eventId,
        amountLabel,
        buyerEmail: metadata.buyerEmail || session.customer_email || "N/D",
        recipientName,
        treatmentName: metadata.treatmentName || undefined,
        errorMessage: err.message,
        errorStack: err.stack ?? "(nessuno stack trace disponibile)",
        occurredAt: new Date(),
      }),
    });

    if (result.error) {
      console.error(
        "[giftcard-alerts] Error notification send error:",
        result.error,
      );
      return false;
    }

    return true;
  } catch (notificationError) {
    console.error(
      "[giftcard-alerts] Failed to send error notification email:",
      notificationError,
    );
    return false;
  }
}
