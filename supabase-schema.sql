-- AImRUNNA Supabase Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- ============================================================
-- 1. PROFILES — extends Supabase auth.users
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  display_name text,
  profile_image text,
  settings jsonb default '{
    "account": {"language": "de", "units": "metric", "timezone": "Europe/Berlin", "emailNotifications": "important"},
    "privacy": {"profileVisibility": "public", "activityVisibility": "followers", "searchDiscoverability": "on", "messagingPermission": "connections", "mapPrivacy": "blur_start_end", "mentionsPermission": "connections"},
    "safety": {"commentFilter": "standard", "imageModeration": "on", "riskWarnings": "on", "communityGuidelinesAccepted": "no"}
  }'::jsonb,
  connected_sources text[] default '{}',
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Public profiles are readable"
  on public.profiles for select using (
    (settings->'privacy'->>'profileVisibility') = 'public'
    or auth.uid() = id
  );

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ============================================================
-- 2. INTEGRATIONS — Strava, Garmin, Whoop connections
-- ============================================================
create table public.integrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  provider text not null check (provider in ('strava', 'garmin', 'whoop')),
  connected boolean default false,
  provider_user_id text,
  athlete_data jsonb,
  access_token text,
  refresh_token text,
  expires_at bigint,
  scope text,
  last_status_at timestamptz,
  last_import_at timestamptz,
  import_summary jsonb,
  created_at timestamptz default now(),
  unique (user_id, provider)
);

alter table public.integrations enable row level security;

create policy "Users manage own integrations"
  on public.integrations for all using (auth.uid() = user_id);


-- ============================================================
-- 3. PLANS — saved training plans
-- ============================================================
create table public.plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null default '',
  summary text default '',
  profile jsonb not null default '{}',
  plan_data jsonb not null default '{}',
  created_at timestamptz default now()
);

alter table public.plans enable row level security;

create policy "Users manage own plans"
  on public.plans for all using (auth.uid() = user_id);

create index idx_plans_user on public.plans(user_id, created_at desc);


-- ============================================================
-- 4. ACTIVITIES — manual posts + Strava imports
-- ============================================================
create table public.activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  source text not null default 'manual' check (source in ('manual', 'strava', 'garmin', 'whoop')),
  source_external_id text,
  title text not null default '',
  note text default '',
  kind text default 'training' check (kind in ('training', 'race', 'workout')),
  sport_type text default 'run' check (sport_type in ('run', 'bike', 'swim', 'hyrox', 'other')),
  distance_km numeric(8,2),
  moving_time_sec integer,
  elevation_gain_m numeric(8,1),
  metrics jsonb default '{}',
  image_url text,
  created_at timestamptz default now(),
  unique (user_id, source, source_external_id)
);

alter table public.activities enable row level security;

create policy "Users manage own activities"
  on public.activities for all using (auth.uid() = user_id);

create policy "Friends can read activities"
  on public.activities for select using (
    auth.uid() = user_id
    or exists (
      select 1 from public.friendships
      where user_id = activities.user_id
      and friend_id = auth.uid()
      and status = 'accepted'
    )
  );

create index idx_activities_user on public.activities(user_id, created_at desc);
create index idx_activities_source on public.activities(user_id, source, source_external_id);


-- ============================================================
-- 5. ACTIVITY_PROPS — likes/kudos on activities
-- ============================================================
create table public.activity_props (
  activity_id uuid not null references public.activities(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (activity_id, user_id)
);

alter table public.activity_props enable row level security;

create policy "Users manage own props"
  on public.activity_props for all using (auth.uid() = user_id);

create policy "Props visible on accessible activities"
  on public.activity_props for select using (
    exists (
      select 1 from public.activities a
      where a.id = activity_id
      and (a.user_id = auth.uid() or exists (
        select 1 from public.friendships f
        where f.user_id = a.user_id and f.friend_id = auth.uid() and f.status = 'accepted'
      ))
    )
  );


-- ============================================================
-- 6. FRIENDSHIPS — social connections
-- ============================================================
create table public.friendships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  friend_id uuid not null references public.profiles(id) on delete cascade,
  status text default 'pending' check (status in ('pending', 'accepted', 'blocked')),
  created_at timestamptz default now(),
  unique (user_id, friend_id)
);

alter table public.friendships enable row level security;

create policy "Users see own friendships"
  on public.friendships for select using (
    auth.uid() = user_id or auth.uid() = friend_id
  );

create policy "Users manage own friendships"
  on public.friendships for insert with check (auth.uid() = user_id);

create policy "Users can update friendships involving them"
  on public.friendships for update using (
    auth.uid() = user_id or auth.uid() = friend_id
  );

create policy "Users can delete own friendships"
  on public.friendships for delete using (auth.uid() = user_id);

create index idx_friendships_user on public.friendships(user_id, status);
create index idx_friendships_friend on public.friendships(friend_id, status);
