import { MessageCircle } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { whatsappLink } from "@/lib/site";
import { Reveal } from "./Reveal";

type Props = {
  dict: Dictionary;
  title?: string;
  body?: string;
  topic?: string;
  variant?: "cream" | "spa";
};

export function SectionWhatsapp({ dict, title, body, topic, variant = "cream" }: Props) {
  const isSpa = variant === "spa";
  return (
    <section
      className={
        isSpa
          ? "border-t border-[var(--color-cream)]/10 bg-[#1f120c] py-20"
          : "bg-[var(--color-blush)] py-20"
      }
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h3
            className={`display text-3xl sm:text-4xl ${
              isSpa ? "text-[var(--color-cream)]" : "text-[var(--color-brown)]"
            }`}
          >
            {title ?? dict.estetica.chooseHelpTitle}
          </h3>
        </Reveal>
        <Reveal delay={0.05}>
          <p
            className={`mt-4 ${
              isSpa
                ? "text-[var(--color-cream)]/75"
                : "text-[var(--color-espresso)]/75"
            }`}
          >
            {body ?? dict.estetica.chooseHelpBody}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <a
            href={whatsappLink(`${dict.common.watsapMessage} ${topic ?? "Kalika"}`)}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-8 inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm uppercase tracking-[0.2em] transition-colors ${
              isSpa
                ? "bg-[var(--color-wisteria)] text-white hover:bg-[var(--color-mauve)]"
                : "bg-[var(--color-brown)] text-[var(--color-cream)] hover:bg-[var(--color-mauve)]"
            }`}
          >
            <MessageCircle size={18} strokeWidth={1.6} />
            {dict.common.bookOnWhatsapp}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
