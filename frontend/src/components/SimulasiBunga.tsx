"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Search,
  Calculator,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  MessageSquare,
  Info,
  Sparkles,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   TYPE DEFINITIONS
   ───────────────────────────────────────────────────────── */

interface BarangBunga {
  nama: string;
  bungaPersen: number;
  periodeHari: number;
  tenorMaksimumHari: number;
}

interface SimulasiResult {
  jumlahPeriode: number;
  totalBunga: number;
  totalTebusan: number;
}

interface SimulasiBungaProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ─────────────────────────────────────────────────────────
   HELPER FUNCTIONS
   ───────────────────────────────────────────────────────── */

/** Format number as Indonesian Rupiah string */
function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Parse Rupiah-formatted string back to number */
function parseRupiahInput(input: string): number {
  // Remove everything except digits
  const digits = input.replace(/\D/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

/** Format input value with thousand separators for display */
function formatInputRupiah(value: number): string {
  if (value === 0) return "";
  return new Intl.NumberFormat("id-ID").format(value);
}

/* ─────────────────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────────────────── */

export default function SimulasiBunga({ isOpen, onClose }: SimulasiBungaProps) {
  // ── Data state ──
  const [daftarBarang, setDaftarBarang] = useState<BarangBunga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ── Form state ──
  const [selectedBarang, setSelectedBarang] = useState<BarangBunga | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [jumlahPinjaman, setJumlahPinjaman] = useState<number>(0);
  const [pinjamanDisplay, setPinjamanDisplay] = useState("");
  const [tenorHari, setTenorHari] = useState<string>("");
  const [result, setResult] = useState<SimulasiResult | null>(null);

  // ── Validation state ──
  const [tenorError, setTenorError] = useState("");
  const [pinjamanError, setPinjamanError] = useState("");

  // ── Refs ──
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // ── Fetch data on mount ──
  useEffect(() => {
    fetch("/data/barang-bunga.json")
      .then((res) => res.json())
      .then((data: BarangBunga[]) => {
        setDaftarBarang(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load barang-bunga.json:", err);
        setIsLoading(false);
      });
  }, []);

  // ── Close dropdown on outside click ──
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Lock body scroll when modal is open ──
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── Reset form when modal opens ──
  useEffect(() => {
    if (isOpen) {
      setSelectedBarang(null);
      setSearchQuery("");
      setJumlahPinjaman(0);
      setPinjamanDisplay("");
      setTenorHari("");
      setResult(null);
      setTenorError("");
      setPinjamanError("");
      setIsDropdownOpen(false);
    }
  }, [isOpen]);

  // ── Filtered items for autocomplete ──
  const filteredBarang = daftarBarang.filter((b) =>
    b.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ── Select barang handler ──
  const handleSelectBarang = useCallback((barang: BarangBunga) => {
    setSelectedBarang(barang);
    setSearchQuery(barang.nama);
    setIsDropdownOpen(false);
    setTenorError("");
    setResult(null);
    // Re-validate tenor if already set
    setTenorHari((prev) => {
      if (prev) {
        const val = parseInt(prev, 10);
        if (val > barang.tenorMaksimumHari) {
          setTenorError(
            `Tenor melebihi batas maksimum ${barang.tenorMaksimumHari} hari untuk ${barang.nama}`
          );
        }
      }
      return prev;
    });
  }, []);

  // ── Pinjaman input handler ──
  const handlePinjamanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const numericValue = parseRupiahInput(raw);
    setJumlahPinjaman(numericValue);
    setPinjamanDisplay(formatInputRupiah(numericValue));
    setPinjamanError("");
    setResult(null);
  };

  // ── Tenor input handler ──
  const handleTenorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setTenorHari(val);
    setTenorError("");
    setResult(null);

    if (val && selectedBarang) {
      const numVal = parseInt(val, 10);
      if (numVal > selectedBarang.tenorMaksimumHari) {
        setTenorError(
          `Tenor melebihi batas maksimum ${selectedBarang.tenorMaksimumHari} hari untuk ${selectedBarang.nama}`
        );
      }
    }
  };

  // ── Calculate ──
  const handleCalculate = () => {
    // Validate
    if (!selectedBarang) return;

    if (jumlahPinjaman <= 0) {
      setPinjamanError("Masukkan jumlah pinjaman yang valid");
      return;
    }

    const tenor = parseInt(tenorHari, 10);
    if (!tenor || tenor <= 0) {
      setTenorError("Masukkan tenor yang valid (dalam hari)");
      return;
    }
    if (tenor > selectedBarang.tenorMaksimumHari) {
      setTenorError(
        `Tenor melebihi batas maksimum ${selectedBarang.tenorMaksimumHari} hari untuk ${selectedBarang.nama}`
      );
      return;
    }

    const jumlahPeriode = Math.ceil(tenor / selectedBarang.periodeHari);
    const totalBunga =
      jumlahPinjaman * (selectedBarang.bungaPersen / 100) * jumlahPeriode;
    const totalTebusan = jumlahPinjaman + totalBunga;

    setResult({ jumlahPeriode, totalBunga, totalTebusan });
  };

  // ── WhatsApp CTA ──
  const handleWhatsApp = () => {
    if (!selectedBarang || !result) return;
    const tenor = parseInt(tenorHari, 10);
    const message = encodeURIComponent(
      `Halo PT MBG, saya telah melakukan simulasi bunga di website:\n\n` +
        `📦 Jenis Barang: ${selectedBarang.nama}\n` +
        `💰 Jumlah Pinjaman: ${formatRupiah(jumlahPinjaman)}\n` +
        `📅 Tenor: ${tenor} hari (${result.jumlahPeriode} periode)\n` +
        `📊 Estimasi Bunga: ${formatRupiah(result.totalBunga)}\n` +
        `✅ Estimasi Total Tebusan: ${formatRupiah(result.totalTebusan)}\n\n` +
        `Mohon konfirmasi lebih lanjut. Terima kasih.`
    );
    window.open(
      `https://wa.me/6281213211413?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ── Check if form is complete enough to calculate ──
  const canCalculate =
    selectedBarang && jumlahPinjaman > 0 && tenorHari && !tenorError;

  if (!isOpen) return null;

  return (
    <>
      {/* ─── CSS Animations ─── */}
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-overlay-animate {
          animation: modalFadeIn 0.2s ease-out forwards;
        }
        .modal-content-animate {
          animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* ─── OVERLAY ─── */}
      <div
        className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 modal-overlay-animate"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* ─── MODAL CONTAINER ─── */}
        <div
          ref={modalContentRef}
          className="relative w-full sm:max-w-lg max-h-[92vh] sm:max-h-[85vh] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col modal-content-animate"
        >
          {/* ── Header ── */}
          <div className="sticky top-0 z-10 bg-white border-b border-slate-100">
            {/* Mobile drag handle */}
            <div className="flex justify-center pt-3 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-slate-200" />
            </div>

            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#003B73] to-[#1B3A5C] text-white shadow-md">
                  <Calculator className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                    Simulasi Bunga
                  </h2>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
                    Hitung estimasi bunga & total tebusan Anda
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-all active:scale-95"
                aria-label="Tutup simulasi"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ── Scrollable Body ── */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-3 border-slate-200 border-t-[#003B73] rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {/* ── STEP 1: Jenis Barang (Searchable Autocomplete) ── */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-md bg-[#003B73] text-white text-[10px] font-black">
                      1
                    </span>
                    Jenis Barang Agunan
                  </label>

                  <div ref={dropdownRef} className="relative">
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Ketik nama barang, contoh: Handphone..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setIsDropdownOpen(true);
                          if (selectedBarang && e.target.value !== selectedBarang.nama) {
                            setSelectedBarang(null);
                            setResult(null);
                          }
                        }}
                        onFocus={() => setIsDropdownOpen(true)}
                        className={`w-full h-12 pl-10 pr-10 rounded-xl border-2 text-sm font-medium transition-all duration-200 outline-none ${
                          selectedBarang
                            ? "border-emerald-300 bg-emerald-50/50 text-slate-800"
                            : "border-slate-200 bg-slate-50/50 text-slate-800 focus:border-[#4A8DB7] focus:bg-white focus:shadow-sm"
                        }`}
                        autoComplete="off"
                      />
                      {selectedBarang ? (
                        <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                      ) : (
                        <ChevronDown
                          className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 transition-transform duration-200 ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>

                    {/* Dropdown list */}
                    {isDropdownOpen && !selectedBarang && (
                      <div className="absolute z-20 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                        {filteredBarang.length === 0 ? (
                          <div className="px-4 py-3 text-xs text-slate-400 text-center">
                            Barang tidak ditemukan
                          </div>
                        ) : (
                          filteredBarang.map((barang) => (
                            <button
                              key={barang.nama}
                              onClick={() => handleSelectBarang(barang)}
                              className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-b-0 group"
                            >
                              <span className="text-sm font-semibold text-slate-700 group-hover:text-[#003B73]">
                                {barang.nama}
                              </span>
                              <span className="block text-[10px] text-slate-400 mt-0.5">
                                Bunga {barang.bungaPersen}% per{" "}
                                {barang.periodeHari} hari · Maks tenor{" "}
                                {barang.tenorMaksimumHari} hari
                              </span>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>

                  {/* Selected barang info chip */}
                  {selectedBarang && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-50 border border-sky-100">
                      <Info className="w-3.5 h-3.5 text-[#4A8DB7] shrink-0" />
                      <span className="text-[11px] font-semibold text-[#1B3A5C]">
                        Bunga {selectedBarang.bungaPersen}% per{" "}
                        {selectedBarang.periodeHari} hari · Maks tenor{" "}
                        {selectedBarang.tenorMaksimumHari} hari
                      </span>
                    </div>
                  )}
                </div>

                {/* ── STEP 2: Jumlah Pinjaman ── */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-md bg-[#003B73] text-white text-[10px] font-black">
                      2
                    </span>
                    Jumlah Pinjaman
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                      Rp
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="0"
                      value={pinjamanDisplay}
                      onChange={handlePinjamanChange}
                      className={`w-full h-12 pl-12 pr-4 rounded-xl border-2 text-sm font-semibold transition-all duration-200 outline-none ${
                        pinjamanError
                          ? "border-red-300 bg-red-50/50 text-red-700"
                          : "border-slate-200 bg-slate-50/50 text-slate-800 focus:border-[#4A8DB7] focus:bg-white focus:shadow-sm"
                      }`}
                    />
                  </div>
                  {pinjamanError && (
                    <p className="flex items-center gap-1.5 text-[11px] text-red-500 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {pinjamanError}
                    </p>
                  )}
                </div>

                {/* ── STEP 3: Tenor (hari) ── */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-md bg-[#003B73] text-white text-[10px] font-black">
                      3
                    </span>
                    Tenor Pinjaman (Hari)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder={
                        selectedBarang
                          ? `1 — ${selectedBarang.tenorMaksimumHari}`
                          : "Pilih barang terlebih dahulu"
                      }
                      value={tenorHari}
                      onChange={handleTenorChange}
                      disabled={!selectedBarang}
                      className={`w-full h-12 pl-4 pr-14 rounded-xl border-2 text-sm font-semibold transition-all duration-200 outline-none ${
                        tenorError
                          ? "border-red-300 bg-red-50/50 text-red-700"
                          : !selectedBarang
                          ? "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed"
                          : "border-slate-200 bg-slate-50/50 text-slate-800 focus:border-[#4A8DB7] focus:bg-white focus:shadow-sm"
                      }`}
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-300">
                      hari
                    </span>
                  </div>
                  {tenorError && (
                    <p className="flex items-center gap-1.5 text-[11px] text-red-500 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {tenorError}
                    </p>
                  )}
                  {selectedBarang && !tenorError && (
                    <p className="text-[11px] text-slate-400 font-medium">
                      Maksimum {selectedBarang.tenorMaksimumHari} hari untuk{" "}
                      {selectedBarang.nama}
                    </p>
                  )}
                </div>

                {/* ── CALCULATE BUTTON ── */}
                <button
                  onClick={handleCalculate}
                  disabled={!canCalculate}
                  className={`w-full h-12 rounded-xl font-bold text-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 ${
                    canCalculate
                      ? "bg-gradient-to-r from-[#003B73] to-[#1B3A5C] text-white shadow-lg shadow-[#003B73]/20 hover:shadow-xl hover:shadow-[#003B73]/30"
                      : "bg-slate-100 text-slate-300 cursor-not-allowed"
                  }`}
                >
                  <Calculator className="w-4 h-4" />
                  Hitung Simulasi
                </button>

                {/* ── RESULT CARD ── */}
                {result && (
                  <div className="space-y-4 pt-2">
                    <div className="bg-gradient-to-br from-slate-50 to-sky-50/50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                      {/* Header */}
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Hasil Simulasi
                        </h3>
                      </div>

                      {/* Detail Rows */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            Jenis Barang
                          </span>
                          <span className="text-xs font-bold text-slate-700">
                            {selectedBarang?.nama}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            Jumlah Pinjaman
                          </span>
                          <span className="text-xs font-bold text-slate-700">
                            {formatRupiah(jumlahPinjaman)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            Tenor
                          </span>
                          <span className="text-xs font-bold text-slate-700">
                            {tenorHari} hari
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            Jumlah Periode Bunga
                          </span>
                          <span className="text-xs font-bold text-slate-700">
                            {result.jumlahPeriode} periode
                          </span>
                        </div>

                        <div className="h-px bg-slate-200/80" />

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            Total Bunga
                          </span>
                          <span className="text-sm font-bold text-amber-600">
                            {formatRupiah(result.totalBunga)}
                          </span>
                        </div>
                      </div>

                      {/* Total Tebusan (Prominent) */}
                      <div className="bg-white border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                          Total Tebusan
                        </span>
                        <span className="text-lg sm:text-xl font-extrabold text-emerald-600 tracking-tight">
                          {formatRupiah(result.totalTebusan)}
                        </span>
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-amber-50 border border-amber-100">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-[10px] sm:text-[11px] leading-relaxed text-amber-700">
                        Hasil ini adalah estimasi. Nilai final ditentukan oleh
                        penaksir di kantor cabang saat barang diperiksa langsung.
                      </p>
                    </div>

                    {/* WhatsApp CTA */}
                    <button
                      onClick={handleWhatsApp}
                      className="w-full h-12 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4.5 h-4.5" />
                      Konfirmasi via WhatsApp
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
