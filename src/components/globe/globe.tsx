'use client';

import createGlobe, { COBEOptions } from 'cobe';
import { useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0,
  dark: 0,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.3, 0.3, 0.3],
  markerColor: [0.1, 0.8, 1],
  glowColor: [1, 1, 1],
  markers: [
    // Sydney, Australia - Currently located (Orange)
    { location: [-33.8688, 151.2093], size: 0.07, color: [1, 0.5, 0] },

    // Zhengzhou, China - Born and raised (Blue)
    { location: [34.7466, 113.6253], size: 0.07, color: [0.1, 0.8, 1] },

    // Other cities (smaller markers)
    { location: [40.7128, -74.006], size: 0.03 },
    { location: [51.5074, -0.1278], size: 0.03 },
    { location: [35.6762, 139.6503], size: 0.03 },
    { location: [22.3193, 114.1694], size: 0.03 },
  ],
};

export default function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const r = 300; // Increased for slower movement

  const updatePointerInteraction = (value: any) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX: any) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta * 0.3; // Reduced sensitivity
      phi += (delta * 0.3) / r;
    }
  };

  const onRender = (state: Record<string, any>) => {
    if (!pointerInteracting.current) phi += 0.002; // Slower auto-rotation
    state.phi = phi + pointerInteractionMovement.current;
    phi += 0.001; // Slower overall movement
  };

  const onResize = () => {
    if (canvasRef.current && (width = canvasRef.current.offsetWidth)) {
      window.addEventListener('resize', onResize);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '1';
      }
    });
    return () => globe.destroy();
  }, []);

  return (
    <div
      className={className}
      style={{
        width: '85%',
        height: '85%',
        maxWidth: 800,
        aspectRatio: '1',
        margin: 'auto',
        position: 'relative',
      }}
    >
      <canvas
        className={className}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(e.clientX - pointerInteractionMovement.current)
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout style size',
          opacity: 0,
          transition: 'opacity 1s ease',
        }}
      />
    </div>
  );
}
