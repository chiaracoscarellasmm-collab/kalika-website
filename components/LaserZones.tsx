"use client";

import Image from "next/image";
import { useState } from "react";
import {
  LASER_COLORS,
  LASER_DOTS,
  LASER_IMG_H,
  LASER_IMG_W,
  type ZoneColor,
} from "@/lib/laser-dots";

const COLORS: Record<ZoneColor, { hex: string; rgb: string }> = {
  blue: { hex: LASER_COLORS.blue, rgb: "74, 123, 166" },
  green: { hex: LASER_COLORS.green, rgb: "95, 143, 112" },
  red: { hex: LASER_COLORS.red, rgb: "197, 107, 107" },
};

const DOTS = LASER_DOTS;
const IMG_W = LASER_IMG_W;
const IMG_H = LASER_IMG_H;

type Tier = { color: ZoneColor; price: string };

type Props = {
  src: string;
  alt: string;
  zonesTitle: string;
  subtitle: string;
  perZone: string;
  tiers: Tier[];
};

export function LaserZones({ src, alt, zonesTitle, subtitle, perZone, tiers }: Props) {
  const [active, setActive] = useState<ZoneColor | null>(null);

  return (
    <div>
      <div className="relative mx-auto w-full max-w-md">
        <Image src={src} alt={alt} width={IMG_W} height={IMG_H} className="w-full" sizes="(max-width: 1024px) 100vw, 480px" />

        <div className="pointer-events-none absolute inset-0">
          {DOTS.map((d, i) => {
            const dimmed = active !== null && active !== d.c;
            const matched = active === d.c;
            const { hex, rgb } = COLORS[d.c];
            return (
              <span
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
                style={{
                  left: `${(d.x / IMG_W) * 100}%`,
                  top: `${(d.y / IMG_H) * 100}%`,
                  width: `${((2 * d.r) / IMG_W) * 100}%`,
                  aspectRatio: "1 / 1",
                  opacity: dimmed ? 0.1 : 1,
                  zIndex: matched ? 20 : 10,
                }}
              >
                <span
                  className={`laser-dot-inner block h-full w-full rounded-full ${matched ? "is-active" : ""}`}
                  style={
                    {
                      backgroundColor: hex,
                      transform: dimmed ? "scale(0.85)" : "scale(1)",
                      ["--glow" as string]: `rgba(${rgb}, 0.85)`,
                      ["--glow-soft" as string]: `rgba(${rgb}, 0.35)`,
                    } as React.CSSProperties
                  }
                />
              </span>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="display text-xl text-[var(--color-brown)]">{zonesTitle}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--color-mauve)]">
          {subtitle}
        </p>
        <ul className="mt-4 grid grid-cols-3 gap-3">
          {tiers.map((tier) => {
            const { hex, rgb } = COLORS[tier.color];
            const on = active === tier.color;
            return (
              <li key={tier.color}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(tier.color)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(tier.color)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive((prev) => (prev === tier.color ? null : tier.color))}
                  className="flex w-full cursor-pointer flex-col items-center gap-1 rounded-2xl border bg-white px-3 py-3 text-center transition-all duration-300"
                  style={{
                    borderColor: on ? hex : "var(--color-line)",
                    boxShadow: on ? `0 8px 24px -8px rgba(${rgb}, 0.55)` : "none",
                    transform: on ? "translateY(-2px)" : "none",
                  }}
                >
                  <span
                    className="h-4 w-4 rounded-full transition-transform duration-300"
                    style={{
                      backgroundColor: hex,
                      transform: on ? "scale(1.25)" : "scale(1)",
                      boxShadow: on ? `0 0 0 3px rgba(${rgb}, 0.25)` : "none",
                    }}
                    aria-hidden
                  />
                  <span className="text-base text-[var(--color-espresso)]">{tier.price}</span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-mauve)]">
                    {perZone}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
