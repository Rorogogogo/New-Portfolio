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
import SnakeGame from 'src/components/snake-game';

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
    web: '#FF6B35', // Orange
    dev: '#4ECDC4', // Teal
    e: '#45B7D1', // Blue
    l: '#96CEB4', // Green
    o: '#FFEAA7', // Yellow
    p: '#DDA0DD', // Plum
    e2: '#FFB3BA', // Pink
    r: '#FF6B6B', // Red
    slash: '#A8E6CF', // Light Green
    closing: '#87CEEB', // Sky Blue
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
        cursor: 'default',
      }}
    >
      <Box
        component="span"
        sx={{
          color: isDarkMode ? 'white' : 'black',
          transition: 'all 0.3s ease',
          display: 'inline-block',
          cursor: 'pointer',
          position: 'relative',
          '&:hover .english': {
            opacity: 0,
          },
          '&:hover .chinese': {
            opacity: 1,
          },
        }}
      >
        <Box component="span" className="english" sx={{ transition: 'opacity 0.3s ease' }}>
          <Typewriter text="Hello! 👋" delay={200} speed={50} onComplete={() => setStep(1)} />
        </Box>
        <Box
          component="span"
          className="chinese"
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            opacity: 0,
            transition: 'opacity 0.3s ease',
            color: isDarkMode ? 'white' : 'black',
          }}
        >
          你好! 👋
        </Box>
      </Box>
      {step >= 1 && (
        <>
          <br />
          <Box
            component="span"
            sx={{
              color: isDarkMode ? 'white' : 'black',
              transition: 'all 0.3s ease',
              display: 'inline-block',
              cursor: 'pointer',
              position: 'relative',
              '&:hover .english': {
                opacity: 0,
              },
              '&:hover .chinese': {
                opacity: 1,
              },
            }}
          >
            <Box component="span" className="english" sx={{ transition: 'opacity 0.3s ease' }}>
              <Typewriter
                text="I'm Robert Wang,"
                delay={100}
                speed={60}
                onComplete={() => setStep(2)}
              />
            </Box>
            <Box
              component="span"
              className="chinese"
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                opacity: 0,
                transition: 'opacity 0.3s ease',
                color: isDarkMode ? 'white' : 'black',
              }}
            >
              我是萝卜特王，
            </Box>
          </Box>
        </>
      )}
      {step >= 2 && (
        <>
          <br />
          <Box component="span" sx={{ color: isDarkMode ? 'white' : 'black' }}>
            <Typewriter text="a " delay={50} speed={60} onComplete={() => setStep(3)} />
          </Box>
        </>
      )}
      {step >= 3 && (
        <>
          {/* Web - separate hover */}
          <Box
            component="span"
            sx={{
              transition: 'all 0.3s ease',
              display: 'inline-block',
              cursor: 'pointer',
              position: 'relative',
              '&:hover .english': {
                opacity: 0,
              },
              '&:hover .chinese': {
                opacity: 1,
              },
            }}
          >
            <Box component="span" className="english" sx={{ transition: 'opacity 0.3s ease' }}>
              <Box component="span" sx={{ color: colors.web }}>
                <Typewriter text="Web" delay={30} speed={150} onComplete={() => setStep(4)} />
              </Box>
            </Box>
            <Box
              component="span"
              className="chinese"
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                opacity: 0,
                transition: 'opacity 0.3s ease',
                color: colors.web,
              }}
            >
              网站
            </Box>
          </Box>
        </>
      )}
      {step >= 4 && (
        <>
          {/* <Developer/> - separate hover */}
          <Box
            component="span"
            sx={{
              transition: 'all 0.3s ease',
              display: 'inline-block',
              cursor: 'pointer',
              position: 'relative',
              '&:hover .english': {
                opacity: 0,
              },
              '&:hover .chinese': {
                opacity: 1,
              },
            }}
          >
            <Box component="span" className="english" sx={{ transition: 'opacity 0.3s ease' }}>
              <Box component="span" sx={{ color: colors.dev }}>
                <Typewriter text="<Dev" delay={20} speed={150} onComplete={() => setStep(5)} />
              </Box>
              <Box component="span" sx={{ color: colors.e }}>
                <Typewriter text="e" delay={20} speed={150} onComplete={() => setStep(6)} />
              </Box>
              <Box component="span" sx={{ color: colors.l }}>
                <Typewriter text="l" delay={20} speed={150} onComplete={() => setStep(7)} />
              </Box>
              <Box component="span" sx={{ color: colors.o }}>
                <Typewriter text="o" delay={20} speed={150} onComplete={() => setStep(8)} />
              </Box>
              <Box component="span" sx={{ color: colors.p }}>
                <Typewriter text="p" delay={20} speed={150} onComplete={() => setStep(9)} />
              </Box>
              <Box component="span" sx={{ color: colors.e2 }}>
                <Typewriter text="e" delay={20} speed={150} onComplete={() => setStep(10)} />
              </Box>
              <Box component="span" sx={{ color: colors.r }}>
                <Typewriter text="r" delay={20} speed={150} onComplete={() => setStep(11)} />
              </Box>
              <Box component="span" sx={{ color: colors.slash }}>
                <Typewriter text="/" delay={20} speed={150} onComplete={() => setStep(12)} />
              </Box>
              <Box component="span" sx={{ color: colors.closing }}>
                <Typewriter text=">" delay={20} speed={150} onComplete={() => setStep(13)} />
              </Box>
            </Box>
            <Box
              component="span"
              className="chinese"
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                opacity: 0,
                transition: 'opacity 0.3s ease',
                background: `linear-gradient(135deg, ${colors.dev}, ${colors.e}, ${colors.l}, ${colors.o}, ${colors.p})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              &lt;开发者/&gt;
            </Box>
          </Box>
        </>
      )}
      {step >= 13 && (
        <>
          <Box component="span" sx={{ color: isDarkMode ? 'white' : 'black' }}>
            <Typewriter text="." delay={20} speed={150} onComplete={() => setStep(14)} />
          </Box>
        </>
      )}
      {step >= 14 && (
        <>
          <Box component="span" sx={{ fontSize: '0.7em' }}>
            <Typewriter text="👨‍💻" delay={50} speed={200} />
          </Box>
        </>
      )}
    </Typography>
  );
}

export default function AboutHero() {
  const { isDarkMode } = useTheme();

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
              Detail-oriented Software Engineer with experience delivering commercial-grade projects
              in collaboration with Solution Architects. Proficient in .NET Core, Next.js, React.ts,
              and RESTful API development, specializing in AI-integrated workflows. Notable projects
              include JobJourney (AI Job Search Assistant with 750+ users) and StandTogether
              (non-profit platform featured in SBS media). Passionate about building scalable,
              secure solutions with cloud-native deployments and automated CI/CD pipelines.
            </Typography>
          </BoxReveal>

          {/* Snake Game - GitHub Contribution Animation */}
          <Box sx={{ mt: 6, mb: 2 }}>
            <SnakeGame />
          </Box>
        </m.div>
      </Box>
    </Container>
  );
}
