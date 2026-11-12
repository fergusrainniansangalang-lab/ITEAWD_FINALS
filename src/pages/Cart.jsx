/**
 * Cart.jsx
 * ============================================================
 * Japanese Sakura-Themed Shopping Cart
 * Table of cart items, quantity modifiers, and order summary.
 * Replaced Grid items with reliable responsive Flexbox.
 * ============================================================
 */
import React from 'react';
import {
  Box, Container, Card, CardContent, Typography, Button,
  IconButton, Stack, Divider, Chip, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'context/CartContext';
import paths from 'routes/paths';
import {
  FREE_SHIPPING_THRESHOLD,
  FLAT_SHIPPING_FEE,
  CURRENCY_SYMBOL,
  COLOR_PRIMARY_DARK,
} from '../config';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();

  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
  const total = cartTotal + shipping;

  if (cartItems.length === 0) {
    return (
      <Box
        sx={{
          bgcolor: '#fafafa',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
        }}
      >
        <Box textAlign="center">
          <ShoppingBagIcon sx={{ fontSize: 88, color: '#F48FB1', mb: 2 }} />
          <Typography variant="h4" fontWeight={900} color={COLOR_PRIMARY_DARK} mb={1}>
            Your Japanese Cart is Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Discover authentic streetwear, culinary treats, electronics, and books from Japan.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(paths.products)}
            sx={{
              bgcolor: COLOR_PRIMARY_DARK,
              '&:hover': { bgcolor: '#c2185b' },
              borderRadius: '30px',
              px: 5,
              py: 1.2,
              textTransform: 'none',
              fontWeight: 800,
              fontSize: '1rem',
              boxShadow: '0 4px 14px rgba(236, 64, 122, 0.3)',
            }}
          >
            Explore 35 Japanese Products
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: { xs: 3, md: 5 } }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            color: COLOR_PRIMARY_DARK,
            mb: 3.5,
            fontSize: { xs: '1.6rem', md: '2.2rem' },
          }}
        >
          Shopping Cart ({cartItems.length} items)
        </Typography>

        {/* 2-Column Responsive Flex Layout */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: 4,
            alignItems: 'flex-start',
          }}
        >
          {/* Left: Cart Items Table */}
          <Box sx={{ flex: 1, width: '100%' }}>
            <TableContainer
              component={Paper}
              elevation={1}
              sx={{
                borderRadius: '16px',
                border: '1px solid #FCE4EC',
                overflow: 'hidden',
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#FCE4EC' }}>
                    <TableCell sx={{ fontWeight: 800, color: COLOR_PRIMARY_DARK, py: 2 }}>
                      Japanese Product
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 800, color: COLOR_PRIMARY_DARK }}>
                      Quantity
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, color: COLOR_PRIMARY_DARK }}>
                      Subtotal
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 800, color: COLOR_PRIMARY_DARK }}>
                      Remove
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id} sx={{ '&:last-child td': { border: 0 } }}>
                      {/* Product Info */}
                      <TableCell>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.name}
                            sx={{
                              width: 72,
                              height: 72,
                              objectFit: 'cover',
                              borderRadius: '12px',
                              border: '1px solid #FCE4EC',
                              flexShrink: 0,
                            }}
                          />
                          <Box>
                            <Typography variant="subtitle2" fontWeight={800} sx={{ maxWidth: { xs: 160, sm: 280 } }}>
                              {item.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {CURRENCY_SYMBOL}{item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })} each
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      {/* Quantity Controls */}
                      <TableCell align="center">
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                          spacing={0.5}
                          sx={{
                            border: '1.5px solid #F48FB1',
                            borderRadius: '25px',
                            px: 0.8,
                            py: 0.2,
                            display: 'inline-flex',
                          }}
                        >
                          <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <RemoveIcon fontSize="small" sx={{ color: COLOR_PRIMARY_DARK }} />
                          </IconButton>
                          <Typography variant="body2" fontWeight={800} sx={{ minWidth: 26, textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <AddIcon fontSize="small" sx={{ color: COLOR_PRIMARY_DARK }} />
                          </IconButton>
                        </Stack>
                      </TableCell>

                      {/* Subtotal */}
                      <TableCell align="right">
                        <Typography variant="subtitle1" fontWeight={900} color={COLOR_PRIMARY_DARK}>
                          {CURRENCY_SYMBOL}{(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </Typography>
                      </TableCell>

                      {/* Delete Action */}
                      <TableCell align="center">
                        <IconButton onClick={() => removeFromCart(item.id)} sx={{ color: '#d32f2f' }}>
                          <DeleteOutlineIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              variant="text"
              onClick={() => navigate(paths.products)}
              sx={{ mt: 2.5, color: COLOR_PRIMARY_DARK, fontWeight: 700, textTransform: 'none' }}
            >
              ← Continue Shopping Japanese Products
            </Button>
          </Box>

          {/* Right: Order Summary Card */}
          <Box sx={{ width: { xs: '100%', lg: 380 }, flexShrink: 0 }}>
            <Card
              elevation={2}
              sx={{
                borderRadius: '18px',
                border: '1.5px solid #FCE4EC',
                bgcolor: '#ffffff',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={900} color={COLOR_PRIMARY_DARK} mb={2.5}>
                  Order Summary
                </Typography>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Subtotal
                    </Typography>
                    <Typography variant="body2" fontWeight={700}>
                      {CURRENCY_SYMBOL}{cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Express Shipping
                    </Typography>
                    {shipping === 0 ? (
                      <Chip
                        label="FREE (Orders > ₱999)"
                        size="small"
                        sx={{ bgcolor: '#2e7d32', color: '#ffffff', fontWeight: 800, fontSize: '0.7rem' }}
                      />
                    ) : (
                      <Typography variant="body2" fontWeight={700}>
                        {CURRENCY_SYMBOL}{shipping.toFixed(2)}
                      </Typography>
                    )}
                  </Stack>

                  {shipping > 0 && (
                    <Typography variant="caption" sx={{ color: COLOR_PRIMARY_DARK, fontWeight: 600 }}>
                      Add {CURRENCY_SYMBOL}{(FREE_SHIPPING_THRESHOLD - cartTotal).toLocaleString(undefined, { minimumFractionDigits: 2 })} more to unlock FREE shipping!
                    </Typography>
                  )}

                  <Divider sx={{ my: 1, borderColor: '#FCE4EC' }} />

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" fontWeight={900}>
                      Grand Total
                    </Typography>
                    <Typography variant="h5" fontWeight={900} color={COLOR_PRIMARY_DARK}>
                      {CURRENCY_SYMBOL}{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </Typography>
                  </Stack>
                </Stack>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => navigate(paths.checkout)}
                  sx={{
                    mt: 3.5,
                    bgcolor: COLOR_PRIMARY_DARK,
                    '&:hover': { bgcolor: '#c2185b' },
                    borderRadius: '25px',
                    py: 1.4,
                    textTransform: 'none',
                    fontWeight: 800,
                    fontSize: '1rem',
                    boxShadow: '0 4px 14px rgba(236, 64, 122, 0.3)',
                  }}
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
