"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Coins,
  Smartphone,
  Car,
  Hammer,
  X,
  Info,
  Calculator,
  ArrowRight,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
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
  const rounded = Math.round(num);
  return "Rp " + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

/** Format Date string YYYY-MM-DD to DD/MM/YYYY */
const formatDateString = (dateStr: string): string => {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts;
  return `${day}/${month}/${year}`;
};

interface BreakdownItem {
  label: string;
  rate: number;
  amount: number;
  isLate: boolean;
}

const calculateInterest = (
  categorySlug: string,
  principal: number,
  days: number,
  maxDays: number
): { total: number; breakdown: BreakdownItem[] } => {
  if (days <= 0) return { total: 0, breakdown: [] };

  const breakdown: BreakdownItem[] = [];
  let totalBunga = 0;

  if (categorySlug === "emas-dan-logam-mulia") {
    const billingBlocks = Math.ceil(days / 30);
    const flatInterestPercentage = billingBlocks * 5;
    const rate = flatInterestPercentage / 100;
    const amount = Math.round(principal * rate);
    const startDay = ((billingBlocks - 1) * 30) + 1;
    const endDay = billingBlocks * 30;

    breakdown.push({
      label: `${flatInterestPercentage}% (${startDay} - ${endDay} Hari)`,
      rate,
      amount,
      isLate: false,
    });
    totalBunga = amount;
  } else {
    // Container Categories ("Gadget", "Kendaraan", "Gerabahan")
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
      // ── Exceeds tenor: split into tenor interest + late penalty denda blocks ──

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
  }

  return { total: Math.round(totalBunga), breakdown };
};

/* ─────────────────────────────────────────────────────────
   CALENDAR PICKER COMPONENT
   ───────────────────────────────────────────────────────── */

const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return "Pilih Tanggal";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Pilih Tanggal";
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

interface CalendarPickerProps {
  label: string;
  value: string; // YYYY-MM-DD
  onChange: (date: string) => void;
  minDate?: string; // YYYY-MM-DD
  hasError?: boolean;
}

function CalendarPicker({
  label,
  value,
  onChange,
  minDate,
  hasError,
}: CalendarPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    let initialDate = new Date();
    if (value) {
      const parsed = new Date(value);
      if (!isNaN(parsed.getTime())) {
        initialDate = parsed;
      }
    }
    return new Date(initialDate.getFullYear(), initialDate.getMonth(), 1);
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (value) {
      const parsed = new Date(value);
      if (!isNaN(parsed.getTime())) {
        setCurrentMonth(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
      }
    }
  }, [value]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Get name of current month in Indonesian
  const monthName = currentMonth.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

  // Calculate days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Calculate first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Generate blank cells for days of previous month
  const blanks = Array.from({ length: firstDayIndex }, (_, i) => null);
  // Generate days of current month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  // Combine blanks and days
  const calendarCells = [...blanks, ...days];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const formattedDay = day.toString().padStart(2, "0");
    const formattedMonth = (month + 1).toString().padStart(2, "0");
    const selectedDateStr = `${year}-${formattedMonth}-${formattedDay}`;
    onChange(selectedDateStr);
    setIsOpen(false);
  };

  const isDateDisabled = (day: number): boolean => {
    if (!minDate) return false;
    const formattedDay = day.toString().padStart(2, "0");
    const formattedMonth = (month + 1).toString().padStart(2, "0");
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    return dateStr < minDate;
  };

  const isDateSelected = (day: number): boolean => {
    if (!value) return false;
    const formattedDay = day.toString().padStart(2, "0");
    const formattedMonth = (month + 1).toString().padStart(2, "0");
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    return dateStr === value;
  };

  return (
    <div className="relative space-y-2 flex-grow w-full" ref={containerRef}>
      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5 text-[#2B6B9E]" />
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-slate-50 border rounded-2xl py-3 px-4 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:bg-white text-left flex items-center justify-between transition-all ${
          hasError
            ? "border-amber-400 focus:ring-amber-400"
            : "border-slate-200 focus:ring-[#0B416C]"
        }`}
      >
        <span>{formatDisplayDate(value)}</span>
        <Calendar className="w-4 h-4 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 z-50 bg-white border border-slate-100 rounded-2xl shadow-xl p-4 w-[280px] sm:w-[320px] animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-[#0B416C] uppercase tracking-wide">
              {monthName}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 uppercase mb-2">
            <div>Min</div>
            <div>Sen</div>
            <div>Sel</div>
            <div>Rab</div>
            <div>Kam</div>
            <div>Jum</div>
            <div>Sab</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarCells.map((cell, idx) => {
              if (cell === null) {
                return <div key={`empty-${idx}`} />;
              }

              const disabled = isDateDisabled(cell);
              const selected = isDateSelected(cell);

              return (
                <button
                  key={`day-${cell}`}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSelectDay(cell)}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center ${
                    selected
                      ? "bg-[#0B416C] text-white"
                      : disabled
                      ? "text-slate-200 cursor-not-allowed"
                      : "text-slate-700 hover:bg-[#F4F8FA] hover:text-[#0B416C]"
                  }`}
                >
                  {cell}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────
   SIMULASI BUNGA CALCULATOR COMPONENT
   ───────────────────────────────────────────────────────── */

interface SimulasiBungaProps {
  selectedAgunan: Category;
}

function SimulasiBunga({ selectedAgunan }: SimulasiBungaProps) {
  const [jumlahPinjaman, setJumlahPinjaman] = useState<string>("");
  const [tanggalMasuk, setTanggalMasuk] = useState<string>(
    () => new Date().toISOString().split("T")[0]
  );
  const [tanggalJatuhTempo, setTanggalJatuhTempo] = useState<string>("");
  const [dayGap, setDayGap] = useState<number>(0);

  /* Centralized calculation of real-time day gap whenever dates change */
  useEffect(() => {
    const calculateDayGap = (start: string, end: string) => {
      if (!start || !end) return 0;
      const startDate = new Date(start);
      const endDate = new Date(end);
      const timeDiff = endDate.getTime() - startDate.getTime();
      const totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return totalDays > 0 ? totalDays : 0;
    };

    setDayGap(calculateDayGap(tanggalMasuk, tanggalJatuhTempo));
  }, [tanggalMasuk, tanggalJatuhTempo, selectedAgunan]);

  /* Controlled Rupiah input */
  const handlePinjamanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = getRawNumber(e.target.value);
    setJumlahPinjaman(raw === 0 ? "" : raw.toLocaleString("id-ID"));
  };

  const rawPinjaman = getRawNumber(jumlahPinjaman);

  let estimasiBunga = 0;
  let bungaBreakdown: BreakdownItem[] = [];
  let isLatePayment = false;

  if (selectedAgunan && rawPinjaman > 0 && dayGap > 0) {
    const result = calculateInterest(
      selectedAgunan.slug,
      rawPinjaman,
      dayGap,
      selectedAgunan.maxDays
    );
    estimasiBunga = result.total;
    bungaBreakdown = result.breakdown;
    isLatePayment =
      selectedAgunan.slug !== "emas-dan-logam-mulia" &&
      dayGap > selectedAgunan.maxDays;
  }

  const totalBayar = Math.round(rawPinjaman + estimasiBunga);
  const canShowResult = rawPinjaman > 0 && dayGap > 0;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-100 p-5 rounded-3xl space-y-5 shadow-sm">
        <h4 className="text-xs font-bold text-[#0B416C] uppercase tracking-wider flex items-center gap-1.5">
          <Calculator className="w-4 h-4 text-[#2B6B9E]" />
          Kalkulator Simulasi Bunga & Tenor
        </h4>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Masukkan jumlah pinjaman yang ingin diajukan serta pilih tanggal masuk
          dan jatuh tempo untuk melihat estimasi bunga yang harus dibayar.
        </p>

        {/* Interest rules info */}
        <div className="bg-[#F4F8FA] border border-[#2B6B9E]/10 p-3 rounded-xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Ketentuan Bunga Kategori Ini
          </span>
          {selectedAgunan.slug === "emas-dan-logam-mulia" ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#2B6B9E]" />
                  Rumus: Blok 30 Hari
                </span>
                <span className="font-bold text-[#0B416C]">+5% / 30 Hari</span>
              </div>
              <div className="text-xs text-slate-500 pl-5">
                Bunga dihitung per kelipatan 30 hari:
                <br />
                <code className="bg-slate-200/60 px-1 py-0.5 rounded text-[11px] block mt-1 font-mono">
                  Bunga = Pinjaman × (Math.ceil(Hari / 30) × 5%)
                </code>
              </div>
            </div>
          ) : (
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
                const examples = Array.from(
                  { length: Math.min(maxBlok, 4) },
                  (_, i) => {
                    const blok = i + 1;
                    const startDay = (blok - 1) * 15 + 1;
                    const endDay = blok * 15;
                    const rate = blok * 5;
                    return (
                      <div
                        key={blok}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="text-slate-500 font-medium pl-5">
                          {startDay} – {endDay} hari
                        </span>
                        <span className="font-semibold text-slate-600">
                          {rate}%
                        </span>
                      </div>
                    );
                  }
                );
                if (maxBlok > 4) {
                  examples.push(
                    <div
                      key="more"
                      className="text-[10px] text-slate-400 pl-5 italic"
                    >
                      ...dst hingga {maxBlok * 5}% ({selectedAgunan.maxDays}{" "}
                      hari)
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
          )}
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

        {/* Interactive Date-Based Inputs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <CalendarPicker
            label="Tanggal Masuk / Gadai"
            value={tanggalMasuk}
            onChange={(date) => {
              setTanggalMasuk(date);
              if (tanggalJatuhTempo && date > tanggalJatuhTempo) {
                setTanggalJatuhTempo("");
              }
            }}
          />
          <CalendarPicker
            label="Tanggal Jatuh Tempo / Tebus"
            value={tanggalJatuhTempo}
            minDate={tanggalMasuk}
            onChange={(date) => setTanggalJatuhTempo(date)}
            hasError={isLatePayment}
          />
        </div>

        {isLatePayment && (
          <p className="text-[10px] text-amber-600 font-semibold flex items-center gap-1 mt-1">
            <Info className="w-3 h-3" />
            Melebihi tenor {selectedAgunan.maxDays} hari — denda keterlambatan
            berlaku.
          </p>
        )}
      </div>

      {/* ── Result Output ──────────────────────── */}
      {canShowResult ? (
        <div className="bg-gradient-to-br from-[#0B416C] to-[#2B6B9E] text-white p-5 rounded-3xl space-y-4 shadow-md">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4F8FA]/70">
            Hasil Simulasi Bunga
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
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
              <span className="text-sm font-extrabold block mt-1">
                Durasi: {dayGap} Hari (Dari {formatDateString(tanggalMasuk)} s.d{" "}
                {formatDateString(tanggalJatuhTempo)})
                {isLatePayment && (
                  <span className="text-xs font-bold text-amber-300 block mt-0.5">
                    (terlambat {dayGap - selectedAgunan.maxDays} hari)
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
                {formatRupiah(Math.round(rawPinjaman))}
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#F4F8FA]/80">
                  Estimasi Bunga Total
                </span>
                <span className="text-sm font-bold text-amber-300 text-right">
                  {formatRupiah(Math.round(estimasiBunga))}
                </span>
              </div>
              {/* Interest breakdown */}
              {bungaBreakdown.length > 0 && (
                <div className="space-y-1 pl-2 border-l border-white/15">
                  {bungaBreakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-[10px]"
                    >
                      <span
                        className={`${
                          item.isLate ? "text-amber-300/90" : "text-[#F4F8FA]/60"
                        }`}
                      >
                        {item.isLate && "⚠ "}
                        {item.label}
                      </span>
                      <span
                        className={`font-bold ${
                          item.isLate ? "text-amber-300" : "text-[#F4F8FA]/70"
                        }`}
                      >
                        {formatRupiah(Math.round(item.amount))}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="h-px bg-white/10" />

          <div className="flex items-center justify-between bg-white/10 p-3 rounded-xl">
            <span className="text-xs font-bold">Total Bayar Saat Tebus</span>
            <span className="text-base font-extrabold text-amber-300">
              {formatRupiah(Math.round(totalBayar))}
            </span>
          </div>

          <p className="text-[9px] text-[#F4F8FA]/60 text-center leading-relaxed pt-1">
            *Hasil simulasi merupakan perkiraan awal. Angka resmi akan ditentukan
            setelah proses penilaian di cabang PT MBG.
          </p>
        </div>
      ) : (
        <div className="bg-[#F4F8FA] border border-dashed border-[#2B6B9E]/25 py-8 text-center rounded-3xl">
          <p className="text-xs text-slate-400 font-medium">
            Masukkan jumlah pinjaman, tanggal masuk, and tanggal jatuh tempo
            untuk melihat hasil simulasi.
          </p>
        </div>
      )}
    </div>
  );
}

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
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 p-3">
          {categories.map((cat) => {
            const Icon = cat.icon;

            /* Build a concise interest summary for the card face */
            const maxBlok = Math.ceil(cat.maxDays / 15);
            const maxRate = maxBlok * 5;
            const interestSummary = `5% per 15 hari (maks. ${maxRate}% / ${cat.maxDays} hari)`;

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
                      <span className="text-slate-400 font-medium">Bunga</span>
                      <span className="font-bold text-[#2B6B9E] text-right max-w-[60%]">
                        {interestSummary}
                      </span>
                    </div>

                    <button
                      onClick={() => openModal(cat)}
                      className="w-full bg-[#0B416C] hover:bg-[#083254] text-white py-2 sm:py-2.5 px-2 rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs tracking-wide transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1 sm:gap-1.5"
                    >
                      Simulasi Bunga
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

            {/* Modal Body / Calculator */}
            <div className="p-6 overflow-y-auto flex-grow max-h-[50vh] bg-slate-50/30">
              <SimulasiBunga selectedAgunan={selectedAgunan} />
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
