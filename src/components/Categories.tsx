'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Category {
  title: string;
  subtitle: string;
  image: string;
  icon: React.ReactNode;
}

export default function Categories() {
  const categories: Category[] = [
    {
      title: 'Training',
      subtitle: 'Push your limits',
      image: '/images/cat_training.png',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      )
    },
    {
      title: 'Running',
      subtitle: 'Find your pace',
      image: '/images/cat_running.png',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A3 3 0 0118 4.817M15.362 5.214v3.6M15.362 5.214L18 8.1M18 4.817A3 3 0 0118 8.1M18 4.817v3.283M18 8.1l-1.5 1.5M16.5 9.6v4.35a3 3 0 01-1.317 2.474l-2.683 1.838a3 3 0 01-3.6-.283l-1.4-1.4M16.5 9.6l-2-2M14.5 7.6v2M14.5 7.6L12.5 5.6M12.5 5.6h-2.5M12.5 5.6V3" />
        </svg>
      )
    },
    {
      title: 'Yoga',
      subtitle: 'Center your mind',
      image: '/images/cat_yoga.png',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.75 9.75 0 006.74-2.74L18 17.5a9.75 9.75 0 00-12 0l-.74.76A9.75 9.75 0 0012 21zM12 3a3 3 0 100 6 3 3 0 000-6z" />
        </svg>
      )
    },
    {
      title: 'Outdoor',
      subtitle: 'Explore more',
      image: '/images/cat_outdoor.png',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l3.12 2.6c.465.387.498 1.096.068 1.522l-1.92 1.905c-.328.326-.777.49-1.236.452l-2.825-.235a1.5 1.5 0 00-1.246.495l-3.3 3.7a1.5 1.5 0 01-2.188.08L2.25 12" />
        </svg>
      )
    },
    {
      title: 'Lifestyle',
      subtitle: 'Live in comfort',
      image: '/images/cat_lifestyle.png',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full bg-[#f9f9f9] py-16 md:py-24 font-sans text-black">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 md:px-8"
      >
        
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-black">
            Made For Every Moment
          </h2>
          <div className="h-[2px] w-12 bg-black mt-3" />
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.title}
              className="relative aspect-[4/6] bg-zinc-800 rounded-xl overflow-hidden shadow-md group cursor-pointer"
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image 
                  src={cat.image} 
                  alt={cat.title} 
                  fill
                  sizes="(max-w-768px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300 group-hover:opacity-85" />
              </div>

              {/* Icon Overlay (top center/left) */}
              <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm p-2 rounded-full border border-white/15 opacity-80 group-hover:opacity-100 group-hover:bg-white/20 transition-all duration-300">
                {cat.icon}
              </div>

              {/* Text Bottom Content */}
              <div className="absolute inset-x-4 bottom-5 text-white flex flex-col items-center text-center">
                <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                  {cat.title}
                </h3>
                <p className="text-[9px] md:text-[10px] text-zinc-300 uppercase tracking-widest mt-1 font-light opacity-80 transition-transform duration-500 group-hover:translate-y-[-2px] group-hover:opacity-100">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
