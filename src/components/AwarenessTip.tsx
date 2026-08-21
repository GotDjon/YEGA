const TIPS_COMMUNS = [
  "Le saviez-vous ? Chaque mission YEGA est suivie par un chargé de mission dédié, du premier contact jusqu'à la clôture du dossier.",
  "Vos documents sont stockés de façon sécurisée : seuls vous et l'équipe en charge de votre dossier peuvent y accéder.",
  "Immobilier, démarches administratives, organisation d'événements : YEGA centralise le suivi de tous vos projets au Cameroun sur une seule plateforme.",
  "À chaque visite terrain, votre chargé de mission peut joindre des photos avant / pendant / après pour documenter l'avancement de votre projet.",
  "Vous recevez une notification dès qu'un document, un rapport ou un message est ajouté à l'un de vos projets.",
  "La messagerie intégrée à chaque mission vous permet d'échanger directement avec votre chargé de mission, sans jamais quitter la plateforme.",
  "Consultez à tout moment la frise de statut de votre mission pour savoir précisément où en est votre dossier.",
  "Une question fréquente ? Le Centre d'aide y répond peut-être déjà — sinon, votre chargé de mission s'en charge.",
  "Où que vous soyez dans le monde, gardez le contrôle de votre projet au Cameroun, en toute confiance.",
];

const TIPS_CLIENT = [
  "L'Assistant IA YEGA répond à vos questions à partir des données de vos propres projets — essayez-le depuis l'onglet « Assistant IA ».",
  "Vous pouvez déposer un nouveau projet en quelques minutes depuis « Mes projets » → « Déposer un projet ».",
];

function hashKey(key: string) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

// `pageKey` doit être unique par page pour garantir un message différent d'une page à l'autre ;
// le tirage aléatoire par-dessus assure une variation supplémentaire à chaque rafraîchissement.
export function AwarenessTip({ role, pageKey }: { role?: string; pageKey: string }) {
  const tips = role === "client" ? [...TIPS_COMMUNS, ...TIPS_CLIENT] : TIPS_COMMUNS;
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
