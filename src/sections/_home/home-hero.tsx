import { useState, useEffect, useRef } from 'react';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, useTheme, keyframes } from '@mui/material/styles';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

interface StatCounterProps {
  icon: string;
  label: string;
  value: number;
  suffix: string;
}

function StatCounter({ icon, label, value, suffix }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, 2000); // Start counting after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 2000; // 2 seconds animation
    const steps = 60; // 60 FPS
    const increment = value / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [hasStarted, value]);

  return (
    <Box
      sx={{
        textAlign: 'inherit',
        opacity: 0.8,
        transition: 'opacity 0.3s ease-in-out',
        '&:hover': {
          opacity: 1,
        },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: { xs: '1.5rem', md: '2rem' },
          fontWeight: 700,
          color: 'white',
          lineHeight: 1,
          mb: 0.5,
        }}
      >
        {icon} {count}
        {suffix}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: { xs: '0.75rem', md: '0.875rem' },
          color: alpha('#FFFFFF', 0.7),
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

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
          ? isHovered
            ? 'rotateY(0deg)'
            : 'rotateY(180deg)'
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
        setFlippedCells((prev) => {
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
          <GridCell key={cellId} row={row} col={col} isFlipped={isFlipped} delay={delay} />
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '1400px',
            px: { xs: 2, md: 4 },
            position: 'relative',
            height: '100%',
          }}
        >
          {/* Left Stats */}
          <m.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
            style={{
              position: 'absolute',
              left: '-180px',
              top: '30%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              alignItems: 'flex-end',
              textAlign: 'right',
            }}
          >
            <StatCounter icon="☕" label="Coffee Consumed Annually" value={2847} suffix="" />
            <StatCounter icon="👥" label="Active Users" value={769} suffix="" />
            <StatCounter icon="💻" label="Lines of Code" value={450} suffix="K" />
            <StatCounter icon="💀" label="Deaths in Elden Ring" value={258} suffix="" />
          </m.div>

          {/* Center Grid */}
          <m.div variants={varFade().inUp}>
            <Box
              sx={{
                width: {
                  xs: 'min(95vw, 85vh * 6/4)',
                  sm: 'min(90vw, 80vh * 6/4)',
                  md: 'min(85vw, 85vh * 6/4)',
                  lg: 'min(75vw, 85vh * 6/4)',
                  xl: 'min(70vw, 90vh * 6/4)',
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
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.background.paper, 0.05),
                  borderColor: alpha(theme.palette.grey[400], 0.3),
                  boxShadow: '0 16px 64px rgba(0, 0, 0, 0.4)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              {renderGrid()}
            </Box>
          </m.div>


          {/* Right Stats */}
          <m.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
            style={{
              position: 'absolute',
              right: '-180px',
              top: '30%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              alignItems: 'flex-start',
              textAlign: 'left',
            }}
          >
            <StatCounter icon="🎬" label="Tech Influencer Fans" value={1998} suffix="" />
            <StatCounter icon="🦆" label="Rubber Duck Conversations" value={89} suffix="" />
            <StatCounter icon="🌙" label="All-nighters Pulled" value={47} suffix="" />
            <StatCounter icon="🔸" label="Semicolons Forgotten" value={1.1} suffix="K" />
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}
