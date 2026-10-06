---
name: Gym Tracker
description: Local gym progress tracker — Plat Ledger Operate redesign, industrial dark with acid-lime brand and emerald state accent.
colors:
  primary: "#b9ff26"
  secondary: "#00df76"
  acid-ink: "#071007"
  bg: "#07100b"
  bg-raise: "#0a1510"
  panel: "#0e1b15"
  panel-2: "#12231b"
  well: "#09130e"
  ink: "#f3f8f4"
  ink-soft: "#9bad9f"
  ink-faint: "#879c8d"
  line: "#20372a"
  line-strong: "#315140"
  warn: "#ffcc63"
  danger: "#ff7b83"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 900
    lineHeight: 1.25
    letterSpacing: "-0.04em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.48
    letterSpacing: "normal"
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, Liberation Mono, monospace"
    fontSize: "0.7rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  xs: "4px"
  sm: "8px"
  rg: "10px"
  md: "12px"
  lg: "16px"
  full: "999px"
spacing:
  sm: "8px"
  md: "12px"
  lg: "14px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.acid-ink}"
    rounded: "{rounded.md}"
    padding: "12px"
    minHeight: "51px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.rg}"
    padding: "8px 14px"
    minHeight: "44px"
  input-field:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink}"
    rounded: "{rounded.rg}"
    padding: "10px 12px"
    minHeight: "51px"
  ledger-sheet:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "17px"
    padding: "14px"
  timer-bar:
    backgroundColor: "#0b2819"
    textColor: "#c9f7d9"
    rounded: "{rounded.md}"
    padding: "8px 10px 8px 13px"
  nav-tab-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.acid-ink}"
    rounded: "9px"
    padding: "8px 6px"
---

# Design System: Gym Tracker

## Overview

**Creative North Star: "The Plat Ledger"**

Latihan diperlakukan seperti lembar log presisi pada plat bumper: matte, taktil, dan tabular. Satu gerakan aktif adalah satu lembar kerja bernomor, satu proof-strip sesi lalu, dan satu aksi simpan. Bahasanya industrial dan jujur — grafit, kapur, acid-lime untuk identitas dan aksi, emerald untuk status berjalan.

Densitas compact memikul kecepatan gym: input 51px+ terbaca satu tangan, label uppercase mikro membawa struktur, grafik diringkas jadi dua angka utama. Gerakan khas hanyalah tekan-turun taktil dan transisi tab yang tenang.

**Key Characteristics:**
- Grafit gelap; acid-lime sebagai suara keras, emerald sebagai suara kedua (switch aktif, permukaan timer).
- Lembar bernomor inline, angka mono tabular, proof selalu menempel klaim.
- Label industrial uppercase rapat, sentuhan taktil 44–54px, glass tipis pada bar melayang.

## Colors

### Primary
- **Acid Lime** (#b9ff26): brand dan aksi. Tab aktif, hari aktif, tombol simpan, badge progresi, fokus keyboard. Teks di atasnya selalu tinta gelap (#071007).

### Secondary
- **State Emerald** (#00df76): status, bukan aksi. Switch dalam posisi aktif, permukaan timer (#0b2819 dengan teks #c9f7d9 dan border emerald 40%), kilau aurora latar.

### Neutral
- **Graphite Ground** (#07100b): ground aplikasi; dibawa sebagai gradien `#08110c → #050a07` plus aurora emerald radial di atas.
- **Raise Black** (#0a1510): lapisan angkat halus.
- **Ledger Panel** (#0e1b15) / **Panel 2** (#12231b): kartu, tab idle, tombol sekunder.
- **Etch Well** (#09130e): lubang input dan proof-strip.
- **Chalk Ink** (#f3f8f4): teks utama.
- **Sage Soft** (#9bad9f): teks sekunder — selalu bernada hijau, tidak pernah abu netral.
- **Faint Etch** (#879c8d): label mikro, meta, placeholder — kontras minimum 4.5:1 terhadap semua lapisan (teruji: 5.6–6.6).
- **Hairline** (#20372a) / **Strong Hairline** (#315140): pemisah.
- **Caution Amber** (#ffcc63): banner backup saja.
- **Signal Red** (#ff7b83): bahaya/hapus.

### Named Rules
**The Two Voices Rule.** Acid = identitas + aksi/posisi aktif (permukaan terisi). Emerald = status berjalan. Keduanya tidak pernah dipakai sebagai teks dekoratif pada body copy.

## Typography

**Display / Body:** system stack (-apple-system, Segoe UI, Roboto, Arial).
**Label / Data:** ui-monospace, Menlo, Consolas — untuk data terukur (beban, reps, e1RM, timer, nomor urut).

**Character:** industrial rapat: judul -0.035em s/d -0.05em, label uppercase mikro tracking lebar, angka mono tabular.

### Hierarchy
- **Page** (1.55rem / 1.35rem mobile): judul tab.
- **Section** (1.2rem, 700, -0.035em): judul blok.
- **Eyebrow** (0.7rem, 900, tracking 0.14em, uppercase, acid): kicker di atas judul halaman/blok.
- **Tab** (0.77rem, 800): label tab.
- **Body** (0.75–0.84rem, lh 1.48, max 540px): deskripsi, panduan, meta.
- **Label** (0.7rem minimum, 700–900, tracking 0.08em, uppercase): micro-label; **tidak pernah di bawah 0.7rem**.
- **Data** (mono 16px, 800): isi input set, RIR, catatan; timer 1.15rem; metrik 1.25rem.

### Named Rules
**The Numbers Stand Still Rule.** Setiap angka pengukuran memakai mono tabular; kolom tidak bergeser saat nilai berubah.
**The Text Floor Rule.** Label ≥0.7rem, body ≥0.75rem, input/select ≥16px (anti-zoom iOS), semua teks kontras ≥4.5:1.

## Layout

Ledger satu kolom, max 820px, tengah. Header ledger sticky glass (brand + 4 tab grid) — tab desktop disembunyikan ≤700px dan diganti floating bottom nav 4 item di atas action bar. Quick-grid 2 kolom, guide-grid 2 kolom (1 di mobile), metric-grid 3 kolom. Set memakai grid 40px + dua kolom input; superset mengunci pasangan A/B. Action bar fixed bawah menampung timer di atas tombol simpan; body padding-bottom 104px desktop / 160px mobile + safe-area. Saat timer berjalan, bottom nav terangkat ke 140px agar tidak tertutup action bar. Desktop ≥701px tetap satu kolom — aplikasi satu tangan, bukan dashboard.

## Elevation & Depth

Tonal (ground → panel → well) plus dua aksen kedalaman:
- **Shadow lembut** pada kartu (`0 10px 30px rgba(0,0,0,.12)`) dan nav melayang (`0 10px 30px rgba(0,0,0,.3)`).
- **Glow acid tipis** (<12% alpha) hanya pada permukaan terisi acid (tab aktif, hari aktif, tombol simpan).

Glass: header, action bar, dan bottom nav memakai `backdrop-filter: blur(16–18px)` dengan latar rgba gelap.

### Named Rules
**The Layered Rule.** Kedalaman datang dari tonal + glow tipis yang terikat permukaan aksi; tidak ada kartu mengambang dengan bayangan berat.

## Shapes

Sudut: 8px brand mark & knob, 10px field/aksi sekunder/progression, 11–12px tombol utama & timer, 13–17px kartu & panel, 999px pill. Border hairline 1px; lembar latihan memakai fokus-dalam (border berubah) sebagai penanda. Fokus keyboard: outline acid 2px + offset 3px.

## Components

### Buttons
- **Primary:** acid di atas tinta gelap, min-height 51px (49 mobile), 950 uppercase, penuh lebar di action bar.
- **Ghost / Secondary:** panel + hairline kuat, 44px, uppercase mikro (Timer, Hapus, Backup, CSV).
- **Hover / Focus:** border+teks berubah acid; fokus selalu ring acid global.

### Cards / Containers
- **Background:** Ledger Panel; lubang bukti Etch Well.
- **Border:** hairline 1px; kartu latihan fokus-dinasional via `:focus-within`.
- **Padding:** 14px kartu latihan, 12–14px panel, 9–11px kartu kecil.

### Inputs / Fields
- **Style:** well gelap, border #30483a, radius 10px, mono 16px, min-height 51px (set) / 45px (RIR, limit, catatan), `inputmode` desimal untuk koma Indonesia.
- **Focus:** border acid + ring global; caret dan seleksi acid.
- **Disabled:** simpan disabled 45% opacity.

### Navigation
- **Desktop:** 4 tab grid uppercase di header, aktif acid penuh, min-height 44px.
- **Mobile:** floating bottom nav 4 item (SVG stroke 20px + label), aktif acid penuh, min-height 54px.
- **State:** tab aktif selalu membawa `aria-current="page"`; URL hash (`#history`, `#chart`, `#guide`) deep-link dan dihormati tombol back.
- Skip-link untuk keyboard.

### Signature Components
- **Ledger Sheet:** nomor inline acid + judul + meta mono; memikul thesis plat.
- **Proof Strip:** last-perf satu baris dalam well mono; klaim tidak pernah tampil tanpa angka sesi lalu.
- **Timer Board:** permukaan emerald gelap, digit mono 1.15rem acid, tombol Batal berbingkai; selalu di atas simpan.

## Do's and Don'ts

### Do:
- **Do** pertahankan semua ID/hook JS (`day-buttons`, `exercise-list`, `w-/r-`, `last-perf-`, `progression-msg-`, `save-workout-btn`, `timer-bar`) — visual boleh berubah, kontrak DOM tidak.
- **Do** pakai input ≥16px dengan `inputmode` desimal agar koma Indonesia (7,5) bisa diketik tanpa zoom iOS.
- **Do** kunci header kolom A/B superset agar pasangan tidak tertukar di layar kecil.
- **Do** hormati `prefers-reduced-motion` — matikan rise/timer pulse.
- **Do** jaga floor: label ≥0.7rem, body ≥0.75rem, touch target ≥44px, kontras ≥4.5:1.
- **Do** pakai SVG stroke inline (style 16×16, stroke 1.7–1.8) untuk ikon navigasi dan aksi; huruf pada badge panduan/brand boleh tipografis.
- **Do** vendor dependensi runtime (mis. Chart.js) ke `js/vendor/` dan masukkan ke `ASSETS` sw.js — tanpa CDN.

### Don't:
- **Don't** kembali ke abu netral untuk teks sekunder, glow tebal di tepi, atau border-left aksen.
- **Don't** ubah struktur data, logika progresi, atau menambah dependensi/build — ini patch vanilla.
- **Don't** menutupi tombol simpan dengan timer; timer selalu di atas simpan di action bar, dan bottom nav harus terangkat saat timer aktif.
- **Don't** menghapus indikator fokus (`outline:0`) — keyboard user harus selalu bisa melihat posisi fokus.
- **Don't** menggandakan aksi yang sama di dua tempat dalam satu tab.
