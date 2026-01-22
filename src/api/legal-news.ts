/**
 * Astro API Route: /api/legal-news
 * 
 * Fetches RSS feeds from CanLII server-side (no CORS issues)
 * Returns JSON with parsed case data
 */

import type { APIRoute } from 'astro';

// Tribunal RSS feed configurations
const TRIBUNAL_FEEDS = {
  onltb: {
    name: 'Landlord and Tenant Board',
    url: 'https://www.canlii.org/en/on/onltb/rss.xml',
    category: 'landlord-tenant'
  },
  onhrt: {
    name: 'Human Rights Tribunal of Ontario',
    url: 'https://www.canlii.org/en/on/onhrt/rss.xml',
    category: 'human-rights'
  },
  oncj: {
    name: 'Ontario Court of Justice',
    url: 'https://www.canlii.org/en/on/oncj/rss.xml',
    category: 'traffic'
  },
  onscsm: {
    name: 'Small Claims Court',
    url: 'https://www.canlii.org/en/on/onscsm/rss.xml',
    category: 'small-claims'
  }
};

// Parse RSS XML to extract items
function parseRSS(xml: string, tribunalCode: string, tribunalName: string, defaultCategory: string) {
  const items: any[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    
    const getTagContent = (tag: string): string => {
      const tagRegex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`);
      const tagMatch = itemXml.match(tagRegex);
      return tagMatch ? (tagMatch[1] || tagMatch[2] || '').trim() : '';
    };
    
    const title = getTagContent('title');
    const link = getTagContent('link');
    const pubDate = getTagContent('pubDate');
    const description = getTagContent('description');
    const dcDate = getTagContent('dc:date');
    
    // Extract citation from title (e.g., "2026 ONLTB 123")
    const citationMatch = title.match(/\d{4}\s+\w+\s+\d+/);
    const citation = citationMatch ? citationMatch[0] : '';
    
    // Extract case name (remove citation from title)
    const caseName = title.replace(/,?\s*\d{4}\s+\w+\s+\d+.*$/, '').trim();
    
    items.push({
      id: `${tribunalCode}-${citation.replace(/\s+/g, '-') || items.length}`,
      title: caseName || title,
      citation: citation,
      url: link,
      tribunal: tribunalCode,
      tribunalName: tribunalName,
      category: defaultCategory,
      decisionDate: dcDate || pubDate,
      publishedDate: pubDate,
      summary: description || ''
    });
  }
  
  return items;
}

// Fetch single tribunal RSS
async function fetchTribunal(tribunalCode: string) {
  const config = TRIBUNAL_FEEDS[tribunalCode as keyof typeof TRIBUNAL_FEEDS];
  if (!config) {
    return [];
  }
  
  try {
    console.log(`[API] Fetching ${tribunalCode} from ${config.url}`);
    
    const response = await fetch(config.url, {
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml',
        'User-Agent': 'LegalAssist/1.0 (Legal News Aggregator)'
      }
    });
    
    if (!response.ok) {
      console.error(`[API] Failed to fetch ${tribunalCode}: ${response.status}`);
      return [];
    }
    
    const xml = await response.text();
    console.log(`[API] Got ${xml.length} chars from ${tribunalCode}`);
    
    const items = parseRSS(xml, tribunalCode, config.name, config.category);
    console.log(`[API] Parsed ${items.length} items from ${tribunalCode}`);
    
    return items;
    
  } catch (error) {
    console.error(`[API] Error fetching ${tribunalCode}:`, error);
    return [];
  }
}

export const GET: APIRoute = async ({ url }) => {
  // Get query parameters
  const tribunalParam = url.searchParams.get('tribunal');
  const limitParam = parseInt(url.searchParams.get('limit') || '15');
  
  let allCases: any[] = [];
  
  try {
    if (tribunalParam && TRIBUNAL_FEEDS[tribunalParam as keyof typeof TRIBUNAL_FEEDS]) {
      // Fetch specific tribunal
      allCases = await fetchTribunal(tribunalParam);
    } else {
      // Fetch all tribunals
      const tribunals = Object.keys(TRIBUNAL_FEEDS);
      
      for (const tribunal of tribunals) {
        const cases = await fetchTribunal(tribunal);
        allCases.push(...cases.slice(0, limitParam));
      }
    }
    
    // Sort by date (newest first)
    allCases.sort((a, b) => 
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );
    
    return new Response(JSON.stringify({
      success: true,
      count: allCases.length,
      cases: allCases,
      fetchedAt: new Date().toISOString()
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });
    
  } catch (error) {
    console.error('[API] Error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch legal news',
      cases: []
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
