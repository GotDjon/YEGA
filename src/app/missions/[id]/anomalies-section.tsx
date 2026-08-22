import {
  getAnomalyGraviteLabels,
  getAnomalyStatutLabels,
  ANOMALY_STATUT_ORDER,
  type AnomalyRow,
} from "@/lib/supabase/types";
import { getLocale } from "@/lib/i18n";
import { updateAnomalyStatus } from "../actions";
import { NewAnomalyForm } from "./new-anomaly-form";

const GRAVITE_BADGE: Record<AnomalyRow["gravite"], string> = {
  faible: "bg-gray-100 text-gray-600",
  moyenne: "bg-amber-100 text-amber-700",
  elevee: "bg-red-100 text-red-700",
};

const STATUT_BADGE: Record<AnomalyRow["statut"], string> = {
  ouverte: "bg-red-100 text-red-700",
  en_correction: "bg-amber-100 text-amber-700",
  a_verifier: "bg-blue-100 text-blue-700",
  resolue: "bg-green-100 text-green-700",
};

export async function AnomaliesSection({
  missionId,
  anomalies,
  canReport,
  canManage,
}: {
  missionId: string;
  anomalies: AnomalyRow[];
  canReport: boolean;
  canManage: boolean;
}) {
  const locale = await getLocale();
  const graviteLabels = getAnomalyGraviteLabels(locale);
  const statutLabels = getAnomalyStatutLabels(locale);

  return (
    <section>
      <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-heading">
        Anomalies
      </h2>

      <ul className="mt-3 space-y-2">
        {anomalies.length === 0 && (
          <li className="text-sm text-gray-400">Aucune anomalie signalée.</li>
        )}
        {anomalies.map((anomaly) => (
          <li
            key={anomaly.id}
            className="rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-medium text-gray-800">{anomaly.titre}</span>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs ${GRAVITE_BADGE[anomaly.gravite]}`}>
                  {graviteLabels[anomaly.gravite]}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-xs ${STATUT_BADGE[anomaly.statut]}`}>
                  {statutLabels[anomaly.statut]}
                </span>
              </div>
            </div>
            {anomaly.description && (
              <p className="mt-1 text-gray-500">{anomaly.description}</p>
            )}
            {canManage && anomaly.statut !== "resolue" && (
              <form action={updateAnomalyStatus} className="mt-2 flex items-center gap-2">
                <input type="hidden" name="anomaly_id" value={anomaly.id} />
                <input type="hidden" name="mission_id" value={missionId} />
                <label className="text-xs text-gray-500">Statut :</label>
                <select
                  name="statut"
                  defaultValue={anomaly.statut}
                  onChange={(e) => e.currentTarget.form?.requestSubmit()}
                  className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
                >
                  {ANOMALY_STATUT_ORDER.map((statut) => (
                    <option key={statut} value={statut}>
                      {statutLabels[statut]}
                    </option>
                  ))}
                </select>
              </form>
            )}
          </li>
        ))}
      </ul>

      {canReport && <NewAnomalyForm missionId={missionId} />}
    </section>
  );
}
