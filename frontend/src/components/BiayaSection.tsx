"use client";

import React from "react";
import { biaya } from "@/data/agunan";
import { Info } from "lucide-react";

export default function BiayaSection() {
  const pinjaman = biaya.contohPinjaman;
  const pinjamanFormatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(pinjaman);

  return (
    <section className="bg-slate-50 py-16 sm:py-24 border-b border-slate-100" id="biaya">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold text-[#2B6B9E] tracking-wider uppercase">Transparansi</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B416C] mt-2">
            Biaya &amp; Contoh Perhitungan
          </h2>
          <p className="mt-4 text-sm text-slate-500 max-w-xl mx-auto">
            Gadai tanpa potongan biaya admin. Sewa modal dihitung secara proporsional sesuai jangka waktu pinjaman.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#003B73] text-white">
                <tr>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Jangka Waktu</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Sewa Modal</th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">Biaya Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {biaya.sewaModal.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium">{item.rentang}</td>
                    <td className="px-6 py-4">{item.persen}%</td>
                    {idx === 0 && (
                      <td className="px-6 py-4 text-emerald-600 font-bold" rowSpan={biaya.sewaModal.length}>
                        Rp0 (Gratis)
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 bg-blue-50/50 border-t border-slate-100">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#2B6B9E] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-[#0B416C] mb-2">Contoh Ilustrasi</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Jika Anda meminjam dana sebesar <strong>{pinjamanFormatted}</strong>, maka sewa modal yang dikenakan adalah:
                  <br/>
                  • <strong>Rp50.000</strong> jika dilunasi dalam waktu 1–15 hari ({biaya.sewaModal[0].persen}%).
                  <br/>
                  • <strong>Rp100.000</strong> jika dilunasi dalam waktu 16–30 hari ({biaya.sewaModal[1].persen}%).
                  <br/>
                  <br/>
                  <span className="italic">
                    {/* TODO(yoga): konfirmasi asumsi persentase dihitung dari jumlah pinjaman dan kesamaan tarif antar kategori */}
                    {/* TODO(yoga): aturan sewa modal >30 hari belum diberikan */}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400">
          Ketentuan lengkap tercantum dalam surat kontrak yang ditandatangani di kantor.
        </p>

      </div>
    </section>
  );
}
