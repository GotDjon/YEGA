import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/session";
import { AwarenessTip } from "@/components/AwarenessTip";
import type { AuditLogWithActor } from "@/lib/supabase/types";
import { getLocale, UI } from "@/lib/i18n";

const STAFF_ROLES = ["responsable_technique", "direction", "admin"];

const ACTION_LABELS: Record<string, { fr: string; en: string }> = {
  assign_mission: { fr: "a affecté un agent à une mission", en: "assigned an agent to a mission" },
  update_mission_status: { fr: "a changé le statut d'une mission", en: "changed a mission's status" },
  validate_report: { fr: "a validé un rapport d'inspection", en: "validated an inspection report" },
  sign_document: { fr: "a signé un document", en: "signed a document" },
  create_anomaly: { fr: "a signalé une anomalie", en: "reported an anomaly" },
  update_anomaly_status: { fr: "a mis à jour le statut d'une anomalie", en: "updated an anomaly's status" },
  budget_revision: { fr: "a ajouté une révision de budget", en: "added a budget revision" },
};

export default async function AuditPage() {
  const profile = await getCurrentProfile();
  if (!profile || !STAFF_ROLES.includes(profile.role)) redirect("/back-office/missions");

  const locale = await getLocale();
  const t = UI[locale];
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
        {t.audit_titre}
      </h1>
      <p className="mt-1 text-sm text-gray-500">{t.audit_sous_titre}</p>

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
                  {t.audit_aucune_entree}
                </td>
              </tr>
            )}
            {entries?.map((entry) => (
              <tr key={entry.id} className="border-t border-gray-100">
                <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                  {new Date(entry.date_creation).toLocaleString("fr-FR")}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  {entry.actor?.nom ?? (locale === "en" ? "Deleted user" : "Utilisateur supprimé")}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {ACTION_LABELS[entry.action]?.[locale] ?? entry.action}
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
