import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { whatsappLink } from "@/components/WhatsAppButton";
import { getCurrentProfile } from "@/lib/supabase/session";
import { getLocale, UI } from "@/lib/i18n";

// Briques communes aux pages publiques du Groupe YEGA (accueil "/" et "/logistics") :
// en-tête, pied de page et éléments de mise en forme partagés.

export const primaryButton =
  "inline-flex items-center justify-center rounded-xl bg-brand-green px-5 py-3 text-sm font-semibold text-[#fff] shadow-sm shadow-brand-green/30 transition hover:bg-brand-green-dark hover:shadow-md";
export const goldButton =
  "inline-flex items-center justify-center rounded-xl bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-green-deep shadow-sm transition hover:bg-brand-gold-light";
export const ghostOnDarkButton =
  "inline-flex items-center justify-center rounded-xl border border-[#fff]/30 px-5 py-3 text-sm font-semibold text-[#fff] transition hover:border-[#fff]/60 hover:bg-[#fff]/10";

export function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mt-0.5 h-5 w-5 shrink-0 text-brand-green dark:text-brand-gold-on-dark"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function SectionHeading({ surtitre, titre }: { surtitre: string; titre: string }) {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold-dark dark:text-brand-gold-on-dark">
        {surtitre}
      </p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight text-heading sm:text-4xl">
        {titre}
      </h2>
      <div className="gold-rule mt-5" />
    </>
  );
}

// Les deux activités du groupe, autonomes et de même niveau : chacune a sa page publique.
const ACTIVITES = {
  project: { href: "/", badge: "Project" },
  logistics: { href: "/logistics", badge: "Logistics" },
} as const;

type Activite = keyof typeof ACTIVITES;

export async function PublicHeader({ active }: { active: Activite }) {
  const locale = await getLocale();
  const t = UI[locale];
  const profile = await getCurrentProfile();
  const labels: Record<Activite, string> = {
    project: t.public_nav_projets,
    logistics: t.nav_logistics,
  };

  // La page en cours est légèrement mise en surbrillance (fond émeraude clair).
  const linkClass = (isActive: boolean) =>
    "rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors " +
    (isActive
      ? "bg-brand-green-light text-heading ring-1 ring-brand-green/15"
      : "text-heading/70 hover:bg-brand-green-light/60 hover:text-heading");

  return (
    <header className="sticky top-0 z-20 border-b border-brand-gold/20 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link href={ACTIVITES[active].href} className="flex min-w-0 items-center gap-3">
          <Logo />
          <span className="hidden border-l border-brand-gold/40 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-green dark:text-brand-gold-on-dark sm:inline">
            {ACTIVITES[active].badge}
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-2 md:flex">
          {(Object.keys(ACTIVITES) as Activite[]).map((key) => (
            <Link key={key} href={ACTIVITES[key].href} className={linkClass(active === key)}>
              {labels[key]}
            </Link>
          ))}
          <a
            href={whatsappLink(t.whatsapp_message)}
            target="_blank"
            rel="noreferrer"
            className={linkClass(false)}
          >
            {t.public_nav_contact}
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <LanguageToggle locale={locale} label={t.changer_langue} />
          <span className="hidden sm:block">
            <ThemeToggle label={t.changer_theme} />
          </span>
          <Link
            href={profile ? "/dashboard" : "/login"}
            className="rounded-full bg-brand-green px-3 py-1.5 text-xs font-semibold text-[#fff] transition-colors hover:bg-brand-green-dark sm:px-4"
          >
            {profile ? t.public_mon_espace : t.public_espace_client}
          </Link>
        </div>
      </div>

      <nav className="flex items-center gap-1 border-t border-gray-100 px-2.5 py-2 md:hidden">
        {(Object.keys(ACTIVITES) as Activite[]).map((key) => (
          <Link key={key} href={ACTIVITES[key].href} className={linkClass(active === key)}>
            {labels[key]}
          </Link>
        ))}
        <a
          href={whatsappLink(t.whatsapp_message)}
          target="_blank"
          rel="noreferrer"
          className={linkClass(false)}
        >
          {t.public_nav_contact}
        </a>
      </nav>
    </header>
  );
}

export async function PublicFooter() {
  const t = UI[await getLocale()];

  return (
    <footer className="border-t border-brand-gold/20 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo size="sm" />
          <p className="mt-3 text-xs text-gray-500">
            © {new Date().getFullYear()} {t.public_footer_groupe} {t.public_footer_droits}
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-heading/80">
          <Link href="/" className="hover:text-heading">
            {t.public_nav_projets}
          </Link>
          <Link href="/logistics" className="hover:text-heading">
            {t.nav_logistics}
          </Link>
          <Link href="/login" className="hover:text-heading">
            {t.public_espace_client}
          </Link>
          <a
            href={whatsappLink(t.whatsapp_message)}
            target="_blank"
            rel="noreferrer"
            className="hover:text-heading"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </footer>
  );
}
