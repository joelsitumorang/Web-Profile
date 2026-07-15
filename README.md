# PT Makmur Bersama Gadai (PT MBG) - Web Profile

Repositori ini berisi kode sumber untuk Web Profile **PT Makmur Bersama Gadai (PT MBG)**, sebuah perusahaan pergadaian konvensional resmi yang berizin dan diawasi oleh Otoritas Jasa Keuangan (OJK) berdasarkan **Surat Izin OJK: KEP-42/D.05/2026**.

Proyek ini terbagi menjadi dua bagian utama:
1. **Backend**: Rancangan skema database PostgreSQL dan Blueprint DocType untuk ekosistem **Frappe / Antigravity framework** sebagai backoffice/admin panel.
2. **Frontend**: Aplikasi web interaktif berbasis **Next.js 14** dengan antarmuka premium, kalkulator taksiran gadai dinamis, persyaratan administrasi, serta peta/lokasi jaringan kantor cabang.

---

## Daftar Isi
- [Struktur Proyek](#struktur-proyek)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Arsitektur Database & Backend](#arsitektur-database--backend)
  - [1. Skema PostgreSQL](#1-skema-postgresql)
  - [2. Blueprint Frappe / Antigravity DocType](#2-blueprint-frappe--antigravity-doctype)
- [Arsitektur Frontend](#arsitektur-frontend)
  - [Komponen Utama](#komponen-utama)
  - [Sistem Kalkulator Gadai](#sistem-kalkulator-gadai)
  - [Konfigurasi Routing & Rewrites](#konfigurasi-routing--rewrites)
- [Panduan Pengembangan (Setup Guide)](#panduan-pengembangan-setup-guide)
  - [Prasyarat](#prasyarat)
  - [Langkah Setup Frontend](#langkah-setup-frontend)
  - [Langkah Setup Backend](#langkah-setup-backend)

---

## Struktur Proyek

```text
PT MBG Web Profile/
├── backend/                     # Modul Database & Admin Panel
│   ├── database/
│   │   └── schema.sql           # Skema tabel PostgreSQL & indeks
│   ├── mbg_pawn/
│   │   └── doctypes.md          # Spesifikasi Frappe DocType Blueprint
│   └── seeds/
│       └── mock_data.json       # Data contoh (seed) untuk simulasi
├── frontend/                    # Aplikasi Next.js 14
│   ├── public/                  # Aset gambar, logo, dan file statis
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css      # Style global & kustomisasi warna
│   │   │   ├── layout.tsx       # Root layout, meta tag SEO, & Google Fonts
│   │   │   └── page.tsx         # Halaman utama (Single Page Application)
│   │   └── components/          # Komponen UI modular
│   │       ├── AgunanSection.tsx# Bento grid kategori agunan & Estimasi Bunga Statis
│   │       ├── BranchLocations.tsx # Daftar cabang & list horizontal cabang ekspansi
│   │       ├── CaraKerja.tsx    # Alur universal 3 langkah mudah gadai konvensional
│   │       ├── Hero.tsx         # Visual header, banner OJK, & info strip cabang
│   │       ├── Navbar.tsx       # Header navigasi melayang (glassmorphism)
│   │       └── PawnRequirements.tsx # Persyaratan umum & tabel syarat khusus kategori
│   ├── next.config.js           # Konfigurasi Next.js (termasuk rewrite rules)
│   ├── tailwind.config.js       # Konfigurasi Tailwind CSS (Color palette kustom)
│   ├── tsconfig.json            # Konfigurasi TypeScript
│   └── package.json             # Dependensi proyek frontend
└── README.md                    # Dokumentasi utama proyek
```

---

## Teknologi yang Digunakan

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Ikon**: [Lucide React](https://lucide.dev/)
- **Utilitas**: `clsx`, `tailwind-merge` untuk penggabungan kelas CSS secara dinamis.

### Backend & Backoffice
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Admin Engine**: [Frappe / Antigravity Framework](https://frappeframework.com/) (menggunakan skema DocType berbasis JSON untuk manajemen CRUD otomatis).

---

## Arsitektur Database & Backend

### 1. Skema PostgreSQL
Skema database didefinisikan pada file [schema.sql](file:///d:/Yongki/PT%20MBG/Web%20Profile/backend/database/schema.sql) dan memiliki tiga entitas utama yang dioptimalkan dengan indeks untuk query cepat:

*   **`pawn_categories`**: Menyimpan jenis-jenis agunan (emas, gadget, kendaraan, dll), batas tenor maksimal, rate taksiran, dan ikon visual.
*   **`pawn_requirements`**: Menyimpan daftar syarat dokumen wajib maupun opsional untuk setiap jenis transaksi gadai.
*   **`branch_locations`**: Menyimpan daftar kantor cabang fisik aktif, jam operasional, koordinat peta, dan tautan integrasi chat WhatsApp.

#### Indeks Database
Untuk mempercepat pencarian data pada sisi frontend, indeks ditambahkan pada kolom-kolom berikut:
- `idx_pawn_categories_slug` & `idx_pawn_categories_active`
- `idx_pawn_requirements_category` & `idx_pawn_requirements_active`
- `idx_branch_locations_city` & `idx_branch_locations_active`

### 2. Blueprint Frappe / Antigravity DocType
Pada ekosistem Frappe, skema tabel PostgreSQL dipetakan secara otomatis melalui metadata DocType JSON. Dokumen spesifikasinya terdapat di [doctypes.md](file:///d:/Yongki/PT%20MBG/Web%20Profile/backend/mbg_pawn/doctypes.md), mencakup:
*   **DocType `Pawn Category`**: Menggunakan aturan penamaan `field:slug` agar ramah SEO.
*   **DocType `Pawn Requirement`**: Menggunakan penamaan berkode `hash` otomatis.
*   **DocType `Branch Location`**: Menggunakan nama cabang unik (`field:branch_name`).

Setiap DocType dilengkapi dengan hak akses (*permissions*) default, di mana `System Manager` memiliki akses penuh (CRUD), sedangkan `Guest` memiliki hak akses baca (`read`) untuk menyuplai data ke frontend publik.

---

## Arsitektur Frontend

### Komponen Utama
Aplikasi frontend menggunakan arsitektur modular dengan struktur komponen sebagai berikut:
1.  **[Navbar](file:///d:/Yongki/PT%20MBG/Web%20Profile/frontend/src/components/Navbar.tsx)**: Navigasi atas adaptif yang bertransisi dari transparan menjadi putih blur (*glassmorphism*) saat digulir. Menampilkan logo PT MBG dan badge resmi "Diawasi OJK".
2.  **[Hero](file:///d:/Yongki/PT%20MBG/Web%20Profile/frontend/src/components/Hero.tsx)**: Menampilkan proposisi nilai utama, jaminan keamanan asuransi, tombol Call to Action (CTA), serta satu baris info strip alamat Cabang Pasuruan.
3.  **[CaraKerja](file:///d:/Yongki/PT%20MBG/Web%20Profile/frontend/src/components/CaraKerja.tsx)**: Menampilkan 3 langkah universal alur pengajuan gadai konvensional (Bawa KTP & barang -> Penilaian -> Uang cair 15 menit).
4.  **[AgunanSection](file:///d:/Yongki/PT%20MBG/Web%20Profile/frontend/src/components/AgunanSection.tsx)**: Bento Grid yang menampilkan 4 kategori agunan konvensional. Di dalam modal detail terdapat daftar barang terperinci, sub-kategori, syarat kunci, serta tabel sewa modal (bunga) statis.
5.  **[PawnRequirements](file:///d:/Yongki/PT%20MBG/Web%20Profile/frontend/src/components/PawnRequirements.tsx)**: Panduan persyaratan dua tingkat yang memisahkan Syarat Umum (KTP asli) dengan tabel pemetaan syarat tambahan per kategori, dilengkapi regulasi APU-PPT.
6.  **[BranchLocations](file:///d:/Yongki/PT%20MBG/Web%20Profile/frontend/src/components/BranchLocations.tsx)**: Informasi lengkap Cabang Pasuruan (Pilot Project) dan list horizontal untuk rencana ekspansi cabang Jawa Timur lainnya (Surabaya, Malang, Sidoarjo, Jember).

### Estimasi Bunga & Tenor Statis
Untuk menyederhanakan alur informasi bagi nasabah, kalkulator bunga interaktif diubah menjadi **tabel estimasi statis** di dalam modal kategori agunan. Hal ini meningkatkan kecepatan pemuatan halaman dan memberikan informasi yang lebih pasti kepada pengguna sebelum diarahkan langsung ke WhatsApp penilai cabang.

### Konfigurasi Routing & Rewrites
Pada berkas [next.config.js](file:///d:/Yongki/PT%20MBG/Web%20Profile/frontend/next.config.js), terdapat konfigurasi rewrite rules untuk mengarahkan pengguna secara mulus ke portal lelang terpisah:
- Permintaan ke `/lelang` didistribusikan ke `https://mbg-lelang-pasuruan.vercel.app/lelang`
- Permintaan ke `/lelang/:path*` didistribusikan ke `https://mbg-lelang-pasuruan.vercel.app/lelang/:path*`

Ini berguna agar domain web profile utama terintegrasi secara transparan dengan web aplikasi lelang internal tanpa memengaruhi performa SEO.

---

## Panduan Pengembangan (Setup Guide)

### Prasyarat
Pastikan mesin lokal Anda telah terpasang:
- **Node.js** (versi 18.x atau yang terbaru)
- **NPM** atau **Yarn**
- **PostgreSQL** (opsional, jika ingin mengaktifkan sinkronisasi database lokal)

### Langkah Setup Frontend
1. Masuk ke direktori frontend:
   ```bash
   cd frontend
   ```
2. Pasang dependensi yang diperlukan:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```
4. Buka peramban (browser) dan akses alamat `http://localhost:3000`.

### Langkah Setup Backend
1. **PostgreSQL**:
   - Buat database baru bernama `mbg_pawn_db`.
   - Eksekusi file `schema.sql` yang berada di `backend/database/schema.sql` untuk membuat tabel dan trigger yang diperlukan.
     ```bash
     psql -U username -d mbg_pawn_db -f backend/database/schema.sql
     ```
   - (Opsional) Impor data seed contoh dari `backend/seeds/mock_data.json` untuk mengisi data sampel kategori, syarat, dan cabang.

2. **Frappe DocType Sync**:
   - Jika Anda menjalankan Frappe/Antigravity framework, buat modul baru bernama `MBG Pawn`.
   - Gunakan skema JSON di [doctypes.md](file:///d:/Yongki/PT%20MBG/Web%20Profile/backend/mbg_pawn/doctypes.md) untuk mendefinisikan DocType `Pawn Category`, `Pawn Requirement`, dan `Branch Location` ke dalam sistem administrasi Anda.
