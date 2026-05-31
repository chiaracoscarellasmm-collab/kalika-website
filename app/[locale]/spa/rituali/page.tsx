import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { RitualCard } from "@/components/RitualCard";
import { SectionWhatsapp } from "@/components/SectionWhatsapp";
import { rituali } from "@/lib/treatments";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/spa/rituali">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return {
    title: dict.spa.rituali.title,
    description: dict.spa.rituali.intro,
  };
}

export default async function RitualiPage({
  params,
}: PageProps<"/[locale]/spa/rituali">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        overline={dict.spa.heroOverline}
        title={dict.spa.rituali.title}
        subtitle={dict.spa.rituali.intro}
        variant="spa"
      />

      <section className="bg-[#1f120c] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="script text-3xl text-[var(--color-wisteria)]">
              {dict.spa.rituali.includes}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#1f120c] pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rituali.map((t, i) => (
              <Reveal key={t.id} delay={(i % 6) * 0.04}>
                <RitualCard treatment={t} locale={locale} dict={dict} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionWhatsapp
        dict={dict}
        topic={dict.spa.rituali.title}
        variant="spa"
      />
    </>
  );
}
