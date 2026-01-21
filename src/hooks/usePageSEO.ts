import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSEOConfig, SEOConfig } from './seoConfig';

/**
 * usePageSEO Hook
 * 
 * Automatically sets SEO meta tags based on the current route.
 * Uses seoConfig.ts for route-specific metadata.
 * 
 * Usage Option 1 - Auto from config:
 * usePageSEO();
 * 
 * Usage Option 2 - Override specific values:
 * usePageSEO({ title: 'Custom Title', description: 'Custom desc' });
 */
export function usePageSEO(overrides?: Partial<SEOConfig>) {
  const location = useLocation();
  const baseUrl = 'https://legalassist.london';
  
  useEffect(() => {
    // Get SEO config for current route
    const config = getSEOConfig(location.pathname);
    
    // Merge with any overrides
    const seo = {
      ...config,
      ...overrides,
    };
    
    const canonicalUrl = `${baseUrl}${location.pathname}`;
    
    // Set document title
    document.title = seo.title;
    
    // Helper to update or create meta tag
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    // Helper to update or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };
    
    // Core meta tags
    setMetaTag('description', seo.description);
    if (seo.keywords) {
      setMetaTag('keywords', seo.keywords);
    }
    
    // Robots - index all public pages
    const isPrivatePage = location.pathname.startsWith('/admin') || 
                          location.pathname.startsWith('/dashboard') ||
                          location.pathname === '/login' ||
                          location.pathname === '/signup' ||
                          location.pathname === '/intake' ||
                          location.pathname === '/booking' ||
                          location.pathname.startsWith('/upload');
    
    setMetaTag('robots', isPrivatePage ? 'noindex, nofollow' : 'index, follow');
    
    // Canonical URL - CRITICAL: must be unique per page
    setLinkTag('canonical', canonicalUrl);
    
    // Open Graph tags
    setMetaTag('og:title', seo.title, true);
    setMetaTag('og:description', seo.description, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:site_name', 'LegalAssist Paralegal Services', true);
    setMetaTag('og:locale', 'en_CA', true);
    
    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', seo.title);
    setMetaTag('twitter:description', seo.description);
    
  }, [location.pathname, overrides]);
}

export default usePageSEO;
