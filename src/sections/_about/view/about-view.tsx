'use client';

import Box from '@mui/material/Box';

import FixedHeader from 'src/components/fixed-header';
import { ThemeProvider, useTheme } from 'src/contexts';
import Particles from 'src/components/magicui/particles';
import GlobalLoadingLayout from 'src/components/global-loading-layout';

import AboutHero from '../about-hero';
import AboutExperience from '../about-experience';
import AboutLocation from '../about-location';
import AboutSkills from '../about-skills';

function AboutContent() {
  const { isDarkMode } = useTheme();

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
      {/* Particle Background */}
      <Particles
        className=""
        quantity={isDarkMode ? 50 : 30}
        staticity={50}
        ease={50}
        refresh={false}
      />

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
        sx={{
          position: 'absolute',
          top: '80px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          overflow: 'auto',
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
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            alignItems: 'center',
            justifyItems: 'center',
            gap: 4,
            maxWidth: '1400px',
            mx: 'auto',
            px: 2,
          }}
        >
          {/* Orbital Animation on Left */}
          <AboutSkills />

          {/* Globe on Right */}
          <AboutLocation />
        </Box>

        {/* Experience Timeline */}
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <AboutExperience />
        </Box>
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
