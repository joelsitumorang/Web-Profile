"use client";

import React from "react";
import Hero from "@/components/Hero";
import AgunanSection from "@/components/AgunanSection";
import PawnRequirements from "@/components/PawnRequirements";
import BranchLocations from "@/components/BranchLocations";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* 1. Hero Section - OJK taglines, trust metrics, main CTA buttons */}
      <Hero />
      
      {/* 2. Pawn Categories Bento Grid - Apple-style category layout */}
      <AgunanSection />
      
      {/* 3. Pawn Requirements Checklist - Administrative transparency detail */}
      <PawnRequirements />
      
      {/* 4. Branch Locations - City filters & active WhatsApp direct APIs */}
      <BranchLocations />
    </main>
  );
}
