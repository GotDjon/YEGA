import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/session";
import { AwarenessTip } from "@/components/AwarenessTip";
import type { Mission, PaymentRow, Profile } from "@/lib/supabase/types";
import { getLocale, UI } from "@/lib/i18n";

const STAFF_ROLES = ["responsable_technique", "direction", "admin"];

export default async function ClientsPage() {
  const profile = await getCurrentProfile();
  if (!profile || !STAFF_ROLES.includes(profile.role)) redirect("/back-office/missions");

  const t = UI[await getLocale()];
  const supabase = await createClient();

  const [{ data: clients }, { data: missions }, { data: payments }] = await Promise.all([
    supabase.from("profiles").select("*").eq("role", "client").returns<Profile[]>(),
    supabase.from("missions").select("*").returns<Mission[]>(),
    supabase
      .from("payments")
      .select("*")
      .eq("statut", "accepte")
      .returns<PaymentRow[]>(),
  ]);

  const missionsByClient = new Map<string, Mission[]>();
  for (const mission of missions ?? []) {
    const list = missionsByClient.get(mission.client_id) ?? [];
    list.push(mission);
    missionsByClient.set(mission.client_id, list);
  }

  const missionIdToClient = new Map((missions ?? []).map((m) => [m.id, m.client_id]));
  const revenueByClient = new Map<string, number>();
  for (const payment of payments ?? []) {
    const clientId = missionIdToClient.get(payment.mission_id);
    if (!clientId) continue;
    revenueByClient.set(clientId, (revenueByClient.get(clientId) ?? 0) + payment.montant);
  }

  return (
    <div>
      <AwarenessTip role={profile.role} pageKey="back-office-clients" />
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-heading">
        {t.clients_titre}
      </h1>
      <p className="mt-1 text-sm text-gray-500">{t.clients_sous_titre}</p>

      <div className="card mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-green-light/60 text-[11px] font-semibold uppercase tracking-wide text-heading">
            <tr>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Pays</th>
              <th className="px-4 py-3">Missions</th>
              <th className="px-4 py-3">Revenu total</th>
            </tr>
          </thead>
          <tbody>
            {!clients?.length && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                  Aucun client pour le moment.
                </td>
              </tr>
            )}
            {clients?.map((client) => (
              <tr key={client.id} className="border-t border-gray-100">
                <td className="px-4 py-3">
                  <Link
                    href={`/back-office/clients/${client.id}`}
                    className="font-medium text-gray-800 hover:text-brand-green hover:underline"
                  >
                    {client.nom}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-500">{client.pays ?? "—"}</td>
                <td className="px-4 py-3 text-gray-500">
                  {missionsByClient.get(client.id)?.length ?? 0}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {(revenueByClient.get(client.id) ?? 0).toLocaleString("fr-FR")} FCFA
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
