"use client";

import React from "react";
import { FileText, Scale, Banknote, ArrowRight } from "lucide-react";

export default function CaraKerja() {
  const steps = [
    {
      step: "01",
      title: "Bawa KTP & Barang",
      description: "Kunjungi kantor cabang PT MBG dengan membawa KTP asli yang masih berlaku dan barang yang ingin Anda gadaikan.",
      icon: FileText,
      color: "blue",
    },
    {
      step: "02",
      title: "Penilaian & Kesepakatan",
      description: "Staf penilai profesional kami akan memeriksa dan menguji barang jaminan di hadapan Anda untuk menentukan nilai taksiran terbaik.",
      icon: Scale,
      color: "gold",
    },
    {
      step: "03",
      title: "Dana Cair Instan",
      description: "Tandatangani surat kontrak resmi berstandar OJK. Uang pinjaman langsung dicairkan tunai atau transfer bank dalam waktu 15 menit.",
      icon: Banknote,
      color: "green",
    },
  ];

  return (
    <section className="bg-white py-20 border-b border-slate-100" id="cara-kerja">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-[11px] font-bold text-mbg-steel tracking-[0.15em] uppercase px-3 py-1 bg-mbg-ice rounded-full inline-block">
            Prosedur Mudah & Transparan
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Hanya 3 Langkah Mudah
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative group p-6 rounded-2xl border border-slate-100 hover:border-mbg-steel/20 hover:shadow-md transition-all bg-white flex flex-col justify-between">
                
                {/* Step Index & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-black text-[#0B416C]/20 group-hover:text-[#0B416C]/40 transition-colors">
                    {item.step}
                  </span>
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-mbg-ice border border-mbg-steel/10 text-mbg-navy group-hover:bg-mbg-sky transition-colors">
                    <Icon className="w-5.5 h-5.5" />
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 text-lg leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Connecting arrow/indicator for desktop */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-4 z-10 text-slate-200">
                    <ArrowRight className="w-6 h-6 animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
