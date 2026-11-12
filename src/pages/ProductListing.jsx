/**
 * ProductListing.jsx
 * ============================================================
 * Japanese Sakura-Themed Product Catalog
 * Fix for Typed Pricing:
 * - FilterContent is defined OUTSIDE ProductListing to prevent
 *   unnecessary component remounts and lost input focus on every keystroke.
 * - Fluid typing: user can freely type multidigit numbers without disappearing.
 * - Synced with the interactive slider and quick preset chips.
 * ============================================================
 */
import React, { useState, useMemo } from 'react';
import {
  Box, Container, Card, CardMedia, CardContent, CardActions,
  Typography, Button, Chip, Rating, Stack, Drawer, IconButton,
  FormGroup, FormControlLabel, Checkbox, Slider, Divider,
  useMediaQuery, useTheme, InputBase, Paper, Select, MenuItem,
  FormControl, InputLabel, TextField
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from 'context/CartContext';
import { products } from 'data/products';
import paths from 'routes/paths';
import {
  CURRENCY_SYMBOL,
  COLOR_PRIMARY_DARK,
} from '../config';

const ALL_CATEGORIES = [
  { key: 'clothing', label: 'Clothing' },
  { key: 'grocery', label: 'Foods & Grocery' },
  { key: 'electronics', label: 'Electronics' },
  { key: 'shoes', label: 'Shoes & Footwear' },
  { key: 'cleaning', label: 'Cleaning & Home' },
  { key: 'sports', label: 'Sports & Outdoors' },
  { key: 'books', label: 'Books & Culture' },
];

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured Japanese Picks' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Customer Rated' },
];

const MAX_PRICE = 25000;

const PRICE_PRESETS = [
  { label: 'All', range: [0, MAX_PRICE] },
  { label: 'Under ₱1k', range: [0, 1000] },
  { label: '₱1k - ₱5k', range: [1000, 5000] },
  { label: '₱5k - ₱15k', range: [5000, 15000] },
  { label: '₱15k+', range: [15000, MAX_PRICE] },
];

/* ── Standalone Filter Content Component (Defined outside to preserve DOM input focus) ── */
function FilterContent({
  selectedCategories,
  onToggleCategory,
  priceRange,
  minInput,
  maxInput,
  onMinInputChange,
  onMaxInputChange,
  onMinInputBlur,
  onMaxInputBlur,
  onSliderChange,
  onPresetSelect,
  onReset,
}) {
  const hasActiveFilters =
    selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < MAX_PRICE;

  return (
    <Box sx={{ p: 2.5 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 900, color: COLOR_PRIMARY_DARK, letterSpacing: '0.5px' }}>
          Filters
        </Typography>
        {hasActiveFilters && (
          <Button
            size="small"
            onClick={onReset}
            sx={{ textTransform: 'none', color: '#9e9e9e', fontSize: '0.78rem', p: 0 }}
          >
            Reset
          </Button>
        )}
      </Box>

      {/* Category Checklist */}
      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#333333', mb: 1.2 }}>
        Category
      </Typography>
      <FormGroup sx={{ mb: 2.5 }}>
        {ALL_CATEGORIES.map((cat) => (
          <FormControlLabel
            key={cat.key}
            control={
              <Checkbox
                checked={selectedCategories.includes(cat.key)}
                onChange={() => onToggleCategory(cat.key)}
                size="small"
                sx={{
                  color: '#F48FB1',
                  '&.Mui-checked': { color: COLOR_PRIMARY_DARK },
                  py: 0.4,
                }}
              />
            }
            label={
              <Typography
                variant="body2"
                sx={{
                  fontWeight: selectedCategories.includes(cat.key) ? 700 : 500,
                  fontSize: '0.88rem',
                }}
              >
                {cat.label}
              </Typography>
            }
            sx={{ ml: 0, mr: 0, mb: 0.2 }}
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 2, borderColor: '#FCE4EC' }} />

      {/* ── Type-in Price Filter with Synchronized Slider ── */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#333333', mb: 0.5 }}>
          Price Range ({CURRENCY_SYMBOL})
        </Typography>
        <Typography variant="caption" sx={{ color: '#888888', display: 'block', mb: 1.5 }}>
          Type directly or swipe the slider:
        </Typography>

        {/* Direct Number Input Boxes */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: 1.2,
            alignItems: 'center',
            mb: 2,
          }}
        >
          <TextField
            label="Min (₱)"
            type="number"
            size="small"
            value={minInput}
            onChange={onMinInputChange}
            onBlur={onMinInputBlur}
            inputProps={{ min: 0, max: MAX_PRICE, step: 100 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                bgcolor: '#ffffff',
                '&.Mui-focused fieldset': { borderColor: COLOR_PRIMARY_DARK },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: COLOR_PRIMARY_DARK },
            }}
          />

          <Typography variant="body2" sx={{ color: '#9e9e9e', fontWeight: 700 }}>
            —
          </Typography>

          <TextField
            label="Max (₱)"
            type="number"
            size="small"
            value={maxInput}
            onChange={onMaxInputChange}
            onBlur={onMaxInputBlur}
            inputProps={{ min: 0, max: MAX_PRICE, step: 100 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                bgcolor: '#ffffff',
                '&.Mui-focused fieldset': { borderColor: COLOR_PRIMARY_DARK },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: COLOR_PRIMARY_DARK },
            }}
          />
        </Box>

        {/* Interactive Slider */}
        <Box sx={{ px: 1, pt: 0.5 }}>
          <Slider
            value={priceRange}
            onChange={onSliderChange}
            min={0}
            max={MAX_PRICE}
            step={250}
            sx={{
              color: COLOR_PRIMARY_DARK,
              height: 6,
              '& .MuiSlider-thumb': {
                width: 18,
                height: 18,
                bgcolor: '#ffffff',
                border: `3px solid ${COLOR_PRIMARY_DARK}`,
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: '0 0 0 8px rgba(236, 64, 122, 0.16)',
                },
              },
              '& .MuiSlider-rail': {
                bgcolor: '#F8BBD0',
              },
            }}
          />
        </Box>

        {/* Quick Filter Presets */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mt: 1.5 }}>
          {PRICE_PRESETS.map((p) => {
            const isSelected =
              priceRange[0] === p.range[0] && priceRange[1] === p.range[1];
            return (
              <Chip
                key={p.label}
                label={p.label}
                size="small"
                onClick={() => onPresetSelect(p.range)}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  bgcolor: isSelected ? COLOR_PRIMARY_DARK : '#FCE4EC',
                  color: isSelected ? '#ffffff' : COLOR_PRIMARY_DARK,
                  border: `1px solid ${isSelected ? COLOR_PRIMARY_DARK : '#F8BBD0'}`,
                  '&:hover': {
                    bgcolor: isSelected ? '#c2185b' : '#f8bbd0',
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>

      <Divider sx={{ my: 2.5, borderColor: '#FCE4EC' }} />

      <Button
        fullWidth
        variant="outlined"
        onClick={onReset}
        sx={{
          borderColor: '#F48FB1',
          color: COLOR_PRIMARY_DARK,
          borderRadius: '20px',
          fontWeight: 700,
          textTransform: 'none',
          py: 0.8,
          '&:hover': {
            bgcolor: '#FCE4EC',
            borderColor: COLOR_PRIMARY_DARK,
          },
        }}
      >
        Clear All Filters
      </Button>
    </Box>
  );
}

export default function ProductListing() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const initCategory = searchParams.get('category') || '';
  const initQuery = searchParams.get('q') || '';

  const [selectedCategories, setSelectedCategories] = useState(
    initCategory ? [initCategory] : []
  );

  // Price range numeric bounds for filtering
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);

  // Price input string states to allow seamless typing (without character clearing)
  const [minInput, setMinInput] = useState('0');
  const [maxInput, setMaxInput] = useState(String(MAX_PRICE));

  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState(initQuery);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleCategory = (key) => {
    setSelectedCategories((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  /* ── Direct Typing Event Handlers ── */
  const handleMinInputChange = (e) => {
    const raw = e.target.value;
    setMinInput(raw);

    // If valid number typed, filter immediately without losing focus
    if (raw !== '') {
      const parsed = Math.max(0, Number(raw));
      if (!isNaN(parsed)) {
        setPriceRange((prev) => [parsed, Math.max(parsed, prev[1])]);
      }
    }
  };

  const handleMaxInputChange = (e) => {
    const raw = e.target.value;
    setMaxInput(raw);

    // If valid number typed, filter immediately without losing focus
    if (raw !== '') {
      const parsed = Math.max(0, Number(raw));
      if (!isNaN(parsed)) {
        setPriceRange((prev) => [prev[0], Math.max(prev[0], parsed)]);
      }
    }
  };

  // On blur, format cleanly and ensure non-empty
  const handleMinInputBlur = () => {
    if (minInput === '' || isNaN(Number(minInput))) {
      setMinInput('0');
      setPriceRange((prev) => [0, prev[1]]);
    }
  };

  const handleMaxInputBlur = () => {
    if (maxInput === '' || isNaN(Number(maxInput))) {
      setMaxInput(String(MAX_PRICE));
      setPriceRange((prev) => [prev[0], MAX_PRICE]);
    }
  };

  /* ── Slider Change Handler ── */
  const handleSliderChange = (_, newRange) => {
    setPriceRange(newRange);
    setMinInput(String(newRange[0]));
    setMaxInput(String(newRange[1]));
  };

  /* ── Preset Selection Handler ── */
  const handlePresetSelect = (range) => {
    setPriceRange(range);
    setMinInput(String(range[0]));
    setMaxInput(String(range[1]));
  };

  /* ── Reset Handler ── */
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, MAX_PRICE]);
    setMinInput('0');
    setMaxInput(String(MAX_PRICE));
    setSearchQuery('');
  };

  /* ── Filtering Logic ── */
  const filtered = useMemo(() => {
    let list = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      list = list.filter((p) =>
        selectedCategories.some((cat) => {
          if (cat === 'cleaning') return p.category === 'cleaning' || p.category === 'cleaning-supplies';
          if (cat === 'sports') return p.category === 'sports' || p.category === 'sports-equipment';
          return p.category === cat;
        })
      );
    }

    // Filter by price range
    list = list.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [selectedCategories, priceRange, searchQuery, sortBy]);

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Page Header */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: COLOR_PRIMARY_DARK,
              letterSpacing: '0.5px',
              fontSize: { xs: '1.6rem', md: '2.2rem' },
            }}
          >
            All Japanese Products
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Showing {filtered.length} authentic Japanese items
          </Typography>
        </Box>

        {/* Search Bar & Sort Row with Generous Margins */}
        <Paper
          elevation={1}
          sx={{
            p: 2,
            mb: 4,
            borderRadius: '16px',
            border: '1px solid #FCE4EC',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            gap: 2,
            bgcolor: '#ffffff',
          }}
        >
          {/* Search Box */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              width: '100%',
              bgcolor: '#FCE4EC',
              borderRadius: '25px',
              px: 2,
              py: 0.5,
              border: '1px solid #F8BBD0',
            }}
          >
            <SearchIcon sx={{ color: COLOR_PRIMARY_DARK, mr: 1 }} />
            <InputBase
              placeholder="Search by product name, category, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              sx={{ fontSize: '0.92rem' }}
            />
          </Box>

          {/* Sort Dropdown */}
          <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 220 } }}>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ borderRadius: '12px' }}
            >
              {SORT_OPTIONS.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Mobile Filter Trigger Button */}
          {isMobile && (
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setDrawerOpen(true)}
              sx={{
                borderColor: COLOR_PRIMARY_DARK,
                color: COLOR_PRIMARY_DARK,
                borderRadius: '25px',
                py: 1,
                fontWeight: 700,
                textTransform: 'none',
              }}
            >
              Filters ({selectedCategories.length > 0 ? selectedCategories.length : 'All'})
            </Button>
          )}
        </Paper>

        {/* ── Main Catalog Content (Reliable Flexbox Layout) ── */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3.5,
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          {/* Desktop Filter Sidebar (Fixed 280px, sticky) */}
          {!isMobile && (
            <Box
              sx={{
                width: 280,
                flexShrink: 0,
                position: 'sticky',
                top: 24,
              }}
            >
              <Card
                elevation={2}
                sx={{
                  borderRadius: '18px',
                  border: '1.5px solid #FCE4EC',
                  bgcolor: '#ffffff',
                }}
              >
                <FilterContent
                  selectedCategories={selectedCategories}
                  onToggleCategory={toggleCategory}
                  priceRange={priceRange}
                  minInput={minInput}
                  maxInput={maxInput}
                  onMinInputChange={handleMinInputChange}
                  onMaxInputChange={handleMaxInputChange}
                  onMinInputBlur={handleMinInputBlur}
                  onMaxInputBlur={handleMaxInputBlur}
                  onSliderChange={handleSliderChange}
                  onPresetSelect={handlePresetSelect}
                  onReset={handleResetFilters}
                />
              </Card>
            </Box>
          )}

          {/* Product Cards Grid Area */}
          <Box sx={{ flex: 1, width: '100%' }}>
            {filtered.length === 0 ? (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 10,
                  px: 3,
                  bgcolor: '#ffffff',
                  borderRadius: '18px',
                  border: '1px solid #FCE4EC',
                }}
              >
                <Typography variant="h6" fontWeight={700} color="text.secondary" mb={1}>
                  No Japanese products match your criteria.
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Try clearing the category or typing a wider price range.
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleResetFilters}
                  sx={{
                    bgcolor: COLOR_PRIMARY_DARK,
                    '&:hover': { bgcolor: '#c2185b' },
                    borderRadius: 25,
                    px: 4,
                    textTransform: 'none',
                    fontWeight: 700,
                  }}
                >
                  Clear Filters
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)',
                  },
                  gap: 3,
                  width: '100%',
                }}
              >
                {filtered.map((product) => (
                  <Card
                    key={product.id}
                    elevation={2}
                    onClick={() => navigate(paths.productDetails(product.id))}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '16px',
                      border: '1.5px solid #FCE4EC',
                      bgcolor: '#ffffff',
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
                      <Typography
                        variant="caption"
                        sx={{ color: '#888888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}
                      >
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

                      <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mt: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 900, color: COLOR_PRIMARY_DARK, fontSize: '1.15rem' }}>
                          {CURRENCY_SYMBOL}{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </Typography>
                        {product.originalPrice && (
                          <Typography
                            variant="caption"
                            sx={{ color: '#9e9e9e', textDecoration: 'line-through', fontWeight: 600 }}
                          >
                            {CURRENCY_SYMBOL}{product.originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </Typography>
                        )}
                      </Stack>
                    </CardContent>

                    <CardActions sx={{ p: 2, pt: 1 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="small"
                        startIcon={<ShoppingCartIcon fontSize="small" />}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, 1);
                        }}
                        sx={{
                          bgcolor: COLOR_PRIMARY_DARK,
                          '&:hover': { bgcolor: '#c2185b' },
                          borderRadius: '20px',
                          py: 0.8,
                          fontWeight: 800,
                          textTransform: 'none',
                          fontSize: '0.85rem',
                        }}
                      >
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              bgcolor: COLOR_PRIMARY_DARK,
              color: '#ffffff',
            }}
          >
            <Typography variant="subtitle1" fontWeight={800} color="#ffffff">
              Filter Products
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#ffffff' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <FilterContent
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            priceRange={priceRange}
            minInput={minInput}
            maxInput={maxInput}
            onMinInputChange={handleMinInputChange}
            onMaxInputChange={handleMaxInputChange}
            onMinInputBlur={handleMinInputBlur}
            onMaxInputBlur={handleMaxInputBlur}
            onSliderChange={handleSliderChange}
            onPresetSelect={handlePresetSelect}
            onReset={handleResetFilters}
          />
        </Box>
      </Drawer>
    </Box>
  );
}
