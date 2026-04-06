/**
 * Legal News API endpoint
 *
 * NOTE: Wix hosting blocks outbound HTTP requests from server-side code,
 * so CanLII feeds are fetched client-side via CORS proxies instead.
 * This endpoint is kept as a placeholder in case the hosting environment
 * changes in the future.
 */

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    success: true,
    cases: [],
    message: 'Legal news is fetched client-side via CORS proxies. This endpoint is a placeholder.',
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
