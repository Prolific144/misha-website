import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { getOptimizedImage } from '@/config/imageMappings';

interface ProductImageProps {
  src: string;
  alt: string;
  productName?: string;
  className?: string;
  fallbackColor?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  productName = '',
  className = '',
  fallbackColor = 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900',
  loading = 'lazy',
  width = 600,
  height = 400,
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleError = () => {
    setError(true);
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  // Optimize image URL
  const optimizedSrc = getOptimizedImage(src, width, height);

  if (error) {
    return (
      <div className={`${fallbackColor} ${className} flex items-center justify-center`}>
        <div className="text-center p-4">
          <ImageOff className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-[200px] truncate">
            {productName || alt}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className} ${!loaded ? 'bg-gray-100 dark:bg-gray-900' : ''}`}>
      <img
        src={optimizedSrc}
        alt={alt}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        width={width}
        height={height}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        decoding="async"
      />
      
      {/* Loading skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 animate-pulse" />
      )}
      
      {/* Image source badge for local images */}
      {src.includes('/assets/') && loaded && (
        <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-gray-700 dark:text-gray-300">
          📷 Local
        </div>
      )}
    </div>
  );
};