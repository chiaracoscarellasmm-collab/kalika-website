import type { Locale } from "./i18n";
import { giftCardValidityMonths } from "./giftcard";

/**
 * Legal content (privacy policy, cookie policy, terms of sale).
 *
 * Kept out of `messages/*.json` on purpose: these are long prose documents,
 * not UI strings. Typing them as `Record<Locale, …>` makes an IT/EN mismatch
 * a compile error instead of a paragraph silently missing in one language.
 *
 * Inline markup supported by <LegalPage>: `**bold**` and `[label](href)`.
 */

/** Company identification — art. 12 D.Lgs. 70/2003, art. 49 Codice del Consumo. */
export const legalEntity = {
  name: "Kalika Nuovaestetica di Carretta Sabina",
  owner: "Carretta Sabina",
  address: "Via C. Battisti 26, int. 1 — 33080 Prata di Pordenone (PN), Italia",
  vat: "01660710938",
  taxCode: "CRRSBN74H59Z133E",
  sdi: "T9K4ZHO",
  pec: "kalikanuovaestetica@legalmail.it",
  email: "info@kalikanuovaestetica.it",
  /** Customer-service line published in the terms of sale. */
  phone: "349 5512967",
} as const;

/** Last substantive revision of the legal texts (ISO date). */
export const legalLastUpdated = "2026-07-31";

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "dl"; items: Array<{ term: string; desc: string }> }
  | { kind: "table"; head: string[]; rows: string[][] };

export type LegalSection = { heading: string; blocks: LegalBlock[] };

export type LegalDoc = {
  title: string;
  subtitle: string;
  intro: string;
  sections: LegalSection[];
};

export type LegalDocKey = "privacy" | "cookie" | "terms";

/** Route segment shared by both locales, as used in the footer and sitemap. */
export const termsPath = "/condizioni-vendita";

const controllerBlock = (locale: Locale): LegalBlock[] =>
  locale === "it"
    ? [
        {
          kind: "dl",
          items: [
            { term: "Titolare", desc: legalEntity.name },
            { term: "Sede legale e operativa", desc: legalEntity.address },
            { term: "Partita IVA", desc: legalEntity.vat },
            { term: "Codice Fiscale", desc: legalEntity.taxCode },
            { term: "Email", desc: `[${legalEntity.email}](mailto:${legalEntity.email})` },
            { term: "PEC", desc: `[${legalEntity.pec}](mailto:${legalEntity.pec})` },
          ],
        },
        {
          kind: "p",
          text: "Non è stato nominato un Responsabile della protezione dei dati (DPO), non ricorrendo i presupposti dell'art. 37 GDPR.",
        },
      ]
    : [
        {
          kind: "dl",
          items: [
            { term: "Data controller", desc: legalEntity.name },
            { term: "Registered and operating office", desc: legalEntity.address },
            { term: "VAT number", desc: legalEntity.vat },
            { term: "Tax code", desc: legalEntity.taxCode },
            { term: "Email", desc: `[${legalEntity.email}](mailto:${legalEntity.email})` },
            { term: "Certified email (PEC)", desc: `[${legalEntity.pec}](mailto:${legalEntity.pec})` },
          ],
        },
        {
          kind: "p",
          text: "No Data Protection Officer has been appointed, as the conditions set out in Art. 37 GDPR do not apply.",
        },
      ];

// ---------------------------------------------------------------------------
// PRIVACY POLICY
// ---------------------------------------------------------------------------

const privacyIt: LegalDoc = {
  title: "Privacy Policy",
  subtitle: "Informativa sul trattamento dei dati personali ai sensi dell'art. 13 GDPR.",
  intro:
    "Questa informativa descrive come trattiamo i dati personali raccolti attraverso il sito **www.kalikanuovaestetica.it**. Riguarda esclusivamente i dati raccolti online: quelli raccolti in istituto sono gestiti separatamente e sono oggetto di un'informativa autonoma.",
  sections: [
    { heading: "1. Titolare del trattamento", blocks: controllerBlock("it") },
    {
      heading: "2. Quali dati raccogliamo e perché",
      blocks: [
        {
          kind: "p",
          text: "Il sito raccoglie dati personali solo quando li fornisci volontariamente. **Non utilizziamo strumenti di analisi statistica, cookie di profilazione, pixel pubblicitari o sistemi di tracciamento di terze parti.**",
        },
        {
          kind: "table",
          head: ["Dati", "Finalità", "Base giuridica", "Conservazione"],
          rows: [
            [
              "Nome, cognome ed email di chi acquista; nome e cognome del destinatario; eventuale messaggio personalizzato",
              "Emissione, invio e gestione della Gift Card acquistata",
              "Esecuzione di un contratto di cui sei parte (art. 6.1.b GDPR)",
              "Per la durata di validità della Gift Card e successivamente per 10 anni, per obblighi fiscali e contabili (art. 2220 c.c.)",
            ],
            [
              "Dati dell'ordine: importo, trattamento scelto, codice seriale, identificativo della sessione di pagamento",
              "Gestione dell'acquisto, assistenza, adempimenti contabili",
              "Esecuzione del contratto (art. 6.1.b) e obbligo di legge (art. 6.1.c GDPR)",
              "10 anni dall'emissione",
            ],
            [
              "Indirizzo IP, data e ora della richiesta, tipo di browser (log tecnici del server)",
              "Erogazione del sito, sicurezza e diagnosi dei malfunzionamenti",
              "Legittimo interesse alla sicurezza dell'infrastruttura (art. 6.1.f GDPR)",
              "Massimo 30 giorni, salvo necessità di accertamento di illeciti",
            ],
            [
              "Numero di telefono e contenuto dei messaggi inviati tramite WhatsApp, telefono o email",
              "Rispondere a richieste di assistenza o di informazioni sui trattamenti",
              "Esecuzione di misure precontrattuali su tua richiesta, o legittimo interesse a fornire assistenza (art. 6.1.b e 6.1.f GDPR)",
              "Per il tempo necessario a gestire la richiesta",
            ],
          ],
        },
        {
          kind: "p",
          text: "Il pulsante WhatsApp presente sul sito apre una conversazione diretta con il nostro numero: il servizio è fornito da **WhatsApp Ireland Limited (Meta)**, che tratta i messaggi come titolare autonomo secondo la propria informativa, consultabile su [whatsapp.com/legal/privacy-policy](https://www.whatsapp.com/legal/privacy-policy). Noi trattiamo il contenuto dei messaggi che ci invii al solo fine di risponderti.",
        },
      ],
    },
    {
      heading: "3. Dati di pagamento",
      blocks: [
        {
          kind: "p",
          text: "I pagamenti sono gestiti interamente da **Stripe**. Al momento del pagamento vieni reindirizzato su una pagina sicura di Stripe: i dati della tua carta vengono inseriti lì e **non transitano mai dai nostri sistemi, né vengono da noi visti o conservati**. Riceviamo da Stripe unicamente la conferma dell'avvenuto pagamento, l'importo e un identificativo della transazione.",
        },
        {
          kind: "p",
          text: "Stripe tratta i dati di pagamento in qualità di titolare autonomo: puoi consultare la sua informativa su [stripe.com/it/privacy](https://stripe.com/it/privacy).",
        },
      ],
    },
    {
      heading: "4. A chi comunichiamo i dati",
      blocks: [
        {
          kind: "p",
          text: "I dati non sono mai diffusi né ceduti o venduti a terzi per finalità di marketing. Sono accessibili unicamente alla titolare e ai fornitori tecnici che ci consentono di erogare il servizio — hosting del sito, elaborazione dei pagamenti, invio delle email transazionali e distribuzione dei contenuti — nei limiti necessari a fornire tali servizi.",
        },
        {
          kind: "p",
          text: "I dati possono inoltre essere comunicati al nostro consulente fiscale per gli adempimenti contabili e all'autorità giudiziaria, se richiesto per legge.",
        },
      ],
    },
    {
      heading: "5. Trasferimenti fuori dall'Unione Europea",
      blocks: [
        {
          kind: "p",
          text: "Alcuni fornitori sopra indicati hanno sede negli Stati Uniti. Il trasferimento avviene sulla base delle **Clausole Contrattuali Standard** approvate dalla Commissione Europea (art. 46 GDPR) e, ove applicabile, dell'adesione al **EU-U.S. Data Privacy Framework**, che garantiscono un livello di protezione adeguato. Puoi richiederci copia delle garanzie adottate scrivendo agli indirizzi indicati al punto 1.",
        },
      ],
    },
    {
      heading: "6. Natura del conferimento",
      blocks: [
        {
          kind: "p",
          text: "Il conferimento dei dati richiesti per l'acquisto di una Gift Card è facoltativo, ma necessario: senza di essi non è possibile emettere la Gift Card né inviartela.",
        },
      ],
    },
    {
      heading: "7. I tuoi diritti",
      blocks: [
        {
          kind: "p",
          text: "In qualsiasi momento puoi esercitare i diritti previsti dagli artt. 15-22 del GDPR:",
        },
        {
          kind: "ul",
          items: [
            "**Accesso**: sapere quali dati trattiamo e ottenerne copia",
            "**Rettifica**: correggere dati inesatti o incompleti",
            "**Cancellazione**: ottenere la rimozione dei dati, nei limiti degli obblighi fiscali di conservazione",
            "**Limitazione**: chiedere la sospensione del trattamento",
            "**Portabilità**: ricevere i dati in formato strutturato e leggibile da dispositivo automatico",
            "**Opposizione**: opporti ai trattamenti fondati sul legittimo interesse",
          ],
        },
        {
          kind: "p",
          text: `Per esercitarli scrivi a [${legalEntity.email}](mailto:${legalEntity.email}) o a [${legalEntity.pec}](mailto:${legalEntity.pec}). Risponderemo entro 30 giorni.`,
        },
        {
          kind: "p",
          text: "Se ritieni che il trattamento violi la normativa, hai diritto di proporre reclamo al **Garante per la protezione dei dati personali** ([garanteprivacy.it](https://www.garanteprivacy.it)) o di ricorrere all'autorità giudiziaria.",
        },
      ],
    },
    {
      heading: "8. Assenza di profilazione",
      blocks: [
        {
          kind: "p",
          text: "Non effettuiamo profilazione né processi decisionali automatizzati che producano effetti giuridici sulla tua persona (art. 22 GDPR). Non inviamo comunicazioni commerciali a chi non le abbia espressamente richieste.",
        },
      ],
    },
    {
      heading: "9. Ambito di questa informativa",
      blocks: [
        {
          kind: "p",
          text: "Questa informativa riguarda esclusivamente i dati raccolti attraverso il sito web. I dati raccolti in istituto sono gestiti separatamente, con documentazione e informativa proprie, consegnate direttamente in centro.",
        },
      ],
    },
    {
      heading: "10. Sicurezza e modifiche",
      blocks: [
        {
          kind: "p",
          text: "Adottiamo misure tecniche e organizzative adeguate a proteggere i dati da accessi non autorizzati, perdita o divulgazione, incluse la cifratura del traffico (HTTPS) e l'accesso limitato ai soli soggetti autorizzati.",
        },
        {
          kind: "p",
          text: "Ci riserviamo di aggiornare questa informativa. La versione vigente è sempre pubblicata su questa pagina, con l'indicazione della data di ultimo aggiornamento.",
        },
      ],
    },
  ],
};

const privacyEn: LegalDoc = {
  title: "Privacy Policy",
  subtitle: "Information on the processing of personal data pursuant to Art. 13 GDPR.",
  intro:
    "This notice explains how we process personal data collected through **www.kalikanuovaestetica.it**. It covers data collected online only: data collected at the salon is handled separately and is covered by its own notice.",
  sections: [
    { heading: "1. Data controller", blocks: controllerBlock("en") },
    {
      heading: "2. What we collect and why",
      blocks: [
        {
          kind: "p",
          text: "The website collects personal data only when you provide it voluntarily. **We use no analytics tools, no profiling cookies, no advertising pixels and no third-party tracking systems.**",
        },
        {
          kind: "table",
          head: ["Data", "Purpose", "Legal basis", "Retention"],
          rows: [
            [
              "Buyer's first name, last name and email; recipient's first and last name; optional personal message",
              "Issuing, delivering and managing the purchased Gift Card",
              "Performance of a contract to which you are party (Art. 6.1.b GDPR)",
              "For the validity period of the Gift Card and thereafter for 10 years, for tax and accounting obligations (Art. 2220 Italian Civil Code)",
            ],
            [
              "Order data: amount, selected treatment, serial code, payment session identifier",
              "Managing the purchase, customer support, accounting obligations",
              "Performance of the contract (Art. 6.1.b) and legal obligation (Art. 6.1.c GDPR)",
              "10 years from issue",
            ],
            [
              "IP address, date and time of request, browser type (server technical logs)",
              "Delivering the website, security and troubleshooting",
              "Legitimate interest in infrastructure security (Art. 6.1.f GDPR)",
              "Maximum 30 days, unless needed to investigate unlawful activity",
            ],
            [
              "Phone number and the content of messages sent via WhatsApp, phone or email",
              "Responding to support or treatment information requests",
              "Performance of pre-contractual measures at your request, or legitimate interest in providing assistance (Art. 6.1.b and 6.1.f GDPR)",
              "For as long as needed to handle the request",
            ],
          ],
        },
        {
          kind: "p",
          text: "The WhatsApp button on the website opens a direct conversation with our number: the service is provided by **WhatsApp Ireland Limited (Meta)**, which processes messages as an independent controller under its own notice, available at [whatsapp.com/legal/privacy-policy](https://www.whatsapp.com/legal/privacy-policy). We process the content of the messages you send us solely to reply to you.",
        },
      ],
    },
    {
      heading: "3. Payment data",
      blocks: [
        {
          kind: "p",
          text: "Payments are handled entirely by **Stripe**. At checkout you are redirected to a secure Stripe page: your card details are entered there and **never pass through our systems, nor are they seen or stored by us**. From Stripe we receive only the payment confirmation, the amount and a transaction identifier.",
        },
        {
          kind: "p",
          text: "Stripe processes payment data as an independent controller; see its notice at [stripe.com/privacy](https://stripe.com/privacy).",
        },
      ],
    },
    {
      heading: "4. Who we share data with",
      blocks: [
        {
          kind: "p",
          text: "Data is never disclosed publicly, sold or transferred to third parties for marketing purposes. It is accessible only to the controller and to the technical providers that enable the service — website hosting, payment processing, transactional email delivery and content distribution — to the extent necessary to provide those services.",
        },
        {
          kind: "p",
          text: "Data may also be shared with our accountant for bookkeeping obligations and with judicial authorities where required by law.",
        },
      ],
    },
    {
      heading: "5. Transfers outside the European Union",
      blocks: [
        {
          kind: "p",
          text: "Some of the providers listed above are based in the United States. Transfers are carried out on the basis of the **Standard Contractual Clauses** approved by the European Commission (Art. 46 GDPR) and, where applicable, adherence to the **EU-U.S. Data Privacy Framework**, which ensure an adequate level of protection. You may request a copy of the safeguards in place by writing to the addresses in section 1.",
        },
      ],
    },
    {
      heading: "6. Is providing data mandatory?",
      blocks: [
        {
          kind: "p",
          text: "Providing the data required to purchase a Gift Card is optional but necessary: without it we cannot issue or send the Gift Card.",
        },
      ],
    },
    {
      heading: "7. Your rights",
      blocks: [
        {
          kind: "p",
          text: "You may exercise the rights set out in Arts. 15-22 GDPR at any time:",
        },
        {
          kind: "ul",
          items: [
            "**Access**: find out what data we process and obtain a copy",
            "**Rectification**: correct inaccurate or incomplete data",
            "**Erasure**: have your data removed, within the limits of statutory retention obligations",
            "**Restriction**: ask us to suspend processing",
            "**Portability**: receive your data in a structured, machine-readable format",
            "**Objection**: object to processing based on legitimate interest",
          ],
        },
        {
          kind: "p",
          text: `To exercise them write to [${legalEntity.email}](mailto:${legalEntity.email}) or [${legalEntity.pec}](mailto:${legalEntity.pec}). We will reply within 30 days.`,
        },
        {
          kind: "p",
          text: "If you believe the processing infringes data protection law, you have the right to lodge a complaint with the Italian Data Protection Authority, **Garante per la protezione dei dati personali** ([garanteprivacy.it](https://www.garanteprivacy.it)), or to bring proceedings before a court.",
        },
      ],
    },
    {
      heading: "8. No profiling",
      blocks: [
        {
          kind: "p",
          text: "We carry out no profiling and no automated decision-making producing legal effects concerning you (Art. 22 GDPR). We do not send marketing communications to anyone who has not expressly requested them.",
        },
      ],
    },
    {
      heading: "9. Scope of this notice",
      blocks: [
        {
          kind: "p",
          text: "This notice covers only data collected through the website. Data collected at the salon is handled separately, with its own records and privacy notice, provided directly at the centre.",
        },
      ],
    },
    {
      heading: "10. Security and changes",
      blocks: [
        {
          kind: "p",
          text: "We apply appropriate technical and organisational measures to protect data against unauthorised access, loss or disclosure, including traffic encryption (HTTPS) and access restricted to authorised persons only.",
        },
        {
          kind: "p",
          text: "We may update this notice. The version in force is always published on this page, together with the date it was last updated.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// COOKIE POLICY
// ---------------------------------------------------------------------------

const cookieIt: LegalDoc = {
  title: "Cookie Policy",
  subtitle: "Come questo sito utilizza i cookie.",
  intro:
    "Questo sito utilizza **un solo cookie tecnico** e nessuno strumento di tracciamento. Per questo motivo non trovi alcun banner di consenso: non è richiesto dalla normativa.",
  sections: [
    {
      heading: "1. Cosa sono i cookie",
      blocks: [
        {
          kind: "p",
          text: "I cookie sono piccoli file di testo che i siti salvano sul dispositivo di chi li visita. Possono servire a far funzionare il sito (cookie tecnici) oppure a osservare il comportamento degli utenti per finalità statistiche o pubblicitarie (cookie analitici e di profilazione).",
        },
      ],
    },
    {
      heading: "2. I cookie utilizzati da questo sito",
      blocks: [
        {
          kind: "table",
          head: ["Nome", "Tipo", "Finalità", "Durata"],
          rows: [
            [
              "NEXT_LOCALE",
              "Tecnico, di prima parte",
              "Memorizza la lingua scelta (italiano o inglese) per riproporla alla visita successiva",
              "12 mesi",
            ],
          ],
        },
        {
          kind: "p",
          text: "**Non utilizziamo** cookie analitici, cookie di profilazione, pixel pubblicitari, Google Analytics, strumenti di social media tracking o cookie di terze parti di alcun tipo.",
        },
        {
          kind: "p",
          text: "Ai sensi dell'art. 122 del Codice Privacy e delle Linee guida del Garante del 10 giugno 2021, i cookie tecnici non richiedono il consenso preventivo dell'utente: è sufficiente questa informativa.",
        },
      ],
    },
    {
      heading: "3. Risorse esterne",
      blocks: [
        {
          kind: "p",
          text: "Alcuni contenuti sono serviti da fornitori esterni, che per erogarli ricevono necessariamente il tuo indirizzo IP. Non installano cookie sul nostro dominio:",
        },
        {
          kind: "ul",
          items: [
            "**Cloudflare R2** — distribuzione dei video di sfondo delle pagine",
            "**Vercel** — hosting e distribuzione delle pagine e delle immagini",
          ],
        },
        {
          kind: "p",
          text: "Quando procedi al pagamento vieni reindirizzato sul dominio di **Stripe**, che applica la propria cookie policy: [stripe.com/it/cookie-settings](https://stripe.com/it/cookie-settings).",
        },
        {
          kind: "p",
          text: "I collegamenti verso Instagram, Facebook, Google e WhatsApp presenti sul sito sono **semplici link**: nessun contenuto di questi servizi è incorporato nelle nostre pagine e nessun dato viene loro trasmesso finché non decidi di cliccarli.",
        },
      ],
    },
    {
      heading: "4. Come gestire i cookie",
      blocks: [
        {
          kind: "p",
          text: "Puoi eliminare o bloccare i cookie in qualsiasi momento dalle impostazioni del tuo browser. Bloccando il cookie tecnico il sito continuerà a funzionare, ma non ricorderà la lingua che hai scelto.",
        },
        {
          kind: "ul",
          items: [
            "[Google Chrome](https://support.google.com/chrome/answer/95647)",
            "[Mozilla Firefox](https://support.mozilla.org/kb/protezione-antitracciamento-avanzata-firefox-desktop)",
            "[Safari](https://support.apple.com/it-it/guide/safari/sfri11471/mac)",
            "[Microsoft Edge](https://support.microsoft.com/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09)",
          ],
        },
      ],
    },
    {
      heading: "5. Titolare e contatti",
      blocks: [
        ...controllerBlock("it").slice(0, 1),
        {
          kind: "p",
          text: "Per maggiori informazioni sul trattamento dei tuoi dati consulta la [Privacy Policy](/it/privacy).",
        },
      ],
    },
  ],
};

const cookieEn: LegalDoc = {
  title: "Cookie Policy",
  subtitle: "How this website uses cookies.",
  intro:
    "This website uses **a single technical cookie** and no tracking tools whatsoever. That is why you see no consent banner: none is required by law.",
  sections: [
    {
      heading: "1. What cookies are",
      blocks: [
        {
          kind: "p",
          text: "Cookies are small text files that websites store on a visitor's device. They may be needed to make the site work (technical cookies) or used to observe user behaviour for statistical or advertising purposes (analytics and profiling cookies).",
        },
      ],
    },
    {
      heading: "2. Cookies used by this website",
      blocks: [
        {
          kind: "table",
          head: ["Name", "Type", "Purpose", "Duration"],
          rows: [
            [
              "NEXT_LOCALE",
              "Technical, first-party",
              "Stores your chosen language (Italian or English) so it can be applied on your next visit",
              "12 months",
            ],
          ],
        },
        {
          kind: "p",
          text: "**We do not use** analytics cookies, profiling cookies, advertising pixels, Google Analytics, social media tracking tools or third-party cookies of any kind.",
        },
        {
          kind: "p",
          text: "Under Art. 122 of the Italian Privacy Code and the Italian DPA's guidelines of 10 June 2021, technical cookies do not require prior consent: this notice is sufficient.",
        },
      ],
    },
    {
      heading: "3. External resources",
      blocks: [
        {
          kind: "p",
          text: "Some content is served by external providers, which necessarily receive your IP address in order to deliver it. They set no cookies on our domain:",
        },
        {
          kind: "ul",
          items: [
            "**Cloudflare R2** — delivery of the background videos used on our pages",
            "**Vercel** — hosting and delivery of pages and images",
          ],
        },
        {
          kind: "p",
          text: "When you proceed to payment you are redirected to **Stripe**'s domain, which applies its own cookie policy: [stripe.com/cookie-settings](https://stripe.com/cookie-settings).",
        },
        {
          kind: "p",
          text: "Links to Instagram, Facebook, Google and WhatsApp on this site are **plain links**: no content from those services is embedded in our pages and no data is sent to them unless you choose to click.",
        },
      ],
    },
    {
      heading: "4. Managing cookies",
      blocks: [
        {
          kind: "p",
          text: "You can delete or block cookies at any time through your browser settings. If you block the technical cookie the site will still work, but it will not remember your chosen language.",
        },
        {
          kind: "ul",
          items: [
            "[Google Chrome](https://support.google.com/chrome/answer/95647)",
            "[Mozilla Firefox](https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop)",
            "[Safari](https://support.apple.com/guide/safari/sfri11471/mac)",
            "[Microsoft Edge](https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09)",
          ],
        },
      ],
    },
    {
      heading: "5. Controller and contacts",
      blocks: [
        ...controllerBlock("en").slice(0, 1),
        {
          kind: "p",
          text: "For more information on how we process your data, see the [Privacy Policy](/en/privacy).",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// TERMS OF SALE
// ---------------------------------------------------------------------------

const termsIt: LegalDoc = {
  title: "Condizioni di Vendita",
  subtitle: "Termini e condizioni di acquisto delle Gift Card Kalika Nuovaestetica.",
  intro:
    "Le presenti Condizioni di Vendita disciplinano l'acquisto delle Gift Card tramite il sito **kalikanuovaestetica.it**. Effettuando un acquisto, il Cliente dichiara di aver letto e accettato integralmente le presenti condizioni.",
  sections: [
    {
      heading: "1. Venditore",
      blocks: [
        {
          kind: "dl",
          items: [
            { term: "Venditore", desc: legalEntity.name },
            { term: "Sede", desc: legalEntity.address },
            { term: "Partita IVA", desc: legalEntity.vat },
            { term: "Codice Fiscale", desc: legalEntity.taxCode },
            { term: "Email", desc: `[${legalEntity.email}](mailto:${legalEntity.email})` },
            { term: "PEC", desc: `[${legalEntity.pec}](mailto:${legalEntity.pec})` },
          ],
        },
      ],
    },
    {
      heading: "2. Oggetto",
      blocks: [
        {
          kind: "p",
          text: "La Gift Card Kalika è un titolo che dà diritto a usufruire di trattamenti estetici, rituali SPA o percorsi benessere presso il centro Kalika Nuovaestetica, per il valore o il trattamento indicato al momento dell'acquisto. La Gift Card è digitale e viene fornita in formato PDF.",
        },
      ],
    },
    {
      heading: "3. Prezzo",
      blocks: [
        {
          kind: "p",
          text: "Il prezzo della Gift Card corrisponde al valore selezionato dal Cliente (importo libero o predefinito) oppure al prezzo del trattamento scelto. Tutti i prezzi sono espressi in Euro e comprensivi di IVA ove applicabile. Non sono previsti costi aggiuntivi di consegna, trattandosi di prodotto digitale. L'importo minimo acquistabile è di 30 €, salvo le Gift Card abbinate a uno specifico trattamento, il cui valore corrisponde al prezzo del trattamento scelto.",
        },
      ],
    },
    {
      heading: "4. Modalità di pagamento",
      blocks: [
        {
          kind: "p",
          text: "Il pagamento avviene online tramite la piattaforma sicura **Stripe**, che gestisce le transazioni con carta di credito o debito. Kalika Nuovaestetica non conserva i dati della carta di pagamento del Cliente. Nessun costo aggiuntivo è applicato in ragione del mezzo di pagamento utilizzato.",
        },
        {
          kind: "p",
          text: "L'acquisto è riservato a persone che abbiano compiuto la **maggiore età** e la piena capacità di agire. Nulla vieta che la Gift Card sia intestata o regalata a un minore: è l'acquisto online a dover essere effettuato da un adulto.",
        },
      ],
    },
    {
      heading: "5. Consegna",
      blocks: [
        { kind: "p", text: "A pagamento confermato, la Gift Card in formato PDF viene:" },
        {
          kind: "ul",
          items: [
            "resa disponibile per il download immediato sulla pagina di conferma;",
            "inviata via email all'indirizzo indicato dal Cliente in fase di acquisto.",
          ],
        },
        {
          kind: "p",
          text: "Il Cliente è responsabile della correttezza dell'indirizzo email fornito. Se la Gift Card non dovesse arrivare entro poche ore, si invita a controllare la cartella spam e a contattarci: provvederemo a rinviarla senza alcun costo.",
        },
      ],
    },
    {
      heading: "6. Validità e utilizzo",
      blocks: [
        {
          kind: "p",
          text: `La Gift Card è valida **${giftCardValidityMonths} (sei) mesi dalla data di acquisto**; la data di scadenza è riportata sul documento. Per utilizzarla, il beneficiario deve presentare il codice della Gift Card al centro Kalika Nuovaestetica e prenotare il trattamento secondo disponibilità.`,
        },
        { kind: "p", text: "La Gift Card:" },
        {
          kind: "ul",
          items: [
            "non è convertibile in denaro;",
            "non dà diritto a resto in caso di utilizzo parziale;",
            "può essere utilizzata in un'unica soluzione o secondo le modalità concordate con il centro;",
            "è trasferibile: può essere utilizzata da persona diversa dall'intestatario.",
          ],
        },
        {
          kind: "p",
          text: "Se il trattamento scelto ha un valore superiore all'importo della Gift Card, la differenza è dovuta al momento del servizio. Si consiglia di prenotare con anticipo, in particolare nei periodi di festività.",
        },
      ],
    },
    {
      heading: "7. Diritto di recesso",
      blocks: [
        {
          kind: "p",
          text: "Se acquista in qualità di consumatore, il Cliente ha diritto di recedere dal contratto **entro 14 giorni** dalla ricezione della Gift Card, senza dover fornire alcuna motivazione e senza penalità, ai sensi degli artt. 52 e seguenti del Codice del Consumo (D.Lgs. 206/2005).",
        },
        {
          kind: "p",
          text: `Per esercitare il recesso è sufficiente inviare una comunicazione esplicita a [${legalEntity.email}](mailto:${legalEntity.email}), indicando il codice della Gift Card e gli estremi dell'ordine. Il rimborso integrale sarà effettuato entro 14 giorni dalla ricezione della comunicazione, utilizzando lo stesso mezzo di pagamento impiegato per l'acquisto.`,
        },
        {
          kind: "p",
          text: "Il diritto di recesso **non può essere esercitato** se la Gift Card è già stata utilizzata, in tutto o in parte, per usufruire di un trattamento: in tal caso il servizio si considera prestato con il consenso espresso del Cliente, ai sensi dell'art. 59, lett. a), del Codice del Consumo.",
        },
      ],
    },
    {
      heading: "8. Assistenza e reclami",
      blocks: [
        {
          kind: "p",
          text: "Per informazioni, assistenza o reclami relativi alla Gift Card, il Cliente può contattare:",
        },
        {
          kind: "dl",
          items: [
            { term: "Email", desc: `[${legalEntity.email}](mailto:${legalEntity.email})` },
            { term: "PEC", desc: `[${legalEntity.pec}](mailto:${legalEntity.pec})` },
            { term: "Telefono", desc: legalEntity.phone },
          ],
        },
        {
          kind: "p",
          text: "In conformità al Regolamento UE 524/2013, si segnala che la Commissione Europea mette a disposizione dei consumatori una piattaforma per la risoluzione online delle controversie, raggiungibile all'indirizzo [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr).",
        },
      ],
    },
    {
      heading: "9. Legge applicabile e foro competente",
      blocks: [
        {
          kind: "p",
          text: "Le presenti Condizioni sono regolate dalla legge italiana. Per le controversie con i consumatori è competente in via esclusiva il foro del luogo di residenza o domicilio elettivo del consumatore, se ubicato in Italia, ai sensi dell'art. 66-bis del Codice del Consumo.",
        },
      ],
    },
    {
      heading: "10. Trattamento dei dati personali",
      blocks: [
        {
          kind: "p",
          text: "I dati personali del Cliente e del beneficiario della Gift Card sono trattati secondo quanto indicato nella [Privacy Policy](/it/privacy) del sito.",
        },
      ],
    },
  ],
};

const termsEn: LegalDoc = {
  title: "Terms of Sale",
  subtitle: "Terms and conditions for purchasing Kalika Nuovaestetica Gift Cards.",
  intro:
    "These Terms of Sale govern the purchase of Gift Cards through **kalikanuovaestetica.it**. By completing a purchase, the Customer confirms that they have read and fully accepted these terms.",
  sections: [
    {
      heading: "1. Seller",
      blocks: [
        {
          kind: "dl",
          items: [
            { term: "Seller", desc: legalEntity.name },
            { term: "Registered office", desc: legalEntity.address },
            { term: "VAT number", desc: legalEntity.vat },
            { term: "Tax code", desc: legalEntity.taxCode },
            { term: "Email", desc: `[${legalEntity.email}](mailto:${legalEntity.email})` },
            { term: "Certified email (PEC)", desc: `[${legalEntity.pec}](mailto:${legalEntity.pec})` },
          ],
        },
      ],
    },
    {
      heading: "2. Subject of the contract",
      blocks: [
        {
          kind: "p",
          text: "The Kalika Gift Card is a voucher entitling the holder to beauty treatments, SPA rituals or wellbeing journeys at the Kalika Nuovaestetica centre, for the value or the treatment selected at the time of purchase. The Gift Card is digital and is supplied as a PDF.",
        },
      ],
    },
    {
      heading: "3. Price",
      blocks: [
        {
          kind: "p",
          text: "The price of the Gift Card corresponds to the value chosen by the Customer (custom or preset amount) or to the price of the selected treatment. All prices are in Euro and include VAT where applicable. No delivery charges apply, as this is a digital product. The minimum purchase amount is €30, except for Gift Cards linked to a specific treatment, whose value matches the price of the selected treatment.",
        },
      ],
    },
    {
      heading: "4. Payment",
      blocks: [
        {
          kind: "p",
          text: "Payment is made online through the secure **Stripe** platform, which handles credit and debit card transactions. Kalika Nuovaestetica does not store the Customer's card details. No surcharge is applied in respect of the payment method used.",
        },
        {
          kind: "p",
          text: "Purchases may only be made by persons who have reached the **age of majority** and have full legal capacity. This does not prevent a Gift Card from being addressed to or given to a minor: it is the online purchase that must be made by an adult.",
        },
      ],
    },
    {
      heading: "5. Delivery",
      blocks: [
        { kind: "p", text: "Once payment is confirmed, the Gift Card PDF is:" },
        {
          kind: "ul",
          items: [
            "made available for immediate download on the confirmation page;",
            "sent by email to the address provided by the Customer at checkout.",
          ],
        },
        {
          kind: "p",
          text: "The Customer is responsible for the accuracy of the email address provided. If the Gift Card does not arrive within a few hours, please check your spam folder and contact us: we will resend it at no cost.",
        },
      ],
    },
    {
      heading: "6. Validity and use",
      blocks: [
        {
          kind: "p",
          text: `The Gift Card is valid for **${giftCardValidityMonths} (six) months from the date of purchase**; the expiry date is shown on the document. To use it, the beneficiary must present the Gift Card code at the Kalika Nuovaestetica centre and book the treatment subject to availability.`,
        },
        { kind: "p", text: "The Gift Card:" },
        {
          kind: "ul",
          items: [
            "cannot be exchanged for cash;",
            "gives no right to change if only partially used, unless otherwise agreed with the centre;",
            "may be used in a single booking or as otherwise agreed with the centre;",
            "is transferable: it may be used by someone other than the named recipient.",
          ],
        },
        {
          kind: "p",
          text: "If the chosen treatment costs more than the Gift Card value, the difference is payable at the time of the service. We recommend booking in advance, particularly around holidays.",
        },
      ],
    },
    {
      heading: "7. Right of withdrawal",
      blocks: [
        {
          kind: "p",
          text: "If purchasing as a consumer, the Customer has the right to withdraw from the contract **within 14 days** of receiving the Gift Card, without giving any reason and without penalty, pursuant to Arts. 52 ff. of the Italian Consumer Code (Legislative Decree 206/2005).",
        },
        {
          kind: "p",
          text: `To withdraw, simply send an explicit statement to [${legalEntity.email}](mailto:${legalEntity.email}), quoting the Gift Card code and the order details. A full refund will be issued within 14 days of receipt of the notice, using the same payment method used for the purchase.`,
        },
        {
          kind: "p",
          text: "The right of withdrawal **cannot be exercised** once the Gift Card has been used, wholly or in part, to receive a treatment: in that case the service is deemed to have been performed with the Customer's express consent, pursuant to Art. 59(a) of the Italian Consumer Code.",
        },
      ],
    },
    {
      heading: "8. Support and complaints",
      blocks: [
        {
          kind: "p",
          text: "For information, assistance or complaints regarding the Gift Card, the Customer may contact:",
        },
        {
          kind: "dl",
          items: [
            { term: "Email", desc: `[${legalEntity.email}](mailto:${legalEntity.email})` },
            { term: "Certified email (PEC)", desc: `[${legalEntity.pec}](mailto:${legalEntity.pec})` },
            { term: "Phone", desc: `+39 ${legalEntity.phone}` },
          ],
        },
        {
          kind: "p",
          text: "In accordance with EU Regulation 524/2013, the European Commission provides consumers with an online dispute resolution platform, available at [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr).",
        },
      ],
    },
    {
      heading: "9. Governing law and jurisdiction",
      blocks: [
        {
          kind: "p",
          text: "These Terms are governed by Italian law. For disputes with consumers, exclusive jurisdiction lies with the court of the consumer's place of residence or elected domicile, if located in Italy, pursuant to Art. 66-bis of the Italian Consumer Code.",
        },
      ],
    },
    {
      heading: "10. Personal data",
      blocks: [
        {
          kind: "p",
          text: "Personal data of the Customer and of the Gift Card beneficiary is processed as described in the site's [Privacy Policy](/en/privacy).",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------

/** All legal documents, keyed by locale then by document. */
export const legalDocs: Record<Locale, Record<LegalDocKey, LegalDoc>> = {
  it: { privacy: privacyIt, cookie: cookieIt, terms: termsIt },
  en: { privacy: privacyEn, cookie: cookieEn, terms: termsEn },
};

/** Short usage rules — for the gift card form, PDF and confirmation emails. */
export const giftCardRules: Record<Locale, string[]> = {
  it: [
    `Validità ${giftCardValidityMonths} mesi dalla data di acquisto`,
    "Presenta il codice al centro per prenotare",
    "Non convertibile in denaro",
  ],
  en: [
    `Valid for ${giftCardValidityMonths} months from the purchase date`,
    "Present the code at the centre to book",
    "Not redeemable for cash",
  ],
};

/** Checkout acceptance line, split so both documents render as <Link>s. */
export const checkoutAcceptance: Record<
  Locale,
  {
    before: string;
    termsLabel: string;
    between: string;
    privacyLabel: string;
    after: string;
  }
> = {
  it: {
    before: "Procedendo con l'acquisto dichiari di aver letto e accettato le ",
    termsLabel: "Condizioni di Vendita",
    between: " e la ",
    privacyLabel: "Privacy Policy",
    after: ".",
  },
  en: {
    before:
      "By completing your purchase, you confirm that you have read and accepted the ",
    termsLabel: "Terms of Sale",
    between: " and the ",
    privacyLabel: "Privacy Policy",
    after: ".",
  },
};

export function getLegalDoc(locale: Locale, key: LegalDocKey): LegalDoc {
  return legalDocs[locale][key];
}

/** "Ultimo aggiornamento" line, localised. Year only. */
export function lastUpdatedLabel(locale: Locale): string {
  const year = new Date(legalLastUpdated).getFullYear();
  return locale === "it"
    ? `Ultimo aggiornamento: ${year}`
    : `Last updated: ${year}`;
}
