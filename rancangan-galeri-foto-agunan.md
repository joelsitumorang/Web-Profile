# Rancangan Fitur: Galeri Foto Barang Agunan — PT Makmur Bersama Gadai

## 1. Tujuan
Mengganti tampilan checklist teks ("Daftar Barang yang Dapat Diagunkan") pada section "Barang apa saja yang bisa digadaikan?" dengan galeri **foto asli barang**, supaya pengunjung tidak lelah membaca teks terus-menerus. Tiga konsep visual digabung, masing-masing dipakai di tempat & breakpoint yang paling sesuai.

## 2. Strategi penempatan 3 konsep

| Konsep | Ditempatkan di | Perangkat | Peran |
|---|---|---|---|
| **Marquee auto-scroll** (2 baris berlawanan arah) | Strip teaser tipis di bawah Hero, sebelum section utama | Desktop & Mobile (sama) | Pemantik perhatian ("ada banyak barang bisa digadai di sini"), bukan galeri utama |
| **Bento Grid** (hover zoom + fade-in bertahap) | Section utama "Barang apa saja yang bisa digadaikan?" | **Desktop** (≥768px) | Galeri utama — tampilan detail per kategori |
| **Carousel swipe** (snap-scroll) | Section utama "Barang apa saja yang bisa digadaikan?" | **Mobile** (<768px) | Galeri utama — pengganti grid, lebih natural untuk gestur swipe di HP |

**Prinsip:** Marquee selalu tampil sebagai elemen pelengkap di posisi tetap (tidak berubah per breakpoint). Grid vs Carousel adalah *swap* berdasarkan lebar layar — bukan dua fitur terpisah, tapi satu section yang beradaptasi.

## 3. Struktur halaman (bagian yang berubah)

```
Hero
  └─ Marquee Teaser (BARU) — 2 baris foto auto-scroll, tinggi ~110px, di bawah CTA Hero

AgunanSection — "Barang apa saja yang bisa digadaikan?"
  ├─ Tab kategori (Emas / Elektronik / Alat Rumah Tangga / Kendaraan) — tetap seperti sekarang
  └─ Galeri foto (BARU, menggantikan checklist teks):
       ├─ Desktop (≥768px) → Bento Grid
       └─ Mobile (<768px)  → Carousel swipe
```

## 4. Detail per komponen

### 4.1 Marquee Teaser (di bawah Hero)
- 2 baris, tinggi total ±230px (2×96px + gap), lebar penuh (full-bleed, keluar dari container biar terasa tak berujung)
- Baris atas bergerak ke kiri, baris bawah ke kanan, kecepatan pelan (±26 detik per satu putaran penuh)
- Foto diulang 2x berturut-turut per baris (looping mulus tanpa jeda/patah)
- **Berhenti saat di-hover** (desktop) — di mobile, berhenti sesaat saat disentuh lalu lanjut lagi
- Klik salah satu foto → scroll otomatis ke section "Barang apa saja yang bisa digadaikan?" (anchor link, bukan modal)
- Isi foto: campuran dari semua kategori (tidak perlu difilter), representasi "keberagaman barang yang diterima"

### 4.2 Bento Grid (Desktop)
- Grid 4 kolom, foto rasio 1:1, radius 12px
- Saat tab kategori diklik: seluruh grid re-render dengan animasi **fade-up bertahap** (delay ~40ms antar kartu, urut kiri-atas ke kanan-bawah)
- Hover per foto: zoom lembut (scale 1.12) + nama barang muncul dari bawah sebagai overlay gradient gelap-transparan
- Kalau jumlah foto dalam satu kategori banyak (>12): grid tetap tampil semua, section jadi lebih tinggi — ini wajar untuk desktop, tidak perlu pagination/load more kecuali kategori punya >30 item

### 4.3 Carousel Swipe (Mobile)
- Kartu lebar tetap ±130px, tinggi foto 110px + label nama di bawah foto
- Scroll horizontal dengan `scroll-snap` (snap ke tiap kartu), didorong lewat swipe/drag jari
- Ganti tab kategori → carousel di-reset ke posisi awal (`scrollLeft = 0`) sebelum render ulang isi
- Tambahkan **indikator titik (dots)** di bawah carousel supaya pengunjung tahu ada berapa banyak & di posisi mana (detail tambahan dari diskusi sebelumnya, belum ada di prototype)
- Opsional: tombol panah kiri/kanan kecil di kedua sisi untuk pengguna yang lebih nyaman klik daripada swipe (muncul hanya di layar yang mendukung hover, disembunyikan di touch-only)

## 5. Breakpoint & swap logic
```
if (viewportWidth >= 768px) {
  render <BentoGrid />
} else {
  render <CarouselSwipe />
}
```
- Gunakan CSS media query atau conditional render React (`useMediaQuery` hook / `window.matchMedia`) — pilih pendekatan CSS-only (`display: none` via breakpoint) kalau ingin lebih ringan tanpa JS tambahan, atau conditional render kalau ingin markup berbeda total (misal carousel butuh struktur DOM berbeda dari grid).
- **Rekomendasi:** conditional render, karena struktur DOM grid vs carousel cukup berbeda (grid statis vs scroll-container) — CSS-only akan membuat kedua struktur dirender bersamaan (boros DOM di background).

## 6. Kebutuhan aset (yang perlu disiapkan sebelum implementasi)
- **Foto asli tiap barang** dari daftar 30 barang di `barang-bunga.json` (dokumen rancangan simulasi bunga sebelumnya) — idealnya:
  - Rasio 1:1 (persegi), resolusi minimum ±600×600px agar tidak pecah saat di-zoom hover
  - Background bersih/konsisten (studio/polos) supaya galeri terlihat rapi, bukan foto asal jepret
  - Nama file konsisten dengan nama barang (misal `handphone.jpg`, `sepeda-listrik.jpg`) agar mudah dipetakan ke data
- Struktur data disarankan menambah 1 field baru ke `barang-bunga.json`:
```json
{ "nama": "Handphone", "bungaPersen": 5, "periodeHari": 15, "tenorMaksimumHari": 30, "foto": "/images/barang/handphone.jpg" }
```

## 7. Yang perlu dikonfirmasi
- Apakah foto asli barang sudah/akan tersedia untuk semua 30 item, atau ada beberapa yang perlu difoto ulang dulu?
- Untuk barang yang belum ada fotonya saat launching, bagaimana fallback-nya — pakai ikon generik sementara (seperti prototype di atas) atau kategori tersebut ditunda tampil dulu?

---
*Dokumen ini melengkapi `rancangan-simplifikasi-web-profile.md` dan `rancangan-simulasi-bunga.md` sebelumnya — bagian "Daftar Barang yang Dapat Diagunkan" (checklist teks) digantikan galeri foto sesuai rancangan ini.*
