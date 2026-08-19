import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/session";
import { StatusTimeline } from "@/components/StatusTimeline";
import { MISSION_TYPE_LABELS, type Mission } from "@/lib/supabase/types";

export default async function ClientDashboardPage() {
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  const { data: missions } = await supabase
    .from("missions")
    .select("*")
    .eq("client_id", profile!.id)
    .order("date_creation", { ascending: false })
    .returns<Mission[]>();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-brand-green-dark">
        Mes projets
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Suivez l&apos;avancement de vos missions au Cameroun en temps réel.
      </p>

      <div className="mt-6 space-y-4">
        {!missions?.length && (
          <p className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
            Vous n&apos;avez pas encore de projet en cours. Contactez YEGA pour
            démarrer votre premier projet.
          </p>
        )}

        {missions?.map((mission) => (
          <div key={mission.id} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-gray-800">
                {MISSION_TYPE_LABELS[mission.type]}
                {mission.ville ? ` — ${mission.ville}` : ""}
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
          </div>
        ))}
      </div>
    </div>
  );
}
