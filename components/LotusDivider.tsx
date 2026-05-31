type Props = { className?: string; color?: string };

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
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 4c-2.4 4.5-2.4 9 0 13 2.4-4 2.4-8.5 0-13Z"
          stroke={stroke}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path
          d="M16 17c-3.5-2.5-7-2-10 1.5 3.5 2.5 7 2 10-1.5Z"
          stroke={stroke}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path
          d="M16 17c3.5-2.5 7-2 10 1.5-3.5 2.5-7 2-10-1.5Z"
          stroke={stroke}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path
          d="M16 17c-1.2 3.6 0 7 3 9-.3-3.4-1.5-6.5-3-9Z"
          stroke={stroke}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path
          d="M16 17c1.2 3.6 0 7-3 9 .3-3.4 1.5-6.5 3-9Z"
          stroke={stroke}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="17" r="1.2" fill={stroke} />
      </svg>
      <span
        className="h-px w-16 sm:w-24"
        style={{ background: stroke, opacity: 0.4 }}
      />
    </div>
  );
}
