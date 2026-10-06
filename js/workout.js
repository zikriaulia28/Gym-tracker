let currentDayIndex = 0;
let isLightWeek = false;
let currentWorkoutState = [];
let currentSessionId = null;

function newSessionId() {
  return "s" + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
}

function localISODate(d) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function parseNum(str) {
  if (str === "" || str == null) return NaN;
  const n = parseFloat(String(str).replace(",", "."));
  return isNaN(n) ? NaN : n;
}

function isDBPart(part) {
  if (!part || part.includes("/")) return false;
  const lower = part.toLowerCase();
  if (/\b(single|one-arm|satu)\b/.test(lower)) return false;
  return /\b(db|dumbbell|dumbel)\b/.test(lower);
}

function bwOfEntry(entry) {
  const halves = String(entry.activeVariation || "").split("+");
  if (halves.length > 1 || entry.isSuperset) {
    return halves.map(h => isDBPart(h.trim()) ? 2 : 1);
  }
  return isDBPart((entry.activeVariation || "").trim()) ? 2 : 1;
}

document.addEventListener("DOMContentLoaded", () => {
  renderDayButtons();
  if (typeof resumeTimer === "function") resumeTimer();

  const savedDraft = localStorage.getItem("gym_workout_draft");
  if (savedDraft) {
    try {
      const draft = JSON.parse(savedDraft);
      currentDayIndex = draft.dayIndex || 0;
      currentSessionId = draft.sessionId || null;
      isLightWeek = draft.isLightWeek || false;
      document.getElementById("light-week-toggle").checked = isLightWeek;
      renderDayButtons();
      loadDayWorkout(currentDayIndex, true);
      return;
    } catch (e) {
      console.error("Draf korup", e);
    }
  }
  loadDayWorkout(0, false);
});

function toggleLightWeek() {
  isLightWeek = document.getElementById("light-week-toggle").checked;
  renderDayButtons();
  loadDayWorkout(currentDayIndex, false);
}

function renderDayButtons() {
  const container = document.getElementById("day-buttons");
  container.innerHTML = "";
  
  WORKOUT_PROGRAM.days.forEach((day, index) => {
    if (isLightWeek && !day.isLightAvailable) return;
    
    const btn = document.createElement("button");
    btn.className = `day-btn ${index === currentDayIndex ? 'active' : ''}`;
    btn.innerText = day.name;
    btn.onclick = () => {
      currentDayIndex = index;
      renderDayButtons();
      loadDayWorkout(index, false);
    };
    container.appendChild(btn);
  });
}

function loadDayWorkout(dayIndex, checkDraft = false) {
  currentDayIndex = dayIndex;
  const day = WORKOUT_PROGRAM.days[dayIndex];

  if (checkDraft) {
    try {
      const savedDraft = localStorage.getItem("gym_workout_draft");
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        if (draft.dayIndex === dayIndex && draft.isLightWeek === isLightWeek) {
          currentWorkoutState = draft.state;
          currentSessionId = draft.sessionId || currentSessionId;
          renderUIFromState();
          return;
        }
      }
    } catch (e) {
      console.error("Draf korup", e);
    }
  }

  currentSessionId = newSessionId();
  document.getElementById("save-workout-btn").disabled = false;
  currentWorkoutState = [];
  day.exercises.forEach((ex) => {
    const setTarget = isLightWeek ? 2 : ex.targetSets;
    const stateObj = {
      exerciseId: ex.id,
      exerciseName: ex.name,
      movementKey: ex.movementKey || null,
      movementKeyB: ex.movementKeyB || null,
      isSuperset: !!ex.superset,
      activeVariation: ex.alternatives[0],
      maxRep: ex.maxRep,
      restSeconds: ex.restSeconds,
      sets: Array.from({ length: setTarget }, () => ({ weight: "", reps: "" })),
      rir: "",
      limit: "",
      note: ""
    };
    currentWorkoutState.push(stateObj);
  });

  renderUIFromState();
  saveDraftWorkout();
}

function isExerciseSuperset(ex) {
  if (!ex) return false;
  if (typeof ex === "object") return !!ex.superset;
  const lower = String(ex).toLowerCase();
  return lower.includes("superset") || lower.includes("+");
}

function renderUIFromState() {
  const container = document.getElementById("exercise-list");
  container.innerHTML = "";
  const day = WORKOUT_PROGRAM.days[currentDayIndex];

  currentWorkoutState.forEach((stateObj, exIndex) => {
    const ex = day.exercises[exIndex];
    const card = document.createElement("div");
    card.className = "exercise-card";
    card.id = `card-ex-${exIndex}`;
    card.innerHTML = renderExerciseCardHTML(ex, exIndex, stateObj);
    container.appendChild(card);

    const isSuperset = stateObj.isSuperset || isExerciseSuperset(ex);

    // Kembalikan nilai input dari state / draft
    stateObj.sets.forEach((set, sIndex) => {
      if (isSuperset) {
        const wAInput = document.getElementById(`wA-${exIndex}-${sIndex}`);
        const rAInput = document.getElementById(`rA-${exIndex}-${sIndex}`);
        const wBInput = document.getElementById(`wB-${exIndex}-${sIndex}`);
        const rBInput = document.getElementById(`rB-${exIndex}-${sIndex}`);

        if (set.weight) {
          const partsW = String(set.weight).split("/");
          if (wAInput && partsW[0] !== undefined) wAInput.value = partsW[0];
          if (wBInput && partsW[1] !== undefined) wBInput.value = partsW[1];
        }
        if (set.reps) {
          const partsR = String(set.reps).split("/");
          if (rAInput && partsR[0] !== undefined) rAInput.value = partsR[0];
          if (rBInput && partsR[1] !== undefined) rBInput.value = partsR[1];
        }
      } else {
        const wInput = document.getElementById(`w-${exIndex}-${sIndex}`);
        const rInput = document.getElementById(`r-${exIndex}-${sIndex}`);
        if (wInput && set.weight !== "") wInput.value = set.weight;
        if (rInput && set.reps !== "") rInput.value = set.reps;
      }
    });

    const noteInput = document.getElementById(`note-${exIndex}`);
    if (noteInput && stateObj.note) noteInput.value = stateObj.note;
    const rirInput = document.getElementById(`rir-${exIndex}`);
    if (rirInput && stateObj.rir !== undefined && stateObj.rir !== "") rirInput.value = stateObj.rir;
    const limitInput = document.getElementById(`limit-${exIndex}`);
    if (limitInput && stateObj.limit) limitInput.value = stateObj.limit;

    updateLastPerfDisplay(exIndex);
    checkProgression(exIndex);
  });

  document.getElementById("save-workout-btn").classList.remove("hidden");
  try {
    const savedDraft = localStorage.getItem("gym_workout_draft");
    if (savedDraft) {
      const bw = JSON.parse(savedDraft).bodyWeight;
      if (bw !== undefined) document.getElementById("body-weight").value = bw;
    }
  } catch (e) { /* abaikan */ }
  renderRotationHint();
}

function renderExerciseCardHTML(ex, exIndex, stateObj) {
  const altOptions = ex.alternatives.map(alt => 
    `<option value="${alt}" ${alt === stateObj.activeVariation ? 'selected' : ''}>${alt}</option>`
  ).join("");

  const isSuperset = stateObj.isSuperset || isExerciseSuperset(ex);

  let setsHTML = "";
  if (isSuperset && ex.superset) {
    setsHTML += `
      <div class="superset-head" aria-hidden="true">
        <span></span>
        <span>${ex.superset.labelA}</span>
        <span>${ex.superset.labelB}</span>
      </div>
    `;
  }
  for (let s = 0; s < stateObj.sets.length; s++) {
    if (isSuperset) {
      setsHTML += `
        <div class="set-row">
          <span class="set-label">S${s + 1}</span>
          <div class="superset-pair" style="flex:1; display:grid; grid-template-columns:1fr 1fr; gap:8px;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
              <input inputmode="decimal" placeholder="kg A" id="wA-${exIndex}-${s}" oninput="updateSetData(${exIndex}, ${s})" aria-label="Beban A set ${s + 1}">
              <input inputmode="numeric" placeholder="rep A" id="rA-${exIndex}-${s}" oninput="updateSetData(${exIndex}, ${s})" aria-label="Reps A set ${s + 1}">
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
              <input inputmode="decimal" placeholder="kg B" id="wB-${exIndex}-${s}" oninput="updateSetData(${exIndex}, ${s})" aria-label="Beban B set ${s + 1}">
              <input inputmode="numeric" placeholder="rep B" id="rB-${exIndex}-${s}" oninput="updateSetData(${exIndex}, ${s})" aria-label="Reps B set ${s + 1}">
            </div>
          </div>
        </div>
      `;
    } else {
      setsHTML += `
        <div class="set-row single">
          <span class="set-label">S${s + 1}</span>
          <input inputmode="decimal" placeholder="kg" id="w-${exIndex}-${s}" oninput="updateSetData(${exIndex}, ${s})" aria-label="Beban set ${s + 1}">
          <input inputmode="numeric" placeholder="rep" id="r-${exIndex}-${s}" oninput="updateSetData(${exIndex}, ${s})" aria-label="Reps set ${s + 1}">
        </div>
      `;
    }
  }

  const warmupHint = ["chest_press_horizontal", "squat_knee_dominant", "hip_hinge"].includes(ex.movementKey)
    ? `<br>Warm-up: 50%×10, 70%×5, 85%×3`
    : "";

  return `
    <div class="exercise-header">
      <div>
        <div class="exercise-title"><span class="ex-num">${String(exIndex + 1).padStart(2, "0")}</span>${ex.name}</div>
        <div class="exercise-meta">Target <span class="num">${stateObj.sets.length} × ${ex.minRep}–${ex.maxRep}</span> · Istirahat <span class="num">${ex.restText}</span>${warmupHint}</div>
      </div>
      <button class="btn-sm" onclick="startTimer(${ex.restSeconds})" aria-label="Mulai timer ${ex.restSeconds} detik">Timer</button>
    </div>
    
    <div class="variation-row">
      <select id="var-${exIndex}" aria-label="Variasi gerakan" onchange="changeVariation(${exIndex}, this.value)">
        ${altOptions}
      </select>
    </div>

    <div class="last-perf" id="last-perf-${exIndex}">Sesi lalu: (Belum ada data)</div>

    <div class="sets-container">${setsHTML}</div>

    <div class="mini-row">
      <input id="rir-${exIndex}" class="text-field" placeholder="RIR" inputmode="decimal" aria-label="RIR"
              oninput="updateRir(${exIndex}, this.value)">
      <input type="text" id="limit-${exIndex}" class="text-field grow" placeholder="Limit (misal: rom)" aria-label="Limit"
              oninput="updateLimit(${exIndex}, this.value)">
    </div>

    <input type="text" id="note-${exIndex}" class="text-field note-field" placeholder="Catatan (misal: RPE, set terakhir)" aria-label="Catatan"
            oninput="updateNote(${exIndex}, this.value)">

    <div id="progression-msg-${exIndex}"></div>
  `;
}

function changeVariation(exIndex, newVar) {
  currentWorkoutState[exIndex].activeVariation = newVar;
  updateLastPerfDisplay(exIndex);
  saveDraftWorkout();
}

function updateNote(exIndex, val) {
  currentWorkoutState[exIndex].note = val;
  saveDraftWorkout();
}

function updateRir(exIndex, val) {
  currentWorkoutState[exIndex].rir = val;
  saveDraftWorkout();
}

function updateLimit(exIndex, val) {
  currentWorkoutState[exIndex].limit = val;
  saveDraftWorkout();
}

function updateBodyWeight(val) {
  try {
    const savedDraft = localStorage.getItem("gym_workout_draft");
    const draft = savedDraft ? JSON.parse(savedDraft) : {};
    draft.bodyWeight = val;
    localStorage.setItem("gym_workout_draft", JSON.stringify(draft));
  } catch (e) {
    console.error("Gagal simpan BB", e);
  }
}

function updateLastPerfDisplay(exIndex) {
  const st = currentWorkoutState[exIndex];
  const lastSets = getLastPerformance(st.activeVariation, st.movementKey, st.movementKeyB);
  const container = document.getElementById(`last-perf-${exIndex}`);
  
  if (lastSets && lastSets.length > 0) {
    const text = lastSets.map((s, i) => `S${i+1}: ${s.weight}kg x ${s.reps}rep`).join(" | ");
    container.innerText = `Sesi lalu (${st.activeVariation}): ${text}`;
  } else {
    container.innerText = `Sesi lalu (${st.activeVariation}): Belum ada data`;
  }
}

function updateSetData(exIndex, setIndex) {
  const isSuperset = currentWorkoutState[exIndex].isSuperset;

  if (isSuperset) {
    const wA = document.getElementById(`wA-${exIndex}-${setIndex}`).value;
    const rA = document.getElementById(`rA-${exIndex}-${setIndex}`).value;
    const wB = document.getElementById(`wB-${exIndex}-${setIndex}`).value;
    const rB = document.getElementById(`rB-${exIndex}-${setIndex}`).value;

    const nW = [parseNum(wA), parseNum(wB)].map(n => isNaN(n) ? 0 : n);
    const nR = [parseNum(rA), parseNum(rB)].map(n => isNaN(n) ? 0 : n);
    const weightStr = (wA !== "" || wB !== "") ? `${nW[0]}/${nW[1]}` : "";
    const repsStr = (rA !== "" || rB !== "") ? `${nR[0]}/${nR[1]}` : "";

    currentWorkoutState[exIndex].sets[setIndex].weight = weightStr;
    currentWorkoutState[exIndex].sets[setIndex].reps = repsStr;
  } else {
    const wVal = document.getElementById(`w-${exIndex}-${setIndex}`).value;
    const rVal = document.getElementById(`r-${exIndex}-${setIndex}`).value;
    const wNum = parseNum(wVal);
    const rNum = parseNum(rVal);

    currentWorkoutState[exIndex].sets[setIndex].weight = wVal !== "" && !isNaN(wNum) ? wNum : "";
    currentWorkoutState[exIndex].sets[setIndex].reps = rVal !== "" && !isNaN(rNum) ? Math.trunc(rNum) : "";
  }

  checkProgression(exIndex);
  saveDraftWorkout();
}

function saveDraftWorkout() {
  let prev = {};
  try {
    const saved = localStorage.getItem("gym_workout_draft");
    if (saved) prev = JSON.parse(saved);
  } catch (e) { /* abaikan draf korup, tulis baru */ }
  const draftData = {
    dayIndex: currentDayIndex,
    isLightWeek: isLightWeek,
    sessionId: currentSessionId,
    startedAt: prev.startedAt || Date.now(),
    bodyWeight: prev.bodyWeight || "",
    state: currentWorkoutState
  };
  localStorage.setItem("gym_workout_draft", JSON.stringify(draftData));
}

const ROTATION_ORDER = ["Hari 1 - Upper 1", "Hari 2 - Lower 1", "Hari 3 - Upper 2", "Hari 4 - Lower 2"];

function renderRotationHint() {
  const el = document.getElementById("rotation-hint");
  if (!el) return;
  const paint = (label, value, meta) => {
    el.innerHTML = "";
    const left = document.createElement("div");
    const l = document.createElement("div");
    l.className = "next-label";
    l.innerText = label;
    const v = document.createElement("div");
    v.className = "next-value";
    v.innerText = value;
    left.appendChild(l);
    left.appendChild(v);
    const m = document.createElement("div");
    m.className = "next-meta";
    m.innerText = meta;
    el.appendChild(left);
    el.appendChild(m);
  };
  let lastDay = null;
  try {
    const logs = getWorkoutLogs();
    if (logs.length > 0) lastDay = logs[logs.length - 1].dayName;
  } catch (e) { /* abaikan */ }
  if (!lastDay) {
    paint("MULAI DARI", "Upper A", "belum ada sesi");
    return;
  }
  const idx = ROTATION_ORDER.indexOf(lastDay);
  const next = idx >= 0 ? ROTATION_ORDER[(idx + 1) % ROTATION_ORDER.length] : ROTATION_ORDER[0];
  paint("BERIKUTNYA", next, `terakhir: ${lastDay}`);
}

function bestOfSets(sets) {
  let best = null;
  sets.forEach(s => {
    const w = parseFloat(String(s.weight).split("/")[0]) || 0;
    const r = parseInt(String(s.reps).split("/")[0], 10) || 0;
    if (!best || w > best.w || (w === best.w && r > best.r)) best = { w, r };
  });
  return best;
}

function isStagnant(exState) {
  if (typeof getLastSessionByKey !== "function") return false;
  const last = getLastSessionByKey(exState.movementKey, exState.movementKeyB);
  if (!last || !Array.isArray(last.sets) || last.sets.length === 0) return false;
  const cur = bestOfSets(exState.sets);
  const prev = bestOfSets(last.sets);
  return !!(cur && prev && cur.w > 0 && cur.w === prev.w && cur.r === prev.r);
}

function checkProgression(exIndex) {
  const exState = currentWorkoutState[exIndex];
  const isSuperset = exState.isSuperset || isExerciseSuperset(exState.exerciseName);
  const msgContainer = document.getElementById(`progression-msg-${exIndex}`);
  let msg = "";

  const filled = exState.sets.filter(s => s.reps !== "" && s.reps != null);
  if (filled.length === exState.sets.length && exState.sets.length > 0) {
    if (!isSuperset) {
      const reps = filled.map(s => parseInt(s.reps, 10));
      const weights = filled.map(s => parseFloat(s.weight) || 0);
      const atMax = reps.filter(r => r >= exState.maxRep).length;
      const sameWeight = weights.every(w => w === weights[0]);
      if (atMax === reps.length) {
        msg = "Saran Progresi: Semua set capai target reps! Naikkan beban di sesi berikutnya.";
      } else if (atMax >= 2 && atMax >= reps.length - 1 && sameWeight) {
        msg = `Saran Progresi: ${atMax} dari ${reps.length} set capai batas atas dengan beban sama. Naikkan beban di sesi berikutnya.`;
      } else if (isStagnant(exState)) {
        msg = "Saran Progresi: Set terbaik sama selama 2 sesi berturut-turut. Naikkan beban di sesi berikutnya.";
      }
    } else {
      const allMax = exState.sets.every(s => {
        if (!s.reps) return false;
        return String(s.reps).split("/").every(p => parseInt(p || 0, 10) >= exState.maxRep);
      });
      if (allMax) {
        msg = "Saran Progresi: Semua set capai target reps! Naikkan beban di sesi berikutnya.";
      }
    }
  }

  if (msg) {
    msgContainer.innerHTML = `<div class="progression-badge">${msg}</div>`;
  } else if (exState.sets.length > 0) {
    msgContainer.innerHTML = `<div class="progression-idle">Target: tuntaskan ${exState.maxRep} rep semua set.</div>`;
  } else {
    msgContainer.innerHTML = "";
  }
}

function finishWorkout() {
  const saveBtn = document.getElementById("save-workout-btn");
  saveBtn.disabled = true;

  let draftMeta = {};
  try {
    const saved = localStorage.getItem("gym_workout_draft");
    if (saved) draftMeta = JSON.parse(saved);
  } catch (e) { /* abaikan */ }
  const bwNum = parseNum(draftMeta.bodyWeight);

  const sessionLog = {
    sessionId: currentSessionId || newSessionId(),
    date: localISODate(new Date()),
    dayName: WORKOUT_PROGRAM.days[currentDayIndex].name,
    isLightWeek: isLightWeek,
    bodyWeight: isNaN(bwNum) ? null : bwNum,
    durationSec: draftMeta.startedAt ? Math.max(0, Math.round((Date.now() - draftMeta.startedAt) / 1000)) : null,
    exercises: currentWorkoutState.map(e => ({ ...e, bw: bwOfEntry(e) }))
  };

  const saved = saveWorkoutLog(sessionLog);
  localStorage.removeItem("gym_workout_draft");
  showToast(saved ? "Sesi latihan berhasil disimpan!" : "Sesi ini sudah tersimpan.");
  switchTab('history');
}
