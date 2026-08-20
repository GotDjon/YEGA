"use client";

import { useActionState, useRef } from "react";
import { createFaq, type FaqActionState } from "./actions";

const initialState: FaqActionState = { error: null };

export function NewFaqForm() {
  const [state, formAction, pending] = useActionState(createFaq, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await formAction(formData);
        formRef.current?.reset();
      }}
      className="mt-6 space-y-3 rounded-2xl border border-dashed border-brand-gold/30 bg-white p-4 text-sm"
    >
      <div>
        <label className="block text-xs font-medium text-gray-500">Question</label>
        <input
          type="text"
          name="question"
          required
          className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500">Réponse</label>
        <textarea
          name="reponse"
          rows={3}
          required
          className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-brand-green px-4 py-2.5 font-semibold text-white shadow-sm shadow-brand-green/30 transition hover:bg-brand-green-dark hover:shadow-md disabled:opacity-60"
      >
        {pending ? "…" : "Ajouter une question"}
      </button>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
