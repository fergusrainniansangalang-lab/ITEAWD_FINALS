/**
 * PageLoader.jsx — MUI full-page loading spinner used by router Suspense.
 */
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

export default function PageLoader() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#FCE4EC',
        gap: 2,
      }}
    >
      <LocalFloristIcon sx={{ color: '#EC407A', fontSize: 48, animation: 'spin 2s linear infinite', '@keyframes spin': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } } }} />
      <CircularProgress sx={{ color: '#EC407A' }} />
      <Typography variant="body2" color="#EC407A" fontWeight={600}>Loading…</Typography>
    </Box>
  );
}
