import type { Locale } from "./i18n";

export type GiftCardUiCopy = {
  heroOverline: string;
  heroTitle: string;
  heroSubtitle: string;
  frontTagline: string;
  backOverline: string;
  backTitle: string;
  codeLabel: string;
  codePending: string;
  detailsTitle: string;
  previewFrontGiftCard: string;
  summaryDesign: string;
  summaryAmount: string;
  summaryTreatment: string;
  summaryValue: string;
  summaryFrom: string;
  summaryTo: string;
  summaryPurchaseDate: string;
  summaryExpiryDate: string;
  validationWarning: string;
  customAmountWarning: string;
  frontGiftCardLabel: string;
  backPreviewLabel: string;
  frontPlaceholderMessage: string;
  /** Brand motto printed on the back of every gift card. */
  backMotto: string;
};

const copy: Record<Locale, GiftCardUiCopy> = {
  it: {
    heroOverline: "Regala un momento Kalika",
    heroTitle: "Un dono che non si dimentica.",
    heroSubtitle:
      "Gift Card per trattamenti estetici, rituali SPA e percorsi benessere a Prata di Pordenone. Personalizzata, digitale e disponibile subito. Il regalo perfetto per chi ami.",
    frontTagline: "Un dono che non si dimentica.",
    backOverline: "Retro Gift Card",
    backTitle: "Dettagli del regalo",
    codeLabel: "Codice",
    codePending: "Al pagamento",
    detailsTitle: "Anteprima",
    previewFrontGiftCard: "Gift Card",
    summaryDesign: "Design scelto",
    summaryAmount: "Importo",
    summaryTreatment: "Trattamento",
    summaryValue: "Valore",
    summaryFrom: "Da",
    summaryTo: "A",
    summaryPurchaseDate: "Data di acquisto",
    summaryExpiryDate: "Valida fino al",
    validationWarning: "Completa tutti i campi per procedere al pagamento.",
    customAmountWarning: "L'importo libero deve essere almeno €20.",
    frontGiftCardLabel: "Gift Card",
    backPreviewLabel: "Anteprima",
    frontPlaceholderMessage: "Il tuo messaggio personalizzato comparirà qui.",
    backMotto:
      "Prenditi cura di te: è il gesto più prezioso che tu possa farti.",
  },
  en: {
    heroOverline: "Gift a Kalika moment",
    heroTitle: "A gift that won't be forgotten.",
    heroSubtitle:
      "Gift Cards for beauty treatments, SPA rituals and wellness journeys in Prata di Pordenone. Personalised, digital and available instantly. The perfect gift for someone you love.",
    frontTagline: "A gift that won't be forgotten.",
    backOverline: "Gift Card back",
    backTitle: "Gift details",
    codeLabel: "Code",
    codePending: "At checkout",
    detailsTitle: "Preview",
    previewFrontGiftCard: "Gift Card",
    summaryDesign: "Selected design",
    summaryAmount: "Amount",
    summaryTreatment: "Treatment",
    summaryValue: "Value",
    summaryFrom: "From",
    summaryTo: "To",
    summaryPurchaseDate: "Purchase date",
    summaryExpiryDate: "Valid until",
    validationWarning: "Complete all fields to proceed to payment.",
    customAmountWarning: "Custom amount must be at least €20.",
    frontGiftCardLabel: "Gift Card",
    backPreviewLabel: "Preview",
    frontPlaceholderMessage: "Your custom message will appear here.",
    backMotto:
      "Take care of yourself: it's the most precious thing you can do for you.",
  },
};

export function getGiftCardUi(locale: Locale): GiftCardUiCopy {
  return copy[locale];
}
