import type { Locale } from "@/lib/i18n";
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/structured-data";

type Props = {
  locale: Locale;
  items: BreadcrumbItem[];
};

/** Invisible BreadcrumbList structured data — see lib/structured-data.ts. */
export function BreadcrumbJsonLd({ locale, items }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema(locale, items)),
      }}
    />
  );
}
