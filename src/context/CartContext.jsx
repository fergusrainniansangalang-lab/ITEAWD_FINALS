/**
 * CartContext.jsx
 * Provides shopping cart state and actions across the entire app.
 * Uses localStorage for persistence between sessions.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LS_CART_KEY, getProductStock } from '../config';

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
      const items = stored ? JSON.parse(stored) : [];
      // Sanitize loaded items against real-time stock limits
      return items
        .map((item) => {
          const maxStock = getProductStock(item.id);
          return {
            ...item,
            quantity: Math.min(item.quantity || 1, maxStock),
          };
        })
        .filter((item) => item.quantity > 0);
    } catch {
      return [];
    }
  });

  /* Persist to localStorage whenever cart changes */
  useEffect(() => {
    localStorage.setItem(LS_CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  /* Listen for storage events (e.g. stock changes made by admin) to enforce stock limits */
  useEffect(() => {
    const handleStorageChange = () => {
      setCartItems((prev) =>
        prev
          .map((item) => {
            const maxStock = getProductStock(item.id);
            return {
              ...item,
              quantity: Math.min(item.quantity, maxStock),
            };
          })
          .filter((item) => item.quantity > 0)
      );
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  /** Helper to get quantity of item currently in cart */
  const getItemInCartCount = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  /** Helper to get remaining stock that can still be added to cart */
  const getRemainingPurchasable = (productId) => {
    const maxStock = getProductStock(productId);
    const inCart = getItemInCartCount(productId);
    return Math.max(0, maxStock - inCart);
  };

  /**
   * Add a product strictly constrained by remaining available stock in admin inventory.
   * Returns { success: boolean, added: number, maxStock: number, message?: string }
   */
  const addToCart = (product, quantity = 1) => {
    const maxStock = getProductStock(product.id);
    if (maxStock <= 0) {
      return { success: false, reason: 'out_of_stock', message: 'Item is sold out in Tokyo inventory.' };
    }

    let result = { success: true, added: 0, maxStock };

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const currentInCart = existing ? existing.quantity : 0;
      const availableToAdd = Math.max(0, maxStock - currentInCart);

      if (availableToAdd <= 0) {
        result = {
          success: false,
          reason: 'limit_reached',
          message: `Cannot add more. You have reached the maximum available units (${maxStock}) in your cart.`,
          maxStock,
        };
        return prev;
      }

      const qtyToAdd = Math.min(quantity, availableToAdd);
      result = { success: true, added: qtyToAdd, maxStock };

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }
      return [...prev, { ...product, quantity: qtyToAdd }];
    });

    return result;
  };

  /** Remove a product entirely from the cart */
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  /**
   * Set an explicit quantity for a cart item, strictly capped by admin inventory.
   */
  const updateQuantity = (productId, quantity) => {
    const maxStock = getProductStock(productId);

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const cappedQuantity = Math.min(quantity, maxStock);

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: cappedQuantity } : item
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
        getItemInCartCount,
        getRemainingPurchasable,
        getProductStock,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
