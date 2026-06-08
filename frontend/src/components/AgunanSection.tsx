"use client";

import React, { useState, useEffect } from "react";
import {
  Coins,
  Smartphone,
  Car,
  Hammer,
  X,
  CheckCircle2,
  Info,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  Calculator,
  ArrowRight,
  Clock,
  LayoutGrid,
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
  /** Whether the calculator needs a "duration" input */
  hasDurationInput: boolean;
  accent: string;
  details: string[];
  subKategori: string[];
  keunggulan: string[];
  persyaratan: string[];
  caraGadai: string[];
}

/* ─────────────────────────────────────────────────────────
   CATEGORY DATA  (4 Categories — new business rules)
   ───────────────────────────────────────────────────────── */

const categories: Category[] = [
  // ── 1. Emas & Logam Mulia ──────────────────────────────
  {
    name: "Emas & Logam Mulia",
    slug: "emas-dan-logam-mulia",
    image: "/images/agunan-emas.jpg",
    description:
      "Agunan likuiditas paling tepercaya untuk mengamankan kebutuhan finansial Anda. Proses cepat, bunga kompetitif, dan penyimpanan aman berasuransi.",
    icon: Coins,
    tenorLabel: "Tenor s.d. 120 Hari",
    maxDays: 120,
    hasDurationInput: true,
    accent: "gold",
    details: [
      "Emas Batangan Antam / UBS / Galeri 24",
      "Perhiasan Emas (Cincin, Kalung, Gelang, Anting)",
      "Koin Emas Dinars / Mas Murni",
    ],
    subKategori: ["Anting", "Liontin", "Kalung", "Cincin"],
    keunggulan: [
      "Bunga dinamis 5% per kelipatan 15 hari, transparan tanpa biaya tersembunyi.",
      "Pencairan dana 100% utuh tanpa potongan siluman.",
      "Proses penilaian cepat dan profesional hanya 15 menit.",
      "Jaminan keamanan penyimpanan dalam brankas besi berasuransi penuh.",
    ],
    persyaratan: [
      "Kartu Tanda Penduduk (KTP) asli yang masih berlaku.",
      "Sertifikat emas resmi (Antam, UBS, dll) jika ada.",
      "Nota pembelian perhiasan asli jika ada untuk referensi penilaian.",
    ],
    caraGadai: [
      "Bawa emas fisik beserta KTP ke cabang PT MBG terdekat.",
      "Penilai profesional kami akan menguji kadar & berat emas langsung di depan Anda.",
      "Terima penawaran dan cairkan dana tunai atau transfer dalam 15 menit.",
    ],
  },

  // ── 2. Gadget, Smartphone & Laptop/Elektronik ──────────
  {
    name: "Gadget, Smartphone & Laptop/Elektronik",
    slug: "gadget-smartphone-elektronik",
    image: "/images/agunan-gadget.jpg",
    description:
      "Dapatkan dana tunai cepat dengan mengagunkan gadget, smartphone, laptop, atau perangkat elektronik Anda. Bunga progresif dan tenor ringkas.",
    icon: Smartphone,
    tenorLabel: "Tenor s.d. 30 Hari",
    maxDays: 30,
    hasDurationInput: true,
    accent: "blue",
    details: [
      "Apple iPhone (Seri 12 ke atas, diutamakan iBox/Resmi)",
      "Samsung Galaxy (Seri S & Note, diutamakan resmi SEIN)",
      "Laptop & Macbook (Intel Gen-10 / Apple M1 ke atas)",
      "Smart TV (LED / OLED, minimal ukuran 32 inch)",
      "Kamera DSLR / Mirrorless (Sony, Canon, Fujifilm)",
    ],
    subKategori: ["Handphone", "Tab", "Laptop", "Kamera", "Televisi", "Salon Aktif", "Kulkas", "Mesin Cuci", "Microwave"],
    keunggulan: [
      "Bunga progresif transparan: 5% (1–15 hari), 10% (16–30 hari).",
      "Pencairan dana langsung di tempat tanpa potongan administrasi awal.",
      "Sistem penyimpanan steril dan aman bebas manipulasi data internal.",
      "Asuransi barang terjamin penuh selama masa gadai berlangsung.",
    ],
    persyaratan: [
      "Kartu Tanda Penduduk (KTP) asli yang masih berlaku.",
      "Unit gadget/laptop/elektronik dalam keadaan menyala dan berfungsi normal.",
      "Kelengkapan orisinal (dus/box, charger bawaan, nota pembelian jika ada) untuk nilai maksimal.",
    ],
    caraGadai: [
      "Kunjungi kantor cabang PT MBG terdekat membawa unit perangkat Anda.",
      "Staf penilai melakukan cek fungsional sistem, kondisi fisik, dan kelengkapan unit.",
      "Nilai pinjaman disepakati, tanda tangani kontrak, dana langsung cair.",
    ],
  },

  // ── 3. Kendaraan Bermotor (NEW) ────────────────────────
  {
    name: "Kendaraan Bermotor",
    slug: "kendaraan-bermotor",
    image: "/images/agunan-kendaraan.jpg",
    description:
      "Agunkan kendaraan bermotor Anda untuk mendapatkan dana cepat dengan bunga bersaing dan proses mudah. Skema bunga disesuaikan durasi pinjaman.",
    icon: Car,
    tenorLabel: "Tenor s.d. 60 Hari",
    maxDays: 60,
    hasDurationInput: true,
    accent: "blue",
    details: [
      "Sepeda Motor (Honda, Yamaha, Suzuki, Kawasaki — plat aktif & pajak hidup)",
      "Mobil Penumpang (Sedan, MPV, SUV — STNK dan BPKB atas nama sendiri)",
      "Kendaraan Niaga Ringan (Pick-up, minibus — sesuai ketentuan cabang)",
    ],
    subKategori: ["Sepeda Motor", "Sepeda Listrik", "Mobil"],
    keunggulan: [
      "Bunga fleksibel: hanya 5% untuk pinjaman 1–7 hari, 10% untuk 8–30 hari.",
      "Proses verifikasi surat kendaraan cepat dan aman.",
      "Tempat penitipan kendaraan berkeamanan tinggi dengan CCTV 24 jam.",
      "Asuransi kehilangan dan kerusakan penuh selama masa gadai.",
    ],
    persyaratan: [
      "Kartu Tanda Penduduk (KTP) asli yang masih berlaku.",
      "STNK asli yang masih aktif (pajak tidak mati).",
      "BPKB asli atas nama sendiri atau disertai surat kuasa notaris.",
      "Kunci cadangan kendaraan (jika tersedia).",
    ],
    caraGadai: [
      "Bawa kendaraan beserta dokumen lengkap (KTP, STNK, BPKB) ke cabang PT MBG.",
      "Staf melakukan inspeksi fisik kendaraan dan verifikasi dokumen kepemilikan.",
      "Nilai pinjaman disepakati, tanda tangani kontrak, dana langsung cair.",
    ],
  },

  // ── 4. Gerabahan & Alat Kerja ──────────────────────────
  {
    name: "Gerabahan & Alat Kerja",
    slug: "alat-pertukangan-dan-mesin-industri",
    image: "/images/agunan-perkakas.jpg",
    description:
      "Penyediaan likuiditas khusus untuk kebutuhan rumah tangga dan pekerja profesional. Bunga disesuaikan dengan durasi pinjaman Anda.",
    icon: Hammer,
    tenorLabel: "Tenor s.d. 4 Bulan",
    maxDays: 120,
    hasDurationInput: true,
    accent: "blue",
    details: [
      "Peralatan Rumah Tangga (Blender, Mixer, Setrika, dll)",
      "Alat Pertukangan (Mesin Bor, Circular Saw, dll)",
      "Peralatan Dapur & Usaha Kecil (Kompor, Mesin Cup Sealer, dll)",
    ],
    subKategori: ["Kompresor", "Magicom", "Panci", "Sarung", "Blender", "Mixer", "Kipas Angin", "Juicer", "Gilingan Pastel", "Setrika", "Sepeda Pancal", "Mesin Cup Sealer", "Alat Tukang", "Kompor", "Mesin Jahit", "Alat Dapur", "Karpet", "Timbangan", "Cetakan Kue"],
    keunggulan: [
      "Bunga ringan 5% untuk gadai 1 hari, 10% untuk durasi lebih lama.",
      "Solusi likuiditas proyek cepat tanpa perlu menjual aset kerja berharga.",
      "Gudang penyimpanan barang berat berkeamanan tinggi dengan pengawasan 24 jam.",
      "Asuransi perlindungan kerusakan penuh atas unit yang dijaminkan.",
    ],
    persyaratan: [
      "Kartu Tanda Penduduk (KTP) asli yang masih berlaku.",
      "Mesin perkakas dalam keadaan bersih dan berfungsi prima secara mekanik.",
      "Kelengkapan aksesoris pendukung (koper box, mata bor bawaan, kunci pembuka).",
    ],
    caraGadai: [
      "Kunjungi cabang terdekat dengan membawa peralatan mesin pertukangan.",
      "Pengujian daya watt, putaran motor dinamo, dan kelayakan mekanik dilakukan staf teknis.",
      "Nilai gadai disepakati dan dana langsung diserahterimakan.",
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   HELPER FUNCTIONS
   ───────────────────────────────────────────────────────── */

/** Parse a formatted string back to a raw number */
const getRawNumber = (val: string): number =>
  parseInt(val.replace(/\D/g, ""), 10) || 0;

/** Format a number to Indonesian Rupiah display */
const formatRupiah = (num: number): string => {
  if (!num) return "Rp 0";
  return "Rp " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

/**
 * Dynamic block-based interest calculator.
 *
 * Algorithm (uniform for ALL categories):
 *   - Every 15 days = 1 block
 *   - Each block = 5% interest
 *   - totalBlok = Math.ceil(days / 15)
 *   - rate = totalBlok * 5%
 *
 * If duration exceeds tenor (maxDays), the calculation is split:
 *   1. Tenor interest:  Math.ceil(maxDays / 15) blocks × 5%
 *   2. Late penalty:    Math.ceil(lateDays / 15) blocks × 5%
 *
 * UI label for each line uses dynamic day ranges:
 *   - startDay = ((block - 1) * 15) + 1
 *   - endDay   = block * 15
 *   - e.g. block 3 → "31 – 45 hari"
 *
 * Examples (Gadget, tenor 30 hari):
 *   10 hari  → 1 blok  →  5%  → label "5% (1 – 15 hari)"
 *   25 hari  → 2 blok  → 10%  → label "10% (16 – 30 hari)"
 *   31 hari  → tenor 10% + denda 1 blok 5%  → 15%
 *   60 hari  → tenor 10% + denda 2 blok 10% → 20%
 */

interface BreakdownItem {
  label: string;
  rate: number;
  amount: number;
  isLate: boolean;
}

const calculateInterest = (
  principal: number,
  days: number,
  maxDays: number
): { total: number; breakdown: BreakdownItem[] } => {
  if (days <= 0) return { total: 0, breakdown: [] };

  const breakdown: BreakdownItem[] = [];
  let totalBunga = 0;

  if (days <= maxDays) {
    // ── Within tenor: single calculation ──
    const totalBlok = Math.ceil(days / 15);
    const rate = totalBlok * 0.05;
    const startDay = ((totalBlok - 1) * 15) + 1;
    const endDay = totalBlok * 15;
    const amount = Math.round(principal * rate);

    breakdown.push({
      label: `${(rate * 100).toFixed(0)}% (${startDay} – ${endDay} hari)`,
      rate,
      amount,
      isLate: false,
    });
    totalBunga = amount;
  } else {
    // ── Exceeds tenor: split into tenor interest + late penalty ──

    // 1. Tenor interest (up to maxDays)
    const tenorBlok = Math.ceil(maxDays / 15);
    const tenorRate = tenorBlok * 0.05;
    const tenorStartDay = ((tenorBlok - 1) * 15) + 1;
    const tenorEndDay = tenorBlok * 15;
    const tenorAmount = Math.round(principal * tenorRate);

    breakdown.push({
      label: `${(tenorRate * 100).toFixed(0)}% (${tenorStartDay} – ${tenorEndDay} hari)`,
      rate: tenorRate,
      amount: tenorAmount,
      isLate: false,
    });
    totalBunga += tenorAmount;

    // 2. Late penalty (remaining days beyond tenor)
    const lateDays = days - maxDays;
    const lateBlok = Math.ceil(lateDays / 15);
    const lateRate = lateBlok * 0.05;
    const lateAmount = Math.round(principal * lateRate);

    breakdown.push({
      label: `Denda Keterlambatan (${lateDays} hari)`,
      rate: lateRate,
      amount: lateAmount,
      isLate: true,
    });
    totalBunga += lateAmount;
  }

  return { total: totalBunga, breakdown };
};

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────── */

export default function AgunanSection() {
  const [selectedAgunan, setSelectedAgunan] = useState<Category | null>(null);
  const [activeTab, setActiveTab] = useState<string>("keunggulan");
  const [jumlahPinjaman, setJumlahPinjaman] = useState<string>("");
  const [durasiHari, setDurasiHari] = useState<string>("");
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
    setActiveTab("keunggulan");
    setJumlahPinjaman("");
    setDurasiHari("");
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "unset";
    setTimeout(() => setSelectedAgunan(null), 200);
  };

  /* Controlled Rupiah input */
  const handlePinjamanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = getRawNumber(e.target.value);
    setJumlahPinjaman(raw === 0 ? "" : raw.toLocaleString("id-ID"));
  };

  /* Controlled duration input */
  const handleDurasiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = getRawNumber(e.target.value);
    if (!selectedAgunan) return;
    // No max clamp — allow any duration to handle late payments
    setDurasiHari(raw === 0 ? "" : String(raw));
  };

  /* ── Simulation calculations ─────────────────────────── */
  const rawPinjaman = getRawNumber(jumlahPinjaman);
  const rawDurasi = parseInt(durasiHari, 10) || 0;

  let estimasiBunga = 0;
  let bungaBreakdown: BreakdownItem[] = [];
  let isLatePayment = false;

  if (selectedAgunan && rawPinjaman > 0 && rawDurasi > 0) {
    const result = calculateInterest(rawPinjaman, rawDurasi, selectedAgunan.maxDays);
    estimasiBunga = result.total;
    bungaBreakdown = result.breakdown;
    isLatePayment = rawDurasi > selectedAgunan.maxDays;
  }

  const totalBayar = rawPinjaman + estimasiBunga;
  const canShowResult = rawPinjaman > 0 && rawDurasi > 0;

  /* ─────────────────────────────────────────────────────── */

  return (
    <section
      className="bg-gradient-to-b from-[#F4F8FA] to-white py-24 sm:py-28 border-y border-slate-100"
      id="kategori"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Section Header ─────────────────────────────── */}
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="text-[11px] font-bold text-[#2B6B9E] tracking-[0.15em] uppercase px-3 py-1.5 bg-slate-100 rounded-full inline-block">
            Pilihan Agunan Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B416C]">
            Kategori Agunan dengan Bunga Transparan
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Pilih kategori aset Anda di bawah ini. Kami memberikan skema bunga
            yang jelas, transparan, serta jaminan perlindungan penuh berasuransi
            untuk setiap barang gadai Anda.
          </p>
        </div>

        {/* ── Card Grid (4 Columns) ──────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;

            /* Build a concise interest summary for the card face */
            const maxBlok = Math.ceil(cat.maxDays / 15);
            const maxRate = maxBlok * 5;
            const interestSummary = `5% per 15 hari (maks. ${maxRate}% / ${cat.maxDays} hari)`;

            return (
              <div
                key={cat.slug}
                className="bg-white rounded-3xl border border-slate-100 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-slate-200 transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <span className="absolute top-4 left-4 flex items-center justify-center w-10 h-10 rounded-xl bg-white/95 backdrop-blur shadow-md text-[#0B416C]">
                    <Icon className="w-5 h-5" />
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="inline-block px-2.5 py-1 text-[10px] font-bold text-[#0B416C] bg-slate-100 rounded-lg">
                      Gadai Konvensional
                    </div>
                    <h3 className="text-lg font-bold text-[#0B416C] leading-snug group-hover:text-[#2B6B9E] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {cat.description}
                    </p>
                  </div>

                  {/* Info & CTA */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Tenor</span>
                      <span className="font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded">
                        {cat.tenorLabel}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Bunga</span>
                      <span className="font-bold text-[#2B6B9E] text-right max-w-[60%]">
                        {interestSummary}
                      </span>
                    </div>

                    <button
                      onClick={() => openModal(cat)}
                      className="w-full bg-[#0B416C] hover:bg-[#083254] text-white py-2.5 rounded-xl font-semibold text-xs tracking-wide transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1.5"
                    >
                      Lihat Detail Agunan
                      <ArrowRight className="w-3.5 h-3.5" />
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
                  <h3 className="text-lg font-bold">{selectedAgunan.name}</h3>
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

            {/* Tabs Bar */}
            <div className="flex border-b border-slate-100 bg-slate-50 overflow-x-auto scrollbar-none">
              {[
                { id: "keunggulan", label: "Keunggulan", icon: ShieldCheck },
                { id: "persyaratan", label: "Persyaratan", icon: Info },
                { id: "alur", label: "Cara Gadai", icon: HelpCircle },
                { id: "simulasi", label: "Simulasi Bunga", icon: Calculator },
                { id: "subkategori", label: "Sub Kategori", icon: LayoutGrid },
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-grow sm:flex-initial flex items-center justify-center gap-1.5 py-4 px-5 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
                      isActive
                        ? "border-[#0B416C] text-[#0B416C] bg-white shadow-inner-bottom"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="p-6 overflow-y-auto flex-grow max-h-[50vh] bg-slate-50/30">
              {/* ── Tab 1: Keunggulan ────────────────────── */}
              {activeTab === "keunggulan" && (
                <div className="space-y-6">
                  <div className="bg-[#F4F8FA] border border-[#2B6B9E]/10 p-4 rounded-2xl flex gap-3">
                    <TrendingUp className="w-5 h-5 text-[#2B6B9E] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0B416C] uppercase tracking-wide">
                        Skema Bunga Transparan
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1">
                        {selectedAgunan.tenorLabel} —{" "}
                        Bunga dinamis <strong className="text-[#0B416C]">5% per kelipatan 15 hari</strong>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Mengapa Memilih Kami?
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {selectedAgunan.keunggulan.map((point, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2.5 p-3 bg-white border border-slate-100 rounded-xl shadow-xs"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#2B6B9E] shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-600 leading-relaxed font-medium">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* ── Tab 2: Persyaratan ───────────────────── */}
              {activeTab === "persyaratan" && (
                <div className="space-y-5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Kelengkapan Dokumen & Aset
                  </h4>
                  <div className="space-y-3">
                    {selectedAgunan.persyaratan.map((req, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-xs"
                      >
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-[#0B416C] text-xs font-bold shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium mt-0.5">
                          {req}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-amber-50/50 border border-amber-200/50 rounded-2xl flex items-start gap-3">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      *Kelengkapan aksesoris dan dokumen pendukung sangat
                      direkomendasikan untuk memaksimalkan jumlah pinjaman yang
                      ditawarkan.
                    </p>
                  </div>
                </div>
              )}

              {/* ── Tab 3: Cara Gadai ────────────────────── */}
              {activeTab === "alur" && (
                <div className="space-y-6">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Alur Gadai Mudah 3 Langkah
                  </h4>
                  <div className="relative border-l border-slate-200 ml-4 pl-8 space-y-8 py-2">
                    {selectedAgunan.caraGadai.map((step, index) => (
                      <div key={index} className="relative">
                        <span className="absolute -left-12 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#0B416C] text-white text-xs font-extrabold shadow-md border-2 border-white">
                          {index + 1}
                        </span>
                        <div>
                          <h5 className="text-xs font-bold text-[#0B416C] uppercase tracking-wide">
                            {index === 0
                              ? "Bawa Unit & Dokumen"
                              : index === 1
                              ? "Inspeksi & Penilaian"
                              : "Cairkan Dana Anda"}
                          </h5>
                          <p className="text-xs text-slate-600 leading-relaxed mt-1 font-medium">
                            {step}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Tab 4: Simulasi Bunga & Tenor ────────── */}
              {activeTab === "simulasi" && (
                <div className="space-y-6">
                  <div className="bg-white border border-slate-100 p-5 rounded-3xl space-y-5 shadow-sm">
                    <h4 className="text-xs font-bold text-[#0B416C] uppercase tracking-wider flex items-center gap-1.5">
                      <Calculator className="w-4 h-4 text-[#2B6B9E]" />
                      Kalkulator Simulasi Bunga & Tenor
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Masukkan jumlah pinjaman yang ingin diajukan beserta durasi pinjaman untuk melihat estimasi bunga yang harus dibayar.
                      Durasi dapat melebihi tenor untuk simulasi keterlambatan.
                    </p>

                    {/* Interest rules info */}
                    <div className="bg-[#F4F8FA] border border-[#2B6B9E]/10 p-3 rounded-xl">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Ketentuan Bunga Kategori Ini
                      </span>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-600 font-medium flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-[#2B6B9E]" />
                            Rumus: setiap kelipatan 15 hari
                          </span>
                          <span className="font-bold text-[#0B416C]">+5%</span>
                        </div>
                        {(() => {
                          const maxBlok = Math.ceil(selectedAgunan.maxDays / 15);
                          // Show a few example tiers
                          const examples = Array.from({ length: Math.min(maxBlok, 4) }, (_, i) => {
                            const blok = i + 1;
                            const startDay = ((blok - 1) * 15) + 1;
                            const endDay = blok * 15;
                            const rate = blok * 5;
                            return (
                              <div key={blok} className="flex items-center justify-between text-xs">
                                <span className="text-slate-500 font-medium pl-5">
                                  {startDay} – {endDay} hari
                                </span>
                                <span className="font-semibold text-slate-600">{rate}%</span>
                              </div>
                            );
                          });
                          if (maxBlok > 4) {
                            examples.push(
                              <div key="more" className="text-[10px] text-slate-400 pl-5 italic">
                                ...dst hingga {maxBlok * 5}% ({selectedAgunan.maxDays} hari)
                              </div>
                            );
                          }
                          return examples;
                        })()}
                        <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/50">
                          <span className="text-slate-600 font-medium flex items-center gap-1.5">
                            <Info className="w-3 h-3 text-amber-500" />
                            Denda keterlambatan (di atas {selectedAgunan.maxDays} hari)
                          </span>
                          <span className="font-bold text-amber-600">+5% / 15 hari</span>
                        </div>
                      </div>
                    </div>

                    {/* Jumlah Pinjaman input */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                        Jumlah Pinjaman Yang Diajukan (Rupiah)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#0B416C]">
                          Rp
                        </span>
                        <input
                          type="text"
                          value={jumlahPinjaman}
                          onChange={handlePinjamanChange}
                          placeholder="Contoh: 5.000.000"
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B416C] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Duration input (all categories) */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                        Durasi Pinjaman (Hari)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#0B416C]">
                          <Clock className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          value={durasiHari}
                          onChange={handleDurasiChange}
                          placeholder={`Tenor ${selectedAgunan.maxDays} hari (boleh lebih)`}
                          className={`w-full bg-slate-50 border rounded-2xl py-3 pl-11 pr-4 text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                            rawDurasi > selectedAgunan.maxDays
                              ? "border-amber-400 focus:ring-amber-400"
                              : "border-slate-200 focus:ring-[#0B416C]"
                          }`}
                        />
                      </div>
                      {rawDurasi > selectedAgunan.maxDays && (
                        <p className="text-[10px] text-amber-600 font-semibold flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          Melebihi tenor {selectedAgunan.maxDays} hari — bunga keterlambatan berlaku.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ── Result Output ──────────────────────── */}
                  {canShowResult ? (
                    <div className="bg-gradient-to-br from-[#0B416C] to-[#2B6B9E] text-white p-5 rounded-3xl space-y-4 shadow-md">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4F8FA]/70">
                        Hasil Simulasi Bunga
                      </h4>

                      <div className="grid grid-cols-2 gap-4 pt-1">
                        <div>
                          <span className="text-[10px] text-[#F4F8FA]/70 block uppercase tracking-wide">
                            Tenor Kategori
                          </span>
                          <span className="text-lg font-extrabold">
                            {selectedAgunan.tenorLabel.replace("Tenor ", "")}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#F4F8FA]/70 block uppercase tracking-wide">
                            Durasi Pinjaman
                          </span>
                          <span className="text-lg font-extrabold">
                            {rawDurasi} hari
                            {isLatePayment && (
                              <span className="text-xs font-bold text-amber-300 ml-1">
                                (terlambat {rawDurasi - selectedAgunan.maxDays} hari)
                              </span>
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="h-px bg-white/10" />

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[#F4F8FA]/80">
                            Jumlah Pinjaman Diajukan
                          </span>
                          <span className="text-base font-extrabold text-[#F4F8FA] text-right">
                            {formatRupiah(rawPinjaman)}
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[#F4F8FA]/80">
                              Estimasi Bunga Total
                            </span>
                            <span className="text-sm font-bold text-amber-300 text-right">
                              {formatRupiah(estimasiBunga)}
                            </span>
                          </div>
                          {/* Interest breakdown */}
                          {bungaBreakdown.length > 0 && (
                            <div className="space-y-1 pl-2 border-l border-white/15">
                              {bungaBreakdown.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between text-[10px]">
                                  <span className={`${item.isLate ? 'text-amber-300/90' : 'text-[#F4F8FA]/60'}`}>
                                    {item.isLate && '⚠ '}{item.label}
                                  </span>
                                  <span className={`font-bold ${item.isLate ? 'text-amber-300' : 'text-[#F4F8FA]/70'}`}>
                                    {formatRupiah(item.amount)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="h-px bg-white/10" />

                      <div className="flex items-center justify-between bg-white/10 p-3 rounded-xl">
                        <span className="text-xs font-bold">
                          Total Bayar Saat Tebus
                        </span>
                        <span className="text-base font-extrabold text-amber-300">
                          {formatRupiah(totalBayar)}
                        </span>
                      </div>

                      <p className="text-[9px] text-[#F4F8FA]/60 text-center leading-relaxed pt-1">
                        *Hasil simulasi merupakan perkiraan awal. Angka resmi
                        akan ditentukan setelah proses penilaian di cabang PT
                        MBG.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-[#F4F8FA] border border-dashed border-[#2B6B9E]/25 py-8 text-center rounded-3xl">
                      <p className="text-xs text-slate-400 font-medium">
                        Masukkan jumlah pinjaman dan durasi pinjaman untuk melihat hasil simulasi.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ── Tab 5: Sub Kategori ──────────────────── */}
              {activeTab === "subkategori" && (
                <div className="space-y-5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Barang yang Diterima
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                    {selectedAgunan.subKategori.map((item, index) => (
                      <div
                        key={index}
                        className="bg-slate-50 text-slate-700 border border-slate-100 text-xs py-2 px-3 rounded-xl text-center font-medium hover:bg-[#F4F8FA] hover:border-[#2B6B9E]/20 hover:text-[#0B416C] transition-all cursor-default"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-[#F4F8FA] border border-[#2B6B9E]/10 rounded-2xl flex items-start gap-3">
                    <Info className="w-4 h-4 text-[#2B6B9E] shrink-0 mt-0.5" />
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      *Daftar barang di atas merupakan contoh komoditas utama yang kami terima. Untuk barang di luar daftar, silakan konsultasikan langsung ke cabang PT MBG terdekat.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 hover:text-slate-800 transition-all"
              >
                Tutup
              </button>
              <a
                href={`https://wa.me/6281213211413?text=Halo%20PT%20MBG%20Pasuruan,%20saya%20ingin%20tanya%20tentang%20gadai%20${encodeURIComponent(
                  selectedAgunan.name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#0B416C] hover:bg-[#083254] text-white rounded-xl text-xs font-bold hover:shadow-md transition-all flex items-center gap-1.5"
              >
                Gadai Sekarang (WhatsApp)
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
