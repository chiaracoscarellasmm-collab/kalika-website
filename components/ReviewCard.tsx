import { Star } from "lucide-react";

type Props = {
  name: string;
  date: string;
  rating: number;
  text: string;
};

export function ReviewCard({ name, date, rating, text }: Props) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white/70 p-7 shadow-sm shadow-[rgba(107,58,42,0.04)] backdrop-blur">
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
      <p className="mt-4 flex-1 text-[17px] leading-8 text-[var(--color-espresso)]/85 sm:text-lg">
        &ldquo;{text}&rdquo;
      </p>
      <div className="mt-5 border-t border-[var(--color-line)] pt-4 text-xs uppercase tracking-[0.18em] text-[var(--color-mauve)]">
        {name} · {date}
      </div>
    </article>
  );
}
