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
      className="mt-6 space-y-3 rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm"
    >
      <div>
        <label className="block text-xs font-medium text-gray-500">Question</label>
        <input
          type="text"
          name="question"
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500">Réponse</label>
        <textarea
          name="reponse"
          rows={3}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-brand-green px-4 py-2 font-semibold text-white hover:bg-brand-green-dark disabled:opacity-60"
      >
        {pending ? "…" : "Ajouter une question"}
      </button>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
