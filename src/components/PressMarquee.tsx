'use client';

import React from 'react';

export default function PressMarquee() {
  const brands = [
    'VOGUE',
    'GQ MAGAZINE',
    'HARPER\'S BAZAAR',
    'ELLE',
    'MEN\'S HEALTH',
    'RUNNER\'S WORLD'
  ];

  return (
    <section className="w-full bg-[#0c0c0c] border-b border-zinc-900 py-8 overflow-hidden relative font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-4 text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 font-semibold">AS SEEN IN</p>
      </div>

      {/* Scrolling Marquee Container */}
      <div className="flex w-full select-none overflow-hidden relative">
        {/* Double wrapper to loop seamlessly */}
        <div className="flex w-max animate-infinite-scroll py-2 gap-12 md:gap-24 text-zinc-600 font-extrabold text-sm md:text-lg tracking-[0.3em] uppercase">
          {brands.map((b, idx) => (
            <span key={idx} className="hover:text-zinc-400 transition-colors cursor-default whitespace-nowrap">
              {b}
            </span>
          ))}
          {/* Duplicate for infinite loop */}
          {brands.map((b, idx) => (
            <span key={`dup-${idx}`} className="hover:text-zinc-400 transition-colors cursor-default whitespace-nowrap">
              {b}
            </span>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
