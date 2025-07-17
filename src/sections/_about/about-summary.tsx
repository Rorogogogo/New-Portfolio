'use client';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { varFade } from 'src/components/animate';
import { useTheme } from 'src/contexts';
import Iconify from 'src/components/iconify';

export default function AboutSummary() {
  const { isDarkMode } = useTheme();

  const highlights = [
    {
      icon: 'material-symbols:code',
      title: 'Full Stack Development',
      description: 'End-to-end development with .NET Core, Next.js, React.ts, and RESTful APIs',
    },
    {
      icon: 'material-symbols:cloud',
      title: 'Cloud-Native Solutions',
      description: 'Scalable deployments with AWS, Azure, and automated CI/CD pipelines',
    },
    {
      icon: 'material-symbols:psychology',
      title: 'AI Integration',
      description: 'Leveraging AI tools like Claude, OpenAI, and AssemblyAI to streamline workflows',
    },
    {
      icon: 'material-symbols:security',
      title: 'Security Focus',
      description: 'Implementing secure architectures with JWT, OAuth, and role-based authorization',
    },
  ];

  return (
    <Container
      component={m.div}
      variants={varFade().inUp}
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <m.div variants={varFade().inDown}>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 3,
            fontWeight: 700,
            color: isDarkMode ? 'white' : 'black',
          }}
        >
          Professional Summary
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            mb: 8,
            maxWidth: '800px',
            mx: 'auto',
            color: isDarkMode ? 'grey.300' : 'grey.700',
            fontSize: '1.1rem',
            lineHeight: 1.7,
          }}
        >
          Detail-oriented Software Engineer experienced in delivering commercial-grade projects in collaboration with Solution Architects. 
          Proficient in .NET Core, Next.js, React.ts, and RESTful API development, with a strong interest in integrating AI tools to streamline workflows. 
          Demonstrated end-to-end development capabilities through side projects like JobJourney - AI Job Search Assistant and StandTogether - non-profit public reporting and awareness platform, 
          both focused on solving real-world problems. Passionate about building scalable, secure solutions with cloud-native deployments and automated CI/CD pipelines.
        </Typography>
      </m.div>

      <Grid container spacing={4}>
        {highlights.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <m.div variants={varFade().inUp}>
              <Card
                sx={{
                  height: '100%',
                  background: isDarkMode
                    ? 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: isDarkMode
                    ? '0 8px 32px rgba(255, 255, 255, 0.05)'
                    : '0 8px 32px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: isDarkMode
                      ? '0 12px 48px rgba(255, 255, 255, 0.1)'
                      : '0 12px 48px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: isDarkMode
                        ? 'linear-gradient(135deg, #333 0%, #555 100%)'
                        : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <Iconify
                      icon={item.icon}
                      sx={{
                        width: 30,
                        height: 30,
                        color: isDarkMode ? '#64b5f6' : '#1976d2',
                      }}
                    />
                  </Box>
                  
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      color: isDarkMode ? 'white' : 'black',
                    }}
                  >
                    {item.title}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDarkMode ? 'grey.300' : 'grey.600',
                      lineHeight: 1.6,
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </m.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}