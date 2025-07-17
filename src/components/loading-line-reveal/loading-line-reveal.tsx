'use client';

import { useEffect, useState } from 'react';
import {
  animate,
  m,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  Transition,
} from 'framer-motion';

interface LoadingLineRevealProps {
  children: React.ReactNode;
  onComplete?: () => void;
  duration?: number;
  isDarkMode?: boolean;
}

function useMockLoading(duration: number = 2000) {
  const progress = useSpring(0, { duration });
  
  useEffect(() => {
    progress.set(1);
  }, [progress]);

  return progress;
}

export default function LoadingLineReveal({ 
  children, 
  onComplete, 
  duration = 2000,
  isDarkMode = false 
}: LoadingLineRevealProps) {
  const progress = useMockLoading(duration);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const leftEdge = useMotionValue("calc(50% - 2px)");
  const rightEdge = useMotionValue("calc(50% + 2px)");
  const topEdge = useTransform(progress, [0, 1], ["50%", "0%"]);
  const bottomEdge = useTransform(progress, [0, 1], ["50%", "100%"]);
  const lineOpacity = useMotionValue(1);

  const clipPath = useMotionTemplate`polygon(
    0% 0%, ${leftEdge} 0%, ${leftEdge} ${topEdge}, ${leftEdge} ${bottomEdge}, 
    ${rightEdge} ${bottomEdge}, ${rightEdge} ${topEdge}, 
    ${leftEdge} ${topEdge}, ${leftEdge} 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%
  )`;

  useMotionValueEvent(progress, "change", (latest) => {
    if (latest >= 1 && !isLoaded) {
      setIsLoaded(true);
    }
  });

  useEffect(() => {
    if (!isLoaded) return;

    const transition: Transition = {
      type: "spring",
      duration: 0.5,
      bounce: 0,
    };

    animate(leftEdge, "calc(0% - 0px)", transition);
    animate(rightEdge, "calc(100% + 0px)", transition);
    
    // Fade out the line
    animate(lineOpacity, 0, { duration: 0.3, delay: 0.2 });

    // Call onComplete after animation finishes
    const timer = setTimeout(() => {
      setIsComplete(true);
      onComplete?.();
    }, 800);

    return () => clearTimeout(timer);
  }, [isLoaded, leftEdge, rightEdge, lineOpacity, onComplete]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Loading overlay with line reveal */}
      {!isComplete && (
        <m.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: isDarkMode ? '#ffffff' : '#000000',
            clipPath,
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        />
      )}
      
      {/* Loading line */}
      {!isComplete && (
        <m.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '4px',
            height: useTransform(progress, [0, 1], ['0%', '100%']),
            backgroundColor: isDarkMode ? '#000000' : '#ffffff',
            transform: 'translate(-50%, -50%)',
            transformOrigin: 'center',
            zIndex: 10000,
            pointerEvents: 'none',
            opacity: lineOpacity,
          }}
        />
      )}
      
      {/* Content */}
      <div style={{ width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  );
}