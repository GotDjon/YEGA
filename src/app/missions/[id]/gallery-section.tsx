import { createClient } from "@/lib/supabase/server";
import { REPORT_ETAPE_LABELS, type ReportEtape, type ReportRow } from "@/lib/supabase/types";

const ETAPES: ReportEtape[] = ["avant", "pendant", "apres"];

export async function GallerySection({ reports }: { reports: ReportRow[] }) {
  const media = reports.filter(
    (r) => (r.type === "photo" || r.type === "video") && r.valide_par,
  );
  if (media.length === 0) return null;

  const supabase = await createClient();
  const links = await Promise.all(
    media.map((r) => supabase.storage.from("reports").createSignedUrl(r.url, 60 * 10)),
  );
  const urlByReportId = new Map(media.map((r, i) => [r.id, links[i].data?.signedUrl]));

  return (
    <section>
      <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-brand-green-dark">
        Galerie d&apos;évolution
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Comparaison avant / pendant / après — photos et vidéos validées.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {ETAPES.map((etape) => {
          const items = media.filter((r) => r.etape === etape);
          return (
            <div key={etape}>
              <h3 className="text-sm font-medium text-gray-600">
                {REPORT_ETAPE_LABELS[etape]}
              </h3>
              <div className="mt-2 space-y-2">
                {items.length === 0 && (
                  <p className="text-xs text-gray-400">Aucun média.</p>
                )}
                {items.map((item) => {
                  const url = urlByReportId.get(item.id);
                  if (!url) return null;
                  return item.type === "photo" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={item.id}
                      src={url}
                      alt={`${REPORT_ETAPE_LABELS[etape]} — ${item.id}`}
                      className="w-full rounded-lg border border-gray-200 object-cover"
                    />
                  ) : (
                    <video
                      key={item.id}
                      src={url}
                      controls
                      className="w-full rounded-lg border border-gray-200"
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
