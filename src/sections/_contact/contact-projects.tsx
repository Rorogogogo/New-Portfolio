'use client';

import { m } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { varFade } from 'src/components/animate';
import { useTheme } from 'src/contexts';
import Iconify from 'src/components/iconify';

const projects = [
  {
    title: 'StandTogether',
    period: 'May 2025 – Present',
    type: 'Individual Project',
    url: 'https://standtogether.club',
    description: 'Built and deployed a non-profit full-stack reporting platform for a youth crime awareness initiative; selected as 6.21 protest\'s official site and supported police with evidence.',
    achievements: [
      'Featured in SBS interviews and other media coverage',
      '3,000+ visits and 30,000+ event interactions in one week',
      '50+ user-submitted incidents contributing to official data collection'
    ],
    technologies: ['Next.js', '.NET Core', 'PostgreSQL', 'AWS EC2', 'Azure', 'Google OAuth', 'Cloudinary', 'OpenAI'],
    color: '#10B981',
    icon: 'material-symbols:volunteer-activism'
  },
  {
    title: 'JobJourney',
    period: 'Feb 2025 – Present',
    type: 'Individual Project',
    url: 'https://jobjourney.me',
    description: 'Built a full-stack job search automation platform with React TypeScript frontend and .NET Core backend, featuring AI-powered CV-JD matching and Chrome extension.',
    achievements: [
      'Achieved 750+ users and 360K+ jobs searched',
      '1,050+ searches and job saves with AI assistance',
      'Chrome extension listed on Google Web Store'
    ],
    technologies: ['React', 'TypeScript', '.NET Core', 'PostgreSQL', 'AWS EC2', 'Chrome Extension', 'OpenAI', 'Stripe'],
    color: '#3B82F6',
    icon: 'material-symbols:work'
  },
  {
    title: 'Mr EXPRESS - Mobile Repair Platform',
    period: 'Feb 2024 – June 2024',
    type: 'Team Leader',
    url: 'https://www.mrxpress.com.au/',
    description: 'Led a team of five to develop a mobile repair platform using Laravel, React, MySQL, implementing real-time notifications and referral systems.',
    achievements: [
      'Successfully led team of 5 developers',
      'Implemented Agile workflows and DevOps practices',
      'Deployed on AWS with automated monitoring'
    ],
    technologies: ['Laravel', 'React', 'MySQL', 'AWS', 'Pusher', 'GitHub Actions'],
    color: '#F59E0B',
    icon: 'material-symbols:phone-android'
  }
];

export default function ContactProjects() {
  const { isDarkMode } = useTheme();

  const handleProjectClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container
      component={m.div}
      variants={varFade().inUp}
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
      }}
    >
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <m.div variants={varFade().inUp}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 4,
              background: isDarkMode
                ? 'linear-gradient(135deg, #A855F7 0%, #3B82F6 100%)'
                : 'linear-gradient(135deg, #7C3AED 0%, #1E40AF 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            Featured Projects
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Typography
            variant="h6"
            sx={{
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              color: isDarkMode ? 'grey.400' : 'grey.600',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
            }}
          >
            Real-world solutions built with modern technologies and AI integration
          </Typography>
        </m.div>
      </Box>

      {/* Projects Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: 4,
          mb: 8,
        }}
      >
        {projects.map((project, index) => (
          <m.div
            key={project.title}
            variants={varFade().inUp}
            transition={{ delay: index * 0.2 }}
          >
            <Card
              sx={{
                height: '100%',
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                borderRadius: 3,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 20px 40px ${project.color}30`,
                  border: `1px solid ${project.color}50`,
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${project.color}, transparent)`,
                },
              }}
              onClick={() => handleProjectClick(project.url)}
            >
              <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Project Header */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        backgroundColor: `${project.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify
                        icon={project.icon}
                        sx={{
                          width: 28,
                          height: 28,
                          color: project.color,
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: isDarkMode ? 'white' : 'black',
                          mb: 0.5,
                        }}
                      >
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isDarkMode ? 'grey.400' : 'grey.600',
                          fontWeight: 500,
                        }}
                      >
                        {project.period}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Chip
                    label={project.type}
                    size="small"
                    sx={{
                      backgroundColor: `${project.color}20`,
                      color: project.color,
                      fontWeight: 600,
                      border: `1px solid ${project.color}30`,
                    }}
                  />
                </Box>

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{
                    color: isDarkMode ? 'grey.300' : 'grey.700',
                    lineHeight: 1.6,
                    mb: 3,
                    fontSize: '0.95rem',
                  }}
                >
                  {project.description}
                </Typography>

                {/* Key Achievements */}
                <Box sx={{ mb: 3, flexGrow: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: isDarkMode ? 'white' : 'black',
                    }}
                  >
                    Key Achievements
                  </Typography>
                  <Stack spacing={1}>
                    {project.achievements.map((achievement, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: project.color,
                            mt: 0.75,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: isDarkMode ? 'grey.400' : 'grey.600',
                            fontSize: '0.85rem',
                            lineHeight: 1.5,
                          }}
                        >
                          {achievement}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>

                {/* Technologies */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: isDarkMode ? 'white' : 'black',
                    }}
                  >
                    Technologies
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {project.technologies.slice(0, 6).map((tech, idx) => (
                      <Chip
                        key={idx}
                        label={tech}
                        size="small"
                        sx={{
                          fontSize: '0.75rem',
                          height: 24,
                          backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                          color: isDarkMode ? 'grey.300' : 'grey.700',
                          border: isDarkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.1)',
                        }}
                      />
                    ))}
                    {project.technologies.length > 6 && (
                      <Chip
                        label={`+${project.technologies.length - 6}`}
                        size="small"
                        sx={{
                          fontSize: '0.75rem',
                          height: 24,
                          backgroundColor: `${project.color}20`,
                          color: project.color,
                          border: `1px solid ${project.color}30`,
                        }}
                      />
                    )}
                  </Box>
                </Box>

                {/* Visit Button */}
                <Button
                  variant="outlined"
                  endIcon={<Iconify icon="material-symbols:open-in-new" />}
                  sx={{
                    borderColor: project.color,
                    color: project.color,
                    '&:hover': {
                      backgroundColor: `${project.color}10`,
                      borderColor: project.color,
                    },
                    alignSelf: 'flex-start',
                  }}
                >
                  Visit Project
                </Button>
              </CardContent>
            </Card>
          </m.div>
        ))}
      </Box>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center' }}>
        <m.div variants={varFade().inUp}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 3,
              color: isDarkMode ? 'grey.300' : 'grey.700',
            }}
          >
            Interested in collaborating on similar projects?
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            startIcon={<Iconify icon="material-symbols:handshake" />}
            onClick={() => window.open('mailto:xwang.robert@gmail.com', '_blank')}
            sx={{
              backgroundColor: '#10B981',
              '&:hover': { backgroundColor: '#059669' },
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
            }}
          >
            Let's Build Something Amazing
          </Button>
        </m.div>
      </Box>
    </Container>
  );
}