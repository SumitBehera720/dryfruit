'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, ArrowRight, Leaf, Sun, Award } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TechnologyPage() {
  const specs = [
    {
      title: "Nitrogen-Flushed Packaging",
      desc: "Infuses food-grade nitrogen into vacuum pouches to eliminate ambient oxygen, keeping raw almonds and cashews at peak crispness for months.",
      icon: <Sparkles className="w-5 h-5 text-amber-500" />
    },
    {
      title: "Cold-Air Sun Dehydration",
      desc: "Traditional low-temperature sun drying preserves natural enzymes, essential minerals, and antioxidant compounds without artificial thermal processing.",
      icon: <Sun className="w-5 h-5 text-amber-500" />
    },
    {
      title: "Quad-Barrier Foil Pouch",
      desc: "Heavy-duty food-grade aluminum foil lining shields nuts and dates against ambient humidity, air, and light degradation.",
      icon: <ShieldCheck className="w-5 h-5 text-amber-500" />
    },
    {
      title: "Optical Sorting & Grading",
      desc: "High-precision optical sorters inspect every kernel for uniform size, color, and density, ensuring 100% unbroken jumbo quality.",
      icon: <Award className="w-5 h-5 text-amber-500" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />

      <main className="flex-1 font-sans">
        
        {/* Hero Section */}
        <section className="relative bg-[#0c0c0c] text-white py-24 md:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-6">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-amber-400 font-bold flex justify-center items-center gap-1.5"
            >
              <Leaf className="w-4 h-4 text-amber-400" />
              Sourcing & Quality Lab
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl md:text-6xl font-bold uppercase tracking-widest leading-tight"
            >
              Freshness Engineered By Science.
            </motion.h1>

            <p className="text-zinc-400 text-xs md:text-sm tracking-widest max-w-xl mx-auto font-light leading-relaxed uppercase">
              How our hygienic processing and protective packaging technology preserves natural taste and maximum nutrient density.
            </p>
          </div>
        </section>

        {/* Specs Grid */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {specs.map((spec, idx) => (
              <div key={idx} className="bg-zinc-50 border border-zinc-100 p-8 rounded-2xl space-y-4">
                <div className="bg-white p-3 rounded-xl border border-zinc-200 w-fit">
                  {spec.icon}
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-black">{spec.title}</h3>
                <p className="text-xs md:text-sm text-zinc-600 font-light leading-relaxed tracking-wide">{spec.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-black text-white py-16 text-center">
          <div className="max-w-xl mx-auto px-4 space-y-6">
            <h2 className="text-2xl font-bold uppercase tracking-widest">Taste The Difference</h2>
            <Link href="/shop" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all">
              Shop Superfoods <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
