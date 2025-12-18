import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/currency';

export const MiniCart: React.FC = () => {
  const { cart, totalItems, subtotal } = useCart();
  
  if (totalItems === 0) return null;
  
  return (
    <div className="fixed bottom-24 right-6 z-50 animate-fade-in">
      <Link
        to="/cart"
        className="card-interactive p-4 flex items-center gap-4 shadow-xl hover:shadow-2xl transition-all duration-300"
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6 text-red-600 dark:text-red-400" />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        </div>
        
        <div className="text-right">
          <div className="font-bold text-gray-900 dark:text-white">
            {formatPrice(subtotal)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {totalItems} item{totalItems !== 1 ? 's' : ''}
          </div>
        </div>
        
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </Link>
    </div>
  );
};