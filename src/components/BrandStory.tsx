'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Smooth background parallax scaling
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1.0]);

  return (
    <section 
      id="about"
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[75vh] min-h-[450px] overflow-hidden flex items-center font-sans"
    >
      {/* Background Image Container */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY, scale: backgroundScale }}
      >
        <Image 
          src="/images/story_bg.png" 
          alt="AERTH Brand Story" 
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-black/45" />
      </motion.div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Glassmorphic Text Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 text-white max-w-lg shadow-2xl rounded-2xl"
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/70 font-semibold">
              Our Story
            </span>
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-white mt-3 leading-snug">
              Inspired by Air.
              <br />
              Grounded in Earth.
            </h2>
            <p className="text-zinc-300 text-xs md:text-sm mt-5 leading-relaxed tracking-wider font-light">
              Air represents freedom, energy, and possibility.
              <br className="hidden md:block" />
              Earth represents strength, stability, and resilience.
              <br className="hidden md:block" />
              Between these forces exists every movement we make, every challenge we face, and every goal we pursue. That balance is the foundation of AERTH.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
