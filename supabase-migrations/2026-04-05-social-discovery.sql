-- ============================================================
-- Migration: 2026-04-05 · Social Discovery (User Search + Feed)
-- ============================================================
-- Fixes:
--   1) Broken JSONB path operator in "Public profiles are readable" policy
--   2) Enables authenticated user search across public profiles
--   3) Enables friendship-based activity feed access
-- Run in Supabase SQL Editor.
-- ============================================================

-- 1) Drop legacy broken policy (if present) and recreate correctly
drop policy if exists "Public profiles are readable" on public.profiles;

create policy "Public profiles are readable"
  on public.profiles for select
  to authenticated
  using (
    coalesce((settings->'privacy'->>'profileVisibility'), 'public') = 'public'
    or coalesce((settings->'privacy'->>'searchDiscoverability'), 'on') = 'on'
    or auth.uid() = id
  );

-- 2) Allow authenticated users to see each other's minimal profile info by default
--    (only if the profile opted OUT of discoverability do they become invisible)
-- Already covered by the OR clause above. Keep this as the canonical policy.

-- 3) Activities visibility: friends or self
drop policy if exists "Users can read own activities" on public.activities;
drop policy if exists "Friends can read activities" on public.activities;

create policy "Users can read own activities"
  on public.activities for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Friends can read activities"
  on public.activities for select
  to authenticated
  using (
    exists (
      select 1 from public.friendships f
      where f.user_id = auth.uid()
        and f.friend_id = activities.user_id
        and f.status = 'accepted'
    )
  );

-- 4) Friendships policies: view own, insert own outgoing, update/delete own rows
drop policy if exists "Users can view own friendships" on public.friendships;
drop policy if exists "Users can manage own friendships" on public.friendships;
drop policy if exists "Users can accept incoming requests" on public.friendships;

alter table public.friendships enable row level security;

create policy "Users can view own friendships"
  on public.friendships for select
  to authenticated
  using (auth.uid() = user_id or auth.uid() = friend_id);

create policy "Users can create outgoing friendships"
  on public.friendships for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can accept incoming requests"
  on public.friendships for update
  to authenticated
  using (auth.uid() = friend_id or auth.uid() = user_id)
  with check (auth.uid() = friend_id or auth.uid() = user_id);

create policy "Users can delete own friendships"
  on public.friendships for delete
  to authenticated
  using (auth.uid() = user_id or auth.uid() = friend_id);

-- 5) Unique constraint on friendships to allow upsert with onConflict
alter table public.friendships drop constraint if exists friendships_user_friend_unique;
alter table public.friendships add constraint friendships_user_friend_unique unique (user_id, friend_id);

-- 6) Index for feed queries
create index if not exists idx_activities_user_created on public.activities (user_id, created_at desc);
create index if not exists idx_friendships_user_status on public.friendships (user_id, status);
create index if not exists idx_friendships_friend_status on public.friendships (friend_id, status);

-- 7) Index for user search
create index if not exists idx_profiles_display_name_trgm on public.profiles using gin (display_name gin_trgm_ops);
create extension if not exists pg_trgm;
