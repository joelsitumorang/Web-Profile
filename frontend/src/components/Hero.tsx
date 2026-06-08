"use client";

import React from "react";
import { ShieldCheck, ArrowRight, CheckCircle, MessageSquare, Clock, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B416C] via-[#2B6B9E] to-[#fbfbfd] pt-32 pb-24 sm:pt-40 sm:pb-28 text-white">
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-white/5 opacity-40 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto text-center space-y-10">

          {/* OJK Trust Badge (Glassmorphic) */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm" id="ojk-badge-container">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/25 text-white">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
            <span className="text-[12px] font-semibold text-white tracking-wide">
              Pergadaian Konvensional Resmi Berizin &amp; Diawasi oleh OJK
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.1]" id="hero-headline">
            Solusi Likuiditas Aman.{" "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-white via-sky-100 to-amber-200 bg-clip-text text-transparent">
              Transparan &amp; Terpercaya.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-100/90 max-w-xl mx-auto leading-relaxed" id="hero-subtext">
            Dapatkan dana tunai cepat untuk kebutuhan modal usaha atau mendesak dengan jaminan emas, gadget, elektronik, atau alat pertukangan Anda. Proses taksiran jujur dan bebas bunga siluman.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/6281213211413?text=Halo%20PT%20MBG%20Pasuruan,%20saya%20ingin%20tanya%20tentang%20gadai..."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-white text-mbg-navy px-8 text-sm font-bold shadow-sm transition-all hover:bg-slate-100 hover:shadow-lg active:scale-[0.98]"
              id="hero-cta-primary"
            >
              Gadai Sekarang
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#kategori"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 rounded-xl border border-white/30 bg-white/10 px-8 text-sm font-bold text-white transition-all hover:bg-white/20 hover:shadow-sm"
              id="hero-cta-secondary"
            >
              Lihat Jenis Agunan
            </a>
          </div>

          {/* ─── KARTU KONTAK CABANG PASURUAN (Glassmorphism Style) ─── */}
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 text-left shadow-xl max-w-xl mx-auto space-y-4 transition-all hover:border-white/30 group/card">
            {/* Header / Title */}
            <div>
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-500 text-white font-bold text-[9px] tracking-wider uppercase mb-2">
                🟢 Pilot Project Aktif
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                PT MBG Kantor Cabang Pasuruan
              </h3>
              <p className="text-[11px] text-sky-100/80 mt-0.5 font-medium">
                Jaringan Resmi Operasional Wilayah Jawa Timur
              </p>
            </div>

            {/* Info Items */}
            <div className="space-y-3 pt-2 text-[12px] text-slate-100 border-t border-white/10">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-sky-200 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Jl. Hasanudin No. 5, Karanganyar, Kec. Panggungrejo, Kota Pasuruan, Jawa Timur 67131
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4.5 h-4.5 text-sky-200 shrink-0" />
                <span>Senin - Sabtu (08:00 - 16:00 WIB)</span>
              </div>
            </div>

            {/* WhatsApp CTA Action */}
            <div className="pt-2">
              <a
                href="https://wa.me/6281213211413?text=Halo%20PT%20MBG%20Cabang%20Pasuruan.%20Saya%20tertarik%20dengan%20layanan%20gadai%20agunan%20Anda.%20Mohon%20infonya."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-10 px-5 rounded-xl bg-emerald-500 text-white font-bold text-[12px] shadow-md transition-all hover:bg-emerald-600 hover:shadow-lg active:scale-[0.97]"
              >
                <MessageSquare className="w-4 h-4" />
                Hubungi WA Cabang (0812-1321-1413)
              </a>
            </div>
          </div>

          {/* Trust Indicators - Positioned at transition boundary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 border-t border-slate-200 max-w-2xl mx-auto text-left text-slate-800">
            {[
              {
                title: "Taksiran Nilai Maksimal",
                text: "Sistem taksiran berpedoman pada harga pasar ter-update untuk menjamin keadilan nilai agunan.",
              },
              {
                title: "Penyimpanan Ultra-Aman",
                text: "Aset disimpan di brankas baja tahan api dengan perlindungan asuransi penuh dan CCTV 24 jam.",
              },
              {
                title: "Legalitas & Regulasi OJK",
                text: "Seluruh akad perjanjian didasarkan pada payung hukum pergadaian resmi Indonesia.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-mbg-steel shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
