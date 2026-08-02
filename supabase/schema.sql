create extension if not exists pgcrypto;

create type public.app_role as enum ('master_admin','subscriber','shopper','driver','coach','support');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  role public.app_role not null default 'subscriber',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.private_health_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  encrypted_payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table public.pantry_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  household_id uuid,
  name text not null,
  quantity numeric,
  unit text,
  expires_on date,
  source text,
  created_at timestamptz not null default now()
);

create table public.activity_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  event_type text not null,
  operational_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.private_health_profiles enable row level security;
alter table public.pantry_items enable row level security;
alter table public.activity_events enable row level security;

create policy profiles_self_read on public.profiles for select using (auth.uid() = id);
create policy profiles_self_update on public.profiles for update using (auth.uid() = id);
create policy private_health_owner_only on public.private_health_profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy pantry_owner_only on public.pantry_items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Operational logs intentionally exclude private health, pantry images, meal plans and coaching conversations.
create policy activity_actor_read on public.activity_events for select using (auth.uid() = actor_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name',''),
    coalesce(new.raw_user_meta_data->>'last_name',''),
    coalesce((new.raw_user_meta_data->>'role')::public.app_role,'subscriber')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
