import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/PageHero";
import { TreatmentList } from "@/components/TreatmentList";
import { SiceHomeCareSection } from "@/components/SiceHomeCareSection";
import { SectionWhatsapp } from "@/components/SectionWhatsapp";
import { Reveal } from "@/components/Reveal";
import { corpoGroups } from "@/lib/treatments";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/estetica/corpo">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return {
    title: dict.estetica.corpo.title,
    description: dict.estetica.corpo.intro,
  };
}

export default async function CorpoPage({
  params,
}: PageProps<"/[locale]/estetica/corpo">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        title={dict.estetica.corpo.title}
        subtitle={dict.estetica.corpo.intro}
        variant="estetica"
        compact
      />
      <section className="bg-[var(--color-cream)] pb-20 pt-6 sm:pt-8">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <p className="mx-auto mb-8 max-w-[65ch] text-center text-[19px] leading-8 text-[var(--color-espresso)]/80 sm:mb-10 sm:text-[21px] sm:leading-9">
              {dict.estetica.sice.incipit}
            </p>
          </Reveal>
          <TreatmentList
            groups={corpoGroups}
            locale={locale}
            priceLabel={dict.common.price}
            dict={dict}
          />
          <SiceHomeCareSection
            dict={dict}
            imageSrc="/linea-prodotti-sice.jpg"
            imageAlt={dict.estetica.sice.corpoImageAlt}
          />
        </div>
      </section>
      <SectionWhatsapp dict={dict} topic={dict.estetica.corpo.title} />
    </>
  );
}
