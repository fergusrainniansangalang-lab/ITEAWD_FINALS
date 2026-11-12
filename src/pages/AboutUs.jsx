/**
 * AboutUs.jsx
 * ============================================================
 * RaiJouKaKu (ライジョウカク) - Dedicated About Us Page
 * Highlights the store heritage, Japanese sourcing prefectures,
 * core philosophy (Monozukuri, Omotenashi, Kodawari), and the
 * 7 curated product pillars.
 * ============================================================
 */
import React from 'react';
import {
  Box, Container, Typography, Card, CardContent, Button,
  Stack, Divider, Chip
} from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import VerifiedIcon from '@mui/icons-material/Verified';
import PublicIcon from '@mui/icons-material/Public';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/paths';
import {
  SITE_NAME,
  SITE_NAME_JP,
  COLOR_PRIMARY_DARK,
} from '../config';

const PHILOSOPHY_PILLARS = [
  {
    kanji: 'ものづくり',
    title: 'Monozukuri (Craftsmanship)',
    desc: 'The Japanese art of synthesis, precision, and relentless dedication to product excellence. Every item in our inventory embodies this enduring standard.',
    icon: <AutoAwesomeIcon sx={{ color: COLOR_PRIMARY_DARK, fontSize: 32 }} />,
  },
  {
    kanji: 'おもてなし',
    title: 'Omotenashi (Hospitality)',
    desc: 'Selfless, attentive care that anticipates your needs. From careful shock-proof packaging to 24-hour response times, we serve with genuine care.',
    icon: <FavoriteIcon sx={{ color: COLOR_PRIMARY_DARK, fontSize: 32 }} />,
  },
  {
    kanji: 'こだわり',
    title: 'Kodawari (Obsessive Standards)',
    desc: 'An uncompromising pursuit of authenticity. We partner directly with historic workshops, master breweries, and certified manufacturers in Japan.',
    icon: <VerifiedIcon sx={{ color: COLOR_PRIMARY_DARK, fontSize: 32 }} />,
  },
  {
    kanji: '架け橋',
    title: 'Kakehashi (Global Bridge)',
    desc: 'Bridging the cultural elegance of Tokyo, Kyoto, and Osaka directly to your doorstep with reliable logistics and transparent service.',
    icon: <PublicIcon sx={{ color: COLOR_PRIMARY_DARK, fontSize: 32 }} />,
  },
];

const PREFECTURES = [
  { region: 'Tokyo (東京)', spec: 'Cutting-Edge Electronics, Audio & Cultural Literature' },
  { region: 'Kyoto (京都)', spec: 'Ceremonial Stone-Ground Matcha & Hand-Dyed Yukata' },
  { region: 'Okayama (岡山)', spec: 'Artisan Kurashiki Selvedge Denim & Weaving' },
  { region: 'Hokkaido (北海道)', spec: 'Sapporo Breweries, Premium Malts & Confectionery' },
  { region: 'Kobe (神戸)', spec: 'GEL Cushioning Athletic Footwear & Running Tech' },
  { region: 'Wakayama (和歌山)', spec: 'Kishu Binchotan White Charcoal & Natural Palm Crafts' },
  { region: 'Iwate (岩手)', spec: '900-Year Tradition Nambu Tekki Cast Ironware' },
];

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', pb: 8 }}>
      {/* ── Hero Banner ── */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #F8BBD0 0%, #EC407A 100%)',
          py: { xs: 6, md: 9 },
          textAlign: 'center',
          color: '#ffffff',
          px: 2,
        }}
      >
        <LocalFloristIcon sx={{ fontSize: { xs: 52, md: 68 }, mb: 1.5 }} />
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            mb: 1,
            fontSize: { xs: '1.9rem', md: '3rem' },
            letterSpacing: '1px',
          }}
        >
          About {SITE_NAME}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            letterSpacing: '3px',
            opacity: 0.95,
            fontFamily: '"Hiragino Kaku Gothic ProN", "Meiryo", sans-serif',
            mb: 1.5,
          }}
        >
          {SITE_NAME_JP} • Castle of Grace & Quality
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            opacity: 0.95,
            maxWidth: 680,
            mx: 'auto',
            lineHeight: 1.8,
            fontSize: { xs: '0.95rem', md: '1.1rem' },
          }}
        >
          Your premier online boutique connecting global collectors and connoisseurs with genuine Japanese streetwear, culinary delicacies, smart technology, and lifestyle essentials.
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* ── Section 1: Our Origin & Story ── */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Chip
            label="Our Heritage & Purpose"
            sx={{ bgcolor: '#FCE4EC', color: COLOR_PRIMARY_DARK, fontWeight: 800, mb: 2, px: 1.5 }}
          />
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, color: '#212121', mb: 2.5, fontSize: { xs: '1.5rem', md: '2.2rem' } }}
          >
            Bringing Authentic Japan to Your Doorstep
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#555555', maxWidth: 820, mx: 'auto', lineHeight: 2, fontSize: '1.05rem', mb: 3 }}
          >
            Founded with roots connecting Ginza, Tokyo and our Southeast Asian distribution hub, <strong>RaiJouKaKu (ライジョウカク)</strong> was created to eliminate counterfeit goods and long shipping barriers. We believe that genuine Japanese craftsmanship — whether it is an embroidered Haori jacket from Harajuku, a can of Hokkaido Sapporo malt, or a hand-sharpened tool from Kyoto — deserves to be experienced in its purest form.
          </Typography>
        </Box>

        {/* ── Section 2: The 4 Core Philosophy Pillars ── */}
        <Box sx={{ mb: 9 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" fontWeight={900} color={COLOR_PRIMARY_DARK} mb={1}>
              The Four Pillars of RaiJouKaKu
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The timeless Japanese values that guide every product we select and every parcel we ship.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            {PHILOSOPHY_PILLARS.map((p) => (
              <Card
                key={p.title}
                elevation={1}
                sx={{
                  borderRadius: '18px',
                  border: '1.5px solid #FCE4EC',
                  p: 3,
                  bgcolor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.25s',
                  '&:hover': {
                    borderColor: '#F48FB1',
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 28px rgba(236, 64, 122, 0.16)',
                  },
                }}
              >
                <Box
                  sx={{
                    bgcolor: '#FCE4EC',
                    width: 58,
                    height: 58,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  {p.icon}
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: COLOR_PRIMARY_DARK,
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    letterSpacing: '1px',
                    fontFamily: '"Hiragino Kaku Gothic ProN", sans-serif',
                  }}
                >
                  {p.kanji}
                </Typography>
                <Typography variant="subtitle1" fontWeight={900} color="#212121" mt={0.5} mb={1.2}>
                  {p.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                  {p.desc}
                </Typography>
              </Card>
            ))}
          </Box>
        </Box>

        <Divider sx={{ mb: 8, borderColor: '#FCE4EC' }} />

        {/* ── Section 3: Sourced Across Japan's Historic Prefectures ── */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: 'center', mb: 4.5 }}>
            <Chip
              label="Direct Regional Sourcing"
              sx={{ bgcolor: '#FCE4EC', color: COLOR_PRIMARY_DARK, fontWeight: 800, mb: 1.5 }}
            />
            <Typography variant="h4" fontWeight={900} color="#212121" sx={{ fontSize: { xs: '1.4rem', md: '2rem' } }}>
              Sourced Directly from Japan's Artisan Prefectures
            </Typography>
            <Typography variant="body2" color="text.secondary" maxWidth={680} mx="auto" mt={1}>
              Every category is curated from the Japanese region famous for that exact tradition.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 2.5,
            }}
          >
            {PREFECTURES.map((pref) => (
              <Box
                key={pref.region}
                sx={{
                  bgcolor: '#ffffff',
                  p: 2.5,
                  borderRadius: '14px',
                  border: '1px solid #FCE4EC',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#F48FB1',
                    bgcolor: '#FFF5F8',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: COLOR_PRIMARY_DARK,
                    mt: 0.8,
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography variant="subtitle2" fontWeight={800} color="#212121">
                    {pref.region}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" mt={0.3}>
                    {pref.spec}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── Section 4: Authentic Quality Guarantee ── */}
        <Card
          elevation={2}
          sx={{
            borderRadius: '20px',
            bgcolor: '#ffffff',
            border: '2px solid #F8BBD0',
            p: { xs: 3, md: 5 },
            mb: 8,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, flex: 1 }}>
              <Typography variant="h5" fontWeight={900} color={COLOR_PRIMARY_DARK} mb={1}>
                The RaiJouKaKu Authenticity Guarantee 🌸
              </Typography>
              <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                Every product on our shelves carries a 100% verified Japanese origin guarantee. We perform rigorous batch testing on culinary freshness, verify electronic serial numbers directly with Japanese makers, and ship with tamper-evident seal protection.
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} flexShrink={0}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingBagIcon />}
                onClick={() => navigate(paths.products)}
                sx={{
                  bgcolor: COLOR_PRIMARY_DARK,
                  '&:hover': { bgcolor: '#c2185b' },
                  borderRadius: '25px',
                  px: 3.5,
                  py: 1.2,
                  fontWeight: 800,
                  textTransform: 'none',
                }}
              >
                Explore Catalog
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<SupportAgentIcon />}
                onClick={() => navigate(paths.contact)}
                sx={{
                  borderColor: COLOR_PRIMARY_DARK,
                  color: COLOR_PRIMARY_DARK,
                  borderRadius: '25px',
                  px: 3.5,
                  py: 1.2,
                  fontWeight: 800,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#FCE4EC', borderColor: COLOR_PRIMARY_DARK },
                }}
              >
                Customer Support
              </Button>
            </Stack>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}

