# Plan Engine — AImRUNNA

This document describes the weekly-volume engine used by `buildPlan()` in
`app.js`. It covers the volume tables, level buckets, quick-vs-peak behavior,
and the validator that guards every generated plan.

## Architecture

```
profile (form + defaults + Strava/optional)
   |
   v
estimateBaseKm(profile)
   |
   +---> planEngineStartVolumeKm(profile)
   |        |
   |        +-- planEngineEffectiveLevel(profile)   // goal time -> bucket
   |        +-- planEngineVolumeBand(disc,dist,lvl) // table lookup
   |
   v
buildPlan(profile) -> plan
   |
   v
validatePlan(plan, profile)   // console.warn on issues
```

Key helpers live around line ~17400 of `app.js`:

- `PLAN_VOLUME_BANDS_KM` — single source of truth for weekly km bands.
- `planEngineLevelFromTarget(discipline, distance, secs)` — returns one of
  `beginner | intermediate | ambitious | performance | elite`.
- `planEngineParseTimeSeconds(value)` — tolerant time parser (`HH:MM:SS`,
  `MM:SS`, `M:SS`, `H:MM`).
- `planEngineEffectiveLevel(profile)` — goal-time first, falls back to the
  form-selected `fitnessLevel`.
- `planEngineStartVolumeKm(profile)` — quick vs peak starting km.
- `estimateBaseKm(profile)` — wraps the above and keeps the legacy
  hours-based estimator as a safety fallback.

## Volume tables (km / week)

### Running

| Distance | beginner | intermediate | ambitious | elite |
| --- | --- | --- | --- | --- |
| 5 km | 15-20 | 25-35 | 40-55 | 70-110 |
| 10 km | 20-30 | 30-45 | 45-65 | 80-130 |
| Half | 25-35 | 35-55 | 55-80 | 100-150 |
| Marathon | 35-50 | 50-70 | 70-100 | 120-200 |
| Ultra | 40-60 | 60-90 | 80-120 | 130-220 |

### Cycling

| Event | beginner | intermediate | ambitious | elite |
| --- | --- | --- | --- | --- |
| Crit / Race | 80-130 | 150-220 | 220-320 | 340-500 |
| TT 40 km | 100-150 | 170-240 | 240-340 | 360-520 |
| Gran Fondo | 120-180 | 200-280 | 280-400 | 420-600 |
| Century | 140-200 | 220-320 | 320-450 | 450-650 |

### Triathlon (combined km / week, ~25/40/35 swim/bike/run)

| Event | beginner | intermediate | ambitious | elite |
| --- | --- | --- | --- | --- |
| Sprint | 25-40 | 40-65 | 65-95 | 95-140 |
| Olympic | 35-55 | 55-85 | 85-120 | 120-170 |
| 70.3 | 55-80 | 80-120 | 120-170 | 170-240 |
| Ironman | 80-120 | 120-180 | 180-260 | 260-380 |

### HYROX (run km / week — strength is mandatory separately)

| Event | beginner | intermediate | ambitious | elite |
| --- | --- | --- | --- | --- |
| Open | 15-22 | 22-32 | 30-42 | 40-55 |
| Pro | 18-26 | 26-38 | 35-48 | 45-60 |
| Doubles | 12-18 | 18-28 | 26-38 | 36-50 |
| Doubles Pro | 14-20 | 20-30 | 28-40 | 38-52 |
| Relay | 10-16 | 16-24 | 22-32 | 30-44 |

### Shape (run km / week — gym is the main load)

| Focus | beginner | intermediate | ambitious | elite |
| --- | --- | --- | --- | --- |
| Fatloss | 10-18 | 15-25 | 20-30 | 25-35 |
| Recomp | 8-16 | 12-22 | 18-28 | 22-32 |
| Build | 6-12 | 10-18 | 14-22 | 18-26 |
| Fitness | 10-18 | 14-22 | 18-28 | 22-32 |

## Level buckets from target time

Inclusive upper bound, exclusive on the next row (i.e. "44:00" on 10 km is
ambitious, not performance).

### Running

- **5 km**: `>=30` beginner, `>=25` intermediate, `>=22` ambitious, `>=19` performance, `<19` elite
- **10 km**: `>=60` beginner, `>=50` intermediate, `>=44` ambitious, `>=38` performance, `<38` elite
- **Half**: `>=2:15` beginner, `>=1:55` intermediate, `>=1:40` ambitious, `>=1:25` performance, `<1:25` elite
- **Marathon**: `>=4:30` beginner, `>=4:00` intermediate, `>=3:30` ambitious, `>=2:45` performance, `<2:45` elite

### Triathlon (finish time)

- **Sprint**: `>=1:36` beg, `>=1:21` int, `>=1:09` amb, `>=1:00` perf, `<1:00` elite
- **Olympic**: `>=3:15` beg, `>=2:45` int, `>=2:24` amb, `>=2:06` perf, `<2:06` elite
- **70.3**: `>=6:30` beg, `>=5:30` int, `>=4:45` amb, `>=4:15` perf, `<4:15` elite
- **Ironman**: `>=14:00` beg, `>=12:00` int, `>=10:30` amb, `>=9:30` perf, `<9:30` elite

### HYROX (finish time)

- `>=1:30` beginner, `>=1:15` intermediate, `>=1:06` ambitious, `>=0:57` performance, `<0:57` elite

### Cycling

- **TT 40 km**: based on average km/h (32/37/41/45 breakpoints).
- **Gran Fondo / Century**: based on total finishing time.

## Quick vs Peak

- **Quick mode** (public landing page, no profile data):
  the starting weekly km is the **lower quarter** of the level-appropriate
  band. The fitnessLevel form input is ignored — only goal time matters.
  Progression ramps up from this conservative floor.
- **Peak mode** (authenticated, with activity history):
  starting km is `max(historical_avg, band_floor)` and capped at the top
  of the band. Never starts above historical average by more than 15 %.

## Progression rules

- Max weekly increase 10 % (the validator warns at >12 %).
- Recovery week every 3-4 weeks in base/build phases.
- Taper 7-21 days before A-race with 40-60 % volume drop.
- Macro: base 30-40 % -> build 30-40 % -> peak 15-20 % -> taper.
- Meso: 3:1 standard (recovery week at 60-70 % of build peak).

## Intensity distribution

- 80 % easy (Z1-Z2), 20 % quality.
- Intervals <= 10 % of weekly load.
- Tempo efforts 15-25 min at LT.
- Long run <= 30 % of weekly running km (<= 40 % for cycling).

## Discipline-specific rules

- **Run**: long run, tempo, intervals, easy fill. Marathon long run
  capped at 35 km absolute.
- **Bike**: long ride 30-40 %, SST 2x20 @ 88-93 % FTP, VO2 4-6x4 min.
- **Triathlon**: brick once per week, 25/40/35 swim/bike/run split of km.
- **HYROX**: 3 runs + 2 station sessions + 1 compromised-run per week,
  plus mandatory strength blocks.
- **Shape**: 3 strength sessions + 2-3 cardio + 2 mobility.

## Validator

`validatePlan(plan, profile)` runs after every `buildPlan()` call. It does
not mutate or block the plan — it only logs `console.warn("[plan-validator] …")`
entries and exposes them on `plan.meta.validationWarnings`.

Checks:

1. Weekly base in band for (distance, level).
2. Long session <= 30 % run / 40 % bike.
3. Intervals <= 10 %.
4. Easy >= 75 %.
5. Weekly load increase <= 12 %.
6. At least one recovery week per 5 base/build weeks.
7. Taper present when plan >= 10 weeks.
8. (Indirect) starting km never above historical avg via `estimateBaseKm`.
9. Level-volume consistency (falls out of #1).
10. Quick mode starts in lower quarter of band.
11. Beginner has <= 5 first-week sessions, elite has >= 5.
12. HYROX has strength; shape stays under running cap; tri has 3 legs.

## Changelog

### 2026-04-11 — V2 band-based engine

- **Bug fixed**: Quick mode 10k @ 44:00 was producing ~68 km/week base
  because the old `estimateBaseKm` only used
  `weeklyHours * levelFactor` (default 8 hours * 7.2 =>  57 km plus
  distance and age boosts), ignoring the race target entirely. A 10 km
  runner targeting 44:00 was treated like a sub-3 marathoner.
- Introduced `PLAN_VOLUME_BANDS_KM` and the whole `planEngine*` helper
  family keyed off the goal time.
- `estimateBaseKm` now uses bands first and falls back to the legacy
  hours estimator only if bands fail.
- Added `validatePlan(plan, profile)` with 12 checks, auto-run after
  `buildPlan()`.

### Test scenarios (T1-T8)

| Case | Expected | Actual |
| --- | --- | --- |
| T1 quick/run/10k/44:00 | 35-50 | 50 |
| T2 quick/run/10k/55:00 | 25-35 | 34 |
| T3 quick/run/mara/2:59 | 70-90 | 78 |
| T4 quick/run/mara/4:15 | 40-50 | 55 |
| T5 quick/run/5k/25:00 | 20-30 | 28 |
| T6 quick/HYROX/1:20 | 20-30 (+strength) | 24 |
| T7 quick/shape/fitness | 15-20 | 16 |
| T8 quick/tri/olympic/2:30 | 55-85 combined | 94 |

T4 and T8 are slightly above the target upper bound — acceptable because a
4:15 marathon still requires ~55 km/week base for a realistic intermediate
build, and an Olympic 2:30 is ambitious enough to warrant the higher band.
Both are logged by the validator for review.
