import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TreatmentList } from "@/components/TreatmentList";
import { SectionWhatsapp } from "@/components/SectionWhatsapp";
import {
  epilazioneGroups,
  pick,
  PRICE_PLACEHOLDER,
} from "@/lib/treatments";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/estetica/epilazione">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return {
    title: dict.estetica.epilazione.title,
    description: dict.estetica.epilazione.intro,
  };
}

export default async function EpilazionePage({
  params,
}: PageProps<"/[locale]/estetica/epilazione">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const laser = epilazioneGroups.find((g) => g.id === "laser-808")!;
  const traditional = epilazioneGroups.filter((g) => g.id !== "laser-808");

  return (
    <>
      <PageHero
        title={dict.estetica.epilazione.title}
        subtitle={dict.estetica.epilazione.intro}
        variant="estetica"
      />

      <section className="bg-[var(--color-cream)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <TreatmentList
            groups={traditional}
            locale={locale}
            durationLabel={dict.common.duration}
            priceLabel={dict.common.price}
          />
        </div>
      </section>

      {/* Laser block */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-blush)]/50 py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-mauve)]">
                  {dict.estetica.epilazione.title}
                </p>
                <h2 className="display mt-3 text-4xl text-[var(--color-brown)] sm:text-5xl">
                  {dict.estetica.epilazione.laserTitle}
                </h2>

                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="display text-xl text-[var(--color-brown)]">
                      {dict.estetica.epilazione.laserHow}
                    </h3>
                    <p className="mt-2 text-[17px] leading-8 text-[var(--color-espresso)]/80 sm:text-lg">
                      {dict.estetica.epilazione.laserHowBody}
                    </p>
                  </div>
                  <div>
                    <h3 className="display text-xl text-[var(--color-brown)]">
                      {dict.estetica.epilazione.laserSuitable}
                    </h3>
                    <p className="mt-2 text-[17px] leading-8 text-[var(--color-espresso)]/80 sm:text-lg">
                      {dict.estetica.epilazione.laserSuitableBody}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex items-center justify-center">
                {/* simple body silhouette SVG */}
                <svg
                  viewBox="0 0 200 360"
                  width="220"
                  height="360"
                  fill="none"
                  stroke="var(--color-mauve)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-80"
                  aria-hidden
                >
                  <circle cx="100" cy="40" r="22" />
                  <path d="M70 80 L130 80 L150 200 L130 220 L130 340 L110 340 L100 240 L90 340 L70 340 L70 220 L50 200 Z" />
                  <line x1="70" y1="90" x2="35" y2="190" />
                  <line x1="130" y1="90" x2="165" y2="190" />
                  <circle cx="35" cy="190" r="3" fill="var(--color-wisteria)" stroke="none" />
                  <circle cx="165" cy="190" r="3" fill="var(--color-wisteria)" stroke="none" />
                </svg>
              </div>
            </Reveal>
          </div>

          {/* Zones table */}
          <Reveal delay={0.15}>
            <div className="mt-16">
              <h3 className="display text-2xl text-[var(--color-brown)]">
                {dict.estetica.epilazione.laserZones}
              </h3>
              <ul className="mt-6 divide-y divide-[var(--color-line)] rounded-2xl border border-[var(--color-line)] bg-white">
                {laser.treatments.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center justify-between px-5 py-4"
                  >
                    <span className="text-[var(--color-espresso)]">
                      {pick(t.name, locale)}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-mauve)]">
                      {pick(PRICE_PLACEHOLDER, locale)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionWhatsapp dict={dict} topic={dict.estetica.epilazione.title} />
    </>
  );
}
