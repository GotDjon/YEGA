import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/session";
import { SiteHeader } from "@/components/SiteHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader profile={profile} />
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
