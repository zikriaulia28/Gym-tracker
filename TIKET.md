# Tiket Implementasi — Gym Tracker

Repo tidak punya remote GitHub, jadi tiket dicatat di sini.
Urutan = §11A PRD v2.2. Satu tiket = satu unit yang bisa diverifikasi sendiri.

Aturan tetap: **tidak ada tiket dinyatakan selesai sebelum lolos semua
langkah cross-check-nya.**

Legenda status: `OPEN` belum dikerjakan · `DOING` sedang dikerjakan ·
`DONE` lolos cross-check.

---

## P0 — Integritas data

### T1 — Proteksi storage korup (F2.6) — DONE
- `try/catch` semua baca `localStorage` + fallback aman.
- Cross-check: isi storage dengan JSON rusak → app tetap jalan, riwayat kosong aman.

### T2 — Tanggal ISO (F2.3) — DONE
- Simpan `YYYY-MM-DD`; tampil format Indonesia.
- Cross-check: simpan sesi → tanggal tersimpan ISO dan terurut benar.

### T3 — Anti double-save (F2.4) — DONE
- ID sesi unik + tombol dikunci setelah simpan + abaikan ID sama.
- Cross-check: klik/ketuk 2× cepat → tepat 1 entri di riwayat.

### T4 — Backup/restore JSON — DONE (v2.2)
- Selesai: tombol Backup/Restore + pengingat 7 hari. Terverifikasi 5 kasus logika.

### T5 — `movementKey` riwayat (F2.2) — DONE
- Ganti substring-match dengan key eksplisit.
- Cross-check: pilih "Dumbbell bench press" → "Sesi lalu" tetap Bench press;
  `u1_row` vs `u2_row` tidak pecah.

### T6 — Metadata program (F1.1–F1.4) — DONE
- Tambah `movementKey` + `labelA/labelB` + maks 2 alternatif + hapus A1–A4,
  tanpa ubah set/rep/istirahat.
- Cross-check: regimen identik dengan `data.js` lama; dropdown superset
  berpasangan A/B.

### T7 — Seed 4 Okt 2026 (F4) — DONE
- `seed.js` 8 entri + guard sekali jalan.
- Cross-check: load pertama → 1 sesi/8 entri/22 set; reload → tidak duplikat;
  simpan sesi baru → tidak duplikat seed.

### T8 — Progresi 3 lapis (F2.9) — DONE
- `10,10,9` range 8–10 menyala; `8,8,7` range 6–8 tidak menyala;
  stagnan 2 sesi menyala.
- Cross-check: tiga kasus di atas diuji satu per satu di browser.

## P1 — Pengukuran

### T9 — bw + koma (F3.9, F3.11) — DONE
- Hitung `bw` saat simpan; `7,5` → `7.5`.
- Cross-check: input `7,5` tersimpan 7.5; volume DB = 2×.

### T10 — BB + RIR/limit (F3.1, F3.5) — DONE
- Field per sesi/per gerakan; `limit` teks bebas.
- Cross-check: tersimpan di log dan tampil di riwayat.

### T11 — Grafik e1RM+volume (F3.2, F3.3, F3.10, F2.1) — DONE
- Berbasis `movementKey`; putus saat variasi berubah; parse superset.
- Cross-check: garis valid untuk semua slot `upper1`; ganti variasi → segmen baru.

### T12 — Target + hapus + CDN + detik (F3.4, F2.5, F2.7, F2.10) — DONE
- Cross-check per sub-item saat implementasi.

### T13 — Timer tahan refresh (F2.12) — DONE
- Simpan status timer di draft; pulihkan atau berhenti dengan status jelas.
- Cross-check: refresh saat timer jalan → sisa waktu pulih/tertangani.

### T14 — Warm-up + durasi + rotasi (F3.6–F3.8) — DONE

## P2 — UX mobile

### T15 — Escape catatan (F2.8) — DONE
- Cross-check: catat `<script>`/HTML → tampil sebagai teks, tampilan tidak rusak.

### T16 — PWA — DONE (v2.2)
- Selesai: manifest, ikon, SW, registrasi. Terverifikasi serve 200 + sintaks.

### T17 — Input jempol + header A/B + timer sticky — DONE

### T18 — Tab Panduan RIR/limit/RPE/e1RM/backup — DONE
- Terverifikasi: tombol nav + section `tab-guide` ada; `switchTab` generik mendukungnya.

### T19 — Tambah alternatif semua slot jadi 3–4 — DONE
- Terverifikasi: min 3 / maks 4 per slot, semua key utuh, tanpa high-row/incline-machine.
- Revisi keputusan D10 (dulu maks 2).

### T21 — Dropdown grafik pakai nama variasi + jumlah sesi; tooltip tampilkan variasi — DONE
- Terverifikasi: label + hitung sesi benar, key kosong tampil 0 sesi.

### T22 — Redesign ikon dumbbell — DONE
- Terverifikasi visual: glyph dumbbell hijau di matte gelap; maskable aman.
- SW bump v5 agar ikon baru ter-cache ulang.

### T23 — Redesign “Plat Ledger” + review desain — LOCKED
- Tema grafit matte + acid-lime; kontrak DOM utuh; sintaks lolos.
- Review 30/40; 3 fix kepadatan diterapkan. Dikunci atas instruksi pengguna.

### T27 — Adopsi GYMTracker-Mockup-v2 — DONE
- index.html, CSS, workout.js, progress.js, manifest, sw v7, ikon dari mockup.
- Logic identik kecuali 2 delta yang diverifikasi: bottom-nav + metrik riwayat (diambil),
  label “Variasi” (tetap dibuang sesuai T25).
- Kontrak DOM 14/14 ada; sintaks lolos.
- Terverifikasi: label + hitung sesi benar, key kosong tampil 0 sesi.

### T20 — PWA tahan server TrebEdit mati (offline) — DONE
- `start_url` eksplisit `./index.html`; cache install per-aset anti-gagal-total;
  fallback navigasi berlapis. Sintaks lolos `node --check`.
- Syarat: ikon home screen dipasang ulang setelah file baru dipindah.

