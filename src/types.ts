// Add to your existing types

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  size: string;
  featured?: boolean;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Recipe {
  title: string;
  img: string;
  ingredients: string[];
  steps: string[];
}

export interface ContactInfo {
  address: {
    line1: string;
    line2: string;
  };
  phone: string;
  email: string;
}

export interface WhatsAppConfig {
  number: string;
  message: string;
}

export interface FlashSale {
  id: string;
  productId: string;
  originalPrice: string;
  salePrice: string;
  discountPercentage: number;
  endTime: string;
  quantity: number;
  sold: number;
}

export interface ProductBundle {
  id: string;
  name: string;
  description: string;
  products: Product[]; // Changed from string[] to Product[]
  bundlePrice: string;
  discount: number;
  image?: string;
}

export interface Recommendation {
  id: string;
  title: string;
  type: 'complementary' | 'frequently_bought' | 'trending' | 'bundle';
  productIds: string[];
  description: string;
}