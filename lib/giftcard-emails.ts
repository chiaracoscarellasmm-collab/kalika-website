import type { GiftCardRecord } from "./giftcard";
import { giftCardValidityMonths } from "./giftcard";
import { getGiftCardUi } from "./giftcard-ui";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value: string, locale: "it" | "en") {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function formatAmount(amount: number, locale: "it" | "en") {
  return amount.toLocaleString(locale === "it" ? "it-IT" : "en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

function emailShell(inner: string): string {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#faf7f2;">
    <div style="font-family:Avenir,Montserrat,Arial,sans-serif;color:#2c1810;max-width:640px;margin:0 auto;padding:28px 20px;">
      ${inner}
      <p style="margin:28px 0 0;font-size:12px;line-height:1.5;color:rgba(44,24,16,0.45);">
        Kalika Nuovaestetica · Via C. Battisti, 26 · Prata di Pordenone
      </p>
    </div>
  </body>
</html>`;
}

function rowHtml(label: string, value: string) {
  return `
    <tr>
      <td style="padding:11px 14px;border-bottom:1px solid #ede4dc;color:#c97bb2;font-size:11px;letter-spacing:1.6px;text-transform:uppercase;vertical-align:top;width:38%;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:11px 14px;border-bottom:1px solid #ede4dc;color:#2c1810;font-size:15px;line-height:1.55;vertical-align:top;">
        ${value}
      </td>
    </tr>`;
}

/** Warm confirmation email to the buyer (IT/EN from record.locale). */
export function buyerGiftCardEmailHtml(record: GiftCardRecord): string {
  const locale = record.locale;
  const ui = getGiftCardUi(locale);
  const buyerName = escapeHtml(
    `${record.fromFirstName} ${record.fromLastName}`.trim(),
  );
  const recipientName = escapeHtml(
    `${record.toFirstName} ${record.toLastName}`.trim(),
  );
  const detailLabel = record.treatmentName
    ? ui.summaryTreatment
    : ui.summaryValue;
  const detailValue = record.treatmentName
    ? escapeHtml(record.treatmentName)
    : escapeHtml(formatAmount(record.amount, locale));
  const validUntil = escapeHtml(formatDate(record.validUntil, locale));
  const serial = escapeHtml(record.serial);

  const title =
    locale === "it" ? "Il tuo regalo è pronto" : "Your gift is ready";
  const greeting =
    locale === "it" ? `Ciao ${buyerName},` : `Hi ${buyerName},`;
  const intro =
    locale === "it"
      ? "grazie di cuore per il tuo acquisto. La Gift Card Kalika è stata generata ed è pronta da regalare."
      : "thank you so much for your purchase. Your Kalika Gift Card has been created and is ready to give.";
  const codeLabel = locale === "it" ? "Codice gift card" : "Gift card code";
  const booking =
    locale === "it"
      ? `Presenta questo codice in centro per prenotare il trattamento. La Gift Card è valida ${giftCardValidityMonths} mesi dalla data di acquisto.`
      : `Present this code at the centre to book the treatment. The Gift Card is valid for ${giftCardValidityMonths} months from the purchase date.`;
  const attachmentNote =
    locale === "it"
      ? "In allegato trovi il PDF della Gift Card da stampare o inoltrare."
      : "The Gift Card PDF is attached for printing or forwarding.";

  return emailShell(`
    <p style="margin:0 0 6px;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#c97bb2;">
      Kalika Nuovaestetica
    </p>
    <h1 style="margin:0 0 18px;font-family:Georgia,serif;font-size:28px;font-weight:400;color:#6b3a2a;line-height:1.25;">
      ${title}
    </h1>
    <p style="margin:0 0 10px;font-size:16px;line-height:1.65;">
      ${greeting}
    </p>
    <p style="margin:0 0 22px;font-size:16px;line-height:1.65;color:rgba(44,24,16,0.85);">
      ${intro}
    </p>

    <div style="margin:0 0 22px;padding:20px 18px;border:1px solid rgba(201,123,178,0.35);background:#fff;text-align:center;">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c97bb2;">
        ${codeLabel}
      </p>
      <p style="margin:0;font-family:Georgia,serif;font-size:26px;letter-spacing:2px;color:#6b3a2a;">
        ${serial}
      </p>
    </div>

    <table style="width:100%;border-collapse:collapse;border:1px solid rgba(201,123,178,0.25);background:#fff;">
      <tbody>
        ${rowHtml(ui.summaryTo, recipientName)}
        ${rowHtml(detailLabel, detailValue)}
        ${rowHtml(ui.summaryExpiryDate, validUntil)}
      </tbody>
    </table>

    <p style="margin:20px 0 0;font-size:14px;line-height:1.65;color:rgba(44,24,16,0.75);">
      ${booking}
    </p>
    <p style="margin:12px 0 0;font-size:13px;line-height:1.6;color:rgba(44,24,16,0.6);">
      ${attachmentNote}
    </p>
  `);
}

/**
 * Internal sales notification for Kalika — always Italian, full sale record.
 */
export function ownerGiftCardEmailHtml(record: GiftCardRecord): string {
  const buyerName = escapeHtml(
    `${record.fromFirstName} ${record.fromLastName}`.trim(),
  );
  const recipientName = escapeHtml(
    `${record.toFirstName} ${record.toLastName}`.trim(),
  );
  const message = record.message.trim()
    ? escapeHtml(record.message.trim())
    : "<em style=\"color:rgba(44,24,16,0.45);\">Nessun messaggio</em>";
  const valueOrTreatment = record.treatmentName
    ? escapeHtml(record.treatmentName)
    : escapeHtml(formatAmount(record.amount, "it"));
  const valueLabel = record.treatmentName ? "Trattamento" : "Importo";

  const rows = [
    rowHtml("Codice", `<strong>${escapeHtml(record.serial)}</strong>`),
    rowHtml(valueLabel, valueOrTreatment),
    rowHtml("Importo pagato", escapeHtml(formatAmount(record.amount, "it"))),
    rowHtml("Acquirente", buyerName),
    rowHtml("Email acquirente", escapeHtml(record.buyerEmail)),
    rowHtml("Destinatario", recipientName),
    rowHtml("Messaggio", message),
    rowHtml("Data di acquisto", escapeHtml(formatDate(record.issuedAt, "it"))),
    rowHtml("Valida fino al", escapeHtml(formatDate(record.validUntil, "it"))),
    rowHtml("Stripe session", escapeHtml(record.stripeSessionId)),
  ].join("");

  return emailShell(`
    <p style="margin:0 0 6px;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#c97bb2;">
      Notifica vendita
    </p>
    <h1 style="margin:0 0 12px;font-family:Georgia,serif;font-size:24px;font-weight:400;color:#6b3a2a;line-height:1.3;">
      Nuova gift card venduta — ${escapeHtml(record.serial)}
    </h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:rgba(44,24,16,0.8);">
      Acquisto completato. Di seguito il registro completo della vendita
      (conserva questa email: è il riferimento operativo della Gift Card emessa).
    </p>
    <table style="width:100%;border-collapse:collapse;border:1px solid rgba(201,123,178,0.25);background:#fff;">
      <tbody>${rows}</tbody>
    </table>
    <p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:rgba(44,24,16,0.6);">
      In allegato il PDF della Gift Card emessa.
    </p>
  `);
}

export function buyerGiftCardEmailSubject(record: GiftCardRecord): string {
  return record.locale === "it"
    ? `Gift Card Kalika pronta — ${record.serial}`
    : `Your Kalika Gift Card — ${record.serial}`;
}

export function ownerGiftCardEmailSubject(record: GiftCardRecord): string {
  return `Nuova gift card venduta — ${record.serial}`;
}

export type GiftCardAlertSource =
  | "Stripe webhook"
  | "Pagina di ringraziamento"
  | "Download Gift Card";

export type GiftCardErrorNotification = {
  source: GiftCardAlertSource;
  sessionId: string;
  /** Only present for alerts raised from the Stripe webhook. */
  eventId?: string;
  amountLabel: string;
  buyerEmail: string;
  recipientName: string;
  /** Only shown if present — a free-amount gift card has no treatment. */
  treatmentName?: string;
  errorMessage: string;
  errorStack: string;
  occurredAt: Date;
};

function formatErrorTimestamp(date: Date): string {
  const formatted = new Intl.DateTimeFormat("it-IT", {
    timeZone: "Europe/Rome",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
  return `${formatted} (Europe/Rome)`;
}

export function giftCardErrorNotificationSubject(): string {
  return "⚠️ Errore gift card Kalika";
}

/**
 * Internal technical alert sent when checkout.session.completed fails to
 * fulfil (PDF generation, Stripe metadata, etc.) — not the customer-facing
 * templates above. Deliberately not run through sanitizeForPdf: this is an
 * email, not a PDF, and the raw error text (including any emoji or unusual
 * characters in it) is exactly what is needed to diagnose the failure.
 */
export function giftCardErrorNotificationHtml(
  ctx: GiftCardErrorNotification,
): string {
  const rows = [
    rowHtml("Rilevato da", escapeHtml(ctx.source)),
    rowHtml("Sessione Stripe", `<code>${escapeHtml(ctx.sessionId)}</code>`),
    ctx.eventId
      ? rowHtml("Evento Stripe", `<code>${escapeHtml(ctx.eventId)}</code>`)
      : "",
    rowHtml("Importo", escapeHtml(ctx.amountLabel)),
    rowHtml("Email acquirente", escapeHtml(ctx.buyerEmail)),
    rowHtml("Destinatario", escapeHtml(ctx.recipientName)),
    ctx.treatmentName
      ? rowHtml("Trattamento", escapeHtml(ctx.treatmentName))
      : "",
    rowHtml("Data e ora", escapeHtml(formatErrorTimestamp(ctx.occurredAt))),
  ].join("");

  return emailShell(`
    <p style="margin:0 0 6px;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#c0392b;">
      Allerta tecnica
    </p>
    <h1 style="margin:0 0 12px;font-family:Georgia,serif;font-size:24px;font-weight:400;color:#c0392b;line-height:1.3;">
      ⚠️ Errore nella generazione di una Gift Card
    </h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:rgba(44,24,16,0.8);">
      Il pagamento su Stripe risulta completato, ma la generazione della Gift Card è fallita:
      il cliente potrebbe non aver ricevuto il PDF né l'email di conferma.
      Usa l'ID sessione qui sotto per ritrovare l'ordine su Stripe e procedere manualmente.
    </p>
    <table style="width:100%;border-collapse:collapse;border:1px solid rgba(201,123,178,0.25);background:#fff;">
      <tbody>${rows}</tbody>
    </table>
    <p style="margin:20px 0 6px;font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:#c97bb2;">
      Messaggio di errore
    </p>
    <p style="margin:0 0 16px;padding:12px 14px;background:#fff;border:1px solid rgba(201,123,178,0.25);font-size:14px;color:#2c1810;">
      ${escapeHtml(ctx.errorMessage)}
    </p>
    <p style="margin:0 0 6px;font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:#c97bb2;">
      Stack trace
    </p>
    <pre style="margin:0;padding:12px 14px;background:#2c1810;color:#f5e9e2;font-size:12px;line-height:1.5;overflow-x:auto;white-space:pre-wrap;word-break:break-word;">${escapeHtml(ctx.errorStack)}</pre>
  `);
}
