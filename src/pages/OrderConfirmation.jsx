/**
 * OrderConfirmation.jsx
 * Success page shown after checkout. Animated checkmark, order number, next steps.
 * All MUI.
 */
import React, { useMemo } from 'react';
import {
  Box, Container, Card, CardContent, Typography, Button,
  Stack, Divider, Chip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/paths';
import { ORDER_PREFIX, DELIVERY_DAYS, DATE_LOCALE, SITE_NAME } from '../config';

export default function OrderConfirmation() {
  const navigate = useNavigate();
  /* Generate a random order number once per mount */
  const orderNum = useMemo(() => `${ORDER_PREFIX}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`, []);
  const eta = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + DELIVERY_DAYS);
    return d.toLocaleDateString(DATE_LOCALE, { weekday: 'long', month: 'long', day: 'numeric' });
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={4} sx={{ borderRadius: 4, overflow: 'hidden', textAlign: 'center' }}>
          {/* Success header */}
          <Box sx={{ background: 'linear-gradient(135deg, #F48FB1 0%, #EC407A 100%)', py: 5 }}>
            <CheckCircleIcon sx={{ fontSize: 80, color: '#fff', mb: 1 }} />
            <Typography variant="h4" fontWeight={900} color="#fff">Order Placed!</Typography>
            <Typography variant="subtitle1" color="rgba(255,255,255,0.9)">Thank you for shopping with {SITE_NAME} 🌸</Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {/* Order number */}
            <Box sx={{ bgcolor: '#FCE4EC', borderRadius: 2, p: 2, mb: 3 }}>
              <Typography variant="caption" color="text.secondary" display="block">Order Number</Typography>
              <Typography variant="h5" fontWeight={900} color="#EC407A">{orderNum}</Typography>
            </Box>

            {/* Timeline */}
            <Stack spacing={2} textAlign="left" mb={3}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box sx={{ bgcolor: '#FCE4EC', borderRadius: '50%', p: 1, mt: 0.3 }}>
                  <CheckCircleIcon sx={{ color: '#EC407A', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>Order Confirmed</Typography>
                  <Typography variant="caption" color="text.secondary">Your payment has been processed successfully.</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box sx={{ bgcolor: '#FCE4EC', borderRadius: '50%', p: 1, mt: 0.3 }}>
                  <EmailIcon sx={{ color: '#EC407A', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>Confirmation Email</Typography>
                  <Typography variant="caption" color="text.secondary">A confirmation email is on its way to you.</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box sx={{ bgcolor: '#FCE4EC', borderRadius: '50%', p: 1, mt: 0.3 }}>
                  <LocalShippingIcon sx={{ color: '#EC407A', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>Estimated Delivery</Typography>
                  <Typography variant="caption" color="text.secondary">{eta}</Typography>
                </Box>
              </Stack>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            <Stack spacing={1.5}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate(paths.products)}
                sx={{ bgcolor: '#EC407A', '&:hover': { bgcolor: '#d81b60' }, borderRadius: 25, textTransform: 'none', fontWeight: 700 }}
              >
                Continue Shopping
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate(paths.home)}
                sx={{ borderColor: '#EC407A', color: '#EC407A', borderRadius: 25, textTransform: 'none' }}
              >
                Go to Homepage
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
