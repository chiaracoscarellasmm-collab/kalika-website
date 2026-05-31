import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { site, localePath } from "@/lib/site";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2a8 8 0 0 1 0 16 8 8 0 0 1 0-16Z" />
      <path d="M12 2C8 8 8 16 12 22" />
      <path d="M12 2c4 6 4 14 0 20" />
      <path d="M2 12h20" />
    </svg>
  );
}

type Props = { locale: Locale; dict: Dictionary };

export function Footer({ locale, dict }: Props) {
  const year = new Date().getFullYear();
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapsQuery)}`;

  const cols = [
    {
      title: dict.footer.links,
      items: [
        { href: localePath(locale, "/essenza"), label: dict.nav.essenza },
        { href: localePath(locale, "/estetica"), label: dict.nav.estetica },
        { href: localePath(locale, "/spa"), label: dict.nav.spa },
        { href: localePath(locale, "/gift-card"), label: dict.nav.giftCard },
      ],
    },
    {
      title: dict.footer.estetica,
      items: [
        { href: localePath(locale, "/estetica/viso"), label: dict.estetica.catViso },
        { href: localePath(locale, "/estetica/corpo"), label: dict.estetica.catCorpo },
        { href: localePath(locale, "/estetica/massaggi"), label: dict.estetica.catMassaggi },
        { href: localePath(locale, "/estetica/mani-piedi"), label: dict.estetica.catManiPiedi },
        { href: localePath(locale, "/estetica/epilazione"), label: dict.estetica.catEpilazione },
        { href: localePath(locale, "/estetica/sopracciglia"), label: dict.estetica.catSopracciglia },
      ],
    },
    {
      title: dict.footer.spa,
      items: [
        { href: localePath(locale, "/spa/rituali"), label: dict.spa.navRituali },
        { href: localePath(locale, "/spa/massaggi-suite"), label: dict.spa.navSuite },
        { href: localePath(locale, "/spa/coppia"), label: dict.spa.navCoppia },
        { href: localePath(locale, "/spa/percorsi"), label: dict.spa.navPercorsi },
      ],
    },
  ];

  return (
    <footer className="mt-32 bg-[var(--color-cream)] border-t border-[var(--color-line)]">
      {/* Centered logo */}
      <div className="flex justify-center pt-16">
        <Link href={localePath(locale)} aria-label={dict.common.brand} className="flex flex-col items-center gap-2">
          <Image
            src="/logo.jpg"
            alt={dict.common.brand}
            width={88}
            height={88}
            className="h-16 w-16 rounded-full object-cover ring-1 ring-[var(--color-line)]"
          />
          <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-mauve)]">
            Nuovaestetica
          </p>
        </Link>
      </div>

      {/* 5-column link grid */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-14 lg:px-10">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brown)]">
                {col.title}
              </p>
              <div className="mt-2 h-px w-12 bg-[var(--color-mauve)]/40" />
              <ul className="mt-6 space-y-3 text-sm">
                {col.items.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className="text-[var(--color-espresso)]/80 hover:text-[var(--color-mauve)] transition-colors"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brown)]">
              {dict.footer.contact}
            </p>
            <div className="mt-2 h-px w-12 bg-[var(--color-mauve)]/40" />
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-espresso)]/80 hover:text-[var(--color-mauve)] transition-colors"
                >
                  {site.address.street}
                  <span className="block">{site.address.city}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-words text-[var(--color-espresso)]/80 hover:text-[var(--color-mauve)] transition-colors"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.whatsapp.number}`}
                  className="text-[var(--color-espresso)]/80 hover:text-[var(--color-mauve)] transition-colors tabular-nums"
                >
                  {site.whatsapp.display}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours column */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brown)]">
              {dict.footer.hours}
            </p>
            <div className="mt-2 h-px w-12 bg-[var(--color-mauve)]/40" />
            <dl className="mt-6 grid grid-cols-[auto_auto] gap-x-5 gap-y-1.5 text-sm">
              {site.schedule.map(({ day, hours }) => (
                <div key={day} className="contents">
                  <dt className="text-[var(--color-espresso)]/85">
                    {dict.footer.days[day]}
                  </dt>
                  {hours ? (
                    <dd className="tabular-nums leading-6 text-[var(--color-espresso)] whitespace-pre-line">
                      {hours.replace(" · ", "\n")}
                    </dd>
                  ) : (
                    <dd className="italic text-[var(--color-espresso)]/40">
                      {dict.footer.closed}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Bottom strip: socials + © + policy links */}
      <div className="border-t border-[var(--color-line)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 lg:px-10">
          <div className="flex gap-5 text-[var(--color-brown)]">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="opacity-80 transition-opacity hover:text-[var(--color-mauve)] hover:opacity-100"
            >
              <InstagramIcon />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="opacity-80 transition-opacity hover:text-[var(--color-mauve)] hover:opacity-100"
            >
              <FacebookIcon />
            </a>
            <a
              href={site.social.google}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google"
              className="opacity-80 transition-opacity hover:text-[var(--color-mauve)] hover:opacity-100"
            >
              <GoogleIcon />
            </a>
          </div>

          <p className="text-center text-[11px] uppercase tracking-[0.3em] text-[var(--color-espresso)]/55">
            {dict.footer.credits.replace("{year}", String(year))}
          </p>

          <div className="flex gap-6 text-[11px] uppercase tracking-[0.25em] text-[var(--color-espresso)]/55">
            <Link href={localePath(locale, "/privacy")} className="hover:text-[var(--color-mauve)]">
              {dict.footer.privacy}
            </Link>
            <Link href={localePath(locale, "/cookie")} className="hover:text-[var(--color-mauve)]">
              {dict.footer.cookie}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
