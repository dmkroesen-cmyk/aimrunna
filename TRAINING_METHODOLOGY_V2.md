# AImRUNNA — Trainingsmethodik V2 (Synthese: State-of-the-Art × Bestehende Engine)

**Status:** Konsolidierte finale Philosophie nach Review der 2024–2026 Literatur gegen die bestehende Plan-Engine.
**Letzte Aktualisierung:** 2026-04-05
**Ersetzt:** TRAINING_METHODOLOGY.md (v1)

---

## 0. Kernprinzip

Jeder Plan ist ein **adaptives, geführtes System** aus fünf Schichten. Fehlt eine Schicht, ist der Plan nicht state-of-the-art:

1. **Load-Layer** — CTL/ATL/TSB + ACWR + Monotonie/Strain
2. **Periodisierungs-Layer** — Phasen, Blöcke, Mikrozyklen
3. **Session-Layer** — physiologisch präzise Einheiten mit Laktat/HR/Pace-Prescription
4. **Autoregulations-Layer** — HRV/RHR/Sleep-gestützte Anpassung jede Session
5. **Execution-Layer** — Race-Day, Nutrition, Taper, Recovery

---

## 1. Load-Layer (das Fundament)

### 1.1 Pflicht-Metriken (State-of-the-Art)

| Metrik | Formel | Zeitkonstante | Zweck |
|---|---|---|---|
| **CTL** (Fitness) | EMA(TSS/Tag) | τ = 42 d | chronische Kapazität |
| **ATL** (Fatigue) | EMA(TSS/Tag) | τ = 7 d | akute Ermüdung |
| **TSB** (Form) | CTL − ATL | — | Frische, Taper-Gate |
| **ACWR** | Acute / Chronic | 7 d ÷ 28 d | Verletzungs-Gate |
| **Monotony** | Mittelwert ÷ SD Wochenlast | 7 d | Variabilität |
| **Strain** | Monotony × Wochenlast | 7 d | Gesamtbeanspruchung |
| **TSS-Session** | sRPE × Dauer / 100 | pro Session | internal Load |

**Grenzwerte (Konsens 2024):**
- ACWR **0.8–1.3** = sicher; > 1.5 = 2× höheres Verletzungsrisiko (Gabbett 2016)
- TSB **> +5** = frisch, **< −20** = überlastet, **−30** = rote Zone
- Monotony **< 1.5** gut, **> 2.0** Warnung (Foster 1998)
- CTL-Ramp **≤ 5–7 TSS/Woche**

**Kritik 2024:** ACWR allein ist unzureichend (Impellizzeri 2020). Immer in Kombination mit TSB & Monotony nutzen.

### 1.2 Status in AImRUNNA

| Komponente | Bestand | Gap |
|---|---|---|
| CTL/ATL/TSB | ✅ **Jetzt implementiert** (Belastung-Tab) | — |
| ACWR | ✅ Dashboard + Belastung-Tab | — |
| Monotony/Strain | ✅ **Jetzt implementiert** | in Plan-Engine noch nicht enforced |
| TSS pro Session | ⚠️ sRPE-Heuristik via Dauer×HR | kein strukturiertes sRPE-Tagging |
| Bannister Dose-Response | ❌ | Parameter-Fit künftig |

---

## 2. Periodisierungs-Layer

### 2.1 Makro: Phasen

| Phase | Anteil | Fokus | Z1 / Z2 / Z3 |
|---|---|---|---|
| **Onboarding** | 1–4 Wochen (nur Starter) | Gewöhnung, Form | 95 / 5 / 0 |
| **Base** | 40–60 % | Aerobe Kapazität, Grundlage | 85–90 / 5–10 / 0–5 |
| **Build** | 25–35 % | VO2max, Schwelle | 75–80 / 10–15 / 8–12 |
| **Peak/Specific** | 10–20 % | Race-Spezifik | 75–80 / 5–10 / 12–18 |
| **Taper** | 1–3 Wochen | Entladung | 70–80 / 10 / 10–15 |

### 2.2 Meso: Block vs. Undulating

- **Block (Issurin)** — Accumulation (aerob, Kraft) → Transmutation (VO2max) → Realization (Race-Spezifik). Residual-Effekte nutzen: aerob ~30 d, max Strength ~30 d, glycolytisch ~18 d, speed ~5 d.
- **Undulating (DeWeese 2015+)** — Intensität variiert täglich, nicht wöchentlich. Besser für Amateure mit ≤ 5 Sessions/Woche.

**Entscheidungsregel:**
- < 5 Sessions/Wo → Undulating
- 5–9 Sessions/Wo → Block mit undulating innerhalb
- 10+ Sessions/Wo → Reinblock (Elite)

### 2.3 Mikro: Deload-Kadenz

- Starter: 3 Wochen Load + 1 Woche Deload (−35–45 % Volumen)
- Intermediate: 3 Wochen Load + 1 Woche Deload (−30–40 %)
- Advanced: 2–3 Wochen Load + 1 Woche Deload (Flexibel nach TSB)

**Deload-Regel:** Intensität ERHALTEN, Volumen senken. Kein passiver Rest.

### 2.4 Gap-Check AImRUNNA

✅ Phasen-System vorhanden (Onboarding→Base→Build→Peak→Taper)
✅ Deload-Cadence per Level
⚠️ Block vs. Undulating Entscheidung nicht explizit modelliert
❌ Residual-Training-Effects (Issurin) nicht in Block-Übergängen berücksichtigt

---

## 3. Session-Layer — Finale Einheiten-Library

**Prinzip:** Jede Session hat:
1. Präzise Intensität (HR-Zone + Pace/Power + Laktat wenn möglich)
2. Strukturierte Hauptphase
3. Klarer physiologischer Zweck
4. TSS-Schätzung
5. Recovery-Bedarf in Stunden

### 3.1 Aerobe Grundlagen (Z1)

#### Recovery Run / Easy Run
- **Dauer:** 30–60 min
- **HR:** 60–70 % HRmax (50–65 % HRR)
- **Laktat:** < 1.5 mmol/L
- **Struktur:** Dauerlauf, Nasenatmung möglich
- **Zweck:** Blutfluss, aerobe Enzyme, Regeneration
- **TSS:** 35–60

#### Long Run / Long Ride
- **Dauer:** 75–180 min (Run) / 2–6 h (Bike)
- **HR:** 65–78 % HRmax (60–72 % HRR)
- **Laktat:** 1.0–2.0 mmol/L
- **Struktur:** Kontinuierlich ODER 3-Phasen-Progression (Easy→Steady→Easy)
- **Zweck:** Mitochondriale Dichte, Glykogen-Ökonomie, Laufökonomie
- **TSS:** 80–180
- **Modern (Progressive):** Letztes Drittel @ MP − 10 s/km (für Marathoner)

#### Strides / Neuromuscular
- **Struktur:** 6–10 × 80–100 m @ 3K–5K Pace, gehen zurück
- **HR:** nicht maßgeblich (zu kurz)
- **Zweck:** Neuromuskuläre Aktivierung, Ökonomie, kein Lactate-Aufbau
- **Einbau:** Ende jedes Easy Runs 2–3×/Woche
- **TSS:** +5

### 3.2 Schwellen-Arbeit (Z2 — kritisch für Ausdauer)

#### **Norwegian Single Threshold** (Ingebrigtsen-Modell)
- **Struktur:** 5 × 6 min @ LT2, 60–90 s Pause
- **HR:** 88–92 % HRmax
- **Laktat:** 3.0–4.0 mmol/L (gemessen nach Rep 3)
- **Pace:** ~95–98 % vLT2 (nie schneller als LT2!)
- **Zweck:** Laktat-Clearance, MLSS-Kapazität
- **TSS:** 75–90
- **Recovery:** 24 h
- **Amateur-Adaption:** 4–5 × 6 min, RPE 8/10 ("komfortabel hart")

#### **Norwegian Double Threshold** (nur Advanced, ≥ 60 km/Wo)
- **AM Session:** 5 × 6 min @ LT1 (2.0–2.5 mmol), HR 82–85 %
- **PM Session:** 5 × 6 min @ LT2 (3.0–3.5 mmol), HR 88–92 %
- **Pause:** 6–8 h zwischen Sessions
- **Zweck:** Doppelte Schwellen-Reize ohne Burnout
- **TSS:** Summe 160–180
- **Recovery:** 48 h (keine Quality day after)

#### **Cruise Intervals** (Tinman-Style)
- **Struktur:** 3–5 × 1 km (oder 5 min) @ 90–95 % Threshold, 60 s Trab
- **HR:** 85–90 % HRmax
- **Pace:** Marathon−HM Pace
- **TSS:** 60–80

#### **Sub-Threshold / Sweet Spot** (Rad)
- **Struktur:** 2–3 × 15–25 min @ 88–94 % FTP, 5 min Pause
- **HR:** 85–88 % HRmax
- **Zweck:** Threshold-Power ohne hohe neuromuskuläre Kosten
- **TSS:** 90–130

#### **Tempo Continuous**
- **Struktur:** 20–45 min kontinuierlich @ MP (Marathonläufer) oder HM Pace
- **HR:** 82–86 % HRmax
- **Laktat:** 2.5–3.0 mmol/L
- **TSS:** 55–85

### 3.3 VO2max (Z3 — sparsam dosiert)

#### **Billat 30/30**
- **Struktur:** 15–20 × 30 s @ vVO2max / 30 s Trab (4–10 min WU+CD)
- **HR:** 90–95 % HRmax (Lauf bleibt unter HRmax)
- **Zweck:** VO2max-Belastung bei kurzer Exposition, hohe Vol.
- **TSS:** 65–85

#### **Billat 3/3 (klassisch)**
- **Struktur:** 5 × 3 min @ vVO2max / 3 min Trab
- **HR:** 95–100 % HRmax in Rep 3+
- **Zweck:** VO2max-Tiefe
- **TSS:** 85–100

#### **4 × 4 min (Norwegian / Wisløff)**
- **Struktur:** 4 × 4 min @ 90–95 % HRmax / 3 min aktive Pause @ 60–70 % HRmax
- **Laktat:** 6–10 mmol/L
- **Zweck:** größter Nachweis für VO2max-Gewinn, auch bei Amateuren
- **TSS:** 85–105

#### **Viana 115 %** (kurze Hochintensität)
- **Struktur:** 8–12 × 60 s @ 115 % vVO2max / 60 s Trab
- **TSS:** 70–90

#### **Over-Under Threshold** (Lindsay)
- **Struktur:** 3–5 × [3 min @ 95 % FTP + 2 min @ 105 % FTP] ohne Pause, 5 min Trab zwischen Sets
- **Zweck:** Laktat-Clearance unter Druck (Race-Simulation)
- **TSS:** 90–110

### 3.4 Race-Spezifische Sessions

#### **Race Simulation** (Peak-Phase)
- **Struktur:** 60–80 % Race-Distanz @ Race Pace
- **TSS:** 70–95 % eines Race-TSS
- **Timing:** 2–3 Wochen vor Race

#### **Compromised Running / Brick** (HYROX/Triathlon)
- **Struktur:** Run → Station/Bike → Run (ohne Pause)
- **Beispiel HYROX:** 1 km @ Race Pace → 50 Wall Balls → 1 km @ Race Pace → 8 × Shuttle
- **Zweck:** Übergangs-Fatigue, Technik unter Belastung

#### **Progression Long Run**
- **Struktur:** 70 min Easy + 20 min MP + 10 min HM Pace
- **HR:** rampelig 68 → 82 → 87 %
- **TSS:** 110–140

### 3.5 Neuromuskulär & Kraft

#### **Hill Sprints (kurz)**
- **Struktur:** 8–12 × 10 s Sprint bergauf (6–8 % Steigung), vollständige Pause 2–3 min
- **Zweck:** Kraft-Output, VO2max-Rekrutierung, ohne Laktat
- **TSS:** 25–40

#### **Hill Reps (lang)**
- **Struktur:** 6 × 2 min bergauf @ 5K Effort, Jog down
- **Zweck:** Beinkraft + VO2max-Aufbau
- **TSS:** 55–75

#### **Plyometrics (Verkhoshansky-Style)**
- **Struktur:** 40–80 Bodenkontakte (Box Jumps, Bounds, Depth Jumps)
- **Pause:** vollständig (2–3 min)
- **Zweck:** elastische Energie, Sehnensteifigkeit
- **Einbau:** 1×/Woche, nicht vor Quality
- **Recovery:** 48 h

#### **Heavy Resistance Training** (Rønnestad 2011)
- **Struktur:** 4 Sets × 3–6 Reps @ 80–90 % 1RM, Squats/Deadlifts/HipThrust
- **Zweck:** maximale Kraft, Laufökonomie
- **Einbau:** 2×/Woche in Base, 1×/Woche in Build
- **Recovery:** 48 h zu Quality

#### **Explosive/Power Training** (Beattie 2017)
- **Struktur:** 3 Sets × 4–6 Reps @ 40–60 % 1RM explosive
- **Zweck:** Rate of Force Development
- **Einbau:** Build/Peak

### 3.6 Fartlek

#### **Strukturiert**
- **Struktur:** 10 min WU + 5 × [3 min hart + 2 min easy] + 5 min CD
- **TSS:** 60–75

#### **Unstrukturiert (Malmö-Fartlek)**
- **Struktur:** 40 min Spielform (Laternen-Sprints, Segmente)
- **Zweck:** Kopffrei, Abwechslung
- **TSS:** 50–70

---

## 4. Autoregulations-Layer (NEU für AImRUNNA)

### 4.1 HRV-guided Gates

| HRV Trend (7d) | Aktion |
|---|---|
| im Normbereich | Plan wie vorgesehen |
| −1 SD | Quality-Intensität leicht reduzieren (RPE cap statt exact pace) |
| −1 bis −2 SD | Quality → Easy downgrade |
| < −2 SD | Rest / Recovery only |

**Quellen:** Vesterinen 2016, Düking 2021.

### 4.2 Readiness-Composite

```
Readiness = 0.30·HRV + 0.25·Sleep + 0.20·RHR + 0.15·Subjective + 0.10·CTL-Trend
```

**Gates:**
- Readiness < 50 → Quality-Session auf nächsten Tag verschieben
- Readiness < 30 → Rest enforced

### 4.3 Session-RPE Post-Feedback

Nach jeder Session: `1–10` Borg-CR10 Skala erfassen.
Wenn sRPE × Dauer > geplanter TSS × 1.3 → ATL-Spike flag, nächste Session down-regulate.

### 4.4 Status in AImRUNNA

| Komponente | Bestand | Gap |
|---|---|---|
| HRV-Input | ✅ optional | kein automatisches Session-Gating |
| Sleep-Input | ✅ | — |
| RHR-Trend | ✅ | — |
| Subjective (Wellness) | ❌ | Hooper/McLean Fragebogen nachrüsten |
| Session-sRPE post | ❌ | **wichtigste Lücke** |

---

## 5. Execution-Layer

### 5.1 Taper (Mujika-Framework)

| Event | Dauer | Volumen−% | Intensität | Frequenz |
|---|---|---|---|---|
| 5K–10K | 7–10 d | 40–50 % | erhalten | −10 % |
| HM | 10–14 d | 50–60 % | erhalten | −15 % |
| Marathon | 14–21 d | 50–60 % | erhalten | −20 % |
| HYROX | 10–14 d | 50 % | erhalten | −10 % |
| 70.3 | 14–21 d | 50–60 % | erhalten | −20 % |
| Ironman | 21–28 d | 50–60 % | erhalten | −25 % |

**Taper-Typen:**
- **Step-Taper:** abrupte Reduktion (einfachste, weniger effektiv)
- **Progressive-Taper:** linear abnehmend (Standard)
- **Exponential-Taper:** −30 % / Woche (erwachsen, am effektivsten bei Top-Form)

### 5.2 Concurrent Training Spacing

**Minimale Abstände:**
- Heavy Lower + Long Run: **keine Kombination am selben Tag** (Amateure)
- Heavy Lower + Quality Run: ≥ 6 h, Heavy zuerst
- Upper Body Lift + Endurance: gleichzeitig OK

### 5.3 Heat-Acclimation

- **Protokoll:** 60 min @ 33–35 °C, 90 % RH, täglich 10–14 Tage
- **Zweck:** Plasma-Volumen +10–15 %, Sweat Rate-Optimierung
- **Timing:** 14 Tage vor Race in Hitze

### 5.4 Menstruationszyklus-Periodisierung

- **Follikuläre Phase** (Tag 1–14): Hochintensität, Kraft
- **Ovulation** (Tag 14): Höchste Performance
- **Lutealphase** (Tag 15–28): reduzierte Hitzetoleranz, höhere Kernkörpertemperatur, tendentiell mehr Z1/Z2

**Quelle:** McNulty 2020 Meta-Analyse — Effekt ist individuell, kein Dogma.

---

## 6. Plan-Engine Enforcement Checklist V2

**10-Regeln** die in jedem generierten Plan durchgesetzt werden müssen:

| # | Regel | Bestand | Action |
|---|---|---|---|
| R1 | Intensitätsverteilung ± 5 % vom Template (POL/PYR/THR) | ⚠️ Soft | enforce beim Session-Swap |
| R2 | ≤ 3 Z3-Tage/Wo, nie konsekutiv (48 h Gate) | ⚠️ Text-only | **enforce in Scheduler** |
| R3 | ACWR projiziert in 0.8–1.3 | ❌ | **nachrüsten** |
| R4 | Volumen-Ramp ≤ 10 %/Wo (Gabbett) | ✅ | — |
| R5 | Deload alle 3.–4. Woche (−30 bis −50 %) | ✅ | — |
| R6 | Concurrent: kein Heavy-Lower+Long-Run | ⚠️ Text | **in Scheduler verbieten** |
| R7 | Taper auto-gen nach Event-Distanz | ✅ | — |
| R8 | Starter: Z3 erst ab Woche 9+, nur Strides in 1–8 | ❌ | **enforce** |
| R9 | HYROX: ≥ 1 compromised + Station-Work/Wo | ⚠️ | enforce im Template |
| R10 | Bike: ≤ 6 h/Wo → Sweet Spot, > 10 h/Wo → POL | ⚠️ | enforce |
| **R11** NEU | Monotony < 2.0 wöchentlich | ❌ | **nachrüsten** |
| **R12** NEU | sRPE-Tracking post-session | ❌ | **nachrüsten** |
| **R13** NEU | HRV-Gate vor Quality-Session | ❌ | **nachrüsten** |

---

## 7. Implementation-Roadmap (aus Synthese abgeleitet)

### Phase 1 — Load-Layer vervollständigen **(heute begonnen)**
- ✅ CTL/ATL/TSB-Berechnung + Chart (Belastung-Tab)
- ✅ Monotony/Strain-Chart
- ✅ Intensity-Timeline-Chart
- ✅ Hard/Easy-Rhythmus-Heatmap
- ⬜ TSS-Score pro geplanter Session (im Plan-Output)

### Phase 2 — Session-Library erweitern
- ⬜ Norwegian Double-Threshold als eigener Session-Typ
- ⬜ Over-Under Intervals
- ⬜ Progression Long Run
- ⬜ Hill Sprints 10s (separat von Hill Reps 2min)
- ⬜ Plyometrics-Block
- ⬜ Strukturierte vs. unstrukturierte Fartlek
- ⬜ Billat 30/30 & 3/3

### Phase 3 — Autoregulation & Gates
- ⬜ Session-sRPE Post-Feedback-Modal
- ⬜ HRV-Gate vor Quality-Sessions (Downgrade-Logik)
- ⬜ Readiness-Composite-Score
- ⬜ Wellness-Questionnaire (Hooper 4-Item)

### Phase 4 — Scheduler-Enforcement
- ⬜ ACWR-Projektion & Block-Rebuild bei > 1.3
- ⬜ 48h-Regel als Hard-Constraint
- ⬜ Starter-Z3-Lockout in Woche 1–8
- ⬜ Concurrent-Spacing-Verbot im Day-Scheduler

### Phase 5 — Personalisierung
- ⬜ Residual-Effects Block-Modell (Issurin)
- ⬜ Menstrual-Cycle-Anpassung auto
- ⬜ Heat-Acclimation-Block (Travel-Event)
- ⬜ Masters-Anpassungen (> 50 Jahre)

---

## 8. Key References

- Seiler, S. (2010). *IJSPP* 5(3):276–291 — Intensity Distribution.
- Casado, A. et al. (2022, 2023). *IJSPP, Sports Med* — LGTIT, Norwegian.
- Haugen, T. et al. (2022). *Sports Med Open* — world-class distance runners.
- Rosenblat, M.A. et al. (2022, 2024). *Sports Medicine* — POL vs PYR IPD-NMA.
- Issurin, V.B. (2010). *Sports Med* 40(3):189–206 — Block Periodization.
- Gabbett, T.J. (2016, 2020). *BJSM* — ACWR & training-injury paradox.
- Impellizzeri, F.M. et al. (2020). *Sports Med* — ACWR Kritik.
- Mujika, I. & Padilla, S. (2003). *MSSE* 35(7):1182–1187 — Taper.
- Bosquet, L. et al. (2007). *MSSE* 39(8):1358–1365 — Taper-Meta.
- Foster, C. (1998). *MSSE* — sRPE, Monotony, Strain.
- Bannister, E. (1991) — Fitness-Fatigue Model.
- Coggan, A. — TSS, IF, CTL/ATL/TSB Framework.
- Wilson, J.M. et al. (2012). *JSCR* 26(8):2293–2307 — Concurrent Training.
- Rønnestad, B.R. et al. (2011, 2020). Heavy Strength + Endurance.
- Beattie, K. et al. (2017). Explosive Strength.
- Wisløff, U. (2007, 2017). 4×4 HIIT protocol.
- Billat, V. (2001, 2013). Interval training classification.
- Düking, P. et al. (2021). HRV-guided Training Meta.
- Vesterinen, V. (2016). HRV-guided endurance.
- McNulty, K. et al. (2020). Menstrual cycle meta-analysis.
- Lepers, R. (2018). Masters athletes physiology.

---

*Diese Methodik ist die verbindliche Grundlage für alle Plan-Generierungs-, Session-Design-, Load-Management- und Autoregulations-Entscheidungen in AImRUNNA.*
