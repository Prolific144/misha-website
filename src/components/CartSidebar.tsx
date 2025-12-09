import React from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import type { CartItem } from '../types';
import { COMPANY_CONFIG } from '../utils/companyConfig';

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
  const generateWhatsAppOrder = () => {
    const itemsText = cart
      .map(item => `${item.name} (${item.size}) ×${item.quantity}`)
      .join('%0A');
    
    const message = `Hello Misha Foodstuffs!%0A%0AI would like to order:%0A%0A${itemsText}%0A%0ATotal: KES ${totalPrice.toFixed(2)}%0A%0APlease confirm availability and delivery details.`;
    
    return `https://wa.me/${COMPANY_CONFIG.whatsapp.number.replace(/\D/g, '')}?text=${message}`;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingCart className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold">Your Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              {cart.length} item{cart.length !== 1 ? 's' : ''} in cart
            </p>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="mt-4 text-primary hover:underline"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => {
                  const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
                  return (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={`https://via.placeholder.com/100x100/FF6B35/FFFFFF?text=${encodeURIComponent(item.name.substring(0, 10))}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.size}</p>
                        <p className="text-primary font-bold">KES {(price * item.quantity).toFixed(2)}</p>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-primary">KES {totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="space-y-3">
                <a
                  href={generateWhatsAppOrder()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-green-500 text-white text-center py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                >
                  Order via WhatsApp
                </a>
                
                <button
                  onClick={onClose}
                  className="block w-full border-2 border-primary text-primary py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                Free delivery for orders above KES 2,000
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};