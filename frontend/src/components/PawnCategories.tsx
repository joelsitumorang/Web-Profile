"use client";

import React from "react";
import { Coins, Smartphone, Laptop, Hammer, ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Emas & Logam Mulia",
    slug: "emas-dan-logam-mulia",
    description: "Agunan likuiditas paling tepercaya untuk mengamankan kebutuhan finansial Anda. Kami menerima berbagai bentuk emas fisik dengan penaksiran profesional standar OJK tanpa potongan biaya tersembunyi.",
    estimation_rate: "Taksiran hingga 95% dari harga pasar emas harian",
    icon: Coins,
    max_loan_duration: 120,
    accent: "gold",
    details: [
      "Emas Batangan Antam / UBS / Galeri 24",
      "Perhiasan Emas (Cincin, Kalung, Gelang, Anting)",
      "Koin Emas Dinars / Mas Murni",
    ],
  },
  {
    name: "Gadget & Smartphone",
    slug: "gadget-dan-smartphone",
    description: "Dapatkan dana tunai cepat dengan mengagunkan perangkat seluler Anda. Kami memproses taksiran nilai unit berdasarkan kondisi fisik, kesehatan baterai, fungsi sistem, dan kelengkapan kotak pembelian asli.",
    estimation_rate: "Taksiran hingga 85% dari nilai pasar barang bekas",
    icon: Smartphone,
    max_loan_duration: 90,
    accent: "blue",
    details: [
      "Apple iPhone (Seri 12 ke atas, disukai iBox)",
      "Samsung Galaxy (Seri S & Note, disukai resmi SEIN)",
      "Apple iPad & Samsung Galaxy Tab",
    ],
  },
  {
    name: "Elektronik & Laptop",
    slug: "elektronik-dan-laptop",
    description: "Mengubah laptop kerja atau perangkat elektronik rumah tangga Anda menjadi modal kerja seketika. Proses inspeksi cepat dan penyimpanan unit dijamin aman dalam lemari penyimpanan ber-AC dan berasuransi.",
    estimation_rate: "Taksiran hingga 80% dari harga pasar bekas aktual",
    icon: Laptop,
    max_loan_duration: 90,
    accent: "blue",
    details: [
      "Laptop & Macbook (Intel Gen-10 / Apple M1 ke atas)",
      "Smart TV (LED / OLED, minimal ukuran 32 inch)",
      "Kamera DSLR / Mirrorless (Sony, Canon, Fujifilm)",
    ],
  },
  {
    name: "Alat Pertukangan & Mesin",
    slug: "alat-pertukangan-dan-mesin-industri",
    description: "Penyediaan likuiditas khusus untuk kontraktor dan pekerja profesional. Agunkan perkakas mesin listrik (power tools) Anda untuk menutup kebutuhan operasional proyek tanpa harus menjual aset berharga Anda.",
    estimation_rate: "Taksiran hingga 70% dari nilai taksir kelayakan alat",
    icon: Hammer,
    max_loan_duration: 120,
    accent: "blue",
    details: [
      "Mesin Bor & Demolition Hammer (Bosch, Makita, Dewalt)",
      "Circular Saw / Miter Saw (Mesin Potong Kayu)",
      "Mesin Las Inverter (Minimal daya 450W)",
    ],
  },
];

export default function PawnCategories() {
  return (
    <section className="bg-mbg-ice py-24 sm:py-28 border-y border-slate-100" id="kategori">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="text-[11px] font-bold text-mbg-steel tracking-[0.15em] uppercase">
            Aset yang Diterima
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Kategori Agunan dengan Taksiran Tinggi & Transparan
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Semua penaksiran dilakukan di depan nasabah secara terbuka menggunakan instrumen uji terkalibrasi dan berpedoman pada referensi pasar yang valid.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="categories-grid-container">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isGold = cat.accent === "gold";

            return (
              <div
                key={cat.slug}
                className="hover-lift bg-white rounded-2xl border border-slate-100 p-7 sm:p-8 flex flex-col justify-between group shadow-sm hover:shadow-md transition-all"
              >
                <div className="space-y-6">

                  {/* Top Row: Icon + Tenor Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex items-center justify-center w-12 h-12 rounded-xl transition-colors ${
                        isGold
                          ? "bg-amber-50 text-mbg-gold group-hover:bg-amber-100"
                          : "bg-mbg-sky text-mbg-navy group-hover:bg-mbg-sky/80"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 bg-mbg-ice border border-slate-100 px-3 py-1.5 rounded-full">
                      Tenor s.d. {cat.max_loan_duration} hari
                    </span>
                  </div>

                  {/* Name & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-mbg-navy transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Accepted Items */}
                  <div className="pt-3 border-t border-slate-100 space-y-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] block">
                      Aset yang Diterima
                    </span>
                    <ul className="space-y-2">
                      {cat.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-[12px] font-medium text-slate-700 flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-mbg-steel transition-colors shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Estimation Rate */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] block">
                      Skema Penilaian
                    </span>
                    <span className="text-[12px] font-bold text-mbg-steel mt-0.5 block">
                      {cat.estimation_rate}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-mbg-navy transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
