import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/session";
import { SiteHeader } from "@/components/SiteHeader";
import type { FaqRow } from "@/lib/supabase/types";
import { deleteFaq } from "./actions";
import { NewFaqForm } from "./new-faq-form";

const STAFF_ROLES = ["responsable_technique", "direction", "admin"];

export default async function AidePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");

  const isStaff = STAFF_ROLES.includes(profile.role);
  const supabase = await createClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("*")
    .order("ordre", { ascending: true })
    .order("date_creation", { ascending: true })
    .returns<FaqRow[]>();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader profile={profile} />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-brand-green-dark">
          Centre d&apos;aide
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Questions fréquentes (module 20). Pour une question spécifique à votre projet,
          utilisez la messagerie de la mission concernée.
        </p>

        <div className="mt-6 space-y-3">
          {!faqs?.length && (
            <p className="card rounded-2xl border border-dashed border-brand-gold/30 bg-white p-8 text-center text-sm text-brand-ink/50">
              Aucune question pour le moment.
            </p>
          )}
          {faqs?.map((faq) => (
            <details
              key={faq.id}
              className="card card-interactive group rounded-2xl border border-gray-100 bg-white p-4"
            >
              <summary className="cursor-pointer text-sm font-medium text-gray-800">
                {faq.question}
              </summary>
              <p className="mt-2 text-sm text-gray-600">{faq.reponse}</p>
              {isStaff && (
                <form action={deleteFaq} className="mt-2">
                  <input type="hidden" name="faq_id" value={faq.id} />
                  <button type="submit" className="text-xs text-red-600 hover:underline">
                    Supprimer
                  </button>
                </form>
              )}
            </details>
          ))}
        </div>

        {isStaff && <NewFaqForm />}
      </main>
    </div>
  );
}
