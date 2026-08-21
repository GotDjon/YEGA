"use client";

import { useActionState, useRef } from "react";
import { createBudgetRevision } from "../actions";
import type { MissionActionState } from "../actions";

const initialState: MissionActionState = { error: null };

export function NewBudgetRevisionForm({ missionId }: { missionId: string }) {
  const [state, formAction, pending] = useActionState(createBudgetRevision, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await formAction(formData);
        formRef.current?.reset();
      }}
      className="mt-4 flex flex-wrap items-end gap-3 rounded-2xl border border-dashed border-brand-gold/30 bg-white p-4 text-sm"
    >
      <input type="hidden" name="mission_id" value={missionId} />
      <div>
        <label className="block text-xs font-medium text-gray-500">Écart (FCFA)</label>
        <input
          type="number"
          name="montant_delta"
          step="any"
          required
          placeholder="+480000 ou -200000"
          className="mt-1 w-40 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
        />
      </div>
      <div className="flex-1">
        <label className="block text-xs font-medium text-gray-500">Motif</label>
        <input
          type="text"
          name="motif"
          placeholder="Ex. augmentation du prix des matériaux"
          className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-brand-green px-4 py-2.5 font-semibold text-[#fff] shadow-sm shadow-brand-green/30 transition hover:bg-brand-green-dark hover:shadow-md disabled:opacity-60"
      >
        {pending ? "Envoi…" : "Ajouter une révision"}
      </button>
      {state.error && <p className="w-full text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
