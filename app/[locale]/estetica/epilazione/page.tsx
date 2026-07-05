import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TreatmentList } from "@/components/TreatmentList";
import { LaserZones } from "@/components/LaserZones";
import { SectionWhatsapp } from "@/components/SectionWhatsapp";
import { epilazioneGroups, laserTiers, pick } from "@/lib/treatments";
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
            groups={epilazioneGroups}
            locale={locale}
            priceLabel={dict.common.price}
          />
          <Reveal>
            <p className="mt-8 text-sm text-[var(--color-espresso)]/70">
              {locale === "it"
                ? "Eseguendo la depilazione completa viene applicato uno sconto del 10% sul totale."
                : "A 10% discount is applied to the total for a full waxing session."}
            </p>
          </Reveal>
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
              <LaserZones
                src="/images/laser-bodies-v1.png"
                alt={
                  locale === "it"
                    ? "Zone del corpo trattabili con laser, suddivise per fascia di prezzo"
                    : "Body zones treatable with laser, grouped by price band"
                }
                zonesTitle={dict.estetica.epilazione.laserZones}
                subtitle={
                  locale === "it"
                    ? "Più zone acquisti, più risparmi"
                    : "The more zones you book, the more you save"
                }
                perZone={locale === "it" ? "a zona" : "per zone"}
                tiers={laserTiers.map((t) => ({
                  color: t.zone,
                  price: pick(t.price, locale),
                }))}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <SectionWhatsapp dict={dict} topic={dict.estetica.epilazione.title} />
    </>
  );
}
