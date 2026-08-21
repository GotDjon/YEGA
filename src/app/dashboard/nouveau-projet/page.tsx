import { getCurrentProfile } from "@/lib/supabase/session";
import { AwarenessTip } from "@/components/AwarenessTip";
import { NewMissionWizard } from "./new-mission-wizard";

export default async function NouveauProjetPage() {
  const profile = await getCurrentProfile();

  return (
    <div className="max-w-xl">
      <AwarenessTip role={profile?.role} pageKey="dashboard-nouveau-projet" />
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-heading">
        Déposer un nouveau projet
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Identification : {profile?.nom} — un assistant en 6 étapes pour démarrer votre mission.
      </p>

      <NewMissionWizard />
    </div>
  );
}
