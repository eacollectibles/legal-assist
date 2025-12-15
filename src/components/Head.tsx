export const Head = () => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Professional legal services provided by licensed paralegals across Ontario. Affordable, accessible legal representation for family law, real estate, employment, and more." />
      <meta name="keywords" content="legal services Ontario, paralegal services, affordable legal help, professional representation, family law, real estate law, employment law" />
      <meta name="author" content="LegalAssist" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      
      {/* Open Graph Tags for Social Sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Professional Legal Services in Ontario | LegalAssist" />
      <meta property="og:description" content="Licensed paralegals providing affordable, professional legal representation across Ontario." />
      <meta property="og:site_name" content="LegalAssist" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Professional Legal Services in Ontario | LegalAssist" />
      <meta name="twitter:description" content="Licensed paralegals providing affordable, professional legal representation across Ontario." />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#B94A1F" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Fonts */}
      <link rel="preconnect" href="https://static.parastorage.com" />
      
      {/* Preload critical resources */}
      <link rel="preload" as="font" href="https://static.parastorage.com/fonts/bitter" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" as="font" href="https://static.parastorage.com/fonts/raleway" type="font/woff2" crossOrigin="anonymous" />
    </>
  );
};
