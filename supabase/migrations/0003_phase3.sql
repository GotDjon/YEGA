-- YEGA — phase 3 : paiements (agrégateur CinetPay), CRM de base, tableau de bord Direction.
-- Voir docs/YEGA_Cahier_des_Charges_v2.docx, section 11 (phasage) : modules 9, 13, 14, 19.

-- La méthode exacte (momo / orange / carte) n'est connue qu'après confirmation par l'agrégateur ;
-- le paiement est d'abord créé en attente, méthode inconnue.
alter table payments alter column methode drop not null;
alter table payments drop constraint payments_methode_check;
alter table payments add constraint payments_methode_check
  check (methode is null or methode in ('momo', 'orange', 'carte', 'paypal', 'virement'));

-- Le client peut initier un paiement pour sa propre mission (module 9). La mise à jour du statut,
-- elle, se fait uniquement via le webhook CinetPay côté serveur (clé service_role, hors RLS).
create policy "payments_insert_client" on payments for insert
  with check (exists (
    select 1 from missions m
    where m.id = payments.mission_id and m.client_id = auth.uid()
  ));
