import type { Locale } from "@/lib/i18n-dict";

export type UserRole =
  | "client"
  | "agent"
  | "responsable_technique"
  | "direction"
  | "admin";

export type MissionType = "home" | "project" | "moments";

export type MissionStatus =
  | "recue"
  | "analysee"
  | "proposee"
  | "validee"
  | "en_execution"
  | "controlee"
  | "cloturee";

export const MISSION_STATUS_ORDER: MissionStatus[] = [
  "recue",
  "analysee",
  "proposee",
  "validee",
  "en_execution",
  "controlee",
  "cloturee",
];

export const MISSION_STATUS_LABELS: Record<MissionStatus, string> = {
  recue: "Reçue",
  analysee: "Analysée",
  proposee: "Proposée",
  validee: "Validée",
  en_execution: "En exécution",
  controlee: "Contrôlée",
  cloturee: "Clôturée",
};

const MISSION_STATUS_LABELS_EN: Record<MissionStatus, string> = {
  recue: "Received",
  analysee: "Reviewed",
  proposee: "Proposed",
  validee: "Approved",
  en_execution: "In progress",
  controlee: "Inspected",
  cloturee: "Closed",
};

export function getMissionStatusLabels(locale: Locale) {
  return locale === "en" ? MISSION_STATUS_LABELS_EN : MISSION_STATUS_LABELS;
}

export const MISSION_TYPE_LABELS: Record<MissionType, string> = {
  home: "Immobilier",
  project: "Démarches administratives",
  moments: "Événements",
};

const MISSION_TYPE_LABELS_EN: Record<MissionType, string> = {
  home: "Real estate",
  project: "Administrative procedures",
  moments: "Events",
};

export function getMissionTypeLabels(locale: Locale) {
  return locale === "en" ? MISSION_TYPE_LABELS_EN : MISSION_TYPE_LABELS;
}

export interface Profile {
  id: string;
  role: UserRole;
  nom: string;
  telephone: string | null;
  pays: string | null;
  date_creation: string;
}

export interface Mission {
  id: string;
  client_id: string;
  agent_id: string | null;
  type: MissionType;
  statut: MissionStatus;
  ville: string | null;
  description: string | null;
  budget_estime: number | null;
  date_creation: string;
}

export interface MissionWithRelations extends Mission {
  client: Pick<Profile, "id" | "nom"> | null;
  agent: Pick<Profile, "id" | "nom"> | null;
}

export type DocumentType =
  | "devis"
  | "facture"
  | "contrat"
  | "piece_identite"
  | "titre_foncier";

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  devis: "Devis",
  facture: "Facture",
  contrat: "Contrat",
  piece_identite: "Pièce d'identité",
  titre_foncier: "Titre foncier",
};

const DOCUMENT_TYPE_LABELS_EN: Record<DocumentType, string> = {
  devis: "Quote",
  facture: "Invoice",
  contrat: "Contract",
  piece_identite: "ID document",
  titre_foncier: "Land title",
};

export function getDocumentTypeLabels(locale: Locale) {
  return locale === "en" ? DOCUMENT_TYPE_LABELS_EN : DOCUMENT_TYPE_LABELS;
}

export interface DocumentRow {
  id: string;
  mission_id: string;
  type: DocumentType;
  url: string;
  date: string;
  signature_url: string | null;
  signe_par: string | null;
  signe_le: string | null;
}

export type ReportType = "photo" | "video" | "pdf" | "checklist";
export type ReportEtape = "avant" | "pendant" | "apres";

export const REPORT_ETAPE_LABELS: Record<ReportEtape, string> = {
  avant: "Avant",
  pendant: "Pendant",
  apres: "Après",
};

export interface ReportRow {
  id: string;
  mission_id: string;
  type: ReportType;
  url: string;
  gps_lat: number | null;
  gps_lng: number | null;
  etape: ReportEtape | null;
  observations: string | null;
  date_upload: string;
  valide_par: string | null;
}

export type PaymentMethod = "momo" | "orange" | "carte" | "paypal" | "virement";
export type PaymentStatus = "en_attente" | "accepte" | "refuse" | "annule";

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  momo: "MTN MoMo",
  orange: "Orange Money",
  carte: "Carte bancaire",
  paypal: "PayPal",
  virement: "Virement",
};

const PAYMENT_METHOD_LABELS_EN: Record<PaymentMethod, string> = {
  momo: "MTN MoMo",
  orange: "Orange Money",
  carte: "Card",
  paypal: "PayPal",
  virement: "Bank transfer",
};

export function getPaymentMethodLabels(locale: Locale) {
  return locale === "en" ? PAYMENT_METHOD_LABELS_EN : PAYMENT_METHOD_LABELS;
}

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  en_attente: "En attente",
  accepte: "Accepté",
  refuse: "Refusé",
  annule: "Annulé",
};

const PAYMENT_STATUS_LABELS_EN: Record<PaymentStatus, string> = {
  en_attente: "Pending",
  accepte: "Accepted",
  refuse: "Refused",
  annule: "Cancelled",
};

export function getPaymentStatusLabels(locale: Locale) {
  return locale === "en" ? PAYMENT_STATUS_LABELS_EN : PAYMENT_STATUS_LABELS;
}

export interface PaymentRow {
  id: string;
  mission_id: string;
  montant: number;
  methode: PaymentMethod | null;
  statut: string;
  date: string;
  reference_transaction: string | null;
}

export interface MessageRow {
  id: string;
  mission_id: string;
  sender_id: string;
  contenu: string;
  piece_jointe_url: string | null;
  date: string;
  lu: boolean;
}

export type VisitStatus = "planifiee" | "terminee" | "annulee";

export const VISIT_STATUS_LABELS: Record<VisitStatus, string> = {
  planifiee: "Planifiée",
  terminee: "Terminée",
  annulee: "Annulée",
};

const VISIT_STATUS_LABELS_EN: Record<VisitStatus, string> = {
  planifiee: "Scheduled",
  terminee: "Completed",
  annulee: "Cancelled",
};

export function getVisitStatusLabels(locale: Locale) {
  return locale === "en" ? VISIT_STATUS_LABELS_EN : VISIT_STATUS_LABELS;
}

export interface VisitRow {
  id: string;
  mission_id: string;
  agent_id: string;
  planifie_le: string;
  notes: string | null;
  statut: VisitStatus;
  created_by: string;
  date_creation: string;
}

export interface VisitWithRelations extends VisitRow {
  mission: { id: string; type: MissionType; ville: string | null } | null;
  agent: Pick<Profile, "id" | "nom"> | null;
}

export type NotificationSeverite = "critique" | "attention" | "action" | "info";

export const NOTIFICATION_SEVERITE_LABELS: Record<NotificationSeverite, string> = {
  critique: "Critique",
  attention: "Attention",
  action: "Action requise",
  info: "Information",
};

const NOTIFICATION_SEVERITE_LABELS_EN: Record<NotificationSeverite, string> = {
  critique: "Critical",
  attention: "Attention",
  action: "Action required",
  info: "Information",
};

export function getNotificationSeveriteLabels(locale: Locale) {
  return locale === "en" ? NOTIFICATION_SEVERITE_LABELS_EN : NOTIFICATION_SEVERITE_LABELS;
}

export interface NotificationRow {
  id: string;
  user_id: string;
  contenu: string;
  lien: string | null;
  lu: boolean;
  severite: NotificationSeverite;
  date_creation: string;
}

export type AnomalyGravite = "faible" | "moyenne" | "elevee";
export type AnomalyStatut = "ouverte" | "en_correction" | "a_verifier" | "resolue";

export const ANOMALY_GRAVITE_LABELS: Record<AnomalyGravite, string> = {
  faible: "Faible",
  moyenne: "Moyenne",
  elevee: "Élevée",
};

const ANOMALY_GRAVITE_LABELS_EN: Record<AnomalyGravite, string> = {
  faible: "Low",
  moyenne: "Medium",
  elevee: "High",
};

export function getAnomalyGraviteLabels(locale: Locale) {
  return locale === "en" ? ANOMALY_GRAVITE_LABELS_EN : ANOMALY_GRAVITE_LABELS;
}

export const ANOMALY_STATUT_LABELS: Record<AnomalyStatut, string> = {
  ouverte: "Ouverte",
  en_correction: "En correction",
  a_verifier: "À vérifier",
  resolue: "Résolue",
};

const ANOMALY_STATUT_LABELS_EN: Record<AnomalyStatut, string> = {
  ouverte: "Open",
  en_correction: "Being fixed",
  a_verifier: "To verify",
  resolue: "Resolved",
};

export function getAnomalyStatutLabels(locale: Locale) {
  return locale === "en" ? ANOMALY_STATUT_LABELS_EN : ANOMALY_STATUT_LABELS;
}

export const ANOMALY_STATUT_ORDER: AnomalyStatut[] = [
  "ouverte",
  "en_correction",
  "a_verifier",
  "resolue",
];

export interface AnomalyRow {
  id: string;
  mission_id: string;
  titre: string;
  description: string | null;
  gravite: AnomalyGravite;
  statut: AnomalyStatut;
  signale_par: string | null;
  date_creation: string;
  date_resolution: string | null;
}

export interface BudgetRevisionRow {
  id: string;
  mission_id: string;
  montant_delta: number;
  motif: string | null;
  created_by: string | null;
  date_creation: string;
}

export interface AuditLogRow {
  id: string;
  actor_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: string | null;
  date_creation: string;
}

export interface AuditLogWithActor extends AuditLogRow {
  actor: Pick<Profile, "id" | "nom"> | null;
}

export type PartnerType = "architecte" | "notaire" | "banque" | "artisan" | "entreprise";

export const PARTNER_TYPE_LABELS: Record<PartnerType, string> = {
  architecte: "Architecte",
  notaire: "Notaire",
  banque: "Banque",
  artisan: "Artisan",
  entreprise: "Entreprise",
};

const PARTNER_TYPE_LABELS_EN: Record<PartnerType, string> = {
  architecte: "Architect",
  notaire: "Notary",
  banque: "Bank",
  artisan: "Tradesperson",
  entreprise: "Company",
};

export function getPartnerTypeLabels(locale: Locale) {
  return locale === "en" ? PARTNER_TYPE_LABELS_EN : PARTNER_TYPE_LABELS;
}

export interface PartnerRow {
  id: string;
  nom: string;
  type: PartnerType;
  contact: string | null;
  note_moyenne: number | null;
}

export interface FaqRow {
  id: string;
  question: string;
  reponse: string;
  ordre: number;
  date_creation: string;
}
