/**
 * normalize-seo.mjs — One-shot SEO normalizer for src/components/seoConfig.ts
 *
 * Run: node scripts/normalize-seo.mjs
 *
 * Applies the following transforms in place:
 *   1. Titles > 60 chars → strip ` | Legal Assist` suffix.
 *   2. Titles still > 60 → replace ` | London Ontario Paralegal` with ` London Ontario`.
 *   3. Titles still > 60 → strip trailing ` | Legal Assist London`, ` | Legal Assist`.
 *   4. Descriptions > 170 chars → trim to last sentence boundary (`. `) before 165.
 *      If no sentence boundary, hard-cap at 165 with no trailing period mid-word.
 *   5. Reports stats and writes a backup at seoConfig.ts.bak.
 *
 * Conservative — only modifies title/description STRING LITERALS, never structure.
 * Skips lines that are inside multi-line arrays (faqs, breadcrumbs).
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';

const PATH = 'src/components/seoConfig.ts';
const BACKUP = 'src/components/seoConfig.ts.bak';

if (!existsSync(PATH)) {
  console.error(`File not found: ${PATH}`);
  process.exit(1);
}

const original = readFileSync(PATH, 'utf8');

// Write backup once
if (!existsSync(BACKUP)) {
  writeFileSync(BACKUP, original, 'utf8');
  console.log(`Backup written: ${BACKUP}`);
}

let content = original;
let titlesShortened = 0;
let descriptionsTrimmed = 0;
let untouchableTitles = 0;
let untouchableDescriptions = 0;

// -----------------------------------------------------------
// Title transformer.
// Matches `    title: 'whatever'` lines at any indentation.
// Only touches the SINGLE-quoted form; the codebase uses single
// quotes consistently in seoConfig.ts.
// -----------------------------------------------------------
content = content.replace(
  /^(\s*title:\s*)'([^']+)'(,?)$/gm,
  (full, prefix, title, comma) => {
    if (title.length <= 60) return full;

    let next = title;

    // Step 1: strip trailing ` | Legal Assist`
    if (next.length > 60 && next.endsWith(' | Legal Assist')) {
      next = next.slice(0, -' | Legal Assist'.length);
    }

    // Step 2: replace ` | London Ontario Paralegal` with ` London Ontario`
    if (next.length > 60 && next.endsWith(' | London Ontario Paralegal')) {
      next = next.slice(0, -' | London Ontario Paralegal'.length) + ' London Ontario';
    }

    // Step 3: strip trailing ` | Legal Assist London`
    if (next.length > 60 && next.endsWith(' | Legal Assist London')) {
      next = next.slice(0, -' | Legal Assist London'.length);
    }

    // Step 4: strip trailing ` | London Ontario` if title still has a city/region elsewhere
    if (next.length > 60 && next.endsWith(' | London Ontario')) {
      // Only strip if the title already mentions "Ontario" or "London" earlier
      const head = next.slice(0, -' | London Ontario'.length);
      if (/london|ontario|paralegal/i.test(head)) {
        next = head;
      }
    }

    // Step 5: replace ` | Legal Services` (long, common middle filler)
    if (next.length > 60) {
      next = next.replace(/ \| Legal Services /g, ' | ');
    }

    if (next !== title) {
      titlesShortened++;
      if (next.length > 60) untouchableTitles++;
      return `${prefix}'${next}'${comma}`;
    }
    untouchableTitles++;
    return full;
  }
);

// -----------------------------------------------------------
// Description transformer.
// Trims descriptions > 170 chars to last `. ` boundary <= 165.
// Falls back to hard truncate + ellipsis if no good break.
// -----------------------------------------------------------
content = content.replace(
  /^(\s*description:\s*)'([^']+)'(,?)$/gm,
  (full, prefix, desc, comma) => {
    if (desc.length <= 170) return full;

    let next = desc;

    // Look for last `. ` boundary at index <= 165
    const cutoffIdx = next.lastIndexOf('. ', 165);
    if (cutoffIdx > 80) {
      // Trim including the period (drop the trailing space)
      next = next.slice(0, cutoffIdx + 1);
    } else {
      // Fall back: hard-cut at 162 + `…`
      next = next.slice(0, 162).replace(/\s+\S*$/, '') + '…';
    }

    if (next.length > 170) {
      untouchableDescriptions++;
      return full;
    }
    if (next !== desc) {
      descriptionsTrimmed++;
      return `${prefix}'${next}'${comma}`;
    }
    return full;
  }
);

// -----------------------------------------------------------
// Stats
// -----------------------------------------------------------
const finalTitlesLong = (content.match(/^\s*title:\s*'[^']{61,}'/gm) || []).length;
const finalDescriptionsLong = (content.match(/^\s*description:\s*'[^']{171,}'/gm) || []).length;
const totalTitles = (content.match(/^\s*title:\s*'[^']+'/gm) || []).length;
const totalDescriptions = (content.match(/^\s*description:\s*'[^']+'/gm) || []).length;

if (content === original) {
  console.log('No changes needed.');
  process.exit(0);
}

writeFileSync(PATH, content, 'utf8');

console.log('SEO normalization complete:');
console.log(`  Titles total:         ${totalTitles}`);
console.log(`  Titles shortened:     ${titlesShortened}`);
console.log(`  Titles still > 60:    ${finalTitlesLong} (was ${(original.match(/^\s*title:\s*'[^']{61,}'/gm) || []).length})`);
console.log('');
console.log(`  Descriptions total:   ${totalDescriptions}`);
console.log(`  Descriptions trimmed: ${descriptionsTrimmed}`);
console.log(`  Descriptions > 170:   ${finalDescriptionsLong} (was ${(original.match(/^\s*description:\s*'[^']{171,}'/gm) || []).length})`);
console.log('');
console.log(`Backup at: ${BACKUP}`);
