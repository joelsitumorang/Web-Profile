"use client";

import React from "react";
import { ShieldCheck, ArrowRight, CheckCircle, MessageSquare, Clock, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <>
      {/* ─── FOLD 1: HERO CONTAINER (Solid Deep Blue) ─── */}
      <section className="relative overflow-hidden bg-[#003B73] pt-32 pb-20 sm:pt-40 sm:pb-24 text-white">

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8 sm:space-y-10">

            {/* OJK Trust Badge (Glassmorphic) */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm" id="ojk-badge-container">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/25 text-white">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
              <span className="text-[11px] sm:text-[12px] font-semibold text-white tracking-wide">
                Pergadaian Konvensional Resmi Berizin &amp; Diawasi oleh OJK
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.15] sm:leading-[1.1]" id="hero-headline">
              Solusi Likuiditas Aman.{" "}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-white via-sky-100 to-amber-200 bg-clip-text text-transparent">
                Transparan &amp; Terpercaya.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-slate-100/90 max-w-xl mx-auto leading-relaxed" id="hero-subtext">
              Dapatkan dana tunai cepat untuk kebutuhan modal usaha atau mendesak dengan jaminan emas, gadget, elektronik, atau alat pertukangan Anda. Proses taksiran jujur dan bebas sewa modal siluman.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href="https://wa.me/6281213211413?text=Halo%20PT%20MBG%20Pasuruan,%20saya%20ingin%20tanya%20tentang%20gadai..."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-white text-[#003B73] px-8 text-sm font-bold shadow-sm transition-all hover:bg-slate-100 hover:shadow-lg active:scale-[0.98]"
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

            {/* Cabang Pasuruan info strip */}
            <div className="pt-2">
              <a
                href="#lokasi"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs sm:text-sm font-semibold text-white transition-all hover:bg-white/20 hover:border-white/30"
              >
                <MapPin className="w-4 h-4 text-sky-200" />
                <span>Cabang Pasuruan Aktif — Buka Senin–Minggu</span>
                <span className="text-sky-200 hover:underline inline-flex items-center gap-0.5 ml-1">
                  Lihat Lokasi &amp; Jam &rarr;
                </span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FOLD 2: PILOT PROJECT & KEUNGGULAN (Clean White) ─── */}
      <section className="bg-white text-slate-800 py-16 sm:py-24 border-b border-slate-100" id="keunggulan">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
            
            {/* Left Column (lg:col-span-5): Pilot Project Pasuruan Office Card */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200/50 font-bold text-[9px] tracking-wider uppercase">
                  🟢 Pilot Project Aktif
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Cabang Jawa Timur
                </span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0B416C] leading-tight">
                  PT MBG Kantor Cabang Pasuruan
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Sebagai kantor percontohan layanan digital konvensional PT Makmur Bersama Gadai yang melayani nasabah secara resmi dan berizin OJK.
                </p>
              </div>
              
              <div className="h-px bg-slate-200/60" />
              
              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-[#2B6B9E] shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-semibold">
                    Jl. Hasanudin No. 5, Karanganyar, Kec. Panggungrejo, Kota Pasuruan, Jawa Timur 67131
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-5 h-5 text-[#2B6B9E] shrink-0 mt-0.5" />
                  <div className="flex flex-col font-semibold">
                    <span>Senin - Sabtu: 07:00 - 20:00 WIB</span>
                    <span>Minggu: 10:00 - 17:00 WIB</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <a
                  href="https://wa.me/6281213211413?text=Halo%20PT%20MBG%20Cabang%20Pasuruan.%20Saya%20tertarik%20dengan%20layanan%20gadai%20agunan%20Anda.%20Mohon%20infonya."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 flex-grow h-10 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-sm hover:bg-emerald-700 transition-all active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4" />
                  Hubungi WA Cabang
                </a>
                <a
                  href="https://www.google.com/maps/dir//Gadai+MBG+Sangar,+Jl.+Hasanudin+No.5,+Karanganyar,+Kec.+Panggungrejo,+Kota+Pasuruan,+Jawa+Timur+67131/@-7.6480512,112.902144,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x2dd7c55b488669a7:0xe2ba82d2c0074ac7!2m2!1d112.8983213!2d-7.6437896?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 flex-grow h-10 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs shadow-sm hover:bg-slate-50 transition-all"
                >
                  <MapPin className="w-4 h-4 text-slate-500" />
                  Petunjuk Arah Maps
                </a>
              </div>
            </div>

            {/* Right Column (lg:col-span-7): Keunggulan 3 Pilar */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#2B6B9E] tracking-wider uppercase">
                  Keunggulan Layanan kami
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Mengapa Memilih PT Makmur Bersama Gadai?
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
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
                    title: "Legalitas Resmi OJK",
                    text: "Seluruh akad perjanjian didasarkan pada payung hukum pergadaian resmi Indonesia.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-start gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/60 shadow-sm">
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-[#003B73]">
                      <CheckCircle className="w-5 h-5" />
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">{item.title}</h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
