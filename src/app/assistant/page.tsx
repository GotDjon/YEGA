import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/session";
import { SiteHeader } from "@/components/SiteHeader";
import { AwarenessTip } from "@/components/AwarenessTip";
import { AssistantChat } from "./assistant-chat";

export default async function AssistantPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  if (profile.role !== "client") redirect("/dashboard");

  return (
    <div className="app-shell min-h-screen">
      <SiteHeader profile={profile} />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <AwarenessTip role={profile.role} pageKey="assistant" />
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-brand-green-dark">
          Assistant YEGA
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Posez une question sur vos projets — l&apos;assistant répond uniquement à partir de
          vos propres données (module 15).
        </p>

        <AssistantChat />
      </main>
    </div>
  );
}
