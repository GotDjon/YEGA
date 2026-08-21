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

export const MISSION_TYPE_LABELS: Record<MissionType, string> = {
  home: "Home",
  project: "Project",
  moments: "Moments",
};

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

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  en_attente: "En attente",
  accepte: "Accepté",
  refuse: "Refusé",
  annule: "Annulé",
};

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

export const ANOMALY_STATUT_LABELS: Record<AnomalyStatut, string> = {
  ouverte: "Ouverte",
  en_correction: "En correction",
  a_verifier: "À vérifier",
  resolue: "Résolue",
};

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
