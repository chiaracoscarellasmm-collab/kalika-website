import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/page-metadata";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { RitualeMondoBlock } from "@/components/RitualeMondoBlock";
import { RitualiMondoTariffe } from "@/components/RitualiMondoTariffe";
import { SectionWhatsapp } from "@/components/SectionWhatsapp";
import { pick } from "@/lib/treatments";
import { RITUALI_MONDO_INTRO, ritualiDalMondo } from "@/lib/rituali-dal-mondo";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/spa/rituali-dal-mondo">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return pageMetadata(raw as Locale, "/spa/rituali-dal-mondo", {
    title: dict.spa.ritualiMondo.title,
    description: dict.spa.ritualiMondo.metaDescription,
  });
}

export default async function RitualiDalMondoPage({
  params,
}: PageProps<"/[locale]/spa/rituali-dal-mondo">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: dict.nav.home, path: "" },
          { name: dict.nav.spa, path: "/spa" },
          { name: dict.spa.ritualiMondo.title, path: "/spa/rituali-dal-mondo" },
        ]}
      />
      <PageHero
        overline={dict.spa.heroOverline}
        title={dict.spa.ritualiMondo.title}
        subtitle={pick(RITUALI_MONDO_INTRO, locale)}
        variant="spa"
      />

      <RitualiMondoTariffe locale={locale} />

      <section className="bg-[#1f120c] pb-28">
        <div className="mx-auto max-w-6xl space-y-24 px-6 lg:px-10">
          {ritualiDalMondo.map((family) => (
            <section key={family.id} id={family.id} className="scroll-mt-24">
              <Reveal>
                <div className="border-t border-[var(--color-cream)]/10 pt-14">
                  <h2 className="display text-3xl text-[var(--color-cream)] sm:text-[34px]">
                    {pick(family.title, locale)}
                  </h2>
                  {family.intro && (
                    <p className="mt-3 max-w-3xl text-[16px] leading-7 text-[var(--color-cream)]/65">
                      {pick(family.intro, locale)}
                    </p>
                  )}
                </div>
              </Reveal>
              <div className="mt-12 space-y-20">
                {family.rituals.map((ritual, i) => (
                  <RitualeMondoBlock
                    key={ritual.id}
                    ritual={ritual}
                    locale={locale}
                    dict={dict}
                    reverse={i % 2 === 1}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <SectionWhatsapp
        dict={dict}
        topic={dict.spa.ritualiMondo.title}
        variant="spa"
      />
    </>
  );
}
