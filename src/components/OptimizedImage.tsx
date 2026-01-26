/**
 * OptimizedImage.tsx
 * 
 * Performance-optimized image component with:
 * - Native lazy loading
 * - Blur placeholder
 * - Responsive srcset
 * - WebP support detection
 * - Intersection Observer for eager loading above fold
 */

import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean; // Set true for above-the-fold images
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
}

// Simple blur placeholder (10x10 gray)
const DEFAULT_BLUR_DATA_URL = 
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2U2ZDZjNCIvPjwvc3ZnPg==';

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'blur',
  blurDataURL = DEFAULT_BLUR_DATA_URL,
  sizes = '100vw',
  quality = 80,
  onLoad,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before entering viewport
        threshold: 0,
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Generate srcset for responsive images
  const generateSrcSet = (baseSrc: string): string => {
    // Skip srcset generation for external URLs or data URLs
    if (baseSrc.startsWith('data:') || baseSrc.startsWith('http')) {
      return baseSrc;
    }
    
    const widths = [320, 640, 768, 1024, 1280, 1536];
    return widths
      .map((w) => `${baseSrc}?w=${w}&q=${quality} ${w}w`)
      .join(', ');
  };

  // Determine aspect ratio for placeholder
  const aspectRatio = width && height ? width / height : undefined;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
      }}
    >
      {/* Blur placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-lg"
          style={{ filter: 'blur(20px)' }}
        />
      )}

      {/* Main image */}
      <img
        ref={imgRef}
        src={isInView ? src : undefined}
        srcSet={isInView ? generateSrcSet(src) : undefined}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchpriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        className={`
          w-full h-full object-cover
          transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Loading skeleton (if not using blur) */}
      {placeholder === 'empty' && !isLoaded && (
        <div className="absolute inset-0 bg-pastelbeige/50 skeleton-pulse" />
      )}
    </div>
  );
}

/**
 * Hook for detecting WebP support
 */
export function useWebPSupport(): boolean {
  const [supportsWebP, setSupportsWebP] = useState(true);

  useEffect(() => {
    const checkWebP = async () => {
      const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
      const img = new Image();
      img.onload = () => setSupportsWebP(img.width > 0 && img.height > 0);
      img.onerror = () => setSupportsWebP(false);
      img.src = webpData;
    };
    checkWebP();
  }, []);

  return supportsWebP;
}

/**
 * Generate optimized image URL
 */
export function getOptimizedImageUrl(
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}
): string {
  // For Wix static images
  if (src.includes('static.wixstatic.com')) {
    const params = new URLSearchParams();
    if (options.width) params.set('w', options.width.toString());
    if (options.height) params.set('h', options.height.toString());
    if (options.quality) params.set('q', options.quality.toString());
    
    const separator = src.includes('?') ? '&' : '?';
    return `${src}${separator}${params.toString()}`;
  }

  return src;
}
