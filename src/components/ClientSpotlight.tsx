'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ClientSpotlight() {
  return (
    <section className="w-full bg-[#0c0c0c] text-white py-20 md:py-28 font-sans overflow-hidden border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-24 md:space-y-36">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-zinc-500 font-semibold">Editorial Feature</span>
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-widest mt-2">The Sculpt Collection</h2>
        </motion.div>

        {/* Spotlight 1: Classic Leggings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 relative aspect-[1.25/1] w-full rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl border border-zinc-800"
          >
            <Image 
              src="/images/client_leggings.jpg" 
              alt="AERTH Earthstone Plum & Obsidian Black Leggings"
              fill
              sizes="(max-w-1024px) 100vw, 60vw"
              className="object-cover object-center"
            />
          </motion.div>

          {/* Right Column: Text & Swatches */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">LEGENDARY CONTOUR</span>
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-white mt-2 leading-tight">
                Contour Leggings
              </h3>
            </div>
            
            <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed tracking-wider">
              A rich, grounded plum and deep obsidian black that moves with strength and intention. Timeless, powerful, and endlessly versatile design details crafted to elevate your form.
            </p>

            <div className="flex gap-3 items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Colors:</span>
              <div className="flex gap-2">
                <span className="w-5 h-5 rounded-full border border-white/20 bg-[#4A3546]" title="Earthstone Plum" />
                <span className="w-5 h-5 rounded-full border border-white/20 bg-[#181818]" title="Obsidian Black" />
              </div>
            </div>

            <div className="pt-2">
              <Link 
                href="/shop?category=leggings" 
                className="inline-block bg-white hover:bg-zinc-100 text-black font-bold text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Shop Leggings
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Spotlight 2: Aurora Flare Leggings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Text (Order 2 on mobile, Order 1 on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-6 order-2 lg:order-1"
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">FLARED FREEDOM</span>
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-white mt-2 leading-tight">
                Aurora Flare Leggings
              </h3>
            </div>
            
            <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed tracking-wider">
              Sculpted fit, flared freedom. Designed to move with grace and power. Features a double-layer high compression waistband for tummy control and support that transitions effortlessly from active to lifestyle wear.
            </p>

            <div className="flex gap-3 items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Colors:</span>
              <div className="flex gap-2">
                <span className="w-5 h-5 rounded-full border border-white/20 bg-[#181818]" title="Obsidian Black" />
              </div>
            </div>

            <div className="pt-2">
              <Link 
                href="/shop?category=leggings" 
                className="inline-block bg-white hover:bg-zinc-100 text-black font-bold text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Shop Flare Collection
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Image (Order 1 on mobile, Order 2 on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 relative aspect-[1.25/1] w-full rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl border border-zinc-800 order-1 lg:order-2"
          >
            <Image 
              src="/images/client_flare.jpg" 
              alt="AERTH Aurora Flare Leggings Editorial"
              fill
              sizes="(max-w-1024px) 100vw, 60vw"
              className="object-cover object-center"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
