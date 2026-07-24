import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import {
  type TreatmentGroup,
  pick,
  PRICE_PLACEHOLDER,
} from "@/lib/treatments";
import { Reveal } from "./Reveal";
import { TreatmentDurationRow } from "./TreatmentDurationRow";
import { EsteticaTreatmentItem } from "./EsteticaTreatmentItem";

type Props = {
  groups: TreatmentGroup[];
  locale: Locale;
  priceLabel: string;
  variant?: "estetica" | "spa";
  /** When set, each treatment gets Book (WhatsApp) and Gift actions. */
  dict?: Dictionary;
};

export function TreatmentList({
  groups,
  locale,
  priceLabel,
  variant = "estetica",
  dict,
}: Props) {
  const isSpa = variant === "spa";
  const withActions = Boolean(dict) && !isSpa;
  return (
    <div className="space-y-16">
      {groups.map((group, gi) => (
        <Reveal key={group.id} delay={gi * 0.04}>
          <section>
            {!group.hideTitle && (
              <h2
                className={`display text-2xl sm:text-3xl ${
                  isSpa ? "text-[var(--color-cream)]" : "text-[var(--color-brown)]"
                }`}
              >
                {pick(group.title, locale)}
              </h2>
            )}
            {group.subtitle && !group.hideTitle && (
              <p
                className={`mt-2 max-w-xl text-[17px] leading-8 sm:text-lg ${
                  isSpa
                    ? "text-[var(--color-cream)]/65"
                    : "text-[var(--color-espresso)]/60"
                }`}
              >
                {pick(group.subtitle, locale)}
              </p>
            )}
            <ul
              className={
                withActions
                  ? `${group.hideTitle ? "mt-0" : group.subtitle ? "mt-6" : "mt-7"} space-y-4`
                  : `${group.hideTitle ? "mt-0" : group.subtitle ? "mt-5" : "mt-6"} divide-y ${
                      isSpa
                        ? "divide-[var(--color-cream)]/15"
                        : "divide-[var(--color-line)]"
                    }`
              }
            >
              {group.treatments.map((t) => {
                if (withActions && dict) {
                  return (
                    <EsteticaTreatmentItem
                      key={t.id}
                      treatment={t}
                      locale={locale}
                      dict={dict}
                      priceLabel={priceLabel}
                    />
                  );
                }

                if (t.durationOptions?.length) {
                  return (
                    <TreatmentDurationRow
                      key={t.id}
                      treatment={t}
                      locale={locale}
                      priceLabel={priceLabel}
                      variant={variant}
                    />
                  );
                }

                const description = t.description ?? t.short;
                return (
                  <li
                    key={t.id}
                    className="grid items-center gap-2 py-5 sm:grid-cols-[1fr_auto_auto] sm:gap-8"
                  >
                    <div>
                      <p
                        className={`text-lg ${
                          isSpa
                            ? "text-[var(--color-cream)]"
                            : "text-[var(--color-espresso)]"
                        }`}
                      >
                        {pick(t.name, locale)}
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
                      className={`text-xs uppercase tracking-[0.18em] ${
                        isSpa
                          ? "text-[var(--color-cream)]/55"
                          : "text-[var(--color-mauve)]"
                      }`}
                    >
                      {t.duration && pick(t.duration, locale)}
                    </div>
                    <div
                      className={`text-xs uppercase tracking-[0.18em] ${
                        isSpa
                          ? "text-[var(--color-wisteria)]"
                          : "text-[var(--color-mauve)]"
                      }`}
                    >
                      <span className="opacity-70">{priceLabel}</span>{" "}
                      {pick(t.price ?? PRICE_PLACEHOLDER, locale)}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </Reveal>
      ))}
    </div>
  );
}
