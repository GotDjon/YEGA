import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/session";
import { StatusTimeline } from "@/components/StatusTimeline";
import { DocumentsSection } from "./documents-section";
import { ReportsSection } from "./reports-section";
import { GallerySection } from "./gallery-section";
import { PaymentsSection } from "./payments-section";
import {
  MISSION_TYPE_LABELS,
  type DocumentRow,
  type MissionWithRelations,
  type ReportRow,
} from "@/lib/supabase/types";

const STAFF_ROLES = ["responsable_technique", "direction", "admin"];

export default async function MissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  const { data: mission } = await supabase
    .from("missions")
    .select(
      "*, client:profiles!missions_client_id_fkey(id, nom), agent:profiles!missions_agent_id_fkey(id, nom)",
    )
    .eq("id", id)
    .returns<MissionWithRelations[]>()
    .maybeSingle();

  if (!mission) notFound();

  const isStaff = STAFF_ROLES.includes(profile!.role);
  const isAgent = mission.agent_id === profile!.id;
  const isClient = mission.client_id === profile!.id;

  const [{ data: documents }, { data: reports }] = await Promise.all([
    supabase
      .from("documents")
      .select("*")
      .eq("mission_id", id)
      .order("date", { ascending: false })
      .returns<DocumentRow[]>(),
    supabase
      .from("reports")
      .select("*")
      .eq("mission_id", id)
      .order("date_upload", { ascending: false })
      .returns<ReportRow[]>(),
  ]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-brand-green-dark">
            {MISSION_TYPE_LABELS[mission.type]}
            {mission.ville ? ` — ${mission.ville}` : ""}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Client : {mission.client?.nom ?? "—"}
            {mission.agent ? ` · Agent : ${mission.agent.nom}` : ""}
          </p>
        </div>
        {mission.budget_estime && (
          <span className="text-sm text-gray-500">
            Budget estimé : {mission.budget_estime.toLocaleString("fr-FR")} FCFA
          </span>
        )}
      </div>

      {mission.description && (
        <p className="mt-3 text-sm text-gray-600">{mission.description}</p>
      )}

      <div className="mt-4">
        <StatusTimeline statut={mission.statut} />
      </div>

      <div className="mt-8 space-y-8">
        <DocumentsSection
          missionId={mission.id}
          documents={documents ?? []}
          canUpload={isClient || isStaff}
          isStaff={isStaff}
        />

        <ReportsSection
          missionId={mission.id}
          reports={reports ?? []}
          canCreate={isAgent || isStaff}
          canValidate={isStaff}
        />

        <GallerySection reports={reports ?? []} />

        <PaymentsSection missionId={mission.id} isClient={isClient} />
      </div>
    </div>
  );
}
