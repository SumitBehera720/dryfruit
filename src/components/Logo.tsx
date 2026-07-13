'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = 'h-6 w-auto' }: LogoProps) {
  const isWhite = className.includes('text-white');
  return (
    <Image
      src="/images/fbc2edd4-5429-482c-957e-3536a862daad-removebg-preview.png"
      alt="AERTH Logo"
      width={120}
      height={40}
      className={className}
      style={{
        objectFit: 'contain',
        filter: isWhite ? 'invert(1) hue-rotate(180deg)' : 'none',
      }}
    />
  );
}
