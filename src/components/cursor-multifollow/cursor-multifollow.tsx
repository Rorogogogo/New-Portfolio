"use client";

import { useEffect } from 'react';
import { Cursor } from "motion-plus-react";

export default function CursorMultifollow() {
  useEffect(() => {
    // Hide the default cursor globally
    document.body.style.cursor = 'none';
    
    // Cleanup on unmount
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <Cursor
        style={{ backgroundColor: "white", width: 5, height: 5 }}
        variants={{ pressed: { scale: 0.5 } }}
      />
      <Cursor
        style={{
          borderRadius: 20,
          border: "2px solid #ff0088",
          backgroundColor: "transparent",
          width: 13,
          height: 13,
        }}
        variants={{
          pressed: { scale: 0.6, borderColor: "#dd00ee" },
        }}
        spring={{ stiffness: 1000, damping: 50 }}
      />
      <Cursor
        style={{
          borderRadius: 20,
          border: "2px solid #dd00ee",
          backgroundColor: "transparent",
          width: 21,
          height: 21,
        }}
        variants={{
          pressed: { scale: 0.7, borderColor: "#9911ff" },
        }}
        spring={{ stiffness: 800, damping: 70 }}
      />
      <Cursor
        style={{
          borderRadius: 20,
          border: "2px solid #9911ff",
          backgroundColor: "transparent",
          width: 29,
          height: 29,
        }}
        variants={{
          pressed: { scale: 0.8, borderColor: "#0d63f8" },
        }}
        spring={{ stiffness: 700, damping: 90 }}
      />
    </>
  );
}