import { useState } from 'react';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import Iconify from 'src/components/iconify';
import { varFade } from 'src/components/animate';
import { useTheme as useCustomTheme } from 'src/contexts';

export default function FixedHeader() {
  const theme = useTheme();
  const { isDarkMode, toggleTheme, currentPage, setCurrentPage } = useCustomTheme();
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'robert', label: 'Robert' },
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'robert') return; // Robert is just a label, not clickable
    
    setActiveSection(sectionId);
    setCurrentPage(sectionId);
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
          {navItems.map((item) => (
            <Typography
              key={item.id}
              variant="body1"
              onClick={() => handleNavClick(item.id)}
              sx={{
                color: isDarkMode ? 'white' : 'black',
                fontWeight: item.id === 'robert' ? 700 : (activeSection === item.id ? 600 : 400),
                cursor: item.id === 'robert' ? 'default' : 'pointer',
                position: 'relative',
                transition: 'all 0.5s ease-in-out',
                fontSize: item.id === 'robert' ? '1.2rem' : '1rem',
                '&:hover': {
                  color: isDarkMode ? alpha('#FFFFFF', 0.7) : alpha('#000000', 0.7),
                },
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
              {item.label}
            </Typography>
          ))}
          
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