"use client";

import { useActionState } from "react";
import { createMission, type MissionActionState } from "../../actions";
import { MISSION_TYPE_LABELS } from "@/lib/supabase/types";

const initialState: MissionActionState = { error: null };

export function MissionForm({ clients }: { clients: { id: string; nom: string }[] }) {
  const [state, formAction, pending] = useActionState(createMission, initialState);

  return (
    <form
      action={formAction}
      className="mt-6 space-y-4 rounded-xl border border-gray-200 bg-white p-6"
    >
      <div>
        <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">
          Client
        </label>
        <select
          id="client_id"
          name="client_id"
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">Sélectionner un client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.nom}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type de projet
        </label>
        <select
          id="type"
          name="type"
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          {Object.entries(MISSION_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="ville" className="block text-sm font-medium text-gray-700">
          Ville
        </label>
        <input
          id="ville"
          name="ville"
          type="text"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green-dark disabled:opacity-60"
      >
        {pending ? "Création…" : "Créer la mission"}
      </button>
    </form>
  );
}
