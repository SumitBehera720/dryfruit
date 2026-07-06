'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Compass, Wind, Layers, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Overall scroll trackers
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Hero transformations
  const heroBgY = useTransform(heroScroll, [0, 1], ['0%', '20%']);
  const heroBgScale = useTransform(heroScroll, [0, 1], [1.05, 1.15]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  // Philosophy section background color interpolation
  // It shifts the background between dark, light, and dark
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
      title: 'AIR / Infinite Energy',
      desc: 'Air represents breath, freedom, and the lightness of movement. We build garments that feel weightless, with structures that breathe, allowing you to focus entirely on your output.',
      icon: <Wind className="w-6 h-6" />
    },
    {
      num: '02',
      title: 'EARTH / Grounded Strength',
      desc: 'Earth represents stability, resilience, and form. Our compression technology supports and aligns, grounding your posture and boosting muscle memory for every squat and sprint.',
      icon: <Layers className="w-6 h-6" />
    },
    {
      num: '03',
      title: 'BALANCE / Human Focus',
      desc: 'True performance exists in the equilibrium between these forces. Every seam we omit, every fiber we select, and every cut we design is a pursuit of this harmony.',
      icon: <Compass className="w-6 h-6" />
    }
  ];

  return (
    <motion.div style={{ backgroundColor: bgStyle }} className="flex flex-col min-h-screen transition-colors duration-500 font-sans">
      <Header />

      <main ref={containerRef} className="flex-1 overflow-hidden">
        
        {/* Parallax Hero Section */}
        <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ y: heroBgY, scale: heroBgScale }}
          >
            <Image 
              src="/images/story_bg.png" 
              alt="AERTH Brand Story Hero" 
              fill
              priority
              className="object-cover object-center brightness-[0.4]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#09090b] z-5" />

          <motion.div 
            style={{ opacity: heroOpacity }}
            className="max-w-4xl mx-auto text-center px-4 relative z-10 space-y-6 text-white"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-zinc-400 font-bold flex justify-center items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-zinc-400" />
              The Aerth Manifest
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl md:text-7xl font-extrabold uppercase tracking-widest leading-none"
            >
              Inspired By Air.<br />
              <span className="text-zinc-500">Grounded In Earth.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-zinc-400 text-xs md:text-sm tracking-widest max-w-lg mx-auto font-light leading-relaxed uppercase"
            >
              We engineer athletic apparel to exist in perfect harmony with the natural physics of human motion.
            </motion.p>
          </motion.div>
        </section>

        {/* Brand Philosophy - Vertical Scroll Transition */}
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
                  Form In<br />Equilibrium.
                </motion.h2>
              </div>
              <div className="lg:col-span-7">
                <motion.p 
                  style={{ color: textThemeColor }}
                  className="text-sm md:text-lg font-light tracking-wide leading-relaxed transition-colors duration-500 font-sans"
                >
                  AERTH is built on the belief that activewear should not just cover the body, but empower the athlete. By merging the fluid weightlessness of air with the rigid strength of earth, we design garments that elevate your form and stabilize your core. 
                </motion.p>
                <motion.p 
                  style={{ color: textThemeColor }}
                  className="text-sm md:text-lg font-light tracking-wide leading-relaxed transition-colors duration-500 font-sans mt-6"
                >
                  Every weave, seam, and detail is calculated. We utilize Italian circular knitting technology to deliver absolute seamlessness, combined with targeted high-compression panels that lift, shape, and support.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Pillars - Dynamic Theme-Aware Cards */}
        <section className="py-24 md:py-36 relative z-10 border-t border-b" style={{ borderColor: 'transparent' }}>
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-16 md:mb-24">
              <motion.span 
                style={{ color: textThemeColor }}
                className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold transition-colors duration-500"
              >
                Pillars of Aerth
              </motion.span>
              <motion.h3 
                style={{ color: textThemeColor }}
                className="text-2xl md:text-4xl font-extrabold uppercase tracking-widest mt-2 transition-colors duration-500"
              >
                The Three Forces
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
                  {/* Hover background highlight */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="space-y-6">
                    <motion.div 
                      style={{ color: textThemeColor }}
                      className="bg-white/10 p-3.5 rounded-2xl w-fit border border-white/20 transition-all duration-300 shadow-sm"
                    >
                      {pillar.icon}
                    </motion.div>
                    
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        {pillar.num}
                      </span>
                      <motion.h4 
                        style={{ color: textThemeColor }}
                        className="text-base md:text-lg font-bold uppercase tracking-wider transition-colors duration-500"
                      >
                        {pillar.title}
                      </motion.h4>
                    </div>
                  </div>

                  <motion.p 
                    style={{ color: textThemeColor }}
                    className="text-xs md:text-sm font-light leading-relaxed tracking-wide opacity-85 transition-colors duration-500"
                  >
                    {pillar.desc}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Showcase Section */}
        <section className="py-24 md:py-36 relative z-10 text-center flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 space-y-8">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-zinc-500 font-bold block"
            >
              The Next Evolution
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-6xl font-extrabold uppercase tracking-widest leading-tight text-white"
            >
              Experience The Difference
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-zinc-400 text-xs md:text-sm tracking-widest max-w-md mx-auto font-light leading-relaxed uppercase"
            >
              Discover pieces engineered with Italian seamless knitting and high-compression waistbands.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-4"
            >
              <Link 
                href="/shop" 
                className="inline-flex items-center gap-2 bg-white hover:bg-zinc-150 text-black font-bold text-xs uppercase tracking-widest px-10 py-5 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 rounded-xl"
              >
                Browse Collections
                <ArrowRight className="w-4 h-4 text-black" />
              </Link>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </motion.div>
  );
}
