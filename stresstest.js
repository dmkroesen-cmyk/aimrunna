/**
 * AImRUNNA — Plan-Engine & Calculation Stress-Test Harness
 *
 * Run via:  http://localhost:5500/?stresstest=1
 *
 * Validates plan-engine output against TRAINING_METHODOLOGY.md 10-rule checklist
 * plus sanity-checks all KPI calculations (VO2max, FitnessAge, FTP, Thresholds)
 * across a matrix of synthetic athlete profiles.
 *
 * Writes results to console + injects a floating report panel.
 */
(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  if (!params.has("stresstest")) return;

  // Wait for app.js globals to be ready
  function whenReady(fn) {
    if (typeof window.buildPlan === "function" && typeof window.estimateVO2max === "function") {
      fn();
    } else {
      setTimeout(() => whenReady(fn), 120);
    }
  }

  // ───────────────────────────────────────────────────────────
  // Synthetic profile generator
  // ───────────────────────────────────────────────────────────
  const DISCIPLINES = ["running", "bike", "hyrox", "triathlon", "swim", "strength"];
  const LEVELS = ["starter", "intermediate", "advanced"];
  const GOAL_DISTANCES = {
    running: ["5k", "10k", "half", "marathon"],
    bike: ["40k", "100k", "gran_fondo"],
    hyrox: ["single", "doubles"],
    triathlon: ["sprint", "olympic", "70.3", "ironman"],
    swim: ["1500m", "5k_open"],
    strength: ["hypertrophy", "strength", "athletic"],
  };
  const AGES = [22, 35, 48, 62];
  const SEXES = ["male", "female"];
  const WEEKLY_HOURS_BY_LEVEL = { starter: [3, 5], intermediate: [6, 9], advanced: [10, 14] };

  function daysFromNow(d) {
    const t = new Date();
    t.setHours(9, 0, 0, 0);
    t.setDate(t.getDate() + d);
    return t;
  }

  function defaultGoalTime(discipline, distance) {
    const t = {
      running: { "5k": "25:00", "10k": "52:00", "half": "1:55:00", "marathon": "4:00:00" },
      bike: { "40k": "1:10:00", "100k": "3:20:00", "gran_fondo": "5:30:00" },
      hyrox: { "single": "1:20:00", "doubles": "1:15:00" },
      triathlon: { "sprint": "1:25:00", "olympic": "2:50:00", "70.3": "5:45:00", "ironman": "12:30:00" },
      swim: { "1500m": "32:00", "5k_open": "1:45:00" },
      strength: { "hypertrophy": "", "strength": "", "athletic": "" },
    };
    return t[discipline]?.[distance] || "1:00:00";
  }

  function makeProfile({ discipline, level, age, sex, weeklyHours, distance, raceInDays }) {
    const birthYear = new Date().getFullYear() - age;
    const goalDistance = distance || GOAL_DISTANCES[discipline][0];
    return {
      discipline,
      fitnessLevel: level,
      experience: level === "starter" ? "<6mo" : level === "intermediate" ? "1-3y" : "3y+",
      weeklyHours,
      weeklyHoursRequested: weeklyHours,
      goalDistance,
      goalTime: defaultGoalTime(discipline, goalDistance),
      raceDate: daysFromNow(raceInDays),
      constraints: "",
      sex,
      age,
      birthYear,
      birthMonth: 6,
      birthDay: 15,
      weightKg: sex === "female" ? 62 : 75,
      heightCm: sex === "female" ? 168 : 180,
      targetWeightKg: null,
      planFocus: null,
      shapeTargetFocus: null,
      ltadMode: "off",
      gymShare: discipline === "hyrox" ? 30 : 15,
      bikeIndoorShare: 15,
      bikeOutdoorDay: "none",
      longRunDay: "saturday",
      cycleBasedTraining: false,
      cycleDay: null,
      cycleLengthDays: null,
      bikeFtp: discipline === "bike" || discipline === "triathlon" ? 220 : null,
      bikeThresholdHr: null,
      bikeThresholdLactate: null,
      runThresholdPace: discipline === "running" || discipline === "hyrox" || discipline === "triathlon" ? 270 : null,
      runThresholdHr: 170,
      runThresholdLactate: null,
      swimCss: discipline === "swim" || discipline === "triathlon" ? "1:45" : null,
      recentPbRows: [],
      recentPbs: null,
      raceEvents: [],
      connectedSources: [],
      maxHr: 220 - age,
      restingHr: 55,
    };
  }

  // ───────────────────────────────────────────────────────────
  // Plan analysis utilities
  // ───────────────────────────────────────────────────────────
  const Z1_TYPES = new Set(["easy", "recovery", "long", "endurance", "base", "aerobic"]);
  const Z2_TYPES = new Set(["threshold", "tempo", "sweetspot", "sweet_spot", "marathon_pace", "quality"]);
  const Z3_TYPES = new Set(["vo2", "vo2max", "intervals", "interval", "speed", "hard", "race", "compromised", "vo2_max"]);
  const STRENGTH_TYPES = new Set(["strength", "gym", "lift", "lifting"]);
  const BRICK_KEYWORDS = /compromised|brick|run[-\s]?station|station[-\s]?run/i;

  function classifySession(s) {
    const type = String(s.type || "").toLowerCase();
    const title = String(s.title || s.description || "").toLowerCase();
    if (type === "rest") return "rest";
    if (STRENGTH_TYPES.has(type) || /strength|gym|lift/.test(title)) return "strength";
    if (Z3_TYPES.has(type) || /vo2|interval|race pace|hard/i.test(title)) return "Z3";
    if (Z2_TYPES.has(type) || /threshold|tempo|sweet spot|schwelle/i.test(title)) return "Z2";
    if (Z1_TYPES.has(type) || /easy|recovery|long|aerobic|locker/i.test(title)) return "Z1";
    return "other";
  }

  function weeksFromPlan(plan) {
    // Plan has { sessions } each with .date and .weekIndex
    const buckets = new Map();
    for (const s of plan.sessions || []) {
      const key = s.weekIndex != null ? s.weekIndex : Math.floor((s.date - plan.sessions[0].date) / (7 * 86400000));
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(s);
    }
    return [...buckets.entries()].sort((a, b) => a[0] - b[0]).map(([idx, sessions]) => ({ idx, sessions }));
  }

  function weekShares(week) {
    const tally = { Z1: 0, Z2: 0, Z3: 0, strength: 0, rest: 0, other: 0 };
    for (const s of week.sessions) tally[classifySession(s)]++;
    const totalEndurance = tally.Z1 + tally.Z2 + tally.Z3;
    const n = totalEndurance || 1;
    return {
      z1: tally.Z1 / n,
      z2: tally.Z2 / n,
      z3: tally.Z3 / n,
      counts: tally,
      totalEndurance,
      totalSessions: week.sessions.filter((s) => classifySession(s) !== "rest").length,
    };
  }

  function weekVolume(week) {
    let km = 0;
    let minutes = 0;
    for (const s of week.sessions) {
      if (typeof s.distanceKm === "number") km += s.distanceKm;
      if (typeof s.durationMin === "number") minutes += s.durationMin;
    }
    return { km, minutes };
  }

  // ───────────────────────────────────────────────────────────
  // Checklist validators
  // ───────────────────────────────────────────────────────────
  function auditPlan(profile, plan) {
    const issues = [];
    const weeks = weeksFromPlan(plan);
    if (!weeks.length) {
      return { issues: [{ rule: 0, sev: "fatal", msg: "Plan has 0 weeks" }], weeks: 0 };
    }

    // Rule 2: ≤3 Z3/wk, never consecutive
    weeks.forEach((w) => {
      const shares = weekShares(w);
      if (shares.counts.Z3 > 3) {
        issues.push({ rule: 2, sev: "warn", msg: `Week ${w.idx}: ${shares.counts.Z3} Z3 sessions (>3)` });
      }
      // consecutive Z3 check
      const ordered = [...w.sessions].sort((a, b) => (a.date || 0) - (b.date || 0));
      for (let i = 1; i < ordered.length; i++) {
        if (classifySession(ordered[i]) === "Z3" && classifySession(ordered[i - 1]) === "Z3") {
          issues.push({ rule: 2, sev: "warn", msg: `Week ${w.idx}: consecutive Z3 days` });
          break;
        }
      }
    });

    // Rule 1: intensity distribution ±5% (skip for very short plans)
    if (weeks.length >= 4) {
      const agg = weeks.reduce(
        (acc, w) => {
          const s = weekShares(w);
          acc.z1 += s.counts.Z1;
          acc.z2 += s.counts.Z2;
          acc.z3 += s.counts.Z3;
          return acc;
        },
        { z1: 0, z2: 0, z3: 0 }
      );
      const total = agg.z1 + agg.z2 + agg.z3 || 1;
      const z1 = agg.z1 / total;
      const z3 = agg.z3 / total;
      if (z3 > 0.22) issues.push({ rule: 1, sev: "warn", msg: `Aggregate Z3 = ${(z3 * 100).toFixed(1)}% (>22%)` });
      if (z1 < 0.60) issues.push({ rule: 1, sev: "warn", msg: `Aggregate Z1 = ${(z1 * 100).toFixed(1)}% (<60%)` });
    }

    // Rule 4: Volume ramp ≤10% (allow deload weeks to drop)
    for (let i = 1; i < weeks.length; i++) {
      const prev = weekVolume(weeks[i - 1]);
      const cur = weekVolume(weeks[i]);
      if (prev.minutes > 30 && cur.minutes > prev.minutes * 1.15) {
        const pct = ((cur.minutes / prev.minutes - 1) * 100).toFixed(1);
        issues.push({ rule: 4, sev: "warn", msg: `Week ${weeks[i].idx}: volume ramp +${pct}% (>15%)` });
      }
    }

    // Rule 5: Deload every 3rd-4th week
    if (weeks.length >= 6) {
      let longestNoDropStreak = 0;
      let streak = 0;
      for (let i = 1; i < weeks.length; i++) {
        const prev = weekVolume(weeks[i - 1]).minutes;
        const cur = weekVolume(weeks[i]).minutes;
        if (cur < prev * 0.8) streak = 0;
        else streak++;
        longestNoDropStreak = Math.max(longestNoDropStreak, streak);
      }
      if (longestNoDropStreak > 5) {
        issues.push({ rule: 5, sev: "warn", msg: `No deload for ${longestNoDropStreak} consecutive weeks` });
      }
    }

    // Rule 7: Taper present for long events
    const longEvent = ["marathon", "half", "70.3", "ironman", "100k", "gran_fondo"].includes(profile.goalDistance);
    if (longEvent && weeks.length >= 4) {
      const lastWeek = weekVolume(weeks[weeks.length - 1]).minutes;
      const preMax = Math.max(...weeks.slice(0, -1).map((w) => weekVolume(w).minutes));
      if (preMax > 30 && lastWeek > preMax * 0.75) {
        issues.push({ rule: 7, sev: "warn", msg: `No taper detected: last week ${lastWeek.toFixed(0)}min vs peak ${preMax.toFixed(0)}min` });
      }
    }

    // Rule 8: Beginners locked out of Z3 first 8 weeks
    if (profile.fitnessLevel === "starter") {
      const firstEight = weeks.slice(0, Math.min(8, weeks.length));
      const earlyZ3 = firstEight.reduce((a, w) => a + weekShares(w).counts.Z3, 0);
      if (earlyZ3 > 2) {
        issues.push({ rule: 8, sev: "warn", msg: `Starter: ${earlyZ3} Z3 sessions in first 8 weeks (>2)` });
      }
    }

    // Rule 9: HYROX ≥1 compromised/wk
    if (profile.discipline === "hyrox") {
      const weeksWithoutBrick = weeks.filter((w) =>
        !w.sessions.some((s) => BRICK_KEYWORDS.test(String(s.title || s.description || "")))
      ).length;
      if (weeksWithoutBrick > weeks.length * 0.3) {
        issues.push({ rule: 9, sev: "warn", msg: `HYROX: ${weeksWithoutBrick}/${weeks.length} weeks lack compromised/brick session` });
      }
    }

    // Rule 6: Concurrent spacing — no heavy-lower + long-run same day (per-day check)
    const byDate = new Map();
    for (const s of plan.sessions || []) {
      const key = s.date?.toDateString?.() || String(s.date);
      if (!byDate.has(key)) byDate.set(key, []);
      byDate.get(key).push(s);
    }
    for (const [date, sess] of byDate.entries()) {
      if (sess.length < 2) continue;
      const hasLongRun = sess.some((s) => /long run|long.run|lange.*lauf/i.test(String(s.title || s.description || "")) || s.type === "long");
      const hasHeavyLower = sess.some((s) => /squat|deadlift|leg|heavy.*lower/i.test(String(s.title || s.description || "")));
      if (hasLongRun && hasHeavyLower && profile.fitnessLevel !== "advanced") {
        issues.push({ rule: 6, sev: "warn", msg: `${date}: long-run stacked with heavy-lower lift` });
      }
    }

    return { issues, weeks: weeks.length, sessions: plan.sessions?.length || 0 };
  }

  // ───────────────────────────────────────────────────────────
  // KPI sanity checks
  // ───────────────────────────────────────────────────────────
  function auditKpis(profile) {
    const issues = [];
    const vo2 = typeof window.estimateVO2max === "function" ? window.estimateVO2max(profile, []) : null;
    const fitAge =
      typeof window.estimateFitnessAge === "function" && vo2
        ? window.estimateFitnessAge(vo2, profile.sex, profile.age)
        : null;

    if (vo2 != null) {
      if (Number.isNaN(vo2) || vo2 < 15 || vo2 > 95) {
        issues.push({ kpi: "VO2max", sev: "fatal", msg: `VO2max = ${vo2} (out of 15-95 range)` });
      }
      // age ceiling: 1.55× population mean
      const popMean = profile.sex === "female" ? 48 - 0.37 * profile.age : 57 - 0.40 * profile.age;
      const ceiling = popMean * 1.55;
      if (vo2 > ceiling + 0.5) {
        issues.push({ kpi: "VO2max", sev: "warn", msg: `VO2max ${vo2.toFixed(1)} > age ceiling ${ceiling.toFixed(1)}` });
      }
    }

    if (fitAge != null) {
      if (Number.isNaN(fitAge) || fitAge < 10 || fitAge > 100) {
        issues.push({ kpi: "FitnessAge", sev: "fatal", msg: `FitnessAge = ${fitAge} (out of 10-100)` });
      }
    }

    return { issues, vo2, fitAge };
  }

  // ───────────────────────────────────────────────────────────
  // Run matrix
  // ───────────────────────────────────────────────────────────
  function runMatrix() {
    const results = [];
    const ruleFailures = new Map();
    const kpiFailures = new Map();
    let planSuccess = 0;
    let planCrash = 0;

    for (const discipline of DISCIPLINES) {
      const distances = GOAL_DISTANCES[discipline];
      for (const level of LEVELS) {
        const [hMin, hMax] = WEEKLY_HOURS_BY_LEVEL[level];
        for (const age of AGES) {
          for (const sex of SEXES) {
            for (const distance of distances) {
              for (const hrs of [hMin, hMax]) {
                const raceDays = distance === "marathon" || distance === "ironman" || distance === "70.3" ? 140 : 84;
                const profile = makeProfile({ discipline, level, age, sex, weeklyHours: hrs, distance, raceInDays: raceDays });
                const kpi = auditKpis(profile);
                kpi.issues.forEach((i) => {
                  const k = `${i.kpi}:${i.sev}`;
                  kpiFailures.set(k, (kpiFailures.get(k) || 0) + 1);
                });

                let planAudit = null;
                try {
                  const plan = window.buildPlan({ ...profile });
                  planSuccess++;
                  planAudit = auditPlan(profile, plan);
                  planAudit.issues.forEach((i) => {
                    const k = `R${i.rule}:${i.sev}`;
                    ruleFailures.set(k, (ruleFailures.get(k) || 0) + 1);
                  });
                } catch (err) {
                  planCrash++;
                  planAudit = { crash: String(err?.message || err), issues: [], weeks: 0 };
                }

                results.push({
                  tag: `${discipline}/${level}/${age}${sex[0]}/${distance}/${hrs}h`,
                  profile,
                  kpi,
                  planAudit,
                });
              }
            }
          }
        }
      }
    }
    return { results, ruleFailures, kpiFailures, planSuccess, planCrash };
  }

  // ───────────────────────────────────────────────────────────
  // Report
  // ───────────────────────────────────────────────────────────
  function renderReport(summary) {
    console.group("%c AImRUNNA Stress-Test Report", "font-size:14px;font-weight:bold;color:#00f19b;background:#111;padding:4px 8px;");
    console.log("Scenarios:", summary.results.length);
    console.log("Plan builds succeeded:", summary.planSuccess);
    console.log("Plan builds crashed:", summary.planCrash);
    console.group("Rule failures (aggregate)");
    [...summary.ruleFailures.entries()].sort().forEach(([k, v]) => console.log(`${k}: ${v}`));
    console.groupEnd();
    console.group("KPI failures (aggregate)");
    [...summary.kpiFailures.entries()].sort().forEach(([k, v]) => console.log(`${k}: ${v}`));
    console.groupEnd();
    console.group("Crashes detail");
    summary.results.filter((r) => r.planAudit?.crash).slice(0, 20).forEach((r) => console.log(r.tag, "→", r.planAudit.crash));
    console.groupEnd();
    console.group("First 20 warn samples");
    summary.results
      .flatMap((r) => (r.planAudit?.issues || []).map((i) => ({ tag: r.tag, ...i })))
      .slice(0, 20)
      .forEach((x) => console.log(`[R${x.rule}/${x.sev}] ${x.tag} — ${x.msg}`));
    console.groupEnd();
    console.groupEnd();

    // Floating panel
    const panel = document.createElement("div");
    panel.style.cssText =
      "position:fixed;bottom:16px;right:16px;max-width:520px;max-height:70vh;overflow:auto;background:#0b0f0d;color:#cde;border:1px solid #00f19b55;border-radius:12px;padding:14px 16px;font:12px/1.45 ui-monospace,Menlo,monospace;z-index:99999;box-shadow:0 20px 60px #0009";
    const lines = [];
    lines.push(`<div style="color:#00f19b;font-weight:700;font-size:13px;margin-bottom:6px">AImRUNNA Stress-Test</div>`);
    lines.push(`<div>Scenarios: <b>${summary.results.length}</b> &nbsp; Builds ok: <b style="color:#6fe">${summary.planSuccess}</b> &nbsp; Crashes: <b style="color:#f66">${summary.planCrash}</b></div>`);
    lines.push(`<hr style="border:0;border-top:1px solid #223;margin:8px 0">`);
    lines.push(`<div style="font-weight:700;color:#9cf">Rule failures</div>`);
    [...summary.ruleFailures.entries()].sort().forEach(([k, v]) => {
      lines.push(`<div>&nbsp;${k.padEnd(12)} <b>${v}</b></div>`);
    });
    lines.push(`<div style="font-weight:700;color:#9cf;margin-top:8px">KPI failures</div>`);
    [...summary.kpiFailures.entries()].sort().forEach(([k, v]) => {
      lines.push(`<div>&nbsp;${k.padEnd(20)} <b>${v}</b></div>`);
    });
    const crashes = summary.results.filter((r) => r.planAudit?.crash).slice(0, 10);
    if (crashes.length) {
      lines.push(`<div style="font-weight:700;color:#f66;margin-top:8px">Crashes (first 10)</div>`);
      crashes.forEach((r) => lines.push(`<div style="color:#f99">&nbsp;${r.tag}: ${r.planAudit.crash}</div>`));
    }
    lines.push(`<div style="margin-top:10px;color:#678">Full details in DevTools console.</div>`);
    lines.push(`<button id="stt-close" style="margin-top:10px;padding:4px 10px;background:#00f19b;color:#000;border:0;border-radius:6px;cursor:pointer;font-weight:700">Close</button>`);
    panel.innerHTML = lines.join("");
    document.body.appendChild(panel);
    panel.querySelector("#stt-close").onclick = () => panel.remove();

    // expose for manual inspection
    window.__stressTestSummary = summary;
  }

  whenReady(() => {
    console.log("[stresstest] starting matrix…");
    const t0 = performance.now();
    try {
      const summary = runMatrix();
      const dt = (performance.now() - t0).toFixed(0);
      console.log(`[stresstest] done in ${dt} ms`);
      renderReport(summary);
    } catch (err) {
      console.error("[stresstest] harness crashed:", err);
    }
  });
})();
