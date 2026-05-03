#!/usr/bin/env node
/**
 * Automatic Sitemap Generator
 *
 * Reads route definitions from src/routes/, city data from src/data/cityData.ts,
 * and blog slugs from src/data/blogData.ts to generate a complete sitemap.xml.
 *
 * Usage:
 *   node scripts/generate-sitemap.js
 *   npm run generate:sitemap
 *
 * This ensures the sitemap stays in sync with your actual routes — no manual updates needed.
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.legalassist.london';
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');

// Today's date in YYYY-MM-DD format for lastmod
const TODAY = new Date().toISOString().split('T')[0];

// ─── Route file parsers ────────────────────────────────────────────────

/**
 * Extract path strings from a route config file.
 * Matches patterns like: path: '/services/traffic-tickets'
 * or path="/services/traffic-tickets"
 */
function extractPaths(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const paths = [];

  // Match { path: '/some/path' } or path: "/some/path"
  const regex = /path:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const p = match[1];
    // Skip dynamic params like :slug, :userId, :token
    if (!p.includes(':')) {
      paths.push(p);
    }
  }

  // Also match JSX Route path="..." patterns
  const jsxRegex = /path="([^"]+)"/g;
  while ((match = jsxRegex.exec(content)) !== null) {
    const p = match[1];
    if (!p.includes(':') && p !== '*') {
      paths.push(p);
    }
  }

  return [...new Set(paths)]; // dedupe
}

/**
 * Extract city slugs from cityData.ts
 * Matches: slug: 'city-name'
 */
function extractCitySlugs(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const slugs = [];
  const regex = /slug:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

/**
 * Extract blog post slugs from blogData.ts
 * Matches: slug: 'post-slug-name'
 */
function extractBlogSlugs(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const slugs = [];
  const regex = /slug:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

// ─── Private/admin route filter ────────────────────────────────────────

const PRIVATE_PREFIXES = [
  '/admin',
  '/dashboard',
  '/client-dashboard',
  '/client-login',
  '/client-signup',
  '/client-intake',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/intake',
  '/booking',
  '/meeting-request',
  '/meeting-dashboard',
  '/upload',
  '/paralegal-dashboard',
  '/conflict-detected',
];

function isPrivate(urlPath) {
  return PRIVATE_PREFIXES.some(prefix => urlPath === prefix || urlPath.startsWith(prefix + '/'));
}

// ─── Priority & changefreq logic ───────────────────────────────────────

function getPriority(urlPath) {
  if (urlPath === '/') return '1.0';
  if (urlPath === '/services' || urlPath === '/contact' || urlPath === '/about') return '0.9';

  // Main service category pages
  const mainServices = [
    '/services/traffic-tickets', '/services/small-claims-court',
    '/services/landlord-tenant-board', '/services/human-rights-tribunal',
    '/services/employment-issues', '/services/criminal-matters'
  ];
  if (mainServices.includes(urlPath)) return '0.9';

  // Service sub-pages
  if (urlPath.startsWith('/services/')) return '0.8';

  // Guides
  if (urlPath.startsWith('/guides/')) return '0.7';

  // Blog
  if (urlPath === '/blog') return '0.7';
  if (urlPath.startsWith('/blog/')) return '0.6';

  // Location hub pages
  if (urlPath === '/locations') return '0.7';
  if (urlPath.match(/^\/locations\/[^/]+$/) || urlPath.match(/^\/[a-z-]+-paralegal$/)) return '0.7';

  // City+service pages
  if (urlPath.match(/^\/locations\/[^/]+\/[^/]+$/)) return '0.6';

  // Resources
  if (urlPath.startsWith('/resources') || urlPath === '/legal-news') return '0.5';

  // Everything else
  return '0.5';
}

function getChangefreq(urlPath) {
  if (urlPath === '/' || urlPath === '/blog') return 'weekly';
  if (urlPath.startsWith('/blog/')) return 'monthly';
  if (urlPath.startsWith('/services/')) return 'monthly';
  if (urlPath.startsWith('/locations/') && urlPath.split('/').length > 3) return 'monthly';
  if (urlPath === '/legal-news') return 'weekly';
  return 'monthly';
}

// ─── XML builder ───────────────────────────────────────────────────────

function buildSitemapXml(urls) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  const entries = urls.map(urlPath => {
    const fullUrl = `${BASE_URL}${urlPath}`;
    return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${getChangefreq(urlPath)}</changefreq>
    <priority>${getPriority(urlPath)}</priority>
  </url>`;
  });

  return `${header}\n${entries.join('\n')}\n</urlset>\n`;
}

// ─── Main ──────────────────────────────────────────────────────────────

function main() {
  const srcDir = path.join(__dirname, '..', 'src');
  const routesDir = path.join(srcDir, 'routes');

  console.log('🗺️  Generating sitemap from route files...\n');

  const allUrls = new Set();

  // 1. Core pages from Router.tsx
  const corePages = ['/', '/contact', '/about', '/about/team', '/about/student-placement', '/services', '/locations'];
  corePages.forEach(p => allUrls.add(p));
  console.log(`  ✓ Core pages: ${corePages.length}`);

  // 2. Route config files
  const routeFiles = [
    'trafficRoutes.ts',
    'landlordTenantRoutes.ts',
    'smallClaimsRoutes.ts',
    'otherServiceRoutes.ts',
    'guideRoutes.ts',
    'resourceRoutes.ts',
    'locationRoutes.ts',
  ];

  let routeCount = 0;
  for (const file of routeFiles) {
    const filePath = path.join(routesDir, file);
    if (!fs.existsSync(filePath)) {
      console.warn(`  ⚠ Route file not found: ${file}`);
      continue;
    }
    const paths = extractPaths(filePath);
    const publicPaths = paths.filter(p => !isPrivate(p));
    publicPaths.forEach(p => allUrls.add(p));
    routeCount += publicPaths.length;
    console.log(`  ✓ ${file}: ${publicPaths.length} routes`);
  }

  // 3. Blog posts (dynamic slugs)
  const blogDataPath = path.join(srcDir, 'data', 'blogData.ts');
  if (fs.existsSync(blogDataPath)) {
    allUrls.add('/blog');
    const blogSlugs = extractBlogSlugs(blogDataPath);
    blogSlugs.forEach(slug => allUrls.add(`/blog/${slug}`));
    console.log(`  ✓ Blog posts: ${blogSlugs.length}`);
  }

  // 4. City+service pages (dynamic generation from cityData + service templates)
  const cityDataPath = path.join(srcDir, 'data', 'cityData.ts');
  const cityServiceRoutesPath = path.join(routesDir, 'cityServiceRoutes.tsx');

  if (fs.existsSync(cityDataPath) && fs.existsSync(cityServiceRoutesPath)) {
    const citySlugs = extractCitySlugs(cityDataPath);

    // Extract service slug suffixes from cityServiceRoutes.tsx
    const cityRoutesContent = fs.readFileSync(cityServiceRoutesPath, 'utf-8');
    const serviceSlugs = [];
    const slugRegex = /slugSuffix:\s*['"]([^'"]+)['"]/g;
    let match;
    while ((match = slugRegex.exec(cityRoutesContent)) !== null) {
      serviceSlugs.push(match[1]);
    }

    let cityServiceCount = 0;
    for (const city of citySlugs) {
      for (const service of serviceSlugs) {
        allUrls.add(`/locations/${city}/${service}`);
        cityServiceCount++;
      }
    }
    console.log(`  ✓ City+service pages: ${cityServiceCount} (${citySlugs.length} cities × ${serviceSlugs.length} services)`);
  }

  // 5. Sort URLs for clean output
  const sortedUrls = [...allUrls].sort((a, b) => {
    // Homepage first
    if (a === '/') return -1;
    if (b === '/') return 1;
    return a.localeCompare(b);
  });

  // 6. Generate and write sitemap
  const xml = buildSitemapXml(sortedUrls);
  fs.writeFileSync(OUTPUT_PATH, xml);

  console.log(`\n✅ Sitemap generated: ${OUTPUT_PATH}`);
  console.log(`   Total URLs: ${sortedUrls.length}`);
  console.log(`   File size: ${(Buffer.byteLength(xml) / 1024).toFixed(1)} KB`);

  // Warn if approaching sitemap limits
  if (sortedUrls.length > 40000) {
    console.warn('\n⚠️  Approaching 50,000 URL limit. Consider splitting into a sitemap index.');
  }
}

main();
