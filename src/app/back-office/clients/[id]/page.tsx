import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/session";
import { StatusTimeline } from "@/components/StatusTimeline";
import { AwarenessTip } from "@/components/AwarenessTip";
import {
  MISSION_TYPE_LABELS,
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_LABELS,
  type Mission,
  type PaymentRow,
  type Profile,
} from "@/lib/supabase/types";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await getCurrentProfile();
  if (!profile || !["responsable_technique", "direction", "admin"].includes(profile.role)) {
    redirect("/back-office/missions");
  }

  const supabase = await createClient();

  const { data: client } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .returns<Profile[]>()
    .maybeSingle();

  if (!client) notFound();

  const { data: missions } = await supabase
    .from("missions")
    .select("*")
    .eq("client_id", id)
    .order("date_creation", { ascending: false })
    .returns<Mission[]>();

  const missionIds = (missions ?? []).map((m) => m.id);
  const { data: payments } = missionIds.length
    ? await supabase
        .from("payments")
        .select("*")
        .in("mission_id", missionIds)
        .order("date", { ascending: false })
        .returns<PaymentRow[]>()
    : { data: [] as PaymentRow[] };

  return (
    <div>
      <AwarenessTip role={profile.role} pageKey="back-office-clients-detail" />
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-heading">
        {client.nom}
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        {[client.telephone, client.pays]
          .filter(Boolean)
          .concat(`client depuis ${new Date(client.date_creation).toLocaleDateString("fr-FR")}`)
          .join(" · ")}
      </p>

      <h2 className="mt-8 font-[family-name:var(--font-display)] text-lg font-semibold text-heading">
        Missions
      </h2>
      <div className="mt-3 space-y-3">
        {!missions?.length && (
          <p className="text-sm text-gray-400">Aucune mission pour ce client.</p>
        )}
        {missions?.map((mission) => (
          <Link
            key={mission.id}
            href={`/missions/${mission.id}`}
            className="card card-interactive block rounded-2xl border border-gray-100 bg-white p-4 hover:border-brand-green/40"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">
                {MISSION_TYPE_LABELS[mission.type]}
                {mission.ville ? ` — ${mission.ville}` : ""}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(mission.date_creation).toLocaleDateString("fr-FR")}
              </span>
            </div>
            <div className="mt-2">
              <StatusTimeline statut={mission.statut} />
            </div>
          </Link>
        ))}
      </div>

      <h2 className="mt-8 font-[family-name:var(--font-display)] text-lg font-semibold text-heading">
        Paiements
      </h2>
      <div className="card mt-3 overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-green-light/60 text-[11px] font-semibold uppercase tracking-wide text-heading">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Montant</th>
              <th className="px-4 py-3">Méthode</th>
              <th className="px-4 py-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {!payments?.length && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                  Aucun paiement.
                </td>
              </tr>
            )}
            {payments?.map((payment) => (
              <tr key={payment.id} className="border-t border-gray-100">
                <td className="px-4 py-3 text-gray-500">
                  {new Date(payment.date).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-4 py-3">{payment.montant.toLocaleString("fr-FR")} FCFA</td>
                <td className="px-4 py-3 text-gray-500">
                  {payment.methode ? PAYMENT_METHOD_LABELS[payment.methode] : "—"}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {PAYMENT_STATUS_LABELS[payment.statut as keyof typeof PAYMENT_STATUS_LABELS] ??
                    payment.statut}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
