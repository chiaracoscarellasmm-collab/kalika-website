"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Gift, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { pick } from "@/lib/treatments";
import { buildDurationGiftCardHref } from "@/lib/gift-selection";
import {
  RITUALI_MONDO_SETTINGS,
  findRitualGiftTreatment,
  ritualGiftOptions,
  ritualGiftTreatmentId,
  type RitualGiftGroup,
  type RitualeDalMondo,
} from "@/lib/rituali-dal-mondo";

type Copy = {
  gift: string;
  overline: string;
  summary: string;
  continue: string;
  close: string;
};

type Props = {
  ritual: RitualeDalMondo;
  locale: Locale;
  copy: Copy;
};

const GROUP_ORDER: RitualGiftGroup[] = ["cabina", "spa", "schiena"];

export function RitualeGiftButton({ ritual, locale, copy }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<string | null>(null);

  const name = pick(ritual.name, locale);
  const options = ritualGiftOptions(ritual);
  const treatment = findRitualGiftTreatment(ritualGiftTreatmentId(ritual));
  const selected = options.find((option) => option.variant === variant) ?? null;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!treatment) return null;

  const groupTitle = (group: RitualGiftGroup) =>
    group === "schiena"
      ? locale === "it"
        ? "Solo schiena · in cabina"
        : "Back only · in the cabin"
      : `${pick(RITUALI_MONDO_SETTINGS[group].label, locale)} · ${pick(
          RITUALI_MONDO_SETTINGS[group].detail,
          locale,
        ).replace(/\.$/, "").toLowerCase()}`;

  const pillClass = (active: boolean) =>
    `flex items-center justify-between gap-4 rounded-full border px-4 py-2.5 text-left text-sm transition-colors ${
      active
        ? "border-[var(--color-wisteria)] bg-[var(--color-wisteria)]/15 text-[var(--color-cream)]"
        : "border-[var(--color-cream)]/15 text-[var(--color-cream)]/75 hover:border-[var(--color-wisteria)]/40"
    }`;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setVariant(null);
          setOpen(true);
        }}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-gold)]/35 px-6 py-3 text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]/90 transition-colors hover:border-[var(--color-gold)]/55 hover:bg-[var(--color-gold)]/10"
      >
        <Gift size={16} strokeWidth={1.8} />
        {copy.gift}
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-6"
            role="presentation"
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-[#120b07]/75 backdrop-blur-sm" aria-hidden />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`gift-${ritual.id}-title`}
              className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[var(--color-cream)]/10 bg-gradient-to-br from-[#2a1710] via-[#241009] to-[#1f120c] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-[var(--color-cream)]/10 px-6 py-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)]/85">
                    {copy.overline}
                  </p>
                  <h2
                    id={`gift-${ritual.id}-title`}
                    className="display mt-1 text-2xl text-[var(--color-cream)]"
                  >
                    {name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 text-[var(--color-cream)]/50 transition-colors hover:bg-[var(--color-cream)]/10 hover:text-[var(--color-cream)]"
                  aria-label={copy.close}
                >
                  <X size={18} strokeWidth={1.75} />
                </button>
              </div>

              <div className="space-y-6 overflow-y-auto px-6 py-6">
                {GROUP_ORDER.map((group) => {
                  const groupOptions = options.filter((option) => option.group === group);
                  if (!groupOptions.length) return null;
                  return (
                    <section key={group}>
                      <h3 className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mauve)]">
                        {groupTitle(group)}
                      </h3>
                      <div className="mt-3 flex flex-col gap-2">
                        {groupOptions.map((option) => (
                          <button
                            key={option.variant}
                            type="button"
                            aria-pressed={variant === option.variant}
                            onClick={() => setVariant(option.variant)}
                            className={pillClass(variant === option.variant)}
                          >
                            <span>{pick(option.duration, locale)}</span>
                            <span className="shrink-0 text-[var(--color-gold)]">
                              {pick(option.price, locale)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </section>
                  );
                })}

                {selected && (
                  <div className="rounded-xl border border-[var(--color-wisteria)]/20 bg-[var(--color-cream)]/[0.04] px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-gold)]/85">
                      {copy.summary}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-cream)]/80">
                      {name} · {pick(selected.label, locale)}
                    </p>
                    <p className="display mt-3 text-2xl text-[var(--color-cream)]">
                      {pick(selected.price, locale)}
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-[var(--color-cream)]/10 px-6 py-5">
                <button
                  type="button"
                  disabled={!selected}
                  onClick={() => {
                    if (!selected) return;
                    const href = buildDurationGiftCardHref(
                      locale,
                      treatment,
                      "spa",
                      Number(selected.variant),
                    );
                    if (href) router.push(href);
                  }}
                  className="w-full rounded-full bg-[var(--color-wisteria)] px-6 py-3.5 text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--color-mauve)] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {copy.continue}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
