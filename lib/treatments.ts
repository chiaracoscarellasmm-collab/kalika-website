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

export type TreatmentArea = "body" | "face";

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

/** Duration variant with its own price (e.g. 55 min / 1 h 25 min). */
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

export type TreatmentLink = {
  label: Bilingual;
  path: string;
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
  /** Optional contextual link shown with the expanded description. */
  relatedLink?: TreatmentLink;
  temperature?: Bilingual;
  /** Treatment areas shown as small badges on SPA cards. */
  areas?: TreatmentArea[];
  tags?: BenefitTag[];
  /**
   * Advanced eubiotic protocol treatments: no direct book/gift —
   * show an info popup instead.
   */
  requiresProtocol?: boolean;
  /**
   * Set to false for services that are never sold on their own, such as the
   * add-ons applied on top of another treatment. Treatments whose price is
   * open-ended ("Da € X") are already excluded from gifting automatically.
   */
  giftable?: boolean;
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
  /** Hero treatment shown above the groups. Optional: Rituali SPA has none. */
  featured?: Treatment;
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
const DUR_75: Bilingual = { it: "1h e 15min", en: "1h 15min" };
const DUR_85: Bilingual = { it: "1h e 25min", en: "1h 25min" };

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
        price: eur(63),
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
          en: "It involves applying three types of marine-derived muds — hot, cold and balancing — across distinct areas to activate the facial muscles and reactivate blood circulation. A passive gymnastics that leaves the face relaxed, oxygenated and plump.",
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
      { id: "talaterm-fango-depurativo", name: { it: "Depurazione con Talaterm Fangogel", en: "Purifying Talaterm Mud-gel" }, duration: DUR_60, price: eur(80), description: {
            it: "Un trattamento depurante che riattiva lo scambio dei fluidi nelle pelli spente o disidratate. Minerali e oligoelementi restituiscono alla pelle tono, luminosità ed elasticità.",
            en: "A purifying treatment that reactivates fluid exchange in dull or dehydrated skin. Minerals and trace elements restore tone, radiance and elasticity.",
      } },
      {
        id: "talaterm-caldo-freddo",
        name: { it: "Talaterm fango gel caldo / freddo", en: "Talaterm hot / cold mud-gel" },
        duration: DUR_75,
        price: eur(110),
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
      { id: "talaplus", name: { it: "Talaplus: Trattamento eubiotico riducente", en: "Talaplus: Reducing eubiotic treatment" }, duration: DUR_75, price: eur(130), requiresProtocol: true, description: {
            it: "Un trattamento modellante e drenante che agisce sulle adiposità localizzate e sugli inestetismi della cellulite, mentre idrata e tonifica. Rimodella la silhouette con azione mirata.",
            en: "A sculpting, draining treatment that targets localised adiposity and cellulite while hydrating and toning. It reshapes the silhouette with focused action.",
      } },
      { id: "body-reset", name: { it: "Body Reset: Trattamento eubiotico rassodante", en: "Body Reset: Firming eubiotic treatment" }, duration: DUR_75, price: eur(140), requiresProtocol: true, description: {
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
        giftable: false,
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
        price: eur(45),
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
        giftable: false,
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
          {
            duration: { it: "1h e 30min", en: "1h 30min" },
            price: eur(110),
          },
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
        id: "mamma-bambino",
        name: { it: "Massaggio mamma e bambino", en: "Mother & child massage" },
        description: {
            it: "Un gesto delicato pensato per due, mamma e piccolo insieme, nello stesso spazio e nello stesso tempo. Una coccola condivisa, dolce e rassicurante.",
            en: "A gentle gesture for two — mother and little one together, in the same space and the same time. A shared cuddle, soft and reassuring.",
          },
        duration: { it: "1h", en: "1h" },
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
        duration: { it: "1h", en: "1h" },
        price: eurFrom(45),
        giftable: false,
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
      { id: "french", name: { it: "French", en: "French" }, price: eur(5), giftable: false },
      { id: "rimozione-semi", name: { it: "Rimozione singola semipermanente", en: "Gel polish removal" }, price: eur(15), giftable: false },
      { id: "ristrutturazione-mani", name: { it: "Ristrutturazione mani", en: "Hand restructuring" }, price: eur(25), giftable: false },
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
      { id: "ristrutturazione-piedi", name: { it: "Ristrutturazione piedi", en: "Foot restructuring" }, price: eur(25), giftable: false },
      { id: "ristrutturazione-abbinata", name: { it: "Ristrutturazione abbinata a manicure/pedicure", en: "Restructuring combined with manicure/pedicure" }, price: eur(20), giftable: false },
    ],
  },
];

export const epilazioneGroups: TreatmentGroup[] = [
  {
    id: "epilazione-tradizionale",
    title: { it: "Epilazione tradizionale", en: "Traditional waxing" },
    subtitle: { it: "Uomo e donna, viso e corpo.", en: "Men and women, face and body." },
    treatments: [
      { id: "trad-viso", name: { it: "Viso", en: "Face" }, short: { it: "Sopracciglia, baffetti, sopracciglia + baffetti", en: "Brows, upper lip, brows + upper lip" }, price: eurFrom(8), giftable: false },
      { id: "trad-ascelle", name: { it: "Ascelle", en: "Underarms" }, price: eur(13), giftable: false },
      { id: "trad-braccia", name: { it: "Braccia", en: "Arms" }, price: eur(21), giftable: false },
      { id: "trad-inguine", name: { it: "Inguine", en: "Bikini" }, short: { it: "Classico, sgambato o totale", en: "Classic, high-cut or full" }, price: eurFrom(13), giftable: false },
      { id: "trad-gambe", name: { it: "Gambe", en: "Legs" }, short: { it: "Mezza o intera, anche con inguine", en: "Half or full, also with bikini" }, price: eurFrom(21), giftable: false },
      { id: "trad-busto", name: { it: "Petto, addome e schiena", en: "Chest, abdomen & back" }, price: eurFrom(28), giftable: false },
    ],
  },
  {
    id: "coco-cera",
    title: { it: "Coco Cera", en: "Coco Cera" },
    subtitle: { it: "Originale cera brasiliana.", en: "Original Brazilian wax." },
    treatments: [
      { id: "coco-donna", name: { it: "Donna · viso e corpo", en: "Women · face & body" }, price: eurFrom(7), giftable: false },
      { id: "coco-uomo", name: { it: "Uomo · viso e corpo", en: "Men · face & body" }, price: eurFrom(8), giftable: false },
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
      {
        id: "trattamento-eubiotico-occhi",
        name: {
          it: "Trattamento Eubiotico Occhi",
          en: "Eubiotic Eye Treatment",
        },
        price: eur(40),
        description: {
          it: "Drenante, schiarente, idratante, antirughe e calmante, per uno sguardo che rinasce.",
          en: "Draining, brightening, hydrating, anti-wrinkle and soothing care for refreshed, revitalised eyes.",
        },
      },
      { id: "colorazione-modellamento", name: { it: "Colorazione e modellamento sopracciglia", en: "Brow tint & shaping" }, price: eur(30) },
      { id: "laminazione", name: { it: "Laminazione ciglia o sopracciglia con cheratina", en: "Lash or brow lamination with keratin" }, price: eur(60) },
    ],
  },
  {
    id: "make-up",
    title: { it: "Make Up", en: "Make-up" },
    treatments: [
      { id: "trucco", name: { it: "Trucco", en: "Make-up" }, price: eurFrom(35), giftable: false },
      { id: "trucco-sposa", name: { it: "Trucco sposa con prove", en: "Bridal make-up with trials" }, price: eurFrom(130), giftable: false },
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
    id: "cioccolato-zenzero",
    name: { it: "Rituale Cioccolato e Zenzero", en: "Chocolate & Ginger Ritual" },
    duration: { it: "1h e 40min", en: "1h 40min" },
    price: eur(170),
    short: {
      it: "La dolcezza del cacao e il calore dello zenzero in un abbraccio goloso.",
      en: "The sweetness of cocoa and the warmth of ginger in an indulgent embrace.",
    },
    description: {
      it: "Un viaggio dei sensi dove la pelle sarà trattata con prodotti di diversa consistenza: dalle mandorle e cioccolato sminuzzati, a colate di cioccolato caldo e burri morbidi allo zenzero, tutto arricchito da minerali preziosi, vitamine e omega 3. Godurioso e indimenticabile.",
      en: "A journey for the senses where the skin is treated with textures of every kind: crushed almonds and chocolate, warm melted chocolate and soft ginger butters, all enriched with precious minerals, vitamins and omega 3. Indulgent and unforgettable.",
    },
    tags: ["nutriente", "sensoriale"],
  },
  groups: [
    {
      id: "riti-purificanti",
      title: { it: "Riti Purificanti", en: "Purifying Rites" },
      subtitle: {
        it: "Tradizioni di purificazione che rigenerano corpo e mente.",
        en: "Purification traditions that renew body and mind.",
      },
      treatments: [
        {
          id: "savonage",
          name: { it: "Rituale Savonage Profumato", en: "Scented Savonage Ritual" },
          areas: ["body"],
          duration: { it: "1h", en: "1h" },
          price: eur(100),
          short: {
            it: "Pulizia berbera al sapone per una pelle morbida e profumata.",
            en: "A Berber soap cleansing for soft, fragrant skin.",
          },
          description: {
            it: "Pulizia Berbera al sapone della tradizione marocchina, che dona una pelle pulita in profondità, ossigenata, morbida e profumata. Prepara la pelle per l'abbronzatura e per rigenerarsi e rivitalizzarsi.",
            en: "A Berber soap cleansing from Moroccan tradition, leaving skin deeply clean, oxygenated, soft and fragrant. It prepares the skin for tanning and for a true sense of renewal and revitalisation.",
          },
          tags: ["purificante", "detox"],
        },
        {
          id: "hammam",
          name: {
            it: "Hammam \"Il Rito della Purificazione\"",
            en: "Hammam \"The Ritual of Purification\"",
          },
          areas: ["body", "face"],
          duration: { it: "1h", en: "1h" },
          price: eur(100),
          short: {
            it: "Il rituale della purificazione con sapone nero esfoliante.",
            en: "The purification ritual with exfoliating black soap.",
          },
          description: {
            it: "Il sapone nero esfoliante è il prodotto principale della tradizione dell'Hammam. Un rituale che purifica in maniera efficace, donando un'incredibile e profonda sensazione di leggerezza e benessere.",
            en: "Exfoliating black soap is the star of Hammam tradition. A ritual that purifies effectively, leaving an incredible, deep sense of lightness and wellbeing.",
          },
          tags: ["purificante", "detox"],
        },
        {
          id: "hammam-cuoio",
          name: {
            it: "Hammam e Cuoio Capelluto",
            en: "Hammam and Scalp Treatment",
          },
          areas: ["body", "face"],
          duration: { it: "1h e 30min", en: "1h 30min" },
          price: eur(130),
          short: {
            it: "L'hammam classico arricchito dalla cura del cuoio capelluto.",
            en: "The classic hammam enriched with scalp care.",
          },
          description: {
            it: "Oltre al rito dell'Hammam del corpo, un rituale di purificazione completo con trattamento alla testa e benessere a tutto tondo, incredibilmente efficace.",
            en: "Beyond the body's Hammam ritual, a complete purification treatment that adds scalp care for all-round wellbeing — remarkably effective.",
          },
          tags: ["purificante", "relax"],
        },
        {
          id: "via-della-verbena",
          name: { it: "La Via della Verbena", en: "The Path of Verbena" },
          areas: ["body"],
          duration: { it: "1h e 40min", en: "1h 40min" },
          price: eur(170),
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
        {
          id: "delizia-oriente",
          name: { it: "Delizia d'Oriente", en: "Delight of the Orient" },
          areas: ["body"],
          duration: { it: "1h e 40min", en: "1h 40min" },
          price: eur(180),
          short: {
            it: "Rilassamento profondo per una pelle nuova, morbida come quella di un bambino.",
            en: "Deep relaxation for new skin, as soft as a child's.",
          },
          description: {
            it: "Rituale di rilassamento profondo dove, avvolti da deliziose e morbide fragranze, si può provare la sensazione di avere la pelle di un bambino e sentirsi meravigliosi. Per eliminare le cellule morte, purificare i pori della pelle e prevenirne l'invecchiamento, rilassare, nutrire e idratare.",
            en: "A deep relaxation ritual where, wrapped in delight and soft fragrances, you can feel as if your skin were a child's again and feel wonderful. To remove dead cells, purify skin pores and prevent ageing, relax, nourish and hydrate.",
          },
          tags: ["relax", "nutriente"],
        },
        {
          id: "mille-e-una-notte",
          name: {
            it: "Rito delle Mille e Una Notte",
            en: "The Ritual of One Thousand and One Nights",
          },
          areas: ["body", "face"],
          duration: { it: "1h e 50min", en: "1h 50min" },
          price: eur(190),
          short: {
            it: "Sapone berbero e argilla marocchina avvolti in fragranze deliziose.",
            en: "Berber soap and Moroccan clay wrapped in delightful fragrances.",
          },
          description: {
            it: "Rituale in cui sapone berbero e argilla marocchina con fragranze deliziose evocano un mondo meraviglioso nel quale il corpo diventa perfezione. Per idratare, nutrire e rilassare, eliminare le cellule morte ed ossigenare la pelle.",
            en: "A ritual in which Berber soap and Moroccan clay, with delightful fragrances, evoke a wondrous world in which the body becomes perfection. To hydrate, nourish and relax, remove dead cells and oxygenate the skin.",
          },
          tags: ["nutriente", "sensoriale", "purificante"],
        },
      ],
    },
    {
      id: "riti-alta-gamma",
      title: { it: "Riti d'Alta Gamma", en: "Signature Rituals" },
      subtitle: {
        it: "I rituali più preziosi, per un'esperienza di lusso assoluto.",
        en: "Our most precious rituals, for an experience of absolute luxury.",
      },
      treatments: [
        {
          id: "prezioso-oud",
          name: {
            it: "Rituale Prezioso all'Oud",
            en: "Precious Oud Ritual",
          },
          areas: ["body", "face"],
          duration: { it: "1h e 40min", en: "1h 40min" },
          price: eur(200),
          short: {
            it: "Karité e argan per nutrire la pelle e inebriare l'anima.",
            en: "Shea and argan to nourish the skin and intoxicate the soul.",
          },
          description: {
            it: "Una coccola per il corpo, un viaggio per la mente e un dono per i sensi. Il Rituale Prezioso all'Oud vi porta in misteriosi posti lontani dove il profumo deciso e orientale inebria l'anima di tradizione e nutre la pelle in sinergia con il Burro di Karité e l'Argan. La vostra pelle non è mai stata così affascinante.",
            en: "A treat for the body, a journey for the mind and a gift for the senses. The Precious Oud Ritual carries you to mysterious, distant places where a bold oriental fragrance intoxicates the soul with tradition and nourishes the skin together with Shea Butter and Argan. Your skin has never been this captivating.",
          },
          tags: ["nutriente", "sensoriale"],
        },
        {
          id: "prezioso-ambra",
          name: {
            it: "Rito Prezioso all'Ambra",
            en: "Precious Amber Rite",
          },
          areas: ["body", "face"],
          duration: { it: "1h e 40min", en: "1h 40min" },
          price: eur(200),
          short: {
            it: "Un palazzo orientale di ambra e spezie per una pelle di seta.",
            en: "An oriental palace of amber and spices for silk-like skin.",
          },
          description: {
            it: "Questo meraviglioso rituale vi porterà in un lussuoso palazzo orientale fitto di misteriosi e inebrianti profumi di Ambra e Spezie. Affascinante viaggio per scoprire l'antica ricetta per una pelle di seta e una silhouette da scoprire. Assapora la più sensuale e magica delle avventure.",
            en: "This wonderful ritual carries you to a luxurious oriental palace filled with mysterious, intoxicating scents of Amber and Spices. A captivating journey to uncover the ancient recipe for silk-like skin and a silhouette waiting to be revealed. Savour the most sensual and magical of adventures.",
          },
          tags: ["nutriente", "sensoriale"],
        },
        {
          id: "arancia-miele",
          name: {
            it: "Rituale Dolce all'Arancia e Miele",
            en: "Sweet Orange and Honey Ritual",
          },
          areas: ["body", "face"],
          duration: { it: "1h e 40min", en: "1h 40min" },
          price: eur(200),
          short: {
            it: "Miele prezioso e arancia energizzante per un piacere senza tempo.",
            en: "Precious honey and energising orange for a timeless pleasure.",
          },
          description: {
            it: "Molto più di una coccola, il Rituale Dolce all'Arancia e Miele vi apre le porte di un misterioso viaggio orientale, dove il miele, dolce e prezioso nettare, e l'arancio energizzante e tonificante avvolgerà il tuo corpo. Il rituale Orientale vi donerà il fascino di un incantesimo dolcemente profumato e una pelle meravigliosa.",
            en: "Far more than a treat, the Sweet Orange & Honey Ritual opens the doors to a mysterious oriental journey, where honey — sweet and precious nectar — and energising, toning orange wrap around your body. This Oriental ritual gives you the charm of a sweetly scented spell and wonderful skin.",
          },
          tags: ["nutriente", "tonificante"],
        },
        {
          id: "oud-ambra",
          name: {
            it: "Rituale Oud & Ambra",
            en: "Oud & Amber Ritual",
          },
          areas: ["body", "face"],
          duration: { it: "1h e 40min", en: "1h 40min" },
          price: eur(225),
          short: {
            it: "Oud energico e ambra imperiale per un viaggio indimenticabile.",
            en: "Bold oud and imperial amber for an unforgettable journey.",
          },
          description: {
            it: "Lasciati avvolgere da un nuovo profumo orientale energico e deciso in sinergia con l'amata Ambra imperiale e l'oro ricchezza della terra. Un viaggio sensoriale indimenticabile!\n\nObiettivi: idratare, nutrire e rilassare. Elimina le cellule morte, ossigena la pelle e dona un tocco anti-age viso.",
            en: "Let yourself be wrapped in a bold new oriental fragrance, paired with beloved imperial Amber and the earth's golden richness. An unforgettable sensory journey!\n\nGoals: to hydrate, nourish and relax. It removes dead cells, oxygenates the skin and gives the face an anti-ageing touch.",
          },
          tags: ["sensoriale", "nutriente"],
        },
      ],
    },
    {
      id: "brevi-intensi",
      title: { it: "Brevi ma Intensi", en: "Short & Intense" },
      subtitle: {
        it: "Il massimo dell'intensità in poco tempo.",
        en: "Maximum intensity, minimal time.",
      },
      treatments: [
        {
          id: "dolcezza-orientale",
          name: { it: "Rituale Dolcezza Orientale", en: "Oriental Sweetness Ritual" },
          areas: ["body"],
          duration: { it: "30min", en: "30 min" },
          price: eur(70),
          short: {
            it: "Un letto morbido scaldato dal sole e i profumi dei campi di primavera.",
            en: "A soft bed warmed by the sun and the scents of spring fields.",
          },
          description: {
            it: "Un viaggio che vi accoglie in un morbido letto riscaldato dal sole, avvolti da profumi deliziosi. Un rituale che leviga la pelle e la libera dalle impurità, lasciandola nutrita, luminosa e profondamente rilassata.",
            en: "A journey that welcomes you onto a soft, sun-warmed bed, wrapped in delightful fragrances. A ritual that smooths the skin and frees it from impurities, leaving it nourished, radiant and deeply relaxed.",
          },
          tags: ["nutriente", "sensoriale"],
        },
        {
          id: "seta-sahara",
          name: { it: "La Seta del Sahara", en: "The Silk of the Sahara" },
          areas: ["body"],
          duration: { it: "1h", en: "1h" },
          price: eur(110),
          short: {
            it: "Pelle fine e setosa come la sabbia che scorre tra le dita.",
            en: "Skin as fine and silky as sand flowing between your fingers.",
          },
          description: {
            it: "Rituale che rende la pelle fine e setosa come la sabbia che scorre tra le dita. Varie profumazioni evocheranno emozioni e ricordi e renderanno questa esperienza indimenticabile. Per un risultato addolcente, setificante e nutriente.",
            en: "A ritual that leaves the skin fine and silky, like sand flowing between your fingers. Various fragrances evoke emotions and memories, making this experience unforgettable. For a softening, smoothing and nourishing result.",
          },
          tags: ["nutriente", "sensoriale"],
        },
        {
          id: "oud",
          name: { it: "Rituale Oud", en: "Oud Ritual" },
          areas: ["body"],
          duration: { it: "1h", en: "1h" },
          price: eur(110),
          short: {
            it: "Una nuvola orientale dolce e speziata che profuma di Marocco.",
            en: "A sweet, spicy oriental cloud that smells of Morocco.",
          },
          description: {
            it: "Lasciati avvolgere da una nuvola orientale accattivante e innovativo: questo profumo dolce e speziato vi farà volare nei piccoli paesi del Marocco dove la magia invade la mente e dona spensieratezza.",
            en: "Let yourself be wrapped in a captivating, innovative oriental cloud: this sweet, spiced fragrance carries you away to the small towns of Morocco, where magic fills the mind and brings pure lightheartedness.",
          },
          tags: ["sensoriale", "nutriente"],
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
    name: { it: "Massaggio Hawaiano Lomi Lomi Nui", en: "Hawaiian Lomi Lomi Nui Massage" },
    duration: { it: "1h", en: "1h" },
    price: eur(100),
    short: {
      it: "L'antico massaggio polinesiano per un benessere assoluto e un senso di rinnovamento.",
      en: "The ancient Polynesian massage for absolute wellbeing and a sense of renewal.",
    },
    description: {
      it: "Nasce come rituale sacro. Quattro sono gli elementi fondamentali: il respiro, la danza, il tocco e la musica. Da questo massaggio traggono beneficio non solo la muscolatura e le articolazioni, ma anche il sistema linfatico, circolatorio, respiratorio e digestivo. Anche detto: il massaggio d'amore e dell'anima.",
      en: "Born as a sacred ritual, built on four essential elements: breath, dance, touch and music. This massage benefits not only the muscles and joints, but also the lymphatic, circulatory, respiratory and digestive systems. Also known as: the massage of love and the soul.",
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
          name: { it: "Massaggio Bioemozionale", en: "Bioemotional Massage" },
          duration: { it: "1h", en: "1h" },
          price: eur(100),
          short: {
            it: "Riscopri il piacere del tocco e il tuo sé corporeo.",
            en: "Rediscover the pleasure of touch and your bodily self.",
          },
          description: {
            it: "Un massaggio speciale che invita ad ascoltarsi nel profondo, rallentando il ritmo del respiro. Un tocco estremamente empatico, che accompagna corpo e mente verso un rilassamento autentico.",
            en: "A special massage that invites you to listen to yourself deeply, slowing the rhythm of your breath. An extremely empathetic touch that guides body and mind towards authentic relaxation.",
          },
          tags: ["relax", "sensoriale"],
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
            it: "Unico nel suo genere: una calda pioggia che scende sul corpo si unisce al burro di karité nutriente e a quattro mani avvolgenti che massaggiano il corpo come una danza continua che calmerà la mente, toglierà tensione per un rilassamento totale.",
            en: "One of a kind: warm rainfall on the body joins nourishing shea butter and four enveloping hands that massage the body like a continuous dance, calming the mind and releasing tension for total relaxation.",
          },
          tags: ["relax", "nutriente"],
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
    name: {
      it: "Massaggio di Coppia Aromatico Morjana",
      en: "Morjana Aromatic Couple Massage",
    },
    duration: { it: "1h", en: "1h" },
    price: eur(160),
    short: {
      it: "Condividi il piacere di un massaggio con chi ami.",
      en: "Share the pleasure of a massage with someone you love.",
    },
    description: {
      it: "Condividi il piacere di un massaggio con la persona che ami, un'amica o un familiare.",
      en: "Share the pleasure of a massage with the person you love, a friend or a family member.",
    },
    tags: ["coppia", "relax", "sensoriale"],
  },
  groups: [
    {
      id: "coppia-percorsi",
      title: {
        it: "Percorsi per due nella Thalatepee",
        en: "Journeys for two in the Thalatepee",
      },
      subtitle: {
        it: "Purificazione, calore e rituali condivisi, tutti vissuti all'interno della Thalatepee.",
        en: "Shared purification, warmth and rituals, all enjoyed inside the Thalatepee.",
      },
      treatments: [
        {
          id: "hammam-plantare-coppia",
          name: {
            it: "Percorso Hammam per due con Massaggio Plantare",
            en: "Hammam journey for two with Foot Reflexology",
          },
          duration: { it: "1h e 30min", en: "1h 30min" },
          price: eur(200),
          short: {
            it: "Purificazione ai vapori e massaggio plantare, insieme.",
            en: "Vapour purification and foot reflexology, together.",
          },
          description: {
            it: "Antico rituale di purificazione condiviso: i vapori liberano il corpo, seguiti da un massaggio plantare.",
            en: "An ancient shared purification ritual: the vapours release the body, followed by a foot reflexology massage.",
          },
          tags: ["coppia", "purificante", "relax"],
        },
        {
          id: "termale-romano-morjana-coppia",
          name: {
            it: "Percorso Termale Romano con Massaggio Aromatico Morjana",
            en: "Roman Thermal Journey with Morjana Aromatic Massage",
          },
          duration: { it: "2h e 30min", en: "2h 30min" },
          short: {
            it: "Pacchetto coppia: percorso termale e massaggio aromatico Morjana.",
            en: "Couple package: thermal journey and Morjana aromatic massage.",
          },
          description: {
            it: "L'esperienza completa: il percorso termale romano seguito dal massaggio aromatico Morjana, tra fragranze avvolgenti e suggestioni d'Oriente, per un momento di benessere assoluto da vivere in due.",
            en: "The complete experience: the Roman thermal journey followed by the Morjana aromatic massage, with enveloping fragrances and echoes of the Orient, for a moment of absolute wellbeing to share.",
          },
          price: eur(280),
          tags: ["coppia", "relax", "sensoriale"],
        },
        {
          id: "dolcezza-coppia",
          name: {
            it: "Rituale Dolcezza Orientale di Coppia",
            en: "Oriental Sweetness Couple Ritual",
          },
          duration: { it: "1h", en: "1h" },
          price: eur(140),
          short: {
            it: "Un letto soffice e i profumi dei campi di primavera, in due.",
            en: "A soft bed and the scents of spring fields, for two.",
          },
          description: {
            it: "Un rituale da vivere in due, accolti da un soffice letto scaldato dal sole e avvolti dai profumi dei campi in primavera. Gesti delicati levigano la pelle, la liberano dalle impurità e la lasciano nutrita e luminosa, mentre corpo e mente si abbandonano a un profondo relax condiviso.",
            en: "A ritual to share, welcomed by a soft bed warmed by the sun and wrapped in the scents of spring fields. Gentle gestures smooth the skin, free it from impurities and leave it nourished and radiant, while body and mind surrender to deep relaxation together.",
          },
          tags: ["coppia", "sensoriale", "nutriente"],
        },
      ],
    },
    {
      id: "coppia-massaggi",
      title: { it: "Massaggi per due", en: "Massages for two" },
      subtitle: {
        it: "Fianco a fianco, nello stesso profumo e nello stesso tempo.",
        en: "Side by side, in the same scent and the same time.",
      },
      treatments: [
        {
          id: "candle-coppia",
          name: { it: "Candle Massage per due", en: "Candle Massage for two" },
          duration: { it: "55min", en: "55 min" },
          price: eur(180),
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
          id: "schiena-verbena-coppia",
          name: {
            it: "Massaggio Aromatico alla Schiena per due",
            en: "Aromatic Back Massage for two",
          },
          duration: { it: "40min", en: "40 min" },
          price: eur(115),
          short: {
            it: "Olio essenziale di verbena, calmante e riequilibrante.",
            en: "Calming, balancing verbena essential oil.",
          },
          description: {
            it: "Un massaggio decontratturante e distensivo con olio essenziale di verbena dall'azione calmante e riequilibrante, che dona una piacevole sensazione di serenità. Da condividere.",
            en: "A muscle-relaxing and soothing massage with calming, rebalancing verbena essential oil, bringing a pleasant sense of serenity. To be shared.",
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
    duration: { it: "1h e 5min", en: "1h 5min" },
    price: eur(110),
    priceTiers: [
      { label: TIER_SINGLE, price: eur(110) },
      { label: TIER_COUPLE, price: eurCouple(120) },
      { label: TIER_3_6, price: eurPerson(60) },
    ],
    short: {
      it: "Sauna e bagno turco insieme, in quattro fasi ispirate alle antiche terme romane.",
      en: "Sauna and Turkish bath together, in four phases inspired by ancient Roman baths.",
    },
    description: {
      it: "Ricrea l'antico percorso termale romano combinando bagno turco e sauna in quattro fasi: tepidarium, calidarium, laconicum e frigidarium. La temperatura sale gradualmente da 43° a 48°, per poi tornare al fresco del frigidarium, che simula la piscina a 10° in cui i Romani si immergevano al termine del percorso. Un'esperienza completa di purificazione e relax.",
      en: "It recreates the ancient Roman thermal journey by combining a Turkish bath and sauna in four phases: tepidarium, calidarium, laconicum and frigidarium. The temperature gradually rises from 43°C to 48°C, then returns to the cool frigidarium, simulating the 10°C pool in which Romans immersed themselves at the end of the journey. A complete purification and relaxation experience.",
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
          temperature: { it: "43° max", en: "43°C max" },
          price: eur(110),
          priceTiers: [
            { label: TIER_SINGLE, price: eur(110) },
            { label: TIER_COUPLE, price: eurCouple(120) },
            { label: TIER_3_6, price: eurPerson(60) },
          ],
          short: {
            it: "Il percorso termale in versione ridotta, articolato in tre fasi di purificazione.",
            en: "A shorter thermal journey, arranged in three purification phases.",
          },
          description: {
            it: "Una versione ridotta del percorso termale, sviluppata in tre fasi. I vapori a diverse temperature favoriscono la sudorazione, la detersione e una profonda sensazione di leggerezza.",
            en: "A shorter version of the thermal journey, developed in three phases. Vapours at different temperatures encourage perspiration, cleansing and a deep sense of lightness.",
          },
          tags: ["purificante", "detox"],
        },
        {
          id: "sauna",
          name: { it: "Sauna", en: "Sauna" },
          temperature: { it: "70° max", en: "70°C max" },
          price: eur(60),
          sessionModes: [
            {
              label: { it: "In gruppo", en: "In a group" },
              duration: { it: "15 min", en: "15 min" },
              note: { it: "Senza operatore", en: "Without therapist" },
            },
            {
              label: { it: "Da soli", en: "Alone" },
              duration: { it: "15 min", en: "15 min" },
            },
          ],
          priceTiers: [
            { label: TIER_SINGLE, price: eur(60) },
            { label: TIER_2_4, price: eurPerson(50) },
            { label: TIER_5_6, price: eurPerson(45) },
          ],
          short: {
            it: "Sudorazione profonda e rilassamento muscolare nel calore secco.",
            en: "Deep sweating and muscle relaxation in dry heat.",
          },
          description: {
            it: "Favorisce un'abbondante sudorazione con evidenti risultati di rilassamento sulla muscolatura.",
            en: "Promotes abundant sweating with evident muscle relaxation results.",
          },
          tags: ["detox", "relax"],
        },
        {
          id: "biosauna",
          name: { it: "Bio Sauna", en: "Bio Sauna" },
          temperature: { it: "50° max", en: "50°C max" },
          price: eur(60),
          sessionModes: [
            {
              label: { it: "In gruppo", en: "In a group" },
              duration: { it: "30 min", en: "30 min" },
              note: { it: "Senza operatore", en: "Without therapist" },
            },
            {
              label: { it: "Da soli", en: "Alone" },
              duration: { it: "30 min", en: "30 min" },
              note: {
                it: "Trattamento detox potenziato con operatore",
                en: "Enhanced detox treatment with therapist",
              },
            },
          ],
          priceTiers: [
            { label: TIER_SINGLE, price: eur(60) },
            { label: TIER_DETOX_BIO, price: eur(155) },
            { label: TIER_2_4, price: eurPerson(50) },
            { label: TIER_5_6, price: eurPerson(45) },
          ],
          short: {
            it: "Il calore della sauna a temperature più basse e avvolgenti.",
            en: "The warmth of the sauna at lower, more enveloping temperatures.",
          },
          description: {
            it: "Il calore più dolce rispetto alla sauna tradizionale favorisce la sudorazione e il rilassamento muscolare. Nella modalità singola detox diventa un vero trattamento potenziato con operatore e prodotti eubiotici, per intensificarne l'azione depurativa.",
            en: "Gentler heat than a traditional sauna encourages perspiration and muscle relaxation. In the single detox mode, it becomes a fully enhanced treatment with a therapist and eubiotic products, intensifying its purifying action.",
          },
          relatedLink: {
            label: {
              it: "Scopri il Talaterm Fangogel",
              en: "Discover Talaterm Mud-gel",
            },
            path: "/estetica/corpo#talaterm-fango-depurativo",
          },
          tags: ["relax", "detox"],
        },
        {
          id: "bagno-turco",
          name: { it: "Bagno turco", en: "Turkish bath" },
          temperature: { it: "46°", en: "46°C" },
          price: eur(60),
          sessionModes: [
            {
              label: { it: "In gruppo", en: "In a group" },
              duration: { it: "30 min", en: "30 min" },
              note: { it: "Senza operatore", en: "Without therapist" },
            },
            {
              label: { it: "Da soli", en: "Alone" },
              duration: { it: "30 min", en: "30 min" },
              note: {
                it: "Trattamento detox potenziato con operatore",
                en: "Enhanced detox treatment with therapist",
              },
            },
          ],
          priceTiers: [
            { label: TIER_SINGLE, price: eur(60) },
            { label: TIER_DETOX, price: eur(155) },
            { label: TIER_2_4, price: eurPerson(50) },
            { label: TIER_5_6, price: eurPerson(45) },
          ],
          short: {
            it: "Un trattamento di vapore dolce, adatto a ogni età e ideale in abbinamento ad altri trattamenti.",
            en: "A gentle steam treatment for every age, ideal in combination with other treatments.",
          },
          description: {
            it: "Un trattamento ancora poco conosciuto ma ricco di benefici: il vapore favorisce la sudorazione, aiuta a eliminare liquidi e tossine e distende la muscolatura. È indicato dai bambini agli anziani ed è ottimo in combinazione con altri trattamenti. Nella modalità singola detox viene potenziato da un operatore con prodotti eubiotici.",
            en: "A still little-known treatment with many benefits: steam encourages perspiration, helps eliminate fluids and toxins, and relaxes the muscles. It is suitable from children to older adults and works especially well alongside other treatments. In the single detox mode, it is enhanced by a therapist using eubiotic products.",
          },
          relatedLink: {
            label: {
              it: "Scopri il Talaterm Fangogel",
              en: "Discover Talaterm Mud-gel",
            },
            path: "/estetica/corpo#talaterm-fango-depurativo",
          },
          tags: ["detox", "purificante", "relax"],
        },
        {
          id: "banja-russa",
          name: { it: "Banja russa", en: "Russian Banja" },
          duration: { it: "30min", en: "30 min" },
          temperature: { it: "65° max", en: "65°C max" },
          price: eur(60),
          priceTiers: [
            { label: TIER_SINGLE, price: eur(60) },
            { label: TIER_2_4, price: eurPerson(50) },
            { label: TIER_5_6, price: eurPerson(45) },
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
          price: eur(60),
          priceTiers: [
            { label: TIER_SINGLE, price: eur(60) },
            { label: TIER_2_4, price: eurPerson(50) },
            { label: TIER_5_6, price: eurPerson(45) },
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

/** True for "starting from" prices, whose final amount depends on the choices made in salon. */
export function isOpenEndedPrice(value: string): boolean {
  return /^(da|from)\s/i.test(value.trim());
}

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
    if (category.featured?.id === id) return category.featured;
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
