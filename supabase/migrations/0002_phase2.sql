-- YEGA — phase 2 : dépôt de projet en autonomie, documents, rapports, galerie
-- Voir docs/YEGA_Cahier_des_Charges_v2.docx, section 11 (phasage) : modules 3, 4, 7, 8.

alter table missions add column if not exists budget_estime numeric(12, 2);
alter table reports add column if not exists etape text check (etape in ('avant', 'pendant', 'apres'));
alter table reports add column if not exists observations text;

-- Module 3 — le client peut désormais créer sa propre mission (dépôt de projet en autonomie),
-- en plus de la création par le responsable technique (déjà en place depuis la phase 1).
create policy "missions_insert_client" on missions for insert
  with check (client_id = auth.uid());

-- Module 4 — le client peut téléverser ses propres documents (pièce d'identité, etc.),
-- en plus du staff (devis, facture, contrat...).
drop policy "documents_write_staff" on documents;
create policy "documents_insert" on documents for insert
  with check (exists (
    select 1 from missions m
    where m.id = documents.mission_id
      and (m.client_id = auth.uid() or is_staff())
  ));

-- Module 7 — un rapport n'est visible du client qu'une fois validé par le responsable technique
-- (valide_par renseigné). L'agent assigné et le staff voient tout, validé ou non.
drop policy "reports_select" on reports;
create policy "reports_select" on reports for select
  using (
    is_staff()
    or exists (
      select 1 from missions m where m.id = reports.mission_id and m.agent_id = auth.uid()
    )
    or (
      valide_par is not null
      and exists (
        select 1 from missions m where m.id = reports.mission_id and m.client_id = auth.uid()
      )
    )
  );

create policy "reports_update_staff" on reports for update using (is_staff());

-- Fonction réutilisée par les policies de stockage : un utilisateur peut accéder aux
-- fichiers d'une mission dans les mêmes conditions qu'aux lignes de cette mission.
create function can_access_mission(p_mission_id uuid) returns boolean
  language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from missions m
    where m.id = p_mission_id
      and (m.client_id = auth.uid() or m.agent_id = auth.uid() or is_staff())
  );
$$;

insert into storage.buckets (id, name, public)
values ('documents', 'documents', false), ('reports', 'reports', false)
on conflict (id) do nothing;

-- Chemin de fichier attendu : {mission_id}/{nom_fichier} — le premier segment sert de clé d'accès.
create policy "documents_bucket_select" on storage.objects for select
  using (bucket_id = 'documents' and can_access_mission(((storage.foldername(name))[1])::uuid));
create policy "documents_bucket_insert" on storage.objects for insert
  with check (bucket_id = 'documents' and can_access_mission(((storage.foldername(name))[1])::uuid));

create policy "reports_bucket_select" on storage.objects for select
  using (bucket_id = 'reports' and can_access_mission(((storage.foldername(name))[1])::uuid));
create policy "reports_bucket_insert" on storage.objects for insert
  with check (
    bucket_id = 'reports'
    and exists (
      select 1 from missions m
      where m.id = ((storage.foldername(name))[1])::uuid
        and (m.agent_id = auth.uid() or is_staff())
    )
  );
