import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { pageMetadata } from "@/lib/page-metadata";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SpaCategorySections } from "@/components/SpaCategorySections";
import { SpaIncludesNote } from "@/components/SpaIncludesNote";
import { SpaPercorsiTariffe } from "@/components/SpaPercorsiTariffe";
import { SectionWhatsapp } from "@/components/SectionWhatsapp";
import { percorsiCategory } from "@/lib/treatments";
import { whatsappLink } from "@/lib/site";
import { MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/spa/percorsi">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return pageMetadata(raw as Locale, "/spa/percorsi", {
    title: dict.spa.percorsi.title,
    description: dict.spa.percorsi.intro,
  });
}

export default async function PercorsiPage({
  params,
}: PageProps<"/[locale]/spa/percorsi">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const customPairing =
    locale === "it"
      ? {
          title: "Crea il tuo percorso su misura",
          description:
            "Tutti i percorsi termali possono essere abbinati a un trattamento o a un massaggio da svolgere al di fuori della suite Thalatepee. Scrivici quale abbinamento desideri: ti aiuteremo a comporre l'esperienza più adatta a te.",
          cta: "Scrivici su WhatsApp",
          message:
            "Vorrei abbinare un trattamento o un massaggio al percorso termale. Potete aiutarmi a scegliere?",
        }
      : {
          title: "Create your tailored journey",
          description:
            "Every thermal journey can be paired with a treatment or massage performed outside the Thalatepee suite. Tell us which combination you would like and we will help you create the experience that suits you best.",
          cta: "Choose your pairing on WhatsApp",
          message:
            "I would like to pair a treatment or massage with a thermal journey. Can you help me choose?",
        };

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: dict.nav.home, path: "" },
          { name: dict.nav.spa, path: "/spa" },
          { name: dict.spa.percorsi.title, path: "/spa/percorsi" },
        ]}
      />
      <PageHero
        overline={dict.spa.heroOverline}
        title={dict.spa.percorsi.title}
        subtitle={dict.spa.percorsi.intro}
        variant="spa"
      />

      {percorsiCategory.note && (
        <SpaIncludesNote note={percorsiCategory.note} locale={locale} />
      )}

      <section className="bg-[#1f120c] pb-20 pt-10">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <SpaCategorySections
            category={percorsiCategory}
            locale={locale}
            dict={dict}
            hideCardPricing
            alwaysShowFeaturedActions
          />
          <Reveal>
            <aside className="mt-20 overflow-hidden rounded-[22px] border border-[var(--color-gold)]/25 bg-gradient-to-br from-[#2a1710] via-[#241009] to-[#3a1d2a] p-8 text-center sm:p-10">
              <h2 className="display text-3xl text-[var(--color-cream)] sm:text-4xl">
                {customPairing.title}
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-[17px] leading-8 text-[var(--color-cream)]/75">
                {customPairing.description}
              </p>
              <a
                href={whatsappLink(customPairing.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-wisteria)] px-6 py-3 text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-[var(--color-mauve)]"
              >
                <MessageCircle size={16} strokeWidth={1.8} />
                {customPairing.cta}
              </a>
            </aside>
          </Reveal>
          <Reveal>
            <p className="mt-12 text-[17px] leading-8 text-[var(--color-cream)]/75 sm:text-lg">
              {dict.spa.percorsi.infoWrap}
            </p>
          </Reveal>
        </div>
      </section>

      <SpaPercorsiTariffe category={percorsiCategory} locale={locale} dict={dict} />

      <SectionWhatsapp
        dict={dict}
        topic={dict.spa.percorsi.title}
        variant="spa"
      />
    </>
  );
}
