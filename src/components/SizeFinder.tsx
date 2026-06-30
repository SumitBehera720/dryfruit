'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Scale, Ruler, Heart } from 'lucide-react';

export default function SizeFinder() {
  const [height, setHeight] = useState(165); // in cm
  const [weight, setWeight] = useState(60);  // in kg
  const [fitPref, setFitPref] = useState<'tight' | 'regular' | 'loose'>('regular');
  const [result, setResult] = useState<string | null>(null);
  const [calculating, setCalculating] = useState(false);

  const calculateSize = () => {
    setCalculating(true);
    setResult(null);

    setTimeout(() => {
      // Basic size logic
      let size = 'M';
      if (weight < 52) {
        size = 'XS';
      } else if (weight >= 52 && weight < 62) {
        size = 'S';
      } else if (weight >= 62 && weight < 72) {
        size = 'M';
      } else if (weight >= 72 && weight < 82) {
        size = 'L';
      } else {
        size = 'XL';
      }

      // Adjust based on fit preference
      const sizes = ['XS', 'S', 'M', 'L', 'XL'];
      let idx = sizes.indexOf(size);
      if (fitPref === 'tight' && idx > 0) {
        idx -= 1;
      } else if (fitPref === 'loose' && idx < sizes.length - 1) {
        idx += 1;
      }
      
      setResult(sizes[idx]);
      setCalculating(false);
    }, 800);
  };

  return (
    <section className="w-full bg-zinc-50 py-16 md:py-24 border-b border-zinc-200/60 font-sans text-black">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-4 md:px-8"
      >
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-zinc-500 font-semibold flex justify-center items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400 animate-pulse" />
            AERTH Smart Fit
          </span>
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-black mt-2">
            Find Your Perfect Fit
          </h2>
          <p className="text-zinc-500 text-xs md:text-sm mt-2 tracking-wide font-light max-w-md mx-auto">
            Input your stats and get an instant, mathematically tailored size recommendation.
          </p>
        </div>

        {/* Form panel */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-zinc-200/80 shadow-md grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Sliders Input */}
          <div className="space-y-6">
            {/* Height Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
                <span className="flex items-center gap-1"><Ruler className="w-4 h-4 text-zinc-450" /> Height</span>
                <span className="text-black">{height} cm</span>
              </div>
              <input 
                type="range" 
                min="140" 
                max="200" 
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
            </div>

            {/* Weight Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
                <span className="flex items-center gap-1"><Scale className="w-4 h-4 text-zinc-450" /> Weight</span>
                <span className="text-black">{weight} kg</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="110" 
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
            </div>

            {/* Fit Preference */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Fit Preference</label>
              <div className="grid grid-cols-3 gap-2">
                {(['tight', 'regular', 'loose'] as const).map((pref) => (
                  <button
                    key={pref}
                    onClick={() => setFitPref(pref)}
                    className={`py-2 text-[10px] md:text-xs font-bold rounded-lg border uppercase tracking-wider transition-all ${
                      fitPref === pref
                        ? 'bg-black border-black text-white shadow-sm'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-655 hover:border-zinc-350'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={calculateSize}
              disabled={calculating}
              className="w-full bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest py-4.5 transition-colors shadow-md hover:shadow-lg rounded-xl"
            >
              {calculating ? 'Analyzing Body Data...' : 'Calculate Recommended Size'}
            </button>
          </div>

          {/* Results Output */}
          <div className="h-full flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-zinc-200/80 pt-6 md:pt-0 md:pl-8">
            <AnimatePresence mode="wait">
              {calculating ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center space-y-3"
                >
                  <div className="w-10 h-10 border-2 border-zinc-200 border-t-black rounded-full animate-spin" />
                  <p className="text-xs uppercase tracking-widest text-zinc-450 font-semibold">Running smart fit analysis...</p>
                </motion.div>
              ) : result ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-450">Your Recommended Size</span>
                  <div className="text-6xl md:text-7xl font-bold tracking-tighter text-black bg-zinc-50 w-28 h-28 md:w-32 md:h-32 rounded-full border border-zinc-200 flex items-center justify-center shadow-lg">
                    {result}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-zinc-800 tracking-wider">Perfect match for you</p>
                    <p className="text-[10px] text-zinc-500 mt-1 max-w-[200px] leading-relaxed">
                      Based on height ({height}cm), weight ({weight}kg) and a {fitPref} fit preference.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center text-center space-y-3 max-w-[220px]"
                >
                  <Heart className="w-8 h-8 text-zinc-200 stroke-[1.25]" />
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    Adjust your details and click calculate to discover your customized size match.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </motion.div>
    </section>
  );
}
