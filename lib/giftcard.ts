import type { Locale } from "./i18n";

export type GiftCardDesign = "estetica" | "spa" | "coppia";
export type GiftCardAmountChoice = "50" | "100" | "150" | "custom";

export type GiftCardRequest = {
  locale: Locale;
  design: GiftCardDesign;
  amountChoice: GiftCardAmountChoice;
  amount: number;
  fromFirstName: string;
  fromLastName: string;
  toFirstName: string;
  toLastName: string;
  message: string;
  buyerEmail: string;
  /** When set, the card is linked to a specific SPA / ritual treatment. */
  treatmentName?: string;
};

export type GiftCardRecord = GiftCardRequest & {
  id: string;
  serial: string;
  stripeSessionId: string;
  paymentIntentId?: string;
  issuedAt: string;
  validUntil: string;
  status: "paid" | "fulfilled";
};

export const giftCardDesigns: Array<{
  key: GiftCardDesign;
  label: string;
  gradient: string;
  textColor: string;
  frontImage: string;
}> = [
  {
    key: "estetica",
    label: "Estetica",
    gradient:
      "linear-gradient(135deg, #faf7f2 0%, #f0e6f0 48%, #c97bb2 100%)",
    textColor: "#6b3a2a",
    frontImage: "/gift-card-deserto-kalika.jpg",
  },
  {
    key: "spa",
    label: "SPA & Rituali",
    gradient:
      "linear-gradient(135deg, #2c1810 0%, #6b3a2a 42%, #9b5e8a 100%)",
    textColor: "#faf7f2",
    frontImage: "/gift-card-montagna-kalika.jpg",
  },
  {
    key: "coppia",
    label: "Coppia",
    gradient:
      "linear-gradient(135deg, #f6d7dc 0%, #c97bb2 48%, #8f526f 100%)",
    textColor: "#faf7f2",
    frontImage: "/gift-card-mare-kalika.jpg",
  },
];

export const amountChoices: Array<{
  key: GiftCardAmountChoice;
  label: string;
  amount?: number;
}> = [
  { key: "50", label: "€50", amount: 50 },
  { key: "100", label: "€100", amount: 100 },
  { key: "150", label: "€150", amount: 150 },
  { key: "custom", label: "Importo libero" },
];

export function getGiftCardDesign(key: GiftCardDesign) {
  return giftCardDesigns.find((design) => design.key === key) ?? giftCardDesigns[0];
}

export function resolveGiftAmountChoice(amount: number): {
  amountChoice: GiftCardAmountChoice;
  customAmount: number;
} {
  const match = amountChoices.find((choice) => choice.amount === amount);
  if (match) {
    return { amountChoice: match.key, customAmount: amount };
  }
  return { amountChoice: "custom", customAmount: amount };
}

export function isGiftCardDesign(value: string | null | undefined): value is GiftCardDesign {
  return value === "estetica" || value === "spa" || value === "coppia";
}

export function isValidGiftCardRequest(
  req: Partial<GiftCardRequest>,
): req is GiftCardRequest {
  return (
    (req.locale === "it" || req.locale === "en") &&
    (req.design === "estetica" || req.design === "spa" || req.design === "coppia") &&
    (req.amountChoice === "50" ||
      req.amountChoice === "100" ||
      req.amountChoice === "150" ||
      req.amountChoice === "custom") &&
    typeof req.amount === "number" &&
    Number.isFinite(req.amount) &&
    req.amount >= 20 &&
    typeof req.fromFirstName === "string" &&
    req.fromFirstName.trim().length > 1 &&
    typeof req.fromLastName === "string" &&
    req.fromLastName.trim().length > 1 &&
    typeof req.toFirstName === "string" &&
    req.toFirstName.trim().length > 1 &&
    typeof req.toLastName === "string" &&
    req.toLastName.trim().length > 1 &&
    typeof req.message === "string" &&
    req.message.length <= 200 &&
    typeof req.buyerEmail === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.buyerEmail)
  );
}

export function addMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

/** Gift card validity in months. Single source of truth — used by both
 * fulfillment (lib/giftcard-fulfillment.ts) and the legal copy (lib/legal.ts). */
export const giftCardValidityMonths = 6;

/**
 * Derives a stable, human-readable serial straight from Stripe's own unique
 * payment intent id. Nothing is counted and nothing is persisted, so two
 * purchases completing at the exact same instant can never be assigned the
 * same serial — Stripe already guarantees payment intent ids are unique
 * across every charge on the platform.
 *
 * The suffix is truncated to 8 characters for readability. That still gives
 * ~62^8 (≈218 trillion) possible values, so an accidental collision between
 * two *different* gift cards is astronomically unlikely at this business's
 * volume — unlike a counter, which is guaranteed to collide under concurrent
 * requests, not just unlikely to.
 */
export function deriveGiftCardSerial(paymentIntentId: string, issuedAt: Date): string {
  const year = issuedAt.getFullYear();
  const suffix = paymentIntentId
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(-8)
    .toUpperCase();
  return `KLK-${year}-${suffix}`;
}
