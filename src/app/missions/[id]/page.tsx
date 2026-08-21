import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/session";
import { StatusTimeline } from "@/components/StatusTimeline";
import { AwarenessTip } from "@/components/AwarenessTip";
import { DocumentsSection } from "./documents-section";
import { ReportsSection } from "./reports-section";
import { GallerySection } from "./gallery-section";
import { PaymentsSection } from "./payments-section";
import { BudgetSection } from "./budget-section";
import { AnomaliesSection } from "./anomalies-section";
import { MessagesSection } from "./messages-section";
import { VisitsSection } from "./visits-section";
import {
  MISSION_TYPE_LABELS,
  type AnomalyRow,
  type BudgetRevisionRow,
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

  const [{ data: documents }, { data: reports }, { data: anomalies }, { data: budgetRevisions }] =
    await Promise.all([
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
      supabase
        .from("anomalies")
        .select("*")
        .eq("mission_id", id)
        .order("date_creation", { ascending: false })
        .returns<AnomalyRow[]>(),
      supabase
        .from("budget_revisions")
        .select("*")
        .eq("mission_id", id)
        .order("date_creation", { ascending: true })
        .returns<BudgetRevisionRow[]>(),
    ]);

  return (
    <div>
      <AwarenessTip role={profile?.role} pageKey="mission-detail" />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-heading">
            {MISSION_TYPE_LABELS[mission.type]}
            {mission.ville ? ` — ${mission.ville}` : ""}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Client : {mission.client?.nom ?? "—"}
            {mission.agent ? ` · Agent : ${mission.agent.nom}` : ""}
          </p>
        </div>
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

        <AnomaliesSection
          missionId={mission.id}
          anomalies={anomalies ?? []}
          canReport={isAgent || isStaff}
          canManage={isAgent || isStaff}
        />

        <BudgetSection
          missionId={mission.id}
          budgetEstime={mission.budget_estime}
          revisions={budgetRevisions ?? []}
          isStaff={isStaff}
        />

        <PaymentsSection missionId={mission.id} isClient={isClient} />

        <VisitsSection missionId={mission.id} />

        <MessagesSection missionId={mission.id} currentUserId={profile!.id} />
      </div>
    </div>
  );
}
