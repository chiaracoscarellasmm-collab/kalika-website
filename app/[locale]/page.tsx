import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Star } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, whatsappLink, site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { LotusDivider } from "@/components/LotusDivider";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ReviewCard } from "@/components/ReviewCard";
import { notFound } from "next/navigation";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate -mt-20 flex min-h-[100svh] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #2C1810 0%, #6B3A2A 45%, #9B5E8A 100%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(201,123,178,0.5), transparent 55%), radial-gradient(circle at 75% 70%, rgba(201,169,110,0.35), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/25" aria-hidden />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center text-[var(--color-cream)]">
          <Reveal delay={0.05}>
            <p className="script text-3xl text-[var(--color-wisteria)] sm:text-4xl">
              {dict.home.heroOverline}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="display mt-5 text-5xl tracking-wide sm:text-7xl">
              KALIKA
              <span className="block text-3xl tracking-[0.4em] mt-2 sm:text-4xl sm:tracking-[0.5em] opacity-95">
                NUOVAESTETICA
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-7 text-[13px] uppercase tracking-[2px] text-[var(--color-cream)]/85">
              {dict.home.heroSubtitle}
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href={localePath(locale, "/estetica")}
                className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--color-cream)]/60 px-7 text-sm uppercase tracking-[0.18em] text-[var(--color-cream)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-brown)]"
              >
                {dict.home.heroCtaEstetica}
              </Link>
              <Link
                href={localePath(locale, "/spa")}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-wisteria)] px-7 text-sm uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--color-mauve)]"
              >
                {dict.home.heroCtaSpa}
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-[var(--color-cream)]/70">
          <div className="kalika-scroll-cue flex flex-col items-center gap-2">
            <span>{dict.home.scrollCue}</span>
            <span className="h-8 w-px bg-[var(--color-cream)]/40" />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-[var(--color-cream)] py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <p className="script text-3xl text-[var(--color-mauve)]">
              {dict.home.introOverline}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-4 text-4xl text-[var(--color-brown)] sm:whitespace-nowrap sm:text-5xl">
              {dict.home.introTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-base leading-8 text-[var(--color-espresso)]/85 sm:text-lg">
              {dict.home.introBody}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href={localePath(locale, "/essenza")}
              className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-[var(--color-mauve)] hover:text-[var(--color-brown)]"
            >
              {dict.home.introLink}
              <ArrowRight size={14} />
            </Link>
          </Reveal>
          <Reveal delay={0.2}>
            <LotusDivider className="mt-14" />
          </Reveal>
        </div>
      </section>

      {/* TWO WORLDS */}
      <section>
        <div className="grid gap-2 bg-[var(--color-cream)] lg:grid-cols-2">
          <Reveal>
            <Link
              href={localePath(locale, "/estetica")}
              className="group relative block overflow-hidden"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-auto lg:h-[640px]">
                <Image
                  src="/estetica-card.jpg"
                  alt={dict.home.worldsEsteticaTitle}
                  fill
                  priority
                  sizes="50vw"
                  quality={85}
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[#1A0F0A]/30" />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-10 lg:p-14">
                  <h3 className="display text-4xl text-[var(--color-cream)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.24)] sm:text-5xl">
                    {dict.home.worldsEsteticaTitle}
                  </h3>
                  <p className="mt-4 max-w-sm text-[17px] leading-8 text-[var(--color-cream)] drop-shadow-[0_1px_8px_rgba(0,0,0,0.22)] sm:text-lg">
                    {dict.home.worldsEsteticaText}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-[var(--color-cream)] drop-shadow-[0_1px_8px_rgba(0,0,0,0.22)] group-hover:text-[var(--color-cream)]">
                    {dict.common.discover}
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href={localePath(locale, "/spa")}
              className="group relative block overflow-hidden"
            >
              <div className="relative aspect-[4/5] w-full lg:aspect-auto lg:h-[640px]">
                <Image
                  src="/spa-card.jpg"
                  alt={dict.home.worldsSpaTitle}
                  fill
                  priority
                  sizes="50vw"
                  quality={85}
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[#1A0F0A]/30" />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-10 lg:p-14 text-[var(--color-cream)]">
                  <h3 className="display text-4xl sm:text-5xl">
                    {dict.home.worldsSpaTitle}
                  </h3>
                  <p className="mt-4 max-w-sm text-[17px] leading-8 text-[var(--color-cream)] sm:text-lg">
                    {dict.home.worldsSpaText}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-[var(--color-cream)] group-hover:text-[var(--color-cream)]">
                    {dict.common.discover}
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CHECK-UP GRATUITO */}
      <section className="relative overflow-hidden bg-[var(--color-blush)] py-28">
        <div
          className="absolute inset-0 opacity-60 mix-blend-overlay"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(201,123,178,0.45), transparent 55%), radial-gradient(circle at 80% 70%, rgba(201,169,110,0.35), transparent 55%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="script text-4xl text-[var(--color-mauve)]">
              {dict.home.checkupOverline}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-2 text-4xl text-[var(--color-brown)] sm:text-5xl">
              {dict.home.checkupTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-base leading-8 text-[var(--color-espresso)]/85 sm:text-lg">
              {dict.home.checkupBody}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="display mt-10 text-2xl italic text-[var(--color-brown)] sm:text-3xl">
              &ldquo;{dict.home.checkupQuote}&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={whatsappLink(dict.home.checkupWaTopic)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--color-wisteria)] px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-white transition-colors hover:bg-[var(--color-mauve)]"
            >
              <MessageCircle size={16} strokeWidth={1.6} />
              {dict.home.checkupCta}
            </a>
          </Reveal>
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-[var(--color-cream)] py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="display text-4xl text-[var(--color-brown)] sm:text-5xl">
                {dict.home.featuredTitle}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 text-[var(--color-espresso)]/75">
                {dict.home.featuredSubtitle}
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-7">
            {[
              {
                title: dict.home.featuredViso,
                text: dict.home.featuredVisoText,
                href: localePath(locale, "/estetica/viso"),
                variant: "estetica" as const,
              },
              {
                title: dict.home.featuredCorpo,
                text: dict.home.featuredCorpoText,
                href: localePath(locale, "/estetica/corpo"),
                variant: "blush" as const,
              },
              {
                title: dict.home.featuredMassaggi,
                text: dict.home.featuredMassaggiText,
                href: localePath(locale, "/estetica/massaggi"),
                variant: "warm" as const,
              },
              {
                title: dict.home.featuredRituali,
                text: dict.home.featuredRitualiText,
                href: localePath(locale, "/spa/rituali"),
                variant: "deep" as const,
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.06}>
                <Link
                  href={card.href}
                  className="group block overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[rgba(107,58,42,0.08)]"
                >
                  <ImagePlaceholder
                    variant={card.variant}
                    aspect="aspect-[4/5]"
                    rounded="rounded-none"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="p-6">
                    <h3 className="display text-2xl text-[var(--color-brown)]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-[17px] leading-8 text-[var(--color-espresso)]/70 sm:text-lg">
                      {card.text}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[var(--color-mauve)]">
                      {dict.common.discover}
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GIFT CARD */}
      <section className="relative overflow-hidden bg-[var(--color-blush)] py-28">
        <div
          className="absolute inset-0 opacity-50 mix-blend-overlay"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(201,123,178,0.5), transparent 55%), radial-gradient(circle at 80% 70%, rgba(201,169,110,0.4), transparent 55%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="script text-4xl text-[var(--color-mauve)]">
              {dict.home.giftOverline}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-2 text-4xl text-[var(--color-brown)] sm:text-5xl">
              {dict.home.giftTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[var(--color-espresso)]/80">
              {dict.home.giftBody}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href={localePath(locale, "/gift-card")}
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[var(--color-brown)] px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-[var(--color-cream)] transition-colors hover:bg-[var(--color-mauve)]"
            >
              {dict.home.giftCta}
              <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-[var(--color-cream)] py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="display text-4xl text-[var(--color-brown)] sm:text-5xl">
                {dict.home.reviewsTitle}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 text-[var(--color-espresso)]/75">
                {dict.home.reviewsSubtitle}
              </p>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {dict.reviews.map((r, i) => (
              <Reveal key={`${r.name}-${i}`} delay={i * 0.07}>
                <ReviewCard {...r} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <a
              href={site.social.google}
              target="_blank"
              rel="noopener noreferrer"
              className="group mx-auto mt-12 flex w-fit flex-col items-center gap-3 text-center text-[var(--color-espresso)]/70 transition-colors hover:text-[var(--color-mauve)]"
            >
              <span className="inline-flex items-center gap-1 text-[var(--color-gold)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} strokeWidth={1.3} fill="currentColor" />
                ))}
              </span>
              <span className="text-sm uppercase tracking-[0.18em]">
                Google Reviews · 4.9/5
              </span>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[var(--color-mauve)]">
                Mostra altre recensioni
                <ArrowRight
                  size={15}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
