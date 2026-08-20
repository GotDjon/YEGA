-- YEGA — phase 5 (partie web) : signature électronique, partenaires, centre d'aide.
-- Voir docs/YEGA_Cahier_des_Charges_v2.docx, section 11 (phasage) : modules 17, 18, 20.
-- L'application mobile « YEGA Mission » (module 5) est traitée séparément, hors de ce dépôt.

-- Module 17 — signature électronique des contrats/devis/procès-verbaux (documents).
alter table documents add column if not exists signature_url text;
alter table documents add column if not exists signe_par uuid references profiles (id);
alter table documents add column if not exists signe_le timestamptz;

create policy "documents_update_signature" on documents for update
  using (exists (
    select 1 from missions m
    where m.id = documents.mission_id
      and (m.client_id = auth.uid() or is_staff())
  ));

-- Module 20 — centre d'aide (FAQ). Lecture pour tout utilisateur connecté, écriture réservée
-- au staff.
create table faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  reponse text not null,
  ordre integer not null default 0,
  date_creation timestamptz not null default now()
);

alter table faqs enable row level security;

create policy "faqs_select_authenticated" on faqs for select
  using (auth.uid() is not null);
create policy "faqs_write_staff" on faqs for all
  using (is_staff()) with check (is_staff());

-- Module 18 — gestion des partenaires : la table "partners" et ses policies existent déjà
-- depuis la phase 1, seule l'interface manquait.
