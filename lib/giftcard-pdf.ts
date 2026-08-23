import { readFile } from "fs/promises";
import path from "path";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  pushGraphicsState,
  popGraphicsState,
  moveTo,
  lineTo,
  appendBezierCurve,
  closePath,
  clip,
  endPath,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";
import { type GiftCardDesign, type GiftCardRecord } from "./giftcard";
import { getGiftCardUi } from "./giftcard-ui";

const PAGE_W = 842;
const PAGE_H = 595;
const MARGIN = 40;

const BROWN = rgb(0x6b / 255, 0x3a / 255, 0x2a / 255);
const WISTERIA = rgb(0xc9 / 255, 0x7b / 255, 0xb2 / 255);
const BODY = rgb(0x5a / 255, 0x4a / 255, 0x42 / 255);
const RULE = rgb(0xed / 255, 0xe4 / 255, 0xdc / 255);

const FRONT_FILES: Record<GiftCardDesign, string> = {
  estetica: "gift-card-deserto-kalika.jpg",
  spa: "gift-card-montagna-kalika.jpg",
  coppia: "gift-card-mare-kalika.jpg",
};

function formatDate(value: string, locale: GiftCardRecord["locale"]) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

/**
 * Standard PDF fonts only support the WinAnsi character set. Emoji and most
 * non-Latin characters make pdf-lib's drawText throw an encoding error
 * (e.g. "WinAnsi cannot encode '😜' (0x1f61c)") instead of just failing to
 * render, so free-text fields typed by a customer at checkout — message,
 * names, treatment name — need filtering before they reach the page. Stripe
 * metadata and the Resend email are untouched by this: it only ever runs on
 * the copy that lands in the PDF.
 *
 * Checked against the embedded font's real character set rather than a
 * guessed Unicode range: a range like \x20–\xFF looks plausible but is
 * wrong — "€" is U+20AC, outside that range, yet WinAnsi encodes it fine.
 * A naive range filter would silently drop the currency sign from every
 * gift amount.
 */
function sanitizeForPdf(text: string, font: PDFFont): string {
  const encodable = new Set(font.getCharacterSet());
  return [...text]
    .filter((ch) => {
      const codePoint = ch.codePointAt(0);
      return codePoint !== undefined && encodable.has(codePoint);
    })
    .join("");
}

/** Standard PDF fonts only support WinAnsi — normalize common Unicode. */
function toWinAnsiSafe(text: string) {
  return text
    .replace(/\u2014/g, "-")
    .replace(/\u2013/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u00A0/g, " ");
}

function wrapText(
  text: string,
  font: PDFFont,
  size: number,
  maxWidth: number,
): string[] {
  const normalized = toWinAnsiSafe(text).replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const words = normalized.split(" ");
  const lines: string[] = [];
  let current = "";

  const pushHardBroken = (word: string) => {
    let chunk = "";
    for (const ch of word) {
      const next = chunk + ch;
      if (font.widthOfTextAtSize(next, size) > maxWidth && chunk) {
        lines.push(chunk);
        chunk = ch;
      } else {
        chunk = next;
      }
    }
    current = chunk;
  };

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) <= maxWidth) {
      current = test;
      continue;
    }
    if (current) lines.push(current);
    if (font.widthOfTextAtSize(word, size) > maxWidth) {
      pushHardBroken(word);
    } else {
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawSpacedText(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  size: number,
  font: PDFFont,
  color: ReturnType<typeof rgb>,
  tracking = 1.8,
  alignRight = false,
) {
  const safe = toWinAnsiSafe(text);
  const chars = [...safe];
  const widths = chars.map((ch) => font.widthOfTextAtSize(ch, size));
  const total =
    widths.reduce((a, b) => a + b, 0) + tracking * Math.max(0, chars.length - 1);
  let cursor = alignRight ? x - total : x;
  for (let i = 0; i < chars.length; i++) {
    page.drawText(chars[i], { x: cursor, y, size, font, color });
    cursor += widths[i] + tracking;
  }
}

function drawLabel(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  font: PDFFont,
) {
  drawSpacedText(page, text.toUpperCase(), x, y, 8, font, WISTERIA, 2.2);
}

function drawRule(page: PDFPage, x: number, y: number, width: number) {
  page.drawLine({
    start: { x, y },
    end: { x: x + width, y },
    thickness: 0.75,
    color: RULE,
  });
}

/** Rounded-rect clip (pdf-lib operators), origin bottom-left. */
function clipRoundedRect(
  page: PDFPage,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  const c = 0.5522847498 * r;
  const x0 = x;
  const y0 = y;
  const x1 = x + width;
  const y1 = y + height;

  page.pushOperators(
    pushGraphicsState(),
    moveTo(x0 + r, y0),
    lineTo(x1 - r, y0),
    appendBezierCurve(x1 - r + c, y0, x1, y0 + r - c, x1, y0 + r),
    lineTo(x1, y1 - r),
    appendBezierCurve(x1, y1 - r + c, x1 - r + c, y1, x1 - r, y1),
    lineTo(x0 + r, y1),
    appendBezierCurve(x0 + r - c, y1, x0, y1 - r + c, x0, y1 - r),
    lineTo(x0, y0 + r),
    appendBezierCurve(x0, y0 + r - c, x0 + r - c, y0, x0 + r, y0),
    closePath(),
    clip(),
    endPath(),
  );
}

async function loadFrontImage(
  pdf: PDFDocument,
  design: GiftCardDesign,
) {
  const filename = FRONT_FILES[design];
  const filePath = path.join(process.cwd(), "public", filename);
  const bytes = await readFile(filePath);
  return pdf.embedJpg(bytes);
}

/**
 * Generates a single-page A4 landscape gift-card PDF with pdf-lib.
 * Brand fonts (Cormorant / Jost) are not bundled — uses Times / Helvetica.
 */
export async function generateGiftCardPdf(record: GiftCardRecord) {
  const ui = getGiftCardUi(record.locale);

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([PAGE_W, PAGE_H]);

  // No .ttf/.otf brand fonts in the repo — standard PDF fonts as fallback.
  const fontSans = await pdf.embedFont(StandardFonts.Helvetica);
  const fontSerif = await pdf.embedFont(StandardFonts.TimesRoman);
  const fontSerifItalic = await pdf.embedFont(StandardFonts.TimesRomanItalic);

  page.drawRectangle({
    x: 0,
    y: 0,
    width: PAGE_W,
    height: PAGE_H,
    color: rgb(1, 1, 1),
  });

  const contentW = PAGE_W - MARGIN * 2;
  const colW = contentW * 0.45;
  const gap = contentW * 0.1;
  const leftX = MARGIN;
  const rightX = MARGIN + colW + gap;

  // —— Left column: design image ——
  const image = await loadFrontImage(pdf, record.design);
  const imgAspect = image.width / image.height;
  const imgW = colW;
  const imgH = imgW / imgAspect;
  const imgX = leftX;
  const imgY = (PAGE_H - imgH) / 2;
  const radius = 10;

  clipRoundedRect(page, imgX, imgY, imgW, imgH, radius);
  page.drawImage(image, {
    x: imgX,
    y: imgY,
    width: imgW,
    height: imgH,
  });
  page.pushOperators(popGraphicsState());

  // —— Right column: details ——
  const from = toWinAnsiSafe(
    sanitizeForPdf(
      `${record.fromFirstName} ${record.fromLastName}`.trim(),
      fontSans,
    ),
  );
  const to = toWinAnsiSafe(
    sanitizeForPdf(`${record.toFirstName} ${record.toLastName}`.trim(), fontSans),
  );
  const valueLabel = record.treatmentName
    ? ui.summaryTreatment
    : ui.summaryValue;
  const valueText = toWinAnsiSafe(
    record.treatmentName
      ? sanitizeForPdf(record.treatmentName, fontSans)
      : `${record.amount} €`,
  );
  const messageText = toWinAnsiSafe(
    record.message?.trim()
      ? sanitizeForPdf(record.message.trim(), fontSans)
      : ui.frontPlaceholderMessage,
  );
  const messageLabel = record.locale === "it" ? "Messaggio" : "Message";

  let y = PAGE_H - MARGIN;

  // Code block — top right of right column
  drawSpacedText(
    page,
    ui.codeLabel.toUpperCase(),
    rightX + colW,
    y - 8,
    8,
    fontSans,
    WISTERIA,
    2.2,
    true,
  );
  y -= 28;
  const serialSize = 16;
  const serial = toWinAnsiSafe(record.serial);
  const serialW = fontSans.widthOfTextAtSize(serial, serialSize);
  page.drawText(serial, {
    x: rightX + colW - serialW,
    y: y - serialSize,
    size: serialSize,
    font: fontSans,
    color: BROWN,
  });
  y -= serialSize + 22;

  drawLabel(page, ui.backOverline, rightX, y - 8, fontSans);
  y -= 26;

  const titleSize = 22;
  const title = toWinAnsiSafe(ui.backTitle);
  page.drawText(title, {
    x: rightX,
    y: y - titleSize,
    size: titleSize,
    font: fontSerif,
    color: BROWN,
  });
  y -= titleSize + 20;

  const drawField = (label: string, value: string, italic = false) => {
    drawLabel(page, label, rightX, y - 8, fontSans);
    y -= 22;
    const font = italic ? fontSerifItalic : fontSans;
    const size = italic ? 11 : 12;
    const lines = wrapText(value, font, size, colW);
    const lineHeight = size + 4;
    for (const line of lines) {
      page.drawText(line, {
        x: rightX,
        y: y - size,
        size,
        font,
        color: BODY,
      });
      y -= lineHeight;
    }
    y -= 10;
  };

  drawField(ui.summaryTo, to);
  drawField(ui.summaryFrom, from);
  drawField(valueLabel, valueText);
  drawField(messageLabel, messageText, true);

  y -= 4;
  drawRule(page, rightX, y, colW);
  y -= 18;

  // Motto — centered, two lines preferred
  const motto = toWinAnsiSafe(ui.backMotto);
  const mottoSize = 11;
  const mottoLines = wrapText(motto, fontSerifItalic, mottoSize, colW);
  const mottoLineH = mottoSize + 5;
  for (const line of mottoLines) {
    const w = fontSerifItalic.widthOfTextAtSize(line, mottoSize);
    page.drawText(line, {
      x: rightX + (colW - w) / 2,
      y: y - mottoSize,
      size: mottoSize,
      font: fontSerifItalic,
      color: BROWN,
    });
    y -= mottoLineH;
  }

  y -= 12;
  drawRule(page, rightX, y, colW);
  y -= 20;

  // Dates row
  const dateSize = 8;
  const purchaseLabel = ui.summaryPurchaseDate.toUpperCase();
  const expiryLabel = ui.summaryExpiryDate.toUpperCase();
  const purchaseDate = formatDate(record.issuedAt, record.locale);
  const expiryDate = formatDate(record.validUntil, record.locale);

  drawSpacedText(
    page,
    purchaseLabel,
    rightX,
    y - dateSize,
    dateSize,
    fontSans,
    WISTERIA,
    1.6,
  );
  drawSpacedText(
    page,
    expiryLabel,
    rightX + colW,
    y - dateSize,
    dateSize,
    fontSans,
    WISTERIA,
    1.6,
    true,
  );
  y -= dateSize + 12;

  page.drawText(purchaseDate, {
    x: rightX,
    y: y - 10,
    size: 10,
    font: fontSans,
    color: BODY,
  });
  const expiryDateW = fontSans.widthOfTextAtSize(expiryDate, 10);
  page.drawText(expiryDate, {
    x: rightX + colW - expiryDateW,
    y: y - 10,
    size: 10,
    font: fontSans,
    color: BODY,
  });

  const bytes = await pdf.save();
  return Buffer.from(bytes);
}
