import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/session";
import { AwarenessTip } from "@/components/AwarenessTip";
import type { AuditLogWithActor } from "@/lib/supabase/types";

const STAFF_ROLES = ["responsable_technique", "direction", "admin"];

const ACTION_LABELS: Record<string, string> = {
  assign_mission: "a affecté un agent à une mission",
  update_mission_status: "a changé le statut d'une mission",
  validate_report: "a validé un rapport d'inspection",
  sign_document: "a signé un document",
  create_anomaly: "a signalé une anomalie",
  update_anomaly_status: "a mis à jour le statut d'une anomalie",
  budget_revision: "a ajouté une révision de budget",
};

export default async function AuditPage() {
  const profile = await getCurrentProfile();
  if (!profile || !STAFF_ROLES.includes(profile.role)) redirect("/back-office/missions");

  const supabase = await createClient();
  const { data: entries } = await supabase
    .from("audit_log")
    .select("*, actor:profiles!audit_log_actor_id_fkey(id, nom)")
    .order("date_creation", { ascending: false })
    .limit(200)
    .returns<AuditLogWithActor[]>();

  return (
    <div>
      <AwarenessTip role={profile.role} pageKey="back-office-audit" />
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-heading">
        Journal d&apos;audit
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Trace des décisions et actions clés (validations, paiements, statuts, budget…) — utile en
        cas de litige. Non modifiable.
      </p>

      <div className="card mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-green-light/60 text-[11px] font-semibold uppercase tracking-wide text-heading">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Auteur</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Détail</th>
            </tr>
          </thead>
          <tbody>
            {!entries?.length && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                  Aucune entrée pour le moment.
                </td>
              </tr>
            )}
            {entries?.map((entry) => (
              <tr key={entry.id} className="border-t border-gray-100">
                <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                  {new Date(entry.date_creation).toLocaleString("fr-FR")}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  {entry.actor?.nom ?? "Utilisateur supprimé"}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {ACTION_LABELS[entry.action] ?? entry.action}
                </td>
                <td className="px-4 py-3 text-gray-500">{entry.details ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
