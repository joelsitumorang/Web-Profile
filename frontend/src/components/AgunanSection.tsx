"use client";

import React, { useState } from "react";
import {
  Coins,
  Smartphone,
  Home,
  Car,
  Hammer,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   TYPE DEFINITIONS
   ───────────────────────────────────────────────────────── */

interface Category {
  name: string;
  slug: string;
  image: string;
  description: string;
  icon: React.ComponentType<any>;
  tenorLabel: string;
  accent: string;
  details: string[];
  estimasiBungaTabel: { tenor: string; bunga: string }[];
  syaratKunci: string[];
}

/* ─────────────────────────────────────────────────────────
   RESTRUCTURED CATEGORY DATA (5 Categories)
   ───────────────────────────────────────────────────────── */

const categories: Category[] = [
  {
    name: "Emas",
    slug: "emas",
    image: "/images/agunan-emas.jpg",
    description:
      "Agunan likuiditas paling tepercaya untuk mengamankan kebutuhan finansial Anda. Proses cepat, sewa modal kompetitif, dan penyimpanan aman berasuransi.",
    icon: Coins,
    tenorLabel: "Tenor s.d. 120 Hari",
    accent: "gold",
    details: ["Cincin", "Gelang", "Liontin", "Anting", "Kalung"],
    estimasiBungaTabel: [
      { tenor: "1 – 15 Hari", bunga: "5%" },
      { tenor: "16 – 30 Hari", bunga: "10%" },
      { tenor: "31 – 45 Hari", bunga: "15%" },
      { tenor: "46 – 120 Hari", bunga: "+5% per 15 Hari" },
    ],
    syaratKunci: [
      "Kartu Tanda Penduduk (KTP) asli yang masih berlaku.",
      "Sertifikat emas resmi (jika ada).",
      "Nota pembelian perhiasan asli (jika ada).",
    ],
  },
  {
    name: "Elektronik",
    slug: "elektronik",
    image: "/images/agunan-gadget.jpg",
    description:
      "Dapatkan dana tunai cepat dengan mengagunkan gadget, smartphone, laptop, atau perangkat elektronik Anda. Sewa modal ringan dan tenor ringkas.",
    icon: Smartphone,
    tenorLabel: "Tenor s.d. 30 Hari",
    accent: "blue",
    details: ["HP", "Laptop", "Kulkas", "Salon Aktif", "Kamera", "TV"],
    estimasiBungaTabel: [
      { tenor: "1 – 15 Hari", bunga: "5%" },
      { tenor: "16 – 30 Hari", bunga: "10%" },
    ],
    syaratKunci: [
      "Kartu Tanda Penduduk (KTP) asli yang masih berlaku.",
      "Unit dalam keadaan menyala, berfungsi normal, dan akun personal (iCloud/Google) wajib logout.",
      "Dus kemasan asli dan charger bawaan sangat dianjurkan.",
    ],
  },
  {
    name: "Alat Rumah Tangga",
    slug: "alat-rumah-tangga",
    image: "/images/agunan-perkakas.jpg",
    description:
      "Ubah peralatan rumah tangga elektronik Anda menjadi dana modal cepat dengan proses penilaian yang transparan dan amanah.",
    icon: Home,
    tenorLabel: "Tenor s.d. 120 Hari",
    accent: "blue",
    details: ["Blender", "Rice Cooker", "Dispenser", "Kipas Angin", "Microwave"],
    estimasiBungaTabel: [
      { tenor: "1 – 15 Hari", bunga: "5%" },
      { tenor: "16 – 30 Hari", bunga: "10%" },
      { tenor: "31 – 45 Hari", bunga: "15%" },
      { tenor: "46 – 120 Hari", bunga: "+5% per 15 Hari" },
    ],
    syaratKunci: [
      "Kartu Tanda Penduduk (KTP) asli yang masih berlaku.",
      "Unit peralatan dalam keadaan bersih, mulus, dan berfungsi normal secara elektrik.",
      "Aksesoris bawaan (kabel daya, wadah, dll) disertakan.",
    ],
  },
  {
    name: "Kendaraan",
    slug: "kendaraan",
    image: "/images/agunan-kendaraan.jpg",
    description:
      "Agunkan kendaraan bermotor Anda untuk mendapatkan dana cepat dengan sewa modal bersaing dan proses yang terstandarisasi OJK.",
    icon: Car,
    tenorLabel: "Tenor s.d. 60 Hari",
    accent: "blue",
    details: ["Sepeda Motor", "Mobil"],
    estimasiBungaTabel: [
      { tenor: "1 – 15 Hari", bunga: "5%" },
      { tenor: "16 – 30 Hari", bunga: "10%" },
      { tenor: "31 – 45 Hari", bunga: "15%" },
      { tenor: "46 – 60 Hari", bunga: "20%" },
    ],
    syaratKunci: [
      "Kartu Tanda Penduduk (KTP) asli yang masih berlaku.",
      "STNK asli aktif (pajak hidup).",
      "BPKB asli atas nama sendiri (atau surat kuasa notaris) & kunci cadangan.",
    ],
  },
  {
    name: "Alat Tukang",
    slug: "alat-tukang",
    image: "/images/agunan-perkakas.jpg",
    description:
      "Penyediaan likuiditas khusus untuk kontraktor dan pekerja profesional dengan mengagunkan perkakas mesin kerja Anda.",
    icon: Hammer,
    tenorLabel: "Tenor s.d. 120 Hari",
    accent: "blue",
    details: ["Mesin Bor", "Mesin Pasrah/Ketam", "Gerinda", "Mesin Las", "Genset"],
    estimasiBungaTabel: [
      { tenor: "1 – 15 Hari", bunga: "5%" },
      { tenor: "16 – 30 Hari", bunga: "10%" },
      { tenor: "31 – 45 Hari", bunga: "15%" },
      { tenor: "46 – 120 Hari", bunga: "+5% per 15 Hari" },
    ],
    syaratKunci: [
      "Kartu Tanda Penduduk (KTP) asli yang masih berlaku.",
      "Mesin perkakas dalam keadaan bersih dan berfungsi prima secara mekanik.",
      "Kelengkapan pendukung seperti koper box, mata bor bawaan, atau kunci pembuka.",
    ],
  },
];

export default function AgunanSection() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);

  return (
    <section
      className="bg-[#E3F2FD] py-16 md:py-24 border-y border-blue-100/50"
      id="kategori"
    >
      {/* Animasi Fade-In & Scrollbar Hide Kustom */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.35s ease-out forwards;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 space-y-4">
          <span className="text-[11px] font-bold text-[#2B6B9E] tracking-[0.15em] uppercase px-3 py-1.5 bg-slate-100 rounded-full inline-block">
            Pilihan Agunan Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#003B73]">
            Barang apa saja yang bisa digadaikan?
          </h2>
        </div>

        {/* ── Wadah Tab Mobile (Scrollable Tabs - lg:hidden) ── */}
        <div className="lg:hidden relative mb-8">
          {/* Gradient Overlay pada sisi kanan */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#E3F2FD] via-[#E3F2FD]/70 to-transparent pointer-events-none z-10" />
          
          <div className="flex overflow-x-auto scrollbar-none space-x-2 py-1 px-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory.slug === cat.slug;

              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold transition-all shrink-0 active:scale-[0.97] ${
                    isSelected
                      ? "bg-[#0B416C] text-white border-[#0B416C] shadow-md"
                      : "bg-white text-slate-600 border-slate-200/60 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
            {/* Blank item at the end to allow smooth end scrolling past gradient */}
            <div className="w-8 shrink-0" />
          </div>
        </div>

        {/* ── Grid Card Kategori Desktop (Desktop Only - hidden lg:grid) ── */}
        <div className="hidden lg:grid grid-cols-5 gap-4 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory.slug === cat.slug;

            return (
              <div
                key={cat.slug}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                  isSelected
                    ? "border-blue-600 ring-2 ring-blue-600/30 shadow-lg scale-[1.02] bg-blue-50/5"
                    : "border border-slate-100 bg-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                }`}
              >
                {/* Image */}
                <div className="relative h-24 sm:h-28 w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <span className={`absolute top-2 left-2 flex items-center justify-center w-8 h-8 rounded-lg shadow-md transition-all ${
                    isSelected ? "bg-blue-600 text-white" : "bg-white/95 text-[#0B416C]"
                  }`}>
                    <Icon className="w-4.5 h-4.5" />
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                  <div className="space-y-1">
                    <h3 className={`text-sm sm:text-base font-extrabold transition-colors ${
                      isSelected ? "text-blue-600" : "text-[#0B416C]"
                    }`}>
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {cat.tenorLabel}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Box Detail Barang Dinamis (Dynamic Box List - Vertikal di Mobile) ── */}
        <div
          key={selectedCategory.slug}
          className="animate-fade-in bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-8 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Column 1 (lg:col-span-5): Daftar Barang Agunan */}
          <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#0B416C] uppercase tracking-wider border-l-4 border-blue-600 pl-3">
                📦 Daftar Barang Yang Dapat Diagunkan
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Berikut adalah rincian unit/barang dalam kategori <strong className="text-slate-800">{selectedCategory.name}</strong> yang kami layani:
              </p>
              
              {/* Grid 2-kolom baik di mobile maupun desktop (grid-cols-2) */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {selectedCategory.details.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/50 border border-slate-100 hover:border-blue-100 hover:bg-blue-50/5 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-[11px] sm:text-xs font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* OJK Verification Note */}
            <div className="pt-4 hidden sm:flex items-center gap-2 text-slate-400 border-t border-slate-100/80">
              <ShieldCheck className="w-5 h-5 text-mbg-steel" />
              <span className="text-[10px] font-bold tracking-wide uppercase">Gadai Resmi Diawasi OJK</span>
            </div>
          </div>

          {/* Column 2 (lg:col-span-4): Bunga / Sewa Modal */}
          <div className="lg:col-span-4 space-y-4 border-y lg:border-y-0 lg:border-x border-slate-100/80 py-5 lg:py-0 lg:px-8">
            <h4 className="text-xs font-bold text-[#0B416C] uppercase tracking-wider">
              📊 Estimasi Sewa Modal (Bunga)
            </h4>
            
            <div className="overflow-hidden border border-slate-100 rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F4F8FA] border-b border-slate-100">
                    <th className="p-3 font-bold text-slate-500">Tenor</th>
                    <th className="p-3 font-bold text-[#0B416C]">Bunga</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCategory.estimasiBungaTabel.map((row, index) => (
                    <tr key={index} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                      <td className="p-3 text-slate-600 font-medium">{row.tenor}</td>
                      <td className="p-3 font-bold text-slate-800">{row.bunga}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-xl bg-[#F4F8FA] border border-blue-100/10 text-[10px] text-slate-500 leading-relaxed italic">
              * Biaya sewa modal flat per hari berdasarkan kelipatan tenor 15 hari.
            </div>
          </div>

          {/* Column 3 (lg:col-span-3): Syarat Utama & CTA */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#0B416C] uppercase tracking-wider">
                🔑 Syarat Kunci Utama
              </h4>
              <ul className="space-y-2 text-[11px] sm:text-xs text-slate-500">
                {selectedCategory.syaratKunci.map((syarat, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold shrink-0 mt-0.5">•</span>
                    <span>{syarat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100/80">
              {/* WhatsApp Simulasi Bunga CTA Button (Lebar Penuh) */}
              <a
                href={`https://wa.me/6281213211413?text=Halo%20PT%20MBG%20Pasuruan,%20saya%20ingin%20tanya%20detail%20bunga%20dan%20syarat%20gadai%20${encodeURIComponent(
                  selectedCategory.name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-[#0B416C] hover:bg-[#083254] text-white font-bold text-xs shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              >
                <span>Simulasi Bunga via WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </a>
              
              <a
                href="#persyaratan"
                className="block text-center text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-wider"
              >
                Lihat Regulasi Lengkap &rarr;
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
