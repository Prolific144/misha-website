// src/components/SearchBar.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { COMPANY_CONFIG } from '../utils/companyConfig';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const products = COMPANY_CONFIG.products;
  const results = products
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 6);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  return (
    <>
      {/* Mobile Search Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 hover:bg-gray-100 rounded-full"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Desktop + Mobile Full Search */}
      <div className={`fixed md:static inset-0 z-50 md:z-auto ${isOpen ? 'block' : 'hidden md:block'}`}>
        <div className="bg-white md:bg-transparent px-4 pt-4 md:p-0">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search kimchi, ramen, gochujang..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-red-200 transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 absolute"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {query && results.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border overflow-hidden">
              {results.map(product => (
                <a
                  key={product.id}
                  href={`#products`}
                  onClick={() => {
                    setQuery('');
                    setIsOpen(false);
                    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center p-4 hover:bg-red-50 transition-colors"
                >
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mr-4" />
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.size} • {product.price}</div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </>
  );
};