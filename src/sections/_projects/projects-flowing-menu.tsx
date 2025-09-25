'use client';

import React from 'react';
import { gsap } from 'gsap';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from 'src/contexts';

interface ProjectItemProps {
  title: string;
  url: string;
  description: string;
  image: string;
  period: string;
  technologies: string[];
  logo?: string;
  hideMarqueeTitle?: boolean;
}

interface ProjectsFlowingMenuProps {
  projects?: ProjectItemProps[];
}

const defaultProjects: ProjectItemProps[] = [
  {
    title: 'StandTogether',
    url: 'https://standtogether.club',
    description: 'Non-profit platform for youth crime awareness.',
    image: '/assets/images/hero/Black&White.png',
    period: 'May 2025 – Present',
    technologies: ['Next.js', '.NET Core', 'PostgreSQL', 'AWS', 'Azure'],
    logo: '/assets/projects/StandTogether.svg',
  },
  {
    title: 'JobJourney',
    url: 'https://jobjourney.me',
    description: 'AI-powered job search automation platform.',
    image: '/assets/images/hero/Black&White2.png',
    period: 'Feb 2025 – Present',
    technologies: ['React', 'TypeScript', '.NET Core', 'Chrome Extension'],
    logo: '/assets/projects/JobJourney.svg',
  },
  {
    title: 'Jobicore',
    url: 'https://chromewebstore.google.com/detail/jobicorn/gpmbcfgnpcomljmocajpdppmoeaolaaa',
    description: 'Unicorn company career linktree platform.',
    image: '/assets/images/hero/Black&White.png',
    period: 'Jun 2024 – Present',
    technologies: ['Chrome Extension', 'React', 'TypeScript'],
    logo: '/assets/projects/Jobicorn.png',
  },
  {
    title: 'Mr EXPRESS',
    url: 'https://www.mrxpress.com.au/',
    description: 'Next-gen mobile repair platform.',
    image: '/assets/images/hero/Black&White3.png',
    period: 'Feb 2024 – June 2024',
    technologies: ['Laravel', 'React', 'MySQL', 'AWS', 'Pusher'],
    logo: '/assets/projects/mrxpress.svg',
  },
];

const ProjectsFlowingMenu: React.FC<ProjectsFlowingMenuProps> = ({
  projects = defaultProjects,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      {/* Flowing Menu */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {projects.map((project, idx) => (
          <ProjectMenuItem key={idx} {...project} isDarkMode={isDarkMode} />
        ))}
      </Box>
    </Box>
  );
};

const ProjectMenuItem: React.FC<ProjectItemProps & { isDarkMode: boolean }> = ({
  title,
  url,
  description,
  image,
  period,
  logo,
  isDarkMode,
  hideMarqueeTitle,
}) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }).to(
      marqueeInnerRef.current,
      { y: edge === 'top' ? '101%' : '-101%' },
      '<'
    );
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    return Array.from({ length: 6 }).map((_, idx) => (
      <React.Fragment key={idx}>
        {/* Project Title */}
        {!hideMarqueeTitle && (
          <Box
            component="span"
            sx={{
              color: '#060010',
              textTransform: 'uppercase',
              fontWeight: 700,
              fontSize: { xs: '2.5vh', md: '4vh' },
              lineHeight: 1.2,
              padding: '1vh 2vw 0',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Box>
        )}

        {/* Project Logo */}
        {logo && (
          <Box
            sx={{
              width: title === 'LaunchStory'
                ? { xs: '120px', md: '150px' }
                : title === 'JobJourney'
                ? { xs: '60px', md: '70px' }
                : { xs: '80px', md: '100px' },
              height: title === 'LaunchStory'
                ? { xs: '60px', md: '75px' }
                : title === 'JobJourney'
                ? { xs: '60px', md: '70px' }
                : { xs: '80px', md: '100px' },
              my: '1em',
              mx: '2vw',
              backgroundImage: `url(${logo})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
        )}


        {/* Description */}
        <Box
          component="span"
          sx={{
            color: '#060010',
            fontSize: { xs: '1.5vh', md: '2vh' },
            fontWeight: 500,
            padding: '0 2vw',
            whiteSpace: 'nowrap',
          }}
        >
          {description}
        </Box>

      </React.Fragment>
    ));
  }, [title, description, image, logo]);

  return (
    <Box
      ref={itemRef}
      sx={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        boxShadow: isDarkMode
          ? '0 -1px 0 0 rgba(255, 255, 255, 0.1)'
          : '0 -1px 0 0 rgba(0, 0, 0, 0.1)',
        backgroundColor: isDarkMode ? '#111111' : '#f8f9fa',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Box
        component="a"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          position: 'relative',
          cursor: 'pointer',
          textDecoration: 'none',
          color: isDarkMode ? 'white' : 'black',
          fontWeight: 600,
          fontSize: { xs: '3vh', md: '4vh' },
          textTransform: 'uppercase',
          transition: 'color 0.3s ease',
          '&:hover': {
            color: '#060010',
          },
          '&:focus-visible': {
            color: '#060010',
          },
        }}
      >
        {/* Main Content */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '3vh', md: '4vh' },
              fontWeight: 700,
              mb: 1,
              textTransform: 'uppercase',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: '1.5vh', md: '2vh' },
              opacity: 0.8,
              fontWeight: 400,
            }}
          >
            {period}
          </Typography>
        </Box>
      </Box>

      {/* Marquee Overlay */}
      <Box
        ref={marqueeRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'none',
          backgroundColor: 'white',
          transform: 'translateY(101%)',
        }}
      >
        <Box
          ref={marqueeInnerRef}
          sx={{
            height: '100%',
            width: '200%',
            display: 'flex',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              height: '100%',
              width: '200%',
              willChange: 'transform',
              animation: 'marquee 25s linear infinite',
              '@keyframes marquee': {
                from: { transform: 'translateX(0%)' },
                to: { transform: 'translateX(-50%)' },
              },
            }}
          >
            {repeatedMarqueeContent}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectsFlowingMenu;
