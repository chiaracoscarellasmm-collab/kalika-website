import Link from "next/link";
import { Gift } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SpaCategorySections } from "@/components/SpaCategorySections";
import { SpaIncludesNote } from "@/components/SpaIncludesNote";
import { coppiaCategory } from "@/lib/treatments";
import { localePath } from "@/lib/site";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/spa/coppia">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return {
    title: dict.spa.coppia.title,
    description: dict.spa.coppia.intro,
  };
}

export default async function CoppiaPage({
  params,
}: PageProps<"/[locale]/spa/coppia">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        overline={dict.spa.heroOverline}
        title={dict.spa.coppia.title}
        subtitle={dict.spa.coppia.intro}
        variant="spa"
      />

      {coppiaCategory.note && (
        <SpaIncludesNote note={coppiaCategory.note} locale={locale} />
      )}

      <section className="bg-[#1f120c] pb-24 pt-10">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <SpaCategorySections
            category={coppiaCategory}
            locale={locale}
            dict={dict}
          />
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#1f120c] to-[var(--color-brown)] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center text-[var(--color-cream)]">
          <Reveal>
            <p className="script text-4xl text-[var(--color-wisteria)]">
              {dict.home.giftOverline}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <Link
              href={localePath(locale, "/gift-card")}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[var(--color-wisteria)] px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-white transition-colors hover:bg-[var(--color-mauve)]"
            >
              <Gift size={16} />
              {dict.home.giftCta}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
