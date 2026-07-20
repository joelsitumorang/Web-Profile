# Rancangan Fitur: Popup Simulasi Bunga — PT Makmur Bersama Gadai

## 1. Tujuan
Popup/modal kalkulator yang memungkinkan calon nasabah menghitung estimasi bunga & total tebusan berdasarkan jenis barang, jumlah pinjaman, dan tenor (dalam hari) yang mereka input sendiri.

## 2. Keputusan desain (sudah dikonfirmasi)

| Pertanyaan | Keputusan |
|---|---|
| Tenor per kategori: fixed atau maksimum? | **Maksimum** — nasabah bisa input tenor lebih pendek dari batas kategori, tapi tidak boleh melebihi. |
| Perhitungan bunga jika hari tidak genap kelipatan periode | **Dibulatkan ke atas** — sisa hari tetap dikenakan 1 periode bunga penuh tambahan. |
| Barang rumah tangga elektronik (AC, mesin cuci, TV, dll) | **Masuk kategori Elektronik** (5%/15 hari), bukan "alat rumah tangga". |

## 3. Perubahan pendekatan: hapus lapisan kategori

Kategori dihapus sebagai lapisan perantara. Setiap **barang** langsung membawa aturan bunga/periode/tenor-nya sendiri. Nasabah cukup mencari nama barang (contoh: "handphone") dan langsung mendapat hasil, tanpa perlu tahu barang tersebut masuk kategori apa.

Referensi aturan yang sudah dibahas sebelumnya (masih berlaku sebagai acuan nilai per barang, hanya lapisan kategorinya yang dihapus):

| Acuan lama (kategori) | Bunga | Periode | Tenor Maksimum |
|---|---|---|---|
| Emas | 5% | per 30 hari | 120 hari (4 bulan) |
| Elektronik | 5% | per 15 hari | 30 hari (1 bulan) |
| Alat Tukang & Rumah Tangga | 10% | per 30 hari | 120 hari (4 bulan) |
| Kendaraan | 5% | per 15 hari | 60 hari (2 bulan) |
| Kulkas | 10% | per 30 hari | 60 hari (2 bulan) |

> Asumsi konversi: 1 bulan = 30 hari. Tolong dikoreksi kalau kantor cabang punya konvensi lain.

## 4. Data barang (final — dikompilasi dari `angunan.xlsx`)

Data asli dari user berisi 32 baris. Setelah dicek, ditemukan 2 hal yang butuh koreksi (sudah dikonfirmasi user):

| Isu | Data asli | Keputusan final |
|---|---|---|
| Kulkas — periode bunga | 15 hari (tidak sesuai aturan "per bulan") | **Dikoreksi jadi 30 hari** |
| Sepeda Listrik — muncul 2x dengan data konflik | (a) 5%/30 hari/periode 15 vs (b) 10%/30 hari/periode 30 | **Dipakai versi (b)**: 10%, tenor 30 hari, periode 30 hari — berarti Sepeda Listrik **tidak** mengikuti aturan elektronik umum, punya aturan sendiri |
| Panci — duplikat baris | Muncul 2x, data identik | Digabung jadi 1 baris |

Hasil akhir: **30 barang unik**, siap dipakai sebagai data produksi (lihat file `barang-bunga.json` terlampir — bukan lagi contoh, ini datanya).

| Nama Barang | Bunga | Periode (hari) | Tenor Maksimum (hari) |
|---|---|---|---|
| Handphone | 5% | 15 | 30 |
| Laptop | 5% | 15 | 30 |
| Televisi | 5% | 15 | 30 |
| Kamera | 5% | 15 | 30 |
| Salon Aktif | 5% | 15 | 30 |
| Mesin Cuci | 5% | 15 | 30 |
| Sepeda Listrik | 10% | 30 | 30 |
| Kulkas | 10% | 30 | 60 |
| Microwave | 10% | 30 | 120 |
| Kompresor | 10% | 30 | 120 |
| Magicom | 10% | 30 | 120 |
| Panci | 10% | 30 | 120 |
| Sarung | 10% | 30 | 120 |
| Blender | 10% | 30 | 120 |
| Mixer | 10% | 30 | 120 |
| Kipas Angin | 10% | 30 | 120 |
| Juicer | 10% | 30 | 120 |
| Gilingan Pastel | 10% | 30 | 120 |
| Setrika | 10% | 30 | 120 |
| Sepeda Pancal | 10% | 30 | 120 |
| Mesin Cup | 10% | 30 | 120 |
| Kompor | 10% | 30 | 120 |
| Alat Makan | 10% | 30 | 120 |
| Alat Dapur | 10% | 30 | 120 |
| Karpet | 10% | 30 | 120 |
| Timbangan | 10% | 30 | 120 |
| Cetakan Kue | 10% | 30 | 120 |
| Motor | 5% | 15 | 60 |
| Mobil | 5% | 15 | 60 |
| Emas | 5% | 30 | 120 |

> **Catatan untuk kamu:** kolom "Tenor Maksimum" di sini adalah batas atas (nasabah bisa input tenor lebih pendek, sesuai keputusan di §2). Kalau ke depan ada barang baru, tinggal tambah baris di `barang-bunga.json` — tidak perlu ubah kode.

## 5. Logika perhitungan

```
jumlah_periode   = ceil(tenor_hari_input / periode_hari_kategori)
total_bunga      = jumlah_pinjaman × (bunga_persen_kategori / 100) × jumlah_periode
total_tebusan    = jumlah_pinjaman + total_bunga
```

**Validasi input:**
- `tenor_hari_input` tidak boleh melebihi `tenor_maksimum_kategori`. Jika melebihi → tampilkan pesan, sarankan pilih tenor maksimum kategori tersebut.
- `jumlah_pinjaman` harus angka positif (pertimbangkan minimum pinjaman jika kantor cabang punya batas bawah).

**Contoh kasus:**
- Barang: Laptop (Elektronik, bunga 5%/15 hari, maks 30 hari)
- Pinjaman: Rp 2.000.000
- Tenor input: 20 hari
- `jumlah_periode = ceil(20/15) = 2`
- `total_bunga = 2.000.000 × 5% × 2 = 200.000`
- `total_tebusan = 2.200.000`

## 6. Struktur data yang disarankan (TypeScript) — tanpa kategori

```typescript
interface BarangBunga {
  nama: string;              // ditampilkan & dicari di dropdown, contoh: "Handphone"
  bungaPersen: number;       // contoh: 5 atau 10
  periodeHari: number;       // 15 atau 30
  tenorMaksimumHari: number; // batas atas tenor yang boleh diinput nasabah
}

// Diisi dari barang-bunga.json (30 barang final, lihat §4)
const daftarBarang: BarangBunga[] = [
  { nama: "Handphone", bungaPersen: 5, periodeHari: 15, tenorMaksimumHari: 30 },
  { nama: "Sepeda Listrik", bungaPersen: 10, periodeHari: 30, tenorMaksimumHari: 30 },
  { nama: "Kulkas", bungaPersen: 10, periodeHari: 30, tenorMaksimumHari: 60 },
  { nama: "Motor", bungaPersen: 5, periodeHari: 15, tenorMaksimumHari: 60 },
  { nama: "Emas", bungaPersen: 5, periodeHari: 30, tenorMaksimumHari: 120 },
  // ...26 barang lain, lihat barang-bunga.json untuk data lengkap
];

function hitungSimulasiBunga(
  namaBarang: string,
  jumlahPinjaman: number,
  tenorHariInput: number
) {
  const barang = daftarBarang.find((b) => b.nama === namaBarang);
  if (!barang) throw new Error("Barang tidak ditemukan");
  if (tenorHariInput > barang.tenorMaksimumHari) {
    throw new Error(
      `Tenor melebihi batas maksimum untuk barang ini (${barang.tenorMaksimumHari} hari)`
    );
  }

  const jumlahPeriode = Math.ceil(tenorHariInput / barang.periodeHari);
  const totalBunga = jumlahPinjaman * (barang.bungaPersen / 100) * jumlahPeriode;
  const totalTebusan = jumlahPinjaman + totalBunga;

  return { jumlahPeriode, totalBunga, totalTebusan };
}
```

**Catatan implementasi untuk Antigravity:** dropdown "Jenis Barang" sebaiknya pakai komponen **searchable select/autocomplete** (bukan `<select>` biasa), karena daftar barang berpotensi puluhan item — nasabah harus bisa mengetik "handphone" dan langsung difilter, bukan scroll panjang.

## 7. Alur UI popup

1. **Trigger**: tombol "Simulasi Bunga" (di kartu agunan atau di navbar/CTA umum)
2. **Step 1 — Cari Jenis Barang**: input search/autocomplete berisi `daftarBarang` — nasabah tinggal mengetik nama barang (contoh: "handphone") dan memilih dari hasil filter
3. **Step 2 — Jumlah Pinjaman**: input angka, format otomatis jadi Rupiah (contoh: `Rp 2.000.000`)
4. **Step 3 — Tenor (hari)**: input angka, dengan hint teks dinamis: *"Maksimum X hari untuk barang ini"* (berdasarkan barang yang dipilih di Step 1), validasi real-time kalau melebihi batas
5. **Hasil simulasi** (muncul otomatis / setelah klik "Hitung"):
   - Jumlah periode bunga: `N periode`
   - Total bunga: `Rp ...`
   - **Total yang harus ditebus: `Rp ...`** (ditonjolkan, font lebih besar/bold)
6. **Disclaimer** (wajib, teks kecil di bawah hasil):
   > *"Hasil ini adalah estimasi. Nilai final ditentukan oleh penaksir di kantor cabang saat barang diperiksa langsung."*
7. **CTA penutup**: tombol "Konfirmasi via WhatsApp" — pesan otomatis terisi ringkasan simulasi (jenis barang, pinjaman, tenor, estimasi tebusan) agar staf cabang tinggal konfirmasi, bukan menghitung ulang dari nol.

## 8. Yang masih perlu dicek
- Apakah ada batas minimum jumlah pinjaman (berlaku umum atau per barang) — belum ada di data yang diberikan.
- Konvensi "1 bulan = 30 hari" sudah dipakai konsisten di seluruh data final §4.
- Data barang sudah final (30 item, lihat §4 & `barang-bunga.json`) — siap dipakai langsung oleh Antigravity, tidak perlu menunggu data tambahan kecuali ada barang baru di kemudian hari.

---
*Dokumen ini melengkapi `rancangan-simplifikasi-web-profile.md` sebelumnya — fitur kalkulator interaktif dipertahankan (menggantikan opsi "tabel statis"), dikonsolidasikan dalam satu komponen popup terpusat, dan berbasis data flat per barang (tanpa lapisan kategori). Data final tersedia di `barang-bunga.json`.*
