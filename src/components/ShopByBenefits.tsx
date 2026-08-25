'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, ShieldCheck, Heart, Sparkles, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

interface BenefitCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  badge: string;
  recommended: string[];
  keyPerks: string[];
  shopUrl: string;
}

export default function ShopByBenefits() {
  const [activeTab, setActiveTab] = useState<string>('brain');

  const benefits: BenefitCategory[] = [
    {
      id: 'brain',
      title: 'Brain Power & Focus',
      subtitle: 'Sharpen memory, mental clarity & cognitive focus with essential Omega-3 & Vitamin E.',
      icon: <Brain className="w-6 h-6 text-amber-600" />,
      gradient: 'from-amber-500/10 via-orange-500/5 to-amber-500/10 border-amber-200/80',
      badge: 'Cognitive Wellness',
      recommended: ['Mamra Almonds', 'Chilean Walnuts', 'Pure Mongra Saffron'],
      keyPerks: ['Rich in DHA & Omega-3 Fatty Acids', 'Boosts Concentration & Synaptic Health', 'Reduces Stress & Mental Fatigue'],
      shopUrl: '/shop?benefit=brain'
    },
    {
      id: 'energy',
      title: 'Energy & Stamina',
      subtitle: 'Natural non-crash stamina boosters packed with natural fructose, iron & minerals.',
      icon: <Zap className="w-6 h-6 text-emerald-600" />,
      gradient: 'from-emerald-500/10 via-teal-500/5 to-emerald-500/10 border-emerald-200/80',
      badge: 'Natural Stamina',
      recommended: ['Ajwa Dates', 'Afghan Black Raisins', 'Sun-Dried Figs'],
      keyPerks: ['Immediate Energy for Workouts & Busy Days', 'Rich Source of Plant-Based Iron & Potassium', 'Sustained Endurance Without Sugar Spikes'],
      shopUrl: '/shop?benefit=energy'
    },
    {
      id: 'immunity',
      title: 'Immunity & Defense',
      subtitle: 'Fortify your bodys immune shield with potent antioxidants & vital micronutrients.',
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      gradient: 'from-blue-500/10 via-indigo-500/5 to-blue-500/10 border-blue-200/80',
      badge: 'Cellular Defense',
      recommended: ['Kashmiri Kesar Saffron', 'Wild Blueberries', 'Raw Pumpkin Seeds'],
      keyPerks: ['High ORAC Antioxidant Score', 'Fights Free Radical Cell Damage', 'Supports Seasonal Health & Recovery'],
      shopUrl: '/shop?benefit=immunity'
    },
    {
      id: 'heart',
      title: 'Heart & Cholesterol Care',
      subtitle: 'Maintain optimal blood pressure & healthy lipid levels with plant sterols & healthy fats.',
      icon: <Heart className="w-6 h-6 text-rose-600" />,
      gradient: 'from-rose-500/10 via-pink-500/5 to-rose-500/10 border-rose-200/80',
      badge: 'Cardiovascular Health',
      recommended: ['Roasted Cashews', 'Pistachio Kernels', 'Flaxseed Mix'],
      keyPerks: ['Zero Cholesterol & Low Sodium', 'Rich in Monounsaturated Fatty Acids', 'Helps Regulate Arterial Blood Flow'],
      shopUrl: '/shop?benefit=heart'
    },
    {
      id: 'skin',
      title: 'Glowing Skin & Hair',
      subtitle: 'Nourish skin cells from within for natural radiance, hair elasticity & anti-aging.',
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      gradient: 'from-purple-500/10 via-fuchsia-500/5 to-purple-500/10 border-purple-200/80',
      badge: 'Radiant Glow',
      recommended: ['Californian Almonds', 'Organic Apricots', 'Sunflower Seeds'],
      keyPerks: ['High Vitamin E & Zinc Content', 'Promotes Collagen Production', 'Hydrates Skin & Strengthens Hair Roots'],
      shopUrl: '/shop?benefit=skin'
    },
    {
      id: 'digestion',
      title: 'Digestion & Gut Wellness',
      subtitle: 'Dietary fiber-rich superfoods for smooth digestion, gut microbiome & weight balance.',
      icon: <Activity className="w-6 h-6 text-green-600" />,
      gradient: 'from-green-500/10 via-lime-500/5 to-green-500/10 border-green-200/80',
      badge: 'Gut Health',
      recommended: ['Chia Seeds', 'Dried Prunes', 'Sprouted Flax Seeds'],
      keyPerks: ['Soluble & Insoluble Fiber Blend', 'Feeds Healthy Gut Microflora', 'Supports Healthy Weight Management'],
      shopUrl: '/shop?benefit=digestion'
    }
  ];

  const currentBenefit = benefits.find((b) => b.id === activeTab) || benefits[0];

  return (
    <section className="w-full bg-[#FAF8F5] py-16 md:py-24 font-sans text-slate-800 border-t border-b border-stone-200/70">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#C85A32] font-extrabold block">
            TARGETED ORGANIC WELLNESS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1E293B] font-serif">
            Shop By Health Benefits
          </h2>
          <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
            Discover handpicked organic dry fruits and superfood mixes tailored to your daily wellness goals.
          </p>
        </div>

        {/* Benefit Category Navigation Tabs */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto gap-2 pb-4 mb-8 scrollbar-none">
          {benefits.map((b) => {
            const isActive = activeTab === b.id;
            return (
              <button
                key={b.id}
                onClick={() => setActiveTab(b.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-[#C85A32] text-white border-[#C85A32] shadow-md shadow-[#C85A32]/20 scale-105'
                    : 'bg-white text-slate-700 border-stone-200 hover:border-[#C85A32]/40 hover:bg-stone-50'
                }`}
              >
                {b.icon}
                <span>{b.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Benefit Display Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBenefit.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className={`p-6 sm:p-10 rounded-3xl bg-gradient-to-br ${currentBenefit.gradient} bg-white shadow-xl border backdrop-blur-sm relative overflow-hidden`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-stone-200 shadow-sm text-xs font-bold uppercase tracking-wider text-[#C85A32]">
                  {currentBenefit.icon}
                  <span>{currentBenefit.badge}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl md:text-4xl font-bold font-serif text-slate-900">
                    {currentBenefit.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
                    {currentBenefit.subtitle}
                  </p>
                </div>

                {/* Key Benefits List */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-500 block">
                    Proven Health Benefits:
                  </span>
                  <div className="space-y-2">
                    {currentBenefit.keyPerks.map((perk, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4">
                  <Link
                    href={currentBenefit.shopUrl}
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#1E293B] hover:bg-[#C85A32] text-white font-semibold text-xs md:text-sm tracking-wide shadow-lg transition-all duration-300 group"
                  >
                    <span>Shop {currentBenefit.title} Selection</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Showcase Box */}
              <div className="lg:col-span-5 bg-white/90 p-6 md:p-8 rounded-2xl border border-stone-200/90 shadow-md space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block border-b border-stone-100 pb-2">
                  Top Recommended Superfoods:
                </span>
                
                <div className="space-y-3">
                  {currentBenefit.recommended.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="p-3.5 rounded-xl bg-stone-50 hover:bg-stone-100/80 border border-stone-200/70 transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#C85A32]/10 text-[#C85A32] flex items-center justify-center font-bold text-xs">
                          0{idx + 1}
                        </div>
                        <span className="text-xs md:text-sm font-semibold text-slate-800 group-hover:text-[#C85A32] transition-colors">
                          {item}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#C85A32] group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-slate-400 italic text-center pt-2">
                  100% Organic, Sulfur-Free & Sun-Dried Quality Guarantee
                </p>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
