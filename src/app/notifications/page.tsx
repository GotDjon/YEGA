import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/session";
import { SiteHeader } from "@/components/SiteHeader";
import type { NotificationRow } from "@/lib/supabase/types";
import { markNotificationRead } from "./actions";

export default async function NotificationsPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");

  const supabase = await createClient();

  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", profile.id)
    .order("date_creation", { ascending: false })
    .returns<NotificationRow[]>();

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader profile={profile} />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-brand-green-dark">
          Notifications
        </h1>

        <div className="mt-6 space-y-2">
          {!notifications?.length && (
            <p className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
              Aucune notification.
            </p>
          )}
          {notifications?.map((notification) => (
            <form
              key={notification.id}
              action={markNotificationRead}
              className={
                "flex items-center justify-between rounded-lg border px-4 py-3 text-sm " +
                (notification.lu ? "border-gray-200 bg-white" : "border-brand-green bg-brand-green/5")
              }
            >
              <input type="hidden" name="notification_id" value={notification.id} />
              <div>
                {notification.lien ? (
                  <Link
                    href={notification.lien}
                    className="text-gray-700 hover:text-brand-green hover:underline"
                  >
                    {notification.contenu}
                  </Link>
                ) : (
                  <span className="text-gray-700">{notification.contenu}</span>
                )}
                <p className="mt-0.5 text-xs text-gray-400">
                  {new Date(notification.date_creation).toLocaleString("fr-FR")}
                </p>
              </div>
              {!notification.lu && (
                <button type="submit" className="text-xs text-brand-green hover:underline">
                  Marquer comme lu
                </button>
              )}
            </form>
          ))}
        </div>
      </main>
    </div>
  );
}
