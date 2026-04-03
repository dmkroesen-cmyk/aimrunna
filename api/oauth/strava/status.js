const SUPABASE_URL = process.env.SUPABASE_URL || "https://tpnfkumkvxnrurjuaxdq.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const url = new URL(req.url, `https://${req.headers.host}`);
  const userId = url.searchParams.get("user_id");
  if (!userId) return res.status(400).json({ ok: false, error: "Missing user_id" });

  const integration = await getIntegration(userId);
  if (!integration || !integration.connected) {
    return res.status(200).json({ ok: true, connected: false });
  }

  res.status(200).json({
    ok: true,
    connected: true,
    userId,
    athlete: integration.athlete_data || null,
    expires_at: integration.expires_at,
    expires_in_sec: Math.max(0, Number(integration.expires_at || 0) - Math.floor(Date.now() / 1000)),
    scope: integration.scope,
  });
}
