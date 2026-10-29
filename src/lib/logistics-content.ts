// Contenu de la page publique YEGA LOGISTICS (/logistics), filiale logistique du Groupe YEGA.
// Séparé de i18n-dict.ts : ce sont des textes éditoriaux longs, propres à cette page.
// Tarifs PoubApp : business plan PoubApp (édition du 24/09/2026).

import type { Locale } from "@/lib/i18n-dict";

export const LOGISTICS = {
  fr: {
    meta_titre: "YEGA LOGISTICS — Collecte, livraison écologique et sous-traitance logistique",
    meta_description:
      "YEGA LOGISTICS, filiale logistique du Groupe YEGA : PoubApp (collecte des ordures ménagères), livraison écologique en moto électrique et sous-traitance logistique au Cameroun.",

    nav_espace_client: "Espace client",
    nav_retour_espace: "Mon espace",

    hero_surtitre: "Filiale logistique du Groupe YEGA",
    hero_titre: "On s'occupe du terrain. Vous vous occupez de l'essentiel.",
    hero_desc:
      "Collecte des ordures ménagères, livraison en moto électrique, gestion déléguée de vos opérations : YEGA LOGISTICS met la même exigence de confiance au service des ménages, des commerces et des entreprises.",
    hero_cta_services: "Découvrir nos services",
    hero_cta_contact: "Nous écrire sur WhatsApp",

    services_titre: "Trois services, une même exigence",
    services: [
      {
        ancre: "poubapp",
        titre: "PoubApp",
        sous_titre: "Collecte des ordures ménagères",
        desc: "L'application du Groupe YEGA pour faire enlever vos déchets à domicile, à la demande ou par abonnement.",
      },
      {
        ancre: "livraison",
        titre: "Livraison écologique",
        sous_titre: "En moto électrique",
        desc: "Vos colis et marchandises livrés rapidement en ville, sans bruit et sans émission.",
      },
      {
        ancre: "sous-traitance",
        titre: "Sous-traitance logistique",
        sous_titre: "Pour les entreprises",
        desc: "Votre antenne opérationnelle sur place : commandes, stock, livraisons et reporting.",
      },
    ],
    services_en_savoir_plus: "En savoir plus →",

    poubapp_surtitre: "Service 1 · Application mobile",
    poubapp_titre: "PoubApp, la collecte des déchets là où le camion ne passe pas",
    poubapp_desc:
      "PoubApp est l'application de collecte des ordures ménagères du Groupe YEGA. Vous réservez un passage depuis votre téléphone, un agent équipé vient récupérer vos déchets à domicile en tricycle — même dans les rues étroites — et les dépose uniquement dans des points autorisés.",
    poubapp_etapes_titre: "Comment ça marche",
    poubapp_etapes: [
      {
        titre: "Réservez",
        desc: "Dans l'application ou sur WhatsApp : adresse, formule, créneau. Le prix est annoncé avant confirmation.",
      },
      {
        titre: "On passe chez vous",
        desc: "Un agent équipé et formé vient au créneau prévu, en tricycle adapté aux voies étroites.",
      },
      {
        titre: "Preuve de passage",
        desc: "Vous recevez une confirmation après chaque collecte et pouvez signaler une anomalie.",
      },
      {
        titre: "Payez en Mobile Money",
        desc: "MTN MoMo ou Orange Money, à la collecte ou par abonnement mensuel.",
      },
    ],
    poubapp_formules_titre: "Nos formules",
    poubapp_formules_note:
      "Tarifs promotionnels pendant les deux premiers mois, tarifs normaux à partir du 3e mois. Le prix d'une collecte ponctuelle varie avec le volume et vous est annoncé avant confirmation.",
    poubapp_formules: [
      {
        nom: "Ponctuel",
        prix: "500 FCFA",
        unite: "à partir de, par collecte",
        promo: null,
        detail: "Pour un besoin occasionnel",
        mise_en_avant: false,
      },
      {
        nom: "Basique",
        prix: "5 000 FCFA",
        unite: "par mois",
        promo: "3 500 FCFA les 2 premiers mois",
        detail: "Environ 1 collecte par semaine",
        mise_en_avant: false,
      },
      {
        nom: "Standard",
        prix: "7 000 FCFA",
        unite: "par mois",
        promo: "5 000 FCFA les 2 premiers mois",
        detail: "6 collectes par mois",
        mise_en_avant: true,
      },
      {
        nom: "Premium",
        prix: "10 000 FCFA",
        unite: "par mois",
        promo: null,
        detail: "Environ 2 collectes par semaine",
        mise_en_avant: false,
      },
    ],
    poubapp_populaire: "Le plus choisi",
    poubapp_telecharger_titre: "Téléchargez PoubApp",
    poubapp_telecharger_desc:
      "L'application arrive très bientôt sur Android et iOS. Inscrivez-vous dès maintenant pour être prévenu du lancement — et profitez des tarifs de lancement.",
    poubapp_bientot: "Bientôt disponible",
    poubapp_google_play: "Google Play",
    poubapp_app_store: "App Store",
    poubapp_cta_prevenu: "Être prévenu du lancement",
    poubapp_whatsapp_message:
      "Bonjour YEGA LOGISTICS, je souhaite être prévenu du lancement de PoubApp (collecte des ordures ménagères). Mon quartier : ",

    livraison_surtitre: "Service 2 · Particuliers et commerces",
    livraison_titre: "Livraison écologique en moto électrique",
    livraison_desc:
      "Nos livreurs circulent en moto électrique : la rapidité de la moto en ville, sans bruit, sans fumée et sans carburant. Idéal pour les colis, les courses et les livraisons de commerces de proximité.",
    livraison_points: [
      {
        titre: "Zéro émission",
        desc: "Aucun rejet de fumée ni de CO₂ pendant la livraison, et un trajet silencieux.",
      },
      {
        titre: "Rapide en ville",
        desc: "La moto se faufile dans la circulation et les quartiers difficiles d'accès.",
      },
      {
        titre: "Suivi et preuve de livraison",
        desc: "Vous êtes informé à la prise en charge et à la remise du colis.",
      },
      {
        titre: "Pour tous",
        desc: "Particuliers, boutiques, restaurants, pharmacies, e-commerçants.",
      },
    ],
    livraison_cta: "Demander une livraison",
    livraison_whatsapp_message:
      "Bonjour YEGA LOGISTICS, je souhaite une livraison écologique en moto électrique. Départ : … / Arrivée : … / Type de colis : …",

    soustraitance_surtitre: "Service 3 · Entreprises",
    soustraitance_titre: "Sous-traitance logistique : votre antenne opérationnelle sur place",
    soustraitance_desc:
      "Vous produisez ou distribuez depuis une autre ville ? YEGA LOGISTICS devient votre équipe sur le terrain, comme une filiale locale — sans que vous ayez à porter les locaux ni le personnel. Vous gardez la maîtrise de vos prix, de vos clients et de vos décisions ; nous assurons l'exécution.",
    soustraitance_services: [
      "Dépôt des propositions de commande et collecte des bons de commande",
      "Livraison en supermarchés et points de vente, avec bon de livraison signé",
      "Stock rotatif sur place pour servir rapidement les petites commandes",
      "Réception de vos envois aux agences de transport",
      "Courses, démarches et relances auprès des acheteurs",
      "Rapport écrit chaque semaine et point de suivi",
    ],
    soustraitance_confiance_titre: "Ils nous font confiance",
    soustraitance_rejoindre_titre: "Votre entreprise ici ?",
    soustraitance_rejoindre_desc: "Confiez-nous votre logistique et rejoignez-les.",
    soustraitance_rejoindre_cta: "Faites comme eux →",
    soustraitance_cta: "Discuter de votre besoin",
    soustraitance_whatsapp_message:
      "Bonjour YEGA LOGISTICS, mon entreprise souhaite échanger sur une sous-traitance logistique. Entreprise : … / Ville : … / Besoin : …",

    final_titre: "Un projet logistique ? Parlons-en.",
    final_desc:
      "Ménage, commerce ou entreprise : notre équipe vous répond sur WhatsApp et vous propose une solution adaptée.",
    final_cta: "Contacter YEGA LOGISTICS",
    final_whatsapp_message: "Bonjour YEGA LOGISTICS, je souhaiterais avoir des informations sur vos services.",
  },
  en: {
    meta_titre: "YEGA LOGISTICS — Waste collection, green delivery and logistics outsourcing",
    meta_description:
      "YEGA LOGISTICS, the logistics subsidiary of the YEGA Group: PoubApp (household waste collection), green delivery by electric motorbike and logistics outsourcing in Cameroon.",

    nav_espace_client: "Client area",
    nav_retour_espace: "My account",

    hero_surtitre: "Logistics subsidiary of the YEGA Group",
    hero_titre: "We handle the groundwork. You focus on what matters.",
    hero_desc:
      "Household waste collection, electric-motorbike delivery, outsourced operations: YEGA LOGISTICS brings the same commitment to trust to households, shops and companies.",
    hero_cta_services: "Discover our services",
    hero_cta_contact: "Message us on WhatsApp",

    services_titre: "Three services, one standard",
    services: [
      {
        ancre: "poubapp",
        titre: "PoubApp",
        sous_titre: "Household waste collection",
        desc: "The YEGA Group app to have your waste picked up at home, on demand or by subscription.",
      },
      {
        ancre: "livraison",
        titre: "Green delivery",
        sous_titre: "By electric motorbike",
        desc: "Your parcels and goods delivered quickly across town, silently and with zero emissions.",
      },
      {
        ancre: "sous-traitance",
        titre: "Logistics outsourcing",
        sous_titre: "For companies",
        desc: "Your on-site operations team: orders, stock, deliveries and reporting.",
      },
    ],
    services_en_savoir_plus: "Learn more →",

    poubapp_surtitre: "Service 1 · Mobile app",
    poubapp_titre: "PoubApp: waste collection where trucks can't go",
    poubapp_desc:
      "PoubApp is the YEGA Group's household waste collection app. Book a pickup from your phone; an equipped agent collects your waste at home by tricycle — even in narrow streets — and only drops it at authorised points.",
    poubapp_etapes_titre: "How it works",
    poubapp_etapes: [
      {
        titre: "Book",
        desc: "In the app or on WhatsApp: address, plan, time slot. The price is shown before you confirm.",
      },
      {
        titre: "We come to you",
        desc: "A trained, equipped agent arrives on time, by tricycle suited to narrow streets.",
      },
      {
        titre: "Proof of pickup",
        desc: "You get a confirmation after every pickup and can report any issue.",
      },
      {
        titre: "Pay with Mobile Money",
        desc: "MTN MoMo or Orange Money, per pickup or with a monthly subscription.",
      },
    ],
    poubapp_formules_titre: "Our plans",
    poubapp_formules_note:
      "Promotional prices for the first two months, regular prices from the 3rd month. One-off pickup prices depend on volume and are shown before you confirm.",
    poubapp_formules: [
      {
        nom: "One-off",
        prix: "500 FCFA",
        unite: "from, per pickup",
        promo: null,
        detail: "For occasional needs",
        mise_en_avant: false,
      },
      {
        nom: "Basic",
        prix: "5,000 FCFA",
        unite: "per month",
        promo: "3,500 FCFA for the first 2 months",
        detail: "About 1 pickup a week",
        mise_en_avant: false,
      },
      {
        nom: "Standard",
        prix: "7,000 FCFA",
        unite: "per month",
        promo: "5,000 FCFA for the first 2 months",
        detail: "6 pickups a month",
        mise_en_avant: true,
      },
      {
        nom: "Premium",
        prix: "10,000 FCFA",
        unite: "per month",
        promo: null,
        detail: "About 2 pickups a week",
        mise_en_avant: false,
      },
    ],
    poubapp_populaire: "Most popular",
    poubapp_telecharger_titre: "Download PoubApp",
    poubapp_telecharger_desc:
      "The app is coming soon to Android and iOS. Sign up now to be notified at launch — and get the launch prices.",
    poubapp_bientot: "Coming soon",
    poubapp_google_play: "Google Play",
    poubapp_app_store: "App Store",
    poubapp_cta_prevenu: "Notify me at launch",
    poubapp_whatsapp_message:
      "Hello YEGA LOGISTICS, I'd like to be notified when PoubApp (household waste collection) launches. My neighbourhood: ",

    livraison_surtitre: "Service 2 · Individuals and shops",
    livraison_titre: "Green delivery by electric motorbike",
    livraison_desc:
      "Our riders use electric motorbikes: the speed of a motorbike in town, with no noise, no fumes and no fuel. Ideal for parcels, errands and local shop deliveries.",
    livraison_points: [
      {
        titre: "Zero emissions",
        desc: "No fumes or CO₂ during delivery, and a quiet ride.",
      },
      {
        titre: "Fast in town",
        desc: "Motorbikes weave through traffic and hard-to-reach neighbourhoods.",
      },
      {
        titre: "Tracking and proof of delivery",
        desc: "You're notified at pickup and when the parcel is handed over.",
      },
      {
        titre: "For everyone",
        desc: "Individuals, shops, restaurants, pharmacies, online sellers.",
      },
    ],
    livraison_cta: "Request a delivery",
    livraison_whatsapp_message:
      "Hello YEGA LOGISTICS, I'd like a green delivery by electric motorbike. From: … / To: … / Parcel type: …",

    soustraitance_surtitre: "Service 3 · Companies",
    soustraitance_titre: "Logistics outsourcing: your on-site operations team",
    soustraitance_desc:
      "Producing or distributing from another city? YEGA LOGISTICS becomes your team on the ground, like a local subsidiary — without you carrying premises or staff. You keep control of your prices, customers and decisions; we handle execution.",
    soustraitance_services: [
      "Submitting order proposals and collecting purchase orders",
      "Delivery to supermarkets and outlets, with signed delivery notes",
      "Rotating local stock to serve small orders quickly",
      "Receiving your shipments at transport agencies",
      "Errands, paperwork and follow-ups with buyers",
      "Written report every week and a follow-up call",
    ],
    soustraitance_confiance_titre: "They trust us",
    soustraitance_rejoindre_titre: "Your company here?",
    soustraitance_rejoindre_desc: "Hand us your logistics and join them.",
    soustraitance_rejoindre_cta: "Do as they did →",
    soustraitance_cta: "Discuss your needs",
    soustraitance_whatsapp_message:
      "Hello YEGA LOGISTICS, my company would like to discuss logistics outsourcing. Company: … / City: … / Need: …",

    final_titre: "A logistics project? Let's talk.",
    final_desc:
      "Household, shop or company: our team answers on WhatsApp and offers a solution that fits.",
    final_cta: "Contact YEGA LOGISTICS",
    final_whatsapp_message: "Hello YEGA LOGISTICS, I'd like some information about your services.",
  },
} as const;

export function getLogisticsContent(locale: Locale) {
  return LOGISTICS[locale];
}
