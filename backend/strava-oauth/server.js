import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { URL, fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(ROOT, "data");
const TOKEN_FILE = path.join(DATA_DIR, "strava_tokens.dev.json");
const ACTIVITY_FILE = path.join(DATA_DIR, "strava_activities.dev.json");
const env = loadEnv(path.join(ROOT, ".env"));

const PORT = Number(env.PORT || 8787);
const APP_BASE_URL = env.APP_BASE_URL || `http://localhost:${PORT}`;
const FRONTEND_URL = env.FRONTEND_URL || "";
const STRAVA_CLIENT_ID = env.STRAVA_CLIENT_ID || "";
const STRAVA_CLIENT_SECRET = env.STRAVA_CLIENT_SECRET || "";
const STRAVA_REDIRECT_URI = env.STRAVA_REDIRECT_URI || `${APP_BASE_URL}/api/oauth/strava/callback`;
const STRAVA_SCOPES = env.STRAVA_SCOPES || "read,activity:read_all";
const OAUTH_STATE_SECRET = env.OAUTH_STATE_SECRET || "dev-secret-change-me";

ensureDir(DATA_DIR);

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", APP_BASE_URL);
    const pathname = url.pathname;

    if (req.method === "OPTIONS") {
      return corsPreflight(res);
    }

    if (pathname === "/health") {
      return json(res, 200, { ok: true, service: "aimrunna-strava-oauth-dev" });
    }

    if (pathname === "/api/oauth/strava/start" && req.method === "GET") {
      if (!STRAVA_CLIENT_ID) {
        return json(res, 500, { ok: false, error: "Missing STRAVA_CLIENT_ID in .env" });
      }
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const state = signState({ userId, ts: Date.now() });
      const authorizeUrl = new URL("https://www.strava.com/oauth/authorize");
      authorizeUrl.searchParams.set("client_id", STRAVA_CLIENT_ID);
      authorizeUrl.searchParams.set("redirect_uri", STRAVA_REDIRECT_URI);
      authorizeUrl.searchParams.set("response_type", "code");
      authorizeUrl.searchParams.set("approval_prompt", "auto");
      authorizeUrl.searchParams.set("scope", STRAVA_SCOPES);
      authorizeUrl.searchParams.set("state", state);
      res.writeHead(302, { Location: authorizeUrl.toString() });
      return res.end();
    }

    if (pathname === "/api/oauth/strava/callback" && req.method === "GET") {
      const error = url.searchParams.get("error");
      if (error) return json(res, 400, { ok: false, error, message: url.searchParams.get("error_description") || "Strava OAuth error" });

      const code = String(url.searchParams.get("code") || "");
      const state = String(url.searchParams.get("state") || "");
      if (!code || !state) return json(res, 400, { ok: false, error: "Missing code/state" });

      const stateData = verifyState(state);
      if (!stateData.ok) return json(res, 400, { ok: false, error: "Invalid state" });
      const userId = stateData.payload.userId;

      if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET) {
        return json(res, 500, { ok: false, error: "Missing STRAVA client credentials in .env" });
      }

      const tokenRes = await fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: STRAVA_CLIENT_ID,
          client_secret: STRAVA_CLIENT_SECRET,
          code,
          grant_type: "authorization_code",
        }),
      });

      const tokenJson = await tokenRes.json();
      if (!tokenRes.ok) {
        return json(res, 400, { ok: false, error: "Token exchange failed", details: tokenJson });
      }

      const store = readTokenStore();
      store[userId] = {
        provider: "strava",
        userId,
        connectedAt: new Date().toISOString(),
        athlete: tokenJson.athlete || null,
        access_token: tokenJson.access_token,
        refresh_token: tokenJson.refresh_token,
        expires_at: tokenJson.expires_at,
        scope: tokenJson.scope,
        token_type: tokenJson.token_type,
      };
      writeTokenStore(store);

      if (FRONTEND_URL) {
        const redirect = new URL(FRONTEND_URL);
        redirect.searchParams.set("oauth", "strava");
        redirect.searchParams.set("status", "connected");
        redirect.searchParams.set("user_id", userId);
        res.writeHead(302, { Location: redirect.toString() });
        return res.end();
      }

      return html(res, 200, successHtml("Strava verbunden", `User: ${escapeHtml(userId)} · Tokens lokal gespeichert (Dev-MVP)`));
    }

    if (pathname === "/api/oauth/strava/status" && req.method === "GET") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const store = readTokenStore();
      const item = store[userId];
      if (!item) return json(res, 404, { ok: false, connected: false, error: "No token for user_id" });
      return json(res, 200, {
        ok: true,
        connected: true,
        userId,
        athlete: item.athlete || null,
        expires_at: item.expires_at,
        expires_in_sec: Math.max(0, Number(item.expires_at || 0) - Math.floor(Date.now() / 1000)),
        scope: item.scope,
      });
    }

    if (pathname === "/api/oauth/strava/refresh" && req.method === "POST") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const store = readTokenStore();
      const item = store[userId];
      if (!item?.refresh_token) return json(res, 404, { ok: false, error: "No refresh token for user_id" });

      const tokenRes = await fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: STRAVA_CLIENT_ID,
          client_secret: STRAVA_CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: item.refresh_token,
        }),
      });
      const tokenJson = await tokenRes.json();
      if (!tokenRes.ok) return json(res, 400, { ok: false, error: "Refresh failed", details: tokenJson });

      store[userId] = {
        ...item,
        access_token: tokenJson.access_token,
        refresh_token: tokenJson.refresh_token || item.refresh_token,
        expires_at: tokenJson.expires_at,
        scope: tokenJson.scope || item.scope,
        token_type: tokenJson.token_type || item.token_type,
        refreshedAt: new Date().toISOString(),
      };
      writeTokenStore(store);
      return json(res, 200, { ok: true, userId, expires_at: store[userId].expires_at });
    }

    if (pathname === "/api/oauth/strava/athlete" && req.method === "GET") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const store = readTokenStore();
      const item = store[userId];
      if (!item?.access_token) return json(res, 404, { ok: false, error: "No access token for user_id" });

      const athleteRes = await fetch("https://www.strava.com/api/v3/athlete", {
        headers: { Authorization: `Bearer ${item.access_token}` },
      });
      const athleteJson = await athleteRes.json();
      if (!athleteRes.ok) return json(res, athleteRes.status, { ok: false, error: "Athlete fetch failed", details: athleteJson });
      return json(res, 200, { ok: true, athlete: athleteJson });
    }

    if (pathname === "/api/oauth/strava/activities" && req.method === "GET") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const page = clampNumber(url.searchParams.get("page"), 1, 5000, 1);
      const perPage = clampNumber(url.searchParams.get("per_page"), 1, 200, 50);
      const after = clampNumber(url.searchParams.get("after"), 0, 4102444800, null);
      const before = clampNumber(url.searchParams.get("before"), 0, 4102444800, null);

      const store = readTokenStore();
      const tokenItem = await ensureValidToken(userId, store);
      if (!tokenItem) return json(res, 404, { ok: false, error: "No token for user_id" });

      const activitiesRes = await fetchAthleteActivitiesPage({
        token: tokenItem.access_token,
        page,
        perPage,
        after,
        before,
      });

      if (!activitiesRes.ok && activitiesRes.status === 401) {
        const refreshed = await refreshStoreToken(userId, store);
        if (!refreshed.ok) return json(res, 401, { ok: false, error: "Access token expired and refresh failed", details: refreshed.details || null });
        const retryRes = await fetchAthleteActivitiesPage({
          token: refreshed.item.access_token,
          page,
          perPage,
          after,
          before,
        });
        if (!retryRes.ok) return json(res, retryRes.status || 400, { ok: false, error: "Activities fetch failed", details: retryRes.details || null });
        return json(res, 200, { ok: true, userId, page, perPage, count: retryRes.activities.length, activities: retryRes.activities });
      }

      if (!activitiesRes.ok) {
        return json(res, activitiesRes.status || 400, { ok: false, error: "Activities fetch failed", details: activitiesRes.details || null });
      }
      return json(res, 200, { ok: true, userId, page, perPage, count: activitiesRes.activities.length, activities: activitiesRes.activities });
    }

    if (pathname === "/api/oauth/strava/import-history" && req.method === "POST") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const perPage = clampNumber(url.searchParams.get("per_page"), 1, 200, 200);
      const maxPages = clampNumber(url.searchParams.get("max_pages"), 1, 5000, 250);
      const after = clampNumber(url.searchParams.get("after"), 0, 4102444800, null);
      const before = clampNumber(url.searchParams.get("before"), 0, 4102444800, null);

      const tokenStore = readTokenStore();
      const tokenItem = await ensureValidToken(userId, tokenStore);
      if (!tokenItem) return json(res, 404, { ok: false, error: "No token for user_id" });

      const activityStore = readActivityStore();
      const existing = activityStore[userId] || { activities: [], summary: null };
      const existingById = new Map(
        (existing.activities || [])
          .filter((row) => row && Number.isFinite(Number(row.id)))
          .map((row) => [String(row.id), row])
      );

      let imported = 0;
      let updated = 0;
      let page = 1;
      let totalFetched = 0;
      let currentToken = tokenItem.access_token;

      while (page <= maxPages) {
        let pageRes = await fetchAthleteActivitiesPage({
          token: currentToken,
          page,
          perPage,
          after,
          before,
        });

        if (!pageRes.ok && pageRes.status === 401) {
          const refreshed = await refreshStoreToken(userId, tokenStore);
          if (!refreshed.ok) {
            return json(res, 401, {
              ok: false,
              error: "Access token expired and refresh failed during import",
              page,
              imported,
              updated,
              details: refreshed.details || null,
            });
          }
          currentToken = refreshed.item.access_token;
          pageRes = await fetchAthleteActivitiesPage({
            token: currentToken,
            page,
            perPage,
            after,
            before,
          });
        }

        if (!pageRes.ok) {
          return json(res, pageRes.status || 400, {
            ok: false,
            error: "Activities import failed",
            page,
            imported,
            updated,
            details: pageRes.details || null,
          });
        }

        const activities = pageRes.activities || [];
        if (!activities.length) break;
        totalFetched += activities.length;

        for (const activity of activities) {
          const key = String(activity.id);
          if (!existingById.has(key)) {
            imported += 1;
          } else {
            updated += 1;
          }
          existingById.set(key, normalizeStravaActivity(activity));
        }

        if (activities.length < perPage) break;
        page += 1;
      }

      const merged = Array.from(existingById.values())
        .sort((a, b) => new Date(b.start_date || 0).getTime() - new Date(a.start_date || 0).getTime());
      const nowIso = new Date().toISOString();
      activityStore[userId] = {
        activities: merged,
        summary: {
          userId,
          imported,
          updated,
          fetched: totalFetched,
          totalStored: merged.length,
          pagesScanned: page <= maxPages ? page : maxPages,
          perPage,
          maxPages,
          after: after || null,
          before: before || null,
          importedAt: nowIso,
        },
      };
      writeActivityStore(activityStore);

      return json(res, 200, {
        ok: true,
        userId,
        imported,
        updated,
        fetched: totalFetched,
        totalStored: merged.length,
        pagesScanned: page <= maxPages ? page : maxPages,
        importedAt: nowIso,
      });
    }

    if (pathname === "/api/oauth/strava/import-summary" && req.method === "GET") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const activityStore = readActivityStore();
      const item = activityStore[userId];
      return json(res, 200, {
        ok: true,
        userId,
        summary: item?.summary || null,
        totalStored: Array.isArray(item?.activities) ? item.activities.length : 0,
      });
    }

    return json(res, 404, { ok: false, error: "Not found" });
  } catch (error) {
    return json(res, 500, { ok: false, error: "Server error", details: String(error?.message || error) });
  }
});

server.listen(PORT, () => {
  console.log(`[AImRUNNA] Strava OAuth dev server listening on ${APP_BASE_URL}`);
  console.log(`[AImRUNNA] Start OAuth: ${APP_BASE_URL}/api/oauth/strava/start?user_id=daniel`);
});

function readTokenStore() {
  try {
    if (!fs.existsSync(TOKEN_FILE)) return {};
    const raw = fs.readFileSync(TOKEN_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeTokenStore(store) {
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(store, null, 2));
}

function readActivityStore() {
  try {
    if (!fs.existsSync(ACTIVITY_FILE)) return {};
    const raw = fs.readFileSync(ACTIVITY_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeActivityStore(store) {
  fs.writeFileSync(ACTIVITY_FILE, JSON.stringify(store, null, 2));
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function json(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...corsHeaders(),
  });
  res.end(JSON.stringify(body, null, 2));
}

function html(res, status, body) {
  res.writeHead(status, { "Content-Type": "text/html; charset=utf-8", ...corsHeaders() });
  res.end(body);
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function corsPreflight(res) {
  res.writeHead(204, {
    ...corsHeaders(),
    "Cache-Control": "no-store",
  });
  res.end();
}

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const out = {};
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.trim().startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) out[key] = value;
  }
  return out;
}

function signState(payload) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", OAUTH_STATE_SECRET).update(encoded).digest("base64url");
  return `${encoded}.${sig}`;
}

function verifyState(value) {
  const [encoded, sig] = String(value || "").split(".");
  if (!encoded || !sig) return { ok: false };
  const expected = crypto.createHmac("sha256", OAUTH_STATE_SECRET).update(encoded).digest("base64url");
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return { ok: false };
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return { ok: false };
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    return { ok: true, payload };
  } catch {
    return { ok: false };
  }
}

function successHtml(title, message) {
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <style>
    body{background:#070809;color:#f2f4f7;font-family:Inter,system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0}
    .card{width:min(560px,calc(100vw - 24px));border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02);border-radius:14px;padding:18px}
    h1{margin:0 0 8px;font-size:20px}
    p{margin:0;color:rgba(255,255,255,.72);line-height:1.4}
  </style>
</head>
<body>
  <div class="card">
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(message)}</p>
  </div>
</body>
</html>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function ensureValidToken(userId, store) {
  const item = store?.[userId];
  if (!item?.access_token) return null;
  const nowSec = Math.floor(Date.now() / 1000);
  if (Number(item.expires_at || 0) > nowSec + 60) return item;
  const refreshed = await refreshStoreToken(userId, store);
  if (!refreshed.ok) return null;
  return refreshed.item;
}

async function refreshStoreToken(userId, store) {
  const item = store?.[userId];
  if (!item?.refresh_token) return { ok: false, details: { error: "No refresh token" } };
  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET) return { ok: false, details: { error: "Missing STRAVA client credentials in .env" } };

  const tokenRes = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: item.refresh_token,
    }),
  });
  const tokenJson = await tokenRes.json().catch(() => ({}));
  if (!tokenRes.ok) return { ok: false, status: tokenRes.status, details: tokenJson };

  store[userId] = {
    ...item,
    access_token: tokenJson.access_token,
    refresh_token: tokenJson.refresh_token || item.refresh_token,
    expires_at: tokenJson.expires_at,
    scope: tokenJson.scope || item.scope,
    token_type: tokenJson.token_type || item.token_type,
    refreshedAt: new Date().toISOString(),
  };
  writeTokenStore(store);
  return { ok: true, item: store[userId] };
}

async function fetchAthleteActivitiesPage({ token, page, perPage, after = null, before = null }) {
  const activitiesUrl = new URL("https://www.strava.com/api/v3/athlete/activities");
  activitiesUrl.searchParams.set("page", String(page));
  activitiesUrl.searchParams.set("per_page", String(perPage));
  if (Number.isFinite(after) && after > 0) activitiesUrl.searchParams.set("after", String(after));
  if (Number.isFinite(before) && before > 0) activitiesUrl.searchParams.set("before", String(before));

  const activitiesRes = await fetch(activitiesUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const details = await activitiesRes.json().catch(() => ({}));
  if (!activitiesRes.ok) {
    return { ok: false, status: activitiesRes.status, details };
  }
  if (!Array.isArray(details)) {
    return { ok: false, status: 502, details: { error: "Unexpected Strava response shape" } };
  }
  return { ok: true, status: 200, activities: details };
}

function normalizeStravaActivity(activity) {
  if (!activity || typeof activity !== "object") return activity;
  return {
    id: Number(activity.id) || activity.id,
    name: activity.name || "",
    sport_type: activity.sport_type || activity.type || "Workout",
    type: activity.type || activity.sport_type || "Workout",
    distance_m: Number(activity.distance) || 0,
    moving_time_s: Number(activity.moving_time) || 0,
    elapsed_time_s: Number(activity.elapsed_time) || 0,
    total_elevation_gain_m: Number(activity.total_elevation_gain) || 0,
    average_speed_mps: Number(activity.average_speed) || 0,
    max_speed_mps: Number(activity.max_speed) || 0,
    average_heartrate: Number(activity.average_heartrate) || null,
    max_heartrate: Number(activity.max_heartrate) || null,
    suffer_score: Number(activity.suffer_score) || null,
    kudos_count: Number(activity.kudos_count) || 0,
    achievement_count: Number(activity.achievement_count) || 0,
    trainer: Boolean(activity.trainer),
    commute: Boolean(activity.commute),
    start_date: activity.start_date || null,
    start_date_local: activity.start_date_local || null,
    timezone: activity.timezone || null,
    raw: activity,
    imported_at: new Date().toISOString(),
  };
}

function clampNumber(value, min, max, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, Math.floor(n)));
}
