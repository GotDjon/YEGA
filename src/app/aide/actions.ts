"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type FaqActionState = { error: string | null };

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

  if (!profile || !["responsable_technique", "direction", "admin"].includes(profile.role)) {
    throw new Error("Action réservée au staff.");
  }

  return supabase;
}

export async function createFaq(
  _prevState: FaqActionState,
  formData: FormData,
): Promise<FaqActionState> {
  const question = String(formData.get("question") ?? "").trim();
  const reponse = String(formData.get("reponse") ?? "").trim();
  if (!question || !reponse) return { error: "Question et réponse sont requises." };

  try {
    const supabase = await requireStaff();
    const { error } = await supabase.from("faqs").insert({ question, reponse });
    if (error) return { error: error.message };
  } catch (err) {
    return { error: (err as Error).message };
  }

  revalidatePath("/aide");
  return { error: null };
}

export async function deleteFaq(formData: FormData) {
  const faqId = String(formData.get("faq_id") ?? "");
  const supabase = await requireStaff();
  await supabase.from("faqs").delete().eq("id", faqId);
  revalidatePath("/aide");
}
