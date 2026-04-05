-- ============================================================
-- Migration: 2026-04-05d · Activity Polyline
-- Adds encoded polyline column to activities so route maps
-- render on ALL devices (not just the one that imported them).
-- ============================================================

alter table public.activities
  add column if not exists polyline text;

comment on column public.activities.polyline is
  'Google-encoded polyline (from Strava summary_polyline). Used for feed silhouette + detail-map rendering.';
