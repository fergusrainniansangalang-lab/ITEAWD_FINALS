/**
 * AdminDashboard.jsx
 * ============================================================
 * RaiJouKaKu Master Administrator Console
 * Accessible via secret 5-click flower trigger on the Login page
 * with password "JAPANISLIFE".
 *
 * Modules Included:
 * 1. Overview KPIs (Gross Revenue, Orders, Catalog, Tickets)
 * 2. Real-time Inventory Manager (All 35 Japanese Products with Stock Toggles)
 * 3. Recent Japanese Orders Manager (Status updates & tracking)
 * 4. Customer Service Inquiries Queue (Ticket triage & resolution)
 * 5. System Settings & Logistics Configuration
 * ============================================================
 */
import React, { useState } from 'react';
import {
  Dialog, AppBar, Toolbar, IconButton, Typography, Box, Container,
  Tabs, Tab, Card, CardContent, Button, Chip, TextField, InputBase,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Switch, FormControlLabel, Stack, Divider, Snackbar, Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import { products as initialProducts } from 'data/products';
import {
  SITE_NAME,
  CURRENCY_SYMBOL,
  COLOR_PRIMARY_DARK,
} from '../../config';

/* Initial Mock Orders */
const INITIAL_ORDERS = [
  { id: 'RJK-9481', customer: 'Kaito Takahashi', destination: 'Makati City, Metro Manila', items: 'Tengoku Tokyo Haori, Sapporo Pack', total: 2530.00, date: 'Today, 2:15 PM', status: 'Shipped from Tokyo' },
  { id: 'RJK-9480', customer: 'Maria Elena Santos', destination: 'Quezon City, Metro Manila', items: 'Sony WH-1000XM5, Uji Matcha', total: 20140.00, date: 'Today, 11:30 AM', status: 'In Transit' },
  { id: 'RJK-9479', customer: 'Kenjiro Sato', destination: 'Cebu City, Central Visayas', items: 'Asics Gel-Kayano 14 Japanese Edition', total: 8990.00, date: 'Yesterday', status: 'Delivered' },
  { id: 'RJK-9478', customer: 'Bea Alonzo', destination: 'BGC, Taguig City', items: 'Ichiran Ramen Kit (x2), Tokyo Banana Crate', total: 3030.00, date: 'Yesterday', status: 'Processing' },
  { id: 'RJK-9477', customer: 'Hiroshi Tanaka', destination: 'Davao City, Mindanao', items: 'Molten BG5000 Basketball, Kendo Shinai', total: 7940.00, date: '2 days ago', status: 'Delivered' },
];

/* Initial Mock Support Tickets */
const INITIAL_TICKETS = [
  { id: 'TKT-1042', customer: 'Lorenzo Cruz', category: 'Damaged or Defective Item Received', orderId: 'RJK-9472', priority: 'High', date: '1 hour ago', status: 'Pending Review', message: 'The outer box of the tea set was dented upon courier arrival.' },
  { id: 'TKT-1041', customer: 'Aiko Ramirez', category: 'Order Delayed / Tracking Status Update', orderId: 'RJK-9469', priority: 'Medium', date: '3 hours ago', status: 'In Progress', message: 'Requesting updated customs tracking flight number for my Tokyo parcel.' },
  { id: 'TKT-1040', customer: 'David Mendoza', category: 'Return & Full Refund Request', orderId: 'RJK-9455', priority: 'Low', date: '1 day ago', status: 'Resolved', message: 'Size exchange requested for Tabi Ninja Sneakers.' },
];

export default function AdminDashboard({ open, onClose }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [productList, setProductList] = useState(initialProducts);
  const [orderList, setOrderList] = useState(INITIAL_ORDERS);
  const [ticketList, setTicketList] = useState(INITIAL_TICKETS);
  const [productSearch, setProductSearch] = useState('');
  const [snackMessage, setSnackMessage] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);

  // Toggle In Stock / Out of Stock
  const handleToggleStock = (productId) => {
    setProductList((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updated = !p.inStock;
          setSnackMessage(`${p.name} is now ${updated ? 'IN STOCK' : 'OUT OF STOCK'}`);
          setSnackOpen(true);
          return { ...p, inStock: updated };
        }
        return p;
      })
    );
  };

  // Update Order Status
  const handleNextOrderStatus = (orderId) => {
    setOrderList((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          let next = 'Delivered';
          if (ord.status === 'Processing') next = 'Shipped from Tokyo';
          else if (ord.status === 'Shipped from Tokyo') next = 'In Transit';
          else if (ord.status === 'In Transit') next = 'Delivered';
          setSnackMessage(`Order ${orderId} status updated to: ${next}`);
          setSnackOpen(true);
          return { ...ord, status: next };
        }
        return ord;
      })
    );
  };

  // Resolve Ticket
  const handleResolveTicket = (ticketId) => {
    setTicketList((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const newStatus = t.status === 'Resolved' ? 'Pending Review' : 'Resolved';
          setSnackMessage(`Ticket ${ticketId} marked as ${newStatus}`);
          setSnackOpen(true);
          return { ...t, status: newStatus };
        }
        return t;
      })
    );
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
                Master Access • Authorized Admin Privileges
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              icon={<CheckCircleOutlineIcon style={{ color: '#4caf50' }} />}
              label="Admin Online"
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
          {/* ── Overview Statistics Cards ── */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
              gap: 2.5,
              mb: 4,
            }}
          >
            {[
              { label: 'Gross Revenue (Month)', value: '₱482,900.00', change: '+18.4% vs last mo', color: '#2e7d32' },
              { label: 'Japanese Orders', value: `${orderList.length + 137} Orders`, change: '98.5% on-time dispatch', color: '#1976d2' },
              { label: 'Catalog Inventory', value: `${productList.length} Japanese Items`, change: '7 categories active', color: '#EC407A' },
              { label: 'Active Support Tickets', value: `${ticketList.filter(t => t.status !== 'Resolved').length} Open`, change: '24hr resolution target', color: '#ed6c02' },
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
                    {stat.change}
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
              <Tab icon={<InventoryOutlinedIcon />} iconPosition="start" label="Inventory & Products (35)" sx={{ textTransform: 'none', fontWeight: 800, color: currentTab === 0 ? '#EC407A' : 'inherit' }} />
              <Tab icon={<ReceiptLongOutlinedIcon />} iconPosition="start" label="Orders & Shipments" sx={{ textTransform: 'none', fontWeight: 800, color: currentTab === 1 ? '#EC407A' : 'inherit' }} />
              <Tab icon={<SupportAgentOutlinedIcon />} iconPosition="start" label="Customer Service Queue" sx={{ textTransform: 'none', fontWeight: 800, color: currentTab === 2 ? '#EC407A' : 'inherit' }} />
              <Tab icon={<SettingsOutlinedIcon />} iconPosition="start" label="Store Settings" sx={{ textTransform: 'none', fontWeight: 800, color: currentTab === 3 ? '#EC407A' : 'inherit' }} />
            </Tabs>
          </Paper>

          {/* ══════════════════════════════════════════════════════════
              TAB 0: INVENTORY & PRODUCT MANAGEMENT
          ══════════════════════════════════════════════════════════ */}
          {currentTab === 0 && (
            <Card elevation={1} sx={{ borderRadius: '16px', border: '1px solid #E0E0E0', overflow: 'hidden' }}>
              <Box sx={{ p: 2.5, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2, bgcolor: '#ffffff' }}>
                <Box>
                  <Typography variant="h6" fontWeight={900}>
                    Japanese Product Catalog ({productList.length} Items)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Manage real-time availability, SKUs, and pricing across all 7 categories
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
                      <TableCell align="center" sx={{ fontWeight: 800, bgcolor: '#FAF0F3' }}>Stock Status</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, bgcolor: '#FAF0F3' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProducts.map((p) => (
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
                              <Typography variant="subtitle2" fontWeight={800} sx={{ maxWidth: 260 }}>
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
                        <TableCell align="center">
                          <Chip
                            label={p.inStock ? 'In Stock' : 'Out of Stock'}
                            size="small"
                            sx={{
                              fontWeight: 800,
                              bgcolor: p.inStock ? '#e8f5e9' : '#ffebee',
                              color: p.inStock ? '#2e7d32' : '#c62828',
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleToggleStock(p.id)}
                            sx={{
                              borderColor: p.inStock ? '#c62828' : '#2e7d32',
                              color: p.inStock ? '#c62828' : '#2e7d32',
                              borderRadius: '16px',
                              textTransform: 'none',
                              fontWeight: 700,
                              fontSize: '0.75rem',
                              px: 1.5,
                            }}
                          >
                            {p.inStock ? 'Mark Out of Stock' : 'Restock'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 1: ORDERS & SHIPMENTS
          ══════════════════════════════════════════════════════════ */}
          {currentTab === 1 && (
            <Card elevation={1} sx={{ borderRadius: '16px', border: '1px solid #E0E0E0' }}>
              <Box sx={{ p: 2.5, bgcolor: '#ffffff', borderBottom: '1px solid #E0E0E0' }}>
                <Typography variant="h6" fontWeight={900}>
                  Active Orders & International Shipments
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Tracking consignments dispatched from Tokyo & Osaka warehouses
                </Typography>
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
                      <TableCell align="center" sx={{ fontWeight: 800 }}>Status</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800 }}>Action</TableCell>
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
                            {ord.customer}
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
                            {CURRENCY_SYMBOL}{ord.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
                                ord.status === 'Shipped from Tokyo' ? '#fff3e0' : '#f3e5f5',
                              color:
                                ord.status === 'Delivered' ? '#2e7d32' :
                                ord.status === 'In Transit' ? '#1565c0' :
                                ord.status === 'Shipped from Tokyo' ? '#e65100' : '#7b1fa2',
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleNextOrderStatus(ord.id)}
                            sx={{
                              borderColor: '#EC407A',
                              color: '#EC407A',
                              borderRadius: '16px',
                              textTransform: 'none',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                            }}
                          >
                            Advance Status
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 2: CUSTOMER SERVICE QUEUE
          ══════════════════════════════════════════════════════════ */}
          {currentTab === 2 && (
            <Card elevation={1} sx={{ borderRadius: '16px', border: '1px solid #E0E0E0' }}>
              <Box sx={{ p: 2.5, bgcolor: '#ffffff', borderBottom: '1px solid #E0E0E0' }}>
                <Typography variant="h6" fontWeight={900}>
                  Customer Service Problem Reports
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Queue of direct message inquiries and return / damage reports
                </Typography>
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
                      <TableCell align="center" sx={{ fontWeight: 800 }}>Status</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800 }}>Resolve</TableCell>
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
                          <Typography variant="body2" sx={{ maxWidth: 300, color: '#555555' }}>
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
                              bgcolor: t.status === 'Resolved' ? '#e8f5e9' : '#fff8e1',
                              color: t.status === 'Resolved' ? '#2e7d32' : '#f57f17',
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            variant={t.status === 'Resolved' ? 'outlined' : 'contained'}
                            onClick={() => handleResolveTicket(t.id)}
                            sx={{
                              bgcolor: t.status === 'Resolved' ? 'transparent' : '#4caf50',
                              '&:hover': { bgcolor: t.status === 'Resolved' ? '#f5f5f5' : '#388e3c' },
                              color: t.status === 'Resolved' ? '#757575' : '#ffffff',
                              borderRadius: '16px',
                              textTransform: 'none',
                              fontSize: '0.72rem',
                              fontWeight: 800,
                            }}
                          >
                            {t.status === 'Resolved' ? 'Reopen' : 'Mark Resolved'}
                          </Button>
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
                    label="Default Free Shipping Threshold (₱)"
                    defaultValue="999"
                    size="small"
                    fullWidth
                  />
                  <TextField
                    label="Flat Shipping Rate for Under Threshold (₱)"
                    defaultValue="99"
                    size="small"
                    fullWidth
                  />
                  <TextField
                    label="Standard Estimated Delivery Days"
                    defaultValue="4"
                    size="small"
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    sx={{ bgcolor: '#EC407A', '&:hover': { bgcolor: '#c2185b' }, borderRadius: '20px', fontWeight: 800, textTransform: 'none', alignSelf: 'flex-start' }}
                    onClick={() => {
                      setSnackMessage('Shipping & logistics rules saved successfully.');
                      setSnackOpen(true);
                    }}
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
                    control={<Switch defaultChecked color="secondary" />}
                    label={<Typography variant="body2" fontWeight={700}>Enable Japanese Express Courier Integration (DHL / Yamato)</Typography>}
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked color="secondary" />}
                    label={<Typography variant="body2" fontWeight={700}>Accept Customer Problem Reporting Tickets</Typography>}
                  />
                  <FormControlLabel
                    control={<Switch color="secondary" />}
                    label={<Typography variant="body2" fontWeight={700}>Enable Maintenance Mode (Restricted Access)</Typography>}
                  />
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    Admin Secret Key: <strong>JAPANISLIFE</strong> (Active)
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
