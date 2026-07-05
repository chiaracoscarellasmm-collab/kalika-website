import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { localePath } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { PopularTreatmentCards } from "@/components/PopularTreatmentCards";
import { SectionWhatsapp } from "@/components/SectionWhatsapp";
import { notFound } from "next/navigation";
import {
  visoGroups,
  corpoGroups,
  massaggiGroups,
  pick,
} from "@/lib/treatments";

export async function generateMetadata({ params }: PageProps<"/[locale]/estetica">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return { title: dict.estetica.hero, description: dict.estetica.heroSubtitle };
}

export default async function EsteticaPage({ params }: PageProps<"/[locale]/estetica">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  const categories = [
    {
      key: "viso",
      label: dict.estetica.catViso,
      variant: "estetica" as const,
      src: "/Viso.jpeg",
    },
    {
      key: "corpo",
      label: dict.estetica.catCorpo,
      variant: "blush" as const,
      src: "/Corpo.jpg",
    },
    {
      key: "massaggi",
      label: dict.estetica.catMassaggi,
      variant: "warm" as const,
      src: "/Massaggi.jpg",
    },
    {
      key: "mani-piedi",
      label: dict.estetica.catManiPiedi,
      variant: "estetica" as const,
      src: "/Mani%20e%20Piedi.jpg",
    },
    {
      key: "epilazione",
      label: dict.estetica.catEpilazione,
      variant: "blush" as const,
      src: "/Epilazione.jpg",
    },
    {
      key: "sopracciglia",
      label: dict.estetica.catSopracciglia,
      variant: "warm" as const,
      src: "/Sguardo%20%26%20Make%20up.jpg",
    },
  ];

  const popular = [
    visoGroups[0].treatments[0],
    corpoGroups[0].treatments[1],
    massaggiGroups[1].treatments[0],
  ];

  return (
    <>
      <PageHero
        overline={dict.home.introOverline}
        title={dict.estetica.hero}
        subtitle={dict.estetica.heroSubtitle}
        variant="estetica"
      />

      {/* Intro */}
      <section className="bg-[var(--color-cream)] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="text-[var(--color-espresso)]/80 leading-8 sm:text-lg">
              {dict.estetica.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Categories grid */}
      <section className="bg-[var(--color-cream)] pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {categories.map((c, i) => (
              <Reveal key={c.key} delay={i * 0.05}>
                <Link
                  href={localePath(locale, `/estetica/${c.key}`)}
                  className="group block overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[rgba(107,58,42,0.08)]"
                >
                  {"src" in c && c.src ? (
                    <div className="relative aspect-[5/4] overflow-hidden">
                      <Image
                        src={c.src}
                        alt={c.label}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={75}
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <ImagePlaceholder
                      variant={c.variant}
                      aspect="aspect-[5/4]"
                      rounded="rounded-none"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="flex items-center justify-between p-6">
                    <h3 className="display text-2xl text-[var(--color-brown)]">
                      {c.label}
                    </h3>
                    <ArrowRight
                      size={18}
                      className="text-[var(--color-mauve)] transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Popular */}
      <section className="relative overflow-hidden border-y border-[var(--color-line)] py-24">
        <Image
          src="/sfondo_headspa_2560x1700.jpg"
          alt=""
          fill
          quality={80}
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal>
            <h2 className="display text-center text-3xl text-white drop-shadow-md sm:text-4xl">
              {dict.estetica.popularTitle}
            </h2>
          </Reveal>
          <PopularTreatmentCards treatments={popular} locale={locale} />
        </div>
      </section>

      {/* PDF download */}
      <section className="bg-[var(--color-cream)] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="display text-3xl text-[var(--color-brown)] sm:text-4xl">
              {dict.estetica.downloadTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 text-[var(--color-espresso)]/75">
              {dict.estetica.downloadBody}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="/listino-estetica.pdf"
              download
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-[var(--color-brown)] px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-[var(--color-brown)] transition-colors hover:bg-[var(--color-brown)] hover:text-[var(--color-cream)]"
            >
              <Download size={16} />
              {dict.common.downloadPdf}
            </a>
          </Reveal>
        </div>
      </section>

      <SectionWhatsapp dict={dict} topic={dict.estetica.hero} />
    </>
  );
}
