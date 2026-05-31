"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { localePath, whatsappLink } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Props = { locale: Locale; dict: Dictionary };

export function Navbar({ locale, dict }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const nav = [
    { href: localePath(locale), label: dict.nav.home },
    { href: localePath(locale, "/essenza"), label: dict.nav.essenza },
    { href: localePath(locale, "/estetica"), label: dict.nav.estetica },
    { href: localePath(locale, "/spa"), label: dict.nav.spa },
    { href: localePath(locale, "/gift-card"), label: dict.nav.giftCard },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled || open
            ? "bg-[var(--color-cream)]/95 backdrop-blur border-b border-[var(--color-line)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
          <Link
            href={localePath(locale)}
            className="display text-[22px] italic leading-none text-[var(--color-brown)]"
            aria-label={dict.common.brand}
          >
            Kalika
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-[15px] tracking-[2px]">
            {nav.map((item) => {
              const active =
                item.href === localePath(locale)
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-2 transition-colors hover:text-[var(--color-mauve)] ${
                    active
                      ? "text-[var(--color-mauve)]"
                      : "text-[var(--color-espresso)]"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-0.5 left-0 right-0 mx-auto h-px w-6 bg-[var(--color-wisteria)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
            <a
              href={whatsappLink(`${dict.common.watsapMessage} Kalika`)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-wisteria)] text-white transition-transform hover:scale-105"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} strokeWidth={1.8} />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-espresso)]"
              aria-label={open ? dict.common.closeMenu : dict.common.openMenu}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay menu */}
      {open && (
        <div className="fixed inset-0 z-30 lg:hidden bg-[var(--color-cream)]">
          <div className="flex h-full flex-col px-8 pt-28 pb-12">
            <nav className="flex flex-col gap-6">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="display text-3xl text-[var(--color-brown)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-4 border-t border-[var(--color-line)] pt-6">
              <a
                href={whatsappLink(`${dict.common.watsapMessage} Kalika`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-wisteria)] px-5 py-3 text-white text-sm"
              >
                <MessageCircle size={18} strokeWidth={1.8} />
                {dict.common.bookOnWhatsapp}
              </a>
            </div>
          </div>
        </div>
      )}
      <div className="h-20" aria-hidden />
    </>
  );
}
