const form = document.getElementById("plan-form");
const statusEl = document.getElementById("status-analysis");
const planMetaEl = document.getElementById("plan-meta");
const calendarEl = document.getElementById("calendar-view");
const planOverviewCardEl = document.getElementById("plan-overview-card");
const planOverviewSvgEl = document.getElementById("plan-overview-svg");
const planOverviewLegendEl = document.getElementById("plan-overview-legend");
const planOverviewTitleEl = document.getElementById("plan-overview-title");
const planOverviewLeftAxisEl = document.getElementById("plan-overview-left-axis");
const planOverviewRightAxisEl = document.getElementById("plan-overview-right-axis");
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
const goalTimeLabelEl = document.getElementById("goal-time-label");
const goalTimeInputEl = document.getElementById("goal-time-input");
const raceDateLabelEl = document.getElementById("race-date-label");
const plannerSubmitBtnEl = document.getElementById("planner-submit-btn");
const constraintsInputEl = form?.elements?.constraints || null;
const shapeTargetWeightFieldEl = document.getElementById("shape-target-weight-field");
const shapeGoalGuidanceEl = document.getElementById("shape-goal-guidance");
const shapeTargetFocusFieldEl = document.getElementById("shape-target-focus-field");
const shapeTargetFocusSelectEl = document.getElementById("shape-target-focus-select");
const disciplineTargetFocusLabelEl = document.getElementById("discipline-target-focus-label");
const shapeGymShareFieldEl = document.getElementById("shape-gym-share-field");
const shapeGymShareInputEl = document.getElementById("shape-gym-share-input");
const shapeGymShareValueEl = document.getElementById("shape-gym-share-value");
const disciplineShareLabelEl = document.getElementById("discipline-share-label");
const bikeOutdoorDayFieldEl = document.getElementById("bike-outdoor-day-field");
const bikeOutdoorDayLabelEl = document.getElementById("bike-outdoor-day-label");
const bikeOutdoorDaySelectEl = document.getElementById("bike-outdoor-day-select");
const longRunDayFieldEl = document.getElementById("long-run-day-field");
const longRunDayLabelEl = document.getElementById("long-run-day-label");
const longRunDaySelectEl = document.getElementById("long-run-day-select");
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
const sessionModalNutritionFocusEl = document.getElementById("session-modal-nutrition-focus");
const sessionLabelPurposeEl = document.getElementById("session-label-purpose");
const sessionLabelAdaptationEl = document.getElementById("session-label-adaptation");
const sessionLabelPhysiologyEl = document.getElementById("session-label-physiology");
const sessionLabelWhyEl = document.getElementById("session-label-why");
const sessionLabelKcalEl = document.getElementById("session-label-kcal");
const sessionLabelNutritionFocusEl = document.getElementById("session-label-nutrition-focus");
const sessionModalKcalEl = document.getElementById("session-modal-kcal");
const sessionModalCarbEl = document.getElementById("session-modal-carb");
const sessionModalProteinEl = document.getElementById("session-modal-protein");
const sessionModalFatEl = document.getElementById("session-modal-fat");
const accountBarEl = document.getElementById("account-bar");
const accountLabelEl = document.getElementById("account-label");
const accountHomeBtn = document.getElementById("account-home-btn");
const accountCrewBtn = document.getElementById("account-crew-btn");
const accountProfileBtn = document.getElementById("account-profile-btn");
const accountSettingsBtn = document.getElementById("account-settings-btn");
const accountLoginBtn = document.getElementById("account-login-btn");
const accountRegisterBtn = document.getElementById("account-register-btn");
const accountLogoutBtn = document.getElementById("account-logout-btn");
const accountStatusTagEl = document.getElementById("account-status-tag");
const accountStatusCopyEl = document.getElementById("account-status-copy");
const accountOpenLoginBtn = document.getElementById("account-open-login");
const accountOpenRegisterBtn = document.getElementById("account-open-register");
const savePlanBtn = document.getElementById("save-plan-btn");
const profileAvatarInputEl = document.getElementById("profile-avatar-input");
const profileAvatarPreviewEl = document.getElementById("profile-avatar-preview");
const activityPostFormEl = document.getElementById("activity-post-form");
const profileFeedCountEl = document.getElementById("profile-feed-count");
const profileFeedListEl = document.getElementById("profile-feed-list");
const profilePointsBadgeEl = document.getElementById("profile-points-badge");
const profileQuickAddBtnEl = document.getElementById("profile-quick-add-btn");
const profilePostCardEl = document.getElementById("profile-card-post");
const activityComposeModalEl = document.getElementById("activity-compose-modal");
const profileStatBindings = {
  today: {
    run: document.getElementById("profile-stat-today-run-km"),
    bike: document.getElementById("profile-stat-today-bike-km"),
    swim: document.getElementById("profile-stat-today-swim-km"),
    races: document.getElementById("profile-stat-today-races"),
    props: document.getElementById("profile-stat-today-props"),
    points: document.getElementById("profile-stat-today-points-total"),
    badge: document.getElementById("profile-stats-today-points"),
  },
  year: {
    run: document.getElementById("profile-stat-year-run-km"),
    bike: document.getElementById("profile-stat-year-bike-km"),
    swim: document.getElementById("profile-stat-year-swim-km"),
    races: document.getElementById("profile-stat-year-races"),
    props: document.getElementById("profile-stat-year-props"),
    points: document.getElementById("profile-stat-year-points-total"),
    badge: document.getElementById("profile-stats-year-points"),
  },
  all: {
    run: document.getElementById("profile-stat-all-run-km"),
    bike: document.getElementById("profile-stat-all-bike-km"),
    swim: document.getElementById("profile-stat-all-swim-km"),
    races: document.getElementById("profile-stat-all-races"),
    props: document.getElementById("profile-stat-all-props"),
    points: document.getElementById("profile-stat-all-points-total"),
    badge: document.getElementById("profile-stats-all-points"),
  },
};
const savedPlanCountEl = document.getElementById("saved-plan-count");
const savedPlansListEl = document.getElementById("saved-plans-list");
const friendFormEl = document.getElementById("friend-form");
const friendsListEl = document.getElementById("friends-list");
const accountSearchFormEl = document.getElementById("account-search-form");
const accountSearchResultsEl = document.getElementById("account-search-results");
const crewResultCountEl = document.getElementById("crew-result-count");
const crewFeedCountEl = document.getElementById("crew-feed-count");
const crewFeedListEl = document.getElementById("crew-feed-list");
const crewRankingCountEl = document.getElementById("crew-ranking-count");
const crewRankingListEl = document.getElementById("crew-ranking-list");
const accountSectionTabButtons = [...document.querySelectorAll(".account-section-tab")];
const accountPaneProfileEl = document.getElementById("account-pane-profile");
const accountPaneCrewEl = document.getElementById("account-pane-crew");
const profileViewTabButtons = [...document.querySelectorAll(".profile-view-tab")];
const profileSettingsNavButtons = [...document.querySelectorAll(".profile-settings-nav-btn")];
const profileSettingsPanels = [...document.querySelectorAll("[data-profile-settings-panel]")];
const heroPhotoCards = [...document.querySelectorAll(".photo-card")];
const openGlossaryBtn = document.getElementById("open-glossary");
const sectionCalendarEl = document.querySelector(".section-calendar");
const sectionAccountEl = document.querySelector(".section-account");
const sectionDataEl = document.querySelector(".section-data");
const accountModalEl = document.getElementById("account-modal");
const glossaryModalEl = document.getElementById("glossary-modal");
const glossarySearchEl = document.getElementById("glossary-search");
const glossaryCategoryEl = document.getElementById("glossary-category");
const glossaryListEl = document.getElementById("glossary-list");
const goalRealismModalEl = document.getElementById("goal-realism-modal");
const goalRealismMessageEl = document.getElementById("goal-realism-message");
const goalRealismSuggestionEl = document.getElementById("goal-realism-suggestion");
const goalRealismSuggestionTextEl = document.getElementById("goal-realism-suggestion-text");
const goalRealismApplyBtnEl = document.getElementById("goal-realism-apply-btn");
const accountFormEl = document.getElementById("account-form");
const accountFormStatusEl = document.getElementById("account-form-status");
const accountSubmitBtn = document.getElementById("account-submit-btn");
const accountForgotPasswordBtn = document.getElementById("account-forgot-password-btn");
const accountTabButtons = [...document.querySelectorAll(".account-tab")];
const accountSettingsFormEl = document.getElementById("account-settings-form");
const accountSettingsStatusEl = document.getElementById("account-settings-status");
const privacySettingsFormEl = document.getElementById("privacy-settings-form");
const privacySettingsStatusEl = document.getElementById("privacy-settings-status");
const safetySettingsFormEl = document.getElementById("safety-settings-form");
const safetySettingsStatusEl = document.getElementById("safety-settings-status");
const passwordChangeFormEl = document.getElementById("password-change-form");
const passwordChangeStatusEl = document.getElementById("password-change-status");
const exportAccountDataBtn = document.getElementById("export-account-data-btn");
const deleteAccountBtn = document.getElementById("delete-account-btn");
const accountOpsStatusEl = document.getElementById("account-ops-status");
const legalModalEl = document.getElementById("legal-modal");
const legalNavEl = document.getElementById("legal-nav");
const legalContentBodyEl = document.getElementById("legal-content-body");
const stravaProfileCardEl = document.getElementById("strava-profile-card");
const stravaProfileStatusBadgeEl = document.getElementById("strava-profile-status-badge");
const stravaProfileStatusCopyEl = document.getElementById("strava-profile-status-copy");
const stravaProfileAthleteMetaEl = document.getElementById("strava-profile-athlete-meta");
const stravaProfileConnectBtn = document.getElementById("strava-profile-connect-btn");
const stravaProfileRefreshBtn = document.getElementById("strava-profile-refresh-btn");
const stravaProfileFetchStatusEl = document.getElementById("strava-profile-fetch-status");

let generatedSessions = [];
const connectedSources = new Set();
let scrollFxRaf = 0;
let latestProfile = null;
let latestPlan = null;
let currentLang = "de";
let expandedSessionId = null;
let authMode = "login";
let appStore = null;
let currentAccountId = null;
let lastAccountSearchQuery = "";
let activeAccountSection = "profile";
let activeAppView = "home";
let activeProfileView = "overview";
let activeProfileSettingsView = "account";
let pendingGoalRealismSuggestion = null;
let glossaryOpenCategories = new Set(["run", "hyrox"]);
let glossaryOpenTerms = new Set();
let activeLegalSection = "imprint";
let planOverviewState = {
  bars: { run: true, bike: true, swim: true, strength: true, other: false },
  lines: { fitness: true, fatigue: true, readiness: false, weight: false },
};
let shareHintHideTimer = 0;
let stravaFetchInFlight = false;
let stravaStatusFetchedForUserId = null;
let generatedPlanScrollRaf = 0;
let profileComposerExpanded = false;

const STORAGE_KEY = "aimrunna_mvp_store_v1";
const STRAVA_OAUTH_DEV_BASE =
  window.location.hostname === "localhost" && window.location.port === "8787"
    ? `${window.location.protocol}//${window.location.host}`
    : "http://localhost:8787";

const LEGAL_CONTENT = {
  imprint: `Impressum (Draft, DE)\n\nDiese Seite ist eine Beta-Version von AImRUNNA.\n\nHier eintragen:\n• Anbieter / Firma / Rechtsform\n• Vertretungsberechtigte Person\n• Anschrift\n• Kontakt (E-Mail, Telefon)\n• Registereintrag (falls vorhanden)\n• USt-IdNr. (falls vorhanden)\n• Verantwortlich i.S.d. § 18 MStV (falls relevant)\n\nHinweis: Vor Veröffentlichung mit deutscher/europäischer Rechtsberatung final prüfen.`,
  privacy: `Datenschutzerklärung (Draft)\n\n1. Verantwortlicher\n2. Verarbeitete Daten (Account, Trainingsdaten, Gesundheitsnahe Daten, Geräte-IDs, Logs)\n3. Zwecke (Trainingsplanung, Analyse, Community, Sicherheit)\n4. Rechtsgrundlagen (Art. 6 DSGVO; ggf. Einwilligung)\n5. Datenquellen (Strava, Garmin, WHOOP, manuelle Eingaben)\n6. Empfänger / Auftragsverarbeiter\n7. Speicherdauer\n8. Betroffenenrechte (Auskunft, Löschung, Berichtigung, Export, Widerspruch)\n9. Widerruf von Einwilligungen\n10. Sicherheit / Verschlüsselung\n11. Internationale Datenübermittlungen\n12. Cookies / Tracking\n\nWichtig: Gesundheits-/Fitnessdaten sauber klassifizieren und Rechtsgrundlagen juristisch prüfen.`,
  terms: `Nutzungsbedingungen (Draft)\n\n• Leistungsbeschreibung (Beta, Trainingsplanung, Community, Datenimport)\n• Nutzerkonto / Zugang\n• Pflichten der Nutzer (wahre Angaben, keine rechtswidrigen Inhalte)\n• Verfügbarkeit / Änderungen / Beta-Status\n• Geistiges Eigentum\n• Community-Regeln / Sanktionen / Sperrung\n• Haftungsbegrenzung (rechtlich zulässig)\n• Hinweis: Trainingspläne sind keine medizinische Beratung\n• Kündigung / Account-Löschung\n• Anwendbares Recht / Gerichtsstand (soweit zulässig)\n\nVor Livegang rechtlich prüfen lassen.`,
  agb: `AGB (Draft)\n\nNur erforderlich/sinnvoll, sobald kostenpflichtige Leistungen / Abos / Verträge angeboten werden.\n\nDann typischer Inhalt:\n• Vertragspartner\n• Vertragsschluss\n• Preise / Zahlung / Abrechnung\n• Laufzeit / Kündigung / Verlängerung\n• Widerrufsrechte (Verbraucher)\n• Leistungsumfang / Änderungen\n• Gewährleistung / Haftung\n• Support / Kontakt\n• Datenschutzverweis\n\nAGB bitte nicht aus Standard-Generator blind übernehmen – auf Trainings-/Datenprodukt anpassen und prüfen lassen.`,
  disclaimer: `Health & Training Disclaimer (Draft)\n\nAImRUNNA liefert Trainingspläne, Analysen und Prognosen zur Orientierung.\n\nKein medizinischer Rat / keine Diagnose:\n• Die Inhalte ersetzen keine ärztliche, physiotherapeutische oder ernährungsmedizinische Beratung.\n• Vor Beginn oder Änderung intensiver Trainingsprogramme gesundheitliche Eignung prüfen lassen.\n• Bei Schmerzen, Schwindel, Atemnot oder anderen Beschwerden Training abbrechen und medizinischen Rat einholen.\n\nEigenverantwortung:\n• Nutzer trainieren auf eigene Verantwortung.\n• Angaben/Prognosen können unvollständig oder fehlerhaft sein (insb. in Beta-Versionen).\n\nWichtig für Beta:\n• Modelle/Projektionen sind Entwicklungsstände und können sich ändern.`,
  cookies: `Cookies & Tracking (Draft)\n\nEmpfohlen für Public Beta:\n• Technisch notwendige Cookies\n• Präferenz-Cookies (Sprache, Einheiten)\n• Analyse/Telemetry (optional, nur mit Consent)\n• Marketing (optional, später)\n\nUmsetzen:\n• Consent-Banner / Consent-Management\n• Einwilligungen speichern & widerrufbar machen\n• Cookie-Übersicht / Zwecke / Laufzeiten dokumentieren\n\nFür erste Beta möglichst tracking-arm starten.`,
  community: `Community Regeln (Draft)\n\nNicht erlaubt:\n• Hassrede, Belästigung, Drohungen\n• Spam / Betrug / irreführende Inhalte\n• Unerlaubte Gesundheitsversprechen / gefährliche Ratschläge\n• Verletzung von Rechten Dritter\n\nErwünscht:\n• Respektvoller Umgang\n• Konstruktives Feedback\n• Transparenz bei Race-/Training-Posts\n\nModeration:\n• Inhalte melden\n• Temporäre Sperren / Account-Sperren bei Verstößen\n• Wiederholte Verstöße = dauerhafte Sperre möglich`,
  "data-processing": `Datenverarbeitung & Connector-Hinweise (Draft)\n\nZweckbindung (wichtig):\n• Strava/Garmin/WHOOP-Daten werden nur für Trainingsplanung, Leistungsanalyse, Recovery-Einschätzung und Nutzeransichten verarbeitet.\n• Keine Weitergabe an Dritte ohne Rechtsgrundlage / Einwilligung.\n\nTechnik (üblich und machbar):\n• OAuth-Verbindung pro Anbieter\n• Tokens serverseitig speichern (verschlüsselt)\n• Refresh-Tokens rotieren\n• Webhooks/Sync-Jobs nutzen\n• Nutzer kann Verbindungen trennen und Daten löschen/exportieren\n\nHinweis:\n• Pushing Limits und ähnliche Produkte nutzen ebenfalls OAuth-Connects + eigene Auswertungsschicht; dafür ist keine exklusive Partnerschaft mit jedem Anbieter zwingend nötig (abhängig von API-Zugang/Scopes, besonders bei Garmin variabel).`,
};

function defaultAccountSettings() {
  return {
    account: {
      language: currentLang || "de",
      units: "metric",
      timezone: "Europe/Berlin",
      emailNotifications: "important",
    },
    privacy: {
      profileVisibility: "public",
      activityVisibility: "followers",
      searchDiscoverability: "on",
      messagingPermission: "connections",
      mapPrivacy: "blur_start_end",
      mentionsPermission: "connections",
    },
    safety: {
      commentFilter: "standard",
      imageModeration: "on",
      riskWarnings: "on",
      communityGuidelinesAccepted: "yes",
    },
  };
}
const OAUTH_ENDPOINTS = {
  Strava: "/api/oauth/strava/start",
  Whoop: "/api/oauth/whoop/start",
  Garmin: "/api/oauth/garmin/start",
};

const HERO_IMAGE_SETS = {
  triathlon: [
    { url: "https://images.pexels.com/photos/30476469/pexels-photo-30476469.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=82&w=1200", pos: "40% 86%", size: "132% auto" },
    { url: "https://images.pexels.com/photos/2817059/pexels-photo-2817059.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=80&w=1680", pos: "50% 78%", size: "cover" },
    { url: "https://images.pexels.com/photos/30476462/pexels-photo-30476462.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=78&w=1080", pos: "52% 84%", size: "118% auto" },
    { url: "https://images.pexels.com/photos/20254928/pexels-photo-20254928.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=80&w=1680", pos: "54% 70%", size: "cover" },
    { url: "https://images.pexels.com/photos/30476469/pexels-photo-30476469.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=80&w=1200", pos: "54% 84%", size: "122% auto" },
    { url: "https://images.pexels.com/photos/30720140/pexels-photo-30720140.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=78&w=1080", pos: "52% 82%", size: "112% auto" },
  ],
  running: [
    { url: "https://images.pexels.com/photos/20254928/pexels-photo-20254928.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=80&w=1680", pos: "56% 72%", size: "cover" },
    { url: "https://images.pexels.com/photos/2817059/pexels-photo-2817059.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=82&w=1680", pos: "50% 82%", size: "cover" },
    { url: "https://images.pexels.com/photos/30720140/pexels-photo-30720140.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=80&w=1080", pos: "52% 83%", size: "118% auto" },
    { url: "https://images.pexels.com/photos/30476462/pexels-photo-30476462.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=78&w=1080", pos: "53% 86%", size: "122% auto" },
    { url: "https://images.pexels.com/photos/30476469/pexels-photo-30476469.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=80&w=1200", pos: "46% 88%", size: "128% auto" },
    { url: "https://images.pexels.com/photos/20254928/pexels-photo-20254928.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=78&w=1280", pos: "44% 78%", size: "cover" },
  ],
  cycling: [
    { url: "https://images.pexels.com/photos/2817059/pexels-photo-2817059.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=78&w=1680", pos: "46% 82%", size: "cover" },
    { url: "https://images.pexels.com/photos/20254928/pexels-photo-20254928.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=80&w=1680", pos: "58% 76%", size: "cover" },
    { url: "https://images.pexels.com/photos/30476462/pexels-photo-30476462.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=76&w=1080", pos: "48% 86%", size: "116% auto" },
    { url: "https://images.pexels.com/photos/30720140/pexels-photo-30720140.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=80&w=1080", pos: "58% 84%", size: "114% auto" },
    { url: "https://images.pexels.com/photos/30476469/pexels-photo-30476469.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=78&w=1200", pos: "52% 86%", size: "120% auto" },
    { url: "https://images.pexels.com/photos/2817059/pexels-photo-2817059.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=76&w=1280", pos: "54% 79%", size: "cover" },
  ],
  hyrox: [
    { url: "https://images.pexels.com/photos/30720140/pexels-photo-30720140.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=82&w=1080", pos: "50% 84%", size: "116% auto" },
    { url: "https://images.pexels.com/photos/20254928/pexels-photo-20254928.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=80&w=1680", pos: "52% 74%", size: "cover" },
    { url: "https://images.pexels.com/photos/30476462/pexels-photo-30476462.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=80&w=1080", pos: "50% 85%", size: "122% auto" },
    { url: "https://images.pexels.com/photos/30476469/pexels-photo-30476469.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=82&w=1200", pos: "44% 88%", size: "130% auto" },
    { url: "https://images.pexels.com/photos/2817059/pexels-photo-2817059.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=78&w=1680", pos: "50% 80%", size: "cover" },
    { url: "https://images.pexels.com/photos/20254928/pexels-photo-20254928.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=76&w=1280", pos: "46% 79%", size: "cover" },
  ],
  shape: [
    { url: "https://images.pexels.com/photos/30720140/pexels-photo-30720140.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=82&w=1080", pos: "52% 84%", size: "118% auto" },
    { url: "https://images.pexels.com/photos/20254928/pexels-photo-20254928.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=80&w=1680", pos: "50% 75%", size: "cover" },
    { url: "https://images.pexels.com/photos/30476469/pexels-photo-30476469.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=80&w=1200", pos: "48% 88%", size: "128% auto" },
    { url: "https://images.pexels.com/photos/30476462/pexels-photo-30476462.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=78&w=1080", pos: "54% 85%", size: "120% auto" },
    { url: "https://images.pexels.com/photos/2817059/pexels-photo-2817059.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=78&w=1680", pos: "50% 81%", size: "cover" },
    { url: "https://images.pexels.com/photos/20254928/pexels-photo-20254928.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=76&w=1280", pos: "46% 78%", size: "cover" },
  ],
};

const TRAINING_GLOSSARY = [
  {
    term: "Strides",
    category: "run",
    text: "Kurze kontrollierte Steigerungen (10-25 Sek.), kein Vollsprint. Verbessert Rhythmus und Lauftechnik.",
    detail: "Meist nach lockerem Lauf: 4-8 Wiederholungen, locker anlaufen, sauber beschleunigen, entspannt auslaufen. Fokus auf Technik, nicht auf Ermüdung.",
    cues: ["Aufrecht + locker", "Schnelle, kurze Bodenkontaktzeit", "Zwischen Wdh. komplett ruhig traben"],
    steps: ["Locker anlaufen", "Über 5-8 Sek. beschleunigen", "Kurz flott halten, sauber ausrollen"],
    visual: "stride",
  },
  {
    term: "Threshold / Schwelle",
    category: "run",
    text: "Hart, aber kontrolliert an/unter der Laktatschwelle. Baut Tempohärte und Pace-Stabilität auf.",
    detail: "Typische Blöcke sind 3-6 x 6-10 min oder längere kontinuierliche Abschnitte. Atmung deutlich erhöht, aber rhythmisch und kontrollierbar.",
    cues: ["Nicht zu schnell starten", "Pace stabil halten", "Saubere Technik unter Druck"],
    steps: ["Warm-up", "Kontrollierte Schwellenblöcke", "Cooldown + lockere Nachbelastung"],
    visual: "run",
  },
  {
    term: "Zone 2",
    category: "recovery",
    text: "Lockerer aerober Bereich mit Gesprächsfähigkeit. Basis für Ausdauer, Recovery und Belastungsverträglichkeit.",
    detail: "Soll bewusst leicht bleiben. Zone-2-Einheiten machen Volumen möglich, ohne unnötig viel Ermüdung zu erzeugen.",
    cues: ["Nasenatmung/Gespräch möglich", "Pace nicht jagen", "Lieber länger locker als zu hart"],
    steps: ["Locker einrollen/einlaufen", "Konstanter easy Block", "Kurz mobilisieren"],
    visual: "run",
  },
  {
    term: "Brick Session",
    category: "triathlon",
    text: "Bike direkt gefolgt von Run. Trainiert Wechsel und Laufen unter Vorermüdung.",
    detail: "Im Plan oft als kontrollierte Bike-Session mit kurzem Anschlusslauf. Ziel ist ein sauberer Übergang und gutes Laufgefühl, nicht maximaler Stress.",
    cues: ["Fueling auf dem Bike üben", "Schneller Wechsel", "Erste Laufminuten bewusst kontrollieren"],
    steps: ["Bike Hauptteil", "Schneller Wechsel", "Kurzer Run mit Technikfokus"],
    visual: "brick",
  },
  {
    term: "CSS (Swim)",
    category: "swim",
    text: "Critical Swim Speed als Referenztempo für kontrollierte Ausdauer-/Schwellenintensitäten im Wasser.",
    detail: "Hilft bei der Schwimmsteuerung ähnlich wie Schwellenpace beim Laufen. Typisch: Serien mit konstanter Technik und sauberem Rhythmus.",
    cues: ["Zuglänge halten", "Ruhige Atmung", "Tempo aus Technik, nicht Hektik"],
    steps: ["Einschwimmen", "Technik + CSS-Serien", "Ausschwimmen"],
    visual: "swim",
  },
  {
    term: "Sweet Spot",
    category: "bike",
    text: "Effizienter Leistungsbereich unterhalb der Schwelle. Viel Trainingsnutzen bei moderater Ermüdung.",
    detail: "Beliebt für Aufbauphasen: z. B. längere Blöcke im Bereich ~88-94% FTP (als Konzept, individuell anpassen).",
    cues: ["Druck konstant halten", "Nicht in Schwelle kippen", "Saubere Trittfrequenz"],
    steps: ["Einrollen", "Sweet-Spot Blöcke", "Ausrollen"],
    visual: "bike",
  },
  {
    term: "Cadence Spin-ups",
    category: "bike",
    text: "Kurze Phasen mit hoher Trittfrequenz bei geringer Last. Verbessert Koordination und Pedaltechnik.",
    detail: "Ziel ist nicht Leistung, sondern runder Tritt und Kontrolle bei steigender Kadenz. Kein wildes Wippen im Sattel.",
    cues: ["Oberkörper ruhig", "Runder Tritt", "Niedrige Last beibehalten"],
    steps: ["Leicht rollen", "Kadenz hochdrehen", "Locker resetten"],
    visual: "bike",
  },
  {
    term: "Carries (Farmers Carry)",
    category: "strength",
    text: "Gewichte über Strecke/Zeit tragen. Trainiert Griffkraft, Haltung, Rumpfspannung und alltagstaugliche Kraft.",
    detail: "Perfekt für HYROX/Shape. Zuhause auch mit Wasserkanistern/Rucksäcken möglich. Qualität vor Gewicht.",
    cues: ["Rippen runter, Rumpf fest", "Kurze stabile Schritte", "Schultern tief halten"],
    steps: ["Gewichte sauber aufnehmen", "Kontrolliert gehen", "Absetzen ohne Einrunden"],
    visual: "carry",
  },
  {
    term: "Lunges",
    category: "strength",
    text: "Ausfallschritte für Beine, Hüfte und Stabilität. Gut skalierbar von Einsteiger bis Fortgeschritten.",
    detail: "Einsteiger starten oft mit Reverse Lunges oder Unterstützung. Fortgeschrittene können Last oder Volumen erhöhen.",
    cues: ["Knie stabil über Fuß", "Rumpf aufrecht", "Kontrolliert absenken"],
    steps: ["Schritt setzen", "Kontrolliert tief", "Über vorderen Fuß zurück"],
    visual: "lunge",
  },
  {
    term: "Trunk Stability / Core",
    category: "strength",
    text: "Rumpfstabilität für Kraftübertragung, Haltung und Verletzungsprävention.",
    detail: "Im Plan oft als kurze Ergänzung: Dead Bugs, Planks, Side Planks, Carries, Anti-Rotation. Qualität wichtiger als Dauerrekord.",
    cues: ["Atmung kontrollieren", "Neutral bleiben", "Spannung ohne Verkrampfen"],
    steps: ["Setup", "Spannung aufbauen", "Sauber kontrollierte Wiederholungen/Haltezeit"],
    visual: "core",
  },
  {
    term: "Push-ups (skalierbar)",
    category: "strength",
    text: "Drückübung für Oberkörper und Rumpf. Sehr gut skalierbar über Höhe/Neigung.",
    detail: "Bei Einsteiger:innen zuerst auf erhöhter Fläche (Bank, Tisch, Wand). Ziel ist saubere Spannung und volle Kontrolle.",
    cues: ["Körper in Linie", "Ellbogen kontrolliert", "Rumpf fest"],
    steps: ["Setup in Linie", "Kontrolliert absenken", "Gleichmäßig hochdrücken"],
    visual: "push",
  },
  {
    term: "Burpees",
    category: "hyrox",
    text: "Ganzkörperübung mit hoher metabolischer Last. Für Einsteiger low-impact skalieren.",
    detail: "Nicht sofort maximal. Erst Technik und Rhythmus: Schritt zurück, kontrollierte Stützphase, aufstehen, optional kleiner Sprung.",
    cues: ["Sauberer Rücken im Übergang", "Rhythmus finden", "Bei Fatigue skalieren statt brechen"],
    steps: ["Runter in Stütz/Boden", "Zurück nach oben", "Aufrichten + (optional) Sprung"],
    visual: "burpee",
  },
  {
    term: "Compromised Intervals",
    category: "hyrox",
    text: "Wechsel aus Run und Stationen. Simuliert Race-Belastung und Transitions.",
    detail: "Beispiel: 500-1000 m Run + 1 Functional Block. Ziel ist sauberes Pacing unter Vorermüdung, nicht nur Härte.",
    cues: ["Run-Pace kontrollieren", "Station technisch sauber", "Übergänge ruhig + effizient"],
    steps: ["Run-Intervall", "Station/Funktionsblock", "Kurzer Reset, nächste Runde"],
    visual: "hyrox",
  },
  {
    term: "Wall Balls (ohne Wall möglich)",
    category: "hyrox",
    text: "Squat + Ballwurf. Zuhause auch als Medball Thruster / Air Squat to Reach skalierbar.",
    detail: "Wichtig ist rhythmische Beinarbeit und stabile Position, nicht nur Schulterkraft. Ohne Wall: Zielpunkt an Wand markieren oder Reach-Variante nutzen.",
    cues: ["Tiefe kontrollieren", "Aus den Beinen arbeiten", "Atmung rhythmisch"],
    steps: ["Squat", "Explosiv aufrichten + werfen/reachen", "Fangen/Reset"],
    visual: "squat",
  },
  {
    term: "Sled Push/Pull Ersatz",
    category: "hyrox",
    text: "Wenn keine Box verfügbar ist: Hill Pushes, Heavy Carries, Band-Drags oder Towel-Drags als Ersatz.",
    detail: "Ziel ist ein ähnlicher Reiz (lokale Beinmuskelausdauer + Vortrieb unter Last), nicht die perfekte 1:1-Kopie.",
    cues: ["Kurze kräftige Schritte", "Rumpf stabil", "Intensität über Zeit/Distanz steuern"],
    steps: ["Ersatz wählen", "Arbeitsblöcke setzen", "Pausen sauber timen"],
    visual: "carry",
  },
  {
    term: "Mobility Flow",
    category: "recovery",
    text: "Kurzer Beweglichkeitsblock für Hüfte, Thorax, Sprunggelenk und Schulter.",
    detail: "Soll sich 'besser' anfühlen, nicht zerstören. Besonders sinnvoll nach langen Sitzphasen oder lockeren Einheiten.",
    cues: ["Langsam + kontrolliert", "Atmung mitbewegen", "Nur in schmerzfreie Range"],
    steps: ["Atmung/Reset", "Mobilitätsübungen", "Leichte Aktivierung"],
    visual: "mobility",
  },
  {
    term: "Deload",
    category: "recovery",
    text: "Geplante Entlastungsphase mit weniger Volumen/Intensität zur Anpassung und Regeneration.",
    detail: "Deload ist kein Rückschritt. Er sorgt dafür, dass Trainingseffekte ankommen und Motivation/Belastbarkeit stabil bleiben.",
    cues: ["Weniger ist geplant", "Schlaf/Erholung priorisieren", "Technik sauber halten"],
    steps: ["Volumen senken", "Intensität selektiv reduzieren", "Frische für nächsten Block sammeln"],
    visual: "recovery",
  },
  {
    term: "Taper",
    category: "recovery",
    text: "Belastung vor dem Wettkampf reduzieren, damit du frischer und leistungsbereit startest.",
    detail: "Weniger Gesamtlast, aber etwas Qualität bleibt drin. Ziel ist Frische ohne das Gefühl, 'einzurosten'.",
    cues: ["Routine beibehalten", "Volumen runter", "Fueling/Schlaf optimieren"],
    steps: ["Volumen reduzieren", "Kurze Aktivierungen behalten", "Raceday vorbereitet starten"],
    visual: "recovery",
  },
];

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
    field_height_optional: "Größe cm (optional)",
    field_target_weight_optional: "Zielgewicht kg (optional)",
    field_gym_share: "Gym-Anteil",
    field_cycle_optional: "Zyklusbasiertes Training (optional)",
    field_cycle_toggle: "Zyklusbasierte Planung berücksichtigen",
    field_cycle_day_optional: "Zyklustag (optional)",
    field_cycle_length_optional: "Ø Zykluslänge Tage (optional)",
    btn_generate: "race.",
    btn_tuning: "Feintuning",
    nav_home: "Home",
    nav_profile: "Profil",
    nav_crew: "Crew",
    nav_login: "Login",
    nav_create: "Create",
    section_profile_crew: "Profil & Crew",
    profile_card_title: "Profil",
    profile_create_account: "Account erstellen",
    profile_save_plan: "Plan speichern",
    profile_avatar: "Profilbild",
    saved_plans: "Gespeicherte Pläne",
    empty_saved_plans: "Noch keine gespeicherten Pläne.",
    profile_stats: "Profil-Stats",
    profile_period_today: "Heute",
    profile_period_12m: "Letzte 12 Monate",
    profile_period_all: "Gesamt",
    new_activity: "Neue Aktivität",
    post_label: "Post",
    activity_kind_training: "Training",
    field_sport: "Sport",
    field_distance_km: "Distanz (km)",
    post_submit: "Posten",
    my_feed: "Mein Feed",
    empty_profile_feed: "Noch keine Aktivitäten gepostet.",
    crew_friends_connect: "Verbindungen",
    crew_ranking: "Crew Ranking",
    crew_search: "Crew Suche",
    crew_feed: "Crew Feed",
    crew_search_copy: "Suche andere Accounts, verbinde dich und sieh später gemeinsame Aktivitäten / Pläne.",
    connect: "Verbinden",
    connected: "Verbunden",
    search: "Suchen",
    empty_connections: "Noch keine Verbindungen.",
    empty_crew_data: "Keine Crew-Daten vorhanden.",
    empty_search_prompt: "Suche nach einem Account, um dich zu verbinden.",
    empty_search_none: "Keine Accounts gefunden.",
    empty_crew_feed: "Verbinde dich mit deiner Crew, um ihren Feed zu sehen.",
    empty_login_crew: "Bitte einloggen, um die Crew zu sehen.",
    empty_login_ranking: "Bitte einloggen, um Ranking zu sehen.",
    invalid_email: "Ungültige E-Mail.",
    own_email_not_allowed: "Eigene E-Mail kann nicht hinzugefügt werden.",
    account_not_found_local: "Account nicht gefunden (MVP lokal).",
    login_first: "Bitte zuerst einloggen.",
    account_signed_in: "Eingeloggt",
    account_guest: "Gast",
    account_status_signed_in: "Dein Profil-Überblick mit Plänen, Aktivitäten und Health-Daten. Einstellungen findest du oben unter Settings.",
    account_status_guest: "Erstelle einen Account, um Trainingspläne zu speichern, Quellen zu verbinden und Freunde hinzuzufügen.",
    placeholder_distance_example: "z. B. 12.4",
    placeholder_activity_title: "z. B. Threshold Run in der City",
    placeholder_activity_note: "Wie lief die Einheit? Gefühl, Pace, Learnings ...",
    placeholder_friend_email: "friend@email.com",
    placeholder_search_accounts: "Accounts suchen (E-Mail / Name)",
    unit_points: "Pkt.",
    unit_races: "Rennen",
    profile_total_points: "Gesamtpunkte",
    label_training: "Training",
    label_no_activity: "Noch keine Aktivität",
    label_plans: "Pläne",
    label_run_short: "Run",
    label_bike_short: "Bike",
    label_swim_short: "Swim",
    label_props: "Props",
    connected_mock: "Verbunden (Mock)",
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
    field_height_optional: "Height cm (optional)",
    field_target_weight_optional: "Target weight kg (optional)",
    field_gym_share: "Gym share",
    field_cycle_optional: "Cycle-based training (optional)",
    field_cycle_toggle: "Use cycle-based planning",
    field_cycle_day_optional: "Cycle day (optional)",
    field_cycle_length_optional: "Avg cycle length days (optional)",
    btn_generate: "race.",
    btn_tuning: "Fine tune",
    nav_home: "Home",
    nav_profile: "Profile",
    nav_crew: "Crew",
    nav_login: "Login",
    nav_create: "Create",
    section_profile_crew: "Profile & Crew",
    profile_card_title: "Profile",
    profile_create_account: "Create account",
    profile_save_plan: "Save plan",
    profile_avatar: "Profile photo",
    saved_plans: "Saved plans",
    empty_saved_plans: "No saved plans yet.",
    profile_stats: "Profile Stats",
    profile_period_today: "Today",
    profile_period_12m: "Last 12 months",
    profile_period_all: "All time",
    new_activity: "New activity",
    post_label: "Post",
    activity_kind_training: "Training",
    field_sport: "Sport",
    field_distance_km: "Distance (km)",
    post_submit: "Post",
    my_feed: "My feed",
    empty_profile_feed: "No activities posted yet.",
    crew_friends_connect: "Connections",
    crew_ranking: "Crew Ranking",
    crew_search: "Crew Search",
    crew_feed: "Crew Feed",
    crew_search_copy: "Find other accounts, connect, and later see shared activities / plans.",
    connect: "Connect",
    connected: "Connected",
    search: "Search",
    empty_connections: "No connections yet.",
    empty_crew_data: "No crew data available.",
    empty_search_prompt: "Search for an account to connect.",
    empty_search_none: "No accounts found.",
    empty_crew_feed: "Connect with your crew to see their feed.",
    empty_login_crew: "Please sign in to view your crew.",
    empty_login_ranking: "Please sign in to view ranking.",
    invalid_email: "Invalid email.",
    own_email_not_allowed: "You cannot add your own email.",
    account_not_found_local: "Account not found (local MVP).",
    login_first: "Please sign in first.",
    account_signed_in: "Signed in",
    account_guest: "Guest",
    account_status_signed_in: "You can now save plans, store connector status per account, and connect local friends.",
    account_status_guest: "Create an account to save plans, connect sources, and add friends.",
    placeholder_distance_example: "e.g. 12.4",
    placeholder_activity_title: "e.g. Threshold run in the city",
    placeholder_activity_note: "How did the session feel? Pace, effort, learnings ...",
    placeholder_friend_email: "friend@email.com",
    placeholder_search_accounts: "Search accounts (email / name)",
    unit_points: "pts",
    unit_races: "races",
    profile_total_points: "Total Points",
    label_training: "Training",
    label_no_activity: "No activity yet",
    label_plans: "Plans",
    label_run_short: "Run",
    label_bike_short: "Bike",
    label_swim_short: "Swim",
    label_props: "Props",
    connected_mock: "Connected (Mock)",
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
    field_height_optional: "身長 cm（任意）",
    field_target_weight_optional: "目標体重 kg（任意）",
    field_gym_share: "ジム比率",
    field_cycle_optional: "周期ベーストレーニング（任意）",
    field_cycle_toggle: "周期ベース計画を使う",
    field_cycle_day_optional: "周期日（任意）",
    field_cycle_length_optional: "平均周期日数（任意）",
    btn_generate: "race.",
    btn_tuning: "詳細設定",
    nav_home: "ホーム",
    nav_profile: "プロフィール",
    nav_crew: "クルー",
    nav_login: "ログイン",
    nav_create: "作成",
    section_profile_crew: "プロフィール & クルー",
    profile_card_title: "プロフィール",
    profile_create_account: "アカウント作成",
    profile_save_plan: "プラン保存",
    profile_avatar: "プロフィール画像",
    saved_plans: "保存済みプラン",
    empty_saved_plans: "保存済みプランはまだありません。",
    profile_stats: "プロフィール統計",
    profile_period_today: "今日",
    profile_period_12m: "過去12か月",
    profile_period_all: "累計",
    new_activity: "新しいアクティビティ",
    post_label: "投稿",
    activity_kind_training: "トレーニング",
    field_sport: "種目",
    field_distance_km: "距離 (km)",
    post_submit: "投稿",
    my_feed: "マイフィード",
    empty_profile_feed: "まだアクティビティ投稿はありません。",
    crew_friends_connect: "接続",
    crew_ranking: "クルーランキング",
    crew_search: "クルー検索",
    crew_feed: "クルーフィード",
    crew_search_copy: "他のアカウントを検索して接続し、あとで共同のアクティビティ / プランを見られます。",
    connect: "接続",
    connected: "接続済み",
    search: "検索",
    empty_connections: "接続はまだありません。",
    empty_crew_data: "クルーデータがありません。",
    empty_search_prompt: "接続するアカウントを検索してください。",
    empty_search_none: "アカウントが見つかりません。",
    empty_crew_feed: "クルーと接続するとフィードが表示されます。",
    empty_login_crew: "クルーを見るにはログインしてください。",
    empty_login_ranking: "ランキングを見るにはログインしてください。",
    invalid_email: "無効なメールアドレスです。",
    own_email_not_allowed: "自分のメールは追加できません。",
    account_not_found_local: "アカウントが見つかりません（ローカルMVP）。",
    login_first: "先にログインしてください。",
    account_signed_in: "ログイン中",
    account_guest: "ゲスト",
    account_status_signed_in: "プラン保存、アカウントごとのコネクタ状態保持、ローカルの友達接続ができます。",
    account_status_guest: "プラン保存、データ接続、友達追加のためにアカウントを作成してください。",
    placeholder_distance_example: "例: 12.4",
    placeholder_activity_title: "例: シティでのスレッショルド走",
    placeholder_activity_note: "セッションの感覚、ペース、学びなど...",
    placeholder_friend_email: "friend@email.com",
    placeholder_search_accounts: "アカウント検索（メール / 名前）",
    unit_points: "pts",
    unit_races: "レース",
    profile_total_points: "合計ポイント",
    label_training: "トレーニング",
    label_no_activity: "まだアクティビティなし",
    label_plans: "プラン",
    label_run_short: "Run",
    label_bike_short: "Bike",
    label_swim_short: "Swim",
    label_props: "Props",
    connected_mock: "接続済み (Mock)",
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
  hyrox: [
    { value: "open", label: "HYROX Open" },
    { value: "pro", label: "HYROX Pro" },
    { value: "doubles", label: "HYROX Doubles" },
    { value: "doublespro", label: "HYROX Doubles Pro" },
    { value: "relay", label: "HYROX Relay" },
  ],
  shape: [
    { value: "fatloss", label: "Lean Cut" },
    { value: "recomp", label: "Body Recomp" },
    { value: "build", label: "Strength Build" },
    { value: "fitness", label: "General Fitness" },
  ],
};

connectorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const source = button.dataset.source;
    if (!source) return;
    if (source === "Strava") {
      startStravaOAuthFlow();
      return;
    }
    if (connectedSources.has(source)) {
      connectedSources.delete(source);
    } else {
      connectedSources.add(source);
    }
    syncConnectorButtons();
    persistConnectedSourcesForCurrentUser();
    const endpoint = OAUTH_ENDPOINTS[source] || "/api/oauth/start";
    setText(connectionState, connectedSources.size ? `OAuth ready (MVP Mock): ${[...connectedSources].join(", ")} • next: ${endpoint}` : t("no_sources"));
    syncUiState();
    renderAccountUi();
  });
});

stravaProfileConnectBtn?.addEventListener("click", () => startStravaOAuthFlow());
stravaProfileRefreshBtn?.addEventListener("click", () => {
  fetchStravaStatusAndAthlete({ force: true });
});

try {
  setDefaultRaceDate();
  initDynamicGoalOptions();
  initAdvancedSettingsToggle();
  initScrollFx();
  initStageReveals();
  initLanguageSwitcher();
  initAccountUi();
  setActiveProfileView("overview");
  setActiveProfileSettingsView("account");
  applyTranslations();
  renderPerformanceInsights();
  setAppView("home");
} catch (err) {
  console.error("AImRUNNA init failed:", err);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    syncShapeGoalConsistency();
    if (typeof form.reportValidity === "function" && !form.reportValidity()) return;
    const data = new FormData(form);
    const profile = extractProfile(data);
    const realismCheck = checkGoalRealismBeforePlan(profile);
    if (realismCheck?.block) {
      openGoalRealismModal(realismCheck);
      return;
    }

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
    scrollToGeneratedPlan();
    if (getCurrentAccount()) {
      savePlanToLibrary(getCurrentAccount(), latestProfile, latestPlan);
      persistStore();
    }
    renderAccountUi();
  } catch (err) {
    console.error("Plan generation failed:", err);
    if (statusEl) {
      statusEl.textContent =
        `Plan konnte nicht erstellt werden.\n` +
        `Bitte Eingaben prüfen (insb. Disziplin/Zielformat/Zeit) und erneut versuchen.\n\n` +
        `Debug: ${String(err?.message || err)}`;
    }
  }
});

savePlanBtn?.addEventListener("click", () => {
  if (!latestPlan || !latestProfile) return;
  const account = getCurrentAccount();
  if (!account) {
    openAccountModal("login");
    setText(accountFormStatusEl, "Bitte zuerst einloggen.");
    return;
  }
  savePlanToLibrary(account, latestProfile, latestPlan);
  persistStore();
  renderAccountUi();
});

friendFormEl?.addEventListener("submit", (event) => {
  event.preventDefault();
  const account = getCurrentAccount();
  if (!account) {
    openAccountModal("login");
    setText(accountFormStatusEl, "Bitte zuerst einloggen.");
    return;
  }
  const email = String(new FormData(friendFormEl).get("friendEmail") || "").trim().toLowerCase();
  const result = addFriendByEmail(account, email);
  renderAccountUi();
  if (email) {
    lastAccountSearchQuery = email;
    renderAccountSearchResults(email);
  }
  if (friendFormEl && result.ok) friendFormEl.reset();
});

accountLoginBtn?.addEventListener("click", () => openAccountModal("login"));
accountRegisterBtn?.addEventListener("click", () => openAccountModal("register"));
accountOpenLoginBtn?.addEventListener("click", () => openAccountModal("login"));
accountOpenRegisterBtn?.addEventListener("click", () => openAccountModal("register"));
accountLogoutBtn?.addEventListener("click", logoutCurrentAccount);
accountHomeBtn?.addEventListener("click", () => setAppView("home"));
accountProfileBtn?.addEventListener("click", () => {
  setActiveProfileView("overview");
  setAppView("profile");
  setActiveAccountSection("profile");
});
accountCrewBtn?.addEventListener("click", () => {
  setAppView("crew");
  setActiveAccountSection("crew");
});
accountSettingsBtn?.addEventListener("click", () => {
  setActiveProfileView("settings");
  setAppView("profile");
  setActiveAccountSection("profile");
});
accountSectionTabButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    const section = btn.dataset.accountSection || "profile";
    setAppView(section === "crew" ? "crew" : "profile");
    setActiveAccountSection(section);
  })
);

profileViewTabButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    const view = btn.dataset.profileView || "overview";
    setActiveProfileView(view);
    if (activeAppView !== "profile") setAppView("profile");
    scrollToSectionStart(sectionAccountEl, { mobileOffset: 150, desktopOffset: 114, duration: 420 });
  })
);

profileSettingsNavButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    const view = btn.dataset.profileSettingsView || "account";
    setActiveProfileSettingsView(view);
  })
);

profileAvatarInputEl?.addEventListener("change", async () => {
  const account = getCurrentAccount();
  if (!account) {
    openAccountModal("login");
    return;
  }
  const file = profileAvatarInputEl.files?.[0];
  if (!file) return;
  const dataUrl = await readFileAsDataUrl(file);
  account.profileImage = dataUrl;
  persistStore();
  renderAccountUi();
});

activityPostFormEl?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const account = getCurrentAccount();
  if (!account) {
    openAccountModal("login");
    setText(accountFormStatusEl, "Bitte zuerst einloggen.");
    return;
  }
  const fd = new FormData(activityPostFormEl);
  const title = String(fd.get("title") || "").trim();
  if (!title) return;
  const note = String(fd.get("note") || "").trim();
  const kind = String(fd.get("activityKind") || "training") === "race" ? "race" : "training";
  const sportType = String(fd.get("sportType") || "run");
  const distanceKm = Number(fd.get("distanceKm") || 0) || 0;
  const imageFile = fd.get("image");
  const imageDataUrl = imageFile && imageFile.size ? await readFileAsDataUrl(imageFile) : null;
  postActivity(account, { title, note, kind, sportType, distanceKm, imageDataUrl });
  persistStore();
  activityPostFormEl.reset();
  profileComposerExpanded = false;
  closeActivityComposeModal();
  renderAccountUi();
});

profileQuickAddBtnEl?.addEventListener("click", () => {
  profileComposerExpanded = !profileComposerExpanded;
  syncProfileComposerVisibility();
});

accountSearchFormEl?.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = String(new FormData(accountSearchFormEl).get("query") || "").trim();
  lastAccountSearchQuery = query;
  renderAccountSearchResults(query);
});

accountTabButtons.forEach((btn) =>
  btn.addEventListener("click", () => openAccountModal(btn.dataset.authMode || "login"))
);

accountFormEl?.addEventListener("submit", (event) => {
  event.preventDefault();
  const fd = new FormData(accountFormEl);
  const email = String(fd.get("email") || "").trim().toLowerCase();
  const password = String(fd.get("password") || "");
  const result = authMode === "register" ? registerAccount(email, password) : loginAccount(email, password);
  setText(accountFormStatusEl, result.message);
  if (result.ok) {
    renderAccountUi();
    syncConnectorButtons();
    updateConnectionStateCopy();
    setTimeout(() => closeAccountModal(), 200);
  }
});

accountForgotPasswordBtn?.addEventListener("click", () => {
  const email = String(accountFormEl?.elements?.email?.value || "").trim().toLowerCase();
  const result = requestPasswordReset(email);
  setText(accountFormStatusEl, result.message);
});

accountSettingsFormEl?.addEventListener("submit", (event) => {
  event.preventDefault();
  const account = getCurrentAccount();
  if (!account) {
    openAccountModal("login");
    setText(accountSettingsStatusEl, "Bitte zuerst einloggen.");
    return;
  }
  ensureAccountSettingsShape(account);
  const fd = new FormData(accountSettingsFormEl);
  account.settings.account = {
    ...account.settings.account,
    language: String(fd.get("language") || "de"),
    units: String(fd.get("units") || "metric"),
    timezone: String(fd.get("timezone") || "Europe/Berlin"),
    emailNotifications: String(fd.get("emailNotifications") || "important"),
  };
  persistStore();
  setText(accountSettingsStatusEl, "Gespeichert.");
});

privacySettingsFormEl?.addEventListener("submit", (event) => {
  event.preventDefault();
  const account = getCurrentAccount();
  if (!account) {
    openAccountModal("login");
    setText(privacySettingsStatusEl, "Bitte zuerst einloggen.");
    return;
  }
  ensureAccountSettingsShape(account);
  const fd = new FormData(privacySettingsFormEl);
  account.settings.privacy = {
    ...account.settings.privacy,
    profileVisibility: String(fd.get("profileVisibility") || "public"),
    activityVisibility: String(fd.get("activityVisibility") || "followers"),
    searchDiscoverability: String(fd.get("searchDiscoverability") || "on"),
    messagingPermission: String(fd.get("messagingPermission") || "connections"),
    mapPrivacy: String(fd.get("mapPrivacy") || "blur_start_end"),
    mentionsPermission: String(fd.get("mentionsPermission") || "connections"),
  };
  persistStore();
  setText(privacySettingsStatusEl, "Gespeichert.");
});

safetySettingsFormEl?.addEventListener("submit", (event) => {
  event.preventDefault();
  const account = getCurrentAccount();
  if (!account) {
    openAccountModal("login");
    setText(safetySettingsStatusEl, "Bitte zuerst einloggen.");
    return;
  }
  ensureAccountSettingsShape(account);
  const fd = new FormData(safetySettingsFormEl);
  account.settings.safety = {
    ...account.settings.safety,
    commentFilter: String(fd.get("commentFilter") || "standard"),
    imageModeration: String(fd.get("imageModeration") || "on"),
    riskWarnings: String(fd.get("riskWarnings") || "on"),
    communityGuidelinesAccepted: String(fd.get("communityGuidelinesAccepted") || "yes"),
  };
  persistStore();
  setText(safetySettingsStatusEl, "Gespeichert.");
});

passwordChangeFormEl?.addEventListener("submit", (event) => {
  event.preventDefault();
  const fd = new FormData(passwordChangeFormEl);
  const result = changeCurrentAccountPassword(String(fd.get("currentPassword") || ""), String(fd.get("newPassword") || ""));
  setText(passwordChangeStatusEl, result.message);
  if (result.ok) passwordChangeFormEl.reset();
});

exportAccountDataBtn?.addEventListener("click", () => {
  const result = exportCurrentAccountData();
  setText(accountOpsStatusEl, result.message);
});

deleteAccountBtn?.addEventListener("click", () => {
  const result = deleteCurrentAccountLocalMvp();
  setText(accountOpsStatusEl, result.message);
  if (result.ok) setAppView("home");
});

document.querySelectorAll("[data-legal-open]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = String(btn.getAttribute("data-legal-open") || "imprint");
    openLegalModal(key);
  });
});

legalNavEl?.addEventListener("click", (event) => {
  const btn = event.target.closest?.("[data-legal-section]");
  if (!btn) return;
  const key = String(btn.getAttribute("data-legal-section") || "imprint");
  setLegalSection(key);
});

legalModalEl?.addEventListener("click", (event) => {
  if (!event.target.closest?.("[data-close-legal-modal]")) return;
  closeLegalModal();
});

accountModalEl?.addEventListener("click", (event) => {
  if (!event.target.closest?.("[data-close-account-modal]")) return;
  closeAccountModal();
});

openGlossaryBtn?.addEventListener("click", () => {
  renderGlossary();
  if (glossaryModalEl) glossaryModalEl.hidden = false;
});

glossaryModalEl?.addEventListener("click", (event) => {
  const categoryBtn = event.target.closest?.("[data-glossary-category]");
  if (categoryBtn) {
    const key = String(categoryBtn.getAttribute("data-glossary-category") || "");
    if (key) {
      if (glossaryOpenCategories.has(key)) glossaryOpenCategories.delete(key);
      else glossaryOpenCategories.add(key);
      renderGlossary();
    }
    return;
  }
  const itemBtn = event.target.closest?.("[data-glossary-item]");
  if (itemBtn) {
    const key = String(itemBtn.getAttribute("data-glossary-item") || "");
    if (key) {
      if (glossaryOpenTerms.has(key)) glossaryOpenTerms.delete(key);
      else glossaryOpenTerms.add(key);
      renderGlossary();
    }
    return;
  }
  if (!event.target.closest?.("[data-close-glossary-modal]")) return;
  closeGlossaryModal();
});
goalRealismModalEl?.addEventListener("click", (event) => {
  if (!event.target.closest?.("[data-close-goal-realism]")) return;
  closeGoalRealismModal();
});
goalRealismApplyBtnEl?.addEventListener("click", () => {
  if (typeof pendingGoalRealismSuggestion === "function") pendingGoalRealismSuggestion();
  pendingGoalRealismSuggestion = null;
  closeGoalRealismModal();
  syncShapeGoalConsistency();
});

glossarySearchEl?.addEventListener("input", renderGlossary);
glossaryCategoryEl?.addEventListener("change", renderGlossary);
planOverviewLegendEl?.addEventListener("click", (event) => {
  const btn = event.target.closest?.("[data-plan-toggle]");
  if (!btn || !latestPlan || !latestProfile) return;
  const key = String(btn.getAttribute("data-plan-toggle") || "");
  const group = String(btn.getAttribute("data-plan-group") || "");
  if (!key || !group || !planOverviewState[group]) return;
  planOverviewState[group][key] = !planOverviewState[group][key];
  renderPlanOverviewChart(latestProfile, latestPlan);
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
  if (event.key !== "Escape") return;
  if (!activityComposeModalEl?.hidden) {
    closeActivityComposeModal();
    return;
  }
  if (!glossaryModalEl?.hidden) {
    closeGlossaryModal();
    return;
  }
  if (!goalRealismModalEl?.hidden) {
    closeGoalRealismModal();
    return;
  }
  if (!legalModalEl?.hidden) {
    closeLegalModal();
    return;
  }
  if (!expandedSessionId) return;
  expandedSessionId = null;
  syncExpandedDayCards();
  closeSessionOverlay();
});

activityComposeModalEl?.addEventListener("click", (event) => {
  if (!event.target.closest?.("[data-close-activity-compose]")) return;
  closeActivityComposeModal();
});

sessionOverlayEl?.addEventListener("click", (event) => {
  if (!event.target.closest?.("[data-close-overlay]")) return;
  expandedSessionId = null;
  syncExpandedDayCards();
  closeSessionOverlay();
});

function initAccountUi() {
  appStore = loadStore();
  currentAccountId = appStore.currentAccountId || null;
  if (getCurrentAccount()) {
    hydrateConnectedSourcesFromAccount();
    document.body.classList.add("is-authenticated");
  }
  syncConnectorButtons();
  if (connectionState) {
    updateConnectionStateCopy();
  }
  renderAccountUi();
  setAuthMode("login");
  handleOAuthReturnParams();
}

function closeGlossaryModal() {
  if (glossaryModalEl) glossaryModalEl.hidden = true;
}

function closeGoalRealismModal() {
  if (goalRealismModalEl) goalRealismModalEl.hidden = true;
}

function setLegalSection(section) {
  activeLegalSection = LEGAL_CONTENT[section] ? section : "imprint";
  legalNavEl?.querySelectorAll("[data-legal-section]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.getAttribute("data-legal-section") === activeLegalSection);
  });
  if (legalContentBodyEl) legalContentBodyEl.textContent = LEGAL_CONTENT[activeLegalSection] || LEGAL_CONTENT.imprint;
}

function openLegalModal(section = "imprint") {
  setLegalSection(section);
  if (legalModalEl) legalModalEl.hidden = false;
}

function closeLegalModal() {
  if (legalModalEl) legalModalEl.hidden = true;
}

function openGoalRealismModal({ message, suggestionText = "", applySuggestion = null }) {
  if (goalRealismMessageEl) goalRealismMessageEl.textContent = message;
  if (goalRealismSuggestionEl && goalRealismSuggestionTextEl) {
    const hasSuggestion = Boolean(suggestionText);
    goalRealismSuggestionEl.hidden = !hasSuggestion;
    goalRealismSuggestionTextEl.textContent = hasSuggestion ? suggestionText : "";
  }
  pendingGoalRealismSuggestion = typeof applySuggestion === "function" ? applySuggestion : null;
  if (goalRealismApplyBtnEl) goalRealismApplyBtnEl.hidden = !pendingGoalRealismSuggestion;
  if (goalRealismModalEl) goalRealismModalEl.hidden = false;
}

function glossaryCategoryLabel(category) {
  const labels = {
    run: currentLang === "de" ? "Laufen" : currentLang === "ja" ? "ラン" : "Run",
    bike: currentLang === "de" ? "Rad" : currentLang === "ja" ? "バイク" : "Bike",
    swim: currentLang === "de" ? "Schwimmen" : currentLang === "ja" ? "スイム" : "Swim",
    triathlon: "Triathlon",
    hyrox: "HYROX",
    strength: "Strength",
    recovery: currentLang === "de" ? "Recovery" : currentLang === "ja" ? "リカバリー" : "Recovery",
  };
  return labels[category] || String(category || "").toUpperCase();
}

function renderExerciseVisual(item) {
  const visual = String(item?.visual || "generic");
  const sequences = {
    burpee: [
      { x: 18, y: 36, bend: 6, arms: "down", legs: "wide" },
      { x: 50, y: 46, bend: 14, arms: "floor", legs: "back" },
      { x: 82, y: 34, bend: 2, arms: "up", legs: "narrow" },
    ],
    lunge: [
      { x: 18, y: 36, bend: 2, arms: "down", legs: "narrow" },
      { x: 50, y: 38, bend: 6, arms: "down", legs: "split" },
      { x: 82, y: 38, bend: 6, arms: "down", legs: "split2" },
    ],
    carry: [
      { x: 18, y: 34, bend: 1, arms: "carry", legs: "narrow" },
      { x: 50, y: 35, bend: 1, arms: "carry", legs: "walk1" },
      { x: 82, y: 35, bend: 1, arms: "carry", legs: "walk2" },
    ],
    stride: [
      { x: 18, y: 38, bend: 1, arms: "run1", legs: "run1" },
      { x: 50, y: 36, bend: 0, arms: "run2", legs: "run2" },
      { x: 82, y: 37, bend: 0, arms: "run1", legs: "run3" },
    ],
    run: [
      { x: 18, y: 38, bend: 1, arms: "run1", legs: "run1" },
      { x: 50, y: 37, bend: 1, arms: "run2", legs: "run2" },
      { x: 82, y: 38, bend: 1, arms: "run1", legs: "run3" },
    ],
    bike: [
      { x: 18, y: 42, bend: 7, arms: "bar", legs: "bike1" },
      { x: 50, y: 42, bend: 7, arms: "bar", legs: "bike2" },
      { x: 82, y: 42, bend: 7, arms: "bar", legs: "bike1" },
    ],
    swim: [
      { x: 18, y: 42, bend: 4, arms: "swim1", legs: "stream" },
      { x: 50, y: 42, bend: 4, arms: "swim2", legs: "stream" },
      { x: 82, y: 42, bend: 4, arms: "swim3", legs: "stream" },
    ],
    push: [
      { x: 18, y: 44, bend: 8, arms: "floor", legs: "back" },
      { x: 50, y: 42, bend: 6, arms: "push", legs: "back" },
      { x: 82, y: 44, bend: 8, arms: "floor", legs: "back" },
    ],
    squat: [
      { x: 18, y: 36, bend: 2, arms: "front", legs: "narrow" },
      { x: 50, y: 41, bend: 10, arms: "front", legs: "wide" },
      { x: 82, y: 35, bend: 1, arms: "up", legs: "narrow" },
    ],
    core: [
      { x: 18, y: 42, bend: 4, arms: "deadbug1", legs: "deadbug1" },
      { x: 50, y: 42, bend: 4, arms: "deadbug2", legs: "deadbug2" },
      { x: 82, y: 42, bend: 4, arms: "deadbug1", legs: "deadbug1" },
    ],
    brick: [
      { x: 18, y: 42, bend: 7, arms: "bar", legs: "bike1" },
      { x: 50, y: 42, bend: 7, arms: "bar", legs: "bike2" },
      { x: 82, y: 37, bend: 1, arms: "run1", legs: "run2" },
    ],
    hyrox: [
      { x: 18, y: 38, bend: 1, arms: "run1", legs: "run1" },
      { x: 50, y: 35, bend: 2, arms: "carry", legs: "walk1" },
      { x: 82, y: 41, bend: 10, arms: "front", legs: "wide" },
    ],
    mobility: [
      { x: 18, y: 39, bend: 6, arms: "reach", legs: "split" },
      { x: 50, y: 38, bend: 4, arms: "rotate", legs: "narrow" },
      { x: 82, y: 39, bend: 7, arms: "reach2", legs: "split2" },
    ],
    recovery: [
      { x: 18, y: 38, bend: 0, arms: "down", legs: "narrow" },
      { x: 50, y: 38, bend: 0, arms: "down", legs: "narrow" },
      { x: 82, y: 38, bend: 0, arms: "down", legs: "narrow" },
    ],
    generic: [
      { x: 18, y: 38, bend: 1, arms: "down", legs: "narrow" },
      { x: 50, y: 38, bend: 4, arms: "front", legs: "wide" },
      { x: 82, y: 38, bend: 1, arms: "down", legs: "narrow" },
    ],
  };
  const frames = sequences[visual] || sequences.generic;
  return `
    <svg class="guide-strip" viewBox="0 0 100 52" aria-hidden="true">
      <defs>
        <linearGradient id="guideFade" x1="0" x2="1">
          <stop offset="0%" stop-color="rgba(255,255,255,0.03)"/>
          <stop offset="50%" stop-color="rgba(255,255,255,0.08)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0.03)"/>
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="98" height="50" rx="8" fill="url(#guideFade)" stroke="rgba(255,255,255,0.08)"/>
      ${frames.map((frame) => drawStickFrame(frame)).join("")}
    </svg>`;
}

function drawStickFrame(frame) {
  const { x, y } = frame;
  const head = `<circle cx="${x}" cy="${y - 12}" r="2.8" fill="rgba(255,255,255,0.82)"/>`;
  const torsoY2 = y + (frame.bend || 0) * 0.6;
  const torso = `<line x1="${x}" y1="${y - 9}" x2="${x}" y2="${torsoY2}" stroke="rgba(255,255,255,0.82)" stroke-width="1.4" stroke-linecap="round"/>`;
  const arms = {
    down: [[x, y - 6, x - 5, y + 2], [x, y - 6, x + 5, y + 2]],
    up: [[x, y - 7, x - 6, y - 13], [x, y - 7, x + 6, y - 13]],
    floor: [[x, y - 5, x - 7, y + 8], [x, y - 5, x + 7, y + 8]],
    push: [[x, y - 6, x - 8, y + 4], [x, y - 6, x + 8, y + 4]],
    front: [[x, y - 6, x - 5, y - 1], [x, y - 6, x + 5, y - 1]],
    carry: [[x, y - 6, x - 4, y + 4], [x, y - 6, x + 4, y + 4]],
    run1: [[x, y - 6, x - 6, y - 2], [x, y - 6, x + 5, y + 1]],
    run2: [[x, y - 6, x - 4, y + 1], [x, y - 6, x + 6, y - 2]],
    bar: [[x, y - 7, x - 6, y - 4], [x, y - 7, x + 6, y - 4]],
    swim1: [[x, y - 7, x - 6, y - 10], [x, y - 7, x + 7, y - 6]],
    swim2: [[x, y - 7, x - 2, y - 12], [x, y - 7, x + 8, y - 2]],
    swim3: [[x, y - 7, x - 8, y - 3], [x, y - 7, x + 4, y - 11]],
    deadbug1: [[x, y - 6, x - 7, y - 9], [x, y - 6, x + 5, y - 2]],
    deadbug2: [[x, y - 6, x - 5, y - 2], [x, y - 6, x + 7, y - 9]],
    reach: [[x, y - 6, x - 7, y - 12], [x, y - 6, x + 4, y - 1]],
    reach2: [[x, y - 6, x + 7, y - 12], [x, y - 6, x - 4, y - 1]],
    rotate: [[x, y - 6, x - 6, y - 4], [x, y - 6, x + 6, y - 8]],
  }[frame.arms || "down"];
  const legs = {
    narrow: [[x, torsoY2, x - 4, y + 11], [x, torsoY2, x + 4, y + 11]],
    wide: [[x, torsoY2, x - 7, y + 10], [x, torsoY2, x + 7, y + 10]],
    split: [[x, torsoY2, x - 7, y + 11], [x, torsoY2, x + 4, y + 8]],
    split2: [[x, torsoY2, x - 4, y + 8], [x, torsoY2, x + 7, y + 11]],
    back: [[x, torsoY2, x - 8, y + 8], [x, torsoY2, x + 8, y + 8]],
    run1: [[x, torsoY2, x - 6, y + 10], [x, torsoY2, x + 7, y + 6]],
    run2: [[x, torsoY2, x - 4, y + 6], [x, torsoY2, x + 8, y + 10]],
    run3: [[x, torsoY2, x - 8, y + 8], [x, torsoY2, x + 5, y + 7]],
    walk1: [[x, torsoY2, x - 5, y + 10], [x, torsoY2, x + 6, y + 8]],
    walk2: [[x, torsoY2, x - 6, y + 8], [x, torsoY2, x + 5, y + 10]],
    bike1: [[x, torsoY2, x - 6, y + 7], [x, torsoY2, x + 5, y + 10]],
    bike2: [[x, torsoY2, x - 4, y + 10], [x, torsoY2, x + 7, y + 7]],
    stream: [[x, torsoY2, x - 7, y + 2], [x, torsoY2, x + 7, y + 2]],
    deadbug1: [[x, torsoY2, x - 6, y + 10], [x, torsoY2, x + 6, y + 4]],
    deadbug2: [[x, torsoY2, x - 6, y + 4], [x, torsoY2, x + 6, y + 10]],
  }[frame.legs || "narrow"];

  const lines = [...arms, ...legs]
    .map(([x1, y1, x2, y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(255,255,255,0.82)" stroke-width="1.2" stroke-linecap="round"/>`)
    .join("");
  const extraCarry = frame.arms === "carry"
    ? `<rect x="${x - 7.8}" y="${y + 3.4}" width="2.8" height="2.8" rx="0.7" fill="rgba(255,255,255,0.55)"/><rect x="${x + 5}" y="${y + 3.4}" width="2.8" height="2.8" rx="0.7" fill="rgba(255,255,255,0.55)"/>`
    : "";
  const extraBike = frame.arms === "bar"
    ? `<circle cx="${x - 8}" cy="${y + 10}" r="3.8" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1"/><circle cx="${x + 9}" cy="${y + 10}" r="3.8" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1"/>`
    : "";
  const ground = `<line x1="${x - 11}" y1="${y + 12.5}" x2="${x + 11}" y2="${y + 12.5}" stroke="rgba(255,255,255,0.12)" stroke-width="0.8"/>`;
  return `<g>${ground}${head}${torso}${lines}${extraCarry}${extraBike}</g>`;
}

function renderGlossary() {
  if (!glossaryListEl) return;
  const q = String(glossarySearchEl?.value || "").trim().toLowerCase();
  const cat = String(glossaryCategoryEl?.value || "all");
  const rows = TRAINING_GLOSSARY
    .filter((item) => cat === "all" || item.category === cat)
    .filter((item) => !q || [item.term, item.text, item.detail, ...(item.cues || []), ...(item.steps || [])].join(" ").toLowerCase().includes(q))
    .sort((a, b) => a.term.localeCompare(b.term));

  if (!rows.length) {
    glossaryListEl.innerHTML = `<div class="empty-copy">Keine Treffer in der Trainingsbibliothek.</div>`;
    return;
  }

  const grouped = rows.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
  const categories = Object.keys(grouped).sort((a, b) => glossaryCategoryLabel(a).localeCompare(glossaryCategoryLabel(b)));
  if (q) categories.forEach((category) => glossaryOpenCategories.add(category));

  glossaryListEl.innerHTML = categories.map((category) => {
    const categoryId = `cat_${category}`;
    const categoryOpen = glossaryOpenCategories.has(category);
    const itemsHtml = grouped[category].map((item) => {
      const itemKey = `${category}::${item.term}`;
      const itemOpen = glossaryOpenTerms.has(itemKey);
      const cues = (item.cues || []).map((cue) => `<li>${escapeHtml(cue)}</li>`).join("");
      const steps = (item.steps || []).map((step) => `<li>${escapeHtml(step)}</li>`).join("");
      return `
        <article class="glossary-item ${itemOpen ? "is-open" : ""}">
          <button type="button" class="glossary-item-toggle" data-glossary-item="${escapeHtml(itemKey)}" aria-expanded="${itemOpen}">
            <div class="glossary-item-head">
              <strong>${escapeHtml(item.term)}</strong>
              <span class="glossary-chevron">${itemOpen ? "−" : "+"}</span>
            </div>
            <p>${escapeHtml(item.text)}</p>
          </button>
          <div class="glossary-item-detail" ${itemOpen ? "" : "hidden"}>
            ${renderExerciseVisual(item)}
            <div class="glossary-item-detail-grid">
              <div class="glossary-detail-block">
                <span>${currentLang === "de" ? "So setzt du es ein" : currentLang === "ja" ? "使い方" : "How to use it"}</span>
                <strong>${escapeHtml(item.detail || item.text)}</strong>
              </div>
              ${steps ? `<div class="glossary-detail-block"><span>${currentLang === "de" ? "Ablauf" : currentLang === "ja" ? "流れ" : "Flow"}</span><ul>${steps}</ul></div>` : ""}
              ${cues ? `<div class="glossary-detail-block"><span>${currentLang === "de" ? "Wichtige Cues" : currentLang === "ja" ? "キュー" : "Key cues"}</span><ul>${cues}</ul></div>` : ""}
            </div>
          </div>
        </article>`;
    }).join("");

    return `
      <section class="glossary-category ${categoryOpen ? "is-open" : ""}">
        <button type="button" class="glossary-category-toggle" data-glossary-category="${escapeHtml(category)}" aria-expanded="${categoryOpen}">
          <strong>${escapeHtml(glossaryCategoryLabel(category))}</strong>
          <span>${grouped[category].length}</span>
        </button>
        <div class="glossary-category-body" ${categoryOpen ? "" : "hidden"}>
          ${itemsHtml}
        </div>
      </section>`;
  }).join("");
}

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { accounts: [], currentAccountId: null };
    const parsed = JSON.parse(raw);
    return {
      accounts: Array.isArray(parsed.accounts) ? parsed.accounts : [],
      currentAccountId: parsed.currentAccountId || null,
    };
  } catch {
    return { accounts: [], currentAccountId: null };
  }
}

function persistStore() {
  if (!appStore) return;
  appStore.currentAccountId = currentAccountId;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appStore));
}

function getCurrentAccount() {
  if (!appStore || !currentAccountId) return null;
  const account = appStore.accounts.find((a) => a.id === currentAccountId) || null;
  if (account) {
    ensureAccountSettingsShape(account);
    ensureAccountIntegrationsShape(account);
  }
  return account;
}

function ensureAccountSettingsShape(account) {
  if (!account) return;
  const defaults = defaultAccountSettings();
  account.settings = account.settings || {};
  account.settings.account = { ...defaults.account, ...(account.settings.account || {}) };
  account.settings.privacy = { ...defaults.privacy, ...(account.settings.privacy || {}) };
  account.settings.safety = { ...defaults.safety, ...(account.settings.safety || {}) };
}

function ensureAccountIntegrationsShape(account) {
  if (!account) return;
  account.integrations = account.integrations || {};
  account.integrations.strava = {
    connected: false,
    lastStatusAt: null,
    userId: null,
    athlete: null,
    expires_at: null,
    scope: null,
    error: null,
    ...(account.integrations.strava || {}),
  };
}

function setAuthMode(mode) {
  authMode = mode === "register" ? "register" : "login";
  accountTabButtons.forEach((btn) => btn.classList.toggle("is-active", btn.dataset.authMode === authMode));
  if (accountSubmitBtn) accountSubmitBtn.textContent = authMode === "register" ? "create" : "login";
  if (accountFormStatusEl) accountFormStatusEl.textContent = "";
}

function openAccountModal(mode = authMode) {
  if (!accountModalEl) return;
  setAuthMode(mode);
  accountModalEl.hidden = false;
}

function closeAccountModal() {
  if (!accountModalEl) return;
  accountModalEl.hidden = true;
}

function registerAccount(email, password) {
  if (!email || !email.includes("@")) return { ok: false, message: "Bitte gültige E-Mail eingeben." };
  if (!password || password.length < 6) return { ok: false, message: "Passwort muss mindestens 6 Zeichen haben." };
  if (appStore.accounts.some((a) => a.email === email)) return { ok: false, message: "E-Mail existiert bereits." };

  const account = {
    id: `acc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    email,
    password, // Local MVP only (replace with backend auth + hashing)
    createdAt: new Date().toISOString(),
    plans: [],
    friends: [],
    connectedSources: [],
    settings: defaultAccountSettings(),
  };
  appStore.accounts.push(account);
  currentAccountId = account.id;
  persistStore();
  hydrateConnectedSourcesFromAccount();
  document.body.classList.add("is-authenticated");
  return { ok: true, message: "Account erstellt." };
}

function loginAccount(email, password) {
  const account = appStore.accounts.find((a) => a.email === email);
  if (!account) return { ok: false, message: "Account nicht gefunden." };
  if (account.password !== password) return { ok: false, message: "Passwort falsch." };
  currentAccountId = account.id;
  persistStore();
  hydrateConnectedSourcesFromAccount();
  document.body.classList.add("is-authenticated");
  return { ok: true, message: "Eingeloggt." };
}

function requestPasswordReset(email) {
  const normalized = String(email || "").trim().toLowerCase();
  if (!normalized || !normalized.includes("@")) {
    return { ok: false, message: "Bitte zuerst eine gültige E-Mail eingeben." };
  }
  const account = appStore?.accounts?.find((a) => a.email === normalized);
  if (!account) {
    return { ok: true, message: "Wenn ein Account existiert, wurde ein Reset-Hinweis gesendet. (MVP lokal: keine Mail-Infrastruktur verbunden)" };
  }
  const tempPassword = `aim${Math.random().toString(36).slice(2, 8)}!`;
  account.password = tempPassword;
  persistStore();
  return { ok: true, message: `MVP Reset: Temporäres Passwort lokal gesetzt: ${tempPassword}` };
}

function changeCurrentAccountPassword(currentPassword, newPassword) {
  const account = getCurrentAccount();
  if (!account) return { ok: false, message: "Bitte zuerst einloggen." };
  if (!currentPassword || account.password !== currentPassword) return { ok: false, message: "Aktuelles Passwort ist falsch." };
  if (!newPassword || newPassword.length < 6) return { ok: false, message: "Neues Passwort muss mindestens 6 Zeichen haben." };
  account.password = newPassword;
  persistStore();
  return { ok: true, message: "Passwort aktualisiert." };
}

function exportCurrentAccountData() {
  const account = getCurrentAccount();
  if (!account) return { ok: false, message: "Bitte zuerst einloggen." };
  const safeAccount = JSON.parse(JSON.stringify(account));
  delete safeAccount.password;
  downloadTextFile({
    content: JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        schema: "aimrunna-local-mvp-account-export-v1",
        account: safeAccount,
      },
      null,
      2
    ),
    filename: `aimrunna-account-export-${slugify(account.email.split("@")[0] || "user")}.json`,
    mimeType: "application/json;charset=utf-8",
  });
  return { ok: true, message: "Export erstellt." };
}

function deleteCurrentAccountLocalMvp() {
  const account = getCurrentAccount();
  if (!account) return { ok: false, message: "Bitte zuerst einloggen." };
  const confirmed = window.confirm(`Account ${account.email} lokal löschen? Diese Aktion betrifft nur diesen Browser (MVP).`);
  if (!confirmed) return { ok: false, message: "Abgebrochen." };
  appStore.accounts = (appStore.accounts || []).filter((a) => a.id !== account.id);
  currentAccountId = null;
  connectedSources.clear();
  persistStore();
  syncConnectorButtons();
  renderAccountUi();
  return { ok: true, message: "Account lokal gelöscht." };
}

function logoutCurrentAccount() {
  currentAccountId = null;
  connectedSources.clear();
  connectorButtons.forEach((b) => b.classList.remove("active"));
  persistStore();
  document.body.classList.remove("is-authenticated");
  renderAccountUi();
  stravaStatusFetchedForUserId = null;
  setText(connectionState, t("no_sources"));
}

function hydrateConnectedSourcesFromAccount() {
  connectedSources.clear();
  const account = getCurrentAccount();
  (account?.connectedSources || []).forEach((src) => connectedSources.add(src));
}

function persistConnectedSourcesForCurrentUser() {
  const account = getCurrentAccount();
  if (!account) return;
  account.connectedSources = [...connectedSources];
  persistStore();
}

function syncConnectorButtons() {
  connectorButtons.forEach((button) => {
    const source = button.dataset.source;
    button.classList.toggle("active", connectedSources.has(source));
  });
}

function savePlanToLibrary(account, profile, plan) {
  account.plans = Array.isArray(account.plans) ? account.plans : [];
  const item = {
    id: `plan_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    title: `${disciplineLabel(profile.discipline)} • ${labelDistance(profile.goalDistance)} • ${profile.goalTime}`,
    summary: `${plan.weeks.length} Wochen • ${Math.round(plan.meta.weeklyKmBase)} Base`,
    profile: serializeProfile(profile),
    plan: serializePlan(plan),
  };
  account.plans.unshift(item);
  account.plans = account.plans.slice(0, 20);
}

function serializeProfile(profile) {
  return {
    ...profile,
    raceDate: profile?.raceDate instanceof Date ? profile.raceDate.toISOString() : profile?.raceDate,
  };
}

function serializePlan(plan) {
  return {
    ...plan,
    weeks: (plan.weeks || []).map((week) => ({
      ...week,
      weekStart: week.weekStart instanceof Date ? week.weekStart.toISOString() : week.weekStart,
      days: (week.days || []).map((day) => ({
        ...day,
        date: day.date instanceof Date ? day.date.toISOString() : day.date,
      })),
    })),
    sessions: (plan.sessions || []).map((session) => ({
      ...session,
      date: session.date instanceof Date ? session.date.toISOString() : session.date,
    })),
  };
}

function hydrateStoredProfile(profile) {
  return {
    ...profile,
    raceDate: profile?.raceDate ? new Date(profile.raceDate) : null,
  };
}

function hydrateStoredPlan(plan) {
  return {
    ...plan,
    weeks: (plan.weeks || []).map((week) => ({
      ...week,
      weekStart: week.weekStart ? new Date(week.weekStart) : null,
      days: (week.days || []).map((day) => ({
        ...day,
        date: day.date ? new Date(day.date) : null,
      })),
    })),
    sessions: (plan.sessions || []).map((session, index) => ({
      ...session,
      _id: session._id || `session-${index}`,
      date: session.date ? new Date(session.date) : null,
    })),
  };
}

function loadSavedPlanById(planId) {
  const account = getCurrentAccount();
  if (!account) return;
  const item = (account.plans || []).find((p) => p.id === planId);
  if (!item) return;
  latestProfile = hydrateStoredProfile(item.profile);
  latestPlan = hydrateStoredPlan(item.plan);
  generatedSessions = latestPlan.sessions || [];
  renderAnalysis(latestProfile, latestPlan);
  renderPlan(latestPlan);
  renderPerformanceInsights(latestProfile, latestPlan);
  exportIcalBtn.disabled = generatedSessions.length === 0;
  document.body.classList.add("has-output");
  syncUiState();
}

function addFriendByEmail(account, email) {
  if (!email || !email.includes("@")) return { ok: false, message: t("invalid_email") };
  if (email === account.email) return { ok: false, message: t("own_email_not_allowed") };
  const exists = appStore.accounts.find((a) => a.email === email);
  if (!exists) return { ok: false, message: t("account_not_found_local") };
  account.friends = Array.isArray(account.friends) ? account.friends : [];
  if (!account.friends.includes(email)) account.friends.push(email);
  persistStore();
  return { ok: true, message: t("connected") };
}

function renderAccountUi() {
  const account = getCurrentAccount();
  const isAuth = Boolean(account);
  document.body.classList.toggle("is-authenticated", isAuth);
  if (accountPillEl) accountPillEl.hidden = !isAuth;

  if (accountLabelEl) accountLabelEl.textContent = isAuth ? account.email.split("@")[0] : t("account_guest");
  if (accountStatusTagEl) accountStatusTagEl.textContent = isAuth ? t("account_signed_in") : t("account_guest");
  if (accountStatusCopyEl) {
    accountStatusCopyEl.textContent = isAuth
      ? t("account_status_signed_in")
      : t("account_status_guest");
  }
  const topAuthActionsVisible = !isAuth && activeAppView === "home";
  if (accountLoginBtn) accountLoginBtn.hidden = !topAuthActionsVisible;
  if (accountRegisterBtn) accountRegisterBtn.hidden = !topAuthActionsVisible;
  if (accountSettingsBtn) accountSettingsBtn.hidden = !isAuth;
  if (accountLogoutBtn) accountLogoutBtn.hidden = !isAuth;
  if (accountOpenLoginBtn) accountOpenLoginBtn.hidden = true;
  if (accountOpenRegisterBtn) accountOpenRegisterBtn.hidden = true;
  if (savePlanBtn) savePlanBtn.disabled = !isAuth || !latestPlan || !latestProfile;
  renderProfileAvatar(account);
  populateSettingsForms(account);

  renderSavedPlansList(account);
  renderFriendsList(account);
  renderAccountSearchResults(lastAccountSearchQuery);
  renderProfileStats(account);
  renderProfileFeed(account);
  renderCrewFeed(account);
  renderCrewRanking(account);
  setActiveAccountSection(activeAccountSection);
  syncProfileComposerVisibility();
  renderStravaProfileStatus(account);
  updateConnectionStateCopy();
  maybeFetchStravaStatus(account);
}

function populateSettingsForms(account) {
  if (!account) {
    [accountSettingsFormEl, privacySettingsFormEl, safetySettingsFormEl].forEach((formEl) => formEl?.reset());
    return;
  }
  ensureAccountSettingsShape(account);
  const settings = account.settings;
  setFormValue(accountSettingsFormEl, "language", settings.account.language);
  setFormValue(accountSettingsFormEl, "units", settings.account.units);
  setFormValue(accountSettingsFormEl, "timezone", settings.account.timezone);
  setFormValue(accountSettingsFormEl, "emailNotifications", settings.account.emailNotifications);
  setFormValue(privacySettingsFormEl, "profileVisibility", settings.privacy.profileVisibility);
  setFormValue(privacySettingsFormEl, "activityVisibility", settings.privacy.activityVisibility);
  setFormValue(privacySettingsFormEl, "searchDiscoverability", settings.privacy.searchDiscoverability);
  setFormValue(privacySettingsFormEl, "messagingPermission", settings.privacy.messagingPermission);
  setFormValue(privacySettingsFormEl, "mapPrivacy", settings.privacy.mapPrivacy);
  setFormValue(privacySettingsFormEl, "mentionsPermission", settings.privacy.mentionsPermission);
  setFormValue(safetySettingsFormEl, "commentFilter", settings.safety.commentFilter);
  setFormValue(safetySettingsFormEl, "imageModeration", settings.safety.imageModeration);
  setFormValue(safetySettingsFormEl, "riskWarnings", settings.safety.riskWarnings);
  setFormValue(safetySettingsFormEl, "communityGuidelinesAccepted", settings.safety.communityGuidelinesAccepted);
}

function setFormValue(formEl, name, value) {
  const field = formEl?.elements?.[name];
  if (field) field.value = value ?? "";
}

function renderSavedPlansList(account) {
  const plans = account?.plans || [];
  if (savedPlanCountEl) savedPlanCountEl.textContent = String(plans.length);
  if (!savedPlansListEl) return;
  if (!plans.length) {
    savedPlansListEl.innerHTML = `<div class="empty-copy">${escapeHtml(t("empty_saved_plans"))}</div>`;
    return;
  }
  savedPlansListEl.innerHTML = plans
    .map(
      (plan) => `
      <div class="saved-plan-item">
        <strong>${escapeHtml(plan.title)}</strong>
        <small>${escapeHtml(plan.summary)} • ${escapeHtml(formatDateShort(new Date(plan.createdAt)))}</small>
        <button type="button" class="ghost" data-load-plan-id="${escapeHtml(plan.id)}">${escapeHtml(currentLang === "ja" ? "プランを開く" : currentLang === "en" ? "Load plan" : "Plan laden")}</button>
      </div>`
    )
    .join("");

  savedPlansListEl.querySelectorAll("[data-load-plan-id]").forEach((btn) => {
    btn.addEventListener("click", () => loadSavedPlanById(btn.getAttribute("data-load-plan-id")));
  });
}

function renderFriendsList(account) {
  const friends = account?.friends || [];
  if (!friendsListEl) return;
  if (!friends.length) {
    friendsListEl.innerHTML = `<div class="empty-copy">${escapeHtml(t("empty_connections"))}</div>`;
    return;
  }
  friendsListEl.innerHTML = friends
    .map((email) => {
      const friend = (appStore.accounts || []).find((a) => a.email === email);
      const stats = computeAccountStats(friend);
      const latest = (friend?.activities || [])[0];
      const latestText = latest
        ? `${latest.kind === "race" ? "race." : t("label_training")} • ${formatSocialSportLabel(latest.sportType)}${latest.distanceKm ? ` • ${Number(latest.distanceKm).toFixed(1)} km` : ""}`
        : t("label_no_activity");
      return `
      <div class="friend-item">
        <strong>${escapeHtml(email)}</strong>
        <small>${stats.points} ${escapeHtml(t("unit_points"))} • ${stats.races} ${escapeHtml(t("unit_races"))} • ${escapeHtml(latestText)}</small>
      </div>`
    })
    .join("");
}

function renderAccountSearchResults(query = "") {
  if (!accountSearchResultsEl) return;
  const q = String(query || "").trim().toLowerCase();
  const account = getCurrentAccount();
  const ownEmail = account?.email || "";
  const all = appStore?.accounts || [];

  if (!q) {
    if (crewResultCountEl) crewResultCountEl.textContent = "0";
    accountSearchResultsEl.innerHTML = `<div class="empty-copy">${escapeHtml(t("empty_search_prompt"))}</div>`;
    return;
  }

  const results = all
    .filter((a) => a.email !== ownEmail)
    .filter((a) => a.email.toLowerCase().includes(q) || a.email.split("@")[0].toLowerCase().includes(q))
    .slice(0, 12);

  if (crewResultCountEl) crewResultCountEl.textContent = String(results.length);

  if (!results.length) {
    accountSearchResultsEl.innerHTML = `<div class="empty-copy">${escapeHtml(t("empty_search_none"))}</div>`;
    return;
  }

  accountSearchResultsEl.innerHTML = results
    .map((a) => {
      const isConnected = Boolean(account?.friends?.includes(a.email));
      return `
      <div class="account-search-item">
        <div class="account-search-row">
          <div>
            <strong>${escapeHtml(a.email.split("@")[0])}</strong>
            <small>${escapeHtml(a.email)} • ${Array.isArray(a.plans) ? a.plans.length : 0} ${escapeHtml(t("label_plans"))}</small>
          </div>
          <div class="account-search-actions">
            <button type="button" class="ghost" data-connect-account-email="${escapeHtml(a.email)}" ${isConnected ? "disabled" : ""}>
              ${isConnected ? escapeHtml(t("connected")) : escapeHtml(t("connect"))}
            </button>
          </div>
        </div>
      </div>`;
    })
    .join("");

  accountSearchResultsEl.querySelectorAll("[data-connect-account-email]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = getCurrentAccount();
      if (!current) {
        openAccountModal("login");
        setText(accountFormStatusEl, t("login_first"));
        return;
      }
      const email = btn.getAttribute("data-connect-account-email");
      const result = addFriendByEmail(current, email);
      if (result.ok) persistStore();
      renderAccountUi();
    });
  });
}

function setActiveAccountSection(section) {
  activeAccountSection = section === "crew" ? "crew" : "profile";
  accountSectionTabButtons.forEach((btn) =>
    btn.classList.toggle("is-active", btn.dataset.accountSection === activeAccountSection)
  );
  if (accountPaneProfileEl) accountPaneProfileEl.classList.toggle("is-active", activeAccountSection === "profile");
  if (accountPaneCrewEl) accountPaneCrewEl.classList.toggle("is-active", activeAccountSection === "crew");
}

function setActiveProfileView(view) {
  activeProfileView = ["overview", "activities", "health", "settings"].includes(view) ? view : "overview";
  document.body.classList.remove("profile-view-overview", "profile-view-activities", "profile-view-health", "profile-view-settings");
  document.body.classList.add(`profile-view-${activeProfileView}`);
  profileViewTabButtons.forEach((btn) => btn.classList.toggle("is-active", btn.dataset.profileView === activeProfileView));
  if (activeProfileView === "settings") {
    setActiveProfileSettingsView(activeProfileSettingsView || "account");
  }
  if (activeProfileView === "overview") maybeFetchStravaStatus(getCurrentAccount());
}

function setActiveProfileSettingsView(view) {
  activeProfileSettingsView = ["account", "privacy"].includes(view) ? view : "account";
  profileSettingsNavButtons.forEach((btn) =>
    btn.classList.toggle("is-active", btn.dataset.profileSettingsView === activeProfileSettingsView)
  );
  profileSettingsPanels.forEach((panel) =>
    panel.classList.toggle("is-active", panel.dataset.profileSettingsPanel === activeProfileSettingsView)
  );
}

function setAppView(view) {
  activeAppView = ["home", "profile", "crew"].includes(view) ? view : "home";
  document.body.classList.remove("app-view-home", "app-view-profile", "app-view-crew");
  document.body.classList.add(`app-view-${activeAppView}`);

  const isSettingsView = activeAppView === "profile" && activeProfileView === "settings";
  accountHomeBtn?.classList.toggle("is-active", activeAppView === "home");
  accountProfileBtn?.classList.toggle("is-active", activeAppView === "profile" && !isSettingsView);
  accountCrewBtn?.classList.toggle("is-active", activeAppView === "crew");
  accountSettingsBtn?.classList.toggle("is-active", isSettingsView);

  if (activeAppView === "profile") {
    setActiveProfileView(activeProfileView);
    sectionAccountEl?.classList.add("is-visible");
    sectionDataEl?.classList.add("is-visible");
    scrollToSectionStart(sectionAccountEl, { mobileOffset: 150, desktopOffset: 114, duration: 520 });
  } else if (activeAppView === "crew") {
    sectionAccountEl?.classList.add("is-visible");
    scrollToSectionStart(sectionAccountEl, { mobileOffset: 150, desktopOffset: 114, duration: 520 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  renderAccountUi();
}

function renderProfileAvatar(account) {
  if (!profileAvatarPreviewEl) return;
  const label = (account?.email?.[0] || "A").toUpperCase();
  profileAvatarPreviewEl.textContent = label;
  if (account?.profileImage) {
    profileAvatarPreviewEl.style.backgroundImage = `url('${account.profileImage}')`;
    profileAvatarPreviewEl.classList.add("has-image");
  } else {
    profileAvatarPreviewEl.style.backgroundImage = "";
    profileAvatarPreviewEl.classList.remove("has-image");
  }
}

function postActivity(account, { title, note, kind, sportType, distanceKm, imageDataUrl }) {
  account.activities = Array.isArray(account.activities) ? account.activities : [];
  account.activities.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    title,
    note,
    kind,
    sportType: ["run", "bike", "swim", "hyrox", "other"].includes(sportType) ? sportType : "other",
    distanceKm: clamp(Number(distanceKm) || 0, 0, 1000),
    imageDataUrl: imageDataUrl || null,
    propsBy: [],
  });
  account.activities = account.activities.slice(0, 60);
}

function renderProfileStats(account) {
  const statsToday = computeAccountStats(account, { range: "today" });
  const statsYear = computeAccountStats(account, { range: "12m" });
  const statsAll = computeAccountStats(account, { range: "all" });
  if (profilePointsBadgeEl) profilePointsBadgeEl.textContent = `${statsAll.points} ${t("unit_points")}`;
  applyProfileStatsToBindings(profileStatBindings.today, statsToday);
  applyProfileStatsToBindings(profileStatBindings.year, statsYear);
  applyProfileStatsToBindings(profileStatBindings.all, statsAll);
}

function renderProfileFeed(account) {
  const activities = account?.activities || [];
  if (profileFeedCountEl) profileFeedCountEl.textContent = String(activities.length);
  if (!profileFeedListEl) return;
  if (!activities.length) {
    profileFeedListEl.innerHTML = `<div class="empty-copy">${escapeHtml(t("empty_profile_feed"))}</div>`;
    return;
  }
  profileFeedListEl.innerHTML = activities.map((item) => buildActivityCardHtml({
    item,
    actorEmail: account.email,
    actorAvatar: account.profileImage || null,
    actorPoints: activityPoints(item),
    viewerEmail: account.email,
    showPropsAction: false,
  })).join("");
}

function renderCrewFeed(account) {
  if (!crewFeedListEl) return;
  if (!account) {
    if (crewFeedCountEl) crewFeedCountEl.textContent = "0";
    crewFeedListEl.innerHTML = `<div class="empty-copy">${escapeHtml(t("empty_login_crew"))}</div>`;
    return;
  }
  const friendEmails = account.friends || [];
  const items = (appStore.accounts || [])
    .filter((a) => friendEmails.includes(a.email))
    .flatMap((a) => (a.activities || []).map((item) => ({ item, actorEmail: a.email, actorAvatar: a.profileImage || null })))
    .sort((a, b) => new Date(b.item.createdAt) - new Date(a.item.createdAt))
    .slice(0, 40);

  if (crewFeedCountEl) crewFeedCountEl.textContent = String(items.length);
  if (!items.length) {
    crewFeedListEl.innerHTML = `<div class="empty-copy">${escapeHtml(t("empty_crew_feed"))}</div>`;
    return;
  }
  crewFeedListEl.innerHTML = items
    .map((entry) =>
      buildActivityCardHtml({
        ...entry,
        actorPoints: activityPoints(entry.item),
        viewerEmail: account.email,
        showPropsAction: true,
      })
    )
    .join("");

  crewFeedListEl.querySelectorAll("[data-props-activity]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const ownerEmail = btn.getAttribute("data-props-owner");
      const activityId = btn.getAttribute("data-props-activity");
      const viewer = getCurrentAccount();
      if (!viewer || !ownerEmail || !activityId) return;
      togglePropsOnActivity(ownerEmail, activityId, viewer.email);
      persistStore();
      renderAccountUi();
    });
  });
}

function renderCrewRanking(account) {
  if (!crewRankingListEl) return;
  if (!account) {
    if (crewRankingCountEl) crewRankingCountEl.textContent = "0";
    crewRankingListEl.innerHTML = `<div class="empty-copy">${escapeHtml(t("empty_login_ranking"))}</div>`;
    return;
  }
  const emails = [account.email, ...(account.friends || [])];
  const rows = (appStore.accounts || [])
    .filter((a) => emails.includes(a.email))
    .map((a) => ({ account: a, stats: computeAccountStats(a) }))
    .sort((a, b) => b.stats.points - a.stats.points)
    .slice(0, 10);

  if (crewRankingCountEl) crewRankingCountEl.textContent = String(rows.length);
  if (!rows.length) {
    crewRankingListEl.innerHTML = `<div class="empty-copy">${escapeHtml(t("empty_crew_data"))}</div>`;
    return;
  }
  crewRankingListEl.innerHTML = rows
    .map(
      ({ account: rowAcc, stats }, index) => `
      <div class="friend-item">
        <strong>#${index + 1} ${escapeHtml(rowAcc.email.split("@")[0])}</strong>
        <small>${stats.points} ${escapeHtml(t("unit_points"))} • ${stats.runKm.toFixed(0)}k RUN • ${stats.bikeKm.toFixed(0)}k BIKE • ${stats.races} ${escapeHtml(t("unit_races"))}</small>
      </div>`
    )
    .join("");
}

function buildActivityCardHtml({ item, actorEmail, actorAvatar, actorPoints = 0, viewerEmail = "", showPropsAction = false }) {
  const actorName = String(actorEmail || "Athlete").split("@")[0];
  const initials = (actorName[0] || "A").toUpperCase();
  const created = formatRelativeTime(item.createdAt);
  const isRace = item.kind === "race";
  const propsCount = Array.isArray(item.propsBy) ? item.propsBy.length : 0;
  const hasPropd = viewerEmail && Array.isArray(item.propsBy) && item.propsBy.includes(viewerEmail);
  const distanceMeta = item.distanceKm ? ` • ${Number(item.distanceKm).toFixed(1)} km` : "";
  const sportMeta = item.sportType ? ` • ${formatSocialSportLabel(item.sportType)}` : "";
  return `
    <article class="activity-card">
      <div class="activity-card-head">
        <div class="activity-card-user">
          <div class="activity-avatar ${actorAvatar ? "has-image" : ""}" style="${actorAvatar ? `background-image:url('${actorAvatar}')` : ""}">${escapeHtml(initials)}</div>
          <div>
            <strong>${escapeHtml(actorName)}</strong>
            <small>${escapeHtml(created)}</small>
          </div>
        </div>
        <span class="activity-kind-badge ${isRace ? "race" : ""}">${isRace ? "race." : escapeHtml(t("label_training"))}</span>
      </div>
      <div class="activity-card-body">
        <div class="activity-card-title">${escapeHtml(item.title)}</div>
        <div class="activity-points">${actorPoints} ${escapeHtml(t("unit_points"))}${sportMeta}${distanceMeta}</div>
        ${item.note ? `<div class="activity-card-note">${escapeHtml(item.note)}</div>` : ""}
        ${item.imageDataUrl ? `<img class="activity-card-image" src="${item.imageDataUrl}" alt="Activity image" loading="lazy" />` : ""}
        <div class="activity-card-foot">
          <div class="activity-points">${propsCount} ${escapeHtml(t("label_props").toLowerCase())}</div>
          ${showPropsAction && viewerEmail && viewerEmail !== actorEmail ? `<button type="button" class="props-btn ${hasPropd ? "is-active" : ""}" data-props-owner="${escapeHtml(actorEmail)}" data-props-activity="${escapeHtml(item.id)}">${escapeHtml(t("label_props"))}</button>` : ""}
        </div>
      </div>
    </article>
  `;
}

function togglePropsOnActivity(ownerEmail, activityId, viewerEmail) {
  const owner = (appStore.accounts || []).find((a) => a.email === ownerEmail);
  if (!owner) return;
  owner.activities = Array.isArray(owner.activities) ? owner.activities : [];
  const activity = owner.activities.find((a) => a.id === activityId);
  if (!activity) return;
  activity.propsBy = Array.isArray(activity.propsBy) ? activity.propsBy : [];
  if (activity.propsBy.includes(viewerEmail)) {
    activity.propsBy = activity.propsBy.filter((e) => e !== viewerEmail);
  } else {
    activity.propsBy.push(viewerEmail);
  }
}

function computeAccountStats(account, { range = "all" } = {}) {
  const now = Date.now();
  const activities = (account?.activities || []).filter((a) => {
    if (range === "all") return true;
    const ts = new Date(a.createdAt || 0).getTime();
    if (!Number.isFinite(ts) || !ts) return false;
    if (range === "today") {
      const d = new Date(ts);
      const n = new Date(now);
      return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate();
    }
    if (range === "12m") {
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
      return ts >= twelveMonthsAgo.getTime();
    }
    return true;
  });
  const runKm = sumBy(activities.filter((a) => a.sportType === "run"), (a) => Number(a.distanceKm) || 0);
  const bikeKm = sumBy(activities.filter((a) => a.sportType === "bike"), (a) => Number(a.distanceKm) || 0);
  const swimKm = sumBy(activities.filter((a) => a.sportType === "swim"), (a) => Number(a.distanceKm) || 0);
  const races = activities.filter((a) => a.kind === "race").length;
  const propsReceived = sumBy(activities, (a) => (Array.isArray(a.propsBy) ? a.propsBy.length : 0));
  const points = Math.round(sumBy(activities, activityPoints) + propsReceived * 3);
  return { runKm, bikeKm, swimKm, races, propsReceived, points };
}

function applyProfileStatsToBindings(bindings, stats) {
  if (!bindings || !stats) return;
  if (bindings.badge) bindings.badge.textContent = `${stats.points} ${t("unit_points")}`;
  if (bindings.run) bindings.run.textContent = `${stats.runKm.toFixed(1)} km`;
  if (bindings.bike) bindings.bike.textContent = `${stats.bikeKm.toFixed(1)} km`;
  if (bindings.swim) bindings.swim.textContent = `${stats.swimKm.toFixed(1)} km`;
  if (bindings.races) bindings.races.textContent = String(stats.races);
  if (bindings.props) bindings.props.textContent = String(stats.propsReceived);
  if (bindings.points) bindings.points.textContent = String(stats.points);
}

function syncProfileComposerVisibility() {
  const shouldShow = activeAppView === "profile" && activeProfileView === "activities" && profileComposerExpanded;
  if (activityComposeModalEl) activityComposeModalEl.hidden = !shouldShow;
  if (profilePostCardEl) profilePostCardEl.hidden = !shouldShow;
  if (profileQuickAddBtnEl) {
    profileQuickAddBtnEl.classList.toggle("is-active", shouldShow);
    profileQuickAddBtnEl.setAttribute("aria-label", shouldShow ? "Manuelle Aktivität verbergen" : "Manuelle Aktivität hinzufügen");
  }
}

function closeActivityComposeModal() {
  profileComposerExpanded = false;
  syncProfileComposerVisibility();
}

function activityPoints(item) {
  const km = Number(item?.distanceKm) || 0;
  const sportFactor = { run: 5, bike: 2, swim: 10, hyrox: 6, other: 1 }[item?.sportType] || 1;
  const base = Math.round(km * sportFactor);
  const raceBonus = item?.kind === "race" ? 60 + Math.round(km * 2) : 8;
  return base + raceBonus;
}

function sumBy(list, fn) {
  return (list || []).reduce((sum, item) => sum + (Number(fn(item)) || 0), 0);
}

function formatRelativeTime(iso) {
  const d = new Date(iso);
  const mins = Math.round((Date.now() - d.getTime()) / 60000);
  if (mins < 1) return "Gerade eben";
  if (mins < 60) return `vor ${mins} min`;
  const h = Math.round(mins / 60);
  if (h < 24) return `vor ${h} h`;
  const days = Math.round(h / 24);
  return `vor ${days} d`;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("file_read_failed"));
    reader.readAsDataURL(file);
  });
}

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

    applyHeroImagesForDiscipline(discipline);
    syncDisciplineSpecificFields(discipline);
  };

  disciplineSelect.addEventListener("change", () => sync({ resetTime: true }));
  goalDistanceSelect.addEventListener("change", () => {
    const suggested = defaultGoalTimeFor(disciplineSelect.value, goalDistanceSelect.value);
    if (disciplineSelect.value === "shape" && suggested && form?.elements?.goalTime) {
      form.elements.goalTime.value = suggested;
    } else if (suggested && form?.elements?.goalTime && !String(form.elements.goalTime.value).trim()) {
      form.elements.goalTime.value = suggested;
    }
    syncDisciplineSpecificFields(disciplineSelect.value);
  });

  sexSelect?.addEventListener("change", syncCycleBasedTrainingAvailability);
  cycleTrainingCheckbox?.addEventListener("change", () => {
    syncCycleBasedTrainingAvailability();
  });
  shapeGymShareInputEl?.addEventListener("input", syncShapeGymShareLabel);
  bikeOutdoorDaySelectEl?.addEventListener("change", () => syncDisciplineShareControl(disciplineSelect?.value));
  longRunDaySelectEl?.addEventListener("change", () => syncDisciplineSpecificFields(disciplineSelect?.value));
  shapeTargetFocusSelectEl?.addEventListener("change", syncShapeGoalConsistency);
  form?.elements?.weightKg?.addEventListener?.("input", syncShapeGoalConsistency);
  form?.elements?.targetWeightKg?.addEventListener?.("input", syncShapeGoalConsistency);
  form?.elements?.raceDate?.addEventListener?.("change", syncShapeGoalConsistency);
  sync();
  syncShapeGymShareLabel();
  syncCycleBasedTrainingAvailability();
}

function syncDisciplineSpecificFields(discipline = disciplineSelect?.value) {
  const isShape = discipline === "shape";
  const isBikeBased = discipline === "triathlon" || discipline === "cycling";
  const isHyrox = discipline === "hyrox";
  const isRunning = discipline === "running";
  const showSharedSlider = isShape || isBikeBased || isHyrox;
  const showTargetFocus = isShape || isRunning || discipline === "triathlon" || isHyrox;
  const showLongRunDay = isRunning || discipline === "triathlon";

  if (shapeTargetWeightFieldEl) shapeTargetWeightFieldEl.hidden = !isShape;
  if (shapeTargetFocusFieldEl) shapeTargetFocusFieldEl.hidden = !showTargetFocus;
  if (shapeGymShareFieldEl) shapeGymShareFieldEl.hidden = !showSharedSlider;
  if (bikeOutdoorDayFieldEl) bikeOutdoorDayFieldEl.hidden = !isBikeBased;
  if (longRunDayFieldEl) longRunDayFieldEl.hidden = !showLongRunDay;
  if (shapeGoalGuidanceEl) shapeGoalGuidanceEl.hidden = true;
  setFieldEnabled(shapeTargetWeightFieldEl, isShape);
  setFieldEnabled(shapeTargetFocusFieldEl, showTargetFocus);
  setFieldEnabled(shapeGymShareFieldEl, showSharedSlider);
  setFieldEnabled(bikeOutdoorDayFieldEl, isBikeBased);
  setFieldEnabled(longRunDayFieldEl, showLongRunDay);
  syncShapeTargetFocusOptions(discipline, goalDistanceSelect?.value);
  syncDisciplineShareControl(discipline);
  syncDisciplineSpecificPlaceholders(discipline);
  syncLongRunDayLabel(discipline);

  if (goalTimeLabelEl) {
    goalTimeLabelEl.textContent = isShape
      ? currentLang === "ja"
        ? "目標値"
        : currentLang === "en"
          ? "Target marker"
          : "Zielwert"
      : t("field_goal_time");
  }
  if (goalTimeInputEl) {
    goalTimeInputEl.placeholder = isShape
      ? currentLang === "ja"
        ? "例: -6 kg / 78 kg"
        : currentLang === "en"
          ? "e.g. -6 kg / 78 kg"
          : "z. B. -6 kg / 78 kg"
      : "2:59:00";
  }
  if (raceDateLabelEl) {
    raceDateLabelEl.textContent = isShape
      ? currentLang === "ja"
        ? "Target Date"
        : currentLang === "en"
          ? "Target Date"
          : "Zieldatum"
      : currentLang === "ja"
        ? "Race Date"
        : currentLang === "en"
          ? "Race Date"
          : "Race Date";
  }
  if (plannerSubmitBtnEl) {
    const ctaByDiscipline = {
      running: "run.",
      triathlon: "race.",
      cycling: "bike.",
      hyrox: "race.",
      shape: "shape.",
    };
    plannerSubmitBtnEl.textContent = ctaByDiscipline[discipline] || "race.";
  }
  if (isShape && goalTimeInputEl && /^(\d{1,2}:)?\d{1,2}:\d{2}$/.test(String(goalTimeInputEl.value || "").trim())) {
    goalTimeInputEl.value = currentLang === "en" ? "-4 kg" : "-4 kg";
  }
  syncShapeGoalConsistency();
}

function syncLongRunDayLabel(discipline = disciplineSelect?.value) {
  if (!longRunDayLabelEl) return;
  if (discipline === "triathlon") {
    longRunDayLabelEl.textContent = currentLang === "de" ? "Long Session Day (optional)" : currentLang === "ja" ? "ロングセッション日（任意）" : "Long session day (optional)";
  } else {
    longRunDayLabelEl.textContent = currentLang === "de" ? "Long Run Day (optional)" : currentLang === "ja" ? "ロングラン日（任意）" : "Long run day (optional)";
  }
  if (longRunDaySelectEl) {
    const selected = longRunDaySelectEl.value || "sunday";
    const opts = [
      ["none", currentLang === "de" ? "Kein fixer Tag" : currentLang === "ja" ? "固定なし" : "No fixed day"],
      ["saturday", currentLang === "de" ? "Samstag" : currentLang === "ja" ? "土曜" : "Saturday"],
      ["sunday", currentLang === "de" ? "Sonntag" : currentLang === "ja" ? "日曜" : "Sunday"],
      ["wednesday", currentLang === "de" ? "Mittwoch" : currentLang === "ja" ? "水曜" : "Wednesday"],
      ["friday", currentLang === "de" ? "Freitag" : currentLang === "ja" ? "金曜" : "Friday"],
    ];
    longRunDaySelectEl.innerHTML = opts.map(([v, l]) => `<option value="${v}">${l}</option>`).join("");
    longRunDaySelectEl.value = opts.some(([v]) => v === selected) ? selected : "sunday";
  }
}

function setFieldEnabled(fieldEl, enabled) {
  if (!fieldEl) return;
  [...fieldEl.querySelectorAll("input, select, textarea")].forEach((node) => {
    node.disabled = !enabled;
  });
}

function syncDisciplineSpecificPlaceholders(discipline = disciplineSelect?.value) {
  if (!constraintsInputEl) return;
  const placeholderByDiscipline = {
    running: currentLang === "de" ? "z. B. Long Run nur Sonntag" : currentLang === "ja" ? "例: ロング走は日曜のみ" : "e.g. long run Sunday only",
    triathlon: currentLang === "de" ? "z. B. Swim nur Di/Do, Long Ride Sa" : currentLang === "ja" ? "例: スイムは火木のみ、ロングライド土曜" : "e.g. swim Tue/Thu only, long ride Sat",
    cycling: currentLang === "de" ? "z. B. lange Ausfahrt nur Sonntag" : currentLang === "ja" ? "例: ロングライドは日曜のみ" : "e.g. long ride Sunday only",
    hyrox: currentLang === "de" ? "z. B. keine Box, nur Home/Gym" : currentLang === "ja" ? "例: ボックスなし、自宅/ジムのみ" : "e.g. no box, home/gym only",
    shape: currentLang === "de" ? "z. B. Knie sensibel, nur 30 min werktags" : currentLang === "ja" ? "例: 膝に配慮、平日は30分まで" : "e.g. sensitive knees, 30 min on weekdays",
  };
  constraintsInputEl.placeholder = placeholderByDiscipline[discipline] || placeholderByDiscipline.running;
}

function syncShapeTargetFocusOptions(discipline, goalFormat) {
  if (!shapeTargetFocusSelectEl) return;
  if (disciplineTargetFocusLabelEl) {
    disciplineTargetFocusLabelEl.textContent =
      currentLang === "de"
        ? "Plan-Fokus"
        : currentLang === "ja"
          ? "プランフォーカス"
          : "Plan focus";
  }

  if (discipline === "running") {
    const opts = [
      { value: "pb", label: currentLang === "de" ? "PB / schneller werden" : currentLang === "ja" ? "PB・スピード" : "PB / get faster" },
      { value: "consistent", label: currentLang === "de" ? "Konstanz / fitter werden" : currentLang === "ja" ? "継続・体力アップ" : "Consistency / get fitter" },
      { value: "maintain", label: currentLang === "de" ? "Maintain / Form halten" : currentLang === "ja" ? "維持" : "Maintain / hold form" },
    ];
    const prev = shapeTargetFocusSelectEl.value;
    shapeTargetFocusSelectEl.innerHTML = opts.map((o) => `<option value="${o.value}">${o.label}</option>`).join("");
    shapeTargetFocusSelectEl.value = opts.some((o) => o.value === prev) ? prev : "pb";
    return;
  }

  if (discipline === "triathlon") {
    const opts = [
      { value: "balanced", label: currentLang === "de" ? "Ausgeglichen" : currentLang === "ja" ? "バランス" : "Balanced" },
      { value: "swim", label: currentLang === "de" ? "Swim-Fokus" : currentLang === "ja" ? "スイム重視" : "Swim focus" },
      { value: "bike", label: currentLang === "de" ? "Bike-Fokus" : currentLang === "ja" ? "バイク重視" : "Bike focus" },
      { value: "run", label: currentLang === "de" ? "Run-Fokus" : currentLang === "ja" ? "ラン重視" : "Run focus" },
    ];
    const prev = shapeTargetFocusSelectEl.value;
    shapeTargetFocusSelectEl.innerHTML = opts.map((o) => `<option value="${o.value}">${o.label}</option>`).join("");
    shapeTargetFocusSelectEl.value = opts.some((o) => o.value === prev) ? prev : "balanced";
    return;
  }

  if (discipline === "hyrox") {
    const opts = [
      { value: "finish", label: currentLang === "de" ? "Finish / sauber durchkommen" : currentLang === "ja" ? "完走重視" : "Finish / complete well" },
      { value: "competitive", label: currentLang === "de" ? "Competitive / Pace pushen" : currentLang === "ja" ? "競技志向" : "Competitive / push pace" },
      { value: "engine", label: currentLang === "de" ? "Engine + Work Capacity" : currentLang === "ja" ? "持久力・作業能力" : "Engine + work capacity" },
    ];
    const prev = shapeTargetFocusSelectEl.value;
    shapeTargetFocusSelectEl.innerHTML = opts.map((o) => `<option value="${o.value}">${o.label}</option>`).join("");
    shapeTargetFocusSelectEl.value = opts.some((o) => o.value === prev) ? prev : "finish";
    return;
  }

  if (discipline !== "shape") return;
  const optionsByGoal = {
    fatloss: [
      { value: "weight", label: currentLang === "de" ? "Gewicht reduzieren" : currentLang === "ja" ? "減量" : "Weight loss" },
      { value: "fit", label: currentLang === "de" ? "Fitter / alltagstauglicher" : currentLang === "ja" ? "体力・日常動作" : "Get fitter / daily energy" },
      { value: "health", label: currentLang === "de" ? "Gesünder + konstant" : currentLang === "ja" ? "健康・継続" : "Health + consistency" },
    ],
    recomp: [
      { value: "bodycomp", label: currentLang === "de" ? "Fett runter / Muskeln halten" : currentLang === "ja" ? "脂肪減・筋維持" : "Fat down / hold muscle" },
      { value: "strength", label: currentLang === "de" ? "Kräftiger + fitter werden" : currentLang === "ja" ? "筋力+体力" : "Stronger + fitter" },
      { value: "routine", label: currentLang === "de" ? "Routine aufbauen" : currentLang === "ja" ? "習慣化" : "Build routine" },
    ],
    build: [
      { value: "strength", label: currentLang === "de" ? "Kraft-/Muskelaufbau" : currentLang === "ja" ? "筋力・筋量アップ" : "Strength / muscle gain" },
      { value: "performance", label: currentLang === "de" ? "Leistung im Gym steigern" : currentLang === "ja" ? "ジムパフォーマンス向上" : "Gym performance" },
      { value: "weight", label: currentLang === "de" ? "Gewicht kontrolliert erhöhen" : currentLang === "ja" ? "体重を計画的に増やす" : "Controlled weight gain" },
    ],
    fitness: [
      { value: "fitness", label: currentLang === "de" ? "Allgemein fitter werden" : currentLang === "ja" ? "全体的にフィット" : "General fitness" },
      { value: "conditioning", label: currentLang === "de" ? "Ausdauer / Kondition" : currentLang === "ja" ? "持久力・コンディショニング" : "Conditioning / stamina" },
      { value: "routine", label: currentLang === "de" ? "Routine & Konstanz" : currentLang === "ja" ? "継続・習慣化" : "Routine & consistency" },
    ],
  };
  const opts = optionsByGoal[goalFormat] || optionsByGoal.fitness;
  const prev = shapeTargetFocusSelectEl.value;
  shapeTargetFocusSelectEl.innerHTML = opts.map((o) => `<option value="${o.value}">${o.label}</option>`).join("");
  shapeTargetFocusSelectEl.value = opts.some((o) => o.value === prev) ? prev : opts[0].value;
}

function estimateShapeGoalWindow(profileLike) {
  const weight = Number(profileLike?.weightKg) || null;
  const targetWeight = Number(profileLike?.targetWeightKg) || null;
  const raceDateValue = profileLike?.raceDate instanceof Date ? profileLike.raceDate : profileLike?.raceDate ? new Date(profileLike.raceDate) : null;
  if (!weight || !targetWeight || !raceDateValue || Number.isNaN(raceDateValue.getTime())) return null;
  const today = startOfDay(new Date());
  const targetDate = startOfDay(raceDateValue);
  const weeks = Math.max(1, Math.ceil((targetDate - today) / 86400000 / 7));
  const delta = targetWeight - weight;
  const kgPerWeek = delta / weeks;
  const maxCutPerWeek = 0.9; // ambitious but usually still in a realistic range
  const preferredCutPerWeek = 0.5;
  const maxGainPerWeek = 0.35;
  const preferredGainPerWeek = 0.2;

  let status = "ok";
  let message = "";
  let suggestedDate = null;
  let reachableWeight = null;

  if (delta < 0) {
    const needAbs = Math.abs(kgPerWeek);
    if (needAbs > maxCutPerWeek) {
      status = "error";
      const requiredWeeks = Math.ceil(Math.abs(delta) / preferredCutPerWeek);
      suggestedDate = addDays(today, requiredWeeks * 7);
      reachableWeight = round1(weight - preferredCutPerWeek * weeks);
      message = `Zu aggressiv: ${Math.abs(delta).toFixed(1)} kg in ${weeks} Wochen (~${needAbs.toFixed(2)} kg/Woche). Realistischer: ~${preferredCutPerWeek.toFixed(1)} kg/Woche.`;
    } else if (needAbs > preferredCutPerWeek) {
      status = "warning";
      reachableWeight = round1(weight - preferredCutPerWeek * weeks);
      message = `Ambitioniert: ~${needAbs.toFixed(2)} kg/Woche. Solider Bereich liegt oft bei ~0.25-0.75 kg/Woche.`;
    } else {
      message = `Plausibel: ~${needAbs.toFixed(2)} kg/Woche.`;
    }
  } else if (delta > 0) {
    const needGain = kgPerWeek;
    if (needGain > maxGainPerWeek) {
      status = "warning";
      const requiredWeeks = Math.ceil(Math.abs(delta) / preferredGainPerWeek);
      suggestedDate = addDays(today, requiredWeeks * 7);
      reachableWeight = round1(weight + preferredGainPerWeek * weeks);
      message = `Schneller Aufbau: ~${needGain.toFixed(2)} kg/Woche. Nachhaltiger ist oft langsamer (ca. ${preferredGainPerWeek.toFixed(1)} kg/Woche).`;
    } else {
      message = `Plausibel: ~${needGain.toFixed(2)} kg/Woche Aufbau.`;
    }
  } else {
    message = "Start- und Zielgewicht sind identisch. Fokus auf Recomp/Fitness/Leistung sinnvoll.";
  }

  return { weeks, delta, kgPerWeek, status, message, suggestedDate, reachableWeight, weight, targetWeight };
}

function syncShapeGoalConsistency() {
  const isShape = disciplineSelect?.value === "shape";
  if (!isShape) {
    if (form?.elements?.targetWeightKg) form.elements.targetWeightKg.setCustomValidity("");
    if (shapeGoalGuidanceEl) {
      shapeGoalGuidanceEl.textContent = currentLang === "de" ? "Gib Startgewicht, Zielgewicht und Zieldatum an." : "Add start weight, target weight and target date.";
      shapeGoalGuidanceEl.classList.remove("is-warning", "is-error");
    }
    return;
  }

  const weight = Number(form?.elements?.weightKg?.value) || null;
  const targetWeight = Number(form?.elements?.targetWeightKg?.value) || null;
  const raceDateRaw = String(form?.elements?.raceDate?.value || "").trim();
  const shapeGoal = String(goalDistanceSelect?.value || "");
  const focus = String(shapeTargetFocusSelectEl?.value || "");

  if (goalTimeInputEl) {
    if (focus === "weight" && weight && targetWeight) {
      const delta = targetWeight - weight;
      goalTimeInputEl.value = `${delta > 0 ? "+" : ""}${round1(delta)} kg`;
    } else if (shapeGoal === "fatloss" && (!goalTimeInputEl.value || /kg$|Recomp|Stronger/.test(goalTimeInputEl.value))) {
      goalTimeInputEl.value = "-4 kg";
    } else if (shapeGoal === "build" && (!goalTimeInputEl.value || /kg$|Recomp|Stronger/.test(goalTimeInputEl.value))) {
      goalTimeInputEl.value = "+2 kg";
    } else if (shapeGoal === "recomp" && (!goalTimeInputEl.value || /kg$|Stronger/.test(goalTimeInputEl.value))) {
      goalTimeInputEl.value = "Body comp";
    } else if (shapeGoal === "fitness" && (!goalTimeInputEl.value || /kg$|Recomp|Body comp/.test(goalTimeInputEl.value))) {
      goalTimeInputEl.value = "conditioning";
    }
  }

  if (!shapeGoalGuidanceEl) return;
  shapeGoalGuidanceEl.classList.remove("is-warning", "is-error");
  if (!weight || !targetWeight || !raceDateRaw) {
    shapeGoalGuidanceEl.textContent = currentLang === "de"
      ? "Für konsistente Shape-Ziele: Startgewicht, Zielgewicht und Zieldatum angeben."
      : "For consistent shape goals, add start weight, target weight and target date.";
    return;
  }

  const check = estimateShapeGoalWindow({ weightKg: weight, targetWeightKg: targetWeight, raceDate: new Date(`${raceDateRaw}T09:00:00`) });
  if (!check) return;

  let line = check.message;
  if (check.suggestedDate) {
    line += currentLang === "de"
      ? ` Vorschlag Zieldatum: ${formatDateShort(check.suggestedDate)}.`
      : ` Suggested target date: ${formatDateShort(check.suggestedDate)}.`;
  } else if (check.reachableWeight != null && check.status !== "ok") {
    line += currentLang === "de"
      ? ` Bis dahin realistischer eher ~${check.reachableWeight.toFixed(1)} kg.`
      : ` By then, a more realistic target is ~${check.reachableWeight.toFixed(1)} kg.`;
  }
  shapeGoalGuidanceEl.textContent = line;
  if (check.status === "warning" || check.status === "error") shapeGoalGuidanceEl.classList.add("is-warning");

  if (form?.elements?.targetWeightKg) {
    form.elements.targetWeightKg.setCustomValidity("");
  }
}

function checkGoalRealismBeforePlan(profile) {
  if (profile.discipline === "shape") {
    const shapeWindow = estimateShapeGoalWindow(profile);
    if (shapeWindow?.status === "error") {
      const suggestionText = [
        shapeWindow.suggestedDate ? `Zieldatum: ${formatDateShort(shapeWindow.suggestedDate)}` : null,
        shapeWindow.reachableWeight != null ? `oder Zielgewicht bis dahin ~${shapeWindow.reachableWeight.toFixed(1)} kg` : null,
      ].filter(Boolean).join(" • ");
      return {
        block: true,
        message: shapeWindow.message,
        suggestionText,
        applySuggestion: () => {
          if (shapeWindow.suggestedDate && form?.elements?.raceDate) {
            form.elements.raceDate.value = formatDateInput(shapeWindow.suggestedDate);
          }
          if (shapeWindow.reachableWeight != null && form?.elements?.targetWeightKg) {
            form.elements.targetWeightKg.value = String(shapeWindow.reachableWeight.toFixed(1));
          }
        },
      };
    }
    return { block: false };
  }

  const feasibility = assessGoalFeasibility(profile);
  if (feasibility.level !== "unrealistic") return { block: false };

  const suggestedWeeksByDiscipline =
    profile.discipline === "triathlon"
      ? (profile.goalDistance === "ironman" ? 24 : profile.goalDistance === "703" ? 14 : 10)
      : profile.discipline === "running"
        ? (profile.goalDistance === "marathon" ? 16 : 10)
        : profile.discipline === "hyrox"
          ? 8
          : profile.discipline === "cycling"
            ? 10
            : 12;
  const today = startOfDay(new Date());
  const suggestedDate = addDays(today, suggestedWeeksByDiscipline * 7);
  return {
    block: true,
    message: feasibility.message,
    suggestionText: `Vorschlag Zieldatum: ${formatDateShort(suggestedDate)} (mehr Aufbauzeit).`,
    applySuggestion: () => {
      if (form?.elements?.raceDate) form.elements.raceDate.value = formatDateInput(suggestedDate);
    },
  };
}

function syncShapeGymShareLabel() {
  if (!shapeGymShareInputEl || !shapeGymShareValueEl) return;
  syncDisciplineShareControl(disciplineSelect?.value);
  shapeGymShareValueEl.classList.add("is-visible");
  if (shareHintHideTimer) window.clearTimeout(shareHintHideTimer);
  shareHintHideTimer = window.setTimeout(() => {
    shapeGymShareValueEl?.classList.remove("is-visible");
  }, 1400);
}

function syncDisciplineShareControl(discipline = disciplineSelect?.value) {
  if (!shapeGymShareInputEl || !shapeGymShareValueEl || !disciplineShareLabelEl) return;
  const value = clamp(Number(shapeGymShareInputEl.value) || 0, 0, 100);
  const complement = 100 - value;

  if (discipline === "shape") {
    disciplineShareLabelEl.textContent = currentLang === "de" ? "Gym-Anteil" : currentLang === "ja" ? "ジム比率" : "Gym share";
    shapeGymShareValueEl.textContent =
      currentLang === "de"
        ? `${value}% Gym / ${complement}% Outdoor-Home`
        : currentLang === "ja"
          ? `${value}% Gym / ${complement}% Outdoor-Home`
          : `${value}% Gym / ${complement}% Outdoor-Home`;
    return;
  }

  if (discipline === "triathlon" || discipline === "cycling") {
    const outdoorDay = String(bikeOutdoorDaySelectEl?.value || "none");
    disciplineShareLabelEl.textContent = currentLang === "de" ? "Rolle-Anteil Bike" : currentLang === "ja" ? "バイク室内比率" : "Bike trainer share";
    const suffix =
      outdoorDay === "never"
        ? (currentLang === "de" ? " • nur Rolle" : currentLang === "ja" ? " • 室内のみ" : " • trainer only")
        : outdoorDay === "none"
          ? ""
          : currentLang === "de"
            ? ` • Outdoor bevorzugt: ${bikeOutdoorDayLabel(outdoorDay)}`
            : currentLang === "ja"
              ? ` • 屋外優先: ${bikeOutdoorDayLabel(outdoorDay)}`
              : ` • outdoor preferred: ${bikeOutdoorDayLabel(outdoorDay)}`;
    shapeGymShareValueEl.textContent =
      currentLang === "de"
        ? `${value}% Rolle / ${complement}% draußen${suffix}`
        : currentLang === "ja"
          ? `${value}% 室内 / ${complement}% 屋外${suffix}`
          : `${value}% trainer / ${complement}% outdoor${suffix}`;
    if (bikeOutdoorDayLabelEl) {
      bikeOutdoorDayLabelEl.textContent = currentLang === "de" ? "Outdoor-Tag (optional)" : currentLang === "ja" ? "屋外ライド日（任意）" : "Outdoor ride day (optional)";
    }
    return;
  }

  if (discipline === "hyrox") {
    disciplineShareLabelEl.textContent = currentLang === "de" ? "Box-/Gym-Anteil" : currentLang === "ja" ? "ボックス/ジム比率" : "Box / gym share";
    shapeGymShareValueEl.textContent =
      currentLang === "de"
        ? `${value}% Box/Gym / ${complement}% No-Box (Home/Outdoor)`
        : currentLang === "ja"
          ? `${value}% ボックス/ジム / ${complement}% ノーボックス（自宅/屋外）`
          : `${value}% box/gym / ${complement}% no-box (home/outdoor)`;
    return;
  }

  disciplineShareLabelEl.textContent = currentLang === "de" ? "Anteil" : currentLang === "ja" ? "比率" : "Share";
  shapeGymShareValueEl.textContent = `${value}% / ${complement}%`;
}

function bikeOutdoorDayLabel(value) {
  const labels = {
    none: currentLang === "de" ? "kein fixer Tag" : currentLang === "ja" ? "固定なし" : "no fixed day",
    never: currentLang === "de" ? "nie" : currentLang === "ja" ? "なし" : "never",
    saturday: currentLang === "de" ? "Samstag" : currentLang === "ja" ? "土曜" : "Saturday",
    sunday: currentLang === "de" ? "Sonntag" : currentLang === "ja" ? "日曜" : "Sunday",
    wednesday: currentLang === "de" ? "Mittwoch" : currentLang === "ja" ? "水曜" : "Wednesday",
    friday: currentLang === "de" ? "Freitag" : currentLang === "ja" ? "金曜" : "Friday",
  };
  return labels[value] || value;
}

function applyHeroImagesForDiscipline(discipline) {
  if (!heroPhotoCards.length) return;
  const set = HERO_IMAGE_SETS[discipline] || HERO_IMAGE_SETS.triathlon;
  heroPhotoCards.forEach((card, index) => {
    const conf = set[index % set.length];
    if (!conf) return;
    card.style.setProperty("--photo", `url('${conf.url}')`);
    if (conf.pos) card.style.setProperty("--photo-pos", conf.pos);
    if (conf.size) card.style.setProperty("--photo-size", conf.size);
  });
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
  cycleDetailsGroup?.classList.toggle("is-disabled", !isFemale || !checkbox.checked);
  checkbox.disabled = !isFemale;
  if (!isFemale) checkbox.checked = false;
  const cycleDetailsEnabled = isFemale && checkbox.checked;
  cycleInputs.forEach((input) => {
    input.disabled = !cycleDetailsEnabled;
    if (!cycleDetailsEnabled) input.value = "";
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
        updateConnectionStateCopy();
      }
    });
  });
}

function getStravaLocalUserId(account = getCurrentAccount()) {
  if (!account) return "";
  return String(account.id || account.email || "").trim();
}

function buildStravaOAuthUrl(userId) {
  const base = `${STRAVA_OAUTH_DEV_BASE}/api/oauth/strava/start`;
  const url = new URL(base);
  url.searchParams.set("user_id", userId || "local-user");
  return url.toString();
}

function startStravaOAuthFlow() {
  const account = getCurrentAccount();
  if (!account) {
    openAccountModal("login");
    setText(accountFormStatusEl, "Bitte zuerst einloggen, um Strava zu verbinden.");
    return;
  }
  const userId = getStravaLocalUserId(account);
  setText(stravaProfileFetchStatusEl, "Öffne Strava OAuth …");
  window.location.href = buildStravaOAuthUrl(userId);
}

function updateConnectionStateCopy() {
  if (!connectionState) return;
  const account = getCurrentAccount();
  const stravaConnected = Boolean(account?.integrations?.strava?.connected);
  const activeSources = [...connectedSources];
  if (stravaConnected && !activeSources.includes("Strava")) activeSources.unshift("Strava");
  if (!activeSources.length) {
    connectionState.textContent = t("no_sources");
    return;
  }
  const suffix = stravaConnected ? " • Strava OAuth (dev)" : "";
  connectionState.textContent = `${t("connected_mock")}: ${activeSources.join(", ")}${suffix}`;
}

function maybeFetchStravaStatus(account = getCurrentAccount()) {
  if (!account) return;
  if (!activeProfileView || activeProfileView !== "overview") return;
  const userId = getStravaLocalUserId(account);
  const hasKnownConnection = Boolean(account?.integrations?.strava?.connected || connectedSources.has("Strava"));
  if (!hasKnownConnection) return;
  if (stravaFetchInFlight) return;
  fetchStravaStatusAndAthlete();
}

async function fetchStravaStatusAndAthlete({ force = false } = {}) {
  const account = getCurrentAccount();
  if (!account) {
    renderStravaProfileStatus(null);
    return;
  }
  ensureAccountIntegrationsShape(account);
  const userId = getStravaLocalUserId(account);
  if (!userId) return;
  if (stravaFetchInFlight) return;
  if (!force && stravaStatusFetchedForUserId === userId && account.integrations?.strava?.lastStatusAt) {
    renderStravaProfileStatus(account);
    return;
  }

  stravaFetchInFlight = true;
  setText(stravaProfileFetchStatusEl, "Strava Status wird geladen …");
  try {
    const statusRes = await fetch(`${STRAVA_OAUTH_DEV_BASE}/api/oauth/strava/status?user_id=${encodeURIComponent(userId)}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const statusJson = await statusRes.json().catch(() => ({}));

    if (!statusRes.ok || !statusJson?.connected) {
      account.integrations.strava = {
        ...account.integrations.strava,
        connected: false,
        userId,
        athlete: null,
        expires_at: null,
        scope: null,
        error: statusJson?.error || "Nicht verbunden",
        lastStatusAt: new Date().toISOString(),
      };
      connectedSources.delete("Strava");
      persistConnectedSourcesForCurrentUser();
      persistStore();
      stravaStatusFetchedForUserId = userId;
      renderStravaProfileStatus(account);
      updateConnectionStateCopy();
      setText(stravaProfileFetchStatusEl, "Keine Strava-Verbindung gefunden.");
      return;
    }

    let athlete = statusJson.athlete || null;
    if (!athlete) {
      const athleteRes = await fetch(`${STRAVA_OAUTH_DEV_BASE}/api/oauth/strava/athlete?user_id=${encodeURIComponent(userId)}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      const athleteJson = await athleteRes.json().catch(() => ({}));
      if (athleteRes.ok && athleteJson?.athlete) athlete = athleteJson.athlete;
    }

    account.integrations.strava = {
      ...account.integrations.strava,
      connected: true,
      userId,
      athlete,
      expires_at: statusJson.expires_at || null,
      scope: statusJson.scope || null,
      error: null,
      lastStatusAt: new Date().toISOString(),
    };
    connectedSources.add("Strava");
    persistConnectedSourcesForCurrentUser();
    persistStore();
    stravaStatusFetchedForUserId = userId;
    renderStravaProfileStatus(account);
    syncConnectorButtons();
    updateConnectionStateCopy();
    setText(stravaProfileFetchStatusEl, "Strava verbunden.");
  } catch (error) {
    setText(stravaProfileFetchStatusEl, `Strava-Backend nicht erreichbar (${STRAVA_OAUTH_DEV_BASE}).`);
    account.integrations.strava = {
      ...account.integrations.strava,
      error: String(error?.message || error),
      lastStatusAt: new Date().toISOString(),
    };
    persistStore();
    renderStravaProfileStatus(account);
  } finally {
    stravaFetchInFlight = false;
  }
}

function renderStravaProfileStatus(account) {
  if (!stravaProfileCardEl) return;
  const isAuth = Boolean(account);
  stravaProfileCardEl.classList.toggle("is-disabled", !isAuth);
  if (stravaProfileConnectBtn) stravaProfileConnectBtn.disabled = !isAuth;
  if (stravaProfileRefreshBtn) stravaProfileRefreshBtn.disabled = !isAuth || stravaFetchInFlight;
  if (!isAuth) {
    setText(stravaProfileStatusBadgeEl, "Login first");
    setText(stravaProfileStatusCopyEl, "Logge dich ein, um deinen lokalen Account mit Strava (Dev OAuth) zu verbinden.");
    if (stravaProfileAthleteMetaEl) {
      stravaProfileAthleteMetaEl.innerHTML = `<div class="empty-copy">Kein Account aktiv.</div>`;
    }
    return;
  }
  ensureAccountIntegrationsShape(account);
  const data = account.integrations.strava || {};
  const connected = Boolean(data.connected);
  setText(stravaProfileStatusBadgeEl, connected ? "Connected" : "Disconnected");
  setText(
    stravaProfileStatusCopyEl,
    connected
      ? `Strava ist mit diesem Profil verbunden${data.expires_at ? ` • Token läuft ${formatRelativeExpiry(data.expires_at)}` : ""}.`
      : (data.error ? `Nicht verbunden • ${data.error}` : "Noch keine Strava-Verbindung erkannt.")
  );
  if (!stravaProfileAthleteMetaEl) return;
  if (!connected || !data.athlete) {
    stravaProfileAthleteMetaEl.innerHTML = `<div class="empty-copy">Nach erfolgreichem OAuth erscheinen hier Athlete-Infos.</div>`;
    return;
  }
  const athlete = data.athlete || {};
  const name = [athlete.firstname, athlete.lastname].filter(Boolean).join(" ").trim() || athlete.username || "Strava Athlete";
  const city = [athlete.city, athlete.state, athlete.country].filter(Boolean).join(", ");
  stravaProfileAthleteMetaEl.innerHTML = `
    <div class="connector-athlete-row">
      ${athlete.profile_medium || athlete.profile ? `<img src="${escapeHtml(String(athlete.profile_medium || athlete.profile))}" alt="" class="connector-athlete-avatar" />` : `<div class="connector-athlete-avatar fallback">${escapeHtml(name.slice(0,1).toUpperCase())}</div>`}
      <div class="connector-athlete-copy">
        <strong>${escapeHtml(name)}</strong>
        <small>${escapeHtml(city || athlete.username || "Strava")}</small>
        <small>${escapeHtml(data.scope || "scope n/a")}</small>
      </div>
    </div>`;
}

function formatRelativeExpiry(expiresAtUnix) {
  const sec = Number(expiresAtUnix || 0);
  if (!Number.isFinite(sec) || sec <= 0) return "bald ab";
  const diff = sec - Math.floor(Date.now() / 1000);
  if (diff <= 0) return "abgelaufen";
  const hours = Math.round(diff / 3600);
  if (hours < 24) return `in ${hours}h ab`;
  const days = Math.round(hours / 24);
  return `in ${days}d ab`;
}

function handleOAuthReturnParams() {
  try {
    const url = new URL(window.location.href);
    const oauth = url.searchParams.get("oauth");
    const status = url.searchParams.get("status");
    if (oauth !== "strava" || !status) return;
    if (status === "connected") {
      connectedSources.add("Strava");
      persistConnectedSourcesForCurrentUser();
      updateConnectionStateCopy();
      setText(stravaProfileFetchStatusEl, "Strava OAuth abgeschlossen. Lade Athlete-Daten …");
      fetchStravaStatusAndAthlete({ force: true });
    }
    url.searchParams.delete("oauth");
    url.searchParams.delete("status");
    url.searchParams.delete("user_id");
    window.history.replaceState({}, document.title, url.toString());
  } catch {
    // noop
  }
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    el.setAttribute("placeholder", t(key));
  });
  setText(sessionLabelPurposeEl, t("purpose"));
  setText(sessionLabelAdaptationEl, t("adaptation"));
  setText(sessionLabelPhysiologyEl, t("physiology"));
  setText(sessionLabelWhyEl, t("why"));
  setText(
    sessionLabelNutritionFocusEl,
    currentLang === "de" ? "Ernährungsfokus" : currentLang === "ja" ? "栄養フォーカス" : "Nutrition focus"
  );
  setText(sessionLabelKcalEl, currentLang === "de" ? "Tageskalorien" : currentLang === "ja" ? "推奨カロリー" : "Daily calories");
  const cycleLabel = currentLang === "de" ? "Zyklus-Hinweis" : currentLang === "ja" ? "周期メモ" : "Cycle note";
  const cycleLabelEl = document.getElementById("session-label-cycle");
  if (cycleLabelEl) cycleLabelEl.textContent = cycleLabel;
  if (accountLogoutBtn) accountLogoutBtn.textContent = currentLang === "ja" ? "ログアウト" : currentLang === "en" ? "Logout" : "Logout";
  syncDisciplineSpecificFields(disciplineSelect?.value);
  syncShapeGymShareLabel();
}

function t(key) {
  return I18N[currentLang]?.[key] || I18N.de[key] || key;
}

function formatSocialSportLabel(sportType) {
  const value = String(sportType || "other").toLowerCase();
  const labels = {
    run: currentLang === "ja" ? "RUN" : "RUN",
    bike: currentLang === "ja" ? "BIKE" : "BIKE",
    swim: currentLang === "ja" ? "SWIM" : "SWIM",
    hyrox: "HYROX",
    other: currentLang === "ja" ? "OTHER" : "OTHER",
  };
  return labels[value] || String(sportType || "OTHER").toUpperCase();
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
    hyrox: {
      open: "01:25:00",
      pro: "01:18:00",
      doubles: "01:05:00",
      doublespro: "00:59:00",
      relay: "00:58:00",
    },
    shape: {
      fatloss: "-4 kg",
      recomp: "Recomp",
      build: "+2 kg",
      fitness: "Stronger / fitter",
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
  setText(sessionModalNutritionFocusEl, buildSessionNutritionGuidance(session, latestProfile, nutrition));
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
  const heightRaw = String(data.get("heightCm") || "").trim();
  const targetWeightRaw = String(data.get("targetWeightKg") || "").trim();
  const cycleDayRaw = String(data.get("cycleDay") || "").trim();
  const cycleLengthRaw = String(data.get("cycleLengthDays") || "").trim();
  const weeklyHoursRequested = Number(data.get("weeklyHours"));
  return {
    discipline: data.get("discipline"),
    fitnessLevel: data.get("fitnessLevel"),
    experience: data.get("experience"),
    weeklyHours: weeklyHoursRequested,
    weeklyHoursRequested,
    goalDistance: data.get("goalDistance"),
    goalTime: String(data.get("goalTime") || "").trim(),
    raceDate,
    constraints: String(data.get("constraints") || "").trim(),
    sex: sex || null,
    age: ageRaw ? Number(ageRaw) : null,
    weightKg: weightRaw ? Number(weightRaw) : null,
    heightCm: heightRaw ? Number(heightRaw) : null,
    targetWeightKg: targetWeightRaw ? Number(targetWeightRaw) : null,
    shapeTargetFocus: String(data.get("shapeTargetFocus") || "").trim() || null,
    gymShare: clamp(Number(data.get("gymShare")) || 0, 0, 100),
    bikeIndoorShare: clamp(Number(data.get("gymShare")) || 0, 0, 100),
    bikeOutdoorDay: String(data.get("bikeOutdoorDay") || "").trim() || "none",
    longRunDay: String(data.get("longRunDay") || "").trim() || "none",
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
  profile.weeklyHoursRecommended = recommendWeeklyHoursBand(profile);
  profile.planningWeeklyHours = effectivePlanningHours(profile);
  profile.capacity = computeAthleteCapacity(profile);
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
    const waveStep = weekIndex % 4;
    const progressiveWave = isDeload
      ? 0.78
      : waveStep === 0
        ? 0.96 + weekIndex * 0.012
        : waveStep === 1
          ? 1.02 + weekIndex * 0.014
          : waveStep === 2
            ? 1.08 + weekIndex * 0.017
            : 0.9 + weekIndex * 0.01;
    const baseLoadFactor = isTaper ? (weekIndex === weeks - 1 ? 0.44 : 0.68) : progressiveWave;
    const introWeeks = profile.capacity?.introWeeks || 0;
    const introScale = weekIndex < introWeeks ? (weekIndex === 0 ? 0.72 : 0.86) : 1;
    const lowCapScale = !isTaper && profile.capacity?.tier === "low" ? 0.9 : 1;
    const loadFactor = baseLoadFactor * introScale * lowCapScale;
    const weekKm = Math.round(weeklyKmBase * loadFactor);
    const qualityLabel = profile.fitnessLevel === "starter" ? "Controlled Threshold" : "Threshold Session";
    const weekFocus = weekIndex < (profile.capacity?.introWeeks || 0)
      ? "Onboarding / Technik & Belastungsverträglichkeit"
      : isTaper
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

    const baselineHours = Number(profile.planningWeeklyHours || estimateHoursFromKm(profile, weeklyKmBase) || 0);
    const periodizedWeekHours = round1(clamp(baselineHours * loadFactor, Math.max(1.5, baselineHours * 0.32), Math.max(2, baselineHours * 1.35)));

    weekModels.push({
      weekNumber: weekIndex + 1,
      start: currentWeekStart,
      end: addDays(currentWeekStart, 6),
      focus: weekFocus,
      loadKm: weekKm,
      loadHours: periodizedWeekHours,
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

  if (profile.discipline === "hyrox") {
    return createHyroxWeekSessions({
      profile,
      weekIndex,
      weekKm,
      isDeload,
      isTaper,
      currentWeekStart,
      raceDate,
    });
  }

  if (profile.discipline === "shape") {
    return createShapeWeekSessions({
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
  const doubleThreshold = profile.fitnessLevel === "advanced" && (profile.planningWeeklyHours || profile.weeklyHours) >= 10 && !isTaper;
  const raceWeek = sameWeek(currentWeekStart, raceDate);
  const isIntro = weekIndex < (profile.capacity?.introWeeks || 0);
  const beginner = profile.fitnessLevel === "starter" || profile.experience === "lt1" || profile.capacity?.tier === "low";
  const runGoalCaps = {
    "5k": 12,
    "10k": 16,
    half: 22,
    marathon: 30,
  };
  const longRunCap = beginner
    ? (runGoalCaps[profile.goalDistance] || 16)
    : (runGoalCaps[profile.goalDistance] ? runGoalCaps[profile.goalDistance] + 4 : 22);
  const introLongRunCap = beginner ? Math.max(8, longRunCap - 4) : longRunCap;
  const longRunKmAdj = clamp(longRunKm, beginner ? 8 : 10, isIntro ? introLongRunCap : longRunCap);
  const recoveryKmAdj = clamp(recoveryKm, beginner ? 3 : 4, beginner ? 8 : 10);
  const easyKmAdj = clamp(easyKm, beginner ? 4 : 5, beginner ? 10 : 14);

  const days = [
    { type: "recovery", title: "Recovery Run", details: `${recoveryKmAdj} km locker + Mobility`, duration: `${40 + Math.round(recoveryKmAdj * 4)} min` },
    {
      type: "threshold",
      title: qualityLabel,
      details: isIntro ? "3-4x5' kontrolliert zügig, lange lockere Pausen" : (doubleThreshold ? "AM: 5x6' / PM: 10x1k (kontrolliert)" : "6x1 km @ Schwelle, lockere Pausen"),
      duration: doubleThreshold ? "2x 55 min" : "70 min",
    },
    { type: "rest", title: "Regeneration", details: "Optional Walk / Mobility / Schlaf-Fokus", duration: "20-30 min optional" },
    {
      type: "quality",
      title: "VO2 / Speed Support",
      details: isIntro ? "Lauftechnik + kurze Steigerungen / Walk-Run optional" : (isDeload ? "Kurze Bergläufe + Technik" : "12x400m kontrolliert schnell, nicht all-out"),
      duration: isIntro ? "40-50 min" : isDeload ? "50 min" : "65 min",
    },
    { type: "recovery", title: "Easy Aerobic", details: `${easyKmAdj} km locker, nasal / low HR`, duration: `${40 + easyKmAdj * 4} min` },
    { type: "longrun", title: "Long Run", details: isIntro ? `${Math.max(6, Math.round(longRunKmAdj * 0.7))} km locker (gleichmäßig, ruhig)` : `${longRunKmAdj} km ${beginner ? "locker-stetig" : "progressiv (letztes Drittel steady)"}`, duration: isIntro ? "45-70 min" : `${70 + longRunKmAdj * 4} min` },
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

  placePreferredLongSessionDay(days, profile.longRunDay, "running");

  return days;
}

function createShapeWeekSessions({ profile, weekIndex, weekKm, isDeload, isTaper, currentWeekStart, raceDate }) {
  const raceWeek = sameWeek(currentWeekStart, raceDate);
  const cap = profile.capacity || computeAthleteCapacity(profile);
  const isIntro = weekIndex < (cap.introWeeks || 0);
  const lowCap = cap.tier === "low";
  const gymShare = clamp(Number(profile.gymShare) || 0, 0, 100);
  const gymHeavy = gymShare >= 60;
  const noGym = gymShare <= 20;
  const level = profile.fitnessLevel || "starter";
  const runKm = Math.round(clamp(weekKm * 0.42, 6, 28));
  const cardioMinutes = Math.round(clamp((Number(profile.planningWeeklyHours || profile.weeklyHours) || 5) * 60 * 0.35, 60, 240));
  const strengthDensity = level === "advanced" ? "hoch" : level === "intermediate" ? "moderat" : "kontrolliert";
  const goalType = profile.goalDistance;
  const isCut = goalType === "fatloss";
  const isRecomp = goalType === "recomp";
  const isBuild = goalType === "build";
  const isGeneral = goalType === "fitness";
  const goalBias =
    isCut
      ? "mehr Zone-2 + zügige Zirkel"
      : isBuild
        ? "mehr Kraftblöcke + längere Satzpausen"
        : isRecomp
          ? "Kraft + Cardio balanciert"
          : "allgemeine Fitness / Konstanz";

  const strengthMain = gymHeavy
    ? "DB/KB Squat, Hinge, Row, Press, Loaded Carries"
    : noGym
      ? (lowCap ? "Chair Squats, Incline Push-ups, Glute Bridge, Supported Rows (Band/Towel), Core" : "Push-ups, Split Squats, Glute Bridge, Rows (Band/Towel), Core")
      : "Mix aus Bodyweight + DB/KB + Carries";
  const metabolicTools = gymHeavy ? "BikeErg/Rower/Treadmill möglich" : "Run, Step-ups, (low impact) Cardio";

  const longCardioMin = isCut ? [55, 95] : isGeneral ? [45, 80] : isRecomp ? [40, 75] : [35, 65];
  const days = [
    { type: "recovery", title: "Mobility + Easy Cardio", details: `${Math.max(20, Math.round(cardioMinutes * (isIntro || lowCap ? 0.2 : 0.25)))} min easy walk/jog/bike + Mobility`, duration: "35-55 min" },
    {
      type: "quality",
      title: "Strength Foundation",
      details: `${strengthMain} (${isIntro || lowCap ? "basic" : strengthDensity}) • Fokus Technik, saubere Wiederholungen • ${goalBias}`,
      duration: isIntro ? "35-50 min" : isDeload ? "45-60 min" : "55-75 min",
    },
    {
      type: "threshold",
      title: "Cardio Intervals",
      details: isIntro || lowCap
        ? "Intervall-Einstieg: 6-10x1' zügiges Gehen / easy jog + 2' locker (low impact möglich)"
        : isBuild
          ? "6-8x2' zügig / 2' locker (nicht maximal)"
          : isCut
            ? "4-8x3' zügig / 2' locker + zusätzlich 15-20 min Zone 2"
            : "4-6x4' kontrolliert hart / 2' locker (Run oder Bike)",
      duration: isIntro ? "30-45 min" : isTaper ? "35-45 min" : "45-60 min",
    },
    {
      type: "quality",
      title: isBuild ? "Strength Circuit / Hypertrophy Support" : "Functional Circuit (Home/Outdoor Friendly)",
      details: isIntro || lowCap
        ? `2-4 Runden (low impact): Chair/Box Squats, Step-ups, Incline Push-ups, Glute Bridge, Carry/March, Plank • ${metabolicTools}`
        : isBuild
          ? "3-5 Runden: Squat/Hinge/Press/Row/Carry mit mehr Last, weniger Sprunganteil, saubere Satzqualität"
          : isCut
            ? "4-7 Runden: Step-ups/Burpees/Lunges/Push-ups/Carry + kurze Cardio-Blöcke (dichte Arbeit)"
            : "3-6 Runden: Burpees, Squat Jumps/Step-ups, Lunges, Push-ups, Carry/Plank, kurze Run-Abschnitte",
      duration: isIntro ? "30-45 min" : isBuild ? "50-75 min" : isDeload ? "35-50 min" : "45-70 min",
    },
    { type: "rest", title: "Recovery / Walk", details: "Schlaf, Schritte, Mobility, optional 20-30 min easy", duration: "Optional" },
    {
      type: "longrun",
      title: "Long Cardio / Outdoor Session",
      details: isIntro || lowCap
        ? `${Math.max(30, Math.round(cardioMinutes * 0.35))}-${Math.max(45, Math.round(cardioMinutes * 0.5))} min steady (Walk / Walk-Run / Bike) • low impact`
        : `${Math.max(longCardioMin[0], Math.round(cardioMinutes * 0.45))}-${Math.max(longCardioMin[1], Math.round(cardioMinutes * 0.65))} min steady (${Math.max(4, Math.round(runKm * 0.55))}-${Math.max(6, Math.round(runKm * 0.8))} km Run oder Alternative)`,
      duration: isIntro ? "40-70 min" : isCut ? "60-105 min" : isBuild ? "45-80 min" : "50-95 min",
    },
    {
      type: "recovery",
      title: "Movement + Core Reset",
      details: "Core, Hips, Ankles, Trunk Stability + optional lockeres Cardio 20-30 min",
      duration: "25-45 min",
    },
  ];

  if (!isIntro && !lowCap && !isDeload && !isTaper && level === "advanced") {
    days[4] = {
      type: "quality",
      title: isBuild ? "Heavy Strength + Power Touch" : "Power + Sprint Touch",
      details: isBuild
        ? "Schwere Hauptlifts/DB-Kraftmuster + kurze explosive Finisher (saubere Technik, lange Pausen)"
        : "Kurzsprints/Hill Sprints + explosive Bodyweight/DB-Patterns (sauber, nicht zerstörend)",
      duration: isBuild ? "55-75 min" : "40-55 min",
    };
  }

  if (raceWeek) {
    const idx = dayIndexFromDate(raceDate);
    days[idx] = {
      type: "quality",
      title: "Check-in / Progress Day",
      details: `${labelDistance(profile.goalDistance)} • Zielwert: ${profile.goalTime || (profile.targetWeightKg ? `${profile.targetWeightKg} kg` : "n/a")}`,
      duration: "Assessment",
    };
  }

  return days;
}

function createHyroxWeekSessions({ profile, weekIndex, weekKm, isDeload, isTaper, currentWeekStart, raceDate }) {
  const raceWeek = sameWeek(currentWeekStart, raceDate);
  const cap = profile.capacity || computeAthleteCapacity(profile);
  const isIntro = weekIndex < (cap.introWeeks || 0);
  const lowCap = cap.tier === "low";
  const runKm = Math.round(clamp(weekKm * 0.75, 18, 70));
  const easyKm = Math.round(clamp(runKm * 0.22, 5, 16));
  const thresholdKm = Math.round(clamp(runKm * 0.18, 5, 12));
  const longRunKm = Math.round(clamp(runKm * (isTaper ? 0.2 : 0.3), 8, 24));
  const isProSpec = profile.goalDistance === "pro" || profile.goalDistance === "doublespro";
  const isRelay = profile.goalDistance === "relay";
  const stationVolume = lowCap ? "leicht / technisch" : isProSpec ? "hoch / schwerer" : isRelay ? "moderat / schneller" : "solide";
  const simulationRounds = isIntro || lowCap ? "3-4" : isRelay ? "4-5" : isProSpec ? "6-8" : "5-7";
  const thresholdReps = isIntro || lowCap ? "6-10x1' zügig + 2' locker" : isTaper ? "4x800 m" : isProSpec ? "5-6x1 km" : "4-5x1 km";
  const stationAlt =
    "No-box Alternativen: Sled Push/Pull -> Uphill Push/Drag oder Step-ups + Band-Drags; Ski/Row -> Walk-Run/Bike/Seilspringen + Band-Pulls; Wall Balls -> Thrusters/Medball Toss";

  const days = [
    { type: "recovery", title: "Easy Run + Mobility", details: `${easyKm} km locker + Mobility + Fuß/Ankle Prep`, duration: "45-65 min" },
    {
      type: "threshold",
      title: "Run Threshold",
      details: isIntro || lowCap ? `${thresholdReps} (low impact möglich) + Technikfokus` : `${thresholdReps} @ kontrollierter Schwelle (HYROX-Run-Pacing) + 4-6 kurze Strides`,
      duration: isIntro ? "40-55 min" : isDeload ? "55 min" : "65-75 min",
    },
    {
      type: "quality",
      title: "HYROX Strength-Endurance (No-Box Friendly)",
      details: lowCap || isIntro
        ? `Step-ups, Supported Lunges/Reverse Lunges, Carry/March, Sit-to-Stand/Thruster light, Core (${stationVolume}). ${stationAlt}`
        : `Burpee Broad Jumps, Walking Lunges, Farmers Carry, Squat/Thruster, Core (${stationVolume}). ${stationAlt}`,
      duration: isIntro ? "35-55 min" : isDeload ? "45-60 min" : "60-80 min",
    },
    { type: "recovery", title: "Aerobic Run", details: `${Math.round(clamp(runKm * 0.2, 4, 14))} km low HR + optional Carries/Step-ups 10-15 min`, duration: "40-65 min" },
    {
      type: "quality",
      title: "HYROX Compromised Intervals",
      details: isIntro || lowCap
        ? `3-4 Runden: 400-600 m Walk-Run + 1 einfache Station (Step-ups / Carry / Lunges) • flüssig, kontrolliert`
        : isTaper
        ? "3-4 kurze Race-Pace-Blocks: 800 m Run + 1-2 leichte Stationen (flüssige Transitions)"
        : `${simulationRounds} Runden: 800-1000 m Run + 1 Station im Wechsel (Race-Pacing, kontrolliert). ${stationAlt}`,
      duration: isIntro ? "35-55 min" : isTaper ? "45-60 min" : "70-95 min",
    },
    { type: "longrun", title: "Long Run / Aerobic Durability", details: lowCap || isIntro ? `${Math.max(6, Math.round(longRunKm * 0.7))} km ruhig / Walk-Run möglich` : `${longRunKm} km steady (ruhig, ökonomisch) + optional 6x20s Strides`, duration: isIntro ? "45-80 min" : "60-110 min" },
    { type: "rest", title: "Recovery / Mobility / Tissue Work", details: "Walk, Mobility, Core, leichte Activation. Optional 20-30 min easy spin/jog.", duration: "Optional" },
  ];

  if (!isIntro && !lowCap && !isTaper && !isDeload && profile.fitnessLevel === "advanced") {
    days[3] = {
      type: "quality",
      title: "Aerobic Run + Functional Density",
      details: `${Math.round(clamp(runKm * 0.18, 5, 13))} km locker, danach 20-25 min EMOM (lunges / burpees / carries / jumps)`,
      duration: "65-85 min",
    };
  }

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

function createTriathlonWeekSessions({ profile, weekIndex = 0, weekKm, isDeload, isTaper, currentWeekStart, raceDate }) {
  const raceWeek = sameWeek(currentWeekStart, raceDate);
  const cap = profile.capacity || computeAthleteCapacity(profile);
  const isIntro = weekIndex < (cap.introWeeks || 0);
  const tri = deriveTriathlonWeekTargets(profile, weekKm, { isDeload, isTaper, raceWeek });
  const bikeIndoorShare = clamp(Number(profile?.bikeIndoorShare ?? profile?.gymShare) || 0, 0, 100);
  const bikeOutdoorDay = String(profile?.bikeOutdoorDay || "none");
  const trainerOnly = bikeOutdoorDay === "never" || bikeIndoorShare >= 90;
  const mostlyIndoor = bikeIndoorShare >= 60;
  const mostlyOutdoor = bikeIndoorShare <= 30 && bikeOutdoorDay !== "never";

  const cycleAware = profile.sex === "female" && profile.cycleBasedTraining;
  const days = [
    {
      type: "recovery",
      title: "Swim + Easy Run",
      details: `${tri.swimEasyKm} km Technik + ${tri.runEasyKm} km locker${cap.tier === "low" ? " (sehr ruhig, Technikfokus)" : ""}`,
      duration: cap.tier === "low" ? "45-70 min" : "60-80 min",
    },
    {
      type: "threshold",
      title: trainerOnly || mostlyIndoor ? "Bike Threshold (Trainer)" : "Bike Threshold",
      details: cap.tier === "low" || isIntro
        ? `${trainerOnly || mostlyIndoor ? "Trainer" : "Bike"} Aerobic Intervals: 4-6x4' steady / 3' locker + kurze Transition-Gewöhnung`
        : isDeload
        ? `${trainerOnly || mostlyIndoor ? "Indoor " : ""}4x8' @ Z4 kontrolliert`
        : cycleAware
          ? `${trainerOnly || mostlyIndoor ? "Trainer-" : ""}Schwellenblock adaptiv (zyklusorientiert) + kurze Brick-Run`
          : `${trainerOnly || mostlyIndoor ? "Trainer " : ""}3x12' @ Z4 + kurze Brick-Run`,
      duration: cap.tier === "low" || isIntro ? "60-75 min" : isDeload ? "75 min" : "95 min",
    },
    {
      type: "quality",
      title: "Swim Quality",
      details: cap.tier === "low" || isIntro ? `${Math.max(1.2, tri.swimEasyKm)} km Technik/Drills + lockere Serien` : `${tri.swimQualityKm} km Main Set @ CSS + Pull / Technik`,
      duration: cap.tier === "low" || isIntro ? "40-55 min" : tri.swimQualityKm >= 3.2 ? "60-75 min" : "50-65 min",
    },
    {
      type: "recovery",
      title: "Aerobic Run",
      details: cap.tier === "low" || isIntro ? `${Math.max(4, Math.round(tri.runAerobicKm * 0.7))} km low HR / Walk-Run möglich` : `${tri.runAerobicKm} km low HR + Strides`,
      duration: cap.tier === "low" || isIntro ? "40-60 min" : "50-75 min",
    },
    {
      type: "threshold",
      title: "Run Threshold",
      details: cap.tier === "low" || isIntro
        ? "Run steady intervals / Technik statt harte Schwelle"
        : cycleAware
        ? "Schwellenarbeit adaptiv nach Phase / Readiness"
        : isTaper
          ? "3x8' steady / controlled"
          : "2x20' @ Schwelle (kontrolliert)",
      duration: cap.tier === "low" || isIntro ? "45-60 min" : isTaper ? "55 min" : "75 min",
    },
    {
      type: "longrun",
      title: trainerOnly ? "Long Bike (Trainer) + Brick" : mostlyOutdoor ? "Outdoor Long Bike + Brick" : "Long Bike + Brick",
      details: cap.tier === "low" || isIntro
        ? `${Math.round(tri.longBikeKm * 0.7)} km ${trainerOnly ? "Trainer" : "Bike"} + ${Math.max(2, Math.round(tri.brickRunKm * 0.6))} km Brick/Walk-Run${!trainerOnly && bikeOutdoorDay !== "none" ? ` (${bikeOutdoorDayLabel(bikeOutdoorDay)})` : ""}`
        : `${tri.longBikeKm} km ${trainerOnly ? "Trainer" : "Bike"}${mostlyOutdoor ? " (ruhig draußen / fueling practice)" : ""} + ${tri.brickRunKm} km Brick Run${!trainerOnly && bikeOutdoorDay !== "none" ? ` (${bikeOutdoorDayLabel(bikeOutdoorDay)})` : ""}`,
      duration: cap.tier === "low" || isIntro ? "1:45-3:15 h" : tri.longBikeDuration,
    },
    {
      type: "rest",
      title: "Recovery / Mobility",
      details: "Optional Easy Swim, Mobility, Sleep, Fueling",
      duration: "Optional",
    },
  ];

  if (!trainerOnly && bikeOutdoorDay !== "none") {
    placeLongRideOnPreferredDay(days, bikeOutdoorDay);
  }
  placePreferredLongSessionDay(days, profile.longRunDay, "triathlon");

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

function createCyclingWeekSessions({ profile, weekIndex = 0, weekKm, isDeload, isTaper, currentWeekStart, raceDate }) {
  const raceWeek = sameWeek(currentWeekStart, raceDate);
  const cap = profile.capacity || computeAthleteCapacity(profile);
  const isIntro = weekIndex < (cap.introWeeks || 0);
  const bikeKm = Math.max(120, Math.round(weekKm * 3.8));
  const enduranceKm = Math.max(40, Math.round(bikeKm * 0.22));
  const longKm = Math.max(65, Math.round(bikeKm * (isTaper ? 0.32 : 0.42)));
  const bikeIndoorShare = clamp(Number(profile?.bikeIndoorShare ?? profile?.gymShare) || 0, 0, 100);
  const bikeOutdoorDay = String(profile?.bikeOutdoorDay || "none");
  const trainerOnly = bikeOutdoorDay === "never" || bikeIndoorShare >= 90;
  const mostlyIndoor = bikeIndoorShare >= 60;
  const mostlyOutdoor = bikeIndoorShare <= 30 && bikeOutdoorDay !== "never";

  const days = [
    { type: "recovery", title: "Recovery Spin", details: cap.tier === "low" || isIntro ? "35-50 min locker, sehr ruhig" : "45-60 min locker, hohe Kadenz", duration: cap.tier === "low" || isIntro ? "35-50 min" : "45-60 min" },
    {
      type: "threshold",
      title: mostlyIndoor || trainerOnly ? "Threshold Intervals (Trainer)" : "Threshold Intervals",
      details: cap.tier === "low" || isIntro ? "4-6x4' steady / 3' locker (Tempo-Gewöhnung)" : isDeload ? `${mostlyIndoor || trainerOnly ? "Indoor " : ""}4x8' @ FTP` : `${mostlyIndoor || trainerOnly ? "Trainer " : ""}3x15' @ Sweet Spot / FTP`,
      duration: cap.tier === "low" || isIntro ? "55-70 min" : isDeload ? "75 min" : "95 min",
    },
    { type: "rest", title: "Rest / Mobility", details: "Optional Walk, Mobility, Schlaf", duration: "Optional" },
    {
      type: "quality",
      title: mostlyIndoor || trainerOnly ? "VO2 Bike Session (Trainer)" : "VO2 Bike Session",
      details: cap.tier === "low" || isIntro ? "Cadence + kurze zügige Blöcke (kontrolliert)" : isTaper ? "6x2' sharpeners" : `${mostlyIndoor || trainerOnly ? "Trainer " : ""}5x4' @ VO2 + locker rollen`,
      duration: cap.tier === "low" || isIntro ? "45-60 min" : isTaper ? "55 min" : "70 min",
    },
    { type: "recovery", title: (mostlyOutdoor && !trainerOnly) ? "Endurance Ride (Outdoor-ready)" : "Endurance Ride", details: `${cap.tier === "low" || isIntro ? Math.round(enduranceKm * 0.7) : enduranceKm} km Z2 steady${(!trainerOnly && bikeOutdoorDay !== "none" && mostlyOutdoor) ? " (ruhig draußen möglich)" : ""}`, duration: cap.tier === "low" || isIntro ? "60-90 min" : "75-120 min" },
    { type: "longrun", title: trainerOnly ? "Long Ride (Trainer)" : mostlyOutdoor ? "Long Ride (Outdoor)" : "Long Ride", details: `${cap.tier === "low" || isIntro ? Math.round(longKm * 0.7) : longKm} km ${trainerOnly ? "steady trainer ride" : cap.tier === "low" || isIntro ? "steady / locker" : "ruhige längere Ausfahrt / fueling practice"}${!trainerOnly && bikeOutdoorDay !== "none" ? ` (${bikeOutdoorDayLabel(bikeOutdoorDay)})` : ""}`, duration: cap.tier === "low" || isIntro ? "1:45-3:00 h" : "2:30-4:30 h" },
    { type: "recovery", title: "Easy Spin + Cadence", details: "50 min locker + 6x high cadence spin-ups", duration: "50 min" },
  ];

  if (!trainerOnly && bikeOutdoorDay !== "none") {
    placeLongRideOnPreferredDay(days, bikeOutdoorDay);
  }

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

function placeLongRideOnPreferredDay(days, preferredDay) {
  const targetIndex = preferredDayToWeekIndex(preferredDay);
  if (targetIndex == null || !Array.isArray(days) || targetIndex < 0 || targetIndex >= days.length) return;
  const longIndex = days.findIndex((d) => d.type === "longrun" && /long bike|long ride/i.test(String(d.title || "")));
  if (longIndex < 0 || longIndex === targetIndex) return;
  const blocked = ["rest", "quality"];
  if (blocked.includes(days[targetIndex]?.type)) return;
  const tmp = days[targetIndex];
  days[targetIndex] = days[longIndex];
  days[longIndex] = tmp;
}

function placePreferredLongSessionDay(days, preferredDay, disciplineKind = "running") {
  const targetIndex = preferredDayToWeekIndex(preferredDay);
  if (targetIndex == null || !Array.isArray(days) || targetIndex < 0 || targetIndex >= days.length) return;
  const target = days[targetIndex];
  if (!target || target.type === "rest") return;

  let longIndex = -1;
  if (disciplineKind === "triathlon") {
    longIndex = days.findIndex((d) => /long bike|long session|brick/i.test(String(d.title || "")) || d.type === "longrun");
  } else {
    longIndex = days.findIndex((d) => /long run/i.test(String(d.title || "")) || d.type === "longrun");
  }
  if (longIndex < 0 || longIndex === targetIndex) return;
  if (days[targetIndex]?.type === "quality") return;
  const tmp = days[targetIndex];
  days[targetIndex] = days[longIndex];
  days[longIndex] = tmp;
}

function preferredDayToWeekIndex(value) {
  return {
    monday: 0,
    tuesday: 1,
    wednesday: 2,
    thursday: 3,
    friday: 4,
    saturday: 5,
    sunday: 6,
  }[String(value || "").toLowerCase()] ?? null;
}

function deriveTriathlonWeekTargets(profile, weekLoadIndex, { isDeload, isTaper, raceWeek }) {
  const baseLoad = Math.max(1, estimateBaseKm(profile));
  const progressionFactor = clamp(weekLoadIndex / baseLoad, 0.45, 1.35);
  const availableHours = Math.max(3, Number(profile.weeklyHours) || 6);

  const disciplineHourShare = {
    sprint: { swim: 0.2, bike: 0.45, run: 0.25 },
    olympic: { swim: 0.18, bike: 0.48, run: 0.24 },
    "703": { swim: 0.16, bike: 0.52, run: 0.24 },
    ironman: { swim: 0.14, bike: 0.54, run: 0.24 },
  }[profile.goalDistance] || { swim: 0.17, bike: 0.5, run: 0.24 };

  // Keep some room for mobility/strength and transitions.
  const trainableHours = availableHours * 0.9 * progressionFactor;
  const levelSpeeds = {
    starter: { swimKmh: 1.8, bikeKmh: 24, runKmh: 8.6 },
    intermediate: { swimKmh: 2.2, bikeKmh: 28, runKmh: 10.2 },
    advanced: { swimKmh: 2.7, bikeKmh: 31, runKmh: 11.8 },
  }[profile.fitnessLevel] || { swimKmh: 2.1, bikeKmh: 27, runKmh: 9.8 };

  const weeklySwimKmRaw = trainableHours * disciplineHourShare.swim * levelSpeeds.swimKmh;
  const weeklyBikeKmRaw = trainableHours * disciplineHourShare.bike * levelSpeeds.bikeKmh;
  const weeklyRunKmRaw = trainableHours * disciplineHourShare.run * levelSpeeds.runKmh;

  const weeklyCaps = {
    sprint: { swim: [2.5, 8], bike: [50, 180], run: [12, 40] },
    olympic: { swim: [3, 10], bike: [70, 240], run: [16, 55] },
    "703": { swim: [4, 14], bike: [110, 320], run: [22, 75] },
    ironman: { swim: [5, 16], bike: [140, 420], run: [28, 95] },
  }[profile.goalDistance] || { swim: [3, 10], bike: [80, 240], run: [16, 55] };

  const weeklySwimKm = clamp(round1(weeklySwimKmRaw), weeklyCaps.swim[0], weeklyCaps.swim[1]);
  const weeklyBikeKm = Math.round(clamp(weeklyBikeKmRaw, weeklyCaps.bike[0], weeklyCaps.bike[1]));
  const weeklyRunKm = Math.round(clamp(weeklyRunKmRaw, weeklyCaps.run[0], weeklyCaps.run[1]));

  const longBikeCapByGoal = {
    sprint: 80,
    olympic: 130,
    "703": 200,
    ironman: 260,
  };
  const longRunCapByGoal = {
    sprint: 14,
    olympic: 22,
    "703": 28,
    ironman: 34,
  };

  const longBikeKm = Math.round(
    clamp(
      weeklyBikeKm * (raceWeek ? 0.2 : isTaper ? 0.45 : isDeload ? 0.55 : 0.62),
      raceWeek ? 20 : 45,
      longBikeCapByGoal[profile.goalDistance] || 160
    )
  );
  const brickRunKm = Math.round(
    clamp(
      weeklyRunKm * (raceWeek ? 0.08 : isTaper ? 0.12 : 0.16),
      raceWeek ? 2 : 3,
      profile.goalDistance === "ironman" ? 12 : profile.goalDistance === "703" ? 8 : 6
    )
  );

  const swimEasyKm = round1(clamp(weeklySwimKm * 0.32, 1.2, profile.goalDistance === "ironman" ? 3.5 : 3));
  const swimQualityKm = round1(clamp(weeklySwimKm * 0.4, 1.6, profile.goalDistance === "ironman" ? 4.2 : 3.6));
  const runEasyKm = Math.round(clamp(weeklyRunKm * 0.24, 4, 18));
  const runAerobicKm = Math.round(clamp(weeklyRunKm * 0.28, 5, longRunCapByGoal[profile.goalDistance] || 22));

  const longBikeDurationHours = longBikeKm / levelSpeeds.bikeKmh;
  const longBikeDuration = raceWeek
    ? "Event"
    : `${formatHourRange(Math.max(1.3, longBikeDurationHours * 0.9), Math.max(1.6, longBikeDurationHours * 1.08))} h`;

  return {
    weeklySwimKm,
    weeklyBikeKm,
    weeklyRunKm,
    swimEasyKm,
    swimQualityKm,
    runEasyKm,
    runAerobicKm,
    longBikeKm,
    brickRunKm,
    longBikeDuration,
  };
}

function renderAnalysis(profile, plan) {
  const goalLabel = `${labelDistance(profile.goalDistance)} in ${profile.goalTime}`;
  const readiness = calcReadiness(profile, plan.meta.weeklyKmBase);
  const hoursBand = profile.weeklyHoursRecommended || recommendWeeklyHoursBand(profile);
  const requestedHours = Number(profile.weeklyHoursRequested ?? profile.weeklyHours) || 0;
  const planningHours = Number(profile.planningWeeklyHours ?? profile.weeklyHours) || 0;
  const hoursWarning =
    requestedHours > hoursBand.cap
      ? `\n• Coaching-Hinweis: ${requestedHours} h/Woche ist für dein Profil eher hoch. Plan wurde auf ~${planningHours} h/Woche skaliert (Empfehlung: ${hoursBand.rec[0]}-${hoursBand.rec[1]} h).`
      : requestedHours > hoursBand.rec[1]
        ? `\n• Coaching-Hinweis: ${requestedHours} h/Woche ist ambitioniert. Achte auf Recovery/Schlaf und reduziere bei Übermüdung (Empfehlung: ${hoursBand.rec[0]}-${hoursBand.rec[1]} h).`
        : "";
  const connected = profile.connectedSources.length ? profile.connectedSources.join(", ") : "keine";
  const notes = profile.constraints ? `\nEinschränkung berücksichtigt (manuell): ${profile.constraints}` : "";
  const shapeWindow = profile.discipline === "shape" ? estimateShapeGoalWindow(profile) : null;
  const shapeGoalLine = shapeWindow
    ? `\n• Shape-Zielcheck: ${shapeWindow.message}${shapeWindow.suggestedDate ? ` Vorschlag Zieldatum ${formatDateShort(shapeWindow.suggestedDate)}.` : ""}`
    : "";
  const optionalProfileNotes = [
    profile.age ? `Alter ${profile.age}` : null,
    profile.weightKg ? `${profile.weightKg} kg` : null,
    profile.heightCm ? `${profile.heightCm} cm` : null,
    profile.capacity?.bmi ? `BMI ${profile.capacity.bmi.toFixed(1)}` : null,
    profile.capacity?.complexity ? `Komplexität ${profile.capacity.complexity}` : null,
    profile.discipline === "shape" && profile.shapeTargetFocus ? `Shape-Fokus ${profile.shapeTargetFocus}` : null,
    profile.sex ? `Geschlecht ${sexLabel(profile.sex)}` : null,
    profile.sex === "female" && profile.cycleBasedTraining ? "zyklusbasiert aktiv" : null,
  ]
    .filter(Boolean)
    .join(" / ");
  const loadUnit = profile.discipline === "triathlon" || profile.discipline === "hyrox" || profile.discipline === "shape" ? "Load-Index/Woche" : "km/Woche";
  const planLogicText =
    profile.discipline === "triathlon"
      ? "Triathlon-Struktur mit Bike/Run/Swim-Schwerpunkten, Brick-Sessions, Deload/Taper"
      : profile.discipline === "hyrox"
        ? "HYROX-Struktur mit Run-Threshold, Stations-Technik, Simulation-Intervallen, Deload/Taper"
        : profile.discipline === "shape"
          ? "Shape-Struktur mit Kraft, Bodyweight, Cardio-Intervallen, Long Cardio, Deload/Taper und Gym/No-Gym-Mix"
        : profile.discipline === "cycling"
        ? "Bike-zentrierte Struktur mit FTP/Sweet Spot, VO2, Long Ride, Deload/Taper"
      : "Schwellenorientierte Struktur mit 1-2 Qualitätstagen, Long Run, Deload/Taper";

  statusEl.textContent =
    `Status-quo (MVP Heuristik)\n` +
    `• Profil: ${fitnessText(profile.fitnessLevel)} / Erfahrung ${experienceText(profile.experience)}\n` +
    (optionalProfileNotes ? `• Optionales Profil: ${optionalProfileNotes}\n` : "") +
    `• Geschätzte Basisbelastung: ${plan.meta.weeklyKmBase} ${loadUnit} (~${planningHours} h geplant, ${requestedHours || planningHours} h angegeben)\n` +
    `• Ziel: ${goalLabel}\n` +
    `• Datenquellen: ${connected}\n` +
    `• Einschätzung: ${readiness}\n` +
    `• Planlogik: ${planLogicText}${hoursWarning}${shapeGoalLine}${notes}\n\n` +
    `Hinweis: Für echte NTM-Qualität brauchen wir als Nächstes reale Daten (Pace/HR/HRV/Recovery), Belastungsmetriken und individualisierte Schwellenwerte.`;
}

function renderPlan(plan) {
  const firstWeek = plan.weeks[0];
  const lastWeek = plan.weeks[plan.weeks.length - 1];
  const useLoadIndex = latestProfile?.discipline === "triathlon" || latestProfile?.discipline === "hyrox" || latestProfile?.discipline === "shape";
  planMetaEl.textContent = `${plan.weeks.length} Wochen bis Ziel • Zeitraum ${formatDateShort(firstWeek.start)}-${formatDateShort(lastWeek.end)} • Basis ${plan.meta.weeklyKmBase} ${useLoadIndex ? "Load-Index/Woche" : "km/Woche"}`;
  renderPlanOverviewChart(latestProfile, plan);

  calendarEl.innerHTML = "";

  for (const week of plan.weeks) {
    const node = weekTemplate.content.firstElementChild.cloneNode(true);
    node.querySelector(".week-label").textContent = `Woche ${week.weekNumber} • ${formatDateShort(week.start)}-${formatDateShort(week.end)}`;
    node.querySelector(".week-focus").textContent = week.focus;
    node.querySelector(".week-load").textContent = useLoadIndex ? `~${week.loadKm} Load • ~${week.loadHours} h` : `~${week.loadKm} km • ~${week.loadHours} h`;

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

function renderPlanOverviewChart(profile, plan) {
  if (!planOverviewSvgEl || !planOverviewLegendEl || !planOverviewCardEl) return;
  if (!profile || !plan || !Array.isArray(plan.weeks) || !plan.weeks.length) {
    planOverviewCardEl.hidden = true;
    if (planOverviewSvgEl) planOverviewSvgEl.innerHTML = "";
    return;
  }
  planOverviewCardEl.hidden = false;
  const points = buildPlanOverviewTimeline(profile, plan);
  const perfSeries = buildPerformanceSeries(profile, plan, connectedSources.size);
  const perfAligned = alignPerformanceSeriesToTimeline(perfSeries, points.length);
  const lineData = buildOverviewLineData(profile, points, perfAligned);
  renderPlanOverviewLegend(profile);
  if (planOverviewTitleEl) {
    planOverviewTitleEl.textContent =
      currentLang === "de"
        ? "Flow: Volumen & Wirkung über Zeit"
        : currentLang === "ja"
          ? "Flow：期間ごとのボリュームと変化"
          : "Flow: volume & response over time";
  }
  if (planOverviewLeftAxisEl) {
    planOverviewLeftAxisEl.textContent = currentLang === "de" ? "Stunden / Tag" : currentLang === "ja" ? "時間 / 日" : "Hours / day";
  }
  if (planOverviewRightAxisEl) {
    planOverviewRightAxisEl.textContent = profile.discipline === "shape" && planOverviewState.lines.weight
      ? (currentLang === "de" ? "Fitness / Ermüdung / Gewicht" : currentLang === "ja" ? "フィットネス / 疲労 / 体重" : "Fitness / fatigue / weight")
      : (currentLang === "de" ? "Fitness / Ermüdung / Readiness" : currentLang === "ja" ? "フィットネス / 疲労 / Readiness" : "Fitness / fatigue / readiness");
  }
  planOverviewSvgEl.innerHTML = buildPlanOverviewSvg(points, lineData, profile);
}

function renderPlanOverviewLegend(profile) {
  if (!planOverviewLegendEl) return;
  const barItems = [
    { key: "run", label: "Run", color: "var(--accent-fit)" },
    { key: "bike", label: "Bike", color: "#6ecbff" },
    { key: "swim", label: "Swim", color: "#86f1e2" },
    { key: "strength", label: profile?.discipline === "hyrox" ? "Stations" : "Strength", color: "#ffd27d" },
    { key: "other", label: "Other", color: "#c8cdd7" },
  ];
  const lineItems = [
    { key: "fitness", label: currentLang === "de" ? "Fitness" : "Fitness", color: "var(--accent-fit)" },
    { key: "fatigue", label: currentLang === "de" ? "Ermüdung" : currentLang === "ja" ? "疲労" : "Fatigue", color: "var(--accent-fatigue)" },
    { key: "readiness", label: "Readiness", color: "var(--accent-ready)" },
    ...(profile?.discipline === "shape" && Number(profile?.weightKg) ? [{ key: "weight", label: currentLang === "de" ? "Gewicht" : currentLang === "ja" ? "体重" : "Weight", color: "#f4f6fb" }] : []),
  ];
  const block = (title, items, group) => `
    <div class="plan-legend-group">
      <span class="plan-legend-caption">${escapeHtml(title)}</span>
      ${items.map((item) => `
        <button type="button" class="plan-legend-btn ${planOverviewState[group]?.[item.key] ? "is-active" : ""}" data-plan-group="${group}" data-plan-toggle="${item.key}">
          <span class="plan-legend-dot" style="--dot:${item.color}"></span>
          <span>${escapeHtml(item.label)}</span>
        </button>
      `).join("")}
    </div>`;
  planOverviewLegendEl.innerHTML =
    block(currentLang === "de" ? "Dauer (gestapelt)" : currentLang === "ja" ? "時間（積み上げ）" : "Duration (stacked)", barItems, "bars") +
    block(currentLang === "de" ? "Linien" : currentLang === "ja" ? "ライン" : "Lines", lineItems, "lines");
}

function buildPlanOverviewTimeline(profile, plan) {
  const byDate = new Map();
  for (const week of plan.weeks) {
    const dayWeights = week.days.map((day) => estimateDayLoadWeight(profile, day));
    const totalWeight = Math.max(0.0001, dayWeights.reduce((sum, v) => sum + v, 0));
    for (const day of week.days) {
      const key = formatDateInput(day.date);
      if (!byDate.has(key)) {
        byDate.set(key, {
          key,
          date: day.date,
          run: 0,
          bike: 0,
          swim: 0,
          strength: 0,
          other: 0,
          total: 0,
          stress: 0,
          adaptationImpulse: 0,
          fatigueImpulse: 0,
        });
      }
      const row = byDate.get(key);
      if (day.type === "rest") continue;
      const dayIndex = week.days.indexOf(day);
      const explicitHours = estimateSessionMinutes(day, profile) / 60;
      const weightedHours = (Number(week.loadHours) || 0) * (dayWeights[dayIndex] / totalWeight);
      const totalHours = clamp(
        explicitHours > 0 ? weightedHours * 0.65 + explicitHours * 0.35 : weightedHours,
        0,
        Math.max(0.2, (Number(week.loadHours) || 0) * 0.65)
      );
      if (totalHours <= 0.01) continue;
      const allocations = overviewBucketAllocations(profile, day, totalHours);
      allocations.forEach(({ bucket, hours }) => {
        row[bucket] += hours;
        row.total += hours;
      });
      const impact = estimateSessionProjectionImpact(day, profile, totalHours);
      row.stress += impact.stress;
      row.adaptationImpulse += impact.adaptation;
      row.fatigueImpulse += impact.fatigue;
    }
  }
  return [...byDate.values()].sort((a, b) => a.date - b.date);
}

function estimateSessionMinutes(session, profile = null) {
  if (!session || session.type === "rest") return 0;
  const raw = String(session.duration || "").toLowerCase().trim();
  const details = String(session.details || "").toLowerCase();
  const title = String(session.title || "").toLowerCase();
  if (!raw || raw === "event" || raw.includes("optional")) {
    const fromDetails = estimateMinutesFromDetails(details, title, profile, session);
    if (fromDetails > 0) return fromDetails;
    if (session.type === "recovery") return 40;
    if (session.type === "threshold") return 70;
    if (session.type === "quality") return 60;
    if (session.type === "longrun") return 120;
    return 50;
  }
  const rangeMatch = raw.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)(?:\s*h|min)/);
  if (rangeMatch) {
    const a = Number(rangeMatch[1]);
    const b = Number(rangeMatch[2]);
    if (raw.includes("h")) return ((a + b) / 2) * 60;
    return (a + b) / 2;
  }
  const hMinMatch = raw.match(/(\d+):(\d+)/);
  if (hMinMatch) return Number(hMinMatch[1]) * 60 + Number(hMinMatch[2]);
  const hourNum = raw.match(/(\d+(?:\.\d+)?)\s*h/);
  if (hourNum) return Number(hourNum[1]) * 60;
  const minNum = raw.match(/(\d+(?:\.\d+)?)\s*min/);
  if (minNum) return Number(minNum[1]);
  const fromDetails = estimateMinutesFromDetails(details, title, profile, session);
  if (fromDetails > 0) return fromDetails;
  return 50;
}

function estimateMinutesFromDetails(details, title, profile, session) {
  const kmMatches = [...String(details || "").matchAll(/(\d+(?:[.,]\d+)?)\s*km/g)].map((m) => Number(String(m[1]).replace(",", "."))).filter((n) => Number.isFinite(n));
  if (!kmMatches.length) return 0;

  const sumByLikelyDiscipline = () => {
    if (profile?.discipline === "triathlon") {
      let mins = 0;
      for (const km of kmMatches) {
        if (title.includes("swim") || details.includes("technik") || details.includes("css")) {
          mins += (km / 2.1) * 60;
        } else if (title.includes("bike") || title.includes("ride") || title.includes("trainer")) {
          mins += (km / 27) * 60;
        } else {
          mins += (km / 10.5) * 60;
        }
      }
      return mins;
    }
    if (profile?.discipline === "cycling") return kmMatches.reduce((s, km) => s + (km / 28) * 60, 0);
    if (profile?.discipline === "running") return kmMatches.reduce((s, km) => s + (km / 10.2) * 60, 0);
    if (profile?.discipline === "hyrox") return kmMatches.reduce((s, km) => s + (km / 10.8) * 60, 0);
    if (profile?.discipline === "shape") return kmMatches.reduce((s, km) => s + (km / 8.5) * 60, 0);
    return kmMatches.reduce((s, km) => s + (km / 10) * 60, 0);
  };

  const mins = sumByLikelyDiscipline();
  if (session?.type === "quality" || session?.type === "threshold") return mins + 10;
  return mins;
}

function estimateDayLoadWeight(profile, day) {
  if (!day || day.type === "rest") return 0;
  const title = String(day.title || "").toLowerCase();
  let w = 1;
  if (day.type === "longrun") w += 1.8;
  if (day.type === "threshold") w += 0.9;
  if (day.type === "quality") w += 0.7;
  if (day.type === "recovery") w += 0.15;
  if (title.includes("long bike") || title.includes("long ride")) w += 1.2;
  if (title.includes("brick")) w += 0.35;
  if (title.includes("swim + easy run")) w += 0.35;
  if (profile?.discipline === "shape" && (title.includes("strength") || title.includes("circuit"))) w += 0.45;
  if (profile?.discipline === "hyrox" && title.includes("compromised")) w += 0.65;
  return w;
}

function overviewDisciplineBucket(profile, session) {
  const title = String(session?.title || "").toLowerCase();
  if (profile?.discipline === "triathlon") {
    if (title.includes("swim")) return "swim";
    if (title.includes("bike") || title.includes("ride") || title.includes("trainer")) return "bike";
    if (title.includes("run") || title.includes("brick")) return "run";
  }
  if (profile?.discipline === "cycling") {
    return "bike";
  }
  if (profile?.discipline === "running") {
    return "run";
  }
  if (profile?.discipline === "hyrox") {
    if (title.includes("run")) return "run";
    return "strength";
  }
  if (profile?.discipline === "shape") {
    if (title.includes("run") || title.includes("cardio") || title.includes("walk")) return "run";
    if (title.includes("strength") || title.includes("circuit") || title.includes("carry")) return "strength";
    return "other";
  }
  return "other";
}

function overviewBucketAllocations(profile, session, totalHours) {
  const title = String(session?.title || "").toLowerCase();
  const details = String(session?.details || "").toLowerCase();
  const isTri = profile?.discipline === "triathlon";

  if (isTri) {
    if (title.includes("swim") && title.includes("run")) {
      return [
        { bucket: "swim", hours: totalHours * 0.45 },
        { bucket: "run", hours: totalHours * 0.55 },
      ];
    }
    if (title.includes("bike") && (title.includes("brick") || details.includes("brick"))) {
      return [
        { bucket: "bike", hours: totalHours * 0.82 },
        { bucket: "run", hours: totalHours * 0.18 },
      ];
    }
  }

  if (profile?.discipline === "hyrox") {
    if (title.includes("run") && (title.includes("station") || title.includes("compromised") || details.includes("run +"))) {
      return [
        { bucket: "run", hours: totalHours * 0.45 },
        { bucket: "strength", hours: totalHours * 0.55 },
      ];
    }
  }

  return [{ bucket: overviewDisciplineBucket(profile, session), hours: totalHours }];
}

function estimateSessionProjectionImpact(session, profile, totalHours) {
  const title = String(session?.title || "").toLowerCase();
  const details = String(session?.details || "").toLowerCase();
  const type = String(session?.type || "other");
  const hours = Math.max(0, Number(totalHours) || 0);

  let intensity = 1;
  let adaptationBias = 1;
  let fatigueBias = 1;

  if (type === "recovery") {
    intensity = 0.52;
    adaptationBias = 0.46;
    fatigueBias = 0.42;
  } else if (type === "longrun") {
    intensity = 1.06;
    adaptationBias = 1.22;
    fatigueBias = 1.2;
  } else if (type === "threshold") {
    intensity = 1.28;
    adaptationBias = 1.34;
    fatigueBias = 1.36;
  } else if (type === "quality") {
    intensity = 1.38;
    adaptationBias = 1.2;
    fatigueBias = 1.5;
  }

  if (title.includes("vo2") || details.includes("vo2")) {
    intensity += 0.1;
    fatigueBias += 0.14;
  }
  if (title.includes("threshold") || details.includes("threshold")) {
    adaptationBias += 0.08;
    fatigueBias += 0.06;
  }
  if (title.includes("sweet spot") || details.includes("ftp")) {
    adaptationBias += 0.08;
    fatigueBias += 0.1;
  }
  if (title.includes("brick")) fatigueBias += 0.12;
  if (profile?.discipline === "hyrox" && (title.includes("compromised") || details.includes("run +"))) {
    adaptationBias += 0.08;
    fatigueBias += 0.16;
  }
  if (profile?.discipline === "shape" && (title.includes("strength") || title.includes("circuit"))) {
    adaptationBias += 0.06;
  }

  const stress = hours * 100 * intensity;
  return {
    stress,
    adaptation: stress * adaptationBias,
    fatigue: stress * fatigueBias,
  };
}

function alignPerformanceSeriesToTimeline(series, targetLength) {
  if (!Array.isArray(series) || !series.length || !targetLength) return [];
  if (series.length === targetLength) return series;
  const result = [];
  for (let i = 0; i < targetLength; i += 1) {
    const idx = Math.round((i / Math.max(1, targetLength - 1)) * (series.length - 1));
    result.push(series[idx]);
  }
  return result;
}

function buildOverviewLineData(profile, points, perfAligned) {
  const weightStart = Number(profile?.weightKg) || null;
  const weightTarget = Number(profile?.targetWeightKg) || null;
  const weightValues = [];
  for (let i = 0; i < points.length; i += 1) {
    if (!weightStart) {
      weightValues.push(null);
      continue;
    }
    if (weightTarget != null) {
      const p = i / Math.max(1, points.length - 1);
      const eased = p < 0.75 ? p * 0.9 : 0.675 + (p - 0.75) * 1.3;
      weightValues.push(weightStart + (weightTarget - weightStart) * clamp(eased, 0, 1));
    } else {
      weightValues.push(weightStart);
    }
  }
  return {
    fitness: perfAligned.map((p) => p?.fitness ?? null),
    fatigue: perfAligned.map((p) => p?.fatigue ?? null),
    readiness: perfAligned.map((p) => p?.readiness ?? null),
    weight: weightValues,
  };
}

function buildPlanOverviewSvg(points, lineData, profile) {
  const width = 980;
  const height = 290;
  const pad = { top: 18, right: 44, bottom: 42, left: 44 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const keys = ["run", "bike", "swim", "strength", "other"];
  const colors = {
    run: "rgba(124, 212, 255, 0.92)",
    bike: "rgba(108, 142, 255, 0.88)",
    swim: "rgba(124, 255, 225, 0.88)",
    strength: "rgba(255, 207, 123, 0.9)",
    other: "rgba(210, 216, 228, 0.65)",
  };
  const lineColors = {
    fitness: "var(--accent-fit)",
    fatigue: "var(--accent-fatigue)",
    readiness: "var(--accent-ready)",
    weight: "#f3f6fb",
  };
  const maxHours = Math.max(1, ...points.map((p) => p.total));
  const leftMax = Math.ceil(maxHours * 1.15);
  const lineEnabled = Object.entries(planOverviewState.lines).filter(([, on]) => on);
  const rightScaleUsesWeight = lineEnabled.some(([k]) => k === "weight");
  const weightValues = (lineData.weight || []).filter((v) => Number.isFinite(v));
  const weightMin = weightValues.length ? Math.min(...weightValues) : 0;
  const weightMax = weightValues.length ? Math.max(...weightValues) : 0;
  const xFor = (i) => pad.left + (i / Math.max(1, points.length - 1)) * innerW;
  const yLeft = (hours) => pad.top + innerH - (hours / leftMax) * innerH;
  const yRight = (value, key) => {
    if (key === "weight" && weightValues.length) {
      const min = Math.floor(weightMin - 1);
      const max = Math.ceil(weightMax + 1);
      return pad.top + innerH - ((value - min) / Math.max(1, max - min)) * innerH;
    }
    return pad.top + innerH - (clamp(value, 0, 100) / 100) * innerH;
  };
  const barStep = innerW / Math.max(1, points.length);
  const barW = Math.max(2, Math.min(12, barStep * 0.78));

  const gridY = [0, 0.25, 0.5, 0.75, 1].map((r) => {
    const y = pad.top + innerH - r * innerH;
    const label = (leftMax * r).toFixed(r === 1 ? 0 : 1);
    return `
      <line x1="${pad.left}" x2="${pad.left + innerW}" y1="${y.toFixed(1)}" y2="${y.toFixed(1)}" stroke="rgba(255,255,255,0.05)" />
      <text x="${pad.left - 8}" y="${(y + 4).toFixed(1)}" text-anchor="end" fill="rgba(255,255,255,0.38)" font-size="10">${label}</text>`;
  }).join("");

  const rightTicks = [0, 25, 50, 75, 100].map((v) => {
    const y = yRight(v, "fitness");
    return `<text x="${pad.left + innerW + 8}" y="${(y + 4).toFixed(1)}" fill="rgba(255,255,255,0.32)" font-size="10">${v}</text>`;
  }).join("");

  const monthTicks = points.map((p, i) => ({ p, i }))
    .filter(({ p, i }) => i === 0 || p.date.getDate() <= 7 && points[i - 1].date.getMonth() !== p.date.getMonth())
    .map(({ p, i }) => {
      const x = xFor(i);
      return `
        <line x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="${pad.top}" y2="${(pad.top + innerH).toFixed(1)}" stroke="rgba(255,255,255,0.025)" />
        <text x="${x.toFixed(1)}" y="${height - 12}" fill="rgba(255,255,255,0.48)" font-size="10">${formatMonthTick(p.date)}</text>`;
    }).join("");

  const bars = points.map((point, i) => {
    const x = xFor(i) - barW / 2;
    let stackBase = 0;
    const rects = keys.map((key) => {
      if (!planOverviewState.bars[key]) return "";
      const val = Number(point[key]) || 0;
      if (val <= 0.01) return "";
      const y1 = yLeft(stackBase + val);
      const y0 = yLeft(stackBase);
      stackBase += val;
      return `<rect x="${x.toFixed(1)}" y="${y1.toFixed(1)}" width="${barW.toFixed(1)}" height="${Math.max(1, y0 - y1).toFixed(1)}" rx="2" fill="${colors[key]}" opacity="0.9"></rect>`;
    }).join("");
    return rects;
  }).join("");

  const linePaths = Object.entries(lineData).map(([key, arr]) => {
    if (!planOverviewState.lines[key] || !Array.isArray(arr) || !arr.length) return "";
    const d = arr.map((v, i) => {
      if (!Number.isFinite(v)) return "";
      return `${i === 0 ? "M" : "L"} ${xFor(i).toFixed(1)} ${yRight(v, key).toFixed(1)}`;
    }).filter(Boolean).join(" ");
    if (!d) return "";
    const dash = key === "readiness" ? "5 4" : key === "weight" ? "2 4" : "";
    return `<path d="${d}" fill="none" stroke="${lineColors[key]}" stroke-width="${key === "fitness" ? 2.1 : 1.7}" ${dash ? `stroke-dasharray="${dash}"` : ""} opacity="${key === "weight" ? 0.9 : 0.92}"></path>`;
  }).join("");

  const topOutline = points.map((point, i) => `${i === 0 ? "M" : "L"} ${xFor(i).toFixed(1)} ${yLeft(point.total).toFixed(1)}`).join(" ");

  return `
    <defs>
      <linearGradient id="planChartBg" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.02)"></stop>
        <stop offset="100%" stop-color="rgba(255,255,255,0)"></stop>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${width}" height="${height}" fill="rgba(255,255,255,0.002)"></rect>
    <rect x="${pad.left}" y="${pad.top}" width="${innerW}" height="${innerH}" rx="10" fill="url(#planChartBg)" stroke="rgba(255,255,255,0.04)"></rect>
    ${gridY}
    ${rightScaleUsesWeight && weightValues.length ? "" : rightTicks}
    ${monthTicks}
    ${bars}
    ${topOutline ? `<path d="${topOutline}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"></path>` : ""}
    ${linePaths}
  `;
}

function formatMonthTick(date) {
  const d = new Date(date);
  const month = d.toLocaleString(currentLang === "ja" ? "ja-JP" : currentLang === "en" ? "en-US" : "de-DE", { month: "short" });
  return `${month} ${String(d.getFullYear()).slice(-2)}`;
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

  const series = getActualPerformanceSeries(profile, plan);
  if (!series || !series.length) {
    setMetricValues({
      vo2: "-",
      fitness: "-",
      fatigue: "-",
      freshness: "-",
      readiness: "-",
    });
    setExtendedMetricsToEmpty();
    fitnessChartEl.innerHTML = buildEmptyChartSvg();
    renderMiniSparks(null, profile);
    return;
  }
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

function getActualPerformanceSeries(profile, plan) {
  void profile;
  void plan;
  // Live actuals come from Strava/Garmin/WHOOP connector ingestion.
  // Do not reuse plan projections for this section.
  const liveSeries = window.__AIMRUNNA_LIVE_SERIES__;
  return Array.isArray(liveSeries) && liveSeries.length ? liveSeries : null;
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
  const dailyTimeline = buildPlanOverviewTimeline(profile, plan);
  const points = Math.max(56, Math.min(180, dailyTimeline.length || 90));
  const series = [];
  const levelBase = { starter: 30, intermediate: 44, advanced: 56 }[profile.fitnessLevel];
  const ageAdj = profile.age ? clamp((42 - profile.age) * 0.08, -2.8, 2.2) : 0;
  const weightAdj = profile.weightKg ? clamp((72 - profile.weightKg) * 0.05, -3.4, 2.5) : 0;
  const sexAdj = profile.sex === "female" ? -0.4 : profile.sex === "male" ? 0.2 : 0;
  const sourceBoost = sourceCount * 0.6;
  const goalBoost = goalSpecificBoost(profile);
  const baseFitness = levelBase + ageAdj + weightAdj + sexAdj + sourceBoost;

  const stressRaw = dailyTimeline.length
    ? dailyTimeline.map((d) => {
        const tssLike = d.stress || (
          d.run * 92 +
          d.bike * 80 +
          d.swim * 86 +
          d.strength * 72 +
          d.other * 58
        );
        const disciplineBias =
          profile.discipline === "triathlon" ? 1.06 :
          profile.discipline === "cycling" ? 1.04 :
          profile.discipline === "hyrox" ? 1.02 :
          profile.discipline === "shape" ? 0.92 : 1.0;
        return clamp(tssLike * disciplineBias, 0, 320);
      })
    : new Array(points).fill(0).map((_, i) => 60 + Math.sin(i / 6) * 20);

  const adaptRaw = dailyTimeline.length ? dailyTimeline.map((d) => d.adaptationImpulse || d.stress || 0) : stressRaw.slice();
  const fatigueRaw = dailyTimeline.length ? dailyTimeline.map((d) => d.fatigueImpulse || d.stress || 0) : stressRaw.slice();

  const stressLoads = stressRaw.length === points ? stressRaw : alignNumericSeries(stressRaw, points);
  const adaptLoads = adaptRaw.length === points ? adaptRaw : alignNumericSeries(adaptRaw, points);
  const fatigueLoads = fatigueRaw.length === points ? fatigueRaw : alignNumericSeries(fatigueRaw, points);

  const avgStress = stressLoads.reduce((s, v) => s + v, 0) / Math.max(1, stressLoads.length);
  const avgAdapt = adaptLoads.reduce((s, v) => s + v, 0) / Math.max(1, adaptLoads.length);
  const avgFatigue = fatigueLoads.reduce((s, v) => s + v, 0) / Math.max(1, fatigueLoads.length);

  const seedFactor = { starter: 0.6, intermediate: 0.72, advanced: 0.84 }[profile.fitnessLevel] || 0.7;
  const positiveTau = profile.discipline === "shape" ? 22 : profile.discipline === "hyrox" ? 24 : 28;
  const negativeTau = profile.discipline === "shape" ? 4.5 : 6.5;
  const trendTau = 42;

  const alphaPos = 1 / positiveTau;
  const alphaNeg = 1 / negativeTau;
  const alphaTrend = 1 / trendTau;

  let positive = Math.max(8, avgAdapt * seedFactor);
  let negative = Math.max(8, avgFatigue * seedFactor * 0.95);
  let positiveTrend = positive;
  const positiveSeed = positive;
  const trendSeed = positiveTrend;
  let cumulativeDose = 0;

  const normPos = Math.max(20, avgAdapt * 0.55);
  const normNeg = Math.max(20, avgFatigue * 0.42);

  for (let i = 0; i < points; i += 1) {
    const t = i / Math.max(1, points - 1);
    const stress = stressLoads[i] || 0;
    const adapt = adaptLoads[i] || stress;
    const fatigueImpulse = fatigueLoads[i] || stress;

    // Banister-style dual response: positive adaptation and negative fatigue decay at different rates.
    positive += (adapt - positive) * alphaPos;
    negative += (fatigueImpulse - negative) * alphaNeg;
    positiveTrend += (positive - positiveTrend) * alphaTrend;
    cumulativeDose += Math.max(0, adapt - avgAdapt * 0.78);

    const posWave = (positive - positiveTrend) / Math.max(8, normPos * 0.9);
    const posProgress = (positiveTrend - trendSeed) / Math.max(8, normPos * 0.85);
    const doseProgress = cumulativeDose / Math.max(220, avgAdapt * points * 0.28);
    const negLevel = (negative - avgFatigue * seedFactor * 0.9) / Math.max(8, normNeg);
    const taperTail = t > 0.84 ? (t - 0.84) / 0.16 : 0;

    // Fitness should rise with repeated load, but still undulate with build/deload blocks.
    const fitness =
      clamp(
        baseFitness +
        goalBoost * 0.22 +
        posProgress * 17.5 +
        doseProgress * 9.5 +
        posWave * 2.1 -
        taperTail * 1.8,
        14,
        99
      );

    const fatigue =
      clamp(
        44 +
        negLevel * 18 +
        (fatigueImpulse > avgFatigue ? 1.6 : -0.2) -
        taperTail * 3.2,
        12,
        98
      );

    const freshness = clamp(58 + (fitness - fatigue) * 0.95, 8, 98);
    const readiness = clamp(freshness * 0.52 + fitness * 0.24 + (100 - fatigue) * 0.24, 10, 99);

    const vo2Growth = profile.fitnessLevel === "starter" ? 2.0 : profile.fitnessLevel === "intermediate" ? 1.4 : 0.9;
    const vo2 = clamp(levelBase + 0.8 + t * vo2Growth + (fitness - baseFitness) * 0.055, 30, 78);

    series.push({ fitness, fatigue, freshness, readiness, vo2, load: stress });
  }

  return series;
}

function alignNumericSeries(values, targetLength) {
  if (!Array.isArray(values) || !values.length || !targetLength) return [];
  if (values.length === targetLength) return values.slice();
  const out = [];
  for (let i = 0; i < targetLength; i += 1) {
    const idx = Math.round((i / Math.max(1, targetLength - 1)) * (values.length - 1));
    out.push(Number(values[idx]) || 0);
  }
  return out;
}

function buildEmptyChartSvg() {
  return `
    <rect x="0" y="0" width="960" height="320" fill="rgba(255,255,255,0.002)"></rect>
    ${buildChartGrid()}
    <text x="40" y="162" fill="rgba(255,255,255,0.45)" font-size="14" font-family="Inter, sans-serif">
      Verbinde und synchronisiere Strava / Garmin / WHOOP, um Live-Trends zu sehen.
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

  if (profile.discipline === "hyrox") {
    const baseMinutes = Math.max(55, Math.round(112 - capability * 0.55 - weekly * 0.12));
    const doublesLabel = profile.goalDistance === "doublespro" ? "HYROX Doubles Pro" : "HYROX Doubles";
    const doublesMinutes = profile.goalDistance === "doublespro" ? Math.max(37, baseMinutes - 19) : Math.max(40, baseMinutes - 16);
    return {
      trendDelta,
      labels: { a: "HYROX Open", b: "HYROX Pro", c: doublesLabel, d: "HYROX Relay" },
      values: {
        a: formatDurationMinutes(baseMinutes),
        b: formatDurationMinutes(Math.max(45, baseMinutes - 6)),
        c: formatDurationMinutes(doublesMinutes),
        d: formatDurationMinutes(Math.max(32, baseMinutes - 28)),
      },
    };
  }

  if (profile.discipline === "shape") {
    const currentWeight = Number(profile.weightKg) || null;
    const targetWeight = Number(profile.targetWeightKg) || null;
    const weeks = plan.weeks.length;
    const projectedDelta =
      profile.goalDistance === "fatloss"
        ? -(0.2 + capability * 0.002 + weekly * 0.003) * weeks
        : profile.goalDistance === "build"
          ? (0.12 + capability * 0.001 + weekly * 0.002) * weeks
          : profile.goalDistance === "recomp"
            ? -(0.05 + weekly * 0.001) * weeks
            : 0;
    const projectedWeight = currentWeight ? Math.max(40, currentWeight + projectedDelta) : null;
    const restingHr = Math.round(clamp(64 - capability * 0.08 - connectedSources.size * 1.2, 45, 78));
    const workCap = Math.round(clamp(45 + capability * 0.55 + weekly * 0.08, 35, 95));
    const pushups = Math.round(clamp(10 + capability * 0.35 + weekly * 0.15, 8, 70));
    return {
      trendDelta,
      labels: {
        a: currentWeight && targetWeight ? "Gewicht (proj.)" : "Body Trend",
        b: "Resting HR",
        c: "Push-ups",
        d: "Work Capacity",
      },
      values: {
        a: projectedWeight ? `${projectedWeight.toFixed(1)} kg` : profile.goalDistance === "fatloss" ? "- trend" : "+ trend",
        b: `${restingHr} bpm`,
        c: `${pushups} reps`,
        d: `${workCap}/100`,
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
  if (profile.discipline === "hyrox") {
    const runPace = secondsToPace(Math.round(320 - (last.fitness - 45) * 1.8));
    const stationPace = last.readiness >= 65 ? "Stations: race-paced" : "Stations: controlled";
    return `${runPace} / ${stationPace}`;
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

function scrollToGeneratedPlan() {
  const target = sectionCalendarEl || planMetaEl || calendarEl;
  if (!target) return;
  window.requestAnimationFrame(() => {
    const mobile = window.matchMedia?.("(max-width: 760px)")?.matches;
    const offset = mobile ? 154 : 108;
    const targetTop = Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset);
    animateWindowScrollTo(targetTop, mobile ? 820 : 760);
  });
}

function scrollToSectionStart(target, { mobileOffset = 154, desktopOffset = 108, duration = 520 } = {}) {
  if (!target) return;
  window.requestAnimationFrame(() => {
    const mobile = window.matchMedia?.("(max-width: 760px)")?.matches;
    const offset = mobile ? mobileOffset : desktopOffset;
    const targetTop = Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset);
    animateWindowScrollTo(targetTop, duration);
  });
}

function animateWindowScrollTo(targetTop, duration = 760) {
  const startY = window.scrollY || window.pageYOffset || 0;
  const distance = targetTop - startY;
  if (Math.abs(distance) < 4) return;
  if (generatedPlanScrollRaf) {
    window.cancelAnimationFrame(generatedPlanScrollRaf);
    generatedPlanScrollRaf = 0;
  }
  const startTs = performance.now();
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const step = (now) => {
    const elapsed = now - startTs;
    const progress = clamp(elapsed / duration, 0, 1);
    const eased = easeInOut(progress);
    window.scrollTo(0, startY + distance * eased);
    if (progress < 1) {
      generatedPlanScrollRaf = window.requestAnimationFrame(step);
    } else {
      generatedPlanScrollRaf = 0;
    }
  };
  generatedPlanScrollRaf = window.requestAnimationFrame(step);
}

function estimateSessionNutrition(session, profile) {
  const weight = Number(profile?.weightKg) || (profile?.sex === "female" ? 62 : 74);
  const heightCm = Number(profile?.heightCm) || (profile?.sex === "female" ? 168 : 178);
  const age = Number(profile?.age) || 34;
  const sex = profile?.sex || null;
  const bmr =
    sex === "female"
      ? 10 * weight + 6.25 * heightCm - 5 * age - 161
      : sex === "male"
        ? 10 * weight + 6.25 * heightCm - 5 * age + 5
        : 10 * weight + 6.25 * heightCm - 5 * age - 70;
  const activityFactor = profile?.discipline === "shape" ? 1.38 : 1.45;
  const tdeeBase = Math.round(bmr * activityFactor);
  const title = String(session?.title || "").toLowerCase();
  let trainingLoadKcal = 260;
  let carbPerKg = 4.0;
  let proteinPerKg = 1.7;
  let fatPerKg = 0.8;

  if (title.includes("long")) {
    trainingLoadKcal = profile?.discipline === "triathlon" || profile?.discipline === "cycling" ? 500 : 360;
    carbPerKg = 6.5;
    proteinPerKg = 1.8;
    fatPerKg = 0.8;
  } else if (title.includes("threshold")) {
    trainingLoadKcal = 330;
    carbPerKg = 5.8;
    proteinPerKg = 1.7;
    fatPerKg = 0.8;
  } else if (title.includes("vo2")) {
    trainingLoadKcal = 320;
    carbPerKg = 5.5;
    proteinPerKg = 1.8;
    fatPerKg = 0.8;
  } else if (title.includes("strength") || title.includes("carry") || title.includes("circuit") || title.includes("hyrox")) {
    trainingLoadKcal = 240;
    carbPerKg = profile?.discipline === "shape" ? 2.4 : 4.2;
    proteinPerKg = 1.9;
    fatPerKg = 0.75;
  } else if (title.includes("swim")) {
    trainingLoadKcal = 220;
    carbPerKg = 4.8;
    proteinPerKg = 1.6;
    fatPerKg = 0.85;
  } else if (session?.type === "rest") {
    trainingLoadKcal = 40;
    carbPerKg = 2.4;
    proteinPerKg = 1.8;
    fatPerKg = 0.8;
  }

  let kcalTarget = tdeeBase + trainingLoadKcal;
  if (profile?.discipline === "shape") {
    const goal = profile?.goalDistance;
    const targetWeight = Number(profile?.targetWeightKg) || null;
    const currentWeight = Number(profile?.weightKg) || null;
    const deficit = goal === "fatloss" ? 550 : goal === "recomp" ? 250 : 0;
    const surplus = goal === "build" ? 220 : 0;
    if (goal === "fatloss" || (goal === "recomp" && targetWeight && currentWeight && targetWeight <= currentWeight)) {
      kcalTarget = tdeeBase + Math.max(0, trainingLoadKcal * 0.45) - deficit;
      proteinPerKg = Math.max(proteinPerKg, 1.9);
      carbPerKg = session?.type === "rest" ? 1.8 : title.includes("long") || title.includes("threshold") ? 3.2 : 2.4;
      fatPerKg = 0.65;
    } else if (goal === "recomp") {
      kcalTarget = tdeeBase + Math.max(0, trainingLoadKcal * 0.35) - 120;
      proteinPerKg = Math.max(proteinPerKg, 1.9);
      carbPerKg = session?.type === "rest" ? 2.0 : 2.8;
      fatPerKg = 0.7;
    } else if (goal === "build") {
      kcalTarget = tdeeBase + Math.max(0, trainingLoadKcal * 0.55) + surplus;
      proteinPerKg = Math.max(proteinPerKg, 1.8);
      carbPerKg = session?.type === "rest" ? 2.8 : 3.8;
      fatPerKg = 0.8;
    } else {
      kcalTarget = tdeeBase + Math.max(0, trainingLoadKcal * 0.4) - 80;
      carbPerKg = session?.type === "rest" ? 2.2 : 2.9;
      proteinPerKg = Math.max(proteinPerKg, 1.8);
      fatPerKg = 0.72;
    }
  }

  kcalTarget = clamp(Math.round(kcalTarget), Math.round(weight * 20), Math.round(weight * 42));

  let carbsG = Math.round(weight * carbPerKg);
  let proteinG = Math.round(weight * proteinPerKg);
  let fatG = Math.round(weight * fatPerKg);

  const macroKcal = carbsG * 4 + proteinG * 4 + fatG * 9;
  if (macroKcal > kcalTarget + 120) {
    const minFatG = Math.round(weight * (profile?.discipline === "shape" && profile?.goalDistance === "fatloss" ? 0.55 : 0.6));
    const remainingForCarbs = Math.max(0, kcalTarget - proteinG * 4 - Math.max(minFatG, fatG) * 9);
    fatG = Math.max(minFatG, Math.min(fatG, Math.round((kcalTarget * 0.32) / 9)));
    carbsG = Math.max(0, Math.round((kcalTarget - proteinG * 4 - fatG * 9) / 4));
    if (carbsG * 4 + proteinG * 4 + fatG * 9 > kcalTarget + 80) {
      carbsG = Math.max(0, Math.round(remainingForCarbs / 4));
    }
  }

  return {
    kcal: kcalTarget,
    carbsG,
    proteinG,
    fatG,
  };
}

function buildSessionNutritionGuidance(session, profile, nutrition) {
  const txt = (de, en, ja) => (currentLang === "de" ? de : currentLang === "ja" ? ja : en);
  const title = String(session?.title || "").toLowerCase();
  const isRest = session?.type === "rest";
  if (profile?.discipline === "shape") {
    if (profile.goalDistance === "fatloss") {
      if (isRest) {
        return txt(
          `Protein hoch halten, Gemüse/Faser priorisieren, Kohlenhydrate heute eher niedriger. Ziel: Sättigung + Defizit halten (~${nutrition.kcal} kcal).`,
          `Keep protein high, prioritize fiber/veg, keep carbs lower today. Goal: satiety + hold the deficit (~${nutrition.kcal} kcal).`,
          `タンパク質高め、食物繊維・野菜を優先。今日は炭水化物をやや低めにして満腹感と赤字を維持（約${nutrition.kcal}kcal）。`
        );
      }
      return txt(
        `Cut-Fokus: Protein priorisieren, Kohlenhydrate um die Einheit herum einsetzen (vor/nach Training), Rest des Tages eher lean + ballaststoffreich.`,
        `Cut focus: prioritize protein, place carbs around the session (pre/post), keep the rest of the day lean and fiber-rich.`,
        `減量重視：タンパク質優先。炭水化物は練習前後に寄せ、他は脂質控えめ・食物繊維多めで整える。`
      );
    }
    if (profile.goalDistance === "recomp") {
      return txt(
        `Recomp-Fokus: Protein konstant hoch, Kohlenhydrate nach Belastung/Qualität höher, an leichten Tagen moderater. Wochenkonsistenz wichtiger als Perfektion.`,
        `Recomp focus: keep protein consistently high, raise carbs after quality sessions, keep them moderate on easy days. Weekly consistency beats perfection.`,
        `リコンプ重視：タンパク質を安定して高く。質の高い練習後は炭水化物を増やし、軽い日は控えめに。週単位の継続が重要。`
      );
    }
    if (profile.goalDistance === "build") {
      return txt(
        `Strength Build: Energieverfügbarkeit sichern, Protein + Carbs rund um Krafttage erhöhen. Defizit vermeiden, damit Leistung und Progression steigen können.`,
        `Strength build: protect energy availability, push protein + carbs around lifting days. Avoid a deficit so performance and progression can rise.`,
        `筋力構築：エネルギー不足を避け、筋トレ日周辺でタンパク質と炭水化物を増やす。赤字は避けて進歩を優先。`
      );
    }
    return txt(
      `General Fitness: ausgewogen essen, Protein täglich solide halten, Kohlenhydrate nach Belastung timen. Fokus auf Alltagstauglichkeit und Konsistenz.`,
      `General fitness: eat balanced, keep protein solid daily, time carbs after work. Focus on consistency and a sustainable routine.`,
      `一般フィットネス：バランス重視。タンパク質を毎日確保し、負荷の高い日の前後で炭水化物を調整。継続しやすさ優先。`
    );
  }

  if (title.includes("long") || title.includes("threshold") || title.includes("vo2")) {
    return txt(
      `Qualität/Lang: Kohlenhydrate priorisieren (vor/nach Einheit), Protein zur Regeneration sichern, Flüssigkeit + Elektrolyte mitdenken.`,
      `Quality/long day: prioritize carbs (pre/post), secure protein for recovery, and account for fluids + electrolytes.`,
      `質/ロング：前後で炭水化物を優先し、回復のためのタンパク質を確保。水分・電解質も忘れずに。`
    );
  }
  if (profile?.discipline === "triathlon" || profile?.discipline === "cycling") {
    return txt(
      `Ausdauerfokus: Kohlenhydrate rund um Schlüsselreize höher, Protein konstant, Fett moderat. Bei längeren Sessions Fueling gezielt üben.`,
      `Endurance focus: higher carbs around key sessions, consistent protein, moderate fat. Practice fueling intentionally on longer sessions.`,
      `持久系：重要練習の前後で炭水化物を多め、タンパク質は安定、脂質は中程度。ロングでは補給練習も実施。`
    );
  }
  return txt(
    `Heute ausgewogen: Proteinbasis sichern, Kohlenhydrate an Belastung anpassen, nicht unterfuelen. Recovery beginnt direkt nach der Einheit.`,
    `Balanced today: secure a protein base, adjust carbs to the session, and avoid underfueling. Recovery starts right after the workout.`,
    `今日はバランス重視：タンパク質を確保し、負荷に合わせて炭水化物を調整。低エネルギーにしすぎない。`
  );
}

function readinessBand(value) {
  if (value >= 78) return "hoch";
  if (value >= 60) return "solide";
  if (value >= 45) return "moderat";
  return "niedrig";
}

function recommendWeeklyHoursBand(profile) {
  const level = profile?.fitnessLevel || "starter";
  const exp = profile?.experience || "lt1";
  const discipline = profile?.discipline || "running";

  const baseByLevel =
    discipline === "shape"
      ? {
          starter: { rec: [3, 5], cap: 7 },
          intermediate: { rec: [4, 7], cap: 10 },
          advanced: { rec: [6, 10], cap: 13 },
        }
      : {
          starter: { rec: [3, 6], cap: 8 },
          intermediate: { rec: [5, 9], cap: 12 },
          advanced: { rec: [7, 12], cap: 16 },
        };

  const chosen = { ...baseByLevel[level] };
  if (exp === "lt1") {
    chosen.rec = [Math.max(2, chosen.rec[0] - 1), Math.max(chosen.rec[0], chosen.rec[1] - 1)];
    chosen.cap = Math.max(chosen.rec[1] + 1, chosen.cap - 1);
  } else if (exp === "5plus" && level !== "starter") {
    chosen.rec = [chosen.rec[0], chosen.rec[1] + 1];
    chosen.cap += 1;
  }
  return chosen;
}

function effectivePlanningHours(profile) {
  const requested = Number(profile?.weeklyHours) || 0;
  const band = profile?.weeklyHoursRecommended || recommendWeeklyHoursBand(profile);
  if (!requested) return band.rec[0];
  return clamp(requested, 2, band.cap);
}

function computeAthleteCapacity(profile) {
  const levelScore = { starter: 0, intermediate: 1, advanced: 2 }[profile?.fitnessLevel] ?? 0;
  const expScore = { lt1: 0, "1to3": 1, "3to5": 2, "5plus": 3 }[profile?.experience] ?? 0;
  const weight = Number(profile?.weightKg) || null;
  const heightCm = Number(profile?.heightCm) || null;
  const bmi = weight && heightCm ? weight / ((heightCm / 100) ** 2) : null;

  let score = levelScore * 2 + expScore;
  if (bmi && bmi >= 30) score -= 2;
  if (bmi && bmi >= 35) score -= 2;
  if (bmi && bmi >= 40) score -= 2;
  if ((Number(profile?.age) || 0) >= 50) score -= 1;
  if ((Number(profile?.age) || 0) >= 60) score -= 1;

  const tier = score <= 0 ? "low" : score <= 3 ? "moderate" : "high";
  const introWeeks = tier === "low" ? 2 : tier === "moderate" ? 1 : 1;
  const complexity = tier === "low" ? "basic" : tier === "moderate" ? "standard" : "advanced";
  return { bmi, score, tier, introWeeks, complexity };
}

function estimateBaseKm(profile) {
  const weeklyHours = effectivePlanningHours(profile);
  if (profile.discipline === "triathlon") {
    const factorByLevel = {
      starter: 3.2,
      intermediate: 4.2,
      advanced: 5.3,
    };
    const base = Math.round(weeklyHours * factorByLevel[profile.fitnessLevel] * 2.0);
    const distanceBoost =
      profile.goalDistance === "ironman" ? 10 : profile.goalDistance === "703" ? 6 : profile.goalDistance === "olympic" ? 3 : 1;
    const ageAdj = profile.age ? clamp((44 - profile.age) * 0.35, -5, 4) : 0;
    const weightAdj = profile.weightKg ? clamp((75 - profile.weightKg) * 0.12, -3, 2.5) : 0;
    return clamp(base + distanceBoost + ageAdj + weightAdj, 20, 90);
  }

  if (profile.discipline === "hyrox") {
    const factorByLevel = { starter: 3.8, intermediate: 4.9, advanced: 6.1 };
    const base = Math.round(weeklyHours * factorByLevel[profile.fitnessLevel] * 2.0);
    const goalBoost =
      profile.goalDistance === "pro" ? 7 : profile.goalDistance === "doublespro" ? 5 : profile.goalDistance === "open" ? 4 : profile.goalDistance === "doubles" ? 3 : 2;
    const ageAdj = profile.age ? clamp((40 - profile.age) * 0.2, -3, 2) : 0;
    return clamp(base + goalBoost + ageAdj, 18, 85);
  }

  if (profile.discipline === "shape") {
    const factorByLevel = { starter: 4.2, intermediate: 5.1, advanced: 6.2 };
    const base = Math.round(weeklyHours * factorByLevel[profile.fitnessLevel] * 2.0);
    const goalAdj =
      profile.goalDistance === "fatloss" ? 4 :
      profile.goalDistance === "recomp" ? 3 :
      profile.goalDistance === "build" ? 2 : 2;
    const ageAdj = profile.age ? clamp((40 - profile.age) * 0.18, -2.5, 2) : 0;
    return clamp(base + goalAdj + ageAdj, 14, 72);
  }

  if (profile.discipline === "cycling") {
    const factorByLevel = { starter: 8.5, intermediate: 11.2, advanced: 14.6 };
    const base = Math.round(weeklyHours * factorByLevel[profile.fitnessLevel]);
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
  const base = Math.round(weeklyHours * factorByLevel[profile.fitnessLevel]);
  const distanceBoost = profile.goalDistance === "marathon" ? 10 : profile.goalDistance === "half" ? 5 : profile.goalDistance === "10k" ? 2 : 0;
  const ageAdj = profile.age ? clamp((40 - profile.age) * 0.35, -6, 5) : 0;
  return clamp(base + distanceBoost + ageAdj, 18, 120);
}

function estimateHoursFromKm(profile, km) {
  if (profile.discipline === "triathlon") {
    const hours = km / 18;
    return Math.max(3, Math.round(hours * 10) / 10);
  }
  if (profile.discipline === "hyrox") {
    const hours = km / 16;
    return Math.max(3, Math.round(hours * 10) / 10);
  }
  if (profile.discipline === "shape") {
    const hours = km / 10.5;
    return Math.max(2.5, Math.round(hours * 10) / 10);
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
    const feasibility = assessGoalFeasibility(profile);
    if (feasibility.level === "unrealistic") return feasibility.message;
    if (feasibility.level === "aggressive") return feasibility.message;
    if ((profile.goalDistance === "703" || profile.goalDistance === "ironman") && baseKm < 70) {
      return "Ambitioniertes Triathlon-Ziel. Braucht saubere Belastungssteuerung über Swim/Bike/Run, Recovery und Fueling.";
    }
    return "Solider Ausgangspunkt für Triathlon. Fokus auf konsistente Wochenstruktur, Schwellensteuerung und Brick-Verträglichkeit.";
  }
  if (profile.discipline === "cycling") {
    return "Solider Ausgangspunkt fürs Rad. Fokus auf FTP-/VO2-Steuerung, Long-Ride-Verträglichkeit und progressive Belastung.";
  }
  if (profile.discipline === "hyrox") {
    const feasibility = assessGoalFeasibility(profile);
    if (feasibility.level !== "ok") return feasibility.message;
    return "Solider Ausgangspunkt für HYROX. Fokus auf Race-Pacing, Laufökonomie unter Vorermüdung und Stations-Qualität.";
  }
  if (profile.discipline === "shape") {
    const feasibility = assessGoalFeasibility(profile);
    if (feasibility.level !== "ok") return feasibility.message;
    return "Solider Ausgangspunkt für Shape. Fokus auf Kontinuität, progressive Belastung, ausreichende Recovery und passendes Kaloriendefizit/-plus.";
  }

  if (profile.goalDistance === "marathon" && profile.goalTime.startsWith("2:") && baseKm < 55) {
    return "Ambitioniertes Ziel. Möglich, aber nur mit konsequenter Progression, Recovery-Steuerung und realistischen Load-Checks.";
  }
  const feasibility = assessGoalFeasibility(profile);
  if (feasibility.level !== "ok") return feasibility.message;
  if (profile.fitnessLevel === "starter") {
    return "Guter Startpunkt. Priorität auf Kontinuität, Technik, Belastungsverträglichkeit und schrittweiser Umfangssteigerung.";
  }
  return "Solider Ausgangspunkt. Fokus auf Schwellenarbeit, saubere Steuerung der Intensität und progressive Wochenstruktur.";
}

function assessGoalFeasibility(profile) {
  const weeksToRace = profile?.raceDate ? Math.max(1, Math.ceil((startOfDay(profile.raceDate) - startOfDay(new Date())) / 86400000 / 7)) : 12;
  const weeklyHours = Number(profile?.weeklyHours) || 0;
  const level = profile?.fitnessLevel || "starter";
  const goalSeconds = parseGoalTimeToSeconds(profile?.goalTime);

  if (profile.discipline === "triathlon") {
    if (profile.goalDistance === "ironman") {
      if (weeklyHours < 7 || weeksToRace < 16) {
        return { level: "unrealistic", message: "Unrealistisch für Ironman in dieser Zeit/mit diesem Umfang. Mehr Vorlauf (oft 20-30 Wochen) oder Ziel anpassen." };
      }
      if (goalSeconds && goalSeconds < 10 * 3600 && (weeklyHours < 10 || level === "starter")) {
        return { level: "unrealistic", message: "Sub-10 Ironman ist mit aktuellem Umfang/Level sehr wahrscheinlich unrealistisch. Zielzeit oder Aufbauzeit erhöhen." };
      }
      if (goalSeconds && goalSeconds < 11 * 3600 && (weeklyHours < 8 || level === "starter")) {
        return { level: "aggressive", message: "Sehr ambitioniertes Ironman-Ziel. Realistisch nur mit sauberem Aufbau, konstantem Training und guter Recovery/Fueling-Disziplin." };
      }
    }
    if (profile.goalDistance === "703") {
      if (weeklyHours < 5 || weeksToRace < 10) {
        return { level: "aggressive", message: "70.3 mit wenig Vorlauf/Umfang ist ambitioniert. Zielzeit konservativ wählen und Progression eng steuern." };
      }
      if (goalSeconds && goalSeconds < 5 * 3600 && (weeklyHours < 7 || level === "starter")) {
        return { level: "aggressive", message: "Sub-5h auf 70.3 ist mit aktuellem Umfang/Level sehr ambitioniert. Möglich nur mit starkem Ausgangsniveau." };
      }
    }
    return { level: "ok", message: "" };
  }

  if (profile.discipline === "hyrox") {
    if (weeklyHours < 3 || weeksToRace < 6) {
      return { level: "aggressive", message: "HYROX-Ziel mit wenig Vorlauf/Umfang ist ambitioniert. Technik, Pacing und Belastungsverträglichkeit priorisieren." };
    }
    if (profile.goalDistance === "pro" && (weeklyHours < 5 || level === "starter")) {
      return { level: "aggressive", message: "HYROX Pro ist mit aktuellem Umfang/Level sehr ambitioniert. Open/Doubles oder längerer Aufbau wäre realistischer." };
    }
    if (profile.goalDistance === "doublespro" && (weeklyHours < 4 || level === "starter")) {
      return { level: "aggressive", message: "HYROX Doubles Pro ist mit aktuellem Umfang/Level ambitioniert. Doubles/Open oder mehr Aufbauzeit wäre oft sinnvoller." };
    }
    return { level: "ok", message: "" };
  }

  if (profile.discipline === "shape") {
    const currentWeight = Number(profile.weightKg) || null;
    const targetWeight = Number(profile.targetWeightKg) || null;
    if ((Number(profile.weeklyHours) || 0) > (recommendWeeklyHoursBand(profile).cap + 1) && level === "starter") {
      return { level: "aggressive", message: "Für dein Profil sind die gewählten Wochenstunden hoch. Für bessere Konstanz und Motivation lieber mit weniger Stunden starten." };
    }
    if (currentWeight && targetWeight && weeksToRace >= 2) {
      const delta = targetWeight - currentWeight;
      const kgPerWeek = delta / weeksToRace;
      if (delta < 0 && Math.abs(kgPerWeek) > 1.0) {
        return { level: "unrealistic", message: "Sehr schnelle Gewichtsabnahme geplant. Nachhaltiger sind meist ca. 0.25-0.75 kg pro Woche (individuell)." };
      }
      if (delta > 0 && kgPerWeek > 0.5 && profile.goalDistance !== "build") {
        return { level: "aggressive", message: "Schneller Aufbau geplant. Achte auf progressive Kraftreize und realistische Gewichtszunahme pro Woche." };
      }
    }
    return { level: "ok", message: "" };
  }

  if (profile.discipline === "running" && profile.goalDistance === "marathon") {
    if (goalSeconds && goalSeconds < 3 * 3600 && (weeklyHours < 8 || weeksToRace < 14 || level !== "advanced")) {
      return { level: "unrealistic", message: "Sub-3 Marathon ist mit aktuellem Umfang/Zeithorizont sehr wahrscheinlich unrealistisch. Mehr Wochen oder konservativere Zielzeit einplanen." };
    }
  }

  return { level: "ok", message: "" };
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
    open: "HYROX Open",
    pro: "HYROX Pro",
    doubles: "HYROX Doubles",
    doublespro: "HYROX Doubles Pro",
    relay: "HYROX Relay",
    fatloss: "Lean Cut",
    recomp: "Body Recomp",
    build: "Strength Build",
    fitness: "General Fitness",
  }[value];
}

function sexLabel(value) {
  return {
    female: "Female",
    male: "Male",
  }[value] || value;
}

function goalSpecificBoost(profile) {
  if (profile.discipline === "triathlon") {
    return profile.goalDistance === "ironman" ? 5 : profile.goalDistance === "703" ? 3 : profile.goalDistance === "olympic" ? 1.8 : 0.8;
  }
  if (profile.discipline === "cycling") {
    return profile.goalDistance === "century" ? 4.5 : profile.goalDistance === "granfondo" ? 3 : profile.goalDistance === "tt40" ? 2 : 1;
  }
  if (profile.discipline === "hyrox") {
    return profile.goalDistance === "pro" ? 3.5 : profile.goalDistance === "doublespro" ? 2.9 : profile.goalDistance === "open" ? 2.4 : profile.goalDistance === "doubles" ? 2.1 : 1.6;
  }
  if (profile.discipline === "shape") {
    return profile.goalDistance === "fatloss" ? 2.2 : profile.goalDistance === "recomp" ? 2.0 : profile.goalDistance === "build" ? 2.4 : 1.8;
  }
  return profile.goalDistance === "marathon" ? 4 : profile.goalDistance === "half" ? 2 : 0.8;
}

function disciplineLabel(value) {
  return {
    running: "Laufen",
    triathlon: "Triathlon",
    cycling: "Rad",
    hyrox: "Hyrox",
    shape: "Shape",
  }[value] || "Training";
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

function round1(value) {
  return Math.round(Number(value) * 10) / 10;
}

function parseGoalTimeToSeconds(value) {
  const parts = String(value || "")
    .trim()
    .split(":")
    .map((v) => Number(v));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;
  const [h, m, s] = parts;
  return h * 3600 + m * 60 + s;
}

function formatHourRange(minHours, maxHours) {
  const fmt = (h) => {
    const mins = Math.round(h * 60);
    const hh = Math.floor(mins / 60);
    const mm = mins % 60;
    return `${hh}:${String(mm).padStart(2, "0")}`;
  };
  return `${fmt(minHours)}-${fmt(maxHours)}`;
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

  if (brandAnchorEl) {
    brandAnchorEl.style.setProperty("--brand-shift", "0");
    brandAnchorEl.style.setProperty("--brand-opacity", "1");
  }

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const mobileViewport = window.matchMedia?.("(max-width: 760px)")?.matches;
  if (mobileViewport) {
    document.documentElement.style.setProperty("--mobile-account-bar-top", "102px");
    document.documentElement.style.setProperty("--global-header-mask-height", "148px");
    document.documentElement.style.setProperty("--global-header-line-top", "136px");
    return;
  }
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
      brandAnchorEl.style.setProperty("--brand-shift", "0");
      brandAnchorEl.style.setProperty("--brand-opacity", "1");
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

function initMobileHeaderScrollFx() {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  let raf = 0;
  const root = document.documentElement;

  const update = () => {
    raf = 0;
    const y = window.scrollY || window.pageYOffset || 0;
    const startTop = 102;
    const minTop = 70;
    const travel = startTop - minTop;
    const progress = reduceMotion ? 1 : clamp(y / 72, 0, 1);
    const top = startTop - travel * progress;
    root.style.setProperty("--mobile-account-bar-top", `${top.toFixed(1)}px`);
    const maskHeight = Math.round(top + 44);
    root.style.setProperty("--mobile-header-mask-height", `${maskHeight}px`);
  };

  const queue = () => {
    if (raf) return;
    raf = window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);
  queue();
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
