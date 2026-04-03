# AImRUNNA Backend Scaffold (Planning)

Dieses Frontend ist aktuell statisch. Für echte Strava/WHOOP/Garmin-Integrationen und echte Accounts brauchen wir ein Backend.

## Zielreihenfolge

1. `Auth` (E-Mail + Passwort, echte Server-Auth)
2. `Strava OAuth` (Start / Callback / Token Refresh / Sync)
3. `WHOOP OAuth` (Start / Callback / Sync)
4. `Garmin` (API-Zugang/Partnerweg prüfen + Sync)
5. `Analytics Engine` (Fitness/Fatigue/Readiness etc.)
6. `Adaptive Plan Engine`

## Empfohlene Endpoints (v1)

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### OAuth Connect

- `GET /api/oauth/strava/start`
- `GET /api/oauth/strava/callback`
- `GET /api/oauth/whoop/start`
- `GET /api/oauth/whoop/callback`
- `GET /api/oauth/garmin/start` (später / abhängig von Zugang)
- `GET /api/oauth/garmin/callback`

### Sync

- `POST /api/sync/strava`
- `POST /api/sync/whoop`
- `POST /api/sync/garmin`
- `POST /api/sync/all`

### Training Plans

- `POST /api/plans`
- `GET /api/plans`
- `GET /api/plans/:id`
- `PATCH /api/plans/:id`
- `DELETE /api/plans/:id`

### Social / Friends

- `POST /api/friends/request`
- `POST /api/friends/accept`
- `GET /api/friends`

## Datenmodell (minimal)

- `users`
  - `id`
  - `email`
  - `password_hash`
  - `created_at`

- `connected_accounts`
  - `id`
  - `user_id`
  - `provider` (`strava|whoop|garmin`)
  - `provider_user_id`
  - `access_token` (verschlüsselt)
  - `refresh_token` (verschlüsselt)
  - `expires_at`

- `plans`
  - `id`
  - `user_id`
  - `profile_json`
  - `plan_json`
  - `created_at`

- `friendships`
  - `id`
  - `requester_user_id`
  - `addressee_user_id`
  - `status`

- `sessions_raw`
  - normalisierte Aktivitäten aus Strava/Garmin/WHOOP

- `metrics_daily`
  - tägliche Metriken (HRV, RHR, Load, Readiness, Sleep etc.)

## Security (wichtig)

- OAuth-Client-Secrets niemals ins Frontend
- Tokens verschlüsselt speichern
- Webhooks nur im Backend empfangen
- Passwörter mit Argon2/bcrypt hashen

## Hinweis zum aktuellen Stand

Das Frontend enthält bereits:

- Account-MVP via `localStorage` (nur für Prototyping)
- per-User gespeicherte Pläne (lokal)
- per-User Connector-Status (Mock)
- Friends-Connect (lokal)

Diese Logik wird später durch das Backend ersetzt.

## Neu: Strava OAuth Dev-Scaffold

Unter `/Users/daniel/Documents/AI Projects/AImRUNNA/backend/strava-oauth` liegt jetzt ein lokaler Dev-Server für den Strava-OAuth-Flow:

- OAuth Start
- Callback + Token Exchange
- lokale Token-Speicherung (JSON, nur Dev)
- Status/Refresh/Athlete Test-Endpunkte

Siehe:

- `/Users/daniel/Documents/AI Projects/AImRUNNA/backend/strava-oauth/README.md`
- `/Users/daniel/Documents/AI Projects/AImRUNNA/backend/strava-oauth/.env.example`
