import React from 'react';
import { ArrowRight, ChefHat, Shield, Truck } from 'lucide-react';
import { COMPANY_CONFIG } from '@utils/companyConfig';

export const Hero: React.FC = () => {
  return (
    <div 
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgb(var(--color-surface)) 0%, rgba(var(--color-surface-elevated), 0.8) 100%)'
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <div 
              className="inline-flex items-center mb-4 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: 'rgba(var(--color-primary), 0.1)',
                color: 'rgb(var(--color-primary))'
              }}
            >
              <ChefHat className="w-4 h-4 mr-2" />
              <span>Authentic Korean Taste</span>
            </div>
            
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: 'rgb(var(--color-on-surface))' }}
            >
              <span style={{ color: 'rgb(var(--color-primary))' }}>Authentic</span> Korean
              <br />
              <span style={{ color: 'rgb(var(--color-accent))' }}>Groceries</span> in Nairobi
            </h1>
            
            <p 
              className="text-lg mb-8 leading-relaxed"
              style={{ color: 'rgb(var(--color-on-surface-muted))' }}
            >
              {COMPANY_CONFIG.heroSubtitle}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#products"
                className="btn-primary inline-flex items-center hover-lift"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href={COMPANY_CONFIG.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center hover-lift"
              >
                Order via WhatsApp
              </a>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center" style={{ color: 'rgb(var(--color-on-surface-muted))' }}>
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                  style={{
                    backgroundColor: 'rgba(var(--color-primary), 0.1)',
                    color: 'rgb(var(--color-primary))'
                  }}
                >
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Free Delivery in Nairobi</span>
              </div>
              <div className="flex items-center" style={{ color: 'rgb(var(--color-on-surface-muted))' }}>
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                  style={{
                    backgroundColor: 'rgba(var(--color-accent), 0.1)',
                    color: 'rgb(var(--color-accent))'
                  }}
                >
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Quality Guaranteed</span>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative animate-slide-up">
            <div className="relative">
              <div className="card-image-zoom rounded-2xl shadow-2xl dark:shadow-2xl dark:shadow-black/50">
                <img
                  src="https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Korean Food Display"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div 
                className="absolute -bottom-6 -left-6 p-6 rounded-2xl border hover-lift"
                style={{
                  backgroundColor: 'rgb(var(--color-surface-elevated))',
                  borderColor: 'rgb(var(--color-border))',
                  color: 'rgb(var(--color-on-surface))'
                }}
              >
                <div className="text-center">
                  <div 
                    className="text-3xl font-bold mb-1"
                    style={{ color: 'rgb(var(--color-primary))' }}
                  >
                    100+
                  </div>
                  <div style={{ color: 'rgb(var(--color-on-surface-muted))' }}>
                    Korean Products
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};