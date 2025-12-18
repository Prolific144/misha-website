import React, { useEffect } from 'react';
import { COMPANY_CONFIG } from '@config/index';

interface SEOMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string;
}

export const SEOMeta: React.FC<SEOMetaProps> = ({
  title = COMPANY_CONFIG.name,
  description = COMPANY_CONFIG.heroSubtitle,
  image = 'https://images.unsplash.com/photo-1563245372-f21724e3856d',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  keywords = 'Korean food, kimchi, ramen, Korean groceries, Korean snacks, Nairobi, Kenya, authentic Korean, gochujang, bulgogi, bibimbap',
}) => {
  const fullTitle = title === COMPANY_CONFIG.name 
    ? title 
    : `${title} | ${COMPANY_CONFIG.name}`;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Update page title
    document.title = fullTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', COMPANY_CONFIG.name, true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', fullTitle, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);
    updateMetaTag('twitter:site', COMPANY_CONFIG.socialMedia.twitter?.replace('https://twitter.com/', '@') || '@mishafoodstuffs', true);

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', COMPANY_CONFIG.name);
    
    // Viewport for mobile optimization
    let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1, maximum-scale=5';
      document.head.appendChild(viewport);
    }

    // Theme color
    let themeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.name = 'theme-color';
      themeColor.content = '#D32F2F'; // Primary brand color
      document.head.appendChild(themeColor);
    }

    // Canonical URL - FIXED: Corrected variable name
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = url;
      document.head.appendChild(canonical);
    } else {
      canonical.href = url;
    }

  }, [title, description, image, url, type, keywords, fullTitle]);

  // Return null as this component doesn't render anything
  return null;
};