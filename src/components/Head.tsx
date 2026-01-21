/**
 * Head.tsx - Global Head Elements
 * 
 * Contains ONLY static/global elements that don't change per page:
 * - Structured data (Schema.org)
 * - Font preloading
 * - Theme color
 * - Google verification
 * 
 * Per-page SEO (title, description, canonical) is handled by AutoSEO.tsx
 */
export const Head = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": "https://legalassist.london/#business",
        "name": "LegalAssist Paralegal Services",
        "description": "Licensed paralegal services in London, Ontario. Affordable representation for Small Claims Court, Landlord Tenant Board, traffic tickets, criminal matters and more.",
        "url": "https://legalassist.london",
        "telephone": "+15196011110",
        "email": "info@legalassist.london",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "P.O Box 1000",
          "addressLocality": "London",
          "addressRegion": "Ontario",
          "postalCode": "N6A 2L1",
          "addressCountry": "CA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 42.9849,
          "longitude": -81.2453
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "London",
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": "Ontario"
            }
          },
          {
            "@type": "AdministrativeArea",
            "name": "Middlesex County"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Southwestern Ontario"
          }
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
            "closes": "16:00"
          }
        ],
        "priceRange": "$$",
        "currenciesAccepted": "CAD",
        "paymentAccepted": "Cash, Credit Card, Debit, E-Transfer",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Paralegal Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Small Claims Court Representation",
                "description": "Legal representation for civil disputes up to $35,000"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Landlord and Tenant Board",
                "description": "Representation for residential tenancy disputes"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Traffic Ticket Defence",
                "description": "Defence for speeding, careless driving and other traffic violations"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Human Rights Tribunal",
                "description": "Representation for discrimination and human rights complaints"
              }
            }
          ]
        },
        "sameAs": [
          "https://www.facebook.com/legalassist",
          "https://www.linkedin.com/company/legalassist"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://legalassist.london/#website",
        "url": "https://legalassist.london",
        "name": "LegalAssist Paralegal Services",
        "publisher": {
          "@id": "https://legalassist.london/#business"
        }
      }
    ]
  };

  return (
    <>
      {/* Basic charset and viewport - required */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Static meta tags that don't change per page */}
      <meta name="author" content="LegalAssist Paralegal Services" />
      <meta name="language" content="English" />
      
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="88t7djZ30uDHKlJfhoAD5kkD7PZimfJmVxGriDB8Yyk" />
      
      {/* Theme and PWA */}
      <meta name="theme-color" content="#B94A1F" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* 
        NOTE: The following are now handled dynamically by AutoSEO.tsx:
        - <title>
        - meta description
        - meta keywords  
        - meta robots
        - canonical URL
        - og:title, og:description, og:url
        - twitter:title, twitter:description
        - geo.region, geo.placename
      */}
      
      {/* Schema.org Structured Data - global business info */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      
      {/* Font Preloading */}
      <link rel="preconnect" href="https://static.parastorage.com" />
      <link rel="preload" as="font" href="https://static.parastorage.com/fonts/bitter" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" as="font" href="https://static.parastorage.com/fonts/raleway" type="font/woff2" crossOrigin="anonymous" />
    </> 
  );
};

export default Head;
