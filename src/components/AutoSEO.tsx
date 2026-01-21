import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  getSEOConfig, 
  generateServiceSchema, 
  generateFAQSchema, 
  generateBreadcrumbSchema,
  businessInfo 
} from './seoConfig';

/**
 * Enhanced AutoSEO Component
 * 
 * Automatically applies:
 * - Meta tags (title, description, keywords, canonical)
 * - Open Graph tags
 * - Twitter Card tags
 * - Schema.org structured data (Service, FAQ, Breadcrumb)
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
    const seo = getSEOConfig(location.pathname);
    const canonicalUrl = `${baseUrl}${location.pathname}`;
    
    // === DOCUMENT TITLE ===
    document.title = seo.title;
    
    // === HELPER FUNCTIONS ===
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
    
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };
    
    const setJsonLd = (id: string, data: object | null) => {
      // Remove existing script with this ID
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }
      
      // Add new script if data exists
      if (data) {
        const script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      }
    };
    
    // === CORE META TAGS ===
    setMeta('description', seo.description);
    if (seo.keywords) {
      setMeta('keywords', seo.keywords);
    }
    
    // === ROBOTS DIRECTIVE ===
    const isPrivate = /^\/(admin|dashboard|login|signup|intake|booking|upload)/.test(location.pathname);
    setMeta('robots', isPrivate ? 'noindex, nofollow' : 'index, follow');
    
    // === CANONICAL URL ===
    setLink('canonical', canonicalUrl);
    
    // === OPEN GRAPH TAGS ===
    setMeta('og:title', seo.title, true);
    setMeta('og:description', seo.description, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', businessInfo.name, true);
    setMeta('og:locale', 'en_CA', true);
    
    // === TWITTER CARD TAGS ===
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', seo.title);
    setMeta('twitter:description', seo.description);
    
    // === GEO TAGS ===
    setMeta('geo.region', 'CA-ON');
    setMeta('geo.placename', 'London');
    
    // === SCHEMA.ORG STRUCTURED DATA ===
    
    // Service Schema (for service pages)
    if (seo.schema) {
      const serviceSchema = generateServiceSchema(seo, canonicalUrl);
      setJsonLd('schema-service', serviceSchema);
    } else {
      setJsonLd('schema-service', null);
    }
    
    // FAQ Schema (for pages with FAQs)
    if (seo.faqs && seo.faqs.length > 0) {
      const faqSchema = generateFAQSchema(seo.faqs);
      setJsonLd('schema-faq', faqSchema);
    } else {
      setJsonLd('schema-faq', null);
    }
    
    // Breadcrumb Schema
    if (seo.breadcrumbs && seo.breadcrumbs.length > 0) {
      const breadcrumbSchema = generateBreadcrumbSchema(seo.breadcrumbs, baseUrl);
      setJsonLd('schema-breadcrumb', breadcrumbSchema);
    } else {
      setJsonLd('schema-breadcrumb', null);
    }
    
  }, [location.pathname]);
  
  return null;
}

export default AutoSEO;
