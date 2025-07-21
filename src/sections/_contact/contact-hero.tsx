'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import { varFade } from 'src/components/animate';
import { useTheme } from 'src/contexts';
import Iconify from 'src/components/iconify';
import Typewriter from 'src/components/magicui/typewriter';

const contactMethods = [
  {
    name: 'Email',
    value: 'xwang.robert@gmail.com',
    icon: 'material-symbols:mail',
    color: '#EA4335',
    action: 'copy',
  },
  {
    name: 'LinkedIn',
    value: 'https://linkedin.com/in/robert-xu-wang',
    icon: 'logos:linkedin-icon',
    color: '#0A66C2',
    action: 'link',
  },
  {
    name: 'GitHub',
    value: 'https://github.com/Rorogogogo',
    icon: 'logos:github-icon',
    color: '#181717',
    action: 'link',
  },
  {
    name: 'Phone',
    value: '+61416784179',
    icon: 'material-symbols:call',
    color: '#34A853',
    action: 'copy',
  },
];

export default function ContactHero() {
  const { isDarkMode } = useTheme();
  const [copySuccess, setCopySuccess] = useState('');

  const handleContactAction = async (method: (typeof contactMethods)[0]) => {
    if (method.action === 'copy') {
      try {
        await navigator.clipboard.writeText(method.value);
        setCopySuccess(`${method.name} copied!`);
      } catch (err) {
        setCopySuccess(`Failed to copy ${method.name}`);
      }
    } else if (method.action === 'link') {
      window.open(method.value, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: isDarkMode
          ? `
            radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)
          `
          : `
            radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
            linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)
          `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Geometric Background Shapes */}
      {[1, 2, 3, 4, 5].map((i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: { xs: 40, sm: 60, md: 120 },
            height: { xs: 40, sm: 60, md: 120 },
            borderRadius: i % 2 === 0 ? '50%' : '30%',
            background: `linear-gradient(45deg, ${contactMethods[(i - 1) % contactMethods.length]
              ?.color}20, transparent)`,
            border: `2px solid ${contactMethods[(i - 1) % contactMethods.length]?.color}30`,
            top: `${[15, 20, 75, 80, 45][i - 1]}%`,
            left: {
              xs: `${[5, 80, 10, 85, 88][i - 1]}%`,
              md: `${[10, 85, 15, 80, 90][i - 1]}%`,
            },
            transform: `rotate(${i * 30}deg)`,
            animation: `float${i} ${4 + i}s ease-in-out infinite`,
            zIndex: 0,
            '@keyframes float1': {
              '0%, 100%': { transform: 'rotate(30deg) translate(0, 0)' },
              '50%': { transform: 'rotate(30deg) translate(20px, -10px)' },
            },
            '@keyframes float2': {
              '0%, 100%': { transform: 'rotate(60deg) translate(0, 0)' },
              '50%': { transform: 'rotate(60deg) translate(-15px, 25px)' },
            },
            '@keyframes float3': {
              '0%, 100%': { transform: 'rotate(90deg) translate(0, 0)' },
              '50%': { transform: 'rotate(90deg) translate(25px, 15px)' },
            },
            '@keyframes float4': {
              '0%, 100%': { transform: 'rotate(120deg) translate(0, 0)' },
              '50%': { transform: 'rotate(120deg) translate(-20px, -20px)' },
            },
            '@keyframes float5': {
              '0%, 100%': { transform: 'rotate(150deg) translate(0, 0)' },
              '50%': { transform: 'rotate(150deg) translate(10px, 30px)' },
            },
          }}
        />
      ))}

      {/* Main Content - Asymmetric Layout */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '600px',
          width: '90%',
        }}
      >
        {/* Title Section - Responsive Offset */}
        <m.div variants={varFade().inLeft}>
          <Box
            sx={{
              ml: { xs: 0, md: -8 },
              mb: { xs: 4, md: 6 },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
                lineHeight: 0.9,
                mb: { xs: 1.5, md: 2 },
                background: 'linear-gradient(120deg, #3B82F6, #8B5CF6, #EC4899)',
                backgroundSize: '200% 200%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                animation: 'gradientShift 3s ease-in-out infinite',
                transform: { xs: 'rotate(0deg)', md: 'rotate(-2deg)' },
                '@keyframes gradientShift': {
                  '0%, 100%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                },
              }}
            >
              Let's
              <br />
              Connect
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.3rem', sm: '1.6rem', md: '2.2rem' },
                color: isDarkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)',
                mb: 1,
                transform: { xs: 'rotate(0deg)', md: 'rotate(1deg)' },
                ml: { xs: 0, md: 4 },
              }}
            >
              Robert (Xu) Wang
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                fontStyle: 'italic',
                transform: { xs: 'rotate(0deg)', md: 'rotate(-1deg)' },
                ml: { xs: 0, md: 2 },
              }}
            >
              "coding for a better world"
            </Typography>
          </Box>
        </m.div>

        {/* Contact Methods - Responsive Creative Layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr' },
            gap: { xs: 2, md: 3 },
            mt: { xs: 3, md: 4 },
          }}
        >
          {contactMethods.map((method, index) => {
            const isOdd = index % 2 !== 0;
            const delay = 0.6 + index * 0.15;

            return (
              <Box
                key={method.name}
                component={m.div}
                variants={isOdd ? varFade().inRight : varFade().inLeft}
                transition={{ delay }}
                sx={{
                  gridColumn: { xs: 'span 1', sm: index >= 2 ? (isOdd ? '2' : '1') : 'span 1' },
                }}
              >
                <Box
                  onClick={() => handleContactAction(method)}
                  sx={{
                    backgroundColor: isDarkMode
                      ? 'rgba(255,255,255,0.03)'
                      : 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(15px)',
                    border: `2px solid ${method.color}40`,
                    borderRadius: {
                      xs: '16px',
                      md: isOdd ? '25px 8px 25px 8px' : '8px 25px 8px 25px',
                    },
                    padding: { xs: 2.5, md: 3 },
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: {
                      xs: 'rotate(0deg)',
                      md: `rotate(${isOdd ? '2deg' : '-2deg'})`,
                    },
                    boxShadow: `0 8px 32px ${method.color}15`,
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: {
                        xs: 'scale(1.02)',
                        md: 'rotate(0deg) scale(1.05)',
                      },
                      backgroundColor: `${method.color}15`,
                      border: `2px solid ${method.color}80`,
                      boxShadow: `0 15px 60px ${method.color}30`,
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(90deg, transparent, ${method.color}20, transparent)`,
                      transition: 'left 0.6s ease',
                    },
                    '&:hover::before': {
                      left: '100%',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 2 } }}>
                    <Box
                      sx={{
                        width: { xs: 40, md: 50 },
                        height: { xs: 40, md: 50 },
                        borderRadius: '50%',
                        backgroundColor: `${method.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `2px solid ${method.color}40`,
                        flexShrink: 0,
                      }}
                    >
                      <Iconify
                        icon={method.icon}
                        sx={{
                          width: { xs: 20, md: 24 },
                          height: { xs: 20, md: 24 },
                          color: method.color,
                        }}
                      />
                    </Box>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          color: isDarkMode ? 'white' : 'black',
                          mb: 0.5,
                        }}
                      >
                        {method.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: '0.8rem', md: '0.9rem' },
                          color: isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                          fontWeight: 500,
                        }}
                      >
                        {method.action === 'copy' ? 'Click to copy' : 'Click to open'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Copy Success Snackbar */}
      <Snackbar
        open={!!copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setCopySuccess('')}
          severity="success"
          sx={{
            backgroundColor: isDarkMode ? '#10B981' : '#059669',
            color: 'white',
            '& .MuiAlert-icon': { color: 'white' },
          }}
        >
          {copySuccess}
        </Alert>
      </Snackbar>
    </Box>
  );
}
