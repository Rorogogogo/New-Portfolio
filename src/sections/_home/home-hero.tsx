import { useState, useEffect, useRef } from 'react';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme, keyframes } from '@mui/material/styles';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const flipAnimation = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(180deg);
  }
`;

const hoverFlipAnimation = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(180deg);
  }
`;

const reverseFlipAnimation = keyframes`
  0% {
    transform: rotateY(180deg);
  }
  50% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(0deg);
  }
`;

interface GridCellProps {
  row: number;
  col: number;
  isFlipped: boolean;
  delay: number;
}

function GridCell({ row, col, isFlipped, delay }: GridCellProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [waveComplete, setWaveComplete] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Set waveComplete to true after the wave animation should be done
  useEffect(() => {
    if (isFlipped) {
      const timer = setTimeout(() => {
        setWaveComplete(true);
      }, 500); // Animation duration + buffer

      return () => clearTimeout(timer);
    }
  }, [isFlipped]);

  const handleMouseEnter = () => {
    if (waveComplete) {
      // Clear any pending timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (waveComplete) {
      // Add a small delay to prevent flickering
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(false);
      }, 100);
    }
  };

  const handleWaveEnd = () => {
    setWaveComplete(true);
  };

  const getAnimation = () => {
    if (isFlipped && !waveComplete) {
      return `${flipAnimation} 0.4s ease-in-out ${delay}s both`;
    }
    return 'none';
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onAnimationEnd={handleWaveEnd}
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        transformStyle: 'preserve-3d',
        animation: getAnimation(),
        cursor: waveComplete ? 'pointer' : 'default',
        transform: waveComplete 
          ? (isHovered ? 'rotateY(0deg)' : 'rotateY(180deg)')
          : 'rotateY(0deg)',
        transition: waveComplete ? 'transform 0.3s ease-in-out' : 'none',
      }}
    >
      {/* Black & White image (front face at 0deg - shows initially) */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/assets/hero/Black&White.png)',
          backgroundPosition: `${(col / 5) * 100}% ${(row / 3) * 100}%`,
          backgroundSize: '600% 400%',
          backgroundRepeat: 'no-repeat',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(0deg)',
          borderRadius: { xs: 0.5, md: 1 },
          pointerEvents: 'none',
        }}
      />
      {/* Colorful image (back face at 180deg - shows after flip) */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/assets/hero/Colorful.png)',
          backgroundPosition: `${(col / 5) * 100}% ${(row / 3) * 100}%`,
          backgroundSize: '600% 400%',
          backgroundRepeat: 'no-repeat',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: { xs: 0.5, md: 1 },
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
}

export default function HomeHero() {
  const theme = useTheme();
  const [animationStarted, setAnimationStarted] = useState(false);
  const [flippedCells, setFlippedCells] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!animationStarted) return;

    const animateByCol = (colIndex: number) => {
      setTimeout(() => {
        setFlippedCells(prev => {
          const newSet = new Set(prev);
          for (let row = 0; row < 4; row += 1) {
            newSet.add(`${row}-${colIndex}`);
          }
          return newSet;
        });
      }, colIndex * 300);
    };

    for (let col = 0; col < 6; col += 1) {
      animateByCol(col);
    }
  }, [animationStarted]);

  const renderGrid = () => {
    const cells = [];
    for (let row = 0; row < 4; row += 1) {
      for (let col = 0; col < 6; col += 1) {
        const cellId = `${row}-${col}`;
        const isFlipped = flippedCells.has(cellId);
        const delay = 0;

        cells.push(
          <GridCell
            key={cellId}
            row={row}
            col={col}
            isFlipped={isFlipped}
            delay={delay}
          />
        );
      }
    }
    return cells;
  };

  return (
    <Box
      component={MotionViewport}
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 0,
        m: 0,
      }}
    >
      {/* Floating Navigation */}
      <Box
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
          zIndex: 1100,
        }}
      >
        <m.div variants={varFade().inLeft}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              backgroundColor: alpha('#FFFFFF', 0.1),
              backdropFilter: 'blur(20px)',
              borderRadius: 3,
              p: 1.5,
              border: `1px solid ${alpha('#FFFFFF', 0.15)}`,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: alpha('#FFFFFF', 0.15),
                borderColor: alpha('#FFFFFF', 0.25),
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 32px ${alpha('#000000', 0.3)}`,
              },
            }}
          >
            <Logo sx={{ width: 32, height: 32 }} />
            
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                sx={{
                  color: 'white',
                  width: 32,
                  height: 32,
                  '&:hover': {
                    backgroundColor: alpha('#FFFFFF', 0.1),
                  },
                }}
              >
                <Iconify icon="solar:menu-dots-bold" />
              </IconButton>
              
              <IconButton
                size="small"
                sx={{
                  color: 'white',
                  width: 32,
                  height: 32,
                  '&:hover': {
                    backgroundColor: alpha('#FFFFFF', 0.1),
                  },
                }}
              >
                <Iconify icon="solar:settings-linear" />
              </IconButton>
            </Stack>
          </Stack>
        </m.div>
      </Box>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 0,
          m: 0,
        }}
      >
        <m.div variants={varFade().inUp}>
          <Box
            sx={{
              width: { 
                xs: 'min(95vw, 85vh * 6/4)', 
                sm: 'min(90vw, 80vh * 6/4)', 
                md: 'min(85vw, 85vh * 6/4)', 
                lg: 'min(80vw, 90vh * 6/4)',
                xl: 'min(75vw, 95vh * 6/4)'
              },
              aspectRatio: '6/4',
              position: 'relative',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gridTemplateRows: 'repeat(4, 1fr)',
              gap: 0.5,
              borderRadius: { xs: 2, md: 3, lg: 4 },
              border: `1px solid ${alpha(theme.palette.grey[300], 0.2)}`,
              backgroundColor: alpha(theme.palette.background.paper, 0.02),
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease-in-out',
              mx: 'auto',
              '&:hover': {
                backgroundColor: alpha(theme.palette.background.paper, 0.05),
                borderColor: alpha(theme.palette.grey[400], 0.3),
                transform: { xs: 'none', md: 'translateY(-2px)' },
                boxShadow: {
                  xs: 'none',
                  md: `0 8px 32px ${alpha(theme.palette.grey[900], 0.15)}`,
                },
              },
            }}
          >
            {renderGrid()}
          </Box>
        </m.div>
      </Container>
    </Box>
  );
}