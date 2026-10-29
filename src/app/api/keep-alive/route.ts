import { createClient } from "@/lib/supabase/server";

// Appelée chaque jour par le cron Vercel (voir vercel.json). Le forfait gratuit de Supabase met
// le projet en pause après ~7 jours sans activité, ce qui rend toute la plateforme inaccessible
// (incident du 29/10/2026). Une simple lecture suffit à compter comme activité ; sans session,
// la RLS renvoie une liste vide, donc aucune donnée n'est exposée.
export async function GET() {
  const supabase = await createClient();
  const { error } = await supabase.from("profiles").select("id").limit(1);

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
  return Response.json({ ok: true, date: new Date().toISOString() });
}
