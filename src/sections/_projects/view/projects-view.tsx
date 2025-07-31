'use client';

import Box from '@mui/material/Box';
import { ThemeProvider, useTheme } from 'src/contexts';
import GlobalLoadingLayout from 'src/components/global-loading-layout';
import FixedHeader from 'src/components/fixed-header';
import ProjectsFlowingMenu from '../projects-flowing-menu';

// Projects data for the FlowingMenu
const projects = [
  {
    title: 'StandTogether',
    url: 'https://standtogether.club/en',
    description: 'Non-profit platform for youth crime awareness.',
    image: '/assets/images/hero/Black&White.png',
    period: 'May 2025 – Present',
    technologies: ['Next.js', '.NET Core', 'PostgreSQL', 'AWS', 'Azure', 'Google OAuth'],
    logo: '/assets/projects/StandTogether.svg',
  },
  {
    title: 'JobJourney',
    url: 'https://jobjourney.me',
    description: 'AI-powered job search automation platform.',
    image: '/assets/images/hero/Black&White2.png',
    period: 'Feb 2025 – Present',
    technologies: ['React', 'TypeScript', '.NET Core', 'PostgreSQL', 'Chrome Extension', 'OpenAI'],
    logo: '/assets/projects/JobJourney.svg',
  },
  {
    title: 'Everest Impex',
    url: 'https://everestimpex-landingpage.web.app/',
    description: 'Professional landing page.',
    image: '/assets/images/hero/Black&White.png',
    period: 'Nov 2024 – Present',
    technologies: ['TBD'],
    logo: '/assets/projects/EverestImpex.png',
  },
  {
    title: 'Mr.R Sushi',
    url: 'https://sushi.jobjourney.me/',
    description: "For my parent's sushi store.",
    image: '/assets/images/hero/Black&White.png',
    period: 'Apr 2025 – Jun 2025',
    technologies: ['TBD'],
    logo: '/assets/projects/Mr.R.png',
  },
  {
    title: 'Mr EXPRESS',
    url: 'https://www.mrxpress.com.au/',
    description: 'Next-gen mobile repair platform.',
    image: '/assets/images/hero/Black&White3.png',
    period: 'Feb 2024 – Jun 2024',
    technologies: ['Laravel', 'React', 'MySQL', 'AWS', 'Pusher', 'GitHub Actions'],
    logo: '/assets/projects/mrxpress.svg',
  },
];

function ProjectsContent() {
  const { isDarkMode } = useTheme();

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
        <ProjectsFlowingMenu projects={projects} />
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
