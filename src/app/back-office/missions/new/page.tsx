import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/session";
import { AwarenessTip } from "@/components/AwarenessTip";
import { MissionForm } from "./mission-form";

export default async function NewMissionPage() {
  const profile = await getCurrentProfile();
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("profiles")
    .select("id, nom")
    .eq("role", "client")
    .order("nom");

  return (
    <div className="max-w-lg">
      <AwarenessTip role={profile?.role} pageKey="back-office-missions-new" />
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-brand-green-dark">
        Nouvelle mission
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Crée la mission au statut « Reçue » — parcours en 7 étapes.
      </p>

      <MissionForm clients={clients ?? []} />
    </div>
  );
}
