import type { Locale } from "./i18n";

export type Bilingual = { it: string; en: string };

export type BenefitTag =
  | "relax"
  | "detox"
  | "nutriente"
  | "sensoriale"
  | "coppia"
  | "purificante"
  | "tonificante";

export const TAG_LABELS: Record<BenefitTag, Bilingual> = {
  relax: { it: "Rilassante", en: "Relaxing" },
  detox: { it: "Detox", en: "Detox" },
  nutriente: { it: "Nutriente", en: "Nourishing" },
  sensoriale: { it: "Sensoriale", en: "Sensory" },
  coppia: { it: "Di coppia", en: "For two" },
  purificante: { it: "Purificante", en: "Purifying" },
  tonificante: { it: "Tonificante", en: "Toning" },
};

/** A single pricing row (e.g. "Singolo → € 100,00", "3–6 persone → € 50,00 a persona"). */
export type PriceTier = {
  label: Bilingual;
  price: Bilingual;
};

/** Duration variant with its own price (e.g. 55 min / 85 min). */
export type DurationOption = {
  duration: Bilingual;
  price: Bilingual;
};

/** How a SPA journey can be experienced (group vs solo, with/without therapist). */
export type SessionMode = {
  label: Bilingual;
  duration: Bilingual;
  note?: Bilingual;
};

export type Treatment = {
  id: string;
  name: Bilingual;
  duration?: Bilingual;
  /** Headline price, already formatted per locale (e.g. "€ 58,00"). */
  price?: Bilingual;
  /** When set, the visitor picks a duration and the price updates accordingly. */
  durationOptions?: DurationOption[];
  /** Full pricing breakdown (single, couple, groups…) revealed on demand. */
  priceTiers?: PriceTier[];
  /** Group vs solo access modes (e.g. with/without therapist). */
  sessionModes?: SessionMode[];
  /** Short, evocative teaser shown on the card (max ~2 lines). */
  short?: Bilingual;
  /** Full description revealed on demand. */
  description?: Bilingual;
  temperature?: Bilingual;
  tags?: BenefitTag[];
};

export type TreatmentGroup = {
  id: string;
  title: Bilingual;
  /** Optional short intro line under the section title. */
  subtitle?: Bilingual;
  treatments: Treatment[];
};

/**
 * The "what's included" note, split for a hierarchical layout:
 * a soft intro line above the highlighted inclusions.
 */
export type SpaInclusions = {
  intro: Bilingual;
  items: Bilingual[];
};

/** A full SPA category: an emotional note, a hero treatment and thematic groups. */
export type SpaCategory = {
  note?: SpaInclusions;
  featured: Treatment;
  groups: TreatmentGroup[];
};

export const PRICE_PLACEHOLDER: Bilingual = { it: "[PREZZO]", en: "[PRICE]" };
export const DURATION_PLACEHOLDER: Bilingual = { it: "[DURATA]", en: "[DURATION]" };
export const DESC_PLACEHOLDER: Bilingual = {
  it: "[DESCRIZIONE]",
  en: "[DESCRIPTION]",
};

export function pick(b: Bilingual, locale: Locale): string {
  return b[locale];
}

/** Formats an amount in euro for both locales (e.g. eur(58) → "€ 58,00" / "€58.00"). */
export function eur(amount: number): Bilingual {
  return {
    it: `€ ${amount.toFixed(2).replace(".", ",")}`,
    en: `€${amount.toFixed(2)}`,
  };
}

/** Euro amount prefixed with "starting from" (e.g. "Da € 63,00" / "From €63.00"). */
export function eurFrom(amount: number): Bilingual {
  return {
    it: `Da ${eur(amount).it}`,
    en: `From ${eur(amount).en}`,
  };
}

/** Euro amount with a "per person" suffix. */
function eurPerson(amount: number): Bilingual {
  return {
    it: `${eur(amount).it} a persona`,
    en: `${eur(amount).en} / person`,
  };
}

/** Euro amount with a "for two" suffix. */
function eurCouple(amount: number): Bilingual {
  return {
    it: `${eur(amount).it} a coppia`,
    en: `${eur(amount).en} / couple`,
  };
}

const TIER_SINGLE: Bilingual = { it: "Singolo", en: "Single" };
const TIER_COUPLE: Bilingual = { it: "2 persone", en: "2 people" };
const TIER_2_4: Bilingual = { it: "2–4 persone", en: "2–4 people" };
const TIER_3_6: Bilingual = { it: "3–6 persone", en: "3–6 people" };
const TIER_5_6: Bilingual = { it: "5–6 persone", en: "5–6 people" };
const TIER_DETOX: Bilingual = {
  it: "Singolo detox con operatore",
  en: "Single detox with therapist",
};
const TIER_DETOX_BIO: Bilingual = {
  it: "Singolo detox con operatore in biosauna",
  en: "Single detox with therapist in biosauna",
};

// ── ESTETICA ─────────────────────────────────────────────────────────────────

const DUR_60: Bilingual = { it: "60min", en: "60 min" };
const DUR_55: Bilingual = { it: "55min", en: "55 min" };
const DUR_45: Bilingual = { it: "45min", en: "45 min" };
const DUR_40: Bilingual = { it: "40min", en: "40 min" };
const DUR_30: Bilingual = { it: "30min", en: "30 min" };
const DUR_75: Bilingual = { it: "75min", en: "75 min" };
const DUR_85: Bilingual = { it: "85min", en: "85 min" };

export const visoGroups: TreatmentGroup[] = [
  {
    id: "viso-tutti",
    title: { it: "Trattamenti viso", en: "Facial treatments" },
    treatments: [
      { id: "pulizia-viso", name: { it: "Pulizia del viso", en: "Facial cleansing" }, duration: DUR_60, price: eur(58) },
      { id: "trattamento-personalizzato", name: { it: "Trattamento personalizzato", en: "Tailored treatment" }, duration: DUR_60, price: eurFrom(63) },
      { id: "ristrutturazione", name: { it: "Trattamento ristrutturazione", en: "Restructuring treatment" }, duration: DUR_60, price: eur(88) },
      { id: "talaterm-fangogel", name: { it: "Talaterm fangogel depurante", en: "Talaterm purifying mud-gel" }, duration: DUR_60, price: eur(73) },
      { id: "talaterm-antirughe", name: { it: "Talaterm decontratturante antirughe", en: "Talaterm anti-wrinkle relaxing" }, duration: DUR_60, price: eur(83) },
      { id: "sinerplus", name: { it: "Trattamento Sinerplus", en: "Sinerplus treatment" }, duration: DUR_60, price: eur(88) },
      { id: "antiaging-viso", name: { it: "Antiaging viso", en: "Facial antiaging" }, duration: DUR_45, price: eur(53) },
    ],
  },
];

export const corpoGroups: TreatmentGroup[] = [
  {
    id: "corpo-completi",
    title: { it: "Trattamenti completi", en: "Full body treatments" },
    subtitle: {
      it: "Trattamenti con cosmesi eubiotica SICE.",
      en: "Treatments with SICE eubiotic cosmeceuticals.",
    },
    treatments: [
      { id: "pulizia-profonda-corpo", name: { it: "Pulizia profonda corpo", en: "Deep body cleansing" }, duration: DUR_55, price: eur(70) },
      { id: "pulizia-profonda-biosauna", name: { it: "Pulizia profonda in biosauna", en: "Deep cleansing in biosauna" }, duration: DUR_60, price: eur(95) },
      { id: "talaterm-fango-depurativo", name: { it: "Talaterm fango gel depurativo", en: "Talaterm purifying mud-gel" }, duration: DUR_60, price: eurFrom(80) },
      { id: "talaterm-caldo-freddo", name: { it: "Talaterm fango gel caldo / freddo", en: "Talaterm hot / cold mud-gel" }, duration: DUR_75, price: eur(105) },
      { id: "ristrutturazione-barriera", name: { it: "Ristrutturazione della barriera di permeabilità", en: "Permeability barrier restructuring" }, duration: DUR_60, price: eur(110) },
      { id: "talaplus", name: { it: "Talaplus", en: "Talaplus" }, duration: DUR_75, price: eur(130) },
      { id: "body-reset", name: { it: "Body reset", en: "Body reset" }, duration: DUR_75, price: eur(140) },
      { id: "olistico", name: { it: "Trattamento olistico", en: "Holistic treatment" }, duration: DUR_60, price: eur(65) },
    ],
  },
  {
    id: "corpo-localizzati",
    title: { it: "Trattamenti localizzati", en: "Targeted treatments" },
    subtitle: {
      it: "Trattamenti con cosmesi eubiotica SICE.",
      en: "Treatments with SICE eubiotic cosmeceuticals.",
    },
    treatments: [
      { id: "cuoio-capelluto-spa", name: { it: "Cuoio capelluto in SPA", en: "Scalp treatment in SPA" }, duration: DUR_60, price: eurFrom(65) },
      { id: "pulizia-schiena", name: { it: "Pulizia schiena", en: "Back cleansing" }, duration: DUR_55, price: eur(53) },
      { id: "gambe", name: { it: "Gambe", en: "Legs" }, duration: DUR_45, price: eurFrom(45) },
      { id: "seno", name: { it: "Seno", en: "Bust" }, duration: DUR_45, price: eurFrom(50) },
      { id: "pancia-piatta", name: { it: "Metodo Pancia Piatta", en: "Flat-belly method" }, duration: DUR_40, price: eur(45) },
      { id: "gambe-leggere", name: { it: "Gambe leggere", en: "Light legs" }, duration: DUR_30, price: eur(40) },
    ],
  },
];

export const massaggiGroups: TreatmentGroup[] = [
  {
    id: "massaggi-rilassanti",
    title: { it: "Massaggi rilassanti", en: "Relaxing massages" },
    treatments: [
      { id: "rilassante", name: { it: "Rilassante", en: "Relaxing" }, duration: DUR_55, price: eur(65) },
      { id: "drenante", name: { it: "Drenante", en: "Lymphatic drainage" }, duration: DUR_55, price: eur(65) },
      { id: "sinergico", name: { it: "Sinergico", en: "Synergic" }, duration: DUR_55, price: eur(80) },
      { id: "riflessologia-plantare", name: { it: "Riflessologia plantare", en: "Foot reflexology" }, duration: DUR_40, price: eur(45) },
      {
        id: "riflessologia-corporea",
        name: { it: "Riflessologia corporea", en: "Body reflexology" },
        durationOptions: [
          { duration: DUR_55, price: eur(65) },
          { duration: DUR_85, price: eur(90) },
        ],
      },
    ],
  },
  {
    id: "massaggi-speciali",
    title: { it: "Momenti speciali", en: "Special moments" },
    treatments: [
      {
        id: "massaggio-kalika",
        name: { it: "Massaggio Kalika", en: "Kalika massage" },
        durationOptions: [
          { duration: DUR_55, price: eur(70) },
          { duration: DUR_85, price: eur(95) },
        ],
      },
      {
        id: "hot-stone",
        name: { it: "Hot Stone", en: "Hot Stone" },
        durationOptions: [
          { duration: DUR_55, price: eur(80) },
          { duration: DUR_85, price: eur(100) },
        ],
      },
      { id: "gravidanza", name: { it: "Massaggio in gravidanza", en: "Pregnancy massage" }, price: eur(75) },
      { id: "mamma-bambino", name: { it: "Massaggio mamma e bambino", en: "Mother & child massage" }, short: { it: "Per bambini fino ai 12 anni", en: "For children up to 12 years" }, price: eur(100) },
      { id: "bambini-ragazzi", name: { it: "Massaggio bambini e ragazzi", en: "Children & teens massage" }, short: { it: "Fino ai 14 anni", en: "Up to 14 years" }, price: eurFrom(45) },
      { id: "due-spa", name: { it: "Massaggio per due in SPA", en: "Massage for two in SPA" }, price: eur(155) },
    ],
  },
  {
    id: "massaggi-localizzati",
    title: { it: "Massaggi localizzati", en: "Targeted massages" },
    treatments: [
      { id: "decontratturante-schiena", name: { it: "Decontratturante schiena", en: "Back relaxing" }, duration: DUR_40, price: eur(45) },
      { id: "relax-mani", name: { it: "Relax mani", en: "Hand relax" }, duration: DUR_30, price: eur(40) },
      { id: "relax-piedi", name: { it: "Relax piedi", en: "Foot relax" }, duration: DUR_30, price: eur(40) },
      { id: "testa-cuoio-capelluto", name: { it: "Testa e cuoio capelluto", en: "Head & scalp" }, duration: DUR_45, price: eur(53) },
    ],
  },
];

export const maniPiediGroups: TreatmentGroup[] = [
  {
    id: "mani",
    title: { it: "Servizi mani", en: "Hand services" },
    treatments: [
      { id: "manicure", name: { it: "Manicure", en: "Manicure" }, price: eur(28) },
      { id: "manicure-semi", name: { it: "Manicure con semipermanente", en: "Manicure with gel polish" }, price: eur(43) },
      { id: "semipermanente", name: { it: "Semipermanente", en: "Gel polish" }, price: eur(30) },
      { id: "french", name: { it: "French", en: "French" }, price: eur(5) },
      { id: "rimozione-semi", name: { it: "Rimozione singola semipermanente", en: "Gel polish removal" }, price: eur(15) },
      { id: "ristrutturazione-mani", name: { it: "Ristrutturazione mani", en: "Hand restructuring" }, price: eur(25) },
    ],
  },
  {
    id: "piedi",
    title: { it: "Servizi piedi", en: "Foot services" },
    treatments: [
      { id: "pedicure-estetico", name: { it: "Pedicure estetico", en: "Cosmetic pedicure" }, price: eur(41) },
      { id: "pedicure-curativo", name: { it: "Pedicure curativo", en: "Curative pedicure" }, price: eur(43) },
      { id: "pedicure-estetico-semi", name: { it: "Pedicure estetico con semipermanente", en: "Cosmetic pedicure with gel polish" }, price: eur(50) },
      { id: "pedicure-curativo-semi", name: { it: "Pedicure curativo con semipermanente", en: "Curative pedicure with gel polish" }, price: eur(53) },
      { id: "ristrutturazione-piedi", name: { it: "Ristrutturazione piedi", en: "Foot restructuring" }, price: eur(25) },
      { id: "ristrutturazione-abbinata", name: { it: "Ristrutturazione abbinata a manicure/pedicure", en: "Restructuring combined with manicure/pedicure" }, price: eur(20) },
    ],
  },
];

export const epilazioneGroups: TreatmentGroup[] = [
  {
    id: "epilazione-tradizionale",
    title: { it: "Epilazione tradizionale", en: "Traditional waxing" },
    subtitle: { it: "Uomo e donna, viso e corpo.", en: "Men and women, face and body." },
    treatments: [
      { id: "trad-viso", name: { it: "Viso", en: "Face" }, short: { it: "Sopracciglia, baffetti, sopracciglia + baffetti", en: "Brows, upper lip, brows + upper lip" }, price: eurFrom(8) },
      { id: "trad-ascelle", name: { it: "Ascelle", en: "Underarms" }, price: eur(13) },
      { id: "trad-braccia", name: { it: "Braccia", en: "Arms" }, price: eur(21) },
      { id: "trad-inguine", name: { it: "Inguine", en: "Bikini" }, short: { it: "Classico, sgambato o totale", en: "Classic, high-cut or full" }, price: eurFrom(13) },
      { id: "trad-gambe", name: { it: "Gambe", en: "Legs" }, short: { it: "Mezza o intera, anche con inguine", en: "Half or full, also with bikini" }, price: eurFrom(21) },
      { id: "trad-busto", name: { it: "Petto, addome e schiena", en: "Chest, abdomen & back" }, price: eurFrom(28) },
    ],
  },
  {
    id: "coco-cera",
    title: { it: "Coco Cera", en: "Coco Cera" },
    subtitle: { it: "Originale cera brasiliana.", en: "Original Brazilian wax." },
    treatments: [
      { id: "coco-donna", name: { it: "Donna · viso e corpo", en: "Women · face & body" }, price: eurFrom(7) },
      { id: "coco-uomo", name: { it: "Uomo · viso e corpo", en: "Men · face & body" }, price: eurFrom(8) },
    ],
  },
];

/** Diode-laser pricing bands (colour-coded by body zone; see the zones image). */
export const laserTiers: {
  zone: "blue" | "green" | "red";
  color: string;
  price: Bilingual;
}[] = [
  { zone: "blue", color: "#4a7ba6", price: eur(19) },
  { zone: "green", color: "#5f8f70", price: eur(29) },
  { zone: "red", color: "#c56b6b", price: eur(39) },
];

export const sopraccigliaGroups: TreatmentGroup[] = [
  {
    id: "sguardo",
    title: { it: "Sguardo", en: "Eyes" },
    treatments: [
      { id: "colorazione-modellamento", name: { it: "Colorazione e modellamento sopracciglia", en: "Brow tint & shaping" }, price: eur(30) },
      { id: "laminazione", name: { it: "Laminazione ciglia o sopracciglia con cheratina", en: "Lash or brow lamination with keratin" }, price: eur(60) },
    ],
  },
  {
    id: "make-up",
    title: { it: "Make Up", en: "Make-up" },
    treatments: [
      { id: "trucco", name: { it: "Trucco", en: "Make-up" }, price: eurFrom(35) },
      { id: "trucco-sposa", name: { it: "Trucco sposa con prove", en: "Bridal make-up with trials" }, price: eurFrom(130) },
    ],
  },
];

// ── SPA ──────────────────────────────────────────────────────────────────────

const INCLUSION_TISANA: Bilingual = { it: "Tisana", en: "Herbal tea" };
const INCLUSION_RELAX: Bilingual = { it: "Area relax", en: "Relax area" };

export const ritualiCategory: SpaCategory = {
  note: {
    intro: { it: "In ogni rituale, per te", en: "In every ritual, for you" },
    items: [INCLUSION_TISANA, INCLUSION_RELAX],
  },
  featured: {
    id: "mille-e-una-notte",
    name: { it: "Le Mille e Una Notte", en: "One Thousand and One Nights" },
    duration: { it: "1h e 50min", en: "1h 50min" },
    price: eur(159),
    short: {
      it: "Tessuti preziosi e fragranze avvolgenti in cui il corpo diventa perfezione.",
      en: "Sumptuous fabrics and enveloping fragrances in which the body becomes perfection.",
    },
    description: {
      it: "Rituale in cui tessuti e fragranze deliziosi evocano un mondo meraviglioso nel quale il corpo diventa perfezione. Per idratare, nutrire e rilassare, eliminare le cellule morte ed ossigenare la pelle.",
      en: "A ritual where sumptuous fabrics and delightful fragrances evoke a wondrous world in which the body becomes perfection. To hydrate, nourish and relax, remove dead cells and oxygenate the skin.",
    },
    tags: ["nutriente", "sensoriale", "purificante"],
  },
  groups: [
    {
      id: "rituali-viaggi",
      title: { it: "Viaggi sensoriali", en: "Sensory journeys" },
      subtitle: {
        it: "Rituali brevi ispirati a destinazioni lontane.",
        en: "Short rituals inspired by distant destinations.",
      },
      treatments: [
        {
          id: "dolcezza-orientale",
          name: { it: "Dolcezza Orientale", en: "Oriental Sweetness" },
          duration: { it: "25min", en: "25 min" },
          price: eur(58),
          short: {
            it: "Un letto morbido scaldato dal sole e i profumi dei campi di primavera.",
            en: "A soft bed warmed by the sun and the scents of spring fields.",
          },
          description: {
            it: "Rituale che conduce ad un magnifico e soffice letto scaldato dal sole e deliziato dai profumi dei campi di primavera.",
            en: "A ritual that leads to a magnificent, soft bed warmed by the sun and scented with the fragrances of spring fields.",
          },
          tags: ["nutriente", "sensoriale"],
        },
        {
          id: "rio-de-janeiro",
          name: { it: "Viaggio a Rio de Janeiro", en: "Journey to Rio de Janeiro" },
          duration: { it: "1h", en: "1h" },
          price: eur(70),
          short: {
            it: "Ritmo, energia e calore verso le spiagge brasiliane.",
            en: "Rhythm, energy and warmth towards Brazilian shores.",
          },
          tags: ["sensoriale", "tonificante"],
        },
        {
          id: "cancun",
          name: { it: "Viaggio a Cancun", en: "Journey to Cancun" },
          duration: { it: "1h", en: "1h" },
          price: eur(70),
          short: {
            it: "Brezza caraibica e profumi tropicali per una fuga luminosa.",
            en: "Caribbean breeze and tropical scents for a bright escape.",
          },
          tags: ["sensoriale"],
        },
        {
          id: "bali",
          name: { it: "Viaggio a Bali", en: "Journey to Bali" },
          duration: { it: "1h e 30min", en: "1h 30min" },
          price: eur(90),
          short: {
            it: "Gesti lenti e aromi d'Oriente per ritrovare l'equilibrio.",
            en: "Slow gestures and oriental aromas to rediscover balance.",
          },
          tags: ["relax", "sensoriale"],
        },
        {
          id: "marrakech",
          name: { it: "Viaggio a Marrakech", en: "Journey to Marrakech" },
          duration: { it: "1h e 30min", en: "1h 30min" },
          price: eur(90),
          short: {
            it: "Spezie, argan e atmosfere del deserto in un rituale avvolgente.",
            en: "Spices, argan and desert atmospheres in an enveloping ritual.",
          },
          tags: ["sensoriale", "nutriente"],
        },
      ],
    },
    {
      id: "rituali-purificanti",
      title: { it: "Rituali purificanti", en: "Purifying rituals" },
      subtitle: {
        it: "La tradizione del sapone nero per una pelle che respira.",
        en: "The black-soap tradition for skin that breathes again.",
      },
      treatments: [
        {
          id: "savonage",
          name: { it: "Savonage Profumato", en: "Scented Savonage" },
          duration: { it: "1h", en: "1h" },
          price: eur(95),
          short: {
            it: "Pulizia berbera al sapone per una pelle morbida e profumata.",
            en: "A Berber soap cleansing for soft, fragrant skin.",
          },
          description: {
            it: "Rituale di pulizia con il sapone, tipico della tradizione berbera, che dona un corpo morbido e profumato. Per eliminare le cellule morte, purificare i pori della pelle, stimolare la circolazione sanguigna, ossigenare la pelle e prepararla alla depilazione.",
            en: "A cleansing ritual with soap, typical of Berber tradition, leaving the body soft and fragrant. To remove dead cells, purify skin pores, stimulate blood circulation, oxygenate the skin and prepare it for hair removal.",
          },
          tags: ["purificante", "detox"],
        },
        {
          id: "hammam",
          name: { it: "Hammam", en: "Hammam" },
          duration: { it: "1h", en: "1h" },
          price: eur(95),
          short: {
            it: "Il rituale della purificazione con sapone nero esfoliante.",
            en: "The purification ritual with exfoliating black soap.",
          },
          description: {
            it: "Rituale della purificazione dove il sapone nero esfoliante diventa protagonista, eliminando cellule morte ed impurità per far respirare nuovamente il corpo e vivere un'incredibile e profonda sensazione di leggerezza e benessere. Per eliminare le cellule morte, purificare i pori della pelle, stimolare la circolazione sanguigna, ossigenare la pelle e prepararla alla depilazione.",
            en: "A purification ritual where exfoliating black soap takes centre stage, removing dead cells and impurities so the body can breathe again and experience a profound sense of lightness and wellbeing. To remove dead cells, purify skin pores, stimulate blood circulation, oxygenate the skin and prepare it for hair removal.",
          },
          tags: ["purificante", "detox"],
        },
        {
          id: "hammam-cuoio",
          name: { it: "Hammam con cuoio capelluto", en: "Hammam with scalp" },
          duration: { it: "1h e 20min", en: "1h 20min" },
          price: eur(115),
          short: {
            it: "L'hammam classico arricchito dalla cura del cuoio capelluto.",
            en: "The classic hammam enriched with scalp care.",
          },
          tags: ["purificante", "relax"],
        },
      ],
    },
    {
      id: "rituali-orientali",
      title: { it: "Rituali orientali", en: "Oriental rituals" },
      subtitle: {
        it: "Oud, ambra e spezie per un viaggio lontano.",
        en: "Oud, amber and spices for a distant journey.",
      },
      treatments: [
        {
          id: "oud",
          name: { it: "Oud", en: "Oud" },
          duration: { it: "1h", en: "1h" },
          price: eur(100),
          short: {
            it: "Una nuvola orientale dolce e speziata che profuma di Marocco.",
            en: "A sweet, spicy oriental cloud that smells of Morocco.",
          },
          description: {
            it: "Rituale caratterizzato da una nuvola orientale accattivante ed un profumo innovativo, dolce e speziato, che fa volare nei piccoli paesi del Marocco, dove la magia invade la mente e dona spensieratezza. Per idratare, nutrire e rilassare, eliminare le cellule morte ed ossigenare la pelle.",
            en: "A ritual characterised by an enchanting oriental atmosphere and an innovative, sweet and spicy fragrance that transports you to the small villages of Morocco, where magic fills the mind and brings lightness. To hydrate, nourish and relax, remove dead cells and oxygenate the skin.",
          },
          tags: ["sensoriale", "nutriente"],
        },
        {
          id: "oud-ambra",
          name: { it: "Oud e Ambra", en: "Oud & Amber" },
          duration: { it: "1h e 20min", en: "1h 20min" },
          price: eur(215),
          short: {
            it: "Oud energico e ambra imperiale per un viaggio indimenticabile.",
            en: "Bold oud and imperial amber for an unforgettable journey.",
          },
          description: {
            it: "Rituale che abbina un nuovo profumo orientale, energico e deciso, all'ambra imperiale, per un viaggio sensoriale indimenticabile. Per idratare, nutrire e rilassare, eliminare le cellule morte e donare un tocco antietà al viso.",
            en: "A ritual pairing a new oriental fragrance, energetic and bold, with imperial amber for an unforgettable sensory journey. To hydrate, nourish and relax, remove dead cells and give an anti-ageing touch to the face.",
          },
          tags: ["sensoriale", "nutriente"],
        },
        {
          id: "cannella-arancia",
          name: { it: "Speziato Cannella e Arancia", en: "Spiced Cinnamon & Orange" },
          duration: { it: "1h e 25min", en: "1h 25min" },
          price: eur(170),
          short: {
            it: "Fiori d'arancio e cannella in un giardino illuminato dal sole.",
            en: "Orange blossom and cinnamon in a sunlit garden.",
          },
          description: {
            it: "Rituale dalle proprietà stimolanti e tonificanti, dove il profumo dei deliziosi fiori d'arancio e delle cannella conducono ad un magnifico giardino illuminato dal sole. Per eliminare le cellule morte e le impurità, tonificare e stimolare la pelle, nutrire e rilassare.",
            en: "A stimulating and toning ritual where the scent of orange blossom and cinnamon leads to a magnificent sunlit garden. To remove dead cells and impurities, tone and stimulate the skin, nourish and relax.",
          },
          tags: ["tonificante", "nutriente"],
        },
        {
          id: "prezioso-oud",
          name: { it: "Prezioso all'Oud", en: "Precious Oud" },
          duration: { it: "1h e 35min", en: "1h 35min" },
          price: eur(181),
          short: {
            it: "Karité e argan per nutrire la pelle e inebriare l'anima.",
            en: "Shea and argan to nourish the skin and intoxicate the soul.",
          },
          description: {
            it: "Per viaggiare in luoghi lontani e inebriare l'anima, nutrendo la pelle con il burro di karitè e l'argan e rendervi ancora più affascinanti. Per eliminare le cellule morte e le impurità, nutrire e riparare la pelle.",
            en: "To travel to distant places and intoxicate the soul, nourishing the skin with shea and argan butter and making you even more captivating. To remove dead cells and impurities, nourish and repair the skin.",
          },
          tags: ["nutriente", "sensoriale"],
        },
      ],
    },
    {
      id: "rituali-nutrienti",
      title: { it: "Rituali nutrienti e avvolgenti", en: "Nourishing & enveloping rituals" },
      subtitle: {
        it: "Calore, burri preziosi e profumi golosi per coccolare la pelle.",
        en: "Warmth, precious butters and indulgent scents to pamper the skin.",
      },
      treatments: [
        {
          id: "seta-sahara",
          name: { it: "La Seta del Sahara", en: "The Silk of the Sahara" },
          duration: { it: "1h", en: "1h" },
          price: eur(101),
          short: {
            it: "Pelle fine e setosa come la sabbia che scorre tra le dita.",
            en: "Skin as fine and silky as sand flowing between your fingers.",
          },
          description: {
            it: "Rituale che rende la pelle fine e setosa come la sabbia che scorre tra le dita. Varie profumazioni evocheranno emozioni e ricordi e renderanno questa esperienza indimenticabile. Per un risultato addolcente, setificante e nutriente.",
            en: "A ritual that leaves the skin fine and silky, like sand flowing between your fingers. Various fragrances evoke emotions and memories, making this experience unforgettable. For a softening, silkifying and nourishing result.",
          },
          tags: ["nutriente", "sensoriale"],
        },
        {
          id: "vichy",
          name: { it: "Vichy", en: "Vichy" },
          duration: { it: "30min", en: "30 min" },
          price: eur(140),
          short: {
            it: "Una calda pioggia, burro di karité e quattro mani avvolgenti.",
            en: "Warm rainfall, shea butter and four enveloping hands.",
          },
          description: {
            it: "Altamente rilassante e unico nel suo genere, grazie all'azione di una calda pioggia che, scendendo, si sposa al burro nutriente di karité ed incontra quattro mani avvolgenti che massaggiano tutto il corpo.",
            en: "Highly relaxing and unique, thanks to warm rainfall that blends with nourishing shea butter while four enveloping hands massage the entire body.",
          },
          tags: ["relax", "nutriente"],
        },
        {
          id: "cioccolato-zenzero",
          name: { it: "Cioccolato e Zenzero", en: "Chocolate & Ginger" },
          duration: { it: "1h e 40min", en: "1h 40min" },
          price: eur(159),
          short: {
            it: "La dolcezza del cacao e il calore dello zenzero in un abbraccio goloso.",
            en: "The sweetness of cocoa and the warmth of ginger in an indulgent embrace.",
          },
          tags: ["nutriente", "sensoriale"],
        },
        {
          id: "arancia-miele",
          name: { it: "Dolce Arancia e Miele", en: "Sweet Orange & Honey" },
          duration: { it: "1h e 25min", en: "1h 25min" },
          price: eur(181),
          short: {
            it: "Miele prezioso e arancia energizzante per un piacere senza tempo.",
            en: "Precious honey and energising orange for a timeless pleasure.",
          },
          description: {
            it: "Rituale che va oltre la coccola e fa vivere il fascino di un incantesimo dove il miele, dolce e prezioso nettare, e l'arancio, energizzante e tonificante, avvolgeranno tutto il corpo per un piacere senza tempo. Per eliminare le cellule morte e le impurità, nutrire e riparare la pelle, tonificare e stimolare.",
            en: "A ritual that goes beyond pampering and evokes the charm of a spell where honey, a sweet and precious nectar, and orange, energising and toning, envelop the whole body in timeless pleasure. To remove dead cells and impurities, nourish and repair the skin, tone and stimulate.",
          },
          tags: ["nutriente", "tonificante"],
        },
        {
          id: "delizia-oriente",
          name: { it: "Delizia d'Oriente", en: "Delight of the Orient" },
          duration: { it: "1h e 35min", en: "1h 35min" },
          price: eur(162),
          short: {
            it: "Rilassamento profondo per una pelle nuova, morbida come quella di un bambino.",
            en: "Deep relaxation for new skin, as soft as a child's.",
          },
          description: {
            it: "Rituale di rilassamento profondo dove, avvolti da delizione e morbide fragranze, si può provare la sensazione di avere la pelle di un bambino e sentirsi meravigliosi. Per eliminare le cellule morte, purificare i pori della pelle e prevenirne l'invecchiamento, rilassare, nutrire e idratare.",
            en: "A deep relaxation ritual where, wrapped in delight and soft fragrances, you can feel as if your skin were a child's again and feel wonderful. To remove dead cells, purify skin pores and prevent ageing, relax, nourish and hydrate.",
          },
          tags: ["relax", "nutriente"],
        },
        {
          id: "prezioso-ambra",
          name: { it: "Prezioso all'Ambra", en: "Precious Amber" },
          duration: { it: "1h e 30min", en: "1h 30min" },
          price: eur(190),
          short: {
            it: "Un palazzo orientale di ambra e spezie per una pelle di seta.",
            en: "An oriental palace of amber and spices for silk-like skin.",
          },
          description: {
            it: "Rituale meraviglioso che porta in viaggio verso un lussuoso palazzo orientale, fitto di misteriosi e inebrianti profumi di ambra e spezie, alla scoperta di una pelle di seta e silhouette tutte da scoprire. Per eliminare le cellule morte e le impurità, rimineralizzare, nutrire, ammorbidire e tonificare la pelle, eliminando stress e tensioni.",
            en: "A wonderful ritual that takes you on a journey to a luxurious oriental palace, filled with mysterious and intoxicating scents of amber and spices, discovering silk-like skin and a silhouette to be revealed. To remove dead cells and impurities, remineralise, nourish, soften and tone the skin, relieving stress and tension.",
          },
          tags: ["nutriente", "sensoriale"],
        },
      ],
    },
  ],
};

export const massaggiSuiteCategory: SpaCategory = {
  note: {
    intro: { it: "In ogni massaggio, per te", en: "In every massage, for you" },
    items: [INCLUSION_TISANA, INCLUSION_RELAX],
  },
  featured: {
    id: "lomi-lomi",
    name: { it: "Hawaiano Lomi Lomi Nui", en: "Hawaiian Lomi Lomi Nui" },
    duration: { it: "1h", en: "1h" },
    price: eur(90),
    short: {
      it: "L'antico massaggio polinesiano per un benessere assoluto e un senso di rinnovamento.",
      en: "The ancient Polynesian massage for absolute wellbeing and a sense of renewal.",
    },
    description: {
      it: "Rituale antico con massaggio polinesiano in grado di regalare benessere quasi assoluto e una fantastica sensazione di rinnovamento.",
      en: "An ancient ritual with Polynesian massage able to deliver near-absolute wellbeing and a wonderful sense of renewal.",
    },
    tags: ["relax", "sensoriale"],
  },
  groups: [
    {
      id: "suite-avvolgenti",
      title: { it: "Massaggi avvolgenti", en: "Enveloping massages" },
      subtitle: {
        it: "Burri e profumi che coccolano la pelle nel calore.",
        en: "Butters and scents that pamper the skin in warmth.",
      },
      treatments: [
        {
          id: "goloso",
          name: { it: "Goloso", en: "Goloso" },
          duration: { it: "1h", en: "1h" },
          price: eur(90),
          short: {
            it: "Profumi golosi che addolciscono delicatamente tutto il corpo.",
            en: "Indulgent fragrances that gently soften the whole body.",
          },
          description: {
            it: "Rituale rilassante e distensivo con profumi golosi che addolciscono delicatamente tutto il corpo. Per idratare, nutrire, rilassare.",
            en: "A relaxing and unwinding ritual with indulgent fragrances that gently soften the whole body. To hydrate, nourish and relax.",
          },
          tags: ["nutriente", "relax"],
        },
        {
          id: "candle",
          name: { it: "Candle Massage", en: "Candle Massage" },
          duration: { it: "1h", en: "1h" },
          price: eur(90),
          short: {
            it: "Burro di karité 100% e il calore avvolgente della candela.",
            en: "100% shea butter and the enveloping warmth of the candle.",
          },
          description: {
            it: "Rituale con burro di karitè al 100% per una piacevole sensazione di protezione e di avvolgente calore donato dalla candela.",
            en: "A ritual with 100% shea butter for a pleasant feeling of protection and enveloping warmth from the candle.",
          },
          tags: ["nutriente", "relax"],
        },
        {
          id: "bioemozionale",
          name: { it: "Bioemozionale", en: "Bioemotional" },
          duration: { it: "1h", en: "1h" },
          price: eur(90),
          short: {
            it: "Riscopri il piacere del tocco e il tuo sé corporeo.",
            en: "Rediscover the pleasure of touch and your bodily self.",
          },
          description: {
            it: "Per scoprire il piacere del trattamento e riscoprire, attraverso esso, il proprio sé corporeo.",
            en: "To discover the pleasure of the treatment and rediscover, through it, your own bodily self.",
          },
          tags: ["relax", "sensoriale"],
        },
      ],
    },
  ],
};

export const coppiaCategory: SpaCategory = {
  note: {
    intro: { it: "In ogni esperienza, per te", en: "In every experience, for you" },
    items: [INCLUSION_TISANA, INCLUSION_RELAX],
  },
  featured: {
    id: "dolcezza-coppia",
    name: { it: "Rituale Dolcezza Orientale di coppia", en: "Oriental Sweetness ritual for two" },
    duration: { it: "25min", en: "25 min" },
    price: eur(116),
    short: {
      it: "Il rituale Dolcezza Orientale vissuto insieme, nello stesso respiro.",
      en: "The Oriental Sweetness ritual experienced together, in the same breath.",
    },
    description: {
      it: "Il nostro rituale più amato, vissuto in due: un letto morbido scaldato dal sole, profumi dei campi di primavera e gesti lenti che avvolgono entrambi nello stesso momento di abbandono.",
      en: "Our most beloved ritual, shared by two: a soft bed warmed by the sun, the scents of spring fields and slow gestures that wrap you both in the same moment of surrender.",
    },
    tags: ["coppia", "sensoriale", "nutriente"],
  },
  groups: [
    {
      id: "coppia-massaggi",
      title: { it: "Massaggi per due", en: "Massages for two" },
      subtitle: {
        it: "Fianco a fianco, nello stesso profumo e nello stesso tempo.",
        en: "Side by side, in the same scent and the same time.",
      },
      treatments: [
        {
          id: "morjana",
          name: { it: "Massaggio aromatico Morjana", en: "Morjana aromatic massage" },
          duration: { it: "55min", en: "55 min" },
          price: eur(150),
          short: {
            it: "Un massaggio aromatico per due, tra oli caldi e profumi d'Oriente.",
            en: "An aromatic massage for two, among warm oils and oriental scents.",
          },
          tags: ["coppia", "relax"],
        },
        {
          id: "candle-coppia",
          name: { it: "Candle massage", en: "Candle massage" },
          duration: { it: "55min", en: "55 min" },
          price: eur(170),
          short: {
            it: "La candela di karité che si scioglie in un calore condiviso.",
            en: "The shea candle melting into a shared warmth.",
          },
          tags: ["coppia", "nutriente"],
        },
        {
          id: "aromatico-schiena",
          name: { it: "Massaggio aromatico alla schiena", en: "Aromatic back massage" },
          duration: { it: "40min", en: "40 min" },
          price: eur(105),
          short: {
            it: "Un massaggio alla schiena fianco a fianco, per sciogliere ogni tensione.",
            en: "A side-by-side back massage to release every tension.",
          },
          tags: ["coppia", "relax"],
        },
      ],
    },
  ],
};

export const percorsiCategory: SpaCategory = {
  note: {
    intro: { it: "In ogni percorso, per te", en: "In every journey, for you" },
    items: [
      { it: "Accappatoio", en: "Bathrobe" },
      { it: "Ciabattine", en: "Slippers" },
      INCLUSION_TISANA,
      INCLUSION_RELAX,
    ],
  },
  featured: {
    id: "termale-romano",
    name: { it: "Termale Romano", en: "Roman Thermal" },
    duration: { it: "65min", en: "65 min" },
    temperature: { it: "43°", en: "43°C" },
    price: eur(100),
    priceTiers: [
      { label: TIER_SINGLE, price: eur(100) },
      { label: TIER_COUPLE, price: eurCouple(110) },
      { label: TIER_3_6, price: eurPerson(50) },
    ],
    short: {
      it: "Quattro fasi di calore e umidità: il percorso completo della purificazione.",
      en: "Four phases of heat and humidity: the complete purification journey.",
    },
    description: {
      it: "Suddiviso in quattro fasi a diverse temperatura e umidità. Indicato per la purificazione, è suggerito per gli amanti del relax e per chi si avvicina alla sauna e al bagno turco per la prima volta.",
      en: "Divided into four phases at different temperatures and humidity levels. Recommended for purification, ideal for relaxation lovers and those new to sauna and Turkish bath.",
    },
    tags: ["purificante", "relax"],
  },
  groups: [
    {
      id: "percorsi-base",
      title: { it: "Percorsi termali", en: "Thermal journeys" },
      subtitle: {
        it: "Sauna, vapore e calore da vivere singolarmente o in sequenza.",
        en: "Sauna, steam and heat to enjoy individually or in sequence.",
      },
      treatments: [
        {
          id: "hammam-purificazione",
          name: { it: "Hammam \"Purificazione\"", en: "Purifying Hammam" },
          duration: { it: "30min", en: "30 min" },
          temperature: { it: "43°", en: "43°C" },
          price: eur(100),
          priceTiers: [
            { label: TIER_SINGLE, price: eur(100) },
            { label: TIER_COUPLE, price: eurCouple(150) },
            { label: TIER_3_6, price: eurPerson(50) },
          ],
          short: {
            it: "Vapori a diverse temperature per purificare e detergere il corpo.",
            en: "Vapours at various temperatures to purify and cleanse the body.",
          },
          description: {
            it: "Antico rituale di purificazione e di detersione del corpo, attraverso i vapori di varie temperature che liberano dolcemente gocce di sudore dal corpo.",
            en: "An ancient purification and body cleansing ritual, through vapours at various temperatures that gently release beads of sweat from the body.",
          },
          tags: ["purificante", "detox"],
        },
        {
          id: "sauna",
          name: { it: "Sauna", en: "Sauna" },
          temperature: { it: "70° max", en: "70°C max" },
          price: eur(50),
          sessionModes: [
            {
              label: { it: "In gruppo", en: "In a group" },
              duration: { it: "15 min", en: "15 min" },
              note: { it: "Senza operatore", en: "Without therapist" },
            },
            {
              label: { it: "Da soli", en: "Alone" },
              duration: { it: "40 min", en: "40 min" },
              note: {
                it: "Con operatore · potenziamento detox",
                en: "With therapist · detox enhancement",
              },
            },
          ],
          priceTiers: [
            { label: TIER_SINGLE, price: eur(50) },
            { label: TIER_2_4, price: eurPerson(45) },
            { label: TIER_5_6, price: eurPerson(40) },
          ],
          short: {
            it: "Sudorazione profonda e rilassamento muscolare nel calore secco.",
            en: "Deep sweating and muscle relaxation in dry heat.",
          },
          description: {
            it: "Favorisce un'abbondante sudorazione con evidenti risultati di rilassamento sulla muscolatura. In caso si effettui la sauna da soli verrà abbinato un potenziamento detox.",
            en: "Promotes abundant sweating with evident muscle relaxation results. When taken alone, a detox enhancement is included.",
          },
          tags: ["detox", "relax"],
        },
        {
          id: "biosauna",
          name: { it: "Bio Sauna", en: "Bio Sauna" },
          temperature: { it: "50° max", en: "50°C max" },
          price: eur(50),
          sessionModes: [
            {
              label: { it: "In gruppo", en: "In a group" },
              duration: { it: "15 min", en: "15 min" },
              note: { it: "Senza operatore", en: "Without therapist" },
            },
            {
              label: { it: "Da soli", en: "Alone" },
              duration: { it: "40 min", en: "40 min" },
              note: {
                it: "Con operatore · potenziamento detox",
                en: "With therapist · detox enhancement",
              },
            },
          ],
          priceTiers: [
            { label: TIER_SINGLE, price: eur(50) },
            { label: TIER_DETOX_BIO, price: eur(110) },
            { label: TIER_2_4, price: eurPerson(45) },
            { label: TIER_5_6, price: eurPerson(40) },
          ],
          short: {
            it: "Il calore della sauna a temperature più basse e avvolgenti.",
            en: "The warmth of the sauna at lower, more enveloping temperatures.",
          },
          description: {
            it: "Favorisce un'abbondante sudorazione con evidenti risultati di rilassamento sulla muscolatura, a temperature più basse rispetto alla sauna tradizionale. In caso si effettui la bio sauna da soli verrà abbinato un potenziamento detox.",
            en: "Promotes abundant sweating with evident muscle relaxation results, at lower temperatures than traditional sauna. When taken alone, a detox enhancement is included.",
          },
          tags: ["relax", "detox"],
        },
        {
          id: "bagno-turco",
          name: { it: "Bagno turco", en: "Turkish bath" },
          temperature: { it: "46°", en: "46°C" },
          price: eur(50),
          sessionModes: [
            {
              label: { it: "In gruppo", en: "In a group" },
              duration: { it: "20 min", en: "20 min" },
              note: { it: "Senza operatore", en: "Without therapist" },
            },
            {
              label: { it: "Da soli", en: "Alone" },
              duration: { it: "55 min", en: "55 min" },
              note: {
                it: "Con operatore · potenziamento rilassante",
                en: "With therapist · relaxing enhancement",
              },
            },
          ],
          priceTiers: [
            { label: TIER_SINGLE, price: eur(50) },
            { label: TIER_DETOX, price: eur(110) },
            { label: TIER_2_4, price: eurPerson(45) },
            { label: TIER_5_6, price: eurPerson(40) },
          ],
          short: {
            it: "Vapore caldo per eliminare tossine e sciogliere le tensioni.",
            en: "Warm steam to eliminate toxins and melt away tension.",
          },
          description: {
            it: "Bagno di vapore che permette la sudorazione e l'eliminazione di acqua e sostanze tossiche, con benefici sulla muscolatura per un evidente sensazione di relax. In caso si effettui il bagno turco da soli verrà abbinato un potenziamento rilassante.",
            en: "A steam bath that allows sweating and the elimination of water and toxins, with benefits for the muscles and a clear sense of relaxation. When taken alone, a relaxing enhancement is included.",
          },
          tags: ["detox", "purificante"],
        },
        {
          id: "banja-russa",
          name: { it: "Banja russa", en: "Russian Banja" },
          duration: { it: "30min", en: "30 min" },
          temperature: { it: "70° max", en: "70°C max" },
          price: eur(50),
          priceTiers: [
            { label: TIER_SINGLE, price: eur(50) },
            { label: TIER_2_4, price: eurPerson(45) },
            { label: TIER_5_6, price: eurPerson(40) },
          ],
          short: {
            it: "Bagno di vapore ad alta temperatura con umidità bilanciata.",
            en: "High-temperature steam bath with balanced humidity.",
          },
          description: {
            it: "Tradizione russa del vapore ad alta temperatura: stimola una profonda sudorazione, favorisce l'eliminazione delle tossine e scioglie le tensioni muscolari con un intenso senso di rigenerazione.",
            en: "The Russian steam tradition at high temperature: it stimulates deep sweating, helps eliminate toxins and releases muscle tension with an intense sense of renewal.",
          },
          tags: ["detox", "purificante"],
        },
        {
          id: "sauna-romana",
          name: { it: "Sauna romana", en: "Roman Sauna" },
          duration: { it: "30min", en: "30 min" },
          temperature: { it: "48° max", en: "48°C max" },
          price: eur(50),
          priceTiers: [
            { label: TIER_SINGLE, price: eur(50) },
            { label: TIER_2_4, price: eurPerson(45) },
            { label: TIER_5_6, price: eurPerson(40) },
          ],
          short: {
            it: "Umidità e caldo secco insieme, per un'intensa percezione di calore.",
            en: "Humidity and dry heat together, for an intense sensation of warmth.",
          },
          description: {
            it: "Ottimo trattamento che coniuga la consistente umidità al caldo secco, per un'intensa sudorazione ed elevata percezione di calore.",
            en: "An excellent treatment combining substantial humidity with dry heat, for intense sweating and a strong sensation of warmth.",
          },
          tags: ["detox", "relax"],
        },
      ],
    },
    {
      id: "percorsi-pacchetti",
      title: { it: "Pacchetti con massaggio", en: "Packages with massage" },
      subtitle: {
        it: "Il percorso termale seguito da un massaggio dedicato.",
        en: "The thermal journey followed by a dedicated massage.",
      },
      treatments: [
        {
          id: "pacchetto-rilassante",
          name: { it: "Percorso + massaggio rilassante", en: "Journey + relaxing massage" },
          price: eur(130),
          short: {
            it: "Il percorso termale seguito da un massaggio rilassante.",
            en: "The thermal journey followed by a relaxing massage.",
          },
          tags: ["relax"],
        },
        {
          id: "pacchetto-schiena",
          name: { it: "Percorso + massaggio schiena", en: "Journey + back massage" },
          price: eur(110),
          short: {
            it: "Il percorso termale con un massaggio mirato alla schiena.",
            en: "The thermal journey with a targeted back massage.",
          },
          tags: ["relax"],
        },
      ],
    },
  ],
};
