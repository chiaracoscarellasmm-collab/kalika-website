import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { LotusDivider } from "./LotusDivider";

type NavItem = {
  href: string;
  label: string;
};

type Props = {
  title: string;
  subtitle: string;
  navItems: NavItem[];
  videoSrc?: string;
  streamEmbedHtml?: string;
};

export function SpaHeroVideo({
  title,
  subtitle,
  navItems,
  videoSrc = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  streamEmbedHtml,
}: Props) {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#120b07] text-[var(--color-cream)]">
      <div className="absolute inset-0">
        {streamEmbedHtml ? (
          <div
            className="absolute inset-0 overflow-hidden [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-0"
            dangerouslySetInnerHTML={{ __html: streamEmbedHtml }}
          />
        ) : (
          <video
            className="h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,10,5,0.5) 0%, rgba(20,10,5,0.65) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-6 py-28">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <LotusDivider color="#C9A96E" className="mb-8 scale-90" />
          <h1 className="display mt-5 max-w-4xl text-5xl leading-tight tracking-[0.02em] text-[var(--color-cream)] sm:text-6xl lg:text-[64px]">
            {title}
          </h1>
          <p className="mt-5 text-[11px] uppercase tracking-[6px] text-[var(--color-gold)]">
            {subtitle}
          </p>
          <span className="mt-6 h-px w-24 bg-[var(--color-gold)]/70" />

          <nav
            className="mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px] uppercase tracking-[3px] text-[var(--color-cream)]/90"
            aria-label="SPA sections"
          >
            {navItems.map((item, index) => (
              <span key={item.href} className="inline-flex items-center gap-3">
                {index > 0 && <span className="text-[var(--color-gold)]/70">◆</span>}
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[var(--color-gold)]"
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>

        <a
          href="#rituali"
          className="kalika-scroll-cue absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[var(--color-cream)]/80"
          aria-label="Scroll to content"
        >
          <ArrowDown size={18} />
        </a>
      </div>
    </section>
  );
}
