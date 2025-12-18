// src/context/CartContext.tsx
import React, { createContext, useContext } from 'react';
import { useCart } from '@/hooks/useCart';

interface UseCartReturn {
  cart: CartItem[];
  addToCart: (product: Product | { id: string; quantity?: number }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  finalTotal: number;
  cartCount: number;
  isInCart: (id: string) => boolean;
  getItemQuantity: (id: string) => number;
  mergeCart: (items: CartItem[]) => void;
  exportCart: () => string;
  importCart: (data: string) => boolean;
  syncWithLocalStorage: () => void;
}

const CartContext = createContext<UseCartReturn | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cart = useCart();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};