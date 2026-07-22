'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Ruler } from 'lucide-react';

export default function SizeGuidePage() {
  const [activeGender, setActiveGender] = useState<'women' | 'men'>('women');
  const [activeCategory, setActiveCategory] = useState<'tops' | 'bottoms'>('tops');

  const sizingData = {
    women: {
      tops: {
        headers: ['Size', 'Bust (in)', 'Waist (in)', 'US Size'],
        rows: [
          ['XS', '30 - 32', '24 - 26', '0 - 2'],
          ['S', '32 - 34', '26 - 28', '4 - 6'],
          ['M', '34 - 36', '28 - 30', '8 - 10'],
          ['L', '36 - 38', '30 - 32', '12 - 14'],
          ['XL', '38 - 40', '32 - 34', '16'],
        ]
      },
      bottoms: {
        headers: ['Size', 'Waist (in)', 'Hips (in)', 'Inseam (in)'],
        rows: [
          ['XS', '24 - 26', '34 - 36', '25'],
          ['S', '26 - 28', '36 - 38', '25.5'],
          ['M', '28 - 30', '38 - 40', '26'],
          ['L', '30 - 32', '40 - 42', '26.5'],
          ['XL', '32 - 34', '42 - 44', '27'],
        ]
      }
    },
    men: {
      tops: {
        headers: ['Size', 'Chest (in)', 'Waist (in)', 'Sleeve (in)'],
        rows: [
          ['S', '35 - 37', '29 - 31', '32.5'],
          ['M', '38 - 40', '32 - 34', '33.5'],
          ['L', '41 - 43', '35 - 37', '34.5'],
          ['XL', '44 - 46', '38 - 40', '35.5'],
          ['XXL', '47 - 49', '41 - 43', '36.5'],
        ]
      },
      bottoms: {
        headers: ['Size', 'Waist (in)', 'Hips (in)', 'Inseam (in)'],
        rows: [
          ['S', '29 - 31', '35 - 37', '30'],
          ['M', '32 - 34', '38 - 40', '30.5'],
          ['L', '35 - 37', '41 - 43', '31'],
          ['XL', '38 - 40', '44 - 46', '31.5'],
          ['XXL', '41 - 43', '47 - 49', '32'],
        ]
      }
    }
  };

  const currentTable = sizingData[activeGender][activeCategory];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 bg-zinc-50/50 py-16 font-sans">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold block">fit guide</span>
            <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-black">Find Your Size</h1>
            <p className="text-zinc-500 text-xs md:text-sm max-w-lg mx-auto tracking-wide leading-relaxed font-light uppercase">
              Get the perfect fit for peak performance. Use our detailed measurement charts below.
            </p>
          </div>

          {/* Interactive Controls Container */}
          <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
            
            {/* Gender Toggle */}
            <div className="flex gap-4 border-b border-zinc-100 pb-3">
              {(['women', 'men'] as const).map((gender) => (
                <button
                  key={gender}
                  onClick={() => {
                    setActiveGender(gender);
                    setActiveCategory('tops'); // Reset sub-category
                  }}
                  className={`text-xs uppercase tracking-[0.2em] font-bold pb-2 transition-all duration-200 relative focus:outline-none ${activeGender === gender ? 'text-black font-extrabold' : 'text-zinc-400 hover:text-zinc-600'}`}
                >
                  {gender}
                  {activeGender === gender && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              {(['tops', 'bottoms'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-all duration-300 rounded-lg ${activeCategory === cat ? 'bg-black border-black text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400'}`}
                >
                  {cat === 'tops' ? 'Tops & Sports Bras' : 'Bottoms & Shorts'}
                </button>
              ))}
            </div>

            {/* Size Table */}
            <div className="overflow-x-auto pt-4">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100 text-zinc-400 font-semibold uppercase tracking-wider">
                    {currentTable.headers.map((h, idx) => (
                      <th key={idx} className={`pb-3 ${idx === 0 ? 'pr-4 font-bold' : idx === currentTable.headers.length - 1 ? 'pl-4 text-right' : 'px-4'}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50 text-zinc-600 font-light uppercase tracking-wider">
                  {currentTable.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-zinc-50/50 transition-colors">
                      {row.map((val, cIdx) => (
                        <td key={cIdx} className={`py-4 ${cIdx === 0 ? 'pr-4 font-semibold text-black' : cIdx === row.length - 1 ? 'pl-4 text-right' : 'px-4'}`}>
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Fit Tips */}
            <div className="flex gap-3 bg-zinc-50 border border-zinc-100 rounded-xl p-4 mt-6">
              <Ruler className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-1">How to Measure</h4>
                <p className="text-[11px] text-zinc-500 font-light leading-relaxed">
                  <strong>Bust/Chest:</strong> Wrap tape under arms at the fullest part of your bust/chest. <br/>
                  <strong>Waist:</strong> Measure around your natural waistline, keeping tape slightly loose. <br/>
                  <strong>Hips:</strong> Measure around the fullest part of your body at the top of your leg.
                </p>
              </div>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
