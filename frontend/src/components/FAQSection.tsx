"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqData } from "@/data/agunan";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="bg-white py-16 sm:py-24 border-t border-slate-100" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold text-[#2B6B9E] tracking-wider uppercase">Pertanyaan Umum</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B416C] mt-2">
            Yang Sering Ditanyakan
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-xl transition-all ${
                  isOpen ? "border-[#2B6B9E] bg-blue-50/30" : "border-slate-200 bg-white"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex items-center justify-between w-full p-5 text-left focus:outline-none"
                >
                  <span className="font-semibold text-slate-800 text-sm sm:text-base pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "transform rotate-180 text-[#2B6B9E]" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* TODO(yoga): tambahkan pertanyaan terkait barang tidak ditebus, perpanjangan, KTP milik keluarga, atau barang ditolak */}
      </div>
    </section>
  );
}
