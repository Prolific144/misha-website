import React, { useState } from 'react';
import { ShoppingCart, Package, Users, Star, TrendingUp, Sparkles } from 'lucide-react';
import type { Product, Recommendation } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductRecommendationsProps {
  products: Product[];
  recommendations: Recommendation[];
  onAddToCart: (product: Product) => void;
  currentProductId?: string;
}

const RecommendationBadge: React.FC<{ type: string }> = ({ type }) => {
  const badgeConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
    complementary: {
      label: 'Goes Well With',
      icon: <Package className="w-3 h-3" />,
      color: 'bg-blue-100 text-blue-600',
    },
    frequently_bought: {
      label: 'Frequently Bought Together',
      icon: <Users className="w-3 h-3" />,
      color: 'bg-green-100 text-green-600',
    },
    trending: {
      label: 'Trending Now',
      icon: <TrendingUp className="w-3 h-3" />,
      color: 'bg-purple-100 text-purple-600',
    },
    bundle: {
      label: 'Special Bundle',
      icon: <Sparkles className="w-3 h-3" />,
      color: 'bg-amber-100 text-amber-600',
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
  products,
  recommendations,
  onAddToCart,
  currentProductId,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Filter out current product from recommendations if provided
  const filteredRecommendations = currentProductId
    ? recommendations.filter(rec => !rec.productIds.includes(currentProductId))
    : recommendations;

  if (filteredRecommendations.length === 0) return null;

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  const getProductsFromIds = (productIds: string[]) => {
    return productIds.map(id => getProductById(id)).filter(Boolean) as Product[];
  };

  const renderRecommendation = (recommendation: Recommendation, index: number) => {
    const recProducts = getProductsFromIds(recommendation.productIds);
    
    if (recProducts.length === 0) return null;

    return (
      <div
        key={recommendation.id}
        className={`p-6 rounded-2xl transition-all duration-300 ${
          activeTab === index
            ? 'bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-100'
            : 'bg-white hover:bg-gray-50 border border-gray-200'
        }`}
        onClick={() => setActiveTab(index)}
      >
        {/* Badge */}
        <div className="mb-4">
          <RecommendationBadge type={recommendation.type} />
        </div>

        {/* Title & Description */}
        <h3 className="font-bold text-lg mb-2 text-gray-900">
          {recommendation.title}
        </h3>
        <p className="text-gray-600 text-sm mb-5">
          {recommendation.description}
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {recProducts.slice(0, 4).map((product) => (
            <div key={product.id} className="flex items-center p-3 bg-white rounded-xl border">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mr-3">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              recProducts.forEach(product => onAddToCart(product));
            }}
            className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-semibold hover:bg-red-700 transition-colors text-sm"
          >
            Add All to Cart
          </button>
          <button className="px-4 py-2.5 border border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors text-sm">
            View Bundle
          </button>
        </div>
      </div>
    );
  };

  // If we have a current product, show complementary products
  if (currentProductId) {
    const complementaryRec = filteredRecommendations.find(
      rec => rec.type === 'complementary' && rec.productIds.length === 1
    );

    if (!complementaryRec) return null;

    const product = getProductById(complementaryRec.productIds[0]);
    if (!product) return null;

    return (
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Package className="w-5 h-5 mr-2 text-red-600" />
          Frequently Bought Together
        </h3>
        <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mr-4">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{product.name}</p>
            <p className="text-sm text-gray-500">{product.size}</p>
          </div>
          <div className="text-right mr-4">
            <p className="text-lg font-bold text-red-600">{product.price}</p>
            <p className="text-xs text-green-600">In stock</p>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Add to Cart
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Recommended For You
          </h2>
          <p className="text-gray-600">
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