import { createClient } from "@/lib/supabase/server";
import {
  REPORT_ETAPE_LABELS,
  type ReportRow,
} from "@/lib/supabase/types";
import { validateReport } from "../actions";
import { CreateReportForm } from "./create-report-form";

export async function ReportsSection({
  missionId,
  reports,
  canCreate,
  canValidate,
}: {
  missionId: string;
  reports: ReportRow[];
  canCreate: boolean;
  canValidate: boolean;
}) {
  const supabase = await createClient();
  const links = await Promise.all(
    reports.map((report) =>
      supabase.storage.from("reports").createSignedUrl(report.url, 60 * 10),
    ),
  );

  return (
    <section>
      <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-brand-green-dark">
        Rapports d&apos;inspection
      </h2>

      <ul className="mt-3 space-y-2">
        {reports.length === 0 && (
          <li className="text-sm text-gray-400">Aucun rapport pour le moment.</li>
        )}
        {reports.map((report, index) => (
          <li
            key={report.id}
            className="rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-medium">
                {report.type}
                {report.etape ? ` · ${REPORT_ETAPE_LABELS[report.etape]}` : ""}
                {!report.valide_par && (
                  <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                    En attente de validation
                  </span>
                )}
              </span>
              {links[index].data?.signedUrl && (
                <a
                  href={links[index].data.signedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-green hover:underline"
                >
                  Ouvrir
                </a>
              )}
            </div>
            {report.observations && (
              <p className="mt-1 text-gray-500">{report.observations}</p>
            )}
            {canValidate && !report.valide_par && (
              <form action={validateReport} className="mt-2">
                <input type="hidden" name="report_id" value={report.id} />
                <input type="hidden" name="mission_id" value={missionId} />
                <button type="submit" className="text-brand-green hover:underline">
                  Valider
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>

      {canCreate && <CreateReportForm missionId={missionId} />}
    </section>
  );
}
