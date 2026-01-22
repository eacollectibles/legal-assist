/**
 * Head.tsx - Enhanced Global Head Elements
 * 
 * Contains:
 * - Schema.org structured data (LocalBusiness, LegalService, WebSite)
 * - PWA meta tags
 * - Geo location meta
 * - Performance preloading
 * - Security meta
 * 
 * Per-page SEO (title, description, canonical) is handled by AutoSEO.tsx
 * 
 * Updated: January 2026
 */

import { PHONE_TEL } from '@/lib/contact';

export const Head = () => {
  const currentYear = new Date().getFullYear();
  
  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization / Legal Service
      {
        "@type": ["LegalService", "LocalBusiness", "ProfessionalService"],
        "@id": "https://legalassist.london/#organization",
        "name": "LegalAssist Paralegal Services",
        "alternateName": "LegalAssist",
        "description": "Licensed paralegal services in London, Ontario. Affordable representation for Small Claims Court (up to $50,000), Landlord Tenant Board, traffic tickets, Human Rights Tribunal, and provincial offences throughout Southwestern Ontario.",
        "url": "https://legalassist.london",
        "logo": {
          "@type": "ImageObject",
          "url": "https://legalassist.london/logo.png",
          "width": 512,
          "height": 512
        },
        "image": "https://legalassist.london/og-image.jpg",
        "telephone": PHONE_TEL,
        "email": "info@legalassist.london",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "P.O Box 1000",
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
          { "@type": "City", "name": "London" },
          { "@type": "AdministrativeArea", "name": "Middlesex County" },
          { "@type": "AdministrativeArea", "name": "Elgin County" },
          { "@type": "AdministrativeArea", "name": "Oxford County" },
          { "@type": "AdministrativeArea", "name": "Southwestern Ontario" },
          { "@type": "AdministrativeArea", "name": "Ontario" }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "10:00",
            "closes": "14:00"
          }
        ],
        "priceRange": "$$",
        "currenciesAccepted": "CAD",
        "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Interac e-Transfer"],
        "knowsLanguage": ["en", "English"],
        "slogan": "Affordable Legal Help When You Need It Most",
        "foundingDate": "2024",
        "legalName": "LegalAssist Paralegal Services",
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Professional License",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Law Society of Ontario",
            "url": "https://lso.ca"
          }
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Paralegal Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Traffic Ticket Defence",
                "url": "https://legalassist.london/services/traffic-tickets"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Small Claims Court Representation",
                "url": "https://legalassist.london/services/small-claims"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Landlord and Tenant Board Representation",
                "url": "https://legalassist.london/services/landlord-tenant-board"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Human Rights Tribunal Representation",
                "url": "https://legalassist.london/services/human-rights-tribunal"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Provincial Offences Defence",
                "url": "https://legalassist.london/services/provincial-offences"
              }
            }
          ]
        },
        "sameAs": [
          "https://www.facebook.com/legalassistparalegal",
          "https://www.linkedin.com/company/legalassist-paralegal"
        ]
      },
      
      // WebSite
      {
        "@type": "WebSite",
        "@id": "https://legalassist.london/#website",
        "url": "https://legalassist.london",
        "name": "LegalAssist Paralegal Services",
        "description": "Licensed paralegal services in London, Ontario",
        "publisher": {
          "@id": "https://legalassist.london/#organization"
        },
        "inLanguage": "en-CA"
      },
      
      // ContactPoint
      {
        "@type": "ContactPoint",
        "@id": "https://legalassist.london/#contact",
        "telephone": PHONE_TEL,
        "contactType": "customer service",
        "availableLanguage": "English",
        "areaServed": "CA-ON"
      }
    ]
  };

  return (
    <>
      {/* Essential Meta */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      
      {/* Business Meta */}
      <meta name="author" content="LegalAssist Paralegal Services" />
      <meta name="publisher" content="LegalAssist Paralegal Services" />
      <meta name="copyright" content={`© ${currentYear} LegalAssist Paralegal Services`} />
      <meta name="language" content="en-CA" />
      
      {/* Verification - Update with your codes */}
      <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
      {/* <meta name="msvalidate.01" content="YOUR_BING_CODE" /> */}
      
      {/* Geo Location */}
      <meta name="geo.region" content="CA-ON" />
      <meta name="geo.placename" content="London, Ontario" />
      <meta name="geo.position" content="42.9849;-81.2453" />
      <meta name="ICBM" content="42.9849, -81.2453" />
      
      {/* Theme and PWA */}
      <meta name="theme-color" content="#B94A1F" />
      <meta name="msapplication-TileColor" content="#B94A1F" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="LegalAssist" />
      <meta name="application-name" content="LegalAssist" />
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Default OG Image (overridden by AutoSEO per page) */}
      <meta property="og:image" content="https://legalassist.london/og-image.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="LegalAssist Paralegal Services - London, Ontario" />
      <meta name="twitter:image" content="https://legalassist.london/og-image.jpg" />
      
      {/* Security */}
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* Performance - Preconnect */}
      <link rel="dns-prefetch" href="https://static.wixstatic.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://static.parastorage.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </> 
  );
};

export default Head;
