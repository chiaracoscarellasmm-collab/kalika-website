import { access } from "fs/promises";
import chromium from "@sparticuz/chromium";
import { PDFDocument } from "pdf-lib";
import puppeteer, { type Browser } from "puppeteer-core";
import {
  corpoGroups,
  maniPiediGroups,
  massaggiFeaturedMethods,
  massaggiGroups,
  sopraccigliaGroups,
  visoGroups,
} from "./treatments";

type ListinoItem = {
  name: string;
  duration?: string;
  price: string;
  note?: string;
};

type ListinoSection = {
  title: string;
  subtitle?: string;
  items: ListinoItem[];
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function itemsFromTreatment(t: {
  name: { it: string };
  duration?: { it: string };
  price?: { it: string };
  short?: { it: string };
  durationOptions?: { duration: { it: string }; price: { it: string } }[];
}): ListinoItem[] {
  if (t.durationOptions?.length) {
    return t.durationOptions.map((option) => ({
      name: t.name.it,
      duration: option.duration.it,
      price: option.price.it,
      note: t.short?.it,
    }));
  }

  return [
    {
      name: t.name.it,
      duration: t.duration?.it,
      price: t.price?.it ?? "",
      note: t.short?.it,
    },
  ];
}

function itemFromTreatment(t: Parameters<typeof itemsFromTreatment>[0]): ListinoItem {
  return itemsFromTreatment(t)[0]!;
}

const massaggiMetodi: ListinoSection = {
  title: "Metodi in evidenza",
  items: massaggiFeaturedMethods.map(itemFromTreatment),
};

const massaggiSpecificiLocalizzati: ListinoSection = {
  title: "Massaggi specifici localizzati",
  items: massaggiGroups[2].treatments.flatMap(itemsFromTreatment),
};

const corpoTotaliSice: ListinoSection = {
  title: "Trattamento corpo totali con cosmesi eubiotica SICE",
  items: corpoGroups[0].treatments
    .filter((t) => t.id !== "olistico")
    .map(itemFromTreatment),
};

const corpoLocaliSice: ListinoSection = {
  title: "Trattamenti corpo locali con cosmesi eubiotica SICE",
  items: corpoGroups[1].treatments.map(itemFromTreatment),
};

const trattamentoOlistico: ListinoSection = {
  title: "Trattamento corpo",
  items: [
    itemFromTreatment(
      corpoGroups[0].treatments.find((t) => t.id === "olistico")!,
    ),
  ],
};

const visoSice: ListinoSection = {
  title: "Trattamenti viso con cosmesi eubiotica SICE",
  items: visoGroups[0].treatments.map(itemFromTreatment),
};

const makeUp: ListinoSection = {
  title: "Make Up",
  items: sopraccigliaGroups.flatMap((g) => g.treatments).map(itemFromTreatment),
};

const maniPiedi: ListinoSection = {
  title: "Mani e piedi",
  items: maniPiediGroups.flatMap((g) => g.treatments).map(itemFromTreatment),
};

const epilazioneTradizionale: ListinoSection = {
  title: "Epilazione tradizionale uomo / donna",
  items: [
    { name: "Sopracciglia", price: "€ 10,00" },
    { name: "Baffetti", price: "€ 8,00" },
    { name: "Sopracciglia e baffetti", price: "€ 16,00" },
    { name: "Mezza gamba", price: "€ 21,00" },
    { name: "Mezza gamba + inguine classico", price: "€ 27,00" },
    { name: "Mezza gamba + inguine sgambato", price: "€ 32,00" },
    { name: "Mezza gamba + inguine totale", price: "€ 37,00" },
    { name: "Gamba intera + inguine classico", price: "€ 31,00" },
    { name: "Gamba intera + inguine sgambato", price: "€ 36,00" },
    { name: "Gamba intera + inguine totale", price: "€ 41,00" },
    { name: "Ascelle", price: "€ 13,00" },
    { name: "Inguine classico", price: "€ 13,00" },
    { name: "Inguine sgambato", price: "€ 18,00" },
    { name: "Inguine totale", price: "€ 23,00" },
    { name: "Braccia", price: "€ 21,00" },
    { name: "Petto e addome", price: "Da € 28,00" },
    { name: "Schiena", price: "Da € 28,00" },
  ],
};

const cocoCeraDonna: ListinoSection = {
  title: "Epilazione Coco Cera · Donna",
  subtitle: "Originale cera brasiliana",
  items: [
    { name: "Sopracciglia", price: "€ 10,00", note: "Viso" },
    { name: "Narici", price: "€ 7,00", note: "Viso" },
    { name: "Baffetti", price: "€ 8,00", note: "Viso" },
    { name: "Guance", price: "€ 9,00", note: "Viso" },
    { name: "Mento", price: "€ 8,00", note: "Viso" },
    { name: "Addome", price: "€ 16,00", note: "Corpo" },
    { name: "Ascelle", price: "€ 18,00", note: "Corpo" },
    { name: "Avambracci", price: "€ 19,00", note: "Corpo" },
    { name: "Braccia complete", price: "€ 28,00", note: "Corpo" },
    { name: "Inguine classico", price: "€ 20,00", note: "Corpo" },
    { name: "Inguine brasiliano", price: "€ 26,00", note: "Corpo" },
    { name: "Inguine totale", price: "€ 30,00", note: "Corpo" },
    { name: "Cosce", price: "€ 28,00", note: "Corpo" },
    { name: "Gambe complete senza inguine", price: "€ 41,00", note: "Corpo" },
    { name: "Mezza gamba", price: "€ 28,00", note: "Corpo" },
    { name: "Glutei", price: "€ 21,00", note: "Corpo" },
    { name: "Mezza gamba + inguine classico", price: "€ 43,00", note: "Corpo" },
    { name: "Mezza gamba + inguine brasiliano", price: "€ 48,00", note: "Corpo" },
    { name: "Mezza gamba + inguine totale", price: "€ 52,00", note: "Corpo" },
    { name: "Gamba intera + inguine classico", price: "€ 53,00", note: "Corpo" },
    { name: "Gamba intera + inguine brasiliano", price: "€ 58,00", note: "Corpo" },
    { name: "Gamba intera + inguine totale", price: "€ 62,00", note: "Corpo" },
  ],
};

const cocoCeraUomo: ListinoSection = {
  title: "Epilazione Coco Cera · Uomo",
  subtitle: "Originale cera brasiliana",
  items: [
    { name: "Sopracciglia", price: "€ 10,00", note: "Viso" },
    { name: "Narici", price: "€ 8,00", note: "Viso" },
    { name: "Orecchie", price: "€ 8,00", note: "Viso" },
    { name: "Petto", price: "€ 20,00", note: "Corpo" },
    { name: "Addome", price: "€ 22,00", note: "Corpo" },
    { name: "Petto + Addome", price: "€ 35,00", note: "Corpo" },
    { name: "Ascelle", price: "€ 19,00", note: "Corpo" },
    { name: "Schiena", price: "€ 33,00", note: "Corpo" },
    { name: "Bicipiti", price: "€ 19,00", note: "Corpo" },
    { name: "Avambracci", price: "€ 23,00", note: "Corpo" },
    { name: "Braccia complete", price: "€ 30,00", note: "Corpo" },
    { name: "Inguine", price: "€ 22,00", note: "Corpo" },
    { name: "Cosce", price: "€ 32,00", note: "Corpo" },
    { name: "Mezza gamba", price: "€ 28,00", note: "Corpo" },
    { name: "Gambe complete senza inguine", price: "€ 45,00", note: "Corpo" },
    { name: "Glutei", price: "€ 24,00", note: "Corpo" },
  ],
};

const pageOneLeft: ListinoSection[] = [
  {
    title: "Massaggi e trattamenti rilassanti",
    items: massaggiGroups[0].treatments.flatMap(itemsFromTreatment),
  },
  massaggiMetodi,
  {
    title: "Momenti speciali",
    items: massaggiGroups[1].treatments.flatMap(itemsFromTreatment),
  },
  massaggiSpecificiLocalizzati,
  corpoTotaliSice,
];

const pageOneRight: ListinoSection[] = [
  corpoLocaliSice,
  trattamentoOlistico,
  visoSice,
  makeUp,
  maniPiedi,
];

const LISTINO_STYLES = `
  @page { size: A4 portrait; margin: 14mm 12mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    color: #2c1810;
    font-family: Avenir, Montserrat, Arial, sans-serif;
    font-size: 7.5pt;
    line-height: 1.4;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .header {
    text-align: center;
    margin-bottom: 9mm;
  }
  .brand {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 17pt;
    letter-spacing: 0.08em;
    color: #6b3a2a;
    margin: 0;
  }
  .brand-sub {
    margin: 2.5mm 0 0;
    font-size: 7pt;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #9b5e8a;
  }
  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 7mm;
  }
  .column {
    display: flex;
    flex-direction: column;
    gap: 5mm;
  }
  .block h2 {
    margin: 0 0 3.5mm;
    padding-top: 1mm;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 8.5pt;
    font-weight: 400;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #6b3a2a;
  }
  .subtitle {
    margin: -2mm 0 3.5mm;
    color: #9b5e8a;
    font-size: 7pt;
  }
  .row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 3mm;
    align-items: start;
    padding: 1.3mm 0;
    border-bottom: 0.2pt solid rgba(44, 24, 16, 0.08);
  }
  .name span { display: block; }
  .meta {
    color: rgba(44, 24, 16, 0.55);
    font-size: 7pt;
    margin-top: 0.5mm;
  }
  .price {
    white-space: nowrap;
    color: #6b3a2a;
    font-weight: 600;
  }
  .footer-note {
    margin-top: 7mm;
    padding-top: 3mm;
    border-top: 0.4pt solid rgba(44, 24, 16, 0.12);
    text-align: center;
    font-size: 7pt;
    color: rgba(44, 24, 16, 0.72);
    font-style: italic;
  }
  .epilazione-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5mm;
  }
  .epilazione-grid .block h2 {
    font-size: 8pt;
    margin-bottom: 2.5mm;
  }
  .epilazione-grid .row {
    padding: 0.9mm 0;
  }
  .epilazione-grid .meta {
    font-size: 6.5pt;
  }
  .note {
    margin-top: 6mm;
    font-size: 7pt;
    color: rgba(44, 24, 16, 0.72);
    font-style: italic;
  }
`;

function renderSection(section: ListinoSection) {
  const rows = section.items
    .map((item) => {
      const meta = [item.duration, item.note].filter(Boolean).join(" · ");
      return `<div class="row">
        <div class="name">
          <span>${escapeHtml(item.name)}</span>
          ${meta ? `<span class="meta">${escapeHtml(meta)}</span>` : ""}
        </div>
        <div class="price">${escapeHtml(item.price)}</div>
      </div>`;
    })
    .join("");

  return `<section class="block">
    <h2>${escapeHtml(section.title)}</h2>
    ${section.subtitle ? `<p class="subtitle">${escapeHtml(section.subtitle)}</p>` : ""}
    ${rows}
  </section>`;
}

function renderColumn(sections: ListinoSection[]) {
  return `<div class="column">${sections.map(renderSection).join("")}</div>`;
}

function renderHeader(subtitle: string) {
  return `<header class="header">
    <h1 class="brand">Kalika</h1>
    <p class="brand-sub">${escapeHtml(subtitle)}</p>
  </header>`;
}

function wrapListinoHtml(body: string) {
  return `<!doctype html>
<html lang="it">
  <head>
    <meta charset="utf-8" />
    <style>${LISTINO_STYLES}</style>
  </head>
  <body>${body}</body>
</html>`;
}

async function getExecutablePath() {
  if (process.platform === "darwin") {
    const candidates = [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
    ];
    for (const candidate of candidates) {
      try {
        await access(candidate);
        return candidate;
      } catch {
        // try next
      }
    }
  }
  return chromium.executablePath();
}

function buildSectionHtml() {
  return [
    wrapListinoHtml(`
      ${renderHeader("Nuova Estetica")}
      <div class="columns">
        ${renderColumn(pageOneLeft)}
        ${renderColumn(pageOneRight)}
      </div>
      <p class="footer-note">
        Il trattamento eubiotico corpo e viso nella stessa seduta viene scontato del 15% sul totale.
      </p>
    `),
    wrapListinoHtml(`
      ${renderHeader("Epilazione")}
      ${renderSection(epilazioneTradizionale)}
    `),
    wrapListinoHtml(`
      ${renderHeader("Epilazione · Coco Cera")}
      <div class="epilazione-grid">
        ${renderSection(cocoCeraDonna)}
        ${renderSection(cocoCeraUomo)}
      </div>
      <p class="note">
        Eseguendo la depilazione completa verrà applicato uno sconto del 10% sul totale.
      </p>
    `),
  ];
}

async function renderSectionPdf(browser: Browser, html: string) {
  const page = await browser.newPage();
  try {
    await page.setContent(html, { waitUntil: "load" });
    return Buffer.from(
      await page.pdf({
        format: "A4",
        landscape: false,
        printBackground: true,
        preferCSSPageSize: true,
      }),
    );
  } finally {
    await page.close();
  }
}

export async function esteticaListinoHtml() {
  return buildSectionHtml().join("\n");
}

export async function generateEsteticaListinoPdf() {
  const sections = buildSectionHtml();
  const executablePath = await getExecutablePath();
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath,
    headless: true,
  });

  try {
    const parts: Buffer[] = [];
    for (const html of sections) {
      parts.push(await renderSectionPdf(browser, html));
    }

    const merged = await PDFDocument.create();
    for (const part of parts) {
      const doc = await PDFDocument.load(part);
      const pages = await merged.copyPages(doc, doc.getPageIndices());
      for (const page of pages) merged.addPage(page);
    }

    return Buffer.from(await merged.save());
  } finally {
    await browser.close();
  }
}
