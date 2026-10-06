# PRD — Gym Progress Tracker & Program Latihan

| Field | Value |
|---|---|
| Versi | 2.11 |
| Tanggal | 2026-10-05 |
| Status | Adopsi mockup v2 + T28–T30 selesai |
| Owner | Pengguna (pemilik data) |
| Supersedes | Draft v1.0 |

---

## 1. Ringkasan Eksekutif

Repositori berisi aplikasi web tracker latihan gym (**vanilla JS, tanpa build, tanpa
dependensi**) dan data log latihan pribadi.

Tujuan dokumen: (1) merekam analisis kondisi tubuh dan satu sesi acuan 4 Okt 2026, (2)
memakai program yang sudah ada di `data.js` beserta aturan progresinya, (3) target nutrisi,
(4) daftar fitur yang perlu dibangun agar aplikasi benar-benar mengukur progres.

**Keputusan pemakaian data:**

1. Program yang dipakai adalah **program yang sudah ada di sistem (`data.js`)**.
2. Data progres yang dipakai hanya **sesi 4 Okt 2026 (Upper A)**.
3. Semua data progres tanggal lain **tidak dipakai**.
4. Yang bermasalah: tidak ada mekanisme progresi, tidak ada pencatatan berat badan, dan bug
   aplikasi yang membuat sebagian data tersimpan salah.
5. Koreksi dokumen draft tetap dicatat di §1.1 bila masih relevan dengan sesi 4 Okt 2026.

### 1.1 Koreksi terhadap draft v1.0

| # | Lokasi | Draft v1 | Koreksi v2 | Alasan |
|---|---|---|---|---|
| C1 | Satuan dumbel | Campuran total/per tangan | **Per tangan untuk semua entri** | Berlaku khusus untuk data 4 Okt 2026 |
| C2 | Konvensi set superset | Tidak eksplisit | **Rounds dan working set dibedakan** | Sesi 4 Okt 2026 = 17 rounds = **22 working set** karena tiap round superset menjalankan 2 gerakan |
| C3 | Cakupan seed historis | Data tanggal lain | **Dihapus; hanya 4 Okt 2026** | Sesuai keputusan pemakaian data |
| C4 | BMR Rev. Harris-Benedict | 1.768 kcal | **1.763 kcal** | Rekomputasi |
| C5 | Key betis | Tidak eksplisit | **Satu key `calf` untuk `l1_calf` dan `l2_calf`** | Agar riwayat betis tidak terpecah antar hari |
| C6 | Struktur superset §7.5 | `superset{labelA,labelB,movementKeyA,movementKeyB,pairs}` | **`superset{labelA,labelB}`** | `pairs` (~80 baris) hanya untuk pre-fill nama; UI sudah punya 4 input. Dipangkas |
| C7 | Teks | `"Goalsedua"`, `"{_kunruh}"`, `"_repo tanpa build;vdinamismekan"`, baris import CSV, `"Squad smith machine"` | Diberihkan |xelonteks korup |

---

## 2. Keputusan yang Telah Dikunci

Seluruh pertanyaan terbuka sudah dijawab. Tidak ada keputusan desain yang tertunda.

| # | Topik | Keputusan | Dampak ke kode |
|---|---|---|---|
| D1 | Sistem | **Patch app vanilla yang ada.** Bukan rewrite, bukan app pihak ketiga | Nol file baru, nol dependensi |
| D2 | Satuan dumbel | **Per tangan.** e1RM per tangan | 1 field `bw` di log, dihitung saat simpan |
| D3 | Seed historis | **Ya** — 1 sesi 4 Okt 2026, 6 entri, 22 working set, sekali jalan | `seed.js` kecil, sekali jalan, tidak menimpa data |
| D4 | Program | **Pakai program yang sudah ada di `data.js`** | Tidak ada penulisan ulang program 4 hari |
| D5 | Data selain 4 Okt 2026 | **Tidak dipakai** | Termasuk RDL, squat Smith, calf Smith, leg press 60 kg, dan semua data tanggal lain |
| D6 | Grafik e1RM | **Putus saat nama variasi berubah** | ~2 baris di prepping data chart |
| D7 | Limitasi | Kolom teks bebas `limit` di catatan (`rom` / `rir`) | Field teks, bukan dropdown |
| D8 | Increment mesin | `stepKg: null` → display "naikkan beban" tanpa angka | Nol blocking |
| D9 | Struktur superset | Dipangkas ke `{labelA, labelB}` (C6) | Hemat ~80 baris |
| D10 | Alternatif | 3–4 per slot; pengecualian `l1_calf` 5 alternatif atas permintaan pengguna | Superset tetap berpasangan A+B |
| D11 | F4 markdown | **Keluar dari scope** | Nol efek ke app |

---

## 3. Profil Pengguna

| Atribut | Nilai |
|---|---|
| Umur | 28 tahun |
| Jenis kelamin | Laki-laki |
| Tinggi badan | 170 cm |
| Berat badan | 76 kg (belum pernah tercatat ulang) |
| Frekuensi latihan | 4 hari/minggu |
| Pekerjaan | 8 jam di gas metering station, mayoritas monitoring di ruangan |
| Mobilisasi harian | ±2 jam |
| Jadwal kerja | 7 hari Pagi (08.00–16.00) → 7 hari Malam (00.00–08.00) → 7 hari libur |
| Pengalaman | Pernah latihan lama, mencapai plateau, berhenti, kini mulai lagi |
| Cedera | Tidak ada. Keterbatasan: force tidak cukup pada beberapa gerakan isolate |

Pengguna **mengelola sendiri waktu latihan** — dokumen ini tidak mengunci jam, hanya memberi
templat rotasi.

---

## 4. Data Tubuh

Bagian ini adalah referensi tubuh dan nutrisi, bukan log progres latihan.
Satu-satunya log latihan yang dipakai tetap sesi 4 Okt 2026 pada §6–§7.

### 4.1 Pengukuran

| Lingkar | 27 Sep 2026 | 5 Okt 2026 | Δ (8 hari) |
|---|---|---|---|
| Dada | 97 cm | 97 cm | 0 |
| **Perut** | **93 cm** | **95 cm** | **+2** ⚠️ |
| **Pinggang** | **88 cm** | **89 cm** | **+1** |
| Lengan biceps | 36 cm | 36 cm | 0 |
| Lengan triceps | 32 cm | 32 cm | 0 |
| Paha | 58 cm | 58 cm | 0 |
| Betis | 39 cm | 38 cm | −1 |

> ⚠️ **Perlu verifikasi.** Kenaikan 2 cm pada perut dalam 8 hari dengan semua ukuran lain
> flat hampir pasti error pengukuran (waktu berbeda, setelah makan, tegangan tali ukur), bukan
> perubahan komposisi tubuh. Kedua angka disimpan apa adanya.

### 4.2 Komposisi Tubuh

| Metrik | Nilai | Interpretasi |
|---|---|---|
| BMI | 76 / 1,70² = **26,3** | Overweight (kurang sensitif untuk massa otot) |
| Rasio pinggang/tinggi | 0,52–0,55 | Risiko metabolik sedang (moderate: 0,50–0,59) |
| Lingkar pinggang | 89–95 cm | Central obesity (batas IMS/IDF pria Asia: ≥90 cm) |
| BMR Mifflin-St Jeor | **1.688 kcal** | Acuan utama |
| BMR Rev. Harris-Benedict | 1.763 kcal | |

**Arah fokus: Body Recomposition.** Pinggang di ambang central obesity + latihan yang sudah
berkembang (bench 55 kg × 7 pada BB 76 kg) menunjukkan ada massa otot layak dipertahankan
sementara lemak perlu turun. Surplus agresif menambah lemak di area yang sedang jadi masalah;
defisit besar membuang otot yang usaha-nya sudah dibayar.

---

## 5. Analisis Progres Latihan

**e1RM (Epley):** `beban × (1 + reps / 30)`
**Volume:** `Σ (beban × reps) × bw`

`bw` = 1 untuk machine / barbell / cable. `bw` = 2 untuk dumbel di **setiap**
tangan. Dihitung **sekali saat simpan** dan disimpan di log entry — chart tidak pernah menebak
ulang.

---

## 6. Log Latihan & Seed Historis

### 6.1 Ringkasan Sesi

Hanya satu sesi yang dipakai:

| Tanggal | Sesi | Entri gerakan | Working set | Rounds | Catatan |
|---|---|---|---|---|---|
| 4 Okt 2026 | Upper A | 6 | 22 | 17 | 2 superset, format gabungan `"A/B"` |

Seed memakai format **persis hasil simpan aplikasi** (6 entri, superset digabung `"7.5/15"`).
Working set 22 lebih besar daripada rounds 17 karena tiap round superset menjalankan
2 gerakan.

### 6.2 Nilai acuan e1RM 4 Okt 2026

PRD ini tidak lagi membandingkan antar tanggal. Nilai berikut adalah titik awal
satu sesi acuan.

| Gerakan | `movementKey` | Set terbaik 4 Okt 2026 | e1RM |
|---|---|---|---|
| Bench press | `chest_press_horizontal` | 55 kg × 7 | 67,8 kg |
| Lat pulldown | `pull_vertical` | 54 kg × 10 | 72,0 kg |
| Dumbbell shoulder press | `press_vertical` | 17,5 kg/tangan × 9 | 22,75 kg |
| Seated cable row | `pull_horizontal` | 47 kg × 12 | 65,8 kg |
| Dumbbell lateral raise | `delt_side` | 7,5 kg/tangan × 15 | 11,25 kg |
| Reverse fly | `delt_rear` | 15 kg × 12 | 21,0 kg |
| Triceps pushdown | `elbow_extension` | 20 kg × 12 | 28,0 kg |
| Dumbbell biceps curl | `elbow_flexion` | 7,5 kg/tangan × 12 | 10,5 kg |

### 6.3 Interpretasi sesi acuan

**a. Baseline tersedia.** Sesi 4 Okt 2026 memberi titik awal e1RM untuk delapan
`movementKey` Upper A.

**b. Aturan progresi tetap diperlukan.** Lat pulldown mencapai `10, 10, 9` pada rentang
8–10; aturan lama tidak menyalakan peringatan kenaikan beban. Lihat §9.1.

**c. Konteks superset harus tampil.** Triceps pushdown dan gerakan isolasi lain pada
sesi ini dicatat dalam superset; grafik dan tampilan “sesi lalu” harus menunjukkan
konteks tersebut, bukan hanya garis beban.

**d. Data tanggal lain tidak dipakai.** Semua analisis tanggal lain, perbandingan
antar sesi, cakupan otot mingguan, dan kesimpulan plateau historis dihapus dari PRD ini.

### 6.4 Seed — Mapping 6 Entri 4 Okt 2026 ke `movementKey`

Beban dumbel sudah dalam satuan **per tangan** (D2). Kolom `bw` ditulis eksplisit.

**4 Okt 2026 — Upper A (22 working set, 17 rounds)**

| # | `movementKey` | Variasi | Set | `bw` |
|---|---|---|---|---|
| 1 | `chest_press_horizontal` | Bench press | 50×8, 50×8, 55×7 | 1 |
| 2 | `pull_vertical` | Lat pulldown | 47×10, 54×10, 54×9 | 1 |
| 3 | `press_vertical` | Dumbbell shoulder press | 15×10, 15×10, 17,5×9 | 2 |
| 4 | `pull_horizontal` | Seated cable row | 40×12, 40×12, 47×12 | 1 |
| 5 | `delt_side` + `delt_rear` | Lateral raise + Reverse fly | `"7.5/15"` × 15/12, 12/12, 12/12 | 2 + 1 |
| 6 | `elbow_extension` + `elbow_flexion` | Triceps pushdown + Biceps curl | `"20/7.5"` × 12/12, 12/12 | 1 + 2 |

Entri 5–6 adalah superset, disimpan gabungan `"A/B"` persis seperti hasil simpan aplikasi.
Kolom `bw` entri superset menyimpan kedua sisi (`[2, 1]` dan `[1, 2]`).

### 6.5 Catatan Penting tentang Seed

**a. Garis e1RM tidak disambung antar variasi berbeda.** Aturan D6 tetap dipakai agar
penggantian alat pada sesi berikutnya tidak menampilkan regresi palsu.

**b. Satu sesi tidak boleh punya dua entri pada `movementKey` yang sama.** Pemetaan
4 Okt 2026 sudah memenuhi aturan ini.

**c. Field `limit` tetap disediakan.** Tidak ada entri `limit: rom` pada sesi acuan ini,
tetapi field teks bebas tetap diperlukan untuk sesi berikutnya bila pembatasnya ROM atau RIR,
bukan kekuatan.

### 6.6 Cross-Reference dengan Config yang Dipakai

Sesi 4 Okt cocok 1:1 dengan definisi `upper1` di `data.js` — 6 dari 6 gerakan, seluruh jumlah
set, seluruh rep range cocok persis. Tidak ada gerakan pengganti yang tidak tercatat.

File `Data Progress Latihan.md` tidak memuat waktu istirahat untuk sesi 4 Okt. Nilai
istirahat direkonstruksi dari definisi `upper1` di `data.js`:

| Gerakan | Set × Rep | Istirahat dari `data.js` |
|---|---|---|
| Bench press | 3 × 8, 8, 7 | 150 dtk |
| Lat pulldown | 3 × 10, 10, 9 | 120 dtk |
| Dumbbell shoulder press | 3 × 10, 10, 9 | 120 dtk |
| Seated cable row | 3 × 12, 12, 12 | 90 dtk |
| Lateral raise + Reverse fly | 3 × 15/12, 12/12, 12/12 | 60 dtk |
| Triceps pushdown + Biceps curl | 2 × 12/12, 12/12 | 60 dtk |

---

## 7. Baseline e1RM 4 Okt 2026

Hanya memakai sesi acuan 4 Okt 2026 sebagai titik awal Upper A.

| `movementKey` | Set terbaik | e1RM (per tangan) |
|---|---|---|
| `pull_vertical` | 54 kg × 10 | 72,0 |
| `chest_press_horizontal` | 55 kg × 7 | 67,8 |
| `pull_horizontal` | 47 kg × 12 | 65,8 |
| `elbow_extension` | 20 kg × 12 | 28,0 |
| `press_vertical` | 17,5 kg/tangan × 9 | 22,75 |
| `delt_rear` | 15 kg × 12 | 21,0 |
| `delt_side` | 7,5 kg/tangan × 15 | 11,25 |
| `elbow_flexion` | 7,5 kg/tangan × 12 | 10,5 |

### Titik yang Harus Naik di Sesi Berikutnya

| `movementKey` | Sesi terakhir | Target |
|---|---|---|
| `pull_vertical` | 54 kg × 10, 54 kg × 9 | **Naikkan beban** — 2 dari 3 set sudah di batas atas |
| `pull_horizontal` | 47 kg × 12, 47 kg × 12, 47 kg × 12 | **Naikkan beban** — semua set di batas atas |
| `delt_side` | 7,5 kg/tangan × 15, 12, 12 | Pantau 2 sesi; belum memenuhi pemicu naik beban |
| `press_vertical` | 17,5 kg/tangan × 9 | Lanjutkan progres rep dari batas bawah |

> **Karena D8, target ditampilkan tanpa angka** ("naikkan beban"). Increment mesin adalah data
> fisik yang belum dipetakan; `stepKg` null. Angka dapat diisi kapan saja tanpa mengubah
> struktur.

---

## 8. Program yang Dipakai

Program tidak ditulis ulang. Satu-satunya sumber kebenaran regimen adalah
`data.js` yang sudah ada di sistem (`upper1`, `lower1`, `upper2`, `lower2`).

### 8.1 Prinsip implementasi

1. Set, rentang repetisi, dan istirahat mengikuti `data.js` yang sudah ada.
2. PRD ini hanya menambahkan metadata pelacakan: `movementKey`, label superset
   `labelA`/`labelB`, maksimal 2 alternatif per slot, dan aturan progresi §9.
3. Angka detik istirahat ditampilkan eksplisit di UI.
4. Warm-up tetap disarankan untuk gerakan compound.
5. Sesi acuan implementasi dan seed adalah `upper1` pada 4 Okt 2026.

### 8.2 Hari yang dipakai

- `upper1`: dipakai sebagai sesi acuan dan seed 4 Okt 2026.
- `lower1`, `upper2`, `lower2`: tetap dipakai apa adanya dari `data.js`.
- Tidak ada penambahan gerakan baru, termasuk hip thrust.
- Tidak ada perubahan jumlah set, repetisi, atau istirahat program.

### 8.3 Cakupan yang tidak dihitung ulang

PRD ini tidak menghitung volume mingguan karena regimen tidak ditulis ulang.
Volume diukur per sesi tersimpan melalui grafik volume pada F3.3.

Analisis tanggal lain, volume program alternatif, ramp mingguan, dan isu defisit
otot program lain dihapus karena berada di luar keputusan pemakaian data.

---

## 9. Aturan Progresi (Double Progression)

1. Semua set dimulai pada **batas bawah** rep range.
2. Tambah 1 repetisi per set sampai batas atas range tercapai.
3. **Pemicu kenaikan beban** — berlaku bila salah satu terpenuhi:
   - Semua set mencapai batas atas range; **atau**
   - **≥2 dari 3 set mencapai batas atas range dengan beban yang sama** (syarat beban sama
     mencegah saran naik beban saat lifter sudah menaikkan beban mid-session — kasus bench
     `50×8, 50×8, 55×7`); **atau**
   - Set terbaik tidak berubah dalam 2 sesi berturut-turut dengan beban sama.
4. Saat pemicu menyala → **tambah beban** (increment terdekat yang tersedia di mesin, atau
   beban terdekat jika `stepKg` null), lalu turunkan kembali ke batas bawah range.
5. Jika gagal mencapai batas bawah 2 sesi berturut-turut → turunkan beban 5–10%.
6. Rekor last set wajib dicatat setiap gerakan agar app bisa menampilkan target sesi berikutnya.
7. Jika `limit` terisi `rom`, badge progresi menampilkan "batas ROM, bukan kekuatan" dan tidak
   menyuruh naikkan beban.

### 9.1 Perbaikan atas Aturan Lama

Aturan lama hanya menyalakan badge bila **seluruh** set mencapai batas atas. Pada rep range
berselisih 3, achieving 2 dari 3 set sudah merupakan sinyal jelas — aturan lama mengabaikannya.

| Situasi | Aturan lama | Aturan baru |
|---|---|---|
| `8, 8, 7` pada range 6–8 | Tidak menyala | Tidak menyala |
| `10, 10, 9` pada range 8–10 | Tidak menyala | **Menyala** |
| `12, 12, 12` pada range 10–12 | Menyala | Menyala |
| Beban sama 2 sesi, set terbaik sama | Tidak menyala | **Menyala** |

Kasus `10, 10, 9` adalah **lat pulldown pada 4 Okt 2026**. Lihat §6.3 dan §11 F2.9.

### 9.2 Aturan Operasional di Gym

> **Tunggu lebih dari 90 detik → pindah ke gerakan alternatif.**

Timer istirahat di aplikasi dipakai selama menunggu.

---

## 10. `movementKey` & Sistem Alternatif

### 10.1 Masalah yang Diperbaiki

Dropdown alternatif sudah ada (`alternatives` di `data.js`, dirender di `workout.js:183`),
tetapi memiliki cacat:

| # | Cacat pada `data.js` yang dipakai | Dampak |
|---|---|---|
| A1 | `"Machine high row"` dipakai sebagai alternatif `u1_lat` dan `u2_neutral_lat` | High row = **horizontal** pull, bukan vertical pull. Mengganti karena alat dipakai orang justru mengubah pola gerak |
| A2 | Alternatif superset tidak berpasangan | UI selalu meminta input A dan B, tetapi hanya opsi pertama tiap superset yang memberi pasangan. Contoh `u1_arms`: `"Rope pushdown / DB skull crusher"` dan `"Cable curl / Hammer curl / Preacher curl"` tidak menyatakan komponen A/B secara eksplisit |
| A3 | `"Incline machine"` duplikat `"Incline chest press"` | Pilihan tidak berguna pada `u2_incline` |
| A4 | Nama row tidak konsisten antar hari | `u1_row` = `"Seated cable row"`, sedangkan `u2_row` = `"Cable row"` → riwayat terpecah |

### 10.2 Cacat Paling Merusak: Memakai Alternatif Membuang Riwayat

`storage.js:29` mencocokkan dengan substring dua arah:

```js
activeLower.includes(varLower) || varLower.includes(activeLower)
```

- `"Dumbbell bench press"` vs `"Bench press"` → **tidak cocok** → riwayat orphan
- `"Neutral grip lat pulldown"` mengandung `"lat pulldown"` → **cocok** → Upper A menampilkan
  angka Upper B
- `"Leg press / Hack squat"` mengandung `"Leg press"` → **cocok** → Lower A tertukar dengan Lower B

Artinya: begitu alternatif dipakai — justru di hari paling butuh data — datanya hilang.

### 10.3 Solusi: `movementKey` Eksplisit

Setiap gerakan mendapat satu key yang merepresentasikan **fungsi ototnya**, bukan nama alatnya. Semua alternatif mewarisi key yang sama. Konsekuensi: mengganti alat tidak memutus
riwayat, dan grafik menyambung antar hari untuk gerakan yang sama.

### 10.4 `movementKey` yang Dipakai

| Key | Grup otot | Dipakai pada ID `data.js` |
|---|---|---|
| `chest_press_horizontal` | Dada press horizontal | `u1_bench` |
| `pull_vertical` | Tarik vertikal | `u1_lat`, `u2_neutral_lat` |
| `press_vertical` | Press vertikal | `u1_db_press` |
| `pull_horizontal` | Tarik horizontal | `u1_row`, `u2_row` |
| `delt_side` | Deltoid lateral | `u1_lat_fly`-A, `u2_lat_face`-A |
| `delt_rear` | Deltoid rear / upper back | `u1_lat_fly`-B, `u2_lat_face`-B |
| `elbow_extension` | Triceps | `u1_arms`-A, `u2_tri_bi`-A |
| `elbow_flexion` | Biceps | `u1_arms`-B, `u2_tri_bi`-B |
| `chest_press_incline` | Dada press incline | `u2_incline` |
| `chest_isolation` | Dada isolasi | `u2_pecdeck` |
| `squat_knee_dominant` | Squat knee dominant | `l1_squat` |
| `hip_hinge` | Hinge | `l1_rdl` |
| `knee_extension_loaded` | Knee extension loaded | `l1_press`, `l2_press_hack` |
| `hamstring_flexion` | Hamstring fleksi | `l1_curl`, `l2_curl` |
| `calf` | Betis | `l1_calf`, `l2_calf` |
| `quad_isolation` | Quad isolasi | `l2_ext` |
| `glute_hip_thrust` | Glute hip thrust | `l2_hip_thrust` |

**Shared key disengaja** — agar riwayat dan grafik menyambung: `pull_vertical`,
`pull_horizontal`, `delt_side`, `delt_rear`, `elbow_extension`, `elbow_flexion`,
`knee_extension_loaded`, `hamstring_flexion`, dan `calf`.

> **Penting:** `squat_knee_dominant` (`l1_squat`) dan `knee_extension_loaded`
> (`l1_press`) **sengaja dibedakan**, meskipun leg press bisa dipakai sebagai alternatif
> squat. Kalau sama, keduanya saling menimpa histori di sesi yang sama.

### 10.5 Struktur Superset (dipangkas)

```js
{
  id: "u1_lat_fly",
  name: "Lateral raise + Reverse fly (superset)",
  movementKey: ["delt_side", "delt_rear"],
  superset: {
    labelA: "Lateral raise",
    labelB: "Reverse fly"
  }
}
```

Card menampilkan `labelA` / `labelB` sebagai header kolom di atas input A dan B
(workout.js:152-161). Struktur data menggantikan `isExerciseSuperset()` yang sekarang menebak
dari string `"+"` — `"Triceps pushdown + Reverse fly"` (nama gerakan biasa) tidak lagi salah
dikira superset.

**Yang dipangkas:** array `pairs` (~80 baris, 6 blok). UI sudah punya 4 input; dropdown hanya
meng abbreviate nama gerakan yang dipilih. Tambahkan pasangan bila ada kebutuhan nyata.

---

## 11. Kebutuhan Fungsional

### F1 — Metadata Program yang Sudah Ada

Regimen tidak ditulis ulang. F1 hanya menambahkan metadata pelacakan pada
`data.js` yang sudah ada.

| ID | Requirement | Estimasi |
|---|---|---|
| F1.1 | Tambahkan `movementKey` sesuai §10.4 pada semua slot `data.js`, tanpa mengubah set/rep/istirahat | ~20 baris |
| F1.2 | Tambahkan `superset{labelA,labelB}` pada slot superset yang sudah ada | ~10 baris |
| F1.3 | Batasi alternatif menjadi 3–4 per slot dan hapus alternatif salah pola A1–A4 | ~15 baris |
| F1.4 | Dropdown "Variasi" merender header kolom A/B untuk superset | ~10 baris |

**Acceptance:**
- Set, repetisi, dan istirahat program tetap sama dengan `data.js` lama
- Memilih alternatif "Dumbbell bench press" tetap menampilkan riwayat "Sesi lalu" Bench press
- Superset menampilkan 2 header gerakan (A dan B)
- `u1_row` dan `u2_row` memakai `movementKey` yang sama
- `"Machine high row"` tidak lagi menjadi alternatif gerakan vertical pull

### F2 — Perbaikan Bug

| ID | Bug | Lokasi | Perbaikan | P |
|---|---|---|---|---|
| F2.1 | Grafik superset selalu `NaN` — `Math.max("20/7.5")` | `chart.js:42` | Parse komponen sebelum `Math.max` | P0 |
| F2.2 | "Sesi lalu" menampilkan gerakan salah (substring match) | `storage.js:29` | Pencocokan `movementKey` eksplisit | P0 |
| F2.3 | Tanggal ambigu gaya `DD/MM/YYYY`, misalnya `04/10/2026`, tidak sortable | `workout.js:288` | Simpan ISO `2026-10-04` | P0 |
| F2.4 | Sesi bisa tersimpan dua kali | `workout.js:286-298` | ID sesi unik + nonaktifkan tombol setelah simpan + abaikan penyimpanan ulang ID sama | P0 |
| F2.11 | Tidak ada backup/restore; `localStorage` bisa hilang karena browser/private-mode/ganti origin | `storage.js`, tab Riwayat | Backup JSON unduhan + restore JSON dengan validasi dan konfirmasi sebelum menimpa | P0 |
| F2.12 | Timer istirahat hilang saat refresh | `timer.js:3-21` | Simpan status timer berjalan ke draft dan pulihkan sisa waktu saat refresh; atau hentikan dengan status jelas | P1 |
| F2.5 | Riwayat tidak bisa dihapus/diedit | `progress.js` | Tombol hapus per sesi | P1 |
| F2.6 | LocalStorage korup membuat app mati — `JSON.parse` tanpa `try/catch` | `storage.js:3-6` | `try/catch` + fallback | P1 |
| F2.7 | Chart.js dari CDN, tidak ada fallback — tab Grafik mati saat offline | `index.html:9` | Deteksi kegagalan muat | P1 |
| F2.8 | Catatan disisipkan via `innerHTML` tanpa escape | `progress.js:30` | Escape sebelum disisipkan | P2 |
| F2.9 | `checkProgression()` hanya memicu bila **semua** set di batas atas | `workout.js:262-284` | Terapkan pemicu 3-lapis di §9.1 | P0 |
| F2.10 | `restText` tidak menampilkan detik eksplisit; jarak aktual selalu lebih panjang dari preset | `data.js`, `workout.js:177` | Tampilkan preset eksplisit (mis. "150 dtk") | P1 |

**Acceptance:**
- Grafik menampilkan garis valid untuk semua gerakan superset pada `upper1`
- Slot pull yang memakai `movementKey` berbeda menampilkan angka "Sesi lalu" yang berbeda
- Klik/ketuk "Simpan" dua kali berturut-turut menghasilkan 1 entri riwayat dengan ID sesi yang sama
- Setiap entri riwayat punya tombol hapus yang bekerja
- Badge progresi **menyala** untuk `10, 10, 9` pada range 8–10, **tidak menyala** untuk `8, 8, 7`
  pada range 6–8
- Badge progresi menyala untuk gerakan dengan beban dan set terbaik identik di 2 sesi berturut

### F3 — Pelacak

| ID | Requirement | Estimasi |
|---|---|---|
| F3.1 | Field **berat badan** per sesi (pagi, sebelum makan) | ~5 baris |
| F3.2 | Grafik **e1RM (Epley)** sebagai garis utama | ~10 baris |
| F3.3 | Grafik total volume (`Σ beban × reps × bw`) sebagai garis kedua | ~5 baris |
| F3.4 | Display target double progression per gerakan | ~10 baris |
| F3.5 | Field catatan **RIR** dan **`limit`** per gerakan (teks bebas) | ~5 baris |
| F3.6 | Saran warm-up untuk compound | ~5 baris |
| F3.7 | Display total durasi sesi | ~5 baris |
| F3.8 | Peringatan hari libur untuk balance check | ~5 baris |
| F3.9 | Hitung dan simpan `bw` saat simpan sesi | ~3 baris |
| F3.10 | Grafik e1RM **putus saat nama variasi berubah** (D6) | ~2 baris |
| F3.11 | Normalisasi desimal koma Indonesia pada input beban (`7,5` → `7.5`) | ~5 baris |

**Acceptance:**
- Sesi menyimpan berat badan; grafik berat badan tersedia
- Grafik e1RM menampilkan satu titik awal per `movementKey` dari sesi acuan 4 Okt 2026
- Bench press acuan 4 Okt 2026 tampil sebagai 67,8 kg
- Volume 4 Okt 2026 dihitung dengan `bw`
- Penggantian variasi pada sesi berikutnya tidak menyambung garis e1RM lama
- Volume dumbel dihitung dengan `bw: 2`
- Entry dengan `limit: rom` menampilkan "batas ROM, bukan kekuatan" dan tidak menyuruh naik
  beban

### F4 — Seed Historis

| ID | Requirement | Estimasi |
|---|---|---|
| F4.1 | `seed.js` berisi array statis 1 sesi 4 Okt 2026 sesuai §6.4, format identik hasil simpan aplikasi | ~25 baris |
| F4.2 | Guard: hanya jalan jika key `gym_seeded` belum ada — tidak pernah menimpa data asli | ~3 baris |
| F4.3 | Beban dumbel sudah per tangan; `bw` eksplisit per entri | — |

**Acceptance:**
- Setelah load pertama, Riwayat menampilkan 1 sesi / 6 entri / 22 working set
- Klik "Simpan" pada sesi baru tidak menambahkan duplikat seed
- Muat ulang kedua tidak menambah entri

---

## 11A. Urutan Implementasi Final

Prinsip urutan: **data tidak hilang dulu, data benar kedua, data bisa dibaca ketiga,
UX mobile terakhir.**

### P0 — Wajib pertama: integritas data lokal dan anti-hilang

Urutan pengerjaan:

1. F2.6 — `try/catch` `localStorage` + fallback aman.
2. F2.3 — tanggal ISO `YYYY-MM-DD`.
3. F2.4 + F2.12 — ID sesi unik + tombol simpan dikunci agar double-tap tidak duplikat.
4. F2.11 — backup JSON + restore JSON bervalidasi.
5. F2.2 — `movementKey` eksplisit untuk riwayat dan grafik.
6. F1.1–F1.4 — metadata `movementKey`, label superset A/B, dan pembatasan alternatif.
7. F4.1–F4.3 — seed 4 Okt 2026 setelah struktur riwayat final.
8. F2.9 — pemicu progresi 3 lapis.

Kriteria lolos P0:

- Refresh saat latihan berjalan tidak menghapus draft.
- Double-tap simpan tidak membuat sesi ganda.
- Storage korup tidak mematikan aplikasi.
- Riwayat tidak tertukar karena nama variasi mirip.
- Data dapat dibackup dan dikembalikan dari file JSON.

### P1 — Kedua: pengukuran mobile

Urutan pengerjaan:

1. F3.9 — hitung dan simpan `bw`.
2. F3.11 — normalisasi koma desimal Indonesia.
3. F3.1 — berat badan per sesi.
4. F3.5 — RIR dan `limit` teks bebas.
5. F3.2 + F3.3 + F3.10 — grafik e1RM dan volume berbasis `movementKey`.
6. F3.4 — target double progression.
7. F2.1 — parsing superset sebelum `Math.max`.
8. F2.5 — hapus sesi per entri.
9. F2.7 — fallback bila Chart.js CDN gagal.
10. F2.10 — detik istirahat eksplisit.
11. F2.12 — timer tahan refresh atau berhenti dengan status jelas.
12. F3.6–F3.8 — warm-up, durasi sesi, dan pengingat rotasi.

Kriteria lolos P1:

- e1RM, volume, berat badan, RIR, dan `limit` tercatat konsisten.
- Grafik valid untuk semua slot `upper1`, termasuk superset.
- Penggantian variasi tidak membuat regresi palsu.

### P2 — Terakhir: UX dan keamanan tampilan mobile

Urutan pengerjaan:

1. F2.8 — escape catatan sebelum `innerHTML`.
2. Input beban/rep lebih besar dan ramah jempol.
3. Header kolom A/B superset jelas di layar kecil.
4. Timer sticky tidak menutupi tombol simpan.
5. PWA minimal/offline bila diperlukan, tetap tanpa backend.

Kriteria lolos P2:

- Aplikasi nyaman dipakai satu tangan di gym.
- Tidak ada teks catatan yang bisa merusak tampilan riwayat.
- Alur simpan tetap aman pada layar kecil dan koneksi buruk.

## 12. Nutrisi

### 12.1 Target Harian

| Zat | Target | Dasar |
|---|---|---|
| **Total kalor** | **2.200 kcal** | Mendekati maintenance — defisit datang dari langkah kaki |
| **Protein** | **160 g** (2,1 g/kg) | Wajib. Tanpa ini, defisit membuang otot |
| Lemak | 70 g | ~29% kalor, untuk hormonal & saturasi |
| Karbohidrat | 232 g | Sisa kalor |
| Air | 2,5–3 L | |
| Serat | 35 g | |

### 12.2 Rasional Defisit

| Komponen | Nilai |
|---|---|
| BMR | 1.688–1.763 kcal |
| TDEE saat ini (kerja duduk + 4× gym) | ~2.350 kcal |
| TDEE dengan 9.000 langkah/hari | ~2.700 kcal |
| Intake | 2.200 kcal |
| **Defisit efektif** | **~500 kcal/hari** |

Defisit sengaja dibangun dari **NECAT / langkah kaki**, bukan dari sesi gym tambahan. Selaras
dengan G2 (hemat waktu).

### 12.3 Target Aktivitas Harian

| Target | Nilai |
|---|---|
| Langkah/hari | **9.000** |

Perkiraan: 4 sesi gym membakar ±1.600 kcal/minggu; berjalan 9.000 langkah membakar
±2.800–3.500 kcal/minggu. Berjalan adalah kontributor defisit terbesar dan **tidak memakan satu
menit pun di gym**.

### 12.4 Ekspektasi Laju

**0,4–0,5 kg lemak hilang per minggu** dengan otot naik bersamaan. Untuk lingkar perut
mengecil stabil: **8–12 minggu**.

---

## 13. Jadwal Latihan

### 13.1 Aturan Rotasi

**Dalam setiap 4 sesi, pastikan 2 Upper dan 2 Lower.** Ini memperbaiki ketidakseimbangan yang
membuat program lama mentok.

Urutan: **Upper A → Lower A → Upper B → Lower B →** (ulang).

### 13.2 Kalau Hanya Bisa 3 Sesi/Minggu

**Upper A, Lower A, Upper B** — skip Lower B (sesi paling ringan, 11 set). Upper didahulukan
karena lebih cepat pulih dan secara teknis lebih mendesak.

### 13.3 Penempatan terhadap Jadwal Shift

| Blok shift | Saran |
|---|---|
| 7 hari Pagi (08.00–16.00) | Latihan setelah shift. Compound lebih awal di sesi |
| 7 hari Malam (00.00–08.00) | **Jangan** latihan compound berat segera setelah shift — recovery sistem saraf terendah |
| 7 hari libur | Fleksibel. Bisa menambah 1 sesi untuk menyeimbangkan |

Sesi compound besar (bench, squat, RDL) sebaiknya **tidak** ditempatkan di hari segera setelah
shift malam.

---

## 14. Tujuan & Metrik Sukses

### 14.1 Tujuan

| # | Tujuan | Horizon |
|---|---|---|
| G1 | Lingkar perut turun, massa otot naik (recomposition) | 12 minggu |
| G2 | Sesi latihan selesai ≤45 menit | Immediate |
| G3 | Regresi zero pada data yang tercatat | Immediate |
| G4 | Progres dapat diukur dan dibuktikan (e1RM + berat badan) | Immediate |

### 14.2 Metrik Sukses (dievaluasi mingguan)

| Metrik | Target | Cara ukur |
|---|---|---|
| e1RM compound (bench, squat, RDL) | +2,5% per 2 minggu | Grafik e1RM |
| e1RM isolation | +5% per 2 minggu | Grafik e1RM |
| Berat badan | Stabil, toleransi ±1 kg | Timbang pagi sebelum makan, 3×/minggu |
| Lingkar perut | −1 cm per 4 minggu | Ukur mingguan, kondisi sama |
| Lingkar lengan & dada | Tidak turun | Ukur mingguan |
| Durasi sesi | ≤45 menit | Display timer sesi |
| Kelengkapan data | 100% sesi punya catatan RIR | Field RIR |
| Alur rotasi | 2 Upper : 2 Lower per 4 sesi | Urutan di aplikasi |

### 14.3 Ekspektasi Realistis

Karena ini **bangun kembali setelah berhenti** (bukan pemula):

| Periode | Yang diharapkan |
|---|---|
| Minggu 1–3 | Kekuatan kembali cepat (adaptasi saraf). Berat badan relatif datar |
| Minggu 4–8 | Otot mulai terlihat kembali. **Lingkar perut kemungkinan belum bergerak** |
| Minggu 8–12 | Recomposition terlihat: perut turun, otot naik |

> ⚠️ **Peringatan alignment:** minggu 3–4 lingkar perut kemungkinan tidak bergerak sama sekali
> sementara otot sudah mulai naik. **Jangan turunkan kalor untuk merespons ini.** Progres
> diukur dari berat badan mingguan + e1RM, **bukan** dari pita ukur badan. Kalor tetap
> 2.200 kcal.

---

## 15. Batasan (Di Luar Scope)

| Item | Alasan |
|---|---|
| Backend / server / akun pengguna | Aplikasi lokal single-user, `localStorage` cukup |
| Build tool, bundler, npm dependency | Repo tanpa build; perubahan langsung |
| Import CSV ke aplikasi | Ekspor CSV sudah ada; import di luar scope |
| Aplikasi mobile native | Cukup lewat browser |
| Meal planning mingguan | Yang ada hanya target makro |
| Tracking konsumsi makanan | Prioritas: akurasi data latihan dulu |
| Auto-generate PDF | Milik `prompt/nutrisi.md`, bukan fitur aplikasi |
| Kebersihan markdown (F4 draft v1) | Nol efek ke app — D11 |
| Increment mesin (`stepKg`) | D8 — null, display tanpa angka |
| Struktur `superset.pairs` | C6 — dipangkas ke `{labelA, labelB}` |
| Matriks alternatif lengkap | D10 — 2 per slot |

---

## 16. Pertanyaan Terbuka

| # | Pertanyaan | Status |
|---|---|---|
| Q1 | Satuan dumbel per tangan atau total? | **Terjawab: per tangan.** D2, koreksi C1 |
| Q2 | Apakah riwayat lama di-seed ke `localStorage`? | **Terjawab: hanya 4 Okt 2026.** D3, F4 |
| Q3 | Increment beban terdekat yang tersedia di mesin? | **Ditunda** — D8, `stepKg: null` |
| Q4 | Konvensi input koma di app? | **Terjawab: koma** — mengikuti konvensi Indonesia (`7,5 kg`) |
| Q5 | Apakah program perlu ditulis ulang? | **Terjawab: tidak.** Program yang dipakai adalah `data.js` yang sudah ada |
| Q6 | Data progres selain 4 Okt 2026? | **Terjawab: tidak dipakai.** Termasuk semua sesi lain dan baseline tanggal lain |

---

## 17. Lampiran — Ringkasan e1RM Awal

Hanya memakai baseline §7 dari 4 Okt 2026. Tidak ada data tanggal lain.

### Titik yang Harus Naik di Sesi Berikutnya

Sudah tercantum di §7. Ringkasan:

| `movementKey` | Target |
|---|---|
| `pull_vertical` | Naikkan beban — 2 dari 3 set sudah di batas atas |
| `pull_horizontal` | Naikkan beban — semua set di batas atas |
| `delt_side` | Pantau 2 sesi; belum memenuhi pemicu naik beban |
| `press_vertical` | Lanjutkan progres rep dari batas bawah |