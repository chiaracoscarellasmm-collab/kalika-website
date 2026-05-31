"use client";

import { useState, useTransition } from "react";
import { Lock } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { FORMULAS, type Formula } from "@/lib/giftcard";
import { createGiftCardCheckout } from "@/app/[locale]/gift-card/actions";

type Props = { locale: Locale; dict: Dictionary };

export function GiftCardForm({ locale, dict }: Props) {
  const [formula, setFormula] = useState<Formula>("libero");
  const [amount, setAmount] = useState<number>(80);
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const current = FORMULAS.find((f) => f.key === formula)!;
  const showFreeAmount = formula === "libero";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await createGiftCardCheckout({
        locale,
        formula,
        amount,
        fromName,
        toName,
        message,
      });
      if (result.ok) {
        window.location.href = result.url;
      } else if (result.error === "STRIPE_NOT_CONFIGURED" || result.error === "STRIPE_NOT_IMPLEMENTED") {
        setError(
          locale === "it"
            ? "Pagamenti non ancora configurati. Scrivici su WhatsApp per finalizzare il regalo."
            : "Payments are not yet configured. Please write to us on WhatsApp to finalize your gift.",
        );
      } else {
        setError(
          locale === "it"
            ? "Si è verificato un errore. Riprova."
            : "Something went wrong. Please try again.",
        );
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-12">
      <fieldset>
        <legend className="display text-3xl text-[var(--color-brown)]">
          {dict.giftcard.selectTitle}
        </legend>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FORMULAS.map((f) => {
            const active = formula === f.key;
            return (
              <button
                type="button"
                key={f.key}
                onClick={() => {
                  setFormula(f.key);
                  if (f.amountOptions) setAmount(f.amountOptions[0]);
                  else if (f.key === "libero" && amount < 50) setAmount(80);
                }}
                aria-pressed={active}
                className={`group relative flex h-full flex-col items-start rounded-2xl border p-5 text-left transition-all ${
                  active
                    ? "border-[var(--color-wisteria)] bg-white shadow-md shadow-[rgba(201,123,178,0.18)]"
                    : "border-[var(--color-line)] bg-white/70 hover:border-[var(--color-mauve)]/40"
                }`}
              >
                <span className="text-2xl" aria-hidden>
                  {f.emoji}
                </span>
                <p className="display mt-3 text-lg text-[var(--color-brown)]">
                  {f.label[locale]}
                </p>
                <p className="mt-1 text-xs text-[var(--color-espresso)]/65">
                  {f.text[locale]}
                </p>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Amount */}
      <fieldset>
        <legend className="display text-2xl text-[var(--color-brown)]">
          {dict.giftcard.amount}
        </legend>
        {showFreeAmount ? (
          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl text-[var(--color-mauve)]">€</span>
            <input
              type="number"
              min={50}
              step={10}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-40 rounded-full border border-[var(--color-line)] bg-white px-5 py-2.5 text-lg outline-none focus:border-[var(--color-wisteria)]"
              required
            />
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap gap-3">
            {current.amountOptions?.map((opt) => {
              const active = amount === opt;
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setAmount(opt)}
                  className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
                    active
                      ? "border-[var(--color-wisteria)] bg-[var(--color-wisteria)] text-white"
                      : "border-[var(--color-line)] bg-white text-[var(--color-espresso)] hover:border-[var(--color-mauve)]/40"
                  }`}
                >
                  € {opt}
                </button>
              );
            })}
          </div>
        )}
      </fieldset>

      {/* Personalize */}
      <fieldset>
        <legend className="display text-2xl text-[var(--color-brown)]">
          {dict.giftcard.personalize}
        </legend>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-mauve)]">
              {dict.giftcard.fromName}
            </span>
            <input
              type="text"
              required
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none focus:border-[var(--color-wisteria)]"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-mauve)]">
              {dict.giftcard.toName}
            </span>
            <input
              type="text"
              required
              value={toName}
              onChange={(e) => setToName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none focus:border-[var(--color-wisteria)]"
            />
          </label>
        </div>
        <label className="mt-5 block">
          <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-mauve)]">
            {dict.giftcard.message}
          </span>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={dict.giftcard.messagePlaceholder}
            className="mt-2 w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none focus:border-[var(--color-wisteria)]"
          />
        </label>
      </fieldset>

      {error && (
        <p className="rounded-xl border border-[var(--color-mauve)]/30 bg-[var(--color-blush)] px-5 py-4 text-[17px] leading-8 text-[var(--color-brown)] sm:text-lg">
          {error}
        </p>
      )}

      <div className="flex flex-col items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-3 rounded-full bg-[var(--color-brown)] px-8 py-4 text-sm uppercase tracking-[0.22em] text-[var(--color-cream)] transition-colors hover:bg-[var(--color-mauve)] disabled:opacity-70"
        >
          {dict.giftcard.checkout} · € {amount}
        </button>
        <p className="inline-flex items-center gap-2 text-xs text-[var(--color-espresso)]/60">
          <Lock size={12} /> {dict.giftcard.secure}
        </p>
      </div>
    </form>
  );
}
