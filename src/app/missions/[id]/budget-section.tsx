import type { BudgetRevisionRow } from "@/lib/supabase/types";
import { NewBudgetRevisionForm } from "@/app/back-office/missions/new-budget-revision-form";

export function BudgetSection({
  missionId,
  budgetEstime,
  revisions,
  isStaff,
}: {
  missionId: string;
  budgetEstime: number | null;
  revisions: BudgetRevisionRow[];
  isStaff: boolean;
}) {
  const total = (budgetEstime ?? 0) + revisions.reduce((sum, r) => sum + r.montant_delta, 0);

  return (
    <section>
      <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-heading">
        Budget
      </h2>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="card rounded-2xl border border-gray-100 bg-white p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            Budget initial
          </p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-heading">
            {budgetEstime ? `${budgetEstime.toLocaleString("fr-FR")} FCFA` : "—"}
          </p>
        </div>
        <div className="card rounded-2xl border border-gray-100 bg-white p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            Révisions
          </p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-heading">
            {revisions.length}
          </p>
        </div>
        <div className="card rounded-2xl border border-brand-gold/30 bg-white p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-gold-dark">
            Budget actuel
          </p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-heading">
            {budgetEstime ? `${total.toLocaleString("fr-FR")} FCFA` : "—"}
          </p>
        </div>
      </div>

      {revisions.length > 0 && (
        <ul className="mt-3 space-y-2">
          {revisions.map((revision) => (
            <li
              key={revision.id}
              className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-2.5 text-sm shadow-sm"
            >
              <span className="text-gray-600">
                {revision.motif ?? "Révision de budget"}
                <span className="ml-2 text-xs text-gray-400">
                  {new Date(revision.date_creation).toLocaleDateString("fr-FR")}
                </span>
              </span>
              <span
                className={
                  revision.montant_delta > 0
                    ? "font-semibold text-amber-700"
                    : "font-semibold text-green-700"
                }
              >
                {revision.montant_delta > 0 ? "+" : ""}
                {revision.montant_delta.toLocaleString("fr-FR")} FCFA
              </span>
            </li>
          ))}
        </ul>
      )}

      {isStaff && <NewBudgetRevisionForm missionId={missionId} />}
    </section>
  );
}
