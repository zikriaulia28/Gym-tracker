# Panduan Push ke GitHub + Hosting Pages

Waktu: ±10 menit. Hasil: repo di GitHub + URL hosting permanen untuk HP.

## 1. Siapkan repo di GitHub

1. Buka github.com → **New repository**
2. Nama mis. `tracker-progress-gym`
3. Pilih **Private** (disarankan) atau Public
4. **Jangan** centang “Add a README” (repo lokal sudah ada isi)
5. Create → salin URL repo, mis. `https://github.com/USERNAME/tracker-progress-gym.git`

## 2. Push dari PC

Buka terminal di folder `tracker-progress-gym`, jalankan berurut:

```bash
git init
git add .
git commit -m "Gym tracker + PWA"
git branch -M main
git remote add origin https://github.com/USERNAME/tracker-progress-gym.git
git push -u origin main
```

Catatan:

- `git add .` otomatis melewati file data pribadi (diatur di `.gitignore`).
- Push berikutnya cukup:
  ```bash
  git add .
  git commit -m "isi perubahan"
  git push
  ```

## 3. Aktifkan GitHub Pages (hosting gratis)

1. Di halaman repo → **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)** → Save
4. Tunggu ±1 menit → URL muncul, mis. `https://USERNAME.github.io/tracker-progress-gym/`

## 4. Pasang di HP

1. Buka URL Pages di Chrome HP
2. Install → Add to Home Screen
3. Tidak perlu TrebEdit/server lagi; offline jalan via service worker

## 5. Kalau error

| Gejala | Solusi |
|---|---|
| `remote origin already exists` | `git remote set-url origin <URL>` |
| Login ditolak | Pakai Personal Access Token sebagai password |
| Pages 404 | Tunggu 1–2 menit; pastikan branch `main` dan folder root |
| File data pribadi ikut ke-push | Cek `.gitignore`; hapus dari repo bila perlu |

## 6. Alur update berikutnya

Ubah file di PC → `git add .` → `git commit -m "..."` → `git push` → Pages update otomatis ±1 menit → buka app di HP sekali untuk refresh cache.
