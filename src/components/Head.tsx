export const Head = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": "https://www.legalassist.london/#business",
        "name": "LegalAssist Paralegal Services",
        "description": "Licensed paralegal services in London, Ontario. Affordable representation for Small Claims Court, Landlord Tenant Board, traffic tickets, criminal matters and more.",
        "url": "https://www.legalassist.london",
        "telephone": "+13658829515",
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
                "description": "Legal representation for civil disputes up to $50,000"
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
        "@id": "https://www.legalassist.london/#website",
        "url": "https://www.legalassist.london",
        "name": "LegalAssist Paralegal Services",
        "publisher": {
          "@id": "https://www.legalassist.london/#business"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.legalassist.london/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Licensed paralegal services in London, Ontario. Affordable representation for traffic tickets, Small Claims Court, landlord-tenant disputes & more. Free consultation." />
      <meta name="keywords" content="paralegal London Ontario, Small Claims Court, Landlord Tenant Board, traffic ticket paralegal, licensed paralegal, LTB representation, HRTO" />
      <meta name="author" content="LegalAssist Paralegal Services" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="CA-ON" />
      <meta name="geo.placename" content="London" />
      
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="88t7djZ30uDHKlJfhoAD5kkD7PZimfJmVxGriDB8Yyk" />
      
      {/* Open Graph Tags for Social Sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="LegalAssist Paralegal Services | Licensed Ontario Paralegal | London, ON" />
      <meta property="og:description" content="Licensed paralegal services in London, Ontario. Affordable representation for traffic tickets, Small Claims Court, landlord-tenant disputes & more. Free consultation." />
      <meta property="og:site_name" content="LegalAssist Paralegal Services" />
      <meta property="og:url" content="https://www.legalassist.london" />
      <meta property="og:locale" content="en_CA" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="LegalAssist Paralegal Services | Licensed Ontario Paralegal | London, ON" />
      <meta name="twitter:description" content="Licensed paralegal services in London, Ontario. Affordable representation for traffic tickets, Small Claims Court, landlord-tenant disputes & more. Free consultation." />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#B94A1F" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://www.legalassist.london" />
      
      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      
      {/* Fonts */}
      <link rel="preconnect" href="https://static.parastorage.com" />
      <link rel="preload" as="font" href="https://static.parastorage.com/fonts/bitter" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" as="font" href="https://static.parastorage.com/fonts/raleway" type="font/woff2" crossOrigin="anonymous" />
    </> 
  );
};
