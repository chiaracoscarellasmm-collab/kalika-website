"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import type { GiftCardDesign } from "@/lib/giftcard";
import {
  buildConfiguredGiftCardHref,
  getGiftPersonOptions,
  needsOperatorStep,
  resolveGiftSelection,
  type GiftOperatorChoice,
  type GiftPersonOption,
} from "@/lib/gift-selection";
import { type Treatment, pick } from "@/lib/treatments";

type Props = {
  open: boolean;
  onClose: () => void;
  treatment: Treatment;
  locale: Locale;
  dict: Dictionary;
  giftDesign: GiftCardDesign;
};

function formatAmount(amount: number, locale: Locale) {
  return amount.toLocaleString(locale === "it" ? "it-IT" : "en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export function GiftConfigureModal({
  open,
  onClose,
  treatment,
  locale,
  dict,
  giftDesign,
}: Props) {
  const router = useRouter();
  const copy = dict.spa.giftConfigure;
  const name = pick(treatment.name, locale);
  const personOptions = useMemo(
    () => getGiftPersonOptions(treatment, locale),
    [treatment, locale],
  );

  const [personId, setPersonId] = useState<string | null>(null);
  const [operator, setOperator] = useState<GiftOperatorChoice | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    setPersonId(personOptions.length === 1 ? personOptions[0].id : null);
    setOperator(null);
  }, [open, personOptions]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const showOperator = needsOperatorStep(treatment, personId);
  const selection =
    personId && (!showOperator || operator)
      ? resolveGiftSelection(
          treatment,
          locale,
          personId,
          operator ?? undefined,
        )
      : null;

  const canContinue = Boolean(selection);

  if (!open || !mounted) return null;

  const pillClass = (active: boolean) =>
    `rounded-full border px-4 py-2.5 text-left text-sm transition-colors ${
      active
        ? "border-[var(--color-wisteria)] bg-[var(--color-wisteria)]/15 text-[var(--color-cream)]"
        : "border-[var(--color-cream)]/15 text-[var(--color-cream)]/75 hover:border-[var(--color-wisteria)]/40"
    }`;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-[#120b07]/75 backdrop-blur-sm"
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gift-configure-title"
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--color-cream)]/10 bg-gradient-to-br from-[#2a1710] via-[#241009] to-[#1f120c] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--color-cream)]/10 px-6 py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)]/85">
              {copy.overline}
            </p>
            <h2
              id="gift-configure-title"
              className="display mt-1 text-2xl text-[var(--color-cream)]"
            >
              {name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[var(--color-cream)]/50 transition-colors hover:bg-[var(--color-cream)]/10 hover:text-[var(--color-cream)]"
            aria-label={copy.close}
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <section>
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mauve)]">
              {copy.persons}
            </h3>
            <div className="mt-3 flex flex-col gap-2">
              {personOptions.map((option: GiftPersonOption) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setPersonId(option.id);
                    setOperator(null);
                  }}
                  className={`${pillClass(personId === option.id)} flex items-center justify-between gap-4`}
                >
                  <span>{option.label}</span>
                  <span className="shrink-0 text-[var(--color-gold)]">
                    {option.priceLabel}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {showOperator && (
            <section>
              <h3 className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mauve)]">
                {copy.operator}
              </h3>
              <div className="mt-3 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setOperator("without")}
                  className={pillClass(operator === "without")}
                >
                  {copy.withoutOperator}
                </button>
                <button
                  type="button"
                  onClick={() => setOperator("with")}
                  className={pillClass(operator === "with")}
                >
                  {copy.withOperator}
                </button>
              </div>
            </section>
          )}

          {selection && (
            <div className="rounded-xl border border-[var(--color-wisteria)]/20 bg-[var(--color-cream)]/[0.04] px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-gold)]/85">
                {copy.summary}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-cream)]/80">
                {selection.giftLabel}
              </p>
              <p className="display mt-3 text-2xl text-[var(--color-cream)]">
                {formatAmount(selection.amount, locale)}
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-[var(--color-cream)]/10 px-6 py-5">
          <button
            type="button"
            disabled={!canContinue}
            onClick={() => {
              if (!selection || !personId) return;
              const href = buildConfiguredGiftCardHref(
                locale,
                treatment.id,
                giftDesign,
                personId,
                operator ?? undefined,
                selection,
              );
              router.push(href);
            }}
            className="w-full rounded-full bg-[var(--color-wisteria)] px-6 py-3.5 text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--color-mauve)] disabled:cursor-not-allowed disabled:opacity-45"
          >
            {copy.continue}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
