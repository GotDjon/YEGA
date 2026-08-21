"use client";

import { useActionState, useRef } from "react";
import { createVisit } from "../actions";
import type { MissionActionState } from "../actions";

const initialState: MissionActionState = { error: null };

export function NewVisitForm({
  missions,
  agents,
}: {
  missions: { id: string; label: string }[];
  agents: { id: string; nom: string }[];
}) {
  const [state, formAction, pending] = useActionState(createVisit, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await formAction(formData);
        formRef.current?.reset();
      }}
      className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-dashed border-brand-gold/30 bg-white p-4 text-sm"
    >
      <div>
        <label className="block text-xs font-medium text-gray-500">Mission</label>
        <select
          name="mission_id"
          required
          className="mt-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
        >
          <option value="">Sélectionner</option>
          {missions.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500">Agent</label>
        <select
          name="agent_id"
          required
          className="mt-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
        >
          <option value="">Sélectionner</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.nom}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500">Date et heure</label>
        <input
          type="datetime-local"
          name="planifie_le"
          required
          className="mt-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500">Notes</label>
        <input
          type="text"
          name="notes"
          className="mt-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-brand-green px-4 py-2.5 font-semibold text-[#fff] shadow-sm shadow-brand-green/30 transition hover:bg-brand-green-dark hover:shadow-md disabled:opacity-60"
      >
        {pending ? "…" : "Planifier"}
      </button>
      {state.error && <p className="w-full text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
