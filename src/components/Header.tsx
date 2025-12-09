import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_CONFIG } from '../utils/companyConfig';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  cartItemsCount: number;
  onCartToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartToggle }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Products', href: '#products' },
    { label: 'Recipes', href: '#recipes' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="#home" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-primary">{COMPANY_CONFIG.name}</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Cart & Contact */}
            <div className="flex items-center space-x-3">
              <button
                onClick={onCartToggle}
                className="relative p-2 text-gray-700 hover:text-primary transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              <a
                href={COMPANY_CONFIG.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-md transition-all hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 5.44h-.003c-1.73-.033-3.42-.59-4.975-1.624l-.356-.214-3.695.982.99-3.597-.232-.358c-1.11-1.713-1.696-3.705-1.692-5.762.012-5.573 4.546-10.105 10.12-10.105 2.707.002 5.25 1.056 7.163 2.973 1.912 1.917 2.966 4.462 2.964 7.17-.004 5.573-4.548 10.105-10.12 10.105m8.652-17.663c-2.314-2.315-5.379-3.59-8.652-3.59-6.738 0-12.215 5.477-12.217 12.217 0 2.152.56 4.248 1.626 6.09l-1.725 6.278 6.377-1.673c1.736 1.047 3.685 1.602 5.662 1.602 6.738 0 12.215-5.477 12.217-12.217 0-3.27-1.275-6.334-3.59-8.652"/>
                </svg>
                <span className="font-medium hidden sm:inline">WhatsApp</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        onNavClick={handleNavClick}
      />
    </>
  );
};