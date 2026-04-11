# Deploying the Race Catalog

The expanded race catalog contains 249 endurance events across running, triathlon, cycling, HYROX, and open-water swimming.

## Option A: Supabase SQL Editor (simplest)

1. Open the Supabase Dashboard: https://supabase.com/dashboard/project/tpnfkumkvxnrurjuaxdq
2. Go to **SQL Editor** (left sidebar)
3. Click **New query**
4. Copy-paste the entire contents of:
   ```
   supabase-migrations/2026-04-06d-expanded-race-catalog.sql
   ```
   Or use the identical copy at `scripts/seed-catalog-sql.txt`.
5. Click **Run** (or Cmd+Enter)
6. Verify with:
   ```sql
   SELECT sport_type, series, count(*) AS cnt
     FROM public.race_catalog
    GROUP BY sport_type, series
    ORDER BY sport_type, series;
   ```

The migration is idempotent (uses `ON CONFLICT ... DO UPDATE SET`), so it is safe to run multiple times.

## Option B: REST API via curl

Use the shell script with your **service_role** key (not the anon key -- RLS blocks anon writes):

```bash
# Get the service_role key from:
#   Supabase Dashboard > Project Settings > API > service_role (secret)
./scripts/seed-catalog.sh <YOUR_SERVICE_ROLE_KEY>
```

This sends the data as JSON in batches of 30 records each, using the `Prefer: resolution=merge-duplicates` header for upsert behavior.

## Expected record counts

| Sport   | Series            | Count |
|---------|-------------------|-------|
| run     | marathon_majors   | 6     |
| run     | iconic_marathon   | ~90   |
| run     | ultra             | ~26   |
| tri     | ironman           | ~25   |
| tri     | ironman_703       | ~25   |
| tri     | olympic_tri       | 7     |
| bike    | gran_fondo        | ~15   |
| hyrox   | hyrox             | ~37   |
| swim    | open_water        | ~9    |
| **Total** |                 | **249** |
