import React from 'react';
import { COMPANY_CONFIG } from '@utils/companyConfig';
import { Award, Users, Package, Globe } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: 'rgb(var(--color-on-surface))' }}
          >
            About <span style={{ color: 'rgb(var(--color-primary))' }}>{COMPANY_CONFIG.name}</span>
          </h2>
          <p 
            className="mb-4 leading-relaxed"
            style={{ color: 'rgb(var(--color-on-surface-muted))' }}
          >
            Founded with a passion for Korean cuisine and culture, Misha Foodstuffs 
            brings authentic Korean groceries to Nairobi. We are your trusted partner 
            for all Korean food ingredients, whether you're a home cook, restaurant, 
            or business.
          </p>
          <p 
            className="mb-6 leading-relaxed"
            style={{ color: 'rgb(var(--color-on-surface-muted))' }}
          >
            Our mission is to make Korean cooking accessible to everyone in Kenya. 
            We carefully select each product, ensuring it meets our high standards 
            for quality and authenticity.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { icon: Award, label: '3+', sub: 'Years Experience', color: 'red' },
              { icon: Users, label: '500+', sub: 'Happy Customers', color: 'orange' },
              { icon: Package, label: '100+', sub: 'Products', color: 'yellow' },
              { icon: Globe, label: '100%', sub: 'Authentic Korean', color: 'green' },
            ].map((item, index) => (
              <div 
                key={index}
                className="text-center p-4 rounded-xl border hover-lift"
                style={{
                  backgroundColor: 'rgb(var(--color-surface-elevated))',
                  borderColor: 'rgb(var(--color-border))',
                }}
              >
                <item.icon 
                  className="w-8 h-8 mx-auto mb-2" 
                  style={{ color: `rgb(var(--color-primary))` }}
                />
                <div 
                  className="text-2xl font-bold mb-1"
                  style={{ color: 'rgb(var(--color-primary))' }}
                >
                  {item.label}
                </div>
                <div style={{ color: 'rgb(var(--color-on-surface-muted))' }}>
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <div className="card-image-zoom rounded-2xl shadow-2xl dark:shadow-2xl dark:shadow-black/50 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="About Misha Foodstuffs"
              className="w-full h-96 object-cover"
            />
          </div>
          <div 
            className="absolute -bottom-4 -right-4 p-6 rounded-2xl shadow-xl border hover-lift"
            style={{
              backgroundColor: 'rgb(var(--color-surface-elevated))',
              borderColor: 'rgb(var(--color-border))',
              color: 'rgb(var(--color-on-surface))'
            }}
          >
            <div className="text-center">
              <div 
                className="text-xl font-bold mb-1"
                style={{ color: 'rgb(var(--color-primary))' }}
              >
                Korean Food Experts
              </div>
              <div style={{ color: 'rgb(var(--color-on-surface-muted))' }}>
                Serving Nairobi since 2021
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};