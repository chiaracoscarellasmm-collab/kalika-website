import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/PageHero";
import { TreatmentList } from "@/components/TreatmentList";
import { SectionWhatsapp } from "@/components/SectionWhatsapp";
import { sopraccigliaGroups } from "@/lib/treatments";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/estetica/sopracciglia">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return {
    title: dict.estetica.sopracciglia.title,
    description: dict.estetica.sopracciglia.intro,
  };
}

export default async function SopraccigliaPage({
  params,
}: PageProps<"/[locale]/estetica/sopracciglia">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        title={dict.estetica.sopracciglia.title}
        subtitle={dict.estetica.sopracciglia.intro}
        variant="estetica"
      />
      <section className="bg-[var(--color-cream)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <TreatmentList
            groups={sopraccigliaGroups}
            locale={locale}
            priceLabel={dict.common.price}
          />
        </div>
      </section>
      <SectionWhatsapp dict={dict} topic={dict.estetica.sopracciglia.title} />
    </>
  );
}
