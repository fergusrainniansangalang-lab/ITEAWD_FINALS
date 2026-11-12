/**
 * ============================================================================
 * Sitemap Configuration
 * Pattern modeled directly after Sangalang Quiz / Seatwork sitemap:
 * Provides structured navigation tree for sidebars, breadcrumbs, and docs.
 * ============================================================================
 */

import paths from './paths';

const sitemap = [
  {
    id: 'storefront',
    subheader: 'Storefront',
    key: 'storefront',
    icon: 'Store',
    items: [
      {
        name: 'Home',
        key: 'home',
        path: paths.home,
        pathName: 'home',
        icon: 'Home',
        active: true,
      },
      {
        name: 'Product Listing',
        key: 'products',
        path: paths.products,
        pathName: 'products',
        icon: 'ShoppingBag',
        active: true,
      },
      {
        name: 'Product Details',
        key: 'product_details',
        path: paths.productDetails('prod-elec-1'),
        pathName: 'product-details',
        icon: 'FileText',
        active: true,
      },
      {
        name: 'Cart',
        key: 'cart',
        path: paths.cart,
        pathName: 'cart',
        icon: 'ShoppingCart',
        active: true,
      },
      {
        name: 'Checkout',
        key: 'checkout',
        path: paths.checkout,
        pathName: 'checkout',
        icon: 'CreditCard',
        active: true,
      },
      {
        name: 'Order Confirmation',
        key: 'order_confirmation',
        path: paths.orderConfirmation,
        pathName: 'order-confirmation',
        icon: 'CheckCircle2',
        active: true,
      },
    ],
  },
  {
    id: 'company',
    subheader: 'Company & Support',
    key: 'company',
    icon: 'Building2',
    items: [
      {
        name: 'About & Contact Us',
        key: 'about_contact',
        path: paths.aboutContact,
        pathName: 'about-contact',
        icon: 'Info',
        active: true,
      },
    ],
  },
  {
    id: 'authentication',
    subheader: 'Account Access',
    key: 'authentication',
    icon: 'User',
    items: [
      {
        name: 'Customer Login',
        key: 'login',
        path: paths.login,
        pathName: 'login',
        icon: 'LogIn',
        active: true,
      },
    ],
  },
];

export default sitemap;

