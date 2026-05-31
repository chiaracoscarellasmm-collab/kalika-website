import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TreatmentList } from "@/components/TreatmentList";
import { SectionWhatsapp } from "@/components/SectionWhatsapp";
import { percorsi } from "@/lib/treatments";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/spa/percorsi">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return {
    title: dict.spa.percorsi.title,
    description: dict.spa.percorsi.intro,
  };
}

export default async function PercorsiPage({
  params,
}: PageProps<"/[locale]/spa/percorsi">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        overline={dict.spa.heroOverline}
        title={dict.spa.percorsi.title}
        subtitle={dict.spa.percorsi.intro}
        variant="spa"
      />

      <section className="bg-[#1f120c] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <TreatmentList
            groups={percorsi}
            locale={locale}
            durationLabel={dict.common.duration}
            priceLabel={dict.common.price}
            variant="spa"
          />
          <Reveal>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-wisteria)]/40 bg-[var(--color-wisteria)]/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--color-wisteria)]">
              {dict.spa.percorsi.discount}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Practical info */}
      <section className="border-t border-[var(--color-cream)]/10 bg-[#1f120c] py-24">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="display text-3xl text-[var(--color-cream)] sm:text-4xl">
              {dict.spa.percorsi.infoTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                dict.spa.percorsi.infoDuration,
                dict.spa.percorsi.infoPersons,
                dict.spa.percorsi.infoIncludes,
              ].map((line) => (
                <li
                  key={line}
                  className="rounded-2xl border border-[var(--color-cream)]/10 bg-[var(--color-cream)]/[0.04] p-6 text-[17px] leading-8 text-[var(--color-cream)]/80 sm:text-lg"
                >
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <SectionWhatsapp
        dict={dict}
        topic={dict.spa.percorsi.title}
        variant="spa"
      />
    </>
  );
}
