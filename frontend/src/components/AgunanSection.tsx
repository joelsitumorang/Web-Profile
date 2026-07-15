"use client";

import React, { useState, useEffect } from "react";
import {
  Coins,
  Smartphone,
  Car,
  Hammer,
  X,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle,
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
  maxDays: number;
  accent: string;
  details: string[];
  subKategori: string[];
  estimasiBungaTabel: { tenor: string; bunga: string }[];
  syaratKunci: string[];
}

/* ─────────────────────────────────────────────────────────
   CATEGORY DATA (Simplified - Consolidated)
   ───────────────────────────────────────────────────────── */

const categories: Category[] = [
  {
    name: "Emas & Logam Mulia",
    slug: "emas-dan-logam-mulia",
    image: "/images/agunan-emas.jpg",
    description:
      "Agunan likuiditas paling tepercaya untuk mengamankan kebutuhan finansial Anda. Proses cepat, bunga kompetitif, dan penyimpanan aman berasuransi.",
    icon: Coins,
    tenorLabel: "Tenor s.d. 120 Hari",
    maxDays: 120,
    accent: "gold",
    details: [
      "Emas Batangan Antam / UBS / Galeri 24",
      "Perhiasan Emas (Cincin, Kalung, Gelang, Anting)",
      "Koin Emas Dinars / Mas Murni",
    ],
    subKategori: ["Anting", "Liontin", "Kalung", "Cincin", "Batangan"],
    estimasiBungaTabel: [
      { tenor: "1 – 30 Hari", bunga: "5%" },
      { tenor: "31 – 60 Hari", bunga: "10%" },
      { tenor: "61 – 90 Hari", bunga: "15%" },
      { tenor: "91 – 120 Hari", bunga: "20%" },
    ],
    syaratKunci: [
      "Kartu Tanda Penduduk (KTP) asli yang masih berlaku.",
      "Sertifikat emas resmi (jika ada).",
      "Nota pembelian perhiasan asli (jika ada).",
    ],
  },
  {
    name: "Gadget, Smartphone & Laptop/Elektronik",
    slug: "gadget-smartphone-elektronik",
    image: "/images/agunan-gadget.jpg",
    description:
      "Dapatkan dana tunai cepat dengan mengagunkan gadget, smartphone, laptop, atau perangkat elektronik Anda. Bunga progresif dan tenor ringkas.",
    icon: Smartphone,
    tenorLabel: "Tenor s.d. 30 Hari",
    maxDays: 30,
    accent: "blue",
    details: [
      "Apple iPhone & iPad (Seri 12 ke atas, Resmi iBox)",
      "Samsung Galaxy & Tab (Seri S & Note, Resmi SEIN)",
      "Laptop & Macbook (Intel Gen-10 / Apple M1 ke atas)",
      "Smart TV LED/OLED & Kamera DSLR/Mirrorless",
    ],
    subKategori: ["Handphone", "Laptop", "Kamera", "Televisi", "Tablet", "Mesin Cuci"],
    estimasiBungaTabel: [
      { tenor: "1 – 15 Hari", bunga: "5%" },
      { tenor: "16 – 30 Hari", bunga: "10%" },
    ],
    syaratKunci: [
      "Kartu Tanda Penduduk (KTP) asli yang masih berlaku.",
      "Unit dalam keadaan menyala, berfungsi normal, dan tidak terkunci (iCloud/Google account wajib logout).",
      "Dus/box pembelian asli dan charger bawaan (untuk nilai taksiran maksimal).",
    ],
  },
  {
    name: "Kendaraan Bermotor",
    slug: "kendaraan-bermotor",
    image: "/images/agunan-kendaraan.jpg",
    description:
      "Agunkan kendaraan bermotor Anda untuk mendapatkan dana cepat dengan bunga bersaing dan proses mudah. Skema bunga disesuaikan durasi pinjaman.",
    icon: Car,
    tenorLabel: "Tenor s.d. 60 Hari",
    maxDays: 60,
    accent: "blue",
    details: [
      "Sepeda Motor (Honda, Yamaha, Suzuki, Kawasaki — Plat aktif & Pajak hidup)",
      "Mobil Penumpang (Sedan, MPV, SUV — Atas nama sendiri)",
      "Kendaraan Niaga Ringan (Pick-up / Minibus)",
    ],
    subKategori: ["Sepeda Motor", "Sepeda Listrik", "Mobil MPV/SUV"],
    estimasiBungaTabel: [
      { tenor: "1 – 15 Hari", bunga: "5%" },
      { tenor: "16 – 30 Hari", bunga: "10%" },
      { tenor: "31 – 45 Hari", bunga: "15%" },
      { tenor: "46 – 60 Hari", bunga: "20%" },
    ],
    syaratKunci: [
      "Kartu Tanda Penduduk (KTP) asli yang masih berlaku.",
      "STNK asli yang masih aktif (pajak hidup).",
      "BPKB asli atas nama sendiri (atau disertai surat kuasa notaris) & kunci cadangan.",
    ],
  },
  {
    name: "Gerabahan & Alat Kerja",
    slug: "alat-pertukangan-dan-mesin-industri",
    image: "/images/agunan-perkakas.jpg",
    description:
      "Penyediaan likuiditas khusus untuk kebutuhan rumah tangga dan pekerja profesional. Bunga disesuaikan dengan durasi pinjaman Anda.",
    icon: Hammer,
    tenorLabel: "Tenor s.d. 120 Hari",
    maxDays: 120,
    accent: "blue",
    details: [
      "Peralatan Rumah Tangga (Blender, Mixer, Kipas Angin, Setrika, dll)",
      "Alat Pertukangan (Mesin Bor, Circular Saw, Kompresor, dll)",
      "Peralatan Dapur & Usaha Kecil (Kompor, Mesin Cup Sealer, Magicom)",
    ],
    subKategori: ["Blender", "Kipas Angin", "Setrika", "Mesin Cup Sealer", "Alat Pertukangan", "Kompor"],
    estimasiBungaTabel: [
      { tenor: "1 – 15 Hari", bunga: "5%" },
      { tenor: "16 – 30 Hari", bunga: "10%" },
      { tenor: "31 – 45 Hari", bunga: "15%" },
      { tenor: "46 – 120 Hari", bunga: "+5% per 15 Hari" },
    ],
    syaratKunci: [
      "Kartu Tanda Penduduk (KTP) asli yang masih berlaku.",
      "Unit perkakas/alat dalam keadaan bersih dan berfungsi prima secara mekanik.",
      "Kelengkapan aksesoris pendukung (koper box, mata bor bawaan, kabel adaptor).",
    ],
  },
];

export default function AgunanSection() {
  const [selectedAgunan, setSelectedAgunan] = useState<Category | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  /* Close modal on Escape */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (modalOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  const openModal = (agunan: Category) => {
    setSelectedAgunan(agunan);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "unset";
    setTimeout(() => setSelectedAgunan(null), 200);
  };

  return (
    <section
      className="bg-gradient-to-b from-[#F4F8FA] to-white py-24 sm:py-28 border-y border-slate-100"
      id="kategori"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="text-[11px] font-bold text-[#2B6B9E] tracking-[0.15em] uppercase px-3 py-1.5 bg-slate-100 rounded-full inline-block">
            Pilihan Agunan Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B416C]">
            Kategori Agunan dengan Bunga Transparan
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Pilih kategori aset Anda di bawah ini untuk melihat daftar barang yang dapat diagunkan, syarat utama, serta estimasi bunga konvensional OJK.
          </p>
        </div>

        {/* Card Grid (4 Columns) */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 p-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const interestSummary = cat.slug === "emas-dan-logam-mulia" 
              ? "5% per 30 hari" 
              : "5% per 15 hari";

            return (
              <div
                key={cat.slug}
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-slate-200 transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-28 sm:h-36 md:h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <span className="absolute top-2 left-2 sm:top-4 sm:left-4 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/95 backdrop-blur shadow-md text-[#0B416C]">
                    <Icon className="w-4 h-4 sm:w-5 h-5" />
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow justify-between space-y-3 sm:space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <div className="hidden sm:inline-block px-2.5 py-1 text-[10px] font-bold text-[#0B416C] bg-slate-100 rounded-lg">
                      Gadai Konvensional
                    </div>
                    <h3 className="text-sm font-bold md:text-xl text-[#0B416C] leading-snug group-hover:text-[#2B6B9E] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="hidden md:block text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {cat.description}
                    </p>
                  </div>

                  {/* Info & CTA */}
                  <div className="space-y-2 md:space-y-4 pt-2 md:pt-4 md:border-t border-slate-100">
                    <div className="hidden md:flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Tenor</span>
                      <span className="font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded">
                        {cat.tenorLabel}
                      </span>
                    </div>
                    <div className="hidden md:flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Sewa Modal</span>
                      <span className="font-bold text-[#2B6B9E]">
                        {interestSummary}
                      </span>
                    </div>

                    <button
                      onClick={() => openModal(cat)}
                      className="w-full bg-[#0B416C] hover:bg-[#083254] text-white py-2 sm:py-2.5 px-2 rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs tracking-wide transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1 sm:gap-1.5"
                    >
                      Lihat Barang &amp; Syarat
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Modal Popup ──────────────────────────────────── */}
      {modalOpen && selectedAgunan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300">
          {/* Backdrop */}
          <div
            onClick={closeModal}
            className="absolute inset-0 backdrop-blur-sm bg-black/40 transition-opacity"
          />

          {/* Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh] z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0B416C] to-[#2B6B9E] p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="p-2.5 bg-white/10 rounded-xl backdrop-blur">
                  {React.createElement(selectedAgunan.icon, {
                    className: "w-5 h-5 text-white",
                  })}
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#F4F8FA]/80 font-bold">
                    Detail Layanan Gadai
                  </div>
                  <h3 className="text-base sm:text-lg font-bold">{selectedAgunan.name}</h3>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-white/15 rounded-full transition-colors text-white/90 hover:text-white"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (2 Blocks) */}
            <div className="p-6 overflow-y-auto flex-grow max-h-[60vh] bg-slate-50/30 space-y-6">
              
              {/* Block 1: Barang yang Bisa Digadaikan */}
              <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-4">
                <h4 className="text-xs font-bold text-[#0B416C] uppercase tracking-wider">
                  📦 Barang Yang Dapat Diagunkan
                </h4>
                
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {selectedAgunan.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#2B6B9E] mt-0.5 font-bold">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Sub-kategori Chips */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {selectedAgunan.subKategori.map((sub, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 rounded-lg bg-[#F4F8FA] border border-[#2B6B9E]/10 text-[10px] font-bold text-[#2B6B9E] uppercase tracking-wide"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Block 2: Estimasi Bunga & Syarat Kunci */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 2a. Tabel Estimasi Bunga */}
                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-[#0B416C] uppercase tracking-wider">
                    📊 Estimasi Bunga (Sewa Modal)
                  </h4>
                  
                  <div className="overflow-hidden border border-slate-100 rounded-xl">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#F4F8FA] border-b border-slate-100">
                          <th className="p-2 font-bold text-slate-500">Tenor</th>
                          <th className="p-2 font-bold text-[#0B416C]">Sewa Modal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedAgunan.estimasiBungaTabel.map((row, index) => (
                          <tr key={index} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50">
                            <td className="p-2 text-slate-600 font-medium">{row.tenor}</td>
                            <td className="p-2 font-bold text-slate-800">{row.bunga}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <p className="text-[10px] text-slate-400 leading-relaxed italic">
                    * Bunga konvensional OJK flat per kelipatan hari/tenor.
                  </p>
                </div>

                {/* 2b. Syarat Kunci Kategori */}
                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-[#0B416C] uppercase tracking-wider">
                      🔑 Syarat Utama Kategori
                    </h4>
                    
                    <ul className="space-y-2 text-[11px] sm:text-xs text-slate-500">
                      {selectedAgunan.syaratKunci.map((syarat, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{syarat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Anchor reference link */}
                  <div className="pt-4 border-t border-slate-100">
                    <a
                      href="#persyaratan"
                      onClick={closeModal}
                      className="text-[11px] font-bold text-[#2B6B9E] hover:underline flex items-center gap-1"
                    >
                      Lihat Syarat Lengkap &amp; Regulasi &rarr;
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-5 h-5 text-mbg-steel" />
                <span className="text-[10px] font-bold tracking-wide uppercase">Simulasi Resmi OJK</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 hover:text-slate-800 transition-all"
                >
                  Tutup
                </button>
                <a
                  href={`https://wa.me/6281213211413?text=Halo%20PT%20MBG%20Pasuruan,%20saya%20ingin%20tanya%20detail%20bunga%20dan%20syarat%20gadai%20${encodeURIComponent(
                    selectedAgunan.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#0B416C] hover:bg-[#083254] text-white rounded-xl text-xs font-bold hover:shadow-md transition-all flex items-center gap-1.5"
                >
                  Hubungi WA Cabang
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
