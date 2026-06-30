'use client';

import React from 'react';

export default function TrustBadges() {
  const badges = [
    {
      title: 'Squat Proof',
      desc: 'Confidence in every move',
      icon: (
        <svg className="w-6 h-6 stroke-current text-white/90" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    },
    {
      title: 'Seamless Comfort',
      desc: 'Feels like a second skin',
      icon: (
        <svg className="w-6 h-6 stroke-current text-white/90" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v18" />
          <path d="M3 12h18" />
          <path d="m18 8-3-3-3 3" />
          <path d="m6 16 3 3 3-3" />
          <path d="M5 8c2.5 0 2.5 8 5 8s2.5-8 5-8 2.5 8 5 8" />
        </svg>
      )
    },
    {
      title: 'Shape & Support',
      desc: 'Designed to sculpt',
      icon: (
        <svg className="w-6 h-6 stroke-current text-white/90" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" />
          <path d="M17 14c-1.5 2-3.5 3-5 3s-3.5-1-5-3c-1 3-1 6 0 8h10c1-2 1-5 0-8z" />
        </svg>
      )
    },
    {
      title: 'Built to Last',
      desc: 'Performance that endures',
      icon: (
        <svg className="w-6 h-6 stroke-current text-white/90" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="6 3 18 3 21 8 12 21 3 8 6 3" />
          <path d="M3 8h18" />
          <path d="M12 3v18" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full bg-[#0c0c0c] border-b border-zinc-900 py-6 md:py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-x-0 lg:divide-x divide-zinc-800">
        {badges.map((badge, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-4 px-2 md:px-6 transition-all duration-300 hover:translate-y-[-2px] group"
          >
            <div className="bg-zinc-900 p-3 rounded-full border border-zinc-800 group-hover:bg-zinc-800 transition-colors duration-300">
              {badge.icon}
            </div>
            <div>
              <h3 className="text-white font-semibold text-xs md:text-sm tracking-widest uppercase">
                {badge.title}
              </h3>
              <p className="text-[10px] md:text-xs text-zinc-400 mt-0.5 tracking-wider font-light">
                {badge.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
