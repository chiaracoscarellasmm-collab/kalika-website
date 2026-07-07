import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { type SpaCategory, pick } from "@/lib/treatments";
import { Reveal } from "./Reveal";
import { SpaExperienceCard } from "./SpaExperienceCard";

type Props = {
  category: SpaCategory;
  locale: Locale;
  dict: Dictionary;
  hideCardPricing?: boolean;
  giftDesign?: "spa" | "coppia";
};

export function SpaCategorySections({
  category,
  locale,
  dict,
  hideCardPricing = false,
  giftDesign = "spa",
}: Props) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-24 left-1/2 h-[min(520px,70vw)] w-[min(760px,92vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,123,178,0.11)_0%,transparent_68%)] blur-2xl" />
        <div className="absolute top-[45%] -right-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.07)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 left-8 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(155,94,138,0.06)_0%,transparent_72%)] blur-3xl" />
      </div>

      <div className="relative space-y-20">
      <Reveal>
        <SpaExperienceCard
          treatment={category.featured}
          locale={locale}
          dict={dict}
          featured
          hideCardPricing={hideCardPricing}
          giftDesign={giftDesign}
        />
      </Reveal>

      {category.groups.map((group) => (
        <Reveal key={group.id} delay={0.05}>
          <section>
            <div className="flex flex-col gap-2">
              <h2 className="display text-3xl text-[var(--color-cream)] sm:text-[34px]">
                {pick(group.title, locale)}
              </h2>
              {group.subtitle && (
                <p className="max-w-xl text-[16px] leading-7 text-[var(--color-cream)]/65">
                  {pick(group.subtitle, locale)}
                </p>
              )}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {group.treatments.map((treatment, i) => {
                const isLoneLast =
                  group.treatments.length % 2 === 1 &&
                  i === group.treatments.length - 1;
                return (
                  <SpaExperienceCard
                    key={treatment.id}
                    treatment={treatment}
                    locale={locale}
                    dict={dict}
                    hideCardPricing={hideCardPricing}
                    giftDesign={giftDesign}
                    className={
                      isLoneLast
                        ? "lg:col-span-2 lg:mx-auto lg:w-[calc(50%-0.75rem)]"
                        : undefined
                    }
                  />
                );
              })}
            </div>
          </section>
        </Reveal>
      ))}
      </div>
    </div>
  );
}
