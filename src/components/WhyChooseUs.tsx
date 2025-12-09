import React from 'react';
import { CheckCircle, Truck, Shield, Clock, Globe, Users } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Authentic Korean Products',
    description: 'Directly imported from Korea, ensuring authentic taste and quality',
  },
  {
    icon: Truck,
    title: 'Free Nairobi Delivery',
    description: 'Free delivery for orders above KES 2,000 within Nairobi',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'Fresh products with proper storage and handling standards',
  },
  {
    icon: Clock,
    title: 'Same Day Delivery',
    description: 'Orders placed before 2 PM delivered same day',
  },
  {
    icon: Users,
    title: 'Bulk Orders Welcome',
    description: 'Special prices for restaurants, hotels, and bulk purchases',
  },
  {
    icon: CheckCircle,
    title: 'Easy Ordering',
    description: 'Order via WhatsApp, phone, or visit our store',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Misha Foodstuffs?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We bring Korea to your kitchen with the best quality and service
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 text-primary rounded-2xl mb-6">
                <Icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};