'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface FeatureItem {
  num: string;
  title: string;
}

export default function Infographic() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const leftFeatures: FeatureItem[] = [
    { num: '01', title: '1.5cm higher waistband for added coverage' },
    { num: '02', title: 'High compression waistband for tummy control' },
    { num: '03', title: 'Invisible scrunch to naturally lift the glutes' },
    { num: '04', title: 'Booty contouring design to shape and sculpt' },
    { num: '05', title: 'No front seam for a smooth, flattering fit' },
    { num: '06', title: 'Squat-proof fabric you can rely on' },
    { num: '07', title: 'Signature seamless finish for a second skin feel' },
  ];

  // Hotspot definitions - now featuring 05 and 06 matching the full list
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
      title: 'Four-way Stretch',
      desc: 'Moves in every direction',
      icon: (
        <svg className="w-5 h-5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h6M4 4v6M4 4l7 7M20 20h-6M20 20v-6M20 20l-7-7M4 20h6M4 20v-6M4 20l7-7M20 4h-6M20 4v6M20 4l-7 7" />
        </svg>
      )
    },
    {
      title: 'Moisture Wicking',
      desc: 'Stay dry. Stay focused.',
      icon: (
        <svg className="w-5 h-5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 16.24D9.86 9.86 0 0112 21c-5.4 0-9.8-4.4-9.8-9.8C2.2 7 8 2.2 12 2c0 0 4 4.5 4 8a4 4 0 01-4 4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11V7" />
        </svg>
      )
    },
    {
      title: 'Breathable Fabric',
      desc: 'Feel fresh all day.',
      icon: (
        <svg className="w-5 h-5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M6 8h12M9 16h6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16" />
        </svg>
      )
    },
    {
      title: 'Lightweight Feel',
      desc: 'Built for all-day comfort.',
      icon: (
        <svg className="w-5 h-5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full bg-[#f6f6f6] py-16 md:py-24 font-sans overflow-hidden border-b border-zinc-100">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 md:px-8"
      >
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-zinc-500 font-semibold">
            Enhance Form.
          </span>
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-widest text-black mt-2">
            Engineered To Elevate You.
          </h2>
        </div>

        {/* 3-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Features List */}
          <div className="lg:col-span-4 flex flex-col space-y-4 md:space-y-6 order-2 lg:order-1">
            {leftFeatures.map((feat) => {
              const isSelected = activeHotspot === feat.num;
              return (
                <div 
                  key={feat.num}
                  onMouseEnter={() => setActiveHotspot(feat.num)}
                  onMouseLeave={() => setActiveHotspot(null)}
                  className={`flex items-start gap-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    isSelected ? 'bg-white shadow-md border-l-2 border-black translate-x-2' : 'border-l-2 border-transparent'
                  }`}
                >
                  <span className={`text-xs md:text-sm font-bold tracking-wider ${
                    isSelected ? 'text-black' : 'text-zinc-400'
                  }`}>
                    {feat.num}
                  </span>
                  {/* Keep font weight consistent as font-medium on both states to prevent text wrapping changes and screen shaking */}
                  <p className={`text-xs md:text-sm leading-relaxed tracking-wide font-medium ${
                    isSelected ? 'text-black' : 'text-zinc-600'
                  }`}>
                    {feat.title}
                  </p>
                </div>
              );
            })}
            <div className="pt-4">
              <Link href="/technology" className="inline-block bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 transition-colors duration-300">
                Learn More
              </Link>
            </div>
          </div>

          {/* Center Leggings Hotspots Image */}
          <div className="lg:col-span-5 relative flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[360px] aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-lg border border-zinc-200">
              <Image 
                src="/images/infographic_leggings.png"
                alt="AERTH Sculpting Leggings"
                fill
                sizes="(max-w-720px) 100vw, 33vw"
                className="object-cover object-center"
              />

              {/* Glowing Interactive Hotspots */}
              {hotspots.map((dot) => {
                const isActive = activeHotspot === dot.id;
                return (
                  <div 
                    key={dot.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                  >
                    {/* Ring Pulse */}
                    <span className={`absolute -inset-2.5 rounded-full bg-black/15 transition-transform duration-500 scale-150 ${
                      isActive ? 'animate-ping opacity-75' : 'opacity-0'
                    }`} />
                    
                    {/* Hotspot Point */}
                    <button 
                      onMouseEnter={() => setActiveHotspot(dot.id)}
                      onMouseLeave={() => setActiveHotspot(null)}
                      className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md ${
                        isActive ? 'bg-black text-white border-white scale-125' : 'bg-white text-black border-black'
                      }`}
                      aria-label={`Hotspot ${dot.id}`}
                    >
                      <span className="text-[9px] font-bold">{dot.label}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Checklist Grid */}
          <div className="lg:col-span-3 flex flex-col gap-6 md:gap-8 order-3">
            {rightSpecs.map((spec) => (
              <div 
                key={spec.title}
                className="flex gap-4 items-start border-b border-zinc-200/60 pb-5 last:border-0"
              >
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200 shadow-sm flex-shrink-0">
                  {spec.icon}
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-bold uppercase tracking-wider text-black">
                    {spec.title}
                  </h4>
                  <p className="text-[10px] md:text-xs text-zinc-500 tracking-wider mt-1 font-light leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </motion.div>
    </section>
  );
}
