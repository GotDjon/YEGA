import Link from "next/link";
import { logout } from "@/app/(auth)/actions";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/supabase/types";

const STAFF_ROLES = ["responsable_technique", "direction", "admin"];
const BACK_OFFICE_ROLES = ["agent", ...STAFF_ROLES];

export async function SiteHeader({ profile }: { profile: Profile }) {
  const isStaff = STAFF_ROLES.includes(profile.role);
  const hasBackOffice = BACK_OFFICE_ROLES.includes(profile.role);

  const supabase = await createClient();
  const { count: unreadCount } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", profile.id)
    .eq("lu", false);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-6">
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-brand-green-dark">
            YEGA
          </span>
          <nav className="flex gap-4 text-sm text-gray-600">
            <Link href="/dashboard" className="hover:text-brand-green">
              Mes projets
            </Link>
            {hasBackOffice && (
              <>
                <Link href="/back-office/missions" className="hover:text-brand-green">
                  Back-office
                </Link>
                <Link href="/back-office/agenda" className="hover:text-brand-green">
                  Agenda
                </Link>
              </>
            )}
            {isStaff && (
              <>
                <Link href="/back-office/clients" className="hover:text-brand-green">
                  Clients
                </Link>
                <Link href="/back-office/direction" className="hover:text-brand-green">
                  Direction
                </Link>
                <Link href="/back-office/partenaires" className="hover:text-brand-green">
                  Partenaires
                </Link>
              </>
            )}
            <Link href="/aide" className="hover:text-brand-green">
              Aide
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <Link href="/notifications" className="relative hover:text-brand-green">
            Notifications
            {!!unreadCount && (
              <span className="ml-1 rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-semibold text-white">
                {unreadCount}
              </span>
            )}
          </Link>
          <span>{profile.nom}</span>
          <form action={logout}>
            <button type="submit" className="text-brand-green hover:underline">
              Déconnexion
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
