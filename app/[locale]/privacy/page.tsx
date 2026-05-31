import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/PageHero";
import { notFound } from "next/navigation";

export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/privacy">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        title={dict.footer.privacy}
        subtitle={
          locale === "it"
            ? "Informativa sul trattamento dei dati personali."
            : "Information on personal data processing."
        }
        variant="cream"
      />
      <section className="bg-[var(--color-cream)] py-20">
        <div className="mx-auto max-w-3xl px-6 text-[var(--color-espresso)]/80">
          <p className="leading-8">
            {locale === "it"
              ? "Contenuti dell'informativa privacy in fase di redazione. Per qualunque richiesta relativa ai tuoi dati personali, scrivici a "
              : "Privacy notice content is being drafted. For any request related to your personal data, write to "}
            <a
              href="mailto:info@kalikanuovaestetica.it"
              className="text-[var(--color-mauve)] hover:underline"
            >
              info@kalikanuovaestetica.it
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
