"use client";

import { useId, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ChevronDown, Gift, MessageCircle } from "lucide-react";
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

type Props = {
  treatment: Treatment;
  locale: Locale;
  dict: Dictionary;
  priceLabel: string;
};

export function EsteticaTreatmentItem({
  treatment,
  locale,
  dict,
  priceLabel,
}: Props) {
  const options = treatment.durationOptions ?? [];
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const name = pick(treatment.name, locale);
  const note = treatment.short ? pick(treatment.short, locale) : null;
  const description = treatment.description
    ? pick(treatment.description, locale)
    : null;
  const hasDetails = Boolean(description);

  const activeOption = options.length ? options[selected] : null;
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

  const toggle = () => setOpen((v) => !v);
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const clickableProps = hasDetails
    ? {
        role: "button" as const,
        tabIndex: 0,
        "aria-expanded": open,
        "aria-controls": panelId,
        "aria-label": name,
        onClick: toggle,
        onKeyDown,
        className: "group/acc cursor-pointer",
      }
    : {};

  return (
    <li className="group rounded-2xl border border-[var(--color-line)] bg-white/60 p-5 transition-all duration-500 hover:border-[var(--color-mauve)]/35 hover:bg-white hover:shadow-lg hover:shadow-[rgba(107,58,42,0.06)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1">
          <div {...clickableProps}>
            <div className="flex items-start gap-2">
              <h4 className="text-lg leading-snug text-[var(--color-espresso)] sm:text-xl">
                {name}
              </h4>
              {hasDetails && (
                <ChevronDown
                  size={18}
                  strokeWidth={1.75}
                  className={`mt-1 shrink-0 text-[var(--color-mauve)] transition-transform duration-300 group-hover/acc:text-[var(--color-brown)] ${
                    open ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              )}
            </div>
            {note && (
              <p className="mt-1 text-[15px] leading-7 text-[var(--color-espresso)]/55">
                {note}
              </p>
            )}
          </div>

          {hasDetails && (
            <div
              id={panelId}
              className={`grid transition-all duration-500 ease-out ${
                open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="border-t border-[var(--color-line)] pt-3 text-[16px] leading-8 text-[var(--color-espresso)]/70">
                  {description}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-col gap-2.5 sm:items-end">
          {options.length > 0 && (
            <div
              className="inline-flex w-fit rounded-full border border-[var(--color-line)] bg-white/60 p-0.5"
              role="group"
              aria-label={name}
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
                        ? "bg-[var(--color-mauve)] text-white"
                        : "text-[var(--color-mauve)] hover:bg-[var(--color-blush)]"
                    }`}
                  >
                    {pick(option.duration, locale)}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-baseline gap-2 sm:justify-end">
            {duration && options.length === 0 && (
              <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-espresso)]/45">
                {duration}
              </span>
            )}
            <span className="text-base text-[var(--color-mauve)]">
              <span className="text-[11px] uppercase tracking-[0.16em] opacity-70">
                {priceLabel}
              </span>{" "}
              {price}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--color-line)] pt-4">
        <a
          href={whatsappLink(bookMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brown)] px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] text-[var(--color-cream)] transition-colors hover:bg-[var(--color-mauve)]"
        >
          <MessageCircle size={14} strokeWidth={1.8} />
          {dict.common.book}
        </a>
        <Link
          href={giftHref}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-mauve)]/35 px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] text-[var(--color-brown)] transition-colors hover:border-[var(--color-mauve)]/60 hover:bg-[var(--color-blush)]"
        >
          <Gift size={14} strokeWidth={1.75} />
          {dict.common.gift}
        </Link>
      </div>
    </li>
  );
}
