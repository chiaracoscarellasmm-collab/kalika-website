import type { GiftCardRecord } from "./giftcard";
import { getGiftCardUi } from "./giftcard-ui";

const designLabels = {
  it: { estetica: "Estetica", spa: "SPA & Rituali", coppia: "Coppia" },
  en: { estetica: "Beauty", spa: "SPA & Rituals", coppia: "Couple" },
} as const;

function formatDate(value: string, locale: GiftCardRecord["locale"]) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function formatAmount(amount: number, locale: GiftCardRecord["locale"]) {
  return amount.toLocaleString(locale === "it" ? "it-IT" : "en-GB", {
    style: "currency",
    currency: "EUR",
  });
}

function summaryRows(record: GiftCardRecord): Array<{ label: string; value: string }> {
  const ui = getGiftCardUi(record.locale);
  const buyerName = `${record.fromFirstName} ${record.fromLastName}`;
  const recipientName = `${record.toFirstName} ${record.toLastName}`;

  const rows: Array<{ label: string; value: string }> = [
    { label: ui.codeLabel, value: record.serial },
    { label: ui.summaryAmount, value: formatAmount(record.amount, record.locale) },
    { label: ui.summaryFrom, value: buyerName },
    { label: ui.summaryTo, value: recipientName },
    { label: record.locale === "it" ? "Email acquirente" : "Buyer email", value: record.buyerEmail },
    {
      label: record.locale === "it" ? "Design" : "Design",
      value: designLabels[record.locale][record.design],
    },
  ];

  if (record.treatmentName) {
    rows.splice(2, 0, { label: ui.summaryTreatment, value: record.treatmentName });
  }

  rows.push(
    { label: ui.summaryPurchaseDate, value: formatDate(record.issuedAt, record.locale) },
    { label: ui.summaryExpiryDate, value: formatDate(record.validUntil, record.locale) },
  );

  if (record.message.trim()) {
    rows.push({
      label: record.locale === "it" ? "Messaggio" : "Message",
      value: record.message.trim(),
    });
  }

  return rows;
}

function summarySheetHtml(
  record: GiftCardRecord,
  options: { title: string; intro: string },
): string {
  const rows = summaryRows(record)
    .map(
      (row) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#9b5e8a;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;vertical-align:top;width:38%;">
            ${row.label}
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#2c1810;font-size:15px;line-height:1.5;vertical-align:top;">
            ${row.value}
          </td>
        </tr>`,
    )
    .join("");

  return `
    <div style="font-family:Avenir,Montserrat,Arial,sans-serif;color:#2c1810;max-width:640px;">
      <p style="margin:0 0 8px;font-size:15px;line-height:1.6;">${options.intro}</p>
      <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:24px;font-weight:400;color:#6b3a2a;">
        ${options.title}
      </h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid rgba(201,123,178,0.25);background:#faf7f2;">
        <tbody>${rows}</tbody>
      </table>
      <p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:rgba(44,24,16,0.65);">
        ${
          record.locale === "it"
            ? "In allegato trovi il PDF della Gift Card da stampare o inoltrare."
            : "The Gift Card PDF is attached for printing or forwarding."
        }
      </p>
    </div>`;
}

export function buyerGiftCardEmailHtml(record: GiftCardRecord): string {
  const buyerName = `${record.fromFirstName} ${record.fromLastName}`;
  return summarySheetHtml(record, {
    title: record.locale === "it" ? "La tua Gift Card Kalika" : "Your Kalika Gift Card",
    intro:
      record.locale === "it"
        ? `Ciao ${buyerName}, ecco il riepilogo della Gift Card acquistata. Conserva il codice <strong>${record.serial}</strong> per prenotare o regalare il trattamento.`
        : `Hi ${buyerName}, here is the summary of your purchased Gift Card. Keep code <strong>${record.serial}</strong> to book or gift the treatment.`,
  });
}

export function ownerGiftCardEmailHtml(record: GiftCardRecord): string {
  const buyerName = `${record.fromFirstName} ${record.fromLastName}`;
  return summarySheetHtml(record, {
    title: `Nuova Gift Card venduta — ${record.serial}`,
    intro: `Nuovo acquisto Gift Card da <strong>${buyerName}</strong> (${record.buyerEmail}).`,
  });
}
