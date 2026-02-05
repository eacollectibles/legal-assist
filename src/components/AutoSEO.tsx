import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  getSEOConfig, 
  generateServiceSchema, 
  generateFAQSchema, 
  generateBreadcrumbSchema,
  businessInfo 
} from './seoConfig';

// Props interface for optional overrides
interface AutoSEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  noindex?: boolean;
}

// LocalBusiness/LegalService Schema - consistent sitewide
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": "https://www.legalassist.london/#organization",
  "name": "LegalAssist Paralegal Services",
  "url": "https://www.legalassist.london",
  "telephone": "365-882-9515",
  "email": "info@legalassist.london",
  "logo": "https://www.legalassist.london/logo.png",
  "image": "https://www.legalassist.london/og-image.jpg",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "London",
    "addressRegion": "ON",
    "postalCode": "N6A 2L1",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 42.9849,
    "longitude": -81.2453
  },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Ontario" },
    { "@type": "City", "name": "London" },
    { "@type": "AdministrativeArea", "name": "Middlesex County" },
    { "@type": "AdministrativeArea", "name": "Southwestern Ontario" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "serviceType": [
    "Traffic Ticket Defence",
    "Landlord Tenant Board Representation",
    "Small Claims Court",
    "Human Rights Tribunal",
    "Provincial Offences",
    "Employment Issues"
  ],
  "sameAs": [
    // Add your social profiles here when available
    // "https://www.linkedin.com/company/legalassist",
    // "https://www.google.com/maps/place/LegalAssist"
  ]
};

export function AutoSEO({ title, description, canonical, keywords, noindex }: AutoSEOProps = {}) {
  const location = useLocation();
  const baseUrl = 'https://www.legalassist.london';
  
  useEffect(() => {
    // Get config from seoConfig.ts as base
    const seo = getSEOConfig(location.pathname);
    
    // Use props if provided, otherwise fall back to seoConfig
    const finalTitle = title || seo.title;
    const finalDescription = description || seo.description;
    const finalCanonical = canonical || `${baseUrl}${location.pathname}`;
    const finalKeywords = keywords || seo.keywords;
    
    // Document title
    document.title = finalTitle;
    
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
    setMeta('description', finalDescription);
    if (finalKeywords) {
      setMeta('keywords', finalKeywords);
    }
    
    // Robots - block private pages or if noindex prop is true
    const isPrivate = /^\/(admin|dashboard|client-dashboard|login|signup|client-login|client-signup|intake|booking|upload|paralegal-dashboard|meeting-request)/.test(location.pathname);
    setMeta('robots', (isPrivate || noindex) ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1');
    
    // Canonical URL
    setLink('canonical', finalCanonical);
    
    // Language alternates
    setLink('alternate', finalCanonical, 'en-CA');
    setLink('alternate', finalCanonical, 'x-default');
    
    // Open Graph
    setMeta('og:title', finalTitle, true);
    setMeta('og:description', finalDescription, true);
    setMeta('og:url', finalCanonical, true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', businessInfo.name, true);
    setMeta('og:locale', 'en_CA', true);
    setMeta('og:image', 'https://www.legalassist.london/og-image.jpg', true);
    
    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', finalTitle);
    setMeta('twitter:description', finalDescription);
    setMeta('twitter:image', 'https://www.legalassist.london/og-image.jpg');
    
    // Geo
    setMeta('geo.region', 'CA-ON');
    setMeta('geo.placename', 'London');
    
    // Schema: LocalBusiness (persistent sitewide - only set once)
    setJsonLd('schema-localbusiness', localBusinessSchema);
    
    // Schema: Service (page-specific) - only if seoConfig has schema defined
    if (seo.schema) {
      setJsonLd('schema-service', generateServiceSchema(seo, finalCanonical));
    } else {
      setJsonLd('schema-service', null);
    }
    
    // Schema: FAQ (page-specific)
    if (seo.faqs && seo.faqs.length > 0) {
      setJsonLd('schema-faq', generateFAQSchema(seo.faqs));
    } else {
      setJsonLd('schema-faq', null);
    }
    
    // Schema: Breadcrumb (page-specific)
    if (seo.breadcrumbs && seo.breadcrumbs.length > 0) {
      setJsonLd('schema-breadcrumb', generateBreadcrumbSchema(seo.breadcrumbs, baseUrl));
    } else {
      setJsonLd('schema-breadcrumb', null);
    }
    
  }, [location.pathname, title, description, canonical, keywords, noindex]);
  
  return null;
}

export default AutoSEO;
