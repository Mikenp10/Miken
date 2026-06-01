-- MLPVisuals production schema for Supabase PostgreSQL.
create extension if not exists "uuid-ossp";

create type public.user_role as enum ('admin', 'client');
create type public.booking_status as enum ('pending', 'approved', 'declined', 'rescheduled', 'completed');
create type public.payment_status as enum ('unpaid', 'deposit_paid', 'paid', 'refunded');
create type public.media_type as enum ('photo', 'video');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role public.user_role not null default 'client',
  phone text,
  created_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text,
  base_price integer not null default 0,
  deposit_amount integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.bookings (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references public.profiles(id) on delete set null,
  service_slug text not null,
  package_name text not null,
  date date not null,
  time text not null,
  contact_name text not null,
  contact_email text not null,
  notes text,
  status public.booking_status not null default 'pending',
  payment_status public.payment_status not null default 'unpaid',
  deposit_amount integer not null default 0,
  total_amount integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid references public.bookings(id) on delete cascade,
  client_id uuid references public.profiles(id) on delete set null,
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  amount integer not null,
  currency text not null default 'usd',
  status text not null,
  receipt_url text,
  created_at timestamptz not null default now()
);

create table public.galleries (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  client_id uuid references public.profiles(id) on delete cascade,
  cover_image_url text,
  is_published boolean not null default false,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.gallery_assets (
  id uuid primary key default uuid_generate_v4(),
  gallery_id uuid not null references public.galleries(id) on delete cascade,
  storage_path text not null,
  public_url text not null,
  media_type public.media_type not null default 'photo',
  is_approved boolean not null default false,
  downloads_count integer not null default 0,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table public.gallery_favorites (
  id uuid primary key default uuid_generate_v4(),
  gallery_id uuid not null references public.galleries(id) on delete cascade,
  asset_id uuid not null references public.gallery_assets(id) on delete cascade,
  client_id uuid not null references public.profiles(id) on delete cascade,
  selected_for_edit boolean not null default false,
  created_at timestamptz not null default now(),
  unique(asset_id, client_id)
);

create table public.download_events (
  id uuid primary key default uuid_generate_v4(),
  asset_id uuid not null references public.gallery_assets(id) on delete cascade,
  client_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create or replace function public.increment_asset_download(asset_uuid uuid)
returns void language plpgsql security definer as $$
begin
  update public.gallery_assets set downloads_count = downloads_count + 1 where id = asset_uuid;
  insert into public.download_events(asset_id, client_id) values (asset_uuid, auth.uid());
end;
$$;

alter table public.profiles enable row level security;
alter table public.bookings enable row level security;
alter table public.payments enable row level security;
alter table public.galleries enable row level security;
alter table public.gallery_assets enable row level security;
alter table public.gallery_favorites enable row level security;
alter table public.download_events enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create policy "profiles_self_or_admin" on public.profiles for all using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());
create policy "bookings_client_or_admin" on public.bookings for all using (client_id = auth.uid() or public.is_admin()) with check (client_id = auth.uid() or public.is_admin() or client_id is null);
create policy "payments_client_or_admin" on public.payments for select using (client_id = auth.uid() or public.is_admin());
create policy "galleries_client_or_admin" on public.galleries for all using (client_id = auth.uid() or public.is_admin()) with check (client_id = auth.uid() or public.is_admin());
create policy "assets_gallery_client_or_admin" on public.gallery_assets for select using (public.is_admin() or exists(select 1 from public.galleries g where g.id = gallery_id and g.client_id = auth.uid() and g.is_published));
create policy "favorites_client_or_admin" on public.gallery_favorites for all using (client_id = auth.uid() or public.is_admin()) with check (client_id = auth.uid() or public.is_admin());
create policy "downloads_client_or_admin" on public.download_events for select using (client_id = auth.uid() or public.is_admin());
