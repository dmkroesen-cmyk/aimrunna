-- ============================================================
-- Migration: 2026-04-06a · Open Activities Read
-- Allow any authenticated user to read any user's activities.
-- This makes the "view public profile" feature work without
-- requiring each user to set activityVisibility = 'public'.
-- Write access stays restricted to own rows.
-- ============================================================

-- Drop old restrictive read policies
drop policy if exists "Users can read own activities" on public.activities;
drop policy if exists "Public activities are readable" on public.activities;
drop policy if exists "Friends can read activities" on public.activities;

-- Any authenticated user can read any activity (social platform)
create policy "Authenticated users can read all activities"
  on public.activities for select
  to authenticated
  using (true);

-- Anon can read activities from users with public visibility
create policy "Anon can read public activities"
  on public.activities for select
  to anon
  using (
    exists (
      select 1 from public.profiles p
      where p.id = activities.user_id
        and coalesce(p.settings->'privacy'->>'activityVisibility', 'followers') = 'public'
    )
  );

-- Write policies (unchanged, just re-stated for clarity)
drop policy if exists "Users can insert own activities" on public.activities;
drop policy if exists "Users can update own activities" on public.activities;
drop policy if exists "Users can delete own activities" on public.activities;

create policy "Users can insert own activities"
  on public.activities for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own activities"
  on public.activities for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own activities"
  on public.activities for delete
  to authenticated
  using (auth.uid() = user_id);
