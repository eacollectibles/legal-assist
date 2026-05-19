#!/usr/bin/env node
/**
 * scripts/dedupe-seo-config.mjs
 *
 * Removes duplicate route definitions in src/components/seoConfig.ts.
 *
 * Why: TypeScript object literals with duplicate keys silently keep only the
 * last one at runtime — so the better, more detailed first definitions get
 * shadowed by less-detailed second definitions. This also causes ts(1117)
 * errors in `npm run check`.
 *
 * Strategy: keep the FIRST occurrence of each key, delete the SECOND.
 *
 * Usage:
 *   node scripts/dedupe-seo-config.mjs            # apply (writes file)
 *   node scripts/dedupe-seo-config.mjs --dry-run  # report only, no write
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const FILE = join(ROOT, 'src/components/seoConfig.ts');

const DRY_RUN = process.argv.includes('--dry-run');

const src = readFileSync(FILE, 'utf8');
const lines = src.split('\n');

// Find every route declaration line and its key.
const keyRegex = /^(\s*)'(\/[^']*)':\s*\{/;
const routeStarts = []; // { lineIdx, indent, key }
for (let i = 0; i < lines.length; i += 1) {
  const m = lines[i].match(keyRegex);
  if (m) routeStarts.push({ lineIdx: i, indent: m[1], key: m[2] });
}

// Group by key to find duplicates.
const seen = new Map(); // key -> [lineIdx, ...]
for (const r of routeStarts) {
  if (!seen.has(r.key)) seen.set(r.key, []);
  seen.get(r.key).push(r.lineIdx);
}

const dupes = [...seen.entries()].filter(([, idxs]) => idxs.length > 1);

if (dupes.length === 0) {
  console.log('No duplicate keys found. Nothing to do.');
  process.exit(0);
}

console.log(`Found ${dupes.length} duplicate keys:`);
for (const [key, idxs] of dupes) {
  console.log(`  ${key.padEnd(48)} lines ${idxs.map((i) => i + 1).join(', ')}`);
}

// For each duplicate (except the first), determine the line range to delete.
// Range = from the second-occurrence line to the line that closes the entry.
// The entry closes with a line like `  },` at the same indent as the opening.
//
// We detect the close by tracking brace depth: increment on { in non-comment
// content, decrement on }. When depth returns to 0 AND we're at the entry's
// indent level with the closing brace, that's the end. We then include the
// trailing comma line and any blank/comment lines immediately after.

const linesToDelete = new Set();

for (const [, idxs] of dupes) {
  // Keep idxs[0] (first occurrence). Delete idxs[1] (and any further dupes,
  // though we don't see any 3+-fold duplicates in this file).
  for (let d = 1; d < idxs.length; d += 1) {
    const startLine = idxs[d];
    const startIndent = lines[startLine].match(/^(\s*)/)[1];
    // Walk forward, tracking brace depth. Start at 0; the opening { on the
    // start line brings depth to 1 — we look for depth to return to 0.
    let depth = 0;
    let inBlockComment = false;
    let endLine = startLine;
    for (let i = startLine; i < lines.length; i += 1) {
      let line = lines[i];
      // Strip block comments mid-line (rare but possible).
      line = line.replace(/\/\*[\s\S]*?\*\//g, '');
      // Strip line comments.
      line = line.replace(/\/\/.*$/, '');
      // Strip string contents so braces inside strings don't confuse us.
      line = line.replace(/'(?:[^'\\]|\\.)*'/g, "''");
      line = line.replace(/"(?:[^"\\]|\\.)*"/g, '""');
      line = line.replace(/`(?:[^`\\]|\\.)*`/g, '``');

      for (const ch of line) {
        if (ch === '{') depth += 1;
        else if (ch === '}') depth -= 1;
      }
      if (depth === 0 && i > startLine) {
        endLine = i;
        break;
      }
    }
    // Mark startLine..endLine inclusive for deletion. Also blank line
    // immediately after if present (purely cosmetic).
    for (let i = startLine; i <= endLine; i += 1) linesToDelete.add(i);
  }
}

console.log(`\nLines to delete: ${linesToDelete.size}`);

if (DRY_RUN) {
  console.log('\nDry run — no file changes written. Re-run without --dry-run to apply.');
  process.exit(0);
}

const kept = lines.filter((_, i) => !linesToDelete.has(i));
const out = kept.join('\n');

writeFileSync(FILE, out, 'utf8');
console.log(`\nWrote ${FILE} (${lines.length} → ${kept.length} lines, removed ${lines.length - kept.length}).`);
console.log('\nNext step: run `npm run check` to verify ts(1117) errors dropped.');
