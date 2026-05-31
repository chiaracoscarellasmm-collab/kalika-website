type Variant = "estetica" | "spa" | "blush" | "warm" | "deep";

const gradients: Record<Variant, string> = {
  estetica:
    "linear-gradient(135deg, #FAF7F2 0%, #F0E6F0 60%, #E8D8E0 100%)",
  spa: "linear-gradient(135deg, #9B5E8A 0%, #6B3A2A 100%)",
  blush:
    "linear-gradient(135deg, #F0E6F0 0%, #E8D8E0 60%, #C9A96E22 100%)",
  warm: "linear-gradient(135deg, #C9A96E 0%, #6B3A2A 100%)",
  deep: "linear-gradient(135deg, #2C1810 0%, #6B3A2A 60%, #9B5E8A 100%)",
};

type Props = {
  variant?: Variant;
  label?: string;
  className?: string;
  aspect?: string;
  rounded?: string;
};

export function ImagePlaceholder({
  variant = "estetica",
  label,
  className = "",
  aspect = "aspect-[4/5]",
  rounded = "rounded-2xl",
}: Props) {
  return (
    <div
      className={`relative overflow-hidden ${aspect} ${rounded} ${className}`}
      style={{ background: gradients[variant] }}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
        background:
          "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.6), transparent 50%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.25), transparent 60%)",
      }} />
      <div className="absolute inset-0 flex items-end justify-start p-6">
        {label && (
          <p className="display text-2xl text-white/90 drop-shadow-sm">
            {label}
          </p>
        )}
      </div>
    </div>
  );
}
