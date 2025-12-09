import React from 'react';

import { 
  ChefHat,
  Soup,
  Coffee,
  Candy,
  Wheat,
  Wine as Bottle,
  IceCream2 as IceCream,
  Pizza 
} from 'lucide-react';

const categories = [
  { icon: ChefHat, label: 'Kimchi', color: 'bg-red-100 text-red-600', count: 12 },
  { icon: Soup, label: 'Ramen & Noodles', color: 'bg-orange-100 text-orange-600', count: 8 },
  { icon: Coffee, label: 'Beverages', color: 'bg-amber-100 text-amber-600', count: 15 },
  { icon: Candy, label: 'Snacks', color: 'bg-green-100 text-green-600', count: 20 },
  { icon: Wheat, label: 'Sauces & Pastes', color: 'bg-blue-100 text-blue-600', count: 10 },
  { icon: Bottle, label: 'Cooking Essentials', color: 'bg-purple-100 text-purple-600', count: 18 },
];

export const CategoriesSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop By Category</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of authentic Korean products organized for easy browsing
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <a
              key={category.label}
              href="#products"
              className={`group relative p-6 rounded-2xl ${category.color} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center">
                <div className="mb-4">
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="font-semibold mb-2">{category.label}</h3>
                <span className="text-sm opacity-75">{category.count} items</span>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white rounded-2xl transition-all duration-300"></div>
            </a>
          );
        })}
      </div>
    </div>
  );
};