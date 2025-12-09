export interface Product {
  id: string;
  name: string;
  price: string;
  size: string;
  category: string;
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