import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  srcSet?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  fallback,
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  srcSet,
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Default fallback component
  const defaultFallback = (
    <div className={`bg-gradient-to-br from-orange-100 to-red-100 dark:from-gray-800 dark:to-gray-900 ${className} flex items-center justify-center`}>
      <div className="text-center">
        <ImageOff className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-2" />
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{alt}</p>
      </div>
    </div>
  );

  if (error) {
    return fallback ? <>{fallback}</> : defaultFallback;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        sizes={sizes}
        srcSet={srcSet}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
      />
      
      {/* Loading skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 animate-pulse" />
      )}
    </div>
  );
};