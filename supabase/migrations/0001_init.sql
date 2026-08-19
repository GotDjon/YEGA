-- YEGA — schéma de base (phases 1 à 4)
-- Voir docs/YEGA_Cahier_des_Charges_v2.docx, section 6 (modèle de données) et section 8 (sécurité).

create type user_role as enum (
  'client',
  'agent',
  'responsable_technique',
  'direction',
  'admin'
);

create type mission_type as enum ('home', 'project', 'moments');

create type mission_status as enum (
  'recue',
  'analysee',
  'proposee',
  'validee',
  'en_execution',
  'controlee',
  'cloturee'
);

-- Profil applicatif lié à auth.users (Supabase Auth gère déjà l'e-mail et le mot de passe hashé).
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role user_role not null default 'client',
  nom text not null,
  telephone text,
  pays text,
  date_creation timestamptz not null default now()
);

create table missions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles (id) on delete restrict,
  agent_id uuid references profiles (id) on delete set null,
  type mission_type not null,
  statut mission_status not null default 'recue',
  ville text,
  description text,
  date_creation timestamptz not null default now()
);

create table reports (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions (id) on delete cascade,
  type text not null check (type in ('photo', 'video', 'pdf', 'checklist')),
  url text not null,
  gps_lat double precision,
  gps_lng double precision,
  date_upload timestamptz not null default now(),
  valide_par uuid references profiles (id) on delete set null
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions (id) on delete cascade,
  type text not null check (
    type in ('devis', 'facture', 'contrat', 'piece_identite', 'titre_foncier')
  ),
  url text not null,
  date timestamptz not null default now()
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions (id) on delete cascade,
  montant numeric(12, 2) not null,
  methode text not null check (
    methode in ('momo', 'orange', 'carte', 'paypal', 'virement')
  ),
  statut text not null default 'en_attente',
  date timestamptz not null default now(),
  reference_transaction text
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions (id) on delete cascade,
  sender_id uuid not null references profiles (id) on delete cascade,
  contenu text not null,
  piece_jointe_url text,
  date timestamptz not null default now(),
  lu boolean not null default false
);

create table partners (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  type text not null check (
    type in ('architecte', 'notaire', 'banque', 'artisan', 'entreprise')
  ),
  contact text,
  note_moyenne numeric(2, 1)
);

create index missions_client_id_idx on missions (client_id);
create index missions_agent_id_idx on missions (agent_id);
create index reports_mission_id_idx on reports (mission_id);
create index documents_mission_id_idx on documents (mission_id);
create index payments_mission_id_idx on payments (mission_id);
create index messages_mission_id_idx on messages (mission_id);

-- Row Level Security — règle non négociable (section 2) : un client ne voit que ses
-- propres données ; un agent ne voit que ses missions assignées ; le contrôle est
-- appliqué côté base de données, jamais seulement côté interface.

create function current_user_role() returns user_role
  language sql stable security definer set search_path = public as $$
  select role from profiles where id = auth.uid();
$$;

create function is_staff() returns boolean
  language sql stable security definer set search_path = public as $$
  select current_user_role() in ('responsable_technique', 'direction', 'admin');
$$;

alter table profiles enable row level security;
alter table missions enable row level security;
alter table reports enable row level security;
alter table documents enable row level security;
alter table payments enable row level security;
alter table messages enable row level security;
alter table partners enable row level security;

-- profiles : chacun voit son propre profil ; le staff voit tout le monde.
create policy "profiles_select_own_or_staff" on profiles for select
  using (id = auth.uid() or is_staff());
create policy "profiles_update_own" on profiles for update
  using (id = auth.uid());
create policy "profiles_insert_own" on profiles for insert
  with check (id = auth.uid());

-- missions : client propriétaire, agent assigné, ou staff (responsable technique / direction / admin).
create policy "missions_select" on missions for select
  using (
    client_id = auth.uid()
    or agent_id = auth.uid()
    or is_staff()
  );
create policy "missions_insert_staff" on missions for insert
  with check (is_staff());
create policy "missions_update_staff" on missions for update
  using (is_staff());

-- reports, documents, payments, messages : accès si on peut voir la mission parente.
create policy "reports_select" on reports for select
  using (exists (
    select 1 from missions m
    where m.id = reports.mission_id
      and (m.client_id = auth.uid() or m.agent_id = auth.uid() or is_staff())
  ));
create policy "reports_write_staff_or_agent" on reports for insert
  with check (exists (
    select 1 from missions m
    where m.id = reports.mission_id
      and (m.agent_id = auth.uid() or is_staff())
  ));

create policy "documents_select" on documents for select
  using (exists (
    select 1 from missions m
    where m.id = documents.mission_id
      and (m.client_id = auth.uid() or m.agent_id = auth.uid() or is_staff())
  ));
create policy "documents_write_staff" on documents for insert
  with check (is_staff());

create policy "payments_select" on payments for select
  using (exists (
    select 1 from missions m
    where m.id = payments.mission_id
      and (m.client_id = auth.uid() or is_staff())
  ));

create policy "messages_select" on messages for select
  using (exists (
    select 1 from missions m
    where m.id = messages.mission_id
      and (m.client_id = auth.uid() or m.agent_id = auth.uid() or is_staff())
  ));
create policy "messages_insert" on messages for insert
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from missions m
      where m.id = messages.mission_id
        and (m.client_id = auth.uid() or m.agent_id = auth.uid() or is_staff())
    )
  );

-- partners : lecture réservée au staff (module back-office, phase 5).
create policy "partners_select_staff" on partners for select using (is_staff());
create policy "partners_write_staff" on partners for all using (is_staff()) with check (is_staff());

-- Crée automatiquement un profil "client" à l'inscription (voir app/(auth)/register).
create function handle_new_user() returns trigger
  language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, nom, role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'nom', new.email), 'client');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
