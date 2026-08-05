import type { Locale } from "./i18n";

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type ScheduleEntry = { day: DayKey; hours: string | null };

export const schedule: ScheduleEntry[] = [
  { day: "mon", hours: null },
  { day: "tue", hours: "09:00 – 17:00" },
  { day: "wed", hours: "11:00 – 20:00" },
  { day: "thu", hours: "09:00 – 18:00" },
  { day: "fri", hours: "09:00 – 12:30 · 15:00 – 19:30" },
  { day: "sat", hours: "09:00 – 15:00" },
  { day: "sun", hours: null },
];

/**
 * Drives canonical URLs, hreflang and the sitemap. kalikanuovaestetica.it still
 * serves the previous WordPress site, so until the DNS points here the live
 * Vercel domain is used instead of advertising URLs that answer 404.
 * Set NEXT_PUBLIC_SITE_URL to switch over without touching the code.
 */
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kalika-website.vercel.app";

export const site = {
  name: "Kalika Nuovaestetica",
  tagline: {
    it: "Estetica professionale · Benessere sensoriale",
    en: "Professional beauty · Sensory wellbeing",
  },
  owner: "Sabina Carretta",
  address: {
    street: "Via C. Battisti, 26",
    city: "33080 Prata di Pordenone (PN), Italia",
    mapsQuery: "Kalika Nuovaestetica, Via C. Battisti 26, Prata di Pordenone",
    postalCode: "33080",
    locality: "Prata di Pordenone",
    region: "PN",
    country: "IT",
  },
  schedule,
  whatsapp: {
    number: "+393388706386",
    display: "+39 338 870 6386",
  },
  email: "info@kalikanuovaestetica.it",
  social: {
    instagram: "https://instagram.com/kalikanuovaestetica",
    facebook: "https://www.facebook.com/profile.php?id=100058297756455",
    google: "https://share.google/KuT8sOCgnnhYOabPF",
  },
  baseUrl,
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp.number.replace(/\D/g, "")}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function localePath(locale: Locale, path = ""): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`.replace(/\/+$/, "") || `/${locale}`;
}
