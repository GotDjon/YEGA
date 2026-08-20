// Intégration CinetPay (API v2) — voir section 7 et 9 du cahier des charges.
//
// ⚠️ Champs à revérifier contre https://cinetpay.com/en/documentation/1/checkout/ au moment
// de la configuration du vrai compte CinetPay : cet environnement de développement n'a pas
// d'accès réseau sortant vers cinetpay.com pour valider le contrat d'API en direct. La
// structure ci-dessous correspond à l'API v2 documentée publiquement (endpoint /v2/payment
// pour initier, /v2/payment/check pour vérifier), mais mérite une confirmation ligne à ligne
// avant la mise en production.

const INIT_URL = "https://api-checkout.cinetpay.com/v2/payment";
const CHECK_URL = "https://api-checkout.cinetpay.com/v2/payment/check";

interface InitPaymentParams {
  transactionId: string;
  amount: number;
  description: string;
  notifyUrl: string;
  returnUrl: string;
  customerName: string;
  customerEmail: string;
}

interface InitPaymentResult {
  success: boolean;
  paymentUrl?: string;
  error?: string;
}

export async function initCinetPayPayment(
  params: InitPaymentParams,
): Promise<InitPaymentResult> {
  const apikey = process.env.CINETPAY_API_KEY;
  const siteId = process.env.CINETPAY_SITE_ID;
  if (!apikey || !siteId) {
    return { success: false, error: "CinetPay n'est pas configuré (clés manquantes)." };
  }

  const response = await fetch(INIT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apikey,
      site_id: siteId,
      transaction_id: params.transactionId,
      amount: Math.round(params.amount),
      currency: "XAF",
      description: params.description,
      notify_url: params.notifyUrl,
      return_url: params.returnUrl,
      channels: "ALL",
      customer_name: params.customerName,
      customer_email: params.customerEmail,
    }),
  });

  const json = await response.json();

  if (json.code !== "201" || !json.data?.payment_url) {
    return {
      success: false,
      error: json.description || json.message || "Échec de l'initialisation du paiement.",
    };
  }

  return { success: true, paymentUrl: json.data.payment_url };
}

export type CinetPayStatus = "accepte" | "refuse" | "annule" | "en_attente";

interface CheckPaymentResult {
  statut: CinetPayStatus;
  methode: string | null;
}

// Ne jamais faire confiance au corps du webhook seul (module 8 — sécurité, section 8 du
// cahier des charges) : on revérifie systématiquement le statut auprès de CinetPay lui-même.
export async function checkCinetPayStatus(transactionId: string): Promise<CheckPaymentResult> {
  const apikey = process.env.CINETPAY_API_KEY;
  const siteId = process.env.CINETPAY_SITE_ID;
  if (!apikey || !siteId) {
    return { statut: "en_attente", methode: null };
  }

  const response = await fetch(CHECK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apikey, site_id: siteId, transaction_id: transactionId }),
  });

  const json = await response.json();
  const cinetPayStatus: string | undefined = json.data?.status;
  const operator: string | undefined = json.data?.payment_method;

  const statut: CinetPayStatus =
    cinetPayStatus === "ACCEPTED"
      ? "accepte"
      : cinetPayStatus === "REFUSED"
        ? "refuse"
        : cinetPayStatus === "CANCELLED"
          ? "annule"
          : "en_attente";

  const methode =
    operator === "OM"
      ? "orange"
      : operator === "MOMO"
        ? "momo"
        : operator === "VISA" || operator === "MASTERCARD"
          ? "carte"
          : null;

  return { statut, methode };
}
