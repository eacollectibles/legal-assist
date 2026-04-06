import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageSEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string; // Optional override, defaults to current path
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
}

/**
 * PageSEO Component
 * 
 * Sets per-page SEO meta tags dynamically for SPA.
 * Place this at the top of each page component.
 * 
 * Usage:
 * <PageSEO 
 *   title="Speeding Ticket Defence | London Ontario Paralegal"
 *   description="Fight your speeding ticket in London, Ontario..."
 *   keywords="speeding ticket, traffic ticket, london ontario"
 * />
 */
export function PageSEO({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage,
  noindex = false,
}: PageSEOProps) {
  const location = useLocation();
  const baseUrl = 'https://www.legalassist.london';
  
  // Generate canonical URL from current path if not provided
  const canonicalUrl = canonical || `${baseUrl}${location.pathname}`;
  
  useEffect(() => {
    // Set document title
    document.title = title;
    
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
    setMetaTag('description', description);
    if (keywords) {
      setMetaTag('keywords', keywords);
    }
    
    // Robots
    setMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    
    // Canonical URL - CRITICAL for SEO
    setLinkTag('canonical', canonicalUrl);
    
    // Open Graph tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:site_name', 'LegalAssist Paralegal Services', true);
    setMetaTag('og:locale', 'en_CA', true);
    
    if (ogImage) {
      setMetaTag('og:image', ogImage, true);
    }
    
    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    
    if (ogImage) {
      setMetaTag('twitter:image', ogImage);
    }
    
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, noindex]);
  
  // This component doesn't render anything visible
  return null;
}

export default PageSEO;
