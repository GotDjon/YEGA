import { createClient } from "@/lib/supabase/server";

// Journal d'audit (module 21) : trace les décisions et actions clés (validation, paiement,
// changement de statut, budget…) pour qu'un litige puisse toujours être retracé. Écrit une
// fois, jamais modifié — voir supabase/migrations/0006_phase7.sql.
export async function logAction(
  actorId: string,
  action: string,
  entityType: string,
  entityId: string,
  details?: string,
) {
  const supabase = await createClient();
  await supabase.from("audit_log").insert({
    actor_id: actorId,
    action,
    entity_type: entityType,
    entity_id: entityId,
    details: details ?? null,
  });
}
