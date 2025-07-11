"use client";

import { motion } from "motion/react";
import { useState } from "react";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function TextReveal({ 
  children, 
  className = "", 
  style = {} 
}: TextRevealProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={className}
      style={{
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        display: "block",
        height: "1em", // Fixed to exactly one line height
        lineHeight: "1em",
        ...style,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        animate={{
          y: isHovered ? "-50%" : "0%",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <motion.span 
          style={{ 
            display: "flex", 
            alignItems: "center",
            width: "100%",
            height: "1em",
            lineHeight: "1em",
          }}
        >
          {children}
        </motion.span>
        <motion.span 
          style={{ 
            display: "flex", 
            alignItems: "center",
            width: "100%",
            height: "1em",
            lineHeight: "1em",
          }} 
          aria-hidden
        >
          {children}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}