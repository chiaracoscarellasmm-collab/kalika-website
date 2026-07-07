"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Lock } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import {
  amountChoices,
  giftCardDesigns,
  isGiftCardDesign,
  resolveGiftAmountChoice,
  type GiftCardAmountChoice,
  type GiftCardDesign,
} from "@/lib/giftcard";
import { getGiftCardUi } from "@/lib/giftcard-ui";
import { validateGiftCardParams } from "@/lib/gift-selection";

type Props = { locale: Locale; dict: Dictionary };

const inputClass =
  "mt-2 w-full rounded-none border border-[var(--color-brown)]/25 bg-white/80 px-4 py-3 text-[var(--color-espresso)] outline-none transition-colors focus:border-[var(--color-wisteria)]";

const labelClass =
  "text-[11px] uppercase tracking-[2px] text-[var(--color-brown)]";

function formatDate(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function addSixMonths(date: Date) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + 6);
  return next;
}

function designLabel(design: GiftCardDesign, locale: Locale) {
  const labels = {
    it: {
      estetica: "Estetica",
      spa: "SPA & Rituali",
      coppia: "Coppia",
    },
    en: {
      estetica: "Beauty",
      spa: "SPA & Rituals",
      coppia: "Couple",
    },
  } as const;
  return labels[locale][design];
}

function formatGiftAmount(amount: number, locale: Locale) {
  return amount.toLocaleString(locale === "it" ? "it-IT" : "en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

function GiftCardPreview({
  locale,
  design,
  amount,
  treatmentName,
  fromName,
  toName,
  message,
  purchaseDate,
  expiryDate,
}: {
  locale: Locale;
  design: GiftCardDesign;
  amount: number;
  treatmentName: string;
  fromName: string;
  toName: string;
  message: string;
  purchaseDate: string;
  expiryDate: string;
}) {
  const ui = getGiftCardUi(locale);
  const current = giftCardDesigns.find((item) => item.key === design) ?? giftCardDesigns[0];
  const detailLabel = treatmentName ? ui.summaryTreatment : ui.summaryValue;
  const detailValue = treatmentName
    ? treatmentName
    : formatGiftAmount(amount, locale);

  return (
    <div className="space-y-5">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl shadow-[rgba(44,24,16,0.12)] transition-all duration-500">
        <Image
          src={current.frontImage}
          alt={ui.previewFrontGiftCard}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          quality={80}
          className="object-cover"
        />
      </div>

      <div className="aspect-[4/3] rounded-xl border border-[var(--color-line)] bg-white p-6 shadow-xl shadow-[rgba(44,24,16,0.08)] sm:p-8">
        <div className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] border border-[var(--color-wisteria)]/25 p-5 text-[var(--color-espresso)] sm:p-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[3px] text-[var(--color-mauve)]">
                {ui.backOverline}
              </p>
              <h3 className="display mt-2 text-2xl text-[var(--color-brown)] sm:text-3xl">
                {ui.backTitle}
              </h3>
            </div>
            <p className="text-right text-[9px] uppercase leading-4 tracking-[1.4px] text-[var(--color-espresso)]/60">
              <span className="block text-[9px] text-[var(--color-mauve)]">{ui.codeLabel}</span>
              <span className="normal-case tracking-normal text-[var(--color-espresso)]/45">
                {ui.codePending}
              </span>
            </p>
          </div>

          <dl className="my-4 grid min-h-0 content-center gap-2 text-[14px] leading-6 sm:my-5 sm:gap-3 sm:text-[15px] sm:leading-7">
            <div>
              <dt className="text-[10px] uppercase tracking-[2px] text-[var(--color-mauve)]">
                {ui.summaryTo}
              </dt>
              <dd>{toName || (locale === "it" ? "Nome destinatario" : "Recipient name")}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[2px] text-[var(--color-mauve)]">
                {ui.summaryFrom}
              </dt>
              <dd>{fromName || (locale === "it" ? "Nome mittente" : "Sender name")}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[2px] text-[var(--color-mauve)]">
                {detailLabel}
              </dt>
              <dd>{detailValue}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[2px] text-[var(--color-mauve)]">
                {locale === "it" ? "Messaggio" : "Message"}
              </dt>
              <dd className="line-clamp-2 italic text-[var(--color-espresso)]/75 sm:line-clamp-3">
                {message || ui.frontPlaceholderMessage}
              </dd>
            </div>
          </dl>

          <div className="grid gap-2 border-t border-[var(--color-line)] pt-3 text-[9px] uppercase leading-4 tracking-[1.4px] text-[var(--color-espresso)]/60 sm:grid-cols-2 sm:gap-4">
            <p className="text-[9px]">
              <span className="block text-[9px] text-[var(--color-mauve)]">
                {ui.summaryPurchaseDate}
              </span>
              {purchaseDate}
            </p>
            <p className="text-[9px] sm:text-right">
              <span className="block text-[9px] text-[var(--color-mauve)]">
                {ui.summaryExpiryDate}
              </span>
              {expiryDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GiftCardForm({ locale, dict }: Props) {
  const ui = getGiftCardUi(locale);
  const [design, setDesign] = useState<GiftCardDesign>("spa");
  const [amountChoice, setAmountChoice] = useState<GiftCardAmountChoice>("100");
  const [customAmount, setCustomAmount] = useState(120);
  const [fromFirstName, setFromFirstName] = useState("");
  const [fromLastName, setFromLastName] = useState("");
  const [toFirstName, setToFirstName] = useState("");
  const [toLastName, setToLastName] = useState("");
  const [message, setMessage] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [treatmentName, setTreatmentName] = useState("");
  const [treatmentLocked, setTreatmentLocked] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const amount = useMemo(() => {
    const selected = amountChoices.find((choice) => choice.key === amountChoice);
    return selected?.amount ?? customAmount;
  }, [amountChoice, customAmount]);

  const fromName = `${fromFirstName} ${fromLastName}`.trim();
  const toName = `${toFirstName} ${toLastName}`.trim();
  const purchaseDate = useMemo(() => new Date(), []);
  const formattedPurchaseDate = formatDate(purchaseDate, locale);
  const formattedExpiryDate = formatDate(addSixMonths(purchaseDate), locale);
  const missingFields = [
    !fromFirstName.trim() && "sender first name",
    !fromLastName.trim() && "sender last name",
    !toFirstName.trim() && "recipient first name",
    !toLastName.trim() && "recipient last name",
    !buyerEmail.trim() && "buyer email",
    amountChoice === "custom" && customAmount < 20 && "minimum custom amount",
  ].filter(Boolean) as string[];
  const canProceed = missingFields.length === 0 && !pending;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (sessionId && params.get("download") === "1") {
      window.location.href = `/api/gift-card/download?session_id=${encodeURIComponent(sessionId)}`;
      return;
    }

    const treatmentId = params.get("treatment");
    if (!treatmentId) return;

    const validated = validateGiftCardParams(treatmentId, locale, {
      amount: params.get("amount"),
      giftLabel: params.get("giftLabel"),
      giftPerson: params.get("giftPerson"),
      giftOperator: params.get("giftOperator"),
    });
    if (!validated) return;

    const designParam = params.get("design");
    if (isGiftCardDesign(designParam)) {
      setDesign(designParam);
    }

    const resolved = resolveGiftAmountChoice(validated.amount);
    setAmountChoice(resolved.amountChoice);
    setCustomAmount(resolved.customAmount);
    setTreatmentLocked(true);
    setTreatmentName(validated.giftLabel);
  }, [locale]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (missingFields.length > 0) {
      setError(ui.validationWarning);
      return;
    }

    setPending(true);
    setError(null);

    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locale,
        design,
        amountChoice,
        amount,
        fromFirstName,
        fromLastName,
        toFirstName,
        toLastName,
        message,
        buyerEmail,
        treatmentName: treatmentName || undefined,
      }),
    });
    const data = (await response.json()) as { url?: string; error?: string };
    setPending(false);

    if (data.url) {
      window.location.href = data.url;
      return;
    }

    setError(
      data.error === "STRIPE_NOT_CONFIGURED"
        ? locale === "it"
          ? "Pagamenti non ancora configurati. Aggiungi le variabili Stripe per attivare il checkout."
          : "Payments are not configured yet. Add the Stripe variables to enable checkout."
        : locale === "it"
          ? "Non è stato possibile avviare il pagamento. Controlla i dati e riprova."
          : "We couldn't start the payment. Check the details and try again.",
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(380px,2fr)] lg:gap-14">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <GiftCardPreview
          locale={locale}
          design={design}
          amount={amount}
          treatmentName={treatmentName}
          fromName={fromName}
          toName={toName}
          message={message}
          purchaseDate={formattedPurchaseDate}
          expiryDate={formattedExpiryDate}
        />
      </div>

      <form onSubmit={onSubmit} className="space-y-10">
        <section>
          <h2 className={labelClass}>{dict.giftcard.selectTitle}</h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {giftCardDesigns.map((option) => {
              const active = option.key === design;
              return (
              <button
                  type="button"
                  key={option.key}
                  onClick={() => setDesign(option.key)}
                  className={`rounded-xl border p-2 text-left transition-all hover:-translate-y-0.5 ${
                    active
                      ? "border-[var(--color-wisteria)] shadow-md shadow-[rgba(201,123,178,0.18)]"
                      : "border-[var(--color-line)]"
                  }`}
                >
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={option.frontImage}
                      alt={designLabel(option.key, locale)}
                      fill
                      sizes="(max-width: 1024px) 33vw, 20vw"
                      quality={75}
                      className="object-cover"
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className={labelClass}>
            {treatmentLocked
              ? locale === "it"
                ? "Importo"
                : "Amount"
              : locale === "it"
                ? "Scegli l'importo"
                : "Choose amount"}
          </h2>
          {treatmentLocked && (
            <div
              className="mt-4 inline-block rounded-xl border border-[var(--color-wisteria)]/20 bg-white px-5 py-4"
              aria-label={
                treatmentName
                  ? `${treatmentName} — € ${amount}`
                  : `€ ${amount}`
              }
            >
              <p className="display text-3xl leading-none text-[var(--color-brown)] sm:text-4xl">
                €{" "}
                {amount.toLocaleString(locale === "it" ? "it-IT" : "en-GB", {
                  minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          )}
          {!treatmentLocked && (
          <div className="mt-4 flex flex-wrap gap-3">
            {amountChoices.map((choice) => {
              const active = choice.key === amountChoice;
              const label =
                choice.key === "custom"
                  ? locale === "it"
                    ? "Importo libero"
                    : "Custom amount"
                  : choice.label;
              return (
                <button
                  type="button"
                  key={choice.key}
                  onClick={() => setAmountChoice(choice.key)}
                  className={`rounded-full border px-5 py-3 text-sm uppercase tracking-[1.5px] transition-colors ${
                    active
                      ? "border-[var(--color-wisteria)] bg-[var(--color-wisteria)] text-[var(--color-cream)]"
                      : "border-[var(--color-brown)]/20 bg-white text-[var(--color-espresso)] hover:border-[var(--color-wisteria)]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          )}
          {!treatmentLocked && amountChoice === "custom" && (
            <label className="mt-5 block max-w-xs">
              <span className={labelClass}>
                {locale === "it" ? "Importo libero, minimo €20" : "Custom amount, minimum €20"}
              </span>
              <input
                type="number"
                min={20}
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
                className={inputClass}
                required
              />
              {customAmount < 20 && (
                <span className="mt-2 block text-xs text-[var(--color-mauve)]">
                  {ui.customAmountWarning}
                </span>
              )}
            </label>
          )}
        </section>

        <section>
          <h2 className={labelClass}>
            {locale === "it" ? "Personalizza la tua Gift Card" : "Personalize your Gift Card"}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label>
              <span className={labelClass}>
                {locale === "it" ? "Nome di chi regala" : "Sender first name"}
              </span>
              <input
                value={fromFirstName}
                onChange={(e) => setFromFirstName(e.target.value)}
                className={inputClass}
                required
              />
            </label>
            <label>
              <span className={labelClass}>
                {locale === "it" ? "Cognome di chi regala" : "Sender last name"}
              </span>
              <input
                value={fromLastName}
                onChange={(e) => setFromLastName(e.target.value)}
                className={inputClass}
                required
              />
            </label>
            <label>
              <span className={labelClass}>
                {locale === "it" ? "Nome di chi riceve" : "Recipient first name"}
              </span>
              <input
                value={toFirstName}
                onChange={(e) => setToFirstName(e.target.value)}
                className={inputClass}
                required
              />
            </label>
            <label>
              <span className={labelClass}>
                {locale === "it" ? "Cognome di chi riceve" : "Recipient last name"}
              </span>
              <input
                value={toLastName}
                onChange={(e) => setToLastName(e.target.value)}
                className={inputClass}
                required
              />
            </label>
          </div>
          <label className="mt-4 block">
            <span className={labelClass}>
              {locale === "it" ? "Messaggio personalizzato" : "Custom message"}
            </span>
            <textarea
              rows={4}
              maxLength={200}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={locale === "it" ? "Scrivi qui il tuo messaggio…" : "Write your message here…"}
              className={inputClass}
            />
            <span className="mt-2 block text-right text-xs text-[var(--color-espresso)]/50">
              {message.length}/200
            </span>
          </label>
          <label className="mt-4 block">
            <span className={labelClass}>
              {locale === "it" ? "Email di chi acquista" : "Buyer email"}
            </span>
            <input
              type="email"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              className={inputClass}
              required
            />
          </label>
        </section>

        <section className="rounded-xl border border-[var(--color-line)] bg-white/70 p-5">
          <h2 className={labelClass}>{locale === "it" ? "Riepilogo" : "Summary"}</h2>
          <dl className="mt-4 space-y-2 text-sm text-[var(--color-espresso)]/80">
            {treatmentName && (
              <div className="flex justify-between gap-4">
                <dt>{ui.summaryTreatment}</dt>
                <dd className="text-right text-[var(--color-brown)]">{treatmentName}</dd>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <dt>{ui.summaryAmount}</dt>
              <dd className="text-right text-[var(--color-brown)]">€ {amount}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>{ui.summaryFrom}</dt>
              <dd className="text-right text-[var(--color-brown)]">{fromName || "-"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>{ui.summaryTo}</dt>
              <dd className="text-right text-[var(--color-brown)]">{toName || "-"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>{ui.summaryPurchaseDate}</dt>
              <dd className="text-right text-[var(--color-brown)]">
                {formattedPurchaseDate}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>{ui.summaryExpiryDate}</dt>
              <dd className="text-right text-[var(--color-brown)]">
                {formattedExpiryDate}
              </dd>
            </div>
          </dl>
        </section>

        {error && (
          <p className="rounded-xl border border-[var(--color-mauve)]/30 bg-[var(--color-blush)] px-5 py-4 text-[var(--color-brown)]">
            {error}
          </p>
        )}

        {missingFields.length > 0 && !error && (
          <p className="rounded-xl border border-[var(--color-gold)]/35 bg-white px-5 py-4 text-sm leading-6 text-[var(--color-espresso)]/75">
            {ui.validationWarning}
          </p>
        )}

        <button
          type="submit"
          disabled={!canProceed}
          className="flex w-full items-center justify-center rounded-full bg-[var(--color-wisteria)] px-8 py-4 text-sm uppercase tracking-[0.22em] text-[var(--color-cream)] transition-colors hover:bg-[var(--color-mauve)] disabled:opacity-60"
        >
          {pending
            ? locale === "it"
              ? "Preparazione..."
              : "Preparing..."
            : locale === "it"
              ? "Procedi al pagamento"
              : "Proceed to payment"}
        </button>
        <p className="flex items-center justify-center gap-2 text-xs text-[var(--color-espresso)]/55">
          <Lock size={12} />{" "}
          {locale === "it" ? "Pagamento sicuro con Stripe" : "Secure payment with Stripe"}
        </p>
      </form>
    </div>
  );
}
