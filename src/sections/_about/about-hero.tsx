'use client';

import { useState } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

import { varFade } from 'src/components/animate';
import { useTheme } from 'src/contexts';
import Iconify from 'src/components/iconify';
import CountUp from 'src/components/count-up';
import TextReveal from 'src/components/text-reveal';
import BoxReveal from 'src/components/magicui/box-reveal';
import { OrbitingCircles } from 'src/components/magicui/orbiting-circles';
import { Globe } from 'src/components/globe';
import Typewriter from 'src/components/magicui/typewriter';

const techStack = [
  { name: 'React', icon: 'logos:react', color: '#61DAFB' },
  { name: 'Next.js', icon: 'logos:nextjs-icon', color: '#000000' },
  { name: 'TypeScript', icon: 'logos:typescript-icon', color: '#3178C6' },
  { name: '.NET', icon: 'logos:dotnet', color: '#512BD4' },
  { name: 'C#', icon: 'logos:c-sharp', color: '#239120' },
  { name: 'Python', icon: 'logos:python', color: '#3776AB' },
  { name: 'PostgreSQL', icon: 'logos:postgresql', color: '#336791' },
  { name: 'AWS', icon: 'simple-icons:amazonaws', color: '#FF9900' },
  { name: 'Docker', icon: 'logos:docker-icon', color: '#2496ED' },
  { name: 'Git', icon: 'logos:git-icon', color: '#F05032' },
  { name: 'Node.js', icon: 'logos:nodejs-icon', color: '#339933' },
  { name: 'MongoDB', icon: 'logos:mongodb-icon', color: '#47A248' },
];

function ColorfulDevText() {
  const { isDarkMode } = useTheme();
  const [step, setStep] = useState(0);
  
  const colors = {
    web: '#FF6B35',      // Orange
    dev: '#4ECDC4',      // Teal
    e: '#45B7D1',        // Blue
    l: '#96CEB4',        // Green
    o: '#FFEAA7',        // Yellow
    p: '#DDA0DD',        // Plum
    e2: '#FFB3BA',       // Pink
    r: '#FF6B6B',        // Red
    slash: '#A8E6CF',    // Light Green
    closing: '#87CEEB'   // Sky Blue
  };

  return (
    <Typography
      variant="h1"
      sx={{
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
        fontWeight: 700,
        lineHeight: 1.2,
        mb: 3,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minHeight: { xs: '180px', md: '220px' }, // Reserve space to prevent layout shift
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          textShadow: isDarkMode 
            ? '0 0 20px rgba(255, 255, 255, 0.3)' 
            : '0 0 20px rgba(0, 0, 0, 0.3)',
        }
      }}
    >
      <Box component="span" sx={{ color: isDarkMode ? 'white' : 'black' }}>
        <Typewriter
          text="Hello! 👋"
          delay={500}
          speed={100}
          onComplete={() => setStep(1)}
        />
      </Box>
      {step >= 1 && (
        <>
          <br />
          <Box component="span" sx={{ color: isDarkMode ? 'white' : 'black' }}>
            <Typewriter
              text="I'm Robert Wang,"
              delay={300}
              speed={80}
              onComplete={() => setStep(2)}
            />
          </Box>
        </>
      )}
      {step >= 2 && (
        <>
          <br />
          <Box component="span" sx={{ color: isDarkMode ? 'white' : 'black' }}>
            <Typewriter
              text="a "
              delay={200}
              speed={80}
              onComplete={() => setStep(3)}
            />
          </Box>
        </>
      )}
      {step >= 3 && (
        <>
          <Box component="span" sx={{ 
            color: colors.web,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: '#FF8C69',
              transform: 'scale(1.1)',
              textShadow: '0 0 10px rgba(255, 107, 53, 0.5)',
            }
          }}>
            <Typewriter text="Web" delay={100} speed={120} onComplete={() => setStep(4)} />
          </Box>
        </>
      )}
      {step >= 4 && (
        <>
          <Box component="span" sx={{ 
            color: colors.dev,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: '#5FE9DC',
              transform: 'scale(1.1)',
              textShadow: '0 0 10px rgba(78, 205, 196, 0.5)',
            }
          }}>
            <Typewriter text="<Dev" delay={50} speed={100} onComplete={() => setStep(5)} />
          </Box>
        </>
      )}
      {step >= 5 && (
        <>
          <Box component="span" sx={{ 
            color: colors.e,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: '#5CC7F0',
              transform: 'scale(1.1)',
              textShadow: '0 0 10px rgba(69, 183, 209, 0.5)',
            }
          }}>
            <Typewriter text="e" delay={50} speed={100} onComplete={() => setStep(6)} />
          </Box>
        </>
      )}
      {step >= 6 && (
        <>
          <Box component="span" sx={{ 
            color: colors.l,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: '#A8E6CF',
              transform: 'scale(1.1)',
              textShadow: '0 0 10px rgba(150, 206, 180, 0.5)',
            }
          }}>
            <Typewriter text="l" delay={50} speed={100} onComplete={() => setStep(7)} />
          </Box>
        </>
      )}
      {step >= 7 && (
        <>
          <Box component="span" sx={{ 
            color: colors.o,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: '#FFF3CD',
              transform: 'scale(1.1)',
              textShadow: '0 0 10px rgba(255, 234, 167, 0.5)',
            }
          }}>
            <Typewriter text="o" delay={50} speed={100} onComplete={() => setStep(8)} />
          </Box>
        </>
      )}
      {step >= 8 && (
        <>
          <Box component="span" sx={{ 
            color: colors.p,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: '#E6B3FA',
              transform: 'scale(1.1)',
              textShadow: '0 0 10px rgba(221, 160, 221, 0.5)',
            }
          }}>
            <Typewriter text="p" delay={50} speed={100} onComplete={() => setStep(9)} />
          </Box>
        </>
      )}
      {step >= 9 && (
        <>
          <Box component="span" sx={{ 
            color: colors.e2,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: '#FFD1DC',
              transform: 'scale(1.1)',
              textShadow: '0 0 10px rgba(255, 179, 186, 0.5)',
            }
          }}>
            <Typewriter text="e" delay={50} speed={100} onComplete={() => setStep(10)} />
          </Box>
        </>
      )}
      {step >= 10 && (
        <>
          <Box component="span" sx={{ 
            color: colors.r,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: '#FF8E8E',
              transform: 'scale(1.1)',
              textShadow: '0 0 10px rgba(255, 107, 107, 0.5)',
            }
          }}>
            <Typewriter text="r" delay={50} speed={100} onComplete={() => setStep(11)} />
          </Box>
        </>
      )}
      {step >= 11 && (
        <>
          <Box component="span" sx={{ 
            color: colors.slash,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: '#C8F7C5',
              transform: 'scale(1.1)',
              textShadow: '0 0 10px rgba(168, 230, 207, 0.5)',
            }
          }}>
            <Typewriter text="/" delay={50} speed={100} onComplete={() => setStep(12)} />
          </Box>
        </>
      )}
      {step >= 12 && (
        <>
          <Box component="span" sx={{ 
            color: colors.closing,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: '#B0E0E6',
              transform: 'scale(1.1)',
              textShadow: '0 0 10px rgba(135, 206, 235, 0.5)',
            }
          }}>
            <Typewriter text=">" delay={50} speed={100} onComplete={() => setStep(13)} />
          </Box>
        </>
      )}
      {step >= 13 && (
        <>
          <Box component="span" sx={{ color: isDarkMode ? 'white' : 'black' }}>
            <Typewriter text="." delay={50} speed={100} onComplete={() => setStep(14)} />
          </Box>
        </>
      )}
      {step >= 14 && (
        <>
          <Box component="span" sx={{ fontSize: '0.7em' }}>
            <Typewriter text="👨‍💻" delay={200} speed={150} />
          </Box>
        </>
      )}
    </Typography>
  );
}

export default function AboutHero() {
  const { isDarkMode } = useTheme();

  const handleProfileClick = (event: React.MouseEvent) => {
    // Create cool particle effect
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create multiple particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;
      particle.style.width = '8px';
      particle.style.height = '8px';
      particle.style.borderRadius = '50%';
      particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';
      
      const angle = (Math.PI * 2 * i) / 20;
      const velocity = 100 + Math.random() * 100;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      document.body.appendChild(particle);
      
      // Animate particle
      particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
      ], {
        duration: 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).onfinish = () => {
        document.body.removeChild(particle);
      };
    }
  };

  return (
    <Container
      component={m.div}
      variants={varFade().inUp}
      sx={{
        pt: 0,
        pb: { xs: 4, md: 6 },
        pl: { xs: 2, md: 3 },
        position: 'relative',
      }}
    >
      {/* Text Content at Top Left */}
      <Box sx={{ textAlign: 'left', mb: 0, mt: 8 }}>
        <m.div variants={varFade().inUp}>
          <ColorfulDevText />

          <BoxReveal boxColor={isDarkMode ? '#5046e6' : '#3B82F6'} duration={0.5}>
            <Typography
              variant="h6"
              sx={{
                color: isDarkMode ? 'grey.300' : 'grey.700',
                fontWeight: 400,
                mb: 2,
                mt: 1,
                maxWidth: '100%',
                lineHeight: 1.6,
              }}
            >
              Detail-oriented Software Engineer with experience delivering commercial-grade projects in collaboration with Solution Architects. Proficient in .NET Core, Next.js, React.ts, and RESTful API development, specializing in AI-integrated workflows. Notable projects include JobJourney (AI Job Search Assistant with 750+ users) and StandTogether (non-profit platform featured in SBS media). Passionate about building scalable, secure solutions with cloud-native deployments and automated CI/CD pipelines.
            </Typography>
          </BoxReveal>
        </m.div>
      </Box>

    </Container>
  );
}