/**
 * AboutContact.jsx
 * ============================================================
 * RaiJouKaKu Customer Service & Problem Reporting Center
 * Focuses exclusively on Customer Service & Direct Problem Reports:
 * 1. Instructions & Guidelines on How to Submit an Issue/Report
 * 2. "Send Us a Direct Message / Report an Issue" Form
 * 3. Direct Support Contact Channels & Resolution Timeframe
 * Note: Company history and team bio sections removed as requested.
 * ============================================================
 */
import React, { useState } from 'react';
import {
  Box, Container, Typography, Card, CardContent, TextField,
  Button, Stack, Snackbar, Alert, Divider, Chip, MenuItem,
  Select, FormControl, InputLabel
} from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgentOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined';
import AssignmentIcon from '@mui/icons-material/AssignmentOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmptyOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import {
  SITE_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_ADDRESS,
  BUSINESS_HOURS,
  COLOR_PRIMARY_DARK,
} from '../config';

const PROBLEM_CATEGORIES = [
  'Damaged or Defective Item Received',
  'Incorrect Item or Missing Parts in Package',
  'Order Delayed / Tracking Status Update',
  'Return & Full Refund Request',
  'Payment or Billing Inquiry',
  'Authenticity & Sourcing Verification',
  'General Customer Assistance',
];

const RESOLUTION_OPTIONS = [
  'Request Item Replacement',
  'Request Full Refund to Original Payment',
  'Need Courier Tracking Follow-up',
  'General Question / No Action Required',
];

const REPORT_STEPS = [
  {
    step: '01',
    icon: <AssignmentIcon sx={{ color: COLOR_PRIMARY_DARK, fontSize: 28 }} />,
    title: 'Select Problem Type',
    description: 'Categorize your issue accurately (e.g. damaged goods, wrong product, or tracking delay) so it is routed to the right specialist.',
  },
  {
    step: '02',
    icon: <HelpOutlineIcon sx={{ color: COLOR_PRIMARY_DARK, fontSize: 28 }} />,
    title: 'Provide Your Order ID',
    description: 'Enter your RaiJouKaKu Order Number (found in your confirmation email, e.g. RJK-XXXXXX) to enable instant database lookup.',
  },
  {
    step: '03',
    icon: <CheckCircleOutlineIcon sx={{ color: COLOR_PRIMARY_DARK, fontSize: 28 }} />,
    title: 'Detail What Occurred',
    description: 'Explain the issue with specifics: mention product condition, packaging seal status, and your preferred resolution (replacement or refund).',
  },
  {
    step: '04',
    icon: <HourglassEmptyIcon sx={{ color: COLOR_PRIMARY_DARK, fontSize: 28 }} />,
    title: 'Resolution in 24 Hours',
    description: 'Our customer support team inspects reports daily and issues free replacement dispatches or refunds within 24 business hours.',
  },
];

export default function AboutContact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    orderId: '',
    category: '',
    resolution: '',
    subject: '',
    message: '',
  });
  const [snack, setSnack] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSnack(true);
    setForm({
      name: '',
      email: '',
      orderId: '',
      category: '',
      resolution: '',
      subject: '',
      message: '',
    });
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      bgcolor: '#ffffff',
      '&.Mui-focused fieldset': { borderColor: COLOR_PRIMARY_DARK },
    },
  };

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', pb: 8 }}>
      {/* ── Customer Service Banner ── */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #F8BBD0 0%, #EC407A 100%)',
          py: { xs: 5, md: 7 },
          textAlign: 'center',
          color: '#ffffff',
          px: 2,
        }}
      >
        <SupportAgentIcon sx={{ fontSize: { xs: 50, md: 64 }, mb: 1.5 }} />
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, fontSize: { xs: '1.8rem', md: '2.6rem' } }}>
          {SITE_NAME} Customer Service
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.95, maxWidth: 660, mx: 'auto', lineHeight: 1.7 }}>
          Dedicated Help Desk for problem reporting, delivery inquiries, returns, and order support.
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* ── Section 1: How to Submit a Problem or Report ── */}
        <Box sx={{ mb: 7 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Chip
              label="Reporting Guidelines"
              sx={{ bgcolor: '#FCE4EC', color: COLOR_PRIMARY_DARK, fontWeight: 800, mb: 1.5, px: 1.5 }}
            />
            <Typography variant="h4" fontWeight={900} color="#212121" sx={{ fontSize: { xs: '1.4rem', md: '2rem' } }}>
              How to Submit a Problem or Report
            </Typography>
            <Typography variant="body2" color="text.secondary" maxWidth={650} mx="auto" mt={1}>
              Follow these simple steps so our support specialists can resolve your problem as quickly as possible.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            {REPORT_STEPS.map((s) => (
              <Card
                key={s.step}
                elevation={1}
                sx={{
                  borderRadius: '16px',
                  border: '1.5px solid #FCE4EC',
                  p: 3,
                  bgcolor: '#ffffff',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.25s',
                  '&:hover': {
                    borderColor: '#F48FB1',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(236, 64, 122, 0.15)',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 14,
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    color: 'rgba(236, 64, 122, 0.12)',
                  }}
                >
                  {s.step}
                </Box>
                <Box
                  sx={{
                    bgcolor: '#FCE4EC',
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  {s.icon}
                </Box>
                <Typography variant="subtitle1" fontWeight={800} color="#212121" mb={1}>
                  {s.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                  {s.description}
                </Typography>
              </Card>
            ))}
          </Box>
        </Box>

        <Divider sx={{ mb: 7, borderColor: '#FCE4EC' }} />

        {/* ── Section 2: "Send Us a Direct Message" Report Form + Contact Channels ── */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 5,
            alignItems: 'flex-start',
          }}
        >
          {/* Left: Direct Support Channels & Fast Tips */}
          <Box sx={{ width: { xs: '100%', md: '38%' } }}>
            <Typography variant="h5" fontWeight={900} color={COLOR_PRIMARY_DARK} mb={2}>
              Support Contacts
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              You can also reach out to our team directly via email or our hotline during working hours.
            </Typography>

            <Stack spacing={2.5} sx={{ mb: 4 }}>
              {[
                { icon: <EmailIcon sx={{ color: COLOR_PRIMARY_DARK }} />, label: 'Official Support Email', value: CONTACT_EMAIL },
                { icon: <PhoneIcon sx={{ color: COLOR_PRIMARY_DARK }} />, label: 'Customer Hotline', value: CONTACT_PHONE },
                { icon: <LocationOnIcon sx={{ color: COLOR_PRIMARY_DARK }} />, label: 'Distribution & Return Hub', value: CONTACT_ADDRESS },
                { icon: <AccessTimeIcon sx={{ color: COLOR_PRIMARY_DARK }} />, label: 'Operating Schedule', value: BUSINESS_HOURS },
              ].map((item) => (
                <Stack direction="row" spacing={2} alignItems="flex-start" key={item.label}>
                  <Box sx={{ bgcolor: '#FCE4EC', borderRadius: '50%', p: 1.4, flexShrink: 0 }}>
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={800}>
                      {item.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.value}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>

            {/* Quick Tips Box */}
            <Box sx={{ bgcolor: '#FCE4EC', p: 2.5, borderRadius: '14px', border: '1px solid #F8BBD0' }}>
              <Typography variant="subtitle2" fontWeight={800} color={COLOR_PRIMARY_DARK} mb={1}>
                💡 Tips for Rapid Resolution:
              </Typography>
              <Typography variant="caption" color="#424242" component="div" sx={{ lineHeight: 1.7 }}>
                • Retain original Japanese tags and protective packaging.<br />
                • Note any damaged parcel tape or courier delivery timestamps.<br />
                • Include clear details in the message box to avoid delays.
              </Typography>
            </Box>
          </Box>

          {/* Right: "Send Us a Direct Message" Form */}
          <Box sx={{ flex: 1, width: '100%' }}>
            <Card elevation={2} sx={{ borderRadius: '18px', border: '1.5px solid #FCE4EC', bgcolor: '#ffffff' }}>
              <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h5" fontWeight={900} color="#212121">
                    Send Us a Direct Message
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    Fill out this form to submit your report or support inquiry directly to our desk.
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                  {/* Row 1: Problem Category & Preferred Resolution */}
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
                    <FormControl size="small" fullWidth required sx={inputSx}>
                      <InputLabel id="category-label">Inquiry / Problem Type</InputLabel>
                      <Select
                        labelId="category-label"
                        name="category"
                        value={form.category}
                        label="Inquiry / Problem Type"
                        onChange={handleChange}
                        sx={{ borderRadius: '10px' }}
                      >
                        {PROBLEM_CATEGORIES.map((cat) => (
                          <MenuItem key={cat} value={cat}>
                            {cat}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl size="small" fullWidth sx={inputSx}>
                      <InputLabel id="res-label">Desired Resolution</InputLabel>
                      <Select
                        labelId="res-label"
                        name="resolution"
                        value={form.resolution}
                        label="Desired Resolution"
                        onChange={handleChange}
                        sx={{ borderRadius: '10px' }}
                      >
                        {RESOLUTION_OPTIONS.map((res) => (
                          <MenuItem key={res} value={res}>
                            {res}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Row 2: Customer Name & Email */}
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
                    <TextField
                      label="Your Full Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      required
                      sx={inputSx}
                    />
                    <TextField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      required
                      sx={inputSx}
                    />
                  </Box>

                  {/* Row 3: Order ID & Subject */}
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1.5fr' }, gap: 2, mb: 2 }}>
                    <TextField
                      label="Order ID (e.g. RJK-ABC123)"
                      name="orderId"
                      value={form.orderId}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      placeholder="Optional if general inquiry"
                      sx={inputSx}
                    />
                    <TextField
                      label="Subject Line"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      required
                      sx={inputSx}
                    />
                  </Box>

                  {/* Row 4: Detailed Message */}
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      label="Detailed Problem Description / Message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={5}
                      required
                      placeholder="Describe what occurred with as much detail as possible (item condition, tracking number, symptoms, etc.)..."
                      sx={inputSx}
                    />
                  </Box>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<SendIcon />}
                    sx={{
                      bgcolor: COLOR_PRIMARY_DARK,
                      '&:hover': { bgcolor: '#c2185b' },
                      borderRadius: '25px',
                      py: 1.3,
                      fontWeight: 800,
                      fontSize: '1rem',
                      textTransform: 'none',
                      boxShadow: '0 4px 14px rgba(236, 64, 122, 0.3)',
                    }}
                  >
                    Submit Report / Send Message
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>

      {/* Confirmation Snackbar */}
      <Snackbar
        open={snack}
        autoHideDuration={4000}
        onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ bgcolor: COLOR_PRIMARY_DARK, fontWeight: 700 }}
          onClose={() => setSnack(false)}
        >
          Your problem report has been submitted successfully! Ticket ID generated. Our support desk will reply within 24 hours. 🌸
        </Alert>
      </Snackbar>
    </Box>
  );
}
