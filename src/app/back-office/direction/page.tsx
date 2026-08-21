import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/session";
import { AwarenessTip } from "@/components/AwarenessTip";
import {
  MISSION_STATUS_LABELS,
  MISSION_STATUS_ORDER,
  MISSION_TYPE_LABELS,
  type Mission,
  type MissionType,
  type PaymentRow,
} from "@/lib/supabase/types";

const MISSION_LATE_THRESHOLD_DAYS = 30;

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card card-interactive relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-gold to-brand-gold-light" />
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-ink/40">
        {label}
      </p>
      <p className="mt-1.5 font-[family-name:var(--font-display)] text-3xl font-semibold text-brand-green-dark">
        {value}
      </p>
    </div>
  );
}

export default async function DirectionDashboardPage() {
  const profile = await getCurrentProfile();
  if (!profile || !["responsable_technique", "direction", "admin"].includes(profile.role)) {
    redirect("/back-office/missions");
  }

  const supabase = await createClient();

  const [{ data: missions }, { data: payments }, { count: clientCount }] = await Promise.all([
    supabase.from("missions").select("*").returns<Mission[]>(),
    supabase
      .from("payments")
      .select("*")
      .eq("statut", "accepte")
      .returns<PaymentRow[]>(),
    supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "client"),
  ]);

  const allMissions = missions ?? [];
  const chiffreAffaires = (payments ?? []).reduce((sum, p) => sum + p.montant, 0);

  // eslint-disable-next-line react-hooks/purity -- Server Component évalué une fois par requête, pas de mémoïsation.
  const now = Date.now();
  const missionsActives = allMissions.filter((m) => m.statut !== "cloturee");
  const missionsEnRetard = missionsActives.filter(
    (m) =>
      now - new Date(m.date_creation).getTime() >
      MISSION_LATE_THRESHOLD_DAYS * 24 * 60 * 60 * 1000,
  );

  const parType = allMissions.reduce(
    (acc, m) => {
      acc[m.type] = (acc[m.type] ?? 0) + 1;
      return acc;
    },
    {} as Record<MissionType, number>,
  );

  const parStatut = allMissions.reduce(
    (acc, m) => {
      acc[m.statut] = (acc[m.statut] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div>
      <AwarenessTip role={profile.role} pageKey="back-office-direction" />
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-brand-green-dark">
        Tableau de bord Direction
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Indicateurs stratégiques (modules 14 et 19).
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Clients" value={clientCount ?? 0} />
        <StatCard label="Missions actives" value={missionsActives.length} />
        <StatCard label="Missions en retard" value={missionsEnRetard.length} />
        <StatCard
          label="Chiffre d'affaires"
          value={`${chiffreAffaires.toLocaleString("fr-FR")} FCFA`}
        />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="card card-interactive rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-700">Répartition par type</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {Object.entries(MISSION_TYPE_LABELS).map(([type, label]) => (
              <li key={type} className="flex justify-between text-gray-600">
                <span>{label}</span>
                <span className="font-medium">{parType[type as MissionType] ?? 0}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card card-interactive rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-700">Répartition par statut</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {MISSION_STATUS_ORDER.map((status) => (
              <li key={status} className="flex justify-between text-gray-600">
                <span>{MISSION_STATUS_LABELS[status]}</span>
                <span className="font-medium">{parStatut[status] ?? 0}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
