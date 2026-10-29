import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LanguageToggle } from "@/components/LanguageToggle";
import { getLocale, UI } from "@/lib/i18n";
import { RegisterForm } from "./register-form";

export default async function RegisterPage() {
  const locale = await getLocale();
  const t = UI[locale];

  return (
    <div className="brand-surface flex min-h-screen items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl shadow-black/30 md:grid-cols-2">
        <div className="hidden flex-col justify-between bg-transparent p-10 text-[#fff] md:flex">
          <Link href="/" className="self-start">
            <Logo variant="light" size="lg" />
          </Link>
          <div>
            <p className="font-[family-name:var(--font-display)] text-3xl leading-tight">
              {t.register_accroche}
            </p>
            <div className="gold-rule mt-6" />
            <p className="mt-4 text-sm text-[#fff]/70">{t.register_accroche_desc}</p>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#fff]/40">{t.espaces}</p>
        </div>

        <div className="bg-white p-8 sm:p-10">
          <div className="mb-6 flex items-center justify-between md:hidden">
            <Link href="/">
              <Logo />
            </Link>
            <LanguageToggle locale={locale} label={t.changer_langue} />
          </div>
          <div className="hidden items-center justify-end md:flex">
            <LanguageToggle locale={locale} label={t.changer_langue} />
          </div>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-heading">
            {t.register_titre}
          </h1>
          <p className="mt-1 text-sm text-brand-ink/60">{t.register_sous_titre}</p>

          <RegisterForm locale={locale} />

          <p className="mt-6 text-center text-sm text-brand-ink/60">
            {t.register_deja_compte}{" "}
            <Link href="/login" className="font-medium text-brand-green hover:text-heading">
              {t.register_se_connecter}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
