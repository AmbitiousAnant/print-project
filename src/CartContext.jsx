import React, { createContext, useState, useContext, useMemo } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add a new configured item to the cart
  const addToCart = (item) => {
    setCartItems((prev) => [...prev, { ...item, id: Date.now() }]);
  };

  // Remove an item by its unique cart ID
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear the cart after a successful checkout
  const clearCart = () => setCartItems([]);

  // Dynamically calculate the total cart price
  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.total_price || 0), 0);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for easy access
export const useCart = () => useContext(CartContext);