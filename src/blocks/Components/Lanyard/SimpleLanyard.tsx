'use client';

import { Box, Card, CardContent, Typography, Avatar, Chip } from '@mui/material';
import { m } from 'framer-motion';
import { useTheme } from 'src/contexts';

interface SimpleLanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function SimpleLanyard({ 
  position,
  gravity,
  fov,
  transparent 
}: SimpleLanyardProps) {
  const { isDarkMode } = useTheme();

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      p: 2
    }}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card
          sx={{
            maxWidth: 300,
            background: isDarkMode 
              ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
            backdropFilter: 'blur(10px)',
            border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
            borderRadius: 3,
            boxShadow: isDarkMode 
              ? '0 8px 32px rgba(0,0,0,0.3)'
              : '0 8px 32px rgba(0,0,0,0.1)',
            transform: 'perspective(1000px) rotateX(5deg)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'perspective(1000px) rotateX(0deg) translateY(-5px)',
              boxShadow: isDarkMode 
                ? '0 12px 40px rgba(0,0,0,0.4)'
                : '0 12px 40px rgba(0,0,0,0.15)',
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  mr: 2,
                  background: 'linear-gradient(45deg, #7c3aed, #3b82f6)',
                }}
              >
                RW
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: isDarkMode ? 'white' : 'black',
                    mb: 0.5
                  }}
                >
                  Robert Wang
                </Typography>
                <Chip
                  label="Available for Work"
                  size="small"
                  sx={{
                    background: 'linear-gradient(45deg, #10b981, #059669)',
                    color: 'white',
                    fontSize: '0.75rem'
                  }}
                />
              </Box>
            </Box>
            
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode ? 'grey.300' : 'grey.600',
                mb: 2,
                lineHeight: 1.5
              }}
            >
              Full-Stack Developer passionate about creating innovative web solutions
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {['React', 'Next.js', 'TypeScript', '.NET'].map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: isDarkMode ? 'grey.600' : 'grey.400',
                    color: isDarkMode ? 'grey.300' : 'grey.700',
                    fontSize: '0.7rem'
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </m.div>
    </Box>
  );
}