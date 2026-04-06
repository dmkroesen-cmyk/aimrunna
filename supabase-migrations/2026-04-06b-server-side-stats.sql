-- ============================================================
-- Migration: 2026-04-06b · Server-Side Stats & Pagination
-- Move heavy computations from browser JS to Postgres.
-- ============================================================

-- ── 1. Materialized View: user_activity_stats ──
-- Replaces client-side computeAccountStats()
DROP MATERIALIZED VIEW IF EXISTS user_activity_stats;

CREATE MATERIALIZED VIEW user_activity_stats AS
SELECT
  user_id,
  COUNT(*)::int                                           AS total_activities,
  COALESCE(SUM(distance_km), 0)                           AS total_km,
  COALESCE(SUM(moving_time_sec), 0)::bigint               AS total_seconds,
  COALESCE(SUM(elevation_gain_m), 0)                      AS total_elevation_m,
  -- By sport
  COALESCE(SUM(distance_km) FILTER (WHERE sport_type = 'run'), 0)   AS run_km,
  COALESCE(SUM(distance_km) FILTER (WHERE sport_type = 'bike'), 0)  AS bike_km,
  COALESCE(SUM(distance_km) FILTER (WHERE sport_type = 'swim'), 0)  AS swim_km,
  COUNT(*) FILTER (WHERE kind = 'race')::int              AS race_count,
  -- 12-month window
  COALESCE(SUM(distance_km) FILTER (WHERE created_at >= NOW() - INTERVAL '12 months'), 0) AS km_12m,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '12 months')::int AS activities_12m,
  -- 4-week window (PublicProfile hero stats)
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '28 days')::int AS activities_4w,
  COALESCE(SUM(distance_km) FILTER (WHERE sport_type = 'run' AND created_at >= NOW() - INTERVAL '28 days'), 0) AS run_km_4w,
  COALESCE(SUM(distance_km) FILTER (WHERE sport_type = 'bike' AND created_at >= NOW() - INTERVAL '28 days'), 0) AS bike_km_4w,
  COALESCE(SUM(distance_km) FILTER (WHERE sport_type = 'swim' AND created_at >= NOW() - INTERVAL '28 days'), 0) AS swim_km_4w,
  COALESCE(SUM(moving_time_sec) FILTER (WHERE created_at >= NOW() - INTERVAL '28 days'), 0)::bigint AS total_seconds_4w,
  -- YTD
  COALESCE(SUM(distance_km) FILTER (WHERE created_at >= DATE_TRUNC('year', NOW())), 0) AS km_ytd,
  COUNT(*) FILTER (WHERE created_at >= DATE_TRUNC('year', NOW()))::int AS activities_ytd
FROM activities
GROUP BY user_id;

CREATE UNIQUE INDEX ON user_activity_stats (user_id);

-- Grant read access
GRANT SELECT ON user_activity_stats TO authenticated, anon;

-- Refresh function (call after sync/import)
CREATE OR REPLACE FUNCTION refresh_user_activity_stats()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY user_activity_stats;
END;
$$;

-- ── 2. RPC: get_personal_records ──
-- Replaces client-side PR detection
CREATE OR REPLACE FUNCTION get_personal_records(p_user_id uuid)
RETURNS TABLE (
  distance_label  text,
  distance_km     numeric,
  best_time_sec   int,
  pace_sec_per_km numeric,
  activity_id     uuid,
  activity_date   timestamptz
) LANGUAGE sql STABLE SECURITY DEFINER AS $$
  WITH distance_bands AS (
    SELECT * FROM (VALUES
      ('5K',    5.0,   4.5,  5.5),
      ('10K',  10.0,   9.5, 10.5),
      ('HM',   21.1,  20.5, 22.0),
      ('M',    42.195, 41.0, 43.5)
    ) AS t(label, nominal_km, min_km, max_km)
  ),
  ranked AS (
    SELECT
      db.label,
      db.nominal_km,
      a.id AS activity_id,
      a.moving_time_sec,
      a.created_at,
      ROW_NUMBER() OVER (PARTITION BY db.label ORDER BY a.moving_time_sec ASC) AS rn
    FROM activities a
    JOIN distance_bands db
      ON a.distance_km BETWEEN db.min_km AND db.max_km
    WHERE a.user_id = p_user_id
      AND a.sport_type = 'run'
      AND a.moving_time_sec > 0
      AND a.distance_km > 0
  )
  SELECT
    r.label,
    r.nominal_km,
    r.moving_time_sec::int,
    ROUND((r.moving_time_sec::numeric / r.nominal_km), 1),
    r.activity_id,
    r.created_at
  FROM ranked r
  WHERE r.rn = 1;
$$;

-- ── 3. RPC: get_volume_by_month ──
-- Pre-bucketed chart data for volume charts
CREATE OR REPLACE FUNCTION get_volume_by_month(
  p_user_id uuid,
  p_months  int DEFAULT 12
)
RETURNS TABLE (
  month_key   text,
  month_label text,
  run_km      numeric,
  bike_km     numeric,
  swim_km     numeric,
  run_sec     bigint,
  bike_sec    bigint,
  swim_sec    bigint
) LANGUAGE sql STABLE SECURITY DEFINER AS $$
  WITH months AS (
    SELECT generate_series(
      DATE_TRUNC('month', NOW()) - ((p_months - 1) || ' months')::interval,
      DATE_TRUNC('month', NOW()),
      '1 month'::interval
    )::date AS month_start
  )
  SELECT
    TO_CHAR(m.month_start, 'YYYY-MM'),
    TO_CHAR(m.month_start, 'Mon'),
    COALESCE(SUM(a.distance_km) FILTER (WHERE a.sport_type = 'run'), 0),
    COALESCE(SUM(a.distance_km) FILTER (WHERE a.sport_type = 'bike'), 0),
    COALESCE(SUM(a.distance_km) FILTER (WHERE a.sport_type = 'swim'), 0),
    COALESCE(SUM(a.moving_time_sec) FILTER (WHERE a.sport_type = 'run'), 0)::bigint,
    COALESCE(SUM(a.moving_time_sec) FILTER (WHERE a.sport_type = 'bike'), 0)::bigint,
    COALESCE(SUM(a.moving_time_sec) FILTER (WHERE a.sport_type = 'swim'), 0)::bigint
  FROM months m
  LEFT JOIN activities a
    ON a.user_id = p_user_id
    AND a.created_at >= m.month_start
    AND a.created_at < m.month_start + '1 month'::interval
  GROUP BY m.month_start
  ORDER BY m.month_start;
$$;

-- ── 4. RPC: get_year_compare ──
CREATE OR REPLACE FUNCTION get_year_compare(p_user_id uuid)
RETURNS TABLE (
  year     int,
  run_km   numeric,
  bike_km  numeric,
  swim_km  numeric,
  count    int
) LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT
    EXTRACT(YEAR FROM created_at)::int,
    COALESCE(SUM(distance_km) FILTER (WHERE sport_type = 'run'), 0),
    COALESCE(SUM(distance_km) FILTER (WHERE sport_type = 'bike'), 0),
    COALESCE(SUM(distance_km) FILTER (WHERE sport_type = 'swim'), 0),
    COUNT(*)::int
  FROM activities
  WHERE user_id = p_user_id
  GROUP BY 1
  ORDER BY 1 DESC;
$$;

-- ── 5. RPC: get_pace_trend ──
CREATE OR REPLACE FUNCTION get_pace_trend(
  p_user_id uuid,
  p_months  int DEFAULT 12
)
RETURNS TABLE (
  week_start   date,
  avg_pace_sec numeric,
  total_km     numeric,
  run_count    int
) LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT
    DATE_TRUNC('week', created_at)::date,
    ROUND(AVG(moving_time_sec::numeric / NULLIF(distance_km, 0)), 1),
    SUM(distance_km),
    COUNT(*)::int
  FROM activities
  WHERE user_id = p_user_id
    AND sport_type = 'run'
    AND distance_km > 0.5
    AND moving_time_sec > 0
    AND created_at >= NOW() - (p_months || ' months')::interval
  GROUP BY 1
  ORDER BY 1;
$$;

-- ── 6. RPC: get_friends_feed (paginated, single query) ──
CREATE OR REPLACE FUNCTION get_friends_feed(
  p_user_id uuid,
  p_cursor  timestamptz DEFAULT NULL,
  p_limit   int DEFAULT 20
)
RETURNS TABLE (
  id              uuid,
  user_id         uuid,
  title           text,
  sport_type      text,
  distance_km     numeric,
  moving_time_sec int,
  elevation_gain_m numeric,
  image_url       text,
  created_at      timestamptz,
  display_name    text,
  profile_image   text,
  email           text
) LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT
    a.id, a.user_id, a.title, a.sport_type, a.distance_km,
    a.moving_time_sec, a.elevation_gain_m, a.image_url, a.created_at,
    p.display_name, p.profile_image, p.email
  FROM activities a
  JOIN friendships f ON f.friend_id = a.user_id
    AND f.user_id = p_user_id
    AND f.status = 'accepted'
  JOIN profiles p ON p.id = a.user_id
  WHERE (p_cursor IS NULL OR a.created_at < p_cursor)
  ORDER BY a.created_at DESC
  LIMIT p_limit + 1;
$$;

-- ── 7. Performance Indexes ──
CREATE INDEX IF NOT EXISTS idx_activities_user_sport_created
  ON activities (user_id, sport_type, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_activities_run_prs
  ON activities (user_id, sport_type, distance_km, moving_time_sec)
  WHERE sport_type = 'run' AND moving_time_sec > 0 AND distance_km > 0;

CREATE INDEX IF NOT EXISTS idx_friendships_user_accepted
  ON friendships (user_id, status)
  WHERE status = 'accepted';

CREATE INDEX IF NOT EXISTS idx_activity_props_activity
  ON activity_props (activity_id);
