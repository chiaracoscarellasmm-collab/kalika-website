import Link from "next/link";
import { Gift } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { RitualCard } from "@/components/RitualCard";
import { coppia } from "@/lib/treatments";
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
        title={dict.spa.coppia.title}
        subtitle={dict.spa.coppia.intro}
        variant="spa"
      />

      <section className="bg-[#1f120c] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {coppia.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.06}>
                <RitualCard treatment={t} locale={locale} dict={dict} />
              </Reveal>
            ))}
          </div>
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
