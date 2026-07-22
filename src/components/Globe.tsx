'use client';

import React from 'react';

interface GlobeProps {
  size?: number;
}

export default function Globe({ size = 32 }: GlobeProps) {
  return (
    <div 
      style={{ 
        width: size, 
        height: size, 
        borderRadius: '50%', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        boxShadow: '0 0 8px rgba(147, 197, 253, 0.5)'
      }}
    >
      <video
        src="/uploads/Cinematic_Infinite_Loop_Animat.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
  );
}
