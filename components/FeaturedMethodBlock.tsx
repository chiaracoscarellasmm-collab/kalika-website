"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gift, MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import {
  type Treatment,
  pick,
  parseEuroAmount,
  PRICE_PLACEHOLDER,
} from "@/lib/treatments";
import { buildSimpleGiftCardHref } from "@/lib/gift-selection";
import { whatsappLink, localePath } from "@/lib/site";
import { Reveal } from "./Reveal";

type Props = {
  treatment: Treatment;
  locale: Locale;
  dict: Dictionary;
  priceLabel: string;
  eyebrow: string;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function FeaturedMethodBlock({
  treatment,
  locale,
  dict,
  priceLabel,
  eyebrow,
  body,
  imageSrc,
  imageAlt,
}: Props) {
  const options = treatment.durationOptions ?? [];
  const [durationIndex, setDurationIndex] = useState(0);

  const name = pick(treatment.name, locale);
  const activeOption = options.length ? options[durationIndex] : null;
  const duration = activeOption
    ? pick(activeOption.duration, locale)
    : treatment.duration
      ? pick(treatment.duration, locale)
      : null;
  const price = activeOption
    ? pick(activeOption.price, locale)
    : pick(treatment.price ?? PRICE_PLACEHOLDER, locale);

  const bookMessage = `${dict.common.watsapMessage} ${name}${
    duration ? ` (${duration})` : ""
  }`;
  const giftHref = activeOption
    ? `${localePath(locale, "/gift-card")}?${new URLSearchParams({
        treatment: treatment.id,
        design: "estetica",
        amount: String(parseEuroAmount(pick(activeOption.price, locale)) ?? ""),
        giftLabel: `${name} · ${pick(activeOption.duration, locale)}`,
      }).toString()}`
    : (buildSimpleGiftCardHref(locale, treatment, "estetica") ??
      localePath(locale, "/gift-card"));

  return (
    <Reveal className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 border-[#C97BB2]/45 bg-white shadow-[0_14px_36px_-18px_rgba(107,58,42,0.2)] transition-[transform,box-shadow,border-color] duration-500 ease-out motion-safe:hover:-translate-y-1.5 hover:border-[#C97BB2] hover:shadow-[0_22px_44px_-16px_rgba(201,123,178,0.45)]">
        {imageSrc && (
          <div className="px-3 pt-3 sm:px-4 sm:pt-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt ?? name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                className="object-cover object-center transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
              />
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#C97BB2] transition-colors duration-500 group-hover:text-[#b86aa0]">
              {eyebrow}
            </p>
            <div className="flex shrink-0 flex-col items-end gap-1.5 text-right">
              {options.length > 0 ? (
                <div
                  className="inline-flex rounded-full border border-[var(--color-line)] bg-[var(--color-cream)] p-0.5"
                  role="group"
                  aria-label={locale === "it" ? "Durata" : "Duration"}
                >
                  {options.map((opt, i) => {
                    const label = pick(opt.duration, locale);
                    const selected = i === durationIndex;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setDurationIndex(i)}
                        className={`rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] transition ${
                          selected
                            ? "bg-[var(--color-mauve)] text-white"
                            : "text-[var(--color-mauve)]/70 hover:text-[var(--color-mauve)]"
                        }`}
                        aria-pressed={selected}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              ) : (
                duration && (
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-mauve)]">
                    {duration}
                  </span>
                )
              )}
              <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-mauve)]">
                <span className="opacity-70">{priceLabel}</span>{" "}
                <span className="tracking-normal">{price}</span>
              </p>
            </div>
          </div>

          <h3 className="display mt-3 text-2xl text-[var(--color-brown)] transition-transform duration-500 ease-out motion-safe:group-hover:translate-x-0.5 sm:text-3xl">
            {name}
          </h3>

          <p className="mt-4 flex-1 text-[16px] leading-7 text-[var(--color-espresso)]/75 sm:text-[17px] sm:leading-8">
            {body}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href={whatsappLink(bookMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dict.common.book}
              title={dict.common.book}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#C97BB2] text-white transition-[transform,background-color] duration-300 hover:bg-[#b86aa0] motion-safe:group-hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
            </a>
            <Link
              href={giftHref}
              aria-label={dict.common.gift}
              title={dict.common.gift}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#C97BB2]/50 bg-[var(--color-cream)] text-[var(--color-brown)] transition-[transform,border-color] duration-300 delay-75 hover:border-[#C97BB2] motion-safe:group-hover:-translate-y-0.5"
            >
              <Gift className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
