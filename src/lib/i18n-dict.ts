// Dictionnaire et constantes partagés entre Server et Client Components (aucune dépendance à
// next/headers ici — voir lib/i18n.ts pour getLocale(), réservé aux Server Components).

export type Locale = "fr" | "en";
export const LOCALE_COOKIE = "yega-locale";

// Chaînes d'interface communes (menu, actions génériques, en-têtes de page). Les libellés
// métier (statuts, types de mission, etc.) vivent dans lib/supabase/types.ts à côté de leurs
// valeurs d'énumération.
export const UI = {
  fr: {
    nav_mes_projets: "Mes projets",
    nav_assistant: "Assistant IA",
    nav_back_office: "Back-office",
    nav_agenda: "Agenda",
    nav_clients: "Clients",
    nav_direction: "Direction",
    nav_partenaires: "Partenaires",
    nav_audit: "Audit",
    nav_aide: "Aide",
    notifications: "Notifications",
    deconnexion: "Déconnexion",
    changer_theme: "Changer de thème (clair / sombre)",
    changer_langue: "Switch to English",
    whatsapp_label: "Contacter YEGA sur WhatsApp",
    whatsapp_message: "Bonjour YEGA, je souhaiterais avoir des informations.",

    dashboard_espace_client: "Espace client",
    dashboard_titre: "Mes projets",
    dashboard_sous_titre: "Suivez l'avancement de vos missions au Cameroun en temps réel.",
    dashboard_deposer_projet: "+ Déposer un projet",
    dashboard_aucun_projet: "Aucun projet pour le moment",
    dashboard_aucun_projet_desc:
      "Cliquez sur « Déposer un projet » pour démarrer votre première mission avec YEGA.",
    dashboard_voir_detail: "Voir le détail →",
    dashboard_actions_requises: "action(s) requièrent votre attention",
    dashboard_stat_budget: "Budget actuel",
    dashboard_stat_documents: "Documents à signer",
    dashboard_stat_preuves: "Preuves ajoutées",
    dashboard_stat_missions_actives: "Missions actives",

    notifications_titre: "Notifications",
    notifications_aucune: "Aucune notification.",
    notifications_marquer_lu: "Marquer comme lu",
    notifications_voir: "Voir",

    aide_titre: "Centre d'aide",
    aide_sous_titre:
      "Questions fréquentes. Pour une question spécifique à votre projet, utilisez la messagerie de la mission concernée.",
    aide_aucune_question: "Aucune question pour le moment.",

    assistant_titre: "Assistant YEGA",
    assistant_sous_titre:
      "Posez une question sur vos projets — l'assistant répond uniquement à partir de vos propres données.",

    agenda_titre: "Agenda",
    agenda_staff: "Planning des visites terrain.",
    agenda_client: "Vos visites terrain planifiées.",
    agenda_aucune_visite: "Aucune visite planifiée.",

    missions_titre: "Missions",
    missions_staff: "Toutes les missions actives de YEGA.",
    missions_agent: "Les missions qui vous sont assignées.",
    missions_aucune: "Aucune mission pour le moment.",
    missions_nouvelle: "Nouvelle mission",

    clients_titre: "Clients",
    clients_sous_titre: "Fiches clients — historique des missions et paiements.",

    direction_titre: "Tableau de bord Direction",
    direction_sous_titre: "Indicateurs stratégiques.",

    partenaires_titre: "Partenaires",
    partenaires_sous_titre:
      "Répertoire des architectes, notaires, banques, artisans et entreprises partenaires.",

    audit_titre: "Journal d'audit",
    audit_sous_titre:
      "Trace des décisions et actions clés (validations, paiements, statuts, budget…) — utile en cas de litige. Non modifiable.",
    audit_aucune_entree: "Aucune entrée pour le moment.",

    login_titre: "Connexion",
    login_sous_titre: "Pilotez vos projets au Cameroun, où que vous soyez.",
    register_titre: "Créer un compte",
    register_sous_titre: "Ouvrez votre espace client YEGA en quelques secondes.",
  },
  en: {
    nav_mes_projets: "My projects",
    nav_assistant: "AI Assistant",
    nav_back_office: "Back office",
    nav_agenda: "Schedule",
    nav_clients: "Clients",
    nav_direction: "Management",
    nav_partenaires: "Partners",
    nav_audit: "Audit",
    nav_aide: "Help",
    notifications: "Notifications",
    deconnexion: "Log out",
    changer_theme: "Switch theme (light / dark)",
    changer_langue: "Passer en français",
    whatsapp_label: "Contact YEGA on WhatsApp",
    whatsapp_message: "Hello YEGA, I'd like some information.",

    dashboard_espace_client: "Client area",
    dashboard_titre: "My projects",
    dashboard_sous_titre: "Track your projects in Cameroon in real time.",
    dashboard_deposer_projet: "+ Submit a project",
    dashboard_aucun_projet: "No project yet",
    dashboard_aucun_projet_desc: "Click “Submit a project” to start your first mission with YEGA.",
    dashboard_voir_detail: "View details →",
    dashboard_actions_requises: "action(s) require your attention",
    dashboard_stat_budget: "Current budget",
    dashboard_stat_documents: "Documents to sign",
    dashboard_stat_preuves: "Proofs added",
    dashboard_stat_missions_actives: "Active missions",

    notifications_titre: "Notifications",
    notifications_aucune: "No notifications.",
    notifications_marquer_lu: "Mark as read",
    notifications_voir: "View",

    aide_titre: "Help center",
    aide_sous_titre:
      "Frequently asked questions. For a question specific to your project, use the mission's messaging.",
    aide_aucune_question: "No questions yet.",

    assistant_titre: "YEGA Assistant",
    assistant_sous_titre:
      "Ask a question about your projects — the assistant only answers from your own data.",

    agenda_titre: "Schedule",
    agenda_staff: "Field visit planning.",
    agenda_client: "Your scheduled field visits.",
    agenda_aucune_visite: "No visit scheduled.",

    missions_titre: "Missions",
    missions_staff: "All active YEGA missions.",
    missions_agent: "Missions assigned to you.",
    missions_aucune: "No mission yet.",
    missions_nouvelle: "New mission",

    clients_titre: "Clients",
    clients_sous_titre: "Client records — mission and payment history.",

    direction_titre: "Management dashboard",
    direction_sous_titre: "Strategic indicators.",

    partenaires_titre: "Partners",
    partenaires_sous_titre: "Directory of architects, notaries, banks, tradespeople and partner companies.",

    audit_titre: "Audit log",
    audit_sous_titre:
      "Trace of key decisions and actions (approvals, payments, statuses, budget…) — useful in case of dispute. Not editable.",
    audit_aucune_entree: "No entry yet.",

    login_titre: "Log in",
    login_sous_titre: "Manage your projects in Cameroon, wherever you are.",
    register_titre: "Create an account",
    register_sous_titre: "Open your YEGA client account in a few seconds.",
  },
} as const;

export type UIDict = (typeof UI)["fr"];
