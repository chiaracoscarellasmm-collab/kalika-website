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
    frontImage: "/Gift%20card%20desert.jpg",
  },
  {
    key: "spa",
    label: "SPA & Rituali",
    gradient:
      "linear-gradient(135deg, #2c1810 0%, #6b3a2a 42%, #9b5e8a 100%)",
    textColor: "#faf7f2",
    frontImage: "/Gift%20card%20mountain.jpg",
  },
  {
    key: "coppia",
    label: "Coppia",
    gradient:
      "linear-gradient(135deg, #f6d7dc 0%, #c97bb2 48%, #8f526f 100%)",
    textColor: "#faf7f2",
    frontImage: "/Gift%20card%20seaside.jpg",
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
