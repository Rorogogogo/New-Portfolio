"use client";

import { motion } from "motion/react";
import { useState } from "react";

export default function TextRevealTest() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
      <h3>Text Reveal Test</h3>
      <motion.div
        style={{
          position: "relative",
          cursor: "pointer",
          overflow: "hidden",
          display: "block",
          height: "1.5em",
          lineHeight: "1.5em",
          backgroundColor: "white",
          border: "1px solid #ccc",
          padding: "10px",
          width: "200px",
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
            y: isHovered ? "-100%" : "0%",
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
              height: "1.5em",
              lineHeight: "1.5em",
            }}
          >
            Home Test
          </motion.span>
          <motion.span 
            style={{ 
              display: "flex", 
              alignItems: "center",
              width: "100%",
              height: "1.5em",
              lineHeight: "1.5em",
            }} 
            aria-hidden
          >
            Home Test
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
}