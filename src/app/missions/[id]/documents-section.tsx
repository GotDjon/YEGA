import { createClient } from "@/lib/supabase/server";
import { getDocumentTypeLabels, type DocumentRow, type DocumentType, type Profile } from "@/lib/supabase/types";
import { getLocale } from "@/lib/i18n";
import { UploadDocumentForm } from "./upload-document-form";
import { SignaturePad } from "./signature-pad";

const CLIENT_DOCUMENT_TYPES: DocumentType[] = ["piece_identite", "titre_foncier"];
const STAFF_DOCUMENT_TYPES: DocumentType[] = [
  "devis",
  "facture",
  "contrat",
  "piece_identite",
  "titre_foncier",
];
const SIGNABLE_TYPES: DocumentType[] = ["contrat", "devis"];

export async function DocumentsSection({
  missionId,
  documents,
  canUpload,
  isStaff,
}: {
  missionId: string;
  documents: DocumentRow[];
  canUpload: boolean;
  isStaff: boolean;
}) {
  const locale = await getLocale();
  const documentTypeLabels = getDocumentTypeLabels(locale);
  const supabase = await createClient();
  const links = await Promise.all(
    documents.map((doc) =>
      supabase.storage.from("documents").createSignedUrl(doc.url, 60 * 10),
    ),
  );

  const signerIds = [...new Set(documents.map((d) => d.signe_par).filter((v): v is string => !!v))];
  const { data: signers } = signerIds.length
    ? await supabase.from("profiles").select("id, nom").in("id", signerIds).returns<
        Pick<Profile, "id" | "nom">[]
      >()
    : { data: [] };
  const signerNames = new Map((signers ?? []).map((s) => [s.id, s.nom]));

  return (
    <section>
      <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-heading">
        Documents
      </h2>

      <ul className="mt-3 space-y-2">
        {documents.length === 0 && (
          <li className="text-sm text-gray-400">Aucun document pour le moment.</li>
        )}
        {documents.map((doc, index) => (
          <li
            key={doc.id}
            className="rounded-xl border border-gray-100 bg-white px-4 py-2.5 text-sm shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span>{documentTypeLabels[doc.type]}</span>
              {links[index].data?.signedUrl ? (
                <a
                  href={links[index].data.signedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-green hover:underline"
                >
                  Ouvrir
                </a>
              ) : (
                <span className="text-gray-300">Lien indisponible</span>
              )}
            </div>

            {SIGNABLE_TYPES.includes(doc.type) && (
              <div className="mt-2 border-t border-gray-100 pt-2">
                {doc.signe_le ? (
                  <p className="text-xs text-green-700">
                    ✓ Signé par {signerNames.get(doc.signe_par!) ?? "—"} le{" "}
                    {new Date(doc.signe_le).toLocaleString("fr-FR")}
                  </p>
                ) : canUpload ? (
                  <SignaturePad documentId={doc.id} missionId={missionId} />
                ) : (
                  <p className="text-xs text-gray-400">Pas encore signé.</p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      {canUpload && (
        <UploadDocumentForm
          missionId={missionId}
          types={isStaff ? STAFF_DOCUMENT_TYPES : CLIENT_DOCUMENT_TYPES}
        />
      )}
    </section>
  );
}
