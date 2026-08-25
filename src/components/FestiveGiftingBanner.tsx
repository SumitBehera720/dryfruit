'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gift, Sparkles, ArrowRight, Star } from 'lucide-react';

export default function FestiveGiftingBanner() {
  return (
    <section className="w-full bg-[#FFFDF9] py-16 md:py-24 font-sans text-[#1E293B]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10">
        
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF5ED] via-[#FFFDF9] to-[#FFF5ED] text-[#1E293B] p-8 sm:p-12 md:p-16 border border-orange-200/80 shadow-xl">
          
          {/* Background Decorative Accent */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-15 pointer-events-none">
            <Image 
              src="/images/dryfruit_giftbox.png" 
              alt="Artisanal Gift Hamper Background" 
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="flex items-center gap-2 w-fit bg-[#FFF5ED] border border-orange-200/80 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-sm">
                <Gift className="w-3.5 h-3.5 text-[#C85A32]" />
                <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#C85A32] font-bold">
                  LIMITED HARVEST EDITION
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold uppercase tracking-tight leading-[1.02] font-serif text-[#1E293B]">
                Artisanal Festive &<br />
                <span className="text-[#C85A32]">Heirloom Hampers.</span>
              </h2>

              <p className="text-slate-600 text-xs md:text-sm font-light leading-relaxed max-w-lg tracking-wide">
                Celebrate special occasions and corporate milestones with our handcrafted wooden heirloom gift boxes. Partitioned with Mamra Almonds, W240 Cashews, Roasted Pistachios, and Arabian Dates.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-slate-700 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-[#C85A32] fill-current" /> Custom Greeting Card Included</span>
                <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#C85A32]" /> Gold Foil Embossing</span>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link 
                  href="/shop?category=gifting" 
                  className="bg-[#C85A32] hover:bg-[#B04C27] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 shadow-xl flex items-center gap-2"
                >
                  Explore Gift Hampers (Starting ₹1,499) <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Right Preview Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden shadow-xl border border-stone-200/80 group bg-white/90"
            >
              <Image 
                src="/images/dryfruit_giftbox.png" 
                alt="Organic Traditions Royal Gift Hamper" 
                fill 
                sizes="(max-w-1024px) 100vw, 35vw"
                className="object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-white/90 rounded-xl p-4 flex justify-between items-center text-[#1E293B] shadow-lg">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#C85A32] font-bold block">Royal Festive Combo</span>
                  <span className="text-sm font-bold uppercase tracking-wider font-serif">800g Wooden Box</span>
                </div>
                <span className="bg-[#C85A32] text-white font-extrabold text-xs px-3 py-1.5 rounded-lg shadow-sm">
                  ₹2,199
                </span>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
