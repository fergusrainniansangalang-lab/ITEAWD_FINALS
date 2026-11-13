/**
 * Home.jsx
 * ============================================================
 * Japanese Sakura-Themed Homepage
 * Precisely matched to the reference photo:
 * 1. Hero Carousel:
 *    - Centered rounded card with Sapporo & Japanese theme banner
 *    - Carousel navigation: "< . . . >" indicators
 * 2. Category Icons Bar:
 *    - Ample margin top/bottom
 *    - Pink outline icons with centered uppercase labels:
 *      CLOTHING, FOODS, ELECTRONICS, SHOES, HOME GOODS, SPORTS & OUTDOORS, BOOKS
 * 3. Featured Products Row:
 *    - Perfectly centered 3-card layout matching photo:
 *      Card 1: Tengoku Tokyo Haori Jacket
 *      Card 2: Sapporo Premium Soju / Beer
 *      Card 3: Asics Gel-Kayano 14 Sneakers
 *    - Elegant pink borders (#F48FB1) with rounded corners
 * 4. Promo Banner & CTA
 * ============================================================
 */
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardMedia, CardContent, CardActions,
  Button, IconButton, Stack, Chip, Rating, Container, Paper, Avatar
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'context/CartContext';
import { useAuth } from 'context/AuthContext';
import { products } from 'data/products';
import paths from 'routes/paths';
import {
  FREE_SHIPPING_THRESHOLD,
  CURRENCY_SYMBOL,
  HERO_SLIDES,
  COLOR_PRIMARY,
  COLOR_PRIMARY_DARK,
  COLOR_PRIMARY_LIGHT,
  LS_STOCK_KEY,
  getProductStock,
} from '../config';

/* ── Category definitions matching screenshot icons & labels ── */
const CATEGORIES = [
  { label: 'CLOTHING', icon: <CheckroomOutlinedIcon sx={{ fontSize: { xs: 44, md: 54 } }} />, key: 'clothing' },
  { label: 'FOODS', icon: <StorefrontOutlinedIcon sx={{ fontSize: { xs: 44, md: 54 } }} />, key: 'grocery' },
  { label: 'ELECTRONICS', icon: <DevicesOutlinedIcon sx={{ fontSize: { xs: 44, md: 54 } }} />, key: 'electronics' },
  { label: 'SHOES', icon: <DirectionsRunOutlinedIcon sx={{ fontSize: { xs: 44, md: 54 } }} />, key: 'shoes' },
  { label: 'HOME GOODS', icon: <HomeOutlinedIcon sx={{ fontSize: { xs: 44, md: 54 } }} />, key: 'cleaning' },
  { label: 'SPORTS & OUTDOORS', icon: <SportsBasketballOutlinedIcon sx={{ fontSize: { xs: 44, md: 54 } }} />, key: 'sports' },
  { label: 'BOOKS', icon: <MenuBookOutlinedIcon sx={{ fontSize: { xs: 44, md: 54 } }} />, key: 'books' },
];

export default function Home() {
  const navigate = useNavigate();
  const { addToCart, getItemInCartCount, getRemainingPurchasable } = useCart();
  const { user, isLoggedIn } = useAuth();
  const [slide, setSlide] = useState(0);

  // Take designated featured products that have active stock in admin
  const featured = products
    .map((p) => {
      const quantity = getProductStock(p.id);
      return { ...p, quantity, inStock: quantity > 0 };
    })
    .filter((p) => p.isFeatured && p.inStock)
    .slice(0, 3);

  /* Auto-advance carousel */
  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 4500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setSlide(s => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const nextSlide = () => setSlide(s => (s + 1) % HERO_SLIDES.length);

  return (
    <Box sx={{ bgcolor: '#ffffff', pb: 6 }}>
      {/* ═════════════════════════════════════════════════════════
          1. HERO CAROUSEL (Rounded card with margins, matching photo)
      ═════════════════════════════════════════════════════════ */}
      <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }}>
        {/* Personalized Member Welcome Card (Displayed upon login) */}
        {isLoggedIn && (
          <Paper
            elevation={0}
            sx={{
              background: 'linear-gradient(135deg, #FFF0F5 0%, #FFFFFF 55%, #FCE4EC 100%)',
              borderRadius: { xs: '14px', md: '18px' },
              border: '1.5px solid #F48FB1',
              p: { xs: 2, sm: 2.5 },
              mb: 3,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: 2,
              boxShadow: '0 4px 20px rgba(236, 64, 122, 0.1)',
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{
                  bgcolor: COLOR_PRIMARY_DARK,
                  width: { xs: 46, sm: 54 },
                  height: { xs: 46, sm: 54 },
                  fontWeight: 900,
                  fontSize: '1.35rem',
                  boxShadow: '0 4px 14px rgba(236, 64, 122, 0.35)',
                }}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : '客'}
              </Avatar>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 900,
                      color: '#212121',
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    }}
                  >
                    Kon'nichiwa, {user?.name || 'Customer'}! (こんにちは)
                  </Typography>
                  <Chip
                    icon={<LocalFloristIcon sx={{ fontSize: '14px !important', color: '#EC407A !important' }} />}
                    label="Active RaiJouKaKu Member"
                    size="small"
                    sx={{
                      bgcolor: 'rgba(236, 64, 122, 0.12)',
                      color: COLOR_PRIMARY_DARK,
                      fontWeight: 800,
                      fontSize: '0.72rem',
                      height: 22,
                    }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3, fontSize: '0.88rem' }}>
                  Welcome to your personalized Tokyo storefront. Authentic imports and live stock are ready for you.
                </Typography>
              </Box>
            </Stack>

            <Button
              variant="contained"
              size="small"
              onClick={() => navigate(paths.products)}
              sx={{
                bgcolor: COLOR_PRIMARY_DARK,
                '&:hover': { bgcolor: '#c2185b' },
                borderRadius: '20px',
                px: 3,
                py: 0.9,
                fontWeight: 800,
                textTransform: 'none',
                fontSize: '0.85rem',
                whiteSpace: 'nowrap',
                alignSelf: { xs: 'stretch', sm: 'center' },
                boxShadow: '0 3px 10px rgba(236, 64, 122, 0.25)',
              }}
            >
              Shop 35 Tokyo Products
            </Button>
          </Paper>
        )}

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            borderRadius: { xs: '14px', md: '22px' },
            overflow: 'hidden',
            bgcolor: '#1a1a1a',
            boxShadow: '0 8px 28px rgba(0,0,0,0.12)',
            height: { xs: 240, sm: 360, md: 440 },
          }}
        >
          {HERO_SLIDES.map((s, i) => (
            <Box
              key={i}
              sx={{
                display: i === slide ? 'block' : 'none',
                position: 'relative',
                height: '100%',
                width: '100%',
              }}
            >
              <Box
                component="img"
                src={s.img}
                alt={s.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.88,
                }}
              />
              {/* Subtle darkened gradient overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                }}
              />
              {/* Slide text */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: { xs: 55, md: 65 },
                  left: { xs: 20, md: 48 },
                  right: { xs: 20, md: 48 },
                  color: '#ffffff',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '1.3rem', sm: '1.9rem', md: '2.5rem' },
                    textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                    mb: 0.5,
                  }}
                >
                  {s.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: { xs: '0.85rem', md: '1.1rem' },
                    opacity: 0.95,
                    textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                    mb: 1.5,
                  }}
                >
                  {s.sub}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate(paths.products)}
                  sx={{
                    bgcolor: COLOR_PRIMARY_DARK,
                    '&:hover': { bgcolor: '#c2185b' },
                    borderRadius: 25,
                    px: 3.5,
                    py: 0.8,
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: '0 4px 14px rgba(236,64,122,0.4)',
                  }}
                >
                  Explore Collection
                </Button>
              </Box>
            </Box>
          ))}

          {/* Carousel Center Controls: "< . . . >" like in screenshot */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              bgcolor: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(4px)',
              px: 2,
              py: 0.4,
              borderRadius: 20,
              zIndex: 3,
            }}
          >
            <IconButton
              size="small"
              onClick={prevSlide}
              sx={{ color: '#ffffff', p: 0.3, '&:hover': { color: COLOR_PRIMARY } }}
            >
              <ChevronLeftIcon fontSize="small" />
            </IconButton>

            {HERO_SLIDES.map((_, i) => (
              <Box
                key={i}
                onClick={() => setSlide(i)}
                sx={{
                  width: i === slide ? 16 : 8,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: i === slide ? COLOR_PRIMARY : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}

            <IconButton
              size="small"
              onClick={nextSlide}
              sx={{ color: '#ffffff', p: 0.3, '&:hover': { color: COLOR_PRIMARY } }}
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Container>

      {/* ═════════════════════════════════════════════════════════
          2. CATEGORY ICONS BAR (With generous margins, matching photo)
      ═════════════════════════════════════════════════════════ */}
      <Container maxWidth="lg" sx={{ my: { xs: 3, md: 5 } }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 2.5, sm: 4, md: 6 },
            px: 2,
          }}
        >
          {CATEGORIES.map((cat) => (
            <Box
              key={cat.key}
              onClick={() => navigate(`${paths.products}?category=${cat.key}`)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.2,
                cursor: 'pointer',
                p: 1.5,
                borderRadius: 3,
                transition: 'all 0.25s ease',
                color: '#F48FB1',
                '&:hover': {
                  bgcolor: '#FCE4EC',
                  color: '#EC407A',
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Box sx={{ color: 'inherit', transition: 'transform 0.2s' }}>
                {cat.icon}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '0.68rem', md: '0.78rem' },
                  letterSpacing: '1px',
                  color: 'inherit',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                {cat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* ═════════════════════════════════════════════════════════
          3. FEATURED PRODUCTS (3 Centered Cards matching screenshot)
      ═════════════════════════════════════════════════════════ */}
      <Box sx={{ bgcolor: '#fafafa', py: { xs: 4, md: 6 }, borderTop: '1px solid #FCE4EC', borderBottom: '1px solid #FCE4EC' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: COLOR_PRIMARY_DARK,
                letterSpacing: '1px',
                fontSize: { xs: '1.6rem', md: '2.2rem' },
                mb: 1,
              }}
            >
              Featured Japanese Selections
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Hand-picked authentic Japanese streetwear, foods, and footwear
            </Typography>
          </Box>

          {/* 3 Perfectly Centered Cards Flex Row */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: { xs: 3, md: 4 },
              mx: 'auto',
            }}
          >
            {featured.map((product) => (
              <Card
                key={product.id}
                elevation={3}
                onClick={() => navigate(paths.productDetails(product.id))}
                sx={{
                  width: { xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(33.333% - 28px)' },
                  maxWidth: 360,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '18px',
                  border: `2.5px solid #F48FB1`,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  bgcolor: '#ffffff',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderColor: '#EC407A',
                    boxShadow: '0 12px 32px rgba(236, 64, 122, 0.22)',
                    transform: 'translateY(-6px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={product.image || '/images/placeholder.svg'}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/placeholder.svg';
                  }}
                  sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.4s',
                    '&:hover': { transform: 'scale(1.04)' },
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 2.5, pb: 1 }}>
                  {product.badge && (
                    <Chip
                      label={product.badge}
                      size="small"
                      sx={{
                        bgcolor: COLOR_PRIMARY_DARK,
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '0.68rem',
                        mb: 1,
                      }}
                    />
                  )}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      lineHeight: 1.35,
                      color: '#212121',
                      mb: 0.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      height: 44,
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Typography variant="caption" sx={{ color: '#888888', fontWeight: 600, textTransform: 'uppercase' }}>
                    {product.categoryName}
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={0.8} sx={{ my: 1 }}>
                    <Rating value={product.rating} precision={0.1} readOnly size="small" />
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      ({product.reviewsCount})
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                    <Stack direction="row" alignItems="baseline" spacing={1.5}>
                      <Typography variant="h5" sx={{ fontWeight: 900, color: COLOR_PRIMARY_DARK }}>
                        {CURRENCY_SYMBOL}{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </Typography>
                      {product.originalPrice && (
                        <Typography
                          variant="body2"
                          sx={{ color: '#9e9e9e', textDecoration: 'line-through', fontWeight: 600 }}
                        >
                          {CURRENCY_SYMBOL}{product.originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </Typography>
                      )}
                    </Stack>

                    <Chip
                      label={`${product.quantity} in stock`}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        bgcolor: product.quantity > 20 ? 'rgba(46, 125, 50, 0.12)' : 'rgba(237, 108, 2, 0.12)',
                        color: product.quantity > 20 ? '#2e7d32' : '#e65100',
                        borderRadius: '6px',
                      }}
                    />
                  </Stack>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  {(() => {
                    const currentStock = getProductStock(product.id);
                    const remaining = getRemainingPurchasable(product.id);
                    const isSoldOut = currentStock <= 0;
                    const isMax = !isSoldOut && remaining <= 0;

                    return (
                      <Button
                        fullWidth
                        variant="contained"
                        disabled={isSoldOut || isMax}
                        startIcon={<ShoppingCartIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, 1);
                        }}
                        sx={{
                          bgcolor: (isSoldOut || isMax) ? '#e0e0e0' : COLOR_PRIMARY_DARK,
                          '&:hover': { bgcolor: '#c2185b' },
                          borderRadius: '25px',
                          py: 1,
                          fontWeight: 800,
                          textTransform: 'none',
                          fontSize: '0.92rem',
                          boxShadow: '0 4px 12px rgba(236, 64, 122, 0.3)',
                        }}
                      >
                        {isSoldOut ? 'Sold Out' : isMax ? 'Max in Cart' : 'Add to Cart'}
                      </Button>
                    );
                  })()}
                </CardActions>
              </Card>
            ))}
          </Box>

          {/* Centered View All Button */}
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate(paths.products)}
              sx={{
                borderColor: COLOR_PRIMARY_DARK,
                color: COLOR_PRIMARY_DARK,
                borderWidth: 2,
                borderRadius: '30px',
                px: 5,
                py: 1.2,
                fontWeight: 800,
                fontSize: '1rem',
                textTransform: 'none',
                transition: 'all 0.25s',
                '&:hover': {
                  bgcolor: '#FCE4EC',
                  borderColor: COLOR_PRIMARY_DARK,
                  borderWidth: 2,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              View All 35 Products
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ═════════════════════════════════════════════════════════
          4. PROMO BANNER (With generous spacing)
      ═════════════════════════════════════════════════════════ */}
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Box
          sx={{
            background: 'linear-gradient(135deg, #F48FB1 0%, #EC407A 100%)',
            borderRadius: '24px',
            py: { xs: 5, md: 7 },
            px: 3,
            textAlign: 'center',
            color: '#ffffff',
            boxShadow: '0 10px 30px rgba(236, 64, 122, 0.25)',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, fontSize: { xs: '1.5rem', md: '2.4rem' } }}>
            Free Express Shipping on Orders Over {CURRENCY_SYMBOL}{FREE_SHIPPING_THRESHOLD}
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.95, mb: 3.5, maxWidth: 600, mx: 'auto' }}>
            Direct import from Tokyo, Kyoto & Osaka — guaranteed 100% authentic Japanese goods
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(paths.products)}
            sx={{
              bgcolor: '#ffffff',
              color: COLOR_PRIMARY_DARK,
              fontWeight: 900,
              borderRadius: '30px',
              px: 5,
              py: 1.3,
              fontSize: '1rem',
              textTransform: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              '&:hover': {
                bgcolor: '#FCE4EC',
                transform: 'scale(1.04)',
              },
            }}
          >
            Start Shopping Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
