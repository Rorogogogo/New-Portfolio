'use client';

import { useRef } from 'react';
import Box from '@mui/material/Box';

import FixedHeader from 'src/components/fixed-header';
import { ThemeProvider, useTheme } from 'src/contexts';
import GlobalLoadingLayout from 'src/components/global-loading-layout';

import ContactHero from '../contact-hero';

function ContactContent() {
  const { isDarkMode } = useTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isDarkMode ? '#000000' : '#ffffff',
        overflow: 'hidden',
        transition: 'background-color 0.5s ease-in-out',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          backgroundColor: isDarkMode ? '#000000' : '#ffffff',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          transition: 'background-color 0.5s ease-in-out',
        }}
      >
        <FixedHeader />
      </Box>

      {/* Main content area - No scroll, fixed height */}
      <Box
        sx={{
          position: 'absolute',
          top: '80px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          overflow: 'hidden', // No scrolling
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Contact Hero - Full Page Fixed */}
        <ContactHero />
      </Box>
    </Box>
  );
}

export default function ContactView() {
  return (
    <ThemeProvider>
      <GlobalLoadingLayout>
        <ContactContent />
      </GlobalLoadingLayout>
    </ThemeProvider>
  );
}