import crypto from "node:crypto";

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID || "";
const STRAVA_SCOPES = "read,activity:read_all,profile:read_all";
const STATE_SECRET = process.env.OAUTH_STATE_SECRET || "aimrunna-state-secret";

function signState(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", STATE_SECRET).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export default function handler(req, res) {
  if (!STRAVA_CLIENT_ID) {
    return res.status(500).json({ ok: false, error: "Missing STRAVA_CLIENT_ID" });
  }

  const url = new URL(req.url, `https://${req.headers.host}`);
  const userId = url.searchParams.get("user_id") || "anonymous";
  const redirectUri = `https://${req.headers.host}/api/oauth/strava/callback`;

  const state = signState({ userId, ts: Date.now() });

  const authorizeUrl = new URL("https://www.strava.com/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", STRAVA_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("approval_prompt", "auto");
  authorizeUrl.searchParams.set("scope", STRAVA_SCOPES);
  authorizeUrl.searchParams.set("state", state);

  res.writeHead(302, { Location: authorizeUrl.toString() });
  res.end();
}
