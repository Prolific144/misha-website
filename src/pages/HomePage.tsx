import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { FlashSalesSection } from '../components/FlashSalesSection';
import { CategoriesSection } from '../components/CategoriesSection';
import { ProductsSection } from '../components/ProductsSection';
import { ProductRecommendations } from '../components/ProductRecommendations';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { RecipesSection } from '../components/RecipesSection';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';
import { CartSidebar } from '../components/CartSidebar';
import { Footer } from '../components/Footer';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { useCart } from '../hooks/useCart';
import { COMPANY_CONFIG } from '../utils/companyConfig';
import { CookieConsent } from '../components/CookieConsent';

export const HomePage: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    totalItems,
    totalPrice
  } = useCart();

  // Add IDs to products
  const productsWithIds = COMPANY_CONFIG.products.map((product, index) => ({
    ...product,
    id: `p${index}`
  }));

  return (
    <div className="min-h-screen bg-light text-dark">
      <Header
        cartItemsCount={totalItems}
        onCartToggle={() => setIsCartOpen(true)}
      />
      
      <main>
        <section id="home">
          <Hero />
        </section>
        
        {/* Flash Sales Section */}
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
          <ProductsSection
            products={productsWithIds}
            onAddToCart={addToCart}
          />
        </section>
        
        {/* Product Recommendations Section */}
        <section id="recommendations" className="py-8 bg-white">
          <ProductRecommendations
            products={productsWithIds}
            recommendations={COMPANY_CONFIG.getRecommendations()}
            onAddToCart={addToCart}
          />
        </section>
        
        <section id="why-us" className="py-16">
          <WhyChooseUs />
        </section>
        
        <section id="recipes" className="py-16 bg-gray-50">
          <RecipesSection recipes={COMPANY_CONFIG.recipes} />
        </section>
        
        <section id="about" className="py-16">
          <AboutSection />
        </section>
        
        <section id="contact" className="py-16 bg-gray-50">
          <ContactSection />
        </section>
      </main>
      
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <WhatsAppFloat />
      
      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        totalPrice={totalPrice}
      />
	{/* Add Cookie Consent */}
    < CookieConsent />
    </div>
  );
};