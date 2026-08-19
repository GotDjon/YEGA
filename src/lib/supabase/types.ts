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
