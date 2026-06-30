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
    { name: "Neha K.", comment: "The invisible glute scrunch is magic! Leggings fit perfectly.", rating: 5 },
    { name: "Sarah M.", comment: "Absolutely squat proof. Feels extremely premium during deadlifts.", rating: 5 },
    { name: "Pooja R.", comment: "Waistband stays locked and doesn't roll down. Love the Plum color.", rating: 5 },
    { name: "Amanda L.", comment: "Italian seamless knit feels like a second skin. Buying more!", rating: 5 },
    { name: "Chloe G.", comment: "Highest quality activewear on the market. Better than major luxury brands.", rating: 5 },
    { name: "Diya P.", comment: "The contour design is spectacular! Gives a great shape.", rating: 5 },
    { name: "Ritu S.", comment: "Shiprocket fast delivery. Arrived in just 2 days in Mumbai.", rating: 5 },
    { name: "Jessica W.", comment: "Super breathable and cool. Ideal for hot outdoor training runs.", rating: 5 }
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
              <p className="text-zinc-650 text-xs md:text-sm font-light italic leading-relaxed tracking-wide">
                &ldquo;{rev.comment}&rdquo;
              </p>
              
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-zinc-100">
                <span className="text-[11px] font-bold uppercase text-black tracking-wider">{rev.name}</span>
                <div className="flex gap-0.5 text-black">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-black stroke-black" />
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
              <p className="text-zinc-650 text-xs md:text-sm font-light italic leading-relaxed tracking-wide">
                &ldquo;{rev.comment}&rdquo;
              </p>
              
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-zinc-100">
                <span className="text-[11px] font-bold uppercase text-black tracking-wider">{rev.name}</span>
                <div className="flex gap-0.5 text-black">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-black stroke-black" />
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
