"use server";

import { createClient } from "@/lib/supabase/server";
import { createAnthropicClient } from "@/lib/anthropic";
import {
  DOCUMENT_TYPE_LABELS,
  MISSION_STATUS_LABELS,
  MISSION_TYPE_LABELS,
  PAYMENT_METHOD_LABELS,
  type DocumentRow,
  type DocumentType,
  type Mission,
  type PaymentRow,
  type ReportRow,
  type VisitRow,
} from "@/lib/supabase/types";

export interface AssistantMessage {
  role: "user" | "assistant";
  content: string;
}

export type AskAssistantResult = { answer: string } | { error: string };

const ALL_DOCUMENT_TYPES: DocumentType[] = [
  "devis",
  "facture",
  "contrat",
  "piece_identite",
  "titre_foncier",
];

// Module 15 — IA YEGA Assistant. Répond aux questions du client à partir de ses propres
// données (missions, rapports validés, documents, paiements, visites) — jamais d'invention :
// voir la consigne stricte dans le prompt système ci-dessous.
export async function askAssistant(
  history: AssistantMessage[],
  question: string,
): Promise<AskAssistantResult> {
  if (!question.trim()) return { error: "Question vide." };
  if (!process.env.ANTHROPIC_API_KEY) {
    return { error: "L'assistant IA n'est pas encore configuré (clé API manquante)." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Non authentifié." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, nom")
    .eq("id", user.id)
    .single();
  if (!profile || profile.role !== "client") {
    return { error: "L'assistant est réservé aux clients pour le moment." };
  }

  const { data: missions } = await supabase
    .from("missions")
    .select("*")
    .eq("client_id", user.id)
    .returns<Mission[]>();

  const missionIds = (missions ?? []).map((m) => m.id);

  const [{ data: reports }, { data: documents }, { data: payments }, { data: visits }] =
    missionIds.length
      ? await Promise.all([
          supabase
            .from("reports")
            .select("*")
            .in("mission_id", missionIds)
            .order("date_upload", { ascending: false })
            .returns<ReportRow[]>(),
          supabase.from("documents").select("*").in("mission_id", missionIds).returns<
            DocumentRow[]
          >(),
          supabase.from("payments").select("*").in("mission_id", missionIds).returns<
            PaymentRow[]
          >(),
          supabase
            .from("visits")
            .select("*")
            .in("mission_id", missionIds)
            .order("planifie_le", { ascending: true })
            .returns<VisitRow[]>(),
        ])
      : [{ data: [] }, { data: [] }, { data: [] }, { data: [] }];

  const context = buildContext(missions ?? [], reports ?? [], documents ?? [], payments ?? [], visits ?? []);

  const systemPrompt = `Tu es l'assistant YEGA, une IA qui aide les clients de la diaspora camerounaise à suivre l'avancement de leurs projets au Cameroun (immobilier, démarches administratives, événements).

Règles strictes, à respecter absolument :
- Réponds UNIQUEMENT à partir des données listées ci-dessous, qui concernent exclusivement ${profile.nom}.
- Si une information demandée n'est pas présente dans ces données, dis clairement que tu ne la connais pas — ne l'invente jamais (pas de date, montant ou statut fictif).
- Réponds en français, avec un ton chaleureux, clair et concis (quelques phrases, pas de longs paragraphes).
- Tu n'as accès à aucune autre donnée que celle listée ci-dessous.

Données de ${profile.nom} :
${context}`;

  const client = createAnthropicClient();
  const messages = [
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: question },
  ];

  try {
    const response = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 2048,
      system: systemPrompt,
      messages,
    });
    const textBlock = response.content.find((b) => b.type === "text");
    return { answer: textBlock?.type === "text" ? textBlock.text : "" };
  } catch {
    return { error: "Impossible de contacter l'assistant pour le moment." };
  }
}

function buildContext(
  missions: Mission[],
  reports: ReportRow[],
  documents: DocumentRow[],
  payments: PaymentRow[],
  visits: VisitRow[],
): string {
  if (missions.length === 0) return "Ce client n'a encore aucun projet enregistré.";

  const lines: string[] = [];

  for (const mission of missions) {
    lines.push(
      `\n--- Mission ${mission.id} (${MISSION_TYPE_LABELS[mission.type]}${mission.ville ? `, ${mission.ville}` : ""}) ---`,
    );
    lines.push(`Statut actuel : ${MISSION_STATUS_LABELS[mission.statut]}.`);
    lines.push(`Créée le ${new Date(mission.date_creation).toLocaleDateString("fr-FR")}.`);
    if (mission.description) lines.push(`Description : ${mission.description}`);
    if (mission.budget_estime) {
      lines.push(`Budget estimé : ${mission.budget_estime.toLocaleString("fr-FR")} FCFA.`);
    }

    const missionDocs = documents.filter((d) => d.mission_id === mission.id);
    const presentTypes = new Set(missionDocs.map((d) => d.type));
    const missingTypes = ALL_DOCUMENT_TYPES.filter((t) => !presentTypes.has(t));
    lines.push(
      `Documents déposés : ${missionDocs.length ? missionDocs.map((d) => DOCUMENT_TYPE_LABELS[d.type]).join(", ") : "aucun"}.`,
    );
    lines.push(
      `Types de documents standards manquants : ${missingTypes.length ? missingTypes.map((t) => DOCUMENT_TYPE_LABELS[t]).join(", ") : "aucun, tout est déposé"}.`,
    );

    const missionReports = reports.filter((r) => r.mission_id === mission.id && r.valide_par);
    if (missionReports.length) {
      lines.push(`Rapports validés disponibles (${missionReports.length}) :`);
      for (const report of missionReports.slice(0, 5)) {
        lines.push(
          `  - ${report.type}${report.etape ? ` (${report.etape})` : ""} du ${new Date(report.date_upload).toLocaleDateString("fr-FR")}${report.observations ? ` — ${report.observations}` : ""}`,
        );
      }
    } else {
      lines.push("Aucun rapport validé disponible pour l'instant.");
    }

    const missionPayments = payments.filter((p) => p.mission_id === mission.id);
    const totalPaye = missionPayments
      .filter((p) => p.statut === "accepte")
      .reduce((sum, p) => sum + p.montant, 0);
    lines.push(`Total payé et accepté : ${totalPaye.toLocaleString("fr-FR")} FCFA.`);
    if (mission.budget_estime) {
      const restant = mission.budget_estime - totalPaye;
      lines.push(`Montant restant estimé : ${restant.toLocaleString("fr-FR")} FCFA.`);
    }
    for (const payment of missionPayments) {
      lines.push(
        `  - Paiement de ${payment.montant.toLocaleString("fr-FR")} FCFA, statut "${payment.statut}"${payment.methode ? `, méthode ${PAYMENT_METHOD_LABELS[payment.methode]}` : ""}, le ${new Date(payment.date).toLocaleDateString("fr-FR")}.`,
      );
    }

    const missionVisits = visits.filter(
      (v) => v.mission_id === mission.id && v.statut === "planifiee",
    );
    if (missionVisits.length) {
      lines.push("Prochaines visites planifiées :");
      for (const visit of missionVisits) {
        lines.push(`  - ${new Date(visit.planifie_le).toLocaleString("fr-FR")}`);
      }
    } else {
      lines.push("Aucune visite planifiée pour le moment.");
    }
  }

  return lines.join("\n");
}
