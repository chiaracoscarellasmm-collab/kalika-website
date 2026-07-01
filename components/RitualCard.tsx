import Link from "next/link";
import { ChevronDown, Gift, MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import {
  type Treatment,
  pick,
  PRICE_PLACEHOLDER,
  DURATION_PLACEHOLDER,
  DESC_PLACEHOLDER,
} from "@/lib/treatments";
import { whatsappLink, localePath } from "@/lib/site";

type Props = {
  treatment: Treatment;
  locale: Locale;
  dict: Dictionary;
};

export function RitualCard({ treatment, locale, dict }: Props) {
  const name = pick(treatment.name, locale);
  const description = treatment.description
    ? pick(treatment.description, locale)
    : null;
  const duration = treatment.duration
    ? pick(treatment.duration, locale)
    : pick(DURATION_PLACEHOLDER, locale);
  const temperature = treatment.temperature
    ? pick(treatment.temperature, locale)
    : null;
  const hasDetails = Boolean(description);

  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--color-cream)]/10 bg-[var(--color-cream)]/[0.04] backdrop-blur transition-colors hover:border-[var(--color-wisteria)]/30">
      {hasDetails ? (
        <details className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-6 sm:p-7 [&::-webkit-details-marker]:hidden">
            <div className="min-w-0 flex-1">
              <h3 className="display text-2xl text-[var(--color-cream)]">{name}</h3>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.18em] text-[var(--color-wisteria)]/85">
                <span>
                  <span className="opacity-70">{dict.common.duration}</span> {duration}
                </span>
                {temperature && (
                  <span>
                    <span className="opacity-70">{dict.common.temperature}</span>{" "}
                    {temperature}
                  </span>
                )}
              </div>
            </div>
            <ChevronDown
              size={18}
              strokeWidth={1.6}
              className="mt-1 shrink-0 text-[var(--color-wisteria)] transition-transform duration-300 group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <div className="border-t border-[var(--color-cream)]/10 px-6 pb-5 pt-4 sm:px-7">
            <p className="text-[17px] leading-8 text-[var(--color-cream)]/75 sm:text-lg">
              {description}
            </p>
          </div>
        </details>
      ) : (
        <div className="p-6 sm:p-7">
          <h3 className="display text-2xl text-[var(--color-cream)]">{name}</h3>
          <p className="mt-3 text-[17px] leading-8 text-[var(--color-cream)]/70 sm:text-lg">
            {pick(DESC_PLACEHOLDER, locale)}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.18em] text-[var(--color-wisteria)]/85">
            <span>
              <span className="opacity-70">{dict.common.duration}</span> {duration}
            </span>
            {temperature && (
              <span>
                <span className="opacity-70">{dict.common.temperature}</span>{" "}
                {temperature}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-[var(--color-cream)]/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-wisteria)]">
          {pick(PRICE_PLACEHOLDER, locale)}
        </span>
        <div className="flex gap-3">
          <a
            href={whatsappLink(`${dict.common.watsapMessage} ${name}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-wisteria)] px-4 py-2.5 text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--color-mauve)] sm:flex-none"
          >
            <MessageCircle size={14} strokeWidth={1.6} />
            {dict.common.book}
          </a>
          <Link
            href={localePath(locale, "/gift-card")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--color-cream)]/30 px-4 py-2.5 text-xs uppercase tracking-[0.18em] text-[var(--color-cream)] transition-colors hover:border-[var(--color-wisteria)] hover:text-[var(--color-wisteria)] sm:flex-none"
          >
            <Gift size={14} strokeWidth={1.6} />
            {dict.common.gift}
          </Link>
        </div>
      </div>
    </article>
  );
}
