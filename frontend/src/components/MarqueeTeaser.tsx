"use client";

import React from "react";
import { agunanList } from "@/data/agunan";

/* ─────────────────────────────────────────────────────────
   MARQUEE DATA — Extracted from agunanList
   ───────────────────────────────────────────────────────── */

interface MarqueeItem {
  name: string;
  image: string;
}

// Flatten all `contoh` items from `agunanList`
const allItems: MarqueeItem[] = agunanList.flatMap(agunan => agunan.contoh);

// Split into two rows
const midIndex = Math.ceil(allItems.length / 2);
const marqueeRow1 = allItems.slice(0, midIndex);
const marqueeRow2 = allItems.slice(midIndex);

/* ─────────────────────────────────────────────────────────
   MARQUEE CARD SUB-COMPONENT
   ───────────────────────────────────────────────────────── */

function MarqueeCard({ item, hidden = false }: { item: MarqueeItem; hidden?: boolean }) {
  return (
    <a
      href="#kategori"
      aria-hidden={hidden ? "true" : undefined}
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
  return (
    <div
      className="flex gap-3 overflow-hidden group/row"
      style={{ maskImage: "linear-gradient(to right, transparent, black 3%, black 97%, transparent)" }}
    >
      <div
        className={`flex gap-3 shrink-0 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } group-hover/row:[animation-play-state:paused] hover:[animation-play-state:paused]`}
      >
        {items.map((item, i) => (
          <MarqueeCard key={`original-${item.name}-${i}`} item={item} />
        ))}
        {items.map((item, i) => (
          <MarqueeCard key={`duplicate-${item.name}-${i}`} item={item} hidden={true} />
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
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-left, .animate-marquee-right {
            animation: none !important;
          }
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
