"use client";

import { m } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import Iconify from "src/components/iconify";

interface ProjectItem {
  id: string;
  title: string;
  period: string;
  url: string;
  description: string;
  technologies: string[];
  stats: string[];
  achievements: string[];
  gradient: string;
  icon: string;
  color: string;
}

interface ProjectsScrollStackProps {
  items: ProjectItem[];
}

function ProjectCard({ item, index }: { item: ProjectItem; index: number }) {
  const theme = useMuiTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <m.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          mb: 8,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Timeline Line and Icon */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', md: 'column' },
            alignItems: 'center',
            mr: { xs: 0, md: 4 },
            mb: { xs: 3, md: 0 },
            position: 'relative',
            justifyContent: { xs: 'flex-start', md: 'center' },
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: item.gradient,
              border: `4px solid ${item.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 2,
              boxShadow: `0 0 30px ${item.color}40`,
              mr: { xs: 3, md: 0 },
            }}
          >
            <Iconify 
              icon={item.icon} 
              sx={{ 
                width: 36, 
                height: 36, 
                color: 'white',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
              }} 
            />
          </Box>

          {/* Project Number */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: item.color,
              opacity: 0.3,
              display: { xs: 'block', md: 'none' },
              ml: 2,
            }}
          >
            0{index + 1}
          </Typography>

          {/* Vertical Line for Desktop */}
          {index < 2 && (
            <Box
              sx={{
                width: 4,
                height: 150,
                background: `linear-gradient(180deg, ${item.color}, transparent)`,
                mt: 2,
                display: { xs: 'none', md: 'block' },
              }}
            />
          )}
        </Box>

        {/* Content Card */}
        <Box
          sx={{
            flexGrow: 1,
            background: isDarkMode 
              ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)'
              : 'linear-gradient(135deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.02) 100%)',
            backdropFilter: 'blur(10px)',
            border: isDarkMode 
              ? '1px solid rgba(255,255,255,0.1)' 
              : '1px solid rgba(0,0,0,0.1)',
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            position: 'relative',
            overflow: 'hidden',
            boxShadow: isDarkMode
              ? '0 20px 60px rgba(0,0,0,0.3)'
              : '0 20px 60px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: isDarkMode
                ? '0 30px 80px rgba(0,0,0,0.4)'
                : '0 30px 80px rgba(0,0,0,0.15)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: item.gradient,
            }
          }}
        >
          {/* Project Number for Desktop */}
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              fontSize: '6rem',
              fontWeight: 900,
              color: item.color,
              opacity: 0.1,
              lineHeight: 1,
              display: { xs: 'none', md: 'block' },
            }}
          >
            0{index + 1}
          </Box>

          {/* Header */}
          <Box sx={{ mb: 4, position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: isDarkMode ? 'white' : 'black',
                mb: 1,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? 'grey.400' : 'grey.600',
                fontWeight: 500,
                mb: 2,
              }}
            >
              {item.period}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: isDarkMode ? 'grey.300' : 'grey.700',
                lineHeight: 1.6,
                maxWidth: '80%',
              }}
            >
              {item.description}
            </Typography>
          </Box>

          {/* Stats */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: isDarkMode ? 'white' : 'black',
              }}
            >
              Key Metrics
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              {item.stats.map((stat, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index * 0.2) + (idx * 0.1), duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Chip
                    label={stat}
                    sx={{
                      background: `${item.color}20`,
                      color: item.color,
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      height: 36,
                      border: `1px solid ${item.color}40`,
                    }}
                  />
                </m.div>
              ))}
            </Stack>
          </Box>

          {/* Achievements */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: isDarkMode ? 'white' : 'black',
              }}
            >
              Key Achievements
            </Typography>
            
            <Stack spacing={2}>
              {item.achievements.slice(0, 3).map((achievement, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index * 0.2) + (idx * 0.1), duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: item.color,
                        mt: 1,
                        mr: 2,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color: isDarkMode ? 'grey.300' : 'grey.700',
                        lineHeight: 1.7,
                      }}
                    >
                      {achievement}
                    </Typography>
                  </Box>
                </m.div>
              ))}
            </Stack>
          </Box>

          {/* Technologies and Visit Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 3 }}>
            {/* Technologies */}
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: isDarkMode ? 'white' : 'black',
                }}
              >
                Tech Stack
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {item.technologies.slice(0, 6).map((tech, idx) => (
                  <m.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (index * 0.2) + (idx * 0.05), duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Chip
                      label={tech}
                      size="small"
                      variant="outlined"
                      sx={{
                        color: isDarkMode ? 'grey.300' : 'grey.700',
                        borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                        fontSize: '0.75rem',
                        '&:hover': {
                          borderColor: item.color,
                          color: item.color,
                        },
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </m.div>
                ))}
                {item.technologies.length > 6 && (
                  <Chip
                    label={`+${item.technologies.length - 6}`}
                    size="small"
                    variant="outlined"
                    sx={{
                      color: isDarkMode ? 'grey.400' : 'grey.600',
                      borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                      fontSize: '0.75rem',
                    }}
                  />
                )}
              </Stack>
            </Box>

            {/* Visit Button */}
            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: (index * 0.2) + 0.5, duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<Iconify icon="material-symbols:open-in-new" />}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background: item.gradient,
                  color: 'white',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  boxShadow: `0 8px 25px ${item.color}40`,
                  '&:hover': {
                    background: item.gradient,
                    boxShadow: `0 12px 35px ${item.color}60`,
                  },
                }}
              >
                Visit Project
              </Button>
            </m.div>
          </Box>
        </Box>
      </Box>
    </m.div>
  );
}

export default function ProjectsScrollStack({ items }: ProjectsScrollStackProps) {
  const theme = useMuiTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box 
      sx={{ 
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                background: isDarkMode
                  ? 'linear-gradient(135deg, #60A5FA 0%, #A855F7 100%)'
                  : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Featured Projects
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: isDarkMode ? 'grey.400' : 'grey.600',
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              A showcase of my recent work in full-stack development, featuring AI integration, 
              cloud deployment, and modern web technologies.
            </Typography>
          </Box>
        </m.div>

        {/* Projects Timeline */}
        <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
          {items.map((item, index) => (
            <ProjectCard key={item.id} item={item} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}