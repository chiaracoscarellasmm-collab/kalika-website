"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { type Treatment, pick } from "@/lib/treatments";

type Props = {
  treatment: Treatment;
  locale: Locale;
  priceLabel: string;
  variant?: "estetica" | "spa";
};

export function TreatmentDurationRow({
  treatment,
  locale,
  priceLabel,
  variant = "estetica",
}: Props) {
  const options = treatment.durationOptions!;
  const [selected, setSelected] = useState(0);
  const isSpa = variant === "spa";
  const description = treatment.description ?? treatment.short;
  const active = options[selected]!;

  return (
    <li className="grid items-center gap-4 py-5 sm:grid-cols-[1fr_auto_auto] sm:gap-8">
      <div>
        <p
          className={`text-lg ${
            isSpa ? "text-[var(--color-cream)]" : "text-[var(--color-espresso)]"
          }`}
        >
          {pick(treatment.name, locale)}
        </p>
        {description && (
          <p
            className={`mt-1 text-[17px] leading-8 sm:text-lg ${
              isSpa
                ? "text-[var(--color-cream)]/65"
                : "text-[var(--color-espresso)]/60"
            }`}
          >
            {pick(description, locale)}
          </p>
        )}
      </div>

      <div
        className="inline-flex w-fit rounded-full border p-0.5"
        style={{
          borderColor: isSpa ? "rgba(250, 247, 242, 0.15)" : "var(--color-line)",
          backgroundColor: isSpa ? "rgba(250, 247, 242, 0.06)" : "rgba(255, 255, 255, 0.5)",
        }}
        role="group"
        aria-label={pick(treatment.name, locale)}
      >
        {options.map((option, index) => {
          const isActive = index === selected;
          return (
            <button
              key={index}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelected(index)}
              className={`rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] transition-colors ${
                isActive
                  ? isSpa
                    ? "bg-[var(--color-wisteria)] text-white"
                    : "bg-[var(--color-mauve)] text-white"
                  : isSpa
                    ? "text-[var(--color-cream)]/70 hover:bg-[var(--color-cream)]/10"
                    : "text-[var(--color-mauve)] hover:bg-[var(--color-blush)]"
              }`}
            >
              {pick(option.duration, locale)}
            </button>
          );
        })}
      </div>

      <div
        className={`text-xs uppercase tracking-[0.18em] ${
          isSpa ? "text-[var(--color-wisteria)]" : "text-[var(--color-mauve)]"
        }`}
      >
        <span className="opacity-70">{priceLabel}</span> {pick(active.price, locale)}
      </div>
    </li>
  );
}
