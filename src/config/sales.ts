// src/config/sales.ts
//import { FlashSale } from '@/config/types';

interface FlashSale {
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

export const FLASH_SALES: FlashSale[] = [
  {
    id: 'fs1',
    productId: 'ramen-001',
    originalPrice: 'KES 1,200.00',
    salePrice: 'KES 999.00',
    discountPercentage: 25,
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    quantity: 50,
    sold: 32,
  },
  {
    id: 'fs2',
    productId: 'frozen-001',
    originalPrice: 'KES 1,150.00',
    salePrice: 'KES 999.00',
    discountPercentage: 23,
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    quantity: 30,
    sold: 25,
  },
  {
    id: 'fs3',
    productId: 'sauce-001',
    originalPrice: 'KES 1,300.00',
    salePrice: 'KES 1,199.00',
    discountPercentage: 27,
    endTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    quantity: 40,
    sold: 12,
  },
  {
    id: 'fs4',
    productId: 'ramen-003',
    originalPrice: 'KES 350.00',
    salePrice: 'KES 300.00',
    discountPercentage: 14,
    endTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    quantity: 40,
    sold: 34,
  },
];

export const getActiveFlashSales = (): FlashSale[] => {
  const now = new Date();
  return FLASH_SALES.filter(sale => new Date(sale.endTime) > now);
};

export const getFlashSaleById = (id: string): FlashSale | undefined => {
  return FLASH_SALES.find(sale => sale.id === id);
};