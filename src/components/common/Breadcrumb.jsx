/* Breadcrumb.jsx */
import React from 'react';
import { Breadcrumbs, Typography, Link as MuiLink } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ items = [] }) {
  return (
    <Breadcrumbs separator={<ChevronRightIcon fontSize="small" />}>
      {items.map((item, i) =>
        item.path ? (
          <MuiLink key={i} component={Link} to={item.path} underline="hover" color="#EC407A" sx={{ fontSize: '0.85rem' }}>
            {item.label}
          </MuiLink>
        ) : (
          <Typography key={i} color="text.primary" sx={{ fontSize: '0.85rem' }}>{item.label}</Typography>
        )
      )}
    </Breadcrumbs>
  );
}
