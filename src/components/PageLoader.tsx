'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Show a quick rotating circular loader on mount and route changes (600ms)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.3, ease: 'easeInOut' } 
          }}
          className="fixed inset-0 z-50 bg-[#0c0c0c] flex flex-col items-center justify-center text-white"
        >
          <div className="flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="w-10 h-10 border-2 border-zinc-800 border-t-white rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
