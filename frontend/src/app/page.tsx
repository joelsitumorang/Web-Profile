"use client";

import React from "react";
import Hero from "@/components/Hero";
import MarqueeTeaser from "@/components/MarqueeTeaser";
import CaraKerja from "@/components/CaraKerja";
import AgunanSection from "@/components/AgunanSection";
import PawnRequirements from "@/components/PawnRequirements";
import BranchLocations from "@/components/BranchLocations";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* 1. Hero Section - OJK taglines, trust metrics, main CTA buttons */}
      <Hero />

      {/* Marquee Teaser for accepted items */}
      <MarqueeTeaser />

      {/* 2. Cara Kerja Section - 3 Universal Steps */}
      <CaraKerja />
      
      {/* 3. Pawn Categories Bento Grid - Apple-style category layout */}
      <AgunanSection />
      
      {/* 4. Pawn Requirements Checklist - Administrative transparency detail */}
      <PawnRequirements />
      
      {/* 5. Branch Locations - City filters & active WhatsApp direct APIs */}
      <BranchLocations />
    </main>
  );
}
