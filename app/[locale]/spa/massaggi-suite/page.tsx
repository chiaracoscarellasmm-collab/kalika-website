import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { RitualCard } from "@/components/RitualCard";
import { SectionWhatsapp } from "@/components/SectionWhatsapp";
import { massaggiSuite } from "@/lib/treatments";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/spa/massaggi-suite">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return {
    title: dict.spa.suite.title,
    description: dict.spa.suite.intro,
  };
}

export default async function MassaggiSuitePage({
  params,
}: PageProps<"/[locale]/spa/massaggi-suite">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        title={dict.spa.suite.title}
        subtitle={dict.spa.suite.intro}
        variant="spa"
      />

      <section className="bg-[#1f120c] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {massaggiSuite.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.06}>
                <RitualCard treatment={t} locale={locale} dict={dict} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionWhatsapp
        dict={dict}
        topic={dict.spa.suite.title}
        variant="spa"
      />
    </>
  );
}
