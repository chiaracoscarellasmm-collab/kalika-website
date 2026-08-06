import Link from "next/link";
import { Gift } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/page-metadata";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
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
  return pageMetadata(raw as Locale, "/spa/coppia", {
    title: dict.spa.coppia.title,
    description: dict.spa.coppia.intro,
  });
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
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: dict.nav.home, path: "" },
          { name: dict.nav.spa, path: "/spa" },
          { name: dict.spa.coppia.title, path: "/spa/coppia" },
        ]}
      />
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
            giftDesign="coppia"
            alwaysShowFeaturedActions
          />
        </div>
      </section>

      <section className="border-t border-[var(--color-line)] bg-[var(--color-blush)] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="script text-4xl text-[var(--color-mauve)]">
              {dict.home.giftOverline}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-8 text-[var(--color-espresso)]/75">
              {locale === "it"
                ? "Un'esperienza da condividere, una coccola da ricordare."
                : "An experience to share, a moment of care to remember."}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
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
