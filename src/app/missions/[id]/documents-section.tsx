import { createClient } from "@/lib/supabase/server";
import { DOCUMENT_TYPE_LABELS, type DocumentRow, type DocumentType } from "@/lib/supabase/types";
import { UploadDocumentForm } from "./upload-document-form";

const CLIENT_DOCUMENT_TYPES: DocumentType[] = ["piece_identite", "titre_foncier"];
const STAFF_DOCUMENT_TYPES: DocumentType[] = [
  "devis",
  "facture",
  "contrat",
  "piece_identite",
  "titre_foncier",
];

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
  const supabase = await createClient();
  const links = await Promise.all(
    documents.map((doc) =>
      supabase.storage.from("documents").createSignedUrl(doc.url, 60 * 10),
    ),
  );

  return (
    <section>
      <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-brand-green-dark">
        Documents
      </h2>

      <ul className="mt-3 space-y-2">
        {documents.length === 0 && (
          <li className="text-sm text-gray-400">Aucun document pour le moment.</li>
        )}
        {documents.map((doc, index) => (
          <li
            key={doc.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm"
          >
            <span>{DOCUMENT_TYPE_LABELS[doc.type]}</span>
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
