let chartInstance = null;
let lastTipInfo = [];
let chartMetric = "e1rm";

function setChartMetric(m) {
  chartMetric = m;
  document.querySelectorAll(".chart-switch button").forEach(b => {
    b.classList.toggle("active", b.dataset.metric === m);
  });
  renderChart();
}

function parseNumSafe(v) {
  if (v === "" || v == null) return NaN;
  const n = parseFloat(String(v).replace(",", "."));
  return isNaN(n) ? NaN : n;
}

function epley(w, r) {
  return w * (1 + r / 30);
}

function collectKeyPoints(logs, movementKey) {
  const pts = [];
  logs.forEach(session => {
    if (!session || !Array.isArray(session.exercises)) return;
    session.exercises.forEach(ex => {
      if (!ex || (ex.movementKey !== movementKey && ex.movementKeyB !== movementKey)) return;
      const half = ex.movementKey === movementKey ? 0 : 1;
      const bwHalf = Array.isArray(ex.bw) ? (ex.bw[half] || 1) : (ex.bw || 1);
      let bestW = 0, bestR = 0, vol = 0;
      (ex.sets || []).forEach(s => {
        const wParts = String(s.weight ?? "").split("/");
        const rParts = String(s.reps ?? "").split("/");
        const w = parseNumSafe(wParts[Math.min(half, wParts.length - 1)]);
        const r = parseNumSafe(rParts[Math.min(half, rParts.length - 1)]);
        if (isNaN(w) || isNaN(r)) return;
        vol += w * r * bwHalf;
        if (w > bestW || (w === bestW && r > bestR)) { bestW = w; bestR = r; }
      });
      if (bestW > 0) {
        const reps = [];
        (ex.sets || []).forEach(s => {
          const r = parseNumSafe(String(s.reps ?? "").split("/")[Math.min(half, String(s.reps ?? "").split("/").length - 1)]);
          if (!isNaN(r)) reps.push(r);
        });
        pts.push({
          date: session.date,
          variation: ex.activeVariation,
          e1rm: Math.round(epley(bestW, bestR) * 10) / 10,
          volume: Math.round(vol),
          bestW,
          bestR,
          maxRep: ex.maxRep || null,
          maxed: ex.maxRep ? reps.length > 0 && reps.every(r => r >= ex.maxRep) : false
        });
      }
    });
  });
  return pts;
}

function allMovementKeys() {
  const keys = [];
  const seen = new Set();
  const push = (k) => { if (k && !seen.has(k)) { seen.add(k); keys.push(k); } };
  if (typeof WORKOUT_PROGRAM !== "undefined") {
    WORKOUT_PROGRAM.days.forEach(d => d.exercises.forEach(e => {
      push(e.movementKey); push(e.movementKeyB);
    }));
  }
  getWorkoutLogs().forEach(s => (s.exercises || []).forEach(e => {
    push(e.movementKey); push(e.movementKeyB);
  }));
  return keys;
}

function keyLabels() {
  const info = {};
  const add = (k, label) => {
    if (!k) return;
    info[k] = info[k] || { labels: [], seen: new Set(), sessions: 0 };
    if (label && !info[k].seen.has(label)) {
      info[k].seen.add(label);
      info[k].labels.push(label);
    }
  };
  if (typeof WORKOUT_PROGRAM !== "undefined") {
    WORKOUT_PROGRAM.days.forEach(d => d.exercises.forEach(e => {
      (e.alternatives || []).forEach(a => {
        add(e.movementKey, a);
        if (e.movementKeyB) add(e.movementKeyB, a);
      });
    }));
  }
  getWorkoutLogs().forEach(s => (s.exercises || []).forEach(e => {
    add(e.movementKey, e.activeVariation);
    add(e.movementKeyB, e.activeVariation);
  }));
  const counts = {};
  getWorkoutLogs().forEach(s => {
    const hit = new Set();
    (s.exercises || []).forEach(e => {
      if (e.movementKey) hit.add(e.movementKey);
      if (e.movementKeyB) hit.add(e.movementKeyB);
    });
    hit.forEach(k => { counts[k] = (counts[k] || 0) + 1; });
  });
  Object.keys(info).forEach(k => { info[k].sessions = counts[k] || 0; });
  return info;
}

function setupChartOptions() {
  const select = document.getElementById("chart-exercise-select");
  select.innerHTML = "";
  const keys = allMovementKeys();
  if (keys.length === 0) {
    select.innerHTML = "<option>Belum ada data</option>";
    return;
  }
  const info = keyLabels();
  keys.forEach(k => {
    const names = (info[k] && info[k].labels) || [k];
    const shown = names.length > 1 ? `${names[0]} +${names.length - 1}` : names[0];
    const n = (info[k] && info[k].sessions) || 0;
    const opt = document.createElement("option");
    opt.value = k;
    opt.innerText = `${shown} · ${n} sesi`;
    select.appendChild(opt);
  });
  renderChart();
}

function renderChart() {
  const container = document.querySelector(".chart-container");
  if (typeof Chart === "undefined") {
    if (container) container.innerHTML = "<p style='color: var(--muted);'>Grafik tidak tersedia offline (Chart.js gagal dimuat). Data tetap aman.</p>";
    return;
  }
  const selectedKey = document.getElementById("chart-exercise-select").value;
  const pts = collectKeyPoints(getWorkoutLogs(), selectedKey);

  const labels = [];
  const e1rmData = [];
  const volData = [];
  lastTipInfo = [];
  pts.forEach((p, i) => {
    if (i > 0 && p.variation !== pts[i - 1].variation) {
      labels.push("");
      e1rmData.push(null);
      volData.push(null);
      lastTipInfo.push(null);
    }
    labels.push(p.date);
    e1rmData.push(p.e1rm);
    volData.push(p.volume);
    lastTipInfo.push(`${p.variation} · ${fmtID(p.date)}`);
  });

  const ctx = document.getElementById("progressChart").getContext("2d");
  if (chartInstance) chartInstance.destroy();

  const isE1rm = chartMetric !== "volume";

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: isE1rm ? `e1RM (kg) - ${selectedKey}` : `Volume (kg) - ${selectedKey}`,
          data: isE1rm ? e1rmData : volData,
          borderColor: isE1rm ? "#b9ff26" : "#879c8d",
          backgroundColor: isE1rm ? "rgba(185, 255, 38, 0.10)" : "rgba(135, 156, 141, 0.12)",
          fill: isE1rm,
          tension: 0.2,
          spanGaps: false,
          yAxisID: "y"
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: !isE1rm, grid: { color: "rgba(255,255,255,0.06)" }, ticks: { color: "#9bad9f" } },
        x: {
          grid: { color: "rgba(255,255,255,0.04)" },
          ticks: {
            color: "#879c8d",
            maxTicksLimit: 5,
            autoSkip: true,
            maxRotation: 0,
            minRotation: 0,
            font: { family: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", size: 12 },
            callback(value) {
              const raw = labels[value];
              if (raw === "") return "";
              return fmtAxis(raw);
            }
          }
        }
      },
      plugins: {
        legend: { labels: { color: "#f3f8f4", boxWidth: 14, boxHeight: 14, padding: 14, font: { size: 12 } } },
        tooltip: {
          callbacks: {
            title: (items) => {
              const info = lastTipInfo[items[0].dataIndex];
              return info || items[0].label;
            }
          }
        }
      }
    }
  });

  renderChartMeta(selectedKey, pts);
}

function fmtID(dateStr) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateStr || ""));
  return m ? `${m[3]}/${m[2]}/${m[1]}` : (dateStr || "");
}

function fmtAxis(dateStr) {
  if (!dateStr) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateStr || ""));
  if (!m) return String(dateStr || "");
  const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const day = parseInt(m[3], 10);
  const mon = BULAN[parseInt(m[2], 10) - 1] || m[2];
  return `${day} ${mon}`;
}

function renderChartMeta(selectedKey, pts) {
  const bestEl = document.getElementById("metric-best-e1rm");
  const bestDate = document.getElementById("metric-best-date");
  const volEl = document.getElementById("metric-total-volume");
  const volChg = document.getElementById("metric-volume-change");
  const verdict = document.getElementById("chart-verdict");
  const gapNote = document.getElementById("chart-gap-note");
  if (!bestEl) return;

  if (pts.length === 0) {
    bestEl.innerText = "—";
    if (bestDate) bestDate.innerText = "Belum ada data";
    if (volEl) volEl.innerText = "—";
    if (volChg) volChg.innerText = "—";
    if (verdict) verdict.innerText = "Belum ada data — selesaikan 1 sesi untuk melihat garis.";
    if (gapNote) gapNote.style.display = "none";
    return;
  }

  const best = pts.reduce((a, b) => (b.e1rm > a.e1rm ? b : a), pts[0]);
  bestEl.innerText = `${best.e1rm} kg`;
  if (bestDate) bestDate.innerText = `${best.variation} · ${fmtID(best.date)}`;

  const last = pts[pts.length - 1];
  if (volEl) volEl.innerText = `${last.volume} kg`;
  if (volChg) {
    if (pts.length > 1) {
      const prev = pts[pts.length - 2].volume;
      const d = prev ? Math.round((last.volume - prev) / prev * 1000) / 10 : 0;
      volChg.innerText = `${d >= 0 ? "+" : ""}${d}% vs sesi lalu`;
    } else {
      volChg.innerText = "Butuh 2 sesi untuk tren";
    }
  }

  if (verdict) {
    let text;
    if (last.maxed) {
      text = `${last.variation} ${last.bestW}×${last.bestR} → e1RM ${last.e1rm} · NAIKKAN beban sesi berikut`;
    } else if (pts.length > 1) {
      const prev = pts[pts.length - 2];
      const same = prev.bestW === last.bestW && prev.bestR === last.bestR;
      text = same
        ? `${last.variation} ${last.bestW}×${last.bestR} sama 2 sesi → NAIKKAN beban`
        : `${last.variation} ${last.bestW}×${last.bestR} → e1RM ${last.e1rm} · target: tuntaskan ${last.maxRep || "?"} rep`;
    } else {
      text = `${last.variation} ${last.bestW}×${last.bestR} → e1RM ${last.e1rm}`;
    }
    verdict.innerText = text;
  }

  if (gapNote) {
    const broken = pts.some((p, i) => i > 0 && p.variation !== pts[i - 1].variation);
    gapNote.style.display = broken ? "block" : "none";
  }
}
