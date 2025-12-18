// src/App.tsx
import React from 'react';
import { HomePage } from '@/pages/HomePage';
import { SEOMeta } from '@/components/SEOMeta';
import { BackToTop } from '@/components/BackToTop';
import { usePerformanceMetrics } from '@/hooks/usePerformanceMetrics';
import { COMPANY_INFO } from '@/config/company';
import { CartPage } from '@/pages/CartPage';
function App() {
  usePerformanceMetrics(); // Track performance metrics

  return (
    <>
      <SEOMeta 
        title={COMPANY_INFO.name}
        description={COMPANY_INFO.heroSubtitle}
        keywords="Korean food, kimchi, ramen, Korean groceries, Korean snacks, Nairobi, Kenya"
        image="/og-image.jpg"
      />
      <HomePage />
      <BackToTop />
    </>
  );
}

export default App;