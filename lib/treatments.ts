import type { Locale } from "./i18n";

export type Bilingual = { it: string; en: string };

export type Treatment = {
  id: string;
  name: Bilingual;
  duration?: Bilingual;
  description?: Bilingual;
  temperature?: Bilingual;
};

export type TreatmentGroup = {
  id: string;
  title: Bilingual;
  treatments: Treatment[];
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

// ── ESTETICA ─────────────────────────────────────────────────────────────────

export const visoGroups: TreatmentGroup[] = [
  {
    id: "viso-tutti",
    title: { it: "Trattamenti viso", en: "Facial treatments" },
    treatments: [
      { id: "pulizia-viso", name: { it: "Pulizia del viso", en: "Facial cleansing" } },
      { id: "trattamento-personalizzato", name: { it: "Trattamento personalizzato", en: "Tailored treatment" } },
      { id: "ristrutturazione", name: { it: "Trattamento ristrutturazione", en: "Restructuring treatment" } },
      { id: "talaterm-fangogel", name: { it: "Talaterm fangogel depurante", en: "Talaterm purifying mud-gel" } },
      { id: "talaterm-antirughe", name: { it: "Talaterm decontratturante antirughe", en: "Talaterm anti-wrinkle relaxing" } },
      { id: "sinerplus", name: { it: "Trattamento Sinerplus", en: "Sinerplus treatment" } },
      { id: "antiaging-viso", name: { it: "Antiaging viso", en: "Facial antiaging" } },
    ],
  },
];

export const corpoGroups: TreatmentGroup[] = [
  {
    id: "corpo-completi",
    title: { it: "Trattamenti completi", en: "Full body treatments" },
    treatments: [
      { id: "pulizia-profonda-corpo", name: { it: "Pulizia profonda corpo", en: "Deep body cleansing" } },
      { id: "pulizia-profonda-biosauna", name: { it: "Pulizia profonda in biosauna", en: "Deep cleansing in biosauna" } },
      { id: "talaterm-fango-depurativo", name: { it: "Talaterm fango gel depurativo", en: "Talaterm purifying mud-gel" } },
      { id: "talaterm-caldo-freddo", name: { it: "Talaterm fango gel caldo / freddo", en: "Talaterm hot / cold mud-gel" } },
      { id: "ristrutturazione-barriera", name: { it: "Ristrutturazione della barriera di permeabilità", en: "Permeability barrier restructuring" } },
      { id: "talaplus", name: { it: "Talaplus", en: "Talaplus" } },
      { id: "body-reset", name: { it: "Body reset", en: "Body reset" } },
      { id: "olistico", name: { it: "Trattamento olistico", en: "Holistic treatment" } },
    ],
  },
  {
    id: "corpo-localizzati",
    title: { it: "Trattamenti localizzati", en: "Targeted treatments" },
    treatments: [
      { id: "cuoio-capelluto-spa", name: { it: "Cuoio capelluto in SPA", en: "Scalp treatment in SPA" } },
      { id: "pulizia-schiena", name: { it: "Pulizia schiena", en: "Back cleansing" } },
      { id: "gambe", name: { it: "Gambe", en: "Legs" } },
      { id: "seno", name: { it: "Seno", en: "Bust" } },
      { id: "pancia-piatta", name: { it: "Metodo Pancia Piatta", en: "Flat-belly method" } },
      { id: "gambe-leggere", name: { it: "Gambe leggere", en: "Light legs" } },
    ],
  },
];

export const massaggiGroups: TreatmentGroup[] = [
  {
    id: "massaggi-rilassanti",
    title: { it: "Massaggi rilassanti", en: "Relaxing massages" },
    treatments: [
      { id: "rilassante", name: { it: "Rilassante", en: "Relaxing" } },
      { id: "drenante", name: { it: "Drenante", en: "Lymphatic drainage" } },
      { id: "sinergico", name: { it: "Sinergico", en: "Synergic" } },
      { id: "riflessologia-plantare", name: { it: "Riflessologia plantare", en: "Foot reflexology" } },
      { id: "riflessologia-corporea", name: { it: "Riflessologia corporea", en: "Body reflexology" } },
    ],
  },
  {
    id: "massaggi-speciali",
    title: { it: "Momenti speciali", en: "Special moments" },
    treatments: [
      { id: "massaggio-kalika", name: { it: "Massaggio Kalika", en: "Kalika massage" } },
      { id: "hot-stone", name: { it: "Hot Stone", en: "Hot Stone" } },
      { id: "gravidanza", name: { it: "Massaggio in gravidanza", en: "Pregnancy massage" } },
      { id: "mamma-bambino", name: { it: "Massaggio mamma e bambino", en: "Mother & child massage" } },
      { id: "bambini-ragazzi", name: { it: "Massaggio bambini e ragazzi", en: "Children & teens massage" } },
      { id: "due-spa", name: { it: "Massaggio per due in SPA", en: "Massage for two in SPA" } },
    ],
  },
  {
    id: "massaggi-localizzati",
    title: { it: "Massaggi localizzati", en: "Targeted massages" },
    treatments: [
      { id: "decontratturante-schiena", name: { it: "Decontratturante schiena", en: "Back relaxing" } },
      { id: "relax-mani", name: { it: "Relax mani", en: "Hand relax" } },
      { id: "relax-piedi", name: { it: "Relax piedi", en: "Foot relax" } },
      { id: "testa-cuoio-capelluto", name: { it: "Testa e cuoio capelluto", en: "Head & scalp" } },
    ],
  },
];

export const maniPiediGroups: TreatmentGroup[] = [
  {
    id: "mani",
    title: { it: "Servizi mani", en: "Hand services" },
    treatments: [
      { id: "manicure", name: { it: "Manicure", en: "Manicure" } },
      { id: "manicure-semi", name: { it: "Manicure con semipermanente", en: "Manicure with gel polish" } },
      { id: "semipermanente", name: { it: "Semipermanente", en: "Gel polish" } },
      { id: "rimozione-semi", name: { it: "Rimozione singola semipermanente", en: "Gel polish removal" } },
      { id: "ristrutturazione-mani", name: { it: "Ristrutturazione mani", en: "Hand restructuring" } },
    ],
  },
  {
    id: "piedi",
    title: { it: "Servizi piedi", en: "Foot services" },
    treatments: [
      { id: "pedicure-estetico", name: { it: "Pedicure estetico", en: "Cosmetic pedicure" } },
      { id: "pedicure-intensivo", name: { it: "Pedicure intensivo", en: "Intensive pedicure" } },
      { id: "pedicure-estetico-semi", name: { it: "Pedicure estetico con semipermanente", en: "Cosmetic pedicure with gel polish" } },
      { id: "pedicure-curativo-semi", name: { it: "Pedicure curativo con semipermanente", en: "Curative pedicure with gel polish" } },
      { id: "ristrutturazione-piedi", name: { it: "Ristrutturazione piedi", en: "Foot restructuring" } },
      { id: "ristrutturazione-abbinata", name: { it: "Ristrutturazione abbinata", en: "Combined restructuring" } },
    ],
  },
];

export const epilazioneGroups: TreatmentGroup[] = [
  {
    id: "epilazione-tradizionale",
    title: { it: "Epilazione tradizionale", en: "Traditional waxing" },
    treatments: [
      { id: "tradizionale-donna", name: { it: "Donna · viso e corpo", en: "Women · face & body" } },
      { id: "tradizionale-uomo", name: { it: "Uomo · viso e corpo", en: "Men · face & body" } },
    ],
  },
  {
    id: "coco-cera",
    title: { it: "Coco Cera", en: "Coco Cera" },
    treatments: [
      { id: "coco-donna-viso", name: { it: "Donna · viso", en: "Women · face" } },
      { id: "coco-donna-corpo", name: { it: "Donna · corpo", en: "Women · body" } },
      { id: "coco-uomo-viso", name: { it: "Uomo · viso", en: "Men · face" } },
      { id: "coco-uomo-corpo", name: { it: "Uomo · corpo", en: "Men · body" } },
    ],
  },
  {
    id: "laser-808",
    title: { it: "Laser Diodo 808", en: "Diode Laser 808" },
    treatments: [
      { id: "laser-baffetti", name: { it: "Baffetti", en: "Upper lip" } },
      { id: "laser-mento", name: { it: "Mento", en: "Chin" } },
      { id: "laser-ascelle", name: { it: "Ascelle", en: "Underarms" } },
      { id: "laser-inguine", name: { it: "Inguine totale", en: "Brazilian" } },
      { id: "laser-gambe-complete", name: { it: "Gambe complete", en: "Full legs" } },
      { id: "laser-mezza-gamba", name: { it: "Mezza gamba", en: "Half leg" } },
      { id: "laser-braccia", name: { it: "Braccia", en: "Arms" } },
      { id: "laser-schiena", name: { it: "Schiena", en: "Back" } },
      { id: "laser-torace", name: { it: "Torace", en: "Chest" } },
    ],
  },
];

export const sopraccigliaGroups: TreatmentGroup[] = [
  {
    id: "sguardo",
    title: { it: "Sguardo", en: "Eyes" },
    treatments: [
      { id: "colorazione-modellamento", name: { it: "Colorazione e modellamento sopracciglia", en: "Brow tint & shaping" } },
      { id: "laminazione", name: { it: "Laminazione ciglia o sopracciglia con cheratina", en: "Lash or brow lamination with keratin" } },
    ],
  },
  {
    id: "make-up",
    title: { it: "Make Up", en: "Make-up" },
    treatments: [
      { id: "trucco", name: { it: "Trucco", en: "Make-up" } },
      { id: "trucco-sposa", name: { it: "Trucco sposa con prove", en: "Bridal make-up with trials" } },
    ],
  },
];

// ── SPA ──────────────────────────────────────────────────────────────────────

export const rituali: Treatment[] = [
  {
    id: "dolcezza-orientale",
    name: { it: "Dolcezza Orientale", en: "Oriental Sweetness" },
    duration: { it: "25min", en: "25 min" },
    description: {
      it: "Rituale che conduce ad un magnifico e soffice letto scaldato dal sole e deliziato dai profumi dei campi di primavera.",
      en: "A ritual that leads to a magnificent, soft bed warmed by the sun and scented with the fragrances of spring fields.",
    },
  },
  { id: "rio-de-janeiro", name: { it: "Viaggio a Rio de Janeiro", en: "Journey to Rio de Janeiro" } },
  { id: "cancun", name: { it: "Viaggio a Cancun", en: "Journey to Cancun" } },
  { id: "bali", name: { it: "Viaggio a Bali", en: "Journey to Bali" } },
  { id: "marrakech", name: { it: "Viaggio a Marrakech", en: "Journey to Marrakech" } },
  {
    id: "savonage",
    name: { it: "Savonage Profumato", en: "Scented Savonage" },
    duration: { it: "1h e 10min", en: "1h 10min" },
    description: {
      it: "Rituale di pulizia con il sapone, tipico della tradizione berbera, che dona un corpo morbido e profumato. Per eliminare le cellule morte, purificare i pori della pelle, stimolare la circolazione sanguigna, ossigenare la pelle e prepararla alla depilazione.",
      en: "A cleansing ritual with soap, typical of Berber tradition, leaving the body soft and fragrant. To remove dead cells, purify skin pores, stimulate blood circulation, oxygenate the skin and prepare it for hair removal.",
    },
  },
  {
    id: "hammam",
    name: { it: "Hammam", en: "Hammam" },
    duration: { it: "1h", en: "1h" },
    description: {
      it: "Rituale della purificazione dove il sapone nero esfoliante diventa protagonista, eliminando cellule morte ed impurità per far respirare nuovamente il corpo e vivere un'incredibile e profonda sensazione di leggerezza e benessere. Per eliminare le cellule morte, purificare i pori della pelle, stimolare la circolazione sanguigna, ossigenare la pelle e prepararla alla depilazione.",
      en: "A purification ritual where exfoliating black soap takes centre stage, removing dead cells and impurities so the body can breathe again and experience a profound sense of lightness and wellbeing. To remove dead cells, purify skin pores, stimulate blood circulation, oxygenate the skin and prepare it for hair removal.",
    },
  },
  { id: "hammam-cuoio", name: { it: "Hammam con cuoio capelluto", en: "Hammam with scalp" } },
  {
    id: "oud",
    name: { it: "Oud", en: "Oud" },
    duration: { it: "1h", en: "1h" },
    description: {
      it: "Rituale caratterizzato da una nuvola orientale accattivante ed un profumo innovativo, dolce e speziato, che fa volare nei piccoli paesi del Marocco, dove la magia invade la mente e dona spensieratezza. Per idratare, nutrire e rilassare, eliminare le cellule morte ed ossigenare la pelle.",
      en: "A ritual characterised by an enchanting oriental atmosphere and an innovative, sweet and spicy fragrance that transports you to the small villages of Morocco, where magic fills the mind and brings lightness. To hydrate, nourish and relax, remove dead cells and oxygenate the skin.",
    },
  },
  {
    id: "seta-sahara",
    name: { it: "La Seta del Sahara", en: "The Silk of the Sahara" },
    duration: { it: "1h e 10min", en: "1h 10min" },
    description: {
      it: "Rituale che rende la pelle fine e setosa come la sabbia che scorre tra le dita. Varie profumazioni evocheranno emozioni e ricordi e renderanno questa esperienza indimenticabile. Per un risultato addolcente, setificante e nutriente.",
      en: "A ritual that leaves the skin fine and silky, like sand flowing between your fingers. Various fragrances evoke emotions and memories, making this experience unforgettable. For a softening, silkifying and nourishing result.",
    },
  },
  {
    id: "vichy",
    name: { it: "Vichy", en: "Vichy" },
    duration: { it: "1h", en: "1h" },
    description: {
      it: "Altamente rilassante e unico nel suo genere, grazie all'azione di una calda pioggia che, scendendo, si sposa al burro nutriente di karité ed incontra quattro mani avvolgenti che massaggiano tutto il corpo.",
      en: "Highly relaxing and unique, thanks to warm rainfall that blends with nourishing shea butter while four enveloping hands massage the entire body.",
    },
  },
  { id: "cioccolato-zenzero", name: { it: "Cioccolato e Zenzero", en: "Chocolate & Ginger" } },
  {
    id: "mille-e-una-notte",
    name: { it: "Le Mille e Una Notte", en: "One Thousand and One Nights" },
    duration: { it: "1h e 50min", en: "1h 50min" },
    description: {
      it: "Rituale in cui tessuti e fragranze deliziosi evocano un mondo meraviglioso nel quale il corpo diventa perfezione. Per idratare, nutrire e rilassare, eliminare le cellule morte ed ossigenare la pelle.",
      en: "A ritual where sumptuous fabrics and delightful fragrances evoke a wondrous world in which the body becomes perfection. To hydrate, nourish and relax, remove dead cells and oxygenate the skin.",
    },
  },
  {
    id: "delizia-oriente",
    name: { it: "Delizia d'Oriente", en: "Delight of the Orient" },
    duration: { it: "1h e 45min", en: "1h 45min" },
    description: {
      it: "Rituale di rilassamento profondo dove, avvolti da delizione e morbide fragranze, si può provare la sensazione di avere la pelle di un bambino e sentirsi meravigliosi. Per eliminare le cellule morte, purificare i pori della pelle e prevenirne l'invecchiamento, rilassare, nutrire e idratare.",
      en: "A deep relaxation ritual where, wrapped in delight and soft fragrances, you can feel as if your skin were a child's again and feel wonderful. To remove dead cells, purify skin pores and prevent ageing, relax, nourish and hydrate.",
    },
  },
  {
    id: "cannella-arancia",
    name: { it: "Speziato Cannella e Arancia", en: "Spiced Cinnamon & Orange" },
    duration: { it: "1h e 35min", en: "1h 35min" },
    description: {
      it: "Rituale dalle proprietà stimolanti e tonificanti, dove il profumo dei deliziosi fiori d'arancio e delle cannella conducono ad un magnifico giardino illuminato dal sole. Per eliminare le cellule morte e le impurità, tonificare e stimolare la pelle, nutrire e rilassare.",
      en: "A stimulating and toning ritual where the scent of orange blossom and cinnamon leads to a magnificent sunlit garden. To remove dead cells and impurities, tone and stimulate the skin, nourish and relax.",
    },
  },
  {
    id: "arancia-miele",
    name: { it: "Dolce Arancia e Miele", en: "Sweet Orange & Honey" },
    duration: { it: "1h e 35min", en: "1h 35min" },
    description: {
      it: "Rituale che va oltre la coccola e fa vivere il fascino di un incantesimo dove il miele, dolce e prezioso nettare, e l'arancio, energizzante e tonificante, avvolgeranno tutto il corpo per un piacere senza tempo. Per eliminare le cellule morte e le impurità, nutrire e riparare la pelle, tonificare e stimolare.",
      en: "A ritual that goes beyond pampering and evokes the charm of a spell where honey, a sweet and precious nectar, and orange, energising and toning, envelop the whole body in timeless pleasure. To remove dead cells and impurities, nourish and repair the skin, tone and stimulate.",
    },
  },
  {
    id: "prezioso-oud",
    name: { it: "Prezioso all'Oud", en: "Precious Oud" },
    duration: { it: "1h e 35min", en: "1h 35min" },
    description: {
      it: "Per viaggiare in luoghi lontani e inebriare l'anima, nutrendo la pelle con il burro di karitè e l'argan e rendervi ancora più affascinanti. Per eliminare le cellule morte e le impurità, nutrire e riparare la pelle.",
      en: "To travel to distant places and intoxicate the soul, nourishing the skin with shea and argan butter and making you even more captivating. To remove dead cells and impurities, nourish and repair the skin.",
    },
  },
  {
    id: "prezioso-ambra",
    name: { it: "Prezioso all'Ambra", en: "Precious Amber" },
    duration: { it: "1h e 40min", en: "1h 40min" },
    description: {
      it: "Rituale meraviglioso che porta in viaggio verso un lussuoso palazzo orientale, fitto di misteriosi e inebrianti profumi di ambra e spezie, alla scoperta di una pelle di seta e silhouette tutte da scoprire. Per eliminare le cellule morte e le impurità, rimineralizzare, nutrire, ammorbidire e tonificare la pelle, eliminando stress e tensioni.",
      en: "A wonderful ritual that takes you on a journey to a luxurious oriental palace, filled with mysterious and intoxicating scents of amber and spices, discovering silk-like skin and a silhouette to be revealed. To remove dead cells and impurities, remineralise, nourish, soften and tone the skin, relieving stress and tension.",
    },
  },
  {
    id: "oud-ambra",
    name: { it: "Oud e Ambra", en: "Oud & Amber" },
    duration: { it: "1h e 30min", en: "1h 30min" },
    description: {
      it: "Rituale che abbina un nuovo profumo orientale, energico e deciso, all'ambra imperiale, per un viaggio sensoriale indimenticabile. Per idratare, nutrire e rilassare, eliminare le cellule morte e donare un tocco antietà al viso.",
      en: "A ritual pairing a new oriental fragrance, energetic and bold, with imperial amber for an unforgettable sensory journey. To hydrate, nourish and relax, remove dead cells and give an anti-ageing touch to the face.",
    },
  },
];

export const massaggiSuite: Treatment[] = [
  {
    id: "goloso",
    name: { it: "Goloso", en: "Goloso" },
    duration: { it: "1h e 10min", en: "1h 10min" },
    description: {
      it: "Rituale rilassante e distensivo con profumi golosi che addolciscono delicatamente tutto il corpo. Per idratare, nutrire, rilassare.",
      en: "A relaxing and unwinding ritual with indulgent fragrances that gently soften the whole body. To hydrate, nourish and relax.",
    },
  },
  {
    id: "candle",
    name: { it: "Candle Massage", en: "Candle Massage" },
    duration: { it: "1h", en: "1h" },
    description: {
      it: "Rituale con burro di karitè al 100% per una piacevole sensazione di protezione e di avvolgente calore donato dalla candela.",
      en: "A ritual with 100% shea butter for a pleasant feeling of protection and enveloping warmth from the candle.",
    },
  },
  {
    id: "bioemozionale",
    name: { it: "Bioemozionale", en: "Bioemotional" },
    duration: { it: "1h", en: "1h" },
    description: {
      it: "Per scoprire il piacere del trattamento e riscoprire, attraverso esso, il proprio sé corporeo.",
      en: "To discover the pleasure of the treatment and rediscover, through it, your own bodily self.",
    },
  },
  {
    id: "lomi-lomi",
    name: { it: "Hawaiano Lomi Lomi Nui", en: "Hawaiian Lomi Lomi Nui" },
    duration: { it: "1h", en: "1h" },
    description: {
      it: "Rituale antico con massaggio polinesiano in grado di regalare benessere quasi assoluto e una fantastica sensazione di rinnovamento.",
      en: "An ancient ritual with Polynesian massage able to deliver near-absolute wellbeing and a wonderful sense of renewal.",
    },
  },
  {
    id: "bubble",
    name: { it: "Bubble Massage", en: "Bubble Massage" },
    duration: { it: "1h", en: "1h" },
    description: {
      it: "Rituale dalle calde bolle scoppiettanti che, in sinergia con il sapone nero dell'eucalipto, donano morbidezza e nutrimento alla pelle. Per idratare, nutrire, rilassare, eliminare le cellule morte ed ossigenare la pelle.",
      en: "A ritual with warm crackling bubbles that, in synergy with eucalyptus black soap, give softness and nourishment to the skin. To hydrate, nourish, relax, remove dead cells and oxygenate the skin.",
    },
  },
];

export const coppia: Treatment[] = [
  { id: "morjana", name: { it: "Massaggio aromatico Morjana", en: "Morjana aromatic massage" } },
  { id: "candle-coppia", name: { it: "Candle massage", en: "Candle massage" } },
  { id: "aromatico-schiena", name: { it: "Massaggio aromatico alla schiena", en: "Aromatic back massage" } },
  { id: "dolcezza-coppia", name: { it: "Rituale Dolcezza Orientale di coppia", en: "Oriental Sweetness ritual for two" } },
];

export const percorsi: TreatmentGroup[] = [
  {
    id: "percorsi-base",
    title: { it: "Percorsi", en: "Journeys" },
    treatments: [
      {
        id: "termale-romano",
        name: { it: "Termale Romano", en: "Roman Thermal" },
        duration: { it: "65min", en: "65 min" },
        temperature: { it: "43°", en: "43°C" },
        description: {
          it: "Suddiviso in quattro fasi a diverse temperatura e umidità. Indicato per la purificazione, è suggerito per gli amanti del relax e per chi si avvicina alla sauna e al bagno turco per la prima volta.",
          en: "Divided into four phases at different temperatures and humidity levels. Recommended for purification, ideal for relaxation lovers and those new to sauna and Turkish bath.",
        },
      },
      {
        id: "termale-romano-soft",
        name: { it: "Termale Romano Soft", en: "Roman Thermal Soft" },
        duration: { it: "60min", en: "60 min" },
        temperature: { it: "40°", en: "40°C" },
        description: {
          it: "Rivisitazione del percorso termale romano, con temperature inferiori che permettono, anche a chi non tollera le alte temperature della sauna, di godere di questa meravigliosa esperienza.",
          en: "A reinterpretation of the Roman thermal journey, with lower temperatures that allow even those who cannot tolerate high sauna temperatures to enjoy this wonderful experience.",
        },
      },
      {
        id: "hammam-purificazione",
        name: { it: "Hammam \"Purificazione\"", en: "Purifying Hammam" },
        duration: { it: "30min", en: "30 min" },
        temperature: { it: "43°", en: "43°C" },
        description: {
          it: "Antico rituale di purificazione e di detersione del corpo, attraverso i vapori di varie temperature che liberano dolcemente gocce di sudore dal corpo.",
          en: "An ancient purification and body cleansing ritual, through vapours at various temperatures that gently release beads of sweat from the body.",
        },
      },
      {
        id: "sauna",
        name: { it: "Sauna", en: "Sauna" },
        duration: {
          it: "15min in gruppo senza operatore / 40min se soli, con operatore",
          en: "15 min in group without operator / 40 min alone with operator",
        },
        temperature: { it: "70° max", en: "70°C max" },
        description: {
          it: "Favorisce un'abbondante sudorazione con evidenti risultati di rilassamento sulla muscolatura. In caso si effettui la sauna da soli verrà abbinato un potenziamento detox.",
          en: "Promotes abundant sweating with evident muscle relaxation results. When taken alone, a detox enhancement is included.",
        },
      },
      {
        id: "biosauna",
        name: { it: "Bio Sauna", en: "Bio Sauna" },
        duration: {
          it: "15min in gruppo senza operatore / 40min se soli, con operatore",
          en: "15 min in group without operator / 40 min alone with operator",
        },
        temperature: { it: "50° max", en: "50°C max" },
        description: {
          it: "Favorisce un'abbondante sudorazione con evidenti risultati di rilassamento sulla muscolatura, a temperature più basse rispetto alla sauna tradizionale. In caso si effettui la bio sauna da soli verrà abbinato un potenziamento detox.",
          en: "Promotes abundant sweating with evident muscle relaxation results, at lower temperatures than traditional sauna. When taken alone, a detox enhancement is included.",
        },
      },
      {
        id: "bagno-turco",
        name: { it: "Bagno turco", en: "Turkish bath" },
        duration: {
          it: "20min in gruppo senza operatore / 55min se soli, con operatore",
          en: "20 min in group without operator / 55 min alone with operator",
        },
        temperature: { it: "46°", en: "46°C" },
        description: {
          it: "Bagno di vapore che permette la sudorazione e l'eliminazione di acqua e sostanze tossiche, con benefici sulla muscolatura per un evidente sensazione di relax. In caso si effettui il bagno turco da soli verrà abbinato un potenziamento rilassante.",
          en: "A steam bath that allows sweating and the elimination of water and toxins, with benefits for the muscles and a clear sense of relaxation. When taken alone, a relaxing enhancement is included.",
        },
      },
      {
        id: "banja-russa",
        name: { it: "Banja russa", en: "Russian Banja" },
        duration: { it: "30min", en: "30 min" },
        temperature: { it: "70° max", en: "70°C max" },
        description: {
          it: "Bagno di vapore ad alta temperatura con umidità bilanciata.",
          en: "High-temperature steam bath with balanced humidity.",
        },
      },
      {
        id: "sauna-romana",
        name: { it: "Sauna romana", en: "Roman Sauna" },
        duration: { it: "30min", en: "30 min" },
        temperature: { it: "48° max", en: "48°C max" },
        description: {
          it: "Ottimo trattamento che coniuga la consistente umidità al caldo secco, per un'intensa sudorazione ed elevata percezione di calore.",
          en: "An excellent treatment combining substantial humidity with dry heat, for intense sweating and a strong sensation of warmth.",
        },
      },
    ],
  },
  {
    id: "percorsi-pacchetti",
    title: { it: "Pacchetti con massaggio", en: "Packages with massage" },
    treatments: [
      { id: "pacchetto-rilassante", name: { it: "Percorso + massaggio rilassante", en: "Journey + relaxing massage" } },
      { id: "pacchetto-schiena", name: { it: "Percorso + massaggio schiena", en: "Journey + back massage" } },
    ],
  },
];
