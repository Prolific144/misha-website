// src/config/company.ts
export const COMPANY_INFO = {
  name: "Misha Foodstuffs Limited",
  tagline: "Korean Food Mart & Distributor",
  heroSubtitle: "Your go-to supplier for authentic Korean groceries, kimchi, ramen, snacks, sauces & more in Nairobi, Kenya. Free delivery for orders above KES 2,000.",
} as const;

export const CONTACT_INFO = {
  address: {
    line1: "Samaki Drive Hse Number 13",
    line2: "Nairobi, Kenya"
  },
  phone: "+254 797 005509",
  email: "songhunfoodstuffsltd@gmail.com"
} as const;

export const WHATSAPP_CONFIG = {
  number: "+254797005509",
  defaultMessage: "Hello! I'd like to place an order from Misha Foodstuffs."
} as const;

export const SOCIAL_MEDIA = {
  facebook: "https://facebook.com/mishafoodstuffs",
  instagram: "https://instagram.com/songhunfoodstuffslt",
  tiktok: "https://tiktok.com/@mishafoodstuffs"
} as const;