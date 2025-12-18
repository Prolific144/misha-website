import React from 'react';
import { 
  ChefHat,
  Soup,
  Coffee,
  Candy,
  Wheat,
  Wine as Bottle
} from 'lucide-react';

const categories = [
  { 
    icon: ChefHat, 
    label: 'Kimchi', 
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    textColor: 'text-red-600 dark:text-red-400',
    borderColor: 'border-red-200 dark:border-red-800',
    count: 12 
  },
  { 
    icon: Soup, 
    label: 'Ramen & Noodles', 
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    textColor: 'text-orange-600 dark:text-orange-400',
    borderColor: 'border-orange-200 dark:border-orange-800',
    count: 8 
  },
  { 
    icon: Coffee, 
    label: 'Beverages', 
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    textColor: 'text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-200 dark:border-amber-800',
    count: 15 
  },
  { 
    icon: Candy, 
    label: 'Snacks', 
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-600 dark:text-green-400',
    borderColor: 'border-green-200 dark:border-green-800',
    count: 20 
  },
  { 
    icon: Wheat, 
    label: 'Sauces & Pastes', 
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-200 dark:border-blue-800',
    count: 10 
  },
  { 
    icon: Bottle, 
    label: 'Cooking Essentials', 
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    textColor: 'text-purple-600 dark:text-purple-400',
    borderColor: 'border-purple-200 dark:border-purple-800',
    count: 18 
  },
];

export const CategoriesSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Shop By Category</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore our wide range of authentic Korean products organized for easy browsing
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 stagger-child">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <a
              key={category.label}
              href="#products"
              className={`group card-interactive p-6 ${category.bgColor} hover-lift text-center`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center">
                <div className={`mb-4 p-3 ${category.bgColor.replace('bg-', 'bg-').replace('/30', '/50')} rounded-xl`}>
                  <Icon className={`w-10 h-10 ${category.textColor}`} />
                </div>
                <h3 className={`font-semibold mb-2 ${category.textColor}`}>{category.label}</h3>
                <span className={`text-sm opacity-75 ${category.textColor.replace('text-', 'text-').replace('-400', '-300')}`}>
                  {category.count} items
                </span>
              </div>
              
              {/* Hover effect */}
              <div className={`absolute inset-0 border-2 border-transparent group-hover:border-white dark:group-hover:border-gray-800 rounded-2xl transition-all duration-300`}></div>
            </a>
          );
        })}
      </div>
    </div>
  );
};