import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/session";
import { SiteHeader } from "@/components/SiteHeader";
import { AssistantChat } from "./assistant-chat";

export default async function AssistantPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  if (profile.role !== "client") redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader profile={profile} />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-brand-green-dark">
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
