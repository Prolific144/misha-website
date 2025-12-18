import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Clock } from 'lucide-react';
import { PRODUCTS, searchProducts } from '@/config/products';
import { useCart } from '@/hooks/useCart';
import { debounce } from '@/utils/helpers';

// Temporary workaround in SearchBar.tsx
interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  size: string;
  featured?: boolean;
  image?: string;
  imageSource?: 'local' | 'unsplash' | 'placeholder';
  description?: string;
}

interface SearchResult extends Product {
  relevance: number;
}

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      } catch (error) {
        console.error('Failed to load recent searches:', error);
      }
    }
  }, []);

  // Save recent searches
  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  // Debounced search function
  const performSearch = useCallback(
    debounce((searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      const searchResults = searchProducts(searchQuery);
      
      // Calculate relevance score
      const scoredResults: SearchResult[] = searchResults.map(product => {
        let relevance = 0;
        
        // Exact match in name
        if (product.name.toLowerCase() === searchQuery.toLowerCase()) relevance += 100;
        
        // Name contains query
        if (product.name.toLowerCase().includes(searchQuery.toLowerCase())) relevance += 50;
        
        // Category match
        if (product.category.toLowerCase().includes(searchQuery.toLowerCase())) relevance += 30;
        
        // Description match
        if (product.description?.toLowerCase().includes(searchQuery.toLowerCase())) relevance += 20;
        
        // Featured products get a boost
        if (product.featured) relevance += 10;
        
        return { ...product, relevance };
      });

      // Sort by relevance
      const sortedResults = scoredResults.sort((a, b) => b.relevance - a.relevance);
      setResults(sortedResults.slice(0, 8));
      setIsLoading(false);

      // Add to recent searches
      if (searchQuery.trim() && !recentSearches.includes(searchQuery.toLowerCase())) {
        setRecentSearches(prev => [
          searchQuery.toLowerCase(),
          ...prev.filter(s => s !== searchQuery.toLowerCase())
        ].slice(0, 5));
      }
    }, 300),
    [recentSearches]
  );

  // Handle search input changes
  const handleSearchChange = (value: string) => {
    setQuery(value);
    setIsLoading(true);
    performSearch(value);
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  // Handle product selection
  const handleProductSelect = (product: Product) => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    
    // Scroll to products section or show product modal
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add to cart from search
  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id: product.id, quantity: 1 });
    setResults([]);
    setQuery('');
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Mobile Search Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        aria-label="Open search"
      >
        <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>

      {/* Desktop + Mobile Full Search */}
      <div className={`fixed md:static inset-0 z-50 md:z-auto ${isOpen ? 'block' : 'hidden md:block'}`}>
        <div className="bg-white dark:bg-gray-900 md:bg-transparent px-4 pt-4 md:p-0">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search kimchi, ramen, gochujang..."
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="input-primary w-full pl-12 pr-12 rounded-full"
              aria-label="Search products"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {query && (results.length > 0 || isLoading) && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border dark:border-gray-700 overflow-hidden max-h-[60vh] overflow-y-auto mobile-menu-scroll">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  Searching...
                </div>
              ) : (
                <>
                  {results.map(product => (
                    <div
                      key={product.id}
                      className="flex items-center p-4 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
                      onClick={() => handleProductSelect(product)}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-sm">
                          {product.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {product.size} • {product.price}
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="btn-primary px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                  
                  {/* View all results */}
                  {results.length > 0 && (
                    <div className="p-4 border-t dark:border-gray-700">
                      <a
                        href="#products"
                        onClick={() => {
                          setQuery('');
                          setIsOpen(false);
                        }}
                        className="block text-center text-red-600 dark:text-red-400 font-medium hover:underline"
                      >
                        View all {results.length} results →
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && isOpen && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Recent Searches
                </h3>
              </div>
              {recentSearches.map((searchTerm, index) => (
                <button
                  key={index}
                  onClick={() => handleSearchChange(searchTerm)}
                  className="w-full text-left p-4 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors flex justify-between items-center"
                >
                  <span className="text-gray-900 dark:text-white">{searchTerm}</span>
                  <Search className="w-4 h-4 text-gray-400" />
                </button>
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