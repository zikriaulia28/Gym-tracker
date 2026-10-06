const WORKOUT_PROGRAM = {
  days: [
    {
      id: "upper1",
      name: "Hari 1 - Upper 1",
      isLightAvailable: true,
      exercises: [
        { id: "u1_bench", name: "Bench press", targetSets: 3, minRep: 6, maxRep: 8, restSeconds: 150, restText: "150 dtk", movementKey: "chest_press_horizontal", alternatives: ["Bench press", "Dumbbell bench press", "Smith bench press", "Machine chest press"] },
        { id: "u1_lat", name: "Lat pulldown", targetSets: 3, minRep: 8, maxRep: 10, restSeconds: 120, restText: "2 mnt", movementKey: "pull_vertical", alternatives: ["Lat pulldown", "Neutral grip lat pulldown", "Single-arm cable pulldown", "Straight-arm cable pulldown"] },
        { id: "u1_db_press", name: "Dumbbell shoulder press", targetSets: 3, minRep: 8, maxRep: 10, restSeconds: 120, restText: "2 mnt", movementKey: "press_vertical", alternatives: ["Dumbbell shoulder press", "Machine shoulder press", "Smith shoulder press", "Arnold press"] },
        { id: "u1_row", name: "Seated cable row", targetSets: 3, minRep: 10, maxRep: 12, restSeconds: 90, restText: "90 dtk", movementKey: "pull_horizontal", alternatives: ["Seated cable row", "Chest-supported row", "One-arm dumbbell row", "T-bar row"] },
        { id: "u1_lat_fly", name: "Lateral raise + Reverse fly (superset)", targetSets: 3, minRep: 12, maxRep: 15, restSeconds: 60, restText: "60 dtk", movementKey: "delt_side", movementKeyB: "delt_rear", superset: { labelA: "Lateral raise", labelB: "Reverse fly" }, alternatives: ["Lateral raise + Reverse fly", "Cable lateral raise + Cable reverse fly", "Machine lateral raise + Reverse pec deck"] },
        { id: "u1_arms", name: "Triceps pushdown + Biceps curl (superset)", targetSets: 2, minRep: 10, maxRep: 12, restSeconds: 60, restText: "60 dtk", movementKey: "elbow_extension", movementKeyB: "elbow_flexion", superset: { labelA: "Triceps pushdown", labelB: "Biceps curl" }, alternatives: ["Triceps pushdown + Biceps curl", "Rope pushdown + Hammer curl", "DB overhead extension + Preacher curl"] }
      ]
    },
    {
      id: "lower1",
      name: "Hari 2 - Lower 1",
      isLightAvailable: true,
      exercises: [
        { id: "l1_squat", name: "Smith squat", targetSets: 3, minRep: 8, maxRep: 10, restSeconds: 150, restText: "2-3 mnt", movementKey: "squat_knee_dominant", alternatives: ["Smith squat", "Hack squat", "Goblet squat", "Leg press"] },
        { id: "l1_rdl", name: "Dumbbell RDL", targetSets: 3, minRep: 8, maxRep: 10, restSeconds: 150, restText: "2-3 mnt", movementKey: "hip_hinge", alternatives: ["Dumbbell RDL", "Barbell RDL", "Cable pull-through", "Back extension"] },
        { id: "l1_press", name: "Leg press", targetSets: 3, minRep: 10, maxRep: 12, restSeconds: 120, restText: "2 mnt", movementKey: "knee_extension_loaded", alternatives: ["Leg press", "Hack squat", "Smith squat", "Goblet squat"] },
        { id: "l1_curl", name: "Seated leg curl", targetSets: 3, minRep: 10, maxRep: 12, restSeconds: 90, restText: "90 dtk", movementKey: "hamstring_flexion", alternatives: ["Seated leg curl", "Prone leg curl", "Dumbbell leg curl", "Swiss ball curl"] },
        { id: "l1_calf", name: "Calf raise", targetSets: 3, minRep: 12, maxRep: 15, restSeconds: 60, restText: "60 dtk", movementKey: "calf", alternatives: ["Calf raise", "Smith calf raise", "Seated calf raise", "Single-leg calf raise", "Leg press calf raise"] }
      ]
    },
    {
      id: "upper2",
      name: "Hari 3 - Upper 2",
      isLightAvailable: true,
      exercises: [
        { id: "u2_incline", name: "Incline chest press", targetSets: 3, minRep: 8, maxRep: 10, restSeconds: 120, restText: "2 mnt", movementKey: "chest_press_incline", alternatives: ["Incline chest press", "Incline dumbbell press", "Smith incline press"] },
        { id: "u2_neutral_lat", name: "Neutral grip lat pulldown", targetSets: 3, minRep: 8, maxRep: 10, restSeconds: 120, restText: "2 mnt", movementKey: "pull_vertical", alternatives: ["Neutral grip lat pulldown", "Lat pulldown (wide grip)", "Single-arm cable pulldown", "Straight-arm cable pulldown"] },
        { id: "u2_row", name: "Seated cable row", targetSets: 3, minRep: 10, maxRep: 12, restSeconds: 90, restText: "90 dtk", movementKey: "pull_horizontal", alternatives: ["Seated cable row", "Chest-supported row", "One-arm dumbbell row", "T-bar row"] },
        { id: "u2_pecdeck", name: "Pec deck", targetSets: 2, minRep: 12, maxRep: 15, restSeconds: 75, restText: "75 dtk", movementKey: "chest_isolation", alternatives: ["Pec deck", "Cable fly", "Dumbbell fly"] },
        { id: "u2_lat_face", name: "Lateral raise + Face pull (superset)", targetSets: 3, minRep: 15, maxRep: 15, restSeconds: 60, restText: "60 dtk", movementKey: "delt_side", movementKeyB: "delt_rear", superset: { labelA: "Lateral raise", labelB: "Face pull" }, alternatives: ["Lateral raise + Face pull", "Cable lateral raise + Face pull", "Machine lateral raise + Face pull"] },
        { id: "u2_tri_bi", name: "Overhead triceps ext + Incline DB curl (superset)", targetSets: 2, minRep: 10, maxRep: 12, restSeconds: 60, restText: "60 dtk", movementKey: "elbow_extension", movementKeyB: "elbow_flexion", superset: { labelA: "Overhead triceps ext", labelB: "Incline DB curl" }, alternatives: ["Overhead triceps ext + Incline DB curl", "Rope pushdown + Hammer curl", "Cable overhead ext + Cable curl"] }
      ]
    },
    {
      id: "lower2",
      name: "Hari 4 - Lower 2",
      isLightAvailable: false,
      exercises: [
        { id: "l2_press_hack", name: "Leg press / Hack squat", targetSets: 3, minRep: 10, maxRep: 12, restSeconds: 120, restText: "2 mnt", movementKey: "knee_extension_loaded", alternatives: ["Leg press / Hack squat", "Smith squat", "Goblet squat"] },
        { id: "l2_hip_thrust", name: "Hip thrust", targetSets: 3, minRep: 8, maxRep: 12, restSeconds: 120, restText: "2 mnt", movementKey: "glute_hip_thrust", alternatives: ["Hip thrust", "Smith hip thrust", "Glute bridge", "Cable pull-through"] },
        { id: "l2_ext", name: "Leg extension", targetSets: 3, minRep: 12, maxRep: 15, restSeconds: 75, restText: "75 dtk", movementKey: "quad_isolation", alternatives: ["Leg extension", "Single-leg extension", "Goblet squat (tempo lambat)"] },
        { id: "l2_calf", name: "Calf raise", targetSets: 3, minRep: 12, maxRep: 15, restSeconds: 60, restText: "60 dtk", movementKey: "calf", alternatives: ["Calf raise", "Smith calf raise", "Seated calf raise"] },
        { id: "l2_curl", name: "Seated leg curl", targetSets: 3, minRep: 10, maxRep: 12, restSeconds: 90, restText: "90 dtk", movementKey: "hamstring_flexion", alternatives: ["Seated leg curl", "Prone leg curl", "Dumbbell leg curl"] }
      ]
    }
  ]
};
