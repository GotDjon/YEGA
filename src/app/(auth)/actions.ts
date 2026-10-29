"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { CLIENT_PROFILE_ORDER, type ClientProfile } from "@/lib/supabase/types";
import { getLocale, UI } from "@/lib/i18n";

export type AuthActionState = { error: string | null };

export async function login(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard");

  const t = UI[await getLocale()];

  if (!email || !password) {
    return { error: t.login_erreur_requis };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: t.login_erreur_identifiants };
  }

  revalidatePath("/", "layout");
  redirect(next || "/dashboard");
}

export async function register(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const nom = String(formData.get("nom") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const profilClient = String(formData.get("profil_client") ?? "");
  const pays = String(formData.get("pays") ?? "").trim();
  const ville = String(formData.get("ville") ?? "").trim();
  const telephone = String(formData.get("telephone") ?? "").trim();

  const t = UI[await getLocale()];

  if (!nom || !email || !password || !pays) {
    return { error: t.register_erreur_requis };
  }
  if (!CLIENT_PROFILE_ORDER.includes(profilClient as ClientProfile)) {
    return { error: t.register_erreur_profil };
  }
  if (password.length < 8) {
    return { error: t.register_erreur_mot_de_passe };
  }

  // Ces informations sont recopiées dans la table profiles par le trigger handle_new_user
  // (voir supabase/migrations/0007_clients_tous_profils.sql).
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { nom, profil_client: profilClient, pays, ville, telephone } },
  });

  if (error) {
    return { error: t.register_erreur_creation + error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
