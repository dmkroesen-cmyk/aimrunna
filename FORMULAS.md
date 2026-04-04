# AImRUNNA — Calculation Formulas & Sources

Internal reference log. All formulas backed by peer-reviewed literature or
established sports-science practice. **Not shown in-app**; this is for
engineering, calibration, and audit only.

Last updated: 2026-04-05

---

## 1. Max Heart Rate (HRmax)

| Tier | Method | Formula | Source |
|------|--------|---------|--------|
| 1 | Measured (activities) | 95th-percentile peak over last 90d, top-3 average | — |
| 2 | Tanaka 2001 | `208 − 0.7 × age` | Tanaka, Monahan, Seals. *JACC* 37(1):153-156, 2001. Meta-analysis n=18,712. SEE ±10 bpm. |
| 3 | Nes 2013 (HUNT3) | `211 − 0.64 × age` | Nes et al. *Scand J Med Sci Sports* 23(6):697-704, 2013. n=3,320, active adults. |
| 4 | Gellish 2007 | `206.9 − 0.67 × age` | Gellish et al. *Med Sci Sports Exerc* 39(5):822-9, 2007. |

**Implementation:** tier-1 if available AND age-plausible (within ±15 bpm of Tanaka), else tier-2.

---

## 2. Resting Heart Rate (RHR)

| Tier | Method | Notes |
|------|--------|-------|
| 1 | User profile input | Manually entered in settings |
| 2 | Device overnight minimum | Lowest 5-min rolling mean during sleep |
| 3 | Activity-start floor | min(easy-HR samples) − 20 bpm |
| — | Default fallback | 65 (male) / 70 (female) |

Target ranges: Athletes 40-55; trained 55-65; general 60-75; sedentary 70-85.

---

## 3. VO2max

| Tier | Method | Formula | Source |
|------|--------|---------|--------|
| 1 | Daniels VDOT | VO2 demand / fraction at race duration | Daniels, *Daniels' Running Formula*, 3rd ed. Human Kinetics, 2013. |
| 2 | Uth-Sørensen-Overgaard | `15.3 × (HRmax / HRrest)` | Uth, Sørensen, Overgaard. *Eur J Appl Physiol* 91:111-115, 2004. SEE ~2.7 ml/kg/min, n=46. |
| 3 | Hawley-Noakes (cycling) | `10.8 × (W/kg at FTP) + 7` | Hawley & Noakes. *Eur J Appl Physiol* 65:79-83, 1992. |
| 4 | Firstbeat submax | VO2submax × HRR-ratio extrapolation | Firstbeat Technologies white paper, 2017. MAPE ~5%, n=79, 2690 runs. |
| 5 | Level fallback | starter 32 / intermediate 42 / advanced 55 | — |

### Daniels VDOT formulas
```
VO2_demand(v) = -4.60 + 0.182258·v + 0.000104·v²       (v in m/min)
F(t) = 0.8 + 0.1894393·e^(-0.012778·t) + 0.2989558·e^(-0.1932605·t)   (t in min)
VDOT = VO2_demand / F
```

Best distances for estimation: 5K (most reliable), 10K, half, marathon.

**Reference norms (ml/kg/min):**
| Age | Male avg | Male excellent | Female avg | Female excellent |
|-----|----------|----------------|------------|------------------|
| 20-29 | 44-50 | >55 | 37-41 | >48 |
| 30-39 | 40-45 | >52 | 34-38 | >45 |
| 40-49 | 36-41 | >49 | 31-35 | >42 |
| 50-59 | 32-37 | >45 | 28-33 | >38 |

---

## 4. Functional Threshold Power (FTP, cycling)

| Tier | Method | Formula |
|------|--------|---------|
| 1 | 20-min test | `best20minPower × 0.95` (Coggan) |
| 2 | 8-min test | `best8minPower × 0.90` |
| 3 | Ramp test | `last1minPower × 0.75` |
| 4 | Long-ride proxy | `bestAvgPower(>45min) × 0.98` |
| 5 | From VO2max | `(VO2max − 7) / 10.8 × weightKg` |

Source: Allen & Coggan, *Training and Racing with a Power Meter*, 3rd ed. VeloPress, 2019.

---

## 5. Lactate Threshold (Running)

### Threshold pace (Daniels T-pace)
Run at ~88% VO2max / ~92% HRmax. Solve Daniels VO2 equation for velocity:

```
VO2_threshold = 0.88 × VDOT
v_threshold = solve(VO2_demand(v) = VO2_threshold)   [quadratic]
pace_per_km = 1000 / (v_threshold / 60)
```

### From activities
`thresholdPace ≈ bestPace_longRun(>20min) × 1.05`

### LTHR (Lactate Threshold HR)
- `LTHR ≈ 0.88 × HRmax` (range 85-92% HRmax)
- Karvonen form: `LTHR ≈ HRrest + 0.85 × HRR`
- Field test (Friel): average HR of last 20 min of a 30-min TT

---

## 6. FatMax (Maximum Fat Oxidation Zone)

| Parameter | Value | Source |
|-----------|-------|--------|
| % VO2max | 63% (range 55-72%) | Achten & Jeukendrup. *Int J Sports Med* 24:603-608, 2003. |
| % HRmax | 65% (range 60-70%) | ibid. |
| HR range | `0.60 × HRmax … 0.70 × HRmax` | ibid. |
| FatMax pace | Solve `VO2(v) = 0.63 × VO2max` | Inverse of Daniels VO2 demand eq |
| FatMax power | `0.60 × FTP` | — |
| MFO (untrained) | `0.01 × FFM + 0.03` g/min | Frontiers in Physiology 9:599, 2018 |

Trained athletes can reach MFO 0.5-1.0 g/min.

---

## 7. Fitness Age

### Nes 2013 (HUNT3, NTNU) — linear form
```
expected_VO2max_male(age)   = 57.8 − 0.31 × age
expected_VO2max_female(age) = 46.3 − 0.25 × age
fitnessAge = (intercept − VO2max) / slope
```
Clamp to [20, 90].

### Current multi-factor (AImRUNNA implementation)
Weighted blend: VO2max 50%, activity 30%, RHR 20%.

1. **VO2max component** — age-normed ACSM percentile tables (male/female), VO2max-derived age
2. **Activity adjustment** — frequency (sessions/week), volume (min/week), variety (sport types), intensity (high-HR sessions), long-sessions count
3. **RHR adjustment** — discrete buckets: <50 (−3), <55 (−2), <60 (−1), >75 (+2), >80 (+4)

### Enhanced multi-factor breakdown (implemented 2026-04)

Transparent signed-year deltas per component, weighted composite. Sources:
Nes 2011/2013 (HUNT), Kodama 2009 (JAMA), Lifelines HRV norms, WHOOP Healthspan 2024, Garmin Firstbeat.

| Component | Weight | Formula (signed years delta, negative=younger) |
|-----------|--------|-----------------------------------------------|
| VO2max | 0.35 | `−0.2 × (VO2max − popMean)` where popMean_M = 57−0.40·age, popMean_F = 48−0.37·age |
| Activity | 0.25 | `−0.002 × (stepsEquiv − 6000)` from weeklyCount×600 + weeklyMin×15 + 4000 base |
| Sleep | 0.20 | `|h−7.5|×2 − 1.5` clamped [−3,+5] |
| RHR | 0.10 | `0.25 × (RHR − (65+0.03·age))` clamped [−6,+8] |
| HRV (RMSSD) | 0.05 | `−15 × (ln(RMSSD) − (4.3−0.022·age))` clamped [±6] — demoted per WHOOP (too genetic) |
| Body (WHR) | 0.05 | `10 × (WHR − target)`; target 0.85 F / 0.90 M; clamped [−2,+3] |

**Missing inputs:** effective weights renormalized over available components (Σw=1).
**Hard clamp:** final delta bounded to ±15 years from chronological.
**Confidence band:** `±(2 + 3·missingTierA + 0.5·missingOthers)` years.

**WHOOP Healthspan (2024):** uses 9 inputs grouped as Sleep (duration/consistency/efficiency),
Activity (HR zones/strength/steps/VO2max), Physiology (RHR + lean body mass). Explicitly
uses RHR not HRV for cross-person comparison (HRV too genetically individualized).
Outputs: WHOOP Age (6-mo baseline) + Pace of Aging (30d/180d multiplier).

**Garmin Fitness Age:** `FitnessAge = chronoAge − 0.2 × (VO2max − popMean)`. Post-2022
adds vigorous-minutes/week, RHR, BMI/BF%. Hard floor ~chrono−9 to −11 years.

**Kodama 2009 meta-analysis (n≈103k):** +1 MET → −13% all-cause mortality, −15% CVD.
VO2max = strongest modifiable predictor, justifies 0.40 weight.

Source: Nes et al. *Med Sci Sports Exerc* 45(11):2024-30, 2013. HUNT3 study n=4,631.

### Aging trend
Least-squares slope of fitnessAge history over time (days).
- `slope × 365.25` → fitness-years per chronological year
- `<-0.5` = reverse aging
- `-0.5 .. 0.5` = aging slower
- `0.5 .. 1.3` = on-pace (natural)
- `>1.3` = aging faster — warning

---

## 8. HRV (Heart Rate Variability)

| Metric | Formula | Normal range |
|--------|---------|--------------|
| RMSSD | `sqrt(mean((RR[i]−RR[i-1])²))` over RR intervals | 20s: 40-80; 30s: 30-65; 40s: 25-55; 50s: 20-45 (ms) |
| Baseline | 60-day mean RMSSD | — |
| Z-score | `(today − baseline60d) / stddev60d` | <-1 concerning, >+0.5 well-recovered |

Window: night 5-min rolling window, or first 5 min of sleep.

Approximation when HRV unavailable: `RMSSD_est ≈ max(10, 100 − RHR)` — rough, r≈−0.5 only.

---

## 9. Training Load

### Banister TRIMP (sex-specific exponential)
```
HRR_frac = (HRmean − HRrest) / (HRmax − HRrest)
k1 = male ? 0.64 : 0.86
k2 = male ? 1.92 : 1.67
TRIMP = duration_min × HRR_frac × k1 × e^(k2 × HRR_frac)
```

Typical values: easy 60-min run ~40-60 TRIMP; threshold 60-min ~120-160.

Source: Banister EW. *Physiological Testing of the High-Performance Athlete*, 2nd ed. Human Kinetics, 1991.

### Edwards TRIMP (zone-based)
```
TRIMP = Σ(minutes_in_zone × zone_weight)
zone_weights = [z1:1, z2:2, z3:3, z4:4, z5:5]
```

### Coggan TSS (cycling, power-based)
```
NP = (mean(rolling30s(power)⁴))^0.25
IF = NP / FTP
TSS = (duration_hr × NP × IF) / FTP × 100
    = duration_hr × IF² × 100  (simplified)
```

Source: Allen & Coggan, *Training and Racing with a Power Meter*, 3rd ed.

### rTSS (running, pace-based)
```
NGP = normalized graded pace  (sec/m)
IF = thresholdPace / NGP
rTSS = duration_hr × IF² × 100
```

### ACWR (Acute:Chronic Workload Ratio)
```
// Rolling-average (Gabbett)
acute = Σ(dailyLoad, last 7 days)
chronic = Σ(dailyLoad, last 28 days) / 4
ACWR = acute / chronic

// EWMA (Williams 2017 — preferred)
acwr = ewma(load, 7) / ewma(load, 28)
```

- Sweet spot: **0.8-1.3** (safe)
- `>1.5` injury risk elevated
- `<0.8` detraining

Sources: Gabbett. *Br J Sports Med* 50(5):273-280, 2016. Williams et al. *Br J Sports Med* 51:209-210, 2017.

---

## 10. Race Time Prediction

### PRIMARY: Ensemble (VDOT + Riegel)
- 2+ PBs: VDOT 55% + Riegel 45% with personal fatigue factor
- 1 PB: VDOT 65% + Riegel 35% with default F=1.06
- 0 PBs: pure VDOT

### Riegel formula
```
T2 = T1 × (D2/D1)^F
```
- Speed-oriented/short distances: F = 1.03-1.05
- General recreational: F = 1.06 (default)
- Endurance/marathon: F = 1.07-1.10

Source: Riegel. *Am Sci* 69(3):285-290, 1981.

### Personal fatigue factor (derived)
```
F = log(T_long / T_short) / log(D_long / D_short)
```

### Cameron formula (better for longer distances)
```
a(d) = 13.49681 − 0.048865·d + 2.438936/d^0.7905  (d in miles)
T2 = (T1 / d1) × (a(d1)/a(d2)) × d2
```

### Distance-specific corrections
- Half: × 1.01 (advanced) to × 1.04 (starter)
- Marathon: × 1.01 (advanced, with long-run experience) to × 1.08 (starter, no long runs)

---

## 11. Recovery / Readiness Score (Planned)

Target WHOOP-style composite, 0-100:
```
readiness = 100 × (
  0.40 × hrv_score       // z-score normalized 60d baseline
  + 0.25 × rhr_score      // inverse z-score (lower=better)
  + 0.25 × sleep_score    // sleep_got / sleep_needed
  + 0.10 × resp_score     // respiratory rate z-score
)
```
Bands: 0-33 red, 34-66 yellow, 67-100 green.

Fallback (no HRV):
```
readiness = 100 × (
  0.35 × sleepQuality
  + 0.30 × (1 − max(0, (rhr − rhrBaseline) / 10))
  + 0.20 × (1 − min(1, yesterdayTRIMP / avgTRIMP))
  + 0.15 × (acwr_in_sweet_spot ? 1 : 0.5)
)
```

Sources:
- WHOOP Recovery whitepaper, whoop.com
- Plews et al. *Sports Med* 43(9):773-81, 2013 (HRV-guided training)

---

## 12. VDOT Race-Day Projection

Projection factors over `weeksRemaining`:
- Base rate: starter 0.28, intermediate 0.16, advanced 0.08 VDOT/week
- Diminishing returns: linear decay to 30% at VDOT 75
- Volume multiplier: <25 km/wk ×0.6, 25-40 ×0.8, >70 ×1.08
- Quality session share multiplier: ×(0.8 + qualityShare × 0.8) clamped [0.85, 1.15]
- Compliance multiplier from adaptive engine
- Age factor: >45y ×0.85, >55y ×0.70
- Taper boost: 0.5-1.5 VDOT

Hard cap: max +6 VDOT gain in any projection.

Research basis:
- Meta-analysis PMC3774727 (VO2max improvement 5-15%)
- Norwegian 4×4 study (7-13% in 8 wk beginners)
- Taper literature (2-3% performance boost)

---

## Reference Sources

- Tanaka, Monahan, Seals (2001). *JACC* 37(1). — HRmax
- Nes, Janszky, Wisløff et al. (2013). *Scand J Med Sci Sports* 23(6). — HRmax & Fitness Age
- Uth, Sørensen, Overgaard (2004). *Eur J Appl Physiol* 91. — VO2max ratio
- Hawley & Noakes (1992). *Eur J Appl Physiol* 65. — Cycling VO2max
- Daniels (2013). *Daniels' Running Formula*, 3rd ed. — VDOT system
- Achten & Jeukendrup (2003). *Int J Sports Med* 24. — FatMax
- Allen & Coggan (2019). *Training and Racing with a Power Meter*, 3rd ed. — FTP, TSS, NP
- Banister (1991). *Physiological Testing of the High-Performance Athlete*. — TRIMP
- Gabbett (2016). *Br J Sports Med* 50(5). — ACWR
- Williams et al. (2017). *Br J Sports Med* 51. — EWMA ACWR
- Riegel (1981). *Am Sci* 69(3). — Race prediction
- Firstbeat Technologies (2017). VO2max estimation white paper.
- Kodama et al. (2009). *JAMA* 301(19). — CRF mortality predictor
- Plews, Laursen, Stanley et al. (2013). *Sports Med* 43(9). — HRV training
