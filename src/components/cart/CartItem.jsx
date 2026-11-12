/* CartItem.jsx */
import React from 'react';
import { Stack, Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import { useCart } from 'context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  if (!item) return null;
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ py: 1.5, borderBottom: '1px solid #FCE4EC' }}>
      <Box component="img" src={item.image} alt={item.name} sx={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 2 }} />
      <Box flex={1}>
        <Typography variant="subtitle2" fontWeight={700}>{item.name}</Typography>
        <Typography variant="caption" color="text.secondary">${item.price.toFixed(2)} each</Typography>
      </Box>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}><RemoveIcon fontSize="small" /></IconButton>
        <Typography variant="body2" fontWeight={700}>{item.quantity}</Typography>
        <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}><AddIcon fontSize="small" /></IconButton>
      </Stack>
      <Typography variant="subtitle2" fontWeight={800} color="#EC407A">${(item.price * item.quantity).toFixed(2)}</Typography>
      <IconButton onClick={() => removeFromCart(item.id)} sx={{ color: '#EC407A' }}><DeleteOutlineIcon fontSize="small" /></IconButton>
    </Stack>
  );
}
