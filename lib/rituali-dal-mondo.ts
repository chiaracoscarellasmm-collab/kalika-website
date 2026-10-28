import {
  eur,
  eurFrom,
  type Bilingual,
  type Treatment,
  type TreatmentArea,
} from "./treatments";

export type RitualSetting = "cabina" | "spa";

export type RitualDurationRow = {
  duration: Bilingual;
  prices: Record<RitualSetting, Bilingual>;
};

export type RitualeDalMondo = {
  id: string;
  name: Bilingual;
  qualities: Bilingual;
  description: Bilingual;
  areas: TreatmentArea[];
  image: { src: string; alt: Bilingual };
  backOption?: {
    duration: Bilingual;
    price: Bilingual;
    note: Bilingual;
  };
};

export type RitualiFamily = {
  id: string;
  title: Bilingual;
  intro?: Bilingual;
  rituals: RitualeDalMondo[];
};

export const RITUALI_MONDO_INTRO: Bilingual = {
  it: "Un viaggio di benessere sta per cominciare: ti accompagneremo in terre lontane, facendoti assaporare le sensazioni e gli aromi dei luoghi ai quali ogni rituale si ispira.",
  en: "A wellness journey is about to begin: we will take you to faraway lands, letting you savour the sensations and aromas of the places each ritual draws on.",
};

export const RITUALI_MONDO_COMPLETE: Bilingual = {
  it: "I rituali sono trattamenti completi che comprendono scrub, impacco, posa e massaggio finale. Ogni durata include sempre esfoliazione e impacco: cambia il tempo dedicato al massaggio.",
  en: "Each ritual is a complete treatment including scrub, wrap, resting time and a final massage. Every length always includes exfoliation and wrap: what changes is the time devoted to the massage.",
};

export const RITUALI_MONDO_SETTINGS: Record<
  RitualSetting,
  { label: Bilingual; detail: Bilingual }
> = {
  cabina: {
    label: { it: "In cabina", en: "In the cabin" },
    detail: {
      it: "Con il calore di termocoperta e cuscinetti caldi.",
      en: "With the warmth of a thermal blanket and hot pillows.",
    },
  },
  spa: {
    label: { it: "In SPA", en: "In the SPA" },
    detail: {
      it: "Con biosauna, tisana e area relax.",
      en: "With biosauna, herbal tea and relax area.",
    },
  },
};

export const RITUALI_MONDO_PRICES: RitualDurationRow[] = [
  {
    duration: { it: "1h", en: "1h" },
    prices: { cabina: eur(120), spa: eur(145) },
  },
  {
    duration: { it: "1h e 30min", en: "1h 30min" },
    prices: { cabina: eur(150), spa: eur(175) },
  },
  {
    duration: { it: "2h", en: "2h" },
    prices: { cabina: eur(190), spa: eur(215) },
  },
];

export const RITUALI_MONDO_STARTING_PRICE: Bilingual = eurFrom(120);

const BACK_OPTION: RitualeDalMondo["backOption"] = {
  duration: { it: "1h e 30min", en: "1h 30min" },
  price: eur(115),
  note: {
    it: "Opzione solo schiena, in cabina: ideale in caso di tensioni localizzate e stress.",
    en: "Back-only option, in the cabin: ideal for localised tension and stress.",
  },
};

export const ritualiDalMondo: RitualiFamily[] = [
  {
    id: "coccole-relax",
    title: { it: "Coccole e Relax", en: "Pampering & Relax" },
    rituals: [
      {
        id: "bora-bora",
        name: { it: "Rituale Bora Bora", en: "Bora Bora Ritual" },
        qualities: {
          it: "Nutriente, rigenerante, rilassante",
          en: "Nourishing, regenerating, relaxing",
        },
        description: {
          it: "A base di polpa di cocco, sabbia bianca, alga corallina e fiori di tiarè. Un viaggio dei sensi verso le assolate spiagge tropicali. Nutre in profondità e rende la pelle morbida e vellutata.",
          en: "Made with coconut pulp, white sand, coralline algae and tiaré flowers. A sensory journey to sun-drenched tropical beaches. It deeply nourishes, leaving the skin soft and velvety.",
        },
        areas: ["body", "face"],
        image: {
          src: "/images/rituali-dal-mondo/bora-bora.jpg",
          alt: {
            it: "Scrub e olio corpo polinesiani con conchiglie, fiori di tiarè e vista sul mare",
            en: "Polynesian body scrub and oil with seashells, tiaré flowers and a sea view",
          },
        },
      },
      {
        id: "india",
        name: { it: "Rituale India", en: "India Ritual" },
        qualities: {
          it: "Detossinante, riossigenante, anti-age",
          en: "Detoxifying, reoxygenating, anti-age",
        },
        description: {
          it: "A base di tè bianco, verde e nero, alga spirulina, fiordaliso, OxyForce®. Una coccola avvolgente, rigenerante e rassodante che idrata in profondità, leviga e rigenera il tessuto.",
          en: "Made with white, green and black tea, spirulina algae, cornflower and OxyForce®. An enveloping, regenerating and firming treat that deeply hydrates, smooths and renews the skin.",
        },
        areas: ["body"],
        image: {
          src: "/images/rituali-dal-mondo/india.jpg",
          alt: {
            it: "Teiera decorata, ciotola verde, tamponi alle erbe e oli per il Rituale India",
            en: "Decorated teapot, green bowl, herbal pouch and oils for the India Ritual",
          },
        },
      },
      {
        id: "kyoto",
        name: { it: "Rituale Kyoto", en: "Kyoto Ritual" },
        qualities: {
          it: "Nutriente, illuminante, anti-age",
          en: "Nourishing, illuminating, anti-age",
        },
        description: {
          it: "A base di tè matcha, rapa rossa di Kiso, argilla rosa, fiori di ciliegio e olio fermentato di Camelia. Nutre e ristruttura la pelle rendendola vellutata e luminosa.",
          en: "Made with matcha tea, Kiso red beet, pink clay, cherry blossoms and fermented camellia oil. It nourishes and restructures the skin, leaving it velvety and radiant.",
        },
        areas: ["body", "face"],
        image: {
          src: "/images/rituali-dal-mondo/kyoto.jpg",
          alt: {
            it: "Teiera in ghisa, frusta per matcha, pietra rosa e fiori di ciliegio per il Rituale Kyoto",
            en: "Cast-iron teapot, matcha whisk, rose quartz stone and cherry blossoms for the Kyoto Ritual",
          },
        },
      },
    ],
  },
  {
    id: "rituali-caldi",
    title: { it: "Rituali caldi", en: "Warm rituals" },
    intro: {
      it: "I rituali caldi decontratturanti e detossinanti sono ideali per concedersi una pausa di benessere e relax. Donano sollievo in caso di contratture e accumulo di stress. Questi trattamenti sono anche disponibili nella versione solo schiena, spalle e collo.",
      en: "Our warm, tension-relieving and detoxifying rituals are ideal for a break of wellbeing and relaxation. They bring relief from muscle tension and built-up stress. These treatments are also available as a back, shoulders and neck version.",
    },
    rituals: [
      {
        id: "amazzonia",
        name: { it: "Rituale Amazzonia", en: "Amazonia Ritual" },
        qualities: {
          it: "Decontratturante, nutriente, detossinante",
          en: "Tension-relieving, nourishing, detoxifying",
        },
        description: {
          it: "A base di cacao teobroma, noce del Brasile, guaranà, arancia e peperoncino, è una coccola ideale per ritrovare benessere ed equilibrio. Avrete la sensazione di essere immersi nella foresta tropicale, nutrendovi dei suoi frutti a contatto con la terra calda del sottosuolo.",
          en: "Made with theobroma cocoa, Brazil nut, guarana, orange and chilli pepper, it is the ideal treat for restoring wellbeing and balance. You will feel immersed in the tropical forest, nourished by its fruits in contact with the warm earth beneath.",
        },
        areas: ["body"],
        image: {
          src: "/images/rituali-dal-mondo/amazzonia.jpg",
          alt: {
            it: "Ciotola di polvere di cacao, fave di cacao e foglie tropicali per il Rituale Amazzonia",
            en: "Bowl of cocoa powder, cocoa beans and tropical leaves for the Amazonia Ritual",
          },
        },
        backOption: BACK_OPTION,
      },
      {
        id: "himalaya",
        name: { it: "Rituale Himalaya", en: "Himalaya Ritual" },
        qualities: {
          it: "Mineralizzante, decontratturante",
          en: "Mineralising, tension-relieving",
        },
        description: {
          it: "Tutta la potenza del sale rosa per un trattamento decontratturante e altamente detossinante. A base di oli essenziali, sale fossile ricco di minerali, cuscini caldi, sfere e pietre di sale.",
          en: "All the power of pink salt for a tension-relieving and highly detoxifying treatment. Made with essential oils, mineral-rich fossil salt, hot pillows, and salt spheres and stones.",
        },
        areas: ["body"],
        image: {
          src: "/images/rituali-dal-mondo/himalaya.jpg",
          alt: {
            it: "Sfere di sale rosa dell'Himalaya illuminate, cristalli di sale e cuscino caldo",
            en: "Glowing Himalayan pink salt spheres, salt crystals and a warm pillow",
          },
        },
        backOption: BACK_OPTION,
      },
    ],
  },
];

// ── Gift cards ───────────────────────────────────────────────────────────────

export type RitualGiftGroup = RitualSetting | "schiena";

export type RitualGiftOption = {
  /** Index into the gift treatment's durationOptions — what the server re-derives the price from. */
  variant: string;
  group: RitualGiftGroup;
  duration: Bilingual;
  price: Bilingual;
  label: Bilingual;
};

const BACK_ONLY: Bilingual = { it: "Solo schiena", en: "Back only" };

/** Every giftable variant of a ritual, in a fixed order: never reorder without considering links already shared. */
export function ritualGiftOptions(ritual: RitualeDalMondo): RitualGiftOption[] {
  const options: RitualGiftOption[] = [];
  for (const setting of ["cabina", "spa"] as const) {
    const where = RITUALI_MONDO_SETTINGS[setting].label;
    for (const row of RITUALI_MONDO_PRICES) {
      options.push({
        variant: String(options.length),
        group: setting,
        duration: row.duration,
        price: row.prices[setting],
        label: {
          it: `${row.duration.it} · ${where.it}`,
          en: `${row.duration.en} · ${where.en}`,
        },
      });
    }
  }
  if (ritual.backOption) {
    const where = RITUALI_MONDO_SETTINGS.cabina.label;
    const { duration, price } = ritual.backOption;
    options.push({
      variant: String(options.length),
      group: "schiena",
      duration,
      price,
      label: {
        it: `${BACK_ONLY.it} · ${duration.it} · ${where.it}`,
        en: `${BACK_ONLY.en} · ${duration.en} · ${where.en}`,
      },
    });
  }
  return options;
}

export function ritualGiftTreatmentId(ritual: RitualeDalMondo): string {
  return `rituale-mondo-${ritual.id}`;
}

const ritualGiftTreatments: Treatment[] = ritualiDalMondo
  .flatMap((family) => family.rituals)
  .map((ritual) => ({
    id: ritualGiftTreatmentId(ritual),
    name: ritual.name,
    durationOptions: ritualGiftOptions(ritual).map((option) => ({
      duration: option.label,
      price: option.price,
    })),
  }));

export function findRitualGiftTreatment(id: string): Treatment | null {
  return ritualGiftTreatments.find((treatment) => treatment.id === id) ?? null;
}
