/**
 * Login.jsx — MUI login/register page with sakura pink theme.
 * Tabs switch between Sign In and Sign Up forms.
 */
import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Button,
  Tab, Tabs, InputAdornment, IconButton, Alert, Stack
} from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import paths from 'routes/paths';
import { SITE_NAME, SITE_TAGLINE } from '../config';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [tab, setTab] = useState(0);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please fill in all required fields.'); return; }
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
        <Box sx={{ bgcolor: '#EC407A', py: 3, textAlign: 'center' }}>
          <LocalFloristIcon sx={{ color: '#fff', fontSize: 40, mb: 0.5 }} />
          <Typography variant="h5" fontWeight={800} color="#fff">{SITE_NAME}</Typography>
          <Typography variant="caption" color="rgba(255,255,255,0.85)">{SITE_TAGLINE}</Typography>
        </Box>

        <CardContent sx={{ p: 3 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => { setTab(v); setError(''); }}
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
                  label="Full Name" name="name" value={form.name}
                  onChange={handleChange} fullWidth size="small"
                  sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#EC407A' } }}
                />
              )}
              <TextField
                label="Email Address" name="email" type="email" value={form.email}
                onChange={handleChange} fullWidth size="small" required
                sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#EC407A' } }}
              />
              <TextField
                label="Password" name="password" value={form.password}
                onChange={handleChange} fullWidth size="small" required
                type={showPw ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPw(s => !s)} edge="end" size="small">
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
                  bgcolor: '#EC407A', '&:hover': { bgcolor: '#d81b60' },
                  borderRadius: 25, fontWeight: 700, textTransform: 'none', mt: 1,
                }}
              >
                {tab === 0 ? 'Sign In' : 'Create Account'}
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" textAlign="center" color="text.secondary" mt={2}>
            {tab === 0 ? "Don't have an account? " : 'Already have an account? '}
            <Box component="span" onClick={() => setTab(tab === 0 ? 1 : 0)}
              sx={{ color: '#EC407A', cursor: 'pointer', fontWeight: 700 }}>
              {tab === 0 ? 'Register' : 'Sign In'}
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
