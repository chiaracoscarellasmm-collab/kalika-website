import type { Locale } from "./i18n";
import type { GiftCardDesign } from "./giftcard";
import {
  type Bilingual,
  type Treatment,
  findTreatmentById,
  getTreatmentGiftAmount,
  parseEuroAmount,
  pick,
} from "./treatments";
import { localePath } from "./site";

export type GiftOperatorChoice = "with" | "without";

export type GiftPersonOption = {
  id: string;
  label: string;
  priceLabel: string;
  amount: number;
  isSingle: boolean;
};

function isDetoxTier(label: Bilingual): boolean {
  const text = `${label.it} ${label.en}`.toLowerCase();
  return text.includes("detox");
}

function isSinglePersonTier(label: Bilingual): boolean {
  const it = label.it.trim().toLowerCase();
  const en = label.en.trim().toLowerCase();
  return it === "singolo" || en === "single";
}

export function getGiftPersonOptions(
  treatment: Treatment,
  locale: Locale,
): GiftPersonOption[] {
  const tiers = treatment.priceTiers ?? [];

  return tiers
    .map((tier, index) => ({ tier, index }))
    .filter(({ tier }) => !isDetoxTier(tier.label))
    .map(({ tier, index }) => {
      const amount = parseEuroAmount(pick(tier.price, locale)) ?? 0;
      return {
        id: String(index),
        label: pick(tier.label, locale),
        priceLabel: pick(tier.price, locale),
        amount,
        isSingle: isSinglePersonTier(tier.label),
      };
    })
    .filter((option) => option.amount >= 20);
}

export function treatmentNeedsGiftConfigure(
  treatment: Treatment,
  locale: Locale,
): boolean {
  const personOptions = getGiftPersonOptions(treatment, locale);
  if (personOptions.length > 1) return true;
  if (
    personOptions.length === 1 &&
    personOptions[0].isSingle &&
    treatment.sessionModes?.length
  ) {
    return true;
  }
  return false;
}

export function needsOperatorStep(
  treatment: Treatment,
  personOptionId: string | null,
): boolean {
  if (!personOptionId || !treatment.sessionModes?.length) return false;
  const index = Number(personOptionId);
  const tier = treatment.priceTiers?.[index];
  return tier ? isSinglePersonTier(tier.label) : false;
}

export function resolveGiftSelection(
  treatment: Treatment,
  locale: Locale,
  personOptionId: string,
  operator?: GiftOperatorChoice,
): { amount: number; giftLabel: string } | null {
  const tiers = treatment.priceTiers ?? [];
  const personIndex = Number(personOptionId);
  const personTier = tiers[personIndex];
  if (!personTier) return null;

  const name = pick(treatment.name, locale);
  const personLabel = pick(personTier.label, locale);
  const operatorStep = needsOperatorStep(treatment, personOptionId);

  if (operatorStep) {
    if (!operator) return null;

    if (operator === "with") {
      const detoxTier = tiers.find((tier) => isDetoxTier(tier.label));
      const amount = detoxTier
        ? parseEuroAmount(pick(detoxTier.price, locale))
        : parseEuroAmount(pick(personTier.price, locale));
      if (amount === null || amount < 20) return null;

      const mode = treatment.sessionModes?.find((m) =>
        pick(m.label, locale).toLowerCase().includes(locale === "it" ? "soli" : "alone"),
      );
      const operatorHint = mode?.note ? pick(mode.note, locale) : null;
      const operatorLabel = locale === "it" ? "Con operatore" : "With therapist";

      return {
        amount,
        giftLabel: operatorHint
          ? `${name} · ${personLabel} · ${operatorLabel} · ${operatorHint}`
          : `${name} · ${personLabel} · ${operatorLabel}`,
      };
    }

    const amount = parseEuroAmount(pick(personTier.price, locale));
    if (amount === null || amount < 20) return null;
    const operatorLabel = locale === "it" ? "Senza operatore" : "Without therapist";

    return {
      amount,
      giftLabel: `${name} · ${personLabel} · ${operatorLabel}`,
    };
  }

  const amount = parseEuroAmount(pick(personTier.price, locale));
  if (amount === null || amount < 20) return null;

  return {
    amount,
    giftLabel: `${name} · ${personLabel}`,
  };
}

export function validateGiftCardParams(
  treatmentId: string,
  locale: Locale,
  params: {
    amount?: string | null;
    giftLabel?: string | null;
    giftPerson?: string | null;
    giftOperator?: string | null;
  },
): { amount: number; giftLabel: string } | null {
  const treatment = findTreatmentById(treatmentId);
  if (!treatment) return null;

  if (params.giftPerson) {
    const operator =
      params.giftOperator === "with" || params.giftOperator === "without"
        ? params.giftOperator
        : undefined;
    const resolved = resolveGiftSelection(treatment, locale, params.giftPerson, operator);
    if (!resolved) return null;
    if (params.amount && Number(params.amount) !== resolved.amount) return null;
    if (params.giftLabel && params.giftLabel !== resolved.giftLabel) return null;
    return resolved;
  }

  // Treatments with selectable durations: accept any variant's price.
  if (treatment.durationOptions?.length && params.amount) {
    const requested = Number(params.amount);
    const option = treatment.durationOptions.find(
      (o) => parseEuroAmount(pick(o.price, locale)) === requested,
    );
    if (option) {
      if (!Number.isFinite(requested) || requested < 20) return null;
      const giftLabel =
        params.giftLabel ??
        `${pick(treatment.name, locale)} · ${pick(option.duration, locale)}`;
      return { amount: requested, giftLabel };
    }
  }

  const amount = getTreatmentGiftAmount(treatment, locale);
  if (amount === null || amount < 20) return null;
  if (params.amount && Number(params.amount) !== amount) return null;

  return {
    amount,
    giftLabel: params.giftLabel ?? pick(treatment.name, locale),
  };
}

export function buildConfiguredGiftCardHref(
  locale: Locale,
  treatmentId: string,
  design: GiftCardDesign,
  personOptionId: string,
  operator: GiftOperatorChoice | undefined,
  selection: { amount: number; giftLabel: string },
): string {
  const params = new URLSearchParams({
    treatment: treatmentId,
    design,
    amount: String(selection.amount),
    giftLabel: selection.giftLabel,
    giftPerson: personOptionId,
  });
  if (operator) params.set("giftOperator", operator);
  return `${localePath(locale, "/gift-card")}?${params.toString()}`;
}

export function buildSimpleGiftCardHref(
  locale: Locale,
  treatment: Treatment,
  design: GiftCardDesign,
): string | null {
  const amount = getTreatmentGiftAmount(treatment, locale);
  if (amount === null || amount < 20) return null;

  const params = new URLSearchParams({
    treatment: treatment.id,
    design,
    amount: String(amount),
    giftLabel: pick(treatment.name, locale),
  });
  return `${localePath(locale, "/gift-card")}?${params.toString()}`;
}
