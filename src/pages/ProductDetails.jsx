/**
 * ProductDetails.jsx
 * ============================================================
 * Japanese Sakura-Themed Product Details View
 * Image gallery, product specifications, quantity selector,
 * Add to Cart / Buy Now actions, and related Japanese items.
 * ============================================================
 */
import React, { useState, useMemo } from 'react';
import {
  Box, Container, Typography, Button, Chip, Rating, Stack,
  IconButton, Divider, Card, CardMedia, CardContent, CardActions,
  Tabs, Tab, Breadcrumbs, Link as MuiLink, Alert, Snackbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from 'context/CartContext';
import { products } from 'data/products';
import paths from 'routes/paths';
import {
  CURRENCY_SYMBOL,
  COLOR_PRIMARY_DARK,
  LS_STOCK_KEY,
  getProductStock,
} from '../config';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getItemInCartCount, getRemainingPurchasable } = useCart();

  const product = useMemo(() => {
    const raw = products.find((p) => p.id === id) || products[0];
    if (!raw) return raw;
    let inStock = true;
    let quantity = 100;
    try {
      const stockMap = JSON.parse(localStorage.getItem(LS_STOCK_KEY) || '{}');
      const itemStock = stockMap[raw.id];
      if (itemStock !== undefined) {
        if (typeof itemStock === 'object') {
          inStock = itemStock.inStock ?? (itemStock.quantity > 0);
          quantity = itemStock.quantity ?? 100;
        } else if (typeof itemStock === 'boolean') {
          inStock = itemStock;
          quantity = itemStock ? 100 : 0;
        } else if (typeof itemStock === 'number') {
          quantity = itemStock;
          inStock = itemStock > 0;
        }
      }
    } catch (_) {}
    return { ...raw, inStock: inStock && quantity > 0, quantity };
  }, [id]);

  const [mainImg, setMainImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState(0);
  const [snack, setSnack] = useState(false);

  const related = useMemo(
    () => products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 3),
    [product]
  );

  if (!product) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          Product not found.
        </Typography>
        <Button onClick={() => navigate(paths.products)} sx={{ mt: 2, color: COLOR_PRIMARY_DARK }}>
          Back to Japanese Products
        </Button>
      </Container>
    );
  }

  const imgs = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    addToCart(product, qty);
    setSnack(true);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs separator={<ChevronRightIcon fontSize="small" />} sx={{ mb: 3 }}>
          <MuiLink component={Link} to={paths.home} underline="hover" color={COLOR_PRIMARY_DARK} sx={{ fontSize: '0.88rem', fontWeight: 600 }}>
            Home
          </MuiLink>
          <MuiLink component={Link} to={paths.products} underline="hover" color={COLOR_PRIMARY_DARK} sx={{ fontSize: '0.88rem', fontWeight: 600 }}>
            Products
          </MuiLink>
          <Typography color="text.primary" sx={{ fontSize: '0.88rem', fontWeight: 600 }}>
            {product.name}
          </Typography>
        </Breadcrumbs>

        {/* Main Product Card (Flex Layout for zero-bug alignment) */}
        <Card
          elevation={2}
          sx={{
            borderRadius: '20px',
            border: '1.5px solid #FCE4EC',
            mb: 4,
            overflow: 'hidden',
            bgcolor: '#ffffff',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            {/* Left: Images Gallery */}
            <Box sx={{ width: { xs: '100%', md: '48%' }, p: { xs: 2.5, md: 3.5 } }}>
              <Box
                component="img"
                src={imgs[mainImg] || product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: { xs: 280, sm: 380, md: 440 },
                  objectFit: 'cover',
                  borderRadius: '14px',
                  border: '1px solid #FCE4EC',
                  mb: 2,
                }}
              />
              <Stack direction="row" spacing={1.5} flexWrap="wrap">
                {imgs.map((img, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={img}
                    onClick={() => setMainImg(i)}
                    sx={{
                      width: 68,
                      height: 68,
                      objectFit: 'cover',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      border: i === mainImg ? `3px solid ${COLOR_PRIMARY_DARK}` : '2px solid #FCE4EC',
                      transition: 'all 0.2s',
                      '&:hover': { opacity: 0.85 },
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Right: Product Information */}
            <Box sx={{ width: { xs: '100%', md: '52%' }, p: { xs: 2.5, md: 4.5 } }}>
              <Stack direction="row" spacing={1} mb={1.5} flexWrap="wrap">
                <Chip
                  label={product.categoryName}
                  size="small"
                  sx={{ bgcolor: '#FCE4EC', color: COLOR_PRIMARY_DARK, fontWeight: 800 }}
                />
                {product.badge && (
                  <Chip
                    label={product.badge}
                    size="small"
                    sx={{ bgcolor: COLOR_PRIMARY_DARK, color: '#ffffff', fontWeight: 800 }}
                  />
                )}
                {discount > 0 && (
                  <Chip
                    label={`-${discount}% OFF`}
                    size="small"
                    sx={{ bgcolor: '#2e7d32', color: '#ffffff', fontWeight: 800 }}
                  />
                )}
              </Stack>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  color: '#212121',
                  fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2rem' },
                  lineHeight: 1.3,
                  mb: 1.5,
                }}
              >
                {product.name}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={1} mb={2.5}>
                <Rating value={product.rating} precision={0.1} readOnly />
                <Typography variant="body2" color="text.secondary" fontWeight={600}>
                  {product.rating} ({product.reviewsCount} verified Japanese customer reviews)
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="baseline" spacing={2} mb={3}>
                <Typography variant="h3" sx={{ fontWeight: 900, color: COLOR_PRIMARY_DARK, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  {CURRENCY_SYMBOL}{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </Typography>
                {product.originalPrice && (
                  <Typography variant="h6" sx={{ color: '#9e9e9e', textDecoration: 'line-through', fontWeight: 600 }}>
                    {CURRENCY_SYMBOL}{product.originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </Typography>
                )}
              </Stack>

              <Typography variant="body1" sx={{ color: '#555555', lineHeight: 1.8, mb: 3 }}>
                {product.description}
              </Typography>

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <Box sx={{ mb: 3.5, bgcolor: '#FCE4EC', p: 2, borderRadius: '12px' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: COLOR_PRIMARY_DARK, mb: 1 }}>
                    Authentic Specifications & Features:
                  </Typography>
                  {product.features.map((feat, idx) => (
                    <Stack key={idx} direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                      <CheckCircleIcon sx={{ color: COLOR_PRIMARY_DARK, fontSize: 18 }} />
                      <Typography variant="body2" sx={{ color: '#424242', fontWeight: 600 }}>
                        {feat}
                      </Typography>
                    </Stack>
                  ))}
                </Box>
              )}

              {/* Live Inventory Availability Indicator */}
              {(() => {
                const currentStock = getProductStock(product.id);
                const inCart = getItemInCartCount(product.id);
                const availableToAdd = Math.max(0, currentStock - inCart);
                const isSoldOut = currentStock <= 0;
                const isMaxInCart = !isSoldOut && availableToAdd <= 0;

                return (
                  <>
                    <Stack direction="row" alignItems="center" spacing={1.2} mb={2.5}>
                      <Typography variant="body2" fontWeight={700} color="#666666">
                        Availability:
                      </Typography>
                      <Chip
                        label={
                          isSoldOut
                            ? 'Sold Out / Out of Stock'
                            : isMaxInCart
                            ? `${currentStock} units in Tokyo hub (Max ${inCart} in your cart)`
                            : inCart > 0
                            ? `${currentStock} units in Tokyo hub (${inCart} in your cart, ${availableToAdd} more left)`
                            : `${currentStock} units available in Tokyo hub`
                        }
                        size="small"
                        sx={{
                          fontWeight: 800,
                          bgcolor: isSoldOut ? '#ffebee' : isMaxInCart ? '#fff3e0' : currentStock > 20 ? '#e8f5e9' : '#fff3e0',
                          color: isSoldOut ? '#c62828' : isMaxInCart ? '#e65100' : currentStock > 20 ? '#2e7d32' : '#e65100',
                        }}
                      />
                    </Stack>

                    {/* Quantity Selector + Add to Cart + Buy Now */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} sx={{ mb: 2 }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{
                          border: `1.5px solid #F48FB1`,
                          borderRadius: '30px',
                          px: 1,
                          py: 0.3,
                          width: 'fit-content',
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => setQty((q) => Math.max(1, q - 1))}
                          disabled={qty <= 1 || isSoldOut || isMaxInCart}
                        >
                          <RemoveIcon fontSize="small" sx={{ color: COLOR_PRIMARY_DARK }} />
                        </IconButton>
                        <Typography variant="subtitle1" fontWeight={800} sx={{ minWidth: 32, textAlign: 'center' }}>
                          {isSoldOut || isMaxInCart ? 0 : qty}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => setQty((q) => Math.min(availableToAdd, q + 1))}
                          disabled={qty >= availableToAdd || isSoldOut || isMaxInCart}
                        >
                          <AddIcon fontSize="small" sx={{ color: COLOR_PRIMARY_DARK }} />
                        </IconButton>
                      </Stack>

                      <Button
                        variant="contained"
                        size="large"
                        disabled={isSoldOut || isMaxInCart}
                        startIcon={<ShoppingCartIcon />}
                        onClick={handleAddToCart}
                        sx={{
                          bgcolor: COLOR_PRIMARY_DARK,
                          '&:hover': { bgcolor: '#c2185b' },
                          borderRadius: '25px',
                          py: 1.2,
                          px: 3.5,
                          fontWeight: 800,
                          textTransform: 'none',
                          fontSize: '0.95rem',
                          flex: 1,
                        }}
                      >
                        {isSoldOut ? 'Sold Out' : isMaxInCart ? 'Max in Cart' : 'Add to Cart'}
                      </Button>

                      <Button
                        variant="outlined"
                        size="large"
                        disabled={isSoldOut || isMaxInCart}
                        onClick={() => {
                          addToCart(product, qty);
                          navigate(paths.checkout);
                        }}
                        sx={{
                          borderColor: COLOR_PRIMARY_DARK,
                          color: COLOR_PRIMARY_DARK,
                          borderRadius: '25px',
                          py: 1.2,
                          px: 3,
                          fontWeight: 800,
                          textTransform: 'none',
                          borderWidth: 2,
                          '&:hover': {
                            bgcolor: '#FCE4EC',
                            borderColor: COLOR_PRIMARY_DARK,
                            borderWidth: 2,
                          },
                        }}
                      >
                        Buy Now
                      </Button>
                    </Stack>
                  </>
                );
              })()}

              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                SKU: {product.sku} &nbsp;•&nbsp; {product.inStock ? '✅ In Stock in Tokyo & Manila Hub' : '❌ Out of Stock'}
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Tabbed Specs & Info */}
        <Card elevation={1} sx={{ borderRadius: '16px', mb: 5, border: '1px solid #FCE4EC' }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            textColor="inherit"
            TabIndicatorProps={{ style: { backgroundColor: COLOR_PRIMARY_DARK, height: 3 } }}
            sx={{ px: 2, borderBottom: '1px solid #FCE4EC' }}
          >
            <Tab label="Full Description" sx={{ textTransform: 'none', fontWeight: 800, color: tab === 0 ? COLOR_PRIMARY_DARK : 'inherit' }} />
            <Tab label="Product Details & Sourcing" sx={{ textTransform: 'none', fontWeight: 800, color: tab === 1 ? COLOR_PRIMARY_DARK : 'inherit' }} />
          </Tabs>
          <Box sx={{ p: 3.5 }}>
            {tab === 0 && (
              <Typography variant="body1" sx={{ color: '#424242', lineHeight: 1.9 }}>
                {product.description} All items are officially licensed, sourced directly from certified artisan manufacturers and distributors across Japan. Guaranteed authentic Japanese craftsmanship and top-tier build quality.
              </Typography>
            )}
            {tab === 1 && (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 2,
                }}
              >
                <Box><Typography variant="body2" fontWeight={800}>Product SKU</Typography><Typography variant="body2" color="text.secondary">{product.sku}</Typography></Box>
                <Box><Typography variant="body2" fontWeight={800}>Category</Typography><Typography variant="body2" color="text.secondary">{product.categoryName}</Typography></Box>
                <Box><Typography variant="body2" fontWeight={800}>Origin</Typography><Typography variant="body2" color="text.secondary">Imported from Japan</Typography></Box>
                <Box><Typography variant="body2" fontWeight={800}>Stock Status</Typography><Typography variant="body2" color="#2e7d32" fontWeight={700}>Verified In Stock</Typography></Box>
              </Box>
            )}
          </Box>
        </Card>

        {/* Related Japanese Products */}
        {related.length > 0 && (
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 900, color: COLOR_PRIMARY_DARK, mb: 3 }}>
              Related Japanese Products
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 3,
              }}
            >
              {related.map((p) => (
                <Card
                  key={p.id}
                  elevation={1}
                  onClick={() => {
                    navigate(paths.productDetails(p.id));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  sx={{
                    borderRadius: '16px',
                    border: '1.5px solid #FCE4EC',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    '&:hover': {
                      borderColor: '#F48FB1',
                      boxShadow: '0 8px 24px rgba(236, 64, 122, 0.16)',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardMedia component="img" height="180" image={p.image} alt={p.name} sx={{ objectFit: 'cover' }} />
                  <CardContent sx={{ pb: 1 }}>
                    <Typography variant="subtitle2" fontWeight={800} noWrap>
                      {p.name}
                    </Typography>
                    <Typography variant="h6" fontWeight={900} color={COLOR_PRIMARY_DARK} sx={{ mt: 0.5 }}>
                      {CURRENCY_SYMBOL}{p.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p, 1);
                      }}
                      sx={{
                        borderColor: COLOR_PRIMARY_DARK,
                        color: COLOR_PRIMARY_DARK,
                        borderRadius: '20px',
                        fontWeight: 700,
                        textTransform: 'none',
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Box>
          </Box>
        )}
      </Container>

      <Snackbar
        open={snack}
        autoHideDuration={2500}
        onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ bgcolor: COLOR_PRIMARY_DARK, fontWeight: 700 }} onClose={() => setSnack(false)}>
          Added to your Japanese shopping cart! 🌸
        </Alert>
      </Snackbar>
    </Box>
  );
}
