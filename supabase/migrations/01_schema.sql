-- =======================================================
-- DIALOGUE BOX: SUPABASE SCHEMA & ROW-LEVEL SECURITY
-- =======================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (Characters/Actors)
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  avatar_url text,
  bio text,
  genres text[] not null default '{}',
  is_published boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Audio Clips Table
create table if not exists public.audio_clips (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  audio_url text not null,
  transcript text,
  genre text not null default 'comedy',
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for ordering clips per profile
create index if not exists idx_audio_clips_profile_sort 
  on public.audio_clips(profile_id, sort_order asc);

-- 3. Favorites Table
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  clip_id uuid references public.audio_clips(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, profile_id, clip_id)
);

-- 4. User Roles Table (Admin Access)
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'user')) default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, role)
);

-- Helper function to check if current user is admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- =======================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =======================================================

alter table public.profiles enable row level security;
alter table public.audio_clips enable row level security;
alter table public.favorites enable row level security;
alter table public.user_roles enable row level security;

-- PROFILES POLICIES
-- Anyone can view published profiles
create policy "Public can view published profiles"
  on public.profiles for select
  using (is_published = true or public.is_admin());

-- Only admins can insert, update, or delete profiles
create policy "Admins can insert profiles"
  on public.profiles for insert
  with check (public.is_admin());

create policy "Admins can update profiles"
  on public.profiles for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete profiles"
  on public.profiles for delete
  using (public.is_admin());

-- AUDIO CLIPS POLICIES
-- Anyone can view published audio clips
create policy "Public can view published audio clips"
  on public.audio_clips for select
  using (is_published = true or public.is_admin());

-- Only admins can insert, update, or delete clips
create policy "Admins can insert audio clips"
  on public.audio_clips for insert
  with check (public.is_admin());

create policy "Admins can update audio clips"
  on public.audio_clips for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete audio clips"
  on public.audio_clips for delete
  using (public.is_admin());

-- FAVORITES POLICIES
-- Users can view and manage their own favorites
create policy "Users can view their own favorites"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "Users can insert their own favorites"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own favorites"
  on public.favorites for delete
  using (auth.uid() = user_id);

-- USER ROLES POLICIES
-- Users can read their own role
create policy "Users can read their own role"
  on public.user_roles for select
  using (auth.uid() = user_id or public.is_admin());

-- =======================================================
-- STORAGE BUCKETS (Run in SQL Editor or Storage settings)
-- =======================================================

-- Storage bucket setup statements (Supabase storage schema)
insert into storage.buckets (id, name, public)
values ('audio-files', 'audio-files', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Storage RLS: Public read, Admin write
create policy "Public can view audio files"
  on storage.objects for select
  using (bucket_id in ('audio-files', 'avatars'));

create policy "Admins can upload files"
  on storage.objects for insert
  with check (bucket_id in ('audio-files', 'avatars') and public.is_admin());

create policy "Admins can update files"
  on storage.objects for update
  using (bucket_id in ('audio-files', 'avatars') and public.is_admin());

create policy "Admins can delete files"
  on storage.objects for delete
  using (bucket_id in ('audio-files', 'avatars') and public.is_admin());
