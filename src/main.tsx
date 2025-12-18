// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { BrowserRouter as Router } from 'react-router-dom';

// Initialize performance monitoring
const initPerformanceMonitoring = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Log page load performance
    window.addEventListener('load', () => {
      const timing = performance.timing;
      const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
      console.log(`Page loaded in ${pageLoadTime}ms`);
      
      // Log to analytics if available
      if (window.gtag) {
        window.gtag('event', 'performance', {
          event_category: 'Page Load',
          event_label: 'Load Time',
          value: pageLoadTime,
        });
      }
    });
  }
};

// Initialize Google Analytics only in production
if (import.meta.env.PROD) {
  // Type declaration for gtag
  declare global {
    interface Window {
      gtag: (...args: any[]) => void;
      dataLayer: any[];
    }
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=G-XXXXXX`; // Replace with your GA ID
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', 'G-XXXXXX'); // Replace with your GA ID
}

// Initialize performance monitoring
initPerformanceMonitoring();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ErrorBoundary>
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </Router>
  </React.StrictMode>
);