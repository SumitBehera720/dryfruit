'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Layers, RefreshCw, Sparkles, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TechnologyPage() {
  const specs = [
    {
      title: "Element-Proof Weave",
      desc: "An advanced multi-channel fiber structure that pulls perspiration away from the skin and accelerates evaporation, keeping you cool under extreme heat and warm during outdoor drills.",
      icon: <Zap className="w-5 h-5 text-black" />
    },
    {
      title: "Waistband Compression",
      desc: "Engineered with a 1.5cm elevated waistband featuring built-in elastic memory fibers. This provides absolute core support and tummy control that stays locked in place during high-impact movement.",
      icon: <Layers className="w-5 h-5 text-black" />
    },
    {
      title: "Seamless Integration",
      desc: "Woven on Italian circular knitting machines to eliminate front and side seams entirely. This eliminates friction and chafing while conforming perfectly to your natural curves.",
      icon: <RefreshCw className="w-5 h-5 text-black" />
    },
    {
      title: "Opaque Squat Protection",
      desc: "Woven with double-knit, high-gauge microfibers to ensure the fabric remains 100% opaque and squat-proof, even at full stretch under loaded squats or deep yoga stretches.",
      icon: <ShieldCheck className="w-5 h-5 text-black" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />

      <main className="flex-1 font-sans">
        
        {/* Hero Section */}
        <section className="relative bg-[#0c0c0c] text-white py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-6">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-zinc-500 font-bold flex justify-center items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-zinc-400" />
              Innovation & Tech Lab
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl md:text-6xl font-bold uppercase tracking-widest leading-tight"
            >
              Engineered To <br />
              <span className="text-zinc-400">Elevate You</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-zinc-400 text-xs md:text-sm tracking-widest max-w-lg mx-auto font-light leading-relaxed uppercase"
            >
              Move without friction. Perform without compromise.
              Explore the design principles backing AERTH activewear.
            </motion.p>
          </div>
        </section>

        {/* Tech Grid Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {specs.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-zinc-50 rounded-3xl p-8 border border-zinc-200/60 shadow-sm space-y-4"
              >
                <div className="bg-white border border-zinc-200/80 p-3 rounded-2xl w-fit shadow-xs">
                  {item.icon}
                </div>
                <h3 className="text-sm md:text-base font-bold uppercase tracking-wider text-black">
                  {item.title}
                </h3>
                <p className="text-zinc-600 text-xs md:text-sm font-light leading-relaxed tracking-wide">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Design Philosophy Quote */}
        <section className="w-full bg-zinc-50 border-y border-zinc-200/50 py-16 md:py-24 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <span className="text-[10px] text-zinc-400 tracking-[0.3em] font-bold uppercase">Philosophy</span>
            <p className="text-lg md:text-2xl font-light italic leading-relaxed text-zinc-800 tracking-wide mt-4">
              &ldquo;We don&apos;t build activewear for aesthetic display alone. We engineer structural garments that respond to movement, regulate perspiration, and shape the muscles to boost confidence.&rdquo;
            </p>
            <div className="mt-6 text-xs font-bold uppercase tracking-widest text-black">
              AERTH Design Lab Team
            </div>
          </div>
        </section>

        {/* CTA Shop Banner */}
        <section className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-black">
            Experience the Innovation
          </h2>
          <p className="text-zinc-500 text-xs md:text-sm tracking-wide font-light max-w-md mx-auto">
            Test the Italian seamless knit and high compression fabric on your next workout. Free shipping above ₹3,999.
          </p>
          <div className="pt-2">
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-2 bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest px-10 py-5 transition-colors shadow-lg hover:shadow-xl rounded-xl"
            >
              Shop Leggings
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
