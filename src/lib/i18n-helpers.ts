import type { LocalizedText } from "./types";

export function getLocalizedField(
  field: LocalizedText | undefined | null,
  locale: string
): string {
  if (!field) return "";
  const value = field[locale as keyof LocalizedText];
  if (value) return value;
  return field.en || field.ja || "";
}
