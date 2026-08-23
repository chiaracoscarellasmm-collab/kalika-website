import { isLocale, type Locale } from "@/lib/i18n";
import { getGiftCardUi } from "@/lib/giftcard-ui";
import { resolveGiftCardFromCheckoutSession } from "@/lib/giftcard-resolve";
import {
  GiftCardThanks,
  GiftCardThanksError,
} from "@/components/GiftCardThanks";
import { Reveal } from "@/components/Reveal";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/gift-card/grazie">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const ui = getGiftCardUi(raw as Locale);
  return {
    title: `${ui.thanks.title} · Gift Card`,
    robots: { index: false, follow: false },
  };
}

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function formatAmount(amount: number, locale: Locale) {
  return amount.toLocaleString(locale === "it" ? "it-IT" : "en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export default async function GiftCardThanksPage({
  params,
  searchParams,
}: PageProps<"/[locale]/gift-card/grazie">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const query = await searchParams;
  const sessionId =
    typeof query.session_id === "string" ? query.session_id : "";

  const ui = getGiftCardUi(locale);
  const record = sessionId
    ? await resolveGiftCardFromCheckoutSession(
        sessionId,
        "Pagina di ringraziamento",
      )
    : null;

  return (
    <section className="bg-[var(--color-cream)] pb-28 pt-28 sm:pt-32">
      <Reveal>
        {record && sessionId ? (
          <GiftCardThanks
            locale={locale}
            sessionId={sessionId}
            serial={record.serial}
            toName={`${record.toFirstName} ${record.toLastName}`.trim()}
            detailLabel={
              record.treatmentName
                ? ui.thanks.treatmentLabel
                : ui.thanks.valueLabel
            }
            detailValue={
              record.treatmentName
                ? record.treatmentName
                : formatAmount(record.amount, locale)
            }
            validUntil={formatDate(record.validUntil, locale)}
            buyerEmail={record.buyerEmail}
          />
        ) : (
          <GiftCardThanksError locale={locale} />
        )}
      </Reveal>
    </section>
  );
}
