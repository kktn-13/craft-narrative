-- CraftNarrative MVP Database Schema
-- Run this migration in your Supabase SQL Editor

-- 1. Profiles (extends Supabase Auth)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  role text not null check (role in ('admin', 'buyer', 'creator')),
  company_name text,
  country text,
  preferred_language text default 'en' check (preferred_language in ('en', 'ja')),
  created_at timestamp with time zone default now()
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- 2. Products (multi-language JSONB fields)
create table products (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name jsonb not null,          -- {"en": "Tea Cup", "ja": "湯呑み"}
  description jsonb,
  story_text jsonb,
  process_details jsonb,
  price_wholesale decimal not null,
  price_retail_ref decimal,
  moq integer default 1,
  origin_region jsonb,          -- {"en": "Kyoto", "ja": "京都"}
  is_published boolean default false,
  created_at timestamp with time zone default now()
);

alter table products enable row level security;

create policy "Published products are viewable by everyone"
  on products for select using (is_published = true);

create policy "Admins can manage products"
  on products for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- 3. Media Assets
create table media_assets (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references products(id) on delete cascade not null,
  type text not null check (type in ('video_hero', 'video_process', 'podcast_audio', 'photo_gallery')),
  url text not null,
  thumbnail_url text,
  is_public_asset boolean default true,
  creator_credit_id uuid references profiles(id),
  created_at timestamp with time zone default now()
);

alter table media_assets enable row level security;

create policy "Media assets are viewable by everyone"
  on media_assets for select using (true);

-- 4. Orders
create table orders (
  id uuid default gen_random_uuid() primary key,
  buyer_id uuid references profiles(id) not null,
  items jsonb not null default '[]',
  total_amount decimal not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'shipping', 'delivered')),
  tracking_number text,
  carrier text,
  shipping_address jsonb,
  created_at timestamp with time zone default now()
);

alter table orders enable row level security;

create policy "Buyers can view own orders"
  on orders for select using (auth.uid() = buyer_id);

create policy "Admins can manage all orders"
  on orders for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- 5. QR Scans (analytics)
create table qr_scans (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references products(id) on delete cascade,
  scanned_at timestamp with time zone default now(),
  location_country text
);

alter table qr_scans enable row level security;

create policy "Anyone can insert QR scans"
  on qr_scans for insert with check (true);

create policy "Admins can view QR scans"
  on qr_scans for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Indexes
create index idx_products_slug on products(slug);
create index idx_products_published on products(is_published);
create index idx_media_product on media_assets(product_id);
create index idx_orders_buyer on orders(buyer_id);
create index idx_orders_status on orders(status);
create index idx_qr_scans_product on qr_scans(product_id);
