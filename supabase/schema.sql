-- Emerald Beauty: initial Supabase/PostgreSQL schema
-- Apply this in the Supabase SQL editor after creating a project.
create extension if not exists pgcrypto;

create type public.order_status as enum ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');

create table public.products (
  id bigint primary key,
  name text not null,
  brand text not null,
  description text not null default '',
  category text not null,
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'USD' check (currency = 'USD'),
  image_url text,
  inventory_count integer not null default 0 check (inventory_count >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text,
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  status public.order_status not null default 'pending',
  currency text not null default 'USD' check (currency = 'USD'),
  subtotal_cents integer not null default 0 check (subtotal_cents >= 0),
  shipping_cents integer not null default 0 check (shipping_cents >= 0),
  total_cents integer not null default 0 check (total_cents >= 0),
  shipping_address jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id bigint references public.products(id) on delete set null,
  product_name text not null,
  unit_price_cents integer not null check (unit_price_cents >= 0),
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Public visitors can read active product listings only.
create policy "Public can read active products" on public.products
  for select using (active = true);

-- Customers can read and update only their own profile (never their role).
create policy "Read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Update own profile" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "Read own orders" on public.orders
  for select using (auth.uid() = user_id);
create policy "Read own order items" on public.order_items
  for select using (
    exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
  );

-- Do not grant clients direct insert/update access to orders or inventory.
-- Create orders from a verified Stripe webhook using a server-side service role,
-- and validate administrator authorization in every admin API route.
