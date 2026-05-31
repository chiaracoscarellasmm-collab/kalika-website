import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { site } from "@/lib/site";

const paths = [
  "",
  "/essenza",
  "/estetica",
  "/estetica/viso",
  "/estetica/corpo",
  "/estetica/massaggi",
  "/estetica/mani-piedi",
  "/estetica/epilazione",
  "/estetica/sopracciglia",
  "/spa",
  "/spa/rituali",
  "/spa/massaggi-suite",
  "/spa/coppia",
  "/spa/percorsi",
  "/gift-card",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.baseUrl;
  return paths.flatMap((p) =>
    locales.map((locale) => ({
      url: `${base}/${locale}${p}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${base}/${l}${p}`]),
        ),
      },
    })),
  );
}
