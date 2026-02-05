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

const BASE_URL = 'https://legalassist.london';

/**
 * Build unified @graph schema for a page.
 * One JSON-LD block per page so Google can connect:
 * Organization → LegalService → WebSite → WebPage → Service → FAQPage → BreadcrumbList
 */
function buildSchemaGraph(
  seo: { title: string; description: string; schema?: any; faqs?: any[]; breadcrumbs?: any[] },
  canonicalUrl: string
) {
  var graph = [];

  // 1. Organization (top-level entity)
  graph.push({
    "@type": "Organization",
    "@id": BASE_URL + "/#organization",
    "name": businessInfo.name,
    "url": BASE_URL,
    "telephone": businessInfo.telephone,
    "email": businessInfo.email,
    "logo": {
      "@type": "ImageObject",
      "@id": BASE_URL + "/#logo",
      "url": BASE_URL + "/logo.png",
      "contentUrl": BASE_URL + "/logo.png",
      "caption": businessInfo.name,
      "inLanguage": "en-CA"
    },
    "image": BASE_URL + "/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessInfo.address.streetAddress,
      "addressLocality": businessInfo.address.addressLocality,
      "addressRegion": businessInfo.address.addressRegion,
      "postalCode": businessInfo.address.postalCode,
      "addressCountry": businessInfo.address.addressCountry
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": businessInfo.telephone,
      "contactType": "customer service",
      "email": businessInfo.email,
      "availableLanguage": ["English"],
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Ontario"
      }
    },
    "founder": {
      "@type": "Person",
      "name": "Candice",
      "jobTitle": "Licensed Paralegal"
    },
    "employee": [
      {
        "@type": "Person",
        "name": "Johnny",
        "jobTitle": "Licensed Paralegal"
      }
    ],
    "knowsAbout": [
      "Traffic Ticket Defence",
      "Landlord and Tenant Board",
      "Small Claims Court",
      "Human Rights Tribunal",
      "Provincial Offences",
      "Employment Disputes",
      "Ontario Paralegal Services"
    ],
    "sameAs": []
  });

  // 2. LegalService (LocalBusiness subtype)
  graph.push({
    "@type": "LegalService",
    "@id": BASE_URL + "/#legalservice",
    "name": businessInfo.name,
    "url": BASE_URL,
    "telephone": businessInfo.telephone,
    "email": businessInfo.email,
    "logo": { "@id": BASE_URL + "/#logo" },
    "image": BASE_URL + "/og-image.jpg",
    "priceRange": businessInfo.priceRange,
    "parentOrganization": { "@id": BASE_URL + "/#organization" },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessInfo.address.streetAddress,
      "addressLocality": businessInfo.address.addressLocality,
      "addressRegion": businessInfo.address.addressRegion,
      "postalCode": businessInfo.address.postalCode,
      "addressCountry": businessInfo.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": businessInfo.geo.latitude,
      "longitude": businessInfo.geo.longitude
    },
    "hasMap": "https://www.google.com/maps?q=" + businessInfo.geo.latitude + "," + businessInfo.geo.longitude,
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Ontario",
        "sameAs": "https://en.wikipedia.org/wiki/Ontario"
      },
      { "@type": "City", "name": "London", "containedInPlace": { "@type": "AdministrativeArea", "name": "Ontario" } },
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
    "currenciesAccepted": "CAD",
    "paymentAccepted": "Cash, Credit Card, Debit, E-Transfer"
  });

  // 3. WebSite
  graph.push({
    "@type": "WebSite",
    "@id": BASE_URL + "/#website",
    "name": businessInfo.name,
    "url": BASE_URL,
    "publisher": { "@id": BASE_URL + "/#organization" },
    "inLanguage": "en-CA",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": BASE_URL + "/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  });

  // 4. WebPage (current page)
  var webPage: any = {
    "@type": "WebPage",
    "@id": canonicalUrl + "#webpage",
    "url": canonicalUrl,
    "name": seo.title,
    "description": seo.description,
    "isPartOf": { "@id": BASE_URL + "/#website" },
    "about": { "@id": BASE_URL + "/#legalservice" },
    "inLanguage": "en-CA"
  };
  if (seo.breadcrumbs && seo.breadcrumbs.length > 0) {
    webPage["breadcrumb"] = { "@id": canonicalUrl + "#breadcrumb" };
  }
  graph.push(webPage);

  // 5. Service (page-specific)
  if (seo.schema) {
    var serviceNode: any = {
      "@type": seo.schema.type || "LegalService",
      "@id": canonicalUrl + "#service",
      "name": seo.schema.name || seo.title,
      "url": canonicalUrl,
      "description": seo.description,
      "provider": { "@id": BASE_URL + "/#legalservice" },
      "mainEntityOfPage": { "@id": canonicalUrl + "#webpage" }
    };
    if (seo.schema.serviceType) {
      serviceNode["serviceType"] = seo.schema.serviceType;
    }
    if (seo.schema.areaServed && seo.schema.areaServed.length > 0) {
      serviceNode["areaServed"] = seo.schema.areaServed.map(function(area: string) {
        return { "@type": "AdministrativeArea", "name": area };
      });
    }
    graph.push(serviceNode);
  }

  // 6. FAQPage (page-specific)
  if (seo.faqs && seo.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": canonicalUrl + "#faq",
      "mainEntityOfPage": { "@id": canonicalUrl + "#webpage" },
      "mainEntity": seo.faqs.map(function(faq: any) {
        return {
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        };
      })
    });
  }

  // 7. BreadcrumbList (page-specific)
  if (seo.breadcrumbs && seo.breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": canonicalUrl + "#breadcrumb",
      "itemListElement": seo.breadcrumbs.map(function(item: any, index: number) {
        return {
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": BASE_URL + item.url
        };
      })
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

export function AutoSEO({ title, description, canonical, keywords, noindex }: AutoSEOProps) {
  const location = useLocation();
  
  useEffect(() => {
    // Get config from seoConfig.ts as base
    const seo = getSEOConfig(location.pathname);
    
    // Use props if provided, otherwise fall back to seoConfig
    const finalTitle = title || seo.title;
    const finalDescription = description || seo.description;
    const finalCanonical = canonical || (BASE_URL + location.pathname);
    const finalKeywords = keywords || seo.keywords;
    
    // Document title
    document.title = finalTitle;
    
    // Helper: Set meta tag
    const setMeta = (name: string, content: string, isProperty?: boolean) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector('meta[' + attr + '="' + name + '"]') as HTMLMetaElement;
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
        ? 'link[rel="' + rel + '"][hreflang="' + hreflang + '"]'
        : 'link[rel="' + rel + '"]:not([hreflang])';
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
    setMeta('og:image', BASE_URL + '/og-image.jpg', true);
    
    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', finalTitle);
    setMeta('twitter:description', finalDescription);
    setMeta('twitter:image', BASE_URL + '/og-image.jpg');
    
    // Geo
    setMeta('geo.region', 'CA-ON');
    setMeta('geo.placename', 'London');
    
    // UNIFIED @graph SCHEMA - one JSON-LD block with connected graph
    setJsonLd('schema-graph', buildSchemaGraph(
      { title: finalTitle, description: finalDescription, schema: seo.schema, faqs: seo.faqs, breadcrumbs: seo.breadcrumbs },
      finalCanonical
    ));

    // Remove old separate schema scripts
    setJsonLd('schema-localbusiness', null);
    setJsonLd('schema-service', null);
    setJsonLd('schema-faq', null);
    setJsonLd('schema-breadcrumb', null);
    
  }, [location.pathname, title, description, canonical, keywords, noindex]);
  
  return null;
}

export default AutoSEO;
