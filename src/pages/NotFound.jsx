/**
 * NotFound.jsx — 404 page. MUI styled.
 */
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/paths';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', bgcolor: '#fafafa', textAlign: 'center', p: 4,
      }}
    >
      <LocalFloristIcon sx={{ fontSize: 80, color: '#F48FB1', mb: 2 }} />
      <Typography variant="h1" fontWeight={900} sx={{ fontSize: { xs: '5rem', md: '8rem' }, color: '#EC407A', lineHeight: 1 }}>
        404
      </Typography>
      <Typography variant="h5" fontWeight={700} mb={1}>Page Not Found</Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate(paths.home)}
        sx={{ bgcolor: '#EC407A', '&:hover': { bgcolor: '#d81b60' }, borderRadius: 25, px: 5, textTransform: 'none', fontWeight: 700 }}
      >
        Go Home
      </Button>
    </Box>
  );
}
