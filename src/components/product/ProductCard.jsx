/* ProductCard.jsx */
import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Chip, Stack, Rating, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'context/CartContext';
import paths from 'routes/paths';
import { CURRENCY_SYMBOL, COLOR_PRIMARY_DARK } from '../../config';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  if (!product) return null;

  return (
    <Card
      elevation={2}
      onClick={() => navigate(paths.productDetails(product.id))}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        border: '1.5px solid #FCE4EC',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        '&:hover': {
          borderColor: '#F48FB1',
          boxShadow: '0 8px 24px rgba(236, 64, 122, 0.18)',
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden', height: 210 }}>
        <CardMedia
          component="img"
          height="210"
          image={product.image}
          alt={product.name}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.35s ease',
            '&:hover': { transform: 'scale(1.05)' },
          }}
        />
        {product.badge && (
          <Chip
            label={product.badge}
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              bgcolor: COLOR_PRIMARY_DARK,
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.68rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2, pb: 0.5 }}>
        <Typography variant="caption" sx={{ color: '#888888', fontWeight: 600, textTransform: 'uppercase' }}>
          {product.categoryName}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 800,
            fontSize: '0.98rem',
            lineHeight: 1.3,
            color: '#212121',
            mt: 0.3,
            mb: 0.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            height: 42,
          }}
        >
          {product.name}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={0.6} sx={{ my: 0.8 }}>
          <Rating value={product.rating} precision={0.1} readOnly size="small" />
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            ({product.reviewsCount})
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 900, color: COLOR_PRIMARY_DARK, fontSize: '1.15rem' }}>
            {CURRENCY_SYMBOL}{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </Typography>
          <Chip
            label={`${product.quantity ?? 100} in stock`}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.68rem',
              fontWeight: 800,
              bgcolor: (product.quantity ?? 100) > 20 ? 'rgba(46, 125, 50, 0.12)' : (product.quantity ?? 100) > 0 ? 'rgba(237, 108, 2, 0.12)' : 'rgba(211, 47, 47, 0.12)',
              color: (product.quantity ?? 100) > 20 ? '#2e7d32' : (product.quantity ?? 100) > 0 ? '#e65100' : '#d32f2f',
              borderRadius: '6px',
            }}
          />
        </Stack>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 1 }}>
        <Button
          fullWidth
          variant="contained"
          size="small"
          disabled={(product.quantity ?? 100) <= 0}
          startIcon={<ShoppingCartIcon fontSize="small" />}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product, 1);
          }}
          sx={{
            bgcolor: (product.quantity ?? 100) <= 0 ? '#e0e0e0' : COLOR_PRIMARY_DARK,
            '&:hover': { bgcolor: '#c2185b' },
            borderRadius: '20px',
            py: 0.8,
            fontWeight: 800,
            textTransform: 'none',
            fontSize: '0.85rem',
          }}
        >
          {(product.quantity ?? 100) <= 0 ? 'Sold Out' : 'Add to Cart'}
        </Button>
      </CardActions>
    </Card>
  );
}
