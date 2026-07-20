"use client";

import React, { useState } from "react";
import { Home, LayoutGrid, Calculator, CircleHelp } from "lucide-react";
import SimulasiBunga from "@/components/SimulasiBunga";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  isModal?: boolean;
  isExternal?: boolean;
}

export default function BottomNavbar() {
  const [activeTab, setActiveTab] = useState("beranda");
  const [isSimulasiOpen, setIsSimulasiOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      id: "beranda",
      label: "Beranda",
      icon: Home,
      href: "#",
    },
    {
      id: "agunan",
      label: "Agunan",
      icon: LayoutGrid,
      href: "#kategori",
    },
    {
      id: "simulasi",
      label: "Simulasi",
      icon: Calculator,
      href: "#",
      isModal: true,
    },
    {
      id: "perlu-apa",
      label: "Perlu apa?",
      icon: CircleHelp,
      href: "https://wa.me/6281213211413?text=Halo%20PT%20MBG,%20saya%20butuh%20bantuan%20mengenai%20layanan%20gadai...",
      isExternal: true,
    },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800/50 shadow-[0_-4px_24px_rgba(0,0,0,0.4)] transition-all duration-300">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <a
                key={item.id}
                href={item.isModal ? undefined : item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (item.isModal) {
                    e.preventDefault();
                    setIsSimulasiOpen(true);
                  }
                  setActiveTab(item.id);
                }}
                className="flex flex-col items-center justify-center flex-1 h-full py-1.5 text-center transition-all duration-200 active:scale-95 group relative cursor-pointer"
              >
                {/* Touch Target Expansion */}
                <div className="absolute inset-0 w-full h-full" />

                <div
                  className={`relative flex flex-col items-center transition-all duration-200 ${
                    isActive
                      ? "text-sky-400 scale-105"
                      : "text-zinc-400 group-hover:text-zinc-200"
                  }`}
                >
                  <Icon
                    className={`w-[22px] h-[22px] transition-transform duration-200 ${
                      isActive ? "stroke-[2.25]" : "stroke-[1.75]"
                    }`}
                  />
                  <span className="text-[10px] sm:text-xs mt-1 font-semibold tracking-wide transition-colors duration-200">
                    {item.label}
                  </span>
                  
                  {/* Active Indicator Dot */}
                  {isActive && (
                    <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </nav>

      {/* ─── Simulasi Bunga Modal ─── */}
      <SimulasiBunga
        isOpen={isSimulasiOpen}
        onClose={() => setIsSimulasiOpen(false)}
      />
    </>
  );
}
