// src/utils/helpers.ts
import { WHATSAPP_CONFIG, CONTACT_INFO } from '@/config/company';
//import { Product } from '@config/products';
import { PRODUCTS, getProductById } from '@/config/products';
import { calculateBulkDiscount } from '@/config/business';
import { calculateDeliveryFee, isFreeDelivery } from '@/config/delivery';

/**
 * Generate WhatsApp URL with proper encoding
 */
 
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

export const generateWhatsAppUrl = (
  message?: string, 
  phone?: string
): string => {
  const num = (phone || WHATSAPP_CONFIG.number).replace(/\D/g, '');
  const defaultMsg = `Hello ${CONTACT_INFO.phone.includes('254') ? 'Misha Foodstuffs' : ''}! I'd like to inquire about your products.`;
  const msg = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${num}?text=${msg}`;
};

/**
 * Generate order message for WhatsApp
 */
export const generateOrderMessage = (
  cart: CartItem[], 
  totalPrice: number,
  customerName?: string,
  deliveryAddress?: string,
  deliveryInstructions?: string
): string => {
  const itemsText = cart
    .map(item => `${item.name} (${item.size}) ×${item.quantity} = KES ${(parsePrice(item.price) * item.quantity).toFixed(2)}`)
    .join('%0A');
  
  const subtotal = calculateCartTotal(cart);
  const discount = calculateBulkDiscount(subtotal);
  const discountAmount = subtotal * (discount / 100);
  const finalSubtotal = subtotal - discountAmount;
  
  let message = `Hello Misha Foodstuffs!%0A%0A`;
  
  if (customerName) {
    message += `Customer: ${customerName}%0A`;
  }
  
  message += `I would like to order:%0A%0A${itemsText}%0A%0A`;
  message += `Subtotal: KES ${subtotal.toFixed(2)}%0A`;
  
  if (discount > 0) {
    message += `Bulk Discount (${discount}%): -KES ${discountAmount.toFixed(2)}%0A`;
    message += `After Discount: KES ${finalSubtotal.toFixed(2)}%0A`;
  }
  
  if (deliveryAddress) {
    message += `Delivery Address: ${deliveryAddress}%0A`;
  }
  
  if (deliveryInstructions) {
    message += `Delivery Instructions: ${deliveryInstructions}%0A`;
  }
  
  message += `%0APlease confirm availability and delivery details.`;
  
  return message;
};

/**
 * Parse price string to number
 */
export const parsePrice = (priceString: string): number => {
  const clean = priceString.replace(/[^\d.-]/g, '');
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Format price with KES and commas
 */
export const formatPrice = (amount: number): string => {
  return `KES ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

/**
 * Calculate cart total
 */
export const calculateCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => {
    const price = parsePrice(item.price);
    return total + (price * item.quantity);
  }, 0);
};

/**
 * Calculate order summary
 */
export interface OrderSummary {
  subtotal: number;
  discount: number;
  discountAmount: number;
  discountedSubtotal: number;
  deliveryFee: number;
  deliveryArea: 'nairobi' | 'other';
  isFreeDelivery: boolean;
  finalTotal: number;
}

export const calculateOrderSummary = (
  cart: CartItem[],
  deliveryArea: 'nairobi' | 'other' = 'nairobi',
  expressDelivery: boolean = false
): OrderSummary => {
  const subtotal = calculateCartTotal(cart);
  const discount = calculateBulkDiscount(subtotal);
  const discountAmount = subtotal * (discount / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const freeDelivery = isFreeDelivery(discountedSubtotal, deliveryArea);
  const deliveryFee = freeDelivery 
    ? 0 
    : calculateDeliveryFee(discountedSubtotal, deliveryArea, expressDelivery);
  const finalTotal = discountedSubtotal + deliveryFee;
  
  return {
    subtotal,
    discount,
    discountAmount,
    discountedSubtotal,
    deliveryFee,
    deliveryArea,
    isFreeDelivery: freeDelivery,
    finalTotal,
  };
};

/**
 * Generate slug from product name
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Format date
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Validate email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Kenya)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(?:254|\+254|0)?(7\d{8})$/;
  return phoneRegex.test(phone);
};

/**
 * Format phone number to Kenyan format
 */
export const formatPhone = (phone: string): string => {
  const clean = phone.replace(/\D/g, '');
  
  if (clean.startsWith('254')) {
    return `+${clean}`;
  } else if (clean.startsWith('7') && clean.length === 9) {
    return `+254${clean}`;
  } else if (clean.startsWith('0') && clean.length === 10) {
    return `+254${clean.substring(1)}`;
  }
  
  return phone;
};

/**
 * Calculate estimated delivery time
 */
export const calculateDeliveryTime = (): string => {
  const now = new Date();
  const hour = now.getHours();
  
  // Same day delivery for orders before 2 PM
  if (hour < 14) {
    const deliveryHour = hour < 12 ? 17 : 20; // 5 PM or 8 PM
    return `Today by ${deliveryHour}:00`;
  }
  
  // Next day delivery for orders after 2 PM
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  
  return tomorrow.toLocaleDateString('en-KE', options);
};