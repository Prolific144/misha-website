//usePerformanceMetrics.ts
import { useEffect } from 'react';

export const usePerformanceMetrics = () => {
  useEffect(() => {
    // Track Largest Contentful Paint (LCP)
    const trackLCP = () => {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        console.log('LCP:', lastEntry.startTime);
        // Send to analytics
        if (window.gtag) {
          window.gtag('event', 'performance', {
            event_category: 'Web Vitals',
            event_label: 'LCP',
            value: Math.round(lastEntry.startTime),
          });
        }
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    };

    // Track First Input Delay (FID)
    const trackFID = () => {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const firstEntry = entries[0];
        
        console.log('FID:', firstEntry.processingStart - firstEntry.startTime);
        // Send to analytics
      });

      observer.observe({ type: 'first-input', buffered: true });
    };

    if ('PerformanceObserver' in window) {
      trackLCP();
      trackFID();
    }

    // Log page load time
    window.addEventListener('load', () => {
      const timing = performance.timing;
      const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
      console.log('Page load time:', pageLoadTime, 'ms');
    });

    // Track user interactions
    const trackInteraction = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        console.log('User interaction:', target.textContent);
      }
    };

    document.addEventListener('click', trackInteraction);

    return () => {
      document.removeEventListener('click', trackInteraction);
    };
  }, []);
};

// Extend Window interface for Google Analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}