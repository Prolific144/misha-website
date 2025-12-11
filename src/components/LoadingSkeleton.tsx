//LoadingSkeleton.tsx
import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg animate-pulse">
      <div className="h-64 bg-gray-200 dark:bg-gray-700" />
      <div className="p-6">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4" />
        <div className="flex justify-between items-center mt-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4" />
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-8 w-5/6" />
            <div className="flex gap-4 mb-8">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full w-1/3" />
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full w-1/3" />
            </div>
          </div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export const CategorySkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="p-6 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-3/4 mx-auto" />
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto" />
        </div>
      ))}
    </div>
  );
};