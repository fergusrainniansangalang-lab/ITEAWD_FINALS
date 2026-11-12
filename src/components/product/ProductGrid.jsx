/* ProductGrid.jsx */
import React from 'react';
import { Box } from '@mui/material';
import ProductCard from './ProductCard';

export default function ProductGrid({ products = [] }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        },
        gap: 3,
        width: '100%',
      }}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </Box>
  );
}
