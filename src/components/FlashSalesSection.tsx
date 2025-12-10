import React, { useState, useEffect } from 'react';
import { ShoppingCart, Clock, Zap, Flame, TrendingUp } from 'lucide-react';
import type { Product, FlashSale } from '../types';
import { useCart } from '../hooks/useCart';

interface FlashSalesSectionProps {
  products: Product[];
  flashSales: FlashSale[];
  onAddToCart: (product: Product) => void;
}

const CountdownTimer: React.FC<{ endTime: string }> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endTime).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        return { hours: 0, minutes: 0, seconds: 0, expired: true };
      }

      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        expired: false,
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [endTime]);

  if (timeLeft.expired) {
    return (
      <div className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold">
        Sale Ended
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center text-red-600 font-bold">
        <Clock className="w-4 h-4 mr-1" />
        <span className="text-sm">Ends in:</span>
      </div>
      <div className="flex space-x-2">
        <div className="text-center">
          <div className="bg-gray-900 text-white px-2 py-1 rounded-lg text-lg font-bold">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-gray-500 mt-1">Hours</div>
        </div>
        <div className="text-gray-900 text-lg font-bold pt-1">:</div>
        <div className="text-center">
          <div className="bg-gray-900 text-white px-2 py-1 rounded-lg text-lg font-bold">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-gray-500 mt-1">Minutes</div>
        </div>
        <div className="text-gray-900 text-lg font-bold pt-1">:</div>
        <div className="text-center">
          <div className="bg-gray-900 text-white px-2 py-1 rounded-lg text-lg font-bold">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-gray-500 mt-1">Seconds</div>
        </div>
      </div>
    </div>
  );
};

const ProgressBar: React.FC<{ sold: number; total: number }> = ({ sold, total }) => {
  const percentage = (sold / total) * 100;
  
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>Sold: {sold}/{total}</span>
        <span className="text-red-600 font-bold">{percentage.toFixed(0)}% sold</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export const FlashSalesSection: React.FC<FlashSalesSectionProps> = ({
  products,
  flashSales,
  onAddToCart,
}) => {
  const activeSales = flashSales.filter(sale => {
    const endTime = new Date(sale.endTime);
    return endTime > new Date();
  });

  if (activeSales.length === 0) return null;

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="p-2 bg-red-100 rounded-xl mr-3">
            <Zap className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Flash Sale
            </h2>
            <p className="text-gray-600 text-sm">
              Limited time offers. Don't miss out!
            </p>
          </div>
        </div>
        
        <div className="hidden md:block">
          <button className="flex items-center text-red-600 font-semibold hover:text-red-700">
            <Flame className="w-4 h-4 mr-2" />
            View All Deals
          </button>
        </div>
      </div>

      {/* Flash Sales Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeSales.map((sale) => {
          const product = getProductById(sale.productId);
          if (!product) return null;

          const originalPrice = parseFloat(sale.originalPrice.replace(/[^\d.]/g, ''));
          const salePrice = parseFloat(sale.salePrice.replace(/[^\d.]/g, ''));
          const savings = originalPrice - salePrice;

          return (
            <div
              key={sale.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-red-100"
            >
              {/* Sale Badge */}
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {sale.discountPercentage}% OFF
                </div>
              </div>

              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-red-50 to-orange-50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-red-500/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                      <ShoppingCart className="w-8 h-8 text-red-600 opacity-80" />
                    </div>
                    <p className="text-gray-900 font-bold text-lg leading-tight">
                      {product.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2">
                  {product.name}
                </h3>
                
                {/* Prices */}
                <div className="flex items-center mb-3">
                  <span className="text-2xl font-bold text-red-600">
                    KES {salePrice.toFixed(2)}
                  </span>
                  <span className="ml-3 text-gray-500 line-through">
                    KES {originalPrice.toFixed(2)}
                  </span>
                  <span className="ml-3 text-sm font-semibold text-green-600">
                    Save KES {savings.toFixed(2)}
                  </span>
                </div>

                <p className="text-gray-500 text-sm mb-4">{product.size}</p>

                {/* Progress Bar */}
                <ProgressBar sold={sale.sold} total={sale.quantity} />

                {/* Countdown Timer */}
                <div className="mt-4 mb-5">
                  <CountdownTimer endTime={sale.endTime} />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <div className="flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </div>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile View All Button */}
      <div className="mt-8 text-center md:hidden">
        <button className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-red-600 hover:text-white transition-all duration-300">
          View All Flash Deals
        </button>
      </div>
    </section>
  );
};