'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  image: string;
  link: string;
}

export default function InstagramGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/instagram')
      .then(async (res) => res.ok ? res.json() : [])
      .then((data: GalleryItem[]) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-24 text-center bg-[#080808] border-t border-zinc-900">
        <div className="flex flex-col items-center gap-3">
          <span className="w-6 h-6 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
            Loading Gallery...
          </p>
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="w-full bg-[#080808] py-20 md:py-28 border-t border-zinc-900 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="text-center space-y-4">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-zinc-500 font-extrabold block">
            #AERTHINMOTION
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-white leading-none">
            INSTAGRAM FEED
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm tracking-wider max-w-md mx-auto font-light leading-relaxed uppercase">
            Join the community. Tag us wearing your premium gear to get featured.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white border-b border-zinc-700 hover:border-white pb-1 transition-all"
          >
            Follow @aerth.sportswear
          </a>
        </div>
      </div>

      {/* Styled Grid Cards */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.slice(0, 8).map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden group block cursor-pointer bg-zinc-950 rounded-2xl border border-zinc-900 hover:border-zinc-800 shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt="Instagram community post"
                fill
                sizes="(max-w-768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Premium Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] flex flex-col justify-between p-5 md:p-6">
                
                {/* Overlay Header */}
                <div className="flex justify-between items-center transform translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-300">
                    @aerth
                  </span>
                  <svg className="w-3.5 h-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>

                {/* Overlay Center Icon */}
                <div className="self-center bg-white/10 backdrop-blur-md p-3.5 rounded-full border border-white/10 scale-75 group-hover:scale-100 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>

                {/* Overlay Footer */}
                <span className="text-[10px] font-bold uppercase tracking-widest text-white self-start flex items-center gap-1 transform translate-y-[10px] group-hover:translate-y-0 transition-transform duration-300">
                  Shop Look
                  <svg className="w-3 h-3 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
