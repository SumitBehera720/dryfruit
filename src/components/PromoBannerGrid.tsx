'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Sun, ArrowRight, Sparkles, Award } from 'lucide-react';

export default function PromoBannerGrid() {
  return (
    <section className="w-full bg-[#FFFDF9] py-16 md:py-24 overflow-hidden font-sans text-[#1E293B]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-r from-[#FFF5ED] via-[#FFFDF9] to-[#F2F7F2] rounded-3xl p-6 sm:p-10 md:p-14 relative overflow-hidden shadow-xl border border-orange-200/60">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C85A32]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D97706]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Left Text & Value Highlights */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 relative z-10"
          >
            <div className="flex items-center gap-2 w-fit bg-[#FFF5ED] border border-orange-200/80 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#C85A32] font-bold">
                REGENERATIVE ORGANIC GUARANTEE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-[1.05] font-serif text-[#1E293B]">
              Pure Plant Vitality,<br />
              <span className="text-[#C85A32]">From Soil To Spoon.</span>
            </h2>

            <p className="text-slate-600 text-xs md:text-sm font-light leading-relaxed max-w-xl tracking-wide">
              We eliminate middle brokers by sourcing raw Mamra almonds, king cashews, ashwagandha, and dates directly from certified organic family orchards. Nitrogen flushed and vacuum packed to lock in original taste, natural oils, and crisp crunch.
            </p>

            {/* Micro-Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-stone-200/80 shadow-sm space-y-1">
                <Leaf className="w-5 h-5 text-[#C85A32]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E293B]">100% Organic</h4>
                <p className="text-[10px] text-slate-500">Non-GMO & zero additives</p>
              </div>
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-stone-200/80 shadow-sm space-y-1">
                <Sun className="w-5 h-5 text-[#C85A32]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E293B]">Cold Dehydrated</h4>
                <p className="text-[10px] text-slate-500">Retains living enzymes</p>
              </div>
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-stone-200/80 shadow-sm space-y-1">
                <Award className="w-5 h-5 text-[#C85A32]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E293B]">Ethical Harvest</h4>
                <p className="text-[10px] text-slate-500">Direct farmer partnerships</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link 
                href="/about" 
                className="bg-[#C85A32] hover:bg-[#B04C27] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                Our Sourcing Promise <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/technology" 
                className="bg-white/90 hover:bg-white border border-stone-300/80 text-[#1E293B] font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 shadow-sm"
              >
                Freshness Technology
              </Link>
            </div>
          </motion.div>

          {/* Right Visual Feature */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-stone-200/80 group"
          >
            <Image 
              src="/images/dryfruit_hero.png" 
              alt="Organic Traditions Harvest Display" 
              fill 
              sizes="(max-w-1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            
            {/* Overlay Glass Stat */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-white/90 rounded-xl p-3.5 flex justify-between items-center text-[#1E293B] shadow-lg">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-[#C85A32] font-bold">Purity Standard</p>
                <p className="text-xs font-bold uppercase tracking-wider">Vacuum Sealed Freshness</p>
              </div>
              <ShieldCheck className="w-6 h-6 text-[#C85A32]" />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
