"use client";

import { m } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import { useTheme } from "src/contexts";
import Iconify from "src/components/iconify";

interface TimelineItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  achievements: string[];
  icon: string;
  color: string;
}

interface TimelineStackProps {
  items: TimelineItem[];
}

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const { isDarkMode } = useTheme();

  return (
    <m.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          mb: 6,
        }}
      >
        {/* Timeline Line and Icon */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mr: 4,
            position: 'relative',
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`,
              border: `3px solid ${item.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 2,
              boxShadow: `0 0 20px ${item.color}30`,
            }}
          >
            <Iconify 
              icon={item.icon} 
              sx={{ 
                width: 28, 
                height: 28, 
                color: item.color 
              }} 
            />
          </Box>

          {/* Vertical Line */}
          {index < 2 && (
            <Box
              sx={{
                width: 3,
                height: 120,
                background: `linear-gradient(180deg, ${item.color}, transparent)`,
                mt: 1,
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
            borderRadius: 3,
            p: 4,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: isDarkMode
              ? '0 10px 30px rgba(0,0,0,0.3)'
              : '0 10px 30px rgba(0,0,0,0.1)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, ${item.color}, ${item.color}80, transparent)`,
            }
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: isDarkMode ? 'white' : 'black',
                mb: 0.5,
              }}
            >
              {item.role}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: item.color,
                fontWeight: 600,
                mb: 1,
              }}
            >
              {item.company}
            </Typography>
            <Stack direction="row" spacing={3} sx={{ mb: 0 }}>
              <Typography
                variant="body2"
                sx={{ 
                  color: isDarkMode ? 'grey.400' : 'grey.600',
                  fontWeight: 500,
                  background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                }}
              >
                {item.period}
              </Typography>
              <Typography
                variant="body2"
                sx={{ 
                  color: isDarkMode ? 'grey.400' : 'grey.600',
                  fontWeight: 500,
                }}
              >
                📍 {item.location}
              </Typography>
            </Stack>
          </Box>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              color: isDarkMode ? 'grey.300' : 'grey.700',
              mb: 3,
              lineHeight: 1.7,
            }}
          >
            {item.description}
          </Typography>

          {/* Achievements */}
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
          
          <Stack spacing={1.5} sx={{ mb: 3 }}>
            {item.achievements.map((achievement, idx) => (
              <m.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: (index * 0.1) + (idx * 0.05), duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: item.color,
                      mt: 1,
                      mr: 2,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDarkMode ? 'grey.300' : 'grey.700',
                      lineHeight: 1.6,
                    }}
                  >
                    {achievement}
                  </Typography>
                </Box>
              </m.div>
            ))}
          </Stack>

          {/* Technologies */}
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {item.technologies.map((tech, idx) => (
              <m.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: (index * 0.1) + (idx * 0.03), duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Chip
                  label={tech}
                  size="small"
                  sx={{
                    background: `${item.color}15`,
                    color: item.color,
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    border: `1px solid ${item.color}30`,
                    '&:hover': {
                      background: `${item.color}25`,
                    },
                    transition: 'all 0.2s ease',
                  }}
                />
              </m.div>
            ))}
          </Stack>
        </Box>
      </Box>
    </m.div>
  );
}

export default function TimelineStack({ items }: TimelineStackProps) {
  const { isDarkMode } = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              background: isDarkMode
                ? 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)'
                : 'linear-gradient(135deg, #059669 0%, #0891B2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 2,
            }}
          >
            Career Timeline
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: isDarkMode ? 'grey.400' : 'grey.600',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            My professional journey and key milestones
          </Typography>
        </Box>
      </m.div>

      {/* Timeline */}
      <Box sx={{ maxWidth: 900, mx: 'auto' }}>
        {items.map((item, index) => (
          <TimelineCard key={item.id} item={item} index={index} />
        ))}
      </Box>
    </Container>
  );
}