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
  if (!integration?.access_token) {
    return res.status(404).json({ ok: false, error: "No access token for user_id" });
  }

  const athleteRes = await fetch("https://www.strava.com/api/v3/athlete", {
    headers: { Authorization: `Bearer ${integration.access_token}` },
  });
  const athleteJson = await athleteRes.json();
  if (!athleteRes.ok) {
    return res.status(athleteRes.status).json({ ok: false, error: "Athlete fetch failed", details: athleteJson });
  }

  res.status(200).json({ ok: true, athlete: athleteJson });
}
