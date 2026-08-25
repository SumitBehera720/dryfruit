'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Volume2, VolumeX, ShoppingBag, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CommunityReel {
  id: string;
  caption: string;
  creator: string;
  poster: string;
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
    size: string;
  };
}

const tenCommunityReels: CommunityReel[] = [
  {
    id: 'r1',
    caption: 'Beets & Berries Morning Smoothie Ritual 🍓',
    creator: '@organickitchen',
    poster: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/7d2f74bd-e0b5-4819-ac21-c3bfa725bd23.png',
    product: {
      id: 'prod_01KQK72S7DV29E6JXEGD8CK59G',
      slug: 'beets-and-berries-wellness-powder',
      name: 'Beets & Berries Wellness Powder',
      price: 849,
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/7d2f74bd-e0b5-4819-ac21-c3bfa725bd23.png',
      size: '100g Pouch',
    },
  },
  {
    id: 'r2',
    caption: 'Instant Daily Immunity Shot with Ginger & Turmeric Orange 🍊',
    creator: '@nutritionwithsarah',
    poster: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/86b23630-70dc-4217-84a2-bb05b849de48.png',
    product: {
      id: 'prod_01KQK72S76K300GRQ38ADXSED3',
      slug: 'ginger-turmeric-orange-wellness-shots',
      name: 'Ginger Turmeric Orange Shot',
      price: 699,
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/86b23630-70dc-4217-84a2-bb05b849de48.png',
      size: '70g Jar',
    },
  },
  {
    id: 'r3',
    caption: 'Canadian Wild Blueberry Brain & Memory Booster Shake 🫐',
    creator: '@wellnessgal',
    poster: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/34f19c4e-c99c-4368-b41c-23aac91a46d6.jpg',
    product: {
      id: 'prod_01KQK72S7Y3RTM6F3QP8N3FFD8',
      slug: 'wild-blueberry-powder-raw-unsweetened',
      name: 'Wild Blueberry Powder',
      price: 949,
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/34f19c4e-c99c-4368-b41c-23aac91a46d6.jpg',
      size: '100g Pouch',
    },
  },
  {
    id: 'r4',
    caption: 'How I replace 1 hour of celery juicing with 1 tsp Organic Celery Powder 🥬',
    creator: '@baristajoe',
    poster: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/43deeea0-f7e9-4ddb-8a11-3fa466ef47da.png',
    product: {
      id: 'prod_01KQK72S7KJM6EJAJJ1PEC7VAV',
      slug: 'celery-powder-dehydrated',
      name: 'Organic Celery Powder',
      price: 599,
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/43deeea0-f7e9-4ddb-8a11-3fa466ef47da.png',
      size: '80g Pouch',
    },
  },
  {
    id: 'r5',
    caption: 'Organic Cinnamon Apple Bites Chewy Afternoon Snack 🍎',
    creator: '@rawchef_alex',
    poster: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/83979956-2864-4b17-956b-c1bcae5e8b51.jpg',
    product: {
      id: 'prod_01KQK72SGF9MCTHYA0CZNR1PH6',
      slug: 'organic-cinnamon-apples-40g',
      name: 'Apple Cinnamon Bites',
      price: 399,
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/83979956-2864-4b17-956b-c1bcae5e8b51.jpg',
      size: '40g Pouch',
    },
  },
  {
    id: 'r6',
    caption: 'Golden Milk Turmeric Ginger Evening Comfort Latte ☕',
    creator: '@mindfulliving',
    poster: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/a2fc82bd-9691-489a-a82f-69518a23cf96.png',
    product: {
      id: 'prod_01KQK72SG3VCMKCQMX2HFGZ3VD',
      slug: 'turmeric-ginger-black-pepper-latte-mix-40-cups-70g-246oz',
      name: 'Turmeric Ginger Latte Mix',
      price: 699,
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/a2fc82bd-9691-489a-a82f-69518a23cf96.png',
      size: '70g Jar',
    },
  },
  {
    id: 'r7',
    caption: 'Pure Pomegranate Powder Antioxidant Dressing & Smoothie 🍹',
    creator: '@skincarebio',
    poster: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/4fe5eb9e-13f1-4b28-a2af-6d74b894f3a8.jpg',
    product: {
      id: 'prod_01KQK72S33JMX89EFDT9RMN8GW',
      slug: 'pomegranate-powder',
      name: 'Pomegranate Powder',
      price: 799,
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/4fe5eb9e-13f1-4b28-a2af-6d74b894f3a8.jpg',
      size: '100g Pouch',
    },
  },
  {
    id: 'r8',
    caption: 'Ginger Beet Workout Hydration & Nitric Oxide Boost 🏋️‍♂️',
    creator: '@athletepower',
    poster: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/a079bd5c-c859-4c5a-b6fd-10c816061a69.png',
    product: {
      id: 'prod_01KQK72S3HEVYR9AXWRQ0M28E7',
      slug: 'ginger-beet-wellness-powder',
      name: 'Ginger Beet Wellness Powder',
      price: 799,
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/a079bd5c-c859-4c5a-b6fd-10c816061a69.png',
      size: '100g Pouch',
    },
  },
  {
    id: 'r9',
    caption: 'Dehydrated Whole Orange Slices Garnish & Herbal Infusions 🍊',
    creator: '@sweetwithoutguilt',
    poster: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/c96e1a95-6f92-402f-8dfc-c8c853ba28e2.jpg',
    product: {
      id: 'prod_01KQK72SCHM2JCESFFWJ2QHPDY',
      slug: 'dried-orange-slices-60g',
      name: 'Dried Orange Slices',
      price: 499,
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/c96e1a95-6f92-402f-8dfc-c8c853ba28e2.jpg',
      size: '60g Pouch',
    },
  },
  {
    id: 'r10',
    caption: 'Wild Canadian Blueberries Chewy Snack Bowl 🫐',
    creator: '@organicbites',
    poster: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/182aadd4-eb63-440c-9532-1c52154d6c44.png',
    product: {
      id: 'prod_01KQK72S3T7CHH8S1QSQPKJ9Y2',
      slug: 'canadian-wild-blueberries-dehydrated',
      name: 'Wild Blueberry Chewy',
      price: 899,
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/182aadd4-eb63-440c-9532-1c52154d6c44.png',
      size: '100g Pouch',
    },
  },
];

export default function ShoppableVideos() {
  const { addToCart } = useCart();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [mutedStates, setMutedStates] = useState<Record<string, boolean>>({});
  const [addedItem, setAddedItem] = useState<string | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef<boolean>(false);
  const animTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMute = (id: string) => {
    setMutedStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleQuickAdd = (p: CommunityReel['product']) => {
    addToCart({
      id: `${p.slug}-${p.size.toLowerCase()}`,
      name: p.name,
      price: p.price,
      image: p.image,
      color: p.size,
      size: p.size,
    });
    setAddedItem(p.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const scrollToIndex = useCallback((index: number) => {
    if (scrollContainerRef.current) {
      isAnimatingRef.current = true;
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);

      const container = scrollContainerRef.current;
      const card = container.children[index] as HTMLElement;
      if (card) {
        const scrollLeft = card.offsetLeft - (container.clientWidth / 2 - card.clientWidth / 2);
        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: 'smooth',
        });
      }

      animTimeoutRef.current = setTimeout(() => {
        isAnimatingRef.current = false;
      }, 400);
    }
  }, []);

  const handleScroll = () => {
    if (isAnimatingRef.current) return;

    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const centerPosition = container.scrollLeft + container.clientWidth / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      Array.from(container.children).forEach((child, index) => {
        const card = child as HTMLElement;
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(centerPosition - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    }
  };

  const handlePrev = () => {
    const newIdx = (activeIndex - 1 + tenCommunityReels.length) % tenCommunityReels.length;
    setActiveIndex(newIdx);
    scrollToIndex(newIdx);
  };

  const handleNext = () => {
    const newIdx = (activeIndex + 1) % tenCommunityReels.length;
    setActiveIndex(newIdx);
    scrollToIndex(newIdx);
  };

  return (
    <section className="w-full bg-[#FFFDF9] py-16 md:py-24 font-sans text-[#1E293B] relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#C85A32]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#C85A32] font-extrabold block">
              COMMUNITY RECIPES & REELS
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#1E293B] font-serif">
              Community Powered Inspiration
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white border border-stone-200/80 hover:border-[#C85A32] shadow-sm flex items-center justify-center text-[#1E293B] hover:text-[#C85A32] transition-all cursor-pointer"
              aria-label="Previous reel"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white border border-stone-200/80 hover:border-[#C85A32] shadow-sm flex items-center justify-center text-[#1E293B] hover:text-[#C85A32] transition-all cursor-pointer"
              aria-label="Next reel"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-8 px-4 transform-gpu"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tenCommunityReels.map((reel, index) => {
            const isCenter = index === activeIndex;
            const isMuted = mutedStates[reel.id] ?? true;
            const isAdded = addedItem === reel.product.id;

            return (
              <div 
                key={reel.id}
                onClick={() => {
                  setActiveIndex(index);
                  scrollToIndex(index);
                }}
                className={`w-[270px] sm:w-[290px] md:w-[320px] flex-shrink-0 snap-center relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-out will-change-transform transform-gpu flex flex-col justify-between ${
                  isCenter 
                    ? 'aspect-[9/16] scale-105 -translate-y-2 z-30 shadow-2xl ring-4 ring-[#C85A32] border-2 border-[#C85A32] bg-white' 
                    : 'aspect-[9/15] scale-95 opacity-80 hover:opacity-100 hover:scale-100 border border-stone-200/80 shadow-sm bg-white'
                }`}
              >
                {/* Full-bleed Video/Photo Poster */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={reel.poster}
                    alt={reel.caption}
                    fill
                    sizes="340px"
                    className={`object-contain p-2 transition-transform duration-500 ${isCenter ? 'scale-110 brightness-100' : 'brightness-90 hover:scale-105'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10" />
                </div>

                {/* Top Overlay */}
                <div className="relative z-20 p-4 flex justify-between items-center">
                  {isCenter ? (
                    <span className="bg-[#C85A32] text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-md shadow-md">
                      FEATURED REEL
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold text-white/90 uppercase tracking-widest bg-black/50 px-2.5 py-0.5 rounded-md backdrop-blur-md">
                      {reel.creator}
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute(reel.id);
                    }}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#C85A32] transition-all cursor-pointer shadow-md"
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? (
                      <VolumeX className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 text-[#C85A32]" />
                    )}
                  </button>
                </div>

                {/* Bottom Overlay with Clickable Product Link */}
                <div className="relative z-20 p-4 space-y-3">
                  <p className="text-xs md:text-sm font-semibold text-white tracking-wide font-sans leading-snug drop-shadow-md line-clamp-2 bg-black/50 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                    {reel.caption}
                  </p>

                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-white/90 shadow-xl flex items-center justify-between gap-3 group/prod">
                    
                    {/* Clickable Product Detail Link */}
                    <Link 
                      href={`/product/${reel.product.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-3 min-w-0 flex-1 group-hover/prod:opacity-90 transition-opacity"
                    >
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-stone-200/80 bg-[#FFF5ED] shadow-sm">
                        <Image 
                          src={reel.product.image} 
                          alt={reel.product.name} 
                          fill 
                          className="object-contain p-1 transition-transform group-hover/prod:scale-110"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-extrabold uppercase tracking-wider text-[#1E293B] truncate group-hover/prod:text-[#C85A32] transition-colors">
                          {reel.product.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-extrabold text-[#C85A32]">
                            ₹{reel.product.price}
                          </span>
                          <span className="text-[9px] text-slate-400 font-semibold uppercase">
                            {reel.product.size}
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Quick Add Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickAdd(reel.product);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center flex-shrink-0 shadow-md ${
                        isAdded 
                          ? 'bg-emerald-700 text-white' 
                          : 'bg-[#C85A32] hover:bg-[#B04C27] text-white'
                      }`}
                      aria-label="Add product to cart"
                    >
                      {isAdded ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <ShoppingBag className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
