"use client";

import { useActionState } from "react";
import { register, type AuthActionState } from "../actions";
import { UI, type Locale } from "@/lib/i18n-dict";
import { CLIENT_PROFILE_ORDER, getClientProfileLabels } from "@/lib/supabase/types";

const initialState: AuthActionState = { error: null };
const inputClass =
  "mt-1 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-brand-ink shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15";
const labelClass = "block text-sm font-medium text-brand-ink/80";

// Suggestions seulement : le champ reste libre pour accepter n'importe quel pays.
const PAYS_SUGGERES = [
  "Cameroun",
  "France",
  "Belgique",
  "Suisse",
  "Allemagne",
  "Royaume-Uni",
  "Canada",
  "États-Unis",
  "Côte d'Ivoire",
  "Gabon",
  "Sénégal",
  "Nigeria",
  "Congo",
  "Tchad",
  "Guinée équatoriale",
  "République centrafricaine",
];

export function RegisterForm({ locale }: { locale: Locale }) {
  const [state, formAction, pending] = useActionState(register, initialState);
  const t = UI[locale];
  const profileLabels = getClientProfileLabels(locale);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div>
        <label htmlFor="nom" className={labelClass}>
          {t.register_nom}
        </label>
        <input id="nom" name="nom" type="text" required autoComplete="name" className={inputClass} />
      </div>

      <div>
        <label htmlFor="profil_client" className={labelClass}>
          {t.register_profil}
        </label>
        <select
          id="profil_client"
          name="profil_client"
          required
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            {t.register_profil_choisir}
          </option>
          {CLIENT_PROFILE_ORDER.map((value) => (
            <option key={value} value={value}>
              {profileLabels[value]}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pays" className={labelClass}>
            {t.register_pays}
          </label>
          <input
            id="pays"
            name="pays"
            type="text"
            required
            list="pays-suggeres"
            autoComplete="country-name"
            className={inputClass}
          />
          <datalist id="pays-suggeres">
            {PAYS_SUGGERES.map((pays) => (
              <option key={pays} value={pays} />
            ))}
          </datalist>
        </div>
        <div>
          <label htmlFor="ville" className={labelClass}>
            {t.register_ville}
          </label>
          <input
            id="ville"
            name="ville"
            type="text"
            autoComplete="address-level2"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="telephone" className={labelClass}>
          {t.register_telephone}
        </label>
        <input
          id="telephone"
          name="telephone"
          type="tel"
          autoComplete="tel"
          className={inputClass}
        />
        <p className="mt-1 text-xs text-brand-ink/40">{t.register_telephone_aide}</p>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          {t.register_email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          {t.register_mot_de_passe}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={inputClass}
        />
        <p className="mt-1 text-xs text-brand-ink/40">{t.register_mot_de_passe_aide}</p>
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-brand-green px-4 py-2.5 text-sm font-semibold text-[#fff] shadow-sm shadow-brand-green/30 transition hover:bg-brand-green-dark hover:shadow-md disabled:opacity-60"
      >
        {pending ? t.register_bouton_en_cours : t.register_bouton}
      </button>
    </form>
  );
}
