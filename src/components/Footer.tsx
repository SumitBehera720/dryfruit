'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { ArrowRight, Leaf, Check, Globe } from 'lucide-react';

interface FooterColumn {
  title: string;
  links: Array<{ label: string; url: string }>;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const data = {
    copyright: "© 2026 Organic Traditions. All rights reserved.",
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com", icon: "instagram" },
      { platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
      { platform: "Facebook", url: "https://facebook.com", icon: "facebook" },
      { platform: "YouTube", url: "https://youtube.com", icon: "youtube" },
    ] as SocialLink[],
    columns: [
      {
        title: "SHOP CATEGORIES",
        links: [
          { label: "Raw Nuts & Kernels", url: "/shop?category=nuts" },
          { label: "Dried Superberries", url: "/shop?category=dried-fruits" },
          { label: "Adaptogen Powders", url: "/shop?category=adaptogens" },
          { label: "Functional Lattes", url: "/shop?category=elixirs" },
          { label: "Festive Gift Hampers", url: "/shop?category=gifting" },
        ]
      },
      {
        title: "OUR PROMISE",
        links: [
          { label: "Our Sourcing Story", url: "/about" },
          { label: "Regenerative Organic", url: "/sustainability" },
          { label: "Vacuum Freshness Tech", url: "/technology" },
          { label: "Farmer Co-operatives", url: "/impact" },
        ]
      },
      {
        title: "HELP & SUPPORT",
        links: [
          { label: "Shipping & Delivery", url: "/shipping" },
          { label: "Track Your Order", url: "/track" },
          { label: "Returns & Guarantee", url: "/returns" },
          { label: "Contact Wellness Team", url: "/contact" },
        ]
      }
    ] as FooterColumn[]
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="w-full bg-[#FFFDF9] text-[#1E293B] pt-10 md:pt-12 pb-6 font-sans border-t border-stone-200">
      
      {/* Top Newsletter Banner */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 border-b border-stone-200 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C85A32]">
              JOIN THE SUPERFOOD CIRCLE
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold uppercase tracking-wider text-[#1E293B] font-serif">
              Get 15% Off Your First Order
            </h3>
          </div>

          <div className="w-full md:w-auto min-w-[320px]">
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#2D6A4F] bg-[#F2F7F2] py-3 px-6 rounded-xl border border-emerald-200">
                <Check className="w-4 h-4" /> Welcome to Organic Traditions!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border border-stone-300 text-xs text-[#1E293B] placeholder-stone-400 px-4 py-3 rounded-xl focus:outline-none focus:border-[#C85A32] flex-1 min-w-[200px] shadow-sm"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#C85A32] hover:bg-[#B04C27] text-white font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-xl transition-colors flex items-center gap-1.5 flex-shrink-0 shadow-md"
                >
                  Join <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <Logo className="text-[#1E293B] h-7" />
            <p className="text-xs text-slate-500 font-light leading-relaxed max-w-sm">
              100% Regenerative Organic Certified, plant-based superfoods, raw nuts, adaptogen powders, and functional lattes.
            </p>
            <div className="flex gap-2.5 pt-1">
              {data.socialLinks.map((s: SocialLink, idx: number) => (
                <a
                  key={idx}
                  href={s.url}
                  className="w-8 h-8 rounded-full bg-[#FFF5ED] border border-orange-100 flex items-center justify-center text-[#C85A32] hover:bg-[#C85A32] hover:text-white transition-colors"
                  aria-label={s.platform}
                >
                  <Globe className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {data.columns.map((col: FooterColumn, idx: number) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C85A32] font-serif">
                {col.title}
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 font-light tracking-wide">
                {col.links.map((link: { label: string; url: string }, lIdx: number) => (
                  <li key={lIdx}>
                    <Link href={link.url} className="hover:text-[#C85A32] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* Compact Copyright Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 border-t border-stone-200 pt-5 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 tracking-wider">
        <p>{data.copyright}</p>
        <div className="flex gap-4 mt-2 md:mt-0 font-semibold uppercase">
          <Link href="/privacy" className="hover:text-slate-700">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-slate-700">Terms of Service</Link>
        </div>
      </div>

    </footer>
  );
}
