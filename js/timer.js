let timerInterval = null;
const TIMER_KEY = "gym_timer";

function startTimer(seconds) {
  stopTimer();
  try {
    localStorage.setItem(TIMER_KEY, JSON.stringify({ endsAt: Date.now() + seconds * 1000 }));
  } catch (e) { /* abaikan */ }
  let remaining = seconds;
  const timerBar = document.getElementById("timer-bar");
  const timerDisplay = document.getElementById("timer-display");
  
  timerBar.classList.remove("hidden");
  updateDisplay(remaining);

  timerInterval = setInterval(() => {
    remaining--;
    updateDisplay(remaining);
    
    if (remaining <= 0) {
      stopTimer();
      showToast("Waktu istirahat selesai!");
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    }
  }, 1000);

  function updateDisplay(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    timerDisplay.innerText = `${m}:${s}`;
  }
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  try {
    localStorage.removeItem(TIMER_KEY);
  } catch (e) { /* abaikan */ }
  document.getElementById("timer-bar").classList.add("hidden");
}

function resumeTimer() {
  try {
    const saved = localStorage.getItem(TIMER_KEY);
    if (!saved) return;
    const remaining = Math.ceil((JSON.parse(saved).endsAt - Date.now()) / 1000);
    if (remaining > 0) {
      startTimer(remaining);
    } else {
      stopTimer();
    }
  } catch (e) {
    stopTimer();
  }
}
