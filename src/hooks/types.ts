// Local types for hooks
export interface CartItem {
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

