'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Sun, Leaf, ShieldCheck, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const heroBgY = useTransform(heroScroll, [0, 1], ['0%', '20%']);
  const heroBgScale = useTransform(heroScroll, [0, 1], [1.05, 1.15]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  const bgStyle = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#09090b', '#09090b', '#ffffff', '#ffffff', '#09090b']
  );
  
  const textThemeColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#ffffff', '#ffffff', '#09090b', '#09090b', '#ffffff']
  );

  const pillars = [
    {
      num: '01',
      title: 'PURITY / Direct Organic Sourcing',
      desc: 'We source raw almonds, jumbo cashews, dates, and superfoods directly from certified organic orchards across California, Kashmir, Arabia, and Iran.',
      icon: <Leaf className="w-6 h-6 text-amber-400" />
    },
    {
      num: '02',
      title: 'FRESHNESS / Vacuum Sealed Quality',
      desc: 'Our nitrogen-flushed, vacuum-sealed packaging locks in natural essential oils, peak crispness, and nutrient density without artificial preservatives.',
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />
    },
    {
      num: '03',
      title: 'WELLNESS / Daily Superfood Nutrition',
      desc: '100% Raw, non-GMO, and zero refined sugars. Pure plant power rich in Omega-3, fiber, and antioxidants to fuel your holistic daily health.',
      icon: <Sun className="w-6 h-6 text-amber-400" />
    }
  ];

  return (
    <motion.div style={{ backgroundColor: bgStyle }} className="flex flex-col min-h-screen transition-colors duration-500 font-sans">
      <Header />

      <main ref={containerRef} className="flex-1 overflow-hidden">
        
        {/* Parallax Hero Section */}
        <section ref={heroRef} className="relative h-[85vh] flex items-center justify-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ y: heroBgY, scale: heroBgScale }}
          >
            <Image 
              src="/images/story_bg.png" 
              alt="Just Naturals Brand Story Hero" 
              fill
              priority
              className="object-cover object-center brightness-[0.4]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#09090b] z-10" />

          <motion.div 
            style={{ opacity: heroOpacity }}
            className="max-w-4xl mx-auto text-center px-4 relative z-10 space-y-6 text-white"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-amber-400 font-bold flex justify-center items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Our Organic Promise
            </motion.span>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl md:text-7xl font-extrabold uppercase tracking-widest leading-none"
            >
              Nurtured By Nature.<br />
              <span className="text-amber-300">Delivered Pure.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-zinc-400 text-xs md:text-sm tracking-widest max-w-lg mx-auto font-light leading-relaxed uppercase"
            >
              Handpicked raw almonds, jumbo cashews, dates, and artisanal superfoods packed fresh for your daily health.
            </motion.p>
          </motion.div>
        </section>

        {/* Brand Philosophy */}
        <section className="py-24 md:py-36 flex items-center relative z-10">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <motion.span 
                  style={{ color: textThemeColor }}
                  className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold block transition-colors duration-500"
                >
                  Our Philosophy
                </motion.span>
                <motion.h2 
                  style={{ color: textThemeColor }}
                  className="text-3xl md:text-5xl font-extrabold uppercase tracking-widest mt-3 transition-colors duration-500 leading-tight"
                >
                  Pure Harvest.<br />Zero Compromise.
                </motion.h2>
              </div>
              <div className="lg:col-span-7">
                <motion.p 
                  style={{ color: textThemeColor }}
                  className="text-sm md:text-lg font-light tracking-wide leading-relaxed transition-colors duration-500 font-sans"
                >
                  Just Naturals was founded on a simple belief: daily nutrition should be 100% unadulterated and farm-fresh. We eliminate middle brokers, working directly with organic growers to bring you the highest grade of nuts, dates, and superfood seeds.
                </motion.p>
                <motion.p 
                  style={{ color: textThemeColor }}
                  className="text-sm md:text-lg font-light tracking-wide leading-relaxed transition-colors duration-500 font-sans mt-6"
                >
                  Every batch undergoes multi-stage quality checks for size, moisture, and crispness before being vacuum sealed in eco-friendly, food-grade packaging.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Pillars */}
        <section className="py-24 md:py-36 relative z-10 border-t border-b" style={{ borderColor: 'transparent' }}>
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-16 md:mb-24">
              <motion.span 
                style={{ color: textThemeColor }}
                className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold transition-colors duration-500"
              >
                Our Core Commitments
              </motion.span>
              <motion.h3 
                style={{ color: textThemeColor }}
                className="text-2xl md:text-4xl font-extrabold uppercase tracking-widest mt-2 transition-colors duration-500"
              >
                The Three Pillars of Quality
              </motion.h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: idx * 0.15 }}
                  className="p-8 md:p-10 rounded-3xl border flex flex-col justify-between aspect-[4/5] relative overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500"
                  style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="space-y-6">
                    <motion.div 
                      style={{ color: textThemeColor }}
                      className="bg-white/10 p-3.5 rounded-2xl w-fit border border-white/20 transition-all duration-300 shadow-sm"
                    >
                      {pillar.icon}
                    </motion.div>
                    <div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400">{pillar.num}</span>
                      <h4 className="text-lg md:text-xl font-bold uppercase tracking-wider mt-1 text-white">{pillar.title}</h4>
                      <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed mt-3">{pillar.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 text-center text-white relative z-10 bg-black">
          <div className="max-w-2xl mx-auto px-4 space-y-6">
            <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-widest">Experience Pure Nutrition</h2>
            <p className="text-zinc-400 text-xs md:text-sm font-light tracking-wider uppercase">Explore our full range of raw nuts, Medjool dates, and superfood hampers.</p>
            <Link href="/shop" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-lg">
              Explore Superfoods Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}
