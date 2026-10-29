import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { whatsappLink } from "@/components/WhatsAppButton";
import { getCurrentProfile } from "@/lib/supabase/session";
import { getLocale, UI } from "@/lib/i18n";
import { getLogisticsContent } from "@/lib/logistics-content";

// Page publique (hors PROTECTED_PREFIXES de proxy.ts) : vitrine de YEGA LOGISTICS, la filiale
// logistique du Groupe YEGA — PoubApp, livraison écologique et sous-traitance logistique.

export async function generateMetadata(): Promise<Metadata> {
  const c = getLogisticsContent(await getLocale());
  return { title: c.meta_titre, description: c.meta_description };
}

const SERVICE_ICONS = {
  poubapp: (
    <path d="M9 3h6m-9 3h12m-1 0-.8 12.1a2 2 0 0 1-2 1.9H9.8a2 2 0 0 1-2-1.9L7 6m3 4v6m4-6v6" />
  ),
  livraison: (
    <path d="M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM9 17h6m2 0-3-7h-3m3 0 1-3h2M5 17l2-5h5m1-5-1 3" />
  ),
  "sous-traitance": (
    <path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6M9 10h.01M15 10h.01" />
  ),
} as const;

function ServiceIcon({ name }: { name: keyof typeof SERVICE_ICONS }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden
    >
      {SERVICE_ICONS[name]}
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-5 w-5 shrink-0 text-brand-green dark:text-brand-gold-on-dark" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SectionHeading({ surtitre, titre }: { surtitre: string; titre: string }) {
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

const primaryButton =
  "inline-flex items-center justify-center rounded-xl bg-brand-green px-5 py-3 text-sm font-semibold text-[#fff] shadow-sm shadow-brand-green/30 transition hover:bg-brand-green-dark hover:shadow-md";
const goldButton =
  "inline-flex items-center justify-center rounded-xl bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-green-deep shadow-sm transition hover:bg-brand-gold-light";
const ghostOnDarkButton =
  "inline-flex items-center justify-center rounded-xl border border-[#fff]/30 px-5 py-3 text-sm font-semibold text-[#fff] transition hover:border-[#fff]/60 hover:bg-[#fff]/10";

export default async function LogisticsPage() {
  const locale = await getLocale();
  const c = getLogisticsContent(locale);
  const t = UI[locale];
  const profile = await getCurrentProfile();

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-20 border-b border-brand-gold/20 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/logistics" className="flex min-w-0 items-center gap-3">
            <Logo />
            <span className="hidden border-l border-brand-gold/40 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-green dark:text-brand-gold-on-dark sm:inline">
              Logistics
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <LanguageToggle locale={locale} label={t.changer_langue} />
            <span className="hidden sm:block">
              <ThemeToggle label={t.changer_theme} />
            </span>
            <Link
              href={profile ? "/dashboard" : "/login"}
              className="rounded-full border border-brand-green/20 px-3 py-1.5 text-xs font-semibold text-heading transition-colors hover:border-brand-green hover:bg-brand-green-light sm:px-4"
            >
              {profile ? c.nav_retour_espace : c.nav_espace_client}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="brand-surface text-[#fff]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold-on-dark">
              YEGA LOGISTICS · {c.hero_surtitre}
            </p>
            <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {c.hero_titre}
            </h1>
            <div className="gold-rule mt-6" />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#fff]/75 sm:text-lg">
              {c.hero_desc}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#services" className={goldButton}>
                {c.hero_cta_services}
              </a>
              <a
                href={whatsappLink(c.final_whatsapp_message)}
                target="_blank"
                rel="noreferrer"
                className={ghostOnDarkButton}
              >
                {c.hero_cta_contact}
              </a>
            </div>
          </div>
        </section>

        {/* Vue d'ensemble des trois services */}
        <section id="services" className="scroll-mt-20 bg-background">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-heading sm:text-3xl">
              {c.services_titre}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {c.services.map((service) => (
                <a
                  key={service.ancre}
                  href={`#${service.ancre}`}
                  className="card card-interactive flex flex-col rounded-2xl border border-gray-100 bg-white p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-light text-brand-green dark:text-brand-gold-on-dark">
                    <ServiceIcon name={service.ancre} />
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-heading">
                    {service.titre}
                  </h3>
                  <p className="text-sm font-semibold text-brand-gold-dark dark:text-brand-gold-on-dark">
                    {service.sous_titre}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">{service.desc}</p>
                  <span className="mt-4 text-sm font-semibold text-brand-green dark:text-brand-gold-on-dark">
                    {c.services_en_savoir_plus}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Service 1 — PoubApp */}
        <section id="poubapp" className="scroll-mt-20 border-t border-gray-100 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
              <div>
                <SectionHeading surtitre={c.poubapp_surtitre} titre={c.poubapp_titre} />
                <p className="mt-6 max-w-2xl leading-relaxed text-gray-600">{c.poubapp_desc}</p>              </div>
              <Image
                src="/poubapp-logo.png"
                alt="PoubApp"
                width={240}
                height={240}
                className="mx-auto h-44 w-44 sm:h-60 sm:w-60"
              />
            </div>

            <h3 className="mt-14 font-[family-name:var(--font-display)] text-xl font-semibold text-heading">
              {c.poubapp_etapes_titre}
            </h3>
            <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.poubapp_etapes.map((etape, index) => (
                <li key={etape.titre} className="rounded-2xl bg-brand-green-light/70 p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-[#fff]">
                    {index + 1}
                  </span>
                  <p className="mt-3 font-semibold text-heading">{etape.titre}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{etape.desc}</p>
                </li>
              ))}
            </ol>

            <h3 className="mt-14 font-[family-name:var(--font-display)] text-xl font-semibold text-heading">
              {c.poubapp_formules_titre}
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.poubapp_formules.map((formule) => (
                <div
                  key={formule.nom}
                  className={
                    "card relative flex flex-col rounded-2xl border p-5 " +
                    (formule.mise_en_avant
                      ? "border-brand-gold bg-brand-gold-light/30 dark:bg-brand-gold/10"
                      : "border-gray-100 bg-white")
                  }
                >
                  {formule.mise_en_avant && (
                    <span className="absolute -top-3 left-5 rounded-full bg-brand-gold px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-green-deep">
                      {c.poubapp_populaire}
                    </span>
                  )}
                  <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-heading">
                    {formule.nom}
                  </p>
                  <p className="mt-3 text-2xl font-bold text-heading">{formule.prix}</p>
                  <p className="text-xs text-gray-500">{formule.unite}</p>
                  {formule.promo && (
                    <p className="mt-3 rounded-lg bg-brand-green-light px-2.5 py-1.5 text-xs font-semibold text-brand-green dark:text-brand-gold-on-dark">
                      {formule.promo}
                    </p>
                  )}
                  <p className="mt-3 text-sm text-gray-600">{formule.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-gray-500">{c.poubapp_formules_note}</p>

            {/* Téléchargement : l'application n'est pas encore publiée sur les stores. */}
            <div className="mt-12 flex flex-col gap-6 rounded-3xl bg-brand-green-dark p-6 text-[#fff] sm:p-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                  {c.poubapp_telecharger_titre}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#fff]/75">
                  {c.poubapp_telecharger_desc}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {[c.poubapp_google_play, c.poubapp_app_store].map((store) => (
                    <span
                      key={store}
                      aria-disabled
                      className="flex flex-col rounded-xl border border-[#fff]/25 px-4 py-2 leading-tight text-[#fff]/60"
                    >
                      <span className="text-[10px] uppercase tracking-wider">{c.poubapp_bientot}</span>
                      <span className="text-sm font-semibold">{store}</span>
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={whatsappLink(c.poubapp_whatsapp_message)}
                target="_blank"
                rel="noreferrer"
                className={goldButton + " shrink-0"}
              >
                {c.poubapp_cta_prevenu}
              </a>
            </div>
          </div>
        </section>

        {/* Service 2 — Livraison écologique */}
        <section id="livraison" className="scroll-mt-20 border-t border-gray-100 bg-background">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SectionHeading surtitre={c.livraison_surtitre} titre={c.livraison_titre} />
            <p className="mt-6 max-w-2xl leading-relaxed text-gray-600">{c.livraison_desc}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {c.livraison_points.map((point) => (
                <div key={point.titre} className="card flex gap-3 rounded-2xl border border-gray-100 bg-white p-5">
                  <CheckIcon />
                  <div>
                    <p className="font-semibold text-heading">{point.titre}</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href={whatsappLink(c.livraison_whatsapp_message)}
              target="_blank"
              rel="noreferrer"
              className={primaryButton + " mt-8"}
            >
              {c.livraison_cta}
            </a>
          </div>
        </section>

        {/* Service 3 — Sous-traitance logistique */}
        <section id="sous-traitance" className="scroll-mt-20 border-t border-gray-100 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SectionHeading surtitre={c.soustraitance_surtitre} titre={c.soustraitance_titre} />
            <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">{c.soustraitance_desc}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {c.soustraitance_services.map((service) => (
                <li key={service} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                  <CheckIcon />
                  {service}
                </li>
              ))}
            </ul>

            <a
              href={whatsappLink(c.soustraitance_whatsapp_message)}
              target="_blank"
              rel="noreferrer"
              className={primaryButton + " mt-8"}
            >
              {c.soustraitance_cta}
            </a>

            {/* Références clients : une carte par entreprise, puis une invitation à les rejoindre. */}
            <h3 className="mt-14 text-center text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold-dark dark:text-brand-gold-on-dark">
              {c.soustraitance_confiance_titre}
            </h3>
            <div className="mx-auto mt-6 grid max-w-3xl gap-4 sm:grid-cols-2">
              <div className="card flex items-center justify-center gap-4 rounded-2xl border border-gray-100 bg-white p-6">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#fff] p-1.5 ring-1 ring-gray-100">
                  <Image src="/yelele-digit.png" alt="" width={56} height={54} />
                </span>
                <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-heading">
                  YELELE DIGIT
                </p>
              </div>
              <a
                href={whatsappLink(c.soustraitance_whatsapp_message)}
                target="_blank"
                rel="noreferrer"
                className="card-interactive flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-gold/50 p-6 text-center transition hover:border-brand-gold hover:bg-brand-gold-light/20"
              >
                <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-heading">
                  {c.soustraitance_rejoindre_titre}
                </p>
                <p className="mt-1 text-sm text-gray-600">{c.soustraitance_rejoindre_desc}</p>
                <p className="mt-3 text-sm font-semibold text-brand-green dark:text-brand-gold-on-dark">
                  {c.soustraitance_rejoindre_cta}
                </p>
              </a>
            </div>
          </div>
        </section>

        {/* Appel final */}
        <section className="brand-surface text-[#fff]">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">
                {c.final_titre}
              </h2>
              <p className="mt-2 max-w-xl text-[#fff]/75">{c.final_desc}</p>
            </div>
            <a
              href={whatsappLink(c.final_whatsapp_message)}
              target="_blank"
              rel="noreferrer"
              className={goldButton + " shrink-0"}
            >
              {c.final_cta}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
