import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/session";
import { StatusTimeline } from "@/components/StatusTimeline";
import { AwarenessTip } from "@/components/AwarenessTip";
import { MISSION_TYPE_LABELS, type Mission } from "@/lib/supabase/types";

export default async function ClientDashboardPage() {
  const profile = await getCurrentProfile();
  const supabase = await createClient();

  const { data: missions } = await supabase
    .from("missions")
    .select("*")
    .eq("client_id", profile!.id)
    .order("date_creation", { ascending: false })
    .returns<Mission[]>();

  return (
    <div>
      <AwarenessTip role={profile?.role} pageKey="dashboard" />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold-dark">
            Espace client
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold text-brand-green-dark">
            Mes projets
          </h1>
          <p className="mt-1.5 text-sm text-brand-ink/60">
            Suivez l&apos;avancement de vos missions au Cameroun en temps réel.
          </p>
        </div>
        <Link
          href="/dashboard/nouveau-projet"
          className="rounded-xl bg-brand-green px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-green/30 transition hover:bg-brand-green-dark hover:shadow-md"
        >
          + Déposer un projet
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {!missions?.length && (
          <div className="card rounded-2xl border border-dashed border-brand-gold/30 bg-white p-12 text-center">
            <p className="font-[family-name:var(--font-display)] text-lg text-brand-green-dark">
              Aucun projet pour le moment
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-brand-ink/50">
              Cliquez sur « Déposer un projet » pour démarrer votre première mission avec YEGA.
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
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green-light px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-green-dark">
                  {MISSION_TYPE_LABELS[mission.type]}
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
              Voir le détail →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
