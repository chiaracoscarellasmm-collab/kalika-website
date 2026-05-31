import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TreatmentList } from "@/components/TreatmentList";
import { SectionWhatsapp } from "@/components/SectionWhatsapp";
import { visoGroups } from "@/lib/treatments";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/estetica/viso">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return {
    title: dict.estetica.viso.title,
    description: dict.estetica.viso.intro,
  };
}

export default async function VisoPage({
  params,
}: PageProps<"/[locale]/estetica/viso">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        title={dict.estetica.viso.title}
        subtitle={dict.estetica.viso.intro}
        variant="estetica"
      />
      <section className="bg-[var(--color-cream)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <TreatmentList
            groups={visoGroups}
            locale={locale}
            durationLabel={dict.common.duration}
            priceLabel={dict.common.price}
          />
        </div>
      </section>
      <SectionWhatsapp dict={dict} topic={dict.estetica.viso.title} />
    </>
  );
}
