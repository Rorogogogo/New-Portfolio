'use client';

import { m } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { varFade } from 'src/components/animate';
import { useTheme } from 'src/contexts';
import Iconify from 'src/components/iconify';
import BoxReveal from 'src/components/magicui/box-reveal';

const techStack = [
  { name: 'Java', icon: 'logos:java', color: '#F89820' },
  { name: 'JavaScript', icon: 'logos:javascript', color: '#F7DF1E' },
  { name: 'C#', icon: 'logos:c-sharp', color: '#239120' },
  { name: 'Python', icon: 'logos:python', color: '#3776AB' },
  { name: 'React', icon: 'logos:react', color: '#61DAFB' },
  { name: '.NET Core', icon: 'logos:dotnet', color: '#512BD4' },
  { name: 'PostgreSQL', icon: 'logos:postgresql', color: '#336791' },
  { name: 'MySQL', icon: 'logos:mysql', color: '#4479A1' },
  { name: 'AWS', icon: 'simple-icons:amazonaws', color: '#FF9900' },
  { name: 'Azure', icon: 'logos:microsoft-azure', color: '#0078D4' },
  { name: 'Docker', icon: 'logos:docker-icon', color: '#2496ED' },
  { name: 'GitHub Actions', icon: 'logos:github-actions', color: '#2088FF' },
];

const aiTools = [
  { name: 'Claude Code', icon: 'simple-icons:anthropic', color: '#D97706' },
  { name: 'Cursor', icon: 'simple-icons:cursor', color: '#000000' },
  { name: 'OpenAI API', icon: 'simple-icons:openai', color: '#412991' },
  { name: 'AssemblyAI', icon: 'material-symbols:mic', color: '#6366F1' },
  { name: 'Sora', icon: 'material-symbols:video-camera-front', color: '#10B981' },
];

export default function ContactSummary() {
  const { isDarkMode } = useTheme();

  return (
    <Container
      component={m.div}
      variants={varFade().inUp}
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
      }}
    >
      {/* Professional Summary */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <m.div variants={varFade().inUp}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 4,
              background: isDarkMode
                ? 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)'
                : 'linear-gradient(135deg, #059669 0%, #0891B2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            Professional Summary
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <BoxReveal boxColor={isDarkMode ? '#5046e6' : '#3B82F6'} duration={0.5}>
            <Typography
              variant="h6"
              sx={{
                maxWidth: '900px',
                mx: 'auto',
                lineHeight: 1.8,
                color: isDarkMode ? 'grey.300' : 'grey.700',
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                fontWeight: 400,
              }}
            >
              Detail-oriented Software Engineer experienced in delivering commercial-grade projects 
              in collaboration with Solution Architects. Proficient in .NET Core, React.ts, and 
              RESTful API development, with a strong interest in integrating AI tools to streamline 
              workflows. Demonstrated end-to-end development capabilities through side projects like 
              <Box component="span" sx={{ fontWeight: 600, color: isDarkMode ? '#10B981' : '#059669' }}>
                {' '}JobJourney - AI Job Search Assistant{' '}
              </Box>
              and 
              <Box component="span" sx={{ fontWeight: 600, color: isDarkMode ? '#3B82F6' : '#1E40AF' }}>
                {' '}StandTogether - non-profit public reporting platform
              </Box>
              , both focused on solving real-world problems.
            </Typography>
          </BoxReveal>
        </m.div>
      </Box>

      {/* Technical Knowledge */}
      <Box sx={{ mb: 8 }}>
        <m.div variants={varFade().inUp}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 6,
              textAlign: 'center',
              color: isDarkMode ? 'white' : 'black',
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Technical Knowledge
          </Typography>
        </m.div>

        {/* Programming Languages & Full Stack */}
        <Box sx={{ mb: 6 }}>
          <m.div variants={varFade().inUp}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 3,
                color: isDarkMode ? '#10B981' : '#059669',
                textAlign: 'center',
              }}
            >
              Core Technologies
            </Typography>
          </m.div>
          
          <m.div variants={varFade().inUp}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(6, 1fr)' },
                gap: 3,
                maxWidth: 1000,
                mx: 'auto',
              }}
            >
              {techStack.map((tech, index) => (
                <m.div
                  key={tech.name}
                  variants={varFade().inUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                      border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: `${tech.color}15`,
                        border: `1px solid ${tech.color}30`,
                        transform: 'translateY(-4px)',
                        boxShadow: `0 10px 30px ${tech.color}20`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        mx: 'auto',
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify
                        icon={tech.icon}
                        sx={{
                          width: 32,
                          height: 32,
                          color: tech.color,
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        textAlign: 'center',
                        color: isDarkMode ? 'white' : 'black',
                        fontSize: '0.875rem',
                      }}
                    >
                      {tech.name}
                    </Typography>
                  </Box>
                </m.div>
              ))}
            </Box>
          </m.div>
        </Box>

        {/* AI Tools */}
        <Box>
          <m.div variants={varFade().inUp}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 3,
                color: isDarkMode ? '#A855F7' : '#7C3AED',
                textAlign: 'center',
              }}
            >
              AI Tools & Integration
            </Typography>
          </m.div>
          
          <m.div variants={varFade().inUp}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              flexWrap="wrap"
              sx={{ gap: 2 }}
            >
              {aiTools.map((tool, index) => (
                <m.div
                  key={tool.name}
                  variants={varFade().inUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Chip
                    icon={
                      <Iconify
                        icon={tool.icon}
                        sx={{
                          width: 20,
                          height: 20,
                          color: tool.color,
                        }}
                      />
                    }
                    label={tool.name}
                    sx={{
                      px: 2,
                      py: 0.5,
                      height: 'auto',
                      minHeight: 40,
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                      border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                      color: isDarkMode ? 'white' : 'black',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: `${tool.color}15`,
                        border: `1px solid ${tool.color}30`,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 25px ${tool.color}20`,
                      },
                    }}
                  />
                </m.div>
              ))}
            </Stack>
          </m.div>
        </Box>
      </Box>

      {/* Education */}
      <Box sx={{ textAlign: 'center' }}>
        <m.div variants={varFade().inUp}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: isDarkMode ? 'white' : 'black',
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Education
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Box
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
              border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
              maxWidth: 600,
              mx: 'auto',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: isDarkMode ? '#10B981' : '#059669',
              }}
            >
              Master of Computer Science: Software Engineering
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: isDarkMode ? 'white' : 'black',
              }}
            >
              University of Sydney
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? 'grey.400' : 'grey.600',
                mb: 2,
              }}
            >
              Aug 2022 – June 2024 • Sydney, Australia
            </Typography>
            <Chip
              label="WAM: D"
              sx={{
                backgroundColor: isDarkMode ? '#10B981' : '#059669',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            />
          </Box>
        </m.div>
      </Box>
    </Container>
  );
}