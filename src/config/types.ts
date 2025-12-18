// src/config/types.ts

// Make sure ALL interfaces have 'export' keyword
export interface Product {
  id: string;
  name: string;
  category: Category;
  price: string;
  size: string;
  featured?: boolean;
  image?: string;
  imageSource?: 'local' | 'unsplash' | 'placeholder';
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
  addedAt?: string;
  lastUpdated?: string;
}

export interface Recipe {
  id: string;
  title: string;
  img: string;
  ingredients: string[];
  steps: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  prepTime?: number;
  cookTime?: number;
  serving?: number;
}

export interface ContactInfo {
  address: {
    line1: string;
    line2: string;
  };
  phone: string;
  email: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface WhatsAppConfig {
  number: string;
  defaultMessage: string;
  businessHoursMessage?: string;
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
  featured?: boolean;
}

export interface Recommendation {
  id: string;
  title: string;
  type: 'complementary' | 'frequently_bought' | 'trending' | 'bundle' | 'seasonal';
  productIds: string[];
  description: string;
  discount?: number;
  image?: string;
}

export interface DeliveryInfo {
  freeThreshold: number;
  nairobiAreas: string[];
  deliveryTime: string;
  bulkDelivery: string;
}

export interface BusinessHours {
  weekdays: string;
  saturday: string;
  sunday: string;
  holidays: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  currency: 'KES' | 'USD';
  notifications: boolean;
  marketingEmails: boolean;
  preferredDeliveryTime?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  items: CartItem[];
  totalAmount: number;
  deliveryFee: number;
  deliveryAddress: string;
  deliveryInstructions?: string;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  notes?: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase?: boolean;
}

// Utility types
export type Category = 
  | 'kimchi'
  | 'ramen'
  | 'sauces'
  | 'snacks'
  | 'beverages'
  | 'essentials'
  | 'seafood'
  | 'grains'
  | 'frozen'
  | 'health'
  | 'desserts'
  | 'specialty';

export type Theme = 'light' | 'dark';
export type PaymentMethod = 'mpesa' | 'cash' | 'bank_transfer' | 'card';

// Export ALL types as a namespace
export * as Types from './types';