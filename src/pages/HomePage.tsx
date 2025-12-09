import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ProductsSection } from '../components/ProductsSection';
import { CategoriesSection } from '../components/CategoriesSection';
import { RecipesSection } from '../components/RecipesSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';
import { CartSidebar } from '../components/CartSidebar';
import { Footer } from '../components/Footer';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { useCart } from '../hooks/useCart';
import { COMPANY_CONFIG } from '../utils/companyConfig';

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
        
        <section id="categories" className="py-12">
          <CategoriesSection />
        </section>
        
        <section id="products" className="py-16 bg-gray-50">
          <ProductsSection
            products={productsWithIds}
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
    </div>
  );
};