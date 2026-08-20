"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { initCinetPayPayment } from "@/lib/cinetpay";
import { notify } from "@/lib/notifications";
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

async function getOrigin() {
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const proto = host.startsWith("localhost") ? "http" : "https";
  return `${proto}://${host}`;
}

// Module 9 — le client initie un paiement (Mobile Money / carte) via l'agrégateur CinetPay.
export async function initiatePayment(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const missionId = String(formData.get("mission_id") ?? "");
  const montantRaw = String(formData.get("montant") ?? "").trim();
  const montant = Number(montantRaw);

  if (!missionId || !montantRaw || !Number.isFinite(montant) || montant <= 0) {
    return { error: "Indiquez un montant valide." };
  }

  const { supabase, userId } = await requireUser();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("nom")
    .eq("id", userId)
    .single();

  const transactionId = crypto.randomUUID();

  const { error: insertError } = await supabase.from("payments").insert({
    mission_id: missionId,
    montant,
    statut: "en_attente",
    reference_transaction: transactionId,
  });
  if (insertError) return { error: insertError.message };

  const origin = await getOrigin();
  const result = await initCinetPayPayment({
    transactionId,
    amount: montant,
    description: `Paiement mission YEGA — ${missionId}`,
    notifyUrl: `${origin}/api/payments/webhook`,
    returnUrl: `${origin}/missions/${missionId}`,
    customerName: profile?.nom ?? "Client YEGA",
    customerEmail: user?.email ?? "",
  });

  if (!result.success || !result.paymentUrl) {
    return { error: result.error ?? "Impossible d'initier le paiement." };
  }

  redirect(result.paymentUrl);
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

  const { data: mission } = await supabase
    .from("missions")
    .select("client_id")
    .eq("id", missionId)
    .single();
  if (mission?.client_id) {
    await notify(mission.client_id, "Un nouveau rapport est disponible pour votre mission.", `/missions/${missionId}`);
  }

  revalidatePath(`/missions/${missionId}`);
}

// Module 10 — messagerie par mission (fil de discussion client ↔ agent assigné).
export async function sendMessage(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const missionId = String(formData.get("mission_id") ?? "");
  const contenu = String(formData.get("contenu") ?? "").trim();
  if (!missionId || !contenu) return { error: "Message vide." };

  const { supabase, userId } = await requireUser();

  const { data: mission } = await supabase
    .from("missions")
    .select("client_id, agent_id")
    .eq("id", missionId)
    .single();

  const { error } = await supabase
    .from("messages")
    .insert({ mission_id: missionId, sender_id: userId, contenu });
  if (error) return { error: error.message };

  const recipient = userId === mission?.client_id ? mission?.agent_id : mission?.client_id;
  if (recipient) {
    await notify(recipient, "Nouveau message sur une de vos missions.", `/missions/${missionId}`);
  }

  revalidatePath(`/missions/${missionId}`);
  return { error: null };
}

// Module 17 — signature électronique d'un document (contrat, devis) directement dans la
// plateforme, pour éviter les allers-retours papier/PDF scanné (section 4 du cahier des
// charges).
export async function signDocument(formData: FormData) {
  const documentId = String(formData.get("document_id") ?? "");
  const missionId = String(formData.get("mission_id") ?? "");
  const signatureDataUrl = String(formData.get("signature") ?? "");
  if (!documentId || !missionId || !signatureDataUrl.startsWith("data:image/png;base64,")) {
    return;
  }

  const { supabase, userId } = await requireUser();
  const base64 = signatureDataUrl.split(",")[1];
  const bytes = Buffer.from(base64, "base64");
  const path = `${missionId}/signatures/${documentId}-${crypto.randomUUID()}.png`;

  const { error: uploadError } = await supabase.storage
    .from("documents")
    .upload(path, bytes, { contentType: "image/png" });
  if (uploadError) return;

  await supabase
    .from("documents")
    .update({ signature_url: path, signe_par: userId, signe_le: new Date().toISOString() })
    .eq("id", documentId);

  revalidatePath(`/missions/${missionId}`);
}
