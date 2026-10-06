# Graph Report - tracker-progress-gym  (2026-10-06)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 72 nodes · 127 edges · 11 communities (8 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4a837084`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- storage.js
- chart.js
- workout.js
- progress.js
- renderUIFromState
- saveDraftWorkout
- startTimer
- loadDayWorkout
- data.js
- sw.js

## God Nodes (most connected - your core abstractions)
1. `getWorkoutLogs()` - 8 edges
2. `renderUIFromState()` - 7 edges
3. `saveDraftWorkout()` - 7 edges
4. `renderChart()` - 6 edges
5. `renderHistoryList()` - 6 edges
6. `loadDayWorkout()` - 6 edges
7. `backupJSONData()` - 5 edges
8. `finishWorkout()` - 5 edges
9. `checkProgression()` - 5 edges
10. `renderDayButtons()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `loadDayWorkout()` --calls--> `newSessionId()`  [EXTRACTED]
  js/workout.js → js/workout.js  _Bridges community 2 → community 7_
- `updateSetData()` --calls--> `checkProgression()`  [EXTRACTED]
  js/workout.js → js/workout.js  _Bridges community 2 → community 4_
- `updateSetData()` --calls--> `saveDraftWorkout()`  [EXTRACTED]
  js/workout.js → js/workout.js  _Bridges community 2 → community 5_
- `loadDayWorkout()` --calls--> `renderUIFromState()`  [EXTRACTED]
  js/workout.js → js/workout.js  _Bridges community 4 → community 7_
- `renderUIFromState()` --calls--> `updateLastPerfDisplay()`  [EXTRACTED]
  js/workout.js → js/workout.js  _Bridges community 4 → community 5_

## Import Cycles
- None detected.

## Communities (11 total, 3 thin omitted)

### Community 0 - "storage.js"
Cohesion: 0.31
Nodes (12): backupJSONData(), downloadJSON(), entryMatchesKey(), exportCSVData(), getLastPerformance(), getLastSessionByKey(), getWorkoutLogs(), importBackupFile() (+4 more)

### Community 1 - "chart.js"
Cohesion: 0.28
Nodes (11): allMovementKeys(), collectKeyPoints(), epley(), fmtID(), keyLabels(), lastTipInfo, parseNumSafe(), renderChart() (+3 more)

### Community 2 - "workout.js"
Cohesion: 0.29
Nodes (9): bwOfEntry(), currentWorkoutState, finishWorkout(), isDBPart(), localISODate(), newSessionId(), parseNum(), ROTATION_ORDER (+1 more)

### Community 3 - "progress.js"
Cohesion: 0.46
Nodes (7): deleteSession(), esc(), formatDateID(), initTab(), renderBackupReminder(), renderHistoryList(), switchTab()

### Community 4 - "renderUIFromState"
Cohesion: 0.38
Nodes (7): bestOfSets(), checkProgression(), isExerciseSuperset(), isStagnant(), renderExerciseCardHTML(), renderRotationHint(), renderUIFromState()

### Community 5 - "saveDraftWorkout"
Cohesion: 0.33
Nodes (6): changeVariation(), saveDraftWorkout(), updateLastPerfDisplay(), updateLimit(), updateNote(), updateRir()

### Community 6 - "startTimer"
Cohesion: 0.70
Nodes (3): resumeTimer(), startTimer(), stopTimer()

### Community 7 - "loadDayWorkout"
Cohesion: 1.00
Nodes (3): loadDayWorkout(), renderDayButtons(), toggleLightWeek()

## Knowledge Gaps
- **5 isolated node(s):** `lastTipInfo`, `currentWorkoutState`, `ROTATION_ORDER`, `WORKOUT_PROGRAM`, `ASSETS`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 12 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `saveDraftWorkout()` connect `saveDraftWorkout` to `workout.js`, `loadDayWorkout`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **What connects `lastTipInfo`, `currentWorkoutState`, `ROTATION_ORDER` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Why does `renderUIFromState()` connect `renderUIFromState` to `workout.js`, `saveDraftWorkout`, `loadDayWorkout`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._