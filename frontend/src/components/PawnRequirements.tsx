"use client";

import React from "react";
import { CheckCircle2, FileText, Info, ShieldCheck } from "lucide-react";

const generalRequirements = [
  {
    title: "Kartu Identitas Resmi (KTP)",
    description: "Kartu Tanda Penduduk (KTP) asli yang masih berlaku wajib diserahkan untuk validasi hukum kontrak perjanjian gadai konvensional sesuai ketentuan OJK.",
  },
  {
    title: "Kesesuaian Identitas",
    description: "Nama pemilik barang yang diajukan untuk transaksi gadai harus sesuai dengan identitas KTP yang dilampirkan guna menghindari masalah sengketa hukum.",
  },
];

const categorySpecificRequirements = [
  {
    category: "Emas",
    requirements: "Sertifikat emas resmi (Antam / UBS / Galeri 24) atau nota pembelian perhiasan asli jika ada.",
  },
  {
    category: "Elektronik",
    requirements: "Unit dalam keadaan menyala dan berfungsi normal. Akun personal (iCloud/Google) wajib di-logout. Dus kemasan asli dan charger bawaan sangat dianjurkan.",
  },
  {
    category: "Alat Rumah Tangga",
    requirements: "Unit peralatan dalam keadaan bersih, mulus, dan berfungsi normal secara elektrik beserta aksesoris bawaan.",
  },
  {
    category: "Kendaraan",
    requirements: "STNK asli aktif (pajak hidup), BPKB asli atas nama sendiri (atau disertai surat kuasa notaris), dan menyerahkan kunci cadangan.",
  },
  {
    category: "Alat Tukang",
    requirements: "Mesin perkakas dalam keadaan bersih dan berfungsi prima secara mekanik beserta kelengkapan pendukung bawaan.",
  },
];

export default function PawnRequirements() {
  return (
    <section className="bg-white py-16 md:py-24 border-b border-slate-100" id="persyaratan">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column — Sticky Title & Trust Note */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <span className="text-[11px] font-bold text-mbg-steel tracking-[0.15em] uppercase">
              Persyaratan Administrasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
              Prosedur Cepat &amp; Dokumen Sederhana
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Kami menyederhanakan persyaratan administrasi demi kenyamanan Anda tanpa mengurangi kepatuhan hukum dan regulasi OJK yang berlaku.
            </p>

            {/* Security notice */}
            <div className="p-5 rounded-2xl bg-mbg-ice border border-mbg-steel/15 space-y-3">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-mbg-steel shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    Penting untuk Diketahui
                  </h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed">
                    Sesuai dengan ketentuan Anti Pencucian Uang (APU) dan Pencegahan Pendanaan Terorisme (PPT), kami tidak menerima barang gadaian yang tidak jelas asal-usul kepemilikannya.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — 2-Level Requirements Structure */}
          <div className="lg:col-span-8 space-y-8" id="requirements-list-container">
            
            {/* Level 1: Syarat Umum */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-l-4 border-mbg-navy pl-3">
                1. Persyaratan Umum (Semua Kategori)
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {generalRequirements.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mbg-ice text-mbg-navy">
                        <FileText className="w-4.5 h-4.5" />
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm">{item.title}</h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Level 2: Syarat Tambahan per Kategori */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-l-4 border-[#2B6B9E] pl-3">
                2. Syarat Dokumen &amp; Unit Khusus
              </h3>
              
              <div className="overflow-hidden border border-slate-200/80 rounded-2xl shadow-sm bg-white">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="p-4 font-bold text-slate-600 w-1/3">Kategori Agunan</th>
                      <th className="p-4 font-bold text-[#0B416C] w-2/3">Syarat Tambahan &amp; Kondisi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categorySpecificRequirements.map((row, index) => (
                      <tr key={index} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50">
                        <td className="p-4 text-slate-900 font-extrabold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#003B73] shrink-0" />
                          <span>{row.category}</span>
                        </td>
                        <td className="p-4 text-[12px] text-slate-500 leading-relaxed font-medium">
                          {row.requirements}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Security confirmation footer */}
              <div className="flex items-center gap-2.5 justify-center py-4 bg-[#F4F8FA] rounded-2xl border border-[#2B6B9E]/10">
                <ShieldCheck className="w-5 h-5 text-mbg-steel" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Seluruh barang jaminan tersimpan aman dalam brankas besi berasuransi penuh
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
