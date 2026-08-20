import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Client "admin" — utilise la clé service_role, qui contourne complètement la Row Level
// Security. Ne JAMAIS importer ce fichier depuis du code exécuté côté navigateur : réservé
// aux traitements serveur sans session utilisateur, comme le webhook de paiement CinetPay.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}
