"use client";

import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n-dict";

export function LanguageToggle({ locale, label }: { locale: Locale; label: string }) {
  const router = useRouter();

  function toggle() {
    const next: Locale = locale === "en" ? "fr" : "en";
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000`;
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="rounded-full border border-brand-gold/30 px-2.5 py-1 text-xs font-bold text-brand-gold-dark transition-colors hover:bg-brand-gold-light dark:text-brand-gold dark:hover:bg-[#fff]/10"
    >
      {locale === "en" ? "FR" : "EN"}
    </button>
  );
}
