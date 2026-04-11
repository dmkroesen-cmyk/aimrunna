/* ============================================================
   peak.athlete · Core Shell i18n
   Minimal, fast, no deps. DE + EN.
   Persists language in localStorage.
   Exposes: window.CoreI18n.t(key), window.CoreI18n.setLang(lang)
   ============================================================ */
(function () {
  "use strict";

  var LS_KEY = "core.lang";

  var DICT = {
    de: {
      // Brand / Common
      app_name: "peak.athlete",
      brand_tagline: "Dein Trainings-Kompass",
      yes: "Ja",
      no: "Nein",
      cancel: "Abbrechen",
      save: "Speichern",
      close: "Schließen",
      done: "Fertig",
      edit: "Bearbeiten",
      more: "Mehr",
      loading: "Lädt …",

      // Tabs
      tab_today: "Heute",
      tab_plan: "Plan",
      tab_progress: "Analyse",
      tab_profile: "Profil",
      tab_peakplan: "peak.plan",

      // Greetings
      greet_morning: "Guten Morgen",
      greet_day: "Guten Tag",
      greet_evening: "Guten Abend",
      greet_wave: "👋",

      // Decision
      decision_hard: "Train hart",
      decision_easy: "Locker halten",
      decision_rest: "Erholung",
      decision_hard_short: "Hart",
      decision_easy_short: "Locker",
      decision_rest_short: "Ruhe",

      // Today
      today_readiness: "Readiness",
      today_session_label: "Heutiges Training",
      today_no_session: "Kein Training geplant",
      today_rest_title: "Heute ist Ruhetag",
      today_rest_text: "Erholung ist Training. Schlaf, Essen, Geduld.",
      today_start: "Einheit starten",
      today_later: "Verschieben",
      today_skip: "Überspringen",
      today_week_label: "Diese Woche",
      today_tomorrow: "Morgen",
      today_why: "Warum heute?",
      today_reasons: "Deine Entscheidungsbasis",

      // Plan
      plan_title: "Dein Plan",
      plan_view_week: "Woche",
      plan_view_month: "Monat",
      plan_total_hours: "Stunden",
      plan_total_km: "Kilometer",
      plan_phase: "Phase",
      plan_race: "Rennen",
      plan_weeks_until: "Wochen bis Renntag",
      plan_no_plan: "Noch kein Plan aktiv",
      plan_create_cta: "peak.plan erstellen",

      // Progress
      progress_title: "Analyse",
      progress_form: "Form",
      progress_fitness: "Fitness",
      progress_fatigue: "Ermüdung",
      progress_freshness: "Frische",
      progress_predictions: "Renn-Prognose",
      progress_consistency: "Konstanz",
      progress_load: "Last",
      progress_zones: "Intensitätsverteilung",
      progress_monotony: "Monotonie",
      progress_vo2max: "VO₂max",
      progress_trend_up: "Steigend",
      progress_trend_flat: "Stabil",
      progress_trend_down: "Fallend",
      progress_layer_essentials: "Essentials",
      progress_layer_trends: "Trends",
      progress_layer_deep: "Tiefe Analyse",

      // Profile
      profile_title: "Profil",
      profile_identity: "Identität",
      profile_stats: "Lifetime",
      profile_lifetime_km: "Gesamt km",
      profile_lifetime_hours: "Gesamt Std",
      profile_lifetime_sessions: "Einheiten",
      profile_lifetime_days: "Aktive Tage",
      profile_pbs: "Persönliche Bestzeiten",
      profile_connections: "Verbindungen",
      profile_strava: "Strava",
      profile_garmin: "Garmin",
      profile_whoop: "WHOOP",
      profile_health: "Apple Health",
      profile_connected: "Verbunden",
      profile_disconnected: "Nicht verbunden",
      profile_settings: "Einstellungen",
      profile_account: "Konto",
      profile_legal: "Rechtliches",

      // Settings
      settings_title: "Einstellungen",
      settings_language: "Sprache",
      settings_units: "Einheiten",
      settings_units_metric: "Metrisch (km, kg)",
      settings_units_imperial: "Imperial (mi, lb)",
      settings_notifications: "Benachrichtigungen",
      settings_notif_all: "Alle",
      settings_notif_important: "Nur wichtige",
      settings_notif_none: "Aus",
      settings_theme: "Erscheinungsbild",
      settings_theme_auto: "Automatisch",
      settings_theme_light: "Hell",
      settings_theme_dark: "Dunkel",
      settings_privacy: "Privatsphäre",
      settings_data: "Daten & Export",
      settings_export: "Daten exportieren",
      settings_delete: "Konto löschen",
      settings_logout: "Abmelden",
      settings_version: "Version",

      // Legal
      legal_title: "Rechtliches",
      legal_imprint: "Impressum",
      legal_privacy: "Datenschutz",
      legal_terms: "AGB",
      legal_cookies: "Cookies",
      legal_licenses: "Lizenzen",

      // Errors
      err_generic: "Etwas ist schiefgelaufen",
      err_no_data: "Noch keine Daten",
      err_offline: "Du bist offline",

      // Time
      time_now: "jetzt",
      time_min_ago: "Min. her",
      time_hours_ago: "Std. her",
      time_days_ago: "Tage her",
      time_yesterday: "gestern",
      time_today: "heute",
      time_tomorrow: "morgen",

      // Days short
      dow_mon: "Mo", dow_tue: "Di", dow_wed: "Mi",
      dow_thu: "Do", dow_fri: "Fr", dow_sat: "Sa", dow_sun: "So",

      // Months
      mon_1: "Januar", mon_2: "Februar", mon_3: "März",
      mon_4: "April", mon_5: "Mai", mon_6: "Juni",
      mon_7: "Juli", mon_8: "August", mon_9: "September",
      mon_10: "Oktober", mon_11: "November", mon_12: "Dezember"
    },

    en: {
      app_name: "peak.athlete",
      brand_tagline: "Your training compass",
      yes: "Yes",
      no: "No",
      cancel: "Cancel",
      save: "Save",
      close: "Close",
      done: "Done",
      edit: "Edit",
      more: "More",
      loading: "Loading …",

      tab_today: "Today",
      tab_plan: "Plan",
      tab_progress: "Progress",
      tab_profile: "Profile",
      tab_peakplan: "peak.plan",

      greet_morning: "Good morning",
      greet_day: "Good day",
      greet_evening: "Good evening",
      greet_wave: "👋",

      decision_hard: "Train Hard",
      decision_easy: "Train Easy",
      decision_rest: "Rest",
      decision_hard_short: "Hard",
      decision_easy_short: "Easy",
      decision_rest_short: "Rest",

      today_readiness: "Readiness",
      today_session_label: "Today's Training",
      today_no_session: "No session planned",
      today_rest_title: "Rest day",
      today_rest_text: "Recovery is training. Sleep, eat, be patient.",
      today_start: "Start session",
      today_later: "Postpone",
      today_skip: "Skip",
      today_week_label: "This week",
      today_tomorrow: "Tomorrow",
      today_why: "Why today?",
      today_reasons: "Decision basis",

      plan_title: "Your Plan",
      plan_view_week: "Week",
      plan_view_month: "Month",
      plan_total_hours: "Hours",
      plan_total_km: "Kilometers",
      plan_phase: "Phase",
      plan_race: "Race",
      plan_weeks_until: "Weeks to race day",
      plan_no_plan: "No plan active yet",
      plan_create_cta: "Create peak.plan",

      progress_title: "Progress",
      progress_form: "Form",
      progress_fitness: "Fitness",
      progress_fatigue: "Fatigue",
      progress_freshness: "Freshness",
      progress_predictions: "Race predictions",
      progress_consistency: "Consistency",
      progress_load: "Load",
      progress_zones: "Intensity mix",
      progress_monotony: "Monotony",
      progress_vo2max: "VO₂max",
      progress_trend_up: "Rising",
      progress_trend_flat: "Stable",
      progress_trend_down: "Falling",
      progress_layer_essentials: "Essentials",
      progress_layer_trends: "Trends",
      progress_layer_deep: "Deep analysis",

      profile_title: "Profile",
      profile_identity: "Identity",
      profile_stats: "Lifetime",
      profile_lifetime_km: "Total km",
      profile_lifetime_hours: "Total hrs",
      profile_lifetime_sessions: "Sessions",
      profile_lifetime_days: "Active days",
      profile_pbs: "Personal bests",
      profile_connections: "Connections",
      profile_strava: "Strava",
      profile_garmin: "Garmin",
      profile_whoop: "WHOOP",
      profile_health: "Apple Health",
      profile_connected: "Connected",
      profile_disconnected: "Not connected",
      profile_settings: "Settings",
      profile_account: "Account",
      profile_legal: "Legal",

      settings_title: "Settings",
      settings_language: "Language",
      settings_units: "Units",
      settings_units_metric: "Metric (km, kg)",
      settings_units_imperial: "Imperial (mi, lb)",
      settings_notifications: "Notifications",
      settings_notif_all: "All",
      settings_notif_important: "Important only",
      settings_notif_none: "Off",
      settings_theme: "Appearance",
      settings_theme_auto: "Auto",
      settings_theme_light: "Light",
      settings_theme_dark: "Dark",
      settings_privacy: "Privacy",
      settings_data: "Data & Export",
      settings_export: "Export data",
      settings_delete: "Delete account",
      settings_logout: "Log out",
      settings_version: "Version",

      legal_title: "Legal",
      legal_imprint: "Imprint",
      legal_privacy: "Privacy Policy",
      legal_terms: "Terms of Service",
      legal_cookies: "Cookies",
      legal_licenses: "Licenses",

      err_generic: "Something went wrong",
      err_no_data: "No data yet",
      err_offline: "You are offline",

      time_now: "now",
      time_min_ago: "min ago",
      time_hours_ago: "hr ago",
      time_days_ago: "days ago",
      time_yesterday: "yesterday",
      time_today: "today",
      time_tomorrow: "tomorrow",

      dow_mon: "Mon", dow_tue: "Tue", dow_wed: "Wed",
      dow_thu: "Thu", dow_fri: "Fri", dow_sat: "Sat", dow_sun: "Sun",

      mon_1: "January", mon_2: "February", mon_3: "March",
      mon_4: "April", mon_5: "May", mon_6: "June",
      mon_7: "July", mon_8: "August", mon_9: "September",
      mon_10: "October", mon_11: "November", mon_12: "December"
    }
  };

  function detectDefault() {
    try {
      var saved = localStorage.getItem(LS_KEY);
      if (saved && DICT[saved]) return saved;
    } catch (_) {}
    var nav = (navigator.language || "de").toLowerCase();
    if (nav.indexOf("en") === 0) return "en";
    return "de";
  }

  var currentLang = detectDefault();

  function t(key, fallback) {
    var v = (DICT[currentLang] && DICT[currentLang][key]) ||
            (DICT.de && DICT.de[key]);
    return v != null ? v : (fallback != null ? fallback : key);
  }

  function setLang(lang) {
    if (!DICT[lang]) return;
    currentLang = lang;
    try { localStorage.setItem(LS_KEY, lang); } catch (_) {}
    document.documentElement.lang = lang;
    applyStatic();
    document.dispatchEvent(new CustomEvent("core:lang-changed", { detail: { lang: lang } }));
  }

  function getLang() { return currentLang; }

  function applyStatic() {
    var els = document.querySelectorAll("[data-t]");
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute("data-t");
      if (key) els[i].textContent = t(key);
    }
    var attrs = document.querySelectorAll("[data-t-aria]");
    for (var j = 0; j < attrs.length; j++) {
      var k = attrs[j].getAttribute("data-t-aria");
      if (k) attrs[j].setAttribute("aria-label", t(k));
    }
  }

  function greet() {
    var h = new Date().getHours();
    if (h < 11) return t("greet_morning");
    if (h < 17) return t("greet_day");
    return t("greet_evening");
  }

  window.CoreI18n = {
    t: t,
    setLang: setLang,
    getLang: getLang,
    applyStatic: applyStatic,
    greet: greet,
    available: Object.keys(DICT)
  };

  // Apply once DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      document.documentElement.lang = currentLang;
      applyStatic();
    });
  } else {
    document.documentElement.lang = currentLang;
    applyStatic();
  }
})();
