import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SpaCategorySections } from "@/components/SpaCategorySections";
import { SpaIncludesNote } from "@/components/SpaIncludesNote";
import { SpaPercorsiTariffe } from "@/components/SpaPercorsiTariffe";
import { SectionWhatsapp } from "@/components/SectionWhatsapp";
import { percorsiCategory } from "@/lib/treatments";
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

      {percorsiCategory.note && (
        <SpaIncludesNote note={percorsiCategory.note} locale={locale} />
      )}

      <section className="bg-[#1f120c] pb-20 pt-10">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <SpaCategorySections
            category={percorsiCategory}
            locale={locale}
            dict={dict}
            hideCardPricing
          />
          <Reveal>
            <p className="mt-12 text-[17px] leading-8 text-[var(--color-cream)]/75 sm:text-lg">
              {dict.spa.percorsi.infoWrap}
            </p>
          </Reveal>
        </div>
      </section>

      <SpaPercorsiTariffe category={percorsiCategory} locale={locale} dict={dict} />

      <SectionWhatsapp
        dict={dict}
        topic={dict.spa.percorsi.title}
        variant="spa"
      />
    </>
  );
}
