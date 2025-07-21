'use client';

import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { useTheme } from 'src/contexts';
import Iconify from 'src/components/iconify';
import ScrollStack, { ScrollStackItem } from 'src/blocks/Components/ScrollStack/ScrollStack';

const experiences = [
  {
    id: 'ddt-holdings',
    role: 'Full Stack Developer',
    company: 'DDT Holdings',
    period: 'Nov 2024 – Present',
    location: 'Sydney, Australia',
    description: 'Designed, developed, and deployed a commercial-grade export management system using React TypeScript, .NET Core, and PostgreSQL—delivering end-to-end solutions across architecture, deployment, data processing, and automated testing.',
    technologies: ['React', 'TypeScript', '.NET Core', 'PostgreSQL', 'Azure DevOps', 'SignalR', 'Hangfire', 'EDIFabric'],
    achievements: [
      'Designed microservices using Onion architecture with clean REST APIs, secured by IP whitelisting and firewall rules',
      'Implemented role-based authentication and authorization using Entity Framework Identity and JWT middleware',
      'Used EDIFabric for EDI parsing and object transformation; integrated Ghostscript for file format conversion',
      'Built an automated email pipeline with Hangfire to poll Exchange emails in a VM, push updates via Azure Service Bus, and send real-time alerts using SignalR',
      'Managed domain hosting and traffic through Cloudflare and nginx; applied strict firewall and IP whitelisting for API protection',
      'Set up secure CI/CD pipelines in Azure DevOps with Key Vault integration for secrets/configs, automated DB migrations, and custom agents to bypass firewall restrictions',
      'Added manual approval steps between environments, coordinated UAT, and worked closely with operations and third-party teams to meet business goals',
      'Gained hands-on experience working on CRM systems with functionality overlapping ERP features, including sales tracking, finance modules, and user permissions'
    ],
    icon: 'material-symbols:rocket-launch',
    logo: '/assets/experience/DDT.svg',
    color: '#10B981',
  },
  {
    id: 's4i-solutions',
    role: 'Full Stack Developer Intern',
    company: 'S4i - Solutions for Integrators',
    period: 'May 2024 – Aug 2024',
    location: 'Sydney, Australia',
    description: 'Built fully integrated systems using Blazor, Python, and AWS while implementing real-time monitoring solutions.',
    technologies: ['Blazor', 'MySQL', 'AWS', 'Python', 'xAPI', 'MQTT', 'Docker', 'Parcel JS'],
    achievements: [
      'Built a fully integrated tennis court booking system using Blazor and MySQL, deployed on AWS with HTTPS security',
      'Developed responsive lighting dashboards using xAPI and Python, optimizing data conversion for real-time updates',
      'Implemented MQTT protocol for UI integration and launched the dashboard on Docker, improving system responsiveness and client satisfaction',
      'Packaged and deployed the application using Parcel JS, incorporating client feedback to enhance the UI/UX'
    ],
    icon: 'material-symbols:integration-instructions',
    logo: '/assets/experience/S4I.svg',
    color: '#F59E0B',
  },
  {
    id: 'sam-coach',
    role: 'Full Stack Developing Intern',
    company: 'SAM.Coach',
    period: 'Jan 2024 – May 2024',
    location: 'Sydney, Australia',
    description: 'Engineered a scalable CRM platform using .NET Blazor, MySQL, EF Core, Azure services, and RESTful APIs; collaborated on designing and automating CI/CD pipelines with Azure DevOps.',
    technologies: ['.NET Blazor', 'MySQL', 'EF Core', 'Azure', 'RESTful APIs', 'Figma', 'Azure DevOps'],
    achievements: [
      'Developed key business modules including sales tracking, user management, and customer feedback systems; integrated data analytics to enable actionable insights',
      'Designed intuitive, responsive UIs using Figma, following user-centered design principles and accessibility standards to ensure consistent cross-device experiences',
      'Led iterative UAT cycles, coordinating cross-functional teams to identify and resolve issues, optimizing performance, usability, and overall client satisfaction',
      'Spearheaded technical integration and authored thorough documentation for successful Zoom Marketplace launch, ensuring full platform compliance and smooth user onboarding',
      'Recognized for strong communication skills, adherence to clean, maintainable coding practices, and consistent delivery within tight timelines'
    ],
    icon: 'material-symbols:code',
    logo: '/assets/experience/SAM.png',
    color: '#3B82F6',
  },
  {
    id: 'university-sydney',
    role: 'Student Life Ambassador',
    company: 'University Of Sydney',
    period: 'Feb 2023 – Dec 2024',
    location: 'Sydney, Australia',
    description: 'Delivered personalized support and conducted engaging information sessions for prospective students and campus visitors; facilitated detailed surveys to gather insights.',
    technologies: ['Event Management', 'Survey Systems', 'Communications', 'Project Planning'],
    achievements: [
      'Led planning and execution of O-Week activities, managing strategic wayfinding, providing hands-on event support, and administering satisfaction surveys',
      'Actively contributed to major initiatives including the university-wide consent campaign, campus design improvements, and usability testing for the new university website',
      'Compiled and communicated comprehensive feedback to key stakeholders to help refine student services and streamline administrative processes',
      'Promoted a more accessible, efficient, and student-centric campus environment through strategic initiatives and feedback collection'
    ],
    icon: 'material-symbols:school',
    logo: '/assets/experience/USYD.svg',
    color: '#8B5CF6',
  },
];

// Experience card for ScrollStack
function ExperienceCard({ experience }: { experience: (typeof experiences)[0] }) {
  const { isDarkMode } = useTheme();

  return (
    <ScrollStackItem itemClassName="overflow-hidden border-0 !w-auto !max-w-4xl !mx-auto">
      <ExperienceCardContent experience={experience} />
    </ScrollStackItem>
  );
}

// Simple experience card without ScrollStackItem
function ExperienceCardSimple({ experience }: { experience: (typeof experiences)[0] }) {
  return <ExperienceCardContent experience={experience} />;
}

// Experience card that uses sticky/pin stacking like Framer
function ExperienceStackCard({
  experience,
  index,
  externalScrollProgress,
}: {
  experience: (typeof experiences)[0];
  index: number;
  externalScrollProgress: number;
}) {
  // Calculate when each card should start sticking with hysteresis to prevent bumping
  const stickyStart = 0.35 + index * 0.05;
  const stickyEnd = 0.8;

  // Add buffer zone before becoming sticky to prevent jumping
  const preSticky = stickyStart - 0.02; // Start preparing 2% earlier
  const isNearSticky = externalScrollProgress >= preSticky;
  const isInStickyRange =
    externalScrollProgress >= stickyStart && externalScrollProgress <= stickyEnd;

  // Calculate smooth transition progress
  let transitionProgress = 0;
  if (externalScrollProgress >= preSticky && externalScrollProgress <= stickyStart) {
    // Smooth transition into sticky
    transitionProgress = (externalScrollProgress - preSticky) / 0.02;
  } else if (externalScrollProgress >= stickyStart) {
    transitionProgress = 1;
  }

  // Calculate stacking progress for transforms
  let stackProgress = 0;
  if (externalScrollProgress >= stickyStart) {
    if (externalScrollProgress <= stickyEnd) {
      const range = 0.08; // Wider range for smoother stacking
      const rawProgress = (externalScrollProgress - stickyStart) / range;
      stackProgress = Math.min(1, rawProgress);
    } else {
      stackProgress = 1;
    }
  }

  // Smooth transforms based on transition and stack progress
  const scale = isInStickyRange
    ? 0.95 - index * 0.025
    : 1 - (1 - (0.95 - index * 0.025)) * transitionProgress;
  const stackOffset = isInStickyRange ? index * 18 : index * 18 * transitionProgress;
  const rotation = isInStickyRange ? index * 0.8 : index * 0.8 * transitionProgress;

  // Use consistent top value to prevent jumping
  const topValue = isNearSticky ? '120px' : 'auto';

  return (
    <Box
      sx={{
        position: isInStickyRange ? 'sticky' : 'relative',
        top: topValue,
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        mb: '140px',
        transform: `translateY(${stackOffset}px) scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: 'top center',
        zIndex: index + 1,
        willChange: 'transform',
        // Smooth out any remaining micro-jumps
        backfaceVisibility: 'hidden',
        perspective: 1000,
      }}
    >
      <ExperienceCardContent experience={experience} />
    </Box>
  );
}

// Shared card content - NO MUI Box to eliminate transition conflicts
function ExperienceCardContent({ experience }: { experience: (typeof experiences)[0] }) {
  const { isDarkMode } = useTheme();

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        background: isDarkMode
          ? 'linear-gradient(135deg, rgba(45, 45, 45, 0.95) 0%, rgba(35, 35, 35, 0.9) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 250, 250, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isDarkMode
          ? '0 25px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 0, 0, 0.1)'
          : '0 25px 60px rgba(0, 0, 0, 0.15), 0 0 40px rgba(0, 0, 0, 0.05)',
        // NO transitions that could conflict
        transition: 'none',
        WebkitTransition: 'none',
      }}
    >
      {/* Top gradient bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${experience.color}, transparent)`,
        }}
      />

      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: `radial-gradient(circle at top right, ${experience.color}10, transparent 50%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Content Container - Pure HTML for zero conflicts */}
      <div
        style={{
          padding: '32px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
          minHeight: '450px', // Reduced height for horizontal layout
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {/* Icon */}
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '10px',
                background: experience.logo 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : `linear-gradient(135deg, ${experience.color}20, ${experience.color}40)`,
                border: experience.logo 
                  ? '2px solid rgba(255, 255, 255, 0.2)' 
                  : `3px solid ${experience.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 15px 35px ${experience.color}40`,
                position: 'relative',
              }}
            >
              {experience.logo ? (
                <img
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                  }}
                />
              ) : (
                <Iconify
                  icon={experience.icon}
                  style={{
                    width: '45px',
                    height: '45px',
                    color: experience.color,
                    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                  }}
                />
              )}
            </div>

            {/* Title and Period */}
            <div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: '2.2rem',
                  marginBottom: '6px',
                  color: isDarkMode ? '#ffffff' : '#000000', // Solid colors for better contrast
                  margin: '0 0 6px 0',
                }}
              >
                {experience.role}
              </h3>
              <h6
                style={{
                  color: isDarkMode ? '#ffffff' : experience.color, // White in dark mode for contrast
                  fontWeight: 600,
                  margin: '0 0 6px 0',
                  fontSize: '1.4rem',
                }}
              >
                {experience.company}
              </h6>
              <p
                style={{
                  color: isDarkMode ? '#B0B0B0' : '#666666',
                  fontWeight: 500,
                  margin: 0,
                  fontSize: '1rem',
                }}
              >
                {experience.period} • {experience.location}
              </p>
            </div>
          </div>
        </div>


        {/* Main Content - Horizontal Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 300px 1fr',
            gap: '32px',
            flexGrow: 1,
            alignItems: 'start',
          }}
        >
          {/* Description Column */}
          <div>
            <p
              style={{
                color: isDarkMode ? '#D0D0D0' : '#374151',
                lineHeight: 1.6,
                fontSize: '1.1rem',
                fontWeight: 400,
                margin: 0,
                textAlign: 'justify',
              }}
            >
              {experience.description}
            </p>
          </div>
          {/* Technologies */}
          <div>
            <h6
              style={{
                fontWeight: 600,
                marginBottom: '16px',
                color: isDarkMode ? '#FFFFFF' : '#111827',
                fontSize: '1.2rem',
                margin: '0 0 16px 0',
              }}
            >
              Technologies
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {experience.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  style={{
                    color: isDarkMode ? '#E0E0E0' : '#374151',
                    border: isDarkMode
                      ? '1px solid rgba(255,255,255,0.3)'
                      : '1px solid rgba(0,0,0,0.3)',
                    fontSize: '0.95rem',
                    borderRadius: '6px',
                    height: '32px',
                    padding: '0 10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'none',
                    WebkitTransition: 'none',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h6
              style={{
                fontWeight: 600,
                marginBottom: '16px',
                color: isDarkMode ? '#FFFFFF' : '#111827',
                fontSize: '1.2rem',
                margin: '0 0 16px 0',
              }}
            >
              Key Achievements
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {experience.achievements.slice(0, 4).map((achievement, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: experience.color,
                      marginTop: '10px',
                      flexShrink: 0,
                      boxShadow: `0 0 8px ${experience.color}50`,
                    }}
                  />
                  <p
                    style={{
                      color: isDarkMode ? '#E0E0E0' : '#374151',
                      lineHeight: 1.5,
                      fontSize: '1rem',
                      margin: 0,
                      textAlign: 'justify',
                    }}
                  >
                    {achievement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AboutExperienceProps {
  scrollContainer?: React.RefObject<HTMLDivElement>;
}

export default function AboutExperience({ scrollContainer }: AboutExperienceProps) {
  const { isDarkMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  // Single direct scroll listener - no React state updates
  useEffect(() => {
    if (!scrollContainer?.current) return;

    const scrollElement = scrollContainer.current;
    let ticking = false;

    const updateCards = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = scrollElement.scrollTop;
        const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
        const scrollProgress = scrollTop / scrollHeight;

        const cards = document.querySelectorAll('[data-experience-card]');

        cards.forEach((card, index) => {
          const element = card as HTMLElement;

          // Calculate when this card should start sticking
          const stickyStart = 0.25 + index * 0.04;
          const stickyEnd = 0.98; // Keep cards visible until 98% scroll

          let progress = 0;
          let shouldStick = false;

          if (scrollProgress >= stickyStart && scrollProgress <= stickyEnd) {
            shouldStick = true;
            progress = Math.min(1, (scrollProgress - stickyStart) / 0.1);
          } else if (scrollProgress > stickyEnd) {
            progress = 1;
          }

          // Smooth transforms
          const targetScale = 0.95 - index * 0.02;
          const targetOffset = index * 20;
          const targetRotation = index * 1;

          const scale = shouldStick ? targetScale : 1 - progress * (1 - targetScale);
          const offset = shouldStick ? targetOffset : progress * targetOffset;
          const rotation = shouldStick ? targetRotation : progress * targetRotation;

          // Use consistent positioning - avoid position switching
          if (shouldStick) {
            element.style.position = 'sticky';
            element.style.top = '30px';
          } else {
            // Keep position relative to avoid jumps
            element.style.position = 'relative';
            element.style.top = '0px';
          }

          // Apply transforms with GPU acceleration
          element.style.transform = `translate3d(0, ${offset}px, 0) scale(${scale}) rotate(${rotation}deg)`;
          element.style.transformOrigin = 'top center';
          element.style.zIndex = String(10 + index);
          element.style.willChange = 'transform';

          // Add transition dampening to prevent micro-jumps
          element.style.transition = 'transform 0.05s ease-out';
        });

        ticking = false;
      });
    };

    scrollElement.addEventListener('scroll', updateCards, { passive: true });
    return () => scrollElement.removeEventListener('scroll', updateCards);
  }, [scrollContainer]);

  const hasExternalScroll = scrollContainer !== undefined;

  // ALWAYS use simple layout - completely eliminate ScrollStack conflicts
  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        minHeight: '100vh',
        px: { xs: 2, md: 4 },
        py: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Title */}
        <Box sx={{ textAlign: 'center', mb: 12 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              background: isDarkMode
                ? 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)'
                : 'linear-gradient(135deg, #059669 0%, #0891B2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            Career Timeline
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              color: isDarkMode ? '#B0B0B0' : '#666666',
            }}
          >
            My professional journey and key milestones in full-stack development
          </Typography>
        </Box>

        {/* Pure Experience Cards - ZERO animation conflicts */}
        <Box
          sx={{
            position: 'relative',
            minHeight: '200vh', // Reduced from 300vh to prevent excessive scrolling
          }}
        >
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              data-experience-card
              style={{
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                marginBottom: '140px',
                transformOrigin: 'top center',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                perspective: '1000px',
                WebkitPerspective: '1000px',
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
              }}
            >
              <ExperienceCardContent experience={experience} />
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
