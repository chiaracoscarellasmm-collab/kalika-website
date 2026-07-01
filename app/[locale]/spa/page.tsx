import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { localePath } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { SpaHeroVideo } from "@/components/SpaHeroVideo";
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
      label: locale === "it" ? "Rituali" : "Rituals",
      text:
        locale === "it"
          ? "Viaggi sensoriali ispirati alle tradizioni del mondo."
          : "Sensory journeys inspired by world traditions.",
      src: "/images/rituali-card.jpg",
      gradient: "linear-gradient(135deg, #3D1F0F, #6B3A1F)",
    },
    {
      key: "massaggi-suite",
      label: locale === "it" ? "Massaggi in Suite" : "Suite Massages",
      text:
        locale === "it"
          ? "Massaggi speciali nella nostra suite privata."
          : "Special massages in our private suite.",
      src: "/images/massaggi-suite-card.jpg",
      gradient: "linear-gradient(135deg, #2C1810, #5C3020)",
    },
    {
      key: "coppia",
      label: locale === "it" ? "Esperienze di Coppia" : "Couple Experiences",
      text:
        locale === "it"
          ? "Per due. Intimo, sospeso, prezioso."
          : "For two. Intimate, suspended, precious.",
      src: "/Esperienze%20di%20coppia.png",
      gradient: "linear-gradient(135deg, #3A1A10, #7A3A20)",
    },
    {
      key: "percorsi",
      label: locale === "it" ? "Percorsi SPA" : "SPA Journeys",
      text:
        locale === "it"
          ? "Sauna, biosauna, hammam, banja: il percorso termale."
          : "Sauna, biosauna, hammam, banja: the thermal journey.",
      src: "/Percorsi%20SPA.png",
      gradient: "linear-gradient(135deg, #1A0F08, #4A2810)",
    },
  ];

  return (
    <>
      <SpaHeroVideo
        title={dict.spa.hero}
        subtitle={dict.spa.heroSubtitle}
        navItems={[
          { href: "#rituali", label: dict.spa.navRituali },
          { href: "#massaggi-suite", label: dict.spa.navSuite },
          { href: "#coppia", label: dict.spa.navCoppia },
          { href: "#percorsi", label: dict.spa.navPercorsi },
        ]}
      />

      <section className="bg-[#1A0D07] py-20 text-[var(--color-cream)]">
        <div className="mx-auto max-w-[680px] px-6 text-center">
          <Reveal>
            <p className="script text-4xl text-[var(--color-gold)] sm:text-5xl">
              {locale === "it" ? "Profumi di terre lontane" : "Scents of distant lands"}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 font-serif text-[22px] leading-[1.8] text-[var(--color-cream)]">
              {locale === "it"
                ? "Ogni rituale è un viaggio. Ogni massaggio, un momento fuori dal tempo. Benvenuta nell'anima sensoriale di Kalika: dove profumi, calore e mani esperte ti accompagnano in destinazioni lontane, senza mai lasciare Kalika."
                : "Every ritual is a journey. Every massage, a moment out of time. Welcome to the sensory soul of Kalika: where scents, warmth and expert hands guide you to distant destinations, without ever leaving Kalika."}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="mx-auto mt-8 block h-px w-[60px] bg-[var(--color-gold)]" />
          </Reveal>
        </div>
      </section>

      <section id="rituali" className="bg-[#1A0D07] pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {cards.map((c, i) => (
              <Reveal key={c.key} delay={i * 0.07}>
                <Link
                  href={localePath(locale, `/spa/${c.key}`)}
                  id={c.key}
                  className="group relative block overflow-hidden rounded-[12px] scroll-mt-28"
                >
                  <div
                    className="relative min-h-[480px] overflow-hidden"
                    style={{ background: c.gradient }}
                  >
                    <Image
                      src={c.src}
                      alt={c.label}
                      fill
                      priority
                      sizes="50vw"
                      quality={85}
                      className="object-cover object-center transition-transform duration-[600ms] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,8,4,0)] via-[rgba(15,8,4,0.45)] to-[rgba(15,8,4,0.7)] transition-colors duration-[600ms] group-hover:from-[rgba(15,8,4,0)] group-hover:via-[rgba(15,8,4,0.35)] group-hover:to-[rgba(15,8,4,0.62)]" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 pb-8 pl-8">
                      <h3 className="display text-[40px] font-normal leading-tight text-[var(--color-cream)]">
                        {c.label}
                      </h3>
                      <p className="mt-2 max-w-xs text-[15px] leading-7 text-[var(--color-cream)]/80">
                        {c.text}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[3px] text-[var(--color-gold)] transition-colors group-hover:text-[var(--color-gold)]">
                        {locale === "it" ? "SCOPRI" : "DISCOVER"}
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
