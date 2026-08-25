'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = 'h-9 w-auto' }: LogoProps) {
  return (
    <div className={`relative flex items-center select-none ${className}`}>
      <Image
        src="/images/just_naturals_logo.png"
        alt="Just Naturals Superfoods Logo"
        width={220}
        height={55}
        priority
        className="object-contain h-8 md:h-10 w-auto"
      />
    </div>
  );
}
