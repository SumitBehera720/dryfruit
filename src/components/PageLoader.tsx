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

  const logoLetters = [
    {
      viewBox: '0 0 40 40',
      path: <path d="M 8,35 L 20,5 L 32,35" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" fill="none" />
    },
    {
      viewBox: '0 0 32 40',
      path: (
        <>
          <path d="M 4,7 L 28,7" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" fill="none" />
          <path d="M 4,20 L 28,20" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" fill="none" />
          <path d="M 4,33 L 28,33" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" fill="none" />
        </>
      )
    },
    {
      viewBox: '0 0 34 40',
      path: (
        <>
          <path d="M 4,5 L 4,35" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" fill="none" />
          <path d="M 12,5 L 22,5 C 28,5 28,20 22,20 L 12,20" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" fill="none" />
          <path d="M 18,20 L 27,35" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" fill="none" />
        </>
      )
    },
    {
      viewBox: '0 0 32 40',
      path: (
        <>
          <path d="M 2,5 L 30,5" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" fill="none" />
          <path d="M 16,5 L 16,35" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" fill="none" />
        </>
      )
    },
    {
      viewBox: '0 0 36 40',
      path: (
        <>
          <path d="M 5,5 L 5,35" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" fill="none" />
          <path d="M 31,5 L 31,35" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" fill="none" />
          <path d="M 5,20 L 31,20" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" fill="none" />
        </>
      )
    }
  ];

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
            className="flex items-center gap-4 md:gap-6"
          >
            {logoLetters.map((letter, idx) => (
              <motion.svg
                key={idx}
                variants={letterVariants}
                viewBox={letter.viewBox}
                className="h-10 w-8 md:h-14 md:w-11 text-white fill-none stroke-white"
              >
                {letter.path}
              </motion.svg>
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
