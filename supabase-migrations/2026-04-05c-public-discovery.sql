-- ============================================================
-- Migration: 2026-04-05c · Public Discovery (no login required)
-- ============================================================
-- Principle: every visitor (anonymous or authenticated) can discover
-- users. Only authenticated users can send connect-requests.
-- Activity content remains protected by per-owner visibility setting.
-- ============================================================

-- 1) Profiles: readable by EVERYONE (anon + authenticated)
drop policy if exists "Public profiles are readable" on public.profiles;
drop policy if exists "Users can read own profile" on public.profiles;
drop policy if exists "Authenticated can read profiles" on public.profiles;
drop policy if exists "Anyone can read profiles" on public.profiles;

create policy "Anyone can read profiles"
  on public.profiles for select
  to anon, authenticated
  using (true);

-- Owner-only write policies
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

-- 2) Activities: also respect activityVisibility, but allow anon read for public
drop policy if exists "Users can read own activities" on public.activities;
drop policy if exists "Friends can read activities" on public.activities;
drop policy if exists "Public activities are readable" on public.activities;

create policy "Users can read own activities"
  on public.activities for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Public activities are readable"
  on public.activities for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = activities.user_id
        and coalesce(p.settings->'privacy'->>'activityVisibility', 'followers') = 'public'
    )
  );

create policy "Friends can read activities"
  on public.activities for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = activities.user_id
        and coalesce(p.settings->'privacy'->>'activityVisibility', 'followers') in ('followers','public')
    )
    and exists (
      select 1 from public.friendships f
      where f.user_id = auth.uid()
        and f.friend_id = activities.user_id
        and f.status = 'accepted'
    )
  );
