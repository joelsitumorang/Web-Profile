"use client";

import React, { useState } from "react";
import { MapPin, Clock, ExternalLink, MessageSquare, Lock, ShieldCheck } from "lucide-react";

const branches = [
  {
    branch_name: "PT MBG Cabang Pasuruan",
    address: "Jl. Hasanudin No. 5, Karanganyar, Kec. Panggungrejo, Kota Pasuruan, Jawa Timur 67131",
    city: "Pasuruan",
    whatsapp_number: "6281213211413",
    map_link: "https://www.google.com/maps/dir//Gadai+MBG+Sangar,+Jl.+Hasanudin+No.5,+Karanganyar,+Kec.+Panggungrejo,+Kota+Pasuruan,+Jawa+Timur+67131/@-7.6480512,112.902144,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x2dd7c55b488669a7:0xe2ba82d2c0074ac7!2m2!1d112.8983213!2d-7.6437896?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
    operating_hours: "Senin - Sabtu (07:00 - 20:00 WIB), Minggu (10:00 - 17:00 WIB)",
    is_active: true,
  },
  {
    branch_name: "PT MBG Cabang Kertajaya Surabaya",
    address: "Jl. Kertajaya No. 142, Kertajaya, Kec. Gubeng, Kota Surabaya, Jawa Timur 60282",
    city: "Surabaya",
    whatsapp_number: "",
    map_link: "",
    operating_hours: "Senin - Sabtu: 08:00 - 16:00 WIB",
    is_active: false,
  },
  {
    branch_name: "PT MBG Cabang Soekarno-Hatta Malang",
    address: "Jl. Soekarno Hatta No. 45, Jatimulyo, Kec. Lowokwaru, Kota Malang, Jawa Timur 65141",
    city: "Malang",
    whatsapp_number: "",
    map_link: "",
    operating_hours: "Senin - Sabtu: 08:00 - 16:00 WIB",
    is_active: false,
  },
  {
    branch_name: "PT MBG Cabang Candi Sidoarjo",
    address: "Jl. Raya Candi No. 12, Gelam, Kec. Candi, Kabupaten Sidoarjo, Jawa Timur 61271",
    city: "Sidoarjo",
    whatsapp_number: "",
    map_link: "",
    operating_hours: "Senin - Sabtu: 08:00 - 16:00 WIB",
    is_active: false,
  },
  {
    branch_name: "PT MBG Cabang Kaliwates Jember",
    address: "Jl. Gajah Mada No. 89, Kaliwates Kidul, Kaliwates, Kabupaten Jember, Jawa Timur 68131",
    city: "Jember",
    whatsapp_number: "",
    map_link: "",
    operating_hours: "Senin - Sabtu: 08:00 - 16:00 WIB",
    is_active: false,
  },
];

export default function BranchLocations() {
  const [selectedCity, setSelectedCity] = useState<string>("Pasuruan");

  // We restrict filtering since only Pasuruan is active in this Pilot Project phase.
  const activeBranch = branches.find((b) => b.is_active);
  const inactiveBranches = branches.filter((b) => !b.is_active);

  return (
    <section className="bg-mbg-ice py-24 sm:py-28" id="lokasi">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-[11px] font-bold text-mbg-steel tracking-[0.15em] uppercase">
            Jaringan Kantor Cabang
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Ekspansi Layanan di Jawa Timur
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Sebagai langkah awal standardisasi OJK, kami meluncurkan Proyek Percontohan (Pilot Project) digital di Cabang Pasuruan sebelum membuka akses di wilayah lainnya.
          </p>

          {/* City Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {/* Active Pasuruan Tab */}
            <button
              onClick={() => setSelectedCity("Pasuruan")}
              className="px-4 py-2 rounded-xl text-[12px] font-bold transition-all border bg-mbg-navy text-white border-mbg-navy shadow-md"
            >
              Pasuruan
            </button>

            {/* Inactive Coming Soon Tabs */}
            {["Surabaya", "Malang", "Sidoarjo", "Jember"].map((city) => (
              <button
                key={city}
                disabled
                className="px-4 py-2 rounded-xl text-[12px] font-bold transition-all border bg-white/50 text-slate-400 border-slate-200/60 opacity-60 cursor-not-allowed flex items-center gap-1.5"
                title={`${city} segera hadir`}
              >
                <span>{city}</span>
                <span className="text-[9px] font-normal text-slate-400/80 px-1 py-0.5 rounded bg-slate-100">
                  Soon
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Branch Cards Container */}
        <div className="max-w-5xl mx-auto space-y-6">
          {/* 1. MAIN PILOT CARD - PT MBG CABANG PASURUAN */}
          {activeBranch && (
            <div className="group relative bg-white border-2 border-mbg-steel/30 rounded-2xl p-8 flex flex-col justify-between shadow-md hover:shadow-lg transition-all ring-4 ring-mbg-sky/40">
              {/* Status Badge */}
              <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-bold text-[10px] tracking-wider uppercase border border-emerald-200/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Cabang Aktif &amp; Pilot Project
              </div>

              <div className="space-y-6">
                {/* City Tag & Name */}
                <div className="space-y-3">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-mbg-sky text-[10px] font-bold text-mbg-navy uppercase tracking-[0.1em]">
                    {activeBranch.city}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-mbg-navy transition-colors">
                    {activeBranch.branch_name}
                  </h3>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-mbg-ice/50 rounded-xl p-5 border border-slate-100">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-mbg-steel shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Alamat Kantor</h4>
                      <p className="text-[12px] leading-relaxed text-slate-600 font-medium">{activeBranch.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-mbg-steel shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Jam Operasional</h4>
                      <p className="text-[12px] leading-relaxed text-slate-600 font-medium">{activeBranch.operating_hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${activeBranch.whatsapp_number}?text=${encodeURIComponent(
                    `Halo PT MBG Cabang Pasuruan. Saya ingin menanyakan layanan gadai untuk agunan saya. Mohon infonya.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-12 rounded-xl text-[13px] font-bold bg-mbg-navy text-white transition-all hover:bg-mbg-deep shadow-sm hover:shadow-md active:scale-[0.98]"
                >
                  <MessageSquare className="w-4.5 h-4.5" />
                  Hubungi WA Cabang
                </a>
                <a
                  href={activeBranch.map_link}
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
          )}

          {/* 2. DISABLED OTHER CARDS (COMING SOON GRID) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {inactiveBranches.map((branch, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/60 rounded-2xl p-7 flex flex-col justify-between opacity-60 grayscale-[20%] relative overflow-hidden"
              >
                {/* Visual Lock Overlay Indicator */}
                <div className="absolute top-4 right-4 text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  Belum Aktif
                </div>

                <div className="space-y-4">
                  {/* City Tag & Name */}
                  <div className="space-y-2">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-[9px] font-bold text-slate-500 uppercase tracking-[0.1em]">
                      {branch.city}
                    </span>
                    <h3 className="text-md font-bold text-slate-700">
                      {branch.branch_name}
                    </h3>
                  </div>

                  {/* Address & Hours Faded */}
                  <div className="space-y-2.5 text-[11px] text-slate-400">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{branch.address}</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{branch.operating_hours}</span>
                    </div>
                  </div>
                </div>

                {/* Coming Soon Horizontal Badge */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center">
                  <div className="w-full py-2.5 px-4 rounded-xl text-[10px] font-bold tracking-wider uppercase text-center bg-slate-50 text-slate-400 border border-slate-200/40 flex items-center justify-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span>🔒 Akses Digital Segera Hadir</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

