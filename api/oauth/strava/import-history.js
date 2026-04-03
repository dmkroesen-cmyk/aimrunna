const SUPABASE_URL = process.env.SUPABASE_URL || "https://tpnfkumkvxnrurjuaxdq.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID || "";
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET || "";

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
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
    { headers: { apikey: SUPABASE_SERVICE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_KEY}` } }
  );
  const data = await r.json();
  return data?.[0] || null;
}

async function updateTokens(userId, tokenData) {
  await fetch(`${SUPABASE_URL}/rest/v1/integrations?user_id=eq.${userId}&provider=eq.strava`, {
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
  });
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

async function upsertActivitiesToSupabase(userId, activities) {
  const rows = activities.map((a) => ({
    user_id: userId,
    source: "strava",
    source_external_id: String(a.id),
    title: a.name || "",
    note: "",
    kind: "training",
    sport_type: a.type === "Run" ? "run" : a.type === "Ride" ? "bike" : a.type === "Swim" ? "swim" : "other",
    distance_km: +(a.distance / 1000).toFixed(2),
    moving_time_sec: a.moving_time || null,
    elevation_gain_m: a.total_elevation_gain || null,
    metrics: {
      avg_heartrate: a.average_heartrate || null,
      max_heartrate: a.max_heartrate || null,
      avg_watts: a.average_watts || null,
      max_watts: a.max_watts || null,
      weighted_avg_watts: a.weighted_average_watts || null,
      suffer_score: a.suffer_score || null,
      avg_cadence: a.average_cadence || null,
    },
    created_at: a.start_date || new Date().toISOString(),
  }));

  // Upsert in batches of 50
  for (let i = 0; i < rows.length; i += 50) {
    const batch = rows.slice(i, i + 50);
    await fetch(`${SUPABASE_URL}/rest/v1/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(batch),
    });
  }

  return rows.length;
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const url = new URL(req.url, `https://${req.headers.host}`);
  const userId = url.searchParams.get("user_id");
  if (!userId) return res.status(400).json({ ok: false, error: "Missing user_id" });

  const perPage = clamp(url.searchParams.get("per_page"), 1, 200, 200);
  const maxPages = clamp(url.searchParams.get("max_pages"), 1, 100, 50);

  const integration = await getIntegration(userId);
  if (!integration?.access_token) {
    return res.status(404).json({ ok: false, error: "No token for user_id" });
  }

  let token = await ensureToken(integration);
  if (!token) return res.status(401).json({ ok: false, error: "Token refresh failed" });

  let totalImported = 0;
  let page = 1;

  while (page <= maxPages) {
    const stravaUrl = new URL("https://www.strava.com/api/v3/athlete/activities");
    stravaUrl.searchParams.set("page", page);
    stravaUrl.searchParams.set("per_page", perPage);

    let stravaRes = await fetch(stravaUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (stravaRes.status === 401) {
      token = await refreshToken(integration);
      if (!token) return res.status(401).json({ ok: false, error: "Token expired during import", imported: totalImported });
      stravaRes = await fetch(stravaUrl, { headers: { Authorization: `Bearer ${token}` } });
    }

    if (!stravaRes.ok) {
      return res.status(stravaRes.status).json({ ok: false, error: "Strava API error", imported: totalImported, page });
    }

    const activities = await stravaRes.json();
    if (!activities.length) break;

    await upsertActivitiesToSupabase(userId, activities);
    totalImported += activities.length;
    page++;

    if (activities.length < perPage) break;
  }

  // Update import summary
  await fetch(`${SUPABASE_URL}/rest/v1/integrations?user_id=eq.${userId}&provider=eq.strava`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
    },
    body: JSON.stringify({
      last_import_at: new Date().toISOString(),
      import_summary: { total: totalImported, pages: page - 1, importedAt: new Date().toISOString() },
    }),
  });

  res.status(200).json({ ok: true, imported: totalImported, pages: page - 1 });
}
