import Link from "next/link";
import { Gift, MessageCircle } from "lucide-react";
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
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[var(--color-cream)]/10 bg-[var(--color-cream)]/[0.04] p-7 backdrop-blur transition-colors hover:border-[var(--color-wisteria)]/40">
      <h3 className="display text-2xl text-[var(--color-cream)]">{name}</h3>
      <p className="mt-3 flex-1 text-[17px] leading-8 text-[var(--color-cream)]/70 sm:text-lg">
        {pick(DESC_PLACEHOLDER, locale)}
      </p>
      <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--color-wisteria)]/85">
        <span>
          <span className="opacity-70">{dict.common.duration}</span>{" "}
          {pick(DURATION_PLACEHOLDER, locale)}
        </span>
        <span>{pick(PRICE_PLACEHOLDER, locale)}</span>
      </div>
      <div className="mt-6 flex gap-3">
        <a
          href={whatsappLink(`${dict.common.watsapMessage} ${name}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-wisteria)] px-4 py-2.5 text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--color-mauve)]"
        >
          <MessageCircle size={14} strokeWidth={1.6} />
          {dict.common.book}
        </a>
        <Link
          href={localePath(locale, "/gift-card")}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--color-cream)]/30 px-4 py-2.5 text-xs uppercase tracking-[0.18em] text-[var(--color-cream)] transition-colors hover:border-[var(--color-wisteria)] hover:text-[var(--color-wisteria)]"
        >
          <Gift size={14} strokeWidth={1.6} />
          {dict.common.gift}
        </Link>
      </div>
    </article>
  );
}
