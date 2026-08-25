'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface ReviewItem {
  name: string;
  comment: string;
  rating: number;
}

export default function ClientReviewsMarquee() {
  const reviews: ReviewItem[] = [
    { name: "Rohan S.", comment: "The Mamra almonds are remarkably crunchy and fresh! Vacuum packaging is top-tier.", rating: 5 },
    { name: "Vikram M.", comment: "King Jumbo cashews are giant and completely unbroken. Tastes rich and creamy.", rating: 5 },
    { name: "Neha K.", comment: "Iranian roasted pistachios with Himalayan pink salt are addictively good.", rating: 5 },
    { name: "Ananya V.", comment: "The Medjool dates are juicy, soft, and naturally sweet. Best daily energy boost!", rating: 5 },
    { name: "Suman R.", comment: "Ordered 15 luxury gift boxes for corporate hampers. Received fantastic compliments!", rating: 5 },
    { name: "Dr. Alok N.", comment: "Hand-shelled Kashmiri walnuts are super light and zero bitter aftertaste.", rating: 5 },
    { name: "Ritu S.", comment: "Shiprocket fast delivery. Arrived within 48 hours in Mumbai packed fresh.", rating: 5 },
    { name: "Pooja R.", comment: "Raw superfood chia & pumpkin seed mix is a great addition to my morning smoothies.", rating: 5 }
  ];

  return (
    <section className="w-full bg-[#f9f9f9] border-y border-zinc-200/50 py-12 md:py-16 overflow-hidden relative font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6 text-center">
        <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold block">Verified Feedback</span>
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-black mt-2">Loved by Our Community</h2>
      </div>

      {/* Auto-scrolling row */}
      <div className="flex w-full select-none overflow-hidden relative">
        <div className="flex w-max animate-reviews-scroll py-2 gap-8 md:gap-12 hover:pause-scroll">
          
          {/* First loop of 8 items */}
          {reviews.map((rev, idx) => (
            <div 
              key={`r1-${idx}`} 
              className="bg-white border border-zinc-200/80 rounded-2xl p-6 w-[280px] md:w-[320px] shadow-sm flex flex-col justify-between flex-shrink-0"
            >
              <p className="text-zinc-600 text-xs md:text-sm font-light italic leading-relaxed tracking-wide">
                &ldquo;{rev.comment}&rdquo;
              </p>
              
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-zinc-100">
                <span className="text-[11px] font-bold uppercase text-black tracking-wider">{rev.name}</span>
                <div className="flex gap-0.5 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Second loop of 8 items for seamless looping */}
          {reviews.map((rev, idx) => (
            <div 
              key={`r2-${idx}`} 
              className="bg-white border border-zinc-200/80 rounded-2xl p-6 w-[280px] md:w-[320px] shadow-sm flex flex-col justify-between flex-shrink-0"
            >
              <p className="text-zinc-600 text-xs md:text-sm font-light italic leading-relaxed tracking-wide">
                &ldquo;{rev.comment}&rdquo;
              </p>
              
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-zinc-100">
                <span className="text-[11px] font-bold uppercase text-black tracking-wider">{rev.name}</span>
                <div className="flex gap-0.5 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      <style jsx global>{`
        @keyframes reviews-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-reviews-scroll {
          animation: reviews-scroll 35s linear infinite;
        }
        .hover\:pause-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
