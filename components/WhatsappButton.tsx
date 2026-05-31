"use client";

import { MessageCircle } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { whatsappLink } from "@/lib/site";

type Props = { dict: Dictionary };

export function WhatsappButton({ dict }: Props) {
  return (
    <a
      href={whatsappLink(`${dict.common.watsapMessage} Kalika`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.common.bookOnWhatsapp}
      className="kalika-pulse fixed bottom-5 right-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-wisteria)] text-white shadow-lg shadow-[rgba(155,94,138,0.25)] transition-transform hover:scale-105"
    >
      <MessageCircle size={24} strokeWidth={1.8} />
      <span className="sr-only">{dict.common.bookOnWhatsapp}</span>
    </a>
  );
}
