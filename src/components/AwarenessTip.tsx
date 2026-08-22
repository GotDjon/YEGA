import { getLocale } from "@/lib/i18n";

const TIPS_COMMUNS = {
  fr: [
    "Le saviez-vous ? Chaque mission YEGA est suivie par un chargé de mission dédié, du premier contact jusqu'à la clôture du dossier.",
    "Vos documents sont stockés de façon sécurisée : seuls vous et l'équipe en charge de votre dossier peuvent y accéder.",
    "Immobilier, démarches administratives, organisation d'événements : YEGA centralise le suivi de tous vos projets au Cameroun sur une seule plateforme.",
    "À chaque visite terrain, votre chargé de mission peut joindre des photos avant / pendant / après pour documenter l'avancement de votre projet.",
    "Vous recevez une notification dès qu'un document, un rapport ou un message est ajouté à l'un de vos projets.",
    "La messagerie intégrée à chaque mission vous permet d'échanger directement avec votre chargé de mission, sans jamais quitter la plateforme.",
    "Consultez à tout moment la frise de statut de votre mission pour savoir précisément où en est votre dossier.",
    "Une question fréquente ? Le Centre d'aide y répond peut-être déjà — sinon, votre chargé de mission s'en charge.",
    "Où que vous soyez dans le monde, gardez le contrôle de votre projet au Cameroun, en toute confiance.",
  ],
  en: [
    "Did you know? Every YEGA mission is followed by a dedicated field agent, from the first contact until the file is closed.",
    "Your documents are stored securely: only you and the team in charge of your file can access them.",
    "Real estate, administrative procedures, event planning: YEGA centralizes the tracking of all your projects in Cameroon on a single platform.",
    "At every field visit, your field agent can attach before / during / after photos to document your project's progress.",
    "You get notified as soon as a document, report, or message is added to one of your projects.",
    "The messaging built into each mission lets you talk directly with your field agent, without ever leaving the platform.",
    "Check your mission's status timeline at any time to know exactly where your file stands.",
    "Common question? The Help center may already have the answer — otherwise, your field agent will help.",
    "Wherever you are in the world, keep control of your project in Cameroon, with full confidence.",
  ],
};

const TIPS_CLIENT = {
  fr: [
    "L'Assistant IA YEGA répond à vos questions à partir des données de vos propres projets — essayez-le depuis l'onglet « Assistant IA ».",
    "Vous pouvez déposer un nouveau projet en quelques minutes depuis « Mes projets » → « Déposer un projet ».",
  ],
  en: [
    "The YEGA AI Assistant answers your questions using your own project data — try it from the “AI Assistant” tab.",
    "You can submit a new project in a few minutes from “My projects” → “Submit a project”.",
  ],
};

function hashKey(key: string) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

// `pageKey` doit être unique par page pour garantir un message différent d'une page à l'autre ;
// le tirage aléatoire par-dessus assure une variation supplémentaire à chaque rafraîchissement.
export async function AwarenessTip({ role, pageKey }: { role?: string; pageKey: string }) {
  const locale = await getLocale();
  const tips =
    role === "client"
      ? [...TIPS_COMMUNS[locale], ...TIPS_CLIENT[locale]]
      : TIPS_COMMUNS[locale];
  // eslint-disable-next-line react-hooks/purity -- Server Component évalué une fois par requête : on veut un tirage différent à chaque rendu, pas de mémoïsation.
  const offset = Math.floor(Math.random() * tips.length);
  const tip = tips[(hashKey(pageKey) + offset) % tips.length];

  return (
    <div className="mb-6 flex items-center gap-3.5 rounded-2xl bg-brand-green px-5 py-4 shadow-md sm:px-6">
      <span aria-hidden className="shrink-0 text-xl text-brand-gold-on-dark">
        ✦
      </span>
      <p className="text-[15px] font-semibold leading-snug text-brand-gold-on-dark sm:text-base">
        {tip}
      </p>
    </div>
  );
}
