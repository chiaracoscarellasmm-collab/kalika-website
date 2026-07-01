import "server-only";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import {
  addMonths,
  type GiftCardRecord,
  type GiftCardRequest,
} from "./giftcard";

const dataDir = path.join(process.cwd(), ".data");
const dataFile = path.join(dataDir, "gift-cards.json");

async function readRecords(): Promise<GiftCardRecord[]> {
  try {
    const raw = await readFile(dataFile, "utf8");
    return JSON.parse(raw) as GiftCardRecord[];
  } catch {
    return [];
  }
}

async function writeRecords(records: GiftCardRecord[]) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify(records, null, 2));
}

export async function generateSerial(): Promise<string> {
  const year = new Date().getFullYear();
  const records = await readRecords();
  const countForYear = records.filter((record) =>
    record.serial.startsWith(`KLK-${year}-`),
  ).length;
  return `KLK-${year}-${String(countForYear + 1).padStart(4, "0")}`;
}

export async function saveGiftCardRecord(
  input: GiftCardRequest & {
    stripeSessionId: string;
    paymentIntentId?: string;
  },
): Promise<GiftCardRecord> {
  const issuedAt = new Date();
  const record: GiftCardRecord = {
    ...input,
    id: crypto.randomUUID(),
    serial: await generateSerial(),
    issuedAt: issuedAt.toISOString(),
    validUntil: addMonths(issuedAt, 6).toISOString(),
    status: "paid",
  };
  const records = await readRecords();
  records.push(record);
  await writeRecords(records);
  return record;
}

export async function findGiftCardByStripeSession(
  stripeSessionId: string,
): Promise<GiftCardRecord | null> {
  const records = await readRecords();
  return records.find((record) => record.stripeSessionId === stripeSessionId) ?? null;
}

export async function markGiftCardFulfilled(serial: string) {
  const records = await readRecords();
  const next = records.map((record) =>
    record.serial === serial ? { ...record, status: "fulfilled" as const } : record,
  );
  await writeRecords(next);
}
