'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

interface VideoTextProps {
  children: React.ReactNode;
  videoSrc: string;
  fontSize?: string;
  fontWeight?: string | number;
}

export default function VideoText({ 
  children, 
  videoSrc, 
  fontSize = '1.2rem', 
  fontWeight = 'bold' 
}: VideoTextProps) {
  const [maskId, setMaskId] = useState('');
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate unique mask ID
    const id = `video-text-mask-${Math.random().toString(36).substr(2, 9)}`;
    setMaskId(id);
  }, []);

  // Show gradient text effect for now (video masking can be enabled later if needed)
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize,
        fontWeight,
        background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe)',
        backgroundSize: '400% 400%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'gradientShift 3s ease infinite',
        '@keyframes gradientShift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }}
    >
      {children}
    </Box>
  );
}