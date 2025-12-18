import React, { useState } from 'react';
import { X, Scale, Check } from 'lucide-react';
import type { Product } from '@/types';

interface ProductComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

export const ProductComparison: React.FC<ProductComparisonProps> = ({
  isOpen,
  onClose,
  products,
}) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const toggleProduct = (product: Product) => {
    setSelectedProducts(prev => {
      if (prev.find(p => p.id === product.id)) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        alert('Maximum 4 products for comparison');
        return prev;
      }
      return [...prev, product];
    });
  };

  if (!isOpen) return null;

  const features = [
    { key: 'price', label: 'Price', format: (value: string) => value },
    { key: 'size', label: 'Size', format: (value: string) => value },
    { key: 'category', label: 'Category', format: (value: string) => value },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 p-6 border-b dark:border-gray-700 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Scale className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Compare Products
                </h2>
                <span className="ml-4 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                  {selectedProducts.length} selected
                </span>
              </div>
              <button
                onClick={onClose}
                className="btn-ghost p-2 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Product Selection */}
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Select products to compare (max 4)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
              {products.slice(0, 12).map(product => {
                const isSelected = selectedProducts.some(p => p.id === product.id);
                return (
                  <button
                    key={product.id}
                    onClick={() => toggleProduct(product)}
                    className={`card-minimal p-4 ${isSelected ? 'border-2 border-red-500 dark:border-red-400' : ''}`}
                  >
                    <div className="text-center">
                      <div className="h-12 w-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <div className="text-white text-xs font-bold">
                          {product.name.charAt(0)}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {product.price}
                      </p>
                      {isSelected && (
                        <div className="mt-2">
                          <Check className="w-4 h-4 text-green-500 dark:text-green-400 mx-auto" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Comparison Table */}
            {selectedProducts.length > 0 && (
              <div className="overflow-x-auto rounded-xl border dark:border-gray-700">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900">
                      <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">
                        Feature
                      </th>
                      {selectedProducts.map(product => (
                        <th key={product.id} className="p-4 text-center">
                          <div className="text-center">
                            <p className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {product.size}
                            </p>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {features.map(feature => (
                      <tr key={feature.key} className="border-t dark:border-gray-700">
                        <td className="p-4 font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900">
                          {feature.label}
                        </td>
                        {selectedProducts.map(product => (
                          <td key={`${product.id}-${feature.key}`} className="p-4 text-center">
                            {feature.format((product as any)[feature.key])}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="border-t dark:border-gray-700">
                      <td className="p-4 font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900">
                        Actions
                      </td>
                      {selectedProducts.map(product => (
                        <td key={`${product.id}-actions`} className="p-4 text-center">
                          <button
                            onClick={() => {
                              const price = parseFloat(product.price.replace(/[^\d.]/g, ''));
                              // Add to cart logic here
                              console.log('Add to cart:', product);
                            }}
                            className="btn-primary px-4 py-2 text-sm"
                          >
                            Add to Cart
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-2xl">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setSelectedProducts([])}
                className="btn-outline px-4 py-2"
                disabled={selectedProducts.length === 0}
              >
                Clear All
              </button>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="btn-secondary px-6 py-2"
                >
                  Close
                </button>
                {selectedProducts.length > 0 && (
                  <button className="btn-primary px-6 py-2">
                    Add All to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};