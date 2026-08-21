"use client";

import { useActionState } from "react";
import { initiatePayment, type FormActionState } from "../actions";

const initialState: FormActionState = { error: null };

export function PaymentForm({ missionId }: { missionId: string }) {
  const [state, formAction, pending] = useActionState(initiatePayment, initialState);

  return (
    <form
      action={formAction}
      className="mt-4 flex flex-wrap items-end gap-3 rounded-2xl border border-dashed border-brand-gold/30 bg-white p-4 text-sm"
    >
      <input type="hidden" name="mission_id" value={missionId} />
      <div>
        <label className="block text-xs font-medium text-gray-500">Montant (FCFA)</label>
        <input
          type="number"
          name="montant"
          min="100"
          required
          className="mt-1 w-32 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-brand-green px-4 py-2.5 font-semibold text-[#fff] shadow-sm shadow-brand-green/30 transition hover:bg-brand-green-dark hover:shadow-md disabled:opacity-60"
      >
        {pending ? "Redirection…" : "Payer (Mobile Money / carte)"}
      </button>
      {state.error && <p className="w-full text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
