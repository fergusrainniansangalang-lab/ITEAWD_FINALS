/* ProductFilter.jsx */
import React from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Slider, Stack } from '@mui/material';

const CATEGORIES = [
  { key: 'electronics', label: 'Electronics' },
  { key: 'shoes', label: 'Shoes' },
  { key: 'cleaning', label: 'Cleaning Supplies' },
  { key: 'sports', label: 'Sports Equipment' },
  { key: 'grocery', label: 'Grocery' },
  { key: 'clothing', label: 'Clothing' },
  { key: 'books', label: 'Books' },
];

export default function ProductFilter({ selected = [], onToggle, priceRange = [0, 1000], onPriceChange }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" fontWeight={800} color="#EC407A" mb={2}>Filters</Typography>
      <Typography variant="subtitle2" fontWeight={700} mb={1}>Category</Typography>
      <FormGroup>
        {CATEGORIES.map(cat => (
          <FormControlLabel key={cat.key}
            control={<Checkbox checked={selected.includes(cat.key)} onChange={() => onToggle(cat.key)}
              sx={{ color: '#EC407A', '&.Mui-checked': { color: '#EC407A' } }} size="small" />}
            label={<Typography variant="body2">{cat.label}</Typography>}
          />
        ))}
      </FormGroup>
      <Typography variant="subtitle2" fontWeight={700} mt={2} mb={1}>Price</Typography>
      <Slider value={priceRange} onChange={(_, v) => onPriceChange(v)} min={0} max={1000} step={10}
        valueLabelDisplay="auto" valueLabelFormat={v => `$${v}`} sx={{ color: '#EC407A' }} />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="caption">${priceRange[0]}</Typography>
        <Typography variant="caption">${priceRange[1]}</Typography>
      </Stack>
    </Box>
  );
}
