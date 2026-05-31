import type { Locale } from "./i18n";

export type Bilingual = { it: string; en: string };

export type Treatment = {
  id: string;
  name: Bilingual;
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

export function pick<T extends string | number>(b: Bilingual, locale: Locale): string {
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
  { id: "dolcezza-orientale", name: { it: "Dolcezza Orientale", en: "Oriental Sweetness" } },
  { id: "rio-de-janeiro", name: { it: "Viaggio a Rio de Janeiro", en: "Journey to Rio de Janeiro" } },
  { id: "cancun", name: { it: "Viaggio a Cancun", en: "Journey to Cancun" } },
  { id: "bali", name: { it: "Viaggio a Bali", en: "Journey to Bali" } },
  { id: "marrakech", name: { it: "Viaggio a Marrakech", en: "Journey to Marrakech" } },
  { id: "savonage", name: { it: "Savonage Profumato", en: "Scented Savonage" } },
  { id: "hammam", name: { it: "Hammam", en: "Hammam" } },
  { id: "hammam-cuoio", name: { it: "Hammam con cuoio capelluto", en: "Hammam with scalp" } },
  { id: "oud", name: { it: "Oud", en: "Oud" } },
  { id: "seta-sahara", name: { it: "La Seta del Sahara", en: "The Silk of the Sahara" } },
  { id: "vichy", name: { it: "Vichy", en: "Vichy" } },
  { id: "cioccolato-zenzero", name: { it: "Cioccolato e Zenzero", en: "Chocolate & Ginger" } },
  { id: "mille-e-una-notte", name: { it: "Le Mille e Una Notte", en: "One Thousand and One Nights" } },
  { id: "delizia-oriente", name: { it: "Delizia d'Oriente", en: "Delight of the Orient" } },
  { id: "cannella-arancia", name: { it: "Speziato Cannella e Arancia", en: "Spiced Cinnamon & Orange" } },
  { id: "arancia-miele", name: { it: "Dolce Arancia e Miele", en: "Sweet Orange & Honey" } },
  { id: "prezioso-oud", name: { it: "Prezioso all'Oud", en: "Precious Oud" } },
  { id: "prezioso-ambra", name: { it: "Prezioso all'Ambra", en: "Precious Amber" } },
  { id: "oud-ambra", name: { it: "Oud e Ambra", en: "Oud & Amber" } },
];

export const massaggiSuite: Treatment[] = [
  { id: "goloso", name: { it: "Goloso", en: "Goloso" } },
  { id: "candle", name: { it: "Candle Massage", en: "Candle Massage" } },
  { id: "bioemozionale", name: { it: "Bioemozionale", en: "Bioemotional" } },
  { id: "lomi-lomi", name: { it: "Hawaiano Lomi Lomi Nui", en: "Hawaiian Lomi Lomi Nui" } },
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
      { id: "termale-romano", name: { it: "Termale Romano", en: "Roman Thermal" } },
      { id: "hammam-purificazione", name: { it: "Hammam purificazione", en: "Purifying Hammam" } },
      { id: "sauna-biosauna", name: { it: "Sauna e Biosauna", en: "Sauna & Biosauna" } },
      { id: "bagno-turco", name: { it: "Bagno turco", en: "Turkish bath" } },
      { id: "banja-russa", name: { it: "Banja russa", en: "Russian Banja" } },
      { id: "sauna-romana", name: { it: "Sauna romana", en: "Roman Sauna" } },
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
