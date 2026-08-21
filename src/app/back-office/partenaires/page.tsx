import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/session";
import { AwarenessTip } from "@/components/AwarenessTip";
import { PARTNER_TYPE_LABELS, type PartnerRow } from "@/lib/supabase/types";
import { NewPartnerForm } from "./new-partner-form";

const STAFF_ROLES = ["responsable_technique", "direction", "admin"];

export default async function PartenairesPage() {
  const profile = await getCurrentProfile();
  if (!profile || !STAFF_ROLES.includes(profile.role)) redirect("/back-office/missions");

  const supabase = await createClient();
  const { data: partners } = await supabase
    .from("partners")
    .select("*")
    .order("nom")
    .returns<PartnerRow[]>();

  return (
    <div>
      <AwarenessTip role={profile.role} pageKey="back-office-partenaires" />
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-heading">
        Partenaires
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Répertoire des architectes, notaires, banques, artisans et entreprises partenaires
        (module 18).
      </p>

      <NewPartnerForm />

      <div className="card mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-green-light/60 text-[11px] font-semibold uppercase tracking-wide text-heading">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Note</th>
            </tr>
          </thead>
          <tbody>
            {!partners?.length && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                  Aucun partenaire enregistré.
                </td>
              </tr>
            )}
            {partners?.map((partner) => (
              <tr key={partner.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium text-gray-800">{partner.nom}</td>
                <td className="px-4 py-3 text-gray-500">{PARTNER_TYPE_LABELS[partner.type]}</td>
                <td className="px-4 py-3 text-gray-500">{partner.contact ?? "—"}</td>
                <td className="px-4 py-3 text-gray-500">
                  {partner.note_moyenne ? `${partner.note_moyenne}/5` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-gray-400">
        Le système de notation détaillé des partenaires est prévu en évolution future (section
        12 du cahier des charges).{" "}
        <Link href="/back-office/missions" className="text-brand-green hover:underline">
          Retour au back-office
        </Link>
      </p>
    </div>
  );
}
