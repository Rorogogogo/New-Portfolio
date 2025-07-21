'use client';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade } from 'src/components/animate';
import { OrbitingCircles } from 'src/components/magicui/orbiting-circles';
import { useTheme } from 'src/contexts';
import Iconify from 'src/components/iconify';

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

export default function AboutSkills() {
  const { isDarkMode } = useTheme();

  const handleProfileClick = (event: React.MouseEvent) => {
    // Create tech icon particle burst effect
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create particles for each tech icon with wider range
    techStack.forEach((tech, index) => {
      // Create multiple instances of each tech for more impressive effect
      for (let j = 0; j < 2; j++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.width = '40px';
        particle.style.height = '40px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'white';
        particle.style.display = 'flex';
        particle.style.alignItems = 'center';
        particle.style.justifyContent = 'center';
        particle.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        // Create iconify element inside particle
        const iconElement = document.createElement('div');
        iconElement.innerHTML = `<iconify-icon icon="${tech.icon}" style="color: ${tech.color}; width: 24px; height: 24px;"></iconify-icon>`;
        particle.appendChild(iconElement);
        
        // Wider angle distribution and longer distance
        const baseAngle = (Math.PI * 2 * index) / techStack.length;
        const angleVariation = (Math.random() - 0.5) * 0.8; // Add some randomness
        const angle = baseAngle + angleVariation + (j * 0.3); // Offset for multiple instances
        
        const velocity = 200 + Math.random() * 300; // Increased range: 200-500px
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(particle);
        
        // Animate particle with longer duration and rotation
        particle.animate([
          { 
            transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', 
            opacity: 1 
          },
          { 
            transform: `translate(calc(-50% + ${vx}px), calc(-50% + ${vy}px)) scale(0.2) rotate(720deg)`, 
            opacity: 0 
          }
        ], {
          duration: 1500 + Math.random() * 500, // 1.5-2 seconds
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
          document.body.removeChild(particle);
        };
      }
    });
  };

  return (
    <Container
      component={m.div}
      variants={varFade().inUp}
      sx={{
        py: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Skills Orbiting Animation - Exact same size as globe */}
      <Box
        sx={{
          position: 'relative',
          width: 800, // Increased to match globe container
          height: 800, // Increased to match globe container
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          onClick={handleProfileClick}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: isDarkMode
              ? 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)'
              : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isDarkMode
              ? '0 8px 32px rgba(255, 255, 255, 0.1)'
              : '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: isDarkMode ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translate(-50%, -50%) scale(1.1)',
              boxShadow: isDarkMode
                ? '0 12px 48px rgba(255, 255, 255, 0.2)'
                : '0 12px 48px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <Box
            component="img"
            src="/favicon/apple-touch-icon.png"
            alt="Robert Wang Portrait"
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </Box>

        <OrbitingCircles radius={180} duration={20} reverse iconSize={70} path>
          {techStack.slice(0, 6).map((tech) => (
            <div
              key={tech.name}
              className="flex items-center justify-center rounded-full bg-white shadow-lg dark:bg-gray-800"
              style={{
                width: '70px',
                height: '70px',
              }}
            >
              <Iconify
                icon={tech.icon}
                style={{
                  width: 42,
                  height: 42,
                  color: tech.color,
                }}
              />
            </div>
          ))}
        </OrbitingCircles>

        <OrbitingCircles radius={270} duration={30} iconSize={60} path>
          {techStack.slice(6).map((tech) => (
            <div
              key={tech.name}
              className="flex items-center justify-center rounded-full bg-white shadow-lg dark:bg-gray-800"
              style={{
                width: '60px',
                height: '60px',
              }}
            >
              <Iconify
                icon={tech.icon}
                style={{
                  width: 36,
                  height: 36,
                  color: tech.color,
                }}
              />
            </div>
          ))}
        </OrbitingCircles>

        
        {/* Simple text below orbital - inside the orbital container */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0, // Right at the edge of the orbital
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: isDarkMode ? 'grey.300' : 'grey.700',
              fontWeight: 500,
              mb: 1,
            }}
          >
            Tech Stack
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? 'grey.400' : 'grey.600',
              lineHeight: 1.6,
            }}
          >
            Full Stack Developer • Modern Technologies
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}