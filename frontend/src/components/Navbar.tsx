"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Run once on mount to capture current scroll position
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        {/* Brand Logo - Adaptive Image */}
        <a href="#" className="flex items-center gap-2.5 group" id="nav-brand-logo">
          <img
            src={scrolled ? "/images/logo-mbg.png" : "/images/logo-mbg-white.png"}
            alt="PT Makmur Bersama Gadai"
            className="h-10 sm:h-12 w-auto object-contain transition-all duration-300"
          />
        </a>

        {/* Nav Links */}
        <nav
          className={`hidden md:flex items-center gap-8 text-[13px] font-semibold transition-colors duration-300 ${
            scrolled ? "text-slate-600" : "text-white/80"
          }`}
        >
          <a href="#kategori" className={`transition-colors ${scrolled ? "hover:text-mbg-navy" : "hover:text-white"}`} id="nav-link-categories">
            Kategori Agunan
          </a>
          <a href="#persyaratan" className={`transition-colors ${scrolled ? "hover:text-mbg-navy" : "hover:text-white"}`} id="nav-link-requirements">
            Persyaratan
          </a>
          <a href="#lokasi" className={`transition-colors ${scrolled ? "hover:text-mbg-navy" : "hover:text-white"}`} id="nav-link-locations">
            Lokasi Cabang
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-[10px] tracking-wide uppercase border transition-all duration-300 ${
              scrolled
                ? "bg-mbg-sky text-mbg-steel border-mbg-steel/20"
                : "bg-white/10 text-white/90 border-white/20"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${scrolled ? "bg-mbg-steel" : "bg-white"}`} />
            Diawasi OJK
          </div>
          <a
            href="https://wa.me/6281213211413?text=Halo%20PT%20MBG%20Pasuruan,%20saya%20ingin%20tanya%20tentang%20gadai..."
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex h-9 items-center justify-center rounded-lg px-4 text-[12px] font-bold shadow-sm transition-all duration-300 active:scale-[0.97] ${
              scrolled
                ? "bg-mbg-navy text-white hover:bg-mbg-deep hover:shadow-md"
                : "bg-white text-mbg-navy hover:bg-slate-100 hover:shadow-md"
            }`}
            id="nav-cta-button"
          >
            Gadai Sekarang
          </a>
        </div>
      </div>
    </header>
  );
}
