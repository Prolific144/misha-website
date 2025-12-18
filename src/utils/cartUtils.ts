// src/utils/cartUtils.ts
import { CartItem, Product } from '@/config/types';
import { PRODUCTS } from '@/config/products';
import { parsePrice } from './helpers';

const CART_STORAGE_KEY = 'misha_foodstuffs_cart_v2';
const CART_VERSION = '2.0';

export interface CartStorageData {
  version: string;
  timestamp: string;
  sessionId?: string;
  userId?: string;
  items: Array<{
    id: string;
    quantity: number;
    addedAt: string;
    lastUpdated: string;
    priceSnapshot: string; // Store price at time of addition
    metadata?: {
      selectedVariant?: string;
      notes?: string;
    };
  }>;
}

export interface CartStats {
  totalItems: number;
  totalPrice: number;
  itemCount: number;
  categories: string[];
  lastUpdated: Date | null;
  estimatedDelivery?: number;
  bulkDiscountEligible: boolean;
}

export const cartUtils = {
  // Save cart with enhanced metadata
  saveCart: (cart: CartItem[], metadata?: {
    sessionId?: string;
    userId?: string;
  }): void => {
    if (typeof window === 'undefined') return;
    
    try {
      const storageData: CartStorageData = {
        version: CART_VERSION,
        timestamp: new Date().toISOString(),
        sessionId: metadata?.sessionId,
        userId: metadata?.userId,
        items: cart.map(item => ({
          id: item.id,
          quantity: item.quantity,
          addedAt: item.addedAt || new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          priceSnapshot: item.price,
          metadata: {
            notes: item.description?.substring(0, 100), // Store first 100 chars of description
          },
        })),
      };
      
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storageData));
      
      // Also save a backup copy
      const backupKey = `${CART_STORAGE_KEY}_backup_${new Date().toISOString().split('T')[0]}`;
      localStorage.setItem(backupKey, JSON.stringify(storageData));
      
      // Keep only last 3 backups
      const backupKeys = Object.keys(localStorage)
        .filter(key => key.startsWith(`${CART_STORAGE_KEY}_backup_`))
        .sort()
        .reverse();
      
      if (backupKeys.length > 3) {
        backupKeys.slice(3).forEach(key => localStorage.removeItem(key));
      }
      
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  },

  // Load cart with enhanced validation
  loadCart: (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (!stored) return [];
      
      const storageData: CartStorageData = JSON.parse(stored);
      
      // Version migration
      if (storageData.version !== CART_VERSION) {
        console.warn(`Cart version mismatch: ${storageData.version} -> ${CART_VERSION}`);
        return cartUtils.migrateCart(storageData);
      }
      
      // Validate items exist in current catalog
      const cart: CartItem[] = storageData.items
        .map(storageItem => {
          const product = PRODUCTS.find(p => p.id === storageItem.id);
          if (!product) {
            console.warn(`Product ${storageItem.id} no longer exists, removing from cart`);
            return null;
          }
          
          // Check if price has changed significantly
          const oldPrice = parsePrice(storageItem.priceSnapshot);
          const newPrice = parsePrice(product.price);
          const priceChange = Math.abs(newPrice - oldPrice) / oldPrice;
          
          if (priceChange > 0.1) { // More than 10% change
            console.warn(`Price changed for ${product.name}: ${oldPrice} -> ${newPrice}`);
            // Optionally notify user
          }
          
          return {
            ...product,
            quantity: Math.max(1, Math.min(storageItem.quantity || 1, 99)),
            addedAt: storageItem.addedAt,
            lastUpdated: storageItem.lastUpdated,
          };
        })
        .filter(Boolean) as CartItem[];
      
      return cart;
    } catch (error) {
      console.error('Failed to load cart:', error);
      
      // Try to load from backup
      try {
        const backupKeys = Object.keys(localStorage)
          .filter(key => key.startsWith(`${CART_STORAGE_KEY}_backup_`))
          .sort()
          .reverse();
        
        if (backupKeys.length > 0) {
          console.log('Attempting to restore cart from backup');
          const backup = localStorage.getItem(backupKeys[0]);
          if (backup) {
            const backupData: CartStorageData = JSON.parse(backup);
            return cartUtils.loadCartFromData(backupData);
          }
        }
      } catch (backupError) {
        console.error('Failed to restore from backup:', backupError);
      }
      
      return [];
    }
  },

  // Helper to load cart from storage data
  loadCartFromData: (storageData: CartStorageData): CartItem[] => {
    return storageData.items
      .map(storageItem => {
        const product = PRODUCTS.find(p => p.id === storageItem.id);
        if (!product) return null;
        
        return {
          ...product,
          quantity: Math.max(1, Math.min(storageItem.quantity || 1, 99)),
          addedAt: storageItem.addedAt,
          lastUpdated: storageItem.lastUpdated,
        };
      })
      .filter(Boolean) as CartItem[];
  },

  // Migrate cart data
  migrateCart: (oldData: any): CartItem[] => {
    console.log('Migrating cart data...');
    
    // Handle different versions
    if (oldData.version === '1.0') {
      // Migrate from v1 to v2
      const items = oldData.items || [];
      
      return items
        .map((item: any) => {
          const product = PRODUCTS.find(p => p.id === item.id || p.id === item.productId);
          if (!product) return null;
          
          return {
            ...product,
            quantity: Math.max(1, Math.min(item.quantity || 1, 99)),
            addedAt: item.addedAt || new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
          };
        })
        .filter(Boolean) as CartItem[];
    }
    
    // Default migration (handle plain arrays)
    const items = Array.isArray(oldData) ? oldData : oldData.items || [];
    
    return items
      .map((item: any) => {
        const product = PRODUCTS.find(p => p.id === item.id || p.id === item.productId);
        if (!product) return null;
        
        return {
          ...product,
          quantity: Math.max(1, Math.min(item.quantity || 1, 99)),
          addedAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
        };
      })
      .filter(Boolean) as CartItem[];
  },

  // Export cart for backup with detailed information
  exportCart: (): string => {
    const cart = cartUtils.loadCart();
    const stats = cartUtils.getCartStats();
    
    const exportData = {
      version: CART_VERSION,
      exportedAt: new Date().toISOString(),
      source: 'Misha Foodstuffs Cart Export',
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        total: parsePrice(item.price) * item.quantity,
        addedAt: item.addedAt,
        lastUpdated: item.lastUpdated,
      })),
      summary: {
        totalItems: stats.totalItems,
        totalPrice: stats.totalPrice,
        itemCount: stats.itemCount,
        categories: stats.categories,
        bulkDiscountEligible: stats.bulkDiscountEligible,
      },
      notes: 'This cart can be imported back into Misha Foodstuffs website',
    };
    
    return JSON.stringify(exportData, null, 2);
  },

  // Import cart from backup with validation
  importCart: (backup: string): { success: boolean; message: string; importedCount: number } => {
    try {
      const data = JSON.parse(backup);
      const items = data.items || [];
      
      if (!Array.isArray(items)) {
        return {
          success: false,
          message: 'Invalid cart format',
          importedCount: 0,
        };
      }
      
      const cart: CartItem[] = items
        .map((item: any) => {
          const product = PRODUCTS.find(p => p.id === item.id);
          if (!product) {
            console.warn(`Product ${item.id} not found during import`);
            return null;
          }
          
          return {
            ...product,
            quantity: Math.max(1, Math.min(item.quantity || 1, 99)),
            addedAt: item.addedAt || new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
          };
        })
        .filter(Boolean) as CartItem[];
      
      if (cart.length === 0) {
        return {
          success: false,
          message: 'No valid products found in import',
          importedCount: 0,
        };
      }
      
      // Save imported cart
      cartUtils.saveCart(cart);
      
      return {
        success: true,
        message: `Successfully imported ${cart.length} items`,
        importedCount: cart.length,
      };
    } catch (error) {
      console.error('Failed to import cart:', error);
      return {
        success: false,
        message: 'Failed to parse cart data',
        importedCount: 0,
      };
    }
  },

  // Get comprehensive cart statistics
  getCartStats: (): CartStats => {
    const cart = cartUtils.loadCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => {
      const price = parsePrice(item.price);
      return sum + (price * item.quantity);
    }, 0);
    const categories = [...new Set(cart.map(item => item.category))];
    
    // Check bulk discount eligibility (simplified)
    const bulkDiscountEligible = totalPrice >= 10000;
    
    // Estimate delivery days (1-3 days)
    const estimatedDelivery = totalItems > 10 ? 3 : totalItems > 5 ? 2 : 1;
    
    let lastUpdated = null;
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const data: CartStorageData = JSON.parse(stored);
        lastUpdated = new Date(data.timestamp);
      }
    } catch (error) {
      // Ignore error
    }
    
    return {
      totalItems,
      totalPrice,
      itemCount: cart.length,
      categories,
      lastUpdated,
      estimatedDelivery,
      bulkDiscountEligible,
    };
  },

  // Compare two carts
  compareCarts: (cartA: CartItem[], cartB: CartItem[]): {
    added: CartItem[];
    removed: CartItem[];
    changed: Array<{ item: CartItem; oldQuantity: number; newQuantity: number }>;
    same: CartItem[];
  } => {
    const added: CartItem[] = [];
    const removed: CartItem[] = [];
    const changed: Array<{ item: CartItem; oldQuantity: number; newQuantity: number }> = [];
    const same: CartItem[] = [];
    
    // Create maps for easy lookup
    const mapA = new Map(cartA.map(item => [item.id, item]));
    const mapB = new Map(cartB.map(item => [item.id, item]));
    
    // Check cartB items against cartA
    for (const [id, itemB] of mapB) {
      const itemA = mapA.get(id);
      
      if (!itemA) {
        added.push(itemB);
      } else if (itemA.quantity !== itemB.quantity) {
        changed.push({
          item: itemB,
          oldQuantity: itemA.quantity,
          newQuantity: itemB.quantity,
        });
      } else {
        same.push(itemB);
      }
    }
    
    // Check for removed items
    for (const [id, itemA] of mapA) {
      if (!mapB.has(id)) {
        removed.push(itemA);
      }
    }
    
    return { added, removed, changed, same };
  },

  // Clear cart and backups
  clearCart: (clearBackups: boolean = false): void => {
    localStorage.removeItem(CART_STORAGE_KEY);
    
    if (clearBackups) {
      const backupKeys = Object.keys(localStorage)
        .filter(key => key.startsWith(`${CART_STORAGE_KEY}_backup_`));
      
      backupKeys.forEach(key => localStorage.removeItem(key));
    }
    
    // Dispatch event
    window.dispatchEvent(new Event('cartCleared'));
  },

  // Get cart size in KB
  getCartSize: (): number => {
    try {
      const cartData = localStorage.getItem(CART_STORAGE_KEY);
      if (!cartData) return 0;
      
      return (cartData.length * 2) / 1024; // Approximate size in KB
    } catch {
      return 0;
    }
  },

  // Check if cart is empty
  isEmpty: (): boolean => {
    const cart = cartUtils.loadCart();
    return cart.length === 0;
  },

  // Find item in cart
  findItem: (productId: string): CartItem | undefined => {
    const cart = cartUtils.loadCart();
    return cart.find(item => item.id === productId);
  },

  // Update item quantity
  updateItemQuantity: (productId: string, quantity: number): boolean => {
    const cart = cartUtils.loadCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex === -1) return false;
    
    if (quantity < 1) {
      // Remove item
      cart.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart[itemIndex] = {
        ...cart[itemIndex],
        quantity: Math.min(quantity, 99),
        lastUpdated: new Date().toISOString(),
      };
    }
    
    cartUtils.saveCart(cart);
    return true;
  },
};