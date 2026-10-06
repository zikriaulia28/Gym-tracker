# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Single-user lokal (pemilik data). Laki-laki 28 th, 170 cm / 76 kg, pekerja gas metering station (monitoring ruangan, 8 jam) dengan rotasi 7 hari Pagi (08.00–16.00) → 7 hari Malam (00.00–08.00) → 7 hari libur. Latihan 4x/minggu, pernah lama latihan + plateau + berhenti, kini mulai lagi. Tanpa cedera; force kurang pada beberapa isolate. Input dilakukan sambil latihan di gym: satu tangan, layar kecil, koneksi buruk, waktu istirahat 60–150 dtk.

## Product Purpose

Tracker progres gym lokal (vanilla JS, tanpa build, tanpa dependensi) yang benar-benar mengukur progres: e1RM Epley dari set terbaik + total volume (Σ beban × reps × bw) + berat badan pagi. Sukses = G1 recomposition 12 minggu (perut turun, otot naik), G2 sesi ≤45 menit, G3 zero regresi data tercatat, G4 progres terbukti via grafik. Satu-satunya seed adalah sesi 4 Okt 2026 Upper A (6 entri, 22 working set, 17 rounds).

## Positioning

Yang tidak bisa diklaim tetangga secara jujur: `movementKey` eksplisit per fungsi otot (riwayat menyambung walau ganti alat, bukan substring-match); `bw` dihitung sekali saat simpan (2 untuk dumbbell per tangan); garis e1RM sengaja putus saat variasi berubah; pemicu double-progression 3 lapis (semua set di batas atas, atau ≥2 dari 3 set di batas atas dengan beban sama, atau stagnan 2 sesi); superset disimpan gabungan "A/B" dengan labelA/labelB; normalisasi koma Indonesia (7,5 → 7.5); backup/restore JSON bervalidasi + timer tahan refresh — semua offline, lokal, tanpa backend.

## Operating Context

Rotasi Upper A → Lower A → Upper B → Lower B (2 Upper : 2 Lower per 4 sesi; bila 3 sesi/minggu: Upper A, Lower A, Upper B). Aturan gym: tunggu >90 dtk → pindah ke gerakan alternatif; compound besar tidak setelah shift malam. Nutrisi acuan: 2200 kcal maintenance, protein 160 g, 9000 langkah/hari (defisit dari langkah, bukan sesi tambahan). Dokumen tidak mengunci jam latihan; pengguna mengatur sendiri.

## Capabilities and Constraints

Program = `js/data.js` yang sudah ada (`upper1`, `lower1`, `upper2`, `lower2`); tidak ditulis ulang, tidak tambah gerakan, set/rep/istirahat tetap. T1–T21 DONE: storage try/catch, tanggal ISO, ID sesi unik + kunci tombol simpan, backup/restore JSON + pengingat 7 hari, movementKey riwayat, seed sekali jalan, progresi 3 lapis, bw + koma, BB/RIR/limit teks bebas, grafik e1RM+volume, target progresi, hapus sesi, fallback Chart.js CDN, detik istirahat eksplisit, timer tahan refresh, warm-up + durasi + rotasi, escape catatan, PWA (manifest + SW + start_url ./index.html), input jempol + header A/B + timer sticky, tab Panduan. Batasan: patch app vanilla yang ada, nol file build, nol dependensi baru, `localStorage` saja, tanpa backend/akun, tanpa import CSV, tanpa native. Undecided eksplisit: `stepKg` null → tampil "naikkan beban" tanpa angka; `limit` teks bebas.

## Brand Commitments

Nama: Gym Tracker / Rekap Latihan Gym. Bahasa Indonesia. Tema gelap gym yang sudah ada (bg #121212, card #1e1e1e, primer #00e676, aksen #29b6f6). Aset: `icons/icon-192.png`, `manifest.webmanifest`. Tidak ada rebrand yang diminta; redesign tidak mengubah nama, klaim, atauhai data.

## Evidence on Hand

Konten nyata: `PRD.md` v2.8, `TIKET.md` (T1–T21 DONE), `Data Progress Latihan.md` (sesi 4 Okt 2026), `Data Komposisi Tubuh.md`, `js/data.js` (sumber regimen), `js/seed.js` (1 sesi acuan). Tidak ada testimoni, benchmark eksternal, pricing, atau foto komersial — jangan difabrikasi.

## Product Principles

1. Data tidak hilang dulu, benar kedua, bisa dibaca ketiga, UX mobile terakhir (§11A PRD).
2. Jujur walau tidak nyaman: simpan apa adanya, putus garis saat ganti variasi, tampilkan konteks superset.
3. Gym-first satu tangan: logging <45 menit, target ≥44px, timer tidak menutupi simpan, tahan refresh/offline.
4. Local-first tanpa backend: backup/restore adalah fitur keselamatan, bukan tambahan.
5. Setiap angka harus memicu aksi: e1RM/volume/RIR/limit bermuara ke "naikkan / tahan / turunkan beban".

## Accessibility & Inclusion

Satu tangan di gym, target sentuh besar, kontras tinggi di mode gelap, `inputmode=decimal`, safe-area inset, offline/PWA. Normalisasi koma desimal Indonesia. Belum ada standar formal yang dikomit; jangan klaim WCAG.
