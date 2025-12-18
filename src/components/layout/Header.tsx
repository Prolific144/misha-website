// Header.tsx
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Moon, Sun, Search } from 'lucide-react';
import { COMPANY_CONFIG } from '@utils/companyConfig';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { SearchBar } from '@/components/SearchBar';
import { useTheme } from '@context/ThemeContext';

interface HeaderProps {
  cartItemsCount: number;
  onCartToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartToggle }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
      <header className="sticky top-0 z-50 glass border-b border-gray-200/50 dark:border-gray-700/50 backdrop-blur-lg">
        {/* Container with better width control */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <a 
              href="#home" 
              className="flex items-center space-x-3 hover-lift group"
              onClick={(e) => handleNavClick(e, '#home')}
            >
              <div className="relative h-10 w-10 bg-gradient-to-br from-red-600 to-red-800 dark:from-red-500 dark:to-red-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <span className="text-white font-bold text-lg">{COMPANY_CONFIG.name.charAt(0)}</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <span className="text-gradient-primary text-xl font-bold tracking-tight">
                  {COMPANY_CONFIG.name}
                </span>
                <span className="block text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Authentic Korean Groceries
                </span>
              </div>
            </a>

            {/* Desktop Navigation - Better spacing */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="nav-link px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:bg-red-50/50 dark:hover:bg-red-950/20 group relative"
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-500 dark:from-red-500 dark:to-orange-400 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              ))}
            </nav>

            {/* Right Side Actions - Better spacing */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="btn-ghost btn-sm p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Button */}
              <button
                onClick={onCartToggle}
                className="relative btn-ghost p-2 rounded-full transition-all duration-300 hover:scale-105 group"
                aria-label="Shopping Cart"
              >
			  
                <ShoppingCart className="w-6 h-6 transition-transform group-hover:scale-110" />
                {cartItemsCount > 0 && (
                  <>
                    <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-600 to-red-800 dark:from-red-500 dark:to-red-700 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg animate-pulse-subtle">
                      {cartItemsCount}
                    </span>
                    <div className="absolute -inset-2 bg-red-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="btn-ghost p-2 rounded-full transition-all duration-300 hover:scale-105 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>

              {/* WhatsApp Button - Desktop */}
              <a
                href={COMPANY_CONFIG.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 5.44h-.003c-1.73-.033-3.42-.59-4.975-1.624l-.356-.214-3.695.982.99-3.597-.232-.358c-1.11-1.713-1.696-3.705-1.692-5.762.012-5.573 4.546-10.105 10.12-10.105 2.707.002 5.25 1.056 7.163 2.973 1.912 1.917 2.966 4.462 2.964 7.17-.004 5.573-4.548 10.105-10.12 10.105m8.652-17.663c-2.314-2.315-5.379-3.59-8.652-3.59-6.738 0-12.215 5.477-12.217 12.217 0 2.152.56 4.248 1.626 6.09l-1.725 6.278 6.377-1.673c1.736 1.047 3.685 1.602 5.662 1.602 6.738 0 12.215-5.477 12.217-12.217 0-3.27-1.275-6.334-3.59-8.652"/>
                </svg>
                <span className="font-semibold">WhatsApp</span>
              </a>

              {/* Mobile WhatsApp Icon */}
              <a
                href={COMPANY_CONFIG.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="lg:hidden btn-ghost p-2 rounded-full hover:bg-green-500/10 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden btn-ghost p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-red-600 dark:text-red-400" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar Dropdown */}
          {isSearchOpen && (
            <div className="animate-slide-down pb-4">
              <div className="relative">
                <SearchBar />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
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