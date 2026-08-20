-- YEGA — phase 4 : messagerie, agenda des visites, notifications.
-- Voir docs/YEGA_Cahier_des_Charges_v2.docx, section 11 (phasage) : modules 10, 11, 16.
--
-- La table "messages" et ses policies existent déjà depuis la phase 1 (section 6 du cahier
-- des charges) — rien à faire côté messagerie, seule l'interface manquait.

create table visits (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions (id) on delete cascade,
  agent_id uuid not null references profiles (id) on delete cascade,
  planifie_le timestamptz not null,
  notes text,
  statut text not null default 'planifiee' check (statut in ('planifiee', 'terminee', 'annulee')),
  created_by uuid not null references profiles (id) on delete set null,
  date_creation timestamptz not null default now()
);

create index visits_mission_id_idx on visits (mission_id);
create index visits_agent_id_idx on visits (agent_id);

alter table visits enable row level security;

create policy "visits_select" on visits for select
  using (
    is_staff()
    or agent_id = auth.uid()
    or exists (select 1 from missions m where m.id = visits.mission_id and m.client_id = auth.uid())
  );

create policy "visits_write_staff" on visits for insert with check (is_staff());
create policy "visits_update" on visits for update
  using (is_staff() or agent_id = auth.uid());

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  contenu text not null,
  lien text,
  lu boolean not null default false,
  date_creation timestamptz not null default now()
);

create index notifications_user_id_idx on notifications (user_id);

alter table notifications enable row level security;

create policy "notifications_select_own" on notifications for select
  using (user_id = auth.uid());
create policy "notifications_update_own" on notifications for update
  using (user_id = auth.uid());
-- Une notification est créée par l'action d'un AUTRE utilisateur (ex. un agent envoie un
-- message, une notification doit apparaître chez le client) : on ne peut donc pas exiger
-- user_id = auth.uid() à l'insertion. Contrepartie acceptée pour ce stade du projet : un
-- utilisateur authentifié pourrait, en théorie, créer une notification factice pour un autre
-- (nuisance, pas de fuite ni de corruption de données réelles).
create policy "notifications_insert_authenticated" on notifications for insert
  with check (auth.uid() is not null);
