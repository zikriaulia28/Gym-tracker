# Graph Report - tracker-progress-gym  (2026-10-06)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 799 nodes · 2188 edges · 39 communities (28 shown, 11 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 54 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4a837084`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- o
- ho
- chart.umd.min.js
- ro
- n
- updateElements
- xt
- i
- jt
- s
- sn
- workout.js
- .update
- tn
- .getDataset
- da
- ._computeLabelItems
- .getProps
- de
- .getDatasetMeta
- storage.js
- chart.js
- ze
- u
- oo
- ._setStyle
- draw
- .draw
- progress.js
- .buildOrUpdateControllers
- .notifyPlugins
- startTimer
- aa
- ko
- data.js
- sw.js

## God Nodes (most connected - your core abstractions)
1. `tn` - 127 edges
2. `n()` - 59 edges
3. `s()` - 45 edges
4. `o()` - 32 edges
5. `ho()` - 30 edges
6. `i()` - 30 edges
7. `wa` - 29 edges
8. `l()` - 27 edges
9. `e()` - 27 edges
10. `d()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `lo()` --indirect_call--> `s()`  [INFERRED]
  js/vendor/chart.umd.min.js → js/vendor/chart.umd.min.js  _Bridges community 0 → community 9_
- `li()` --indirect_call--> `tt()`  [INFERRED]
  js/vendor/chart.umd.min.js → js/vendor/chart.umd.min.js  _Bridges community 0 → community 26_
- `update()` --indirect_call--> `e()`  [INFERRED]
  js/vendor/chart.umd.min.js → js/vendor/chart.umd.min.js  _Bridges community 0 → community 7_
- `d()` --indirect_call--> `e()`  [INFERRED]
  js/vendor/chart.umd.min.js → js/vendor/chart.umd.min.js  _Bridges community 12 → community 7_
- `fa()` --indirect_call--> `i()`  [INFERRED]
  js/vendor/chart.umd.min.js → js/vendor/chart.umd.min.js  _Bridges community 15 → community 7_

## Import Cycles
- None detected.

## Communities (39 total, 11 thin omitted)

### Community 0 - "o"
Cohesion: 0.07
Nodes (26): afterDatasetsUpdate(), afterDraw(), afterEvent(), afterUpdate(), Ba(), ki(), lo(), m() (+18 more)

### Community 1 - "ho"
Cohesion: 0.06
Nodes (16): a(), buildLookupTable(), determineDataLimits(), Fs(), _generate(), _getTimestampsForTable(), ho(), init() (+8 more)

### Community 2 - "chart.umd.min.js"
Cohesion: 0.06
Nodes (18): beforeLayout(), cn(), dn(), fe(), getDecimalForValue(), getValueForPixel(), Go(), hn() (+10 more)

### Community 3 - "ro"
Cohesion: 0.07
Nodes (14): ao(), b(), Bi(), Ci(), co(), cs, Do(), eo() (+6 more)

### Community 4 - "n"
Cohesion: 0.09
Nodes (16): buildTicks(), fn(), g(), gn(), l(), ii(), g(), mo() (+8 more)

### Community 5 - "updateElements"
Cohesion: 0.09
Nodes (19): Ae(), _calculateBarIndexPixels(), _calculateBarValuePixels(), _getAxis(), _getAxisCount(), getBasePixel(), getFirstScaleIdForIndexAxis(), getPixelForTick() (+11 more)

### Community 6 - "xt"
Cohesion: 0.09
Nodes (7): an(), as(), ln(), on, rs(), ts(), xt

### Community 7 - "i"
Cohesion: 0.09
Nodes (23): bs(), ct(), e(), ei(), ge(), gi(), is(), je() (+15 more)

### Community 8 - "jt"
Cohesion: 0.08
Nodes (16): Bt(), color(), Ee(), Ft(), Gt(), It(), jt(), kt() (+8 more)

### Community 9 - "s"
Cohesion: 0.08
Nodes (14): Be(), bo, getRange(), H(), _i(), j(), ji(), label() (+6 more)

### Community 10 - "sn"
Cohesion: 0.13
Nodes (3): addElements(), en, sn

### Community 11 - "workout.js"
Cohesion: 0.15
Nodes (25): bestOfSets(), bwOfEntry(), changeVariation(), checkProgression(), currentWorkoutState, finishWorkout(), isDBPart(), isExerciseSuperset() (+17 more)

### Community 12 - ".update"
Cohesion: 0.13
Nodes (3): d(), Di(), Pn()

### Community 14 - ".getDataset"
Cohesion: 0.12
Nodes (5): at(), beforeUpdate(), initialize(), rt(), w()

### Community 15 - "da"
Cohesion: 0.14
Nodes (17): beforeDatasetDraw(), beforeDatasetsDraw(), ca, da(), ea(), fa(), ga(), ha() (+9 more)

### Community 16 - "._computeLabelItems"
Cohesion: 0.14
Nodes (3): Us(), Y(), Ys()

### Community 17 - ".getProps"
Cohesion: 0.19
Nodes (15): average(), dataset(), getCenterPoint(), index(), inRange(), nearest(), qi(), Re() (+7 more)

### Community 18 - "de"
Cohesion: 0.21
Nodes (4): ce(), de, dt(), he()

### Community 20 - "storage.js"
Cohesion: 0.31
Nodes (12): backupJSONData(), downloadJSON(), entryMatchesKey(), exportCSVData(), getLastPerformance(), getLastSessionByKey(), getWorkoutLogs(), importBackupFile() (+4 more)

### Community 21 - "chart.js"
Cohesion: 0.28
Nodes (11): allMovementKeys(), collectKeyPoints(), epley(), fmtID(), keyLabels(), lastTipInfo, parseNumSafe(), renderChart() (+3 more)

### Community 22 - "ze"
Cohesion: 0.17
Nodes (5): es(), generateLabels(), Ie(), Ni(), ze()

### Community 23 - "u"
Cohesion: 0.23
Nodes (5): addBox(), configure(), reset(), start(), u()

### Community 24 - "oo"
Cohesion: 0.21
Nodes (4): io(), no(), oo, zi()

### Community 26 - "draw"
Cohesion: 0.18
Nodes (10): ai(), beforeDraw(), draw(), fo(), getMaxOverflow(), hi(), K(), li() (+2 more)

### Community 28 - "progress.js"
Cohesion: 0.46
Nodes (7): deleteSession(), esc(), formatDateID(), initTab(), renderBackupReminder(), renderHistoryList(), switchTab()

### Community 32 - "startTimer"
Cohesion: 0.70
Nodes (3): resumeTimer(), startTimer(), stopTimer()

### Community 33 - "aa"
Cohesion: 0.40
Nodes (4): aa(), Bn(), getLabelAndValue(), getLabelForValue()

### Community 34 - "ko"
Cohesion: 0.40
Nodes (5): et(), ko(), qo(), wo(), Zo()

## Knowledge Gaps
- **5 isolated node(s):** `currentWorkoutState`, `ROTATION_ORDER`, `lastTipInfo`, `WORKOUT_PROGRAM`, `ASSETS`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 93 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `tn` connect `tn` to `ho`, `chart.umd.min.js`, `n`, `updateElements`, `i`, `s`, `sn`, `.update`, `._computeLabelItems`, `.getProps`, `.getDatasetMeta`, `ze`, `u`, `.draw`, `.buildOrUpdateControllers`, `.notifyPlugins`?**
  _High betweenness centrality (0.165) - this node is a cross-community bridge._
- **Are the 13 inferred relationships involving `s()` (e.g. with `ao()` and `co()`) actually correct?**
  _`s()` has 13 INFERRED edges - model-reasoned connections that need verification._
- **What connects `currentWorkoutState`, `ROTATION_ORDER`, `lastTipInfo` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `o` be split into smaller, more focused modules?**
  _Cohesion score 0.07115384615384615 - nodes in this community are weakly interconnected._
- **Why does `n()` connect `n` to `o`, `ho`, `chart.umd.min.js`, `ro`, `updateElements`, `xt`, `i`, `s`, `.update`, `tn`, `.getDataset`, `da`, `._computeLabelItems`, `.getDatasetMeta`, `ze`, `u`, `oo`, `._setStyle`, `.draw`, `.buildOrUpdateControllers`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Should `ho` be split into smaller, more focused modules?**
  _Cohesion score 0.06363636363636363 - nodes in this community are weakly interconnected._
- **Why does `ho()` connect `ho` to `o`, `chart.umd.min.js`, `ro`, `s`, `tn`, `.getProps`, `draw`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._