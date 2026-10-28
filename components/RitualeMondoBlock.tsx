import Image from "next/image";
import { MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { pick } from "@/lib/treatments";
import {
  RITUALI_MONDO_STARTING_PRICE,
  type RitualeDalMondo,
} from "@/lib/rituali-dal-mondo";
import { whatsappLink } from "@/lib/site";
import { Reveal } from "./Reveal";
import { RitualeGiftButton } from "./RitualeGiftButton";

type Props = {
  ritual: RitualeDalMondo;
  locale: Locale;
  dict: Dictionary;
  reverse?: boolean;
};

export function RitualeMondoBlock({ ritual, locale, dict, reverse = false }: Props) {
  const name = pick(ritual.name, locale);

  return (
    <Reveal>
      <article
        id={ritual.id}
        className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-14"
      >
        <div
          className={`relative mx-auto aspect-[4/5] w-full max-w-[480px] overflow-hidden rounded-[18px] border border-[var(--color-cream)]/10 ${
            reverse ? "lg:order-2" : ""
          }`}
        >
          <Image
            src={ritual.image.src}
            alt={pick(ritual.image.alt, locale)}
            fill
            sizes="(max-width: 1024px) min(100vw, 480px), 480px"
            quality={80}
            className="object-cover object-center"
          />
        </div>

        <div>
          <h3 className="display text-[34px] leading-tight text-[var(--color-cream)] sm:text-[40px]">
            {name}
          </h3>
          <p className="mt-2 font-serif text-[18px] italic text-[var(--color-wisteria)]">
            {pick(ritual.qualities, locale)}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {ritual.areas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-[var(--color-wisteria)]/35 bg-[var(--color-wisteria)]/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-[var(--color-cream)]/65"
              >
                {area === "body"
                  ? locale === "it"
                    ? "Corpo"
                    : "Body"
                  : locale === "it"
                    ? "Viso"
                    : "Face"}
              </span>
            ))}
          </div>
          <p className="mt-6 text-[17px] leading-8 text-[var(--color-cream)]/80">
            {pick(ritual.description, locale)}
          </p>

          {ritual.backOption && (
            <div className="mt-6 rounded-xl border border-[var(--color-gold)]/25 bg-[var(--color-gold)]/[0.06] px-5 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-gold)]/90">
                {locale === "it" ? "Solo schiena" : "Back only"} ·{" "}
                {pick(ritual.backOption.duration, locale)} ·{" "}
                {pick(ritual.backOption.price, locale)}
              </p>
              <p className="mt-2 text-[15px] leading-7 text-[var(--color-cream)]/75">
                {pick(ritual.backOption.note, locale)}
              </p>
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={whatsappLink(`${dict.common.watsapMessage} ${name}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-wisteria)] px-6 py-3 text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--color-mauve)]"
            >
              <MessageCircle size={16} strokeWidth={1.8} />
              {dict.common.book}
            </a>
            <RitualeGiftButton
              ritual={ritual}
              locale={locale}
              copy={{
                gift: dict.common.gift,
                overline: dict.spa.giftConfigure.overline,
                summary: dict.spa.giftConfigure.summary,
                continue: dict.spa.giftConfigure.continue,
                close: dict.spa.giftConfigure.close,
              }}
            />
            <a
              href="#tariffe"
              className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-gold)]/90 transition-colors hover:text-[var(--color-gold)]"
            >
              {pick(RITUALI_MONDO_STARTING_PRICE, locale)} ·{" "}
              {locale === "it" ? "Vedi tariffe" : "See rates"}
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
