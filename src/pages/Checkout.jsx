/**
 * Checkout.jsx
 * ============================================================
 * Japanese Sakura-Themed Checkout
 * Multi-step checkout: Shipping -> Payment -> Review
 * Using reliable CSS Grid and Flexbox for forms.
 * ============================================================
 */
import React, { useState } from 'react';
import {
  Box, Container, Stepper, Step, StepLabel, Card, CardContent,
  Typography, TextField, Button, Stack, Divider, RadioGroup,
  FormControlLabel, Radio, FormLabel, FormControl, Alert
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'context/CartContext';
import paths from 'routes/paths';
import {
  FREE_SHIPPING_THRESHOLD,
  FLAT_SHIPPING_FEE,
  CURRENCY_SYMBOL,
  COLOR_PRIMARY_DARK,
  LS_ORDERS_KEY,
  LS_STOCK_KEY,
  ORDER_PREFIX,
  getProductStock,
} from '../config';

const STEPS = ['Shipping Address', 'Payment Method', 'Order Review'];

const INITIAL_SHIP = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  zip: '',
};

const INITIAL_PAY = {
  method: 'card',
  cardNumber: '',
  cardName: '',
  expiry: '',
  cvv: '',
};

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [ship, setShip] = useState(INITIAL_SHIP);
  const [pay, setPay] = useState(INITIAL_PAY);
  const [errors, setErrors] = useState({});

  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
  const total = cartTotal + shipping;

  const handleShipChange = (e) => setShip((s) => ({ ...s, [e.target.name]: e.target.value }));
  const handlePayChange = (e) => setPay((s) => ({ ...s, [e.target.name]: e.target.value }));

  const validateShipping = () => {
    const req = ['firstName', 'lastName', 'email', 'address', 'city'];
    const errs = {};
    req.forEach((f) => {
      if (!ship[f]) errs[f] = 'Required';
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePayment = () => {
    if (pay.method === 'card') {
      const errs = {};
      if (!pay.cardNumber) errs.cardNumber = 'Required';
      if (!pay.cardName) errs.cardName = 'Required';
      if (!pay.expiry) errs.expiry = 'Required';
      if (!pay.cvv) errs.cvv = 'Required';
      setErrors(errs);
      return Object.keys(errs).length === 0;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 0 && !validateShipping()) return;
    if (step === 1 && !validatePayment()) return;
    setErrors({});
    setStep((s) => s + 1);
  };

  const handlePlaceOrder = () => {
    // Verify all cart items against live inventory
    for (const item of cartItems) {
      const stock = getProductStock(item.id);
      if (stock <= 0) {
        alert(`Cannot place order: "${item.name}" is sold out in Tokyo inventory. Please return to cart and remove it.`);
        return;
      }
      if (item.quantity > stock) {
        alert(`Cannot place order: You have ${item.quantity} units of "${item.name}" in your cart, but only ${stock} units are left in stock.`);
        return;
      }
    }

    const orderId = `${ORDER_PREFIX}-${Math.floor(1000 + Math.random() * 9000)}`;
    const customerFullName = `${ship.firstName || ''} ${ship.lastName || ''}`.trim() || 'Guest Customer';
    const customerDestination = `${ship.city || 'Metro Manila'}${ship.province ? `, ${ship.province}` : ''}, Philippines`;

    const newOrder = {
      id: orderId,
      customer: customerFullName,
      destination: customerDestination,
      items: cartItems.map((i) => i.name).slice(0, 2).join(', ') + (cartItems.length > 2 ? ` +${cartItems.length - 2} more` : ''),
      total: total,
      date: 'Just now',
      status: 'Processing',
    };

    // 1. Save new order
    try {
      const existing = JSON.parse(localStorage.getItem(LS_ORDERS_KEY) || '[]');
      localStorage.setItem(LS_ORDERS_KEY, JSON.stringify([newOrder, ...existing]));
    } catch (_) {}

    // 2. Deduct purchased quantities from stock
    try {
      const currentStockMap = JSON.parse(localStorage.getItem(LS_STOCK_KEY) || '{}');
      cartItems.forEach((item) => {
        const currentQty = getProductStock(item.id);
        const updatedQty = Math.max(0, currentQty - (item.quantity || 1));
        currentStockMap[item.id] = {
          inStock: updatedQty > 0,
          quantity: updatedQty,
        };
      });
      localStorage.setItem(LS_STOCK_KEY, JSON.stringify(currentStockMap));
    } catch (_) {}

    clearCart();
    navigate(paths.orderConfirmation);
  };

  if (cartItems.length === 0 && step !== 2) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary" mb={2}>
          Your Japanese cart is empty.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate(paths.products)}
          sx={{ bgcolor: COLOR_PRIMARY_DARK, borderRadius: 25, px: 4 }}
        >
          Shop Now
        </Button>
      </Container>
    );
  }

  const renderField = (label, name, value, onChange, fullWidth = true, type = 'text') => (
    <Box sx={{ width: '100%' }}>
      <TextField
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        fullWidth
        size="small"
        type={type}
        error={!!errors[name]}
        helperText={errors[name]}
        sx={{
          '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: COLOR_PRIMARY_DARK },
        }}
      />
    </Box>
  );

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            color: COLOR_PRIMARY_DARK,
            mb: 4,
            textAlign: 'center',
            fontSize: { xs: '1.6rem', md: '2.2rem' },
          }}
        >
          Secure Checkout
        </Typography>

        {/* Stepper */}
        <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconProps={{
                  sx: {
                    '&.Mui-active': { color: COLOR_PRIMARY_DARK },
                    '&.Mui-completed': { color: COLOR_PRIMARY_DARK },
                  },
                }}
              >
                <Typography variant="caption" fontWeight={700}>
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* 2-Column Responsive Flex Layout */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            alignItems: 'flex-start',
          }}
        >
          {/* Main Checkout Form Box */}
          <Box sx={{ flex: 1, width: '100%' }}>
            <Card elevation={2} sx={{ borderRadius: '18px', border: '1px solid #FCE4EC' }}>
              <CardContent sx={{ p: { xs: 3, sm: 4.5 }, pb: { xs: 4, sm: 5 } }}>
                {/* Step 0 — Shipping */}
                {step === 0 && (
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1.2} mb={2.5}>
                      <LocalShippingIcon sx={{ color: COLOR_PRIMARY_DARK }} />
                      <Typography variant="h6" fontWeight={800}>
                        Delivery Address
                      </Typography>
                    </Stack>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
                      {renderField('First Name', 'firstName', ship.firstName, handleShipChange)}
                      {renderField('Last Name', 'lastName', ship.lastName, handleShipChange)}
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
                      {renderField('Email Address', 'email', ship.email, handleShipChange, true, 'email')}
                      {renderField('Mobile Phone', 'phone', ship.phone, handleShipChange)}
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      {renderField('Street Address / Building', 'address', ship.address, handleShipChange)}
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
                      {renderField('City / Ward', 'city', ship.city, handleShipChange)}
                      {renderField('Province / Prefecture', 'province', ship.province, handleShipChange)}
                      {renderField('ZIP Code', 'zip', ship.zip, handleShipChange)}
                    </Box>
                  </Box>
                )}

                {/* Step 1 — Payment */}
                {step === 1 && (
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1.2} mb={2}>
                      <PaymentIcon sx={{ color: COLOR_PRIMARY_DARK }} />
                      <Typography variant="h6" fontWeight={800}>
                        Payment Method
                      </Typography>
                    </Stack>

                    <FormControl component="fieldset" sx={{ mb: 3 }}>
                      <FormLabel sx={{ color: COLOR_PRIMARY_DARK, fontWeight: 700, mb: 1 }}>
                        Choose Payment Type:
                      </FormLabel>
                      <RadioGroup name="method" value={pay.method} onChange={handlePayChange}>
                        <FormControlLabel
                          value="card"
                          control={<Radio sx={{ color: COLOR_PRIMARY_DARK, '&.Mui-checked': { color: COLOR_PRIMARY_DARK } }} />}
                          label={<Typography variant="body2" fontWeight={700}>Credit / Debit Card (Visa, Mastercard, JCB)</Typography>}
                        />
                        <FormControlLabel
                          value="gcash"
                          control={<Radio sx={{ color: COLOR_PRIMARY_DARK, '&.Mui-checked': { color: COLOR_PRIMARY_DARK } }} />}
                          label={<Typography variant="body2" fontWeight={700}>GCash / Maya e-Wallet</Typography>}
                        />
                        <FormControlLabel
                          value="cod"
                          control={<Radio sx={{ color: COLOR_PRIMARY_DARK, '&.Mui-checked': { color: COLOR_PRIMARY_DARK } }} />}
                          label={<Typography variant="body2" fontWeight={700}>Cash on Delivery (COD)</Typography>}
                        />
                      </RadioGroup>
                    </FormControl>

                    {pay.method === 'card' && (
                      <Box sx={{ bgcolor: '#FCE4EC', p: 2.5, borderRadius: '12px', mb: 2 }}>
                        <Box sx={{ mb: 2 }}>
                          {renderField('Card Number', 'cardNumber', pay.cardNumber, handlePayChange)}
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          {renderField('Cardholder Name', 'cardName', pay.cardName, handlePayChange)}
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                          {renderField('Expiry (MM/YY)', 'expiry', pay.expiry, handlePayChange)}
                          {renderField('CVV / CVC', 'cvv', pay.cvv, handlePayChange)}
                        </Box>
                      </Box>
                    )}

                    {pay.method === 'gcash' && (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        You will be securely redirected to the GCash gateway to authorize the transaction.
                      </Alert>
                    )}

                    {pay.method === 'cod' && (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        Pay directly upon delivery. Please ensure exact change if possible.
                      </Alert>
                    )}
                  </Box>
                )}

                {/* Step 2 — Review */}
                {step === 2 && (
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1.2} mb={2}>
                      <CheckCircleIcon sx={{ color: COLOR_PRIMARY_DARK }} />
                      <Typography variant="h6" fontWeight={800}>
                        Final Review
                      </Typography>
                    </Stack>

                    <Box sx={{ bgcolor: '#FCE4EC', p: 2.5, borderRadius: '12px', mb: 3 }}>
                      <Typography variant="subtitle2" fontWeight={800} color={COLOR_PRIMARY_DARK} mb={0.5}>
                        Shipping to:
                      </Typography>
                      <Typography variant="body2" color="#333333">
                        {ship.firstName} {ship.lastName} • {ship.phone}
                      </Typography>
                      <Typography variant="body2" color="#555555">
                        {ship.address}, {ship.city}, {ship.province} {ship.zip}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Confirmation recipient: {ship.email}
                      </Typography>
                    </Box>

                    <Typography variant="subtitle2" fontWeight={800} mb={1}>
                      Items in Order:
                    </Typography>
                    {cartItems.map((item) => (
                      <Stack
                        key={item.id}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ py: 1, borderBottom: '1px solid #FCE4EC' }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 600, maxWidth: '70%' }}>
                          {item.name} × {item.quantity}
                        </Typography>
                        <Typography variant="body2" fontWeight={800} color={COLOR_PRIMARY_DARK}>
                          {CURRENCY_SYMBOL}{(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </Typography>
                      </Stack>
                    ))}
                  </Box>
                )}

                {/* Generous Divider to ensure ample space between form fields and buttons */}
                <Divider sx={{ mt: 5, mb: 3.5, borderColor: '#FCE4EC' }} />

                {/* Navigation Buttons with Dedicated Top Spacing */}
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => (step === 0 ? navigate(paths.cart) : setStep((s) => s - 1))}
                      sx={{
                        borderColor: COLOR_PRIMARY_DARK,
                        color: COLOR_PRIMARY_DARK,
                        borderRadius: '25px',
                        textTransform: 'none',
                        fontWeight: 700,
                        px: { xs: 2.5, sm: 3.5 },
                        py: 1,
                      }}
                    >
                      {step === 0 ? '← Back to Cart' : 'Back'}
                    </Button>

                    {step < 2 ? (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{
                          bgcolor: COLOR_PRIMARY_DARK,
                          '&:hover': { bgcolor: '#c2185b' },
                          borderRadius: '25px',
                          textTransform: 'none',
                          fontWeight: 800,
                          px: { xs: 3.5, sm: 4.5 },
                          py: 1,
                          boxShadow: '0 4px 14px rgba(236, 64, 122, 0.3)',
                        }}
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handlePlaceOrder}
                        sx={{
                          bgcolor: '#2e7d32',
                          '&:hover': { bgcolor: '#1b5e20' },
                          borderRadius: '25px',
                          textTransform: 'none',
                          fontWeight: 800,
                          px: { xs: 3.5, sm: 4.5 },
                          py: 1.2,
                          fontSize: '1rem',
                          boxShadow: '0 4px 14px rgba(46, 125, 50, 0.3)',
                        }}
                      >
                        Place Order ({CURRENCY_SYMBOL}{total.toLocaleString(undefined, { minimumFractionDigits: 2 })})
                      </Button>
                    )}
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Right Summary Column */}
          <Box sx={{ width: { xs: '100%', md: 360 }, flexShrink: 0 }}>
            <Card
              elevation={1}
              sx={{
                borderRadius: '18px',
                border: '1.5px solid #FCE4EC',
                bgcolor: '#ffffff',
                position: 'sticky',
                top: 24,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={900} color={COLOR_PRIMARY_DARK} mb={2}>
                  Summary
                </Typography>
                {cartItems.map((item) => (
                  <Stack key={item.id} direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" noWrap sx={{ maxWidth: '65%' }}>
                      {item.name} ×{item.quantity}
                    </Typography>
                    <Typography variant="body2" fontWeight={700}>
                      {CURRENCY_SYMBOL}{(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </Typography>
                  </Stack>
                ))}
                <Divider sx={{ my: 1.5, borderColor: '#FCE4EC' }} />
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Subtotal
                  </Typography>
                  <Typography variant="body2" fontWeight={700}>
                    {CURRENCY_SYMBOL}{cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Shipping
                  </Typography>
                  <Typography variant="body2" fontWeight={700}>
                    {shipping === 0 ? 'FREE' : `${CURRENCY_SYMBOL}${shipping.toFixed(2)}`}
                  </Typography>
                </Stack>
                <Divider sx={{ my: 1.5, borderColor: '#FCE4EC' }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" fontWeight={900}>
                    Total
                  </Typography>
                  <Typography variant="h5" fontWeight={900} color={COLOR_PRIMARY_DARK}>
                    {CURRENCY_SYMBOL}{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
