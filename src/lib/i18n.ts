import { cookies } from "next/headers";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n-dict";

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  return store.get(LOCALE_COOKIE)?.value === "en" ? "en" : "fr";
}

export { LOCALE_COOKIE, UI, type Locale, type UIDict } from "@/lib/i18n-dict";
