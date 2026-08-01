import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import {
  lastUpdatedLabel,
  type LegalBlock,
  type LegalDoc,
} from "@/lib/legal";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";

const linkClass =
  "text-[var(--color-mauve)] underline decoration-[var(--color-mauve)]/30 underline-offset-4 transition-colors hover:text-[var(--color-brown)] hover:decoration-[var(--color-brown)]/50";

/**
 * Renders `**bold**` and `[label](href)` inside legal copy.
 * Internal hrefs use <Link>; mailto and external hrefs use <a>.
 */
function inline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((chunk, i) => {
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-[var(--color-brown)]">
          {chunk.slice(2, -2)}
        </strong>
      );
    }

    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(chunk);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/")) {
        return (
          <Link key={i} href={href} className={linkClass}>
            {label}
          </Link>
        );
      }
      const external = href.startsWith("http");
      return (
        <a
          key={i}
          href={href}
          className={linkClass}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {label}
        </a>
      );
    }

    return <Fragment key={i}>{chunk}</Fragment>;
  });
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <p className="mt-5 leading-8 text-[var(--color-espresso)]/80 first:mt-0">
          {inline(block.text)}
        </p>
      );

    case "ul":
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="relative pl-6 leading-8 text-[var(--color-espresso)]/80 before:absolute before:left-0 before:top-[0.95em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--color-wisteria)]"
            >
              {inline(item)}
            </li>
          ))}
        </ul>
      );

    case "dl":
      return (
        <dl className="mt-6 space-y-4">
          {block.items.map((item, i) => (
            <div
              key={i}
              className="border-l-2 border-[var(--color-wisteria)]/30 pl-5"
            >
              <dt className="text-[11px] uppercase tracking-[2px] text-[var(--color-mauve)]">
                {item.term}
              </dt>
              <dd className="mt-1.5 leading-7 text-[var(--color-espresso)]/80">
                {inline(item.desc)}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "table":
      return (
        <div className="mt-6 -mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
            <thead>
              <tr>
                {block.head.map((cell, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="border-b border-[var(--color-brown)]/20 pb-3 pr-5 text-[11px] font-normal uppercase tracking-[1.6px] text-[var(--color-mauve)] last:pr-0"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="align-top">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="border-b border-[var(--color-line)] py-4 pr-5 leading-7 text-[var(--color-espresso)]/80 last:pr-0"
                    >
                      {inline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

type Props = { locale: Locale; doc: LegalDoc };

export function LegalPage({ locale, doc }: Props) {
  return (
    <>
      <PageHero title={doc.title} subtitle={doc.subtitle} variant="cream" compact />

      <section className="bg-[var(--color-cream)] pb-28 pt-10">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <p className="border-l-2 border-[var(--color-wisteria)] pl-5 text-[17px] leading-8 text-[var(--color-espresso)]/85">
              {inline(doc.intro)}
            </p>
          </Reveal>

          {doc.sections.map((section, i) => (
            <Reveal key={section.heading} delay={Math.min(i, 4) * 0.03}>
              <section className="mt-14">
                <h2 className="display text-2xl text-[var(--color-brown)] sm:text-[26px]">
                  {section.heading}
                </h2>
                <div className="mt-4">
                  {section.blocks.map((block, j) => (
                    <Block key={j} block={block} />
                  ))}
                </div>
              </section>
            </Reveal>
          ))}

          <Reveal>
            <p className="mt-16 border-t border-[var(--color-line)] pt-6 text-xs uppercase tracking-[0.2em] text-[var(--color-espresso)]/50">
              {lastUpdatedLabel(locale)}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
