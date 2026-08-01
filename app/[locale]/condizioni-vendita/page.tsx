import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getLegalDoc } from "@/lib/legal";
import { LegalPage } from "@/components/LegalPage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/condizioni-vendita">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const doc = getLegalDoc(raw as Locale, "terms");
  return { title: doc.title, description: doc.subtitle };
}

export default async function TermsPage({
  params,
}: PageProps<"/[locale]/condizioni-vendita">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return <LegalPage locale={locale} doc={getLegalDoc(locale, "terms")} />;
}
