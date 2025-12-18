// src/config/recommendations.ts
// import { Recommendation } from '@/config/types';
import { PRODUCTS } from '@/config/products';

interface Recommendation {
  id: string;
  title: string;
  type: 'complementary' | 'frequently_bought' | 'trending' | 'bundle' | 'seasonal';
  productIds: string[];
  description: string;
  discount?: number;
  image?: string;
}

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec1',
    title: 'Complete Korean BBQ Set',
    type: 'bundle',
    productIds: ['sauce-001', 'sauce-005', 'sauce-008', 'essential-005'],
    description: 'Everything you need for authentic Korean BBQ at home',
  },
  {
    id: 'rec2',
    title: 'Kimchi Lovers Bundle',
    type: 'frequently_bought',
    productIds: ['kimchi-001', 'kimchi-002', 'kimchi-004'],
    description: 'Popular combination for kimchi enthusiasts',
  },
  {
    id: 'rec3',
    title: 'Ramen & Sides Combo',
    type: 'complementary',
    productIds: ['ramen-001', 'kimchi-003', 'snack-002'],
    description: 'Perfect sides to enhance your ramen experience',
  },
  {
    id: 'rec4',
    title: 'Trending Korean Snacks',
    type: 'trending',
    productIds: ['snack-001', 'snack-002', 'snack-003'],
    description: 'Currently popular snacks from Korea',
  },
  {
    id: 'rec5',
    title: 'Korean Cooking Starter Kit',
    type: 'bundle',
    productIds: ['sauce-001', 'sauce-002', 'sauce-004', 'sauce-005'],
    description: 'Essential sauces and pastes for Korean cooking',
  },
  {
    id: 'rec6',
    title: 'Spicy Food Lovers Combo',
    type: 'frequently_bought',
    productIds: ['ramen-001', 'ramen-003', 'sauce-001'],
    description: 'For those who love their food extra spicy',
  },
];

export const getRecommendationsByType = (type: Recommendation['type']): Recommendation[] => {
  return RECOMMENDATIONS.filter(rec => rec.type === type);
};

export const getRecommendationProducts = (recommendationId: string) => {
  const recommendation = RECOMMENDATIONS.find(rec => rec.id === recommendationId);
  if (!recommendation) return [];
  
  return recommendation.productIds
    .map(productId => PRODUCTS.find(p => p.id === productId))
    .filter(Boolean);
};

export const getRecommendedForProduct = (productId: string): Recommendation[] => {
  return RECOMMENDATIONS.filter(rec => 
    rec.productIds.includes(productId)
  );
};

export const getBundles = (): Recommendation[] => {
  return getRecommendationsByType('bundle');
};

export const getTrendingRecommendations = (): Recommendation[] => {
  return getRecommendationsByType('trending');
};