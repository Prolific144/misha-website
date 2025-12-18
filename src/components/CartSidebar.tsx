import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus, CheckCircle, Truck } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { generateWhatsAppUrl, generateOrderMessage } from '@/utils/helpers';
import { CONTACT_INFO } from '@/config/company';
import { DELIVERY_INFO } from '@/config/delivery';

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: string;
  size: string;
  featured?: boolean;
  image?: string;
  imageSource?: 'local' | 'unsplash' | 'placeholder';
  description?: string;
  quantity: number;
  addedAt?: string;
  lastUpdated?: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  totalPrice: number;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  totalPrice,
}) => {
  const { subtotal, discount, deliveryFee, finalTotal, isFreeDelivery } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  // Generate WhatsApp order message
  const generateWhatsAppOrder = () => {
    const message = generateOrderMessage(cart, finalTotal, customerName, deliveryAddress, deliveryInstructions);
    return generateWhatsAppUrl(message);
  };

  // Calculate delivery status
  const freeDeliveryThreshold = DELIVERY_INFO.freeThreshold;
  const needsForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  // Reset form when sidebar closes
  useEffect(() => {
    if (!isOpen) {
      setCustomerName('');
      setDeliveryAddress('');
      setDeliveryInstructions('');
    }
  }, [isOpen]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white dark:bg-gray-900 z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col">
        {/* Header */}
        <div className="p-6 border-b dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-red-600 dark:text-red-400" />
                {cart.length > 0 && (
                  <span className="card-badge absolute -top-2 -right-2">
                    {cart.length}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="btn-ghost p-2 rounded-full"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            {cart.length} item{cart.length !== 1 ? 's' : ''} in cart
          </p>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 mobile-menu-scroll">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
              <button
                onClick={onClose}
                className="btn-ghost mt-4 text-red-600 dark:text-red-400"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => {
                const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
                return (
                  <div key={item.id} className="card-minimal p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {item.name.charAt(0)}
                        </span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.size}</p>
                        <p className="text-red-600 dark:text-red-400 font-bold">
                          KES {(price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-medium w-8 text-center text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="btn-ghost p-1 text-red-500 hover:text-red-700 dark:hover:text-red-400"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Order Summary & Actions */}
        {cart.length > 0 && (
          <div className="border-t dark:border-gray-800 p-6 space-y-4">
            {/* Delivery Progress */}
            {!isFreeDelivery && (
              <div className="card-minimal p-4 bg-yellow-50 dark:bg-yellow-900/20">
                <div className="flex items-center mb-2">
                  <Truck className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mr-2" />
                  <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                    Add KES {needsForFreeDelivery.toFixed(2)} more for free delivery!
                  </span>
                </div>
                <div className="w-full bg-yellow-200 dark:bg-yellow-800 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 dark:bg-yellow-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((subtotal / freeDeliveryThreshold) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-medium">KES {subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Bulk Discount</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    -{discount}%
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Delivery</span>
                <span className={`font-medium ${isFreeDelivery ? 'text-green-600 dark:text-green-400' : ''}`}>
                  {isFreeDelivery ? 'FREE' : `KES ${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between border-t dark:border-gray-700 pt-3">
                <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                  KES {finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Order Form */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="input-primary"
              />
              <textarea
                placeholder="Delivery Address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="input-primary h-20 resize-none"
              />
              <textarea
                placeholder="Delivery Instructions (optional)"
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                className="input-primary h-20 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <a
                href={generateWhatsAppOrder()}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn w-full py-3 ${customerName && deliveryAddress ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500/50 cursor-not-allowed'}`}
                onClick={(e) => {
                  if (!customerName || !deliveryAddress) {
                    e.preventDefault();
                    alert('Please enter your name and delivery address to proceed');
                  }
                }}
              >
                Order via WhatsApp
              </a>
              
              <button
                onClick={onClose}
                className="btn-outline w-full py-3"
              >
                Continue Shopping
              </button>
            </div>
            
            {/* Info & Contact */}
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isFreeDelivery ? (
                  <span className="flex items-center justify-center text-green-600 dark:text-green-400">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Free delivery applied!
                  </span>
                ) : (
                  `Free delivery for orders above KES ${freeDeliveryThreshold.toFixed(2)}`
                )}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Need help? Call us at{' '}
                <a 
                  href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`}
                  className="text-red-600 dark:text-red-400 hover:underline"
                >
                  {CONTACT_INFO.phone}
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};