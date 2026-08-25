'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Sun, Leaf } from 'lucide-react';

interface FeatureItem {
  num: string;
  title: string;
}

export default function Infographic() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const leftFeatures: FeatureItem[] = [
    { num: '01', title: '100% USDA Certified Organic & Non-GMO' },
    { num: '02', title: 'Nitrogen-Flushed Packaging locks in 100% freshness' },
    { num: '03', title: 'Cold-Air Sun Dehydration retains natural enzymes' },
    { num: '04', title: 'Handpicked Jumbo Grade W240 Whole Kernels' },
    { num: '05', title: 'Zero refined sugar, zero preservatives' },
    { num: '06', title: 'Rich in Omega-3 (ALA) plant fats & bioflavonoids' },
    { num: '07', title: 'Quad-layer light & moisture barrier pouch' },
  ];

  const hotspots = [
    { id: '01', x: 45, y: 15, label: '01' },
    { id: '02', x: 42, y: 28, label: '02' },
    { id: '03', x: 74, y: 38, label: '03' },
    { id: '04', x: 48, y: 52, label: '04' },
    { id: '05', x: 36, y: 62, label: '05' },
    { id: '06', x: 60, y: 68, label: '06' },
    { id: '07', x: 72, y: 77, label: '07' },
  ];

  const rightSpecs = [
    {
      title: 'Maximum Bioavailability',
      desc: 'Raw and unheated for peak absorption'
    },
    {
      title: 'Sustainably Harvested',
      desc: 'Direct ethical farmer partnerships'
    },
    {
      title: 'Nutrient Dense',
      desc: 'Abundant in natural vitamins & minerals'
    }
  ];

  return (
    <section className="w-full bg-[#0F382C] text-white py-20 md:py-28 font-sans border-b border-emerald-900/40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#D4A359] font-bold block">
            SUPERFOOD ANATOMY
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-white font-serif">
            Organic Quality Standards
          </h2>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Feature Bullet Points */}
          <div className="lg:col-span-4 space-y-4">
            {leftFeatures.map((feat) => (
              <div 
                key={feat.num}
                onMouseEnter={() => setActiveHotspot(feat.num)}
                onMouseLeave={() => setActiveHotspot(null)}
                className={`p-3.5 rounded-xl border transition-all duration-300 flex items-start gap-3 cursor-pointer ${
                  activeHotspot === feat.num 
                    ? 'bg-emerald-900/80 border-[#D4A359] translate-x-2' 
                    : 'bg-emerald-950/40 border-emerald-800/40 hover:border-emerald-600'
                }`}
              >
                <span className="text-xs font-extrabold text-[#D4A359] font-serif">{feat.num}</span>
                <p className="text-xs text-emerald-100 font-light leading-snug">{feat.title}</p>
              </div>
            ))}
          </div>

          {/* Center Image with Interactive Hotspots */}
          <div className="lg:col-span-5 relative aspect-square bg-emerald-950/60 rounded-3xl overflow-hidden border border-emerald-800/40 p-6 flex items-center justify-center">
            <Image 
              src="/images/dryfruit_hero.png" 
              alt="Organic Traditions Superfood Display"
              fill
              sizes="(max-w-1024px) 100vw, 40vw"
              className="object-cover brightness-90 rounded-3xl"
            />

            {hotspots.map((spot) => (
              <button
                key={spot.id}
                onMouseEnter={() => setActiveHotspot(spot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 z-20 ${
                  activeHotspot === spot.id
                    ? 'bg-[#D4A359] text-[#0F382C] scale-125 shadow-lg'
                    : 'bg-[#0F382C]/90 text-white border border-[#D4A359]/60'
                }`}
              >
                {spot.label}
              </button>
            ))}
          </div>

          {/* Right Column: Spec Cards */}
          <div className="lg:col-span-3 space-y-6">
            {rightSpecs.map((spec, idx) => (
              <div key={idx} className="bg-emerald-950/40 border border-emerald-800/40 p-6 rounded-2xl space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4A359] font-serif">{spec.title}</h4>
                <p className="text-xs text-emerald-200/80 font-light">{spec.desc}</p>
              </div>
            ))}
            
            <Link 
              href="/shop" 
              className="block w-full bg-[#D4A359] hover:bg-[#b88c46] text-[#0F382C] font-bold text-xs uppercase tracking-widest py-4 text-center rounded-xl transition-all shadow-md mt-4"
            >
              Shop All Superfoods
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
