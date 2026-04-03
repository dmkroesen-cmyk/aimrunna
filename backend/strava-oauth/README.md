# Strava OAuth Dev Scaffold (AImRUNNA)

Lokaler Dev-Server für den Strava-OAuth-Flow:

- `GET /api/oauth/strava/start`
- `GET /api/oauth/strava/callback`
- `GET /api/oauth/strava/status`
- `POST /api/oauth/strava/refresh`
- `GET /api/oauth/strava/athlete`
- `GET /api/oauth/strava/activities`
- `POST /api/oauth/strava/import-history`
- `GET /api/oauth/strava/import-summary`

## Zweck

Schnell testen, ob wir Strava-Daten in AImRUNNA verbinden und ziehen können, ohne bereits das komplette Backend zu bauen.

## Setup

1. Datei kopieren:

```bash
cp .env.example .env
```

2. In `.env` eintragen:
- `STRAVA_CLIENT_ID`
- `STRAVA_CLIENT_SECRET`
- `STRAVA_REDIRECT_URI` (muss exakt in Strava App Settings hinterlegt sein)
- `FRONTEND_URL` (optional, für Redirect nach erfolgreichem Callback)

3. Starten:

```bash
npm start
```

## Wichtige Hinweise (Dev-MVP)

- Tokens werden lokal in `data/strava_tokens.dev.json` gespeichert (nicht produktiv).
- Keine DB, keine Verschlüsselung, keine User-Auth.
- Für Produktion:
  - Tokens verschlüsselt speichern
  - User-Auth + Session/Cookie
  - Webhook-Sync
  - Refresh-Job
  - Rechte/Scopes minimieren

## Beispiel-Flow

1. Browser öffnen:

`http://localhost:8787/api/oauth/strava/start?user_id=daniel`

2. Strava-Freigabe
3. Callback speichert Tokens
4. Status prüfen:

`http://localhost:8787/api/oauth/strava/status?user_id=daniel`

5. Athlete testen:

`http://localhost:8787/api/oauth/strava/athlete?user_id=daniel`

6. Historie importieren:

`curl -X POST "http://localhost:8787/api/oauth/strava/import-history?user_id=daniel&per_page=200&max_pages=250"`

7. Import-Status:

`http://localhost:8787/api/oauth/strava/import-summary?user_id=daniel`

## Compliance-Hinweis

Vor produktivem Einsatz Strava API Agreement / Developer Guidelines prüfen (inkl. Use-Case-Einschränkungen).
