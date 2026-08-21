"use client";

import { useActionState, useRef } from "react";
import { uploadDocument, type FormActionState } from "../actions";
import { DOCUMENT_TYPE_LABELS, type DocumentType } from "@/lib/supabase/types";

const initialState: FormActionState = { error: null };

export function UploadDocumentForm({
  missionId,
  types,
}: {
  missionId: string;
  types: DocumentType[];
}) {
  const [state, formAction, pending] = useActionState(uploadDocument, initialState);
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
        <label className="block text-xs font-medium text-gray-500">Type</label>
        <select name="type" required className="mt-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15">
          {types.map((type) => (
            <option key={type} value={type}>
              {DOCUMENT_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500">Fichier</label>
        <input type="file" name="file" required className="mt-1 text-xs" />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-brand-green px-4 py-2.5 font-semibold text-[#fff] shadow-sm shadow-brand-green/30 transition hover:bg-brand-green-dark hover:shadow-md disabled:opacity-60"
      >
        {pending ? "Envoi…" : "Téléverser"}
      </button>
      {state.error && <p className="w-full text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
