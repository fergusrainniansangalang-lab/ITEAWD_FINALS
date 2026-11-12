/**
 * ============================================================================
 * Centralized Route Paths
 * Pattern modeled directly after Sangalang Quiz / Seatwork route architecture:
 * Separating root path prefixes and concrete page paths.
 * ============================================================================
 */

export const rootPaths = {
  root: '/',
  pagesRoot: 'pages',
  authRoot: 'authentication',
  ecommerceRoot: 'ecommerce',
  errorRoot: 'error',
};

const paths = {
  // Storefront Main Pages
  home: '/',
  login: `/${rootPaths.authRoot}/login`,

  // E-Commerce Module Routes (Sangalang pattern)
  ecommerceRoot: `/${rootPaths.ecommerceRoot}`,
  ecommerceHomepage: `/${rootPaths.ecommerceRoot}/home`,
  products: `/${rootPaths.ecommerceRoot}/products`,
  productDetails: (productId) =>
    `/${rootPaths.ecommerceRoot}/product-details${productId ? `/${productId}` : ''}`,
  cart: `/${rootPaths.ecommerceRoot}/cart`,
  checkout: `/${rootPaths.ecommerceRoot}/checkout`,
  orderConfirmation: `/${rootPaths.ecommerceRoot}/order-confirmation`,

  // Informational Pages
  aboutContact: `/${rootPaths.pagesRoot}/about-contact`,
  about: `/${rootPaths.pagesRoot}/about`,
  contact: `/${rootPaths.pagesRoot}/contact`,

  // Error Pages
  notFound: `/${rootPaths.errorRoot}/404`,
};

export const authPaths = {
  login: paths.login,
};

export default paths;
