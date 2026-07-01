"use client";

import { Star } from "lucide-react";
import { useState } from "react";

type Props = {
  name: string;
  date?: string;
  rating: number;
  text: string;
};

const PREVIEW_LIMIT = 230;

export function ReviewCard({ name, rating, text }: Props) {
  const [expanded, setExpanded] = useState(false);
  const canExpand = text.length > PREVIEW_LIMIT;
  const visibleText =
    canExpand && !expanded ? `${text.slice(0, PREVIEW_LIMIT).trim()}...` : text;

  return (
    <article className="flex h-full min-h-[360px] flex-col rounded-2xl border border-[var(--color-line)] bg-white/70 p-7 shadow-sm shadow-[rgba(107,58,42,0.04)] backdrop-blur">
      <div className="flex items-center gap-0.5 text-[var(--color-wisteria)]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            strokeWidth={1}
            fill={i < rating ? "currentColor" : "transparent"}
          />
        ))}
      </div>
      <div className="mt-4 flex-1">
        <p className="text-[17px] leading-8 text-[var(--color-espresso)]/85 sm:text-lg">
          &ldquo;{visibleText}&rdquo;
        </p>
        {canExpand && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-4 text-xs uppercase tracking-[0.18em] text-[var(--color-mauve)] transition-colors hover:text-[var(--color-brown)]"
          >
            {expanded ? "Mostra meno" : "Mostra di più"}
          </button>
        )}
      </div>
      <div className="mt-5 border-t border-[var(--color-line)] pt-4 text-xs uppercase tracking-[0.18em] text-[var(--color-mauve)]">
        {name}
      </div>
    </article>
  );
}
