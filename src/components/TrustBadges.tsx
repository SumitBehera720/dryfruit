'use client';

import React from 'react';
import { ShieldCheck, Leaf, Truck, Award } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: <Award className="w-5 h-5 text-[#C85A32]" />,
      title: "100% ORGANIC CERTIFIED",
      desc: "Verified non-GMO & chemical free",
    },
    {
      icon: <Leaf className="w-5 h-5 text-[#C85A32]" />,
      title: "DIRECT ORCHARD HARVEST",
      desc: "Ethical trade farmer partnerships",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#C85A32]" />,
      title: "VACUUM FRESHNESS SEAL",
      desc: "Zero preservatives or additives",
    },
    {
      icon: <Truck className="w-5 h-5 text-[#C85A32]" />,
      title: "EXPRESS WORLDWIDE SHIPPING",
      desc: "Free delivery over ₹500",
    },
  ];

  return (
    <div className="w-full bg-[#FFFDF9] border-b border-stone-200/80 py-6 md:py-8 font-sans text-[#1E293B]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-x-0 lg:divide-x divide-stone-200/80">
        {badges.map((badge, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-4 px-2 md:px-6 transition-all duration-300 hover:translate-y-[-2px] group"
          >
            <div className="bg-[#FFF5ED] p-3 rounded-2xl border border-orange-100/80 shadow-sm group-hover:border-[#C85A32]/60 transition-colors duration-300">
              {badge.icon}
            </div>
            <div>
              <h3 className="text-[#1E293B] font-bold text-xs md:text-sm tracking-wider uppercase font-serif">
                {badge.title}
              </h3>
              <p className="text-[10px] md:text-xs text-slate-500 mt-0.5 tracking-wider font-light">
                {badge.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
