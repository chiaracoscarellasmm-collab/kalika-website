import type { Locale } from "./i18n";
import { giftCardValidityMonths, MIN_GIFT_CARD_AMOUNT } from "./giftcard";

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
  thanks: {
    title: string;
    subtitle: string;
    body: string;
    codeLabel: string;
    copyCode: string;
    copied: string;
    toLabel: string;
    valueLabel: string;
    treatmentLabel: string;
    validUntilLabel: string;
    downloadNote: string;
    downloadAgain: string;
    emailNote: string;
    bookingNote: string;
    backHome: string;
    errorTitle: string;
    errorBody: string;
    errorContact: string;
  };
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
    customAmountWarning: `L'importo libero deve essere almeno €${MIN_GIFT_CARD_AMOUNT}.`,
    frontGiftCardLabel: "Gift Card",
    backPreviewLabel: "Anteprima",
    frontPlaceholderMessage: "Il tuo messaggio personalizzato comparirà qui.",
    backMotto:
      "Prenditi cura di te: è il gesto più prezioso che tu possa farti.",
    thanks: {
      title: "Grazie!",
      subtitle: "Il tuo regalo è pronto.",
      body: "L'acquisto è andato a buon fine e la Gift Card è stata generata.",
      codeLabel: "Codice gift card",
      copyCode: "Copia codice",
      copied: "Copiato!",
      toLabel: "Destinatario",
      valueLabel: "Valore",
      treatmentLabel: "Trattamento",
      validUntilLabel: "Valida fino al",
      downloadNote:
        "Il PDF è stato scaricato automaticamente e si trova nella cartella Download.",
      downloadAgain: "Scarica di nuovo il PDF",
      emailNote:
        "Una copia della Gift Card è stata inviata anche via email a {email}.",
      bookingNote:
        `Presenta questo codice in centro per prenotare il trattamento. La Gift Card è valida ${giftCardValidityMonths} mesi dalla data di acquisto.`,
      backHome: "Torna alla home",
      errorTitle: "Qualcosa non è andato come previsto",
      errorBody:
        "Non siamo riusciti a trovare la Gift Card associata a questo pagamento. Se hai appena completato l'acquisto, riprova tra qualche istante oppure contattaci: ti aiuteremo subito.",
      errorContact: "Contattaci su WhatsApp",
    },
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
    customAmountWarning: `Custom amount must be at least €${MIN_GIFT_CARD_AMOUNT}.`,
    frontGiftCardLabel: "Gift Card",
    backPreviewLabel: "Preview",
    frontPlaceholderMessage: "Your custom message will appear here.",
    backMotto:
      "Take care of yourself — it's the most precious gift you can give.",
    thanks: {
      title: "Thank you!",
      subtitle: "Your gift is ready.",
      body: "Your payment was successful and the Gift Card has been created.",
      codeLabel: "Gift card code",
      copyCode: "Copy code",
      copied: "Copied!",
      toLabel: "Recipient",
      valueLabel: "Value",
      treatmentLabel: "Treatment",
      validUntilLabel: "Valid until",
      downloadNote:
        "The PDF was downloaded automatically and is in your Downloads folder.",
      downloadAgain: "Download the PDF again",
      emailNote:
        "A copy of the Gift Card has also been sent by email to {email}.",
      bookingNote:
        `Present this code at the centre to book the treatment. The Gift Card is valid for ${giftCardValidityMonths} months from the purchase date.`,
      backHome: "Back to home",
      errorTitle: "Something didn't go as planned",
      errorBody:
        "We couldn't find the Gift Card for this payment. If you just completed the purchase, please try again in a moment or contact us — we'll help you right away.",
      errorContact: "Contact us on WhatsApp",
    },
  },
};

export function getGiftCardUi(locale: Locale): GiftCardUiCopy {
  return copy[locale];
}
