'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, Calendar } from 'lucide-react';

interface JournalPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
}

export default function JournalSection() {
  const [posts, setPosts] = useState<JournalPost[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/journal')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (posts.length === 0) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % posts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [posts.length]);

  const handleNext = () => {
    if (posts.length === 0) return;
    setActiveIdx((prev) => (prev + 1) % posts.length);
  };

  const handlePrev = () => {
    if (posts.length === 0) return;
    setActiveIdx((prev) => (prev - 1 + posts.length) % posts.length);
  };

  if (loading || posts.length === 0) {
    return (
      <section id="journal" className="w-full bg-[#f9f9f9] text-black py-16 md:py-24 font-sans border-b border-zinc-200/60">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-center h-48">
            <div className="w-6 h-6 border-2 border-zinc-300 border-t-black rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  const current = posts[activeIdx];

  return (
    <section id="journal" className="w-full bg-[#f9f9f9] text-black py-16 md:py-24 font-sans overflow-hidden border-b border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-zinc-500 font-semibold">THE DIARY</span>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-black mt-2">AERTH Journal</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={handlePrev} className="p-2 border border-zinc-200 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer text-black" aria-label="Previous slide"><ArrowLeft className="w-4 h-4" /></button>
            <button onClick={handleNext} className="p-2 border border-zinc-200 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer text-black" aria-label="Next slide"><ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="relative bg-white border border-zinc-200/70 rounded-3xl p-8 md:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.06)] overflow-hidden">
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
              <div className="flex items-center gap-4 text-[10px] md:text-xs tracking-widest uppercase font-semibold text-zinc-500">
                <span className="bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-full text-zinc-700">{current.category}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(current.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-bold tracking-wide leading-snug text-black uppercase">{current.title}</h3>
              <p className="text-zinc-600 text-sm md:text-base font-light leading-relaxed tracking-wide">&ldquo;{current.excerpt}&rdquo;</p>
              <div className="pt-2 border-t border-zinc-100 w-fit">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 block">WRITTEN BY</span>
                <span className="text-xs font-bold uppercase text-black tracking-wider mt-0.5 block">{current.author}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
