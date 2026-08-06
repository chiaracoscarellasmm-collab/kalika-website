import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/page-metadata";
import { localePath } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SpaHeroVideo } from "@/components/SpaHeroVideo";
import { Reveal } from "@/components/Reveal";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { PopularTreatmentCards } from "@/components/PopularTreatmentCards";
import { SectionWhatsapp } from "@/components/SectionWhatsapp";
import { notFound } from "next/navigation";
import {
  visoGroups,
  riflessologiaCorporeaTreatment,
  type Treatment,
} from "@/lib/treatments";

export async function generateMetadata({ params }: PageProps<"/[locale]/estetica">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return pageMetadata(raw as Locale, "/estetica", {
    title: dict.estetica.hero,
    description: dict.estetica.heroSubtitle,
  });
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
      src: "/trattamento-viso-maschera-pennello.jpeg",
      alt:
        locale === "it"
          ? "Applicazione di una maschera cremosa sul viso con pennello a ventaglio"
          : "Creamy face mask being applied with a fan brush",
    },
    {
      key: "corpo",
      label: dict.estetica.catCorpo,
      variant: "blush" as const,
      src: "/massaggio-coscia-trattamento-corpo.jpg",
      alt:
        locale === "it"
          ? "Dettaglio di un massaggio professionale sulla coscia con olio"
          : "Detail of a professional thigh massage with oil",
    },
    {
      key: "massaggi",
      label: dict.estetica.catMassaggi,
      variant: "warm" as const,
      src: "/massaggio-olio-dal-flacone.jpg",
      alt:
        locale === "it"
          ? "Operatrice in uniforme che versa olio da un flacone per un massaggio sulla schiena"
          : "Therapist in uniform pouring oil from a bottle for a back massage",
    },
    {
      key: "mani-piedi",
      label: dict.estetica.catManiPiedi,
      variant: "estetica" as const,
      src: "/manicure-cura-unghie.jpg",
      alt:
        locale === "it"
          ? "Mani durante una manicure professionale, con guanto rosa e cura delle unghie"
          : "Hands during a professional manicure with a pink glove",
    },
    {
      key: "epilazione",
      label: dict.estetica.catEpilazione,
      variant: "blush" as const,
      src: "/cera-epilazione-spatola.jpg",
      alt:
        locale === "it"
          ? "Spatola in legno da cui cola cera densa e trasparente per l'epilazione"
          : "Wooden spatula with thick transparent wax dripping for hair removal",
    },
    {
      key: "sopracciglia",
      label: dict.estetica.catSopracciglia,
      variant: "warm" as const,
      src: "/modellamento-sopracciglia-pinzette.jpg",
      alt:
        locale === "it"
          ? "Primo piano di un trattamento di modellamento sopracciglia con pinzette e scovolino"
          : "Close-up of an eyebrow shaping treatment with tweezers and spoolie",
    },
  ];

  const popular: { treatment: Treatment; href: string }[] = [
    {
      treatment: visoGroups[0].treatments[0],
      href: localePath(locale, "/estetica/viso#pulizia-viso"),
    },
    {
      treatment: {
        ...riflessologiaCorporeaTreatment,
        name: {
          it: "Massaggio di Riflessologia",
          en: "Reflexology Massage",
        },
      },
      href: localePath(locale, "/estetica/massaggi#riflessologia-corporea"),
    },
    {
      treatment: {
        id: "rituali-spa-suite",
        name: {
          it: "Rituali in SPA SUITE",
          en: "Rituals in SPA SUITE",
        },
      },
      href: localePath(locale, "/spa/rituali"),
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: dict.nav.home, path: "" },
          { name: dict.nav.estetica, path: "/estetica" },
        ]}
      />
      <SpaHeroVideo
        title={dict.estetica.hero}
        subtitle={dict.estetica.heroSubtitle}
        subtitleVariant="text"
        scrollHref="#categorie"
        videoSrc={`${process.env.NEXT_PUBLIC_R2_URL}/flower.mp4?v=5`}
        poster="/flower-poster.jpg"
        navAriaLabel={locale === "it" ? "Sezioni estetica" : "Beauty sections"}
        navItems={categories.map((c) => ({
          href: `#${c.key}`,
          label: c.label,
        }))}
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
      <section id="categorie" className="scroll-mt-28 bg-[var(--color-cream)] pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {categories.map((c, i) => (
              <Reveal key={c.key} delay={i * 0.05}>
                <Link
                  href={localePath(locale, `/estetica/${c.key}`)}
                  id={c.key}
                  className="group block scroll-mt-28 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[rgba(107,58,42,0.08)]"
                >
                  {"src" in c && c.src ? (
                    <div className="relative aspect-[5/4] overflow-hidden">
                      <Image
                        src={c.src}
                        alt={c.alt}
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
          src="/sfondo-ombra-foglia-su-sabbia.jpg"
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
