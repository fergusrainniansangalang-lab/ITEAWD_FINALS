/**
 * EcommerceLayout.jsx — Nested layout for /ecommerce/* routes.
 * Simply renders child routes via Outlet.
 */
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function EcommerceLayout() {
  return <Outlet />;
}
