// src/pages/HomePage.tsx
import React, { useState, lazy, Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/Hero';
import { CartSidebar } from '@/components/CartSidebar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { CookieConsent } from '@/components/CookieConsent';
import { CartPersistIndicator } from '@/components/CartPersistIndicator';
import { useCart } from '@/hooks/useCart';
import { PRODUCTS, getFeaturedProducts } from '@/config/products';
import { RECOMMENDATIONS } from '@/config/recommendations';
import { FLASH_SALES } from '@/config/sales';
import { RECIPES } from '@/config/recipes';

// Lazy load everything below the fold
const FlashSalesSection = lazy(() => 
  import('@/components/FlashSalesSection').then(module => ({
    default: module.FlashSalesSection
  }))
);

const CategoriesSection = lazy(() => 
  import('@/components/CategoriesSection').then(module => ({
    default: module.CategoriesSection
  }))
);

const ProductsSection = lazy(() => 
  import('@/components/ProductsSection').then(module => ({
    default: module.ProductsSection
  }))
);

const ProductRecommendations = lazy(() => 
  import('@/components/ProductRecommendations').then(module => ({
    default: module.ProductRecommendations
  }))
);

const WhyChooseUs = lazy(() => 
  import('@/components/WhyChooseUs').then(module => ({
    default: module.WhyChooseUs
  }))
);

const RecipesSection = lazy(() => 
  import('@/components/RecipesSection').then(module => ({
    default: module.RecipesSection
  }))
);

const AboutSection = lazy(() => 
  import('@/components/AboutSection').then(module => ({
    default: module.AboutSection
  }))
);

const ContactSection = lazy(() => 
  import('@/components/ContactSection').then(module => ({
    default: module.ContactSection
  }))
);

export const HomePage: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, updateQuantity, removeFromCart, totalItems, totalPrice } = useCart();

  // Get active flash sales
  const getActiveFlashSales = () => {
    const now = new Date();
    return FLASH_SALES.filter(sale => new Date(sale.endTime) > now);
  };

  // Simple fallback while loading
  const LoadingFallback = () => (
    <div className="py-20 text-center">
      <div className="loading-spinner"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">Loading delicious Korean products...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header cartItemsCount={totalItems} onCartToggle={() => setIsCartOpen(true)} />

      <main>
        <section id="home">
          <Hero />
        </section>

        <Suspense fallback={<LoadingFallback />}>
          <section id="flash-sales" className="py-8 bg-gradient-to-b from-red-50 to-white dark:from-red-900/10 dark:to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FlashSalesSection
                products={PRODUCTS}
                flashSales={getActiveFlashSales()}
              />
            </div>
          </section>

          <section id="categories" className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <CategoriesSection />
            </div>
          </section>

          <section id="products" className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProductsSection products={PRODUCTS} />
            </div>
          </section>

          <section id="recommendations" className="py-8 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProductRecommendations recommendations={RECOMMENDATIONS} />
            </div>
          </section>

          <section id="why-us" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <WhyChooseUs />
            </div>
          </section>
          
          <section id="recipes" className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RecipesSection recipes={RECIPES} />
            </div>
          </section>
          
          <section id="about" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AboutSection />
            </div>
          </section>
          
          <section id="contact" className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ContactSection />
            </div>
          </section>
        </Suspense>
      </main>

      <Footer />
      <WhatsAppFloat />
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        totalPrice={totalPrice}
      />
      <CookieConsent />
      <CartPersistIndicator />
    </div>
  );
};