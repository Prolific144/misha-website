import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Trash2, Plus, Minus, Truck, Shield, Clock, Package, X, Heart, Share2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { generateWhatsAppUrl, formatPrice } from '@/utils/helpers';
import { COMPANY_CONFIG } from '@utils/companyConfig';
import { DELIVERY_INFO } from '@/config/delivery';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    subtotal, 
    discount, 
    deliveryFee, 
    finalTotal,
    totalItems 
  } = useCart();
  
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const freeDeliveryThreshold = DELIVERY_INFO.freeThreshold;
  const needsForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;

  // Generate WhatsApp order
  const generateOrderMessage = () => {
    const itemsText = cart.map(item => 
      `• ${item.quantity}x ${item.name} - ${formatPrice(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity)}`
    ).join('\n');
    
    return `*NEW ORDER - ${COMPANY_CONFIG.name}*\n\n` +
           `*Customer:* ${customerName}\n` +
           `*Delivery Address:* ${deliveryAddress}\n` +
           `*Instructions:* ${deliveryInstructions || 'None'}\n\n` +
           `*Order Items:*\n${itemsText}\n\n` +
           `*Subtotal:* ${formatPrice(subtotal)}\n` +
           `*Delivery:* ${isFreeDelivery ? 'FREE' : formatPrice(deliveryFee)}\n` +
           `*Total:* ${formatPrice(finalTotal)}\n\n` +
           `*Order ID:* CART-${Date.now().toString().slice(-6)}`;
  };

  const handleCheckout = () => {
    if (!customerName.trim() || !deliveryAddress.trim()) {
      alert('Please enter your name and delivery address to proceed');
      return;
    }
    
    setIsCheckingOut(true);
    const message = generateOrderMessage();
    const whatsappUrl = generateWhatsAppUrl(message);
    
    window.open(whatsappUrl, '_blank');
    setTimeout(() => setIsCheckingOut(false), 3000);
  };

  const saveForLater = (productId: string) => {
    // Implement wishlist functionality
    console.log('Save for later:', productId);
  };

  const shareCart = () => {
    const cartData = {
      items: cart,
      total: finalTotal,
      timestamp: new Date().toISOString()
    };
    const encoded = btoa(JSON.stringify(cartData));
    const shareUrl = `${window.location.origin}/cart/share/${encoded}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Cart link copied to clipboard!');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-900/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="w-16 h-16 text-red-400 dark:text-red-500" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Looks like you haven't added any Korean goodies yet. Let's fix that!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="btn-primary px-8 py-3 rounded-xl font-semibold text-lg"
              >
                <ArrowLeft className="w-5 h-5 mr-2 inline" />
                Browse Products
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="btn-outline px-8 py-3 rounded-xl font-semibold text-lg"
              >
                Continue Shopping
              </button>
            </div>
            
            {/* Popular Products Suggestions */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Popular Korean Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Kimchi', 'Gochujang', 'Ramen'].map((product) => (
                  <div key={product} className="card-interactive p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{product}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Authentic Korean flavor
                    </p>
                    <Link
                      to={`/products?category=${product.toLowerCase()}`}
                      className="btn-outline text-sm"
                    >
                      View Options
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Shopping Cart
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {totalItems} item{totalItems !== 1 ? 's' : ''} • {formatPrice(subtotal)}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={shareCart}
              className="btn-ghost flex items-center gap-2"
              title="Share Cart"
            >
              <Share2 className="w-5 h-5" />
              <span className="hidden sm:inline">Share</span>
            </button>
            
            <button
              onClick={clearCart}
              className="btn-outline text-red-600 dark:text-red-400 border-red-600 dark:border-red-400 flex items-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Clear All
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items List */}
            <div className="space-y-4">
              {cart.map((item) => {
                const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
                const itemTotal = price * item.quantity;
                
                return (
                  <div key={item.id} className="card p-6">
                    <div className="flex items-start gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 dark:from-gray-800 dark:to-gray-700 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package className="w-12 h-12 text-red-400 dark:text-red-500" />
                        )}
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                              {item.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{item.size}</p>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-xl font-bold text-red-600 dark:text-red-400">
                              {formatPrice(itemTotal)}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatPrice(price)} each
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                          {item.description || 'Authentic Korean product'}
                        </p>
                        
                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-xl transition-colors"
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              
                              <span className="w-12 text-center font-bold text-gray-900 dark:text-white">
                                {item.quantity}
                              </span>
                              
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-xl transition-colors"
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => saveForLater(item.id)}
                              className="btn-ghost text-sm flex items-center gap-2"
                            >
                              <Heart className="w-4 h-4" />
                              Save
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="btn-ghost text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Cart Summary & Delivery Info */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Delivery Progress */}
              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <Truck className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" />
                  <h3 className="font-bold text-lg">Free Delivery Progress</h3>
                </div>
                
                {!isFreeDelivery ? (
                  <>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-400">
                          Add {formatPrice(needsForFreeDelivery)} more for free delivery
                        </span>
                        <span className="font-medium">
                          {formatPrice(subtotal)} / {formatPrice(freeDeliveryThreshold)}
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-500"
                          style={{ width: `${(subtotal / freeDeliveryThreshold) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      You're {formatPrice(needsForFreeDelivery)} away from free Nairobi delivery!
                    </p>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Truck className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="font-bold text-green-600 dark:text-green-400">
                      🎉 Free Delivery Applied!
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Your order qualifies for free delivery
                    </p>
                  </div>
                )}
              </div>
              
              {/* Benefits */}
              <div className="card p-6">
                <h3 className="font-bold text-lg mb-4">Order Benefits</h3>
                <div className="space-y-3">
                  {[
                    { icon: Shield, text: 'Quality guaranteed products' },
                    { icon: Clock, text: 'Same-day delivery in Nairobi' },
                    { icon: Package, text: 'Carefully packaged' },
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                        <benefit.icon className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {benefit.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Order Summary & Checkout */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Order Summary */}
              <div className="card p-6">
                <h3 className="font-bold text-xl mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  Order Summary
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
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
                      {isFreeDelivery ? 'FREE' : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">Total</span>
                      <span className="text-3xl font-bold text-red-600 dark:text-red-400">
                        {formatPrice(finalTotal)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Including VAT (if applicable)
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Customer Info Form */}
              <div className="card p-6">
                <h3 className="font-bold text-lg mb-4">Delivery Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="input-primary w-full"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Delivery Address *
                    </label>
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="input-primary w-full h-24 resize-none"
                      placeholder="Enter complete delivery address"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                      className="input-primary w-full h-20 resize-none"
                      placeholder="Any special delivery instructions"
                    />
                  </div>
                </div>
              </div>
              
              {/* Checkout Actions */}
              <div className="space-y-4">
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || !customerName || !deliveryAddress}
                  className={`btn-primary w-full py-4 text-lg font-bold ${isCheckingOut ? 'btn-loading' : ''}`}
                >
                  {isCheckingOut ? 'Processing...' : 'Proceed to WhatsApp Order'}
                </button>
                
                <Link
                  to="/products"
                  className="btn-outline w-full py-4 text-center font-semibold flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Continue Shopping
                </Link>
                
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    By proceeding, you agree to our{' '}
                    <a href="#" className="text-red-600 dark:text-red-400 hover:underline">
                      Terms & Conditions
                    </a>
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    Need help? Call {COMPANY_CONFIG.contact.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};