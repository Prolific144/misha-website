// src/config/imageMappings.ts

// Map product IDs to local image paths
export const PRODUCT_IMAGE_MAP: Record<string, string> = {
  // Kimchi images
  'kimchi-001': '/src/assets/images/products/kimchi/aged-kimchi.jpg',
  'kimchi-002': '/src/assets/images/products/kimchi/radish-kimchi.jpg',
  'kimchi-003': '/src/assets/images/products/kimchi/small-kimchi.jpg',
  'kimchi-004': '/src/assets/images/products/kimchi/white-kimchi.jpg',
  'kimchi-008': '/src/assets/images/products/kimchi/mustard-kimchi.jpg',
  
  // Ramen images
  'ramen-001': '/src/assets/images/products/ramen/shin-ramyun.jpg',
  'ramen-003': '/src/assets/images/products/ramen/buldak-ramen.jpg',
  'ramen-007': '/src/assets/images/products/ramen/cheese-ramen.jpg',
  
  // Sauces images
  'sauce-001': '/src/assets/images/products/sauces/gochujang.jpg',
  'sauce-002': '/src/assets/images/products/sauces/doenjang.jpg',
  'sauce-005': '/src/assets/images/products/sauces/sesame-oil.jpg',
  
  // Snacks images
  'snack-001': '/src/assets/images/products/snacks/choco-pie.jpg',
  'snack-002': '/src/assets/images/products/snacks/honey-butter-chips.jpg',
  
  // Beverages
  'beverage-001': '/src/assets/images/products/beverages/makkoli.jpg',
  
  // Essentials
  'essential-001': '/src/assets/images/products/essentials/rice-cake.jpg',
  
  // Seafood
  'seafood-001': '/src/assets/images/products/seafood/anchovies.jpg',
  
  // Grains
  'grain-001': '/src/assets/images/products/grains/rice.jpg',
  
  // Frozen
  'frozen-001': '/src/assets/images/products/frozen/dumplings.jpg',
  
  // Default fallback images by category
  DEFAULT_IMAGES: {
    kimchi: '/src/assets/images/products/kimchi/default.jpg',
    ramen: '/src/assets/images/products/ramen/default.jpg',
    sauces: '/src/assets/images/products/sauces/default.jpg',
    snacks: '/src/assets/images/products/snacks/default.jpg',
    beverages: '/src/assets/images/products/beverages/default.jpg',
    essentials: '/src/assets/images/products/essentials/default.jpg',
    seafood: '/src/assets/images/products/seafood/default.jpg',
    grains: '/src/assets/images/products/grains/default.jpg',
    frozen: '/src/assets/images/products/frozen/default.jpg',
    health: '/src/assets/images/products/health/default.jpg',
    desserts: '/src/assets/images/products/desserts/default.jpg',
    specialty: '/src/assets/images/products/specialty/default.jpg',
  }
} as const;

// Unsplash image URLs for products without local images
export const UNSPLASH_IMAGES = {
  kimchi: 'https://images.unsplash.com/photo-1583224964766-6c5d5d5b5b1a?w=600&h=400&fit=crop',
  ramen: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop',
  sauces: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop',
  snacks: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&h=400&fit=crop',
  beverages: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop',
  essentials: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
  seafood: 'https://images.unsplash.com/photo-1574675370791-1ec60e0b73f4?w=600&h=400&fit=crop',
  grains: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop',
  frozen: 'https://images.unsplash.com/photo-1594488506255-a8bbfdeedbaf?w=600&h=400&fit=crop',
  health: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop',
  desserts: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=400&fit=crop',
  specialty: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop',
} as const;

// Placeholder image service
export const PLACEHOLDER_IMAGES = {
  kimchi: 'https://placehold.co/600x400/FF6B6B/FFFFFF?text=Kimchi',
  ramen: 'https://placehold.co/600x400/4ECDC4/FFFFFF?text=Ramen',
  sauces: 'https://placehold.co/600x400/45B7D1/FFFFFF?text=Sauces',
  snacks: 'https://placehold.co/600x400/96CEB4/FFFFFF?text=Snacks',
  beverages: 'https://placehold.co/600x400/FECA57/FFFFFF?text=Beverages',
  essentials: 'https://placehold.co/600x400/FF9FF3/FFFFFF?text=Essentials',
  seafood: 'https://placehold.co/600x400/54A0FF/FFFFFF?text=Seafood',
  grains: 'https://placehold.co/600x400/5F27CD/FFFFFF?text=Grains',
  frozen: 'https://placehold.co/600x400/00D2D3/FFFFFF?text=Frozen',
  health: 'https://placehold.co/600x400/FF9FF3/FFFFFF?text=Health',
  desserts: 'https://placehold.co/600x400/F368E0/FFFFFF?text=Desserts',
  specialty: 'https://placehold.co/600x400/FF9F43/FFFFFF?text=Specialty',
} as const;

// Helper function to get product image
export const getProductImage = (productId: string, category: string): string => {
  // Try to get local image first
  const localImage = PRODUCT_IMAGE_MAP[productId];
  if (localImage) {
    return localImage;
  }
  
  // Fallback to Unsplash based on category
  const unsplashImage = UNSPLASH_IMAGES[category as keyof typeof UNSPLASH_IMAGES];
  if (unsplashImage) {
    return unsplashImage;
  }
  
  // Final fallback to placeholder
  return PLACEHOLDER_IMAGES[category as keyof typeof PLACEHOLDER_IMAGES] || 
         PLACEHOLDER_IMAGES.kimchi;
};

// Helper to check if image exists
export const checkImageExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// Get optimized image URL for Unsplash
export const getOptimizedImage = (url: string, width: number = 600, height: number = 400): string => {
  if (url.includes('unsplash.com')) {
    // Add unsplash optimization parameters
    return `${url}&w=${width}&h=${height}&fit=crop&q=80&auto=format`;
  }
  return url;
};