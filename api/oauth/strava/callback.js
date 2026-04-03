import crypto from "node:crypto";

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID || "";
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET || "";
const STATE_SECRET = process.env.OAUTH_STATE_SECRET || "aimrunna-state-secret";
const SUPABASE_URL = process.env.SUPABASE_URL || "https://tpnfkumkvxnrurjuaxdq.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const FRONTEND_URL = process.env.FRONTEND_URL || "https://aimrunna.vercel.app";

function verifyState(state) {
  const [data, sig] = (state || "").split(".");
  if (!data || !sig) return { ok: false };
  const expected = crypto.createHmac("sha256", STATE_SECRET).update(data).digest("base64url");
  if (sig !== expected) return { ok: false };
  try {
    return { ok: true, payload: JSON.parse(Buffer.from(data, "base64url").toString()) };
  } catch {
    return { ok: false };
  }
}

async function supabaseUpsert(userId, tokenData) {
  const body = {
    user_id: userId,
    provider: "strava",
    connected: true,
    provider_user_id: String(tokenData.athlete?.id || ""),
    athlete_data: tokenData.athlete || {},
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
    expires_at: tokenData.expires_at,
    scope: tokenData.scope || "",
    last_status_at: new Date().toISOString(),
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/integrations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify(body),
  });

  return res.ok;
}

export default async function handler(req, res) {
  const url = new URL(req.url, `https://${req.headers.host}`);

  const error = url.searchParams.get("error");
  if (error) {
    return res.status(400).json({ ok: false, error, message: url.searchParams.get("error_description") });
  }

  const code = url.searchParams.get("code") || "";
  const state = url.searchParams.get("state") || "";
  if (!code || !state) return res.status(400).json({ ok: false, error: "Missing code/state" });

  const stateData = verifyState(state);
  if (!stateData.ok) return res.status(400).json({ ok: false, error: "Invalid state" });
  const userId = stateData.payload.userId;

  const redirectUri = `https://${req.headers.host}/api/oauth/strava/callback`;

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
    return res.status(400).json({ ok: false, error: "Token exchange failed", details: tokenJson });
  }

  await supabaseUpsert(userId, tokenJson);

  const redirect = new URL(FRONTEND_URL);
  redirect.searchParams.set("oauth", "strava");
  redirect.searchParams.set("status", "connected");
  redirect.searchParams.set("user_id", userId);
  res.writeHead(302, { Location: redirect.toString() });
  res.end();
}
