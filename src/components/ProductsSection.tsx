import React, { useState } from 'react';
import { ShoppingCart, Star, Filter, Check } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { ProductImage } from '@/components/ProductImage';
import { PRODUCT_CATEGORIES } from '@/config/products';
import { WishlistButton } from './WishlistButton';

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

interface ProductsSectionProps {
  products: Product[];
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
}) => {
  const { addToCart, isInCart, cart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get categories from PRODUCT_CATEGORIES
  const categories = ['all', ...Object.keys(PRODUCT_CATEGORIES)];
  
  const categoryLabels: Record<string, string> = {
    all: 'All Products',
    kimchi: 'Kimchi & Pickled Foods',
    ramen: 'Ramen & Instant Noodles',
    sauces: 'Sauces, Pastes & Seasonings',
    snacks: 'Korean Snacks & Cookies',
    beverages: 'Beverages & Alcohol',
    essentials: 'Cooking Essentials',
    seafood: 'Dried Seafood & Products',
    grains: 'Rice, Grains & Noodles',
    frozen: 'Frozen Foods & Dumplings',
    health: 'Health & Wellness',
    desserts: 'Desserts & Sweets',
    specialty: 'Specialty & Gourmet'
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            Our Products
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Authentic Korean groceries imported for you
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center mt-6 md:mt-0">
          <Filter className="w-5 h-5 mr-3 text-gray-500" />
          <div className="flex flex-wrap gap-3">
            {categories.slice(0, 8).map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white shadow-lg hover-lift'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md hover-lift'
                }`}
              >
                {categoryLabels[category] || category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 stagger-child">
        {filteredProducts.map((product, index) => {
          const inCart = isInCart(product.id);
          const cartItem = cart.find(item => item.id === product.id);
          
          const handleAddToCart = () => {
            addToCart({
              id: product.id,
              quantity: cartItem ? cartItem.quantity + 1 : 1,
            });
          };

          return (
            <article
              key={product.id}
              className="card-interactive group"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Product Image */}
              <div className="relative h-64 bg-gray-50 dark:bg-gray-900 overflow-hidden card-image-zoom">
                {product.featured && (
                  <div className="absolute top-3 left-3 z-10 badge-primary px-3 py-1.5 uppercase tracking-wider shadow-md">
                    Featured
                  </div>
                )}

                {/* Wishlist Button */}
                <div className="absolute top-3 right-3 z-10">
                  <WishlistButton product={product} size="sm" />
                </div>

                {/* Use ProductImage component */}
                <ProductImage
                  src={product.image || ''}
                  alt={product.name}
                  productName={product.name}
                  className="w-full h-full"
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  <div className="flex items-center ml-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">4.8</span>
                  </div>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">{product.size}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {product.price}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                      In stock
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`btn hover:scale-105 active:scale-95 ${inCart ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  >
                    {inCart ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        {cartItem?.quantity || 1}
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="text-center mt-16">
        <button className="btn-outline px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover-lift">
          View All Products
        </button>
      </div>
    </section>
  );
};