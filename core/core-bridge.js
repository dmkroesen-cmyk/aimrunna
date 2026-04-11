/* ============================================================
   peak.athlete · Core Bridge
   Non-invasive adapter: reads app.js engine outputs and writes
   them into the new Core Shell DOM. Never modifies app.js.
   ============================================================ */
(function () {
  "use strict";

  var t = function (k, f) { return (window.CoreI18n && window.CoreI18n.t(k, f)) || f || k; };

  /* ---------- Helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function setText(el, val) { if (el && val != null) el.textContent = val; }
  function setHtml(el, html) { if (el && html != null) el.innerHTML = html; }
  function fmtMin(min) {
    if (!min && min !== 0) return "—";
    if (min < 60) return min + " min";
    var h = Math.floor(min / 60), m = min % 60;
    return h + "h " + (m < 10 ? "0" : "") + m + "m";
  }
  function fmtTime(sec) {
    if (!sec && sec !== 0) return "—";
    var h = Math.floor(sec / 3600);
    var m = Math.floor((sec % 3600) / 60);
    var s = Math.floor(sec % 60);
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    return (h > 0 ? h + ":" : "") + pad(m) + ":" + pad(s);
  }
  function fmtNum(n, d) {
    if (n == null || isNaN(n)) return "—";
    return Number(n).toFixed(d != null ? d : 0);
  }

  /* ---------- Engine access ---------- */
  function getAccount() {
    if (typeof window.getCurrentAccount === "function") {
      try { return window.getCurrentAccount(); } catch (_) {}
    }
    return window.activeAccount || window._currentAccount || null;
  }

  function getReadiness(account) {
    if (!account) return null;
    if (typeof window.calculateTrainingReadiness === "function") {
      try { return window.calculateTrainingReadiness(account); } catch (_) {}
    }
    return null;
  }

  function getActivePlan(account) {
    if (!account || !account.plans || !account.plans.length) return null;
    var entry = account.plans[account.plans.length - 1];
    return entry && (entry.plan || entry) || null;
  }

  function getTodayIndex() {
    var d = new Date();
    var dow = d.getDay();
    // Monday = 0
    return dow === 0 ? 6 : dow - 1;
  }

  function getCurrentWeekDays(plan) {
    if (!plan || !plan.weeks) return null;
    var week = plan.weeks[0];
    for (var i = 0; i < plan.weeks.length; i++) {
      var w = plan.weeks[i];
      if (!w.days) continue;
      var first = w.days[0];
      var last = w.days[w.days.length - 1];
      if (!first || !first.date) continue;
      var now = new Date();
      var fd = new Date(first.date);
      var ld = new Date(last ? last.date : first.date);
      ld.setHours(23, 59, 59);
      if (now >= fd && now <= ld) { week = w; break; }
    }
    return week;
  }

  function getTodaySession(plan) {
    var week = getCurrentWeekDays(plan);
    if (!week || !week.days) return null;
    var todayStr = new Date().toISOString().slice(0, 10);
    for (var i = 0; i < week.days.length; i++) {
      var day = week.days[i];
      if (day && day.date && day.date.slice(0, 10) === todayStr) {
        if (day.rest) return { rest: true };
        return day.sessions && day.sessions[0] ? day.sessions[0] : null;
      }
    }
    // fallback by dow index
    var idx = getTodayIndex();
    var dayByIdx = week.days[idx];
    if (dayByIdx && dayByIdx.rest) return { rest: true };
    return dayByIdx && dayByIdx.sessions && dayByIdx.sessions[0] ? dayByIdx.sessions[0] : null;
  }

  function getTomorrowSession(plan) {
    var week = getCurrentWeekDays(plan);
    if (!week || !week.days) return null;
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var tStr = tomorrow.toISOString().slice(0, 10);
    for (var i = 0; i < week.days.length; i++) {
      var day = week.days[i];
      if (day && day.date && day.date.slice(0, 10) === tStr) {
        if (day.rest) return { rest: true };
        return day.sessions && day.sessions[0] ? day.sessions[0] : null;
      }
    }
    return null;
  }

  /* ---------- Decision logic ---------- */
  function decisionFromReadiness(r) {
    if (!r) return { band: "unknown", code: "easy", label: t("decision_easy"), tone: "neutral" };
    var code = r.decision || "easy";
    var map = {
      hard: { label: t("decision_hard"), tone: "go" },
      easy: { label: t("decision_easy"), tone: "neutral" },
      rest: { label: t("decision_rest"), tone: "stop" }
    };
    var m = map[code] || map.easy;
    return { code: code, label: m.label, tone: m.tone };
  }

  /* ---------- Sync: Greeting + Date ---------- */
  function syncGreeting(account) {
    var el = $("core-greeting");
    if (!el) return;
    var name = "";
    if (account && account.profile) {
      name = account.profile.firstName || account.profile.name || "";
    }
    if (!name && account && account.email) {
      name = account.email.split("@")[0];
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    var greet = window.CoreI18n ? window.CoreI18n.greet() : t("greet_morning");
    var wave = ' <span class="wave">' + t("greet_wave") + "</span>";
    el.innerHTML = greet + (name ? ", " + name : "") + wave;
  }

  /* ---------- Sync: Ring + Readiness ---------- */
  function syncRing(readiness) {
    var num = $("core-ring-num");
    var arc = $("core-ring-arc");
    if (!readiness) return;
    var score = Math.round(readiness.score || 0);
    setText(num, score);
    if (arc) {
      var C = 452.4; // r=72 circumference
      var offset = C * (1 - Math.min(100, Math.max(0, score)) / 100);
      arc.setAttribute("stroke-dashoffset", offset.toFixed(1));
    }
  }

  function syncDecisionHero(readiness) {
    var dec = decisionFromReadiness(readiness);
    var root = document.querySelector(".decision-hero");
    if (root) root.setAttribute("data-tone", dec.tone);
    var word = $("core-decision-word");
    if (word) word.textContent = dec.label;
    var intent = $("core-intent");
    if (intent && readiness) {
      var label = readiness.label || (dec.code === "hard" ? "Peak" : dec.code === "rest" ? "Niedrig" : "Gut");
      intent.innerHTML = label;
    }
  }

  function syncReasons(readiness) {
    var list = $("core-reasons");
    if (!list) return;
    var reasons = (readiness && readiness.reasons) || [];
    if (!reasons.length) {
      list.innerHTML = '<li class="reason reason--muted">' + t("err_no_data") + "</li>";
      return;
    }
    list.innerHTML = reasons.slice(0, 3).map(function (r) {
      return '<li class="reason"><span class="reason__dot" aria-hidden="true"></span>' +
             '<span class="reason__text">' + escapeHtml(r) + "</span></li>";
    }).join("");
  }

  /* ---------- Sync: Session ---------- */
  function syncSession(session) {
    var title = $("core-session-title");
    var meta = $("core-session-meta");
    var badge = $("core-session-badge");
    var card = document.querySelector(".heute__session");

    if (!session || session.rest) {
      if (title) title.textContent = session && session.rest ? t("today_rest_title") : t("today_no_session");
      if (meta) meta.innerHTML = '<span>' + t("today_rest_text") + '</span>';
      if (badge) badge.textContent = "REST";
      if (card) card.setAttribute("data-state", "rest");
      return;
    }

    if (card) card.setAttribute("data-state", "active");
    var tTitle = session.title || sessionTypeLabel(session.type) || t("today_session_label");
    setText(title, tTitle);

    var parts = [];
    if (session.distance_km) parts.push(fmtNum(session.distance_km, 1) + " km");
    if (session.duration_min) parts.push(fmtMin(session.duration_min));
    var fires = fireEmoji(session.intensity);
    if (fires) parts.push('<span class="fire">' + fires + "</span>");
    if (meta) {
      meta.innerHTML = parts.join('<span class="dot">·</span>');
    }

    if (badge) {
      badge.textContent = sessionBadge(session);
    }
  }

  function sessionTypeLabel(type) {
    var map = {
      easy_run: "Easy Run",
      long_run: "Long Run",
      intervals: "Intervalle",
      tempo: "Tempo",
      recovery: "Regeneration",
      strength: "Kraft",
      bike: "Rad",
      swim: "Schwimmen"
    };
    return map[type] || type;
  }

  function sessionBadge(session) {
    if (!session) return "";
    var z = session.intensity || "";
    if (typeof z === "string") {
      if (/Z5|VO2|interval/i.test(z)) return "VO₂";
      if (/Z4|thr|tempo/i.test(z)) return "THR";
      if (/Z3/i.test(z)) return "MOD";
      if (/Z2|easy/i.test(z)) return "EZ";
      if (/Z1|recov/i.test(z)) return "REC";
    }
    if (typeof z === "number") {
      if (z >= 4) return "VO₂";
      if (z >= 3) return "THR";
      return "EZ";
    }
    return "—";
  }

  function fireEmoji(intensity) {
    var lvl = 0;
    if (typeof intensity === "number") lvl = intensity;
    else if (typeof intensity === "string") {
      var m = intensity.match(/Z(\d)/);
      if (m) lvl = parseInt(m[1], 10);
    }
    if (lvl >= 4) return "🔥🔥🔥";
    if (lvl >= 3) return "🔥🔥";
    if (lvl >= 2) return "🔥";
    return "";
  }

  /* ---------- Sync: Week Strip ---------- */
  function syncWeekStrip(plan) {
    var strip = $("core-week-strip");
    if (!strip) return;
    var week = getCurrentWeekDays(plan);
    var todayIdx = getTodayIndex();
    var dowLabels = ["dow_mon","dow_tue","dow_wed","dow_thu","dow_fri","dow_sat","dow_sun"];
    var out = [];
    for (var i = 0; i < 7; i++) {
      var state = "plan";
      var day = week && week.days && week.days[i];
      if (day) {
        if (day.rest) state = "rest";
        else if (i < todayIdx) state = "done";
        else if (i === todayIdx) {
          state = (day.sessions && day.sessions[0] && /interval|VO2|Z4|Z5/i.test(day.sessions[0].intensity || day.sessions[0].type || "")) ? "key" : "plan";
        }
      } else {
        if (i < todayIdx) state = "done";
      }
      var isToday = i === todayIdx ? ' data-today="true"' : "";
      out.push(
        '<div class="week-strip__day"' + isToday + '>' +
          '<span class="week-strip__dow">' + t(dowLabels[i]) + '</span>' +
          '<span class="week-strip__dot" data-state="' + state + '"></span>' +
        '</div>'
      );
    }
    strip.innerHTML = out.join("");

    var countEl = document.querySelector(".heute__week-count");
    if (countEl && plan && plan.weeks) {
      var wkNum = 1;
      if (week && week.weekNumber) wkNum = week.weekNumber;
      countEl.textContent = (window.CoreI18n && window.CoreI18n.getLang() === "en" ? "Week " : "Woche ") + wkNum + " / " + plan.weeks.length;
    }
  }

  /* ---------- Sync: Tomorrow ---------- */
  function syncTomorrow(plan) {
    var el = $("core-tomorrow");
    if (!el) return;
    var s = getTomorrowSession(plan);
    if (!s) { el.hidden = true; return; }
    el.hidden = false;
    if (s.rest) {
      el.innerHTML = t("today_tomorrow") + " <b>" + t("today_rest_title") + "</b>";
      return;
    }
    var title = s.title || sessionTypeLabel(s.type) || t("today_session_label");
    var duration = s.duration_min ? " · " + fmtMin(s.duration_min) : "";
    el.innerHTML = t("today_tomorrow") + " <b>" + escapeHtml(title) + duration + "</b>";
  }

  /* ---------- Sync: Profile ---------- */
  function syncProfile(account) {
    if (!account) return;
    var nameEl = $("core-profile-name");
    var taglineEl = $("core-profile-tagline");
    var avatarEl = $("core-profile-avatar");

    var name = "";
    if (account.profile && (account.profile.firstName || account.profile.name)) {
      name = account.profile.firstName || account.profile.name;
    } else if (account.email) {
      name = account.email.split("@")[0];
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    if (nameEl) nameEl.textContent = name || "Athlet";

    var discipline = account.profile && account.profile.discipline || "running";
    var distance = account.profile && account.profile.goalDistance || "";
    var disciplineMap = { running: "Läufer", cycling: "Radfahrer", triathlon: "Triathlet", hyrox: "HYROX", shape: "Athlete" };
    var tagline = (disciplineMap[discipline] || "Athlete") + (distance ? " · " + distance.toUpperCase() : "");
    if (taglineEl) taglineEl.textContent = tagline;

    if (avatarEl && name) {
      var initial = name.charAt(0).toUpperCase();
      avatarEl.textContent = initial;
    }

    // Stats
    var activities = account.activities || [];
    var totalKm = 0, totalSec = 0, totalCount = activities.length;
    var daysSet = {};
    for (var i = 0; i < activities.length; i++) {
      var a = activities[i];
      if (a.distance_km) totalKm += a.distance_km;
      if (a.duration_sec) totalSec += a.duration_sec;
      if (a.date) daysSet[a.date.slice(0, 10)] = 1;
    }
    var daysCount = Object.keys(daysSet).length;
    var hours = Math.round(totalSec / 3600);
    setStatValue("core-stat-km", Math.round(totalKm));
    setStatValue("core-stat-hours", hours);
    setStatValue("core-stat-sessions", totalCount);
    setStatValue("core-stat-days", daysCount);
  }

  function setStatValue(id, val) {
    var el = $(id);
    if (el) el.textContent = val != null ? val : "—";
  }

  /* ---------- Sync: Progress Screen ---------- */
  function syncProgress(account) {
    if (!account) return;
    var readiness = getReadiness(account);
    if (!readiness) return;
    var comp = readiness.components || {};

    setStatValue("core-prog-fitness", Math.round(comp.acwr || 0));
    setStatValue("core-prog-fatigue", Math.round(100 - (comp.recovery || 0)));
    setStatValue("core-prog-freshness", Math.round(comp.freshness || 0));

    // VO2max
    try {
      if (typeof window.estimateVO2max === "function") {
        var vo2 = window.estimateVO2max(account.profile || {}, account.activities || []);
        if (vo2 && vo2.value) setStatValue("core-prog-vo2", fmtNum(vo2.value, 1));
      }
    } catch (_) {}

    // Load fill
    var loadFill = $("core-prog-load-fill");
    if (loadFill) {
      var acwr = (readiness.meta && readiness.meta.acwr) || 1.0;
      var pct = Math.min(100, Math.round((acwr / 1.5) * 100));
      loadFill.style.width = pct + "%";
      loadFill.setAttribute("data-zone", acwr > 1.3 ? "high" : acwr < 0.8 ? "low" : "sweet");
    }

    // Race Predictions
    try {
      if (typeof window.buildRacePredictions === "function") {
        var preds = window.buildRacePredictions(account.profile || {}, { readiness: readiness.score, fitness: comp.acwr }, getActivePlan(account));
        var rows = $("core-predictions");
        if (rows && preds && preds.values) {
          var html = "";
          var keys = ["a","b","c","d"];
          for (var k = 0; k < keys.length; k++) {
            var key = keys[k];
            if (preds.labels && preds.labels[key]) {
              html += '<div class="pred"><span class="pred__dist">' + escapeHtml(preds.labels[key]) +
                      '</span><span class="pred__time">' + escapeHtml(preds.values[key] || "—") + "</span></div>";
            }
          }
          rows.innerHTML = html;
        }
      }
    } catch (_) {}
  }

  /* ---------- Sync: Plan ---------- */
  function syncPlan(account) {
    var plan = getActivePlan(account);
    var titleEl = $("core-plan-title");
    var phaseEl = $("core-plan-phase");
    var emptyEl = $("core-plan-empty");
    var weekBarsEl = $("core-plan-week-bars");

    if (!plan || !plan.weeks) {
      if (emptyEl) emptyEl.hidden = false;
      if (weekBarsEl) weekBarsEl.innerHTML = "";
      return;
    }
    if (emptyEl) emptyEl.hidden = true;

    var meta = plan.meta || {};
    if (titleEl) titleEl.textContent = meta.title || t("plan_title");
    if (phaseEl) {
      var wk = getCurrentWeekDays(plan);
      var wkNum = wk && wk.weekNumber || 1;
      phaseEl.textContent = (window.CoreI18n && window.CoreI18n.getLang() === "en" ? "Week " : "Woche ") +
                            wkNum + " / " + plan.weeks.length;
    }

    // Week bars
    if (weekBarsEl) {
      var week = getCurrentWeekDays(plan);
      if (week && week.days) {
        var maxMin = 0;
        for (var i = 0; i < week.days.length; i++) {
          var d = week.days[i];
          if (d && d.sessions) {
            for (var s = 0; s < d.sessions.length; s++) {
              if (d.sessions[s].duration_min > maxMin) maxMin = d.sessions[s].duration_min;
            }
          }
        }
        var out = [];
        var dowLabels = ["dow_mon","dow_tue","dow_wed","dow_thu","dow_fri","dow_sat","dow_sun"];
        var todayIdx = getTodayIndex();
        for (var j = 0; j < 7; j++) {
          var day = week.days[j];
          var sess = day && day.sessions && day.sessions[0];
          var dur = sess && sess.duration_min || 0;
          var pct = maxMin > 0 ? Math.round((dur / maxMin) * 100) : 0;
          var zone = sess ? fireZone(sess) : "rest";
          var title = sess ? (sess.title || sessionTypeLabel(sess.type)) : (day && day.rest ? t("today_rest_title") : "—");
          var isToday = j === todayIdx ? ' data-today="true"' : "";
          out.push(
            '<div class="plan-row"' + isToday + ">" +
              '<div class="plan-row__dow">' + t(dowLabels[j]) + "</div>" +
              '<div class="plan-row__bar-wrap">' +
                '<div class="plan-row__bar" data-zone="' + zone + '" style="width:' + pct + '%"></div>' +
                '<div class="plan-row__title">' + escapeHtml(title) + "</div>" +
              "</div>" +
              '<div class="plan-row__dur">' + (dur ? fmtMin(dur) : "—") + "</div>" +
            "</div>"
          );
        }
        weekBarsEl.innerHTML = out.join("");
      }
    }
  }

  function fireZone(session) {
    if (!session) return "rest";
    var z = session.intensity || session.type || "";
    if (/Z5|VO2|interval/i.test(z)) return "z5";
    if (/Z4|thr|tempo/i.test(z)) return "z4";
    if (/Z3|mod/i.test(z)) return "z3";
    if (/recovery|Z1/i.test(z)) return "z1";
    return "z2";
  }

  /* ---------- Escape ---------- */
  function escapeHtml(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* ---------- Master sync ---------- */
  function syncAll() {
    var account = getAccount();
    var readiness = getReadiness(account);
    var plan = getActivePlan(account);

    syncGreeting(account);
    syncRing(readiness);
    syncDecisionHero(readiness);
    syncReasons(readiness);
    syncSession(getTodaySession(plan));
    syncWeekStrip(plan);
    syncTomorrow(plan);
    syncProfile(account);
    syncProgress(account);
    syncPlan(account);
    syncDate();
  }

  function syncDate() {
    var el = $("core-date");
    if (!el) return;
    var d = new Date();
    var dow = d.getDay();
    var dowKey = ["dow_sun","dow_mon","dow_tue","dow_wed","dow_thu","dow_fri","dow_sat"][dow];
    var monKey = "mon_" + (d.getMonth() + 1);
    el.textContent = t(dowKey) + " · " + d.getDate() + ". " + t(monKey);
  }

  /* ---------- Event wiring ---------- */
  function setup() {
    // Tab switching
    var btns = document.querySelectorAll("#core-tab-bar .tab-bar__btn[data-target]");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var tgt = btn.getAttribute("data-target");
        document.querySelectorAll("#core-main .app-screen").forEach(function (s) {
          s.hidden = s.getAttribute("data-screen") !== tgt;
        });
        btns.forEach(function (b) { b.removeAttribute("aria-current"); });
        btn.setAttribute("aria-current", "page");
        window.scrollTo({ top: 0, behavior: "instant" });
      });
    });

    // CTA → legacy bridge
    var startBtn = $("core-btn-start");
    if (startBtn) {
      startBtn.addEventListener("click", function () {
        var legacy = $("heute-btn-start");
        if (legacy && typeof legacy.click === "function") legacy.click();
      });
    }
    var laterBtn = $("core-btn-later");
    if (laterBtn) {
      laterBtn.addEventListener("click", function () {
        var legacy = $("heute-btn-skip") || $("heute-btn-adjust");
        if (legacy && typeof legacy.click === "function") legacy.click();
      });
    }

    // peak.plan FAB
    var fab = $("core-btn-peakplan");
    if (fab) {
      fab.addEventListener("click", function () {
        var l = $("btn-plan") || document.querySelector("[data-plan-open]") || $("account-peakplan-btn");
        if (l && typeof l.click === "function") l.click();
      });
    }

    // Lang changed → resync
    document.addEventListener("core:lang-changed", syncAll);

    // Initial sync + periodic
    setTimeout(syncAll, 300);
    setTimeout(syncAll, 1500);
    setTimeout(syncAll, 5000);
    setInterval(syncAll, 60000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }

  window.CoreBridge = { syncAll: syncAll };
})();
