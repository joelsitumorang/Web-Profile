import React from 'react';

export const metadata = {
  title: "Syarat & Ketentuan - PT Makmur Bersama Gadai Cabang Pasuruan",
};

export default function SyaratKetentuan() {
  return (
    <main className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-3xl font-bold text-[#002244] mb-6">Syarat & Ketentuan</h1>
        <div className="prose prose-slate max-w-none">
          <p>
            Berikut adalah syarat dan ketentuan umum untuk menggunakan layanan gadai di PT Makmur Bersama Gadai Cabang Pasuruan.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Persyaratan Umum</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Membawa KTP asli yang masih berlaku.</li>
            <li>Nama pemilik barang agunan harus sesuai dengan nama pada KTP.</li>
            <li>Barang agunan harus dalam kondisi baik dan berfungsi normal.</li>
            <li>Barang yang tidak jelas asal-usulnya tidak akan diterima.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. Persyaratan Khusus per Kategori</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Elektronik & Gadget:</strong> Akun iCloud atau Google wajib di-logout sebelum diserahkan. Menyertakan kelengkapan seperti charger akan mempengaruhi nilai taksiran.</li>
            <li><strong>Kendaraan:</strong> Wajib membawa STNK dan BPKB asli beserta kendaraannya.</li>
            {/* TODO(yoga): tambahkan rincian syarat khusus per kategori jika ada konfirmasi tambahan */}
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Biaya dan Sewa Modal</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Kami tidak memungut biaya admin (tanpa potongan biaya admin).</li>
            <li>Sewa modal dikenakan sebesar 5% untuk jangka waktu 1–15 hari, dan 10% untuk 16–30 hari.</li>
            {/* TODO(yoga): aturan sewa modal >30 hari */}
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Ketentuan Lainnya</h2>
          <p>
            Ketentuan lengkap mengenai hak, kewajiban, dan penyelesaian kewajiban tercantum dalam surat bukti kredit (SBK) atau surat kontrak yang akan ditandatangani di kantor cabang saat transaksi.
          </p>

          <div className="mt-12 pt-6 border-t border-slate-100">
            <a href="/" className="text-mbg-red hover:underline font-medium">
              &larr; Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
