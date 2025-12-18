// src/pages/ProductsPage.tsx
import React from 'react';
import { ProductGrid } from '@/components/ProductGrid';
import { PRODUCTS } from '@/config/products';

export const ProductsPage: React.FC = () => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Our Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse our collection of authentic Korean groceries
          </p>
        </div>
        
        <ProductGrid products={PRODUCTS} />
      </div>
    </div>
  );
};