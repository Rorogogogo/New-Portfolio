'use client';

import { useTheme as useMuiTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FixedHeader from 'src/components/fixed-header';
import { ThemeProvider, useTheme } from 'src/contexts';
import Particles from 'src/components/magicui/particles';
import Iconify from 'src/components/iconify';
import ScrollStack, { ScrollStackItem } from 'src/blocks/Components/ScrollStack/ScrollStack';
import GlobalLoadingLayout from 'src/components/global-loading-layout';

// Projects data
const projects = [
  {
    id: 'standtogether',
    title: 'StandTogether',
    period: 'May 2025 – Present',
    url: 'https://standtogether.club',
    description: 'Non-profit full-stack reporting platform for youth crime awareness initiative',
    gradient: 'from-purple-600 to-blue-600',
    bgColor: 'bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20',
    icon: 'material-symbols:volunteer-activism',
    color: '#667eea',
    stats: ['3,000+ visits', '30,000+ interactions', 'SBS Featured'],
    technologies: ['Next.js', '.NET Core', 'PostgreSQL', 'AWS', 'Azure', 'Google OAuth', 'OpenAI', 'Cloudinary'],
    achievements: [
      'Built and deployed using Next.js, .NET Core, PostgreSQL - selected as 6.21 protest\'s official site',
      'Featured in SBS interviews and media coverage with 3,000+ visits and 30,000+ event interactions in one week',
      'Hosted on AWS EC2 with Azure PostgreSQL, secured with Nginx and Cloudflare',
    ]
  },
  {
    id: 'jobjourney',
    title: 'JobJourney',
    period: 'Feb 2025 – Present',
    url: 'https://jobjourney.me',
    description: 'AI-powered job search automation platform with Chrome extension',
    gradient: 'from-pink-500 to-red-500',
    bgColor: 'bg-gradient-to-br from-pink-100 to-red-100 dark:from-pink-900/20 dark:to-red-900/20',
    icon: 'material-symbols:work',
    color: '#f093fb',
    stats: ['750+ users', '360K+ jobs', 'Chrome Store Listed'],
    technologies: ['React', 'TypeScript', '.NET Core', 'PostgreSQL', 'AWS', 'Chrome Extension', 'OpenAI', 'Stripe'],
    achievements: [
      'Built full-stack platform with React TypeScript frontend and .NET Core backend using PostgreSQL',
      'Deployed frontend and backend on separate AWS EC2 instances for scalable, high-performance operation',
      'Integrated Cloudinary, Google OAuth, Google Drive API, and Stripe for seamless user experience',
    ]
  },
  {
    id: 'mrexpress',
    title: 'Mr EXPRESS',
    period: 'Feb 2024 – June 2024',
    url: 'https://www.mrxpress.com.au/',
    description: 'Next-gen mobile repair platform - Team Leader role',
    gradient: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20',
    icon: 'material-symbols:smartphone',
    color: '#4facfe',
    stats: ['Team of 5', 'Real-time notifications', 'Production deployment'],
    technologies: ['Laravel', 'React', 'MySQL', 'AWS', 'Pusher', 'GitHub Actions'],
    achievements: [
      'Led a team of five to develop mobile repair platform using Laravel, React, MySQL, Eloquent ORM',
      'Designed system architecture and managed client communications for timely delivery',
      'Implemented real-time notifications and referral systems with Laravel Observers and Pusher',
    ]
  },
];

function ProjectCard({ project, isDarkMode }) {
  return (
    <ScrollStackItem itemClassName="overflow-hidden">
      <Box
        sx={{
          height: '100%',
          background: isDarkMode 
            ? 'linear-gradient(135deg, rgba(45, 45, 45, 0.95) 0%, rgba(35, 35, 35, 0.9) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 250, 250, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          border: isDarkMode 
            ? '1px solid rgba(255, 255, 255, 0.2)' 
            : '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: isDarkMode
            ? '0 25px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 0, 0, 0.1)'
            : '0 25px 60px rgba(0, 0, 0, 0.15), 0 0 40px rgba(0, 0, 0, 0.05)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${project.gradient})`,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: `radial-gradient(circle at top right, ${project.color}10, transparent 50%)`,
            pointerEvents: 'none',
          }
        }}
      >
        <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
          {/* Header Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {/* Icon */}
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${project.gradient})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 15px 35px ${project.color}40`,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 2,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${project.gradient})`,
                    filter: 'blur(8px)',
                    opacity: 0.6,
                    zIndex: -1,
                  }
                }}
              >
                <Iconify 
                  icon={project.icon} 
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    color: 'white',
                    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
                  }} 
                />
              </Box>

              {/* Title and Period */}
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', md: '1.8rem' },
                    mb: 0.5,
                    background: isDarkMode 
                      ? `linear-gradient(135deg, #ffffff, ${project.color})`
                      : `linear-gradient(135deg, #000000, ${project.color})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  {project.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? '#B0B0B0' : 'gray.600',
                    fontWeight: 500,
                  }}
                >
                  {project.period}
                </Typography>
              </Box>
            </Box>

            {/* Visit Button */}
            <Button
              variant="contained"
              size="large"
              startIcon={<Iconify icon="material-symbols:open-in-new" />}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                background: `linear-gradient(135deg, ${project.gradient})`,
                color: 'white',
                fontWeight: 600,
                px: 3,
                py: 1.5,
                borderRadius: 3,
                boxShadow: `0 10px 30px ${project.color}40`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: `linear-gradient(135deg, ${project.gradient})`,
                  transform: 'translateY(-3px)',
                  boxShadow: `0 15px 40px ${project.color}60`,
                },
              }}
            >
              Visit Project
            </Button>
          </Box>

          {/* Description */}
          <Typography
            variant="h6"
            sx={{
              color: isDarkMode ? '#D0D0D0' : 'gray.700',
              lineHeight: 1.6,
              mb: 4,
              fontSize: '1.1rem',
            }}
          >
            {project.description}
          </Typography>

          {/* Stats */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: isDarkMode ? '#FFFFFF' : 'gray.900',
              }}
            >
              Key Metrics
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {project.stats.map((stat, idx) => (
                <Chip
                  key={idx}
                  label={stat}
                  sx={{
                    background: `linear-gradient(135deg, ${project.color}20, ${project.color}10)`,
                    color: project.color,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    border: `1px solid ${project.color}30`,
                    borderRadius: 2,
                    height: 36,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${project.color}30, ${project.color}20)`,
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Technologies and Achievements */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 4, flexGrow: 1 }}>
            {/* Technologies */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: isDarkMode ? '#FFFFFF' : 'gray.900',
                }}
              >
                Tech Stack
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {project.technologies.slice(0, 6).map((tech, idx) => (
                  <Chip
                    key={idx}
                    label={tech}
                    size="small"
                    variant="outlined"
                    sx={{
                      color: isDarkMode ? '#E0E0E0' : 'gray.700',
                      borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                      fontSize: '0.75rem',
                      borderRadius: 1.5,
                      '&:hover': {
                        borderColor: project.color,
                        color: project.color,
                        background: `${project.color}10`,
                      },
                      transition: 'all 0.2s ease',
                    }}
                  />
                ))}
                {project.technologies.length > 6 && (
                  <Chip
                    label={`+${project.technologies.length - 6}`}
                    size="small"
                    variant="outlined"
                    sx={{
                      color: isDarkMode ? 'gray.400' : 'gray.600',
                      borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                      fontSize: '0.75rem',
                      borderRadius: 1.5,
                    }}
                  />
                )}
              </Box>
            </Box>

            {/* Achievements */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: isDarkMode ? '#FFFFFF' : 'gray.900',
                }}
              >
                Key Achievements
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {project.achievements.slice(0, 3).map((achievement, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${project.gradient})`,
                        mt: 1,
                        flexShrink: 0,
                        boxShadow: `0 0 8px ${project.color}50`,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDarkMode ? '#E0E0E0' : 'gray.700',
                        lineHeight: 1.6,
                        fontSize: '0.9rem',
                      }}
                    >
                      {achievement}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ScrollStackItem>
  );
}

function ProjectsContent() {
  const { isDarkMode } = useTheme();
  const theme = useMuiTheme();

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
        quantity={isDarkMode ? 30 : 20}
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
          overflow: 'hidden',
        }}
      >
        <ScrollStack 
          className={`${isDarkMode ? 'dark' : ''}`}
          itemDistance={150}
          itemScale={0.05}
          itemStackDistance={40}
          stackPosition="20%"
          scaleEndPosition="10%"
          baseScale={0.8}
        >
          {/* Title */}
          <div className="text-center mb-16">
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                background: isDarkMode
                  ? 'linear-gradient(135deg, #60A5FA 0%, #A855F7 100%)'
                  : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Featured Projects
            </Typography>
            <Typography
              variant="h6"
              className={`max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              A showcase of my recent work in full-stack development, featuring AI integration, 
              cloud deployment, and modern web technologies.
            </Typography>
          </div>

          {/* Project Cards */}
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              isDarkMode={isDarkMode}
            />
          ))}
        </ScrollStack>
      </Box>
    </Box>
  );
}

export default function ProjectsView() {
  return (
    <ThemeProvider>
      <GlobalLoadingLayout>
        <ProjectsContent />
      </GlobalLoadingLayout>
    </ThemeProvider>
  );
}