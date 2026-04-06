-- ============================================================
-- Migration: 2026-04-06c · Add sport_type to race_catalog +
-- expand catalog with missing German marathons
-- ============================================================

-- ── 1. Add sport_type column ──
ALTER TABLE public.race_catalog ADD COLUMN IF NOT EXISTS sport_type text DEFAULT 'run';

-- Set correct sport_type for non-running events
UPDATE public.race_catalog SET sport_type = 'tri' WHERE series IN ('ironman','ironman_703');
UPDATE public.race_catalog SET sport_type = 'bike' WHERE series = 'gran_fondo';
UPDATE public.race_catalog SET sport_type = 'hyrox' WHERE series = 'hyrox';
UPDATE public.race_catalog SET sport_type = 'run' WHERE series IN ('marathon_majors','iconic_marathon','ultra');
UPDATE public.race_catalog SET sport_type = 'other' WHERE series = 'hybrid';

-- ── 2. Add missing races ──
INSERT INTO public.race_catalog
  (series, event_code, event_name, short_name, city, country, country_code, distance_km, distance_label, iconic_level, primary_color, secondary_color, logo_emoji, sport_type)
VALUES
  -- German Marathons
  ('iconic_marathon','duesseldorf','METRO Marathon Düsseldorf','Düsseldorf','Düsseldorf','Germany','DE',42.195,'marathon',3,'#009EE0','#FFFFFF','🏅','run'),
  ('iconic_marathon','muenchen','München Marathon','München','München','Germany','DE',42.195,'marathon',3,'#009EE0','#FFD700','🏅','run'),
  ('iconic_marathon','hannover','HAJ Hannover Marathon','Hannover','Hannover','Germany','DE',42.195,'marathon',3,'#E30613','#FFFFFF','🏅','run'),
  ('iconic_marathon','dresden','Oberelbe Marathon Dresden','Dresden','Dresden','Germany','DE',42.195,'marathon',3,'#003DA5','#FFD700','🏅','run'),
  ('iconic_marathon','mainz','Gutenberg Marathon Mainz','Mainz','Mainz','Germany','DE',42.195,'marathon',3,'#E30613','#000000','🏅','run'),
  ('iconic_marathon','freiburg','MEIN FREIBURG Marathon','Freiburg','Freiburg','Germany','DE',42.195,'marathon',3,'#009EE0','#FFFFFF','🏅','run'),
  -- Half Marathons (popular German)
  ('iconic_marathon','berlin_hm','Berlin Half Marathon','Berlin HM','Berlin','Germany','DE',21.0975,'half_marathon',3,'#E5007D','#FFCC00','🏅','run'),
  ('iconic_marathon','duesseldorf_hm','Düsseldorf Halbmarathon','Düsseldorf HM','Düsseldorf','Germany','DE',21.0975,'half_marathon',3,'#009EE0','#FFFFFF','🏅','run'),
  -- International Half Marathons
  ('iconic_marathon','istanbul','Istanbul Marathon','Istanbul','Istanbul','Turkey','TR',42.195,'marathon',3,'#E30A17','#FFFFFF','🏅','run'),
  ('iconic_marathon','barcelona_m','Barcelona Marathon','Barcelona','Barcelona','Spain','ES',42.195,'marathon',4,'#FFCD00','#E30613','🏅','run'),
  ('iconic_marathon','amsterdam','Amsterdam Marathon','Amsterdam','Amsterdam','Netherlands','NL',42.195,'marathon',4,'#FF6F00','#000000','🏅','run'),
  ('iconic_marathon','stockholm_m','Stockholm Marathon','Stockholm','Stockholm','Sweden','SE',42.195,'marathon',3,'#006AA7','#FECC02','🏅','run'),
  ('iconic_marathon','copenhagen','Copenhagen Marathon','Copenhagen','Copenhagen','Denmark','DK',42.195,'marathon',3,'#C8102E','#FFFFFF','🏅','run'),
  ('iconic_marathon','zurich','Zürich Marathon','Zürich','Zürich','Switzerland','CH',42.195,'marathon',3,'#DA291C','#FFFFFF','🏅','run'),
  ('iconic_marathon','vienna','Vienna City Marathon','Wien','Wien','Austria','AT',42.195,'marathon',4,'#ED2939','#FFFFFF','🏅','run'),
  -- Popular 10K/5K
  ('iconic_marathon','silvesterlauf','Düsseldorfer Silvesterlauf','Silvesterlauf','Düsseldorf','Germany','DE',15,'15k',2,'#009EE0','#FFFFFF','🏅','run'),
  -- Ironman 70.3 additions
  ('ironman_703','703_duesseldorf','Ironman 70.3 Düsseldorf','IM 70.3 Düsseldorf','Düsseldorf','Germany','DE',113,'ironman_70_3',3,'#009EE0','#FFFFFF','🥇','tri'),
  ('ironman_703','703_hamburg','Ironman 70.3 Hamburg','IM 70.3 Hamburg','Hamburg','Germany','DE',113,'ironman_70_3',3,'#009EE0','#FFFFFF','🥇','tri'),
  ('ironman_703','703_ruegen','Ironman 70.3 Rügen','IM 70.3 Rügen','Rügen','Germany','DE',113,'ironman_70_3',3,'#009EE0','#FFFFFF','🥇','tri')
ON CONFLICT (series, event_code) DO UPDATE SET
  event_name = EXCLUDED.event_name,
  short_name = EXCLUDED.short_name,
  city = EXCLUDED.city,
  distance_km = EXCLUDED.distance_km,
  distance_label = EXCLUDED.distance_label,
  sport_type = EXCLUDED.sport_type;
