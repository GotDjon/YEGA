"use client";

import { useActionState, useState } from "react";
import { createMissionSelf } from "@/app/missions/actions";
import type { FormActionState } from "@/app/missions/actions";
import { MISSION_TYPE_LABELS, type MissionType } from "@/lib/supabase/types";

const initialState: FormActionState = { error: null };

const STEPS = [
  "Choix du service",
  "Description",
  "Documents",
  "Localisation",
  "Budget",
  "Validation",
] as const;

export function NewMissionWizard() {
  const [state, formAction, pending] = useActionState(createMissionSelf, initialState);
  const [step, setStep] = useState(0);
  const [type, setType] = useState<MissionType>("home");
  const [description, setDescription] = useState("");
  const [ville, setVille] = useState("");
  const [budget, setBudget] = useState("");

  const isLast = step === STEPS.length - 1;
  const canGoNext = step === 1 ? description.trim().length > 0 : true;

  return (
    <form action={formAction} className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="description" value={description} />
      <input type="hidden" name="ville" value={ville} />
      <input type="hidden" name="budget_estime" value={budget} />

      <ol className="mb-6 flex flex-wrap gap-2 text-xs text-gray-400">
        {STEPS.map((label, index) => (
          <li
            key={label}
            className={
              "rounded-full px-2.5 py-1 " +
              (index === step
                ? "bg-brand-green text-white"
                : index < step
                  ? "bg-brand-green/10 text-brand-green"
                  : "bg-gray-100")
            }
          >
            {label}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Type de projet</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as MissionType)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            {Object.entries(MISSION_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      )}

      {step === 1 && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Décrivez votre projet
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="text-sm text-gray-600">
            Vous pourrez déposer vos documents (pièce d&apos;identité, titre foncier, etc.)
            juste après la création de votre projet, depuis sa page de suivi.
          </p>
        </div>
      )}

      {step === 3 && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ville / localisation
          </label>
          <input
            type="text"
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      )}

      {step === 4 && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Budget estimé (FCFA, facultatif)
          </label>
          <input
            type="number"
            min="0"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      )}

      {step === 5 && (
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-gray-500">Type :</span> {MISSION_TYPE_LABELS[type]}
          </p>
          <p>
            <span className="text-gray-500">Description :</span> {description || "—"}
          </p>
          <p>
            <span className="text-gray-500">Ville :</span> {ville || "—"}
          </p>
          <p>
            <span className="text-gray-500">Budget :</span>{" "}
            {budget ? `${budget} FCFA` : "—"}
          </p>
        </div>
      )}

      {state.error && <p className="mt-3 text-sm text-red-600">{state.error}</p>}

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-lg px-4 py-2 text-sm text-gray-500 disabled:opacity-0"
        >
          Précédent
        </button>
        {isLast ? (
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-brand-green px-5 py-2 text-sm font-semibold text-white hover:bg-brand-green-dark disabled:opacity-60"
          >
            {pending ? "Création…" : "Valider et créer mon projet"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => canGoNext && setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            disabled={!canGoNext}
            className="rounded-lg bg-brand-green px-5 py-2 text-sm font-semibold text-white hover:bg-brand-green-dark disabled:opacity-50"
          >
            Suivant
          </button>
        )}
      </div>
    </form>
  );
}
