-- YEGA — phase 7 : gouvernance et confiance, suite à la contre-expertise produit du 21/08/2026.
-- Objectif : faire passer la plateforme du statut de simple suivi à celui de véritable
-- système de contrôle (journal d'audit, alertes à sévérité, registre d'anomalies,
-- historique du budget).

-- Journal d'audit : trace les décisions/actions clés. Écriture ouverte à tout utilisateur
-- authentifié pour sa propre action (les Server Actions l'appellent avec l'utilisateur
-- courant), mais jamais modifiable ensuite ; lecture réservée au staff.
create table audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles (id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  details text,
  date_creation timestamptz not null default now()
);

create index audit_log_entity_idx on audit_log (entity_type, entity_id);

alter table audit_log enable row level security;

create policy "audit_log_select_staff" on audit_log for select using (is_staff());
create policy "audit_log_insert_self" on audit_log for insert
  with check (actor_id = auth.uid());

-- Alertes à sévérité : étend les notifications existantes (module 16) avec un niveau, pour
-- que le client distingue en un coup d'œil ce qui est critique de ce qui est informatif.
create type notification_severite as enum ('critique', 'attention', 'action', 'info');

alter table notifications
  add column if not exists severite notification_severite not null default 'info';

-- Registre des anomalies constatées sur le terrain (distinct des rapports d'inspection :
-- une anomalie a un cycle de vie propre — ouverte → en correction → à vérifier → résolue).
create table anomalies (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions (id) on delete cascade,
  titre text not null,
  description text,
  gravite text not null default 'moyenne' check (gravite in ('faible', 'moyenne', 'elevee')),
  statut text not null default 'ouverte'
    check (statut in ('ouverte', 'en_correction', 'a_verifier', 'resolue')),
  signale_par uuid references profiles (id) on delete set null,
  date_creation timestamptz not null default now(),
  date_resolution timestamptz
);

create index anomalies_mission_id_idx on anomalies (mission_id);

alter table anomalies enable row level security;

create policy "anomalies_select" on anomalies for select
  using (exists (
    select 1 from missions m
    where m.id = anomalies.mission_id
      and (m.client_id = auth.uid() or m.agent_id = auth.uid() or is_staff())
  ));
create policy "anomalies_insert_agent_or_staff" on anomalies for insert
  with check (exists (
    select 1 from missions m
    where m.id = anomalies.mission_id
      and (m.agent_id = auth.uid() or is_staff())
  ));
create policy "anomalies_update_agent_or_staff" on anomalies for update
  using (exists (
    select 1 from missions m
    where m.id = anomalies.mission_id
      and (m.agent_id = auth.uid() or is_staff())
  ));

-- Historique du budget : chaque révision (positive ou négative) est tracée avec son motif,
-- pour que le client voie l'écart entre budget initial et budget actuel plutôt qu'un simple
-- chiffre final.
create table budget_revisions (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions (id) on delete cascade,
  montant_delta numeric(12, 2) not null,
  motif text,
  created_by uuid references profiles (id) on delete set null,
  date_creation timestamptz not null default now()
);

create index budget_revisions_mission_id_idx on budget_revisions (mission_id);

alter table budget_revisions enable row level security;

create policy "budget_revisions_select" on budget_revisions for select
  using (exists (
    select 1 from missions m
    where m.id = budget_revisions.mission_id
      and (m.client_id = auth.uid() or is_staff())
  ));
create policy "budget_revisions_insert_staff" on budget_revisions for insert
  with check (is_staff());
