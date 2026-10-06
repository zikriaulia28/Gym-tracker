const STORAGE_KEY = "gym_workout_logs";
const BACKUP_KEY = "gym_last_backup";
const BACKUP_SNOOZE_KEY = "gym_backup_snooze";
const BACKUP_REMINDER_DAYS = 7;

function showToast(msg) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    t.className = "toast";
    t.setAttribute("role", "status");
    document.body.appendChild(t);
  }
  t.innerText = msg;
  t.classList.add("show");
  clearTimeout(showToast._h);
  showToast._h = setTimeout(() => t.classList.remove("show"), 2600);
}

function getWorkoutLogs() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const logs = JSON.parse(data);
    return Array.isArray(logs) ? logs : [];
  } catch (e) {
    console.error("Riwayat korup, pakai data kosong", e);
    return [];
  }
}

function saveWorkoutLog(sessionLog) {
  const logs = getWorkoutLogs();
  if (sessionLog && sessionLog.sessionId && logs.some(l => l && l.sessionId === sessionLog.sessionId)) {
    return false;
  }
  logs.push(sessionLog);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  return true;
}

function entryMatchesKey(e, movementKey, movementKeyB) {
  if (!movementKey && !movementKeyB) return false;
  return (movementKey && (e.movementKey === movementKey || e.movementKeyB === movementKey)) ||
    (movementKeyB && (e.movementKey === movementKeyB || e.movementKeyB === movementKeyB));
}

function getLastPerformance(variationName, movementKey, movementKeyB) {
  const logs = getWorkoutLogs();

  // 1. Pencocokan movementKey eksplisit — ganti alat tidak memutus riwayat
  if (movementKey || movementKeyB) {
    for (let i = logs.length - 1; i >= 0; i--) {
      const session = logs[i];
      if (!session || !Array.isArray(session.exercises)) continue;
      const match = session.exercises.find(e => e && entryMatchesKey(e, movementKey, movementKeyB));
      if (match) return match.sets;
    }
    return null;
  }

  // 2. Fallback data lama tanpa key: hanya nama persis
  for (let i = logs.length - 1; i >= 0; i--) {
    const session = logs[i];
    if (!session || !Array.isArray(session.exercises)) continue;
    const match = session.exercises.find(e => e && e.activeVariation === variationName);
    if (match) {
      return match.sets;
    }
  }
  return null;
}

function getLastSessionByKey(movementKey, movementKeyB) {
  const logs = getWorkoutLogs();
  for (let i = logs.length - 1; i >= 0; i--) {
    const session = logs[i];
    if (!session || !Array.isArray(session.exercises)) continue;
    const match = session.exercises.find(e => e && entryMatchesKey(e, movementKey, movementKeyB));
    if (match) return match;
  }
  return null;
}

function exportCSVData() {
  const logs = getWorkoutLogs();
  if (logs.length === 0) {
    showToast("Belum ada riwayat latihan untuk diekspor!");
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,Tanggal,Hari,Gerakan,Variasi,Set,Beban(kg),Repetisi,Catatan\n";
  
  logs.forEach(session => {
    session.exercises.forEach(ex => {
      ex.sets.forEach((set, index) => {
        const row = [
          session.date,
          `"${session.dayName}"`,
          `"${ex.exerciseName}"`,
          `"${ex.activeVariation}"`,
          index + 1,
          set.weight || 0,
          set.reps || 0,
          `"${ex.note || ''}"`
        ].join(",");
        csvContent += row + "\n";
      });
    });
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `rekap_latihan_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadJSON(filename, obj) {
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function markBackedUp() {
  try {
    localStorage.setItem(BACKUP_KEY, new Date().toISOString());
    localStorage.removeItem(BACKUP_SNOOZE_KEY);
  } catch (e) {
    console.error("Gagal mencatat backup", e);
  }
  if (typeof renderBackupReminder === "function") renderBackupReminder();
}

function backupJSONData() {
  const logs = getWorkoutLogs();
  if (logs.length === 0) {
    showToast("Belum ada riwayat latihan untuk dibackup!");
    return;
  }
  downloadJSON(`gym_backup_${new Date().toISOString().slice(0,10)}.json`, {
    app: "gym-tracker",
    version: 1,
    exportedAt: new Date().toISOString(),
    logs
  });
  markBackedUp();
}

function importBackupFile(input) {
  const file = input && input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      const logs = Array.isArray(data) ? data : data.logs;
      if (!Array.isArray(logs) || logs.some(s => !s || !Array.isArray(s.exercises))) {
        showToast("File backup tidak valid.");
        return;
      }
      const current = getWorkoutLogs();
      const msg = current.length === 0
        ? `Muat ${logs.length} sesi dari backup?`
        : `Restore akan MENIMPA ${current.length} sesi saat ini dengan ${logs.length} sesi dari backup. Lanjut?`;
      if (!confirm(msg)) return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
      markBackedUp();
      if (typeof renderHistoryList === "function") renderHistoryList();
      showToast("Restore backup selesai.");
    } catch (e) {
      console.error("Restore gagal", e);
      showToast("File backup tidak valid.");
    } finally {
      input.value = "";
    }
  };
  reader.readAsText(file);
}

function needsBackupReminder() {
  try {
    if (getWorkoutLogs().length === 0) return false;
    const snooze = localStorage.getItem(BACKUP_SNOOZE_KEY);
    if (snooze && Date.now() - new Date(snooze).getTime() < 24 * 60 * 60 * 1000) return false;
    const last = localStorage.getItem(BACKUP_KEY);
    if (!last) return true;
    return Date.now() - new Date(last).getTime() > BACKUP_REMINDER_DAYS * 24 * 60 * 60 * 1000;
  } catch (e) {
    return false;
  }
}

function snoozeBackupReminder() {
  try {
    localStorage.setItem(BACKUP_SNOOZE_KEY, new Date().toISOString());
  } catch (e) {
    console.error("Gagal menunda pengingat", e);
  }
  if (typeof renderBackupReminder === "function") renderBackupReminder();
}
