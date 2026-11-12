/* CartSummary.jsx */
import React from 'react';
import { Card, CardContent, Typography, Button, Stack, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'context/CartContext';
import paths from 'routes/paths';
import { FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_FEE, CURRENCY_SYMBOL } from '../../config';

export default function CartSummary() {
  const { cartTotal } = useCart();
  const navigate = useNavigate();
  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
  return (
    <Card elevation={2} sx={{ borderRadius: 3, border: '1.5px solid #FCE4EC' }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight={800} color="#EC407A" mb={2}>Order Summary</Typography>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Subtotal</Typography>
            <Typography variant="body2">${cartTotal.toFixed(2)}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Shipping</Typography>
            <Typography variant="body2">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight={800}>Total</Typography>
            <Typography fontWeight={900} color="#EC407A">${(cartTotal + shipping).toFixed(2)}</Typography>
          </Stack>
        </Stack>
        <Button fullWidth variant="contained" onClick={() => navigate(paths.checkout)} sx={{ mt: 2, bgcolor: '#EC407A', '&:hover': { bgcolor: '#d81b60' }, borderRadius: 25, textTransform: 'none', fontWeight: 700 }}>
          Checkout
        </Button>
      </CardContent>
    </Card>
  );
}
