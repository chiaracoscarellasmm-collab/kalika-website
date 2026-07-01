import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { Reveal } from "@/components/Reveal";
import { GiftCardForm } from "@/components/GiftCardForm";
import { getGiftCardUi } from "@/lib/giftcard-ui";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/gift-card">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return {
    title: dict.giftcard.hero,
    description:
      "Gift Card per trattamenti estetici, rituali SPA e percorsi benessere a Prata di Pordenone.",
  };
}

export default async function GiftCardPage({
  params,
}: PageProps<"/[locale]/gift-card">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const ui = getGiftCardUi(locale);

  return (
    <>
      <section className="bg-[var(--color-cream)] pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <p className="script text-3xl text-[var(--color-mauve)] sm:text-4xl">
              {ui.heroOverline}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display mt-4 text-5xl leading-tight text-[var(--color-brown)] sm:text-6xl">
              {ui.heroTitle}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-7 max-w-3xl text-[17px] leading-8 text-[var(--color-espresso)]/78 sm:text-lg">
              {ui.heroSubtitle}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[var(--color-line)] bg-[var(--color-cream)] pb-28 pt-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <GiftCardForm locale={locale} dict={dict} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
