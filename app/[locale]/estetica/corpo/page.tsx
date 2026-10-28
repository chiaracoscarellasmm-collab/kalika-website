import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { localePath } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/page-metadata";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { PageHero } from "@/components/PageHero";
import { TreatmentList } from "@/components/TreatmentList";
import { SiceHomeCareSection } from "@/components/SiceHomeCareSection";
import { SectionWhatsapp } from "@/components/SectionWhatsapp";
import { Reveal } from "@/components/Reveal";
import { corpoGroups } from "@/lib/treatments";
import { formatEmphasis } from "@/lib/format-emphasis";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/estetica/corpo">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return pageMetadata(raw as Locale, "/estetica/corpo", {
    title: dict.estetica.corpo.title,
    description: dict.estetica.corpo.intro,
  });
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
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: dict.nav.home, path: "" },
          { name: dict.nav.estetica, path: "/estetica" },
          { name: dict.estetica.corpo.title, path: "/estetica/corpo" },
        ]}
      />
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
              {formatEmphasis(dict.estetica.sice.incipit)}
            </p>
          </Reveal>
          <TreatmentList
            groups={corpoGroups}
            locale={locale}
            priceLabel={dict.common.price}
            dict={dict}
          />
          <Reveal>
            <Link
              href={localePath(locale, "/spa/rituali-dal-mondo")}
              className="group mt-16 grid overflow-hidden rounded-[18px] border border-[var(--color-line)] bg-white/60 transition-colors hover:border-[var(--color-mauve)]/40 sm:grid-cols-[220px_1fr]"
            >
              <div className="relative aspect-[16/9] sm:aspect-auto">
                <Image
                  src="/images/rituali-dal-mondo/bora-bora.jpg"
                  alt={
                    locale === "it"
                      ? "Prodotti del Rituale Bora Bora con conchiglie"
                      : "Bora Bora Ritual products with seashells"
                  }
                  fill
                  sizes="(max-width: 640px) 100vw, 220px"
                  quality={75}
                  className="object-cover object-center"
                />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-mauve)]">
                  {locale === "it" ? "Anche in cabina" : "Also in the cabin"}
                </p>
                <h2 className="display mt-2 text-[28px] leading-tight text-[var(--color-brown)]">
                  {dict.spa.ritualiMondo.title}
                </h2>
                <p className="mt-3 text-[16px] leading-7 text-[var(--color-espresso)]/75">
                  {locale === "it"
                    ? "Bora Bora, India, Kyoto, Amazzonia e Himalaya: rituali completi con scrub, impacco e massaggio, da vivere in cabina o in SPA."
                    : "Bora Bora, India, Kyoto, Amazonia and Himalaya: complete rituals with scrub, wrap and massage, in the cabin or in the SPA."}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--color-mauve)] transition-colors group-hover:text-[var(--color-brown)]">
                  {dict.common.discover}
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </Reveal>
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
