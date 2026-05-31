import type { Locale } from "@/lib/i18n";
import {
  type TreatmentGroup,
  pick,
  PRICE_PLACEHOLDER,
  DURATION_PLACEHOLDER,
  DESC_PLACEHOLDER,
} from "@/lib/treatments";
import { Reveal } from "./Reveal";

type Props = {
  groups: TreatmentGroup[];
  locale: Locale;
  durationLabel: string;
  priceLabel: string;
  variant?: "estetica" | "spa";
};

export function TreatmentList({
  groups,
  locale,
  durationLabel,
  priceLabel,
  variant = "estetica",
}: Props) {
  const isSpa = variant === "spa";
  return (
    <div className="space-y-16">
      {groups.map((group, gi) => (
        <Reveal key={group.id} delay={gi * 0.04}>
          <section>
            <h3
              className={`display text-2xl sm:text-3xl ${
                isSpa ? "text-[var(--color-cream)]" : "text-[var(--color-brown)]"
              }`}
            >
              {pick(group.title, locale)}
            </h3>
            <ul
              className={`mt-6 divide-y ${
                isSpa
                  ? "divide-[var(--color-cream)]/15"
                  : "divide-[var(--color-line)]"
              }`}
            >
              {group.treatments.map((t) => (
                <li
                  key={t.id}
                  className="grid items-baseline gap-2 py-5 sm:grid-cols-[1fr_auto_auto] sm:gap-8"
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
                    <p
                      className={`mt-1 text-[17px] leading-8 sm:text-lg ${
                        isSpa
                          ? "text-[var(--color-cream)]/65"
                          : "text-[var(--color-espresso)]/60"
                      }`}
                    >
                      {pick(DESC_PLACEHOLDER, locale)}
                    </p>
                  </div>
                  <div
                    className={`text-xs uppercase tracking-[0.18em] ${
                      isSpa
                        ? "text-[var(--color-cream)]/55"
                        : "text-[var(--color-mauve)]"
                    }`}
                  >
                    <span className="opacity-70">{durationLabel}</span>{" "}
                    {pick(DURATION_PLACEHOLDER, locale)}
                  </div>
                  <div
                    className={`text-xs uppercase tracking-[0.18em] ${
                      isSpa
                        ? "text-[var(--color-wisteria)]"
                        : "text-[var(--color-mauve)]"
                    }`}
                  >
                    <span className="opacity-70">{priceLabel}</span>{" "}
                    {pick(PRICE_PLACEHOLDER, locale)}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      ))}
    </div>
  );
}
