import { createClient } from "@/lib/supabase/server";
import type { MessageRow, Profile } from "@/lib/supabase/types";
import { MessageForm } from "./message-form";

export async function MessagesSection({
  missionId,
  currentUserId,
}: {
  missionId: string;
  currentUserId: string;
}) {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .eq("mission_id", missionId)
    .order("date", { ascending: true })
    .returns<MessageRow[]>();

  const senderIds = [...new Set((messages ?? []).map((m) => m.sender_id))];
  const { data: senders } = senderIds.length
    ? await supabase.from("profiles").select("id, nom").in("id", senderIds).returns<
        Pick<Profile, "id" | "nom">[]
      >()
    : { data: [] };
  const senderNames = new Map((senders ?? []).map((s) => [s.id, s.nom]));

  return (
    <section>
      <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-heading">
        Messagerie
      </h2>

      <div className="mt-3 space-y-2">
        {(!messages || messages.length === 0) && (
          <p className="text-sm text-gray-400">
            Aucun message pour le moment — c&apos;est le fil dédié à cette mission.
          </p>
        )}
        {messages?.map((message) => {
          const isMine = message.sender_id === currentUserId;
          return (
            <div
              key={message.id}
              className={
                "max-w-md rounded-lg border px-4 py-2 text-sm " +
                (isMine
                  ? "ml-auto border-brand-green bg-brand-green/5"
                  : "border-gray-200 bg-white")
              }
            >
              <p className="text-xs font-medium text-gray-500">
                {senderNames.get(message.sender_id) ?? "—"} ·{" "}
                {new Date(message.date).toLocaleString("fr-FR")}
              </p>
              <p className="mt-1 text-gray-700">{message.contenu}</p>
            </div>
          );
        })}
      </div>

      <MessageForm missionId={missionId} />
    </section>
  );
}
