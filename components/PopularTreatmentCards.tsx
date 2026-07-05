"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { pick, type Treatment } from "@/lib/treatments";

type Props = {
  treatments: Treatment[];
  locale: Locale;
};

export function PopularTreatmentCards({ treatments, locale }: Props) {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {treatments.map((t, i) => (
        <motion.article
          key={t.id}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
            delay: i * 0.12,
          }}
          whileHover={{
            y: -10,
            transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          }}
          className="group flex h-full items-center rounded-2xl border border-white/60 bg-white/95 p-7 shadow-sm backdrop-blur-sm transition-[box-shadow,border-color,background-color] duration-500 hover:border-[var(--color-wisteria)]/40 hover:bg-white hover:shadow-2xl hover:shadow-[rgba(44,24,16,0.2)]"
        >
          <p className="display text-2xl text-[var(--color-brown)] transition-transform duration-500 group-hover:translate-x-1">
            {pick(t.name, locale)}
          </p>
        </motion.article>
      ))}
    </div>
  );
}
