"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { askAssistant, type AssistantMessage } from "./actions";

const SUGGESTIONS = [
  "Où en est mon chantier ?",
  "Quand aura lieu la prochaine visite ?",
  "Quel est le montant restant à payer ?",
  "Quels documents manquent ?",
];

export function AssistantChat() {
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send(question: string) {
    if (!question.trim() || pending) return;
    setError(null);
    const history = messages;
    setMessages([...history, { role: "user", content: question }]);
    setInput("");

    startTransition(async () => {
      const result = await askAssistant(history, question);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setMessages((prev) => [...prev, { role: "assistant", content: result.answer }]);
    });
  }

  return (
    <div className="card mt-6 rounded-2xl border border-gray-100 bg-white">
      <div className="max-h-[28rem] min-h-[16rem] overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-400">
              Essayez par exemple :
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 hover:border-brand-green hover:text-brand-green"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((message, i) => (
          <div
            key={i}
            className={
              "max-w-md rounded-lg border px-4 py-2 text-sm " +
              (message.role === "user"
                ? "ml-auto border-brand-green bg-brand-green/5"
                : "border-gray-200 bg-gray-50")
            }
          >
            {message.content}
          </div>
        ))}
        {pending && <p className="text-xs text-gray-400">L&apos;assistant réfléchit…</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex gap-2 border-t border-gray-100 p-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question…"
          className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/15"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-brand-green px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-green/30 transition hover:bg-brand-green-dark hover:shadow-md disabled:opacity-60"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
