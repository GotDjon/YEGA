// Contenu de la page publique YEGA PROJECT ("/"), activité historique du Groupe YEGA :
// accompagnement des projets au Cameroun (familles Home / Project / Moments). Elle est le
// pendant de /logistics (YEGA LOGISTICS) : deux activités autonomes, même structure de page.
// Remplace le site vitrine Netlify (yega-cm.netlify.app), devenu inaccessible.

import type { Locale } from "@/lib/i18n-dict";

export const HOME = {
  fr: {
    meta_titre: "YEGA PROJECT — Vos projets au Cameroun, en toute confiance",
    meta_description:
      "YEGA PROJECT accompagne vos projets au Cameroun — immobilier, démarches administratives, événements — avec un chargé de mission dédié et un suivi en temps réel, que vous viviez au Cameroun ou à l'étranger.",

    hero_surtitre: "Vos projets au Cameroun",
    hero_titre: "Le Cameroun en toute confiance.",
    hero_desc:
      "Construire, acheter, faire aboutir un dossier administratif, organiser un grand moment en famille : que vous viviez au Cameroun ou à l'étranger, YEGA PROJECT prend votre projet en charge sur le terrain et vous en montre chaque étape.",
    hero_cta_services: "Nos services",
    hero_cta_compte: "Créer votre compte",

    services_titre: "Trois familles de services, un seul interlocuteur",
    services: [
      {
        ancre: "home",
        famille: "YEGA Home",
        titre: "Immobilier",
        desc: "Terrain, construction, rénovation, gestion de votre bien : votre patrimoine suivi de près.",
      },
      {
        ancre: "demarches",
        famille: "YEGA Project",
        titre: "Démarches administratives",
        desc: "Titres, actes, dossiers, entreprises : vos démarches menées à leur terme, sans vous déplacer.",
      },
      {
        ancre: "moments",
        famille: "YEGA Moments",
        titre: "Événements",
        desc: "Mariages, dots, anniversaires, cérémonies : vos moments importants organisés dans les règles.",
      },
    ],
    services_en_savoir_plus: "En savoir plus →",

    details: [
      {
        ancre: "home",
        surtitre: "Service 1 · YEGA Home",
        titre: "Immobilier : bâtir et sécuriser votre patrimoine au Cameroun",
        desc: "Acheter un terrain, faire construire ou rénover une maison quand on n'est pas sur place est souvent source d'inquiétude. YEGA vérifie, négocie, supervise et vous rend compte avec des preuves à chaque étape.",
        prestations: [
          "Recherche de terrain ou de bien, visites et vérification du titre foncier",
          "Accompagnement à l'achat avec nos notaires et géomètres partenaires",
          "Construction : choix des artisans, devis, suivi et contrôle de chantier",
          "Rénovation, extension et travaux d'entretien",
          "Photos avant / pendant / après et rapports d'inspection géolocalisés",
          "Gestion locative, gardiennage et suivi de votre bien",
        ],
        cta: "Confier mon projet immobilier",
      },
      {
        ancre: "demarches",
        surtitre: "Service 2 · YEGA Project",
        titre: "Démarches administratives : vos dossiers, menés jusqu'au bout",
        desc: "Files d'attente, pièces manquantes, allers-retours entre les administrations : nos chargés de mission se déplacent pour vous, suivent chaque dossier et vous tiennent informé jusqu'à l'obtention du document.",
        prestations: [
          "Actes d'état civil : naissance, mariage, décès, copies et légalisations",
          "Titre foncier, immatriculation, morcellement et dossiers au cadastre",
          "Permis de bâtir et autorisations administratives",
          "Création d'entreprise et formalités auprès des administrations",
          "Démarches auprès des banques, notaires et services publics",
          "Retrait, envoi et archivage sécurisé de vos documents",
        ],
        cta: "Confier une démarche",
      },
      {
        ancre: "moments",
        surtitre: "Service 3 · YEGA Moments",
        titre: "Événements : vos grands moments, organisés comme vous l'imaginez",
        desc: "Un mariage, une dot, un anniversaire ou une cérémonie à préparer au pays ? YEGA coordonne les prestataires, gère le budget et vous fait vivre l'événement, même à distance.",
        prestations: [
          "Mariages civils et traditionnels, dots",
          "Anniversaires, baptêmes, fêtes de famille",
          "Funérailles et cérémonies de deuil",
          "Recherche et coordination des prestataires : salle, traiteur, décoration, sono",
          "Suivi du budget et paiements tracés",
          "Reportage photo et vidéo pour ceux qui ne peuvent pas être présents",
        ],
        cta: "Organiser un événement",
      },
    ],

    parcours_surtitre: "Comment ça marche",
    parcours_titre: "Un parcours en 7 étapes, visible en temps réel",
    parcours_desc:
      "Chaque projet suit le même parcours. Vous voyez à tout moment où il en est depuis votre espace client.",
    parcours: [
      { titre: "Reçue", desc: "Vous déposez votre projet en quelques minutes." },
      { titre: "Analysée", desc: "Nous étudions votre besoin, sur dossier et sur le terrain." },
      { titre: "Proposée", desc: "Vous recevez une proposition détaillée et chiffrée." },
      { titre: "Validée", desc: "Vous validez la proposition et le budget." },
      { titre: "En exécution", desc: "Votre chargé de mission passe à l'action sur le terrain." },
      { titre: "Contrôlée", desc: "Le responsable technique vérifie le travail réalisé." },
      { titre: "Clôturée", desc: "Le dossier est clôturé, documents et preuves remis." },
    ],

    garanties_titre: "Nos engagements",
    garanties: [
      {
        titre: "Un interlocuteur dédié",
        desc: "Un chargé de mission suit votre dossier du premier contact à la clôture.",
      },
      {
        titre: "Des preuves à chaque étape",
        desc: "Photos géolocalisées, rapports d'inspection et frise de statut en temps réel.",
      },
      {
        titre: "Des documents sécurisés",
        desc: "Devis, contrats et factures accessibles à vous seul et à l'équipe en charge.",
      },
      {
        titre: "Des paiements tracés",
        desc: "MTN MoMo, Orange Money, carte, PayPal ou virement — chaque franc est justifié.",
      },
    ],

    pour_qui_titre: "Pour qui ?",
    pour_qui: [
      { titre: "La diaspora camerounaise", desc: "Gardez le contrôle de vos projets au pays, à distance." },
      { titre: "Les résidents au Cameroun", desc: "Déléguez vos démarches et gagnez du temps." },
      { titre: "Les expatriés", desc: "Un partenaire local fiable pour vous installer et avancer." },
      {
        titre: "Les clients africains et internationaux",
        desc: "Investissez ou opérez au Cameroun en toute sécurité.",
      },
    ],

    final_titre: "Parlons de votre projet.",
    final_desc: "Créez votre compte gratuitement pour déposer votre projet, ou écrivez-nous sur WhatsApp.",
    final_cta_compte: "Créer votre compte",
    final_cta_whatsapp: "Nous écrire sur WhatsApp",
  },
  en: {
    meta_titre: "YEGA PROJECT — Your projects in Cameroon, with full confidence",
    meta_description:
      "YEGA PROJECT handles your projects in Cameroon — real estate, administrative procedures, events — with a dedicated field agent and real-time tracking, whether you live in Cameroon or abroad.",

    hero_surtitre: "Your projects in Cameroon",
    hero_titre: "Cameroon, with full confidence.",
    hero_desc:
      "Building, buying, getting paperwork through, organising a big family moment: whether you live in Cameroon or abroad, YEGA PROJECT handles your project on the ground and shows you every step.",
    hero_cta_services: "Our services",
    hero_cta_compte: "Create your account",

    services_titre: "Three service families, one point of contact",
    services: [
      {
        ancre: "home",
        famille: "YEGA Home",
        titre: "Real estate",
        desc: "Land, construction, renovation, property management: your assets closely monitored.",
      },
      {
        ancre: "demarches",
        famille: "YEGA Project",
        titre: "Administrative procedures",
        desc: "Titles, certificates, files, companies: your paperwork completed without you travelling.",
      },
      {
        ancre: "moments",
        famille: "YEGA Moments",
        titre: "Events",
        desc: "Weddings, dowries, birthdays, ceremonies: your important moments properly organised.",
      },
    ],
    services_en_savoir_plus: "Learn more →",

    details: [
      {
        ancre: "home",
        surtitre: "Service 1 · YEGA Home",
        titre: "Real estate: build and secure your assets in Cameroon",
        desc: "Buying land, building or renovating a house when you're not there is often a source of worry. YEGA checks, negotiates, supervises and reports back with proof at every step.",
        prestations: [
          "Land or property search, viewings and land title verification",
          "Purchase support with our partner notaries and surveyors",
          "Construction: choosing tradespeople, quotes, site supervision and inspection",
          "Renovation, extensions and maintenance work",
          "Before / during / after photos and geotagged inspection reports",
          "Rental management, caretaking and property monitoring",
        ],
        cta: "Entrust my real estate project",
      },
      {
        ancre: "demarches",
        surtitre: "Service 2 · YEGA Project",
        titre: "Administrative procedures: your files, seen through to the end",
        desc: "Queues, missing documents, back-and-forth between offices: our field agents go in person, follow every file and keep you informed until the document is issued.",
        prestations: [
          "Civil status records: birth, marriage, death, copies and certifications",
          "Land titles, registration, subdivision and land registry files",
          "Building permits and administrative authorisations",
          "Company registration and formalities with the authorities",
          "Procedures with banks, notaries and public services",
          "Collection, shipping and secure archiving of your documents",
        ],
        cta: "Entrust a procedure",
      },
      {
        ancre: "moments",
        surtitre: "Service 3 · YEGA Moments",
        titre: "Events: your big moments, organised the way you imagine",
        desc: "A wedding, a dowry, a birthday or a ceremony to prepare back home? YEGA coordinates the suppliers, manages the budget and lets you experience the event, even from afar.",
        prestations: [
          "Civil and traditional weddings, dowries",
          "Birthdays, christenings, family celebrations",
          "Funerals and mourning ceremonies",
          "Finding and coordinating suppliers: venue, catering, decoration, sound",
          "Budget tracking and traceable payments",
          "Photo and video coverage for those who can't attend",
        ],
        cta: "Organise an event",
      },
    ],

    parcours_surtitre: "How it works",
    parcours_titre: "A 7-step journey, visible in real time",
    parcours_desc:
      "Every project follows the same journey. You can see where it stands at any time from your client area.",
    parcours: [
      { titre: "Received", desc: "You submit your project in a few minutes." },
      { titre: "Reviewed", desc: "We study your needs, on paper and on the ground." },
      { titre: "Proposed", desc: "You receive a detailed, costed proposal." },
      { titre: "Approved", desc: "You approve the proposal and the budget." },
      { titre: "In progress", desc: "Your field agent takes action on the ground." },
      { titre: "Inspected", desc: "The technical lead checks the work done." },
      { titre: "Closed", desc: "The file is closed, documents and proof handed over." },
    ],

    garanties_titre: "Our commitments",
    garanties: [
      {
        titre: "A dedicated contact",
        desc: "A field agent follows your file from first contact to closing.",
      },
      {
        titre: "Proof at every step",
        desc: "Geotagged photos, inspection reports and a real-time status timeline.",
      },
      {
        titre: "Secure documents",
        desc: "Quotes, contracts and invoices visible only to you and your team.",
      },
      {
        titre: "Traceable payments",
        desc: "MTN MoMo, Orange Money, card, PayPal or bank transfer — every franc accounted for.",
      },
    ],

    pour_qui_titre: "Who is it for?",
    pour_qui: [
      { titre: "The Cameroonian diaspora", desc: "Stay in control of your projects back home, remotely." },
      { titre: "Residents of Cameroon", desc: "Delegate your paperwork and save time." },
      { titre: "Expatriates", desc: "A reliable local partner to settle in and move forward." },
      {
        titre: "African and international clients",
        desc: "Invest or operate in Cameroon with peace of mind.",
      },
    ],

    final_titre: "Let's talk about your project.",
    final_desc: "Create your free account to submit your project, or message us on WhatsApp.",
    final_cta_compte: "Create your account",
    final_cta_whatsapp: "Message us on WhatsApp",
  },
} as const;

export function getHomeContent(locale: Locale) {
  return HOME[locale];
}
