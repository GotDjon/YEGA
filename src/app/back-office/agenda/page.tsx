import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/session";
import { AwarenessTip } from "@/components/AwarenessTip";
import { updateVisitStatus } from "../actions";
import {
  MISSION_TYPE_LABELS,
  VISIT_STATUS_LABELS,
  type Mission,
  type Profile,
  type VisitWithRelations,
} from "@/lib/supabase/types";
import { NewVisitForm } from "./new-visit-form";

const STAFF_ROLES = ["responsable_technique", "direction", "admin"];

export default async function AgendaPage() {
  const profile = await getCurrentProfile();
  const isStaff = STAFF_ROLES.includes(profile!.role);
  const supabase = await createClient();

  const { data: visits } = await supabase
    .from("visits")
    .select(
      "*, mission:missions(id, type, ville), agent:profiles!visits_agent_id_fkey(id, nom)",
    )
    .order("planifie_le", { ascending: true })
    .returns<VisitWithRelations[]>();

  const [{ data: missions }, { data: agents }] = isStaff
    ? await Promise.all([
        supabase
          .from("missions")
          .select("*")
          .neq("statut", "cloturee")
          .returns<Mission[]>(),
        supabase.from("profiles").select("id, nom").eq("role", "agent").returns<
          Pick<Profile, "id" | "nom">[]
        >(),
      ])
    : [{ data: [] as Mission[] }, { data: [] as Pick<Profile, "id" | "nom">[] }];

  return (
    <div>
      <AwarenessTip role={profile?.role} pageKey="back-office-agenda" />
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-brand-green-dark">
        Agenda
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        {isStaff
          ? "Planning des visites terrain (module 11)."
          : "Vos visites terrain planifiées."}
      </p>

      {isStaff && (
        <NewVisitForm
          missions={(missions ?? []).map((m) => ({
            id: m.id,
            label: `${MISSION_TYPE_LABELS[m.type]}${m.ville ? ` — ${m.ville}` : ""}`,
          }))}
          agents={agents ?? []}
        />
      )}

      <div className="mt-6 space-y-3">
        {!visits?.length && (
          <p className="card rounded-2xl border border-dashed border-brand-gold/30 bg-white p-8 text-center text-sm text-brand-ink/50">
            Aucune visite planifiée.
          </p>
        )}
        {visits?.map((visit) => (
          <div
            key={visit.id}
            className="card flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-gray-100 bg-white p-4 text-sm"
          >
            <div>
              <Link
                href={`/missions/${visit.mission_id}`}
                className="font-medium text-gray-800 hover:text-brand-green hover:underline"
              >
                {visit.mission ? MISSION_TYPE_LABELS[visit.mission.type] : "Mission"}
                {visit.mission?.ville ? ` — ${visit.mission.ville}` : ""}
              </Link>
              <p className="text-gray-500">
                {new Date(visit.planifie_le).toLocaleString("fr-FR")}
                {visit.agent ? ` · ${visit.agent.nom}` : ""}
                {visit.notes ? ` · ${visit.notes}` : ""}
              </p>
            </div>

            {visit.statut === "planifiee" ? (
              <div className="flex gap-3">
                <form action={updateVisitStatus}>
                  <input type="hidden" name="visit_id" value={visit.id} />
                  <input type="hidden" name="statut" value="terminee" />
                  <button type="submit" className="text-brand-green hover:underline">
                    Marquer terminée
                  </button>
                </form>
                <form action={updateVisitStatus}>
                  <input type="hidden" name="visit_id" value={visit.id} />
                  <input type="hidden" name="statut" value="annulee" />
                  <button type="submit" className="text-red-600 hover:underline">
                    Annuler
                  </button>
                </form>
              </div>
            ) : (
              <span
                className={
                  visit.statut === "terminee"
                    ? "rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                    : "rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700"
                }
              >
                {VISIT_STATUS_LABELS[visit.statut]}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
