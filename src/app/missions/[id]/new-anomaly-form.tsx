"use client";

import { useActionState, useRef } from "react";
import { createAnomaly } from "../actions";
import { ANOMALY_GRAVITE_LABELS, type AnomalyGravite } from "@/lib/supabase/types";
import type { FormActionState } from "../actions";

const initialState: FormActionState = { error: null };
const GRAVITES: AnomalyGravite[] = ["faible", "moyenne", "elevee"];

export function NewAnomalyForm({ missionId }: { missionId: string }) {
  const [state, formAction, pending] = useActionState(createAnomaly, initialState);
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

      <div>
        <label className="block text-xs font-medium text-gray-500">Titre</label>
        <input
          type="text"
          name="titre"
          required
          placeholder="Ex. Plomberie non conforme au plan"
          className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500">Gravité</label>
          <select
            name="gravite"
            defaultValue="moyenne"
            className="mt-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
          >
            {GRAVITES.map((gravite) => (
              <option key={gravite} value={gravite}>
                {ANOMALY_GRAVITE_LABELS[gravite]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500">Description</label>
        <textarea
          name="description"
          rows={2}
          className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-brand-green px-4 py-2.5 font-semibold text-[#fff] shadow-sm shadow-brand-green/30 transition hover:bg-brand-green-dark hover:shadow-md disabled:opacity-60"
      >
        {pending ? "Envoi…" : "Signaler une anomalie"}
      </button>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
