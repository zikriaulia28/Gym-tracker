function switchTab(tabName, fromHistory) {
  if (!document.getElementById(`tab-${tabName}`)) return;
  document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".tab-btn,.mobile-tab-btn").forEach(el => {
    el.classList.remove("active");
    el.removeAttribute("aria-current");
  });

  const panel = document.getElementById(`tab-${tabName}`);
  panel.classList.add("active");

  const activeBtn = Array.from(document.querySelectorAll(".tab-btn"))
    .find(btn => (btn.getAttribute("onclick") || "").includes(tabName));
  const mobileBtn = document.querySelector(`.mobile-tab-btn[data-tab="${tabName}"]`);
  [activeBtn, mobileBtn].forEach(btn => {
    if (!btn) return;
    btn.classList.add("active");
    btn.setAttribute("aria-current", "page");
  });

  if (!fromHistory && location.hash !== `#${tabName}`) history.pushState(null, "", `#${tabName}`);

  if (tabName === 'history') renderHistoryList();
  if (tabName === 'chart') setupChartOptions();
}

window.addEventListener("popstate", () => {
  switchTab((location.hash || "#workout").slice(1), true);
});
const initTab = () => switchTab((location.hash || "#workout").slice(1), true);
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initTab);
else initTab();

function renderBackupReminder() {
  const banner = document.getElementById("backup-reminder");
  if (!banner) return;
  if (typeof needsBackupReminder === "function" && needsBackupReminder()) {
    banner.classList.remove("hidden");
    banner.innerHTML = "";
    const text = document.createElement("span");
    text.innerText = "Data latihan hanya tersimpan di HP ini. Backup JSON agar tidak hilang.";
    const actions = document.createElement("span");
    actions.style.display = "flex";
    actions.style.gap = "8px";
    const backupBtn = document.createElement("button");
    backupBtn.type = "button";
    backupBtn.className = "banner-btn banner-btn-primary";
    backupBtn.innerText = "Backup sekarang";
    backupBtn.onclick = () => backupJSONData();
    const laterBtn = document.createElement("button");
    laterBtn.type = "button";
    laterBtn.className = "banner-btn dismiss";
    laterBtn.innerText = "Nanti";
    laterBtn.onclick = () => snoozeBackupReminder();
    actions.appendChild(backupBtn);
    actions.appendChild(laterBtn);
    banner.appendChild(text);
    banner.appendChild(actions);
  } else {
    banner.classList.add("hidden");
    banner.innerHTML = "";
  }
}

function formatDateID(dateStr) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateStr || ""));
  return m ? `${m[3]}/${m[2]}/${m[1]}` : (dateStr || "");
}

function renderHistoryList() {
  renderBackupReminder();
  const logs = getWorkoutLogs();
  const container = document.getElementById("history-list");
  
  if (logs.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>Belum ada riwayat latihan. Selesaikan sesi pertama, lognya muncul di sini.</p><button class="btn-secondary" type="button" onclick="switchTab('workout')">Buka Latihan</button></div>`;
    return;
  }

  const metricSessions = document.getElementById("metric-sessions");
  const metricExercises = document.getElementById("metric-exercises");
  const metricDuration = document.getElementById("metric-duration");
  if (metricSessions) metricSessions.textContent = logs.length;
  if (metricExercises) metricExercises.textContent = logs.reduce((sum, s) => sum + ((s.exercises || []).length), 0);
  if (metricDuration) {
    const timed = logs.filter(s => Number.isFinite(s.durationSec));
    const avg = timed.length ? Math.round(timed.reduce((sum, s) => sum + s.durationSec, 0) / timed.length) : 0;
    metricDuration.textContent = avg ? `${Math.floor(avg / 60)}:${String(avg % 60).padStart(2, "0")}` : "—";
  }

  container.innerHTML = logs.slice().reverse().map(session => {
    const dur = session.durationSec != null
      ? ` · Durasi ${Math.floor(session.durationSec / 60)}:${String(session.durationSec % 60).padStart(2, "0")}`
      : "";
    const bb = session.bodyWeight != null ? ` · BB ${esc(String(session.bodyWeight))} kg` : "";
    return `
    <div class="exercise-card">
      <div class="session-head">
        <div class="session-title">${esc(session.dayName)} (${formatDateID(session.date)})${session.isLightWeek ? ' [Minggu Ringan]' : ''}${bb}${dur}</div>
        <button class="btn-danger" type="button" onclick="deleteSession('${esc(String(session.sessionId || ""))}')" aria-label="Hapus sesi ${esc(session.dayName)} ${formatDateID(session.date)}">
          <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 4h11M6.5 2.5h3M4 4l.7 9a1 1 0 0 0 1 .9h4.6a1 1 0 0 0 1-.9L12 4M6.5 7v4M9.5 7v4"/></svg>
          <span>Hapus</span>
        </button>
      </div>
      ${session.exercises.map(ex => {
        const meta = [ex.rir ? `RIR ${esc(String(ex.rir))}` : "", ex.limit ? `limit: ${esc(String(ex.limit))}` : ""].filter(Boolean).join(" · ");
        return `
        <div class="session-line">
          <strong>${esc(ex.activeVariation)}</strong>: ${ex.sets.map(s => `${esc(String(s.weight))}kg x ${esc(String(s.reps))}`).join(", ")}
          ${meta ? `<br><small>${meta}</small>` : ''}
          ${ex.note ? `<br><small>Catatan: ${esc(ex.note)}</small>` : ''}
        </div>`;
      }).join('')}
    </div>`;
  }).join('');
}

function esc(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function deleteSession(sessionId) {
  if (!sessionId) return;
  if (!confirm("Hapus sesi ini dari riwayat?")) return;
  const logs = getWorkoutLogs().filter(s => s.sessionId !== sessionId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch (e) {
    console.error("Gagal hapus sesi", e);
    return;
  }
  renderHistoryList();
}
