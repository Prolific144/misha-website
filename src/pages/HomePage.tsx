// src/pages/HomePage.tsx
import React, { useState, lazy, Suspense } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { CartSidebar } from '../components/CartSidebar';
import { Footer } from '../components/Footer';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { CookieConsent } from '../components/CookieConsent';
import { useCart } from '../hooks/useCart';
import { COMPANY_CONFIG } from '../utils/companyConfig';

// Lazy load everything below the fold - FIXED: Properly handle named exports
const FlashSalesSection = lazy(() => 
  import('../components/FlashSalesSection').then(module => ({
    default: module.FlashSalesSection
  }))
);

const CategoriesSection = lazy(() => 
  import('../components/CategoriesSection').then(module => ({
    default: module.CategoriesSection
  }))
);

const ProductsSection = lazy(() => 
  import('../components/ProductsSection').then(module => ({
    default: module.ProductsSection
  }))
);

const ProductRecommendations = lazy(() => 
  import('../components/ProductRecommendations').then(module => ({
    default: module.ProductRecommendations
  }))
);

const WhyChooseUs = lazy(() => 
  import('../components/WhyChooseUs').then(module => ({
    default: module.WhyChooseUs
  }))
);

const RecipesSection = lazy(() => 
  import('../components/RecipesSection').then(module => ({
    default: module.RecipesSection
  }))
);

const AboutSection = lazy(() => 
  import('../components/AboutSection').then(module => ({
    default: module.AboutSection
  }))
);

const ContactSection = lazy(() => 
  import('../components/ContactSection').then(module => ({
    default: module.ContactSection
  }))
);

export const HomePage: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, addToCart, updateQuantity, removeFromCart, totalItems, totalPrice } = useCart();

  const productsWithIds = COMPANY_CONFIG.products.map((p, i) => ({ ...p, id: `p${i}` }));

  // Simple fallback while loading
  const LoadingFallback = () => (
    <div className="py-20 text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-light text-dark">
      <Header cartItemsCount={totalItems} onCartToggle={() => setIsCartOpen(true)} />

      <main>
        <section id="home"><Hero /></section>

        <Suspense fallback={<LoadingFallback />}>
          <section id="flash-sales" className="py-8 bg-gradient-to-b from-red-50 to-white">
            <FlashSalesSection
              products={productsWithIds}
              flashSales={COMPANY_CONFIG.getFlashSales()}
              onAddToCart={addToCart}
            />
          </section>

          <section id="categories" className="py-12">
            <CategoriesSection />
          </section>

          <section id="products" className="py-16 bg-gray-50">
            <ProductsSection products={productsWithIds} onAddToCart={addToCart} />
          </section>

          <section id="recommendations" className="py-8 bg-white">
            <ProductRecommendations
              products={productsWithIds}
              recommendations={COMPANY_CONFIG.getRecommendations()}
              onAddToCart={addToCart}
            />
          </section>

          <section id="why-us" className="py-16"><WhyChooseUs /></section>
          <section id="recipes" className="py-16 bg-gray-50">
            <RecipesSection recipes={COMPANY_CONFIG.recipes} />
          </section>
          <section id="about" className="py-16"><AboutSection /></section>
          <section id="contact" className="py-16 bg-gray-50"><ContactSection /></section>
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
    </div>
  );
};