'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, Calendar } from 'lucide-react';

interface JournalPost {
  title: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
}

export default function JournalSection() {
  const posts: JournalPost[] = [
    {
      title: "Finding Balance: Between Air and Earth",
      excerpt: "How mindfulness and high-compression support transformed my morning yoga routine and mental stability.",
      author: "Priya Sharma",
      category: "Mindfulness",
      date: "June 25, 2026"
    },
    {
      title: "Chasing Pace: Half-Marathon Training Essentials",
      excerpt: "Our runners break down the optimal fit of flare leggings and moisture-wicking bras over long-distance routes.",
      author: "Jessica Mercer",
      category: "Running",
      date: "June 18, 2026"
    },
    {
      title: "Brutalist Architecture & High-Fashion Activewear",
      excerpt: "Exploring the aesthetic inspiration behind our latest colorways, concrete structures, and seamless silhouettes.",
      author: "AERTH Design Lab",
      category: "Design",
      date: "May 29, 2026"
    },
    {
      title: "The Evolution of Seamless Activewear Knitwear",
      excerpt: "How engineered knitting technology achieves zero friction, double density stretch, and structural panels without sewing seams.",
      author: "Dr. Elena Rostova",
      category: "Technology",
      date: "April 14, 2026"
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % posts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [posts.length]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % posts.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const current = posts[activeIdx];

  return (
    <section id="journal" className="w-full bg-[#f9f9f9] text-black py-16 md:py-24 font-sans overflow-hidden border-b border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-zinc-500 font-semibold">THE DIARY</span>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-black mt-2">AERTH Journal</h2>
          </div>
          
          {/* Slider controls */}
          <div className="flex gap-2">
            <button 
              onClick={handlePrev}
              className="p-2 border border-zinc-250 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer text-black"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNext}
              className="p-2 border border-zinc-250 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer text-black"
              aria-label="Next slide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Slider */}
        <div className="relative bg-white border border-zinc-200/70 rounded-3xl p-8 md:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.06)] overflow-hidden">
          
          {/* Quote mark decorator */}
          <Quote className="absolute right-8 bottom-8 w-32 h-32 text-zinc-100/50 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl space-y-6"
            >
              {/* Category & Date */}
              <div className="flex items-center gap-4 text-[10px] md:text-xs tracking-widest uppercase font-semibold text-zinc-550">
                <span className="bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-full text-zinc-700">
                  {current.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {current.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-4xl font-bold tracking-wide leading-snug text-black uppercase">
                {current.title}
              </h3>

              {/* Excerpt */}
              <p className="text-zinc-600 text-sm md:text-base font-light leading-relaxed tracking-wide">
                &ldquo;{current.excerpt}&rdquo;
              </p>

              {/* Author */}
              <div className="pt-2 border-t border-zinc-100 w-fit">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 block">WRITTEN BY</span>
                <span className="text-xs font-bold uppercase text-black tracking-wider mt-0.5 block">
                  {current.author}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
