import Link from "next/link";
import { Logo } from "@/components/Logo";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <div className="brand-surface flex min-h-screen items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl shadow-black/30 md:grid-cols-2">
        <div className="hidden flex-col justify-between bg-transparent p-10 text-[#fff] md:flex">
          <Logo variant="light" size="lg" />
          <div>
            <p className="font-[family-name:var(--font-display)] text-3xl leading-tight">
              Déposez votre premier projet en quelques minutes.
            </p>
            <div className="gold-rule mt-6" />
            <p className="mt-4 text-sm text-[#fff]/70">
              Immobilier, démarches administratives, événements — YEGA accompagne chaque étape,
              du premier contact à la clôture du dossier.
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#fff]/40">
            Espace client · Back-office · Mission terrain
          </p>
        </div>

        <div className="bg-white p-8 sm:p-10">
          <div className="mb-6 md:hidden">
            <Logo />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-heading">
            Créer un compte
          </h1>
          <p className="mt-1 text-sm text-brand-ink/60">
            Ouvrez votre espace client YEGA en quelques secondes.
          </p>

          <RegisterForm />

          <p className="mt-6 text-center text-sm text-brand-ink/60">
            Déjà un compte ?{" "}
            <Link href="/login" className="font-medium text-brand-green hover:text-heading">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
