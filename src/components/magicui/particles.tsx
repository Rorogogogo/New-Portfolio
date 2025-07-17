"use client";

import { useEffect, useMemo, useState } from "react";


interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

export default function Particles({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const particleOpacity = 0.3;
  const particleColor = "255, 255, 255";
  const particleSize = 1;

  const initializeParticles = useMemo(() => {
    const particleArray: Particle[] = [];
    for (let i = 0; i < quantity; i++) {
      const particle: Particle = {
        id: i,
        x: Math.random() * canvasSize.width,
        y: Math.random() * canvasSize.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 20 + 20,
        maxLife: Math.random() * 20 + 20,
      };
      particleArray.push(particle);
    }
    return particleArray;
  }, [quantity, canvasSize.width, canvasSize.height, refresh]);

  useEffect(() => {
    const updateCanvasSize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  useEffect(() => {
    setParticles(initializeParticles);
  }, [initializeParticles]);

  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          // Simple natural movement without mouse interaction
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Gentle damping for smooth movement
          particle.vx *= 0.995;
          particle.vy *= 0.995;

          // Bounce off walls
          if (particle.x < 0 || particle.x > canvasSize.width) {
            particle.vx *= -1;
          }
          if (particle.y < 0 || particle.y > canvasSize.height) {
            particle.vy *= -1;
          }

          particle.x = Math.max(0, Math.min(canvasSize.width, particle.x));
          particle.y = Math.max(0, Math.min(canvasSize.height, particle.y));

          particle.life--;

          if (particle.life <= 0) {
            particle.x = Math.random() * canvasSize.width;
            particle.y = Math.random() * canvasSize.height;
            particle.vx = (Math.random() - 0.5) * 0.5;
            particle.vy = (Math.random() - 0.5) * 0.5;
            particle.life = particle.maxLife;
          }

          return particle;
        })
      );
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [canvasSize.width, canvasSize.height]);

  return (
    <div className={className}>
      <canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 10,
        }}
        width={canvasSize.width}
        height={canvasSize.height}
        ref={(canvas) => {
          if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
              particles.forEach((particle) => {
                const opacity = (particle.life / particle.maxLife) * particleOpacity;
                ctx.fillStyle = `rgba(${particleColor}, ${opacity})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);
                ctx.fill();
              });
            }
          }
        }}
      />
    </div>
  );
}