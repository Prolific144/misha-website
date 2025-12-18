// MobileMenu.tsx - Updated with routing support
import React from 'react';
import { X, Home, Package, BookOpen, Info, Phone } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ label: string; href: string }>;
  onNavClick: (href: string) => void; // Updated signature
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
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 shadow-2xl transform transition-transform duration-300 ease-out">
        {/* Header remains the same */}
        
        {/* Navigation - Updated */}
        <div className="p-6">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = icons[item.label as keyof typeof icons] || Home;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    onNavClick(item.href);
                    onClose();
                  }}
                  className="flex items-center w-full px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 group hover:translate-x-1"
                >
                  <div className="p-2 mr-4 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors duration-300">
                    <Icon className="w-5 h-5 group-hover:text-red-600 dark:group-hover:text-red-400" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full"></div>
                  </div>
                </button>
              );
            })}
          </nav>
          
          {/* Rest of the menu remains the same */}
        </div>
      </div>
    </div>
  );
};