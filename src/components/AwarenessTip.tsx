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

export function AwarenessTip({ role }: { role?: string }) {
  const tips = role === "client" ? [...TIPS_COMMUNS, ...TIPS_CLIENT] : TIPS_COMMUNS;
  // eslint-disable-next-line react-hooks/purity -- Server Component évalué une fois par requête : on veut un tirage différent à chaque navigation, pas de mémoïsation.
  const tip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="mx-auto max-w-6xl px-6 pt-5">
      <div className="flex items-start gap-3 rounded-xl border border-brand-gold/25 bg-white/80 px-4 py-3 text-[13px] leading-relaxed text-brand-green-dark shadow-sm backdrop-blur-sm">
        <span aria-hidden className="mt-0.5 shrink-0 text-brand-gold-dark">
          ✦
        </span>
        <p>{tip}</p>
      </div>
    </div>
  );
}
