'use client';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Box
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
}