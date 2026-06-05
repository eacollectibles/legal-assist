/**
 * Build wrapper — bumps Node heap for the Astro / Cloudflare Workers
 * bundling step.
 *
 * Why this exists:
 *   The Legal Assist codebase is now large enough (300+ routes,
 *   ~6,500-line seoConfig.ts, many heavy React components, multiple
 *   PDF generators, retainer templates loaded into memory) that the
 *   default Node V8 heap cap of ~4GB intermittently runs out during
 *   the production build — usually inside the Vite/Rollup tree-shake
 *   pass or the Wix Astro adapter's bundling step. Symptoms:
 *     FATAL ERROR: Reached heap limit Allocation failed -
 *     JavaScript heap out of memory
 *
 * What this script does:
 *   Sets NODE_OPTIONS=--max-old-space-size=8192 (8GB) for the spawned
 *   `wix build` process. NODE_OPTIONS is read at Node startup; setting
 *   it via the spawn env passes it through to the child Node process
 *   that actually does the bundling.
 *
 * Cross-platform:
 *   Works on Windows (PowerShell + cmd), macOS, and Linux. Uses
 *   shell:true so the local node_modules/.bin/wix binary is resolved
 *   the same way `wix build` is resolved in the npm script context.
 *
 * To override the memory cap (e.g. 16GB for a really big build):
 *   set/export NODE_BUILD_MEMORY=16384 before running `npm run build`.
 */

import { spawn } from 'node:child_process';

const memoryMB = process.env.NODE_BUILD_MEMORY || '8192';

// Preserve any pre-existing NODE_OPTIONS the developer / CI has set
// and append --max-old-space-size to the end. Last value wins in V8
// for the same flag, so this override takes precedence.
process.env.NODE_OPTIONS = [
  process.env.NODE_OPTIONS,
  `--max-old-space-size=${memoryMB}`,
].filter(Boolean).join(' ').trim();

console.log(
  `[build] Node heap cap set to ${memoryMB} MB ` +
  `(NODE_OPTIONS="${process.env.NODE_OPTIONS}")`
);

const child = spawn('wix', ['build'], {
  stdio: 'inherit',
  shell: true,
  env: process.env,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

child.on('error', (err) => {
  console.error('[build] failed to spawn wix:', err);
  process.exit(1);
});
