/* CartItem.jsx */
import React from 'react';
import { Stack, Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import { useCart } from 'context/CartContext';
import { CURRENCY_SYMBOL, getProductStock } from '../../config';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  if (!item) return null;

  const maxStock = getProductStock(item.id);
  const isAtLimit = item.quantity >= maxStock;

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ py: 1.5, borderBottom: '1px solid #FCE4EC' }}>
      <Box
        component="img"
        src={item.image || '/images/placeholder.svg'}
        alt={item.name}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '/images/placeholder.svg';
        }}
        sx={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 2 }}
      />
      <Box flex={1}>
        <Typography variant="subtitle2" fontWeight={700}>{item.name}</Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          {CURRENCY_SYMBOL}{item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })} each
        </Typography>
        {maxStock <= 0 ? (
          <Typography variant="caption" sx={{ color: '#d32f2f', fontWeight: 700 }}>
            Sold out in Tokyo hub
          </Typography>
        ) : isAtLimit ? (
          <Typography variant="caption" sx={{ color: '#e65100', fontWeight: 700 }}>
            Max units ({maxStock}) in cart
          </Typography>
        ) : (
          <Typography variant="caption" sx={{ color: '#2e7d32', fontWeight: 600 }}>
            {maxStock} in stock
          </Typography>
        )}
      </Box>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
          <RemoveIcon fontSize="small" />
        </IconButton>
        <Typography variant="body2" fontWeight={700}>{item.quantity}</Typography>
        <IconButton
          size="small"
          disabled={isAtLimit}
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <AddIcon fontSize="small" sx={{ color: isAtLimit ? '#bdbdbd' : '#EC407A' }} />
        </IconButton>
      </Stack>
      <Typography variant="subtitle2" fontWeight={800} color="#EC407A">
        {CURRENCY_SYMBOL}{(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </Typography>
      <IconButton onClick={() => removeFromCart(item.id)} sx={{ color: '#EC407A' }}>
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
