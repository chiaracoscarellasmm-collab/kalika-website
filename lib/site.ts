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
  },
  schedule,
  whatsapp: {
    number: "+393388706386",
    display: "+39 338 870 6386",
  },
  email: "info@kalikanuovaestetica.it",
  social: {
    instagram: "https://instagram.com/kalikanuovaestetica",
    facebook: "https://facebook.com/kalikanuovaestetica",
    google: "https://g.page/kalikanuovaestetica",
  },
  baseUrl: "https://kalikanuovaestetica.it",
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
