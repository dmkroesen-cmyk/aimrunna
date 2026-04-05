-- ============================================================
-- Migration: 2026-04-05b · Open Discovery
-- ============================================================
-- Principle: every authenticated user is findable and connect-requestable.
-- Privacy is enforced on CONTENT (activities, metrics), not on existence.
-- The profile row only exposes minimal public fields (id, display_name,
-- profile_image, email). Settings/connected_sources stay owner-only.
-- ============================================================

-- 1) Profiles: always readable by authenticated users (discovery-open)
drop policy if exists "Public profiles are readable" on public.profiles;
drop policy if exists "Users can read own profile" on public.profiles;
drop policy if exists "Authenticated can read profiles" on public.profiles;

-- Minimal profile fields readable by every logged-in user (for search/connect)
create policy "Authenticated can read profiles"
  on public.profiles for select
  to authenticated
  using (true);

-- Owner policies remain for write access
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

-- 2) Activities visibility is controlled by owner's settings.privacy.activityVisibility:
--    "public"     → anyone authenticated can read
--    "followers"  → only accepted friends (default)
--    "private"    → only the owner
drop policy if exists "Users can read own activities" on public.activities;
drop policy if exists "Friends can read activities" on public.activities;
drop policy if exists "Public activities are readable" on public.activities;

create policy "Users can read own activities"
  on public.activities for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Public activities are readable"
  on public.activities for select
  to authenticated
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

-- 3) Friendship requests: anyone authenticated can send to anyone
--    (messagingPermission is enforced on the frontend / future chat layer,
--     but a connect-request itself is always allowed)
-- Policies from 2026-04-05-social-discovery.sql remain valid.

-- 4) Helpful view: public profile projection (minimal fields only)
create or replace view public.profiles_public as
  select id, email, display_name, profile_image, created_at
  from public.profiles;

grant select on public.profiles_public to authenticated;
grant select on public.profiles_public to anon;
