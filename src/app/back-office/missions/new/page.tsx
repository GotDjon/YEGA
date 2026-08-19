import { createClient } from "@/lib/supabase/server";
import { MissionForm } from "./mission-form";

export default async function NewMissionPage() {
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("profiles")
    .select("id, nom")
    .eq("role", "client")
    .order("nom");

  return (
    <div className="max-w-lg">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-brand-green-dark">
        Nouvelle mission
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Crée la mission au statut « Reçue » — parcours en 7 étapes.
      </p>

      <MissionForm clients={clients ?? []} />
    </div>
  );
}
