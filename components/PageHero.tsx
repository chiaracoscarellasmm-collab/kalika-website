import { Reveal } from "./Reveal";
import { LotusDivider } from "./LotusDivider";

type Props = {
  overline?: string;
  title: string;
  subtitle?: string;
  variant?: "estetica" | "spa" | "cream";
};

const bgByVariant: Record<NonNullable<Props["variant"]>, string> = {
  estetica:
    "bg-gradient-to-b from-[var(--color-cream)] via-[#F4ECEC] to-[var(--color-cream)]",
  spa: "bg-gradient-to-b from-[#1f120c] via-[var(--color-brown)] to-[#3a1d2a]",
  cream:
    "bg-gradient-to-b from-[var(--color-cream)] via-[var(--color-blush)] to-[var(--color-cream)]",
};

const textByVariant: Record<NonNullable<Props["variant"]>, string> = {
  estetica: "text-[var(--color-brown)]",
  spa: "text-[var(--color-cream)]",
  cream: "text-[var(--color-brown)]",
};

export function PageHero({ overline, title, subtitle, variant = "cream" }: Props) {
  return (
    <section className={`relative isolate -mt-20 pt-32 pb-20 ${bgByVariant[variant]}`}>
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        {overline && (
          <Reveal>
            <p className={`script text-3xl ${variant === "spa" ? "text-[var(--color-wisteria)]" : "text-[var(--color-mauve)]"}`}>
              {overline}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1 className={`display mt-4 text-5xl leading-tight sm:text-6xl ${textByVariant[variant]}`}>
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.1}>
            <p className={`mt-6 max-w-2xl text-base sm:text-lg ${
              variant === "spa" ? "text-[var(--color-cream)]/80" : "text-[var(--color-espresso)]/75"
            }`}>
              {subtitle}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.15}>
          <LotusDivider
            className="mt-10"
            color={variant === "spa" ? "var(--color-wisteria)" : undefined}
          />
        </Reveal>
      </div>
    </section>
  );
}
