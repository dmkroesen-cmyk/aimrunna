import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { URL, fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(ROOT, "data");
const TOKEN_FILE = path.join(DATA_DIR, "strava_tokens.dev.json");
const ACTIVITY_FILE = path.join(DATA_DIR, "strava_activities.dev.json");
const GARMIN_TOKEN_FILE = path.join(DATA_DIR, "garmin_tokens.dev.json");
const GARMIN_ACTIVITY_FILE = path.join(DATA_DIR, "garmin_activities.dev.json");
const WHOOP_TOKEN_FILE = path.join(DATA_DIR, "whoop_tokens.dev.json");
const WHOOP_ACTIVITY_FILE = path.join(DATA_DIR, "whoop_activities.dev.json");
const env = loadEnv(path.join(ROOT, ".env"));

const PORT = Number(env.PORT || 8787);
const APP_BASE_URL = env.APP_BASE_URL || `http://localhost:${PORT}`;
const FRONTEND_URL = env.FRONTEND_URL || "";
const STRAVA_CLIENT_ID = env.STRAVA_CLIENT_ID || "";
const STRAVA_CLIENT_SECRET = env.STRAVA_CLIENT_SECRET || "";
const STRAVA_REDIRECT_URI = env.STRAVA_REDIRECT_URI || `${APP_BASE_URL}/api/oauth/strava/callback`;
const STRAVA_SCOPES = env.STRAVA_SCOPES || "read,activity:read_all";
const OAUTH_STATE_SECRET = env.OAUTH_STATE_SECRET || "dev-secret-change-me";

// Garmin OAuth 1.0a
const GARMIN_CONSUMER_KEY = env.GARMIN_CONSUMER_KEY || "";
const GARMIN_CONSUMER_SECRET = env.GARMIN_CONSUMER_SECRET || "";
const GARMIN_REDIRECT_URI = env.GARMIN_REDIRECT_URI || `${APP_BASE_URL}/api/oauth/garmin/callback`;
const GARMIN_REQUEST_TOKEN_URL = "https://connectapi.garmin.com/oauth-service/oauth/request_token";
const GARMIN_AUTHORIZE_URL = "https://connect.garmin.com/oauthConfirm";
const GARMIN_ACCESS_TOKEN_URL = "https://connectapi.garmin.com/oauth-service/oauth/access_token";
const GARMIN_API_BASE = "https://apis.garmin.com";

// WHOOP OAuth 2.0
const WHOOP_CLIENT_ID = env.WHOOP_CLIENT_ID || "";
const WHOOP_CLIENT_SECRET = env.WHOOP_CLIENT_SECRET || "";
const WHOOP_REDIRECT_URI = env.WHOOP_REDIRECT_URI || `${APP_BASE_URL}/api/oauth/whoop/callback`;
const WHOOP_AUTHORIZE_URL = "https://api.prod.whoop.com/oauth/oauth2/auth";
const WHOOP_TOKEN_URL = "https://api.prod.whoop.com/oauth/oauth2/token";
const WHOOP_API_BASE = "https://api.prod.whoop.com/developer/v1";
const WHOOP_SCOPES = env.WHOOP_SCOPES || "read:recovery read:cycles read:workout read:sleep read:profile read:body_measurement";

// In-memory store for Garmin OAuth 1.0a request tokens (short-lived, per-flow)
const garminRequestTokens = new Map();

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

    // ─── GARMIN OAuth 1.0a ───────────────────────────────────────────

    if (pathname === "/api/oauth/garmin/start" && req.method === "GET") {
      if (!GARMIN_CONSUMER_KEY || !GARMIN_CONSUMER_SECRET) {
        return json(res, 500, { ok: false, error: "Missing GARMIN_CONSUMER_KEY / GARMIN_CONSUMER_SECRET in .env" });
      }
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();

      // Step 1: Get a request token from Garmin
      const oauthParams = {
        oauth_consumer_key: GARMIN_CONSUMER_KEY,
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: String(Math.floor(Date.now() / 1000)),
        oauth_nonce: crypto.randomBytes(16).toString("hex"),
        oauth_version: "1.0",
        oauth_callback: GARMIN_REDIRECT_URI,
      };
      const signature = buildOAuth1Signature("POST", GARMIN_REQUEST_TOKEN_URL, oauthParams, GARMIN_CONSUMER_SECRET, "");
      oauthParams.oauth_signature = signature;

      try {
        const reqTokenRes = await fetch(GARMIN_REQUEST_TOKEN_URL, {
          method: "POST",
          headers: { Authorization: buildOAuth1Header(oauthParams) },
        });
        const reqTokenBody = await reqTokenRes.text();
        if (!reqTokenRes.ok) {
          return json(res, 400, { ok: false, error: "Garmin request token failed", details: reqTokenBody });
        }
        const parsed = new URLSearchParams(reqTokenBody);
        const oauthToken = parsed.get("oauth_token") || "";
        const oauthTokenSecret = parsed.get("oauth_token_secret") || "";
        if (!oauthToken) {
          return json(res, 400, { ok: false, error: "No oauth_token in Garmin response" });
        }

        // Store the request token secret temporarily (needed for access token exchange)
        garminRequestTokens.set(oauthToken, { oauthTokenSecret, userId, ts: Date.now() });
        // Clean up old entries (> 10 min)
        for (const [key, val] of garminRequestTokens) {
          if (Date.now() - val.ts > 600_000) garminRequestTokens.delete(key);
        }

        const authorizeUrl = new URL(GARMIN_AUTHORIZE_URL);
        authorizeUrl.searchParams.set("oauth_token", oauthToken);
        res.writeHead(302, { Location: authorizeUrl.toString() });
        return res.end();
      } catch (err) {
        return json(res, 500, { ok: false, error: "Garmin request token error", details: String(err?.message || err) });
      }
    }

    if (pathname === "/api/oauth/garmin/callback" && req.method === "GET") {
      const oauthToken = String(url.searchParams.get("oauth_token") || "");
      const oauthVerifier = String(url.searchParams.get("oauth_verifier") || "");
      if (!oauthToken || !oauthVerifier) {
        return json(res, 400, { ok: false, error: "Missing oauth_token or oauth_verifier" });
      }

      const stored = garminRequestTokens.get(oauthToken);
      if (!stored) {
        return json(res, 400, { ok: false, error: "Unknown or expired request token" });
      }
      garminRequestTokens.delete(oauthToken);
      const { oauthTokenSecret, userId } = stored;

      // Step 3: Exchange for access token
      const oauthParams = {
        oauth_consumer_key: GARMIN_CONSUMER_KEY,
        oauth_token: oauthToken,
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: String(Math.floor(Date.now() / 1000)),
        oauth_nonce: crypto.randomBytes(16).toString("hex"),
        oauth_version: "1.0",
        oauth_verifier: oauthVerifier,
      };
      const signature = buildOAuth1Signature("POST", GARMIN_ACCESS_TOKEN_URL, oauthParams, GARMIN_CONSUMER_SECRET, oauthTokenSecret);
      oauthParams.oauth_signature = signature;

      try {
        const accessRes = await fetch(GARMIN_ACCESS_TOKEN_URL, {
          method: "POST",
          headers: { Authorization: buildOAuth1Header(oauthParams) },
        });
        const accessBody = await accessRes.text();
        if (!accessRes.ok) {
          return json(res, 400, { ok: false, error: "Garmin access token failed", details: accessBody });
        }
        const parsed = new URLSearchParams(accessBody);
        const accessToken = parsed.get("oauth_token") || "";
        const accessTokenSecret = parsed.get("oauth_token_secret") || "";
        if (!accessToken) {
          return json(res, 400, { ok: false, error: "No access token in Garmin response" });
        }

        const store = readGarminTokenStore();
        store[userId] = {
          provider: "garmin",
          userId,
          connectedAt: new Date().toISOString(),
          oauth_token: accessToken,
          oauth_token_secret: accessTokenSecret,
        };
        writeGarminTokenStore(store);

        if (FRONTEND_URL) {
          const redirect = new URL(FRONTEND_URL);
          redirect.searchParams.set("oauth", "garmin");
          redirect.searchParams.set("status", "connected");
          redirect.searchParams.set("user_id", userId);
          res.writeHead(302, { Location: redirect.toString() });
          return res.end();
        }

        return html(res, 200, successHtml("Garmin verbunden", `User: ${escapeHtml(userId)} · Garmin-Tokens lokal gespeichert (Dev-MVP)`));
      } catch (err) {
        return json(res, 500, { ok: false, error: "Garmin access token error", details: String(err?.message || err) });
      }
    }

    if (pathname === "/api/oauth/garmin/status" && req.method === "GET") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const store = readGarminTokenStore();
      const item = store[userId];
      if (!item) return json(res, 404, { ok: false, connected: false, error: "No Garmin token for user_id" });
      return json(res, 200, {
        ok: true,
        connected: true,
        userId,
        connectedAt: item.connectedAt || null,
      });
    }

    if (pathname === "/api/oauth/garmin/activities" && req.method === "GET") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const startDate = url.searchParams.get("start") || new Date(Date.now() - 30 * 86400_000).toISOString().slice(0, 10);
      const endDate = url.searchParams.get("end") || new Date().toISOString().slice(0, 10);

      const store = readGarminTokenStore();
      const item = store[userId];
      if (!item?.oauth_token) return json(res, 404, { ok: false, error: "No Garmin token for user_id" });

      try {
        const apiUrl = `${GARMIN_API_BASE}/wellness-api/rest/activities?uploadStartTimeInSeconds=${Math.floor(new Date(startDate).getTime() / 1000)}&uploadEndTimeInSeconds=${Math.floor(new Date(endDate).getTime() / 1000)}`;
        const apiRes = await garminApiFetch("GET", apiUrl, item.oauth_token, item.oauth_token_secret);
        const apiJson = await apiRes.json().catch(() => ({}));
        if (!apiRes.ok) return json(res, apiRes.status, { ok: false, error: "Garmin API error", details: apiJson });
        return json(res, 200, { ok: true, userId, activities: Array.isArray(apiJson) ? apiJson : [] });
      } catch (err) {
        return json(res, 500, { ok: false, error: "Garmin API fetch error", details: String(err?.message || err) });
      }
    }

    if (pathname === "/api/oauth/garmin/health" && req.method === "GET") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const dataType = url.searchParams.get("type") || "dailies"; // dailies, epochs, sleeps, bodyComps, stressDetails, userMetrics, pulseOx, respiration, hrv
      const startDate = url.searchParams.get("start") || new Date(Date.now() - 7 * 86400_000).toISOString().slice(0, 10);
      const endDate = url.searchParams.get("end") || new Date().toISOString().slice(0, 10);

      const store = readGarminTokenStore();
      const item = store[userId];
      if (!item?.oauth_token) return json(res, 404, { ok: false, error: "No Garmin token for user_id" });

      const typeEndpoints = {
        dailies: "/wellness-api/rest/dailies",
        epochs: "/wellness-api/rest/epochs",
        sleeps: "/wellness-api/rest/sleeps",
        bodyComps: "/wellness-api/rest/bodyComps",
        stressDetails: "/wellness-api/rest/stressDetails",
        userMetrics: "/wellness-api/rest/userMetrics",
        pulseOx: "/wellness-api/rest/pulseOx",
        respiration: "/wellness-api/rest/respiration",
        hrv: "/wellness-api/rest/hrv",
      };
      const endpoint = typeEndpoints[dataType];
      if (!endpoint) return json(res, 400, { ok: false, error: `Unknown health type: ${dataType}. Valid: ${Object.keys(typeEndpoints).join(", ")}` });

      try {
        const apiUrl = `${GARMIN_API_BASE}${endpoint}?uploadStartTimeInSeconds=${Math.floor(new Date(startDate).getTime() / 1000)}&uploadEndTimeInSeconds=${Math.floor(new Date(endDate).getTime() / 1000)}`;
        const apiRes = await garminApiFetch("GET", apiUrl, item.oauth_token, item.oauth_token_secret);
        const apiJson = await apiRes.json().catch(() => ({}));
        if (!apiRes.ok) return json(res, apiRes.status, { ok: false, error: "Garmin health API error", details: apiJson });
        return json(res, 200, { ok: true, userId, dataType, data: Array.isArray(apiJson) ? apiJson : apiJson });
      } catch (err) {
        return json(res, 500, { ok: false, error: "Garmin health fetch error", details: String(err?.message || err) });
      }
    }

    if (pathname === "/api/oauth/garmin/import-history" && req.method === "POST") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const daysBack = clampNumber(url.searchParams.get("days"), 1, 730, 90);

      const tokenStore = readGarminTokenStore();
      const item = tokenStore[userId];
      if (!item?.oauth_token) return json(res, 404, { ok: false, error: "No Garmin token for user_id" });

      const activityStore = readGarminActivityStore();
      const existing = activityStore[userId] || { activities: [], summary: null };
      const existingById = new Map(
        (existing.activities || [])
          .filter((row) => row && row.activityId)
          .map((row) => [String(row.activityId), row])
      );

      const startSec = Math.floor((Date.now() - daysBack * 86400_000) / 1000);
      const endSec = Math.floor(Date.now() / 1000);

      try {
        const apiUrl = `${GARMIN_API_BASE}/wellness-api/rest/activities?uploadStartTimeInSeconds=${startSec}&uploadEndTimeInSeconds=${endSec}`;
        const apiRes = await garminApiFetch("GET", apiUrl, item.oauth_token, item.oauth_token_secret);
        const apiJson = await apiRes.json().catch(() => []);
        if (!apiRes.ok) return json(res, apiRes.status, { ok: false, error: "Garmin import failed", details: apiJson });

        const activities = Array.isArray(apiJson) ? apiJson : [];
        let imported = 0;
        let updated = 0;
        for (const activity of activities) {
          const key = String(activity.activityId || activity.summaryId || "");
          if (!key) continue;
          if (!existingById.has(key)) imported++;
          else updated++;
          existingById.set(key, normalizeGarminActivity(activity));
        }

        const merged = Array.from(existingById.values())
          .sort((a, b) => (b.startTimeInSeconds || 0) - (a.startTimeInSeconds || 0));
        const nowIso = new Date().toISOString();
        activityStore[userId] = {
          activities: merged,
          summary: { userId, imported, updated, fetched: activities.length, totalStored: merged.length, daysBack, importedAt: nowIso },
        };
        writeGarminActivityStore(activityStore);

        return json(res, 200, { ok: true, userId, imported, updated, fetched: activities.length, totalStored: merged.length, importedAt: nowIso });
      } catch (err) {
        return json(res, 500, { ok: false, error: "Garmin import error", details: String(err?.message || err) });
      }
    }

    if (pathname === "/api/oauth/garmin/import-summary" && req.method === "GET") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const activityStore = readGarminActivityStore();
      const item = activityStore[userId];
      return json(res, 200, {
        ok: true,
        userId,
        summary: item?.summary || null,
        totalStored: Array.isArray(item?.activities) ? item.activities.length : 0,
      });
    }

    if (pathname === "/api/oauth/garmin/disconnect" && req.method === "POST") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const store = readGarminTokenStore();
      delete store[userId];
      writeGarminTokenStore(store);
      return json(res, 200, { ok: true, userId, message: "Garmin disconnected" });
    }

    // ─── WHOOP OAuth 2.0 ──────────────────────────────────────────

    if (pathname === "/api/oauth/whoop/start" && req.method === "GET") {
      if (!WHOOP_CLIENT_ID) {
        return json(res, 500, { ok: false, error: "Missing WHOOP_CLIENT_ID in .env" });
      }
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const state = signState({ userId, ts: Date.now(), provider: "whoop" });
      const authorizeUrl = new URL(WHOOP_AUTHORIZE_URL);
      authorizeUrl.searchParams.set("client_id", WHOOP_CLIENT_ID);
      authorizeUrl.searchParams.set("redirect_uri", WHOOP_REDIRECT_URI);
      authorizeUrl.searchParams.set("response_type", "code");
      authorizeUrl.searchParams.set("scope", WHOOP_SCOPES);
      authorizeUrl.searchParams.set("state", state);
      res.writeHead(302, { Location: authorizeUrl.toString() });
      return res.end();
    }

    if (pathname === "/api/oauth/whoop/callback" && req.method === "GET") {
      const error = url.searchParams.get("error");
      if (error) return json(res, 400, { ok: false, error, message: url.searchParams.get("error_description") || "WHOOP OAuth error" });

      const code = String(url.searchParams.get("code") || "");
      const state = String(url.searchParams.get("state") || "");
      if (!code || !state) return json(res, 400, { ok: false, error: "Missing code/state" });

      const stateData = verifyState(state);
      if (!stateData.ok) return json(res, 400, { ok: false, error: "Invalid state" });
      const userId = stateData.payload.userId;

      if (!WHOOP_CLIENT_ID || !WHOOP_CLIENT_SECRET) {
        return json(res, 500, { ok: false, error: "Missing WHOOP client credentials in .env" });
      }

      const tokenRes = await fetch(WHOOP_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: WHOOP_CLIENT_ID,
          client_secret: WHOOP_CLIENT_SECRET,
          code,
          grant_type: "authorization_code",
          redirect_uri: WHOOP_REDIRECT_URI,
        }),
      });

      const tokenJson = await tokenRes.json().catch(() => ({}));
      if (!tokenRes.ok) {
        return json(res, 400, { ok: false, error: "WHOOP token exchange failed", details: tokenJson });
      }

      // Fetch profile after successful auth
      let profile = null;
      try {
        const profileRes = await fetch(`${WHOOP_API_BASE}/user/profile/basic`, {
          headers: { Authorization: `Bearer ${tokenJson.access_token}` },
        });
        if (profileRes.ok) profile = await profileRes.json();
      } catch { /* noop */ }

      const store = readWhoopTokenStore();
      store[userId] = {
        provider: "whoop",
        userId,
        connectedAt: new Date().toISOString(),
        profile: profile || null,
        access_token: tokenJson.access_token,
        refresh_token: tokenJson.refresh_token,
        expires_at: tokenJson.expires_in ? Math.floor(Date.now() / 1000) + Number(tokenJson.expires_in) : null,
        scope: tokenJson.scope || WHOOP_SCOPES,
        token_type: tokenJson.token_type || "Bearer",
      };
      writeWhoopTokenStore(store);

      if (FRONTEND_URL) {
        const redirect = new URL(FRONTEND_URL);
        redirect.searchParams.set("oauth", "whoop");
        redirect.searchParams.set("status", "connected");
        redirect.searchParams.set("user_id", userId);
        res.writeHead(302, { Location: redirect.toString() });
        return res.end();
      }

      return html(res, 200, successHtml("WHOOP verbunden", `User: ${escapeHtml(userId)} · WHOOP-Tokens lokal gespeichert (Dev-MVP)`));
    }

    if (pathname === "/api/oauth/whoop/status" && req.method === "GET") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const store = readWhoopTokenStore();
      const item = store[userId];
      if (!item) return json(res, 404, { ok: false, connected: false, error: "No WHOOP token for user_id" });
      return json(res, 200, {
        ok: true,
        connected: true,
        userId,
        profile: item.profile || null,
        expires_at: item.expires_at,
        expires_in_sec: Math.max(0, Number(item.expires_at || 0) - Math.floor(Date.now() / 1000)),
        scope: item.scope,
      });
    }

    if (pathname === "/api/oauth/whoop/refresh" && req.method === "POST") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const store = readWhoopTokenStore();
      const item = store[userId];
      if (!item?.refresh_token) return json(res, 404, { ok: false, error: "No WHOOP refresh token for user_id" });

      const tokenRes = await fetch(WHOOP_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: WHOOP_CLIENT_ID,
          client_secret: WHOOP_CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: item.refresh_token,
        }),
      });
      const tokenJson = await tokenRes.json().catch(() => ({}));
      if (!tokenRes.ok) return json(res, 400, { ok: false, error: "WHOOP refresh failed", details: tokenJson });

      store[userId] = {
        ...item,
        access_token: tokenJson.access_token,
        refresh_token: tokenJson.refresh_token || item.refresh_token,
        expires_at: tokenJson.expires_in ? Math.floor(Date.now() / 1000) + Number(tokenJson.expires_in) : item.expires_at,
        scope: tokenJson.scope || item.scope,
        token_type: tokenJson.token_type || item.token_type,
        refreshedAt: new Date().toISOString(),
      };
      writeWhoopTokenStore(store);
      return json(res, 200, { ok: true, userId, expires_at: store[userId].expires_at });
    }

    if (pathname === "/api/oauth/whoop/profile" && req.method === "GET") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const store = readWhoopTokenStore();
      const item = await ensureValidWhoopToken(userId, store);
      if (!item?.access_token) return json(res, 404, { ok: false, error: "No WHOOP access token for user_id" });

      const profileRes = await fetch(`${WHOOP_API_BASE}/user/profile/basic`, {
        headers: { Authorization: `Bearer ${item.access_token}` },
      });
      const profileJson = await profileRes.json().catch(() => ({}));
      if (!profileRes.ok) return json(res, profileRes.status, { ok: false, error: "WHOOP profile fetch failed", details: profileJson });
      return json(res, 200, { ok: true, profile: profileJson });
    }

    if (pathname === "/api/oauth/whoop/recovery" && req.method === "GET") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const limit = clampNumber(url.searchParams.get("limit"), 1, 100, 25);
      const nextToken = url.searchParams.get("next_token") || "";
      const store = readWhoopTokenStore();
      const item = await ensureValidWhoopToken(userId, store);
      if (!item?.access_token) return json(res, 404, { ok: false, error: "No WHOOP access token" });

      const apiUrl = new URL(`${WHOOP_API_BASE}/recovery`);
      apiUrl.searchParams.set("limit", String(limit));
      if (nextToken) apiUrl.searchParams.set("nextToken", nextToken);

      const apiRes = await fetch(apiUrl, { headers: { Authorization: `Bearer ${item.access_token}` } });
      const apiJson = await apiRes.json().catch(() => ({}));
      if (!apiRes.ok) return json(res, apiRes.status, { ok: false, error: "WHOOP recovery fetch failed", details: apiJson });
      return json(res, 200, { ok: true, userId, ...apiJson });
    }

    if (pathname === "/api/oauth/whoop/cycles" && req.method === "GET") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const limit = clampNumber(url.searchParams.get("limit"), 1, 100, 25);
      const nextToken = url.searchParams.get("next_token") || "";
      const store = readWhoopTokenStore();
      const item = await ensureValidWhoopToken(userId, store);
      if (!item?.access_token) return json(res, 404, { ok: false, error: "No WHOOP access token" });

      const apiUrl = new URL(`${WHOOP_API_BASE}/cycle`);
      apiUrl.searchParams.set("limit", String(limit));
      if (nextToken) apiUrl.searchParams.set("nextToken", nextToken);

      const apiRes = await fetch(apiUrl, { headers: { Authorization: `Bearer ${item.access_token}` } });
      const apiJson = await apiRes.json().catch(() => ({}));
      if (!apiRes.ok) return json(res, apiRes.status, { ok: false, error: "WHOOP cycles fetch failed", details: apiJson });
      return json(res, 200, { ok: true, userId, ...apiJson });
    }

    if (pathname === "/api/oauth/whoop/sleep" && req.method === "GET") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const limit = clampNumber(url.searchParams.get("limit"), 1, 100, 25);
      const nextToken = url.searchParams.get("next_token") || "";
      const store = readWhoopTokenStore();
      const item = await ensureValidWhoopToken(userId, store);
      if (!item?.access_token) return json(res, 404, { ok: false, error: "No WHOOP access token" });

      const apiUrl = new URL(`${WHOOP_API_BASE}/activity/sleep`);
      apiUrl.searchParams.set("limit", String(limit));
      if (nextToken) apiUrl.searchParams.set("nextToken", nextToken);

      const apiRes = await fetch(apiUrl, { headers: { Authorization: `Bearer ${item.access_token}` } });
      const apiJson = await apiRes.json().catch(() => ({}));
      if (!apiRes.ok) return json(res, apiRes.status, { ok: false, error: "WHOOP sleep fetch failed", details: apiJson });
      return json(res, 200, { ok: true, userId, ...apiJson });
    }

    if (pathname === "/api/oauth/whoop/workouts" && req.method === "GET") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const limit = clampNumber(url.searchParams.get("limit"), 1, 100, 25);
      const nextToken = url.searchParams.get("next_token") || "";
      const store = readWhoopTokenStore();
      const item = await ensureValidWhoopToken(userId, store);
      if (!item?.access_token) return json(res, 404, { ok: false, error: "No WHOOP access token" });

      const apiUrl = new URL(`${WHOOP_API_BASE}/activity/workout`);
      apiUrl.searchParams.set("limit", String(limit));
      if (nextToken) apiUrl.searchParams.set("nextToken", nextToken);

      const apiRes = await fetch(apiUrl, { headers: { Authorization: `Bearer ${item.access_token}` } });
      const apiJson = await apiRes.json().catch(() => ({}));
      if (!apiRes.ok) return json(res, apiRes.status, { ok: false, error: "WHOOP workouts fetch failed", details: apiJson });
      return json(res, 200, { ok: true, userId, ...apiJson });
    }

    if (pathname === "/api/oauth/whoop/body-measurement" && req.method === "GET") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const limit = clampNumber(url.searchParams.get("limit"), 1, 100, 25);
      const nextToken = url.searchParams.get("next_token") || "";
      const store = readWhoopTokenStore();
      const item = await ensureValidWhoopToken(userId, store);
      if (!item?.access_token) return json(res, 404, { ok: false, error: "No WHOOP access token" });

      const apiUrl = new URL(`${WHOOP_API_BASE}/body_measurement`);
      apiUrl.searchParams.set("limit", String(limit));
      if (nextToken) apiUrl.searchParams.set("nextToken", nextToken);

      const apiRes = await fetch(apiUrl, { headers: { Authorization: `Bearer ${item.access_token}` } });
      const apiJson = await apiRes.json().catch(() => ({}));
      if (!apiRes.ok) return json(res, apiRes.status, { ok: false, error: "WHOOP body measurement fetch failed", details: apiJson });
      return json(res, 200, { ok: true, userId, ...apiJson });
    }

    if (pathname === "/api/oauth/whoop/import-history" && req.method === "POST") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const store = readWhoopTokenStore();
      const tokenItem = await ensureValidWhoopToken(userId, store);
      if (!tokenItem?.access_token) return json(res, 404, { ok: false, error: "No WHOOP token for user_id" });

      const activityStore = readWhoopActivityStore();
      const existing = activityStore[userId] || { workouts: [], recovery: [], sleep: [], summary: null };

      try {
        // Fetch workouts
        const workoutsRes = await fetch(`${WHOOP_API_BASE}/activity/workout?limit=100`, {
          headers: { Authorization: `Bearer ${tokenItem.access_token}` },
        });
        const workoutsJson = workoutsRes.ok ? await workoutsRes.json().catch(() => ({})) : {};
        const workouts = Array.isArray(workoutsJson.records) ? workoutsJson.records : [];

        // Fetch recovery
        const recoveryRes = await fetch(`${WHOOP_API_BASE}/recovery?limit=100`, {
          headers: { Authorization: `Bearer ${tokenItem.access_token}` },
        });
        const recoveryJson = recoveryRes.ok ? await recoveryRes.json().catch(() => ({})) : {};
        const recovery = Array.isArray(recoveryJson.records) ? recoveryJson.records : [];

        // Fetch sleep
        const sleepRes = await fetch(`${WHOOP_API_BASE}/activity/sleep?limit=100`, {
          headers: { Authorization: `Bearer ${tokenItem.access_token}` },
        });
        const sleepJson = sleepRes.ok ? await sleepRes.json().catch(() => ({})) : {};
        const sleepData = Array.isArray(sleepJson.records) ? sleepJson.records : [];

        const nowIso = new Date().toISOString();
        activityStore[userId] = {
          workouts: workouts.map(normalizeWhoopWorkout),
          recovery,
          sleep: sleepData,
          summary: {
            userId,
            workoutCount: workouts.length,
            recoveryCount: recovery.length,
            sleepCount: sleepData.length,
            importedAt: nowIso,
          },
        };
        writeWhoopActivityStore(activityStore);

        return json(res, 200, {
          ok: true,
          userId,
          workoutCount: workouts.length,
          recoveryCount: recovery.length,
          sleepCount: sleepData.length,
          importedAt: nowIso,
        });
      } catch (err) {
        return json(res, 500, { ok: false, error: "WHOOP import error", details: String(err?.message || err) });
      }
    }

    if (pathname === "/api/oauth/whoop/import-summary" && req.method === "GET") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const activityStore = readWhoopActivityStore();
      const item = activityStore[userId];
      return json(res, 200, {
        ok: true,
        userId,
        summary: item?.summary || null,
        workoutCount: Array.isArray(item?.workouts) ? item.workouts.length : 0,
        recoveryCount: Array.isArray(item?.recovery) ? item.recovery.length : 0,
        sleepCount: Array.isArray(item?.sleep) ? item.sleep.length : 0,
      });
    }

    if (pathname === "/api/oauth/whoop/disconnect" && req.method === "POST") {
      const userId = String(url.searchParams.get("user_id") || "local-user").trim();
      const store = readWhoopTokenStore();
      delete store[userId];
      writeWhoopTokenStore(store);
      return json(res, 200, { ok: true, userId, message: "WHOOP disconnected" });
    }

    return json(res, 404, { ok: false, error: "Not found" });
  } catch (error) {
    return json(res, 500, { ok: false, error: "Server error", details: String(error?.message || error) });
  }
});

server.listen(PORT, () => {
  console.log(`[AImRUNNA] OAuth dev server listening on ${APP_BASE_URL}`);
  console.log(`[AImRUNNA] Strava OAuth:  ${APP_BASE_URL}/api/oauth/strava/start?user_id=daniel`);
  console.log(`[AImRUNNA] Garmin OAuth:  ${APP_BASE_URL}/api/oauth/garmin/start?user_id=daniel`);
  console.log(`[AImRUNNA] WHOOP OAuth:   ${APP_BASE_URL}/api/oauth/whoop/start?user_id=daniel`);
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
    average_watts: Number(activity.average_watts) || null,
    max_watts: Number(activity.max_watts) || null,
    weighted_average_watts: Number(activity.weighted_average_watts) || null,
    average_cadence: Number(activity.average_cadence) || null,
    kilojoules: Number(activity.kilojoules) || null,
    device_watts: Boolean(activity.device_watts),
    suffer_score: Number(activity.suffer_score) || null,
    kudos_count: Number(activity.kudos_count) || 0,
    achievement_count: Number(activity.achievement_count) || 0,
    trainer: Boolean(activity.trainer),
    commute: Boolean(activity.commute),
    start_date: activity.start_date || null,
    start_date_local: activity.start_date_local || null,
    timezone: activity.timezone || null,
    imported_at: new Date().toISOString(),
  };
}

function clampNumber(value, min, max, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, Math.floor(n)));
}
