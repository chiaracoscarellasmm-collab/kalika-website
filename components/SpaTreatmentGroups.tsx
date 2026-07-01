import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { type TreatmentGroup, pick } from "@/lib/treatments";
import { Reveal } from "./Reveal";
import { RitualCard } from "./RitualCard";

type Props = {
  groups: TreatmentGroup[];
  locale: Locale;
  dict: Dictionary;
};

export function SpaTreatmentGroups({ groups, locale, dict }: Props) {
  return (
    <div className="space-y-14">
      {groups.map((group, gi) => (
        <Reveal key={group.id} delay={gi * 0.04}>
          <section>
            <h3 className="display text-2xl text-[var(--color-cream)] sm:text-3xl">
              {pick(group.title, locale)}
            </h3>
            <div className="mt-6 space-y-4">
              {group.treatments.map((treatment) => (
                <RitualCard
                  key={treatment.id}
                  treatment={treatment}
                  locale={locale}
                  dict={dict}
                />
              ))}
            </div>
          </section>
        </Reveal>
      ))}
    </div>
  );
}
