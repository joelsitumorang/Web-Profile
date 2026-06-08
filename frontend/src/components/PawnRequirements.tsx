"use client";

import React from "react";
import { CheckCircle2, AlertCircle, FileText, Info } from "lucide-react";

const requirements = [
  {
    category: "Identitas Diri",
    requirement_detail: "Kartu Tanda Penduduk (KTP) asli yang masih berlaku",
    is_mandatory: true,
    description: "Digunakan untuk validasi hukum kontrak perjanjian gadai konvensional sesuai regulasi OJK.",
  },
  {
    category: "Dokumen Kepemilikan",
    requirement_detail: "Nota Pembelian Asli atau Faktur Toko",
    is_mandatory: false,
    description: "Sangat dianjurkan untuk gadget dan elektronik guna mempercepat proses taksiran dan meningkatkan nilai pinjaman.",
  },
  {
    category: "Kelengkapan Unit",
    requirement_detail: "Kotak (Box) Pembelian Asli dan Pengisi Daya (Charger) Bawaan",
    is_mandatory: true,
    description: "Wajib disertakan untuk kategori gadget dan laptop guna memvalidasi keaslian serta kelayakan barang saat inspeksi.",
  },
  {
    category: "Kondisi Fisik & Fungsi",
    requirement_detail: "Unit tidak dalam kondisi terkunci (iCloud / Google Account harus di-logout)",
    is_mandatory: true,
    description: "Petugas penaksir kami wajib melakukan uji fungsi layar, kamera, suara, dan kesehatan baterai sebelum menetapkan nilai pinjaman.",
  },
  {
    category: "Sertifikat Khusus",
    requirement_detail: "Sertifikat LBMA / Kwitansi Toko Emas (Khusus Logam Mulia)",
    is_mandatory: true,
    description: "Wajib diserahkan bersama emas batangan untuk mencocokkan nomor seri fisik emas dengan sertifikat resmi.",
  },
];

export default function PawnRequirements() {
  return (
    <section className="bg-white py-24 sm:py-28 border-b border-slate-100" id="persyaratan">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column — Sticky Title & Trust Note */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <span className="text-[11px] font-bold text-mbg-steel tracking-[0.15em] uppercase">
              Persyaratan Administrasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
              Prosedur Cepat & Dokumen Sederhana
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

          {/* Right Column — Requirement Cards */}
          <div className="lg:col-span-8 space-y-4" id="requirements-list-container">
            {requirements.map((req, idx) => (
              <div
                key={idx}
                className="group border border-slate-100 rounded-2xl p-6 bg-white hover:border-mbg-steel/20 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                  {/* Category + Detail */}
                  <div className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-mbg-ice border border-mbg-steel/10 text-mbg-navy group-hover:bg-mbg-sky transition-colors shrink-0">
                      <FileText className="w-5 h-5" />
                    </span>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 tracking-[0.12em] uppercase block">
                        {req.category}
                      </span>
                      <h4 className="font-bold text-slate-900 text-[15px] leading-snug">
                        {req.requirement_detail}
                      </h4>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="shrink-0 sm:self-start">
                    {req.is_mandatory ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-mbg-sky text-mbg-navy border border-mbg-steel/20">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Wajib
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-50 text-slate-500 border border-slate-200">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Pendukung
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mt-4 pt-4 border-t border-slate-100 pl-0 sm:pl-14">
                  <p className="text-[12px] text-slate-500 leading-relaxed">
                    {req.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
