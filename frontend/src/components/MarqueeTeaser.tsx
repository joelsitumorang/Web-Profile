"use client";

import React from "react";

/* ─────────────────────────────────────────────────────────
   MARQUEE DATA — Mixed items from all categories
   ───────────────────────────────────────────────────────── */

interface MarqueeItem {
  name: string;
  image: string;
}

const marqueeRow1: MarqueeItem[] = [
  { name: "Cincin Emas", image: "/images/barang/cincin.png" },
  { name: "HP", image: "/images/barang/hp.png" },
  { name: "Mesin Bor", image: "/images/barang/mesin-bor.jpg" },
  { name: "Laptop", image: "/images/barang/laptop.png" },
  { name: "Gelang Emas", image: "/images/barang/gelang.png" },
  { name: "Kulkas", image: "/images/barang/kulkas.png" },
  { name: "Sepeda Motor", image: "/images/barang/sepeda-motor.jpg" },
  { name: "Blender", image: "/images/barang/blender.png" },
  { name: "Kamera", image: "/images/barang/kamera.png" },
  { name: "Gerinda", image: "/images/barang/gerinda.jpg" },
  { name: "Kalung Emas", image: "/images/barang/kalung.png" },
  { name: "TV", image: "/images/barang/tv.png" },
];

const marqueeRow2: MarqueeItem[] = [
  { name: "Liontin Emas", image: "/images/barang/liontin.png" },
  { name: "Mobil", image: "/images/barang/mobil.jpg" },
  { name: "Rice Cooker", image: "/images/barang/rice-cooker.png" },
  { name: "Anting Emas", image: "/images/barang/anting.png" },
  { name: "Mesin Las", image: "/images/barang/mesin-las.jpg" },
  { name: "Salon Aktif", image: "/images/barang/salon-aktif.png" },
  { name: "Dispenser", image: "/images/barang/dispenser.jpg" },
  { name: "Genset", image: "/images/barang/genset.jpg" },
  { name: "Kipas Angin", image: "/images/barang/kipas-angin.jpg" },
  { name: "Microwave", image: "/images/barang/microwave.jpg" },
  { name: "Mesin Ketam", image: "/images/barang/mesin-ketam.jpg" },
];

/* ─────────────────────────────────────────────────────────
   MARQUEE CARD SUB-COMPONENT
   ───────────────────────────────────────────────────────── */

function MarqueeCard({ item }: { item: MarqueeItem }) {
  return (
    <a
      href="#kategori"
      className="relative shrink-0 w-[140px] sm:w-[160px] h-[96px] rounded-xl overflow-hidden group cursor-pointer"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      {/* Overlay with name */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        <span className="px-3 pb-2.5 text-[10px] sm:text-[11px] font-bold text-white tracking-wide">
          {item.name}
        </span>
      </div>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────
   MARQUEE ROW SUB-COMPONENT
   ───────────────────────────────────────────────────────── */

function MarqueeRow({
  items,
  direction,
}: {
  items: MarqueeItem[];
  direction: "left" | "right";
}) {
  // Duplicate items for seamless looping
  const duplicated = [...items, ...items];

  return (
    <div
      className="flex gap-3 overflow-hidden group/row"
      style={{ maskImage: "linear-gradient(to right, transparent, black 3%, black 97%, transparent)" }}
    >
      <div
        className={`flex gap-3 shrink-0 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } group-hover/row:[animation-play-state:paused]`}
      >
        {duplicated.map((item, i) => (
          <MarqueeCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────── */

export default function MarqueeTeaser() {
  return (
    <section className="relative bg-slate-50 py-6 sm:py-8 overflow-hidden border-b border-slate-100/80">
      {/* Keyframe Animations */}
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 32s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 28s linear infinite;
        }
      `}</style>

      {/* Section micro-label */}
      <div className="max-w-6xl mx-auto px-6 mb-4">
        <span className="text-[10px] font-bold text-slate-400 tracking-[0.15em] uppercase">
          Beragam Barang Diterima
        </span>
      </div>

      {/* Marquee Rows */}
      <div className="space-y-3">
        <MarqueeRow items={marqueeRow1} direction="left" />
        <MarqueeRow items={marqueeRow2} direction="right" />
      </div>
    </section>
  );
}
