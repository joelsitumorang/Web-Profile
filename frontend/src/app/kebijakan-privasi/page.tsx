import React from 'react';

export const metadata = {
  title: "Kebijakan Privasi - PT Makmur Bersama Gadai Cabang Pasuruan",
};

export default function KebijakanPrivasi() {
  return (
    <main className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-3xl font-bold text-[#002244] mb-6">Kebijakan Privasi</h1>
        <div className="prose prose-slate max-w-none">
          <p>
            Di PT Makmur Bersama Gadai Cabang Pasuruan, kami sangat menghargai privasi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Data yang Kami Kumpulkan</h2>
          <p>
            Kami mengumpulkan informasi berikut saat Anda menggunakan layanan kami:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>KTP Asli:</strong> Diperlukan saat Anda melakukan transaksi gadai di kantor cabang kami.</li>
            <li><strong>Nomor WhatsApp:</strong> Diperlukan saat Anda menghubungi kami melalui tombol WhatsApp di situs web ini untuk keperluan komunikasi layanan.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. Tujuan Pengumpulan Data</h2>
          <p>
            Data yang dikumpulkan digunakan secara eksklusif untuk:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Memverifikasi identitas Anda saat melakukan transaksi gadai.</li>
            <li>Memberikan informasi dan menjawab pertanyaan Anda terkait layanan kami.</li>
            <li>Mematuhi peraturan Otoritas Jasa Keuangan (OJK) yang berlaku bagi perusahaan pergadaian.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Penyimpanan dan Keamanan Data</h2>
          <p>
            Data pribadi Anda disimpan dengan aman dan hanya dapat diakses oleh staf yang berwenang. Kami tidak akan menjual atau membagikan data Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali diwajibkan oleh hukum.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Kontak</h2>
          <p>
            Jika Anda memiliki pertanyaan mengenai penggunaan data Anda, silakan hubungi kami di kantor cabang atau melalui nomor WhatsApp resmi yang tertera di situs ini.
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
