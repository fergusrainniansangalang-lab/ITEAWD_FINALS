/**
 * AdminDashboard.jsx
 * ============================================================
 * RaiJouKaKu Master Administrator Console
 * Accessible via secret 5-click flower trigger on the Login page
 * with password from config (ADMIN_PASSWORD).
 *
 * Dynamic Features:
 * 1. Overview KPIs dynamically computed from real data (Revenue, Orders, Inventory Units, Tickets).
 * 2. 100-Quantity Inventory Manager with live stock tracking and remaining units.
 * 3. Safe Dropdown Actions for Orders, Inventory, and Support to prevent misclicks.
 * 4. Recent Orders Manager synced with localStorage orders (placed via Checkout).
 * 5. Customer Service Inquiries Queue synced with localStorage tickets (filed via Contact).
 * 6. Dynamic Logistics & System Configuration with live save to localStorage.
 * ============================================================
 */
import React, { useState, useEffect, useMemo } from 'react';
import {
  Dialog, AppBar, Toolbar, Typography, Box, Container,
  Tabs, Tab, Card, CardContent, Button, Chip, TextField, InputBase,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Switch, FormControlLabel, Stack, Divider, Snackbar, Alert,
  Select, MenuItem, FormControl, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { products as initialProducts } from 'data/products';
import {
  SITE_NAME,
  SITE_NAME_JP,
  CURRENCY_SYMBOL,
  COLOR_PRIMARY_DARK,
  FREE_SHIPPING_THRESHOLD,
  FLAT_SHIPPING_FEE,
  DELIVERY_DAYS,
  ADMIN_PASSWORD,
  LS_ORDERS_KEY,
  LS_TICKETS_KEY,
  LS_STOCK_KEY,
  LS_SETTINGS_KEY,
} from '../../config';

/* Seed default orders if none in localStorage */
const DEFAULT_SEED_ORDERS = [
  { id: 'RJK-9481', customer: 'Kaito Takahashi', destination: 'Makati City, Metro Manila', items: 'Tengoku Tokyo Haori, Sapporo Pack', total: 2530.00, date: 'Today, 2:15 PM', status: 'Shipped from Tokyo' },
  { id: 'RJK-9480', customer: 'Maria Elena Santos', destination: 'Quezon City, Metro Manila', items: 'Sony WH-1000XM5, Uji Matcha', total: 20140.00, date: 'Today, 11:30 AM', status: 'In Transit' },
  { id: 'RJK-9479', customer: 'Kenjiro Sato', destination: 'Cebu City, Central Visayas', items: 'Asics Gel-Kayano 14 Japanese Edition', total: 8990.00, date: 'Yesterday', status: 'Delivered' },
  { id: 'RJK-9478', customer: 'Bea Alonzo', destination: 'BGC, Taguig City', items: 'Ichiran Ramen Kit (x2), Tokyo Banana Crate', total: 3030.00, date: 'Yesterday', status: 'Processing' },
  { id: 'RJK-9477', customer: 'Hiroshi Tanaka', destination: 'Davao City, Mindanao', items: 'Molten BG5000 Basketball, Kendo Shinai', total: 7940.00, date: '2 days ago', status: 'Delivered' },
];

/* Seed default tickets if none in localStorage */
const DEFAULT_SEED_TICKETS = [
  { id: 'TKT-1042', customer: 'Lorenzo Cruz', category: 'Damaged or Defective Item Received', orderId: 'RJK-9472', priority: 'High', date: '1 hour ago', status: 'Pending Review', message: 'The outer box of the tea set was dented upon courier arrival.' },
  { id: 'TKT-1041', customer: 'Aiko Ramirez', category: 'Order Delayed / Tracking Status Update', orderId: 'RJK-9469', priority: 'Medium', date: '3 hours ago', status: 'In Progress', message: 'Requesting updated customs tracking flight number for my Tokyo parcel.' },
  { id: 'TKT-1040', customer: 'David Mendoza', category: 'Return & Full Refund Request', orderId: 'RJK-9455', priority: 'Low', date: '1 day ago', status: 'Resolved', message: 'Size exchange requested for Tabi Ninja Sneakers.' },
];

export default function AdminDashboard({ open, onClose }) {
  const [currentTab, setCurrentTab] = useState(0);

  /* 1. Dynamic Products with 100 base quantities and persistent stock status */
  const [productList, setProductList] = useState(() => {
    try {
      const storedStock = JSON.parse(localStorage.getItem(LS_STOCK_KEY) || '{}');
      return initialProducts.map((p) => {
        const itemStock = storedStock[p.id];
        let inStock = true;
        let quantity = 100; // 100 default quantities per product

        if (itemStock !== undefined) {
          if (typeof itemStock === 'object') {
            inStock = itemStock.inStock ?? (itemStock.quantity > 0);
            quantity = itemStock.quantity ?? (inStock ? 100 : 0);
          } else if (typeof itemStock === 'boolean') {
            inStock = itemStock;
            quantity = itemStock ? 100 : 0;
          } else if (typeof itemStock === 'number') {
            quantity = itemStock;
            inStock = itemStock > 0;
          }
        }
        return {
          ...p,
          inStock,
          quantity,
        };
      });
    } catch (_) {
      return initialProducts.map((p) => ({ ...p, inStock: true, quantity: 100 }));
    }
  });

  /* 2. Dynamic Orders from localStorage */
  const [orderList, setOrderList] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(LS_ORDERS_KEY) || '[]');
      if (Array.isArray(stored) && stored.length > 0) return stored;
    } catch (_) {}
    return DEFAULT_SEED_ORDERS;
  });

  /* 3. Dynamic Support Tickets from localStorage */
  const [ticketList, setTicketList] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(LS_TICKETS_KEY) || '[]');
      if (Array.isArray(stored) && stored.length > 0) return stored;
    } catch (_) {}
    return DEFAULT_SEED_TICKETS;
  });

  /* 4. Dynamic Settings from localStorage or config */
  const [settings, setSettings] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(LS_SETTINGS_KEY) || '{}');
      return {
        threshold: stored.threshold ?? FREE_SHIPPING_THRESHOLD,
        flatFee: stored.flatFee ?? FLAT_SHIPPING_FEE,
        deliveryDays: stored.deliveryDays ?? DELIVERY_DAYS,
        expressCourier: stored.expressCourier ?? true,
        acceptTickets: stored.acceptTickets ?? true,
        maintenanceMode: stored.maintenanceMode ?? false,
      };
    } catch (_) {
      return {
        threshold: FREE_SHIPPING_THRESHOLD,
        flatFee: FLAT_SHIPPING_FEE,
        deliveryDays: DELIVERY_DAYS,
        expressCourier: true,
        acceptTickets: true,
        maintenanceMode: false,
      };
    }
  });

  const [productSearch, setProductSearch] = useState('');
  const [snackMessage, setSnackMessage] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);

  // Sync data whenever admin opens
  useEffect(() => {
    if (open) {
      try {
        const storedOrders = JSON.parse(localStorage.getItem(LS_ORDERS_KEY) || '[]');
        if (Array.isArray(storedOrders) && storedOrders.length > 0) {
          setOrderList(storedOrders);
        }
        const storedTickets = JSON.parse(localStorage.getItem(LS_TICKETS_KEY) || '[]');
        if (Array.isArray(storedTickets) && storedTickets.length > 0) {
          setTicketList(storedTickets);
        }
        const storedStock = JSON.parse(localStorage.getItem(LS_STOCK_KEY) || '{}');
        setProductList((prev) =>
          prev.map((p) => {
            const itemStock = storedStock[p.id];
            if (itemStock !== undefined) {
              if (typeof itemStock === 'object') {
                return { ...p, inStock: itemStock.inStock ?? (itemStock.quantity > 0), quantity: itemStock.quantity ?? 100 };
              }
              if (typeof itemStock === 'boolean') {
                return { ...p, inStock: itemStock, quantity: itemStock ? 100 : 0 };
              }
              if (typeof itemStock === 'number') {
                return { ...p, inStock: itemStock > 0, quantity: itemStock };
              }
            }
            return p;
          })
        );
      } catch (_) {}
    }
  }, [open]);

  // Dynamically computed metrics
  const totalGrossRevenue = useMemo(() => {
    return orderList.reduce((sum, ord) => sum + (Number(ord.total) || 0), 0);
  }, [orderList]);

  const activeTicketsCount = useMemo(() => {
    return ticketList.filter((t) => t.status !== 'Resolved' && t.status !== 'Closed').length;
  }, [ticketList]);

  const inStockCount = useMemo(() => {
    return productList.filter((p) => p.inStock && p.quantity > 0).length;
  }, [productList]);

  const totalAvailableUnits = useMemo(() => {
    return productList.reduce((acc, p) => acc + (p.inStock ? (p.quantity || 0) : 0), 0);
  }, [productList]);

  // Save full stock state to localStorage helper
  const persistStockMap = (list) => {
    try {
      const stockMap = {};
      list.forEach((p) => {
        stockMap[p.id] = { inStock: p.inStock && p.quantity > 0, quantity: Math.max(0, p.quantity || 0) };
      });
      localStorage.setItem(LS_STOCK_KEY, JSON.stringify(stockMap));
      window.dispatchEvent(new Event('storage'));
    } catch (_) {}
  };

  // Modify Quantity directly
  const handleQuantityChange = (productId, deltaOrAbsolute, isAbsolute = false) => {
    setProductList((prev) => {
      const next = prev.map((p) => {
        if (p.id === productId) {
          const newQty = Math.max(0, isAbsolute ? deltaOrAbsolute : (p.quantity + deltaOrAbsolute));
          const updatedInStock = newQty > 0;
          return { ...p, quantity: newQty, inStock: updatedInStock };
        }
        return p;
      });
      persistStockMap(next);
      return next;
    });
  };

  // Dropdown action on product
  const handleProductActionDropdown = (productId, action) => {
    setProductList((prev) => {
      const next = prev.map((p) => {
        if (p.id === productId) {
          if (action === 'active') {
            const restoredQty = p.quantity > 0 ? p.quantity : 100;
            setSnackMessage(`${p.name} is now ACTIVE in shop (${restoredQty} units).`);
            return { ...p, inStock: true, quantity: restoredQty };
          }
          if (action === 'remove') {
            setSnackMessage(`${p.name} has been REMOVED from the shop.`);
            return { ...p, inStock: false };
          }
          if (action === 'set100') {
            setSnackMessage(`${p.name} quantity restocked to 100 units.`);
            return { ...p, inStock: true, quantity: 100 };
          }
          if (action === 'add50') {
            const updated = p.quantity + 50;
            setSnackMessage(`${p.name} stock increased to ${updated} units.`);
            return { ...p, inStock: true, quantity: updated };
          }
          if (action === 'zero') {
            setSnackMessage(`${p.name} set to 0 units (Sold Out).`);
            return { ...p, inStock: false, quantity: 0 };
          }
        }
        return p;
      });
      persistStockMap(next);
      setSnackOpen(true);
      return next;
    });
  };

  // Dropdown status update for Orders (prevents misclicks)
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrderList((prev) => {
      const nextList = prev.map((ord) => {
        if (ord.id === orderId) {
          return { ...ord, status: newStatus };
        }
        return ord;
      });
      try {
        localStorage.setItem(LS_ORDERS_KEY, JSON.stringify(nextList));
      } catch (_) {}
      return nextList;
    });
    setSnackMessage(`Order ${orderId} status set to: ${newStatus}`);
    setSnackOpen(true);
  };

  // Dropdown status update for Support Tickets
  const handleUpdateTicketStatus = (ticketId, newStatus) => {
    setTicketList((prev) => {
      const nextList = prev.map((t) => {
        if (t.id === ticketId) {
          return { ...t, status: newStatus };
        }
        return t;
      });
      try {
        localStorage.setItem(LS_TICKETS_KEY, JSON.stringify(nextList));
      } catch (_) {}
      return nextList;
    });
    setSnackMessage(`Ticket ${ticketId} status set to: ${newStatus}`);
    setSnackOpen(true);
  };

  // Save Settings
  const handleSaveSettings = () => {
    try {
      localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(settings));
    } catch (_) {}
    setSnackMessage('Logistics & system configurations saved successfully.');
    setSnackOpen(true);
  };

  // Filtered products for admin search
  const filteredProducts = productList.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      {/* ── Top Pink Admin Navigation Bar ── */}
      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          bgcolor: '#1E1E24',
          borderBottom: '3px solid #EC407A',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <LocalFloristIcon sx={{ color: '#EC407A', fontSize: 32 }} />
            <Box>
              <Typography variant="h6" fontWeight={900} sx={{ letterSpacing: '1px', color: '#ffffff', lineHeight: 1.2 }}>
                {SITE_NAME} Admin Console
              </Typography>
              <Typography variant="caption" sx={{ color: '#F48FB1', letterSpacing: '0.5px' }}>
                {SITE_NAME_JP} • Authorized Master Admin Access
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              icon={<CheckCircleOutlineIcon style={{ color: '#4caf50' }} />}
              label="Admin Active"
              size="small"
              sx={{ bgcolor: 'rgba(76, 175, 80, 0.15)', color: '#4caf50', fontWeight: 800 }}
            />
            <Button
              variant="contained"
              size="small"
              startIcon={<CloseIcon />}
              onClick={onClose}
              sx={{
                bgcolor: '#EC407A',
                '&:hover': { bgcolor: '#c2185b' },
                borderRadius: '20px',
                fontWeight: 800,
                textTransform: 'none',
              }}
            >
              Exit Admin
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ── Dashboard Body ── */}
      <Box sx={{ bgcolor: '#F4F5F7', minHeight: '100vh', pb: 6 }}>
        <Container maxWidth="xl" sx={{ pt: 3.5 }}>
          {/* ── Dynamic Overview Statistics Cards ── */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
              gap: 2.5,
              mb: 4,
            }}
          >
            {[
              {
                label: 'Gross Revenue (Total)',
                value: `${CURRENCY_SYMBOL}${totalGrossRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                sub: `Computed from ${orderList.length} orders`,
                color: '#2e7d32',
              },
              {
                label: 'Total Orders',
                value: `${orderList.length} Orders`,
                sub: `${orderList.filter(o => o.status === 'Delivered').length} Delivered • ${orderList.filter(o => o.status !== 'Delivered').length} In Progress`,
                color: '#1976d2',
              },
              {
                label: 'Available Stock Units',
                value: `${totalAvailableUnits.toLocaleString()} Units`,
                sub: `${inStockCount} active products in shop (${productList.length - inStockCount} out of stock)`,
                color: '#EC407A',
              },
              {
                label: 'Customer Support Tickets',
                value: `${activeTicketsCount} Active`,
                sub: `${ticketList.filter(t => t.status === 'Resolved' || t.status === 'Closed').length} Resolved/Closed`,
                color: '#ed6c02',
              },
            ].map((stat) => (
              <Card key={stat.label} elevation={1} sx={{ borderRadius: '16px', border: '1px solid #E0E0E0' }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="caption" sx={{ color: '#757575', fontWeight: 700, textTransform: 'uppercase' }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: '#212121', my: 0.5 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: stat.color, fontWeight: 700 }}>
                    {stat.sub}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* ── Navigation Tabs ── */}
          <Paper elevation={0} sx={{ borderRadius: '14px', border: '1px solid #E0E0E0', mb: 3 }}>
            <Tabs
              value={currentTab}
              onChange={(_, v) => setCurrentTab(v)}
              textColor="inherit"
              TabIndicatorProps={{ style: { backgroundColor: '#EC407A', height: 3 } }}
              sx={{ px: 2 }}
            >
              <Tab icon={<InventoryOutlinedIcon />} iconPosition="start" label={`Inventory & 100 Qty (${productList.length})`} sx={{ textTransform: 'none', fontWeight: 800, color: currentTab === 0 ? '#EC407A' : 'inherit' }} />
              <Tab icon={<ReceiptLongOutlinedIcon />} iconPosition="start" label={`Orders & Shipments (${orderList.length})`} sx={{ textTransform: 'none', fontWeight: 800, color: currentTab === 1 ? '#EC407A' : 'inherit' }} />
              <Tab icon={<SupportAgentOutlinedIcon />} iconPosition="start" label={`Support Queue (${ticketList.length})`} sx={{ textTransform: 'none', fontWeight: 800, color: currentTab === 2 ? '#EC407A' : 'inherit' }} />
              <Tab icon={<SettingsOutlinedIcon />} iconPosition="start" label="Store Settings" sx={{ textTransform: 'none', fontWeight: 800, color: currentTab === 3 ? '#EC407A' : 'inherit' }} />
            </Tabs>
          </Paper>

          {/* ══════════════════════════════════════════════════════════
              TAB 0: INVENTORY & 100 QUANTITIES MANAGEMENT
          ══════════════════════════════════════════════════════════ */}
          {currentTab === 0 && (
            <Card elevation={1} sx={{ borderRadius: '16px', border: '1px solid #E0E0E0', overflow: 'hidden' }}>
              <Box sx={{ p: 2.5, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2, bgcolor: '#ffffff' }}>
                <Box>
                  <Typography variant="h6" fontWeight={900}>
                    Japanese Product Catalog & Quantities ({productList.length} Items)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Each product starts with 100 units. Adjust quantities or use safe dropdown actions to control shop visibility.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#FCE4EC', borderRadius: '25px', px: 2, py: 0.4, border: '1px solid #F8BBD0' }}>
                  <SearchIcon sx={{ color: '#EC407A', mr: 1, fontSize: 20 }} />
                  <InputBase
                    placeholder="Search product, category, SKU..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    sx={{ fontSize: '0.88rem' }}
                  />
                </Box>
              </Box>

              <TableContainer sx={{ maxHeight: 540 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 800, bgcolor: '#FAF0F3' }}>Product & Image</TableCell>
                      <TableCell sx={{ fontWeight: 800, bgcolor: '#FAF0F3' }}>Category</TableCell>
                      <TableCell sx={{ fontWeight: 800, bgcolor: '#FAF0F3' }}>SKU</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, bgcolor: '#FAF0F3' }}>Price</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, bgcolor: '#FAF0F3' }}>Units Left (100 Base)</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, bgcolor: '#FAF0F3' }}>Shop Status</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, bgcolor: '#FAF0F3', minWidth: 190 }}>Dropdown Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProducts.map((p) => {
                      const isActiveInShop = p.inStock && p.quantity > 0;
                      return (
                        <TableRow key={p.id} hover>
                          <TableCell>
                            <Stack direction="row" spacing={1.5} alignItems="center">
                              <Box
                                component="img"
                                src={p.image}
                                alt={p.name}
                                sx={{ width: 48, height: 48, borderRadius: '8px', objectFit: 'cover', border: '1px solid #FCE4EC' }}
                              />
                              <Box>
                                <Typography variant="subtitle2" fontWeight={800} sx={{ maxWidth: 240 }}>
                                  {p.name}
                                </Typography>
                                {p.badge && (
                                  <Chip label={p.badge} size="small" sx={{ height: 18, fontSize: '0.62rem', bgcolor: '#EC407A', color: '#ffffff', fontWeight: 800 }} />
                                )}
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>
                              {p.categoryName}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="caption" sx={{ fontFamily: 'monospace', fontWeight: 700, bgcolor: '#F0F0F0', px: 1, py: 0.3, borderRadius: 1 }}>
                              {p.sku}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="subtitle2" fontWeight={900} color="#EC407A">
                              {CURRENCY_SYMBOL}{p.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </Typography>
                          </TableCell>

                          {/* 3. Quantities Left Column with Stepper Controls */}
                          <TableCell align="center">
                            <Stack direction="row" spacing={0.8} alignItems="center" justifyContent="center">
                              <IconButton
                                size="small"
                                onClick={() => handleQuantityChange(p.id, -1)}
                                disabled={p.quantity <= 0}
                                sx={{ border: '1px solid #E0E0E0', p: 0.3 }}
                              >
                                <RemoveIcon sx={{ fontSize: 14, color: '#c62828' }} />
                              </IconButton>
                              <Chip
                                label={`${p.quantity} Units`}
                                size="small"
                                sx={{
                                  fontWeight: 900,
                                  minWidth: 72,
                                  bgcolor: p.quantity > 20 ? '#e8f5e9' : p.quantity > 0 ? '#fff3e0' : '#ffebee',
                                  color: p.quantity > 20 ? '#2e7d32' : p.quantity > 0 ? '#e65100' : '#c62828',
                                }}
                              />
                              <IconButton
                                size="small"
                                onClick={() => handleQuantityChange(p.id, 1)}
                                sx={{ border: '1px solid #E0E0E0', p: 0.3 }}
                              >
                                <AddIcon sx={{ fontSize: 14, color: '#2e7d32' }} />
                              </IconButton>
                            </Stack>
                          </TableCell>

                          {/* Shop Status Badge */}
                          <TableCell align="center">
                            <Chip
                              label={isActiveInShop ? 'Active in Shop' : 'Out of Stock (Hidden)'}
                              size="small"
                              sx={{
                                fontWeight: 800,
                                bgcolor: isActiveInShop ? '#e8f5e9' : '#ffebee',
                                color: isActiveInShop ? '#2e7d32' : '#c62828',
                              }}
                            />
                          </TableCell>

                          {/* 2. Safe Dropdown Action (Zero Misclicks) */}
                          <TableCell align="center">
                            <FormControl size="small" sx={{ minWidth: 175 }}>
                              <Select
                                value=""
                                displayEmpty
                                renderValue={() => (
                                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#333333' }}>
                                    ⚙️ Select Action...
                                  </Typography>
                                )}
                                onChange={(e) => handleProductActionDropdown(p.id, e.target.value)}
                                sx={{
                                  borderRadius: '16px',
                                  fontSize: '0.78rem',
                                  height: 32,
                                  bgcolor: '#ffffff',
                                  border: '1.5px solid #EC407A',
                                  '& .MuiSelect-select': { py: 0.4, px: 1.2 },
                                }}
                              >
                                <MenuItem value="active" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#2e7d32' }}>
                                  ✅ Set Active (In Shop)
                                </MenuItem>
                                <MenuItem value="remove" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#c62828' }}>
                                  🚫 Remove from Shop
                                </MenuItem>
                                <Divider sx={{ my: 0.5 }} />
                                <MenuItem value="set100" sx={{ fontSize: '0.8rem', fontWeight: 700 }}>
                                  📦 Reset to 100 Units
                                </MenuItem>
                                <MenuItem value="add50" sx={{ fontSize: '0.8rem', fontWeight: 700 }}>
                                  ➕ Restock (+50 Units)
                                </MenuItem>
                                <MenuItem value="zero" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#d32f2f' }}>
                                  ❌ Set to 0 Units (Sold Out)
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 1: ORDERS & SHIPMENTS WITH SAFE DROPDOWN
          ══════════════════════════════════════════════════════════ */}
          {currentTab === 1 && (
            <Card elevation={1} sx={{ borderRadius: '16px', border: '1px solid #E0E0E0' }}>
              <Box sx={{ p: 2.5, bgcolor: '#ffffff', borderBottom: '1px solid #E0E0E0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" fontWeight={900}>
                    Active Orders & International Shipments ({orderList.length})
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Change order statuses using the dropdown menu to prevent accidental misclicks.
                  </Typography>
                </Box>
                <Chip
                  label={`${CURRENCY_SYMBOL}${totalGrossRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })} Total Volume`}
                  sx={{ bgcolor: '#FCE4EC', color: COLOR_PRIMARY_DARK, fontWeight: 800 }}
                />
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#FAF0F3' }}>
                      <TableCell sx={{ fontWeight: 800 }}>Order #</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Customer Name</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Destination Hub</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Items Ordered</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800 }}>Total Amount</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800 }}>Current Status</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, minWidth: 180 }}>Status Dropdown</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderList.map((ord) => (
                      <TableRow key={ord.id} hover>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={800} color="#EC407A">
                            {ord.id}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {ord.date}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={700}>
                            {ord.customer || 'Guest Customer'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {ord.destination}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ maxWidth: 220 }}>
                            {ord.items}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="subtitle2" fontWeight={900}>
                            {CURRENCY_SYMBOL}{Number(ord.total).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={ord.status}
                            size="small"
                            sx={{
                              fontWeight: 800,
                              bgcolor:
                                ord.status === 'Delivered' ? '#e8f5e9' :
                                ord.status === 'In Transit' ? '#e3f2fd' :
                                ord.status === 'Shipped from Tokyo' ? '#fff3e0' :
                                ord.status === 'Cancelled' ? '#ffebee' : '#f3e5f5',
                              color:
                                ord.status === 'Delivered' ? '#2e7d32' :
                                ord.status === 'In Transit' ? '#1565c0' :
                                ord.status === 'Shipped from Tokyo' ? '#e65100' :
                                ord.status === 'Cancelled' ? '#c62828' : '#7b1fa2',
                            }}
                          />
                        </TableCell>

                        {/* 2. Order Status Select Dropdown (Prevents Misclicks) */}
                        <TableCell align="center">
                          <FormControl size="small" sx={{ minWidth: 165 }}>
                            <Select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                              sx={{
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                borderRadius: '16px',
                                height: 32,
                                bgcolor: '#ffffff',
                                border: '1.5px solid #EC407A',
                                '& .MuiSelect-select': { py: 0.4, px: 1.2 },
                              }}
                            >
                              <MenuItem value="Processing" sx={{ fontSize: '0.8rem', fontWeight: 600 }}>Processing</MenuItem>
                              <MenuItem value="Shipped from Tokyo" sx={{ fontSize: '0.8rem', fontWeight: 600 }}>Shipped from Tokyo</MenuItem>
                              <MenuItem value="In Transit" sx={{ fontSize: '0.8rem', fontWeight: 600 }}>In Transit</MenuItem>
                              <MenuItem value="Delivered" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#2e7d32' }}>Delivered</MenuItem>
                              <MenuItem value="Cancelled" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#c62828' }}>Cancelled</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 2: CUSTOMER SERVICE QUEUE WITH SAFE DROPDOWN
          ══════════════════════════════════════════════════════════ */}
          {currentTab === 2 && (
            <Card elevation={1} sx={{ borderRadius: '16px', border: '1px solid #E0E0E0' }}>
              <Box sx={{ p: 2.5, bgcolor: '#ffffff', borderBottom: '1px solid #E0E0E0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" fontWeight={900}>
                    Customer Service Problem Reports ({ticketList.length})
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Select ticket resolution status directly from the dropdown.
                  </Typography>
                </Box>
                <Chip
                  label={`${activeTicketsCount} Actionable Tickets`}
                  sx={{ bgcolor: activeTicketsCount > 0 ? '#fff3e0' : '#e8f5e9', color: activeTicketsCount > 0 ? '#e65100' : '#2e7d32', fontWeight: 800 }}
                />
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#FAF0F3' }}>
                      <TableCell sx={{ fontWeight: 800 }}>Ticket ID</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Customer Name</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Category</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Problem Details</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800 }}>Priority</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800 }}>Current Status</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, minWidth: 165 }}>Status Dropdown</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ticketList.map((t) => (
                      <TableRow key={t.id} hover>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={800} color="#EC407A">
                            {t.id}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Order: {t.orderId}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={700}>
                            {t.customer}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {t.date}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {t.category}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ maxWidth: 280, color: '#555555' }}>
                            "{t.message}"
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={t.priority}
                            size="small"
                            sx={{
                              fontWeight: 800,
                              bgcolor: t.priority === 'High' ? '#ffebee' : t.priority === 'Medium' ? '#fff3e0' : '#e8f5e9',
                              color: t.priority === 'High' ? '#c62828' : t.priority === 'Medium' ? '#e65100' : '#2e7d32',
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={t.status}
                            size="small"
                            sx={{
                              fontWeight: 800,
                              bgcolor: t.status === 'Resolved' ? '#e8f5e9' : t.status === 'Closed' ? '#f5f5f5' : '#fff8e1',
                              color: t.status === 'Resolved' ? '#2e7d32' : t.status === 'Closed' ? '#757575' : '#f57f17',
                            }}
                          />
                        </TableCell>

                        {/* Ticket Status Select Dropdown */}
                        <TableCell align="center">
                          <FormControl size="small" sx={{ minWidth: 150 }}>
                            <Select
                              value={t.status}
                              onChange={(e) => handleUpdateTicketStatus(t.id, e.target.value)}
                              sx={{
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                borderRadius: '16px',
                                height: 32,
                                bgcolor: '#ffffff',
                                border: '1.5px solid #EC407A',
                                '& .MuiSelect-select': { py: 0.4, px: 1.2 },
                              }}
                            >
                              <MenuItem value="Pending Review" sx={{ fontSize: '0.8rem', fontWeight: 600 }}>Pending Review</MenuItem>
                              <MenuItem value="In Progress" sx={{ fontSize: '0.8rem', fontWeight: 600 }}>In Progress</MenuItem>
                              <MenuItem value="Resolved" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#2e7d32' }}>Resolved</MenuItem>
                              <MenuItem value="Closed" sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#757575' }}>Closed</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 3: STORE & SYSTEM SETTINGS
          ══════════════════════════════════════════════════════════ */}
          {currentTab === 3 && (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Card elevation={1} sx={{ borderRadius: '16px', p: 3, border: '1px solid #E0E0E0' }}>
                <Typography variant="h6" fontWeight={900} mb={2}>
                  Logistics & Currency Configuration
                </Typography>
                <Stack spacing={2.5}>
                  <TextField
                    label={`Default Free Shipping Threshold (${CURRENCY_SYMBOL})`}
                    type="number"
                    value={settings.threshold}
                    onChange={(e) => setSettings((s) => ({ ...s, threshold: Number(e.target.value) || 0 }))}
                    size="small"
                    fullWidth
                  />
                  <TextField
                    label={`Flat Shipping Rate for Under Threshold (${CURRENCY_SYMBOL})`}
                    type="number"
                    value={settings.flatFee}
                    onChange={(e) => setSettings((s) => ({ ...s, flatFee: Number(e.target.value) || 0 }))}
                    size="small"
                    fullWidth
                  />
                  <TextField
                    label="Standard Estimated Delivery Days"
                    type="number"
                    value={settings.deliveryDays}
                    onChange={(e) => setSettings((s) => ({ ...s, deliveryDays: Number(e.target.value) || 0 }))}
                    size="small"
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    sx={{ bgcolor: '#EC407A', '&:hover': { bgcolor: '#c2185b' }, borderRadius: '20px', fontWeight: 800, textTransform: 'none', alignSelf: 'flex-start' }}
                    onClick={handleSaveSettings}
                  >
                    Save Changes
                  </Button>
                </Stack>
              </Card>

              <Card elevation={1} sx={{ borderRadius: '16px', p: 3, border: '1px solid #E0E0E0' }}>
                <Typography variant="h6" fontWeight={900} mb={2}>
                  Store Operations & Security
                </Typography>
                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.expressCourier}
                        onChange={(e) => setSettings((s) => ({ ...s, expressCourier: e.target.checked }))}
                        color="secondary"
                      />
                    }
                    label={<Typography variant="body2" fontWeight={700}>Enable Japanese Express Courier Integration (DHL / Yamato)</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.acceptTickets}
                        onChange={(e) => setSettings((s) => ({ ...s, acceptTickets: e.target.checked }))}
                        color="secondary"
                      />
                    }
                    label={<Typography variant="body2" fontWeight={700}>Accept Customer Problem Reporting Tickets</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.maintenanceMode}
                        onChange={(e) => setSettings((s) => ({ ...s, maintenanceMode: e.target.checked }))}
                        color="secondary"
                      />
                    }
                    label={<Typography variant="body2" fontWeight={700}>Enable Maintenance Mode (Restricted Access)</Typography>}
                  />
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    Admin Secret Key: <strong>{ADMIN_PASSWORD}</strong> (Active)
                  </Typography>
                </Stack>
              </Card>
            </Box>
          )}
        </Container>
      </Box>

      {/* Snackbar feedback */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ bgcolor: '#EC407A', fontWeight: 800 }} onClose={() => setSnackOpen(false)}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
