const SUPABASE_URL = process.env.SUPABASE_URL || "https://tpnfkumkvxnrurjuaxdq.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID || "";
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET || "";

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function clamp(val, min, max, fallback) {
  const n = Number(val);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

async function getIntegration(userId) {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/integrations?user_id=eq.${userId}&provider=eq.strava&select=*`,
    {
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
    }
  );
  const data = await r.json();
  return data?.[0] || null;
}

async function updateTokens(userId, tokenData) {
  await fetch(
    `${SUPABASE_URL}/rest/v1/integrations?user_id=eq.${userId}&provider=eq.strava`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
      body: JSON.stringify({
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_at: tokenData.expires_at,
      }),
    }
  );
}

async function refreshToken(integration) {
  const r = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: integration.refresh_token,
    }),
  });
  if (!r.ok) return null;
  const data = await r.json();
  await updateTokens(integration.user_id, data);
  return data.access_token;
}

async function ensureToken(integration) {
  const now = Math.floor(Date.now() / 1000);
  if (integration.expires_at && integration.expires_at > now + 300) {
    return integration.access_token;
  }
  return await refreshToken(integration);
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const url = new URL(req.url, `https://${req.headers.host}`);
  const userId = url.searchParams.get("user_id");
  if (!userId) return res.status(400).json({ ok: false, error: "Missing user_id" });

  const page = clamp(url.searchParams.get("page"), 1, 5000, 1);
  const perPage = clamp(url.searchParams.get("per_page"), 1, 200, 50);
  const after = url.searchParams.get("after") ? clamp(url.searchParams.get("after"), 0, 4102444800, null) : null;
  const before = url.searchParams.get("before") ? clamp(url.searchParams.get("before"), 0, 4102444800, null) : null;

  const integration = await getIntegration(userId);
  if (!integration?.access_token) {
    return res.status(404).json({ ok: false, error: "No token for user_id" });
  }

  const token = await ensureToken(integration);
  if (!token) return res.status(401).json({ ok: false, error: "Token refresh failed" });

  const stravaUrl = new URL("https://www.strava.com/api/v3/athlete/activities");
  stravaUrl.searchParams.set("page", page);
  stravaUrl.searchParams.set("per_page", perPage);
  if (after) stravaUrl.searchParams.set("after", after);
  if (before) stravaUrl.searchParams.set("before", before);

  const stravaRes = await fetch(stravaUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const activities = await stravaRes.json();
  if (!stravaRes.ok) {
    return res.status(stravaRes.status).json({ ok: false, error: "Activities fetch failed", details: activities });
  }

  res.status(200).json({ ok: true, userId, page, perPage, count: activities.length, activities });
}
