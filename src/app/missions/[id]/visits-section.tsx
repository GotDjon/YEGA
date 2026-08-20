import { createClient } from "@/lib/supabase/server";
import { VISIT_STATUS_LABELS, type VisitWithRelations } from "@/lib/supabase/types";

export async function VisitsSection({ missionId }: { missionId: string }) {
  const supabase = await createClient();
  const { data: visits } = await supabase
    .from("visits")
    .select("*, agent:profiles!visits_agent_id_fkey(id, nom)")
    .eq("mission_id", missionId)
    .order("planifie_le", { ascending: true })
    .returns<VisitWithRelations[]>();

  if (!visits || visits.length === 0) return null;

  return (
    <section>
      <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-brand-green-dark">
        Visites planifiées
      </h2>
      <ul className="mt-3 space-y-2">
        {visits.map((visit) => (
          <li
            key={visit.id}
            className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-2.5 text-sm shadow-sm"
          >
            <span>
              {new Date(visit.planifie_le).toLocaleString("fr-FR")}
              {visit.agent ? ` · ${visit.agent.nom}` : ""}
              {visit.notes ? ` · ${visit.notes}` : ""}
            </span>
            <span
              className={
                visit.statut === "terminee"
                  ? "rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                  : visit.statut === "annulee"
                    ? "rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700"
                    : "rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700"
              }
            >
              {VISIT_STATUS_LABELS[visit.statut]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
