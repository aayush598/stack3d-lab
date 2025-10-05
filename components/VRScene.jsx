'use client';
import { useEffect } from 'react';
import 'aframe';

export default function VRScene() {
  useEffect(() => {
    // Ensures A-Frame initializes only in browser (not during SSR)
    if (typeof window === 'undefined') return;
  }, []);

  return (
    <div className="w-full h-screen">
      <a-scene embedded>
        {/* Ground */}
        <a-plane 
          position="0 0 -4" 
          rotation="-90 0 0" 
          width="20" 
          height="20" 
          color="#7BC8A4">
        </a-plane>

        {/* A Box */}
        <a-box 
          position="0 1 -3" 
          rotation="0 45 0" 
          color="#4CC3D9" 
          shadow>
        </a-box>

        {/* A Sphere */}
        <a-sphere 
          position="2 1.25 -5" 
          radius="1.25" 
          color="#EF2D5E">
        </a-sphere>

        {/* A Cylinder */}
        <a-cylinder 
          position="-1 0.75 -3" 
          radius="0.5" 
          height="1.5" 
          color="#FFC65D">
        </a-cylinder>

        {/* Sky */}
        <a-sky color="#ECECEC"></a-sky>
      </a-scene>
    </div>
  );
}
