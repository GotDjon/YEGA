import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/session";
import { SiteHeader } from "@/components/SiteHeader";
import { AwarenessTip } from "@/components/AwarenessTip";

export default async function BackOfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  if (profile.role === "client") redirect("/dashboard");

  return (
    <div className="app-shell min-h-screen">
      <SiteHeader profile={profile} />
      <AwarenessTip role={profile.role} />
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
