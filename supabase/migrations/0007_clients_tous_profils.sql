-- YEGA — ouverture de la plateforme à tous les clients (29/10/2026).
-- YEGA ne s'adresse plus uniquement à la diaspora : résidents camerounais, expatriés
-- installés au Cameroun et clients africains / internationaux sont désormais des cibles
-- à part entière. On enregistre donc le profil du client et sa ville de résidence dès
-- l'inscription (les colonnes telephone et pays existent déjà depuis 0001).

create type client_profile as enum (
  'diaspora',
  'resident',
  'expatrie',
  'international'
);

alter table profiles add column if not exists profil_client client_profile;
alter table profiles add column if not exists ville text;

-- Le trigger d'inscription recopie désormais toutes les informations saisies dans le
-- formulaire /register (transmises par supabase.auth.signUp dans user_metadata). Une
-- valeur de profil inconnue est ignorée plutôt que de bloquer la création du compte.
create or replace function handle_new_user() returns trigger
  language plpgsql security definer set search_path = public as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  profil text := meta ->> 'profil_client';
begin
  insert into public.profiles (id, nom, role, telephone, pays, ville, profil_client)
  values (
    new.id,
    coalesce(nullif(meta ->> 'nom', ''), new.email),
    'client',
    nullif(meta ->> 'telephone', ''),
    nullif(meta ->> 'pays', ''),
    nullif(meta ->> 'ville', ''),
    case
      when profil in ('diaspora', 'resident', 'expatrie', 'international')
        then profil::client_profile
    end
  );
  return new;
end;
$$;
