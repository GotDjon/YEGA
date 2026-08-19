"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { MissionStatus, MissionType } from "@/lib/supabase/types";

export type MissionActionState = { error: string | null };

const STAFF_ROLES = ["responsable_technique", "direction", "admin"];

async function requireStaff() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié.");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !STAFF_ROLES.includes(profile.role)) {
    throw new Error("Action réservée au responsable technique.");
  }

  return supabase;
}

export async function createMission(
  _prevState: MissionActionState,
  formData: FormData,
): Promise<MissionActionState> {
  const clientId = String(formData.get("client_id") ?? "");
  const type = String(formData.get("type") ?? "") as MissionType;
  const ville = String(formData.get("ville") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!clientId || !type) {
    return { error: "Client et type de projet requis." };
  }

  try {
    const supabase = await requireStaff();
    const { error } = await supabase.from("missions").insert({
      client_id: clientId,
      type,
      ville: ville || null,
      description: description || null,
    });
    if (error) return { error: error.message };
  } catch (err) {
    return { error: (err as Error).message };
  }

  revalidatePath("/back-office/missions");
  redirect("/back-office/missions");
}

export async function assignMission(formData: FormData) {
  const missionId = String(formData.get("mission_id") ?? "");
  const agentId = String(formData.get("agent_id") ?? "");

  const supabase = await requireStaff();
  await supabase
    .from("missions")
    .update({ agent_id: agentId || null })
    .eq("id", missionId);

  revalidatePath("/back-office/missions");
}

export async function updateMissionStatus(formData: FormData) {
  const missionId = String(formData.get("mission_id") ?? "");
  const statut = String(formData.get("statut") ?? "") as MissionStatus;

  const supabase = await requireStaff();
  await supabase.from("missions").update({ statut }).eq("id", missionId);

  revalidatePath("/back-office/missions");
}
