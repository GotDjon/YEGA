"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { notify } from "@/lib/notifications";
import { logAction } from "@/lib/audit";
import {
  MISSION_STATUS_LABELS,
  type MissionStatus,
  type MissionType,
  type PartnerType,
} from "@/lib/supabase/types";

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

  return { supabase, userId: user.id };
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
    const { supabase } = await requireStaff();
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

  const { supabase, userId } = await requireStaff();
  await supabase
    .from("missions")
    .update({ agent_id: agentId || null })
    .eq("id", missionId);

  if (agentId) {
    await notify(
      agentId,
      "Vous avez été affecté à une mission.",
      `/missions/${missionId}`,
      "action",
    );
  }
  await logAction(userId, "assign_mission", "mission", missionId, agentId || undefined);

  revalidatePath("/back-office/missions");
  revalidatePath(`/missions/${missionId}`);
}

export async function updateMissionStatus(formData: FormData) {
  const missionId = String(formData.get("mission_id") ?? "");
  const statut = String(formData.get("statut") ?? "") as MissionStatus;

  const { supabase, userId } = await requireStaff();
  await supabase.from("missions").update({ statut }).eq("id", missionId);

  const { data: mission } = await supabase
    .from("missions")
    .select("client_id")
    .eq("id", missionId)
    .single();
  if (mission?.client_id) {
    await notify(
      mission.client_id,
      `Le statut de votre mission est passé à « ${MISSION_STATUS_LABELS[statut]} ».`,
      `/missions/${missionId}`,
    );
  }
  await logAction(userId, "update_mission_status", "mission", missionId, statut);

  revalidatePath("/back-office/missions");
  revalidatePath(`/missions/${missionId}`);
}

// Module 24 — révision de budget (staff uniquement) : trace l'écart entre budget initial et
// budget actuel, avec motif, pour que le client comprenne toujours pourquoi le montant a changé.
export async function createBudgetRevision(
  _prevState: MissionActionState,
  formData: FormData,
): Promise<MissionActionState> {
  const missionId = String(formData.get("mission_id") ?? "");
  const montantDeltaRaw = String(formData.get("montant_delta") ?? "").trim();
  const motif = String(formData.get("motif") ?? "").trim();
  const montantDelta = Number(montantDeltaRaw);

  if (!missionId || !montantDeltaRaw || !Number.isFinite(montantDelta) || montantDelta === 0) {
    return { error: "Indiquez un écart de budget non nul (positif ou négatif)." };
  }

  const { supabase, userId } = await requireStaff();
  const { error } = await supabase.from("budget_revisions").insert({
    mission_id: missionId,
    montant_delta: montantDelta,
    motif: motif || null,
    created_by: userId,
  });
  if (error) return { error: error.message };

  const { data: mission } = await supabase
    .from("missions")
    .select("client_id")
    .eq("id", missionId)
    .single();
  if (mission?.client_id) {
    const sign = montantDelta > 0 ? "+" : "";
    await notify(
      mission.client_id,
      `Révision de budget : ${sign}${montantDelta.toLocaleString("fr-FR")} FCFA${motif ? ` (${motif})` : ""}.`,
      `/missions/${missionId}`,
      montantDelta > 0 ? "attention" : "info",
    );
  }
  await logAction(userId, "budget_revision", "mission", missionId, `${montantDelta} — ${motif}`);

  revalidatePath(`/missions/${missionId}`);
  return { error: null };
}

// Module 11 — agenda des visites terrain.
export async function createVisit(
  _prevState: MissionActionState,
  formData: FormData,
): Promise<MissionActionState> {
  const missionId = String(formData.get("mission_id") ?? "");
  const agentId = String(formData.get("agent_id") ?? "");
  const planifieLe = String(formData.get("planifie_le") ?? "");
  const notes = String(formData.get("notes") ?? "").trim();

  if (!missionId || !agentId || !planifieLe) {
    return { error: "Mission, agent et date sont requis." };
  }

  const { supabase, userId } = await requireStaff();
  const { error } = await supabase.from("visits").insert({
    mission_id: missionId,
    agent_id: agentId,
    planifie_le: new Date(planifieLe).toISOString(),
    notes: notes || null,
    created_by: userId,
  });
  if (error) return { error: error.message };

  await notify(
    agentId,
    `Une visite terrain vous a été planifiée le ${new Date(planifieLe).toLocaleString("fr-FR")}.`,
    `/missions/${missionId}`,
    "action",
  );

  revalidatePath("/back-office/agenda");
  revalidatePath(`/missions/${missionId}`);
  return { error: null };
}

export async function updateVisitStatus(formData: FormData) {
  const visitId = String(formData.get("visit_id") ?? "");
  const statut = String(formData.get("statut") ?? "");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("visits").update({ statut }).eq("id", visitId);
  revalidatePath("/back-office/agenda");
}

// Module 18 — répertoire des partenaires.
export async function createPartner(
  _prevState: MissionActionState,
  formData: FormData,
): Promise<MissionActionState> {
  const nom = String(formData.get("nom") ?? "").trim();
  const type = String(formData.get("type") ?? "") as PartnerType;
  const contact = String(formData.get("contact") ?? "").trim();

  if (!nom || !type) return { error: "Nom et type sont requis." };

  const { supabase } = await requireStaff();
  const { error } = await supabase.from("partners").insert({
    nom,
    type,
    contact: contact || null,
  });
  if (error) return { error: error.message };

  revalidatePath("/back-office/partenaires");
  return { error: null };
}
