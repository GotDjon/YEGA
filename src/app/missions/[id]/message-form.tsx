"use client";

import { useActionState, useRef } from "react";
import { sendMessage, type FormActionState } from "../actions";

const initialState: FormActionState = { error: null };

export function MessageForm({ missionId }: { missionId: string }) {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await formAction(formData);
        formRef.current?.reset();
      }}
      className="mt-4 flex gap-2"
    >
      <input type="hidden" name="mission_id" value={missionId} />
      <input
        type="text"
        name="contenu"
        required
        placeholder="Écrire un message…"
        className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-brand-green px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-green/30 transition hover:bg-brand-green-dark hover:shadow-md disabled:opacity-60"
      >
        {pending ? "…" : "Envoyer"}
      </button>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
