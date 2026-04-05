-- ============================================================
-- Migration: 2026-04-05f · Main Events (Target Races)
-- Creates user_target_races table. Each row = a race the user
-- is training toward. Links optionally to race_catalog and to
-- a training plan (PeakPlan). Displayed in Public Profile as
-- the "Main Events" section and used as target in the planner.
-- ============================================================

create table if not exists public.user_target_races (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,

  -- Link to canonical catalog (optional — allows custom events)
  race_catalog_id uuid references public.race_catalog(id) on delete set null,

  -- Denormalized (supports custom events)
  event_name text not null,
  event_city text,
  event_country text,
  series text,
  distance_label text,

  -- When
  race_date date not null,

  -- Priority: A = key peak race, B = tune-up / secondary, C = fun / training race
  priority text not null default 'A' check (priority in ('A','B','C')),

  -- Registration / preparation status
  status text not null default 'planned'
    check (status in ('planned','registered','confirmed','completed','dns','dnf','cancelled')),

  -- Goals
  goal_time_sec int,
  goal_note text,

  -- Link to training plan
  training_plan_id uuid,

  -- Link to completed medal (filled after race finishes)
  medal_id uuid references public.race_medals(id) on delete set null,

  notes text,
  visibility text not null default 'public' check (visibility in ('public','friends','private')),

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table public.user_target_races is
  'User-selected goal races (Main Events). Shown prominently on Public Profile; drives PeakPlan creation and countdown UI.';

create index if not exists user_target_races_user_date_idx
  on public.user_target_races(user_id, race_date asc);
create index if not exists user_target_races_user_priority_idx
  on public.user_target_races(user_id, priority, race_date asc);
create index if not exists user_target_races_plan_idx
  on public.user_target_races(training_plan_id);

-- Trigger: keep updated_at fresh
create or replace function public.touch_user_target_races_updated_at()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_touch_user_target_races on public.user_target_races;
create trigger trg_touch_user_target_races
  before update on public.user_target_races
  for each row execute function public.touch_user_target_races_updated_at();

alter table public.user_target_races enable row level security;

drop policy if exists "target_races_read_public" on public.user_target_races;
drop policy if exists "target_races_write_own" on public.user_target_races;

-- Read: everyone can read public entries; friends-only handled client-side for now
create policy "target_races_read_public"
  on public.user_target_races for select
  using (visibility = 'public' or auth.uid() = user_id);

create policy "target_races_write_own"
  on public.user_target_races for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================
-- Verify
-- ============================================================
-- select user_id, event_name, race_date, priority, status
--   from user_target_races order by race_date asc;
