"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Copy, Download, Home, MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getGiftCardUi } from "@/lib/giftcard-ui";
import { localePath, whatsappLink } from "@/lib/site";

type Props = {
  locale: Locale;
  sessionId: string;
  serial: string;
  toName: string;
  detailLabel: string;
  detailValue: string;
  validUntil: string;
  buyerEmail: string;
};

export function GiftCardThanks({
  locale,
  sessionId,
  serial,
  toName,
  detailLabel,
  detailValue,
  validUntil,
  buyerEmail,
}: Props) {
  const ui = getGiftCardUi(locale).thanks;
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const downloaded = useRef(false);

  const downloadPdf = async () => {
    setDownloading(true);
    try {
      const res = await fetch(
        `/api/gift-card/download?session_id=${encodeURIComponent(sessionId)}`,
      );
      if (!res.ok) throw new Error("download failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `gift-card-${serial}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      // keep the confirmation visible even if download fails
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    if (downloaded.current) return;
    downloaded.current = true;
    void downloadPdf();
    // Auto-download once on arrival after Stripe Checkout.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional one-shot
  }, [sessionId]);

  const downloadAgain = () => {
    void downloadPdf();
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(serial);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard failures
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 text-center">
      <p className="script text-3xl text-[var(--color-mauve)] sm:text-4xl">
        {ui.title}
      </p>
      <h1 className="display mt-4 text-4xl leading-tight text-[var(--color-brown)] sm:text-5xl">
        {ui.subtitle}
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--color-espresso)]/80">
        {ui.body}
      </p>

      <div className="mt-12 rounded-2xl border border-[var(--color-line)] bg-white/80 px-6 py-8 shadow-sm sm:px-10">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-wisteria)]">
          {ui.codeLabel}
        </p>
        <p className="display mt-3 text-3xl tracking-[0.06em] text-[var(--color-brown)] sm:text-4xl">
          {serial}
        </p>
        <button
          type="button"
          onClick={copyCode}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-wisteria)]/40 px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-[var(--color-brown)] transition-colors hover:border-[var(--color-wisteria)] hover:bg-[var(--color-blush)]/50"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? ui.copied : ui.copyCode}
        </button>

        <dl className="mx-auto mt-10 grid max-w-md gap-5 text-left text-sm">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-wisteria)]">
              {ui.toLabel}
            </dt>
            <dd className="mt-1.5 text-[var(--color-espresso)]/90">{toName}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-wisteria)]">
              {detailLabel}
            </dt>
            <dd className="mt-1.5 text-[var(--color-espresso)]/90">
              {detailValue}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-wisteria)]">
              {ui.validUntilLabel}
            </dt>
            <dd className="mt-1.5 text-[var(--color-espresso)]/90">
              {validUntil}
            </dd>
          </div>
        </dl>
      </div>

      <p className="mx-auto mt-10 max-w-lg text-[15px] leading-7 text-[var(--color-espresso)]/75">
        {ui.downloadNote}
      </p>
      <button
        type="button"
        onClick={downloadAgain}
        disabled={downloading}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--color-wisteria)] px-7 py-3.5 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-[var(--color-mauve)] disabled:opacity-60"
      >
        <Download size={15} strokeWidth={1.8} />
        {ui.downloadAgain}
      </button>

      <p className="mx-auto mt-8 max-w-lg text-[15px] leading-7 text-[var(--color-espresso)]/75">
        {ui.emailNote.replace("{email}", buyerEmail)}
      </p>
      <p className="mx-auto mt-6 max-w-lg text-[14px] leading-7 text-[var(--color-espresso)]/65">
        {ui.bookingNote}
      </p>

      <Link
        href={localePath(locale)}
        className="mt-12 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[var(--color-brown)] transition-colors hover:text-[var(--color-mauve)]"
      >
        <Home size={15} strokeWidth={1.7} />
        {ui.backHome}
      </Link>
    </div>
  );
}

export function GiftCardThanksError({ locale }: { locale: Locale }) {
  const ui = getGiftCardUi(locale).thanks;

  return (
    <div className="mx-auto max-w-xl px-6 text-center">
      <h1 className="display text-4xl text-[var(--color-brown)] sm:text-5xl">
        {ui.errorTitle}
      </h1>
      <p className="mt-6 text-base leading-8 text-[var(--color-espresso)]/80">
        {ui.errorBody}
      </p>
      <a
        href={whatsappLink(
          locale === "it"
            ? "Ho un problema con una Gift Card appena acquistata"
            : "I need help with a Gift Card I just purchased",
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-wisteria)] px-7 py-3.5 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-[var(--color-mauve)]"
      >
        <MessageCircle size={15} strokeWidth={1.8} />
        {ui.errorContact}
      </a>
      <div className="mt-8">
        <Link
          href={localePath(locale)}
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[var(--color-brown)] transition-colors hover:text-[var(--color-mauve)]"
        >
          <Home size={15} strokeWidth={1.7} />
          {ui.backHome}
        </Link>
      </div>
    </div>
  );
}
