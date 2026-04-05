// AImRUNNA Supabase Client
// Loaded before app.js — provides window.sb and window.sbAuth helpers

const SUPABASE_URL = "https://tpnfkumkvxnrurjuaxdq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbmZrdW1rdnhucnVyanVheGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNTA0NTEsImV4cCI6MjA5MDgyNjQ1MX0.yQys13L-cTohe5-rozZTexsGGboVMc7asWBG90wFjfA";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Auth helpers ──────────────────────────────────────────────

const sbAuth = {
  /** Sign up with email + password */
  async signUp(email, password, displayName) {
    const { data, error } = await sb.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: displayName || email.split("@")[0] },
      },
    });
    if (error) throw error;
    return data;
  },

  /** Sign in with email + password */
  async signIn(email, password) {
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  /** Sign in with Google OAuth */
  async signInWithGoogle() {
    const { data, error } = await sb.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + window.location.pathname,
      },
    });
    if (error) throw error;
    return data;
  },

  /** Sign out */
  async signOut() {
    const { error } = await sb.auth.signOut();
    if (error) throw error;
  },

  /** Get current session (null if not logged in) */
  async getSession() {
    const { data: { session } } = await sb.auth.getSession();
    return session;
  },

  /** Get current user (null if not logged in) */
  async getUser() {
    const { data: { user } } = await sb.auth.getUser();
    return user;
  },

  /** Listen to auth state changes */
  onAuthStateChange(callback) {
    return sb.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  },
};

// ── DB helpers ────────────────────────────────────────────────

const sbDb = {
  // ── Profile ──
  async getProfile(userId) {
    const { data, error } = await sb.from("profiles").select("*").eq("id", userId).single();
    if (error && error.code !== "PGRST116") throw error;
    return data;
  },

  async updateProfile(userId, updates) {
    const { data, error } = await sb.from("profiles").update(updates).eq("id", userId).select().single();
    if (error) throw error;
    return data;
  },

  // ── Plans ──
  async getPlans(userId) {
    const { data, error } = await sb.from("plans").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(20);
    if (error) throw error;
    return data || [];
  },

  async savePlan(userId, plan) {
    const { data, error } = await sb.from("plans").insert({
      user_id: userId,
      title: plan.title || "",
      summary: plan.summary || "",
      profile: plan.profile || {},
      plan_data: plan.plan_data || {},
    }).select().single();
    if (error) throw error;
    return data;
  },

  async deletePlan(planId) {
    const { error } = await sb.from("plans").delete().eq("id", planId);
    if (error) throw error;
  },

  // ── Activities ──
  async getActivities(userId, limit = 60) {
    const { data, error } = await sb.from("activities").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(limit);
    if (error) throw error;
    return data || [];
  },

  async postActivity(userId, activity) {
    const { data, error } = await sb.from("activities").insert({
      user_id: userId,
      source: activity.source || "manual",
      source_external_id: activity.source_external_id || null,
      title: activity.title || "",
      note: activity.note || "",
      kind: activity.kind || "training",
      sport_type: activity.sport_type || "run",
      distance_km: activity.distance_km || 0,
      moving_time_sec: activity.moving_time_sec || null,
      elevation_gain_m: activity.elevation_gain_m || null,
      metrics: activity.metrics || {},
      image_url: activity.image_url || null,
    }).select().single();
    if (error) throw error;
    return data;
  },

  async upsertStravaActivities(userId, activities) {
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
      polyline: a.map?.summary_polyline || a.map?.polyline || a.summary_polyline || null,
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
    const { data, error } = await sb.from("activities").upsert(rows, {
      onConflict: "user_id,source,source_external_id",
    }).select();
    if (error) throw error;
    return data || [];
  },

  // ── Props (likes) ──
  async toggleProps(activityId, userId) {
    const { data: existing } = await sb.from("activity_props").select("activity_id").eq("activity_id", activityId).eq("user_id", userId).maybeSingle();
    if (existing) {
      await sb.from("activity_props").delete().eq("activity_id", activityId).eq("user_id", userId);
      return false;
    } else {
      await sb.from("activity_props").insert({ activity_id: activityId, user_id: userId });
      return true;
    }
  },

  async getPropsCount(activityId) {
    const { count, error } = await sb.from("activity_props").select("*", { count: "exact", head: true }).eq("activity_id", activityId);
    if (error) throw error;
    return count || 0;
  },

  // ── Integrations ──
  async getIntegration(userId, provider) {
    const { data, error } = await sb.from("integrations").select("*").eq("user_id", userId).eq("provider", provider).maybeSingle();
    if (error) throw error;
    return data;
  },

  async upsertIntegration(userId, provider, updates) {
    const { data, error } = await sb.from("integrations").upsert({
      user_id: userId,
      provider,
      ...updates,
    }, { onConflict: "user_id,provider" }).select().single();
    if (error) throw error;
    return data;
  },

  // ── Friendships ──
  async getFriends(userId) {
    const { data, error } = await sb.from("friendships").select(`
      id, status, created_at,
      friend:friend_id(id, email, display_name, profile_image)
    `).eq("user_id", userId).eq("status", "accepted");
    if (error) throw error;
    return data || [];
  },

  async addFriend(userId, friendId) {
    const { data, error } = await sb.from("friendships").insert({
      user_id: userId,
      friend_id: friendId,
      status: "pending",
    }).select().single();
    if (error) throw error;
    return data;
  },

  async findUserByEmail(email) {
    const { data, error } = await sb.from("profiles").select("id, email, display_name, profile_image").eq("email", email).maybeSingle();
    if (error) throw error;
    return data;
  },

  /** Search users by name or email (ilike) via profiles_public view (anon + authenticated readable) */
  async searchUsers(query, limit = 20) {
    const q = String(query || "").trim();
    if (!q) return [];
    const pattern = `%${q.replace(/[%_]/g, "").slice(0, 60)}%`;
    // Use profiles_public view: readable by anon AND authenticated (no RLS blockade)
    const { data, error } = await sb
      .from("profiles_public")
      .select("id, email, display_name, profile_image")
      .or(`display_name.ilike.${pattern},email.ilike.${pattern}`)
      .limit(limit);
    if (error) {
      console.warn("[sbDb.searchUsers] profiles_public failed, fallback to profiles:", error?.message || error);
      // Fallback to direct profiles query (requires authenticated session)
      const fb = await sb.from("profiles")
        .select("id, email, display_name, profile_image")
        .or(`display_name.ilike.${pattern},email.ilike.${pattern}`)
        .limit(limit);
      if (fb.error) { console.warn("[sbDb.searchUsers] fallback failed:", fb.error); return []; }
      return fb.data || [];
    }
    return data || [];
  },

  /** List recent public profiles (directory) via profiles_public view */
  async listPublicProfiles(limit = 50) {
    const { data, error } = await sb
      .from("profiles_public")
      .select("id, email, display_name, profile_image, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) {
      console.warn("[sbDb.listPublicProfiles] profiles_public failed, fallback:", error?.message || error);
      const fb = await sb.from("profiles")
        .select("id, email, display_name, profile_image, created_at")
        .order("created_at", { ascending: false })
        .limit(limit);
      if (fb.error) { console.warn("[sbDb.listPublicProfiles] fallback failed:", fb.error); return []; }
      return fb.data || [];
    }
    return data || [];
  },

  /** Get full friendships (outgoing + incoming, any status) */
  async getAllFriendships(userId) {
    const { data, error } = await sb.from("friendships")
      .select("id, user_id, friend_id, status, created_at")
      .or(`user_id.eq.${userId},friend_id.eq.${userId}`);
    if (error) { console.warn("[sbDb.getAllFriendships]", error); return []; }
    return data || [];
  },

  /** Send friend request */
  async sendFriendRequest(userId, friendId) {
    if (userId === friendId) throw new Error("Cannot befriend yourself");
    const { data, error } = await sb.from("friendships").upsert({
      user_id: userId,
      friend_id: friendId,
      status: "pending",
    }, { onConflict: "user_id,friend_id" }).select().single();
    if (error) throw error;
    return data;
  },

  /** Accept friend request (you are the friend_id) */
  async acceptFriendRequest(requestId) {
    const { data, error } = await sb.from("friendships")
      .update({ status: "accepted" })
      .eq("id", requestId)
      .select().single();
    if (error) throw error;
    // Create reciprocal row so both directions work
    if (data) {
      await sb.from("friendships").upsert({
        user_id: data.friend_id,
        friend_id: data.user_id,
        status: "accepted",
      }, { onConflict: "user_id,friend_id" });
    }
    return data;
  },

  /** Reject / remove friendship */
  async removeFriend(requestId) {
    const { error } = await sb.from("friendships").delete().eq("id", requestId);
    if (error) throw error;
  },

  /** Get friends' recent activities (feed) */
  async getFriendsFeed(userId, limit = 60) {
    // Step 1: get accepted friend IDs
    const { data: friendships, error: e1 } = await sb
      .from("friendships")
      .select("friend_id")
      .eq("user_id", userId)
      .eq("status", "accepted");
    if (e1) { console.warn("[sbDb.getFriendsFeed friendships]", e1); return []; }
    const friendIds = (friendships || []).map((r) => r.friend_id);
    if (!friendIds.length) return [];
    // Step 2: fetch activities with profile join
    const { data, error } = await sb
      .from("activities")
      .select(`id, user_id, source, title, note, kind, sport_type, distance_km, moving_time_sec, elevation_gain_m, metrics, image_url, created_at,
               profile:user_id(id, display_name, profile_image, email)`)
      .in("user_id", friendIds)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) { console.warn("[sbDb.getFriendsFeed activities]", error); return []; }
    return data || [];
  },
  // ── Medal Board ──
  /** Fetch the canonical race catalog (optionally filter by series). */
  async getRaceCatalog(series = null) {
    let q = sb.from("race_catalog").select("*").order("iconic_level", { ascending: false }).order("event_name", { ascending: true });
    if (series) q = q.eq("series", series);
    const { data, error } = await q;
    if (error) { console.warn("[sbDb.getRaceCatalog]", error); return []; }
    return data || [];
  },

  /** Fetch medals for a user (joined with catalog for color/logo). */
  async getMedals(userId) {
    const { data, error } = await sb
      .from("race_medals")
      .select(`
        id, user_id, race_catalog_id, series, event_code, event_name, event_city, event_year,
        finish_date, finish_time_sec, finish_position, age_group_position, age_group, bib_number,
        medal_image_url, activity_id, detection_score, detection_confirmed, notes, is_pr, created_at,
        catalog:race_catalog_id(primary_color, secondary_color, logo_emoji, short_name, iconic_level, distance_label)
      `)
      .eq("user_id", userId)
      .order("finish_date", { ascending: false });
    if (error) { console.warn("[sbDb.getMedals]", error); return []; }
    return data || [];
  },

  /** Insert a new medal. `medal` can include race_catalog_id to link to catalog. */
  async addMedal(userId, medal) {
    const row = {
      user_id: userId,
      race_catalog_id: medal.race_catalog_id || null,
      series: medal.series,
      event_code: medal.event_code || null,
      event_name: medal.event_name,
      event_city: medal.event_city || null,
      event_year: medal.event_year || (medal.finish_date ? new Date(medal.finish_date).getFullYear() : null),
      finish_date: medal.finish_date,
      finish_time_sec: medal.finish_time_sec || null,
      finish_position: medal.finish_position || null,
      age_group_position: medal.age_group_position || null,
      age_group: medal.age_group || null,
      bib_number: medal.bib_number || null,
      medal_image_url: medal.medal_image_url || null,
      activity_id: medal.activity_id || null,
      detection_score: medal.detection_score || null,
      detection_confirmed: medal.detection_confirmed !== false,
      notes: medal.notes || null,
      is_pr: !!medal.is_pr,
    };
    const { data, error } = await sb.from("race_medals").insert(row).select().single();
    if (error) throw error;
    return data;
  },

  async deleteMedal(medalId) {
    const { error } = await sb.from("race_medals").delete().eq("id", medalId);
    if (error) throw error;
  },

  async updateMedal(medalId, updates) {
    const { data, error } = await sb.from("race_medals").update(updates).eq("id", medalId).select().single();
    if (error) throw error;
    return data;
  },

  /** Get cached badges for a user. */
  async getUserBadges(userId) {
    const { data, error } = await sb.from("user_badges").select("*").eq("user_id", userId).order("earned_at", { ascending: false });
    if (error) { console.warn("[sbDb.getUserBadges]", error); return []; }
    return data || [];
  },

  /** Replace all badges for a user (called after recompute). */
  async replaceUserBadges(userId, badges) {
    await sb.from("user_badges").delete().eq("user_id", userId);
    if (!badges.length) return [];
    const rows = badges.map((b) => ({
      user_id: userId,
      code: b.code,
      name: b.name,
      tier: b.tier || "common",
      metadata: b.metadata || {},
    }));
    const { data, error } = await sb.from("user_badges").insert(rows).select();
    if (error) { console.warn("[sbDb.replaceUserBadges]", error); return []; }
    return data || [];
  },
};

// Expose globally for app.js
window.sb = sb;
window.sbAuth = sbAuth;
window.sbDb = sbDb;
