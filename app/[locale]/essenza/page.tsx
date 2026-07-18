import Image from "next/image";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import ImageDotsSlider from "@/components/ImageDotsSlider";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { richText } from "@/lib/richText";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/essenza">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw as Locale);
  return {
    title: dict.essenza.hero,
    description: dict.essenza.heroSubtitle,
  };
}

export default async function EssenzaPage({
  params,
}: PageProps<"/[locale]/essenza">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  const spazi = [
    {
      title: dict.essenza.spaziCabine,
      text: dict.essenza.spaziCabineText,
      variant: "estetica" as const,
      image: "/images/cabina-trattamenti-lettino.jpg",
      imageAlt:
        locale === "it"
          ? "Cabina trattamenti con lettino bianco, asciugamano arrotolato e dettagli floreali"
          : "Treatment cabin with white massage bed, rolled towel and floral details",
    },
    {
      title: dict.essenza.spaziSpa,
      text: dict.essenza.spaziSpaText,
      variant: "deep" as const,
      image: "/area-spa-sala-relax-lettini.jpg",
      imageAlt:
        locale === "it"
          ? "Sala relax dell'area SPA con lettini ergonomici, lampade di sale e luce blu soffusa"
          : "SPA relaxation room with ergonomic loungers, salt lamps and soft blue light",
    },
    {
      title: dict.essenza.spaziSuite,
      text: dict.essenza.spaziSuiteText,
      variant: "warm" as const,
      image: "/images/suite-privata-lettino-legno.jpg",
      imageAlt:
        locale === "it"
          ? "Suite privata con lettino in legno, luci calde e dettagli decorativi"
          : "Private suite with wooden massage bed, warm lights and decorative details",
    },
  ];

  const team = [
    {
      name: dict.essenza.teamSabina,
      role: dict.essenza.teamSabinaRole,
      bio: dict.essenza.teamSabinaBio,
      src: "/sabina-carretta-team.jpg",
      // Slightly higher crop so the full head stays inside the circle.
      objectPosition: "center 8%",
    },
    {
      name: dict.essenza.teamFrancesca,
      role: dict.essenza.teamFrancescaRole,
      bio: dict.essenza.teamFrancescaBio,
      src: "/sabrina-team.jpg",
      objectPosition: "center 16%",
    },
  ];

  return (
    <>
      <PageHero
        overline={dict.home.introOverline}
        title={dict.essenza.hero}
        subtitle={dict.essenza.heroSubtitle}
        variant="cream"
      />

      {/* 1. Chi è Kalika — text left, photo right */}
      <section className="bg-[var(--color-cream)] py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <div>
              <h2 className="display text-4xl text-[var(--color-brown)] sm:text-5xl">
                {dict.essenza.chiTitle}
              </h2>
              <p className="mt-7 text-base leading-8 text-[var(--color-espresso)]/80">
                {richText(dict.essenza.chiBody)}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-blush)]/30 shadow-sm lg:max-w-2xl">
              <Image
                src="/massaggio-olio-ciotola-sulla-schiena.jpg"
                alt={
                  locale === "it"
                    ? "Operatrice che versa olio da una ciotola sulle mani, sopra la schiena di una cliente"
                    : "Therapist pouring massage oil from a bowl onto her hands above a client's back"
                }
                width={1800}
                height={1200}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Sabina founder — photo left, text right */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-blush)]/40 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-[var(--color-line)] shadow-sm">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/sabina-carretta-ritratto.jpg"
                  alt={
                    locale === "it"
                      ? "Ritratto di Sabina Carretta, fondatrice di Kalika Nuovaestetica"
                      : "Portrait of Sabina Carretta, founder of Kalika Nuovaestetica"
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  quality={92}
                  className="object-cover object-center"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="script text-3xl text-[var(--color-mauve)]">
                {dict.essenza.sabina.overline}
              </p>
              <h2 className="display mt-2 text-4xl text-[var(--color-brown)] sm:text-5xl">
                {dict.essenza.sabina.title}
              </h2>
              <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-[var(--color-mauve)]">
                {dict.essenza.sabina.role}
              </p>

              <div className="mt-8 space-y-5 text-base leading-8 text-[var(--color-espresso)]/85">
                <p>{richText(dict.essenza.sabina.bio1)}</p>
                <p>{richText(dict.essenza.sabina.bio2)}</p>
                <p>{richText(dict.essenza.sabina.bio3)}</p>
                <p>{richText(dict.essenza.sabina.bio4)}</p>
              </div>

              <figure className="relative mt-12 sm:mt-14">
                <span
                  className="display pointer-events-none absolute -left-1 -top-7 select-none text-[80px] leading-none text-[var(--color-wisteria)]/25 sm:-left-2 sm:-top-12 sm:text-[140px] lg:-left-4 lg:-top-16 lg:text-[180px]"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <blockquote className="relative">
                  <p className="display text-2xl italic leading-snug text-[var(--color-brown)] sm:text-3xl sm:leading-tight lg:text-4xl">
                    {dict.essenza.sabina.quote}
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 sm:mt-7 sm:gap-4">
                  <span
                    className="h-px w-10 bg-[var(--color-wisteria)]/60 sm:w-14"
                    aria-hidden
                  />
                  <span className="script text-3xl text-[var(--color-mauve)] sm:text-4xl lg:text-5xl">
                    Sabina
                  </span>
                </figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Cosmesi Eubiotica — text left, photo right */}
      <section className="bg-[var(--color-cream)] py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <div>
              <p className="script text-3xl text-[var(--color-mauve)]">
                {dict.essenza.eubioticaOverline}
              </p>
              <h2 className="display mt-2 text-4xl text-[var(--color-brown)] sm:text-5xl">
                {dict.essenza.eubioticaTitle}
              </h2>
              <div className="mt-7 space-y-5 text-base leading-8 text-[var(--color-espresso)]/80">
                {dict.essenza.eubioticaBody
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p key={index}>{richText(paragraph)}</p>
                  ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto w-full max-w-[50.9rem] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-blush)]/30 shadow-sm lg:max-w-[45.3rem]">
              <ImageDotsSlider
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                slides={[
                  {
                    src: "/linea-prodotti-alkemilla.jpg",
                    alt:
                      locale === "it"
                        ? "Linea di prodotti cosmetici Alkemilla esposti su mensola"
                        : "Alkemilla skincare products displayed on a shelf",
                  },
                  {
                    src: "/linea-prodotti-sice.jpg",
                    alt:
                      locale === "it"
                        ? "Prodotti SICE Cosmesi Eubiotica disposti su mensola"
                        : "SICE eubiotic skincare products arranged on a shelf",
                  },
                  {
                    src: "/gocce-di-sice-gel-rughe.jpg",
                    alt:
                      locale === "it"
                        ? "Flacone e confezione Gocce di SICE, gel intensivo per le rughe"
                        : "Bottle and box of Gocce di SICE intensive wrinkle gel",
                  },
                  {
                    src: "/linea-solari-sice-elios.jpg",
                    alt:
                      locale === "it"
                        ? "Linea solare Elios di SICE con spray, creme e doposole"
                        : "SICE Elios sun care line with spray, creams and after-sun",
                  },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Gli Spazi — 3 cards (unchanged) */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-blush)]/40 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="display text-4xl text-[var(--color-brown)] sm:text-5xl">
                {dict.essenza.spaziTitle}
              </h2>
            </Reveal>
          </div>
          <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
            {spazi.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[var(--color-wisteria)]/50 hover:shadow-2xl hover:shadow-[var(--color-mauve)]/10">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      quality={75}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[var(--color-brown)]/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="display text-2xl text-[var(--color-brown)] transition-transform duration-500 group-hover:translate-x-1">
                      {s.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[17px] leading-8 text-[var(--color-espresso)]/70 sm:text-lg">
                      {s.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Il Team — 2 circular cards */}
      <section className="bg-[var(--color-cream)] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="display text-4xl text-[var(--color-brown)] sm:text-5xl">
                {dict.essenza.teamTitle}
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-12 sm:grid-cols-2 sm:gap-16">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <article className="flex flex-col items-center text-center">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full ring-1 ring-[var(--color-line)]">
                    <Image
                      src={m.src}
                      alt={
                        locale === "it"
                          ? `Foto di ${m.name} del team Kalika`
                          : `Photo of ${m.name} from the Kalika team`
                      }
                      fill
                      sizes="160px"
                      quality={80}
                      className="object-cover"
                      style={{ objectPosition: m.objectPosition }}
                    />
                  </div>
                  <p className="display mt-6 text-2xl text-[var(--color-brown)]">
                    {m.name}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-[var(--color-mauve)]">
                    {m.role}
                  </p>
                  <p className="mt-4 max-w-xs text-[17px] leading-8 text-[var(--color-espresso)]/80 sm:text-lg">
                    {m.bio}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
