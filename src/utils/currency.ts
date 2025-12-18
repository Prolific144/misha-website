export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatPriceCompact = (amount: number): string => {
  if (amount >= 1000000) {
    return `KES ${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `KES ${(amount / 1000).toFixed(1)}K`;
  }
  return formatPrice(amount);
};

export const parsePrice = (priceString: string): number => {
  const clean = priceString.replace(/[^\d.-]/g, '');
  return parseFloat(clean) || 0;
};

export const calculateSavings = (original: number, sale: number): string => {
  const savings = original - sale;
  const percentage = ((savings / original) * 100).toFixed(0);
  return `${formatPrice(savings)} (${percentage}% off)`;
};