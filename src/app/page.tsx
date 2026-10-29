import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { whatsappLink } from "@/components/WhatsAppButton";
import {
  CheckIcon,
  PublicFooter,
  PublicHeader,
  SectionHeading,
  ghostOnDarkButton,
  goldButton,
  primaryButton,
} from "@/components/PublicSite";
import { getLocale, UI } from "@/lib/i18n";
import { getHomeContent } from "@/lib/home-content";

// Page d'accueil publique du Groupe YEGA : présente YEGA Projets et YEGA LOGISTICS, avec un
// accès direct à l'espace client. Les utilisateurs connectés y accèdent aussi (bouton
// « Mon espace » dans l'en-tête) ; le logo de l'espace connecté renvoie, lui, à /dashboard.

export async function generateMetadata(): Promise<Metadata> {
  const c = getHomeContent(await getLocale());
  return { title: c.meta_titre, description: c.meta_description };
}

export default async function HomePage() {
  const locale = await getLocale();
  const c = getHomeContent(locale);
  const t = UI[locale];

  return (
    <div className="flex flex-1 flex-col">
      <PublicHeader active="accueil" />

      <main className="flex-1">
        {/* Hero */}
        <section className="brand-surface text-[#fff]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold-on-dark">
                {c.hero_surtitre}
              </p>
              <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
                {c.hero_titre}
              </h1>
              <div className="gold-rule mt-6" />
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#fff]/75 sm:text-lg">
                {c.hero_desc}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/register" className={goldButton}>
                  {c.hero_cta_projet}
                </Link>
                <Link href="/logistics" className={ghostOnDarkButton}>
                  {c.hero_cta_logistics}
                </Link>
              </div>
            </div>
            <Image
              src="/logo-icon-gold.png"
              alt=""
              width={173}
              height={212}
              priority
              className="hidden h-52 w-auto opacity-90 md:block"
            />
          </div>
        </section>

        {/* Les deux activités du groupe */}
        <section className="bg-background">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-heading sm:text-3xl">
              {c.poles_titre}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {c.poles.map((pole) => (
                <div
                  key={pole.id}
                  className="card flex flex-col rounded-3xl border border-gray-100 bg-white p-7"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold-dark dark:text-brand-gold-on-dark">
                    {pole.nom}
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug text-heading">
                    {pole.accroche}
                  </p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {pole.services.map((service) => (
                      <li key={service} className="flex gap-3 text-sm text-gray-700">
                        <CheckIcon />
                        {service}
                      </li>
                    ))}
                  </ul>
                  <Link href={pole.href} className={primaryButton + " mt-7 self-start"}>
                    {pole.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* YEGA Projets */}
        <section id="projets" className="scroll-mt-28 border-t border-gray-100 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SectionHeading surtitre={c.projets_surtitre} titre={c.projets_titre} />
            <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">{c.projets_desc}</p>

            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.projets_etapes.map((etape, index) => (
                <li key={etape.titre} className="rounded-2xl bg-brand-green-light/70 p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-[#fff]">
                    {index + 1}
                  </span>
                  <p className="mt-3 font-semibold text-heading">{etape.titre}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{etape.desc}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {c.projets_garanties.map((garantie) => (
                <div
                  key={garantie.titre}
                  className="card flex gap-3 rounded-2xl border border-gray-100 bg-white p-5"
                >
                  <CheckIcon />
                  <div>
                    <p className="font-semibold text-heading">{garantie.titre}</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{garantie.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pour qui */}
        <section className="border-t border-gray-100 bg-background">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-heading sm:text-3xl">
              {c.pour_qui_titre}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.pour_qui.map((cible) => (
                <div
                  key={cible.titre}
                  className="card rounded-2xl border-t-4 border-brand-gold bg-white p-5"
                >
                  <p className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-heading">
                    {cible.titre}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{cible.desc}</p>
                </div>
              ))}
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
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link href="/register" className={goldButton}>
                {c.final_cta_compte}
              </Link>
              <a
                href={whatsappLink(t.whatsapp_message)}
                target="_blank"
                rel="noreferrer"
                className={ghostOnDarkButton}
              >
                {c.final_cta_whatsapp}
              </a>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
