// Contenu de la page d'accueil publique du Groupe YEGA ("/"). Elle présente les deux
// activités du groupe — YEGA Projets (plateforme de suivi) et YEGA LOGISTICS — et remplace
// le site vitrine Netlify (yega-cm.netlify.app), devenu inaccessible.

import type { Locale } from "@/lib/i18n-dict";

export const HOME = {
  fr: {
    meta_titre: "YEGA — Le Cameroun en toute confiance",
    meta_description:
      "Groupe YEGA : vos projets au Cameroun (immobilier, démarches, événements) suivis en temps réel, et YEGA LOGISTICS pour la collecte, la livraison écologique et la sous-traitance logistique.",

    hero_surtitre: "Groupe YEGA",
    hero_titre: "Le Cameroun en toute confiance.",
    hero_desc:
      "Que vous viviez au Cameroun ou à l'étranger, YEGA prend en charge vos projets et votre logistique sur le terrain — avec un suivi transparent à chaque étape.",
    hero_cta_projet: "Déposer un projet",
    hero_cta_logistics: "Découvrir YEGA LOGISTICS",

    poles_titre: "Deux activités, une même exigence",
    poles: [
      {
        id: "projets",
        nom: "YEGA Projets",
        accroche: "Vos projets au Cameroun, suivis comme si vous étiez sur place.",
        services: ["Immobilier", "Démarches administratives", "Événements"],
        cta: "Créer mon espace client",
        href: "/register",
      },
      {
        id: "logistics",
        nom: "YEGA LOGISTICS",
        accroche: "On s'occupe du terrain. Vous vous occupez de l'essentiel.",
        services: [
          "PoubApp — collecte des ordures ménagères",
          "Livraison écologique en moto électrique",
          "Sous-traitance logistique pour les entreprises",
        ],
        cta: "Découvrir YEGA LOGISTICS",
        href: "/logistics",
      },
    ],

    projets_surtitre: "YEGA Projets",
    projets_titre: "Un chargé de mission, un suivi en temps réel, zéro mauvaise surprise",
    projets_desc:
      "Construction ou achat immobilier, papiers administratifs, organisation d'un mariage ou d'un événement : vous déposez votre projet sur la plateforme, une équipe YEGA le prend en charge sur le terrain et vous en suivez chaque étape depuis votre espace client.",
    projets_etapes: [
      { titre: "Vous déposez votre projet", desc: "En quelques minutes, depuis votre espace client." },
      { titre: "Nous l'analysons", desc: "Étude, budget et proposition détaillée à valider." },
      { titre: "Nous l'exécutons", desc: "Visites terrain, photos avant / pendant / après, rapports." },
      { titre: "Nous le clôturons", desc: "Contrôle final, documents remis, dossier clôturé." },
    ],
    projets_garanties: [
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
    final_desc: "Créez votre espace client gratuitement, ou écrivez-nous directement sur WhatsApp.",
    final_cta_compte: "Créer mon espace client",
    final_cta_whatsapp: "Nous écrire sur WhatsApp",
  },
  en: {
    meta_titre: "YEGA — Cameroon with full confidence",
    meta_description:
      "YEGA Group: your projects in Cameroon (real estate, paperwork, events) tracked in real time, and YEGA LOGISTICS for waste collection, green delivery and logistics outsourcing.",

    hero_surtitre: "YEGA Group",
    hero_titre: "Cameroon, with full confidence.",
    hero_desc:
      "Whether you live in Cameroon or abroad, YEGA handles your projects and your logistics on the ground — with transparent tracking at every step.",
    hero_cta_projet: "Submit a project",
    hero_cta_logistics: "Discover YEGA LOGISTICS",

    poles_titre: "Two businesses, one standard",
    poles: [
      {
        id: "projets",
        nom: "YEGA Projects",
        accroche: "Your projects in Cameroon, tracked as if you were there.",
        services: ["Real estate", "Administrative procedures", "Events"],
        cta: "Create my client account",
        href: "/register",
      },
      {
        id: "logistics",
        nom: "YEGA LOGISTICS",
        accroche: "We handle the groundwork. You focus on what matters.",
        services: [
          "PoubApp — household waste collection",
          "Green delivery by electric motorbike",
          "Logistics outsourcing for companies",
        ],
        cta: "Discover YEGA LOGISTICS",
        href: "/logistics",
      },
    ],

    projets_surtitre: "YEGA Projects",
    projets_titre: "A dedicated agent, real-time tracking, no bad surprises",
    projets_desc:
      "Building or buying property, administrative paperwork, organising a wedding or an event: submit your project on the platform, a YEGA team handles it on the ground, and you follow every step from your client area.",
    projets_etapes: [
      { titre: "You submit your project", desc: "In a few minutes, from your client area." },
      { titre: "We review it", desc: "Study, budget and a detailed proposal for your approval." },
      { titre: "We carry it out", desc: "Field visits, before / during / after photos, reports." },
      { titre: "We close it", desc: "Final inspection, documents handed over, file closed." },
    ],
    projets_garanties: [
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
    final_desc: "Create your free client account, or message us directly on WhatsApp.",
    final_cta_compte: "Create my client account",
    final_cta_whatsapp: "Message us on WhatsApp",
  },
} as const;

export function getHomeContent(locale: Locale) {
  return HOME[locale];
}
