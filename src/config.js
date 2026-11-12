/**
 * config.js
 * ============================================================
 * Single source of truth for all site-wide constants.
 * Updated brand name: RaiJouKaKu (ライジョウカク)
 * ============================================================
 */

/* ── Brand ── */
export const SITE_NAME = 'RaiJouKaKu';
export const SITE_NAME_JP = 'ライジョウカク';
export const SITE_NAME_EN = 'RaiJouKaKu';
export const SITE_TAGLINE = 'Authentic Japanese Quality & Lifestyle';
export const SITE_DESCRIPTION =
  'Premium authentic Japanese products — from apparel and culinary delicacies to smart electronics, home essentials, and sports gear.';

/* ── Contact info ── */
export const CONTACT_EMAIL = 'support@raijoukaku.jp';
export const CONTACT_PHONE = '+63 912 345 6789 / +81 3 5555 0199';
export const CONTACT_ADDRESS = 'Ginza, Chuo-ku, Tokyo / Manila Express Hub';
export const BUSINESS_HOURS = 'Mon–Sat: 8:00 AM – 8:00 PM JST';

/* ── Shipping rules ── */
export const FREE_SHIPPING_THRESHOLD = 999;
export const FLAT_SHIPPING_FEE = 99;
export const CURRENCY_SYMBOL = '₱';

/* ── Order number prefix ── */
export const ORDER_PREFIX = 'RJK';

/* ── Delivery estimate (days from today) ── */
export const DELIVERY_DAYS = 4;

/* ── Locale for date formatting ── */
export const DATE_LOCALE = 'en-PH';

/* ── LocalStorage keys ── */
export const LS_CART_KEY = 'apexmart_cart';
export const LS_USER_KEY = 'apexmart_user';

/* ── Sakura Pink Color Palette ── */
export const COLOR_PRIMARY = '#F48FB1';       // Sakura pink
export const COLOR_PRIMARY_DARK = '#EC407A';  // Vibrant Japanese pink / accent
export const COLOR_PRIMARY_LIGHT = '#FCE4EC'; // Soft petal blush
export const COLOR_HEADER_BG = '#F48FB1';     // Header banner pink
export const COLOR_WHITE = '#ffffff';

/* ── Hero carousel slides (Japanese themed) ── */
export const HERO_SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80',
    title: 'Authentic Sapporo & Japanese Delights',
    sub: 'Experience the pure taste of Hokkaido & Tokyo delicacies',
  },
  {
    img: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1400&q=80',
    title: 'Traditional & Streetwear Fashion',
    sub: 'Artisan Haori jackets, Yukata sets & premium denim',
  },
  {
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80',
    title: 'Japanese Precision Electronics',
    sub: 'Audio-Technica, Sony & Zojirushi high-tech innovations',
  },
  {
    img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1400&q=80',
    title: 'Sports, Martial Arts & Outdoor Gear',
    sub: 'Crafted for champions — Mizuno, Molten & Kendo equipment',
  },
];
