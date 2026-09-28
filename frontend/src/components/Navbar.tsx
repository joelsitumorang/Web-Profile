"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Menu, X } from "lucide-react";
import { trackEvent } from "@/utils/trackEvent";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div 
        className="sticky top-0 z-50 px-4 transition-all duration-300 w-full"
        style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top))' }}
      >
        <header
          className={`mx-auto w-full max-w-[960px] rounded-full transition-all duration-300 border ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-white/60 shadow-lg supports-[not_(backdrop-filter:blur(1px))]:bg-white"
              : "bg-white/55 backdrop-blur-xl backdrop-saturate-150 border-white/60 shadow-md supports-[not_(backdrop-filter:blur(1px))]:bg-white/95"
          }`}
        >
          <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
            {/* Brand Logo */}
            <a href="/" className="flex items-center gap-2 group" id="nav-brand-logo">
              <img
                src="/images/logo-mbg.png"
                alt="PT Makmur Bersama Gadai"
                className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-8 text-[13px] font-bold text-slate-700">
              <a href="/#kategori" className="hover:text-mbg-navy transition-colors">
                Kategori Agunan
              </a>
              <a href="/#persyaratan" className="hover:text-mbg-navy transition-colors">
                Persyaratan
              </a>
              <a href="/#lokasi" className="hover:text-mbg-navy transition-colors">
                Lokasi
              </a>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-[10px] tracking-wide uppercase border bg-mbg-sky/30 text-mbg-navy border-mbg-steel/20">
                <span className="w-1.5 h-1.5 rounded-full bg-mbg-steel" />
                Diawasi OJK
              </div>
              <a
                href="https://wa.me/6281213211413?text=Halo%20PT%20MBG%20Pasuruan,%20saya%20ingin%20tanya%20tentang%20gadai."
                onClick={() => trackEvent('wa_click', { source: 'navbar' })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 sm:h-10 items-center justify-center rounded-full bg-[#003B73] px-4 sm:px-6 text-[12px] font-bold text-white shadow-sm transition-all hover:bg-[#002244] hover:shadow-md active:scale-95"
                id="nav-cta-button"
              >
                Gadai Sekarang
              </a>
              
              {/* Mobile Hamburger Toggle */}
              <button 
                className="md:hidden p-1.5 text-slate-700 hover:text-mbg-navy hover:bg-slate-100 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Off-Canvas Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm md:hidden transition-opacity" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Drawer */}
          <div 
            className="fixed right-0 top-0 bottom-0 w-[260px] bg-white p-6 shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8 mt-1">
              <img src="/images/logo-mbg.png" alt="MBG Logo" className="h-7 w-auto" />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-[15px] font-bold text-slate-800">
              <a href="/#kategori" className="hover:text-mbg-navy flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                Kategori Agunan
              </a>
              <a href="/#persyaratan" className="hover:text-mbg-navy flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                Persyaratan
              </a>
              <a href="/#lokasi" className="hover:text-mbg-navy flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                Lokasi
              </a>
              
              <div className="h-px bg-slate-100 my-2" />
              
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold uppercase tracking-wider bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Resmi Berizin OJK
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
