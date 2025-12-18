// src/hooks/useCart.ts
import { useState, useEffect, useCallback, useMemo } from 'react';
// import { CartItem } from '@config';
//import { CartItem } from './types';
import { PRODUCTS, getProductById } from '@/config/products';
import { calculateBulkDiscount } from '@/config/business';
import { calculateDeliveryFee, isFreeDelivery } from '@/config/delivery';

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: string;
  size: string;
  featured?: boolean;
  image?: string;
  imageSource?: 'local' | 'unsplash' | 'placeholder';
  description?: string;
  quantity: number;
  addedAt?: string;
  lastUpdated?: string;
}

interface UseCartReturn {
  cart: CartItem[];
  addToCart: (product: Product | { id: string; quantity?: number }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  finalTotal: number;
  cartCount: number;
  isInCart: (id: string) => boolean;
  getItemQuantity: (id: string) => number;
  mergeCart: (items: CartItem[]) => void;
  exportCart: () => string;
  importCart: (data: string) => boolean;
  syncWithLocalStorage: () => void;
}

interface CartStorageData {
  version: string;
  timestamp: string;
  items: Array<{
    id: string;
    quantity: number;
    addedAt: string;
    lastUpdated: string;
  }>;
}

const CART_STORAGE_KEY = 'misha_foodstuffs_cart_v2';
const CART_VERSION = '2.0';

// Helper to get product from PRODUCTS by ID
const getProductFromId = (id: string): Product | null => {
  const product = PRODUCTS.find(p => p.id === id) || getProductById(id);
  if (!product) {
    console.warn(`Product with ID ${id} not found in catalog`);
    return null;
  }
  return product;
};

// Parse price string to number
const parsePrice = (priceString: string): number => {
  return parseFloat(priceString.replace(/[^\d.]/g, '')) || 0;
};

// Load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) return [];
    
    const storageData: CartStorageData = JSON.parse(savedCart);
    
    // Handle version migration
    if (storageData.version !== CART_VERSION) {
      console.log(`Migrating cart from version ${storageData.version} to ${CART_VERSION}`);
      // In a real app, you'd have migration logic here
    }
    
    // Validate and ensure each item has full product data
    const validatedCart = storageData.items
      .map((item) => {
        const product = getProductFromId(item.id);
        if (!product) {
          console.warn(`Product ${item.id} not found, removing from cart`);
          return null;
        }
        
        return {
          ...product,
          quantity: Math.max(1, Math.min(item.quantity || 1, 99)), // Limit to 99
          addedAt: item.addedAt || new Date().toISOString(),
          lastUpdated: item.lastUpdated || new Date().toISOString(),
        };
      })
      .filter(Boolean) as CartItem[];
    
    return validatedCart;
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    // Clear corrupted cart
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (cart: CartItem[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    const storageData: CartStorageData = {
      version: CART_VERSION,
      timestamp: new Date().toISOString(),
      items: cart.map(item => ({
        id: item.id,
        quantity: item.quantity,
        addedAt: item.addedAt || new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      })),
    };
    
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storageData));
    
    // Dispatch event for other tabs/components
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

export const useCart = (deliveryArea: 'nairobi' | 'other' = 'nairobi'): UseCartReturn => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    if (!isInitialized) {
      const savedCart = loadCartFromStorage();
      setCart(savedCart);
      setIsInitialized(true);
      
      // Log cart recovery
      console.log(`Cart initialized with ${savedCart.length} items`);
    }
  }, [isInitialized]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && cart.length > 0) {
      saveCartToStorage(cart);
    } else if (isInitialized && cart.length === 0) {
      // Clear storage when cart is empty
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [cart, isInitialized]);

  // Listen for storage events (other tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY && e.newValue) {
        try {
          const newCart = loadCartFromStorage();
          setCart(newCart);
        } catch (error) {
          console.error('Failed to sync cart from storage event:', error);
        }
      }
    };

    const handleCartUpdated = (e: CustomEvent) => {
      // Handle custom cart update events
      if (e.detail?.cart) {
        setCart(e.detail.cart);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdated as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdated as EventListener);
    };
  }, []);

  // ==================== CART CALCULATIONS ====================
  // Cart calculations with useMemo for performance
  const totalItems = useMemo(() => 
    cart.reduce((sum, item) => sum + item.quantity, 0), 
    [cart]
  );

  const subtotal = useMemo(() => 
    cart.reduce((sum, item) => {
      const price = parsePrice(item.price);
      return sum + (price * item.quantity);
    }, 0), 
    [cart]
  );

  const discount = useMemo(() => 
    calculateBulkDiscount(subtotal), 
    [subtotal]
  );

  const discountAmount = useMemo(() => 
    subtotal * (discount / 100), 
    [subtotal, discount]
  );

  const discountedSubtotal = useMemo(() => 
    subtotal - discountAmount, 
    [subtotal, discountAmount]
  );

  const deliveryFee = useMemo(() => 
    isFreeDelivery(discountedSubtotal, deliveryArea) 
      ? 0 
      : calculateDeliveryFee(discountedSubtotal, deliveryArea, false), 
    [discountedSubtotal, deliveryArea]
  );

  const finalTotal = useMemo(() => 
    discountedSubtotal + deliveryFee, 
    [discountedSubtotal, deliveryFee]
  );

  const cartCount = useMemo(() => cart.length, [cart]);

  // ==================== CART FUNCTIONS ====================
  // Add to cart
  const addToCart = useCallback((item: Product | { id: string; quantity?: number }) => {
    setCart(prevCart => {
      const product = 'id' in item && !('name' in item) 
        ? getProductFromId(item.id)
        : item as Product;
      
      if (!product || !('id' in product)) {
        console.error('Invalid product object:', item);
        return prevCart;
      }

      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedCart = [...prevCart];
        const currentQuantity = updatedCart[existingItemIndex].quantity;
        const newQuantity = 'quantity' in item && item.quantity 
          ? Math.max(1, Math.min(item.quantity, 99))
          : currentQuantity + 1;
        
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: newQuantity,
          lastUpdated: new Date().toISOString(),
        };
        
        return updatedCart;
      } else {
        // Add new item
        const newItem: CartItem = {
          ...product,
          quantity: 'quantity' in item && item.quantity 
            ? Math.max(1, Math.min(item.quantity, 99))
            : 1,
          addedAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
        };
        
        return [...prevCart, newItem];
      }
    });
  }, []);

  // Update quantity
  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    
    // Limit to 99 per item
    const safeQuantity = Math.min(quantity, 99);
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id 
          ? { 
              ...item, 
              quantity: safeQuantity,
              lastUpdated: new Date().toISOString()
            }
          : item
      )
    );
  }, []);

  // Remove from cart
  const removeFromCart = useCallback((id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    setCart([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('cartCleared'));
    }
  }, []);

  // Merge cart with new items
  const mergeCart = useCallback((items: CartItem[]) => {
    setCart(prevCart => {
      const mergedCart = [...prevCart];
      
      items.forEach(newItem => {
        const existingIndex = mergedCart.findIndex(item => item.id === newItem.id);
        if (existingIndex >= 0) {
          // Keep the larger quantity
          mergedCart[existingIndex].quantity = Math.max(
            mergedCart[existingIndex].quantity,
            newItem.quantity
          );
          mergedCart[existingIndex].lastUpdated = new Date().toISOString();
        } else {
          mergedCart.push({
            ...newItem,
            addedAt: newItem.addedAt || new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
          });
        }
      });
      
      return mergedCart;
    });
  }, []);

  // Export cart as JSON
  const exportCart = useCallback((): string => {
    const exportData = {
      version: CART_VERSION,
      exportedAt: new Date().toISOString(),
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        category: item.category,
        addedAt: item.addedAt,
        total: parsePrice(item.price) * item.quantity,
      })),
      summary: {
        totalItems: totalItems,
        subtotal: subtotal,
        discount: discount,
        deliveryFee: deliveryFee,
        finalTotal: finalTotal,
      }
    };
    
    return JSON.stringify(exportData, null, 2);
  }, [cart, totalItems, subtotal, discount, deliveryFee, finalTotal]);

  // Import cart from JSON
  const importCart = useCallback((data: string): boolean => {
    try {
      const imported = JSON.parse(data);
      const items = imported.items || [];
      
      const importedCart: CartItem[] = items
        .map((item: any) => {
          const product = getProductFromId(item.id);
          if (!product) return null;
          
          return {
            ...product,
            quantity: Math.max(1, Math.min(item.quantity || 1, 99)),
            addedAt: item.addedAt || new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
          };
        })
        .filter(Boolean) as CartItem[];
      
      if (importedCart.length > 0) {
        mergeCart(importedCart);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import cart:', error);
      return false;
    }
  }, [mergeCart]);

  // Sync with localStorage manually
  const syncWithLocalStorage = useCallback(() => {
    const savedCart = loadCartFromStorage();
    setCart(savedCart);
  }, []);

  const isInCart = useCallback((id: string) => 
    cart.some(item => item.id === id), 
    [cart]
  );

  const getItemQuantity = useCallback((id: string) => {
    const item = cart.find(item => item.id === id);
    return item ? item.quantity : 0;
  }, [cart]);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice: subtotal,
    subtotal,
    discount,
    deliveryFee,
    finalTotal,
    cartCount,
    isInCart,
    getItemQuantity,
    mergeCart,
    exportCart,
    importCart,
    syncWithLocalStorage,
  };
};

// Utility functions for direct storage access
export const cartStorage = {
  save: saveCartToStorage,
  load: loadCartFromStorage,
  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('cartCleared'));
    }
  },
  getItemCount: (): number => {
    const cart = loadCartFromStorage();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },
  getStats: () => {
    const cart = loadCartFromStorage();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => {
      const price = parsePrice(item.price);
      return sum + (price * item.quantity);
    }, 0);
    
    return {
      totalItems,
      totalPrice,
      itemCount: cart.length,
      categories: [...new Set(cart.map(item => item.category))],
    };
  },
};