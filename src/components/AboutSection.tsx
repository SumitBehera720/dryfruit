'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf, Award, ShieldCheck, Sun, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutSection() {
  const pillars = [
    {
      icon: <Leaf className="w-6 h-6 text-[#C85A32]" />,
      title: '100% Farm Organic',
      desc: 'Sourced directly from certified organic orchards in California, Kashmir, and Iran with zero pesticide residue.'
    },
    {
      icon: <Sun className="w-6 h-6 text-[#C85A32]" />,
      title: 'Sulfur-Free Sun Drying',
      desc: 'Preserves essential volatile oils, natural enzymes, and intense natural flavor without chemical bleaching.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#C85A32]" />,
      title: 'Triple Quality Inspection',
      desc: 'Every single batch undergoes 3 levels of manual size sorting, kernel inspection, and lab moisture testing.'
    },
    {
      icon: <Award className="w-6 h-6 text-[#C85A32]" />,
      title: 'Eco Vacuum Sealed',
      desc: 'Air-tight glass jars & moisture-proof pouches ensure farm-fresh crunch and extended shelf life.'
    }
  ];

  return (
    <section id="about-us" className="w-full bg-[#FAF8F5] py-16 md:py-24 font-sans text-slate-800 border-t border-stone-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Showcase & Badges */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-200">
              <Image 
                src="https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/7d2f74bd-e0b5-4819-ac21-c3bfa725bd23.png"
                alt="Organic Traditions Heritage & Organic Farming"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs uppercase font-extrabold tracking-widest text-amber-300">ESTABLISHED WITH PASSION</span>
                <h4 className="text-xl font-bold font-serif">Pure Organic Excellence</h4>
              </div>
            </div>

            {/* Overlapping Experience Card */}
            <div className="absolute -bottom-8 -right-4 sm:right-6 bg-white p-5 rounded-2xl shadow-xl border border-stone-200/90 max-w-[220px] hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#C85A32]/10 text-[#C85A32] font-black text-xl flex items-center justify-center font-serif">
                  100%
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wide">Chemical Free</h5>
                  <p className="text-[11px] text-slate-500 font-light">Guaranteed Pure & Natural</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Story & Quality Pillars */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-3">
              <span className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#C85A32] font-extrabold block">
                OUR HERITAGE & PROMISE
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1E293B] font-serif leading-tight">
                Rooted in Nature. Crafted for Health.
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                At Organic Traditions, we believe true nourishment comes straight from clean soil and traditional farming wisdom. We source premium almonds, saffron, dates, and superfood seeds directly from certified organic growers worldwide.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pillars.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow space-y-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C85A32]/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 font-serif">{item.title}</h4>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link 
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1E293B] hover:bg-[#C85A32] text-white font-semibold text-xs md:text-sm tracking-wide shadow-md transition-colors"
              >
                <span>Read Full Brand Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>50,000+ Happy Organic Snackers</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
