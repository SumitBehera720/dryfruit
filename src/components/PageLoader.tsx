'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    // Hide loader after 1.2 seconds on page swap
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [pathname]);

  const logoWords = Array.from('AERTH');

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const letterVariants = {
    initial: { opacity: 0, y: 30, scale: 0.8 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ease: [0.215, 0.610, 0.355, 1.000] as any 
      }
    }
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: '-100%',
            transition: { duration: 0.85, ease: [0.77, 0, 0.175, 1] } 
          }}
          className="fixed inset-0 z-50 bg-[#0c0c0c] flex flex-col items-center justify-center text-white"
        >
          {/* Logo animation */}
          <motion.div 
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="flex items-center gap-1.5 md:gap-3"
          >
            {logoWords.map((letter, idx) => (
              <motion.span
                key={idx}
                variants={letterVariants}
                className="text-4xl md:text-6xl font-bold tracking-[0.25em] uppercase font-sans"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-6 text-[10px] md:text-xs uppercase tracking-[0.4em] font-light text-zinc-400 font-sans"
          >
            Move with the Elements
          </motion.div>

          {/* Line loader */}
          <div className="w-40 bg-zinc-800 h-[1.5px] mt-8 rounded-full overflow-hidden relative">
            <motion.div 
              initial={{ left: '-100%' }}
              animate={{ left: '100%' }}
              transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
              className="absolute top-0 bottom-0 w-20 bg-white"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
