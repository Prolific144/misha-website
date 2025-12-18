import React from 'react';
import { X, ShoppingCart, Tag, Package, CheckCircle } from 'lucide-react';
import { Product } from '@/config/types';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/helpers';

interface BundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  bundle: {
    id: string;
    name: string;
    description: string;
    products: Product[];
    bundlePrice: string;
    discount: number;
    image?: string;
  };
}

export const BundleModal: React.FC<BundleModalProps> = ({
  isOpen,
  onClose,
  bundle,
}) => {
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const totalOriginalPrice = bundle.products.reduce((sum, product) => {
    const price = parseFloat(product.price.replace(/[^\d.]/g, ''));
    return sum + price;
  }, 0);

  const bundlePrice = parseFloat(bundle.bundlePrice.replace(/[^\d.]/g, ''));
  const totalSavings = totalOriginalPrice - bundlePrice;

  const handleAddBundleToCart = () => {
    bundle.products.forEach(product => {
      addToCart({ id: product.id, quantity: 1 });
    });
    onClose();
  };

  const handleAddSingleToCart = (product: Product) => {
    addToCart({ id: product.id, quantity: 1 });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 dark:bg-black/70 transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-6 border-b dark:border-gray-800 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {bundle.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {bundle.description}
                </p>
              </div>
              <button
                onClick={onClose}
                className="btn-ghost p-2 rounded-full"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Price Info */}
            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {formatPrice(bundlePrice)}
                  </span>
                  <span className="ml-3 text-lg text-gray-500 dark:text-gray-400 line-through">
                    {formatPrice(totalOriginalPrice)}
                  </span>
                  <div className="badge-success ml-4 px-3 py-1 font-bold">
                    Save {bundle.discount}%
                  </div>
                </div>
                <p className="text-green-600 dark:text-green-400 font-semibold mt-2">
                  Save {formatPrice(totalSavings)} with this bundle!
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center text-gray-900 dark:text-white">
              <Package className="w-5 h-5 mr-2 text-red-600 dark:text-red-400" />
              What's Included
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {bundle.products.map((product) => (
                <div key={product.id} className="card-minimal p-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mr-4">
                      <ShoppingCart className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{product.size}</p>
                      <p className="text-red-600 dark:text-red-400 font-bold">
                        {product.price}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAddSingleToCart(product)}
                      className="btn-primary ml-2 px-3 py-1 text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bundle Features */}
            <div className="card-minimal p-4 bg-yellow-50 dark:bg-yellow-900/20 mb-6">
              <h4 className="font-bold mb-2 flex items-center text-yellow-800 dark:text-yellow-300">
                <Tag className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" />
                Why This Bundle?
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center text-yellow-800 dark:text-yellow-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Perfect combination for authentic Korean meals</span>
                </li>
                <li className="flex items-center text-yellow-800 dark:text-yellow-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Save {bundle.discount}% compared to buying separately</span>
                </li>
                <li className="flex items-center text-yellow-800 dark:text-yellow-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Everything you need in one package</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-800 rounded-b-2xl">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleAddBundleToCart}
                className="btn-primary flex-1 py-3 hover:scale-[1.02] active:scale-95"
              >
                Add Complete Bundle to Cart
              </button>
              <button
                onClick={onClose}
                className="btn-outline px-8 py-3"
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