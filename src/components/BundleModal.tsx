import React from 'react';
import { X, ShoppingCart, Tag, Package, CheckCircle } from 'lucide-react';
import type { Product, ProductBundle } from '../types';

interface BundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  bundle: ProductBundle;
  onAddToCart: (product: Product) => void;
  onAddBundleToCart?: () => void; // ADD THIS NEW PROP
}

export const BundleModal: React.FC<BundleModalProps> = ({
  isOpen,
  onClose,
  bundle,
  onAddToCart,
  onAddBundleToCart,
}) => {
  if (!isOpen) return null;

  const totalOriginalPrice = bundle.products.reduce((sum, product) => {
    const price = parseFloat(product.price.replace(/[^\d.]/g, ''));
    return sum + price;
  }, 0);

  const bundlePrice = parseFloat(bundle.bundlePrice.replace(/[^\d.]/g, ''));
  const totalSavings = totalOriginalPrice - bundlePrice;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white p-6 border-b rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{bundle.name}</h2>
                <p className="text-gray-600 mt-1">{bundle.description}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Price Info */}
            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-red-600">
                    KES {bundlePrice.toFixed(2)}
                  </span>
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    KES {totalOriginalPrice.toFixed(2)}
                  </span>
                  <div className="ml-4 bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">
                    Save {bundle.discount}%
                  </div>
                </div>
                <p className="text-green-600 font-semibold mt-2">
                  Save KES {totalSavings.toFixed(2)} with this bundle!
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2 text-red-600" />
              What's Included
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {bundle.products.map((product) => (
                <div key={product.id} className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mr-4">
                    <ShoppingCart className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-500">{product.size}</p>
                    <p className="text-red-600 font-bold">{product.price}</p>
                  </div>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="ml-2 bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>

            {/* Bundle Features */}
            <div className="bg-yellow-50 p-4 rounded-xl mb-6">
              <h4 className="font-bold mb-2 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-yellow-600" />
                Why This Bundle?
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Perfect combination for authentic Korean meals</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Save {bundle.discount}% compared to buying separately</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Everything you need in one package</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t bg-gray-50 rounded-b-2xl">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => {
                  if (onAddBundleToCart) {
                    onAddBundleToCart();
                  } else {
                    bundle.products.forEach(product => onAddToCart(product));
                  }
                  onClose();
                }}
                className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Add Complete Bundle to Cart
              </button>
              <button
                onClick={onClose}
                className="px-8 py-3 border-2 border-red-600 text-red-600 rounded-xl font-bold hover:bg-red-50"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};