import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/PageHero";
import { notFound } from "next/navigation";

export default async function CookiePage({
  params,
}: PageProps<"/[locale]/cookie">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        title={dict.footer.cookie}
        subtitle={
          locale === "it"
            ? "Come usiamo i cookie sul nostro sito."
            : "How we use cookies on our website."
        }
        variant="cream"
      />
      <section className="bg-[var(--color-cream)] py-20">
        <div className="mx-auto max-w-3xl px-6 text-[var(--color-espresso)]/80">
          <p className="leading-8">
            {locale === "it"
              ? "Il sito utilizza esclusivamente cookie tecnici necessari al funzionamento (es. preferenza di lingua). Non utilizziamo cookie di profilazione di terze parti."
              : "This site uses only technical cookies required for its functioning (e.g. language preference). We do not use third-party profiling cookies."}
          </p>
        </div>
      </section>
    </>
  );
}
