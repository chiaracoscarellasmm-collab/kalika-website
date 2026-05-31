import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { localePath } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[locale]/spa">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return { title: dict.spa.hero, description: dict.spa.heroSubtitle };
}

export default async function SpaPage({ params }: PageProps<"/[locale]/spa">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  const cards = [
    {
      key: "rituali",
      label: dict.spa.navRituali,
      text: dict.spa.navRitualiText,
      variant: "deep" as const,
    },
    {
      key: "massaggi-suite",
      label: dict.spa.navSuite,
      text: dict.spa.navSuiteText,
      variant: "warm" as const,
    },
    {
      key: "coppia",
      label: dict.spa.navCoppia,
      text: dict.spa.navCoppiaText,
      variant: "blush" as const,
    },
    {
      key: "percorsi",
      label: dict.spa.navPercorsi,
      text: dict.spa.navPercorsiText,
      variant: "spa" as const,
    },
  ];

  return (
    <>
      <PageHero
        overline={dict.spa.heroOverline}
        title={dict.spa.hero}
        subtitle={dict.spa.heroSubtitle}
        variant="spa"
      />

      <section className="bg-[#1f120c] py-24">
        <div className="mx-auto max-w-3xl px-6 text-center text-[var(--color-cream)]">
          <Reveal>
            <p className="text-base leading-8 text-[var(--color-cream)]/80 sm:text-lg">
              {dict.spa.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#1f120c] pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {cards.map((c, i) => (
              <Reveal key={c.key} delay={i * 0.07}>
                <Link
                  href={localePath(locale, `/spa/${c.key}`)}
                  className="group relative block overflow-hidden rounded-2xl border border-[var(--color-cream)]/10"
                >
                  <div className="relative aspect-[16/10]">
                    <ImagePlaceholder
                      variant={c.variant}
                      aspect="h-full w-full"
                      rounded="rounded-none"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-8 lg:p-12">
                      <h3 className="display text-3xl text-[var(--color-cream)] sm:text-4xl">
                        {c.label}
                      </h3>
                      <p className="mt-2 max-w-xs text-[17px] leading-8 text-[var(--color-cream)]/80 sm:text-lg">
                        {c.text}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[var(--color-wisteria)] group-hover:text-white">
                        {dict.common.discover}
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
