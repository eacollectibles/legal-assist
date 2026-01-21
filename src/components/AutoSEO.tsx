import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSEOConfig } from './seoConfig';

/**
 * AutoSEO Component
 * 
 * Automatically applies SEO meta tags based on current route.
 * Add this ONCE in Router.tsx alongside ScrollToTop.
 * 
 * Uses seoConfig.ts mapping for all 125+ pages.
 * Each route gets unique title, description, and canonical URL.
 * 
 * Usage in Router.tsx:
 * <BrowserRouter>
 *   <ScrollToTop />
 *   <AutoSEO />
 *   <Routes>...</Routes>
 * </BrowserRouter>
 */
export function AutoSEO() {
  const location = useLocation();
  const baseUrl = 'https://legalassist.london';
  
  useEffect(() => {
    // Get SEO config for current route from centralized config
    const seo = getSEOConfig(location.pathname);
    const canonicalUrl = `${baseUrl}${location.pathname}`;
    
    // Set document title
    document.title = seo.title;
    
    // Helper to update or create meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    
    // Helper to update or create link tag
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };
    
    // === CORE SEO META TAGS ===
    setMeta('description', seo.description);
    if (seo.keywords) {
      setMeta('keywords', seo.keywords);
    }
    
    // === ROBOTS DIRECTIVE ===
    // noindex private/auth pages
    const isPrivate = /^\/(admin|dashboard|login|signup|intake|booking|upload)/.test(location.pathname);
    setMeta('robots', isPrivate ? 'noindex, nofollow' : 'index, follow');
    
    // === CANONICAL URL (CRITICAL!) ===
    // Each page MUST have its own canonical - this fixes the SEO issue
    setLink('canonical', canonicalUrl);
    
    // === OPEN GRAPH TAGS ===
    setMeta('og:title', seo.title, true);
    setMeta('og:description', seo.description, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', 'LegalAssist Paralegal Services', true);
    setMeta('og:locale', 'en_CA', true);
    
    // === TWITTER CARD TAGS ===
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', seo.title);
    setMeta('twitter:description', seo.description);
    
    // === ADDITIONAL GEO TAGS ===
    setMeta('geo.region', 'CA-ON');
    setMeta('geo.placename', 'London');
    
  }, [location.pathname]);
  
  return null; // Renders nothing
}

export default AutoSEO;
