"use client";

import { useActionState, useRef } from "react";
import { createPartner } from "../actions";
import type { MissionActionState } from "../actions";
import { PARTNER_TYPE_LABELS } from "@/lib/supabase/types";

const initialState: MissionActionState = { error: null };

export function NewPartnerForm() {
  const [state, formAction, pending] = useActionState(createPartner, initialState);
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
        <label className="block text-xs font-medium text-gray-500">Nom</label>
        <input
          type="text"
          name="nom"
          required
          className="mt-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500">Type</label>
        <select name="type" required className="mt-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15">
          {Object.entries(PARTNER_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500">Contact</label>
        <input
          type="text"
          name="contact"
          placeholder="Téléphone ou e-mail"
          className="mt-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-brand-green px-4 py-2.5 font-semibold text-white shadow-sm shadow-brand-green/30 transition hover:bg-brand-green-dark hover:shadow-md disabled:opacity-60"
      >
        {pending ? "…" : "Ajouter"}
      </button>
      {state.error && <p className="w-full text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
