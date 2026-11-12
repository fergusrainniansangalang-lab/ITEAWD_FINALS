/**
 * Footer.jsx
 * ============================================================
 * Japanese Sakura-Themed Footer
 * Re-aligned with responsive CSS Grid & Flexbox to prevent any
 * MUI Grid item layout collapse.
 * ============================================================
 */
import React from 'react';
import { Box, Typography, Link as MuiLink, Divider, Stack, Container } from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { Link } from 'react-router-dom';
import paths from 'routes/paths';
import {
  SITE_NAME,
  SITE_NAME_EN,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_ADDRESS,
  COLOR_PRIMARY_DARK,
} from '../../config';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#FCE4EC',
        pt: { xs: 5, md: 7 },
        pb: 3,
        mt: 'auto',
        borderTop: '3px solid #F48FB1',
      }}
    >
      <Container maxWidth="xl">
        {/* 4 Column Layout via CSS Grid (100% reliable) */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: '1.6fr 1fr 1fr 1.4fr',
            },
            gap: { xs: 4, md: 5 },
            mb: 4,
          }}
        >
          {/* Brand Column */}
          <Box>
            <Stack direction="row" alignItems="center" spacing={1.2} mb={1.5}>
              <LocalFloristIcon sx={{ color: COLOR_PRIMARY_DARK, fontSize: 32 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  color: COLOR_PRIMARY_DARK,
                  letterSpacing: '1px',
                  fontFamily: '"Hiragino Kaku Gothic ProN", "Meiryo", sans-serif',
                }}
              >
                {SITE_NAME}
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: '#616161', lineHeight: 1.8, maxWidth: 320 }}>
              {SITE_NAME_EN} — Your premier boutique for authentic Japanese lifestyle essentials, traditional crafts, culinary delicacies, and modern innovations.
            </Typography>
          </Box>

          {/* Shop Links Column */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 800, color: COLOR_PRIMARY_DARK, mb: 1.8, letterSpacing: '0.5px' }}
            >
              Shop Categories
            </Typography>
            {[
              { label: 'Clothing & Kimono', path: `${paths.products}?category=clothing` },
              { label: 'Foods & Japanese Snacks', path: `${paths.products}?category=grocery` },
              { label: 'Precision Electronics', path: `${paths.products}?category=electronics` },
              { label: 'Footwear & Geta', path: `${paths.products}?category=shoes` },
              { label: 'All 35 Japanese Items', path: paths.products },
            ].map((l) => (
              <MuiLink
                key={l.label}
                component={Link}
                to={l.path}
                underline="hover"
                display="block"
                sx={{ color: '#424242', fontSize: '0.88rem', mb: 1, fontWeight: 500 }}
              >
                {l.label}
              </MuiLink>
            ))}
          </Box>

          {/* Customer Service Column */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 800, color: COLOR_PRIMARY_DARK, mb: 1.8, letterSpacing: '0.5px' }}
            >
              Customer Service
            </Typography>
            {[
              { label: 'About RaiJouKaKu', path: paths.about },
              { label: 'Customer Service & Help Desk', path: paths.contact },
              { label: 'Shopping Cart', path: paths.cart },
              { label: 'Order Tracking', path: paths.cart },
            ].map((l) => (
              <MuiLink
                key={l.label}
                component={Link}
                to={l.path}
                underline="hover"
                display="block"
                sx={{ color: '#424242', fontSize: '0.88rem', mb: 1, fontWeight: 500 }}
              >
                {l.label}
              </MuiLink>
            ))}
          </Box>

          {/* Contact Details Column */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 800, color: COLOR_PRIMARY_DARK, mb: 1.8, letterSpacing: '0.5px' }}
            >
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ color: '#424242', mb: 1, fontWeight: 500 }}>
              📧 {CONTACT_EMAIL}
            </Typography>
            <Typography variant="body2" sx={{ color: '#424242', mb: 1, fontWeight: 500 }}>
              📞 {CONTACT_PHONE}
            </Typography>
            <Typography variant="body2" sx={{ color: '#424242', mb: 1, fontWeight: 500 }}>
              📍 {CONTACT_ADDRESS}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: '#F48FB1' }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} {SITE_NAME} ({SITE_NAME_JP}). All rights reserved.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Designed for ITEAWD Finals Examination • Authentic Japanese Experience 🌸
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
