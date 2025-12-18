import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export const CartPersistIndicator: React.FC = () => {
  const [showSaved, setShowSaved] = useState(false);
  const [lastCartCount, setLastCartCount] = useState(0);
  const { cart } = useCart();

  useEffect(() => {
    // Show indicator when cart changes
    if (cart.length !== lastCartCount) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      setLastCartCount(cart.length);
      return () => clearTimeout(timer);
    }
  }, [cart.length, lastCartCount]);

  // Also show when cart is loaded from storage
  useEffect(() => {
    if (cart.length > 0) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!showSaved) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 animate-fade-in">
      <div className="flex items-center gap-2 badge-success px-4 py-2 rounded-full shadow-lg">
        <CheckCircle className="w-4 h-4" />
        <span className="text-sm font-medium">Cart Saved</span>
      </div>
    </div>
  );
};