"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function markNotificationRead(formData: FormData) {
  const notificationId = String(formData.get("notification_id") ?? "");

  const supabase = await createClient();
  await supabase.from("notifications").update({ lu: true }).eq("id", notificationId);

  revalidatePath("/notifications");
}
