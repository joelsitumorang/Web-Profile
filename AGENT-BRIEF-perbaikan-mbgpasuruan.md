# Brief Agen: Perbaikan Situs mbgpasuruan.co.id

Situs landing satu halaman PT Makmur Bersama Gadai (PT MBG) Cabang Pasuruan (pegadaian konvensional). Dokumen ini adalah instruksi kerja. Baca seluruhnya sebelum mengubah kode.

---

## 1. Tujuan

Situs sudah punya fondasi benar (alamat, jam buka, syarat dokumen, CTA WhatsApp), tetapi:

1. Copy dan struktur terasa template AI (hero generik, tiga kartu keunggulan, superlatif tanpa bukti).
2. Kepercayaan lemah: Kebijakan Privasi dan Syarat & Ketentuan masih `href="#"`, klaim keamanan belum terbukti, biaya tidak dijelaskan.
3. Kelalaian teknis: metadata salah domain, tidak ada `og:image`, gambar dipakai ganda, data kategori tidak konsisten antar section.

Sasaran: nasabah paham layanan, biaya, dan syarat tanpa harus bertanya dulu lewat WhatsApp; semua klaim di halaman bisa dipertanggungjawabkan; tidak ada tautan mati, metadata salah, atau aset duplikat.

## 2. Aturan kerja (wajib)

1. **Baca repo dulu.** Tentukan sendiri: versi Next.js dan jenis router (App Router atau Pages), cara styling (Tailwind atau lain), package manager, dan struktur folder. Situs ini terdeteksi memakai Next.js. Jangan berasumsi selebihnya.
2. **Jangan mengarang fakta.** Angka di luar data biaya yang diberikan pemilik (bagian R5), klaim asuransi/brankas/CCTV, jawaban FAQ, dan nama orang tidak boleh diisi dari tebakan. Kalau bahan belum ada, buat strukturnya dan tandai `TODO(yoga): ...`.
3. **Jangan ubah nomor izin OJK.** Teks `Surat Izin OJK: KEP-42/D.05/2026` sudah dikonfirmasi benar. Biarkan persis.
4. **Kerja di branch terpisah** (mis. `fix/site-audit`). Satu commit per requirement (R1, R2, ...) dengan pesan yang jelas. Jangan push ke branch utama.
5. **Batasi ruang lingkup.** Jangan redesain total, jangan ganti stack, jangan tambah dependensi berat. Perubahan visual hanya yang tercantum di Fase 3.
6. **Urutan:** Fase 1, lalu Fase 2, lalu Fase 3. Jalankan lint dan build di akhir tiap fase.

## 3. Status keputusan

| Hal | Status |
|---|---|
| Nomor izin OJK di footer | Benar, jangan diubah |
| Domain kanonik | `https://www.mbgpasuruan.co.id` |
| Foto asli kantor | Boleh dipublikasikan (file belum disediakan, siapkan slot dan placeholder) |
| Persetujuan isi Kebijakan Privasi dan S&K | Yoga; manajemen menerima hasil jadi |
| Biaya | Sudah dikonfirmasi pemilik: sewa modal 1–15 hari 5%, 16–30 hari 10%; tanpa biaya admin. Denda **tidak ditampilkan** (keputusan pemilik). Aturan setelah 30 hari belum diberikan. Lihat R5. |
| Info cabang lain (Surabaya, Malang, Sidoarjo, Jember) | **Belum diputuskan. Jangan hapus atau ubah section-nya.** Hanya kalimat berjargon di dalamnya yang diperbaiki (lihat R3). |
| Asuransi, brankas tahan api, CCTV 24 jam | Belum ada bukti tertulis. Lihat R2. |

## 4. Tugas

### Fase 1: Kepercayaan dan metadata (P0)

**R1. Halaman Kebijakan Privasi dan Syarat & Ketentuan**
- Buat dua halaman sungguhan dan hubungkan dari footer. Tidak boleh ada `href="#"` di footer.
- Isi kerangka yang jelas: jenis data yang dikumpulkan (KTP saat transaksi, nomor WhatsApp saat menghubungi), tujuan, penyimpanan, kontak untuk pertanyaan data. Untuk S&K: syarat umum sesuai yang sudah tertulis di halaman (KTP asli, nama pemilik sesuai KTP, kondisi barang, barang tidak jelas asal-usul tidak diterima).
- Jangan mengarang klausul hukum, tarif, atau denda. Bagian yang butuh keputusan pemilik diberi `TODO(yoga)`.
- Acceptance: kedua URL bisa dibuka, ada di footer, dan ada tautan kembali ke beranda.

**R2. Klaim keamanan dilunakkan sampai terbukti**
- Klaim yang belum ada buktinya: "asuransi penuh", "brankas baja tahan api", "CCTV 24 jam", dan sejenisnya (cari di hero, kartu keunggulan, teks bawah persyaratan, dan footer).
- Ganti dengan versi yang tidak memuat detail yang belum terbukti, mis. "Barang disimpan di brankas kantor." Sisakan komentar `TODO(yoga): pulihkan klaim asli jika bukti tersedia` di dekatnya.
- Acceptance: tidak ada kata "tahan api", "24 jam", atau "asuransi penuh" di teks yang tampil.

**R3. Hapus jargon internal**
- Hapus atau ganti: "Pilot Project", "Proyek Percontohan", "kantor percontohan", "standardisasi OJK".
- Lokasi yang perlu diperiksa: badge hero "Pilot Project Aktif Cabang Jawa Timur", kartu cabang ("Sebagai kantor percontohan layanan digital..."), label "Cabang Aktif & Pilot Project", dan paragraf pembuka section jaringan cabang.
- Contoh pengganti: badge menjadi "Cabang Pasuruan · Buka Senin–Minggu"; kartu cabang menjadi "Kantor cabang PT Makmur Bersama Gadai di Pasuruan. Melayani gadai emas, elektronik, kendaraan, dan alat kerja."
- **Section jaringan cabang tetap ada** (termasuk daftar dan label "Soon"). Cukup tulis ulang kalimat pembukanya tanpa jargon, netral, dan beri komentar `TODO(yoga): keputusan cabang lain ditinjau ulang`.
- Acceptance: pencarian `Pilot`, `Percontohan`, `standardisasi` di seluruh source dan output tidak menemukan apa pun untuk teks nasabah.

**R4. Metadata**
- `og:url` dan `canonical` = `https://www.mbgpasuruan.co.id`. Saat ini `og:url` menunjuk `makmurbersamagadai.co.id`.
- Tambah `og:image` 1200×630. Jika belum ada desain, buat versi sederhana (mis. `opengraph-image` bawaan Next atau gambar statis dengan logo dan nama cabang) dan tandai untuk diganti.
- `twitter:card` menjadi `summary_large_image`, dengan image yang sama.
- Title dan description harus Pasuruan-sentris dan menyebut kelima kategori agunan (termasuk kendaraan). Hapus kata "amanah" dari deskripsi (bertabrakan dengan posisi "konvensional"). Deskripsi boleh menyebut "tanpa potongan biaya admin".
- Keywords yang saat ini menyebut kota lain ("gadai hp surabaya", "gadai laptop malang") diganti dengan keyword Pasuruan (mis. gadai emas Pasuruan, gadai HP Pasuruan, gadai kendaraan Pasuruan).
- Gunakan API metadata bawaan Next, bukan tag manual.
- Acceptance: output HTML memuat nilai yang benar; tidak ada URL domain lain di metadata.

**R5. Bagian biaya**

Data yang sudah dikonfirmasi pemilik dan boleh dipakai apa adanya:
- Sewa modal 1–15 hari: **5%**
- Sewa modal 16–30 hari: **10%**
- **Tanpa biaya admin.** Pemilik ingin ini ditekankan: "gadai tanpa potongan biaya admin".

Tugas:
- Buat komponen "Biaya & Contoh Perhitungan" (dengan anchor `#biaya`) yang membaca dari file data (lihat bagian 6). Tampilkan dua tarif sewa modal dan pernyataan tanpa biaya admin.
- Tambahkan contoh ilustrasi yang dihitung dari data, berlabel "Contoh ilustrasi": pinjaman Rp1.000.000 berarti sewa modal Rp50.000 (1–15 hari) atau Rp100.000 (16–30 hari).
- Asumsi yang dipakai contoh: persentase dihitung dari jumlah pinjaman, dan tarif sama untuk semua kategori. Tandai `TODO(yoga): konfirmasi asumsi persentase dan kesamaan tarif antar kategori`, lalu laporkan di laporan akhir.
- Beberapa tenor lebih panjang dari 30 hari (Emas s.d. 4 bulan, Alat Rumah Tangga s.d. 4 bulan, Alat Tukang s.d. 4 bulan, Kendaraan s.d. 2 bulan). Cara hitung sewa modal setelah 30 hari **belum diberikan: jangan menulis apa pun tentang itu**. Tandai `TODO(yoga): aturan sewa modal >30 hari`.
- **Denda tidak ditampilkan dan tidak dijelaskan** (keputusan pemilik). Sebagai pengganti, letakkan satu kalimat netral di bawah tabel: "Ketentuan lengkap tercantum dalam surat kontrak yang ditandatangani di kantor." Kalimat ini boleh dihapus pemilik.
- **Jangan pakai klaim yang lebih luas dari data**: "tanpa biaya tersembunyi", "tanpa biaya apa pun", "bebas biaya siluman". Yang boleh: "tanpa biaya admin" dan "tanpa potongan biaya admin".
- Penekanan "tanpa potongan biaya admin" cukup di tiga tempat: (a) sub-headline atau badge hero, (b) satu dari tiga kartu keunggulan (gantikan "Taksiran Nilai Maksimal"), (c) bagian biaya ini. Jangan diulang di tempat lain.
- Hapus frasa hero lama "bebas sewa modal siluman". Ini tidak akurat dan sekarang tumpang tindih dengan tarif sewa modal yang dijelaskan terang-terangan.
- Menu "Simulasi" (navigasi bawah): ganti labelnya menjadi "Biaya" dan arahkan ke `#biaya`. Jangan buat kalkulator interaktif.
- Acceptance: teks 5%, 10%, dan "tanpa biaya admin" tampil di halaman; kata "denda" dan "tersembunyi" tidak muncul; tidak ada menu yang mengarah ke halaman kosong; data biaya terpisah dari komponen.

### Fase 2: Copy dan konsistensi (P1)

**R6. Tulis ulang copy inti** (hero, tiga kartu keunggulan, langkah 1–3)
- Hapus superlatif tanpa bukti: "Ultra-Aman", "Taksiran Nilai Maksimal", "Dana Cair Instan", "taksiran tinggi".
- Salah satu dari tiga kartu keunggulan menjadi "Tanpa potongan biaya admin" (lihat R5).
- Frasa "berizin OJK" atau "diawasi OJK" muncul maksimal 3 kali di teks yang tampil.
- Satu klaim = satu fakta yang bisa dicek. Bahasa seperti staf menjelaskan ke nasabah di meja pelayanan. Lihat contoh di bagian 5.

**R7. Satu sumber data kategori**
- Buat satu file data (lihat bagian 6). Marquee, tab agunan, galeri, footer, dan meta description semuanya turun dari file itu.
- Lima kategori harus muncul konsisten: Emas, Elektronik, Alat Rumah Tangga, Kendaraan, Alat Tukang. Saat ini footer hanya memuat empat.
- Marquee: item yang tidak sesuai kategori atau aneh ("Salon Aktif", dll.) diperiksa dan dirapikan.

**R8. Gambar unik per kategori**
- `agunan-perkakas.jpg` dipakai untuk Alat Rumah Tangga dan Alat Tukang. Beri masing-masing gambar sendiri. Jika aset tidak ada di repo, buat slot dan placeholder, lalu catat di laporan file apa yang perlu disediakan.
- Semua gambar punya `alt` deskriptif.
- Galeri saat ini hanya menampilkan Emas dengan kalimat "kategori Emas". Tampilkan galeri per kategori, atau ubah judulnya agar jelas itu galeri Emas.

**R9. FAQ**
- Buat komponen FAQ dari file data. Isi awal **hanya** dari fakta yang sudah ada di halaman: dokumen yang dibawa, KTP harus atas nama pemilik barang, akun iCloud/Google wajib di-logout, jam buka, tenor per kategori, serta dua yang kini sudah dikonfirmasi: "Apakah ada biaya admin?" (tidak ada; tanpa potongan biaya admin) dan "Berapa sewa modalnya?" (5% untuk 1–15 hari, 10% untuk 16–30 hari).
- Pertanyaan yang butuh pengalaman lapangan (barang tidak ditebus, perpanjangan, KTP milik keluarga, barang ditolak) jangan diisi sendiri. Catat sebagai `TODO(yoga)`.

**R10. Pelacakan klik CTA WhatsApp**
- Setiap tombol WA mengirim event dengan label lokasi (hero, kartu cabang, footer, navigasi bawah).
- Gunakan analytics yang sudah ada di repo. Jika belum ada, buat util `trackEvent()` dengan titik integrasi yang jelas dan jangan menambah dependensi tanpa konfirmasi.
- Pesan awal WhatsApp diberi penanda sumber singkat agar staf bisa membedakan asalnya.

### Fase 3: Polesan (P2)

**R11.** Ganti emoji pada heading dengan ikon SVG yang konsisten (satu set ikon saja). Siapkan slot foto asli kantor dan area pelayanan dengan placeholder. Hapus efek badge berkedip "Aktif" kalau tidak menyampaikan info berguna.

**R12.** Marquee: set duplikat diberi `aria-hidden`, animasi berhenti pada `prefers-reduced-motion`, berhenti saat hover.

**R13.** JSON-LD `FinancialService` (atau `LocalBusiness`) dengan data dari halaman:
- Nama: PT Makmur Bersama Gadai, cabang Pasuruan
- Alamat: Jl. Hasanudin No. 5, Karanganyar, Kec. Panggungrejo, Kota Pasuruan, Jawa Timur 67131
- Jam: Senin–Sabtu 07:00–20:00 WIB, Minggu 10:00–17:00 WIB
- Telepon: +6281213211413 (nomor WhatsApp cabang)
- Koordinat dari tautan Maps di halaman: lintang -7.6437896, bujur 112.8983213
- Catat `TODO(yoga): samakan dengan Google Business Profile`.

**R14.** Target Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95. Gambar dioptimasi (WebP/AVIF, ukuran responsif), lazy kecuali hero.

## 5. Panduan copy (contoh, bukan final)

| Sekarang | Arah perbaikan |
|---|---|
| Solusi Likuiditas Aman. Transparan & Terpercaya. | Butuh dana cepat di Pasuruan? Gadai emas, HP, atau alat kerja. Ditaksir langsung di depan Anda. |
| Taksiran Nilai Maksimal | Tanpa potongan biaya admin (kartu keunggulan; lihat R5) |
| Taksiran jujur dan bebas sewa modal siluman | Sewa modal 5% (1–15 hari) dan 10% (16–30 hari). Tanpa biaya admin. |
| Penyimpanan Ultra-Aman | Barang disimpan di brankas kantor (versi lebih kuat hanya setelah R2 terbukti) |
| Dana Cair Instan | Cair tunai atau transfer, biasanya sekitar 15 menit |
| Pilot Project Aktif | Cabang Pasuruan · Buka Senin–Minggu |

Prinsip: satu klaim = satu fakta yang bisa dicek. Hindari kata sifat bertumpuk.

## 6. Kerangka data (sesuaikan dengan konvensi repo)

Satu file data terpusat, mis. `data/agunan.ts` (lokasi menyesuaikan struktur repo):

```ts
export type Agunan = {
  id: 'emas' | 'elektronik' | 'alat-rumah-tangga' | 'kendaraan' | 'alat-tukang';
  label: string;
  tenor: string;        // contoh: "s.d. 4 bulan"
  syarat: string[];     // ambil dari tabel syarat yang sudah ada di halaman
  image: string;
  imageAlt: string;
  contoh: string[];     // untuk marquee dan galeri
};
```

Tenor saat ini di halaman: Emas s.d. 4 bulan, Elektronik s.d. 1 bulan, Alat Rumah Tangga s.d. 4 bulan, Kendaraan s.d. 2 bulan, Alat Tukang s.d. 4 bulan. Syarat per kategori diambil dari tabel yang sudah ada, jangan diubah isinya.

File data terpisah untuk `biaya` (R5), mis.:

```ts
export const biaya = {
  sewaModal: [
    { rentang: '1–15 hari', persen: 5 },
    { rentang: '16–30 hari', persen: 10 },
  ],
  biayaAdmin: 0,               // tanpa biaya admin
  contohPinjaman: 1_000_000,   // untuk contoh ilustrasi; hasil dihitung dari `sewaModal`
};
```

Tidak ada field denda (sengaja). File data `faq` (R9) diisi hanya dari fakta yang sudah ada; sisanya bertanda `TODO(yoga)`.

## 7. Verifikasi sebelum selesai

- [ ] `lint` dan `build` lulus tanpa peringatan baru
- [ ] Pencarian `href="#"` dan `href='#'` tidak menemukan apa pun di footer
- [ ] Pencarian `Pilot`, `Percontohan`, `standardisasi`, `tahan api`, `Ultra` tidak menemukan teks tampil
- [ ] `og:url` dan `canonical` benar; `og:image` dan `twitter:card` terpasang
- [ ] Tidak ada satu file gambar dipakai untuk dua kategori
- [ ] Lima kategori muncul konsisten di marquee, tab, footer, dan meta description
- [ ] Teks 5%, 10%, dan "tanpa biaya admin" tampil; kata "denda", "tersembunyi", dan "siluman" tidak ada di teks tampil
- [ ] Section jaringan cabang lain masih ada
- [ ] Nomor izin OJK tidak berubah
- [ ] Diuji lebar HP (± 375 px) dan desktop
- [ ] Lighthouse mobile dijalankan dan skor dicatat

## 8. Laporan akhir

Setelah selesai, tulis ringkasan berisi:
1. Apa yang berubah per requirement (R1, R2, ...).
2. Daftar lengkap `TODO(yoga)` yang tersisa, dikelompokkan: bahan yang harus disediakan (foto, jawaban FAQ, bukti klaim keamanan, aturan sewa modal >30 hari, konfirmasi asumsi persentase), keputusan yang menunggu (cabang lain), dan hal yang perlu dicek manual.
3. Skor Lighthouse sebelum dan sesudah, jika bisa.
4. Hal yang sengaja tidak dikerjakan beserta alasannya.

## 9. Di luar ruang lingkup

- Redesain total atau penggantian stack
- Fitur pengajuan gadai online atau backend baru
- Multi-bahasa
- Menghapus atau mengubah info cabang lain (menunggu keputusan pemilik)
- Mengubah tenor, syarat dokumen, nomor izin, alamat, atau jam buka
- Menampilkan atau menjelaskan denda keterlambatan (sengaja tidak ditampilkan atas keputusan pemilik)
- Kalkulator biaya interaktif
