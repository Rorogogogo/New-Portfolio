"use client";

import { cn } from "src/lib/utils";
import React from "react";
import { useTheme } from "src/contexts";

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  const { isDarkMode } = useTheme();
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0"
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke={isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)"}
            strokeWidth="1"
            strokeDasharray="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          <div
            key={index}
            className={cn(
              `absolute flex size-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center rounded-full`,
              { "[animation-direction:reverse]": reverse },
              className,
            )}
            style={{
              ...((typeof props.style === 'object' ? props.style : {}) as React.CSSProperties),
              "--duration": `${calculatedDuration}s`,
              "--radius": `${radius}px`,
              "--angle": `${angle}deg`,
              "--icon-size": `${iconSize}px`,
            } as React.CSSProperties}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}

export default OrbitingCircles;