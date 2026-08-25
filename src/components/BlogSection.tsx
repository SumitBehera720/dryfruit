'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, BookOpen, X, Share2, Sparkles } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  content: string[];
}

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts: BlogPost[] = [
    {
      id: 1,
      title: '7 Science-Backed Benefits of Soaking Mamra Almonds Overnight',
      category: 'Nutrition & Wellness',
      readTime: '4 min read',
      date: 'Aug 24, 2026',
      author: 'Dr. Alisha Sharma, Nutrition Specialist',
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/7d2f74bd-e0b5-4819-ac21-c3bfa725bd23.png',
      excerpt: 'Soaking raw almonds releases nutrient-inhibiting enzyme inhibitors, making Vitamin E, Magnesium, and Healthy Fats up to 3x more bioavailable.',
      content: [
        'Almonds are renowned worldwide as a daily brain booster and nutritional powerhouse. However, consuming them raw with their skin intact can limit optimal absorption due to naturally occurring phytic acid and enzyme inhibitors.',
        'Why Soaking Matters: Soaking Mamra Almonds overnight in pure filtered water neutralizes phytic acid, softens the outer brown skin for easy peeling, and activates digestive enzymes.',
        'Key Health Benefits of Daily Soaked Almonds:',
        '1. Enhanced Cognitive Clarity & Memory: Rich in L-carnitine and riboflavin, which support neural activity and memory retention.',
        '2. Controlled Blood Sugar & Energy: High magnesium levels regulate glucose metabolism without energy crashes.',
        '3. Youthful Skin & Hair Growth: Packed with natural Alpha-Tocopherol Vitamin E that fights cell oxidation.',
        'Pro Tip: Consume 5 to 7 soaked peeled Mamra almonds every morning on an empty stomach for maximum absorption.'
      ]
    },
    {
      id: 2,
      title: 'Kashmiri Mongra Kesar: The Golden Elixir for Immunity & Radiance',
      category: 'Herbal Remedies',
      readTime: '5 min read',
      date: 'Aug 20, 2026',
      author: 'Organic Traditions Culinary Team',
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/a2fc82bd-9691-489a-a82f-69518a23cf96.png',
      excerpt: 'Discover why authentic Kashmiri Saffron (Crocus Sativus) is prized globally for its intense aroma, crocin purity, and mood-boosting qualities.',
      content: [
        'Cultivated in the pristine valleys of Pampore, Kashmir, Mongra saffron represents the highest grade of saffron strands in the world. Characterized by deep crimson threads without yellow styles, it boasts unmatched crocin levels.',
        'Health & Culinary Highlights:',
        '• Mood & Serotonin Balance: Natural active compounds like safranal help alleviate stress and promote restful sleep.',
        '• Skin Radiance & Complexion: Used for centuries in Ayurvedic skincare formulations for evening skin tone and natural glow.',
        '• Immunity Booster: High concentrations of carotenoids protect against cellular oxidative stress.',
        'How to Prepare Saffron Elixir: Steep 3 to 4 threads of pure Mongra saffron in warm milk or herbal tea for 10 minutes to unleash its rich golden color and aroma.'
      ]
    },
    {
      id: 3,
      title: 'Smart Snacking: Building the Ultimate Daily Dry Fruit & Seed Mix',
      category: 'Healthy Lifestyle',
      readTime: '3 min read',
      date: 'Aug 18, 2026',
      author: 'Chef Rohan Mehta',
      image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/83979956-2864-4b17-956b-c1bcae5e8b51.jpg',
      excerpt: 'Ditch processed snacks. Learn how to combine raw nuts, seeds, dates, and berries for sustained daily endurance and gut health.',
      content: [
        'Mid-afternoon energy slumps are often caused by refined carbohydrates and artificial sugar spikes. Switching to a balanced dry fruit mix provides sustained energy through healthy fats and dietary fiber.',
        'The Golden Ratio for Daily Snacking:',
        '• 40% Raw Nuts: Almonds, Walnuts, and Pistachios for protein and brain health.',
        '• 30% Dried Fruits: Sun-dried Figs, Ajwa Dates, and Raisins for natural sweetness and iron.',
        '• 30% Seeds: Pumpkin, Chia, and Sunflower seeds for Zinc and Omega-3 balance.',
        'Store your custom trail mix in an airtight glass jar away from direct sunlight to preserve freshness and natural oils.'
      ]
    }
  ];

  return (
    <section id="blog" className="w-full bg-[#FFFDF9] py-16 md:py-24 font-sans text-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#C85A32] font-extrabold block">
              WELLNESS JOURNAL & RECIPES
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1E293B] font-serif">
              Latest From Our Blog
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-light max-w-lg">
              Explore expert nutrition guides, superfood recipes, and holistic health insights.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 border border-stone-200 text-xs font-semibold text-slate-700">
            <BookOpen className="w-4 h-4 text-[#C85A32]" />
            <span>Updated Weekly</span>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#C85A32] uppercase tracking-wider shadow-sm">
                  {post.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-slate-400 text-xs font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C85A32]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold font-serif text-slate-900 group-hover:text-[#C85A32] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs md:text-sm text-slate-600 font-light line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#C85A32] group-hover:translate-x-1 transition-transform">
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Read Article Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative p-6 sm:p-10 space-y-6"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-600 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="space-y-3 pr-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C85A32]/10 text-[#C85A32] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{selectedPost.category}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 leading-snug">
                    {selectedPost.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1 font-medium">
                      <User className="w-3.5 h-3.5 text-[#C85A32]" />
                      {selectedPost.author}
                    </span>
                    <span>•</span>
                    <span>{selectedPost.date}</span>
                    <span>•</span>
                    <span>{selectedPost.readTime}</span>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-inner bg-stone-100">
                  <Image
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content Paragraphs */}
                <div className="space-y-4 text-slate-700 text-sm md:text-base leading-relaxed font-light">
                  {selectedPost.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Modal Footer */}
                <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-6 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-700 font-semibold text-xs transition-colors"
                  >
                    Close Article
                  </button>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent('Check out this health guide: ' + selectedPost.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Article</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
