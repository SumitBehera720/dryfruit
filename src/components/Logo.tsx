'use client';

import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = 'h-6 text-black fill-none' }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 200 40" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="4" 
      strokeLinecap="square" 
      strokeLinejoin="miter"
      className={className}
      aria-label="AERTH Logo"
    >
      {/* A (slanted legs, no crossbar) */}
      <path d="M 10,35 L 25,5 L 40,35" />
      
      {/* E (three horizontal bars) */}
      <path d="M 52,7 L 77,7" />
      <path d="M 52,20 L 77,20" />
      <path d="M 52,33 L 77,33" />
      
      {/* R (vertical stem with detached top loop and leg) */}
      <path d="M 89,5 L 89,35" />
      <path d="M 98,5 L 110,5 C 117,5 117,20 110,20 L 98,20" />
      <path d="M 104,20 L 114,35" />
      
      {/* T (horizontal bar and vertical stem) */}
      <path d="M 125,5 L 153,5" />
      <path d="M 139,5 L 139,35" />
      
      {/* H (two vertical stems and crossbar) */}
      <path d="M 165,5 L 165,35" />
      <path d="M 190,5 L 190,35" />
      <path d="M 165,20 L 190,20" />
    </svg>
  );
}
