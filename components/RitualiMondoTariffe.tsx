import type { Locale } from "@/lib/i18n";
import { pick } from "@/lib/treatments";
import {
  RITUALI_MONDO_COMPLETE,
  RITUALI_MONDO_PRICES,
  RITUALI_MONDO_SETTINGS,
  type RitualSetting,
} from "@/lib/rituali-dal-mondo";
import { Reveal } from "./Reveal";

const SETTINGS: RitualSetting[] = ["cabina", "spa"];

export function RitualiMondoTariffe({ locale }: { locale: Locale }) {
  return (
    <section id="tariffe" className="scroll-mt-24 bg-[#1f120c] pb-20 pt-14">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <div className="text-center">
            <p className="script text-3xl text-[var(--color-wisteria)]/70 sm:text-4xl">
              {locale === "it" ? "Tariffe" : "Rates"}
            </p>
            <p className="mt-4 text-[17px] leading-8 text-[var(--color-cream)]/80">
              {pick(RITUALI_MONDO_COMPLETE, locale)}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 overflow-hidden rounded-[18px] border border-[var(--color-cream)]/10 bg-[var(--color-cream)]/[0.03]">
            <div className="hidden grid-cols-[1fr_200px_200px] gap-6 border-b border-[var(--color-cream)]/10 px-6 py-5 sm:grid">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-cream)]/50">
                {locale === "it" ? "Durata" : "Length"}
              </span>
              {SETTINGS.map((s) => (
                <div key={s} className="text-right">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gold)]/90">
                    {pick(RITUALI_MONDO_SETTINGS[s].label, locale)}
                  </span>
                  <p className="mt-1 text-[12px] leading-5 text-[var(--color-cream)]/55">
                    {pick(RITUALI_MONDO_SETTINGS[s].detail, locale)}
                  </p>
                </div>
              ))}
            </div>

            <ul className="divide-y divide-[var(--color-cream)]/10">
              {RITUALI_MONDO_PRICES.map((row) => (
                <li
                  key={row.duration.it}
                  className="px-6 py-5 sm:grid sm:grid-cols-[1fr_200px_200px] sm:items-center sm:gap-6"
                >
                  <p className="display text-[26px] leading-none text-[var(--color-cream)]">
                    {pick(row.duration, locale)}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:contents">
                    {SETTINGS.map((s) => (
                      <div
                        key={s}
                        className="rounded-xl border border-[var(--color-cream)]/10 px-4 py-3 sm:rounded-none sm:border-0 sm:p-0 sm:text-right"
                      >
                        <span className="block text-[10px] uppercase tracking-[0.16em] text-[var(--color-cream)]/50 sm:hidden">
                          {pick(RITUALI_MONDO_SETTINGS[s].label, locale)}
                        </span>
                        <span className="mt-1 block text-[17px] font-medium text-[var(--color-gold)] sm:mt-0">
                          {pick(row.prices[s], locale)}
                        </span>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-5 grid gap-2 text-center text-[13px] leading-6 text-[var(--color-cream)]/55 sm:hidden">
            {SETTINGS.map((s) => (
              <p key={s}>
                <span className="text-[var(--color-gold)]/80">
                  {pick(RITUALI_MONDO_SETTINGS[s].label, locale)}:
                </span>{" "}
                {pick(RITUALI_MONDO_SETTINGS[s].detail, locale)}
              </p>
            ))}
          </div>
          <p className="mt-5 text-center text-[13px] leading-6 text-[var(--color-cream)]/55">
            {locale === "it"
              ? "Le tariffe valgono per tutti i rituali."
              : "Rates apply to every ritual."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
