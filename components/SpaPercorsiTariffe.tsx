import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { type SpaCategory, type Treatment, pick } from "@/lib/treatments";
import { Reveal } from "./Reveal";

type Props = {
  category: SpaCategory;
  locale: Locale;
  dict: Dictionary;
};

function TariffCard({
  treatment,
  locale,
}: {
  treatment: Treatment;
  locale: Locale;
}) {
  const name = pick(treatment.name, locale);
  const duration = treatment.duration ? pick(treatment.duration, locale) : null;
  const tiers = treatment.priceTiers ?? [];
  const headlinePrice = treatment.price ? pick(treatment.price, locale) : null;

  return (
    <article className="rounded-2xl border border-[var(--color-cream)]/10 bg-[var(--color-cream)]/[0.04] p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="display text-xl leading-snug text-[var(--color-cream)] sm:text-2xl">
            {name}
          </h3>
        </div>
        {duration &&
          !treatment.sessionModes?.length && (
            <p className="shrink-0 pt-1 text-[10px] uppercase tracking-[0.16em] text-[var(--color-cream)]/45">
              {duration}
            </p>
          )}
      </div>

      {treatment.sessionModes && treatment.sessionModes.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-l border-[var(--color-gold)]/25 pl-3">
          {treatment.sessionModes.map((mode) => (
            <li
              key={pick(mode.label, locale)}
              className="text-[13px] leading-6 text-[var(--color-cream)]/65"
            >
              <span className="text-[var(--color-gold)]/85">{pick(mode.label, locale)}</span>
              {" · "}
              {pick(mode.duration, locale)}
              {mode.note && (
                <>
                  {" · "}
                  <span className="text-[var(--color-cream)]/45">{pick(mode.note, locale)}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {(tiers.length > 0 || headlinePrice) && (
      <ul className="mt-5 divide-y divide-[var(--color-cream)]/10 border-t border-[var(--color-cream)]/10 pt-1">
        {tiers.length > 0
          ? tiers.map((tier) => (
              <li
                key={pick(tier.label, locale)}
                className="flex items-baseline justify-between gap-4 py-3 first:pt-2"
              >
                <span className="text-sm text-[var(--color-cream)]/70">
                  {pick(tier.label, locale)}
                </span>
                <span className="shrink-0 text-sm text-[var(--color-gold)]">
                  {pick(tier.price, locale)}
                </span>
              </li>
            ))
          : headlinePrice && (
              <li className="flex items-baseline justify-between gap-4 py-3 first:pt-2">
                <span className="text-sm text-[var(--color-cream)]/70">
                  {locale === "it" ? "Prezzo" : "Price"}
                </span>
                <span className="shrink-0 text-sm text-[var(--color-gold)]">{headlinePrice}</span>
              </li>
            )}
      </ul>
      )}
    </article>
  );
}

export function SpaPercorsiTariffe({ category, locale, dict }: Props) {
  const labels = dict.spa.percorsi.tariffe;
  const thermalGroup = category.groups.find((g) => g.id === "percorsi-base");

  const thermalTariffs = thermalGroup
    ? [category.featured, ...thermalGroup.treatments]
    : [category.featured];

  return (
    <section className="border-t border-[var(--color-cream)]/10 bg-[#1f120c] py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <h2 className="display text-3xl text-[var(--color-cream)] sm:text-4xl">
            {labels.title}
          </h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-7 text-[var(--color-cream)]/60">
            {labels.intro}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {thermalTariffs.map((treatment) => (
              <TariffCard key={treatment.id} treatment={treatment} locale={locale} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
