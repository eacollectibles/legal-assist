/**
 * LoadingSkeleton.tsx
 * 
 * Provides skeleton loading states for different page sections
 * Improves perceived performance during lazy loading
 */

import { memo } from 'react';

// Memoized skeleton components prevent re-renders
export const SkeletonText = memo(({ 
  lines = 3, 
  className = '' 
}: { 
  lines?: number; 
  className?: string 
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-4 bg-secondary/10 rounded skeleton-pulse ${
          i === lines - 1 ? 'w-3/4' : 'w-full'
        }`}
      />
    ))}
  </div>
));
SkeletonText.displayName = 'SkeletonText';

export const SkeletonCard = memo(({ className = '' }: { className?: string }) => (
  <div className={`bg-white rounded-xl border border-secondary/10 p-6 ${className}`}>
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-secondary/10 rounded-lg skeleton-pulse flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-secondary/10 rounded w-3/4 skeleton-pulse" />
        <div className="h-4 bg-secondary/10 rounded w-full skeleton-pulse" />
        <div className="h-4 bg-secondary/10 rounded w-5/6 skeleton-pulse" />
      </div>
    </div>
  </div>
));
SkeletonCard.displayName = 'SkeletonCard';

export const SkeletonHero = memo(() => (
  <div className="bg-secondary/5 py-16 px-4">
    <div className="max-w-5xl mx-auto">
      <div className="h-8 bg-secondary/10 rounded w-1/3 mb-4 skeleton-pulse" />
      <div className="h-12 bg-secondary/10 rounded w-2/3 mb-6 skeleton-pulse" />
      <div className="h-5 bg-secondary/10 rounded w-1/2 mb-8 skeleton-pulse" />
      <div className="flex gap-4">
        <div className="h-12 bg-primary/20 rounded-lg w-48 skeleton-pulse" />
        <div className="h-12 bg-secondary/10 rounded-lg w-36 skeleton-pulse" />
      </div>
    </div>
  </div>
));
SkeletonHero.displayName = 'SkeletonHero';

export const SkeletonGrid = memo(({ 
  count = 6, 
  className = '' 
}: { 
  count?: number; 
  className?: string 
}) => (
  <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
));
SkeletonGrid.displayName = 'SkeletonGrid';

/**
 * Full page loading skeleton
 * Matches the general layout of service/content pages
 */
export const PageSkeleton = memo(() => (
  <div className="min-h-screen bg-background">
    {/* Header skeleton */}
    <div className="bg-background border-b border-secondary/10 sticky top-0 z-50">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-primary/20 rounded skeleton-pulse" />
            <div className="space-y-1">
              <div className="h-5 bg-secondary/10 rounded w-24 skeleton-pulse" />
              <div className="h-3 bg-secondary/10 rounded w-20 skeleton-pulse" />
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <div className="h-4 bg-secondary/10 rounded w-16 skeleton-pulse" />
            <div className="h-4 bg-secondary/10 rounded w-16 skeleton-pulse" />
            <div className="h-4 bg-secondary/10 rounded w-16 skeleton-pulse" />
            <div className="h-10 bg-primary/20 rounded-lg w-40 skeleton-pulse" />
          </div>
        </div>
      </div>
    </div>

    {/* Hero skeleton */}
    <SkeletonHero />

    {/* Content skeleton */}
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="h-8 bg-secondary/10 rounded w-1/4 mb-8 skeleton-pulse" />
      <SkeletonGrid count={6} />
    </div>
  </div>
));
PageSkeleton.displayName = 'PageSkeleton';

/**
 * Minimal loading indicator for quick transitions
 */
export const LoadingSpinner = memo(({ 
  size = 'md',
  className = '' 
}: { 
  size?: 'sm' | 'md' | 'lg';
  className?: string 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`
          ${sizeClasses[size]}
          border-primary/30 border-t-primary
          rounded-full animate-spin
        `}
      />
    </div>
  );
});
LoadingSpinner.displayName = 'LoadingSpinner';

/**
 * Inline loading state for buttons
 */
export const ButtonLoading = memo(({ text = 'Loading...' }: { text?: string }) => (
  <span className="flex items-center gap-2">
    <LoadingSpinner size="sm" />
    <span>{text}</span>
  </span>
));
ButtonLoading.displayName = 'ButtonLoading';

export default PageSkeleton;
