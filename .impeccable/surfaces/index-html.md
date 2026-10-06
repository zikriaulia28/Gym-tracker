---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Surface brief — index.html (Operate redesign)

Scope: full-app redesign `index.html` — alur Latihan + Riwayat + Grafik + Panduan. Struktur tab boleh direstruktur bila terbukti lebih cepat; fungsi dan field tetap.
Mode: Operate.

Audience/job: single-user lifter (shift 7-7-7) logging satu tangan di gym, layar kecil, koneksi buruk, rest 60–150 dtk.
Action: log satu set <30 dtk, baca keputusan beban berikutnya dalam 3 dtk.
Proof/content: seed 4 Okt 2026 Upper A (6 entri / 22 set), e1RM Epley, volume ×bw, badge progresi 3 lapis + angka sesi lalu, BB/RIR/limit.
Constraints: vanilla JS tanpa build/dependensi, localStorage + PWA offline; tetap dark gym-friendly, primer hijau dimatangkan; target sentuh ≥44px; koma Indonesia; timer sticky tak menutupi simpan.

Chosen direction: Plat Ledger — acid-lime industrial ledger (seed 62e3f1f3) + user steer acid-lime/large-numbers/compact/tactile + 5 raises.
Memorable moment: lembar kerja bernomor dengan angka etching tabular besar + proof-strip satu baris + timer acid penuh; satu gerakan owns viewport.
Unresolved: `stepKg` null (tampil tanpa angka); alternatif 3–4 per slot tetap.

## Direction contract

THESIS: Latihan adalah lembar log presisi, bukan dashboard kartu. Halaman menolak grid kartu seragam dan hero-metric; satu gerakan aktif adalah satu lembar kerja bernomor dengan angka terukir besar dan satu aksi simpan.
OWN-WORLD: Grafit matte gelap, lembar Panel Moss, lubang Well, tinta kapur, sage lembut; satu acid-lime (#c8ff2e) hanya untuk aksi/status. Sans sistem rapat + uppercase industrial, angka mono tabular besar; komponen taktil tekan-turun, radius 8–10px, hairline 1px, flat tanpa glow.
STORY: Lifter paham beban target, sisa istirahat, dan keputusan naik/tahan dalam 3 detik; badge progresi selalu menempel proof-strip sesi lalu; riwayat dan grafik minimal jadi bukti.
FIRST VIEWPORT: Header ledger ramping + 4 tab uppercase; baris sequence compact; day-rail horizontal; lembar 01 · Judul + target + timer; input 54px 18px tabular; timer acid di atas simpan 54px; superset A/B terkunci.
FORM: Grounded #3 dari 7 (plat bumper + etching), seed key 62e3f1f3; challenger boarding-pass kompetitif sebagai alternatif; streaming/bitmap/zoo/labanotation/emission declined dengan raise garis-status, fokus-dim, skala jujur, overshoot, durasi-sebagai-panjang; canon ditolak.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
