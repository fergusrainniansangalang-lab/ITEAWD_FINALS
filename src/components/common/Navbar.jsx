/**
 * Navbar.jsx
 * ============================================================
 * RaiJouKaKu Header & Navigation
 * Fixes Applied:
 * 1. Brand name updated to: RaiJouKaKu
 * 2. Header Alignment:
 *    - Balanced 3-column layout (Left: Logo, Center: Nav Links, Right: Auth)
 *    - Perfect vertical and horizontal alignment
 *    - Divider "|" styling between links
 * 3. Search & Cart Row:
 *    - Centered pill search bar with soft pink background
 *    - Perfectly aligned search button and shopping cart badge
 * ============================================================
 */
import React, { useState } from 'react';
import {
  AppBar, Toolbar, Box, Typography, IconButton, InputBase,
  Button, Drawer, List, ListItem, ListItemText, Badge, useMediaQuery,
  useTheme, Divider, Stack, Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from 'context/CartContext';
import paths from 'routes/paths';
import { SITE_NAME, SITE_NAME_JP } from '../../config';

const NAV_ITEMS = [
  { label: 'HOME', path: paths.home },
  { label: 'CATEGORIES', path: paths.products },
  { label: 'CUSTOMER SERVICE', path: paths.contact },
  { label: 'ABOUT US', path: paths.about },
];

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${paths.products}?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <Box sx={{ width: '100%', bgcolor: '#ffffff' }}>
      {/* ── Top Pink Banner Bar ── */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: 'linear-gradient(180deg, #F48FB1 0%, #F8BBD0 85%, #FCE4EC 100%)',
          color: '#ffffff',
          pt: 1.2,
          pb: 3,
          position: 'relative',
          overflow: 'hidden',
          // Wavy bottom edge
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -22,
            left: 0,
            width: '100%',
            height: 44,
            background: '#ffffff',
            borderRadius: '50% 50% 0 0 / 26px 26px 0 0',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'auto 1fr', md: '1.2fr auto 1.2fr' },
              alignItems: 'center',
              minHeight: { xs: 58, md: 66 },
              zIndex: 2,
            }}
          >
            {/* 1. Left: Brand Logo (RaiJouKaKu) */}
            <Box
              component={Link}
              to={paths.home}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.2,
                textDecoration: 'none',
                color: '#ffffff',
                width: 'fit-content',
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 0.9 },
              }}
            >
              <LocalFloristIcon sx={{ fontSize: { xs: 32, md: 38 }, color: '#ffffff' }} />
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '1.25rem', md: '1.65rem' },
                    letterSpacing: '1.5px',
                    fontFamily: '"Plus Jakarta Sans", "Roboto", sans-serif',
                    color: '#ffffff',
                    lineHeight: 1.1,
                    textShadow: '0 1px 3px rgba(0,0,0,0.15)',
                  }}
                >
                  {SITE_NAME}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '0.68rem',
                    letterSpacing: '2px',
                    color: 'rgba(255,255,255,0.92)',
                    display: 'block',
                    fontFamily: '"Hiragino Kaku Gothic ProN", "Meiryo", sans-serif',
                  }}
                >
                  {SITE_NAME_JP}
                </Typography>
              </Box>
            </Box>

            {/* 2. Center: Desktop Nav Links (Centrally Aligned with "|" Dividers) */}
            {!isMobile ? (
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                {NAV_ITEMS.map((item, idx) => (
                  <React.Fragment key={item.label}>
                    {idx > 0 && (
                      <Typography
                        sx={{
                          color: 'rgba(255,255,255,0.65)',
                          fontSize: '0.9rem',
                          fontWeight: 300,
                          userSelect: 'none',
                        }}
                      >
                        |
                      </Typography>
                    )}
                    <Button
                      component={Link}
                      to={item.path}
                      sx={{
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        letterSpacing: '1px',
                        px: 1.2,
                        py: 0.6,
                        whiteSpace: 'nowrap',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.2)',
                          borderRadius: 2,
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  </React.Fragment>
                ))}
              </Stack>
            ) : (
              <Box />
            )}

            {/* 3. Right: Auth Links & Mobile Menu Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              {!isMobile ? (
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Button
                    component={Link}
                    to={paths.login}
                    sx={{
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      letterSpacing: '1px',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                    }}
                  >
                    LOGIN
                  </Button>
                  <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', fontWeight: 300 }}>
                    |
                  </Typography>
                  <Button
                    component={Link}
                    to={paths.login}
                    sx={{
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      letterSpacing: '1px',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                    }}
                  >
                    REGISTER
                  </Button>
                </Stack>
              ) : (
                <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#ffffff' }}>
                  <MenuIcon fontSize="large" />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ── Search Bar & Cart Row (Centered with generous margins) ── */}
      <Container maxWidth="md" sx={{ mt: { xs: 2.5, md: 3.5 }, mb: { xs: 2.5, md: 3.5 } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            width: '100%',
          }}
        >
          {/* Soft Pink Pill Search Bar */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: 620,
              bgcolor: '#FCE4EC',
              border: '1.5px solid #F8BBD0',
              borderRadius: '35px',
              px: 2.5,
              py: 0.6,
              boxShadow: '0 2px 10px rgba(244, 143, 177, 0.14)',
              transition: 'all 0.25s ease',
              '&:focus-within': {
                borderColor: '#EC407A',
                boxShadow: '0 4px 14px rgba(236, 64, 122, 0.22)',
                bgcolor: '#ffffff',
              },
            }}
          >
            <InputBase
              placeholder="Search Japanese snacks, kimono, electronics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                flex: 1,
                fontSize: '0.95rem',
                color: '#333333',
                '& ::placeholder': {
                  color: '#AD1457',
                  opacity: 0.55,
                },
              }}
            />
            <IconButton
              type="submit"
              sx={{
                color: '#EC407A',
                p: 0.8,
                border: '1.5px solid #F48FB1',
                borderRadius: '50%',
                bgcolor: '#ffffff',
                ml: 1,
                '&:hover': {
                  bgcolor: '#FCE4EC',
                  borderColor: '#EC407A',
                },
              }}
            >
              <SearchIcon sx={{ fontSize: 22 }} />
            </IconButton>
          </Box>

          {/* Pink Shopping Cart Icon with Badge */}
          <IconButton
            component={Link}
            to={paths.cart}
            sx={{
              color: '#EC407A',
              border: '1.5px solid #F48FB1',
              bgcolor: '#FCE4EC',
              p: 1.15,
              borderRadius: '50%',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: '#EC407A',
                color: '#ffffff',
                borderColor: '#EC407A',
                transform: 'scale(1.06)',
              },
            }}
          >
            <Badge
              badgeContent={cartCount}
              sx={{
                '& .MuiBadge-badge': {
                  bgcolor: '#EC407A',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.72rem',
                },
              }}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 26 }} />
            </Badge>
          </IconButton>
        </Box>
      </Container>

      {/* ── Mobile Navigation Drawer ── */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, pt: 2, px: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocalFloristIcon sx={{ color: '#EC407A' }} />
              <Typography variant="h6" fontWeight={900} color="#EC407A">
                {SITE_NAME}
              </Typography>
            </Box>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <List>
            {NAV_ITEMS.map((item) => (
              <ListItem
                key={item.label}
                component={Link}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  color: '#333333',
                  '&:hover': { bgcolor: '#FCE4EC', color: '#EC407A' },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: 700, fontSize: '0.92rem' }}
                />
              </ListItem>
            ))}
            <Divider sx={{ my: 1.5 }} />
            <ListItem
              component={Link}
              to={paths.cart}
              onClick={() => setDrawerOpen(false)}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemText
                primary={`Shopping Cart (${cartCount})`}
                primaryTypographyProps={{ fontWeight: 700, color: '#EC407A' }}
              />
            </ListItem>
            <ListItem
              component={Link}
              to={paths.login}
              onClick={() => setDrawerOpen(false)}
              sx={{ borderRadius: 2 }}
            >
              <ListItemText primary="Login / Register" primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
