// MobileMenu.tsx - Updated with enhanced color system
import React from 'react';
import { X, Home, Package, BookOpen, Info, Phone } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ label: string; href: string }>;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  onNavClick,
}) => {
  const icons = {
    'Home': Home,
    'Products': Package,
    'Recipes': BookOpen,
    'About': Info,
    'Contact': Phone,
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Menu with enhanced design */}
      <div className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 shadow-2xl border-l border-gray-200/50 dark:border-gray-700/50 transform transition-transform duration-300 ease-out">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gradient-primary">Menu</h3>
            <button
              onClick={onClose}
              className="btn-ghost p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors duration-200 hover:scale-110"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          
          {/* User info or greeting */}
          <div className="flex items-center space-x-3 p-3 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl">
            <div className="h-10 w-10 bg-gradient-to-br from-red-600 to-red-800 dark:from-red-500 dark:to-red-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">U</span>
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">Welcome!</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Browse our selection</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = icons[item.label as keyof typeof icons] || Home;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    onNavClick(e, item.href);
                    onClose();
                  }}
                  className="flex items-center px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 group hover:translate-x-1"
                >
                  <div className="p-2 mr-4 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors duration-300">
                    <Icon className="w-5 h-5 group-hover:text-red-600 dark:group-hover:text-red-400" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full"></div>
                  </div>
                </a>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-600 dark:text-gray-400 mb-4 px-4">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="btn-outline py-3 rounded-lg text-sm font-medium">
                Track Order
              </button>
              <button className="btn-primary py-3 rounded-lg text-sm font-medium">
                Shop Now
              </button>
            </div>
          </div>

          {/* Contact Info in Mobile Menu */}
          <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Need help?</p>
            <a 
              href="tel:+254700000000"
              className="text-red-600 dark:text-red-400 font-semibold text-lg"
            >
              +254 700 000 000
            </a>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              24/7 Customer Support
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => {
                document.documentElement.classList.toggle('dark');
                onClose();
              }}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <span className="text-sm font-medium">Theme</span>
            </button>
            
            <button 
              onClick={onClose}
              className="btn-primary px-6 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};