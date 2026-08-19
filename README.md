# YEGA

Plateforme numérique YEGA — espace client, back-office et mission terrain pour la diaspora camerounaise.

YEGA PROJECT accompagne la diaspora camerounaise dans la réalisation de ses projets au Cameroun (immobilier, démarches administratives, événements — familles Home / Project / Moments). Le site vitrine ([yega-cm.netlify.app](https://yega-cm.netlify.app)) existe déjà ; ce dépôt porte la phase 2 : une plateforme applicative complète (comptes utilisateurs, base de données, stockage documentaire, paiements).

## Documentation

Le cahier des charges fonctionnel complet (contexte, rôles utilisateurs, 20 modules fonctionnels, modèle de données, paiements, sécurité, architecture technique et phasage) se trouve dans [`docs/YEGA_Cahier_des_Charges_v2.docx`](docs/YEGA_Cahier_des_Charges_v2.docx).

## Statut — Phase 1

Scaffold Next.js + Supabase couvrant le périmètre de la phase 1 (section 11 du cahier des charges) :

- **Module 2 — Authentification** : inscription et connexion par e-mail/mot de passe (Supabase Auth). L'authentification à deux facteurs par WhatsApp n'est pas encore câblée : elle nécessite un compte fournisseur (Twilio ou WhatsApp Business Cloud API) à souscrire avant intégration.
- **Module 5/6 — Tableau de bord client** : `/dashboard` liste les missions du client connecté avec la chronologie en 7 étapes (Reçue → … → Clôturée).
- **Module 12 — Gestion des missions (back-office)** : `/back-office/missions` liste les missions (toutes pour le responsable technique/direction/admin, assignées uniquement pour un agent) ; création et affectation d'une mission par le responsable technique.
- Contrôle d'accès appliqué **côté base de données** via Row Level Security Postgres (jamais seulement côté interface), conformément à la règle non négociable de la section 2.

## Pile technique

- Next.js 16 (App Router, TypeScript, Tailwind CSS) — le fichier `AGENTS.md` généré par `create-next-app` documente les changements de convention (ex. `middleware.ts` → `proxy.ts`) à relire avant toute modification.
- Supabase (PostgreSQL + Auth + stockage) — schéma et policies RLS dans [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql).

## Démarrer en local

1. Créer un projet sur [supabase.com](https://supabase.com), puis exécuter `supabase/migrations/0001_init.sql` dans l'éditeur SQL du projet (ou via `supabase db push` si vous utilisez la CLI Supabase).
2. Copier `.env.local.example` vers `.env.local` et renseigner `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API).
3. `npm install`
4. `npm run dev`

Un compte créé via `/register` obtient automatiquement le rôle `client`. Les rôles `agent`, `responsable_technique`, `direction` et `admin` se créent en modifiant la colonne `role` de la table `profiles` depuis le tableau de bord Supabase (aucune interface d'administration des rôles n'existe encore — hors périmètre phase 1).

## Prochaines étapes (phase 2, section 11)

Dépôt de projet en autonomie par le client, gestion documentaire, rapports d'inspection, galerie avant/pendant/après.
