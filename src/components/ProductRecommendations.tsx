import React, { useState } from 'react';
import { ShoppingCart, Package, Users, TrendingUp, Sparkles, Check } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { getProductsByIds, getProductById } from '@/config/products';
import { formatPrice } from '@/utils/helpers';

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

interface Recommendation {
  id: string;
  title: string;
  type: 'complementary' | 'frequently_bought' | 'trending' | 'bundle' | 'seasonal';
  productIds: string[];
  description: string;
  discount?: number;
  image?: string;
}

interface ProductRecommendationsProps {
  recommendations: Recommendation[];
  currentProductId?: string;
}

const RecommendationBadge: React.FC<{ type: string }> = ({ type }) => {
  const badgeConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
    complementary: {
      label: 'Goes Well With',
      icon: <Package className="w-3 h-3" />,
      color: 'badge badge-secondary',
    },
    frequently_bought: {
      label: 'Frequently Bought Together',
      icon: <Users className="w-3 h-3" />,
      color: 'badge badge-success',
    },
    trending: {
      label: 'Trending Now',
      icon: <TrendingUp className="w-3 h-3" />,
      color: 'badge badge-primary',
    },
    bundle: {
      label: 'Special Bundle',
      icon: <Sparkles className="w-3 h-3" />,
      color: 'badge badge-warning',
    },
    seasonal: {
      label: 'Seasonal Special',
      icon: <Sparkles className="w-3 h-3" />,
      color: 'badge badge-primary',
    },
  };

  const config = badgeConfig[type] || badgeConfig.complementary;

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
      {config.icon}
      <span className="ml-1">{config.label}</span>
    </div>
  );
};

export const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  recommendations,
  currentProductId,
}) => {
  const { addToCart, isInCart } = useCart();
  const [activeTab, setActiveTab] = useState(0);
  
  // Filter out current product from recommendations if provided
  const filteredRecommendations = currentProductId
    ? recommendations.filter(rec => !rec.productIds.includes(currentProductId))
    : recommendations;

  if (filteredRecommendations.length === 0) return null;

  const getProductsFromIds = (productIds: string[]) => {
    return getProductsByIds(productIds);
  };

  const handleAddAllToCart = (productIds: string[], e: React.MouseEvent) => {
    e.stopPropagation();
    productIds.forEach(productId => {
      addToCart({ id: productId, quantity: 1 });
    });
  };

  const renderRecommendation = (recommendation: Recommendation, index: number) => {
    const recProducts = getProductsFromIds(recommendation.productIds);
    
    if (recProducts.length === 0) return null;

    return (
      <div
        key={recommendation.id}
        className={`card-interactive p-6 cursor-pointer ${
          activeTab === index
            ? 'border-2 border-red-100 dark:border-red-900/30'
            : 'border border-gray-200 dark:border-gray-700'
        }`}
        onClick={() => setActiveTab(index)}
      >
        {/* Badge */}
        <div className="mb-4">
          <RecommendationBadge type={recommendation.type} />
        </div>

        {/* Title & Description */}
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
          {recommendation.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-5">
          {recommendation.description}
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {recProducts.slice(0, 4).map((product) => {
            const inCart = isInCart(product.id);
            
            return (
              <div 
                key={product.id} 
                className="card-minimal p-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mr-3">
                  {inCart ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <ShoppingCart className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatPrice(parseFloat(product.price.replace(/[^\d.]/g, '')))}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={(e) => handleAddAllToCart(recProducts.map(p => p.id), e)}
            className="btn-primary flex-1 py-2.5 text-sm"
          >
            Add All to Cart
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Navigate to bundle page or show details
            }}
            className="btn-outline px-4 py-2.5 text-sm"
          >
            View Bundle
          </button>
        </div>
      </div>
    );
  };

  // If we have a current product, show complementary products
  if (currentProductId) {
    const currentProduct = getProductById(currentProductId);
    const complementaryRec = filteredRecommendations.find(
      rec => rec.type === 'complementary' && rec.productIds.length === 1
    );

    if (!complementaryRec || !currentProduct) return null;

    const product = getProductById(complementaryRec.productIds[0]);
    if (!product) return null;

    const inCart = isInCart(product.id);

    return (
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Package className="w-5 h-5 mr-2 text-red-600 dark:text-red-400" />
          Frequently Bought Together
        </h3>
        <div className="card p-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mr-4">
            {inCart ? (
              <Check className="w-8 h-8 text-white" />
            ) : (
              <ShoppingCart className="w-8 h-8 text-white" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{product.size}</p>
          </div>
          <div className="text-right mr-4">
            <p className="text-lg font-bold text-red-600 dark:text-red-400">{product.price}</p>
            <p className="text-xs text-green-600 dark:text-green-400">In stock</p>
          </div>
          <button
            onClick={() => addToCart({ id: product.id, quantity: 1 })}
            className={`btn ${inCart ? 'bg-green-600 hover:bg-green-700' : ''}`}
          >
            {inCart ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    );
  }

  // Show all recommendations
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Recommended For You
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Smart picks based on popular combinations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecommendations.slice(0, 4).map((recommendation, index) =>
          renderRecommendation(recommendation, index)
        )}
      </div>
    </section>
  );
};