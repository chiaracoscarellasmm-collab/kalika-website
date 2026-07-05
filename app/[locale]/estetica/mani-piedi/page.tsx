import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/PageHero";
import { TreatmentList } from "@/components/TreatmentList";
import { SectionWhatsapp } from "@/components/SectionWhatsapp";
import { maniPiediGroups } from "@/lib/treatments";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/estetica/mani-piedi">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return {
    title: dict.estetica.maniPiedi.title,
    description: dict.estetica.maniPiedi.intro,
  };
}

export default async function ManiPiediPage({
  params,
}: PageProps<"/[locale]/estetica/mani-piedi">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        title={dict.estetica.maniPiedi.title}
        subtitle={dict.estetica.maniPiedi.intro}
        variant="estetica"
      />
      <section className="bg-[var(--color-cream)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <TreatmentList
            groups={maniPiediGroups}
            locale={locale}
            priceLabel={dict.common.price}
          />
        </div>
      </section>
      <SectionWhatsapp dict={dict} topic={dict.estetica.maniPiedi.title} />
    </>
  );
}
