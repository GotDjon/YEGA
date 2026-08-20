import { createClient } from "@/lib/supabase/server";
import {
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_LABELS,
  type PaymentRow,
} from "@/lib/supabase/types";
import { PaymentForm } from "./payment-form";

export async function PaymentsSection({
  missionId,
  isClient,
}: {
  missionId: string;
  isClient: boolean;
}) {
  const supabase = await createClient();
  const { data: payments } = await supabase
    .from("payments")
    .select("*")
    .eq("mission_id", missionId)
    .order("date", { ascending: false })
    .returns<PaymentRow[]>();

  return (
    <section>
      <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-brand-green-dark">
        Paiements
      </h2>

      <ul className="mt-3 space-y-2">
        {(!payments || payments.length === 0) && (
          <li className="text-sm text-gray-400">Aucun paiement pour le moment.</li>
        )}
        {payments?.map((payment) => (
          <li
            key={payment.id}
            className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-2.5 text-sm shadow-sm"
          >
            <span>
              {payment.montant.toLocaleString("fr-FR")} FCFA
              {payment.methode ? ` · ${PAYMENT_METHOD_LABELS[payment.methode]}` : ""}
            </span>
            <span
              className={
                payment.statut === "accepte"
                  ? "rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                  : payment.statut === "refuse" || payment.statut === "annule"
                    ? "rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700"
                    : "rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700"
              }
            >
              {PAYMENT_STATUS_LABELS[payment.statut as keyof typeof PAYMENT_STATUS_LABELS] ??
                payment.statut}
            </span>
          </li>
        ))}
      </ul>

      {isClient && <PaymentForm missionId={missionId} />}
    </section>
  );
}
