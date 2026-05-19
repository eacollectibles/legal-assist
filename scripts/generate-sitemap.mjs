#!/usr/bin/env node
/**
 * scripts/generate-sitemap.mjs
 *
 * Regenerates public/sitemap.xml from the canonical data sources:
 *   - src/components/seoConfig.ts (static routes)
 *   - src/data/blogData.ts        (blog post slugs → /blog/{slug})
 *   - src/data/cityData.ts        (city slugs → /locations/{slug})
 *
 * Skips private/noindex routes (admin, dashboards, login flows) using the
 * SAME regex as src/pages/[...slug].astro — keep them in sync if either
 * changes.
 *
 * Run via:
 *   node scripts/generate-sitemap.mjs
 * or hook into the build:
 *   "scripts": { "prebuild": "node scripts/generate-sitemap.mjs", ... }
 *
 * Output: writes public/sitemap.xml and prints a one-line summary.
 *
 * No dependencies — pure node ESM, parses .ts source files via regex.
 * Trade-off: if seoConfig.ts / blogData.ts / cityData.ts ever switch to
 * computed keys or non-literal slugs, the regex needs updating.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SITE = 'https://www.legalassist.london';
const TODAY = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

// Private/noindex paths — MUST stay in sync with [...slug].astro
const PRIVATE_PATH_REGEX =
  /^\/(admin|dashboard|client-dashboard|login|signup|client-login|client-signup|intake|booking|upload|paralegal-dashboard|meeting-request|meeting-dashboard|forgot-password|reset-password|conflict-detected)/;

// ---------------------------------------------------------------------------
// Extract static routes from seoConfig.ts
// ---------------------------------------------------------------------------

const seoConfigPath = join(ROOT, 'src/components/seoConfig.ts');
const seoConfigSrc = readFileSync(seoConfigPath, 'utf8');

// Matches keys like:   '/services/traffic-tickets': {
// at the start of a line within the seoConfig object.
const staticRoutes = new Set();
const routeRegex = /^\s*'(\/[^']*)':\s*{/gm;
let match;
while ((match = routeRegex.exec(seoConfigSrc)) !== null) {
  staticRoutes.add(match[1]);
}

// ---------------------------------------------------------------------------
// Extract blog post slugs from blogData.ts
// ---------------------------------------------------------------------------

const blogDataPath = join(ROOT, 'src/data/blogData.ts');
const blogDataSrc = readFileSync(blogDataPath, 'utf8');

const blogSlugs = new Set();
const blogSlugRegex = /^\s*slug:\s*'([^']+)'/gm;
while ((match = blogSlugRegex.exec(blogDataSrc)) !== null) {
  blogSlugs.add(match[1]);
}

// ---------------------------------------------------------------------------
// Extract city slugs from cityData.ts
// ---------------------------------------------------------------------------

const cityDataPath = join(ROOT, 'src/data/cityData.ts');
const cityDataSrc = readFileSync(cityDataPath, 'utf8');

const citySlugs = new Set();
const citySlugRegex = /^\s*slug:\s*'([^']+)'/gm;
while ((match = citySlugRegex.exec(cityDataSrc)) !== null) {
  citySlugs.add(match[1]);
}

// ---------------------------------------------------------------------------
// Combine + normalize URLs
// ---------------------------------------------------------------------------

const urls = new Set();

const normalize = (p) => (p === '/' ? '/' : p.replace(/\/$/, ''));

let skippedPrivate = 0;
for (const path of staticRoutes) {
  if (PRIVATE_PATH_REGEX.test(path)) {
    skippedPrivate += 1;
    continue;
  }
  urls.add(normalize(path));
}

for (const slug of blogSlugs) {
  urls.add(`/blog/${slug}`);
}

for (const slug of citySlugs) {
  urls.add(`/locations/${slug}`);
}

// ---------------------------------------------------------------------------
// Change-frequency policy by URL pattern
// ---------------------------------------------------------------------------

function changefreqFor(path) {
  if (path === '/') return 'weekly';
  if (path.startsWith('/blog/')) return 'monthly';
  if (path.startsWith('/legal-news')) return 'weekly';
  if (path.startsWith('/locations/')) return 'monthly';
  if (path.startsWith('/services/')) return 'monthly';
  if (path.startsWith('/guides/')) return 'quarterly';
  if (path.startsWith('/resources/')) return 'quarterly';
  if (path === '/about' || path === '/contact' || path === '/services') return 'monthly';
  return 'monthly';
}

// ---------------------------------------------------------------------------
// Emit XML
// ---------------------------------------------------------------------------

const sortedUrls = [...urls].sort();

const xmlLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
];

for (const path of sortedUrls) {
  const fullUrl = `${SITE}${path === '/' ? '/' : path}`;
  xmlLines.push('  <url>');
  xmlLines.push(`    <loc>${fullUrl}</loc>`);
  xmlLines.push(`    <lastmod>${TODAY}</lastmod>`);
  xmlLines.push(`    <changefreq>${changefreqFor(path)}</changefreq>`);
  xmlLines.push('  </url>');
}

xmlLines.push('</urlset>');
xmlLines.push('');

const xml = xmlLines.join('\n');

const publicDir = join(ROOT, 'public');
if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });
const outPath = join(publicDir, 'sitemap.xml');
writeFileSync(outPath, xml, 'utf8');

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

const breakdown = {
  homepage: sortedUrls.filter((p) => p === '/').length,
  services: sortedUrls.filter((p) => p.startsWith('/services')).length,
  blog: sortedUrls.filter((p) => p.startsWith('/blog/')).length,
  locations: sortedUrls.filter((p) => p.startsWith('/locations/')).length,
  guides: sortedUrls.filter((p) => p.startsWith('/guides/')).length,
  resources: sortedUrls.filter((p) => p.startsWith('/resources/')).length,
  other: sortedUrls.filter(
    (p) =>
      p !== '/' &&
      !p.startsWith('/services') &&
      !p.startsWith('/blog/') &&
      !p.startsWith('/locations/') &&
      !p.startsWith('/guides/') &&
      !p.startsWith('/resources/')
  ).length,
};

console.log(`Generated sitemap → ${outPath}`);
console.log(`  Total URLs:                 ${sortedUrls.length}`);
console.log(`  Source counts:`);
console.log(`    seoConfig.ts routes:      ${staticRoutes.size} (${skippedPrivate} private skipped)`);
console.log(`    blogData.ts posts:        ${blogSlugs.size}`);
console.log(`    cityData.ts cities:       ${citySlugs.size}`);
console.log(`  Breakdown by section:`);
for (const [section, count] of Object.entries(breakdown)) {
  console.log(`    ${section.padEnd(26)}${count}`);
}
