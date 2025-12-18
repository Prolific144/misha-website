import React, { useState, useEffect } from 'react';
import { ShoppingCart, Clock, Zap, Flame, TrendingUp } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { ProductImage } from '@/components/ProductImage';
import { parsePrice, formatPrice } from '@/utils/helpers';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  size: string;
  featured?: boolean;
  image?: string;
  imageSource?: 'local' | 'unsplash' | 'placeholder';
  description?: string;
}

interface FlashSale {
  id: string;
  productId: string;
  originalPrice: string;
  salePrice: string;
  discountPercentage: number;
  endTime: string;
  quantity: number;
  sold: number;
  featured?: boolean;
}

interface FlashSalesSectionProps {
  products: Product[];
  flashSales: FlashSale[];
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
      <div 
        className="px-3 py-1 text-xs font-bold rounded-full"
        style={{
          backgroundColor: 'rgba(var(--color-error), 0.1)',
          color: 'rgb(var(--color-error))'
        }}
      >
        Sale Ended
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div 
        className="flex items-center font-bold"
        style={{ color: 'rgb(var(--color-primary))' }}
      >
        <Clock className="w-4 h-4 mr-1" />
        <span className="text-sm">Ends in:</span>
      </div>
      <div className="flex space-x-2">
        {[
          { value: timeLeft.hours, label: 'Hours' },
          { value: timeLeft.minutes, label: 'Minutes' },
          { value: timeLeft.seconds, label: 'Seconds' }
        ].map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <div 
              className="text-lg font-bold pt-1"
              style={{ color: 'rgb(var(--color-on-surface))' }}
            >:</div>}
            <div className="text-center">
              <div 
                className="px-2 py-1 rounded-lg text-lg font-bold"
                style={{
                  backgroundColor: 'rgb(var(--color-surface))',
                  color: 'rgb(var(--color-on-surface))'
                }}
              >
                {item.value.toString().padStart(2, '0')}
              </div>
              <div 
                className="text-xs mt-1"
                style={{ color: 'rgb(var(--color-on-surface-muted))' }}
              >
                {item.label}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ProgressBar: React.FC<{ sold: number; total: number }> = ({ sold, total }) => {
  const percentage = (sold / total) * 100;
  
  return (
    <div className="mt-3">
      <div 
        className="flex justify-between text-xs mb-1"
        style={{ color: 'rgb(var(--color-on-surface-muted))' }}
      >
        <span>Sold: {sold}/{total}</span>
        <span 
          className="font-bold"
          style={{ color: 'rgb(var(--color-primary))' }}
        >
          {percentage.toFixed(0)}% sold
        </span>
      </div>
      <div 
        className="w-full rounded-full h-2"
        style={{ backgroundColor: 'rgba(var(--color-border), 0.3)' }}
      >
        <div 
          className="h-2 rounded-full transition-all duration-500"
          style={{
            width: `${Math.min(percentage, 100)}%`,
            background: 'linear-gradient(90deg, rgb(var(--color-primary)), rgb(var(--color-accent)))'
          }}
        ></div>
      </div>
    </div>
  );
};

export const FlashSalesSection: React.FC<FlashSalesSectionProps> = ({
  products,
  flashSales,
}) => {
  const { addToCart } = useCart();
  
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
          <div 
            className="p-2 rounded-xl mr-3"
            style={{
              backgroundColor: 'rgba(var(--color-primary), 0.1)',
              color: 'rgb(var(--color-primary))'
            }}
          >
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 
              className="text-2xl md:text-3xl font-bold"
              style={{ color: 'rgb(var(--color-on-surface))' }}
            >
              Flash Sale
            </h2>
            <p 
              className="text-sm"
              style={{ color: 'rgb(var(--color-on-surface-muted))' }}
            >
              Limited time offers. Don't miss out!
            </p>
          </div>
        </div>
        
        <div className="hidden md:block">
          <button 
            className="flex items-center font-semibold hover-lift"
            style={{ color: 'rgb(var(--color-primary))' }}
          >
            <Flame className="w-4 h-4 mr-2" />
            View All Deals
          </button>
        </div>
      </div>

      {/* Flash Sales Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-child">
        {activeSales.map((sale, index) => {
          const product = getProductById(sale.productId);
          if (!product) return null;

          const originalPrice = parsePrice(sale.originalPrice);
          const salePrice = parsePrice(sale.salePrice);
          const savings = originalPrice - salePrice;

          const handleAddToCart = () => {
            addToCart({
              id: product.id,
              quantity: 1,
            });
          };

          return (
            <div
              key={sale.id}
              className="card-interactive border-2 hover-lift"
              style={{ 
                animationDelay: `${index * 100}ms`,
                borderColor: 'rgba(var(--color-primary), 0.2)',
                backgroundColor: 'rgb(var(--color-surface-elevated))'
              }}
            >
              {/* Sale Badge */}
              <div className="absolute top-3 left-3 z-10">
                <div 
                  className="px-3 py-1 flex items-center rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: 'rgba(var(--color-primary), 0.1)',
                    color: 'rgb(var(--color-primary))'
                  }}
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {sale.discountPercentage}% OFF
                </div>
              </div>

              {/* Product Image */}
              <div className="relative h-48 overflow-hidden card-image-zoom">
                <ProductImage
                  src={product.image || ''}
                  alt={product.name}
                  productName={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 
                  className="font-bold text-lg line-clamp-2 mb-2"
                  style={{ color: 'rgb(var(--color-on-surface))' }}
                >
                  {product.name}
                </h3>
                
                {/* Prices */}
                <div className="flex items-center mb-3">
                  <span 
                    className="text-2xl font-bold"
                    style={{ color: 'rgb(var(--color-primary))' }}
                  >
                    {formatPrice(salePrice)}
                  </span>
                  <span 
                    className="ml-3 line-through"
                    style={{ color: 'rgb(var(--color-on-surface-muted))' }}
                  >
                    {formatPrice(originalPrice)}
                  </span>
                  <span 
                    className="ml-3 text-sm font-semibold"
                    style={{ color: 'rgb(var(--color-success))' }}
                  >
                    Save {formatPrice(savings)}
                  </span>
                </div>

                <p 
                  className="text-sm mb-4"
                  style={{ color: 'rgb(var(--color-on-surface-muted))' }}
                >
                  {product.size}
                </p>

                {/* Progress Bar */}
                <ProgressBar sold={sale.sold} total={sale.quantity} />

                {/* Countdown Timer */}
                <div className="mt-4 mb-5">
                  <CountdownTimer endTime={sale.endTime} />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddToCart}
                    className="btn-primary flex-1 py-3 hover:scale-[1.02] active:scale-95"
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
        <button className="btn-outline px-8 py-3 rounded-full font-semibold">
          View All Flash Deals
        </button>
      </div>
    </section>
  );
};