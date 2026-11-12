/**
 * CartContext.jsx
 * Provides shopping cart state and actions across the entire app.
 * Uses localStorage for persistence between sessions.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LS_CART_KEY } from '../config';

const CartContext = createContext(null);

/**
 * useCart - convenience hook to consume the CartContext.
 * Must be used inside a <CartProvider>.
 */
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(LS_CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  /* Persist to localStorage whenever cart changes */
  useEffect(() => {
    localStorage.setItem(LS_CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  /** Add a product (or increment qty if already in cart) */
  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  /** Remove a product entirely from the cart */
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  /** Set an explicit quantity for a cart item */
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  /** Empty the entire cart */
  const clearCart = () => setCartItems([]);

  /* Derived totals */
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
