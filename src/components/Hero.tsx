'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Award, Leaf } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full h-[82vh] md:h-[90vh] min-h-[620px] bg-gradient-to-br from-[#FFFDF9] via-[#FFF5ED] to-[#FFFDF9] overflow-hidden flex items-center font-sans text-[#1E293B]">
      
      {/* Ambient Light Orbs for Warm Vibrant Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#C85A32]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glass Content Container */}
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-10 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-8 space-y-6 md:space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 w-fit bg-[#FFF5ED] border border-orange-200/80 px-4 py-2 rounded-full backdrop-blur-md shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#C85A32]" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#C85A32] font-extrabold">
              100% CANADIAN GROWN CLEAN-LABEL NUTRITION
            </span>
          </motion.div>

          <div className="space-y-3">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#1E293B] leading-[1.02] font-serif"
            >
              Pure Dehydrated <br />
              <span className="text-[#C85A32]">Fruit & Veggie Powders.</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-xs md:text-base text-slate-600 max-w-xl tracking-wide leading-relaxed font-light"
          >
            Clean-label superfood powders, wellness shots, wild Canadian blueberries, beets, celery, and golden turmeric blends dehydrated at low temperatures to retain living enzymes.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link 
              href="/shop" 
              className="bg-[#C85A32] hover:bg-[#B04C27] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl text-center rounded-xl flex items-center gap-2.5"
            >
              Shop Superfoods <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/shop?category=wellness-shots" 
              className="bg-white/90 hover:bg-white border border-stone-300/80 text-[#1E293B] font-bold text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300 backdrop-blur-md shadow-sm text-center rounded-xl"
            >
              Explore Wellness Shots
            </Link>
          </motion.div>

          {/* Value Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap items-center gap-6 pt-6 border-t border-stone-200/80 text-[10px] md:text-xs text-slate-600 uppercase tracking-widest font-semibold"
          >
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#C85A32]" /> 100% Natural</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-[#C85A32]" /> Canadian Origin</span>
            <span className="flex items-center gap-1.5"><Leaf className="w-4 h-4 text-[#C85A32]" /> Clean-Label</span>
          </motion.div>
        </div>

        {/* Right Floating Product Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:col-span-4 relative flex justify-center"
        >
          <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl p-6 bg-white/90 backdrop-blur-xl border border-stone-200/80 shadow-2xl flex flex-col justify-between overflow-hidden group">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FFF5ED]">
              <Image 
                src="https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/7d2f74bd-e0b5-4819-ac21-c3bfa725bd23.png" 
                alt="Just Naturals Beets & Berries"
                fill
                priority
                sizes="400px"
                className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            <div className="pt-4 space-y-2 text-[#1E293B]">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C85A32]">FEATURED FORMULA</span>
                <span className="text-xs font-bold text-[#C85A32]">₹849</span>
              </div>
              <h3 className="text-base font-extrabold uppercase tracking-wide font-serif leading-tight">
                Beets & Berries Wellness Powder
              </h3>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
