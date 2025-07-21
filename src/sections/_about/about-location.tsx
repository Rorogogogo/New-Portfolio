'use client';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { varFade } from 'src/components/animate';
import { useTheme } from 'src/contexts';
import { Globe } from 'src/components/globe';

export default function AboutLocation() {
  const { isDarkMode } = useTheme();

  return (
    <Container component={m.div} variants={varFade().inUp} sx={{ py: 0 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Globe with same size as orbital */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 800, // Back to original size
              width: 800,  // Back to original size
              mx: 'auto',
              position: 'relative',
            }}
          >
            <Globe
              className=""
              config={{
                width: 600,
                height: 600,
                onRender: () => {},
                devicePixelRatio: 2,
                phi: 0,
                theta: 0,
                dark: isDarkMode ? 1 : 0,
                diffuse: 1.2,
                mapSamples: 16000,
                mapBrightness: isDarkMode ? 4 : 6,
                baseColor: isDarkMode ? [0.1, 0.1, 0.1] : [0.3, 0.3, 0.3],
                markerColor: [0.1, 0.8, 1],
                glowColor: isDarkMode ? [0.5, 0.5, 0.5] : [1, 1, 1],
                markers: [
                  // Sydney, Australia - Currently located (Orange)
                  { location: [-33.8688, 151.2093], size: 0.07, color: [1, 0.5, 0] },

                  // Zhengzhou, China - Born and raised (Blue)
                  { location: [34.7466, 113.6253], size: 0.07, color: [0.1, 0.8, 1] },

                  // Other cities (smaller markers)
                  { location: [40.7128, -74.006], size: 0.03 },
                  { location: [51.5074, -0.1278], size: 0.03 },
                  { location: [35.6762, 139.6503], size: 0.03 },
                  { location: [22.3193, 114.1694], size: 0.03 },
                ],
              }}
            />

            
            {/* Simple text below globe - inside the globe container */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0, // Right at the edge of the globe
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
                Location
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? 'grey.400' : 'grey.600',
                  lineHeight: 1.6,
                }}
              >
                Sydney, Australia • University of Sydney • Originally from China
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
