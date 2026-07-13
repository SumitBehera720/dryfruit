'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface GlobeProps {
  size?: number;
}

export default function Globe({ size = 32 }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Setup scene
    const scene = new THREE.Scene();

    // Setup camera - perspective camera positioned close to reduce padding
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    // Move camera to a distance where the globe (radius 18) fits completely with its atmosphere glow (18.35)
    camera.position.z = 44;

    // Setup WebGL renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.domElement.style.borderRadius = '50%';
    container.appendChild(renderer.domElement);

    // Globe Radius (reduced from 20 to 18 to prevent camera viewport edge clipping)
    const r = 18;

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    
    // Load Earth Satellite texture (Day map)
    const earthTexture = textureLoader.load('/images/earth-texture.jpg');
    earthTexture.colorSpace = THREE.SRGBColorSpace;
    
    // Load Clouds texture
    const cloudTexture = textureLoader.load('/images/earth-clouds.png');

    // 1. Earth mesh
    const earthGeo = new THREE.SphereGeometry(r, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.6,    // shinier to make land details pop
      metalness: 0.1,    // ocean specular style
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earthMesh);

    // 2. Cloud layer mesh (slightly larger than Earth)
    const cloudGeo = new THREE.SphereGeometry(r + 0.15, 64, 64);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.3,      // slightly more transparent to keep land clear
      blending: THREE.NormalBlending,
      depthWrite: false
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    scene.add(cloudMesh);

    // 3. Atmosphere Glow mesh (slightly larger than clouds, facing backside for halo effect)
    const atmosGeo = new THREE.SphereGeometry(r + 0.35, 32, 32);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd, // sky blue
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmosMesh);

    // 4. Lighting to show spherical 3D shading
    // Main directional light (aligned closer to the camera to illuminate the front face)
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(10, 10, 40);
    scene.add(sunLight);

    // Bright ambient fill light so the dark side is clearly visible and not pitch-black
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Set initial tilt (realistic Earth axial tilt is 23.5 degrees ~ 0.4 radians)
    const tilt = 0.4;
    earthMesh.rotation.x = tilt;
    cloudMesh.rotation.x = tilt;
    atmosMesh.rotation.x = tilt;

    // Animation Loop
    let animFrameId: number;
    const animate = () => {
      // Rotate Earth slowly
      earthMesh.rotation.y += 0.0035;
      
      // Rotate clouds slightly faster for realistic atmosphere drift
      cloudMesh.rotation.y += 0.0042;
      
      atmosMesh.rotation.y += 0.0035;

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up Three.js objects on unmount
    return () => {
      cancelAnimationFrame(animFrameId);
      if (container && renderer.domElement.parentNode) {
        container.removeChild(renderer.domElement);
      }
      earthGeo.dispose();
      earthMat.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      renderer.dispose();
    };
  }, [size]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: size, 
        height: size, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: '50%',
        overflow: 'hidden',
        filter: 'drop-shadow(0 0 8px rgba(147, 197, 253, 0.5))'
      }} 
    />
  );
}
