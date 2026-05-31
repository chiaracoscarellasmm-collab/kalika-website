import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GiftCardForm } from "@/components/GiftCardForm";
import { LotusDivider } from "@/components/LotusDivider";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/gift-card">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return {
    title: dict.giftcard.hero,
    description: dict.giftcard.heroSubtitle,
  };
}

export default async function GiftCardPage({
  params,
}: PageProps<"/[locale]/gift-card">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        overline={dict.giftcard.heroOverline}
        title={dict.giftcard.hero}
        subtitle={dict.giftcard.heroSubtitle}
        variant="cream"
      />

      <section className="bg-[var(--color-cream)] py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="text-[var(--color-espresso)]/80">
              {dict.giftcard.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[var(--color-line)] bg-[var(--color-blush)]/40 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <GiftCardForm locale={locale} dict={dict} />
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--color-cream)] py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="display text-3xl text-[var(--color-brown)] sm:text-4xl">
              {dict.giftcard.howTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <ol className="mt-10 grid gap-6 text-left sm:grid-cols-3">
              {[dict.giftcard.how1, dict.giftcard.how2, dict.giftcard.how3].map(
                (step, i) => (
                  <li
                    key={step}
                    className="rounded-2xl border border-[var(--color-line)] bg-white p-6"
                  >
                    <p className="display text-3xl text-[var(--color-wisteria)]">
                      {i + 1}
                    </p>
                    <p className="mt-3 text-[17px] leading-8 text-[var(--color-espresso)]/80 sm:text-lg">
                      {step}
                    </p>
                  </li>
                ),
              )}
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <LotusDivider className="mt-14" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
