const form = document.getElementById("plan-form");
const statusEl = document.getElementById("status-analysis");
const planMetaEl = document.getElementById("plan-meta");
const calendarEl = document.getElementById("calendar-view");
const exportIcalBtn = document.getElementById("export-ical");
const weekTemplate = document.getElementById("week-template");
const connectionState = document.getElementById("connection-state");
const connectorButtons = [...document.querySelectorAll(".connector")];
const scrollStage = document.getElementById("scroll-stage");
const parallaxLayers = [...document.querySelectorAll("[data-parallax]")];
const landingLayerEl = document.getElementById("landing-layer");
const brandAnchorEl = document.getElementById("brand-anchor");
const disciplineSelect = form?.elements?.discipline;
const goalDistanceSelect = document.getElementById("goal-distance-select");
const sexSelect = form?.elements?.sex;
const cycleTrainingField = document.getElementById("cycle-training-field");
const cycleDetailsGroup = document.getElementById("cycle-detail-group");
const cycleTrainingCheckbox = document.getElementById("cycle-based-training");
const langButtons = [...document.querySelectorAll(".lang-btn")];
const advancedToggleBtn = document.getElementById("advanced-toggle");
const advancedSettingsEl = document.getElementById("advanced-settings");
const fitnessChartEl = document.getElementById("fitness-chart");
const metricVo2El = document.getElementById("metric-vo2");
const metricFitnessEl = document.getElementById("metric-fitness");
const metricFatigueEl = document.getElementById("metric-fatigue");
const metricFreshnessEl = document.getElementById("metric-freshness");
const metricReadinessEl = document.getElementById("metric-readiness");
const metricHrvBaselineEl = document.getElementById("metric-hrv-baseline");
const metricHrvCurrentEl = document.getElementById("metric-hrv-current");
const metricRhrTrendEl = document.getElementById("metric-rhr-trend");
const metricRhrValueEl = document.getElementById("metric-rhr-value");
const metricLoadRatioEl = document.getElementById("metric-load-ratio");
const metricLoadAbsEl = document.getElementById("metric-load-abs");
const metricMonotonyEl = document.getElementById("metric-monotony");
const metricStrainEl = document.getElementById("metric-strain");
const metricSleepScoreEl = document.getElementById("metric-sleep-score");
const metricSleepDurationEl = document.getElementById("metric-sleep-duration");
const metricThresholdPaceEl = document.getElementById("metric-threshold-pace");
const metricThresholdHrEl = document.getElementById("metric-threshold-hr");
const metricLongrunToleranceEl = document.getElementById("metric-longrun-tolerance");
const metricLongrunContextEl = document.getElementById("metric-longrun-context");
const metricRaceTrendEl = document.getElementById("metric-race-trend");
const metricRaceDeltaEl = document.getElementById("metric-race-delta");
const predSprintEl = document.getElementById("pred-sprint");
const predOlympicEl = document.getElementById("pred-olympic");
const pred703El = document.getElementById("pred-703");
const predIronmanEl = document.getElementById("pred-ironman");
const stageRevealEls = [...document.querySelectorAll(".stage-reveal")];
const sessionOverlayEl = document.getElementById("session-overlay");
const sessionModalMetaEl = document.getElementById("session-modal-meta");
const sessionModalTitleEl = document.getElementById("session-modal-title");
const sessionModalSubEl = document.getElementById("session-modal-sub");
const sessionModalPurposeEl = document.getElementById("session-modal-purpose");
const sessionModalAdaptationEl = document.getElementById("session-modal-adaptation");
const sessionModalPhysiologyEl = document.getElementById("session-modal-physiology");
const sessionModalWhyEl = document.getElementById("session-modal-why");
const sessionLabelPurposeEl = document.getElementById("session-label-purpose");
const sessionLabelAdaptationEl = document.getElementById("session-label-adaptation");
const sessionLabelPhysiologyEl = document.getElementById("session-label-physiology");
const sessionLabelWhyEl = document.getElementById("session-label-why");
const sessionLabelKcalEl = document.getElementById("session-label-kcal");
const sessionModalKcalEl = document.getElementById("session-modal-kcal");
const sessionModalCarbEl = document.getElementById("session-modal-carb");
const sessionModalProteinEl = document.getElementById("session-modal-protein");
const sessionModalFatEl = document.getElementById("session-modal-fat");

let generatedSessions = [];
const connectedSources = new Set();
let scrollFxRaf = 0;
let latestProfile = null;
let latestPlan = null;
let currentLang = "de";
let expandedSessionId = null;

const I18N = {
  de: {
    hero_title: "Plan your next race.",
    field_discipline: "Disziplin",
    field_level: "Level",
    field_experience: "Erfahrung",
    field_hours: "Std/Woche",
    field_goal_format: "Ziel-Format",
    field_goal_time: "Zielzeit",
    field_sex_optional: "Geschlecht (optional)",
    field_age_optional: "Alter (optional)",
    field_weight_optional: "Gewicht kg (optional)",
    field_cycle_optional: "Zyklusbasiertes Training (optional)",
    field_cycle_toggle: "Zyklusbasierte Planung berücksichtigen",
    field_cycle_day_optional: "Zyklustag (optional)",
    field_cycle_length_optional: "Ø Zykluslänge Tage (optional)",
    btn_generate: "race.",
    btn_tuning: "Feintuning",
    section_calendar: "Wochenkalender",
    calendar_view: "Kalenderansicht",
    section_fitness: "Aktueller Fitnessstand",
    no_sources: "Noch keine Quelle verbunden.",
    purpose: "Zweck der Einheit",
    adaptation: "Trainingseffekt",
    physiology: "Physio-Fokus",
    why: "Warum jetzt",
  },
  en: {
    hero_title: "Plan your next race.",
    field_discipline: "Discipline",
    field_level: "Level",
    field_experience: "Experience",
    field_hours: "Hours/week",
    field_goal_format: "Goal format",
    field_goal_time: "Goal time",
    field_sex_optional: "Sex (optional)",
    field_age_optional: "Age (optional)",
    field_weight_optional: "Weight kg (optional)",
    field_cycle_optional: "Cycle-based training (optional)",
    field_cycle_toggle: "Use cycle-based planning",
    field_cycle_day_optional: "Cycle day (optional)",
    field_cycle_length_optional: "Avg cycle length days (optional)",
    btn_generate: "race.",
    btn_tuning: "Fine tune",
    section_calendar: "Weekly calendar",
    calendar_view: "Calendar view",
    section_fitness: "Current fitness status",
    no_sources: "No source connected yet.",
    purpose: "Session purpose",
    adaptation: "Training effect",
    physiology: "Physiology focus",
    why: "Why it matters",
  },
  ja: {
    hero_title: "Plan your next race.",
    field_discipline: "種目",
    field_level: "レベル",
    field_experience: "経験",
    field_hours: "週あたり時間",
    field_goal_format: "目標フォーマット",
    field_goal_time: "目標タイム",
    field_sex_optional: "性別（任意）",
    field_age_optional: "年齢（任意）",
    field_weight_optional: "体重kg（任意）",
    field_cycle_optional: "周期ベーストレーニング（任意）",
    field_cycle_toggle: "周期ベース計画を使う",
    field_cycle_day_optional: "周期日（任意）",
    field_cycle_length_optional: "平均周期日数（任意）",
    btn_generate: "race.",
    btn_tuning: "詳細設定",
    section_calendar: "週間カレンダー",
    calendar_view: "カレンダー表示",
    section_fitness: "現在のフィットネス状態",
    no_sources: "まだ接続されたデータソースはありません。",
    purpose: "目的",
    adaptation: "トレーニング効果",
    physiology: "生理学フォーカス",
    why: "効果",
  },
};

const GOAL_OPTIONS_BY_DISCIPLINE = {
  running: [
    { value: "5k", label: "5 km" },
    { value: "10k", label: "10 km" },
    { value: "half", label: "Halbmarathon" },
    { value: "marathon", label: "Marathon" },
  ],
  triathlon: [
    { value: "sprint", label: "Sprint Triathlon" },
    { value: "olympic", label: "Olympic Triathlon" },
    { value: "703", label: "70.3" },
    { value: "ironman", label: "Ironman" },
  ],
  cycling: [
    { value: "crit", label: "Crit / Race" },
    { value: "tt40", label: "TT 40 km" },
    { value: "granfondo", label: "Gran Fondo" },
    { value: "century", label: "Century 100 mi" },
  ],
};

connectorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const source = button.dataset.source;
    if (connectedSources.has(source)) {
      connectedSources.delete(source);
      button.classList.remove("active");
    } else {
      connectedSources.add(source);
      button.classList.add("active");
    }
    connectionState.textContent =
      connectedSources.size > 0
        ? `Verbunden (Mock): ${[...connectedSources].join(", ")}`
        : t("no_sources");
    syncUiState();
  });
});

setDefaultRaceDate();
initDynamicGoalOptions();
initAdvancedSettingsToggle();
initScrollFx();
initStageReveals();
initLanguageSwitcher();
applyTranslations();
renderPerformanceInsights();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const profile = extractProfile(data);

  const plan = buildPlan(profile);
  generatedSessions = plan.sessions;
  generatedSessions.forEach((session, index) => {
    session._id = `session-${index}`;
  });
  latestProfile = profile;
  latestPlan = plan;

  renderAnalysis(profile, plan);
  renderPlan(plan);
  renderPerformanceInsights(profile, plan);
  exportIcalBtn.disabled = false;
  document.body.classList.add("has-output");
  syncUiState();
});

exportIcalBtn.addEventListener("click", () => {
  if (!generatedSessions.length) return;
  const ics = buildIcs(generatedSessions);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "aimrunna-trainingsplan.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

calendarEl?.addEventListener("click", (event) => {
  const button = event.target.closest?.("[data-zwift-session]");
  if (button) {
    const sessionId = button.getAttribute("data-zwift-session");
    const session = generatedSessions.find((item) => item._id === sessionId);
    if (!session) return;

    const zwo = buildZwiftWorkoutFile(session, latestProfile);
    downloadTextFile({
      content: zwo,
      filename: `${formatDateForFile(session.date)}-${slugify(session.title)}.zwo`,
      mimeType: "application/xml;charset=utf-8",
    });
    return;
  }

  const garminButton = event.target.closest?.("[data-garmin-session]");
  if (garminButton) {
    const sessionId = garminButton.getAttribute("data-garmin-session");
    const session = generatedSessions.find((item) => item._id === sessionId);
    if (!session) return;
    const payload = buildGarminWorkoutPlaceholder(session, latestProfile);
    downloadTextFile({
      content: JSON.stringify(payload, null, 2),
      filename: `${formatDateForFile(session.date)}-${slugify(session.title)}-garmin-workout.json`,
      mimeType: "application/json;charset=utf-8",
    });
    return;
  }

  const card = event.target.closest?.(".day-card[data-session-id]");
  if (!card) return;

  const sessionId = card.getAttribute("data-session-id");
  expandedSessionId = expandedSessionId === sessionId ? null : sessionId;
  syncExpandedDayCards();
  if (expandedSessionId) {
    const session = generatedSessions.find((item) => item._id === expandedSessionId);
    if (session) openSessionOverlay(session);
  } else {
    closeSessionOverlay();
  }
});

calendarEl?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest?.(".day-card[data-session-id]");
  if (!card) return;
  event.preventDefault();
  const sessionId = card.getAttribute("data-session-id");
  expandedSessionId = expandedSessionId === sessionId ? null : sessionId;
  syncExpandedDayCards();
  if (expandedSessionId) {
    const session = generatedSessions.find((item) => item._id === expandedSessionId);
    if (session) openSessionOverlay(session);
  } else {
    closeSessionOverlay();
  }
});

document.addEventListener("click", (event) => {
  if (!expandedSessionId) return;
  if (event.target.closest?.(".day-card[data-session-id]")) return;
  if (event.target.closest?.(".session-modal-card")) return;
  expandedSessionId = null;
  syncExpandedDayCards();
  closeSessionOverlay();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !expandedSessionId) return;
  expandedSessionId = null;
  syncExpandedDayCards();
  closeSessionOverlay();
});

sessionOverlayEl?.addEventListener("click", (event) => {
  if (!event.target.closest?.("[data-close-overlay]")) return;
  expandedSessionId = null;
  syncExpandedDayCards();
  closeSessionOverlay();
});

function setDefaultRaceDate() {
  const raceDateInput = form.elements.raceDate;
  const target = new Date();
  target.setDate(target.getDate() + 112);
  raceDateInput.value = formatDateInput(target);
}

function initDynamicGoalOptions() {
  if (!disciplineSelect || !goalDistanceSelect) return;

  const sync = ({ resetTime = false } = {}) => {
    const discipline = disciplineSelect.value;
    const options = GOAL_OPTIONS_BY_DISCIPLINE[discipline] || GOAL_OPTIONS_BY_DISCIPLINE.running;
    const previous = goalDistanceSelect.value;
    const validPrev = options.some((opt) => opt.value === previous);

    goalDistanceSelect.innerHTML = options
      .map((opt) => `<option value="${opt.value}">${opt.label}</option>`)
      .join("");

    goalDistanceSelect.value = validPrev ? previous : options[Math.min(1, options.length - 1)].value;

    if (resetTime) {
      const suggested = defaultGoalTimeFor(discipline, goalDistanceSelect.value);
      if (form?.elements?.goalTime && suggested) {
        form.elements.goalTime.value = suggested;
      }
    }
  };

  disciplineSelect.addEventListener("change", () => sync({ resetTime: true }));
  goalDistanceSelect.addEventListener("change", () => {
    const suggested = defaultGoalTimeFor(disciplineSelect.value, goalDistanceSelect.value);
    if (suggested && form?.elements?.goalTime && !String(form.elements.goalTime.value).trim()) {
      form.elements.goalTime.value = suggested;
    }
  });

  sexSelect?.addEventListener("change", syncCycleBasedTrainingAvailability);
  cycleTrainingCheckbox?.addEventListener("change", syncCycleBasedTrainingAvailability);
  sync();
  syncCycleBasedTrainingAvailability();
}

function initAdvancedSettingsToggle() {
  if (!advancedToggleBtn || !advancedSettingsEl) return;
  advancedToggleBtn.addEventListener("click", () => {
    const isOpen = advancedToggleBtn.getAttribute("aria-expanded") === "true";
    advancedToggleBtn.setAttribute("aria-expanded", String(!isOpen));
    advancedSettingsEl.hidden = isOpen;
  });
}

function syncCycleBasedTrainingAvailability() {
  if (!cycleTrainingField || !form?.elements?.cycleBasedTraining) return;
  const isFemale = sexSelect?.value === "female";
  const checkbox = form.elements.cycleBasedTraining;
  const cycleInputs = cycleDetailsGroup ? [...cycleDetailsGroup.querySelectorAll("input")] : [];

  cycleTrainingField.classList.toggle("is-disabled", !isFemale);
  checkbox.disabled = !isFemale;
  if (!isFemale) checkbox.checked = false;
  const cycleDetailsVisible = isFemale && checkbox.checked;

  if (cycleDetailsGroup) {
    cycleDetailsGroup.hidden = !cycleDetailsVisible;
  }
  cycleInputs.forEach((input) => {
    input.disabled = !cycleDetailsVisible;
    if (!cycleDetailsVisible) input.value = "";
  });
}

function initLanguageSwitcher() {
  if (!langButtons.length) return;
  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      if (!lang || lang === currentLang) return;
      currentLang = lang;
      langButtons.forEach((item) => item.classList.toggle("is-active", item === btn));
      applyTranslations();
      if (latestProfile && latestPlan) {
        renderAnalysis(latestProfile, latestPlan);
        renderPlan(latestPlan);
        renderPerformanceInsights(latestProfile, latestPlan);
        if (expandedSessionId) {
          const session = generatedSessions.find((s) => s._id === expandedSessionId);
          if (session) openSessionOverlay(session);
        }
      } else {
        connectionState.textContent = connectedSources.size ? `Verbunden (Mock): ${[...connectedSources].join(", ")}` : t("no_sources");
      }
    });
  });
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  setText(sessionLabelPurposeEl, t("purpose"));
  setText(sessionLabelAdaptationEl, t("adaptation"));
  setText(sessionLabelPhysiologyEl, t("physiology"));
  setText(sessionLabelWhyEl, t("why"));
  setText(sessionLabelKcalEl, currentLang === "de" ? "Tageskalorien" : currentLang === "ja" ? "推奨カロリー" : "Daily calories");
  const cycleLabel = currentLang === "de" ? "Zyklus-Hinweis" : currentLang === "ja" ? "周期メモ" : "Cycle note";
  const cycleLabelEl = document.getElementById("session-label-cycle");
  if (cycleLabelEl) cycleLabelEl.textContent = cycleLabel;
}

function t(key) {
  return I18N[currentLang]?.[key] || I18N.de[key] || key;
}

function defaultGoalTimeFor(discipline, goalDistance) {
  const map = {
    running: {
      "5k": "00:24:00",
      "10k": "00:52:00",
      half: "01:55:00",
      marathon: "03:45:00",
    },
    triathlon: {
      sprint: "01:25:00",
      olympic: "02:45:00",
      "703": "05:35:00",
      ironman: "11:25:00",
    },
    cycling: {
      crit: "01:05:00",
      tt40: "01:03:00",
      granfondo: "05:45:00",
      century: "05:55:00",
    },
  };
  return map[discipline]?.[goalDistance] || "02:59:00";
}

function buildSessionInsight(session, profile) {
  const title = String(session.title || "").toLowerCase();
  const discipline = profile?.discipline || latestProfile?.discipline || "running";
  const txt = (de, en, ja) => (currentLang === "de" ? de : currentLang === "ja" ? ja : en);

  if (session.type === "rest") {
    return {
      purpose: txt("Erholung aktiv sichern", "Secure recovery", "回復を確保する"),
      adaptation: txt("Ermüdung abbauen, Qualität für die nächste Key-Session vorbereiten", "Reduce fatigue and protect next key session quality", "疲労を抜いて次の重要練習の質を守る"),
      physiology: txt("Parasympathische Aktivierung, HRV-Stabilisierung, Gewebereparatur", "Parasympathetic recovery, HRV stabilization, tissue repair", "副交感神経優位・HRV安定・組織回復"),
      why: txt("Regeneration macht die harten Einheiten überhaupt erst wirksam.", "Recovery is what makes the hard sessions productive.", "回復があるからハード練習の効果が出ます。"),
    };
  }

  if (title.includes("threshold")) {
    return {
      purpose: txt("Renntempo länger stabil halten", "Hold race pace longer", "レースペースを長く維持する"),
      adaptation: txt("Schwellenleistung, Tempohärte, ökonomisches Arbeiten unter Druck", "Threshold durability and economical pace work", "閾値持久力と効率的なペース維持"),
      physiology: txt("Laktatschwelle (vLT2), Laktat-Clearance, aerobe Kapazität", "LT2 / lactate threshold, clearance, aerobic capacity", "乳酸閾値・乳酸処理・有酸素能力"),
      why: txt("Hilft dir, schnell zu bleiben ohne früh zu übersäuern.", "Helps you stay fast without flooding too early.", "早い段階で苦しくなりすぎず、速さを保ちやすくなる。"),
    };
  }

  if (title.includes("vo2")) {
    return {
      purpose: txt("Leistungsspitze und Reserve erhöhen", "Increase top-end power and reserve", "最高出力の余力を作る"),
      adaptation: txt("Härtere Rennphasen besser tolerieren", "Tolerate harder race surges", "レースの強い変化に対応しやすくする"),
      physiology: txt("VO2max, Herzzeitvolumen, anaerobe Kapazitätsanteile", "VO2max, cardiac output, anaerobic contribution", "VO2max・心肺出力・無酸素系耐性"),
      why: txt("Gibt dir Reserven für Attacken, Anstiege und Positionskämpfe.", "Builds reserve for surges, hills, and race positioning.", "アタックや登り、展開変化に対応する余力になる。"),
    };
  }

  if (title.includes("long")) {
    return {
      purpose: txt("Robustheit für lange Renndauer aufbauen", "Build durability for long race duration", "長時間レースの耐久性を作る"),
      adaptation: txt(
        discipline === "triathlon" ? "Fueling, muskuläre Ausdauer, Brick-Verträglichkeit" : "Grundlagenausdauer, Pacing, muskuläre Ausdauer",
        discipline === "triathlon" ? "Fueling, muscular endurance, brick tolerance" : "Aerobic base, pacing, muscular endurance",
        "補給・筋持久力・持久耐性"
      ),
      physiology: txt("Mitochondriale Dichte, Fettstoffwechsel, muskuläre Ermüdungsresistenz", "Mitochondrial density, fat oxidation, fatigue resistance", "ミトコンドリア・脂質代謝・筋疲労耐性"),
      why: txt("Diese Einheit macht dich wettkampftauglich über Distanz.", "This is what makes you race-ready over distance.", "長い距離で最後まで戦える土台を作る。"),
    };
  }

  if (title.includes("swim")) {
    return {
      purpose: txt("Wasserlage und Technik stabilisieren", "Stabilize swim mechanics", "泳ぎの姿勢と技術を安定させる"),
      adaptation: txt("Effizienz, Rhythmus, Zugqualität", "Efficiency, rhythm, stroke quality", "効率・リズム・ストローク品質"),
      physiology: txt("Bewegungsökonomie, Atemrhythmus, spezifische Ausdauer", "Movement economy, breathing rhythm, specific endurance", "動作効率・呼吸リズム・種目特異的持久力"),
      why: txt("Spart Energie für Bike und Run und verbessert deinen Rennfluss.", "Saves energy for bike/run and improves race flow.", "バイクとランに体力を残し、レース全体の流れを良くする。"),
    };
  }

  return {
    purpose: txt("Form und Kontinuität sichern", "Build form and consistency", "継続してベースを積む"),
    adaptation: txt("Saubere Grundlage, Bewegungsökonomie, Belastungsverträglichkeit", "Base work, economy, and durability", "基礎・効率・負荷耐性"),
    physiology: txt("Aerobe Kapazität, Bewegungsökonomie, Ermüdungsresistenz", "Aerobic capacity, economy, fatigue resistance", "有酸素能力・効率・疲労耐性"),
    why: txt("Diese Einheiten verbinden den Plan und machen Fortschritt reproduzierbar.", "These sessions connect the plan and make progress repeatable.", "これらの練習が計画全体をつなぎ、再現性のある成長につながる。"),
  };
}

function syncExpandedDayCards() {
  document.querySelectorAll(".day-card[data-session-id]").forEach((card) => {
    const isOpen = card.getAttribute("data-session-id") === expandedSessionId;
    card.classList.toggle("is-expanded", isOpen);
    card.setAttribute("aria-expanded", String(isOpen));
  });
}

function openSessionOverlay(session) {
  if (!sessionOverlayEl) return;
  const insight = buildSessionInsight(session, latestProfile);
  const nutrition = estimateSessionNutrition(session, latestProfile);
  const cycleBlock = document.getElementById("session-cycle-block");
  const cycleValue = document.getElementById("session-modal-cycle");
  const cycleActive = latestProfile?.sex === "female" && latestProfile?.cycleBasedTraining;
  setText(sessionModalMetaEl, `${sessionTypeLabel(session.type)} • ${dayName(session.date)} ${session.date.getDate()}.${session.date.getMonth() + 1}.`);
  setText(sessionModalTitleEl, session.title);
  setText(sessionModalSubEl, session.details);
  setText(sessionModalPurposeEl, insight.purpose);
  setText(sessionModalAdaptationEl, insight.adaptation);
  setText(sessionModalPhysiologyEl, insight.physiology);
  setText(sessionModalWhyEl, insight.why);
  setText(sessionModalKcalEl, `${nutrition.kcal} kcal`);
  setText(sessionModalCarbEl, `${nutrition.carbsG}g`);
  setText(sessionModalProteinEl, `${nutrition.proteinG}g`);
  setText(sessionModalFatEl, `${nutrition.fatG}g`);
  if (cycleBlock && cycleValue) {
    cycleBlock.hidden = !cycleActive;
    if (cycleActive) {
      const cycleHint = buildCycleGuidance(latestProfile, session);
      setText(
        cycleValue,
        cycleHint
      );
    }
  }
  sessionOverlayEl.hidden = false;
}

function closeSessionOverlay() {
  if (!sessionOverlayEl) return;
  sessionOverlayEl.hidden = true;
}

function extractProfile(data) {
  const raceDate = new Date(`${data.get("raceDate")}T09:00:00`);
  const sex = String(data.get("sex") || "");
  const ageRaw = String(data.get("age") || "").trim();
  const weightRaw = String(data.get("weightKg") || "").trim();
  const cycleDayRaw = String(data.get("cycleDay") || "").trim();
  const cycleLengthRaw = String(data.get("cycleLengthDays") || "").trim();
  return {
    discipline: data.get("discipline"),
    fitnessLevel: data.get("fitnessLevel"),
    experience: data.get("experience"),
    weeklyHours: Number(data.get("weeklyHours")),
    goalDistance: data.get("goalDistance"),
    goalTime: String(data.get("goalTime") || "").trim(),
    raceDate,
    constraints: String(data.get("constraints") || "").trim(),
    sex: sex || null,
    age: ageRaw ? Number(ageRaw) : null,
    weightKg: weightRaw ? Number(weightRaw) : null,
    cycleBasedTraining: data.get("cycleBasedTraining") === "on",
    cycleDay: cycleDayRaw ? Number(cycleDayRaw) : null,
    cycleLengthDays: cycleLengthRaw ? Number(cycleLengthRaw) : null,
    connectedSources: [...connectedSources],
  };
}

function buildCycleGuidance(profile, session) {
  const cycleDay = Number(profile?.cycleDay) || null;
  const cycleLength = Number(profile?.cycleLengthDays) || 28;
  const txt = (de, en, ja) => (currentLang === "de" ? de : currentLang === "ja" ? ja : en);

  if (!cycleDay) {
    return txt(
      "Zyklusmodus aktiv: Für präzisere Intensitätssteuerung optional den aktuellen Zyklustag (und idealerweise die Ø Zykluslänge) im Feintuning eintragen.",
      "Cycle mode active: Add current cycle day (and ideally avg cycle length) in Fine tune for more precise intensity guidance.",
      "周期モード有効：より正確な強度調整のため、詳細設定で現在の周期日（可能なら平均周期日数）を入力してください。"
    );
  }

  const normalizedDay = clamp(Math.round(cycleDay), 1, Math.max(21, cycleLength));
  const ovulationWindowStart = Math.max(10, Math.round(cycleLength * 0.4));
  const ovulationWindowEnd = Math.min(cycleLength, ovulationWindowStart + 4);
  let phase = "follicular";
  if (normalizedDay <= 5) phase = "menstrual";
  else if (normalizedDay >= ovulationWindowStart && normalizedDay <= ovulationWindowEnd) phase = "ovulation";
  else if (normalizedDay > ovulationWindowEnd) phase = "luteal";

  const isHighIntensity = /threshold|vo2|quality/i.test(String(session?.title || ""));
  const guidanceByPhase = {
    menstrual: txt(
      `Zyklustag ${normalizedDay}/${cycleLength} (frühe Phase): Readiness eng beobachten. Bei Krämpfen/low energy Einheit auf locker/Technik skalieren.`,
      `Cycle day ${normalizedDay}/${cycleLength} (early phase): watch readiness closely. Scale to easy/technique if cramps or low energy show up.`,
      `周期 ${normalizedDay}/${cycleLength}（初期）：Readinessを慎重に確認。痛みや低エネルギー時は軽め/技術中心に調整。`
    ),
    follicular: txt(
      `Zyklustag ${normalizedDay}/${cycleLength} (Aufbauphase): Häufig gute Verträglichkeit für Qualität. Heute ${isHighIntensity ? "intensive Reize gut möglich, solange Readiness passt." : "saubere Progression und Technikfokus nutzen."}`,
      `Cycle day ${normalizedDay}/${cycleLength} (build phase): often a good window for quality. Today ${isHighIntensity ? "harder work can fit well if readiness supports it." : "use clean progression and technique focus."}`,
      `周期 ${normalizedDay}/${cycleLength}（構築期）：高品質練習がはまりやすい時期。今日は${isHighIntensity ? "Readinessが良ければ強度を入れやすい。" : "丁寧な積み上げと技術重視が有効。"}`
    ),
    ovulation: txt(
      `Zyklustag ${normalizedDay}/${cycleLength} (Ovulationsfenster): Gute Top-End-Tage sind möglich. Warm-up sauber verlängern, Stabilität/Koordination bewusst halten.`,
      `Cycle day ${normalizedDay}/${cycleLength} (ovulation window): top-end days can be great. Extend warm-up and stay intentional with stability/coordination.`,
      `周期 ${normalizedDay}/${cycleLength}（排卵期付近）：高い出力が出やすい場合あり。ウォームアップを長めにして安定性を意識。`
    ),
    luteal: txt(
      `Zyklustag ${normalizedDay}/${cycleLength} (Lutealphase): Temperatur/Belastungsgefühl kann höher sein. Fueling + Hydration früher setzen, Qualität bei Bedarf leicht entschärfen.`,
      `Cycle day ${normalizedDay}/${cycleLength} (luteal phase): heat and RPE may feel higher. Fuel/hydrate earlier and soften quality slightly if needed.`,
      `周期 ${normalizedDay}/${cycleLength}（黄体期）：体温や主観的強度が上がりやすい。補給/水分を早めに入れ、必要なら強度を少し調整。`
    ),
  };

  return guidanceByPhase[phase];
}

function buildPlan(profile) {
  const today = startOfDay(new Date());
  const raceDate = startOfDay(profile.raceDate);
  const daysToRace = Math.max(14, Math.ceil((raceDate - today) / 86400000));
  const weeks = clamp(Math.ceil(daysToRace / 7), 6, 20);

  const weeklyKmBase = estimateBaseKm(profile);
  const sessions = [];
  const weekModels = [];

  let currentWeekStart = startOfWeek(today);

  for (let weekIndex = 0; weekIndex < weeks; weekIndex += 1) {
    const isDeload = (weekIndex + 1) % 4 === 0 && weekIndex !== weeks - 1;
    const isTaper = weekIndex >= weeks - 2;
    const loadFactor = isTaper ? (weekIndex === weeks - 1 ? 0.45 : 0.7) : isDeload ? 0.8 : 1 + weekIndex * 0.03;
    const weekKm = Math.round(weeklyKmBase * loadFactor);
    const qualityLabel = profile.fitnessLevel === "starter" ? "Controlled Threshold" : "Threshold Session";
    const weekFocus = isTaper
      ? weekIndex === weeks - 1
        ? "Race Week / Frische"
        : "Taper / Spezifische Schärfe"
      : isDeload
        ? "Deload / Absorption"
        : "Build / Controlled Progression";

    const dayTemplates = createWeekSessions({
      profile,
      weekIndex,
      weekKm,
      qualityLabel,
      isDeload,
      isTaper,
      currentWeekStart,
      raceDate,
    });

    const weekDays = dayTemplates.map((session, dayOffset) => {
      const date = addDays(currentWeekStart, dayOffset);
      const enriched = {
        ...session,
        date,
        weekIndex,
      };
      if (session.type !== "rest" && date <= raceDate) {
        sessions.push(enriched);
      }
      return enriched;
    });

    weekModels.push({
      weekNumber: weekIndex + 1,
      start: currentWeekStart,
      end: addDays(currentWeekStart, 6),
      focus: weekFocus,
      loadKm: weekKm,
      loadHours: estimateHoursFromKm(profile, weekKm),
      days: weekDays,
    });

    currentWeekStart = addDays(currentWeekStart, 7);
  }

  return {
    weeks: weekModels,
    sessions,
    meta: {
      daysToRace,
      weeks,
      weeklyKmBase,
    },
  };
}

function createWeekSessions({
  profile,
  weekIndex,
  weekKm,
  qualityLabel,
  isDeload,
  isTaper,
  currentWeekStart,
  raceDate,
}) {
  if (profile.discipline === "triathlon") {
    return createTriathlonWeekSessions({
      profile,
      weekIndex,
      weekKm,
      isDeload,
      isTaper,
      currentWeekStart,
      raceDate,
    });
  }

  if (profile.discipline === "cycling") {
    return createCyclingWeekSessions({
      profile,
      weekIndex,
      weekKm,
      isDeload,
      isTaper,
      currentWeekStart,
      raceDate,
    });
  }

  const longRunKm = Math.max(12, Math.round(weekKm * (isTaper ? 0.22 : 0.3)));
  const easyKm = Math.max(6, Math.round(weekKm * 0.14));
  const recoveryKm = Math.max(5, Math.round(weekKm * 0.1));
  const qualityKm = Math.max(8, Math.round(weekKm * 0.17));
  const doubleThreshold = profile.fitnessLevel === "advanced" && profile.weeklyHours >= 10 && !isTaper;
  const raceWeek = sameWeek(currentWeekStart, raceDate);

  const days = [
    { type: "recovery", title: "Recovery Run", details: `${recoveryKm} km locker + Mobility`, duration: `${45 + Math.round(recoveryKm * 3)} min` },
    {
      type: "threshold",
      title: qualityLabel,
      details: doubleThreshold ? "AM: 5x6' / PM: 10x1k (kontrolliert)" : "6x1 km @ Schwelle, lockere Pausen",
      duration: doubleThreshold ? "2x 55 min" : "70 min",
    },
    { type: "rest", title: "Regeneration", details: "Optional Walk / Mobility / Schlaf-Fokus", duration: "20-30 min optional" },
    {
      type: "quality",
      title: "VO2 / Speed Support",
      details: isDeload ? "Kurze Bergläufe + Technik" : "12x400m kontrolliert schnell, nicht all-out",
      duration: isDeload ? "50 min" : "65 min",
    },
    { type: "recovery", title: "Easy Aerobic", details: `${easyKm} km locker, nasal / low HR`, duration: `${40 + easyKm * 4} min` },
    { type: "longrun", title: "Long Run", details: `${longRunKm} km progressiv (letztes Drittel steady)`, duration: `${80 + longRunKm * 4} min` },
    {
      type: "recovery",
      title: "Easy + Strides",
      details: raceWeek ? "25-40 min locker, 4-6 Strides" : "50 min locker + 6 Strides",
      duration: raceWeek ? "30-40 min" : "50 min",
    },
  ];

  if (raceWeek) {
    const raceDayIndex = dayIndexFromDate(raceDate);
    days[raceDayIndex] = {
      type: "quality",
      title: "Race Day",
      details: `${labelDistance(profile.goalDistance)} - Ziel: ${profile.goalTime}`,
      duration: "Event",
    };
  } else if (isTaper && weekIndex % 2 === 0) {
    days[3] = {
      type: "threshold",
      title: "Sharpener",
      details: "3x8' @ Schwelle + 4x200m flott",
      duration: "55 min",
    };
  }

  return days;
}

function createTriathlonWeekSessions({ profile, weekKm, isDeload, isTaper, currentWeekStart, raceDate }) {
  const raceWeek = sameWeek(currentWeekStart, raceDate);
  const bikeVolume = Math.max(80, Math.round(weekKm * 4.6));
  const runVolume = Math.max(20, Math.round(weekKm * 0.85));
  const swimVolume = Math.max(4, Math.round(weekKm * 0.12));

  const cycleAware = profile.sex === "female" && profile.cycleBasedTraining;
  const days = [
    {
      type: "recovery",
      title: "Swim + Easy Run",
      details: `${swimVolume} km Technik + ${Math.round(runVolume * 0.22)} km locker`,
      duration: "60-80 min",
    },
    {
      type: "threshold",
      title: "Bike Threshold",
      details: isDeload
        ? "4x8' @ Z4 kontrolliert"
        : cycleAware
          ? "Schwellenblock adaptiv (zyklusorientiert) + kurze Brick-Run"
          : "3x12' @ Z4 + kurze Brick-Run",
      duration: isDeload ? "75 min" : "95 min",
    },
    {
      type: "quality",
      title: "Swim Quality",
      details: "Main Set @ CSS + Pull / Technik",
      duration: "55-70 min",
    },
    {
      type: "recovery",
      title: "Aerobic Run",
      details: `${Math.round(runVolume * 0.28)} km low HR + Strides`,
      duration: "50-75 min",
    },
    {
      type: "threshold",
      title: "Run Threshold",
      details: cycleAware
        ? "Schwellenarbeit adaptiv nach Phase / Readiness"
        : isTaper
          ? "3x8' steady / controlled"
          : "2x20' @ Schwelle (kontrolliert)",
      duration: isTaper ? "55 min" : "75 min",
    },
    {
      type: "longrun",
      title: "Long Bike + Brick",
      details: `${bikeVolume} km Bike + ${Math.round(runVolume * 0.15)} km Brick Run`,
      duration: isTaper ? "2:20-3:00 h" : "3:15-4:30 h",
    },
    {
      type: "rest",
      title: "Recovery / Mobility",
      details: "Optional Easy Swim, Mobility, Sleep, Fueling",
      duration: "Optional",
    },
  ];

  if (raceWeek) {
    const raceDayIndex = dayIndexFromDate(raceDate);
    days[raceDayIndex] = {
      type: "quality",
      title: "Race Day",
      details: `${labelDistance(profile.goalDistance)} - Ziel: ${profile.goalTime}`,
      duration: "Event",
    };
  }

  return days;
}

function createCyclingWeekSessions({ profile, weekKm, isDeload, isTaper, currentWeekStart, raceDate }) {
  const raceWeek = sameWeek(currentWeekStart, raceDate);
  const bikeKm = Math.max(120, Math.round(weekKm * 3.8));
  const enduranceKm = Math.max(40, Math.round(bikeKm * 0.22));
  const longKm = Math.max(65, Math.round(bikeKm * (isTaper ? 0.32 : 0.42)));

  const days = [
    { type: "recovery", title: "Recovery Spin", details: "45-60 min locker, hohe Kadenz", duration: "45-60 min" },
    {
      type: "threshold",
      title: "Threshold Intervals",
      details: isDeload ? "4x8' @ FTP" : "3x15' @ Sweet Spot / FTP",
      duration: isDeload ? "75 min" : "95 min",
    },
    { type: "rest", title: "Rest / Mobility", details: "Optional Walk, Mobility, Schlaf", duration: "Optional" },
    {
      type: "quality",
      title: "VO2 Bike Session",
      details: isTaper ? "6x2' sharpeners" : "5x4' @ VO2 + locker rollen",
      duration: isTaper ? "55 min" : "70 min",
    },
    { type: "recovery", title: "Endurance Ride", details: `${enduranceKm} km Z2 steady`, duration: "75-120 min" },
    { type: "longrun", title: "Long Ride", details: `${longKm} km progressiv / fueling practice`, duration: "2:30-4:30 h" },
    { type: "recovery", title: "Easy Spin + Cadence", details: "50 min locker + 6x high cadence spin-ups", duration: "50 min" },
  ];

  if (raceWeek) {
    const raceDayIndex = dayIndexFromDate(raceDate);
    days[raceDayIndex] = {
      type: "quality",
      title: "Race Day",
      details: `${labelDistance(profile.goalDistance)} - Ziel: ${profile.goalTime}`,
      duration: "Event",
    };
  }

  return days;
}

function renderAnalysis(profile, plan) {
  const goalLabel = `${labelDistance(profile.goalDistance)} in ${profile.goalTime}`;
  const readiness = calcReadiness(profile, plan.meta.weeklyKmBase);
  const connected = profile.connectedSources.length ? profile.connectedSources.join(", ") : "keine";
  const notes = profile.constraints ? `\nEinschränkung berücksichtigt (manuell): ${profile.constraints}` : "";
  const optionalProfileNotes = [
    profile.age ? `Alter ${profile.age}` : null,
    profile.weightKg ? `${profile.weightKg} kg` : null,
    profile.sex ? `Geschlecht ${sexLabel(profile.sex)}` : null,
    profile.sex === "female" && profile.cycleBasedTraining ? "zyklusbasiert aktiv" : null,
  ]
    .filter(Boolean)
    .join(" / ");
  const loadUnit = profile.discipline === "triathlon" ? "Load-Index/Woche" : "km/Woche";
  const planLogicText =
    profile.discipline === "triathlon"
      ? "Triathlon-Struktur mit Bike/Run/Swim-Schwerpunkten, Brick-Sessions, Deload/Taper"
      : profile.discipline === "cycling"
        ? "Bike-zentrierte Struktur mit FTP/Sweet Spot, VO2, Long Ride, Deload/Taper"
      : "Schwellenorientierte Struktur mit 1-2 Qualitätstagen, Long Run, Deload/Taper";

  statusEl.textContent =
    `Status-quo (MVP Heuristik)\n` +
    `• Profil: ${fitnessText(profile.fitnessLevel)} / Erfahrung ${experienceText(profile.experience)}\n` +
    (optionalProfileNotes ? `• Optionales Profil: ${optionalProfileNotes}\n` : "") +
    `• Geschätzte Basisbelastung: ${plan.meta.weeklyKmBase} ${loadUnit} (~${profile.weeklyHours} h verfügbar)\n` +
    `• Ziel: ${goalLabel}\n` +
    `• Datenquellen: ${connected}\n` +
    `• Einschätzung: ${readiness}\n` +
    `• Planlogik: ${planLogicText}${notes}\n\n` +
    `Hinweis: Für echte NTM-Qualität brauchen wir als Nächstes reale Daten (Pace/HR/HRV/Recovery), Belastungsmetriken und individualisierte Schwellenwerte.`;
}

function renderPlan(plan) {
  const firstWeek = plan.weeks[0];
  const lastWeek = plan.weeks[plan.weeks.length - 1];
  const isTri = latestProfile?.discipline === "triathlon";
  planMetaEl.textContent = `${plan.weeks.length} Wochen bis Ziel • Zeitraum ${formatDateShort(firstWeek.start)}-${formatDateShort(lastWeek.end)} • Basis ${plan.meta.weeklyKmBase} ${isTri ? "Load-Index/Woche" : "km/Woche"}`;

  calendarEl.innerHTML = "";

  for (const week of plan.weeks) {
    const node = weekTemplate.content.firstElementChild.cloneNode(true);
    node.querySelector(".week-label").textContent = `Woche ${week.weekNumber} • ${formatDateShort(week.start)}-${formatDateShort(week.end)}`;
    node.querySelector(".week-focus").textContent = week.focus;
    node.querySelector(".week-load").textContent = isTri ? `~${week.loadKm} Load • ~${week.loadHours} h` : `~${week.loadKm} km • ~${week.loadHours} h`;

    const dayGrid = node.querySelector(".day-grid");
    week.days.forEach((day) => {
      const dayCard = document.createElement("div");
      dayCard.className = `day-card ${day.type === "rest" ? "rest" : ""}`;
      if (day._id) {
        dayCard.setAttribute("data-session-id", day._id);
        dayCard.setAttribute("role", "button");
        dayCard.setAttribute("tabindex", "0");
      }
      const insight = buildSessionInsight(day, latestProfile);
      const actionButtons = [];
      if (isZwiftEligibleSession(day) && day._id) {
        actionButtons.push(`<button type="button" class="day-zwift-btn" data-zwift-session="${escapeHtml(day._id)}">ZWO</button>`);
      }
      if (isGarminEligibleSession(day) && day._id) {
        actionButtons.push(`<button type="button" class="day-garmin-btn" data-garmin-session="${escapeHtml(day._id)}">Garmin</button>`);
      }
      const actionRow = actionButtons.length ? `<div class="day-action-row">${actionButtons.join("")}</div>` : `<div></div>`;
      dayCard.innerHTML = `
        <div class="day-top">
          <span class="day-name">${dayName(day.date)}</span>
          <span class="day-date">${day.date.getDate()}.${day.date.getMonth() + 1}.</span>
        </div>
        <div class="day-type ${day.type}">${sessionTypeLabel(day.type)}</div>
        <div class="day-main">${escapeHtml(day.title)}</div>
        <div class="day-sub">${escapeHtml(day.details)}</div>
        ${actionRow}
        <div class="day-detail" aria-hidden="true">
          <div class="day-detail-row"><span>${t("purpose")}</span><strong>${escapeHtml(insight.purpose)}</strong></div>
          <div class="day-detail-row"><span>${t("adaptation")}</span><strong>${escapeHtml(insight.adaptation)}</strong></div>
          <div class="day-detail-row"><span>${t("why")}</span><strong>${escapeHtml(insight.why)}</strong></div>
        </div>
      `;
      dayGrid.appendChild(dayCard);
    });

    calendarEl.appendChild(node);
  }

  syncExpandedDayCards();
}

function renderPerformanceInsights(profile = latestProfile, plan = latestPlan) {
  if (!fitnessChartEl) return;

  if (!profile || !plan) {
    setMetricValues({
      vo2: "-",
      fitness: "-",
      fatigue: "-",
      freshness: "-",
      readiness: "-",
    });
  setExtendedMetricsToEmpty();
  fitnessChartEl.innerHTML = buildEmptyChartSvg();
  renderMiniSparks();
  return;
  }

  const series = buildPerformanceSeries(profile, plan, connectedSources.size);
  const last = series[series.length - 1];
  const readinessLabel = readinessBand(last.readiness);
  const extended = buildExtendedMetrics(profile, plan, series, connectedSources.size);

  setMetricValues({
    vo2: `${last.vo2.toFixed(1)}`,
    fitness: `${Math.round(last.fitness)}`,
    fatigue: `${Math.round(last.fatigue)}`,
    freshness: `${Math.round(last.freshness)}`,
    readiness: `${Math.round(last.readiness)} · ${readinessLabel}`,
  });
  setExtendedMetricValues(extended);

  fitnessChartEl.innerHTML = buildChartSvg(series);
  renderMiniSparks(series, profile);
}

function buildIcs(sessions) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AImRUNNA//Training Plan Prototype//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  sessions.forEach((session, index) => {
    const start = new Date(session.date);
    start.setHours(7, 0, 0, 0);
    const end = new Date(start);
    end.setHours(8, 0, 0, 0);
    const stamp = toIcsDateTime(new Date());

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:aimrunna-${index}-${toIcsDateTime(start)}@local`);
    lines.push(`DTSTAMP:${stamp}`);
    lines.push(`DTSTART:${toIcsDateTime(start)}`);
    lines.push(`DTEND:${toIcsDateTime(end)}`);
    lines.push(`SUMMARY:${escapeIcs(`${sessionTypeLabel(session.type)} | ${session.title}`)}`);
    lines.push(`DESCRIPTION:${escapeIcs(session.details)}`);
    lines.push("END:VEVENT");
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

function getZwiftEligibleSessions(sessions) {
  return sessions.filter(isZwiftEligibleSession);
}

function isZwiftEligibleSession(session) {
  const title = String(session.title || "").toLowerCase();
  const details = String(session.details || "").toLowerCase();
  const looksBike =
    title.includes("bike") ||
    title.includes("brick") ||
    details.includes("bike") ||
    details.includes("z4");
  const structuredType = session.type === "threshold" || session.type === "quality" || session.type === "longrun";
  return looksBike && structuredType;
}

function isGarminEligibleSession(session) {
  if (!session || session.type === "rest") return false;
  const title = String(session.title || "").toLowerCase();
  const details = String(session.details || "").toLowerCase();
  const isSwim = title.includes("swim") || details.includes("css") || details.includes("technik");
  const isRun = title.includes("run") || title.includes("strides") || (details.includes("km") && !title.includes("bike"));
  return isSwim || isRun;
}

function buildGarminWorkoutPlaceholder(session, profile) {
  return {
    format: "GARMIN_WORKOUT_PLACEHOLDER",
    note: "Placeholder export for future FIT generation backend. Next step: map this payload to .fit via Garmin FIT SDK.",
    discipline: profile?.discipline || "running",
    athlete: {
      sex: profile?.sex || null,
      age: profile?.age || null,
      weightKg: profile?.weightKg || null,
    },
    goal: {
      format: profile?.goalDistance || null,
      time: profile?.goalTime || null,
    },
    workout: {
      title: session.title,
      type: session.type,
      details: session.details,
      dateIso: session.date ? session.date.toISOString() : null,
    },
  };
}

function buildZwiftWorkoutFile(session, profile) {
  const title = session.title || "Workout";
  const workoutName = `${labelDistance(profile?.goalDistance || "olympic")} | ${title}`;
  const description = `${session.details || ""} | Exported by AImRUNNA Prototype`;
  const tags = zwiftBlocksForSession(session);

  return `<?xml version="1.0" encoding="UTF-8"?>
<workout_file>
  <author>AImRUNNA</author>
  <name>${escapeXml(workoutName)}</name>
  <description>${escapeXml(description)}</description>
  <sportType>bike</sportType>
  <tags>
    <tag name="triathlon"/>
    <tag name="aimrunna"/>
  </tags>
  <workout>
${tags.map((line) => `    ${line}`).join("\n")}
  </workout>
</workout_file>`;
}

function zwiftBlocksForSession(session) {
  const title = String(session.title || "").toLowerCase();
  const details = String(session.details || "").toLowerCase();

  if (title.includes("bike threshold")) {
    return [
      '<Warmup Duration="600" PowerLow="0.50" PowerHigh="0.75"/>',
      '<IntervalsT Repeat="3" OnDuration="720" OffDuration="240" OnPower="0.95" OffPower="0.60"/>',
      '<SteadyState Duration="300" Power="0.72"/>',
      '<Cooldown Duration="480" PowerLow="0.70" PowerHigh="0.45"/>',
    ];
  }

  if (title.includes("long bike")) {
    return [
      '<Warmup Duration="600" PowerLow="0.50" PowerHigh="0.70"/>',
      '<SteadyState Duration="3600" Power="0.70"/>',
      '<SteadyState Duration="2400" Power="0.74"/>',
      '<SteadyState Duration="1800" Power="0.78"/>',
      '<SteadyState Duration="900" Power="0.82"/>',
      '<Cooldown Duration="600" PowerLow="0.70" PowerHigh="0.45"/>',
    ];
  }

  if (title.includes("brick") || details.includes("z4")) {
    return [
      '<Warmup Duration="480" PowerLow="0.50" PowerHigh="0.72"/>',
      '<IntervalsT Repeat="4" OnDuration="480" OffDuration="180" OnPower="0.90" OffPower="0.58"/>',
      '<SteadyState Duration="600" Power="0.78"/>',
      '<Cooldown Duration="420" PowerLow="0.68" PowerHigh="0.45"/>',
    ];
  }

  return [
    '<Warmup Duration="480" PowerLow="0.50" PowerHigh="0.70"/>',
    '<SteadyState Duration="1800" Power="0.76"/>',
    '<IntervalsT Repeat="3" OnDuration="300" OffDuration="180" OnPower="0.92" OffPower="0.58"/>',
    '<Cooldown Duration="420" PowerLow="0.68" PowerHigh="0.45"/>',
  ];
}

function buildPerformanceSeries(profile, plan, sourceCount) {
  const points = 90;
  const series = [];
  const levelBase = { starter: 38, intermediate: 49, advanced: 58 }[profile.fitnessLevel];
  const ageAdj = profile.age ? clamp((42 - profile.age) * 0.08, -2.8, 2.2) : 0;
  const weightAdj = profile.weightKg ? clamp((72 - profile.weightKg) * 0.05, -3.4, 2.5) : 0;
  const sexAdj = profile.sex === "female" ? -0.4 : profile.sex === "male" ? 0.2 : 0;
  const sourceBoost = sourceCount * 1.1;
  const goalBoost = goalSpecificBoost(profile);
  const baseFitness = levelBase + ageAdj + weightAdj + sexAdj + goalBoost + Math.min(8, plan.meta.weeklyKmBase / 12) + sourceBoost;

  for (let i = 0; i < points; i += 1) {
    const t = i / (points - 1);
    const ramp = t * (6 + sourceCount * 1.4);
    const cycle = Math.sin(t * Math.PI * 5.4) * 4.4;
    const micro = Math.sin(t * Math.PI * 18) * 1.1;

    const fitness = clamp(baseFitness - 8 + ramp + cycle * 0.35 + micro * 0.2, 20, 100);
    const fatigue = clamp(fitness + 5 + Math.sin(t * Math.PI * 6.2 + 0.7) * 8 + (1 - t) * 2, 18, 100);
    const freshness = clamp(62 - (fatigue - fitness) * 1.8 + Math.cos(t * Math.PI * 4.1) * 6, 10, 95);
    const readiness = clamp((freshness * 0.45 + (100 - (fatigue - fitness + 35)) * 0.2 + fitness * 0.35), 15, 98);
    const vo2 = clamp(levelBase + 0.8 + t * (profile.fitnessLevel === "starter" ? 1.8 : 1.1) + Math.sin(t * Math.PI * 3.7) * 0.35, 30, 78);

    series.push({ fitness, fatigue, freshness, readiness, vo2 });
  }

  return series;
}

function buildEmptyChartSvg() {
  return `
    <rect x="0" y="0" width="960" height="320" fill="rgba(255,255,255,0.002)"></rect>
    ${buildChartGrid()}
    <text x="40" y="162" fill="rgba(255,255,255,0.45)" font-size="14" font-family="Inter, sans-serif">
      Verbinde Datenquellen und generiere einen Plan, um Trendlinien zu sehen.
    </text>
  `;
}

function buildChartSvg(series) {
  const width = 960;
  const height = 320;
  const pad = { top: 20, right: 20, bottom: 28, left: 36 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;

  const xFor = (index) => pad.left + (index / (series.length - 1)) * innerW;
  const yFor = (value) => pad.top + (1 - value / 100) * innerH;

  const pathFor = (key) =>
    series
      .map((point, index) => `${index === 0 ? "M" : "L"} ${xFor(index).toFixed(1)} ${yFor(point[key]).toFixed(1)}`)
      .join(" ");

  const lastX = xFor(series.length - 1).toFixed(1);
  const labels = [
    { key: "fitness", color: "var(--accent-fit)" },
    { key: "fatigue", color: "var(--accent-fatigue)" },
    { key: "freshness", color: "var(--accent-fresh)" },
    { key: "readiness", color: "var(--accent-ready)" },
    { key: "vo2", color: "var(--accent-vo2)" },
  ];

  const labelMarks = labels
    .map((item, idx) => {
      const y = yFor(series[series.length - 1][item.key]);
      return `
        <circle cx="${lastX}" cy="${y.toFixed(1)}" r="3" fill="${item.color}" opacity="${item.key === "vo2" ? 0.95 : 0.85}"></circle>
        <text x="${Math.max(8, Number(lastX) - 8)}" y="${(y - 8 - idx * 2).toFixed(1)}" text-anchor="end" fill="${item.color}" opacity="0.9" font-size="10">${item.key.toUpperCase()}</text>
      `;
    })
    .join("");

  return `
    <defs>
      <linearGradient id="chartFade" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.03)"></stop>
        <stop offset="100%" stop-color="rgba(255,255,255,0)"></stop>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${width}" height="${height}" fill="rgba(255,255,255,0.002)"></rect>
    ${buildChartGrid(width, height, pad)}
    <rect x="${pad.left}" y="${pad.top}" width="${innerW}" height="${innerH}" fill="url(#chartFade)" opacity="0.35"></rect>
    <path class="trend-line fit" d="${pathFor("fitness")}" stroke="var(--accent-fit)" stroke-width="2.2"></path>
    <path class="trend-line fatigue" d="${pathFor("fatigue")}" stroke="var(--accent-fatigue)" stroke-width="2" opacity="0.9"></path>
    <path class="trend-line fresh" d="${pathFor("freshness")}" stroke="var(--accent-fresh)" stroke-width="1.9" opacity="0.92"></path>
    <path class="trend-line ready" d="${pathFor("readiness")}" stroke="var(--accent-ready)" stroke-width="1.9" opacity="0.88"></path>
    <path class="trend-line vo2" d="${pathFor("vo2")}" stroke="var(--accent-vo2)" stroke-width="1.9" stroke-dasharray="5 4" opacity="0.92"></path>
    ${labelMarks}
  `;
}

function buildChartGrid(width = 960, height = 320, pad = { top: 20, right: 20, bottom: 28, left: 36 }) {
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const horizontal = [0, 25, 50, 75, 100]
    .map((v) => {
      const y = pad.top + (1 - v / 100) * innerH;
      return `
        <line x1="${pad.left}" x2="${pad.left + innerW}" y1="${y}" y2="${y}" stroke="rgba(255,255,255,0.06)" stroke-width="1"></line>
        <text x="${pad.left - 8}" y="${y + 4}" text-anchor="end" fill="rgba(255,255,255,0.34)" font-size="10">${v}</text>
      `;
    })
    .join("");

  const vertical = new Array(7)
    .fill(0)
    .map((_, i) => {
      const x = pad.left + (i / 6) * innerW;
      return `<line x1="${x}" x2="${x}" y1="${pad.top}" y2="${pad.top + innerH}" stroke="rgba(255,255,255,0.035)" stroke-width="1"></line>`;
    })
    .join("");

  return `<g>${horizontal}${vertical}</g>`;
}

function renderMiniSparks(series = null, profile = latestProfile) {
  const nodes = [...document.querySelectorAll(".mini-spark")];
  if (!nodes.length) return;

  nodes.forEach((svg, index) => {
    const host = svg.closest("[data-spark-kind]");
    const kind = host?.dataset.sparkKind || `k${index}`;
    const values = series ? sparkValuesForKind(kind, series, profile) : new Array(12).fill(0).map((_, i) => 40 + Math.sin(i) * 5);
    svg.innerHTML = buildMiniSparkSvg(values, miniSparkColor(kind));
  });
}

function sparkValuesForKind(kind, series, profile) {
  const tail = series.slice(-18);
  const map = {
    hrv: tail.map((p, i) => 50 + (p.freshness - 50) * 0.7 + Math.sin(i) * 4),
    rhr: tail.map((p, i) => 55 - (p.freshness - 50) * 0.25 + (p.fatigue - p.fitness) * 0.18 + Math.cos(i) * 1.2),
    load: tail.map((p, i) => 45 + (p.fatigue - 40) * 0.8 + Math.sin(i * 0.8) * 6),
    strain: tail.map((p, i) => 42 + (p.fatigue - p.freshness) * 0.6 + Math.sin(i * 1.2) * 5),
    sleep: tail.map((p, i) => 58 + (p.freshness - 50) * 0.5 - (p.fatigue - 50) * 0.18 + Math.cos(i * 0.7) * 4),
    threshold: tail.map((p, i) => 46 + (p.fitness - 40) * 0.7 + Math.sin(i * 0.6) * 3),
    longrun: tail.map((p, i) => 40 + p.readiness * 0.45 - (p.fatigue - 50) * 0.2 + Math.sin(i * 0.9) * 4),
    race: tail.map((p, i) => 44 + p.fitness * 0.42 + p.readiness * 0.2 - p.fatigue * 0.14 + Math.cos(i * 0.5) * 3),
    "pred-a": tail.map((p, i) => 60 + (profile?.discipline === "running" ? p.fitness : p.readiness) * 0.25 + Math.sin(i) * 2),
    "pred-b": tail.map((p, i) => 56 + p.fitness * 0.22 + Math.cos(i * 0.7) * 2.5),
    "pred-c": tail.map((p, i) => 52 + p.readiness * 0.23 + Math.sin(i * 0.6) * 2),
    "pred-d": tail.map((p, i) => 50 + p.fitness * 0.2 + Math.cos(i * 0.4) * 2),
  };
  return (map[kind] || tail.map((p) => p.fitness)).map((v) => clamp(v, 0, 100));
}

function buildMiniSparkSvg(values, color) {
  const width = 120;
  const height = 34;
  const xFor = (i) => (i / Math.max(1, values.length - 1)) * width;
  const yFor = (v) => height - (v / 100) * height;
  const path = values.map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i).toFixed(1)} ${yFor(v).toFixed(1)}`).join(" ");
  const area = `${path} L ${width} ${height} L 0 ${height} Z`;
  const lastX = xFor(values.length - 1).toFixed(1);
  const lastY = yFor(values[values.length - 1]).toFixed(1);
  const id = `spark-${Math.abs(hashString(color))}`;
  return `
    <defs>
      <linearGradient id="${id}" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.22"></stop>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"></stop>
      </linearGradient>
    </defs>
    <path d="M0 8 H${width}" stroke="rgba(255,255,255,0.05)" stroke-width="1"></path>
    <path d="M0 17 H${width}" stroke="rgba(255,255,255,0.04)" stroke-width="1"></path>
    <path d="M0 26 H${width}" stroke="rgba(255,255,255,0.05)" stroke-width="1"></path>
    <path d="${area}" fill="url(#${id})"></path>
    <path d="${path}" fill="none" stroke="${color}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.1"></path>
    <path d="${path}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
    <circle cx="${lastX}" cy="${lastY}" r="2.2" fill="${color}"></circle>
  `;
}

function hashString(value) {
  let h = 0;
  const s = String(value);
  for (let i = 0; i < s.length; i += 1) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return h;
}

function miniSparkColor(kind) {
  if (kind === "rhr" || kind === "strain") return "var(--accent-fatigue)";
  if (kind === "sleep" || kind === "longrun") return "var(--accent-fresh)";
  if (kind === "threshold" || kind === "pred-b") return "var(--accent-fit)";
  if (kind.startsWith("pred")) return "var(--accent-ready)";
  return "var(--accent-vo2)";
}

function setMetricValues(values) {
  if (metricVo2El) metricVo2El.textContent = values.vo2;
  if (metricFitnessEl) metricFitnessEl.textContent = values.fitness;
  if (metricFatigueEl) metricFatigueEl.textContent = values.fatigue;
  if (metricFreshnessEl) metricFreshnessEl.textContent = values.freshness;
  if (metricReadinessEl) metricReadinessEl.textContent = values.readiness;
}

function setExtendedMetricsToEmpty() {
  setText(metricHrvBaselineEl, "-");
  setText(metricHrvCurrentEl, "Current: -");
  setText(metricRhrTrendEl, "-");
  setText(metricRhrValueEl, "RHR: - bpm");
  setText(metricLoadRatioEl, "-");
  setText(metricLoadAbsEl, "7d: - / 42d: -");
  setText(metricMonotonyEl, "-");
  setText(metricStrainEl, "Strain: -");
  setText(metricSleepScoreEl, "-");
  setText(metricSleepDurationEl, "Sleep: -");
  setText(metricThresholdPaceEl, "-");
  setText(metricThresholdHrEl, "HR: - bpm");
  setText(metricLongrunToleranceEl, "-");
  setText(metricLongrunContextEl, "Stability: -");
  setText(metricRaceTrendEl, "-");
  setText(metricRaceDeltaEl, "Delta 90d: -");
  setText(document.getElementById("pred-label-a"), "-");
  setText(document.getElementById("pred-label-b"), "-");
  setText(document.getElementById("pred-label-c"), "-");
  setText(document.getElementById("pred-label-d"), "-");
  setText(predSprintEl, "-");
  setText(predOlympicEl, "-");
  setText(pred703El, "-");
  setText(predIronmanEl, "-");
}

function setExtendedMetricValues(metrics) {
  setText(metricHrvBaselineEl, `${metrics.hrvBaseline} ms`);
  setText(metricHrvCurrentEl, `Current: ${metrics.hrvCurrent} ms (${metrics.hrvDelta})`);
  setText(metricRhrTrendEl, metrics.rhrTrend);
  setText(metricRhrValueEl, `RHR: ${metrics.rhrValue} bpm`);
  setText(metricLoadRatioEl, metrics.acwr);
  setText(metricLoadAbsEl, `7d: ${metrics.load7} / 42d: ${metrics.load42}`);
  setText(metricMonotonyEl, metrics.monotony);
  setText(metricStrainEl, `Strain: ${metrics.strain}`);
  setText(metricSleepScoreEl, `${metrics.sleepScore}`);
  setText(metricSleepDurationEl, `Sleep: ${metrics.sleepDuration}`);
  setText(metricThresholdPaceEl, metrics.thresholdPace);
  setText(metricThresholdHrEl, `HR: ${metrics.thresholdHr} bpm`);
  setText(metricLongrunToleranceEl, metrics.longRunTolerance);
  setText(metricLongrunContextEl, `Stability: ${metrics.longRunStability}`);
  setText(metricRaceTrendEl, metrics.raceTrendLabel);
  setText(metricRaceDeltaEl, `Delta 90d: ${metrics.raceTrendDelta}`);
  setText(document.getElementById("pred-label-a"), metrics.predictions.labels.a);
  setText(document.getElementById("pred-label-b"), metrics.predictions.labels.b);
  setText(document.getElementById("pred-label-c"), metrics.predictions.labels.c);
  setText(document.getElementById("pred-label-d"), metrics.predictions.labels.d);
  setText(predSprintEl, metrics.predictions.values.a);
  setText(predOlympicEl, metrics.predictions.values.b);
  setText(pred703El, metrics.predictions.values.c);
  setText(predIronmanEl, metrics.predictions.values.d);
}

function buildExtendedMetrics(profile, plan, series, sourceCount) {
  const last = series[series.length - 1];
  const levelBaseHrv = { starter: 48, intermediate: 62, advanced: 74 }[profile.fitnessLevel];
  const hrvBaseline = Math.round(levelBaseHrv + sourceCount * 2);
  const hrvCurrent = Math.round(hrvBaseline + (last.freshness - 50) * 0.18 - (last.fatigue - 55) * 0.12);
  const hrvDeltaNum = hrvCurrent - hrvBaseline;

  const rhrBase = { starter: 58, intermediate: 52, advanced: 47 }[profile.fitnessLevel];
  const rhrValue = Math.round(rhrBase + (last.fatigue - last.fitness) * 0.08 + (connectedSources.has("Whoop") ? -1 : 0));
  const rhrTrend = rhrValue <= rhrBase ? "Improving" : rhrValue <= rhrBase + 2 ? "Stable" : "Elevated";

  const load42 = Math.round(plan.meta.weeklyKmBase * 6);
  const load7 = Math.round(plan.meta.weeklyKmBase * (0.85 + (last.fatigue - 50) / 120));
  const acwrValue = clamp(load7 / Math.max(1, load42 / 6), 0.4, 1.9);

  const monotony = (1.15 + (last.fatigue - last.freshness) / 95 + (profile.weeklyHours > 10 ? 0.12 : 0)).toFixed(2);
  const strain = Math.round(load7 * Number(monotony));

  const sleepScore = Math.round(clamp(68 + sourceCount * 4 + (last.freshness - 50) * 0.5 - (last.fatigue - 50) * 0.22, 45, 97));
  const sleepHours = 6.6 + sourceCount * 0.18 + (sleepScore - 75) * 0.015;

  const thresholdHr = Math.round(
    (profile.discipline === "triathlon" ? 162 : 168)
      + (profile.fitnessLevel === "advanced" ? 4 : profile.fitnessLevel === "starter" ? -3 : 0)
      + (connectedSources.has("Whoop") ? -1 : 0)
  );
  const thresholdPace = thresholdDescriptor(profile, last);

  const longRunTolerance = longRunToleranceLabel(last.readiness, last.fatigue);
  const longRunStability = longRunStabilityLabel(last.freshness, last.readiness);

  const predictions = buildRacePredictions(profile, last, plan);
  const raceTrendDelta = `${predictions.trendDelta > 0 ? "-" : "+"}${Math.abs(predictions.trendDelta)} min`;
  const raceTrendLabel = predictions.trendDelta > 0 ? "Getting Faster" : predictions.trendDelta === 0 ? "Stable" : "Needs Recovery";

  return {
    hrvBaseline,
    hrvCurrent,
    hrvDelta: `${hrvDeltaNum >= 0 ? "+" : ""}${hrvDeltaNum}`,
    rhrTrend,
    rhrValue,
    acwr: `${acwrValue.toFixed(2)}`,
    load7,
    load42,
    monotony,
    strain,
    sleepScore,
    sleepDuration: `${sleepHours.toFixed(1)} h`,
    thresholdPace,
    thresholdHr,
    longRunTolerance,
    longRunStability,
    raceTrendLabel,
    raceTrendDelta,
    predictions,
  };
}

function buildRacePredictions(profile, last, plan) {
  const capability = last.fitness + last.readiness * 0.25 - last.fatigue * 0.12 + (connectedSources.size * 1.8);
  const weekly = plan.meta.weeklyKmBase;
  const trendDelta = Math.round(clamp((last.readiness - 55) / 4 + (last.fitness - 50) / 8, -12, 18));

  if (profile.discipline === "running") {
    const minutes = {
      a: Math.round(clamp(24 - capability * 0.06 - weekly * 0.01, 14, 40)), // 5k
      b: Math.round(clamp(52 - capability * 0.11 - weekly * 0.015, 30, 85)), // 10k
      c: Math.round(clamp(115 - capability * 0.22 - weekly * 0.025, 72, 190)), // HM
      d: Math.round(clamp(240 - capability * 0.45 - weekly * 0.05, 150, 400)), // M
    };
    return {
      trendDelta,
      labels: { a: "5 km", b: "10 km", c: "Halbmarathon", d: "Marathon" },
      values: {
        a: formatDurationMinutes(minutes.a),
        b: formatDurationMinutes(minutes.b),
        c: formatDurationMinutes(minutes.c),
        d: formatDurationMinutes(minutes.d),
      },
    };
  }

  if (profile.discipline === "cycling") {
    const minutes = {
      a: Math.round(clamp(65 - capability * 0.18 - weekly * 0.02, 40, 120)), // crit
      b: Math.round(clamp(63 - capability * 0.16 - weekly * 0.025, 38, 110)), // tt40
      c: Math.round(clamp(345 - capability * 0.65 - weekly * 0.05, 220, 520)), // fondo
      d: Math.round(clamp(355 - capability * 0.7 - weekly * 0.06, 230, 560)), // century
    };
    return {
      trendDelta,
      labels: { a: "Crit", b: "TT 40 km", c: "Gran Fondo", d: "Century" },
      values: {
        a: formatDurationMinutes(minutes.a),
        b: formatDurationMinutes(minutes.b),
        c: formatDurationMinutes(minutes.c),
        d: formatDurationMinutes(minutes.d),
      },
    };
  }

  const minutes = {
    a: Math.round(clamp(86 - capability * 0.35 - weekly * 0.03, 58, 120)),
    b: Math.round(clamp(178 - capability * 0.62 - weekly * 0.05, 120, 240)),
    c: Math.round(clamp(360 - capability * 1.1 - weekly * 0.08, 255, 460)),
    d: Math.round(clamp(760 - capability * 2.0 - weekly * 0.16, 550, 1020)),
  };

  return {
    trendDelta,
    labels: { a: "Sprint", b: "Olympic", c: "70.3", d: "Ironman" },
    values: {
      a: formatDurationMinutes(minutes.a),
      b: formatDurationMinutes(minutes.b),
      c: formatDurationMinutes(minutes.c),
      d: formatDurationMinutes(minutes.d),
    },
  };
}

function thresholdDescriptor(profile, last) {
  if (profile.discipline === "triathlon") {
    const bikePower = Math.round(220 + (last.fitness - 50) * 2.6 + (profile.fitnessLevel === "advanced" ? 25 : 0));
    const runPace = secondsToPace(Math.round(280 - (last.fitness - 45) * 1.9));
    return `${bikePower}W / ${runPace}`;
  }
  return secondsToPace(Math.round(300 - (last.fitness - 45) * 2.1));
}

function longRunToleranceLabel(readiness, fatigue) {
  const score = readiness - (fatigue - 60) * 0.4;
  if (score >= 72) return "High";
  if (score >= 58) return "Moderate";
  return "Fragile";
}

function longRunStabilityLabel(freshness, readiness) {
  const combo = freshness * 0.45 + readiness * 0.55;
  if (combo >= 72) return "Stable";
  if (combo >= 58) return "Manageable";
  return "Volatile";
}

function setText(el, value) {
  if (el) el.textContent = value;
}

function estimateSessionNutrition(session, profile) {
  const weight = Number(profile?.weightKg) || (profile?.sex === "female" ? 62 : 74);
  const sexAdj = profile?.sex === "female" ? -110 : profile?.sex === "male" ? 40 : 0;
  const ageAdj = profile?.age ? clamp((40 - profile.age) * 3, -35, 28) : 0;
  const base = Math.round(weight * 31 + sexAdj + ageAdj);

  const title = String(session?.title || "").toLowerCase();
  let trainingLoadKcal = 260;
  let carbPerKg = 4.5;
  let proteinPerKg = 1.6;
  let fatPerKg = 0.9;

  if (title.includes("long")) {
    trainingLoadKcal = 700;
    carbPerKg = 6.5;
    proteinPerKg = 1.8;
    fatPerKg = 0.9;
  } else if (title.includes("threshold")) {
    trainingLoadKcal = 520;
    carbPerKg = 5.8;
    proteinPerKg = 1.7;
    fatPerKg = 0.8;
  } else if (title.includes("vo2")) {
    trainingLoadKcal = 480;
    carbPerKg = 5.5;
    proteinPerKg = 1.8;
    fatPerKg = 0.8;
  } else if (title.includes("swim")) {
    trainingLoadKcal = 340;
    carbPerKg = 4.8;
    proteinPerKg = 1.6;
    fatPerKg = 0.85;
  } else if (session?.type === "rest") {
    trainingLoadKcal = 120;
    carbPerKg = 3.4;
    proteinPerKg = 1.7;
    fatPerKg = 0.95;
  }

  return {
    kcal: Math.round(base + trainingLoadKcal),
    carbsG: Math.round(weight * carbPerKg),
    proteinG: Math.round(weight * proteinPerKg),
    fatG: Math.round(weight * fatPerKg),
  };
}

function readinessBand(value) {
  if (value >= 78) return "hoch";
  if (value >= 60) return "solide";
  if (value >= 45) return "moderat";
  return "niedrig";
}

function estimateBaseKm(profile) {
  if (profile.discipline === "triathlon") {
    const factorByLevel = {
      starter: 4.6,
      intermediate: 6.1,
      advanced: 7.8,
    };
    const base = Math.round(profile.weeklyHours * factorByLevel[profile.fitnessLevel] * 2.8);
    const distanceBoost =
      profile.goalDistance === "ironman" ? 20 : profile.goalDistance === "703" ? 10 : profile.goalDistance === "olympic" ? 4 : 0;
    const ageAdj = profile.age ? clamp((44 - profile.age) * 0.6, -10, 8) : 0;
    const weightAdj = profile.weightKg ? clamp((75 - profile.weightKg) * 0.25, -8, 6) : 0;
    return clamp(base + distanceBoost + ageAdj + weightAdj, 25, 180);
  }

  if (profile.discipline === "cycling") {
    const factorByLevel = { starter: 8.5, intermediate: 11.2, advanced: 14.6 };
    const base = Math.round(profile.weeklyHours * factorByLevel[profile.fitnessLevel]);
    const distanceBoost =
      profile.goalDistance === "century" ? 22 : profile.goalDistance === "granfondo" ? 14 : profile.goalDistance === "tt40" ? 6 : 2;
    const ageAdj = profile.age ? clamp((42 - profile.age) * 0.5, -8, 7) : 0;
    return clamp(base + distanceBoost + ageAdj, 35, 220);
  }

  const factorByLevel = {
    starter: 5.4,
    intermediate: 7.2,
    advanced: 9.1,
  };
  const base = Math.round(profile.weeklyHours * factorByLevel[profile.fitnessLevel]);
  const distanceBoost = profile.goalDistance === "marathon" ? 10 : profile.goalDistance === "half" ? 5 : profile.goalDistance === "10k" ? 2 : 0;
  const ageAdj = profile.age ? clamp((40 - profile.age) * 0.35, -6, 5) : 0;
  return clamp(base + distanceBoost + ageAdj, 18, 120);
}

function estimateHoursFromKm(profile, km) {
  if (profile.discipline === "triathlon") {
    const hours = km / 18;
    return Math.max(3, Math.round(hours * 10) / 10);
  }

  if (profile.discipline === "cycling") {
    const hours = km / 28;
    return Math.max(2.5, Math.round(hours * 10) / 10);
  }

  const paces = {
    starter: 7.2,
    intermediate: 5.8,
    advanced: 4.8,
  };
  const hours = km * (paces[profile.fitnessLevel] / 60);
  return Math.max(2, Math.round(hours * 10) / 10);
}

function calcReadiness(profile, baseKm) {
  if (profile.discipline === "triathlon") {
    if ((profile.goalDistance === "703" || profile.goalDistance === "ironman") && baseKm < 70) {
      return "Ambitioniertes Triathlon-Ziel. Braucht saubere Belastungssteuerung über Swim/Bike/Run, Recovery und Fueling.";
    }
    return "Solider Ausgangspunkt für Triathlon. Fokus auf konsistente Wochenstruktur, Schwellensteuerung und Brick-Verträglichkeit.";
  }
  if (profile.discipline === "cycling") {
    return "Solider Ausgangspunkt fürs Rad. Fokus auf FTP-/VO2-Steuerung, Long-Ride-Verträglichkeit und progressive Belastung.";
  }

  if (profile.goalDistance === "marathon" && profile.goalTime.startsWith("2:") && baseKm < 55) {
    return "Ambitioniertes Ziel. Möglich, aber nur mit konsequenter Progression, Recovery-Steuerung und realistischen Load-Checks.";
  }
  if (profile.fitnessLevel === "starter") {
    return "Guter Startpunkt. Priorität auf Kontinuität, Technik, Belastungsverträglichkeit und schrittweiser Umfangssteigerung.";
  }
  return "Solider Ausgangspunkt. Fokus auf Schwellenarbeit, saubere Steuerung der Intensität und progressive Wochenstruktur.";
}

function fitnessText(value) {
  return {
    starter: "Einsteiger",
    intermediate: "Fortgeschritten",
    advanced: "Sehr fit",
  }[value];
}

function experienceText(value) {
  return {
    lt1: "<1 Jahr",
    "1to3": "1-3 Jahre",
    "3to5": "3-5 Jahre",
    "5plus": "5+ Jahre",
  }[value];
}

function labelDistance(value) {
  return {
    "5k": "5 km",
    "10k": "10 km",
    half: "Halbmarathon",
    marathon: "Marathon",
    sprint: "Sprint Triathlon",
    olympic: "Olympic Triathlon",
    "703": "70.3",
    ironman: "Ironman",
    crit: "Crit / Race",
    tt40: "TT 40 km",
    granfondo: "Gran Fondo",
    century: "Century 100 mi",
  }[value];
}

function sexLabel(value) {
  return {
    female: "Female",
    male: "Male",
    nonbinary: "Non-binary",
  }[value] || value;
}

function goalSpecificBoost(profile) {
  if (profile.discipline === "triathlon") {
    return profile.goalDistance === "ironman" ? 5 : profile.goalDistance === "703" ? 3 : profile.goalDistance === "olympic" ? 1.8 : 0.8;
  }
  if (profile.discipline === "cycling") {
    return profile.goalDistance === "century" ? 4.5 : profile.goalDistance === "granfondo" ? 3 : profile.goalDistance === "tt40" ? 2 : 1;
  }
  return profile.goalDistance === "marathon" ? 4 : profile.goalDistance === "half" ? 2 : 0.8;
}

function sessionTypeLabel(type) {
  return {
    threshold: "Threshold",
    quality: "Quality",
    longrun: "Long Run",
    recovery: "Easy",
    rest: "Rest",
  }[type] || "Session";
}

function formatDateInput(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDateShort(date) {
  return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
}

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfWeek(date) {
  const d = startOfDay(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function dayName(date) {
  return ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][date.getDay()];
}

function dayIndexFromDate(date) {
  const jsDay = date.getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

function sameWeek(weekStart, date) {
  const d = startOfDay(date);
  return d >= weekStart && d <= addDays(weekStart, 6);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toIcsDateTime(date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  const h = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  const s = String(date.getUTCSeconds()).padStart(2, "0");
  return `${y}${m}${d}T${h}${min}${s}Z`;
}

function formatDurationMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}:${String(minutes).padStart(2, "0")} h`;
}

function formatDateForFile(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "workout";
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function downloadTextFile({ content, filename, mimeType }) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function secondsToPace(seconds) {
  const clamped = clamp(seconds, 190, 520);
  const mins = Math.floor(clamped / 60);
  const secs = Math.round(clamped % 60);
  return `${mins}:${String(secs).padStart(2, "0")}/km`;
}

function escapeIcs(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function initScrollFx() {
  if (!scrollStage || !parallaxLayers.length) return;

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduceMotion) return;

  const applyProgress = (progress) => {
    parallaxLayers.forEach((layer) => {
      const depth = Number(layer.dataset.parallax || 0);
      const shift = progress * depth * 260;
      layer.style.setProperty("--parallax-shift", shift.toFixed(2));
    });

    if (landingLayerEl) {
      const hold = 0.22;
      const push = clamp((progress - hold) / 0.5, 0, 1);
      const shift = Math.round(push * 172);
      const opacity = clamp(1 - Math.max(0, (progress - 0.44) / 0.26), 0, 1);
      const scale = 1 - push * 0.025;
      landingLayerEl.style.setProperty("--landing-shift", String(shift));
      landingLayerEl.style.setProperty("--landing-opacity", opacity.toFixed(3));
      landingLayerEl.style.setProperty("--landing-scale", scale.toFixed(4));
    }

    if (brandAnchorEl) {
      const push = clamp((progress - 0.5) / 0.34, 0, 1);
      const shift = Math.round(push * 90);
      const opacity = clamp(1 - push * 1.15, 0, 1);
      brandAnchorEl.style.setProperty("--brand-shift", String(shift));
      brandAnchorEl.style.setProperty("--brand-opacity", opacity.toFixed(3));
    }

    document.documentElement.style.setProperty("--hero-glint", `${-25 + progress * 120}%`);
  };

  const update = () => {
    scrollFxRaf = 0;
    const rect = scrollStage.getBoundingClientRect();
    const viewport = window.innerHeight || 1;
    const total = Math.max(1, rect.height - viewport);
    const progress = clamp(-rect.top / total, 0, 1);
    applyProgress(progress);
  };

  const queueUpdate = () => {
    if (scrollFxRaf) return;
    scrollFxRaf = window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", queueUpdate, { passive: true });
  window.addEventListener("resize", queueUpdate);
  queueUpdate();
}

function initStageReveals() {
  if (!stageRevealEls.length) return;
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    stageRevealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  stageRevealEls.forEach((el, idx) => {
    el.style.transitionDelay = `${Math.min(idx * 40, 180)}ms`;
    observer.observe(el);
  });
}

function syncUiState() {
  document.body.classList.toggle("has-data", connectedSources.size > 0);
  if (latestProfile && latestPlan) {
    renderPerformanceInsights(latestProfile, latestPlan);
  }
}
