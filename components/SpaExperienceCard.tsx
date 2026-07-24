"use client";

import { useId, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ChevronDown, Gift, MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { GiftConfigureModal } from "./GiftConfigureModal";
import { type Treatment, pick } from "@/lib/treatments";
import { type GiftCardDesign } from "@/lib/giftcard";
import {
  buildSimpleGiftCardHref,
  treatmentNeedsGiftConfigure,
} from "@/lib/gift-selection";
import { whatsappLink, localePath } from "@/lib/site";

type Props = {
  treatment: Treatment;
  locale: Locale;
  dict: Dictionary;
  featured?: boolean;
  className?: string;
  hideCardPricing?: boolean;
  giftDesign?: GiftCardDesign;
};

export function SpaExperienceCard({
  treatment,
  locale,
  dict,
  featured = false,
  className,
  hideCardPricing = false,
  giftDesign = "spa",
}: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [tiersOpen, setTiersOpen] = useState(false);
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const panelId = useId();
  const tiersPanelId = useId();

  const name = pick(treatment.name, locale);
  const price = treatment.price ? pick(treatment.price, locale) : null;
  const tiers = hideCardPricing ? null : (treatment.priceTiers ?? null);
  const short = treatment.short ? pick(treatment.short, locale) : null;
  const description = treatment.description
    ? pick(treatment.description, locale)
    : null;
  const duration = treatment.duration ? pick(treatment.duration, locale) : null;
  const temperature = treatment.temperature
    ? pick(treatment.temperature, locale)
    : null;
  const teaser = short ?? description;
  const hasDetails = Boolean(description);
  const needsGiftConfigure = treatmentNeedsGiftConfigure(treatment, locale);
  const simpleGiftHref = buildSimpleGiftCardHref(locale, treatment, giftDesign);

  const giftButtonClass = featured
    ? "inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--color-gold)]/35 px-6 py-3 text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]/90 transition-colors hover:border-[var(--color-gold)]/55 hover:bg-[var(--color-gold)]/10 sm:flex-none"
    : "inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-[var(--color-cream)]/50 transition-colors hover:text-[var(--color-gold)]";

  const giftButton = needsGiftConfigure ? (
    <button
      type="button"
      onClick={() => setGiftModalOpen(true)}
      className={giftButtonClass}
    >
      <Gift size={featured ? 16 : 12} strokeWidth={featured ? 1.8 : 1.75} />
      {dict.common.gift}
    </button>
  ) : simpleGiftHref ? (
    <Link href={simpleGiftHref} className={giftButtonClass}>
      <Gift size={featured ? 16 : 12} strokeWidth={1.75} />
      {dict.common.gift}
    </Link>
  ) : (
    <Link href={localePath(locale, "/gift-card")} className={giftButtonClass}>
      <Gift size={featured ? 16 : 12} strokeWidth={1.75} />
      {dict.common.gift}
    </Link>
  );

  const giftModal = (
    <GiftConfigureModal
      open={giftModalOpen}
      onClose={() => setGiftModalOpen(false)}
      treatment={treatment}
      locale={locale}
      dict={dict}
      giftDesign={giftDesign}
    />
  );

  const toggleActive = () =>
    setActive((v) => {
      const next = !v;
      if (hasDetails) setOpen(next);
      if (!next) setTiersOpen(false);
      return next;
    });

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleActive();
    }
  };

  const clickableProps = {
    role: "button" as const,
    tabIndex: 0,
    "aria-expanded": active,
    "aria-controls": hasDetails ? panelId : undefined,
    "aria-label": name,
    onClick: toggleActive,
    onKeyDown,
    className: "group/acc cursor-pointer outline-none",
  };

  const priceDurationLine =
    hideCardPricing || (!duration && !price)
      ? null
      : [duration, price].filter(Boolean).join(" · ");

  const cardOnlyPrice =
    hideCardPricing && price && !(treatment.priceTiers?.length) ? price : null;

  const chevron = (
    <ChevronDown
      size={featured ? 22 : 18}
      strokeWidth={1.75}
      className={`shrink-0 text-[var(--color-wisteria)] transition-transform duration-300 group-hover/acc:text-[var(--color-gold)] ${
        active ? "rotate-180" : ""
      }`}
      aria-hidden
    />
  );

  const detailPanel = hasDetails && (
    <div
      id={panelId}
      className={`grid transition-all duration-500 ease-out ${
        active && open
          ? "mt-4 grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <p
          className={`border-t border-[var(--color-cream)]/10 pt-4 leading-8 text-[var(--color-cream)]/80 ${
            featured ? "text-[17px]" : "text-[16px]"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );

  const tiersToggle = tiers && active && (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setTiersOpen((v) => !v);
      }}
      aria-expanded={tiersOpen}
      aria-controls={tiersPanelId}
      className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-[var(--color-wisteria)]/90 transition-colors hover:text-[var(--color-gold)]"
    >
      {locale === "it" ? "Tariffe di gruppo" : "Group rates"}
      <ChevronDown
        size={12}
        strokeWidth={1.75}
        className={`transition-transform duration-300 ${tiersOpen ? "rotate-180" : ""}`}
        aria-hidden
      />
    </button>
  );

  const tiersPanel = tiers && (
    <div
      id={tiersPanelId}
      className={`grid transition-all duration-500 ease-out ${
        tiersOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <ul className="w-full divide-y divide-[var(--color-cream)]/10 rounded-xl border border-[var(--color-cream)]/10 bg-[var(--color-cream)]/[0.03] text-left">
          {tiers.map((t) => (
            <li
              key={pick(t.label, locale)}
              className="flex items-center justify-between gap-4 px-4 py-2.5"
            >
              <span className="text-[13px] leading-5 text-[var(--color-cream)]/70">
                {pick(t.label, locale)}
              </span>
              <span className="shrink-0 text-[14px] font-medium text-[var(--color-gold)]">
                {pick(t.price, locale)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const featuredActions = (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
      <a
        href={whatsappLink(`${dict.common.watsapMessage} ${name}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-wisteria)] px-6 py-3 text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--color-mauve)] sm:flex-none"
      >
        <MessageCircle size={16} strokeWidth={1.8} />
        {dict.common.book}
      </a>
      {giftButton}
    </div>
  );

  const compactActions = (
    <div className="flex shrink-0 items-center justify-end gap-3 sm:gap-4">
      <a
        href={whatsappLink(`${dict.common.watsapMessage} ${name}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-wisteria)] px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-white transition-colors hover:bg-[var(--color-mauve)]"
      >
        <MessageCircle size={13} strokeWidth={1.8} />
        {dict.common.book}
      </a>
      {giftButton}
    </div>
  );

  if (featured) {
    return (
      <>
        <article
          className={`spa-experience-card spa-experience-card--featured relative overflow-hidden rounded-[22px] border border-[var(--color-gold)]/25 bg-gradient-to-br from-[#2a1710] via-[#241009] to-[#3a1d2a] p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] sm:p-10 lg:p-12${
            active ? " spa-experience-card--active" : ""
          }`}
        >
          <div
            className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[var(--color-wisteria)]/20 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[var(--color-gold)]/10 blur-3xl"
            aria-hidden
          />
          <div
            className="spa-experience-card__glow pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(201,123,178,0.16),transparent_52%),radial-gradient(circle_at_15%_85%,rgba(201,169,110,0.1),transparent_48%)]"
            aria-hidden
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-12">
            <div>
              <div {...clickableProps}>
                <h3 className="display text-4xl leading-tight text-[var(--color-cream)] sm:text-5xl">
                  {name}
                </h3>
                {teaser ? (
                  <div className="mt-5 flex items-end justify-between gap-4">
                    <p className="max-w-xl text-[18px] leading-8 text-[var(--color-cream)]/80">
                      {teaser}
                    </p>
                    {chevron}
                  </div>
                ) : (
                  <div className="mt-3 flex justify-end">{chevron}</div>
                )}
              </div>
              {detailPanel}
            </div>
            <div className="flex flex-col gap-5 lg:items-end">
              {(temperature || priceDurationLine || cardOnlyPrice) && (
                <div className="flex flex-col gap-2 lg:items-end lg:text-right">
                  {temperature && (
                    <span className="inline-flex w-fit items-center rounded-full border border-[var(--color-cream)]/20 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--color-cream)]/70">
                      {temperature}
                    </span>
                  )}
                  {cardOnlyPrice && (
                    <p className="text-[11px] text-[var(--color-gold)]/90">
                      {cardOnlyPrice}
                    </p>
                  )}
                  {priceDurationLine && (
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-gold)]/90">
                      {priceDurationLine}
                    </p>
                  )}
                </div>
              )}
              {tiersToggle}
              {tiersPanel}
              <div
                className={`grid w-full transition-all duration-500 ease-out ${
                  active
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">{featuredActions}</div>
              </div>
            </div>
          </div>
        </article>
        {giftModal}
      </>
    );
  }

  return (
    <>
      <article
        className={`spa-experience-card relative flex h-full flex-col overflow-hidden rounded-[18px] border border-[var(--color-cream)]/10 bg-gradient-to-br from-[var(--color-cream)]/[0.05] via-[var(--color-cream)]/[0.02] to-transparent p-6 backdrop-blur sm:p-7${
          active ? " spa-experience-card--active" : ""
        }${className ? ` ${className}` : ""}`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(201,123,178,0.06),transparent_55%)]"
          aria-hidden
        />
        <div
          className="spa-experience-card__glow pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(201,123,178,0.14),transparent_52%),radial-gradient(circle_at_20%_90%,rgba(201,169,110,0.08),transparent_45%)]"
          aria-hidden
        />

        <div className="relative flex flex-1 flex-col">
          <div {...clickableProps}>
            <div className="flex items-start justify-between gap-4">
              <h3 className="display min-w-0 flex-1 text-2xl leading-snug text-[var(--color-cream)] sm:text-[26px]">
                {name}
              </h3>
              <div className="flex shrink-0 flex-col items-end gap-2">
                {(temperature || priceDurationLine || cardOnlyPrice) && (
                  <>
                    {temperature && (
                      <span className="inline-flex w-fit items-center rounded-full border border-[var(--color-cream)]/15 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.14em] text-[var(--color-cream)]/55">
                        {temperature}
                      </span>
                    )}
                    {cardOnlyPrice && (
                      <p className="text-[11px] text-[var(--color-gold)]/90">
                        {cardOnlyPrice}
                      </p>
                    )}
                    {priceDurationLine && (
                      <p className="text-right text-[10px] uppercase leading-relaxed tracking-[0.14em] text-[var(--color-gold)]/85">
                        {priceDurationLine}
                      </p>
                    )}
                  </>
                )}
                {chevron}
              </div>
            </div>

            {teaser && (
              <div className="mt-4">
                <p className="text-[16px] leading-7 text-[var(--color-cream)]/72">
                  {teaser}
                </p>
              </div>
            )}

            {detailPanel}
          </div>

          {tiersToggle && <div className="relative mt-4">{tiersToggle}</div>}
          {tiersPanel}
        </div>

        <div
          className={`relative grid transition-all duration-500 ease-out ${
            active
              ? "mt-5 grid-rows-[1fr] opacity-100 sm:mt-6"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-[var(--color-cream)]/[0.06] pt-4">
              {compactActions}
            </div>
          </div>
        </div>
      </article>
      {giftModal}
    </>
  );
}
