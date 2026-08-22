import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/session";
import { StatusTimeline } from "@/components/StatusTimeline";
import { AwarenessTip } from "@/components/AwarenessTip";
import { SeverityBadge } from "@/components/SeverityBadge";
import { getMissionTypeLabels, type Mission, type NotificationRow } from "@/lib/supabase/types";
import { getLocale, UI } from "@/lib/i18n";

export default async function ClientDashboardPage() {
  const profile = await getCurrentProfile();
  const supabase = await createClient();
  const locale = await getLocale();
  const t = UI[locale];
  const missionTypeLabels = getMissionTypeLabels(locale);

  const [{ data: missions }, { data: actionsRequises }] = await Promise.all([
    supabase
      .from("missions")
      .select("*")
      .eq("client_id", profile!.id)
      .order("date_creation", { ascending: false })
      .returns<Mission[]>(),
    supabase
      .from("notifications")
      .select("*")
      .eq("user_id", profile!.id)
      .eq("lu", false)
      .in("severite", ["critique", "action"])
      .order("date_creation", { ascending: false })
      .returns<NotificationRow[]>(),
  ]);

  return (
    <div>
      <AwarenessTip role={profile?.role} pageKey="dashboard" />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold-dark">
            {t.dashboard_espace_client}
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold text-heading">
            {t.dashboard_titre}
          </h1>
          <p className="mt-1.5 text-sm text-brand-ink/60">{t.dashboard_sous_titre}</p>
        </div>
        <Link
          href="/dashboard/nouveau-projet"
          className="rounded-xl bg-brand-green px-5 py-2.5 text-sm font-semibold text-[#fff] shadow-sm shadow-brand-green/30 transition hover:bg-brand-green-dark hover:shadow-md"
        >
          {t.dashboard_deposer_projet}
        </Link>
      </div>

      {!!actionsRequises?.length && (
        <div className="mt-6 rounded-2xl border border-brand-gold/30 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-heading">
            {actionsRequises.length} {t.dashboard_actions_requises}
          </h2>
          <ul className="mt-3 space-y-2">
            {actionsRequises.map((notification) => (
              <li key={notification.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-gray-600">{notification.contenu}</span>
                <div className="flex shrink-0 items-center gap-2">
                  <SeverityBadge severite={notification.severite} />
                  {notification.lien && (
                    <Link href={notification.lien} className="text-brand-green hover:underline">
                      {t.notifications_voir}
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {!missions?.length && (
          <div className="card rounded-2xl border border-dashed border-brand-gold/30 bg-white p-12 text-center">
            <p className="font-[family-name:var(--font-display)] text-lg text-heading">
              {t.dashboard_aucun_projet}
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-brand-ink/50">
              {t.dashboard_aucun_projet_desc}
            </p>
          </div>
        )}

        {missions?.map((mission) => (
          <Link
            key={mission.id}
            href={`/missions/${mission.id}`}
            className="card card-interactive group block rounded-2xl border border-gray-100 bg-white p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green-light px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-heading">
                  {missionTypeLabels[mission.type]}
                </span>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-brand-ink">
                  {mission.ville || "Projet"}
                </h2>
              </div>
              <span className="text-xs text-brand-ink/40">
                {new Date(mission.date_creation).toLocaleDateString("fr-FR")}
              </span>
            </div>
            {mission.description && (
              <p className="mt-2 text-sm text-brand-ink/60">{mission.description}</p>
            )}
            <div className="mt-5">
              <StatusTimeline statut={mission.statut} />
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-green opacity-0 transition-opacity group-hover:opacity-100">
              {t.dashboard_voir_detail}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
