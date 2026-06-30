'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const images = [
    '/images/hero_bg.png',
    '/images/hero_bg_alt.png'
  ];

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] min-h-[600px] bg-zinc-950 overflow-hidden flex items-center">
      
      {/* Slideshow background with crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeImageIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image 
              src={images[activeImageIdx]} 
              alt="AERTH Sportswear Slide" 
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.7]"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent z-10" />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 relative z-20 grid grid-cols-1 md:grid-cols-2">
        
        {/* Left text content */}
        <div className="text-white flex flex-col justify-center space-y-6 md:space-y-8 pl-0 md:pl-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="h-[1px] w-8 bg-white/60" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/95 font-medium font-sans">
              Built Between Air and Earth.
            </span>
          </motion.div>

          <div className="space-y-1.5 md:space-y-3">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-white leading-[0.95]"
            >
              Made For
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold uppercase tracking-widest text-white leading-[0.95] font-sans"
            >
              Movement.
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-xs md:text-sm text-zinc-300 max-w-sm tracking-wide leading-relaxed"
          >
            Performance apparel that moves with you.
            <br />
            Breathe freely. Stand firm. Progress always.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button className="bg-white text-black hover:bg-zinc-100 font-bold text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl">
              Shop Women
            </button>
            <button className="border border-white/80 hover:border-white hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300">
              Explore Collections
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
