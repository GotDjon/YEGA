import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/session";
import { StatusTimeline } from "@/components/StatusTimeline";
import { AwarenessTip } from "@/components/AwarenessTip";
import { assignMission, updateMissionStatus } from "../actions";
import {
  getMissionStatusLabels,
  getMissionTypeLabels,
  MISSION_STATUS_ORDER,
  type MissionWithRelations,
} from "@/lib/supabase/types";
import { getLocale, UI } from "@/lib/i18n";

const STAFF_ROLES = ["responsable_technique", "direction", "admin"];

export default async function BackOfficeMissionsPage() {
  const profile = await getCurrentProfile();
  const isStaff = STAFF_ROLES.includes(profile!.role);
  const locale = await getLocale();
  const t = UI[locale];
  const missionTypeLabels = getMissionTypeLabels(locale);
  const missionStatusLabels = getMissionStatusLabels(locale);
  const supabase = await createClient();

  const { data: missions } = await supabase
    .from("missions")
    .select("*, client:profiles!missions_client_id_fkey(id, nom), agent:profiles!missions_agent_id_fkey(id, nom)")
    .order("date_creation", { ascending: false })
    .returns<MissionWithRelations[]>();

  const { data: agents } = isStaff
    ? await supabase.from("profiles").select("id, nom").eq("role", "agent")
    : { data: [] };

  return (
    <div>
      <AwarenessTip role={profile?.role} pageKey="back-office-missions" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-heading">
            {t.missions_titre}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {isStaff ? t.missions_staff : t.missions_agent}
          </p>
        </div>
        {isStaff && (
          <Link
            href="/back-office/missions/new"
            className="rounded-xl bg-brand-green px-4 py-2.5 text-sm font-semibold text-[#fff] shadow-sm shadow-brand-green/30 transition hover:bg-brand-green-dark hover:shadow-md"
          >
            {t.missions_nouvelle}
          </Link>
        )}
      </div>

      <div className="mt-6 space-y-4">
        {!missions?.length && (
          <p className="card rounded-2xl border border-dashed border-brand-gold/30 bg-white p-8 text-center text-sm text-brand-ink/50">
            {t.missions_aucune}
          </p>
        )}

        {missions?.map((mission) => (
          <div key={mission.id} className="card card-interactive rounded-2xl border border-gray-100 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-medium text-gray-800">
                <Link href={`/missions/${mission.id}`} className="hover:text-brand-green hover:underline">
                  {missionTypeLabels[mission.type]}
                  {mission.ville ? ` — ${mission.ville}` : ""}
                </Link>
                <span className="ml-2 text-sm font-normal text-gray-400">
                  client : {mission.client?.nom ?? "—"}
                </span>
              </h2>
              <span className="text-xs text-gray-400">
                {new Date(mission.date_creation).toLocaleDateString("fr-FR")}
              </span>
            </div>
            {mission.description && (
              <p className="mt-1 text-sm text-gray-500">{mission.description}</p>
            )}

            <div className="mt-4">
              <StatusTimeline statut={mission.statut} />
            </div>

            {isStaff ? (
              <div className="mt-4 flex flex-wrap gap-4 border-t border-gray-100 pt-4 text-sm">
                <form action={assignMission} className="flex items-center gap-2">
                  <input type="hidden" name="mission_id" value={mission.id} />
                  <label className="text-gray-500">Agent :</label>
                  <select
                    name="agent_id"
                    defaultValue={mission.agent_id ?? ""}
                    className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
                  >
                    <option value="">Non assigné</option>
                    {agents?.map((agent) => (
                      <option key={agent.id} value={agent.id}>
                        {agent.nom}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="text-brand-green hover:underline">
                    Affecter
                  </button>
                </form>

                <form action={updateMissionStatus} className="flex items-center gap-2">
                  <input type="hidden" name="mission_id" value={mission.id} />
                  <label className="text-gray-500">Statut :</label>
                  <select
                    name="statut"
                    defaultValue={mission.statut}
                    className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
                  >
                    {MISSION_STATUS_ORDER.map((status) => (
                      <option key={status} value={status}>
                        {missionStatusLabels[status]}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="text-brand-green hover:underline">
                    Mettre à jour
                  </button>
                </form>
              </div>
            ) : (
              <p className="mt-4 border-t border-gray-100 pt-4 text-xs text-gray-400">
                Agent assigné : {mission.agent?.nom ?? "vous"}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
