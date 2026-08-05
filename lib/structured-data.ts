import type { Locale } from "./i18n";
import { localePath, site, type DayKey } from "./site";

const SCHEMA_DAY: Record<DayKey, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

type OpeningHours = {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string;
  opens: string;
  closes: string;
};

/**
 * Turns the human-readable opening hours into the format search engines expect.
 * A day can hold two ranges separated by "·", as on Friday with the lunch break.
 */
function openingHoursSpecification(): OpeningHours[] {
  return site.schedule.flatMap(({ day, hours }) => {
    if (!hours) return [];

    return hours.split("·").flatMap((range) => {
      const [opens, closes] = range.split("–").map((part) => part.trim());
      if (!opens || !closes) return [];

      return [
        {
          "@type": "OpeningHoursSpecification" as const,
          dayOfWeek: SCHEMA_DAY[day],
          opens,
          closes,
        },
      ];
    });
  });
}

/**
 * Describes the salon to search engines: without it Google has no reliable way
 * to tie the site to a physical business with address, hours and phone number,
 * which is what local results and Maps listings are built from.
 */
export function localBusinessSchema(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${site.baseUrl}/#business`,
    name: site.name,
    description,
    url: `${site.baseUrl}${localePath(locale)}`,
    image: `${site.baseUrl}/opengraph-image`,
    telephone: site.whatsapp.number,
    email: site.email,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    founder: { "@type": "Person", name: site.owner },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: openingHoursSpecification(),
    sameAs: [site.social.instagram, site.social.facebook, site.social.google],
  };
}
