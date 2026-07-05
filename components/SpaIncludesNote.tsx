import type { Locale } from "@/lib/i18n";
import { pick, type SpaInclusions } from "@/lib/treatments";
import { Reveal } from "@/components/Reveal";

type Props = {
  note: SpaInclusions;
  locale: Locale;
};

export function SpaIncludesNote({ note, locale }: Props) {
  return (
    <section className="bg-[#1f120c] pt-14 pb-4">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="script text-3xl text-[var(--color-wisteria)]/70 sm:text-4xl">
            {pick(note.intro, locale)}
          </p>
          <p className="display mt-4 text-4xl leading-tight text-[var(--color-cream)] sm:text-5xl">
            {note.items.map((item, i) => (
              <span key={pick(item, locale)} className="whitespace-nowrap">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="mx-3 align-middle text-3xl text-[var(--color-wisteria)]/50 sm:mx-4 sm:text-4xl"
                  >
                    &middot;
                  </span>
                )}
                {pick(item, locale)}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
