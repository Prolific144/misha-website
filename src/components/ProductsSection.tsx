import React, { useState } from 'react';
import { ShoppingCart, Star, Filter } from 'lucide-react';
import type { Product } from '@/types'; // Clean alias (or use '../types' if no alias)

interface ProductsSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'kimchi', 'ramen', 'sauces', 'snacks', 'beverages'];
  const categoryLabels: Record<string, string> = {
    all: 'All Products',
    kimchi: 'Kimchi',
    ramen: 'Ramen & Noodles',
    sauces: 'Sauces & Pastes',
    snacks: 'Snacks',
    beverages: 'Beverages',
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  // Local fallback image component (works offline, fast, beautiful)
  const ProductImageFallback = ({ name }: { name: string }) => (
    <div className="relative w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-3 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
          <ShoppingCart className="w-10 h-10 text-white opacity-80" />
        </div>
        <p className="text-white font-bold text-lg leading-tight line-clamp-3">
          {name}
        </p>
      </div>
      <div className="absolute inset-0 bg-black/10"></div>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Our Products</h2>
          <p className="text-gray-600">Authentic Korean groceries imported for you</p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center mt-6 md:mt-0">
          <Filter className="w-5 h-5 mr-3 text-gray-500" />
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product, index) => (
          <article
            key={product.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* Product Image */}
            <div className="relative h-64 bg-gray-50 overflow-hidden">
              {product.featured && (
                <div className="absolute top-3 left-3 z-10 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                  Featured
                </div>
              )}

              {/* Replace external placeholder with local fallback */}
              <ProductImageFallback name={product.name} />

              {/* Optional: Real image overlay when you add actual photos later */}
              {/* <img
                src={product.image || ''}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              /> */}
            </div>

            {/* Product Info */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                <div className="flex items-center ml-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-700 ml-1">4.8</span>
                </div>
              </div>

              <p className="text-gray-500 text-sm mb-5">{product.size}</p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-red-600">{product.price}</div>
                  <div className="text-xs text-green-600 font-medium mt-1">In stock</div>
                </div>

                <button
                  onClick={() => onAddToCart(product)}
                  className="flex items-center bg-red-600 text-white px-5 py-3 rounded-full font-semibold hover:bg-red-700 hover:shadow-lg transition-all duration-200 group-hover:scale-105 active:scale-95"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-16">
        <button className="border-2 border-red-600 text-red-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
          View All Products
        </button>
      </div>
    </section>
  );
};