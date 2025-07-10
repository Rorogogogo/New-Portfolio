import { useState, useEffect, useRef } from 'react';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme, keyframes } from '@mui/material/styles';

import { MotionViewport, varFade } from 'src/components/animate';
import { useTheme as useCustomTheme } from 'src/contexts';
import { Globe } from 'src/components/globe';

// ----------------------------------------------------------------------

interface StatCounterProps {
  icon: string;
  label: string;
  value: number;
  suffix: string;
}

function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('*'.repeat(text.length));
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, 1000 + delay); // Start after 1 second + delay

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@.-+/';
    const finalText = text;
    const duration = 2000; // 2 seconds to match number animation exactly
    const steps = 60; // 60 FPS
    let currentStep = 0;

    const interval = setInterval(() => {
      let newText = '';
      // Use exponential curve to make text reveal feel like number counting
      const progress = Math.pow(currentStep / steps, 1.5); // Slower start, faster end
      const revealedChars = Math.floor(progress * finalText.length);
      
      for (let i = 0; i < finalText.length; i++) {
        if (i < revealedChars) {
          newText += finalText[i];
        } else {
          newText += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setDisplayText(newText);
      
      currentStep++;
      if (currentStep >= steps) {
        setDisplayText(finalText);
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [hasStarted, text]);

  return displayText;
}

function StatCounter({ icon, label, value, suffix }: StatCounterProps) {
  const { isDarkMode } = useCustomTheme();
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, 1000); // Start counting after 1 second

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasStarted || value === 0) return;

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
          color: isDarkMode ? 'white' : 'black',
          lineHeight: 1,
          mb: 0.5,
          transition: 'color 0.5s ease-in-out',
          fontFamily: 'monospace',
        }}
      >
        {icon} {value === 0 ? <AnimatedText text={suffix} /> : `${count}${suffix}`}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: { xs: '0.75rem', md: '0.875rem' },
          color: isDarkMode ? alpha('#FFFFFF', 0.7) : alpha('#000000', 0.7),
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: 1,
          transition: 'color 0.5s ease-in-out',
          wordWrap: 'break-word',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          lineHeight: 1.2,
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

const carouselAnimation = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
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
  const { isDarkMode, currentPage } = useCustomTheme();
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

  const renderPageContent = () => {
    if (currentPage === 'home') {
      return (
        <>
          {/* Left Sidebar - Skills */}
          <Box
            sx={{
              position: 'absolute',
              left: { lg: 30, xl: 50 },
              top: '0px',
              height: '100%',
              width: { md: '250px', lg: '250px' },
              overflow: 'hidden',
              zIndex: 100,
              display: { xs: 'none', lg: 'block' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                textAlign: 'right',
                animation: 'infiniteScrollDown 22s linear infinite',
                '&:hover': {
                  animationPlayState: 'paused',
                },
                '@keyframes infiniteScrollDown': {
                  '0%': {
                    transform: 'translateY(calc(-80px * 10 - 24px * 10))',
                  },
                  '100%': {
                    transform: 'translateY(0)',
                  },
                },
              }}
            >
              {/* Original set */}
              {[
                { icon: '📧', label: 'xwang.robert@gmail.com', value: 0, suffix: 'EMAIL' },
                { icon: '📱', label: '+61 416784179', value: 0, suffix: 'PHONE' },
                { icon: '📍', label: 'Sydney, Australia', value: 0, suffix: 'LOCATION' },
                { icon: '💼', label: 'Full Stack Developer', value: 0, suffix: 'ROLE' },
                { icon: '🎓', label: 'Master Computer Science', value: 0, suffix: 'EDUCATION' },
                { icon: '🏢', label: 'DDT Holdings', value: 0, suffix: 'COMPANY' },
                { icon: '🚀', label: 'jobjourney.me', value: 0, suffix: 'PROJECT 1' },
                { icon: '🛡️', label: 'standtogether.club', value: 0, suffix: 'PROJECT 2' },
                { icon: '🌟', label: 'Available for work', value: 0, suffix: 'STATUS' },
                { icon: '⏰', label: 'GMT+10', value: 0, suffix: 'TIMEZONE' },
              ].map((stat, index) => (
                <Box key={`original-${index}`} sx={{ mb: 3, height: '80px' }}>
                  <StatCounter
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                </Box>
              ))}

              {/* Duplicate set for seamless loop */}
              {[
                { icon: '📧', label: 'xwang.robert@gmail.com', value: 0, suffix: 'EMAIL' },
                { icon: '📱', label: '+61 416784179', value: 0, suffix: 'PHONE' },
                { icon: '📍', label: 'Sydney, Australia', value: 0, suffix: 'LOCATION' },
                { icon: '💼', label: 'Full Stack Developer', value: 0, suffix: 'ROLE' },
                { icon: '🎓', label: 'Master Computer Science', value: 0, suffix: 'EDUCATION' },
                { icon: '🏢', label: 'DDT Holdings', value: 0, suffix: 'COMPANY' },
                { icon: '🚀', label: 'jobjourney.me', value: 0, suffix: 'PROJECT 1' },
                { icon: '🛡️', label: 'standtogether.club', value: 0, suffix: 'PROJECT 2' },
                { icon: '🌟', label: 'Available for work', value: 0, suffix: 'STATUS' },
                { icon: '⏰', label: 'GMT+10', value: 0, suffix: 'TIMEZONE' },
              ].map((stat, index) => (
                <Box key={`duplicate-${index}`} sx={{ mb: 3, height: '80px' }}>
                  <StatCounter
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Main Grid Content */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gridTemplateRows: 'repeat(4, 1fr)',
              gap: 0.5,
              width: {
                xs: 'min(95vw, 85vh * 6/4)',
                sm: 'min(90vw, 80vh * 6/4)',
                md: 'min(85vw, 85vh * 6/4)',
                lg: 'min(calc(100vw - 620px), 80vh * 6/4)',
                xl: 'min(calc(100vw - 680px), 85vh * 6/4)',
              },
              aspectRatio: '6/4',
              borderRadius: { xs: 2, md: 3, lg: 4 },
              overflow: 'hidden',
              zIndex: 50,
              border: '1px solid #000000',
              backgroundColor: '#000000',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              mx: 'auto',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            {renderGrid()}
          </Box>

          {/* Right Sidebar - Stats */}
          <Box
            sx={{
              position: 'absolute',
              right: { lg: 30, xl: 50 },
              top: '0px',
              height: '100%',
              width: { md: '250px', lg: '250px' },
              overflow: 'hidden',
              zIndex: 100,
              display: { xs: 'none', lg: 'block' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
                animation: 'infiniteScroll 20s linear infinite',
                '&:hover': {
                  animationPlayState: 'paused',
                },
                '@keyframes infiniteScroll': {
                  '0%': {
                    transform: 'translateY(0)',
                  },
                  '100%': {
                    transform: 'translateY(calc(-80px * 8 - 24px * 8))',
                  },
                },
              }}
            >
              {/* Original set */}
              {[
                { icon: '☕', label: 'Consumed Annually', value: 2847, suffix: '' },
                { icon: '👥', label: 'Active Users', value: 769, suffix: '' },
                { icon: '💻', label: 'Lines of Code', value: 450, suffix: 'K' },
                { icon: '💀', label: 'Deaths in Elden Ring', value: 258, suffix: '' },
                { icon: '🎬', label: 'Tech Influencer Fans', value: 1998, suffix: '' },
                { icon: '🦆', label: 'Rubber Duck Chats', value: 89, suffix: '' },
                { icon: '🌙', label: 'All-nighters Pulled', value: 47, suffix: '' },
                { icon: '🔸', label: 'Semicolons Forgotten', value: 1156, suffix: '' },
              ].map((stat, index) => (
                <Box key={`original-${index}`} sx={{ mb: 3, height: '80px' }}>
                  <StatCounter
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                </Box>
              ))}

              {/* Duplicate set for seamless loop */}
              {[
                { icon: '☕', label: 'Consumed Annually', value: 2847, suffix: '' },
                { icon: '👥', label: 'Active Users', value: 769, suffix: '' },
                { icon: '💻', label: 'Lines of Code', value: 450, suffix: 'K' },
                { icon: '💀', label: 'Deaths in Elden Ring', value: 258, suffix: '' },
                { icon: '🎬', label: 'Tech Influencer Fans', value: 1998, suffix: '' },
                { icon: '🦆', label: 'Rubber Duck Chats', value: 89, suffix: '' },
                { icon: '🌙', label: 'All-nighters Pulled', value: 47, suffix: '' },
                { icon: '🔸', label: 'Semicolons Forgotten', value: 1156, suffix: '' },
              ].map((stat, index) => (
                <Box key={`duplicate-${index}`} sx={{ mb: 3, height: '80px' }}>
                  <StatCounter
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </>
      );
    }

    if (currentPage === 'about') {
      return (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: isDarkMode ? 'white' : 'black',
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            About Me
          </Typography>
          <Typography variant="body1">This is the About page content.</Typography>
        </Box>
      );
    }

    if (currentPage === 'projects') {
      return (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: isDarkMode ? 'white' : 'black',
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            Projects
          </Typography>
          <Typography variant="body1">This is the Projects page content.</Typography>
        </Box>
      );
    }

    if (currentPage === 'contact') {
      return (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: isDarkMode ? 'white' : 'black',
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            Contact
          </Typography>
          <Typography variant="body1">This is the Contact page content.</Typography>
        </Box>
      );
    }

    return null;
  };

  return (
    <Box
      component={MotionViewport}
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
        backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.5s ease-in-out',
        p: 0,
        m: 0,
        pt: '80px',
      }}
    >
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
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            maxWidth: '100vw',
            mx: 'auto',
            overflow: 'hidden',
          }}
        >
          {renderPageContent()}
        </Box>
      </Container>
    </Box>
  );
}
