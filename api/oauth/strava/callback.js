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

function redirectWithError(res, code, message, details) {
  const redirect = new URL(FRONTEND_URL);
  redirect.searchParams.set("oauth", "strava");
  redirect.searchParams.set("status", "error");
  redirect.searchParams.set("error_code", String(code || "unknown"));
  if (message) redirect.searchParams.set("error_message", String(message).slice(0, 240));
  if (details) redirect.searchParams.set("error_details", String(details).slice(0, 240));
  res.writeHead(302, { Location: redirect.toString() });
  res.end();
}

export default async function handler(req, res) {
  const url = new URL(req.url, `https://${req.headers.host}`);

  const error = url.searchParams.get("error");
  if (error) {
    // Strava returns e.g. ?error=access_denied or error=invalid_scope
    return redirectWithError(res, error, url.searchParams.get("error_description") || "Strava-Autorisierung abgebrochen");
  }

  const code = url.searchParams.get("code") || "";
  const state = url.searchParams.get("state") || "";
  if (!code || !state) return redirectWithError(res, "missing_code", "Autorisierungs-Code fehlt");

  const stateData = verifyState(state);
  if (!stateData.ok) return redirectWithError(res, "invalid_state", "State-Verifikation fehlgeschlagen");
  const userId = stateData.payload.userId;

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
    // Detect "limit of connected users" / single-athlete-mode errors
    const raw = JSON.stringify(tokenJson || {}).toLowerCase();
    let humanMsg = tokenJson?.message || "Token-Exchange fehlgeschlagen";
    let errCode = "token_exchange_failed";
    if (tokenRes.status === 403 || raw.includes("limit") || raw.includes("single athlete")) {
      errCode = "strava_app_limit";
      humanMsg = "Dieser Strava-App wurde das Verbinder-Limit überschritten (Single-Athlete-Mode). Admin muss die App auf 'unlimited' upgraden.";
    } else if (tokenRes.status === 429) {
      errCode = "strava_rate_limit";
      humanMsg = "Strava-Rate-Limit erreicht (1000/Tag oder 100/15min). Bitte später erneut versuchen.";
    }
    return redirectWithError(res, errCode, humanMsg, tokenJson?.errors?.[0]?.field || "");
  }

  const ok = await supabaseUpsert(userId, tokenJson);
  if (!ok) {
    return redirectWithError(res, "supabase_write_failed", "Integration konnte nicht gespeichert werden");
  }

  const redirect = new URL(FRONTEND_URL);
  redirect.searchParams.set("oauth", "strava");
  redirect.searchParams.set("status", "connected");
  redirect.searchParams.set("user_id", userId);
  res.writeHead(302, { Location: redirect.toString() });
  res.end();
}
