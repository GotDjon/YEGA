import { createClient } from "@/lib/supabase/server";

// Notification in-app (module 16). Les canaux WhatsApp/e-mail/push nécessitent des comptes
// fournisseurs externes (Twilio ou WhatsApp Business Cloud API, service SMTP...) qui ne sont
// pas encore configurés — voir README, section "Prochaines étapes".
export async function notify(userId: string, contenu: string, lien?: string) {
  const supabase = await createClient();
  await supabase.from("notifications").insert({ user_id: userId, contenu, lien: lien ?? null });
}
