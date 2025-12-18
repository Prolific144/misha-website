import React from 'react';
import { CheckCircle, Truck, Shield, Clock, Globe, Users } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Authentic Korean Products',
    description: 'Directly imported from Korea, ensuring authentic taste and quality',
    color: 'primary',
  },
  {
    icon: Truck,
    title: 'Free Nairobi Delivery',
    description: 'Free delivery for orders above KES 2,000 within Nairobi',
    color: 'accent',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'Fresh products with proper storage and handling standards',
    color: 'success',
  },
  {
    icon: Clock,
    title: 'Same Day Delivery',
    description: 'Orders placed before 2 PM delivered same day',
    color: 'warning',
  },
  {
    icon: Users,
    title: 'Bulk Orders Welcome',
    description: 'Special prices for restaurants, hotels, and bulk purchases',
    color: 'info',
  },
  {
    icon: CheckCircle,
    title: 'Easy Ordering',
    description: 'Order via WhatsApp, phone, or visit our store',
    color: 'primary',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: 'rgb(var(--color-on-surface))' }}
        >
          Why Choose Misha Foodstuffs?
        </h2>
        <p 
          className="max-w-2xl mx-auto text-lg"
          style={{ color: 'rgb(var(--color-on-surface-muted))' }}
        >
          We bring Korea to your kitchen with the best quality and service
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-child">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="hover-lift p-8 rounded-2xl border transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
                backgroundColor: 'rgb(var(--color-surface-elevated))',
                borderColor: 'rgb(var(--color-border))',
                color: 'rgb(var(--color-on-surface))',
              }}
            >
              <div 
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
                style={{
                  backgroundColor: `rgba(var(--color-${feature.color}), 0.1)`,
                  color: `rgb(var(--color-${feature.color}))`
                }}
              >
                <Icon className="w-7 h-7" />
              </div>
              
              <h3 
                className="text-xl font-bold mb-3"
                style={{ color: 'rgb(var(--color-on-surface))' }}
              >
                {feature.title}
              </h3>
              <p 
                className="text-base leading-relaxed"
                style={{ color: 'rgb(var(--color-on-surface-muted))' }}
              >
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Stats Section */}
      <div 
        className="mt-16 p-8 rounded-2xl border"
        style={{
          backgroundColor: 'rgb(var(--color-surface-elevated))',
          borderColor: 'rgb(var(--color-border))'
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '100+', label: 'Korean Products', color: 'primary' },
            { value: '500+', label: 'Happy Customers', color: 'accent' },
            { value: '98%', label: 'Satisfaction Rate', color: 'success' },
            { value: '24/7', label: 'Customer Support', color: 'info' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div 
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: `rgb(var(--color-${stat.color}))` }}
              >
                {stat.value}
              </div>
              <div 
                className="text-sm font-medium"
                style={{ color: 'rgb(var(--color-on-surface-muted))' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div 
        className="mt-12 p-8 rounded-2xl text-center border"
        style={{
          background: 'linear-gradient(135deg, rgba(var(--color-primary), 0.1) 0%, rgba(var(--color-accent), 0.1) 100%)',
          borderColor: 'rgb(var(--color-border))'
        }}
      >
        <h3 
          className="text-2xl font-bold mb-4"
          style={{ color: 'rgb(var(--color-on-surface))' }}
        >
          Ready to Experience Authentic Korean Flavors?
        </h3>
        <p 
          className="mb-6 max-w-2xl mx-auto text-lg"
          style={{ color: 'rgb(var(--color-on-surface-muted))' }}
        >
          Join our community of Korean food lovers and get the best ingredients delivered to your door.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#products"
            className="btn-primary px-8 py-3 rounded-xl font-semibold hover-lift"
          >
            Shop Now
          </a>
          <a
            href="tel:+254700000000"
            className="btn-outline px-8 py-3 rounded-xl font-semibold hover-lift"
          >
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
};