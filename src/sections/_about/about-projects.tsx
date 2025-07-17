'use client';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { varFade } from 'src/components/animate';
import { useTheme } from 'src/contexts';
import Iconify from 'src/components/iconify';

const projects = [
  {
    title: 'StandTogether',
    period: 'May 2025 – Present',
    url: 'https://standtogether.club',
    description: 'Non-profit full-stack reporting platform for youth crime awareness initiative',
    achievements: [
      'Built and deployed using Next.js, .NET Core, PostgreSQL - selected as 6.21 protest\'s official site',
      'Featured in SBS interviews and media coverage with 3,000+ visits and 30,000+ event interactions in one week',
      'Hosted on AWS EC2 with Azure PostgreSQL, secured with Nginx and Cloudflare',
      'Integrated Google OAuth, Cloudinary, OpenAI for content moderation, and AWS SES for email delivery',
      'Engineered robust authentication and role-based authorization using JWT middleware and EF Core Identity',
    ],
    technologies: ['Next.js', '.NET Core', 'PostgreSQL', 'AWS', 'Azure', 'Google OAuth', 'OpenAI', 'Cloudinary'],
    stats: ['3,000+ visits', '30,000+ interactions', '50+ user incidents'],
  },
  {
    title: 'JobJourney',
    period: 'Feb 2025 – Present',
    url: 'https://jobjourney.me',
    description: 'AI-powered job search automation platform with Chrome extension',
    achievements: [
      'Built full-stack platform with React TypeScript frontend and .NET Core backend using PostgreSQL',
      'Deployed frontend and backend on separate AWS EC2 instances for scalable, high-performance operation',
      'Integrated Cloudinary, Google OAuth, Google Drive API, and Stripe for seamless user experience',
      'Developed Chrome extension (Google Web Store listed) for job site data scraping and real-time AI analysis',
      'Leveraged AssemblyAI, OpenAI, and MCP for advanced mock interview feature with tone and emotion analysis',
    ],
    technologies: ['React', 'TypeScript', '.NET Core', 'PostgreSQL', 'AWS', 'Chrome Extension', 'OpenAI', 'Stripe'],
    stats: ['750+ users', '360K+ jobs searched', '1,050+ searches'],
  },
  {
    title: 'Mr EXPRESS',
    period: 'Feb 2024 – June 2024',
    url: 'https://www.mrxpress.com.au/',
    description: 'Next-gen mobile repair platform - Team Leader role',
    achievements: [
      'Led a team of five to develop mobile repair platform using Laravel, React, MySQL, Eloquent ORM',
      'Designed system architecture and managed client communications for timely delivery',
      'Implemented real-time notifications and referral systems with Laravel Observers and Pusher',
      'Deployed platform on AWS with secure production environments and automated monitoring',
      'Led final product demonstrations and client Q&A sessions with polished handovers',
    ],
    technologies: ['Laravel', 'React', 'MySQL', 'AWS', 'Pusher', 'GitHub Actions'],
    stats: ['Team of 5', 'Real-time notifications', 'Production deployment'],
  },
];

export default function AboutProjects() {
  const { isDarkMode } = useTheme();

  return (
    <Container
      component={m.div}
      variants={varFade().inUp}
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <m.div variants={varFade().inDown}>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 8,
            fontWeight: 700,
            background: isDarkMode
              ? 'linear-gradient(135deg, #60A5FA 0%, #A855F7 100%)'
              : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Featured Projects
        </Typography>
      </m.div>

      <Grid container spacing={4} justifyContent="center">
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <m.div variants={varFade().inUp}>
              <Card
                sx={{
                  height: '100%',
                  background: isDarkMode
                    ? 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: isDarkMode
                    ? '0 8px 32px rgba(255, 255, 255, 0.05)'
                    : '0 8px 32px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: isDarkMode
                      ? '0 12px 48px rgba(255, 255, 255, 0.1)'
                      : '0 12px 48px rgba(0, 0, 0, 0.15)',
                  },
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        background: isDarkMode
                          ? 'linear-gradient(135deg, #333 0%, #555 100%)'
                          : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      <Iconify
                        icon="material-symbols:rocket-launch"
                        sx={{
                          width: 24,
                          height: 24,
                          color: isDarkMode ? '#64b5f6' : '#1976d2',
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
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
                          fontSize: '0.875rem',
                        }}
                      >
                        {project.period}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Stats */}
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
                    {project.stats.map((stat, idx) => (
                      <Chip
                        key={idx}
                        label={stat}
                        size="small"
                        sx={{
                          background: isDarkMode
                            ? 'rgba(100, 181, 246, 0.1)'
                            : 'rgba(25, 118, 210, 0.1)',
                          color: isDarkMode ? '#64b5f6' : '#1976d2',
                          fontWeight: 500,
                          fontSize: '0.75rem',
                        }}
                      />
                    ))}
                  </Stack>


                  {/* Technologies */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: isDarkMode ? 'white' : 'black',
                      }}
                    >
                      Technologies
                    </Typography>
                    
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                      {project.technologies.slice(0, 6).map((tech, idx) => (
                        <Chip
                          key={idx}
                          label={tech}
                          size="small"
                          variant="outlined"
                          sx={{
                            color: isDarkMode ? 'grey.400' : 'grey.600',
                            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                            fontSize: '0.7rem',
                            height: 24,
                          }}
                        />
                      ))}
                      {project.technologies.length > 6 && (
                        <Chip
                          label={`+${project.technologies.length - 6}`}
                          size="small"
                          variant="outlined"
                          sx={{
                            color: isDarkMode ? 'grey.400' : 'grey.600',
                            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                            fontSize: '0.7rem',
                            height: 24,
                          }}
                        />
                      )}
                    </Stack>
                  </Box>

                  {/* Visit button */}
                  <Button
                    variant="outlined"
                    startIcon={<Iconify icon="material-symbols:open-in-new" />}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      mt: 'auto',
                      color: isDarkMode ? '#64b5f6' : '#1976d2',
                      borderColor: isDarkMode ? '#64b5f6' : '#1976d2',
                      '&:hover': {
                        borderColor: isDarkMode ? '#90caf9' : '#1565c0',
                        backgroundColor: isDarkMode ? 'rgba(100, 181, 246, 0.04)' : 'rgba(25, 118, 210, 0.04)',
                      },
                    }}
                  >
                    Visit Project
                  </Button>
                </CardContent>
              </Card>
            </m.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}