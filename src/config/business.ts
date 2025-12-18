// src/config/business.ts

// Define the BusinessHours type locally since it seems not to be exported from types.ts
// Or if it is exported, we need to check the export
export interface BusinessHours {
  weekdays: string;
  saturday: string;
  sunday: string;
  holidays: string;
}

export const BUSINESS_HOURS: BusinessHours = {
  weekdays: "8:00 AM - 5:00 PM",
  saturday: "9:00 AM - 4:00 PM",
  sunday: "Appointments Only",
  holidays: "Closed on major holidays"
} as const;

export const PAYMENT_METHODS = [
  "Cash on Delivery",
  "M-Pesa",
  "Bank Transfer",
  "Credit/Debit Card (coming soon)"
] as const;

export const COMPANY_POLICIES = {
  returnPolicy: "7-day return policy for unopened products",
  warranty: "All products come with manufacturer warranty",
  privacy: "We respect your privacy and protect your data",
  quality: "100% authentic Korean products guarantee"
} as const;

export const BULK_ORDER_DISCOUNTS = [
  { minAmount: 10000, discount: 5 },
  { minAmount: 25000, discount: 10 },
  { minAmount: 50000, discount: 15 },
  { minAmount: 100000, discount: 20 }
] as const;

export const calculateBulkDiscount = (amount: number): number => {
  // Sort in descending order to get the highest applicable discount
  const sortedDiscounts = [...BULK_ORDER_DISCOUNTS].sort((a, b) => b.minAmount - a.minAmount);
  
  for (const discount of sortedDiscounts) {
    if (amount >= discount.minAmount) {
      return discount.discount;
    }
  }
  return 0;
};

export const isBusinessOpen = (): boolean => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hour = now.getHours();
  const minute = now.getMinutes();
  
  const currentTimeInMinutes = hour * 60 + minute;
  
  // Monday-Friday: 8:00 AM to 5:00 PM
  if (day >= 1 && day <= 5) {
    const openTime = 8 * 60; // 8:00 AM in minutes
    const closeTime = 17 * 60; // 5:00 PM in minutes
    return currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime;
  }
  
  // Saturday: 9:00 AM to 4:00 PM
  if (day === 6) {
    const openTime = 9 * 60; // 9:00 AM in minutes
    const closeTime = 16 * 60; // 4:00 PM in minutes
    return currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime;
  }
  
  // Sunday: Closed
  return false;
};

export const getNextOpeningTime = (): string => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  
  // Helper to get day name
  const getDayName = (dayOffset: number): string => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const targetDay = (day + dayOffset) % 7;
    return days[targetDay];
  };
  
  if (isBusinessOpen()) {
    return "Currently open";
  }
  
  if (day >= 1 && day <= 5) { // Weekday (Monday-Friday)
    if (hour < 8) {
      return `Opens at 8:00 AM today (${getDayName(0)})`;
    } else if (hour >= 17) {
      // If it's Friday after 5 PM, next opening is Monday
      if (day === 5) {
        return "Opens at 8:00 AM on Monday";
      }
      return `Opens at 8:00 AM tomorrow (${getDayName(1)})`;
    }
  } else if (day === 6) { // Saturday
    if (hour < 9) {
      return "Opens at 9:00 AM today (Saturday)";
    } else if (hour >= 16) {
      return "Opens at 8:00 AM on Monday";
    }
  } else if (day === 0) { // Sunday
    return "Opens at 8:00 AM on Monday";
  }
  
  // Fallback
  return "Closed - Opens at 8:00 AM tomorrow";
};

// For TypeScript type exports
export type { BusinessHours };