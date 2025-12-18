// src/config/index.ts
// Export all types
export * from './types';

// Export company info
export {
  COMPANY_INFO,
  CONTACT_INFO,
  WHATSAPP_CONFIG,
  SOCIAL_MEDIA
} from './company';

// Export products
export {
  PRODUCTS,
  PRODUCT_CATEGORIES,
  getProductsByCategory,
  getFeaturedProducts,
  getProductById,
  searchProducts,
  getProductsByIds,
  getCategories,
  getProductStats
} from './products';

// Export image mappings
export {
  PRODUCT_IMAGE_MAP,
  UNSPLASH_IMAGES,
  PLACEHOLDER_IMAGES,
  getProductImage,
  getOptimizedImage,
  checkImageExists
} from './imageMappings';

// Export recipes
export {
  RECIPES,
  getFeaturedRecipes,
  getAllRecipes
} from './recipes';

// Export sales
export {
  FLASH_SALES,
  getActiveFlashSales,
  getFlashSaleById
} from './sales';

// Export recommendations
export {
  RECOMMENDATIONS,
  getRecommendationsByType,
  getRecommendationProducts,
  getRecommendedForProduct,
  getBundles,
  getTrendingRecommendations
} from './recommendations';

// Export delivery info
export {
  DELIVERY_INFO,
  OTHER_AREAS,
  DELIVERY_FEES,
  isFreeDelivery,
  calculateDeliveryFee,
  getDeliveryAreas
} from './delivery';

// Export business info
export {
  BUSINESS_HOURS,
  PAYMENT_METHODS,
  COMPANY_POLICIES,
  BULK_ORDER_DISCOUNTS,
  calculateBulkDiscount,
  isBusinessOpen,
  getNextOpeningTime
} from './business';

// Re-export types from local definitions
export type { BusinessHours } from './business';
export type { DeliveryInfo } from './delivery';

// Combine all configs for backward compatibility
import { COMPANY_INFO, CONTACT_INFO, WHATSAPP_CONFIG, SOCIAL_MEDIA } from './company';
import { PRODUCTS, PRODUCT_CATEGORIES } from './products';
import { RECIPES } from './recipes';
import { FLASH_SALES } from './sales';
import { RECOMMENDATIONS } from './recommendations';
import { DELIVERY_INFO as DELIVERY_CONFIG } from './delivery';
import { BUSINESS_HOURS as HOURS_CONFIG, PAYMENT_METHODS } from './business';

export const COMPANY_CONFIG = {
  // Company info
  name: COMPANY_INFO.name,
  tagline: COMPANY_INFO.tagline,
  heroSubtitle: COMPANY_INFO.heroSubtitle,
  
  // Contact info
  contact: CONTACT_INFO,
  whatsapp: WHATSAPP_CONFIG,
  socialMedia: SOCIAL_MEDIA,
  
  // Products
  products: PRODUCTS,
  categories: PRODUCT_CATEGORIES,
  recipes: RECIPES,
  flashSales: FLASH_SALES,
  recommendations: RECOMMENDATIONS,
  
  // Business info
  delivery: DELIVERY_CONFIG,
  businessHours: HOURS_CONFIG,
  paymentMethods: PAYMENT_METHODS,
  
  // Helper methods (same as before)
  getWhatsAppUrl: (message?: string, phone?: string): string => {
    const num = (phone || WHATSAPP_CONFIG.number).replace(/\D/g, '');
    const msg = encodeURIComponent(message || WHATSAPP_CONFIG.defaultMessage);
    return `https://wa.me/${num}?text=${msg}`;
  },
  
  getActiveFlashSales: () => {
    const now = new Date();
    return FLASH_SALES.filter(sale => new Date(sale.endTime) > now);
  },
  
  getFeaturedProducts: (limit?: number) => {
    const featured = PRODUCTS.filter(p => p.featured);
    return limit ? featured.slice(0, limit) : featured;
  },
  
  generateOrderSummary: (cart: any[]) => {
    const total = cart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
      return sum + (price * item.quantity);
    }, 0);
    
    return {
      subtotal: total,
      discount: total >= 10000 ? 5 : 0,
      deliveryFee: total >= 2000 ? 0 : 300,
      total: total - (total >= 10000 ? total * 0.05 : 0) + (total >= 2000 ? 0 : 300)
    };
  }
} as const;

// Type for the complete config
export type CompanyConfig = typeof COMPANY_CONFIG;

// Utility exports for common operations
export const ConfigUtils = {
  getProductWithImage: (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return null;
    
    return {
      ...product,
      imageUrl: product.image || `/api/products/${productId}/image`,
    };
  },
  
  formatProductPrice: (productId: string, quantity: number = 1) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return 'KES 0.00';
    
    const price = parseFloat(product.price.replace(/[^\d.]/g, ''));
    const total = price * quantity;
    
    return `KES ${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  },
  
  getCategoryProducts: (category: string, limit?: number) => {
    const products = PRODUCTS.filter(p => p.category === category);
    return limit ? products.slice(0, limit) : products;
  },
  
  searchAll: (query: string) => {
    const searchTerm = query.toLowerCase();
    
    const products = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description?.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
    
    const recipes = RECIPES.filter(r => 
      r.title.toLowerCase().includes(searchTerm) ||
      r.ingredients.some(i => i.toLowerCase().includes(searchTerm))
    );
    
    return {
      products,
      recipes,
      totalResults: products.length + recipes.length,
    };
  },
};