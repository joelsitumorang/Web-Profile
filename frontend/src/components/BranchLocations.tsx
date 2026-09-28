"use client";

import React from "react";
import { MapPin, Clock, ExternalLink, MessageSquare } from "lucide-react";
import { trackEvent } from "@/utils/trackEvent";

/* Data cabang Pasuruan — satu-satunya cabang di situs ini */
const cabang = {
  name: "PT MBG Cabang Pasuruan",
  address: "Jl. Hasanudin No. 5, Karanganyar, Kec. Panggungrejo, Kota Pasuruan, Jawa Timur 67131",
  whatsapp: "6281213211413",
  mapLink: "https://www.google.com/maps/dir//Gadai+MBG+Sangar,+Jl.+Hasanudin+No.5,+Karanganyar,+Kec.+Panggungrejo,+Kota+Pasuruan,+Jawa+Timur+67131/@-7.6480512,112.902144,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x2dd7c55b488669a7:0xe2ba82d2c0074ac7!2m2!1d112.8983213!2d-7.6437896?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
  hours: "Senin – Sabtu (07:00 – 20:00 WIB), Minggu (10:00 – 17:00 WIB)",
};

export default function BranchLocations() {
  return (
    <section className="bg-[#F8FAFC] py-16 md:py-24 border-b border-slate-100" id="lokasi">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-[11px] font-bold text-mbg-steel tracking-[0.15em] uppercase">
            Lokasi
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Kantor Cabang Pasuruan Kota
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Datang langsung ke kantor kami di Pasuruan Kota.
          </p>
        </div>

        {/* Single Location Card */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-8 shadow-sm">
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {cabang.name}
            </h3>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50/80 rounded-xl p-5 border border-slate-100">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-mbg-steel shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Alamat Kantor</h4>
                  <p className="text-[12px] leading-relaxed text-slate-600 font-medium">{cabang.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-mbg-steel shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Jam Operasional</h4>
                  <p className="text-[12px] leading-relaxed text-slate-600 font-medium">{cabang.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`https://wa.me/${cabang.whatsapp}?text=${encodeURIComponent(
                "Halo PT MBG Cabang Pasuruan, saya ingin tanya tentang gadai. Mohon infonya."
              )}`}
              onClick={() => trackEvent('wa_click', { source: 'lokasi' })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 rounded-xl text-[13px] font-bold bg-mbg-navy text-white transition-all hover:bg-mbg-deep shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              <MessageSquare className="w-4.5 h-4.5" />
              Hubungi via WhatsApp
            </a>
            <a
              href={cabang.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 rounded-xl text-[13px] font-bold border border-slate-200 bg-white text-slate-700 transition-all hover:bg-mbg-ice hover:border-slate-300"
            >
              <MapPin className="w-4 h-4 text-slate-500" />
              Petunjuk Arah
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* TODO(yoga): tambahkan foto kantor dan area pelayanan jika tersedia */}

      </div>
    </section>
  );
}
