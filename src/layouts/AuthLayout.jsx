/**
 * AuthLayout.jsx — Layout for auth-only pages (Login/Register).
 * No Navbar/Footer — just a full-page centered container.
 */
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return <Outlet />;
}
