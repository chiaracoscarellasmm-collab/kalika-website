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
  const [durationIndex, setDurationIndex] = useState(0);
  const [active, setActive] = useState(false);
  const panelId = useId();

  const name = pick(treatment.name, locale);
  const note = treatment.short ? pick(treatment.short, locale) : null;
  const description = treatment.description
    ? pick(treatment.description, locale)
    : null;
  const requiresProtocol = Boolean(treatment.requiresProtocol);

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
  const evaluationMessage = `${dict.estetica.evaluationWhatsappPrefix} ${name}`;

  const giftHref = activeOption
    ? `${localePath(locale, "/gift-card")}?${new URLSearchParams({
        treatment: treatment.id,
        design: "estetica",
        amount: String(parseEuroAmount(pick(activeOption.price, locale)) ?? ""),
        giftLabel: `${name} · ${pick(activeOption.duration, locale)}`,
      }).toString()}`
    : (buildSimpleGiftCardHref(locale, treatment, "estetica") ??
      localePath(locale, "/gift-card"));

  const toggleActive = () => setActive((v) => !v);
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleActive();
    }
  };

  return (
    <li
      className={`rounded-2xl border bg-white p-5 transition-all duration-500 sm:p-6 ${
        active
          ? "border-[#C97BB2] shadow-[0_10px_28px_-14px_rgba(107,58,42,0.18)]"
          : "border-[var(--color-line)] hover:border-[var(--color-mauve)]/35"
      }`}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={active}
        aria-controls={panelId}
        aria-label={name}
        onClick={toggleActive}
        onKeyDown={onKeyDown}
        className="cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#C97BB2]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)]"
      >
        {/* Mobile-first stack; desktop: name/price row with actions when active */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-lg leading-snug text-[var(--color-espresso)] sm:text-xl">
                    {name}
                  </h4>
                  {requiresProtocol && (
                    <span className="inline-flex shrink-0 rounded-full bg-[rgba(201,123,178,0.16)] px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-[#8F526F]">
                      {dict.estetica.evaluationBadge}
                    </span>
                  )}
                </div>
              </div>
              <ChevronDown
                size={18}
                strokeWidth={1.75}
                className={`mt-1 shrink-0 text-[var(--color-mauve)] transition-transform duration-300 ${
                  active ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-end">
            {options.length > 0 && (
              <div
                className="inline-flex w-fit rounded-full border border-[var(--color-line)] bg-[var(--color-cream)]/80 p-0.5"
                role="group"
                aria-label={name}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                {options.map((option, index) => {
                  const isActive = index === durationIndex;
                  return (
                    <button
                      key={index}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => {
                        setDurationIndex(index);
                        setActive(true);
                      }}
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

            <div className="flex items-baseline gap-2">
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
      </div>

      {/* Expanded panel: description + actions / protocol */}
      <div
        id={panelId}
        className={`grid transition-all duration-500 ease-out ${
          active
            ? "mt-4 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {requiresProtocol ? (
            <div className="flex flex-col gap-4 border-t border-[var(--color-line)] pt-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
              <div className="min-w-0 flex-1 space-y-3">
                {(description || note) && (
                  <p className="text-[16px] leading-8 text-[var(--color-espresso)]/70">
                    {description ?? note}
                  </p>
                )}
                <p className="text-[15px] leading-7 text-[var(--color-espresso)]/75 sm:text-base sm:leading-8">
                  {dict.estetica.protocolInlineBody}
                </p>
              </div>
              <a
                href={whatsappLink(evaluationMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-brown)] px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-[var(--color-cream)] transition-colors hover:bg-[var(--color-mauve)] lg:w-auto lg:shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle size={14} strokeWidth={1.8} />
                {dict.estetica.requestEvaluationCta}
              </a>
            </div>
          ) : (
            <div
              className="flex flex-col gap-4 border-t border-[var(--color-line)] pt-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              {(description || note) && (
                <p className="min-w-0 flex-1 text-[16px] leading-8 text-[var(--color-espresso)]/70">
                  {description ?? note}
                </p>
              )}
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-3 lg:w-auto lg:shrink-0">
                <a
                  href={whatsappLink(bookMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-brown)] px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-[var(--color-cream)] transition-colors hover:bg-[var(--color-mauve)] sm:flex-1 lg:w-auto lg:flex-none"
                >
                  <MessageCircle size={14} strokeWidth={1.8} />
                  {dict.common.book}
                </a>
                <Link
                  href={giftHref}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-mauve)]/35 px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-[var(--color-brown)] transition-colors hover:border-[var(--color-mauve)]/60 hover:bg-[var(--color-blush)] sm:flex-1 lg:w-auto lg:flex-none"
                >
                  <Gift size={14} strokeWidth={1.75} />
                  {dict.common.gift}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
