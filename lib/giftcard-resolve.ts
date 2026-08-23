import "server-only";
import Stripe from "stripe";
import type { GiftCardRecord } from "./giftcard";
import { fulfillGiftCardFromSession } from "./giftcard-fulfillment";
import { sendGiftCardErrorNotification } from "./giftcard-alerts";
import type { GiftCardAlertSource } from "./giftcard-emails";

/**
 * Marks, on the Checkout Session's own metadata, that a resolve-failure
 * alert has already been sent for it. This path (unlike the bounded Stripe
 * webhook retries) can be hit repeatedly by page reloads or the back
 * button, so it needs its own dedup key — separate from any webhook-side
 * bookkeeping.
 */
const RESOLVE_ALERT_SENT_METADATA_KEY = "giftCardResolveAlertSent";

/**
 * Resolves a paid gift card from a Stripe Checkout session id.
 * Fulfills the order if the webhook hasn't landed yet — idempotent, see
 * lib/giftcard-fulfillment.ts.
 *
 * Session lookup failures and unpaid/incomplete sessions are expected
 * traffic (bad URLs, abandoned checkouts, back-button navigation) and stay
 * silent. An alert is only ever sent when Stripe confirms the session was
 * genuinely paid but fulfillment itself failed.
 */
export async function resolveGiftCardFromCheckoutSession(
  sessionId: string,
  source: GiftCardAlertSource,
): Promise<GiftCardRecord | null> {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return null;

  const stripe = new Stripe(secret);

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }

  if (session.payment_status !== "paid") {
    return null;
  }

  try {
    return await fulfillGiftCardFromSession(session);
  } catch (error) {
    console.error(
      "[giftcard-resolve] Fulfillment failed for a paid session:",
      error,
    );
    await notifyResolveFailureOnce(stripe, session, error, source);
    return null;
  }
}

/**
 * Sends the resolve-failure alert at most once per Checkout Session. The
 * "already sent" flag is written to Stripe's own session metadata — the
 * same persistent-external-state pattern already used for fulfillment
 * idempotency — rather than any Vercel Function memory, which is not
 * reliable across invocations. Isolated in its own try/catch: neither a
 * failed send nor a failed metadata update may propagate and mask the
 * original fulfillment error.
 */
async function notifyResolveFailureOnce(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
  error: unknown,
  source: GiftCardAlertSource,
): Promise<void> {
  try {
    if (session.metadata?.[RESOLVE_ALERT_SENT_METADATA_KEY] === "true") {
      return;
    }

    const sent = await sendGiftCardErrorNotification({ session, error, source });
    if (!sent) return;

    await stripe.checkout.sessions.update(session.id, {
      metadata: {
        ...(session.metadata ?? {}),
        [RESOLVE_ALERT_SENT_METADATA_KEY]: "true",
      },
    });
  } catch (notifyError) {
    console.error(
      "[giftcard-resolve] Failed to record/send the resolve-failure alert:",
      notifyError,
    );
  }
}
