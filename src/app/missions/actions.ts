"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type {
  DocumentType,
  MissionType,
  ReportEtape,
  ReportType,
} from "@/lib/supabase/types";

export type FormActionState = { error: string | null };

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié.");
  return { supabase, userId: user.id };
}

// Module 3 — dépôt de projet en autonomie par le client.
export async function createMissionSelf(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const type = String(formData.get("type") ?? "") as MissionType;
  const description = String(formData.get("description") ?? "").trim();
  const ville = String(formData.get("ville") ?? "").trim();
  const budgetRaw = String(formData.get("budget_estime") ?? "").trim();

  if (!type || !description) {
    return { error: "Le type de projet et la description sont requis." };
  }

  const { supabase, userId } = await requireUser();
  const { data, error } = await supabase
    .from("missions")
    .insert({
      client_id: userId,
      type,
      description,
      ville: ville || null,
      budget_estime: budgetRaw ? Number(budgetRaw) : null,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { error: error?.message ?? "Impossible de créer le projet." };
  }

  revalidatePath("/dashboard");
  redirect(`/missions/${data.id}`);
}

// Module 4 — gestion documentaire (client pour ses pièces, staff pour devis/factures/contrats).
export async function uploadDocument(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const missionId = String(formData.get("mission_id") ?? "");
  const type = String(formData.get("type") ?? "") as DocumentType;
  const file = formData.get("file") as File | null;

  if (!missionId || !type || !file || file.size === 0) {
    return { error: "Sélectionnez un type de document et un fichier." };
  }

  const { supabase } = await requireUser();
  const path = `${missionId}/${crypto.randomUUID()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("documents")
    .upload(path, file);
  if (uploadError) return { error: uploadError.message };

  const { error: insertError } = await supabase
    .from("documents")
    .insert({ mission_id: missionId, type, url: path });
  if (insertError) return { error: insertError.message };

  revalidatePath(`/missions/${missionId}`);
  return { error: null };
}

// Module 7 — rapport d'inspection, créé par l'agent assigné (ou le staff).
export async function createReport(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const missionId = String(formData.get("mission_id") ?? "");
  const type = String(formData.get("type") ?? "") as ReportType;
  const etape = (String(formData.get("etape") ?? "") || null) as ReportEtape | null;
  const observations = String(formData.get("observations") ?? "").trim();
  const gpsLat = String(formData.get("gps_lat") ?? "").trim();
  const gpsLng = String(formData.get("gps_lng") ?? "").trim();
  const file = formData.get("file") as File | null;

  if (!missionId || !type || !file || file.size === 0) {
    return { error: "Sélectionnez un type de rapport et un fichier." };
  }

  const { supabase } = await requireUser();
  const path = `${missionId}/${crypto.randomUUID()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("reports")
    .upload(path, file);
  if (uploadError) return { error: uploadError.message };

  const { error: insertError } = await supabase.from("reports").insert({
    mission_id: missionId,
    type,
    url: path,
    etape,
    observations: observations || null,
    gps_lat: gpsLat ? Number(gpsLat) : null,
    gps_lng: gpsLng ? Number(gpsLng) : null,
  });
  if (insertError) return { error: insertError.message };

  revalidatePath(`/missions/${missionId}`);
  return { error: null };
}

// Validation d'un rapport par le responsable technique — le rend visible du client (module 7).
export async function validateReport(formData: FormData) {
  const reportId = String(formData.get("report_id") ?? "");
  const missionId = String(formData.get("mission_id") ?? "");
  const { supabase, userId } = await requireUser();

  await supabase
    .from("reports")
    .update({ valide_par: userId })
    .eq("id", reportId);

  revalidatePath(`/missions/${missionId}`);
}
