"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Coins,
  Smartphone,
  Home,
  Car,
  Hammer,
  ShieldCheck,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   TYPE DEFINITIONS
   ───────────────────────────────────────────────────────── */

interface DetailItem {
  name: string;
  image: string;
}

interface Category {
  name: string;
  slug: string;
  image: string;
  icon: React.ComponentType<any>;
  tenorLabel: string;
  details: DetailItem[];
}

/* ─────────────────────────────────────────────────────────
   CATEGORY DATA (5 Categories) — Now with photo per item
   ───────────────────────────────────────────────────────── */

const categories: Category[] = [
  {
    name: "Emas",
    slug: "emas",
    image: "/images/agunan-emas.jpg",
    icon: Coins,
    tenorLabel: "Tenor s.d. 4 Bulan",
    details: [
      { name: "Cincin", image: "/images/barang/cincin.png" },
      { name: "Gelang", image: "/images/barang/gelang.png" },
      { name: "Liontin", image: "/images/barang/liontin.png" },
      { name: "Anting", image: "/images/barang/anting.png" },
      { name: "Kalung", image: "/images/barang/kalung.png" },
    ],
  },
  {
    name: "Elektronik",
    slug: "elektronik",
    image: "/images/agunan-gadget.jpg",
    icon: Smartphone,
    tenorLabel: "Tenor s.d. 1 Bulan",
    details: [
      { name: "HP", image: "/images/barang/hp.png" },
      { name: "Laptop", image: "/images/barang/laptop.png" },
      { name: "Kulkas", image: "/images/barang/kulkas.png" },
      { name: "Salon Aktif", image: "/images/barang/salon-aktif.png" },
      { name: "Kamera", image: "/images/barang/kamera.png" },
      { name: "TV", image: "/images/barang/tv.png" },
    ],
  },
  {
    name: "Alat Rumah Tangga",
    slug: "alat-rumah-tangga",
    image: "/images/agunan-perkakas.jpg",
    icon: Home,
    tenorLabel: "Tenor s.d. 4 Bulan",
    details: [
      { name: "Blender", image: "/images/barang/blender.png" },
      { name: "Rice Cooker", image: "/images/barang/rice-cooker.png" },
      { name: "Dispenser", image: "/images/barang/dispenser.jpg" },
      { name: "Kipas Angin", image: "/images/barang/kipas-angin.jpg" },
      { name: "Microwave", image: "/images/barang/microwave.jpg" },
    ],
  },
  {
    name: "Kendaraan",
    slug: "kendaraan",
    image: "/images/agunan-kendaraan.jpg",
    icon: Car,
    tenorLabel: "Tenor s.d. 2 Bulan",
    details: [
      { name: "Sepeda Motor", image: "/images/barang/sepeda-motor.jpg" },
      { name: "Mobil", image: "/images/barang/mobil.jpg" },
    ],
  },
  {
    name: "Alat Tukang",
    slug: "alat-tukang",
    image: "/images/agunan-perkakas.jpg",
    icon: Hammer,
    tenorLabel: "Tenor s.d. 4 Bulan",
    details: [
      { name: "Mesin Bor", image: "/images/barang/mesin-bor.jpg" },
      { name: "Mesin Ketam", image: "/images/barang/mesin-ketam.jpg" },
      { name: "Gerinda", image: "/images/barang/gerinda.jpg" },
      { name: "Mesin Las", image: "/images/barang/mesin-las.jpg" },
      { name: "Genset", image: "/images/barang/genset.jpg" },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   useMediaQuery HOOK
   ───────────────────────────────────────────────────────── */

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/* ─────────────────────────────────────────────────────────
   BENTO GRID (Desktop ≥768px)
   ───────────────────────────────────────────────────────── */

function BentoGrid({ items, categorySlug }: { items: DetailItem[]; categorySlug: string }) {
  return (
    <div key={categorySlug} className="grid grid-cols-3 lg:grid-cols-4 gap-3">
      {items.map((item, index) => (
        <div
          key={`${categorySlug}-${item.name}`}
          className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer bg-slate-100"
          style={{
            animation: `bentoFadeUp 0.4s ease-out ${index * 40}ms both`,
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.12]"
            loading="lazy"
          />
          {/* Hover overlay with name */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
            <span className="px-3.5 pb-3.5 text-sm font-bold text-white tracking-wide drop-shadow-sm">
              {item.name}
            </span>
          </div>
          {/* Always-visible label for mobile/touch */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300 p-2.5 md:opacity-0 md:group-hover:opacity-0">
            <span className="text-[10px] font-bold text-white/90">
              {item.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   CAROUSEL SWIPE (Mobile <768px)
   ───────────────────────────────────────────────────────── */

function CarouselSwipe({ items, categorySlug }: { items: DetailItem[]; categorySlug: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset scroll on category change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
      setActiveIndex(0);
    }
  }, [categorySlug]);

  // Track scroll position for dot indicators
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    // Each card is ~146px (130 + gap)
    const cardWidth = 146;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, items.length - 1));
  }, [items.length]);

  return (
    <div className="space-y-4">
      {/* Scrollable carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-none px-1 pb-2"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {items.map((item, index) => (
          <div
            key={`${categorySlug}-${item.name}`}
            className="shrink-0 w-[130px] rounded-xl overflow-hidden bg-white border border-slate-200/60 shadow-sm"
            style={{
              scrollSnapAlign: "start",
              animation: `bentoFadeUp 0.35s ease-out ${index * 50}ms both`,
            }}
          >
            <div className="relative h-[110px] overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="px-2.5 py-2">
              <span className="text-[11px] font-bold text-slate-700 leading-tight">
                {item.name}
              </span>
            </div>
          </div>
        ))}
        {/* End spacer */}
        <div className="shrink-0 w-4" />
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTo({
                  left: index * 146,
                  behavior: "smooth",
                });
              }
            }}
            className={`rounded-full transition-all duration-200 ${
              index === activeIndex
                ? "w-5 h-1.5 bg-[#003B73]"
                : "w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────── */

export default function AgunanSection() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <section
      className="bg-[#E3F2FD] py-16 md:py-24 border-y border-blue-100/50"
      id="kategori"
    >
      {/* Animations & Scrollbar Hide */}
      <style>{`
        @keyframes bentoFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 space-y-4">
          <span className="text-[11px] font-bold text-[#2B6B9E] tracking-[0.15em] uppercase px-3 py-1.5 bg-slate-100 rounded-full inline-block">
            Pilihan Agunan Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#003B73]">
            Barang apa saja yang bisa digadaikan?
          </h2>
        </div>

        {/* ── Mobile Tabs (Scrollable - lg:hidden) ── */}
        <div className="lg:hidden relative mb-8">
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#E3F2FD] via-[#E3F2FD]/70 to-transparent pointer-events-none z-10" />
          
          <div className="flex overflow-x-auto scrollbar-none space-x-2 py-1 px-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory.slug === cat.slug;

              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold transition-all shrink-0 active:scale-[0.97] ${
                    isSelected
                      ? "bg-[#0B416C] text-white border-[#0B416C] shadow-md"
                      : "bg-white text-slate-600 border-slate-200/60 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
            <div className="w-8 shrink-0" />
          </div>
        </div>

        {/* ── Desktop Category Cards (hidden lg:grid) ── */}
        <div className="hidden lg:grid grid-cols-5 gap-4 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory.slug === cat.slug;

            return (
              <div
                key={cat.slug}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                  isSelected
                    ? "border-blue-600 ring-2 ring-blue-600/30 shadow-lg scale-[1.02] bg-blue-50/5"
                    : "border border-slate-100 bg-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                }`}
              >
                {/* Image */}
                <div className="relative h-24 sm:h-28 w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <span className={`absolute top-2 left-2 flex items-center justify-center w-8 h-8 rounded-lg shadow-md transition-all ${
                    isSelected ? "bg-blue-600 text-white" : "bg-white/95 text-[#0B416C]"
                  }`}>
                    <Icon className="w-4.5 h-4.5" />
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                  <div className="space-y-1">
                    <h3 className={`text-sm sm:text-base font-extrabold transition-colors ${
                      isSelected ? "text-blue-600" : "text-[#0B416C]"
                    }`}>
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {cat.tenorLabel}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Galeri Foto Barang (Replaces old checklist) ── */}
        <div
          key={selectedCategory.slug}
          className="bg-white border border-slate-200/80 rounded-3xl shadow-md overflow-hidden"
        >
          <div className="p-5 sm:p-8 space-y-5">
            {/* Header */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#0B416C] uppercase tracking-wider border-l-4 border-blue-600 pl-3">
                📸 Galeri Barang Agunan
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Berikut adalah foto barang dalam kategori <strong className="text-slate-800">{selectedCategory.name}</strong> yang kami terima sebagai agunan:
              </p>
            </div>

            {/* Conditional render: Bento Grid (desktop) vs Carousel (mobile) */}
            {isDesktop ? (
              <BentoGrid
                items={selectedCategory.details}
                categorySlug={selectedCategory.slug}
              />
            ) : (
              <CarouselSwipe
                items={selectedCategory.details}
                categorySlug={selectedCategory.slug}
              />
            )}
          </div>

          {/* Footer: OJK Badge */}
          <div className="px-5 sm:px-8 py-4 border-t border-slate-100/80 flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-5 h-5 text-slate-400" />
            <span className="text-[10px] font-bold tracking-wide uppercase">Gadai Resmi Diawasi OJK</span>
          </div>
        </div>

      </div>
    </section>
  );
}
