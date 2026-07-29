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
  /**
   * Advanced eubiotic protocol treatments: no direct book/gift —
   * show an info popup instead.
   */
  requiresProtocol?: boolean;
};

export type TreatmentGroup = {
  id: string;
  title: Bilingual;
  /** Optional short intro line under the section title. */
  subtitle?: Bilingual;
  /** When true, the group title is not rendered (e.g. it duplicates the page H1). */
  hideTitle?: boolean;
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
    hideTitle: true,
    treatments: [
      { id: "pulizia-viso", name: { it: "Pulizia del viso", en: "Facial cleansing" }, duration: DUR_60, price: eur(58) },
      {
        id: "trattamento-personalizzato",
        name: { it: "Trattamento personalizzato", en: "Tailored treatment" },
        duration: DUR_60,
        price: eurFrom(63),
        description: {
          it: "Un trattamento viso costruito su misura, studiato sui bisogni specifici della tua pelle nel momento presente.",
          en: "A made-to-measure facial treatment, designed around the specific needs of your skin in the present moment.",
        },
      },
      {
        id: "ristrutturazione",
        name: { it: "Ristrutturazione della barriera di permeabilità", en: "Permeability barrier restructuring" },
        duration: DUR_60,
        price: eur(88),
        requiresProtocol: true,
        description: {
          it: "Ristabilisce la compattezza dello strato corneo e ne sostiene le funzioni naturali, rinforzando il Fattore di Idratazione Naturale. Ideale per una pelle più forte e protetta.",
          en: "Restores the compactness of the stratum corneum and supports its natural functions, strengthening the Natural Moisturising Factor. Ideal for stronger, more protected skin.",
        },
      },
      {
        id: "talaterm-fangogel",
        name: { it: "Depurazione con Talaterm Fangogel", en: "Purifying Talaterm Mud-gel" },
        duration: DUR_60,
        price: eur(73),
        description: {
            it: "Azione depurante e osmotica per le pelli intossicate, disidratate o segnate dalle prime rughe. Riequilibra il tono cutaneo, dona minerali e oligoelementi e lascia la pelle drenata e luminosa.",
            en: "Purifying, osmotic action for intoxicated, dehydrated skin or skin marked by the first wrinkles. It rebalances skin tone, provides minerals and trace elements and leaves the skin drained and radiant.",
          },
        requiresProtocol: true,
      },
      {
        id: "talaterm-antirughe",
        name: { it: "Talaterm decontratturante antirughe", en: "Talaterm anti-wrinkle relaxing" },
        duration: DUR_60,
        price: eur(83),
        requiresProtocol: true,
        description: {
          it: "Consiste nell'applicazione di tre tipi di fanghi di derivazione marina — caldo, freddo ed equilibrante — distribuiti in aree ben distinte per attivare il lavoro dei muscoli facciali e riattivare la circolazione sanguigna. Una ginnastica passiva che restituisce un viso disteso, ossigenato e turgido.",
          en: "It consists in applying three types of marine-derived muds — hot, cold and balancing — across distinct areas to activate the facial muscles and reactivate blood circulation. A passive gymnastics that leaves the face relaxed, oxygenated and plump.",
        },
      },
      {
        id: "sinerplus",
        name: { it: "Sinerplus", en: "Sinerplus" },
        duration: DUR_60,
        price: eur(88),
        description: {
            it: "Deposita nella pelle principi attivi che vengono rilasciati nei giorni successivi, ogni volta che la pelle ne ha bisogno. Un trattamento che continua ad agire nel tempo, compensando squilibri temporanei o costituzionali.",
            en: "It deposits active ingredients in the skin that are released in the following days, whenever the skin needs them. A treatment that keeps working over time, balancing temporary or constitutional imbalances.",
          },
        requiresProtocol: true,
      },
    ],
  },
];

export const corpoGroups: TreatmentGroup[] = [
  {
    id: "corpo-completi",
    title: { it: "Trattamenti completi", en: "Full body treatments" },
    treatments: [
      {
        id: "pulizia-profonda-corpo",
        name: { it: "Pulizia profonda corpo", en: "Deep body cleansing" },
        duration: DUR_55,
        price: eur(70),
        description: {
          it: "Eseguita in maniera unica nel suo genere, con un olio idrofilo che pulisce in profondità senza mai impoverire la pelle.",
          en: "Performed in a uniquely distinctive way, with a hydrophilic oil that cleanses deeply without ever depleting the skin.",
        },
      },
      {
        id: "pulizia-profonda-biosauna",
        name: { it: "Pulizia profonda in biosauna", en: "Deep cleansing in biosauna" },
        duration: DUR_60,
        price: eur(95),
        description: {
          it: "La pulizia del corpo potenziata da un ambiente riscaldato, con la stufa a 40 gradi.",
          en: "Body cleansing enhanced by a warmed environment, with the stove at 40 degrees.",
        },
      },
      { id: "talaterm-fango-depurativo", name: { it: "Depurazione con Talaterm Fangogel", en: "Purifying Talaterm Mud-gel" }, duration: DUR_60, price: eurFrom(80), description: {
            it: "Un trattamento depurante che riattiva lo scambio dei fluidi nelle pelli spente o disidratate. Minerali e oligoelementi restituiscono alla pelle tono, luminosità ed elasticità.",
            en: "A purifying treatment that reactivates fluid exchange in dull or dehydrated skin. Minerals and trace elements restore tone, radiance and elasticity.",
      } },
      {
        id: "talaterm-caldo-freddo",
        name: { it: "Talaterm fango gel caldo / freddo", en: "Talaterm hot / cold mud-gel" },
        duration: DUR_75,
        price: eur(105),
        requiresProtocol: true,
        description: {
          it: "Trattamento eseguito con fanghi che riscaldano e raffreddano, creando una vera ginnastica vasale, seguito da un bendaggio modellante dai risultati sorprendenti sul corpo.",
          en: "A treatment with muds that heat and cool, creating true vascular gymnastics, followed by a sculpting wrap with surprising results on the body.",
        },
      },
      { id: "ristrutturazione-barriera", name: { it: "Ristrutturazione della barriera di permeabilità", en: "Permeability barrier restructuring" }, duration: DUR_60, price: eur(110), requiresProtocol: true, description: {
            it: "Ripristina la compattezza dello strato più superficiale della pelle, sostenendone le funzioni naturali. Rinforza il Fattore di Idratazione Naturale (NMF) per una pelle più protetta ed equilibrata nel tempo.",
            en: "Restores the compactness of the skin's outermost layer and supports its natural functions. Strengthens the Natural Moisturising Factor (NMF) for skin that stays more protected and balanced over time.",
      } },
      { id: "talaplus", name: { it: "Talaplus — Trattamento eubiotico riducente", en: "Talaplus — Reducing eubiotic treatment" }, duration: DUR_75, price: eur(130), requiresProtocol: true, description: {
            it: "Un trattamento modellante e drenante che agisce sulle adiposità localizzate e sugli inestetismi della cellulite, mentre idrata e tonifica. Rimodella la silhouette con azione mirata.",
            en: "A sculpting, draining treatment that targets localised adiposity and cellulite while hydrating and toning. It reshapes the silhouette with focused action.",
      } },
      { id: "body-reset", name: { it: "Body Reset — Trattamento eubiotico rassodante", en: "Body Reset — Firming eubiotic treatment" }, duration: DUR_75, price: eur(140), requiresProtocol: true, description: {
            it: "Pensato per rassodare e tonificare, ridona compattezza alle zone più delicate e restituisce alla pelle il suo naturale turgore.",
            en: "Designed to firm and tone, it restores compactness to the most delicate areas and returns the skin's natural plumpness.",
      } },
      {
        id: "olistico",
        name: { it: "Trattamento olistico", en: "Holistic treatment" },
        duration: DUR_60,
        price: eur(65),
        requiresProtocol: true,
        description: {
          it: "Un trattamento localizzato con tripla azione: drenante, lipolitico e tonificante. Lavora sulla zona che ne ha più bisogno.",
          en: "A localised treatment with a triple action: draining, lipolytic and toning. It works on the area that needs it most.",
        },
      },
    ],
          },
  {
    id: "corpo-localizzati",
    title: { it: "Trattamenti localizzati", en: "Targeted treatments" },
    treatments: [
      {
        id: "cuoio-capelluto-spa",
        name: { it: "Cuoio capelluto in SPA", en: "Scalp treatment in SPA" },
        duration: DUR_60,
        price: eurFrom(65),
        description: {
          it: "Un percorso eubiotico dedicato al cuoio capelluto e ai capelli, per ritrovare equilibrio e vitalità partendo dalla radice.",
          en: "An eubiotic pathway dedicated to the scalp and hair, to restore balance and vitality starting from the root.",
        },
      },
      {
        id: "pulizia-schiena",
        name: { it: "Pulizia schiena", en: "Back cleansing" },
        duration: DUR_55,
        price: eur(53),
        description: {
          it: "Una pulizia profonda della schiena che rimuove impurità e ripristina l'equilibrio cutaneo, restituendo alla pelle freschezza e leggerezza.",
          en: "A deep back cleanse that removes impurities and restores skin balance, returning freshness and lightness to the skin.",
        },
      },
      {
        id: "gambe",
        name: { it: "Gambe", en: "Legs" },
        duration: DUR_45,
        price: eurFrom(45),
        description: {
          it: "Un trattamento dedicato alle gambe, costruito su misura in base alle esigenze e agli inestetismi da trattare.",
          en: "A treatment dedicated to the legs, tailored to the needs and concerns to be addressed.",
        },
      },
      {
        id: "seno",
        name: { it: "Seno", en: "Bust" },
        duration: DUR_45,
        price: eurFrom(50),
        description: {
          it: "Un trattamento tonificante e rassodante, pensato per migliorare compattezza e aspetto del décolleté.",
          en: "A toning and firming treatment, designed to improve the compactness and appearance of the décolleté.",
        },
      },
    ],
  },
];

/** Featured method blocks on the Massaggi page (highlighted, outside the main list). */
export const panciaPiattaTreatment: Treatment = {
  id: "pancia-piatta",
  name: { it: "Metodo Pancia Piatta", en: "Flat-belly method" },
  duration: DUR_40,
  price: eur(45),
};

export const riflessologiaCorporeaTreatment: Treatment = {
  id: "riflessologia-corporea",
  name: { it: "Riflessologia corporea", en: "Body reflexology" },
  durationOptions: [
    { duration: DUR_55, price: eur(65) },
    { duration: DUR_85, price: eur(90) },
  ],
};

export const massaggiFeaturedMethods: Treatment[] = [
  panciaPiattaTreatment,
  riflessologiaCorporeaTreatment,
];

export const massaggiGroups: TreatmentGroup[] = [
  {
    id: "massaggi-rilassanti",
    title: { it: "Massaggi rilassanti", en: "Relaxing massages" },
    treatments: [
      { id: "rilassante", name: { it: "Rilassante", en: "Relaxing" }, duration: DUR_55, price: eur(65), description: {
            it: "Un massaggio avvolgente che scioglie le tensioni accumulate e riporta il corpo a uno stato di calma profonda. Movimenti lenti e fluidi che allentano lo stress e restituiscono equilibrio, a corpo e mente.",
            en: "An enveloping massage that melts built-up tension and brings the body back to deep calm. Slow, fluid movements that ease stress and restore balance to body and mind.",
      } },
      { id: "drenante", name: { it: "Drenante", en: "Lymphatic drainage" }, duration: DUR_55, price: eur(65), description: {
            it: "Un massaggio dai movimenti mirati che stimola la circolazione e favorisce il drenaggio dei liquidi in eccesso.",
            en: "A massage with targeted movements that stimulates circulation and supports the drainage of excess fluids.",
      } },
      {
        id: "sinergico",
        name: { it: "Sinergico", en: "Synergic" },
        short: {
          it: "Unisce la potenza dei prodotti eubiotici a manualità personalizzate.",
          en: "Combines the power of eubiotic products with tailored hands-on techniques.",
        },
        duration: DUR_55,
        price: eur(80),
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
        description: {
            it: "Il nostro massaggio firma: la tecnica manuale si adatta all'esigenza che il corpo esprime in quel preciso momento. Personale, mai uguale.",
            en: "Our signature massage: the hands-on technique adapts to what the body needs in that precise moment. Personal, never the same twice.",
          },
        durationOptions: [
          { duration: DUR_55, price: eur(70) },
          { duration: DUR_85, price: eur(95) },
        ],
      },
      {
        id: "hot-stone",
        name: { it: "Hot Stone", en: "Hot Stone" },
        description: {
          it: "Il massaggio con pietre laviche calde, un calore che affonda nei muscoli e scioglie le tensioni. **Migliora la circolazione, allevia la rigidità** e lascia il corpo in uno stato di relax profondo.",
          en: "A massage with warm lava stones — heat that sinks into the muscles and melts tension. **It improves circulation, eases stiffness** and leaves the body in deep relaxation.",
        },
        durationOptions: [
          { duration: DUR_55, price: eur(80) },
          { duration: DUR_85, price: eur(100) },
        ],
      },
      {
        id: "gravidanza",
        name: { it: "Massaggio in gravidanza", en: "Pregnancy massage" },
        short: { it: "Dal terzo mese", en: "From the third month" },
        description: {
            it: "In un momento ricco di emozioni e attese, concediti la coccola di un massaggio dedicato.",
            en: "In a time full of emotion and anticipation, treat yourself to a dedicated massage.",
          },
        duration: DUR_60,
        price: eur(65),
      },
      {
        id: "massaggio-in-armonia",
        name: { it: "Massaggio in armonia (di coppia)", en: "Harmony massage (for two)" },
        short: { it: "Di coppia", en: "For two" },
        description: {
            it: "Un momento da condividere. Due lettini affiancati, lo stesso istante di quiete: il massaggio in armonia è pensato per chi vuole rilassarsi insieme, in una coccola che resta.",
            en: "A moment to share. Two beds side by side, the same quiet instant: the harmony massage is for those who want to relax together, in a lasting embrace of care.",
          },
        price: eur(155),
      },
      {
        id: "mamma-bambino",
        name: { it: "Massaggio mamma e bambino", en: "Mother & child massage" },
        description: {
            it: "Un gesto delicato pensato per due, mamma e piccolo insieme, nello stesso spazio e nello stesso tempo. Una coccola condivisa, dolce e rassicurante.",
            en: "A gentle gesture for two — mother and little one together, in the same space and the same time. A shared cuddle, soft and reassuring.",
          },
        price: eur(100),
      },
      {
        id: "bambini-ragazzi",
        name: { it: "Massaggio bambini e ragazzi", en: "Children & teens massage" },
        short: { it: "Fino ai 12 anni", en: "Up to 12 years" },
        description: {
          it: "Un massaggio leggero e giocoso, pensato per i più piccoli fino ai 12 anni. Un momento di calma e di coccole, tutto per loro.",
          en: "A light, playful massage for little ones up to 12 years old. A moment of calm and comfort, just for them.",
        },
        price: eurFrom(45),
      },
    ],
  },
  {
    id: "massaggi-localizzati",
    title: { it: "Massaggi localizzati", en: "Targeted massages" },
    treatments: [
      {
        id: "decontratturante-schiena",
        name: { it: "Decontratturante schiena", en: "Back relaxing" },
        duration: DUR_40,
        price: eur(45),
        description: {
          it: "Un massaggio mirato che scioglie le contratture e restituisce mobilità. Le rigidità si allentano, le tensioni si sciolgono e la schiena ritrova libertà di movimento.",
          en: "A targeted massage that releases muscle knots and restores mobility. Stiffness eases, tension melts away and the back finds freedom of movement again.",
        },
      },
      {
        id: "riflessologia-plantare",
        name: { it: "Riflessologia plantare", en: "Foot reflexology" },
        short: {
          it: "Metodo Lucia Torri Cianci",
          en: "Lucia Torri Cianci Method",
        },
        description: {
          it: "Il piede come mappa dell'intero organismo: ogni punto corrisponde a un'area del corpo. Attraverso la stimolazione dei punti riflessi si riporta equilibrio e una sensazione di benessere diffuso.",
          en: "The foot as a map of the whole body: every point corresponds to an area of the organism. By stimulating the reflex points, balance is restored along with a diffuse sense of wellbeing.",
        },
        duration: DUR_40,
        price: eur(45),
      },
      {
        id: "gambe-leggere",
        name: { it: "Gambe leggere", en: "Light legs" },
        duration: DUR_30,
        price: eur(40),
        description: {
          it: "Un massaggio drenante e distensivo che lavora sui punti riflessi. Alleggerisce le gambe stanche e restituisce una piacevole sensazione di sollievo.",
          en: "A draining, soothing massage that works on the reflex points. It lightens tired legs and returns a pleasant feeling of relief.",
        },
      },
      {
        id: "antiaging-viso",
        name: { it: "Antiaging viso", en: "Facial antiaging" },
        duration: DUR_45,
        price: eur(53),
        description: {
          it: "Manualità che attivano la circolazione e distendono i muscoli in tensione, migliorando il turgore della pelle. Un trattamento che coinvolge viso, testa, collo e spalle.",
          en: "Hands-on work that activates circulation and releases tense muscles, improving skin plumpness. A treatment that involves face, head, neck and shoulders.",
        },
      },
      {
        id: "relax-mani",
        name: { it: "Relax mani", en: "Hand relax" },
        duration: DUR_30,
        price: eur(40),
        description: {
          it: "Un gesto semplice dai benefici sorprendenti: rilassamento profondo, circolazione riattivata e sollievo per le articolazioni. Per mani che lavorano tutto il giorno.",
          en: "A simple gesture with surprising benefits: deep relaxation, reactivated circulation and joint relief. For hands that work all day.",
        },
      },
      {
        id: "relax-piedi",
        name: { it: "Relax piedi", en: "Foot relax" },
        duration: DUR_30,
        price: eur(40),
        description: {
          it: "Il rituale che scioglie la stanchezza accumulata. Riduce lo stress della giornata e riattiva la circolazione, restituendo leggerezza da terra in su.",
          en: "The ritual that melts accumulated tiredness. It reduces the stress of the day and reactivates circulation, restoring lightness from the ground up.",
        },
      },
      {
        id: "testa-cuoio-capelluto",
        name: { it: "Testa e cuoio capelluto", en: "Head & scalp" },
        duration: DUR_45,
        price: eur(53),
        description: {
          it: "Stimola la microcircolazione e favorisce l'ossigenazione, sciogliendo tensioni che spesso non sappiamo di avere. Eseguito su testa, collo e spalle con sfioramenti sui punti riflessi.",
          en: "Stimulates microcirculation and supports oxygenation, releasing tensions we often don't know we carry. Performed on head, neck and shoulders with light strokes on the reflex points.",
        },
      },
    ],
  },
];

export const maniPiediGroups: TreatmentGroup[] = [
  {
    id: "mani",
    title: { it: "Servizi mani", en: "Hand services" },
    treatments: [
      { id: "manicure", name: { it: "Manicure", en: "Manicure" }, price: eur(28) },
      { id: "manicure-semi", name: { it: "Manicure con semipermanente Estrosa", en: "Manicure with gel polish Estrosa" }, price: eur(43) },
      { id: "semipermanente", name: { it: "Semipermanente Estrosa", en: "Gel polish Estrosa" }, price: eur(30) },
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
      { id: "pedicure-estetico-semi", name: { it: "Pedicure estetico con semipermanente Estrosa", en: "Cosmetic pedicure with gel polish Estrosa" }, price: eur(50) },
      { id: "pedicure-curativo-semi", name: { it: "Pedicure curativo con semipermanente Estrosa", en: "Curative pedicure with gel polish Estrosa" }, price: eur(53) },
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
    price: eur(169),
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
          price: eur(68),
          short: {
            it: "Un letto morbido scaldato dal sole e i profumi dei campi di primavera.",
            en: "A soft bed warmed by the sun and the scents of spring fields.",
          },
          description: {
            it: "Un rituale che conduce a un soffice letto scaldato dal sole, tra i profumi dei campi in primavera.",
            en: "A ritual that leads to a soft bed warmed by the sun, among the scents of spring fields.",
          },
          tags: ["nutriente", "sensoriale"],
        },
        {
          id: "rio-de-janeiro",
          name: { it: "Viaggio a Rio de Janeiro", en: "Journey to Rio de Janeiro" },
          duration: { it: "1h", en: "1h" },
          price: eur(80),
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
          price: eur(80),
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
          price: eur(100),
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
          price: eur(100),
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
          price: eur(105),
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
          price: eur(105),
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
          price: eur(125),
          short: {
            it: "L'hammam classico arricchito dalla cura del cuoio capelluto.",
            en: "The classic hammam enriched with scalp care.",
          },
          tags: ["purificante", "relax"],
        },
        {
          id: "via-della-verbena",
          name: { it: "La Via della Verbena", en: "The Path of Verbena" },
          duration: { it: "1h e 40min", en: "1h 40min" },
          price: eur(169),
          short: {
            it: "Purificazione in biosauna e note fresche di verbena per un relax che favorisce il sonno.",
            en: "Biosauna purification and fresh verbena notes for deep calm that supports better sleep.",
          },
          description: {
            it: "Un viaggio sensoriale che unisce la purificazione profonda della biosauna alle note fresche, agrumate e rilassanti della verbena, pianta amata anche nelle antiche tradizioni orientali per le sue proprietà antinfiammatorie e calmanti, le quali favoriscono positivamente la qualità del sonno.",
            en: "A sensory journey that joins the deep purification of the biosauna with the fresh, citrusy and relaxing notes of verbena — a plant cherished in ancient Eastern traditions for its anti-inflammatory and calming properties, which gently support better sleep.",
          },
          tags: ["purificante", "relax", "sensoriale"],
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
          price: eur(110),
          short: {
            it: "Una nuvola orientale dolce e speziata che profuma di Marocco.",
            en: "A sweet, spicy oriental cloud that smells of Morocco.",
          },
          description: {
            it: "Una nuvola orientale, dolce e speziata, che trasporta nei paesi del Marocco. Nutre e rilassa, elimina le cellule morte e ossigena la pelle, lasciando spensieratezza e leggerezza.",
            en: "An oriental cloud, sweet and spicy, that carries you to the lands of Morocco. It nourishes and relaxes, removes dead cells and oxygenates the skin, leaving lightness and ease.",
          },
          tags: ["sensoriale", "nutriente"],
        },
        {
          id: "oud-ambra",
          name: { it: "Oud e Ambra", en: "Oud & Amber" },
          duration: { it: "1h e 20min", en: "1h 20min" },
          price: eur(225),
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
          id: "prezioso-oud",
          name: { it: "Prezioso all'Oud", en: "Precious Oud" },
          duration: { it: "1h e 35min", en: "1h 35min" },
          price: eur(191),
          short: {
            it: "Karité e argan per nutrire la pelle e inebriare l'anima.",
            en: "Shea and argan to nourish the skin and intoxicate the soul.",
          },
          description: {
            it: "Un viaggio in luoghi lontani: il burro di karité e l'argan nutrono la pelle in profondità, eliminano le impurità e la lasciano luminosa e affascinante.",
            en: "A journey to distant places: shea butter and argan nourish the skin in depth, remove impurities and leave it luminous and captivating.",
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
          price: eur(111),
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
          price: eur(150),
          short: {
            it: "Una calda pioggia, burro di karité e quattro mani avvolgenti.",
            en: "Warm rainfall, shea butter and four enveloping hands.",
          },
          description: {
            it: "Unico nel suo genere: una calda pioggia che scende sul corpo si unisce al burro di karité nutriente e a quattro mani avvolgenti che massaggiano tutto il corpo.",
            en: "Unique of its kind: warm rainfall on the body joins nourishing shea butter and four enveloping hands that massage the whole body.",
          },
          tags: ["relax", "nutriente"],
        },
        {
          id: "cioccolato-zenzero",
          name: { it: "Cioccolato e Zenzero", en: "Chocolate & Ginger" },
          duration: { it: "1h e 40min", en: "1h 40min" },
          price: eur(169),
          short: {
            it: "La dolcezza del cacao e il calore dello zenzero in un abbraccio goloso.",
            en: "The sweetness of cocoa and the warmth of ginger in an indulgent embrace.",
          },
          tags: ["nutriente", "sensoriale"],
        },
        {
          id: "arancia-miele",
          name: { it: "Dolce Arancia e Miele", en: "Sweet Orange & Honey" },
          duration: { it: "1h e 35min", en: "1h 35min" },
          price: eur(191),
          short: {
            it: "Miele prezioso e arancia energizzante per un piacere senza tempo.",
            en: "Precious honey and energising orange for a timeless pleasure.",
          },
          description: {
            it: "Il miele, nettare prezioso, e l'arancia tonificante avvolgono il corpo in un piacere senza tempo. Elimina le impurità, nutre e ripara la pelle, tonifica e rivitalizza.",
            en: "Precious honey and toning orange wrap the body in timeless pleasure. It removes impurities, nourishes and repairs the skin, tones and revitalises.",
          },
          tags: ["nutriente", "tonificante"],
        },
        {
          id: "delizia-oriente",
          name: { it: "Delizia d'Oriente", en: "Delight of the Orient" },
          duration: { it: "1h e 35min", en: "1h 35min" },
          price: eur(172),
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
          price: eur(200),
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
    price: eur(100),
    short: {
      it: "L'antico massaggio polinesiano per un benessere assoluto e un senso di rinnovamento.",
      en: "The ancient Polynesian massage for absolute wellbeing and a sense of renewal.",
    },
    description: {
            it: "Un rituale antico con massaggio polinesiano che regala un benessere quasi assoluto e una profonda sensazione di rinnovamento.",
            en: "An ancient ritual with Polynesian massage that brings near-absolute wellbeing and a deep sense of renewal.",
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
          duration: { it: "1h e 10min", en: "1h 10min" },
          price: eur(100),
          short: {
            it: "Profumi golosi che addolciscono delicatamente tutto il corpo.",
            en: "Indulgent fragrances that gently soften the whole body.",
          },
          description: {
            it: "Un rituale rilassante e distensivo dai profumi golosi che addolciscono il corpo. Idrata, nutre e rilassa.",
            en: "A relaxing, soothing ritual with indulgent fragrances that soften the body. It hydrates, nourishes and relaxes.",
          },
          tags: ["nutriente", "relax"],
        },
        {
          id: "candle",
          name: { it: "Candle Massage", en: "Candle Massage" },
          duration: { it: "1h", en: "1h" },
          price: eur(100),
          short: {
            it: "Burro di karité 100% e il calore avvolgente della candela.",
            en: "100% shea butter and the enveloping warmth of the candle.",
          },
          description: {
            it: "Un rituale con burro di karité al 100%: il calore avvolgente della candela si scioglie sulla pelle in una sensazione di protezione e nutrimento profondo.",
            en: "A ritual with 100% shea butter: the enveloping warmth of the candle melts onto the skin in a feeling of protection and deep nourishment.",
          },
          tags: ["nutriente", "relax"],
        },
        {
          id: "bioemozionale",
          name: { it: "Bioemozionale", en: "Bioemotional" },
          duration: { it: "1h", en: "1h" },
          price: eur(100),
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
    id: "massaggio-di-coppia",
    name: { it: "Massaggio di Coppia", en: "Couple Massage" },
    duration: { it: "1h", en: "1h" },
    price: eur(135),
    short: {
      it: "Condividi il piacere di un massaggio con chi ami.",
      en: "Share the pleasure of a massage with someone you love.",
    },
    description: {
      it: "Condividi il piacere di un massaggio con la persona che ami, un'amica o un familiare. Le nostre cabine sono pensate anche per questo.",
      en: "Share the pleasure of a massage with the person you love, a friend or a family member. Our cabins are designed for this too.",
    },
    tags: ["coppia", "relax"],
  },
  groups: [
    {
      id: "coppia-percorsi",
      title: { it: "Percorsi per due", en: "Journeys for two" },
      subtitle: {
        it: "Purificazione e calore condivisi, seguiti da un massaggio dedicato.",
        en: "Shared purification and warmth, followed by a dedicated massage.",
      },
      treatments: [
        {
          id: "hammam-plantare-coppia",
          name: {
            it: "Percorso Hammam per due con Massaggio Plantare",
            en: "Hammam journey for two with Foot Reflexology",
          },
          temperature: { it: "43°", en: "43°C" },
          price: eur(220),
          short: {
            it: "Purificazione ai vapori e massaggio plantare, insieme.",
            en: "Vapour purification and foot reflexology, together.",
          },
          description: {
            it: "Antico rituale di purificazione condiviso: i vapori a varie temperature liberano il corpo, seguiti da un massaggio plantare.",
            en: "An ancient shared purification ritual: vapours at various temperatures release the body, followed by a foot reflexology massage.",
          },
          tags: ["coppia", "purificante", "relax"],
        },
        {
          id: "termale-romano-miele-coppia",
          name: {
            it: "Percorso Termale Romano con Massaggio al Miele Fondente",
            en: "Roman Thermal journey with Melting Honey Massage",
          },
          short: {
            it: "Pacchetto coppia: percorso termale e massaggio al miele.",
            en: "Couple package: thermal journey and honey massage.",
          },
          description: {
            it: "L'esperienza completa: il percorso termale romano seguito dal massaggio al miele fondente, per un momento di benessere assoluto da vivere in due.",
            en: "The complete experience: the Roman thermal journey followed by the melting honey massage, for a moment of absolute wellbeing to share.",
          },
          price: eur(295),
          tags: ["coppia", "relax", "nutriente"],
        },
      ],
    },
    {
      id: "coppia-massaggi",
      title: { it: "Rituali e massaggi per due", en: "Rituals & massages for two" },
      subtitle: {
        it: "Fianco a fianco, nello stesso profumo e nello stesso tempo.",
        en: "Side by side, in the same scent and the same time.",
      },
      treatments: [
        {
          id: "dolcezza-coppia",
          name: { it: "Rituale Dolcezza per due", en: "Sweetness ritual for two" },
          price: eur(106),
          short: {
            it: "Un letto soffice e i profumi dei campi di primavera, in due.",
            en: "A soft bed and the scents of spring fields, for two.",
          },
          description: {
            it: "Un rituale che conduce a un soffice letto scaldato dal sole, tra i profumi dei campi in primavera. Da vivere in due.",
            en: "A ritual that leads to a soft bed warmed by the sun, among the scents of spring fields. To be shared by two.",
          },
          tags: ["coppia", "sensoriale", "nutriente"],
        },
        {
          id: "morjana",
          name: {
            it: "Massaggio Aromatico Morjana per due",
            en: "Morjana aromatic massage for two",
          },
          price: eur(150),
          short: {
            it: "Fragranze avvolgenti e un viaggio sensoriale nell'Oriente.",
            en: "Enveloping fragrances and a sensory journey into the Orient.",
          },
          description: {
            it: "Per gli appassionati di fragranze avvolgenti: un vero viaggio sensoriale nel cuore dell'Oriente, condiviso.",
            en: "For lovers of enveloping fragrances: a true sensory journey into the heart of the Orient, shared.",
          },
          tags: ["coppia", "relax", "sensoriale"],
        },
        {
          id: "candle-coppia",
          name: { it: "Candle Massage per due", en: "Candle Massage for two" },
          price: eur(165),
          short: {
            it: "Burro di karité e il calore della candela, condivisi.",
            en: "Shea butter and candle warmth, shared.",
          },
          description: {
            it: "Il massaggio rituale con burro di karité al 100%: il calore della candela avvolge entrambi in una sensazione di protezione.",
            en: "The ritual massage with 100% shea butter: the warmth of the candle wraps you both in a feeling of protection.",
          },
          tags: ["coppia", "nutriente", "relax"],
        },
        {
          id: "miele-fondente-coppia",
          name: {
            it: "Massaggio al Miele Fondente per due",
            en: "Melting Honey Massage for two",
          },
          price: eur(165),
          short: {
            it: "Profumi golosi che addolciscono il corpo, insieme.",
            en: "Indulgent scents that soften the body, together.",
          },
          description: {
            it: "Un rituale rilassante e distensivo dai profumi golosi che addolciscono il corpo. Idrata, nutre e rilassa.",
            en: "A relaxing, soothing ritual with indulgent fragrances that soften the body. It hydrates, nourishes and relaxes.",
          },
          tags: ["coppia", "nutriente", "relax"],
        },
        {
          id: "schiena-verbena-coppia",
          name: {
            it: "Massaggio Schiena per due all'Olio di Verbena",
            en: "Back Massage for two with Verbena Oil",
          },
          price: eur(100),
          short: {
            it: "Olio essenziale di verbena, calmante e riequilibrante.",
            en: "Calming, balancing verbena essential oil.",
          },
          description: {
            it: "Un olio essenziale dall'azione calmante e riequilibrante, che dona una piacevole sensazione di serenità. Da condividere.",
            en: "An essential oil with a calming, rebalancing action that brings a pleasant sense of serenity. To be shared.",
          },
          tags: ["coppia", "relax"],
        },
        {
          id: "due-spa",
          name: { it: "Massaggio per due in SPA", en: "Massage for two in SPA" },
          price: eur(165),
          short: {
            it: "Un momento magico da condividere nello spazio SPA.",
            en: "A magical moment to share in the SPA space.",
          },
          description: {
            it: "Un'esperienza esclusiva da vivere insieme, nello spazio riservato della SPA. Il massaggio si intreccia all'atmosfera del rituale: un momento magico da condividere, lontano da tutto.",
            en: "An exclusive experience to share, in the private space of the SPA. The massage intertwines with the ritual atmosphere: a magical moment together, far from everything.",
          },
          tags: ["coppia", "relax", "sensoriale"],
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
          id: "percorso-hammam-candle",
          name: {
            it: "Percorso Hammam con Candle Massage",
            en: "Hammam journey with Candle Massage",
          },
          temperature: { it: "43°", en: "43°C" },
          price: eur(295),
          short: {
            it: "Purificazione ai vapori e massaggio rituale al burro di karité.",
            en: "Vapour purification and a ritual shea-butter candle massage.",
          },
          description: {
            it: "Antico rituale di purificazione: i vapori a diverse temperature liberano dolcemente il corpo. A seguire, un massaggio rituale con burro di karité al 100%, per l'avvolgente calore della candela.",
            en: "An ancient purification ritual: vapours at different temperatures gently release the body. Followed by a ritual massage with 100% shea butter and the enveloping warmth of the candle.",
          },
          tags: ["purificante", "relax", "nutriente"],
        },
        {
          id: "percorso-sauna-morjana",
          name: {
            it: "Percorso Sauna / Sauna Romana / Bagno Turco con Massaggio Aromatico Morjana",
            en: "Sauna / Roman Sauna / Turkish Bath journey with Morjana aromatic massage",
          },
          temperature: {
            it: "Sauna 70° / Sauna Romana 48° / Bagno Turco 46°",
            en: "Sauna 70°C / Roman Sauna 48°C / Turkish Bath 46°C",
          },
          price: eur(280),
          short: {
            it: "Sudorazione profonda e massaggio aromatico nel cuore dell'Oriente.",
            en: "Deep sweating and an aromatic massage at the heart of the Orient.",
          },
          description: {
            it: "Favorisce un'abbondante sudorazione con benefici sulla muscolatura e una profonda sensazione di relax. A seguire, un massaggio con fragranze avvolgenti, per un viaggio sensoriale nel cuore dell'Oriente.",
            en: "It encourages abundant sweating with benefits for the muscles and a deep sense of relaxation. Followed by a massage with enveloping fragrances, for a sensory journey into the heart of the Orient.",
          },
          tags: ["relax", "detox", "sensoriale"],
        },
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

export const spaCategories = [
  ritualiCategory,
  massaggiSuiteCategory,
  coppiaCategory,
  percorsiCategory,
] as const;

/** All estetica treatment groups, used for lookups (gift card, booking…). */
export const esteticaGroups: TreatmentGroup[] = [
  ...visoGroups,
  ...corpoGroups,
  {
    id: "massaggi-metodi",
    title: { it: "Metodi in evidenza", en: "Featured methods" },
    treatments: massaggiFeaturedMethods,
  },
  ...massaggiGroups,
  ...maniPiediGroups,
  ...epilazioneGroups,
  ...sopraccigliaGroups,
];

/** Parses formatted euro strings such as "€ 58,00", "Da € 63,00" or "€58.00". */
export function parseEuroAmount(value: string): number | null {
  const normalized = value
    .replace(/^(da|from)\s+/i, "")
    .replace(/[^\d,.-]/g, "")
    .replace(",", ".");
  const amount = Number.parseFloat(normalized);
  return Number.isFinite(amount) ? amount : null;
}

/** Resolves the gift-card amount for a treatment (headline price, else first variant). */
export function getTreatmentGiftAmount(treatment: Treatment, locale: Locale): number | null {
  if (treatment.price) {
    const parsed = parseEuroAmount(pick(treatment.price, locale));
    if (parsed !== null) return parsed;
  }

  if (treatment.durationOptions?.length) {
    for (const option of treatment.durationOptions) {
      const parsed = parseEuroAmount(pick(option.price, locale));
      if (parsed !== null) return parsed;
    }
  }

  if (treatment.priceTiers?.length) {
    for (const tier of treatment.priceTiers) {
      const parsed = parseEuroAmount(pick(tier.price, locale));
      if (parsed !== null) return parsed;
    }
  }

  return null;
}

export function findSpaTreatmentById(id: string): Treatment | null {
  for (const category of spaCategories) {
    if (category.featured.id === id) return category.featured;
    for (const group of category.groups) {
      const found = group.treatments.find((treatment) => treatment.id === id);
      if (found) return found;
    }
  }
  return null;
}

export function findEsteticaTreatmentById(id: string): Treatment | null {
  for (const group of esteticaGroups) {
    const found = group.treatments.find((treatment) => treatment.id === id);
    if (found) return found;
  }
  return null;
}

/** Resolves a treatment by id across both the SPA and estetica catalogues. */
export function findTreatmentById(id: string): Treatment | null {
  return findSpaTreatmentById(id) ?? findEsteticaTreatmentById(id);
}
