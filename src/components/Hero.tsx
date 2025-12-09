import React from 'react';
import { ArrowRight, ChefHat, Shield, Truck } from 'lucide-react';
import { COMPANY_CONFIG } from '../utils/companyConfig';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fadeIn">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
              <ChefHat className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Authentic Korean Taste</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-primary">Authentic</span> Korean
              <br />
              <span className="text-accent">Groceries</span> in Nairobi
            </h1>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {COMPANY_CONFIG.heroSubtitle}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#products"
                className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-all hover:scale-105 shadow-lg"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href={COMPANY_CONFIG.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border-2 border-primary text-primary px-6 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition-all"
              >
                Order via WhatsApp
              </a>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center">
                <Truck className="w-5 h-5 text-primary mr-2" />
                <span className="text-sm">Free Delivery in Nairobi</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-primary mr-2" />
                <span className="text-sm">Quality Guaranteed</span>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative animate-slideUp">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Korean Food Display"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">100+</div>
                  <div className="text-gray-600">Korean Products</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};