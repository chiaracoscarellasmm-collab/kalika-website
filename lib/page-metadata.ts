import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { localePath } from "./site";

/**
 * Canonical URL, hreflang pair and Open Graph URL for a single page.
 *
 * Without this every route inherits the locale layout values, which point at
 * the homepage — so each page would tell search engines that the homepage is
 * the real address of its content.
 */
export function pageMetadata(
  locale: Locale,
  path: string,
  meta: { title: string; description: string },
): Metadata {
  const canonical = localePath(locale, path);
  const italian = localePath("it", path);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        it: italian,
        en: localePath("en", path),
        "x-default": italian,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      type: "website",
    },
  };
}
