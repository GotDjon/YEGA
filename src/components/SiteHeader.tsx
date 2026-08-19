import Link from "next/link";
import { logout } from "@/app/(auth)/actions";
import type { Profile } from "@/lib/supabase/types";

const STAFF_ROLES = ["responsable_technique", "direction", "admin"];

export function SiteHeader({ profile }: { profile: Profile }) {
  const isStaff = STAFF_ROLES.includes(profile.role);

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
            {isStaff && (
              <Link href="/back-office/missions" className="hover:text-brand-green">
                Back-office
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500">
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
