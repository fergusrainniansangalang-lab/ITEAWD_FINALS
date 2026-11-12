/* Button.jsx — thin wrapper; prefer using MUI Button directly */
import React from 'react';
import { Button as MuiButton } from '@mui/material';
export default function Button({ children, ...props }) {
  return <MuiButton {...props}>{children}</MuiButton>;
}
