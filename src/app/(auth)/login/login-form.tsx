"use client";

import { useActionState } from "react";
import { login, type AuthActionState } from "../actions";
import { UI, type Locale } from "@/lib/i18n-dict";

const initialState: AuthActionState = { error: null };
const inputClass =
  "mt-1 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-brand-ink shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15";

export function LoginForm({ next, locale }: { next: string; locale: Locale }) {
  const [state, formAction, pending] = useActionState(login, initialState);
  const t = UI[locale];

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <input type="hidden" name="next" value={next} />

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-ink/80">
          {t.login_email}
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
        <label htmlFor="password" className="block text-sm font-medium text-brand-ink/80">
          {t.login_mot_de_passe}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-brand-green px-4 py-2.5 text-sm font-semibold text-[#fff] shadow-sm shadow-brand-green/30 transition hover:bg-brand-green-dark hover:shadow-md disabled:opacity-60"
      >
        {pending ? t.login_bouton_en_cours : t.login_bouton}
      </button>
    </form>
  );
}
