import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/PageHero";
import { TreatmentList } from "@/components/TreatmentList";
import { FeaturedMethodBlock } from "@/components/FeaturedMethodBlock";
import { SectionWhatsapp } from "@/components/SectionWhatsapp";
import {
  massaggiGroups,
  panciaPiattaTreatment,
  riflessologiaCorporeaTreatment,
} from "@/lib/treatments";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/estetica/massaggi">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return {
    title: dict.estetica.massaggi.title,
    description: dict.estetica.massaggi.intro,
  };
}

export default async function MassaggiPage({
  params,
}: PageProps<"/[locale]/estetica/massaggi">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const m = dict.estetica.massaggi;

  return (
    <>
      <PageHero
        title={m.title}
        subtitle={m.intro}
        variant="estetica"
      />
      <section className="bg-[var(--color-cream)] py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
          <FeaturedMethodBlock
            treatment={panciaPiattaTreatment}
            locale={locale}
            dict={dict}
            priceLabel={dict.common.price}
            eyebrow={m.panciaPiattaEyebrow}
            body={m.panciaPiattaBody}
            imageSrc="/kalika_estetica_prata_pordenone_massaggi_metodopanciapiatta.png"
            imageAlt={m.panciaPiattaImageAlt}
          />
          <FeaturedMethodBlock
            treatment={riflessologiaCorporeaTreatment}
            locale={locale}
            dict={dict}
            priceLabel={dict.common.price}
            eyebrow={m.riflessologiaEyebrow}
            body={m.riflessologiaBody}
            imageSrc="/kalika_estetica_prata_pordenone_massaggi_riflessologiacorporea_7.jpg"
            imageAlt={m.riflessologiaImageAlt}
          />
        </div>
      </section>
      <section className="border-t border-[var(--color-line)] bg-[var(--color-cream)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <TreatmentList
            groups={massaggiGroups}
            locale={locale}
            priceLabel={dict.common.price}
            dict={dict}
          />
        </div>
      </section>
      <SectionWhatsapp dict={dict} topic={m.title} />
    </>
  );
}
