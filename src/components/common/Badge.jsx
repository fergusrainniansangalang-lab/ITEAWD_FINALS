/* Badge.jsx — MUI-based badge component */
import React from 'react';
import { Chip } from '@mui/material';
export default function Badge({ label, color = '#EC407A' }) {
  return <Chip label={label} size="small" sx={{ bgcolor: color, color: '#fff', fontWeight: 700, fontSize: '0.7rem' }} />;
}
