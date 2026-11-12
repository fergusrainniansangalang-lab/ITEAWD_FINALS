/* RatingStars.jsx */
import React from 'react';
import { Rating } from '@mui/material';
export default function RatingStars({ value, readOnly = true, size = 'small' }) {
  return <Rating value={value} precision={0.1} readOnly={readOnly} size={size} />;
}
