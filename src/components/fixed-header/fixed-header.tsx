import { useState } from 'react';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { varFade } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import VideoText from 'src/components/video-text';
import TextReveal from 'src/components/text-reveal';
import { useRouter, usePathname } from 'src/routes/hooks';

import { useTheme as useCustomTheme } from 'src/contexts';

export default function FixedHeader() {
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { id: 'robert', label: 'Robert Wang', path: '/' },
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'projects', label: 'Projects', path: '/projects' },
    { id: 'contact', label: 'Contact', path: '/contact' },
  ];

  const getCurrentSection = () => {
    if (pathname === '/') return 'home';
    if (pathname === '/about') return 'about';
    if (pathname === '/projects') return 'projects';
    if (pathname === '/contact') return 'contact';
    return 'home';
  };

  const activeSection = getCurrentSection();

  const handleNavClick = (item: any) => {
    if (item.id === 'robert') return; // Robert is just a label, not clickable
    router.push(item.path);
  };

  const getFontWeight = (itemId: string) => {
    if (itemId === 'robert') return 700;
    return activeSection === itemId ? 600 : 400;
  };

  return (
    <Box
      component="header"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 2, md: 4 },
      }}
    >
      <m.div variants={varFade().inDown} style={{ width: '100%' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            maxWidth: '1400px',
            mx: 'auto',
            width: '100%',
          }}
        >
          {navItems.map((item) => {
            if (item.id === 'robert') {
              return (
                <Box
                  key={item.id}
                  sx={{
                    position: 'relative',
                    height: '40px',
                    minWidth: '160px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginLeft: '-20px', // Move more to the left
                  }}
                >
                  <VideoText
                    videoSrc="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4"
                    fontSize="36px"
                    fontWeight="bold"
                  >
                    {item.label}
                  </VideoText>
                </Box>
              );
            }

            return (
              <Typography
                key={item.id}
                component="div"
                variant="body1"
                onClick={() => handleNavClick(item)}
                sx={{
                  color: isDarkMode ? 'white' : 'black',
                  fontWeight: getFontWeight(item.id),
                  cursor: item.id === 'robert' ? 'default' : 'pointer',
                  position: 'relative',
                  transition: 'all 0.5s ease-in-out',
                  fontSize: item.id === 'robert' ? '1.8rem' : '1.2rem',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    width: activeSection === item.id ? '100%' : 0,
                    height: 2,
                    backgroundColor: isDarkMode ? 'white' : 'black',
                    transition: 'width 0.3s ease-in-out, background-color 0.5s ease-in-out',
                  },
                }}
              >
                <TextReveal>
                  {item.label}
                </TextReveal>
              </Typography>
            );
          })}

          <IconButton
            onClick={toggleTheme}
            sx={{
              color: isDarkMode ? 'white' : 'black',
              width: 40,
              height: 40,
              transition: 'all 0.5s ease-in-out',
              '&:hover': {
                backgroundColor: isDarkMode ? alpha('#FFFFFF', 0.1) : alpha('#000000', 0.1),
              },
            }}
          >
            <Iconify icon={isDarkMode ? 'solar:sun-bold' : 'solar:moon-bold'} />
          </IconButton>
        </Stack>
      </m.div>
    </Box>
  );
}
