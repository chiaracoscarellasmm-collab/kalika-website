"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { locales, type Locale } from "@/lib/i18n";

type Props = { locale: Locale; className?: string };

export function LanguageSwitcher({ locale, className = "text-[var(--color-espresso)]" }: Props) {
  const router = useRouter();
  const pathname = usePathname() ?? `/${locale}`;
  const [pending, startTransition] = useTransition();
  const alternateLocale = locale === "it" ? "en" : "it";

  function switchTo(next: Locale) {
    if (next === locale) return;
    const segments = pathname.split("/").filter(Boolean);
    if ((locales as readonly string[]).includes(segments[0] ?? "")) {
      segments[0] = next;
    } else {
      segments.unshift(next);
    }
    const target = `/${segments.join("/")}`;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    startTransition(() => router.push(target));
  }

  return (
    <button
      type="button"
      onClick={() => switchTo(alternateLocale)}
      className={`text-[15px] uppercase tracking-[2px] transition-colors hover:text-[var(--color-mauve)] ${className} ${
        pending ? "opacity-60" : ""
      }`}
      aria-label={`Switch to ${alternateLocale.toUpperCase()}`}
      disabled={pending}
    >
      {alternateLocale.toUpperCase()}
    </button>
  );
}
