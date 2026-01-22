import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  getSEOConfig, 
  generateServiceSchema, 
  generateFAQSchema, 
  generateBreadcrumbSchema,
  businessInfo 
} from './seoConfig';

export function AutoSEO() {
  const location = useLocation();
  const baseUrl = 'https://legalassist.london';
  
  useEffect(() => {
    const seo = getSEOConfig(location.pathname);
    const canonicalUrl = `${baseUrl}${location.pathname}`;
    
    // Document title
    document.title = seo.title;
    
    // Helper: Set meta tag
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
    
    // Helper: Set link tag
    const setLink = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang 
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]:not([hreflang])`;
      let el = document.querySelector(selector) as HTMLLinkElement;
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        if (hreflang) el.hreflang = hreflang;
        document.head.appendChild(el);
      }
      el.href = href;
    };
    
    // Helper: Set JSON-LD script
    const setJsonLd = (id: string, data: object | null) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
      
      if (data) {
        const script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      }
    };
    
    // Core meta tags
    setMeta('description', seo.description);
    if (seo.keywords) {
      setMeta('keywords', seo.keywords);
    }
    
    // Robots - block private pages
    const isPrivate = /^\/(admin|dashboard|client-dashboard|login|signup|client-login|client-signup|intake|booking|upload|paralegal-dashboard|meeting-request)/.test(location.pathname);
    setMeta('robots', isPrivate ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1');
    
    // Canonical URL
    setLink('canonical', canonicalUrl);
    
    // Language alternates
    setLink('alternate', canonicalUrl, 'en-CA');
    setLink('alternate', canonicalUrl, 'x-default');
    
    // Open Graph
    setMeta('og:title', seo.title, true);
    setMeta('og:description', seo.description, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', businessInfo.name, true);
    setMeta('og:locale', 'en_CA', true);
    
    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', seo.title);
    setMeta('twitter:description', seo.description);
    
    // Geo
    setMeta('geo.region', 'CA-ON');
    setMeta('geo.placename', 'London');
    
    // Schema: Service
    if (seo.schema) {
      setJsonLd('schema-service', generateServiceSchema(seo, canonicalUrl));
    } else {
      setJsonLd('schema-service', null);
    }
    
    // Schema: FAQ
    if (seo.faqs && seo.faqs.length > 0) {
      setJsonLd('schema-faq', generateFAQSchema(seo.faqs));
    } else {
      setJsonLd('schema-faq', null);
    }
    
    // Schema: Breadcrumb
    if (seo.breadcrumbs && seo.breadcrumbs.length > 0) {
      setJsonLd('schema-breadcrumb', generateBreadcrumbSchema(seo.breadcrumbs, baseUrl));
    } else {
      setJsonLd('schema-breadcrumb', null);
    }
    
  }, [location.pathname]);
  
  return null;
}

export default AutoSEO;
