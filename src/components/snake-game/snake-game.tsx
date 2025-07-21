'use client';

import { memo } from 'react';
import Box from '@mui/material/Box';

import { useTheme } from 'src/contexts';

interface SnakeGameProps {
  sx?: object;
}

function SnakeGame({ sx }: SnakeGameProps) {
  const { isDarkMode } = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        my: 4,
        mx: 'auto',
        overflow: 'hidden', // Prevent horizontal overflow
        ...sx,
      }}
    >
      <Box
        component="img"
        src={isDarkMode ? '/snake-Dark.svg' : '/snake-Light.svg'}
        alt="GitHub Contribution Snake Animation"
        sx={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          borderRadius: 2,
          transition: 'opacity 0.3s ease-in-out',
          '&:hover': {
            opacity: 0.8,
          },
        }}
      />
    </Box>
  );
}

export default memo(SnakeGame);