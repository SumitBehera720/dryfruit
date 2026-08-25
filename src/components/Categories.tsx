'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Zap, Sun, Flame, Leaf } from 'lucide-react';

interface Category {
  title: string;
  subtitle: string;
  link: string;
  image: string;
  icon: React.ReactNode;
}

export default function Categories() {
  const categories: Category[] = [
    {
      title: 'Superfood Powders',
      subtitle: 'Beets & Berries, Beetroot & Cranberry',
      link: '/shop?category=superfood-powders',
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/7d2f74bd-e0b5-4819-ac21-c3bfa725bd23.png',
      icon: <Sparkles className="w-5 h-5 text-[#C85A32]" />
    },
    {
      title: 'Wellness Shots',
      subtitle: 'Ginger Turmeric Orange Shots',
      link: '/shop?category=wellness-shots',
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/86b23630-70dc-4217-84a2-bb05b849de48.png',
      icon: <Flame className="w-5 h-5 text-[#C85A32]" />
    },
    {
      title: 'Herbal Teas & Lattes',
      subtitle: 'Turmeric Ginger Golden Milk',
      link: '/shop?category=herbal-teas',
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/a2fc82bd-9691-489a-a82f-69518a23cf96.png',
      icon: <Sun className="w-5 h-5 text-[#C85A32]" />
    },
    {
      title: 'Smoothie Boosters',
      subtitle: 'Organic Celery & Kale Powders',
      link: '/shop?category=smoothie-boosters',
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/43deeea0-f7e9-4ddb-8a11-3fa466ef47da.png',
      icon: <Leaf className="w-5 h-5 text-[#C85A32]" />
    },
    {
      title: 'Seeds & Boosters',
      subtitle: 'Sprouted Fenugreek & Flax Seed',
      link: '/shop?category=seeds-boosters',
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/03fbf31b-61e4-45bc-8a22-e7a1c2f21ada.png',
      icon: <Zap className="w-5 h-5 text-[#C85A32]" />
    },
    {
      title: 'Dried Fruits & Snacks',
      subtitle: 'Wild Blueberries & Apple Bites',
      link: '/shop?category=dried-fruits',
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/83979956-2864-4b17-956b-c1bcae5e8b51.jpg',
      icon: <Heart className="w-5 h-5 text-[#C85A32]" />
    }
  ];

  return (
    <section className="w-full bg-[#FFFDF9] py-16 md:py-24 font-sans text-[#1E293B]">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10"
      >
        
        {/* Section Header */}
        <div className="mb-12 text-center space-y-2">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#C85A32] font-extrabold block">
            CANADIAN CLEAN-LABEL NUTRITION
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#1E293B] font-serif">
            Shop By Superfood Category
          </h2>
          <p className="text-xs md:text-sm text-slate-500 max-w-md mx-auto font-light tracking-wide">
            100% natural dehydrated fruit & vegetable powders for daily smoothies, juices, and recipes.
          </p>
        </div>

        {/* 6-Column Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {categories.map((cat) => (
            <Link 
              key={cat.title}
              href={cat.link}
              className="relative aspect-[3/5] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl group cursor-pointer block border border-stone-200/80 hover:border-[#C85A32]/60 transition-all duration-300"
            >
              {/* Category Image */}
              <div className="absolute inset-0">
                <Image 
                  src={cat.image} 
                  alt={cat.title} 
                  fill
                  sizes="(max-w-768px) 50vw, 16vw"
                  className="object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
              </div>

              {/* Category Icon Badge */}
              <div className="absolute top-3.5 left-3.5 bg-[#FFF5ED] backdrop-blur-md p-2 rounded-full border border-orange-200/80 opacity-90 group-hover:opacity-100 transition-all duration-300 shadow-sm">
                {cat.icon}
              </div>

              {/* Bottom Card Labels */}
              <div className="absolute inset-x-3 bottom-4 text-[#1E293B] flex flex-col items-center text-center">
                <h3 className="text-xs md:text-sm font-extrabold uppercase tracking-wider font-serif leading-snug">
                  {cat.title}
                </h3>
                <p className="text-[9px] text-[#C85A32] uppercase tracking-widest mt-1 font-bold opacity-90 transition-transform duration-300 group-hover:translate-y-[-2px] group-hover:opacity-100 line-clamp-2">
                  {cat.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
