import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { getOptimizedImage } from '@/config/imageMappings';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  srcSet?: string;
  width?: number;
  height?: number;
  productName?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  fallback,
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  srcSet,
  width = 600,
  height = 400,
  productName = '',
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Optimize image URL
  const optimizedSrc = getOptimizedImage(src, width, height);

  // Default fallback component
  const defaultFallback = (
    <div className={`bg-gradient-to-br from-orange-100 to-red-100 dark:from-gray-800 dark:to-gray-900 ${className} flex items-center justify-center`}>
      <div className="text-center p-4">
        <ImageOff className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-2" />
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
          {productName || alt}
        </p>
      </div>
    </div>
  );

  if (error) {
    return fallback ? <>{fallback}</> : defaultFallback;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={optimizedSrc}
        alt={alt}
        loading={loading}
        sizes={sizes}
        srcSet={srcSet}
        width={width}
        height={height}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        decoding="async"
      />
      
      {/* Loading skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 animate-pulse" />
      )}
    </div>
  );
};

// src/components/ResponsiveProductImage.tsx
import React from 'react';
import { ProductImage } from './ProductImage';

interface ResponsiveProductImageProps {
  product: any;
  sizes?: string;
  className?: string;
}

export const ResponsiveProductImage: React.FC<ResponsiveProductImageProps> = ({
  product,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = ''
}) => {
  // For local images, we can create srcset for different sizes
  const isLocalImage = product.image?.includes('/assets/');
  
  if (isLocalImage && product.image) {
    const baseName = product.image.replace(/(\.jpg|\.jpeg|\.png|\.webp)$/, '');
    
    return (
      <picture className={className}>
        {/* WebP format (smaller, better compression) */}
        <source
          srcSet={`${baseName}-small.webp 400w, ${baseName}-medium.webp 800w, ${baseName}-large.webp 1200w`}
          type="image/webp"
          sizes={sizes}
        />
        
        {/* Fallback to original format */}
        <source
          srcSet={`${baseName}-small.jpg 400w, ${baseName}-medium.jpg 800w, ${baseName}-large.jpg 1200w`}
          type="image/jpeg"
          sizes={sizes}
        />
        
        {/* Fallback image */}
        <ProductImage
          src={product.image}
          alt={product.name}
          productName={product.name}
          className="w-full h-full"
        />
      </picture>
    );
  }

  // For Unsplash images, they handle responsive images
  return (
    <ProductImage
      src={product.image || ''}
      alt={product.name}
      productName={product.name}
      className={className}
    />
  );
};