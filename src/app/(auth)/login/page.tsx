import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LanguageToggle } from "@/components/LanguageToggle";
import { getLocale, UI } from "@/lib/i18n";
import { LoginForm } from "./login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const locale = await getLocale();
  const t = UI[locale];

  return (
    <div className="brand-surface flex min-h-screen items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl shadow-black/30 md:grid-cols-2">
        <div className="hidden flex-col justify-between bg-transparent p-10 text-[#fff] md:flex">
          <Logo variant="light" size="lg" />
          <div>
            <p className="font-[family-name:var(--font-display)] text-3xl leading-tight">
              Même à des milliers de kilomètres, gardez le contrôle de votre projet au Cameroun.
            </p>
            <div className="gold-rule mt-6" />
            <p className="mt-4 text-sm text-[#fff]/70">
              Suivi en temps réel, documents sécurisés, paiements tracés — une seule plateforme
              pour la diaspora camerounaise.
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#fff]/40">
            Espace client · Back-office · Mission terrain
          </p>
        </div>

        <div className="bg-white p-8 sm:p-10">
          <div className="mb-6 flex items-center justify-between md:hidden">
            <Logo />
            <LanguageToggle locale={locale} label={t.changer_langue} />
          </div>
          <div className="hidden items-center justify-end md:flex">
            <LanguageToggle locale={locale} label={t.changer_langue} />
          </div>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-heading">
            {t.login_titre}
          </h1>
          <p className="mt-1 text-sm text-brand-ink/60">{t.login_sous_titre}</p>

          <LoginForm next={next ?? "/dashboard"} />

          <p className="mt-6 text-center text-sm text-brand-ink/60">
            Pas encore de compte ?{" "}
            <Link href="/register" className="font-medium text-brand-green hover:text-heading">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
