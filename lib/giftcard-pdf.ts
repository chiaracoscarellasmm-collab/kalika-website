import { readFile } from "fs/promises";
import path from "path";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { getGiftCardDesign, type GiftCardRecord } from "./giftcard";
import { getGiftCardUi } from "./giftcard-ui";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function getLogoDataUri() {
  const file = await readFile(path.join(process.cwd(), "public", "logo.jpg"));
  return `data:image/jpeg;base64,${file.toString("base64")}`;
}

async function getFrontDataUri(designKey: "estetica" | "spa" | "coppia") {
  const frontFiles: Record<typeof designKey, string> = {
    estetica: "Gift card desert.png",
    spa: "Gift card mountain.png",
    coppia: "Gift card seaside.png",
  };

  const frontPath = path.join(
    process.cwd(),
    "public",
    frontFiles[designKey],
  );

  try {
    const file = await readFile(frontPath);
    return `data:image/jpeg;base64,${file.toString("base64")}`;
  } catch {
    return `data:image/svg+xml;base64,${Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1012" height="638" viewBox="0 0 1012 638">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#faf7f2"/>
            <stop offset="48%" stop-color="#f0e6f0"/>
            <stop offset="100%" stop-color="#c97bb2"/>
          </linearGradient>
        </defs>
        <rect width="1012" height="638" fill="url(#g)"/>
      </svg>`,
    ).toString("base64")}`;
  }
}

export async function giftCardHtml(record: GiftCardRecord) {
  const design = getGiftCardDesign(record.design);
  const ui = getGiftCardUi(record.locale);
  const dateLocale = record.locale === "en" ? "en-GB" : "it-IT";
  const logo = await getLogoDataUri();
  const front = await getFrontDataUri(record.design);
  const from = `${record.fromFirstName} ${record.fromLastName}`;
  const to = `${record.toFirstName} ${record.toLastName}`;
  const displayDate = (value: string) =>
    new Intl.DateTimeFormat(dateLocale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(value));

  return `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          @page { size: A4 portrait; margin: 0; }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            width: 210mm;
            height: 297mm;
            font-family: Avenir, Montserrat, Arial, sans-serif;
            background: #faf7f2;
            color: #2c1810;
          }
          .sheet {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .front {
            position: relative;
            width: 100%;
            height: 148.5mm;
            overflow: hidden;
          }
          .front img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .separator {
            border-top: 1px dotted rgba(201, 123, 178, 0.45);
            margin: 0 10mm;
            height: 0;
          }
          .back-wrap {
            width: 100%;
            height: 148.5mm;
            padding: 8mm 12mm 10mm;
          }
          .back {
            height: 100%;
            border: 1px solid rgba(201, 123, 178, 0.35);
            background: #faf7f2;
            padding: 10mm 12mm 9mm;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
          }
          .logo {
            width: 34mm;
            mix-blend-mode: multiply;
          }
          .eyebrow {
            margin-top: 2mm;
            font-size: 9px;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: #9b5e8a;
          }
          h1 {
            margin: 3mm 0 0;
            font-family: Georgia, serif;
            font-size: 24px;
            font-weight: 400;
            letter-spacing: .04em;
            color: #6b3a2a;
          }
          .top {
            display: flex;
            justify-content: space-between;
            gap: 12mm;
            align-items: flex-start;
          }
          .code {
            text-align: right;
            font-size: 9px;
            letter-spacing: 1.4px;
            line-height: 1.45;
            text-transform: uppercase;
            color: rgba(44, 24, 16, 0.65);
          }
          .code span {
            display: block;
            color: #9b5e8a;
          }
          .content {
            display: grid;
            gap: 4mm;
            margin-top: 5mm;
            font-size: 14px;
            line-height: 1.45;
            color: #2c1810;
          }
          .row {
            display: grid;
            gap: 1mm;
          }
          .message {
            font-family: Georgia, serif;
            font-size: 14px;
            font-style: italic;
            line-height: 1.55;
            max-height: 30mm;
            overflow: hidden;
            color: rgba(44, 24, 16, 0.9);
          }
          .message .label {
            margin-bottom: 1.5mm;
          }
          .label {
            display: block;
            font-size: 9px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #9b5e8a;
          }
          .meta {
            display: flex;
            justify-content: space-between;
            gap: 10mm;
            padding-top: 4mm;
            border-top: 1px solid rgba(44, 24, 16, 0.08);
            font-size: 9px;
            letter-spacing: 1.4px;
            line-height: 1.6;
            text-transform: uppercase;
            color: rgba(44, 24, 16, 0.65);
          }
        </style>
      </head>
      <body>
        <main class="sheet">
          <section class="front">
            ${
              front
                ? `<img src="${front}" alt="${escapeHtml(design.label)}" />`
                : ""
            }
          </section>
          <div class="separator" aria-hidden="true"></div>
          <section class="back-wrap">
            <section class="back">
              <div class="top">
                <div>
                  <img class="logo" src="${logo}" alt="Kalika" />
                  <p class="eyebrow">${escapeHtml(ui.backOverline)}</p>
                  <h1>${escapeHtml(ui.backTitle)}</h1>
                </div>
                <p class="code">
                  <span>${escapeHtml(ui.codeLabel)}</span>
                  ${escapeHtml(record.serial)}
                </p>
              </div>

              <div class="content">
                <div class="row">
                  <span class="label">${escapeHtml(ui.summaryTo)}</span>
                  <div>${escapeHtml(to)}</div>
                </div>
                <div class="row">
                  <span class="label">${escapeHtml(ui.summaryFrom)}</span>
                  <div>${escapeHtml(from)}</div>
                </div>
                <div class="row">
                  <span class="label">${escapeHtml(ui.summaryAmount)}</span>
                  <div>€ ${record.amount}</div>
                </div>
                ${
                  record.message
                    ? `<div class="row message"><span class="label">${escapeHtml(record.locale === "it" ? "Messaggio" : "Message")}</span><div>${escapeHtml(record.message)}</div></div>`
                    : ""
                }
              </div>

            <div class="meta">
              <div>
                ${escapeHtml(ui.summaryPurchaseDate)}: ${displayDate(record.issuedAt)}
              </div>
              <div>${escapeHtml(ui.summaryExpiryDate)}: ${displayDate(record.validUntil)}</div>
            </div>
            </section>
          </section>
        </main>
      </body>
    </html>`;
}

export async function generateGiftCardPdf(record: GiftCardRecord) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.setContent(await giftCardHtml(record), {
      waitUntil: "domcontentloaded",
    });
    return Buffer.from(
      await page.pdf({
        format: "A4",
        landscape: false,
        printBackground: true,
      }),
    );
  } finally {
    await browser.close();
  }
}
