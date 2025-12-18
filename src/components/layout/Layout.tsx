// Layout.tsx - Add useEffect for cart persistence
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { CookieConsent } from '@/components/CookieConsent';
import { CartSidebar } from '@/components/CartSidebar';
import { CartPersistIndicator } from '@/components/CartPersistIndicator';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';

export const Layout: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { cart, updateQuantity, removeFromCart, totalItems, totalPrice } = useCart();

  // Close cart when route changes
  useEffect(() => {
    setIsCartOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header 
        cartItemsCount={totalItems} 
        onCartToggle={() => setIsCartOpen(true)} 
      />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
      <WhatsAppFloat />
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        totalPrice={totalPrice}
      />
      <CookieConsent />
      <CartPersistIndicator />
    </div>
  );
};