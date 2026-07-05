import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/PageHero";
import { SpaCategorySections } from "@/components/SpaCategorySections";
import { SpaIncludesNote } from "@/components/SpaIncludesNote";
import { SectionWhatsapp } from "@/components/SectionWhatsapp";
import { massaggiSuiteCategory } from "@/lib/treatments";
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
        overline={dict.spa.heroOverline}
        title={dict.spa.suite.title}
        subtitle={dict.spa.suite.intro}
        variant="spa"
      />

      {massaggiSuiteCategory.note && (
        <SpaIncludesNote note={massaggiSuiteCategory.note} locale={locale} />
      )}

      <section className="bg-[#1f120c] pb-28 pt-10">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <SpaCategorySections
            category={massaggiSuiteCategory}
            locale={locale}
            dict={dict}
          />
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
