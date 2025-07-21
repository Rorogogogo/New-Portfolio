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
    description: 'Designing and developing commercial-grade export management systems',
    technologies: ['React', 'TypeScript', '.NET Core', 'PostgreSQL', 'Azure DevOps', 'SignalR'],
    achievements: [
      'Designed microservices using Onion architecture with clean REST APIs',
      'Implemented role-based authentication using Entity Framework Identity and JWT',
      'Built automated email pipeline with Hangfire and Azure Service Bus',
      'Set up secure CI/CD pipelines in Azure DevOps with Key Vault integration',
    ],
    icon: 'material-symbols:rocket-launch',
    color: '#10B981',
  },
  {
    id: 'sam-coach',
    role: 'Full Stack Developing Intern',
    company: 'SAM.Coach',
    period: 'Jan 2024 – May 2024',
    location: 'Sydney, Australia',
    description: 'Engineered scalable CRM platform with comprehensive business modules',
    technologies: ['.NET Blazor', 'MySQL', 'EF Core', 'Azure', 'RESTful APIs', 'Figma'],
    achievements: [
      'Developed key business modules including sales tracking and user management',
      'Designed responsive UIs using Figma following accessibility standards',
      'Led iterative UAT cycles coordinating cross-functional teams',
      'Spearheaded Zoom Marketplace integration and technical documentation',
    ],
    icon: 'material-symbols:code',
    color: '#3B82F6',
  },
  {
    id: 'university-sydney',
    role: 'Student Life Ambassador',
    company: 'University Of Sydney',
    period: 'Feb 2023 – Dec 2024',
    location: 'Sydney, Australia',
    description: 'Delivered personalized support and led campus initiatives',
    technologies: ['Event Management', 'Survey Systems', 'Communications', 'Project Planning'],
    achievements: [
      'Conducted engaging information sessions for prospective students',
      'Led O-Week activities planning and execution with satisfaction surveys',
      'Contributed to university-wide consent campaign and campus improvements',
      'Compiled comprehensive feedback to refine student services',
    ],
    icon: 'material-symbols:school',
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
        maxWidth: '900px',
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
          minHeight: '600px',
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {/* Icon */}
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${experience.color}20, ${experience.color}40)`,
                border: `3px solid ${experience.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 15px 35px ${experience.color}40`,
                position: 'relative',
              }}
            >
              <Iconify
                icon={experience.icon}
                style={{
                  width: '36px',
                  height: '36px',
                  color: experience.color,
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                }}
              />
            </div>

            {/* Title and Period */}
            <div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: '2.2rem',
                  marginBottom: '8px',
                  color: isDarkMode ? '#ffffff' : '#000000', // Solid colors for better contrast
                  margin: '0 0 8px 0',
                }}
              >
                {experience.role}
              </h3>
              <h6
                style={{
                  color: isDarkMode ? '#ffffff' : experience.color, // White in dark mode for contrast
                  fontWeight: 600,
                  margin: '0 0 8px 0',
                  fontSize: '1.25rem',
                }}
              >
                {experience.company}
              </h6>
              <p
                style={{
                  color: isDarkMode ? '#B0B0B0' : '#666666',
                  fontWeight: 500,
                  margin: 0,
                  fontSize: '0.875rem',
                }}
              >
                {experience.period} • {experience.location}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            color: isDarkMode ? '#D0D0D0' : '#374151',
            lineHeight: 1.7,
            marginBottom: '40px',
            fontSize: '1.3rem',
            fontWeight: 400,
            margin: '0 0 40px 0',
          }}
        >
          {experience.description}
        </p>

        {/* Technologies and Achievements */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            flexGrow: 1,
          }}
        >
          {/* Technologies */}
          <div>
            <h6
              style={{
                fontWeight: 600,
                marginBottom: '24px',
                color: isDarkMode ? '#FFFFFF' : '#111827',
                fontSize: '1.1rem',
                margin: '0 0 24px 0',
              }}
            >
              Technologies
            </h6>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {experience.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  style={{
                    color: isDarkMode ? '#E0E0E0' : '#374151',
                    border: isDarkMode
                      ? '1px solid rgba(255,255,255,0.3)'
                      : '1px solid rgba(0,0,0,0.3)',
                    fontSize: '0.85rem',
                    borderRadius: '8px',
                    height: '36px',
                    padding: '0 12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    // NO hover transitions to prevent conflicts
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
                marginBottom: '24px',
                color: isDarkMode ? '#FFFFFF' : '#111827',
                fontSize: '1.1rem',
                margin: '0 0 24px 0',
              }}
            >
              Key Achievements
            </h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {experience.achievements.slice(0, 3).map((achievement, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: experience.color,
                      marginTop: '8px',
                      flexShrink: 0,
                      boxShadow: `0 0 12px ${experience.color}50`,
                    }}
                  />
                  <p
                    style={{
                      color: isDarkMode ? '#E0E0E0' : '#374151',
                      lineHeight: 1.7,
                      fontSize: '1rem',
                      margin: 0,
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
                maxWidth: '900px',
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
