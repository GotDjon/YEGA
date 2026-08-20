"use client";

import { useActionState, useRef } from "react";
import { createReport, type FormActionState } from "../actions";
import { REPORT_ETAPE_LABELS } from "@/lib/supabase/types";

const initialState: FormActionState = { error: null };
const REPORT_TYPES = ["photo", "video", "pdf", "checklist"] as const;

export function CreateReportForm({ missionId }: { missionId: string }) {
  const [state, formAction, pending] = useActionState(createReport, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await formAction(formData);
        formRef.current?.reset();
      }}
      className="mt-4 space-y-3 rounded-2xl border border-dashed border-brand-gold/30 bg-white p-4 text-sm"
    >
      <input type="hidden" name="mission_id" value={missionId} />

      <div className="flex flex-wrap gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500">Type</label>
          <select name="type" required className="mt-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15">
            {REPORT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Étape</label>
          <select name="etape" className="mt-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15">
            <option value="">—</option>
            {Object.entries(REPORT_ETAPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">GPS (lat, lng)</label>
          <div className="mt-1 flex gap-1">
            <input
              type="number"
              step="any"
              name="gps_lat"
              placeholder="lat"
              className="w-24 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
            />
            <input
              type="number"
              step="any"
              name="gps_lng"
              placeholder="lng"
              className="w-24 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500">Observations</label>
        <textarea
          name="observations"
          rows={2}
          className="mt-1 w-full rounded-lg border border-gray-300 px-2 py-1"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500">Fichier</label>
        <input type="file" name="file" required className="mt-1 text-xs" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-brand-green px-4 py-2.5 font-semibold text-white shadow-sm shadow-brand-green/30 transition hover:bg-brand-green-dark hover:shadow-md disabled:opacity-60"
      >
        {pending ? "Envoi…" : "Ajouter le rapport"}
      </button>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
