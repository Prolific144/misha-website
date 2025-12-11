import React, { useEffect } from 'react';
import { COMPANY_CONFIG } from '../utils/companyConfig';

interface SEOMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

export const SEOMeta: React.FC<SEOMetaProps> = ({
  title = COMPANY_CONFIG.name,
  description = COMPANY_CONFIG.heroSubtitle,
  image = 'https://images.unsplash.com/photo-1563245372-f21724e3856d',
  url = window.location.href,
  type = 'website',
}) => {
  const fullTitle = title === COMPANY_CONFIG.name 
    ? title 
    : `${title} | ${COMPANY_CONFIG.name}`;

  useEffect(() => {
    // Update page title
    document.title = fullTitle;

    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update description
    updateMetaTag('description', description);

    // Update Open Graph tags
    updateMetaTag('og:title', fullTitle);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', type);

    // Update Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

  }, [title, description, image, url, type, fullTitle]);

  return null; // This component doesn't render anything
};