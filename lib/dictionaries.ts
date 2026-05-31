import "server-only";
import type { Locale } from "./i18n";

const dictionaries = {
  it: () => import("@/messages/it.json").then((m) => m.default),
  en: () => import("@/messages/en.json").then((m) => m.default),
} as const;

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["it"]>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
