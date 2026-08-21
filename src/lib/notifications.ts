import { createClient } from "@/lib/supabase/server";
import type { NotificationSeverite } from "@/lib/supabase/types";

// Notification in-app (module 16), avec un niveau de sévérité (module 22) pour que le
// destinataire distingue en un coup d'œil ce qui est critique de ce qui est informatif.
// Les canaux WhatsApp/e-mail/push nécessitent des comptes fournisseurs externes qui ne sont
// pas encore configurés — voir README, section "Prochaines étapes".
export async function notify(
  userId: string,
  contenu: string,
  lien?: string,
  severite: NotificationSeverite = "info",
) {
  const supabase = await createClient();
  await supabase
    .from("notifications")
    .insert({ user_id: userId, contenu, lien: lien ?? null, severite });
}
