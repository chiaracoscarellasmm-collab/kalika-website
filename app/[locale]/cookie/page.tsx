import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getLegalDoc } from "@/lib/legal";
import { pageMetadata } from "@/lib/page-metadata";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { LegalPage } from "@/components/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/cookie">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const doc = getLegalDoc(raw as Locale, "cookie");
  return pageMetadata(raw as Locale, "/cookie", {
    title: doc.title,
    description: doc.subtitle,
  });
}

export default async function CookiePage({ params }: PageProps<"/[locale]/cookie">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const doc = getLegalDoc(locale, "cookie");

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: "Home", path: "" },
          { name: doc.title, path: "/cookie" },
        ]}
      />
      <LegalPage locale={locale} doc={doc} />
    </>
  );
}
