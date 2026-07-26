type Props = { className?: string; color?: string };

const FLOWER_MASK = "/logo-fiore-kalika-mask.png";

export function LotusDivider({ className = "", color }: Props) {
  const stroke = color ?? "var(--color-wisteria)";
  return (
    <div
      className={`flex items-center justify-center gap-4 ${className}`}
      aria-hidden
    >
      <span
        className="h-px w-16 sm:w-24"
        style={{ background: stroke, opacity: 0.4 }}
      />
      <span
        className="inline-block h-7 w-7 shrink-0 sm:h-8 sm:w-8"
        style={{
          backgroundColor: stroke,
          WebkitMaskImage: `url('${FLOWER_MASK}')`,
          maskImage: `url('${FLOWER_MASK}')`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
      <span
        className="h-px w-16 sm:w-24"
        style={{ background: stroke, opacity: 0.4 }}
      />
    </div>
  );
}
