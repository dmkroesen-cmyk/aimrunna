-- ============================================================
-- Migration: 2026-04-05e · Medal Board
-- Creates race_catalog, race_medals, user_badges tables for the
-- Trophy Case feature. Seeds ~60 iconic events across running,
-- triathlon, HYROX, ultras, and gran fondos.
-- ============================================================

-- ── 1. race_catalog (canonical event list) ───────────────────
create table if not exists public.race_catalog (
  id uuid primary key default gen_random_uuid(),
  series text not null,
  event_code text not null,
  event_name text not null,
  short_name text,
  city text,
  country text,
  country_code text,
  distance_km numeric,
  distance_label text,
  iconic_level int default 3,
  primary_color text,
  secondary_color text,
  logo_emoji text,
  created_at timestamptz default now(),
  unique (series, event_code)
);

comment on table public.race_catalog is
  'Curated catalog of iconic races (Marathon Majors, Ironman, HYROX, Ultras, Gran Fondos). Used for Trophy Case autocomplete + auto-detection.';

-- Allow all authenticated users to read the catalog
alter table public.race_catalog enable row level security;
drop policy if exists "race_catalog_read_all" on public.race_catalog;
create policy "race_catalog_read_all"
  on public.race_catalog for select
  using (true);

-- ── 2. race_medals (user's achievements) ─────────────────────
create table if not exists public.race_medals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  race_catalog_id uuid references public.race_catalog(id),

  -- Denormalized (supports custom events without catalog entry)
  series text not null,
  event_code text,
  event_name text not null,
  event_city text,
  event_year int,

  -- Achievement
  finish_date date not null,
  finish_time_sec int,
  finish_position int,
  age_group_position int,
  age_group text,
  bib_number text,

  -- Media + link
  medal_image_url text,
  activity_id uuid references public.activities(id) on delete set null,
  detection_score int,
  detection_confirmed boolean default true,

  notes text,
  is_pr boolean default false,
  created_at timestamptz default now()
);

comment on table public.race_medals is
  'User-owned race medals (Trophy Case entries). Linked optionally to race_catalog + activities.';

create index if not exists race_medals_user_series_idx
  on public.race_medals(user_id, series);
create index if not exists race_medals_user_date_idx
  on public.race_medals(user_id, finish_date desc);
create index if not exists race_medals_activity_idx
  on public.race_medals(activity_id);

-- Unique constraint: one medal per user/event/year
create unique index if not exists race_medals_unique_event
  on public.race_medals(user_id, series, event_code, event_year)
  where event_code is not null and event_year is not null;

alter table public.race_medals enable row level security;
drop policy if exists "medals_read_all" on public.race_medals;
drop policy if exists "medals_write_own" on public.race_medals;
create policy "medals_read_all"
  on public.race_medals for select
  using (true);
create policy "medals_write_own"
  on public.race_medals for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── 3. user_badges (computed achievements) ───────────────────
create table if not exists public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  code text not null,
  name text not null,
  tier text not null default 'common',
  earned_at timestamptz default now(),
  metadata jsonb default '{}'::jsonb,
  unique (user_id, code)
);

comment on table public.user_badges is
  'Computed badges (Six Star, Ironman Triple, HYROX Pro, etc.). Recomputed after each medal insert/delete.';

create index if not exists user_badges_user_idx
  on public.user_badges(user_id);

alter table public.user_badges enable row level security;
drop policy if exists "badges_read_all" on public.user_badges;
drop policy if exists "badges_write_own" on public.user_badges;
create policy "badges_read_all"
  on public.user_badges for select
  using (true);
create policy "badges_write_own"
  on public.user_badges for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================
-- Seed race_catalog (~60 iconic events)
-- ============================================================

insert into public.race_catalog
  (series, event_code, event_name, short_name, city, country, country_code, distance_km, distance_label, iconic_level, primary_color, secondary_color, logo_emoji)
values
  -- ── World Marathon Majors (6) ──
  ('marathon_majors','berlin','Berlin Marathon','Berlin','Berlin','Germany','DE',42.195,'marathon',5,'#E5007D','#FFCC00','🇩🇪'),
  ('marathon_majors','boston','Boston Marathon','Boston','Boston','USA','US',42.195,'marathon',5,'#003DA5','#FFCD00','🇺🇸'),
  ('marathon_majors','chicago','Chicago Marathon','Chicago','Chicago','USA','US',42.195,'marathon',5,'#C8102E','#000000','🇺🇸'),
  ('marathon_majors','london','London Marathon','London','London','UK','GB',42.195,'marathon',5,'#FF671F','#012169','🇬🇧'),
  ('marathon_majors','nyc','New York City Marathon','NYC','New York','USA','US',42.195,'marathon',5,'#FF6319','#0039A6','🇺🇸'),
  ('marathon_majors','tokyo','Tokyo Marathon','Tokyo','Tokyo','Japan','JP',42.195,'marathon',5,'#BC002D','#FFFFFF','🇯🇵'),

  -- ── Iconic Marathons (8) ──
  ('iconic_marathon','frankfurt','Frankfurt Marathon','Frankfurt','Frankfurt','Germany','DE',42.195,'marathon',4,'#E30613','#000000','🏅'),
  ('iconic_marathon','hamburg','Haspa Marathon Hamburg','Hamburg','Hamburg','Germany','DE',42.195,'marathon',4,'#009EE0','#FFFFFF','🏅'),
  ('iconic_marathon','koeln','Köln Marathon','Köln','Köln','Germany','DE',42.195,'marathon',3,'#D2001C','#FFFFFF','🏅'),
  ('iconic_marathon','valencia','Valencia Marathon','Valencia','Valencia','Spain','ES',42.195,'marathon',4,'#FF6F00','#003DA5','🏅'),
  ('iconic_marathon','paris','Paris Marathon','Paris','Paris','France','FR',42.195,'marathon',4,'#002395','#ED2939','🏅'),
  ('iconic_marathon','rotterdam','Rotterdam Marathon','Rotterdam','Rotterdam','Netherlands','NL',42.195,'marathon',4,'#FF6F00','#000000','🏅'),
  ('iconic_marathon','two_oceans','Two Oceans Marathon','Two Oceans','Cape Town','South Africa','ZA',56,'ultra_56k',4,'#007749','#FFB81C','🏅'),
  ('iconic_marathon','comrades','Comrades Marathon','Comrades','Durban/Pietermaritzburg','South Africa','ZA',89,'ultra_89k',5,'#007749','#FFB81C','🏅'),

  -- ── Ironman Full Distance (12) ──
  ('ironman','kona','Ironman World Championship Kona','Kona','Kailua-Kona','USA','US',226.3,'ironman_full',5,'#D4AF37','#003DA5','🏆'),
  ('ironman','roth','Challenge Roth','Roth','Roth','Germany','DE',226.3,'ironman_full',5,'#FFD700','#000000','🏆'),
  ('ironman','lanzarote','Ironman Lanzarote','Lanza','Lanzarote','Spain','ES',226.3,'ironman_full',5,'#E30613','#FFCD00','🏆'),
  ('ironman','nice','Ironman Nice','Nice','Nice','France','FR',226.3,'ironman_full',4,'#002395','#ED2939','🏆'),
  ('ironman','frankfurt_im','Ironman European Championship Frankfurt','Frankfurt','Frankfurt','Germany','DE',226.3,'ironman_full',4,'#E30613','#000000','🏆'),
  ('ironman','hamburg_im','Ironman Hamburg','Hamburg','Hamburg','Germany','DE',226.3,'ironman_full',4,'#009EE0','#FFFFFF','🏆'),
  ('ironman','wales','Ironman Wales','Wales','Tenby','UK','GB',226.3,'ironman_full',4,'#E30613','#FFFFFF','🏆'),
  ('ironman','lake_placid','Ironman Lake Placid','Placid','Lake Placid','USA','US',226.3,'ironman_full',4,'#003DA5','#FFFFFF','🏆'),
  ('ironman','cairns','Ironman Cairns','Cairns','Cairns','Australia','AU',226.3,'ironman_full',3,'#00843D','#FFCD00','🏆'),
  ('ironman','cozumel','Ironman Cozumel','Cozumel','Cozumel','Mexico','MX',226.3,'ironman_full',3,'#006847','#CE1126','🏆'),
  ('ironman','barcelona','Ironman Barcelona','Barcelona','Calella','Spain','ES',226.3,'ironman_full',4,'#FFCD00','#E30613','🏆'),
  ('ironman','texas','Ironman Texas','Texas','The Woodlands','USA','US',226.3,'ironman_full',3,'#BF0A30','#002868','🏆'),

  -- ── 70.3 Highlights (2) ──
  ('ironman_703','703_worlds','Ironman 70.3 World Championship','70.3 WC','Varies','World','WW',113,'ironman_70_3',5,'#D4AF37','#003DA5','🥇'),
  ('ironman_703','703_kraichgau','Ironman 70.3 Kraichgau','Kraichgau','Kraichgau','Germany','DE',113,'ironman_70_3',3,'#009EE0','#FFFFFF','🥇'),

  -- ── HYROX (10) ──
  ('hyrox','hyrox_berlin','HYROX Berlin','Berlin','Berlin','Germany','DE',8,'hyrox',4,'#E5A93D','#000000','💪'),
  ('hyrox','hyrox_koeln','HYROX Köln','Köln','Köln','Germany','DE',8,'hyrox',4,'#E5A93D','#000000','💪'),
  ('hyrox','hyrox_hamburg','HYROX Hamburg','Hamburg','Hamburg','Germany','DE',8,'hyrox',4,'#E5A93D','#000000','💪'),
  ('hyrox','hyrox_muenchen','HYROX München','München','München','Germany','DE',8,'hyrox',4,'#E5A93D','#000000','💪'),
  ('hyrox','hyrox_london','HYROX London','London','London','UK','GB',8,'hyrox',4,'#E5A93D','#000000','💪'),
  ('hyrox','hyrox_nyc','HYROX New York','NYC','New York','USA','US',8,'hyrox',4,'#E5A93D','#000000','💪'),
  ('hyrox','hyrox_chicago','HYROX Chicago','Chicago','Chicago','USA','US',8,'hyrox',4,'#E5A93D','#000000','💪'),
  ('hyrox','hyrox_dubai','HYROX Dubai','Dubai','Dubai','UAE','AE',8,'hyrox',4,'#E5A93D','#000000','💪'),
  ('hyrox','hyrox_stockholm','HYROX Stockholm','Stockholm','Stockholm','Sweden','SE',8,'hyrox',4,'#E5A93D','#000000','💪'),
  ('hyrox','hyrox_worlds','HYROX World Championships','WC','Varies','World','WW',8,'hyrox',5,'#D4AF37','#000000','💪'),

  -- ── Ultras (12) ──
  ('ultra','utmb','UTMB','UTMB','Chamonix','France','FR',171,'ultra_100mi',5,'#002395','#FFFFFF','⛰️'),
  ('ultra','ccc','CCC','CCC','Courmayeur/Chamonix','France','FR',101,'ultra_100k',5,'#002395','#FFFFFF','⛰️'),
  ('ultra','tds','TDS','TDS','Courmayeur/Chamonix','France','FR',145,'ultra_145k',5,'#002395','#FFFFFF','⛰️'),
  ('ultra','western_states','Western States 100','WSER','Olympic Valley','USA','US',161,'ultra_100mi',5,'#003DA5','#FFCD00','⛰️'),
  ('ultra','badwater','Badwater 135','Badwater','Death Valley','USA','US',217,'ultra_135mi',5,'#FF4500','#000000','🔥'),
  ('ultra','spartathlon','Spartathlon','Sparta','Athens/Sparta','Greece','GR',246,'ultra_246k',5,'#005EB8','#FFFFFF','⛰️'),
  ('ultra','lavaredo','Lavaredo Ultra Trail','Lavaredo','Cortina','Italy','IT',120,'ultra_120k',4,'#009246','#CE2B37','⛰️'),
  ('ultra','transgrancanaria','Transgrancanaria','TGC','Gran Canaria','Spain','ES',128,'ultra_128k',4,'#FFCD00','#E30613','⛰️'),
  ('ultra','mds','Marathon des Sables','MDS','Sahara','Morocco','MA',250,'ultra_stage',5,'#C1272D','#006233','🏜️'),
  ('ultra','hardrock','Hardrock 100','Hardrock','Silverton','USA','US',161,'ultra_100mi',5,'#8B4513','#FFFFFF','⛰️'),
  ('ultra','leadville','Leadville 100','Leadville','Leadville','USA','US',161,'ultra_100mi',5,'#B22234','#FFFFFF','⛰️'),
  ('ultra','eiger','Eiger Ultra Trail','Eiger','Grindelwald','Switzerland','CH',101,'ultra_100k',4,'#DA291C','#FFFFFF','⛰️'),

  -- ── Gran Fondo / Cycling (6) ──
  ('gran_fondo','maratona_dolomiti','Maratona dles Dolomites','Maratona','Alta Badia','Italy','IT',138,'gran_fondo',5,'#009246','#CE2B37','🚴'),
  ('gran_fondo','oetztaler','Ötztaler Radmarathon','Ötztaler','Sölden','Austria','AT',227,'gran_fondo',5,'#ED2939','#FFFFFF','🚴'),
  ('gran_fondo','la_marmotte','La Marmotte','Marmotte','Bourg-d''Oisans','France','FR',174,'gran_fondo',5,'#002395','#ED2939','🚴'),
  ('gran_fondo','mallorca_312','Mallorca 312','Mallorca','Playa de Muro','Spain','ES',312,'gran_fondo',5,'#FFCD00','#E30613','🚴'),
  ('gran_fondo','haute_route','Haute Route','Haute Route','Varies','France','FR',600,'stage_race',5,'#002395','#FFFFFF','🚴'),
  ('gran_fondo','everesting','Everesting (8848m)','Everesting','Anywhere','World','WW',null,'everesting',5,'#D4AF37','#000000','⛰️'),

  -- ── Hybrid / Functional (4) ──
  ('hybrid','deka_strong','DEKA Strong','DEKA S','Varies','World','WW',null,'deka_strong',3,'#E5A93D','#000000','💪'),
  ('hybrid','deka_fit','DEKA Fit','DEKA F','Varies','World','WW',5,'deka_fit',3,'#E5A93D','#000000','💪'),
  ('hybrid','crossfit_open','CrossFit Open','CF Open','Worldwide','World','WW',null,'crossfit',3,'#000000','#E5A93D','💪'),
  ('hybrid','spartan_wc','Spartan World Championship','Spartan WC','Varies','World','WW',21,'obstacle',4,'#A6192E','#000000','🗡️')
on conflict (series, event_code) do update set
  event_name = excluded.event_name,
  short_name = excluded.short_name,
  city = excluded.city,
  country = excluded.country,
  country_code = excluded.country_code,
  distance_km = excluded.distance_km,
  distance_label = excluded.distance_label,
  iconic_level = excluded.iconic_level,
  primary_color = excluded.primary_color,
  secondary_color = excluded.secondary_color,
  logo_emoji = excluded.logo_emoji;

-- ============================================================
-- Verify
-- ============================================================
-- select series, count(*) from race_catalog group by series order by series;
