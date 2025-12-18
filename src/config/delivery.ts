// src/config/delivery.ts

// Define the interface locally instead of importing
interface DeliveryInfo {
  freeThreshold: number;
  nairobiAreas: string[];
  deliveryTime: string;
  bulkDelivery: string;
}

export const DELIVERY_INFO: DeliveryInfo = {
  freeThreshold: 2000, // KES
  nairobiAreas: [
    "Westlands", 
    "Kilimani", 
    "Lavington", 
    "Karen", 
    "Runda",
    "Kileleshwa", 
    "Parklands", 
    "Upper Hill", 
    "CBD", 
    "Langata",
    "South B", 
    "South C", 
    "Ngong Road", 
    "Thika Road areas"
  ],
  deliveryTime: "Same day delivery for orders before 2 PM",
  bulkDelivery: "Special rates for restaurants and bulk orders"
} as const;

export const OTHER_AREAS = [
  "Kiambu",
  "Thika",
  "Ruiru",
  "Juja",
  "Athi River",
  "Machakos",
  "Limuru"
] as const;

export const DELIVERY_FEES = {
  nairobi: {
    standard: 300,
    express: 500,
    freeThreshold: 2000
  },
  otherAreas: {
    standard: 500,
    express: 800,
    freeThreshold: 5000
  }
} as const;

export const isFreeDelivery = (amount: number, area: 'nairobi' | 'other' = 'nairobi'): boolean => {
  const fees = area === 'nairobi' ? DELIVERY_FEES.nairobi : DELIVERY_FEES.otherAreas;
  return amount >= fees.freeThreshold;
};

export const calculateDeliveryFee = (
  amount: number, 
  area: 'nairobi' | 'other' = 'nairobi', 
  express: boolean = false
): number => {
  if (isFreeDelivery(amount, area)) {
    return 0;
  }
  
  const fees = area === 'nairobi' ? DELIVERY_FEES.nairobi : DELIVERY_FEES.otherAreas;
  return express ? fees.express : fees.standard;
};

export const getDeliveryAreas = (): string[] => {
  return [...DELIVERY_INFO.nairobiAreas, ...OTHER_AREAS];
};

// Export the interface for use elsewhere
export type { DeliveryInfo };