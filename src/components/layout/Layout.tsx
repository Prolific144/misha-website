import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartProvider } from '@/context/CartContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
};