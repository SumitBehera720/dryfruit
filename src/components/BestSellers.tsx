'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingBag, Check, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface BestSellerProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  label: string;
  category: string;
  categoryLabel: string;
  image: string;
  rating: number;
  reviewsCount: number;
  packSize: string;
}

const tenBestSellers: BestSellerProduct[] = [
  {
    id: 'prod_01KQK72S7DV29E6JXEGD8CK59G',
    slug: 'beets-and-berries-wellness-powder',
    name: 'Beets & Berries Wellness Powder',
    price: 849,
    originalPrice: 899,
    label: 'BESTSELLER',
    category: 'superfood-powders',
    categoryLabel: 'Superfood Powder',
    image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/7d2f74bd-e0b5-4819-ac21-c3bfa725bd23.png',
    rating: 4.9,
    reviewsCount: 142,
    packSize: '100g Pouch',
  },
  {
    id: 'prod_01KQK72S76K300GRQ38ADXSED3',
    slug: 'ginger-turmeric-orange-wellness-shots',
    name: 'Ginger Turmeric Orange Shot Powder',
    price: 699,
    originalPrice: 749,
    label: 'IMMUNITY SHOTS',
    category: 'wellness-shots',
    categoryLabel: 'Wellness Shots',
    image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/86b23630-70dc-4217-84a2-bb05b849de48.png',
    rating: 4.9,
    reviewsCount: 118,
    packSize: '70g Jar',
  },
  {
    id: 'prod_01KQK72S7Y3RTM6F3QP8N3FFD8',
    slug: 'wild-blueberry-powder-raw-unsweetened',
    name: 'Wild Blueberry Powder Raw Unsweetened',
    price: 949,
    originalPrice: 999,
    label: 'BRAIN SUPPORT',
    category: 'superfood-powders',
    categoryLabel: 'Superberry Powder',
    image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/34f19c4e-c99c-4368-b41c-23aac91a46d6.jpg',
    rating: 4.9,
    reviewsCount: 96,
    packSize: '100g Pouch',
  },
  {
    id: 'prod_01KQK72S7KJM6EJAJJ1PEC7VAV',
    slug: 'celery-powder-dehydrated',
    name: 'Organic Celery Powder Dehydrated',
    price: 599,
    originalPrice: 649,
    label: 'DETOX & CLEANSE',
    category: 'smoothie-boosters',
    categoryLabel: 'Smoothie Booster',
    image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/43deeea0-f7e9-4ddb-8a11-3fa466ef47da.png',
    rating: 4.8,
    reviewsCount: 84,
    packSize: '80g Pouch',
  },
  {
    id: 'prod_01KQK72SGF9MCTHYA0CZNR1PH6',
    slug: 'organic-cinnamon-apples-40g',
    name: 'Apple Cinnamon Bites',
    price: 399,
    originalPrice: 449,
    label: 'CHEWY SNACK',
    category: 'dried-fruits',
    categoryLabel: 'Dried Fruits',
    image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/83979956-2864-4b17-956b-c1bcae5e8b51.jpg',
    rating: 4.9,
    reviewsCount: 165,
    packSize: '40g Pouch',
  },
  {
    id: 'prod_01KQK72SG3VCMKCQMX2HFGZ3VD',
    slug: 'turmeric-ginger-black-pepper-latte-mix-40-cups-70g-246oz',
    name: 'Turmeric Ginger Superfood Blend',
    price: 699,
    originalPrice: 749,
    label: 'GOLDEN LATTE',
    category: 'herbal-teas',
    categoryLabel: 'Herbal Tea',
    image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/a2fc82bd-9691-489a-a82f-69518a23cf96.png',
    rating: 4.8,
    reviewsCount: 72,
    packSize: '70g Jar',
  },
  {
    id: 'prod_01KQK72SC0HZVSHKHTRJNDD0CN',
    slug: 'beetroot-powder-raw',
    name: 'Organic Beetroot Powder',
    price: 649,
    originalPrice: 699,
    label: 'NITRATE BOOST',
    category: 'superfood-powders',
    categoryLabel: 'Superfood Powder',
    image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/05407492-606f-4d8f-8de4-33ac851dc01d.jpg',
    rating: 4.8,
    reviewsCount: 58,
    packSize: '100g Pouch',
  },
  {
    id: 'prod_01KQK72SCHM2JCESFFWJ2QHPDY',
    slug: 'dried-orange-slices-60g',
    name: 'Dried Orange Slices',
    price: 499,
    originalPrice: 549,
    label: 'CITRUS GARNISH',
    category: 'dried-fruits',
    categoryLabel: 'Dried Fruits',
    image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/c96e1a95-6f92-402f-8dfc-c8c853ba28e2.jpg',
    rating: 4.9,
    reviewsCount: 210,
    packSize: '60g Pouch',
  },
  {
    id: 'prod_01KQK72SFXS78NAK0JE3A0Y2VM',
    slug: 'dried-organic-apple-rings-slices-no-sugar-added-perfect-for-the-entire-family-made-in-canada',
    name: 'Just Apples Dried Apple Slices',
    price: 449,
    originalPrice: 499,
    label: 'NO ADDED SUGAR',
    category: 'dried-fruits',
    categoryLabel: 'Dried Fruits',
    image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/f2af55ca-3dd2-46c9-9c8d-579f4073a127.jpg',
    rating: 4.8,
    reviewsCount: 134,
    packSize: '50g Pouch',
  },
  {
    id: 'prod_01KQK72S3T7CHH8S1QSQPKJ9Y2',
    slug: 'canadian-wild-blueberries-dehydrated',
    name: 'Wild Blueberry Dehydrated Chewy',
    price: 899,
    originalPrice: 949,
    label: 'CANADIAN WILD',
    category: 'dried-fruits',
    categoryLabel: 'Dried Fruits',
    image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/182aadd4-eb63-440c-9532-1c52154d6c44.png',
    rating: 4.9,
    reviewsCount: 189,
    packSize: '100g Pouch',
  },
];

const categoryTabs = [
  { id: 'ALL', label: 'ALL BEST SELLERS' },
  { id: 'superfood-powders', label: 'SUPERFOOD POWDERS' },
  { id: 'wellness-shots', label: 'WELLNESS SHOTS' },
  { id: 'herbal-teas', label: 'HERBAL LATTES & TEAS' },
  { id: 'dried-fruits', label: 'DRIED FRUIT SNACKS' },
];

export default function BestSellers() {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('ALL');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredProducts = activeTab === 'ALL'
    ? tenBestSellers
    : tenBestSellers.filter((p) => p.category === activeTab);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };

  const handleAddToCart = (product: BestSellerProduct) => {
    addToCart({
      id: `${product.slug}-${product.packSize.toLowerCase().replace(/\s+/g, '-')}`,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.packSize,
      size: product.packSize,
    });
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#FFFDF9] py-16 md:py-24 font-sans text-[#1E293B] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#C85A32] font-extrabold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
              MOST POPULAR CLEAN-LABEL FORMULAS
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#1E293B] font-serif">
              Explore Best Sellers
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-white border border-stone-200/80 hover:border-[#C85A32] shadow-sm flex items-center justify-center text-[#1E293B] hover:text-[#C85A32] transition-all cursor-pointer"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-white border border-stone-200/80 hover:border-[#C85A32] shadow-sm flex items-center justify-center text-[#1E293B] hover:text-[#C85A32] transition-all cursor-pointer"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-navigation Tabs Bar */}
        <div className="border-b border-stone-200/80 mb-10 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-6 md:gap-8 pb-3 min-w-max">
            {categoryTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-xs md:text-sm uppercase tracking-widest transition-all duration-200 pb-2 border-b-2 font-sans ${
                    isActive
                      ? 'text-[#C85A32] font-extrabold border-[#C85A32]'
                      : 'text-slate-400 border-transparent hover:text-slate-700 font-medium'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Side-by-Side Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-6 pt-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const isAdded = addedItem === product.id;

            return (
              <div
                key={product.id}
                className="w-[300px] sm:w-[330px] md:w-[350px] flex-shrink-0 snap-start group relative bg-white rounded-3xl border border-stone-200/80 hover:border-[#C85A32]/60 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Badge & Wishlist Heart */}
                <div className="absolute top-4 inset-x-4 flex justify-between items-center z-20">
                  <span className="bg-[#C85A32] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-lg shadow-sm">
                    {product.label}
                  </span>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-200 transition-all shadow-md"
                    aria-label="Add to wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                {/* Product Image Container (Bigger high-impact image display) */}
                <Link href={`/product/${product.slug}`} className="relative aspect-square w-full bg-gradient-to-b from-[#FFF5ED]/60 to-[#FFFDF9] overflow-hidden block p-2 pt-10">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="350px"
                    className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-md"
                  />
                </Link>

                {/* Card Info & Details */}
                <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2">
                    {/* Category Pill & Rating */}
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 uppercase tracking-widest font-extrabold text-[10px]">
                        {product.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1 text-[#D97706] font-extrabold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{product.rating}</span>
                        <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Title */}
                    <Link href={`/product/${product.slug}`} className="block group-hover:text-[#C85A32] transition-colors">
                      <h3 className="text-lg font-extrabold uppercase tracking-wide text-[#1E293B] font-serif leading-snug line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                  </div>

                  {/* Pack Size & Pricing */}
                  <div className="flex justify-between items-end pt-3 border-t border-stone-100">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                        {product.packSize}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-[#1E293B]">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`px-5 py-3 rounded-xl font-extrabold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-md ${
                        isAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#C85A32] hover:bg-[#B04C27] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" /> Added
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" /> Add
                        </>
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
