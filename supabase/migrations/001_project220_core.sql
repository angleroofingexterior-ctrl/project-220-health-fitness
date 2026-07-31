-- Project 220 Phase 1 production foundation
-- PostgreSQL / Supabase-compatible schema

create extension if not exists pgcrypto;

create type public.app_role as enum ('customer','driver','support','admin');
create type public.order_status as enum ('draft','quoted','awaiting_payment','paid','offered','accepted','shopping','awaiting_substitution','checked_out','out_for_delivery','delivered','cancelled','refunded');
create type public.inventory_location as enum ('pantry','cupboard','fridge','freezer','other');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'customer',
  display_name text,
  locale text not null default 'en-CA',
  country_code text not null default 'CA',
  region_code text default 'MB',
  city text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.nutrition_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  calorie_target integer check (calorie_target is null or calorie_target > 0),
  protein_g numeric check (protein_g is null or protein_g >= 0),
  carbohydrate_g numeric check (carbohydrate_g is null or carbohydrate_g >= 0),
  fat_g numeric check (fat_g is null or fat_g >= 0),
  allergies text[] not null default '{}',
  dietary_preferences text[] not null default '{}',
  excluded_foods text[] not null default '{}',
  grocery_budget_cents integer check (grocery_budget_cents is null or grocery_budget_cents >= 0),
  updated_at timestamptz not null default now()
);

create table public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  normalized_name text not null,
  brand text,
  quantity numeric not null default 0 check (quantity >= 0),
  unit text not null default 'item',
  location public.inventory_location not null default 'pantry',
  expires_on date,
  confidence numeric check (confidence is null or confidence between 0 and 1),
  confirmed_by_user boolean not null default false,
  source_image_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.private_uploads (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  storage_path text not null unique,
  purpose text not null check (purpose in ('pantry_scan','receipt','substitution','proof_of_delivery','profile_document')),
  mime_type text,
  delete_after_processing boolean not null default true,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

alter table public.inventory_items
  add constraint inventory_source_image_fk foreign key (source_image_id) references public.private_uploads(id) on delete set null;

create table public.recipes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  servings numeric not null default 1 check (servings > 0),
  instructions jsonb not null default '[]'::jsonb,
  nutrition jsonb not null default '{}'::jsonb,
  ingredients jsonb not null default '[]'::jsonb,
  generated_from_inventory boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.meal_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  starts_on date not null,
  ends_on date not null,
  plan jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  check (ends_on >= starts_on)
);

create table public.driver_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','approved','suspended','inactive')),
  service_regions text[] not null default array['Winnipeg, MB'],
  vehicle_type text,
  can_accept_orders boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles(id),
  driver_id uuid references public.profiles(id),
  status public.order_status not null default 'draft',
  service_region text not null default 'Winnipeg, MB',
  delivery_address jsonb,
  grocery_subtotal_cents integer not null default 0 check (grocery_subtotal_cents >= 0),
  delivery_fee_cents integer not null default 0 check (delivery_fee_cents >= 0),
  service_fee_cents integer not null default 0 check (service_fee_cents >= 0),
  tax_cents integer not null default 0 check (tax_cents >= 0),
  tip_cents integer not null default 0 check (tip_cents >= 0),
  total_cents integer not null default 0 check (total_cents >= 0),
  scheduled_for timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  name text not null,
  requested_quantity numeric not null check (requested_quantity > 0),
  unit text not null,
  max_price_cents integer check (max_price_cents is null or max_price_cents >= 0),
  dietary_constraints text[] not null default '{}',
  status text not null default 'pending' check (status in ('pending','found','substitution_requested','approved_substitution','unavailable')),
  selected_product jsonb,
  checked_at timestamptz
);

create table public.order_messages (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  body text,
  attachment_id uuid references public.private_uploads(id) on delete set null,
  created_at timestamptz not null default now(),
  check (body is not null or attachment_id is not null)
);

create table public.audit_events (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  event_type text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.nutrition_profiles enable row level security;
alter table public.inventory_items enable row level security;
alter table public.private_uploads enable row level security;
alter table public.recipes enable row level security;
alter table public.meal_plans enable row level security;
alter table public.driver_profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.order_messages enable row level security;
alter table public.audit_events enable row level security;

create policy "profiles own read" on public.profiles for select using (auth.uid() = id);
create policy "profiles own update" on public.profiles for update using (auth.uid() = id);
create policy "nutrition own all" on public.nutrition_profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "inventory own all" on public.inventory_items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "uploads owner only" on public.private_uploads for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "recipes owner only" on public.recipes for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "meal plans owner only" on public.meal_plans for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "driver own profile" on public.driver_profiles for select using (auth.uid() = user_id);
create policy "customers and assigned drivers read orders" on public.orders for select using (auth.uid() = customer_id or auth.uid() = driver_id);
create policy "customers create orders" on public.orders for insert with check (auth.uid() = customer_id);
create policy "customers update draft orders" on public.orders for update using (auth.uid() = customer_id and status in ('draft','quoted','awaiting_payment'));
create policy "order parties read items" on public.order_items for select using (exists (select 1 from public.orders o where o.id = order_id and auth.uid() in (o.customer_id,o.driver_id)));
create policy "order parties read messages" on public.order_messages for select using (exists (select 1 from public.orders o where o.id = order_id and auth.uid() in (o.customer_id,o.driver_id)));
create policy "order parties send messages" on public.order_messages for insert with check (auth.uid() = sender_id and exists (select 1 from public.orders o where o.id = order_id and auth.uid() in (o.customer_id,o.driver_id)));

-- Audit records intentionally have no direct client policy. Write them through trusted server functions only.
