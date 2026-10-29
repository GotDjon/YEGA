import type { Metadata } from "next";
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

// Page publique de YEGA PROJECT (accueil "/") : accompagnement des projets au Cameroun
// (Home / Project / Moments). Même structure que /logistics (YEGA LOGISTICS) — les deux
// activités du groupe sont autonomes et présentées à égalité.

export async function generateMetadata(): Promise<Metadata> {
  const c = getHomeContent(await getLocale());
  return { title: c.meta_titre, description: c.meta_description };
}

const SERVICE_ICONS = {
  home: <path d="M3 11.5 12 4l9 7.5M5.5 9.5V20h13V9.5M10 20v-5.5h4V20" />,
  demarches: (
    <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm7 0v5h5M9 13h6M9 17h4" />
  ),
  moments: (
    <path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.4l-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L12 3Z" />
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

export default async function ProjectPage() {
  const locale = await getLocale();
  const c = getHomeContent(locale);
  const t = UI[locale];

  return (
    <div className="flex flex-1 flex-col">
      <PublicHeader active="project" />

      <main className="flex-1">
        {/* Hero */}
        <section className="brand-surface text-[#fff]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold-on-dark">
              YEGA PROJECT · {c.hero_surtitre}
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
              <Link href="/register" className={ghostOnDarkButton}>
                {c.hero_cta_compte}
              </Link>
            </div>
          </div>
        </section>

        {/* Vue d'ensemble des trois familles de services */}
        <section id="services" className="scroll-mt-28 bg-background">
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
                    {service.famille}
                  </h3>
                  <p className="text-sm font-semibold text-brand-gold-dark dark:text-brand-gold-on-dark">
                    {service.titre}
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

        {/* Présentation détaillée de chaque service */}
        {c.details.map((detail, index) => (
          <section
            key={detail.ancre}
            id={detail.ancre}
            className={
              "scroll-mt-28 border-t border-gray-100 " + (index % 2 === 0 ? "bg-white" : "bg-background")
            }
          >
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
              <SectionHeading surtitre={detail.surtitre} titre={detail.titre} />
              <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">{detail.desc}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {detail.prestations.map((prestation) => (
                  <li
                    key={prestation}
                    className="card flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 text-sm leading-relaxed text-gray-700"
                  >
                    <CheckIcon />
                    {prestation}
                  </li>
                ))}
              </ul>
              <Link href="/register" className={primaryButton + " mt-8"}>
                {detail.cta}
              </Link>
            </div>
          </section>
        ))}

        {/* Parcours en 7 étapes et engagements */}
        <section className="border-t border-gray-100 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SectionHeading surtitre={c.parcours_surtitre} titre={c.parcours_titre} />
            <p className="mt-6 max-w-2xl leading-relaxed text-gray-600">{c.parcours_desc}</p>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
              {c.parcours.map((etape, i) => (
                <li key={etape.titre} className="rounded-2xl bg-brand-green-light/70 p-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-[#fff]">
                    {i + 1}
                  </span>
                  <p className="mt-3 font-semibold text-heading">{etape.titre}</p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-600">{etape.desc}</p>
                </li>
              ))}
            </ol>

            <h3 className="mt-14 font-[family-name:var(--font-display)] text-xl font-semibold text-heading">
              {c.garanties_titre}
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {c.garanties.map((garantie) => (
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
