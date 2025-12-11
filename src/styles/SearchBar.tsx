import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { COMPANY_CONFIG } from '../utils/companyConfig';
import Fuse from 'fuse.js';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const products = COMPANY_CONFIG.products.map((p, i) => ({ ...p, id: `p${i}` }));

  // Initialize Fuse.js for fuzzy search
  const fuse = new Fuse(products, {
    keys: ['name', 'category'],
    threshold: 0.3,
    includeScore: true,
  });

  // Debounce search input
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const results = React.useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return fuse.search(debouncedQuery)
      .map(result => result.item)
      .slice(0, 6);
  }, [debouncedQuery, fuse]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      // Prevent body scroll on mobile
      if (window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleResultClick = useCallback((productId: string) => {
    setQuery('');
    setIsOpen(false);
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Optional: Highlight the selected product
      const productElement = document.querySelector(`[data-product-id="${productId}"]`);
      if (productElement) {
        productElement.classList.add('ring-4', 'ring-red-300', 'dark:ring-red-700');
        setTimeout(() => {
          productElement.classList.remove('ring-4', 'ring-red-300', 'dark:ring-red-700');
        }, 2000);
      }
    }
  }, []);

  return (
    <>
      {/* Mobile Search Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        aria-label="Open search"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Desktop + Mobile Full Search */}
      <div className={`fixed md:static inset-0 z-50 md:z-auto ${isOpen ? 'block' : 'hidden md:block'}`}>
        <div className="bg-white dark:bg-gray-800 md:bg-transparent px-4 pt-4 md:p-0">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search kimchi, ramen, gochujang..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-gray-100 dark:bg-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 transition-all dark:placeholder-gray-500"
              aria-label="Search products"
            />
            {isLoading ? (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
              </div>
            ) : query ? (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </button>
            ) : null}
          </div>

          {/* Mobile Close Button */}
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden mt-4 w-full py-3 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              Close Search
            </button>
          )}

          {/* Search Results Dropdown */}
          {query && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-gray-900/50 border dark:border-gray-700 overflow-hidden max-h-96 overflow-y-auto">
              {results.length > 0 ? (
                results.map(product => (
                  <button
                    key={product.id}
                    onClick={() => handleResultClick(product.id)}
                    className="w-full text-left flex items-center p-4 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:bg-red-50 dark:focus:bg-gray-700"
                  >
                    <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl w-12 h-12 mr-4 flex items-center justify-center flex-shrink-0">
                      <Search className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white truncate">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <span className="truncate">{product.size}</span>
                        <span className="mx-2">•</span>
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          {product.price}
                        </span>
                      </div>
                      <div className="mt-1">
                        <span className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-900 text-xs text-gray-600 dark:text-gray-400 rounded-full">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </button>
                ))
              ) : debouncedQuery && !isLoading ? (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    No products found for "{debouncedQuery}"
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                    Try searching for kimchi, ramen, sauces, or snacks
                  </p>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Mobile Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </>
  );
};