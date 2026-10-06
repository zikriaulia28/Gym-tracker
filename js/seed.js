// Seed satu sesi acuan 4 Okt 2026 (upper1).
// Format entri IDENTIK dengan hasil simpan aplikasi (finishWorkout),
// supaya tidak ada dua format riwayat. Jalan sekali, tidak pernah menimpa data.
(function seedOct4() {
  try {
    if (localStorage.getItem("gym_seeded")) return;
    if (typeof getWorkoutLogs !== "function" || typeof saveWorkoutLog !== "function") return;
    if (getWorkoutLogs().length > 0) {
      localStorage.setItem("gym_seeded", "1");
      return;
    }

    const session = {
      sessionId: "seed-2026-10-04-upper1",
      date: "2026-10-04",
      dayName: "Hari 1 - Upper 1",
      isLightWeek: false,
      seeded: true,
      exercises: [
        { exerciseId: "u1_bench", exerciseName: "Bench press", movementKey: "chest_press_horizontal", activeVariation: "Bench press", maxRep: 8, restSeconds: 150, bw: 1, sets: [{ weight: 50, reps: 8 }, { weight: 50, reps: 8 }, { weight: 55, reps: 7 }], note: "" },
        { exerciseId: "u1_lat", exerciseName: "Lat pulldown", movementKey: "pull_vertical", activeVariation: "Lat pulldown", maxRep: 10, restSeconds: 120, bw: 1, sets: [{ weight: 47, reps: 10 }, { weight: 54, reps: 10 }, { weight: 54, reps: 9 }], note: "" },
        { exerciseId: "u1_db_press", exerciseName: "Dumbbell shoulder press", movementKey: "press_vertical", activeVariation: "Dumbbell shoulder press", maxRep: 10, restSeconds: 120, bw: 2, sets: [{ weight: 15, reps: 10 }, { weight: 15, reps: 10 }, { weight: 17.5, reps: 9 }], note: "" },
        { exerciseId: "u1_row", exerciseName: "Seated cable row", movementKey: "pull_horizontal", activeVariation: "Seated cable row", maxRep: 12, restSeconds: 90, bw: 1, sets: [{ weight: 40, reps: 12 }, { weight: 40, reps: 12 }, { weight: 47, reps: 12 }], note: "" },
        { exerciseId: "u1_lat_fly", exerciseName: "Lateral raise + Reverse fly (superset)", movementKey: "delt_side", movementKeyB: "delt_rear", isSuperset: true, activeVariation: "Lateral raise + Reverse fly", maxRep: 15, restSeconds: 60, bw: [2, 1], sets: [{ weight: "7.5/15", reps: "15/12" }, { weight: "7.5/15", reps: "12/12" }, { weight: "7.5/15", reps: "12/12" }], note: "" },
        { exerciseId: "u1_arms", exerciseName: "Triceps pushdown + Biceps curl (superset)", movementKey: "elbow_extension", movementKeyB: "elbow_flexion", isSuperset: true, activeVariation: "Triceps pushdown + Biceps curl", maxRep: 12, restSeconds: 60, bw: [1, 2], sets: [{ weight: "20/7.5", reps: "12/12" }, { weight: "20/7.5", reps: "12/12" }], note: "" }
      ]
    };

    saveWorkoutLog(session);
    localStorage.setItem("gym_seeded", "1");
  } catch (e) {
    console.error("Seed gagal", e);
  }
})();
