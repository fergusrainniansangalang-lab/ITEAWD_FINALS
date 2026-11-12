/**
 * Login.jsx
 * ============================================================
 * RaiJouKaKu Customer Authentication
 * Secret Admin Trigger:
 * - Clicking the sakura flower icon 5 times prompts the admin passkey dialog.
 * - Password required: "JAPANISLIFE"
 * - Opens the comprehensive RaiJouKaKu Administrator Console.
 * ============================================================
 */
import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Button,
  Tab, Tabs, InputAdornment, IconButton, Alert, Stack,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import paths from 'routes/paths';
import { SITE_NAME, SITE_TAGLINE, COLOR_PRIMARY_DARK } from '../config';
import AdminDashboard from '../components/admin/AdminDashboard';

const ADMIN_SECRET = 'JAPANISLIFE';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [tab, setTab] = useState(0);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  /* ── Secret 5-Click Admin State ── */
  const [flowerClicks, setFlowerClicks] = useState(0);
  const [adminAuthOpen, setAdminAuthOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminPasswordError, setAdminPasswordError] = useState('');
  const [showAdminPw, setShowAdminPw] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  const handleFlowerClick = () => {
    const next = flowerClicks + 1;
    setFlowerClicks(next);
    if (next >= 5) {
      setFlowerClicks(0);
      setAdminAuthOpen(true);
      setAdminPassword('');
      setAdminPasswordError('');
    }
  };

  const handleAdminAuthSubmit = (e) => {
    e.preventDefault();
    if (adminPassword.trim() === ADMIN_SECRET) {
      setAdminAuthOpen(false);
      setAdminDashboardOpen(true);
      setAdminPassword('');
      setAdminPasswordError('');
    } else {
      setAdminPasswordError('Incorrect administrator password. Access denied.');
    }
  };

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    const ok = login(form.email, form.password);
    if (ok) navigate(paths.home);
    else setError('Invalid credentials. Please try again.');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 50%, #F48FB1 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Card elevation={8} sx={{ width: '100%', maxWidth: 420, borderRadius: 4, overflow: 'hidden' }}>
        {/* Pink header strip */}
        <Box sx={{ bgcolor: '#EC407A', py: 3, textAlign: 'center', position: 'relative' }}>
          {/* Secret 5-Click Flower Trigger */}
          <IconButton
            onClick={handleFlowerClick}
            disableRipple
            sx={{
              color: '#ffffff',
              transition: 'transform 0.15s ease-in-out',
              '&:hover': {
                transform: 'scale(1.15) rotate(15deg)',
                bgcolor: 'rgba(255,255,255,0.12)',
              },
              '&:active': {
                transform: 'scale(0.92)',
              },
            }}
          >
            <LocalFloristIcon sx={{ fontSize: 44 }} />
          </IconButton>

          <Typography variant="h5" fontWeight={800} color="#ffffff">
            {SITE_NAME}
          </Typography>
          <Typography variant="caption" color="rgba(255,255,255,0.88)">
            {SITE_TAGLINE}
          </Typography>
        </Box>

        <CardContent sx={{ p: 3 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => {
              setTab(v);
              setError('');
            }}
            textColor="inherit"
            TabIndicatorProps={{ style: { backgroundColor: '#EC407A' } }}
            sx={{ mb: 3 }}
            centered
          >
            <Tab label="Sign In" sx={{ fontWeight: 700, color: tab === 0 ? '#EC407A' : 'text.secondary' }} />
            <Tab label="Register" sx={{ fontWeight: 700, color: tab === 1 ? '#EC407A' : 'text.secondary' }} />
          </Tabs>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {tab === 1 && (
                <TextField
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#EC407A' } }}
                />
              )}
              <TextField
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                size="small"
                required
                sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#EC407A' } }}
              />
              <TextField
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                size="small"
                required
                type={showPw ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPw((s) => !s)} edge="end" size="small">
                        {showPw ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#EC407A' } }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  bgcolor: '#EC407A',
                  '&:hover': { bgcolor: '#d81b60' },
                  borderRadius: 25,
                  fontWeight: 700,
                  textTransform: 'none',
                  mt: 1,
                  py: 1.1,
                }}
              >
                {tab === 0 ? 'Sign In' : 'Create Account'}
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" textAlign="center" color="text.secondary" mt={2.5}>
            {tab === 0 ? "Don't have an account? " : 'Already have an account? '}
            <Box
              component="span"
              onClick={() => setTab(tab === 0 ? 1 : 0)}
              sx={{ color: '#EC407A', cursor: 'pointer', fontWeight: 700 }}
            >
              {tab === 0 ? 'Register' : 'Sign In'}
            </Box>
          </Typography>
        </CardContent>
      </Card>

      {/* ── Admin Password Challenge Modal (Triggered by 5 Flower Clicks) ── */}
      <Dialog
        open={adminAuthOpen}
        onClose={() => setAdminAuthOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '20px', p: 1, border: '2px solid #F48FB1' },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LockOutlinedIcon sx={{ color: '#EC407A' }} />
            <Typography variant="h6" fontWeight={900} color="#EC407A">
              Admin Access
            </Typography>
          </Box>
          <IconButton onClick={() => setAdminAuthOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Box component="form" onSubmit={handleAdminAuthSubmit}>
          <DialogContent sx={{ pt: 1 }}>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Enter the master administrator key to access the RaiJouKaKu store console.
            </Typography>

            {adminPasswordError && (
              <Alert severity="error" sx={{ mb: 2, fontSize: '0.82rem' }}>
                {adminPasswordError}
              </Alert>
            )}

            <TextField
              autoFocus
              fullWidth
              size="small"
              label="Admin Password"
              placeholder="Enter master password"
              type={showAdminPw ? 'text' : 'password'}
              value={adminPassword}
              onChange={(e) => {
                setAdminPassword(e.target.value);
                setAdminPasswordError('');
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowAdminPw((s) => !s)} edge="end" size="small">
                      {showAdminPw ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#EC407A' },
              }}
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={() => setAdminAuthOpen(false)}
              sx={{ color: '#757575', textTransform: 'none', fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#EC407A',
                '&:hover': { bgcolor: '#c2185b' },
                borderRadius: '20px',
                px: 3,
                fontWeight: 800,
                textTransform: 'none',
              }}
            >
              Unlock Dashboard
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* ── Full Master Admin Dashboard Console ── */}
      <AdminDashboard
        open={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
      />
    </Box>
  );
}
