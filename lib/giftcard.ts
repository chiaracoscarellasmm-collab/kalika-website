import type { Locale } from "./i18n";

export type Formula = "libero" | "estetico" | "spa" | "coppia";

export type FormulaOption = {
  key: Formula;
  emoji: string;
  label: { it: string; en: string };
  text: { it: string; en: string };
  fixedAmount?: number;
  amountOptions?: number[];
};

export const FORMULAS: FormulaOption[] = [
  {
    key: "libero",
    emoji: "🌸",
    label: { it: "Importo libero", en: "Free amount" },
    text: {
      it: "Scegli tu il valore, da € 50 in su.",
      en: "Choose the value, from € 50 up.",
    },
  },
  {
    key: "estetico",
    emoji: "💆",
    label: { it: "Trattamento Estetico", en: "Beauty Treatment" },
    text: {
      it: "Viso o corpo, su misura.",
      en: "Face or body, tailored.",
    },
    amountOptions: [80, 120, 180],
  },
  {
    key: "spa",
    emoji: "🧖",
    label: { it: "Rituale SPA", en: "SPA Ritual" },
    text: {
      it: "Un viaggio sensoriale in suite privata.",
      en: "A sensory journey in a private suite.",
    },
    amountOptions: [120, 180, 250],
  },
  {
    key: "coppia",
    emoji: "👫",
    label: { it: "Esperienza di Coppia", en: "Couple Experience" },
    text: {
      it: "Per due, nella nostra suite.",
      en: "For two, in our suite.",
    },
    amountOptions: [240, 360, 480],
  },
];

export type GiftCardRequest = {
  locale: Locale;
  formula: Formula;
  amount: number;
  fromName: string;
  toName: string;
  message: string;
};

export function isValidRequest(req: Partial<GiftCardRequest>): req is GiftCardRequest {
  return (
    typeof req.locale === "string" &&
    typeof req.formula === "string" &&
    typeof req.amount === "number" &&
    req.amount >= 50 &&
    typeof req.fromName === "string" &&
    req.fromName.trim().length > 1 &&
    typeof req.toName === "string" &&
    req.toName.trim().length > 1 &&
    typeof req.message === "string"
  );
}

export function generateCode(): string {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `KLK-${new Date().getFullYear()}-${rand}`;
}
