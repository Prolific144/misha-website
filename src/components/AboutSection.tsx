import React from 'react';
import { COMPANY_CONFIG } from '../utils/companyConfig';
import { Award, Users, Package, Globe } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About <span className="text-primary">{COMPANY_CONFIG.name}</span>
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Founded with a passion for Korean cuisine and culture, Misha Foodstuffs 
            brings authentic Korean groceries to Nairobi. We are your trusted partner 
            for all Korean food ingredients, whether you're a home cook, restaurant, 
            or business.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Our mission is to make Korean cooking accessible to everyone in Kenya. 
            We carefully select each product, ensuring it meets our high standards 
            for quality and authenticity.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <Award className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary mb-1">3+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary mb-1">500+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <Package className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary mb-1">100+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary mb-1">100%</div>
              <div className="text-gray-600">Authentic Korean</div>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="About Misha Foodstuffs"
            className="rounded-2xl shadow-xl w-full h-96 object-cover"
          />
          <div className="absolute -bottom-4 -right-4 bg-white p-6 rounded-2xl shadow-xl">
            <div className="text-center">
              <div className="text-xl font-bold text-primary mb-1">Korean Food Experts</div>
              <div className="text-gray-600 text-sm">Serving Nairobi since 2021</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};