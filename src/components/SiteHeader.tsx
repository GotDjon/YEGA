import Link from "next/link";
import { logout } from "@/app/(auth)/actions";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Profile } from "@/lib/supabase/types";

const STAFF_ROLES = ["responsable_technique", "direction", "admin"];
const BACK_OFFICE_ROLES = ["agent", ...STAFF_ROLES];

const ROLE_LABELS: Record<string, string> = {
  client: "Client",
  agent: "Chargé de mission",
  responsable_technique: "Responsable technique",
  direction: "Direction",
  admin: "Administrateur",
};

function initials(nom: string) {
  return nom
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export async function SiteHeader({ profile }: { profile: Profile }) {
  const isStaff = STAFF_ROLES.includes(profile.role);
  const hasBackOffice = BACK_OFFICE_ROLES.includes(profile.role);

  const supabase = await createClient();
  const { count: unreadCount } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", profile.id)
    .eq("lu", false);

  const navLinkClass =
    "relative py-1 text-sm font-bold text-heading/85 transition-colors hover:text-heading after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-brand-gold after:transition-all hover:after:w-full";

  return (
    <header className="sticky top-0 z-20 border-b border-brand-gold/20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
        <Link href="/dashboard" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden flex-1 items-center gap-8 md:flex">
          <Link href="/dashboard" className={navLinkClass}>
            Mes projets
          </Link>
          {profile.role === "client" && (
            <Link href="/assistant" className={navLinkClass}>
              Assistant IA
            </Link>
          )}
          {hasBackOffice && (
            <>
              <Link href="/back-office/missions" className={navLinkClass}>
                Back-office
              </Link>
              <Link href="/back-office/agenda" className={navLinkClass}>
                Agenda
              </Link>
            </>
          )}
          {isStaff && (
            <>
              <Link href="/back-office/clients" className={navLinkClass}>
                Clients
              </Link>
              <Link href="/back-office/direction" className={navLinkClass}>
                Direction
              </Link>
              <Link href="/back-office/partenaires" className={navLinkClass}>
                Partenaires
              </Link>
              <Link href="/back-office/audit" className={navLinkClass}>
                Audit
              </Link>
            </>
          )}
          <Link href="/aide" className={navLinkClass}>
            Aide
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-brand-gold transition-colors hover:bg-brand-gold-light dark:hover:bg-[#fff]/10"
            aria-label="Notifications"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path
                fillRule="evenodd"
                d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                clipRule="evenodd"
              />
            </svg>
            {!!unreadCount && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-gold px-1 text-[10px] font-semibold text-brand-green-deep ring-2 ring-[#fff]">
                {unreadCount}
              </span>
            )}
          </Link>

          <div className="hidden items-center gap-2.5 border-l border-gray-200 pl-4 sm:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green-light text-xs font-semibold text-heading">
              {initials(profile.nom)}
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-brand-ink">{profile.nom}</span>
              <span className="text-[11px] text-brand-ink/50">{ROLE_LABELS[profile.role]}</span>
            </span>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-brand-green/20 px-3.5 py-1.5 text-xs font-medium text-heading transition-colors hover:border-brand-green hover:bg-brand-green-light"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </div>

      <nav className="flex flex-wrap gap-x-6 gap-y-1.5 border-t border-gray-100 px-6 py-2.5 text-sm font-bold text-heading/85 md:hidden">
        <Link href="/dashboard" className="hover:text-heading">
          Mes projets
        </Link>
        {profile.role === "client" && (
          <Link href="/assistant" className="hover:text-heading">
            Assistant IA
          </Link>
        )}
        {hasBackOffice && (
          <Link href="/back-office/missions" className="hover:text-heading">
            Back-office
          </Link>
        )}
        <Link href="/aide" className="hover:text-heading">
          Aide
        </Link>
      </nav>
    </header>
  );
}
