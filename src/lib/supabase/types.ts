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
  date_creation: string;
}

export interface MissionWithRelations extends Mission {
  client: Pick<Profile, "id" | "nom"> | null;
  agent: Pick<Profile, "id" | "nom"> | null;
}
