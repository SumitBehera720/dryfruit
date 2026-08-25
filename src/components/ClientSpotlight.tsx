'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function ClientSpotlight() {
  return (
    <section className="w-full bg-[#FFFDF9] text-[#1E293B] py-20 md:py-28 font-sans overflow-hidden border-b border-stone-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 space-y-24 md:space-y-32">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-2"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#C85A32] font-extrabold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
            EDITORIAL FEATURE
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#1E293B] font-serif">
            Superfoods Spotlight
          </h2>
          <p className="text-xs md:text-sm text-slate-500 max-w-md mx-auto font-light tracking-wide">
            Deep dive into our clean-label Canadian dehydrated fruit and vegetable powders.
          </p>
        </motion.div>

        {/* Spotlight 1: Beets & Berries Wellness Powder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 relative aspect-[1.25/1] w-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#FFF5ED] via-[#FFFDF9] to-[#FFF5ED] shadow-xl border border-orange-200/60 p-8 flex items-center justify-center"
          >
            <div className="relative w-4/5 h-4/5 transition-transform duration-700 hover:scale-105">
              <Image 
                src="https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/7d2f74bd-e0b5-4819-ac21-c3bfa725bd23.png" 
                alt="Beets & Berries Wellness Powder"
                fill
                sizes="(max-w-1024px) 100vw, 60vw"
                className="object-contain drop-shadow-xl"
              />
            </div>
          </motion.div>

          {/* Right Column: Text & Packs */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C85A32] font-extrabold">CANADIAN CLEAN LABEL</span>
              <h3 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-[#1E293B] font-serif mt-1 leading-tight">
                Beets & Berries Wellness Powder
              </h3>
            </div>
            
            <p className="text-slate-600 text-xs md:text-sm font-light leading-relaxed tracking-wide">
              A vibrant superfood synergy combining organic dehydrated red beetroots, wild Canadian lowbush blueberries, and cranberries. Packed with natural dietary nitrates, polyphenols, and stamina-boosting antioxidants.
            </p>

            <div className="flex gap-3 items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Available Size:</span>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-lg bg-[#FFF5ED] text-[10px] text-[#C85A32] font-bold border border-orange-200/80">100g Pouch</span>
              </div>
            </div>

            <div className="pt-2">
              <Link 
                href="/shop?category=superfood-powders" 
                className="inline-flex items-center gap-2 bg-[#C85A32] hover:bg-[#B04C27] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl"
              >
                Shop Superfood Powders <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Spotlight 2: Wild Blueberry Powder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-6 order-2 lg:order-1"
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C85A32] font-extrabold">ANTIOXIDANT & BRAIN SUPPORT</span>
              <h3 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-[#1E293B] font-serif mt-1 leading-tight">
                Wild Blueberry Powder Raw
              </h3>
            </div>
            
            <p className="text-slate-600 text-xs md:text-sm font-light leading-relaxed tracking-wide">
              100% pure unsweetened powder milled from wild Canadian blueberries. Gently dehydrated at low temperatures to lock in up to 4x higher anthocyanin antioxidants than cultivated varieties.
            </p>

            <div className="flex gap-3 items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Available Size:</span>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-lg bg-[#FFF5ED] text-[10px] text-[#C85A32] font-bold border border-orange-200/80">100g Pouch</span>
              </div>
            </div>

            <div className="pt-2">
              <Link 
                href="/shop?category=superfood-powders" 
                className="inline-flex items-center gap-2 bg-[#C85A32] hover:bg-[#B04C27] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl"
              >
                Explore Wild Blueberry <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 relative aspect-[1.25/1] w-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#FFF5ED] via-[#FFFDF9] to-[#FFF5ED] shadow-xl border border-orange-200/60 p-8 flex items-center justify-center order-1 lg:order-2"
          >
            <div className="relative w-4/5 h-4/5 transition-transform duration-700 hover:scale-105">
              <Image 
                src="https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/34f19c4e-c99c-4368-b41c-23aac91a46d6.jpg" 
                alt="Wild Blueberry Powder Raw Unsweetened"
                fill
                sizes="(max-w-1024px) 100vw, 60vw"
                className="object-contain drop-shadow-xl"
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
