'use client';

import { useState, useEffect, useRef } from 'react';
import { m, useScroll, useTransform, useAnimationFrame, useMotionValue } from 'framer-motion';
import { Box, Container, Card, CardContent, Typography, Chip, Stack, Button, useTheme } from '@mui/material';
import Iconify from 'src/components/iconify';

// Custom Ticker Component
interface TickerProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
}

function CustomTicker({ children, direction = 'left', speed = 1 }: TickerProps) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const content = container.firstElementChild as HTMLElement;
      
      if (content) {
        setContainerWidth(container.offsetWidth);
        setContentWidth(content.scrollWidth);
      }
    }
  }, [children]);

  useAnimationFrame(() => {
    if (contentWidth > 0) {
      const currentX = x.get();
      const newX = direction === 'left' 
        ? currentX - speed 
        : currentX + speed;
      
      // Reset position when content has scrolled completely
      if (direction === 'left' && newX <= -contentWidth) {
        x.set(0);
      } else if (direction === 'right' && newX >= contentWidth) {
        x.set(0);
      } else {
        x.set(newX);
      }
    }
  });

  return (
    <div ref={containerRef} style={{ overflow: 'hidden', width: '100%' }}>
      <m.div
        style={{
          x,
          display: 'flex',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
        {/* Duplicate content for seamless loop */}
        {children}
        {children}
      </m.div>
    </div>
  );
}

const projects = [
  {
    id: 'standtogether',
    title: 'StandTogether',
    period: 'May 2025 – Present',
    url: 'https://standtogether.club',
    description: 'Non-profit full-stack reporting platform for youth crime awareness initiative',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    image: '/assets/images/projects/standtogether-preview.jpg',
    stats: ['3,000+ visits', '30,000+ interactions', 'SBS Featured'],
    technologies: ['Next.js', '.NET Core', 'PostgreSQL', 'AWS', 'Azure']
  },
  {
    id: 'jobjourney',
    title: 'JobJourney',
    period: 'Feb 2025 – Present',
    url: 'https://jobjourney.me',
    description: 'AI-powered job search automation platform with Chrome extension',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    image: '/assets/images/projects/jobjourney-preview.jpg',
    stats: ['750+ users', '360K+ jobs', 'Chrome Store Listed'],
    technologies: ['React', 'TypeScript', '.NET Core', 'PostgreSQL', 'Chrome Extension']
  },
  {
    id: 'mrexpress',
    title: 'Mr EXPRESS',
    period: 'Feb 2024 – June 2024',
    url: 'https://www.mrxpress.com.au/',
    description: 'Next-gen mobile repair platform - Team Leader role',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    image: '/assets/images/projects/mrexpress-preview.jpg',
    stats: ['Team of 5', 'Real-time notifications', 'Production deployment'],
    technologies: ['Laravel', 'React', 'MySQL', 'AWS', 'Pusher']
  }
];

interface ProjectBoxProps {
  project: typeof projects[0];
  isActive: boolean;
  onClick: () => void;
}

function ProjectBox({ project, isActive, onClick }: ProjectBoxProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        width: '100%',
        maxWidth: '800px',
        height: 'auto',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Card
        sx={{
          height: 'auto',
          minHeight: '400px',
          background: project.gradient,
          position: 'relative',
          overflow: 'hidden',
          border: isActive ? '2px solid #fff' : 'none',
          boxShadow: isActive 
            ? '0 12px 40px rgba(255, 255, 255, 0.2)'
            : '0 8px 25px rgba(0, 0, 0, 0.2)',
          transition: 'border 0.2s ease, box-shadow 0.2s ease',
          borderRadius: 3,
        }}
      >

        <CardContent sx={{ 
          p: 4, 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 1,
        }}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              {project.title}
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 3,
                lineHeight: 1.6,
              }}
            >
              {project.description}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                display: 'block',
                mb: 3,
                fontSize: '0.9rem',
              }}
            >
              {project.period}
            </Typography>

            {/* Stats */}
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
              {project.stats.map((stat, idx) => (
                <Chip
                  key={idx}
                  label={stat}
                  size="small"
                  sx={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                  }}
                />
              ))}
            </Stack>
          </Box>

          <Box>
            {/* Technologies */}
            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
              {project.technologies.slice(0, 4).map((tech, idx) => (
                <Chip
                  key={idx}
                  label={tech}
                  size="small"
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    fontSize: '0.75rem',
                  }}
                />
              ))}
              {project.technologies.length > 4 && (
                <Chip
                  label={`+${project.technologies.length - 4}`}
                  size="small"
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    fontSize: '0.75rem',
                  }}
                />
              )}
            </Stack>

            {/* Visit button */}
            <Button
              variant="contained"
              startIcon={<Iconify icon="material-symbols:open-in-new" />}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              Visit Project
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default function ProjectsTicker() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [currentProject, setCurrentProject] = useState(projects[0].title);

  // Simulate project change based on time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject(prev => {
        const currentIndex = projects.findIndex(p => p.title === prev);
        const nextIndex = (currentIndex + 1) % projects.length;
        return projects[nextIndex].title;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ 
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
      py: 8,
    }}>
      {/* Top Ticker */}
      <Box
        sx={{
          position: 'fixed',
          top: 80,
          left: 0,
          right: 0,
          zIndex: 10,
          pointerEvents: 'none',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <CustomTicker direction="left" speed={1}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: `1px ${theme.palette.text.primary}20`,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              margin: '0 2rem',
              whiteSpace: 'nowrap',
            }}
          >
            {currentProject} • 
          </Typography>
        </CustomTicker>
      </Box>

      {/* Main Content */}
      <Container
        sx={{
          pt: 12,
          pb: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 700,
            textAlign: 'center',
            mb: 4,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #60A5FA 0%, #A855F7 100%)'
              : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Featured Projects
        </Typography>

        {/* Vertical Projects Layout */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            width: '100%',
            maxWidth: '800px',
          }}
        >
          {projects.map((project, index) => (
            <Box key={project.id}>
              <ProjectBox
                project={project}
                isActive={currentProject === project.title}
                onClick={() => setCurrentProject(project.title)}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}