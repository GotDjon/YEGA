import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkCinetPayStatus } from "@/lib/cinetpay";

// CinetPay appelle cette URL (notify_url) après une tentative de paiement. Conformément à la
// section 8 du cahier des charges ("webhooks de paiement vérifiés"), on ne fait jamais
// confiance au contenu du POST lui-même : on revérifie le statut directement auprès de
// CinetPay via /v2/payment/check avant de mettre à jour la base.
export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const body = contentType.includes("application/json")
    ? await request.json()
    : Object.fromEntries((await request.formData()).entries());

  const transactionId = String(body.cpm_trans_id ?? body.transaction_id ?? "");
  if (!transactionId) {
    return new Response("Missing transaction id", { status: 400 });
  }

  const { statut, methode } = await checkCinetPayStatus(transactionId);

  const admin = createAdminClient();
  const { data: payment } = await admin
    .from("payments")
    .update({ statut, methode })
    .eq("reference_transaction", transactionId)
    .select("mission_id")
    .single();

  if (payment?.mission_id) {
    revalidatePath(`/missions/${payment.mission_id}`);
  }

  return new Response("OK", { status: 200 });
}
