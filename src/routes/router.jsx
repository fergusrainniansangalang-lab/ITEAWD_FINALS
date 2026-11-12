import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import AuthLayout from 'layouts/AuthLayout';
import EcommerceLayout from 'layouts/EcommerceLayout';
import PageLoader from 'components/loading/PageLoader';
import paths, { rootPaths } from './paths';

/**
 * ============================================================================
 * Router Configuration
 * Pattern modeled directly after the Sangalang Quiz / Seatwork router architecture:
 * - Lazy loaded page components with Suspense
 * - Nested route structure with shared layouts
 * - Centralized paths mapped through paths.js
 * ============================================================================
 */

// Helper component for Suspense fallback on route transitions
const SuspenseOutlet = () => (
  <Suspense fallback={<PageLoader />}>
    <Outlet />
  </Suspense>
);

// Lazy Loaded Pages
const Home = lazy(() => import('pages/Home'));
const ProductListing = lazy(() => import('pages/ProductListing'));
const ProductDetails = lazy(() => import('pages/ProductDetails'));
const Cart = lazy(() => import('pages/Cart'));
const Checkout = lazy(() => import('pages/Checkout'));
const OrderConfirmation = lazy(() => import('pages/OrderConfirmation'));
const AboutContact = lazy(() => import('pages/AboutContact'));
const AboutUs = lazy(() => import('pages/AboutUs'));
const Login = lazy(() => import('pages/Login'));
const NotFound = lazy(() => import('pages/NotFound'));

export const router = createBrowserRouter([
  // Main Storefront Layout Routes
  {
    element: <MainLayout />,
    children: [
      {
        element: <SuspenseOutlet />,
        children: [
          // Home route (Requirement b)
          {
            path: paths.home,
            element: <Home />,
          },

          // Ecommerce Nested Routes (Sangalang structure)
          {
            path: paths.ecommerceRoot,
            element: <EcommerceLayout />,
            children: [
              {
                path: paths.ecommerceHomepage,
                element: <Home />,
              },
              {
                path: paths.products,
                element: <ProductListing />,
              },
              {
                path: paths.productDetails(':id'),
                element: <ProductDetails />,
              },
              {
                path: paths.productDetails(),
                element: <ProductDetails />,
              },
              {
                path: paths.cart,
                element: <Cart />,
              },
              {
                path: paths.checkout,
                element: <Checkout />,
              },
              {
                path: paths.orderConfirmation,
                element: <OrderConfirmation />,
              },
            ],
          },

          // Direct Convenience Routes for Top-Level Navigation
          {
            path: '/products',
            element: <ProductListing />,
          },
          {
            path: '/product-details/:id',
            element: <ProductDetails />,
          },
          {
            path: '/cart',
            element: <Cart />,
          },
          {
            path: '/checkout',
            element: <Checkout />,
          },
          {
            path: '/order-confirmation',
            element: <OrderConfirmation />,
          },

          // Informational & Support Pages (Requirement h)
          {
            path: paths.aboutContact,
            element: <AboutContact />,
          },
          {
            path: paths.about,
            element: <AboutUs />,
          },
          {
            path: paths.contact,
            element: <AboutContact />,
          },
          {
            path: '/about',
            element: <AboutUs />,
          },
          {
            path: '/contact',
            element: <AboutContact />,
          },
          {
            path: '/customer-service',
            element: <AboutContact />,
          },

          // Error Page
          {
            path: paths.notFound,
            element: <NotFound />,
          },
        ],
      },
    ],
  },

  // Authentication Layout Routes (Requirement a)
  {
    element: <AuthLayout />,
    children: [
      {
        element: <SuspenseOutlet />,
        children: [
          {
            path: paths.login,
            element: <Login />,
          },
          {
            path: '/login',
            element: <Login />,
          },
        ],
      },
    ],
  },

  // Wildcard Fallback Route
  {
    path: '*',
    element: (
      <MainLayout>
        <NotFound />
      </MainLayout>
    ),
  },
]);

export default router;

