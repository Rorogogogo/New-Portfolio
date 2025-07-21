'use client';

import { useRef } from 'react';
import Box from '@mui/material/Box';

import FixedHeader from 'src/components/fixed-header';
import { ThemeProvider, useTheme } from 'src/contexts';
import GlobalLoadingLayout from 'src/components/global-loading-layout';

import AboutHero from '../about-hero';
import AboutLocation from '../about-location';
import AboutSkills from '../about-skills';
import AboutExperience from '../about-experience';


function AboutContent() {
  const { isDarkMode } = useTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

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

      {/* Main content area */}
      <Box
        ref={scrollContainerRef}
        sx={{
          position: 'absolute',
          top: '80px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          overflow: 'auto',
          overflowX: 'hidden', // Prevent horizontal scrolling
          // Hide scrollbar
          scrollbarWidth: 'none', // Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Chrome, Safari, Edge
          },
          // Remove scrollBehavior: 'smooth' to prevent conflicts with manual animations
        }}
      >
        {/* Hero Section - Summary at top */}
        <Box sx={{ minHeight: '30vh', display: 'flex', alignItems: 'flex-start', pt: 2 }}>
          <AboutHero />
        </Box>

        {/* Orbital & Globe Section */}
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
            maxWidth: '1600px',
            mx: 'auto',
            px: 2,
          }}
        >
          {/* Orbital Animation on Left */}
          <Box sx={{ mr: { lg: -10 } }}> {/* Negative margin to pull them closer */}
            <AboutSkills />
          </Box>

          {/* Globe on Right */}
          <Box sx={{ ml: { lg: -10 } }}> {/* Negative margin to pull them closer */}
            <AboutLocation />
          </Box>
        </Box>

        {/* Experience Timeline - No external scroll progress */}
        <Box ref={experienceRef} sx={{ py: 8 }}>
          <AboutExperience scrollContainer={scrollContainerRef} />
        </Box>

        {/* Minimal space after experience section */}
        <Box sx={{ height: '20vh' }} />
      </Box>
    </Box>
  );
}

export default function AboutView() {
  return (
    <ThemeProvider>
      <GlobalLoadingLayout>
        <AboutContent />
      </GlobalLoadingLayout>
    </ThemeProvider>
  );
}
