import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getLegalDoc } from "@/lib/legal";
import { pageMetadata } from "@/lib/page-metadata";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { LegalPage } from "@/components/LegalPage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/condizioni-vendita">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const doc = getLegalDoc(raw as Locale, "terms");
  return pageMetadata(raw as Locale, "/condizioni-vendita", {
    title: doc.title,
    description: doc.subtitle,
  });
}

export default async function TermsPage({
  params,
}: PageProps<"/[locale]/condizioni-vendita">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const doc = getLegalDoc(locale, "terms");

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: "Home", path: "" },
          { name: doc.title, path: "/condizioni-vendita" },
        ]}
      />
      <LegalPage locale={locale} doc={doc} />
    </>
  );
}
