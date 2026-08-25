'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StoryData {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
}

export default function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const [storyData, setStoryData] = useState<StoryData | null>(null);

  useEffect(() => {
    fetch('/api/content?page=home')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: unknown) => {
        if (Array.isArray(data)) {
          const found = data.find((item: { section?: string }) => item.section === 'brand_story' || item.section === 'story');
          if (found) {
            setStoryData(found);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Smooth background parallax scaling
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1.0]);

  const bgImage = storyData?.image || '/images/story_bg.png';
  const subtitle = storyData?.subtitle || 'Our Promise';
  const title = storyData?.title || 'Nurtured by Nature.\nDelivered Pure.';
  const description = storyData?.description || 'We source directly from certified organic orchards across California, Kashmir, Arabia, and Iran to deliver farm-fresh dry fruits with zero additives or preservatives.';

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
          src={bgImage} 
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
              {subtitle}
            </span>
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-white mt-3 leading-snug whitespace-pre-line">
              {title}
            </h2>
            <p className="text-zinc-300 text-xs md:text-sm mt-5 leading-relaxed tracking-wider font-light whitespace-pre-line">
              {description}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

